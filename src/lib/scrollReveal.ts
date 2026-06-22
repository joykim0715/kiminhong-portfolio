import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/animations";

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
    y = 60,
    x = 0,
    opacity = 0,
    duration = 0.55,
    stagger = 0,
    start = "top 85%",
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
    ease: "power2.out",
    stagger,
    immediateRender: false,
    scrollTrigger: {
      trigger,
      start,
      toggleActions: "play none none reverse",
    },
  });
}
