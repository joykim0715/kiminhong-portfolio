export const EASE_OUT = "power3.out";
export const EASE_SOFT = "power2.out";
export const EASE_IN_OUT = "power2.inOut";

/** Shared motion tokens — polish existing motion, don't invent new shows */
export const DURATION = {
  pageLoad: 1.45,
  reveal: 0.72,
  card: 0.55,
} as const;

export const MOTION = {
  /** Initial travel for page-load / scroll reveals (px) — shorter = more intentional */
  revealY: 28,
  pageLoadY: 26,
  revealStart: "top 88%",
  stagger: 0.09,
} as const;

export const STAGGER = {
  heroCards: 0.12,
  gallery: 0.08,
} as const;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
