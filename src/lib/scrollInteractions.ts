import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { DURATION, EASE_OUT, MOTION, prefersReducedMotion } from "@/lib/animations";

export function refreshScrollTriggers() {
  if (typeof window === "undefined") return;
  requestAnimationFrame(() => ScrollTrigger.refresh());
}

type RevealOptions = {
  stagger?: number;
  start?: string;
  y?: number;
  duration?: number;
};

export function fadeRevealOnScroll(
  targets: gsap.TweenTarget,
  trigger: Element,
  options: RevealOptions = {},
) {
  if (prefersReducedMotion()) {
    gsap.set(targets, { opacity: 1, y: 0 });
    return null;
  }

  return gsap.from(targets, {
    opacity: 0,
    y: options.y ?? MOTION.revealY,
    duration: options.duration ?? DURATION.reveal,
    ease: EASE_OUT,
    stagger: options.stagger ?? MOTION.stagger,
    immediateRender: false,
    scrollTrigger: {
      trigger,
      start: options.start ?? MOTION.revealStart,
      toggleActions: "play none none none",
    },
  });
}
