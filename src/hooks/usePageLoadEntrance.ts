"use client";

import { useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { DURATION, EASE_OUT, MOTION, prefersReducedMotion } from "@/lib/animations";

/**
 * The only allowed auto-play animation — runs once on mount.
 * Targets: Navbar, H1, description lines, CTA, visual.
 */
export function usePageLoadEntrance() {
  useEffect(() => {
    const reduced = prefersReducedMotion();
    const targets = [".nav-bar", ".hero-name-line", ".hero-desc-line", ".hero-cta", ".hero-visual"];

    if (reduced) {
      gsap.set(targets, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set([".nav-bar", ".hero-name-line", ".hero-desc-line", ".hero-cta"], {
        opacity: 0,
        y: MOTION.pageLoadY,
      });
      gsap.set(".hero-visual", { opacity: 0, y: MOTION.pageLoadY * 0.6, scale: 1.02 });

      const tl = gsap.timeline({
        defaults: { ease: EASE_OUT },
      });

      tl.to(".nav-bar", { opacity: 1, y: 0, duration: 0.55 })
        .to(".hero-name-line", { opacity: 1, y: 0, duration: 0.7 }, "-=0.28")
        .to(".hero-desc-line", { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 }, "-=0.42")
        .to(".hero-cta", { opacity: 1, y: 0, duration: 0.5 }, "-=0.28")
        .to(
          ".hero-visual",
          { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: "power2.out" },
          "-=0.7",
        );

      tl.duration(DURATION.pageLoad);
    });

    return () => ctx.revert();
  }, []);
}
