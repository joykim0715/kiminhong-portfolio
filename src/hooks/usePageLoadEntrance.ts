"use client";

import { useLayoutEffect } from "react";
import { gsap } from "@/lib/gsap";
import { EASE_OUT, prefersReducedMotion } from "@/lib/animations";
import { lockPageScroll, unlockPageScroll } from "@/lib/lenisInstance";
import { beginIntro, getIntroState, markIntroReady } from "@/lib/introReady";
import { resetHomeScroll } from "@/lib/homeScroll";

const HERO_TARGETS = [
  ".nav-bar",
  ".hero-stage",
  ".hero-name-line",
  ".hero-desc-line",
  ".hero-cta",
  ".hero-visual",
];

function shouldSkipIntro() {
  if (prefersReducedMotion()) return true;
  if (typeof window === "undefined") return false;
  return Boolean(window.location.hash);
}

function getCover() {
  return document.querySelector<HTMLElement>("[data-intro-cover]");
}

function hideCover(cover: HTMLElement) {
  gsap.set(cover, { autoAlpha: 0, pointerEvents: "none" });
}

function revealHeroImmediate() {
  gsap.set(HERO_TARGETS, { opacity: 1, y: 0, scale: 1 });
}

function finishIntro() {
  const cover = getCover();
  if (cover) hideCover(cover);
  gsap.ticker.lagSmoothing(0);
  document.documentElement.removeAttribute("data-intro");
  revealHeroImmediate();
  resetHomeScroll();
  unlockPageScroll();
  resetHomeScroll();
  requestAnimationFrame(() => {
    resetHomeScroll();
    markIntroReady();
  });
}

function playIntro(cover: HTMLElement) {
  const top = cover.querySelector(".intro-panel-top");
  const bottom = cover.querySelector(".intro-panel-bottom");
  const seam = cover.querySelector(".intro-seam");
  const name = cover.querySelector(".intro-name");

  gsap.set(cover, { autoAlpha: 1, pointerEvents: "auto" });
  gsap.set([".nav-bar", ".hero-stage"], { opacity: 0, y: 18 });
  gsap.set([top, bottom], { force3D: true });
  gsap.set(name, { opacity: 1, y: 0 });
  gsap.set(seam, { scaleX: 1, opacity: 1 });
  gsap.ticker.lagSmoothing(400, 16);

  gsap
    .timeline({
      defaults: { ease: EASE_OUT },
      onComplete: finishIntro,
    })
    .to(name, { opacity: 0, duration: 0.2 }, 0)
    .to(seam, { opacity: 0, duration: 0.16 }, 0)
    .to(top, { yPercent: -101, duration: 0.72, ease: "power2.inOut", force3D: true }, 0.08)
    .to(bottom, { yPercent: 101, duration: 0.72, ease: "power2.inOut", force3D: true }, 0.08)
    .to([".nav-bar", ".hero-stage"], { opacity: 1, y: 0, duration: 0.42 }, 0.42);
}

/**
 * Animates the server-rendered intro cover. No decode/idle wait —
 * the cover is already on screen from first HTML paint.
 */
export function usePageLoadEntrance() {
  useLayoutEffect(() => {
    const cover = getCover();
    const state = getIntroState();

    if (shouldSkipIntro() || state === "done") {
      finishIntro();
      return;
    }

    if (state === "running") return;

    if (!cover) {
      finishIntro();
      return;
    }

    beginIntro();
    lockPageScroll();
    resetHomeScroll();
    document.documentElement.setAttribute("data-intro", "");
    playIntro(cover);
  }, []);
}
