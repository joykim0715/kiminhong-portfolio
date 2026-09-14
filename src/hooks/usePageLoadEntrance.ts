"use client";

import { useLayoutEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { EASE_OUT, MOTION, prefersReducedMotion } from "@/lib/animations";
import { lockPageScroll, unlockPageScroll } from "@/lib/lenisInstance";

const HERO_TARGETS = [".nav-bar", ".hero-name-line", ".hero-desc-line", ".hero-cta", ".hero-visual"];

function shouldSkipIntro() {
  if (prefersReducedMotion()) return true;
  if (typeof window === "undefined") return false;
  return Boolean(window.location.hash);
}

function hideCover(cover: HTMLElement) {
  gsap.set(cover, { autoAlpha: 0, pointerEvents: "none" });
}

function revealHeroImmediate() {
  gsap.set(HERO_TARGETS, { opacity: 1, y: 0, scale: 1 });
}

/**
 * One-time load cover, then the existing Hero stagger.
 * Deep links (#works 등) and reduced-motion skip the cover.
 */
export function usePageLoadEntrance(coverRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const cover = coverRef.current;

    if (shouldSkipIntro()) {
      if (cover) hideCover(cover);
      revealHeroImmediate();
      return;
    }

    if (!cover) {
      revealHeroImmediate();
      return;
    }

    lockPageScroll();
    let released = false;
    const release = () => {
      if (released) return;
      released = true;
      hideCover(cover);
      unlockPageScroll();
    };

    const ctx = gsap.context(() => {
      const top = cover.querySelector(".intro-panel-top");
      const bottom = cover.querySelector(".intro-panel-bottom");
      const seam = cover.querySelector(".intro-seam");
      const name = cover.querySelector(".intro-name");

      gsap.set(cover, { autoAlpha: 1, pointerEvents: "auto" });
      gsap.set([".nav-bar", ".hero-name-line", ".hero-desc-line", ".hero-cta"], {
        opacity: 0,
        y: MOTION.pageLoadY,
      });
      gsap.set(".hero-visual", { opacity: 0, y: MOTION.pageLoadY * 0.6, scale: 1.02 });
      gsap.set(name, { opacity: 0, y: 16 });
      gsap.set(seam, { scaleX: 0 });

      const tl = gsap.timeline({
        defaults: { ease: EASE_OUT },
        onComplete() {
          hideCover(cover);
        },
      });

      tl.to(name, { opacity: 1, y: 0, duration: 0.48 })
        .to(seam, { scaleX: 1, duration: 0.42, ease: "power2.out" }, "-=0.28")
        .to(name, { opacity: 0, duration: 0.22 }, "+=0.18")
        .to(seam, { opacity: 0, duration: 0.18 }, "<")
        .to(top, { yPercent: -101, duration: 0.88, ease: "power3.inOut" }, "-=0.06")
        .to(bottom, { yPercent: 101, duration: 0.88, ease: "power3.inOut" }, "<")
        .add(release, "-=0.22")
        .to(".nav-bar", { opacity: 1, y: 0, duration: 0.5 }, "-=0.62")
        .to(".hero-name-line", { opacity: 1, y: 0, duration: 0.7 }, "-=0.38")
        .to(".hero-desc-line", { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 }, "-=0.42")
        .to(".hero-cta", { opacity: 1, y: 0, duration: 0.5 }, "-=0.28")
        .to(
          ".hero-visual",
          { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: "power2.out" },
          "-=0.7",
        );
    });

    return () => {
      ctx.revert();
      hideCover(cover);
      release();
    };
  }, [coverRef]);
}
