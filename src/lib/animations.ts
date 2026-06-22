export const EASE_OUT = "power2.out";
export const EASE_IN_OUT = "power2.inOut";

export const DURATION = {
  pageLoad: 1.2,
  reveal: 0.55,
  card: 0.55,
} as const;

export const STAGGER = {
  heroCards: 0.15,
  gallery: 0.08,
} as const;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
