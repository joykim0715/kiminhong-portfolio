"use client";

import { useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { DURATION, prefersReducedMotion } from "@/lib/animations";

/**
 * The only allowed auto-play animation — runs once on mount.
 * Targets: Navbar, H1, description lines, CTA.
 */
export function usePageLoadEntrance() {
  useEffect(() => {
    const reduced = prefersReducedMotion();
    const targets = [".nav-bar", ".hero-name-line", ".hero-desc-line", ".hero-cta", ".hero-visual"];

    if (reduced) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y: 40 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.to(".nav-bar", { opacity: 1, y: 0, duration: 0.45 })
        .to(".hero-name-line", { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 }, "-=0.25")
        .to(".hero-desc-line", { opacity: 1, y: 0, duration: 0.45, stagger: 0.1 }, "-=0.35")
        .to(".hero-cta", { opacity: 1, y: 0, duration: 0.4 }, "-=0.2")
        .to(".hero-visual", { opacity: 1, y: 0, duration: 0.55 }, "-=0.35");

      tl.duration(DURATION.pageLoad);
    });

    return () => ctx.revert();
  }, []);
}
