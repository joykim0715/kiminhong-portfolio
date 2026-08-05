import { gsap } from "@/lib/gsap";
import { DURATION, EASE_OUT, MOTION, prefersReducedMotion } from "@/lib/animations";

type RevealOptions = {
  y?: number;
  x?: number;
  opacity?: number;
  duration?: number;
  stagger?: number;
  start?: string;
  delay?: number;
};

export function revealOnScroll(
  targets: gsap.TweenTarget,
  trigger: Element,
  options: RevealOptions = {},
) {
  const reduced = prefersReducedMotion();
  const {
    y = MOTION.revealY,
    x = 0,
    opacity = 0,
    duration = DURATION.reveal,
    stagger = 0,
    start = MOTION.revealStart,
  } = options;

  if (reduced) {
    gsap.set(targets, { opacity: 1, y: 0, x: 0 });
    return null;
  }

  return gsap.from(targets, {
    y,
    x,
    opacity,
    duration,
    ease: EASE_OUT,
    stagger,
    immediateRender: false,
    scrollTrigger: {
      trigger,
      start,
      toggleActions: "play none none none",
    },
  });
}
