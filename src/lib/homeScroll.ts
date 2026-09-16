import { getLenisInstance } from "@/lib/lenisInstance";

export function hasLocationHash() {
  return typeof window !== "undefined" && Boolean(window.location.hash);
}

export function disableScrollRestoration() {
  if (typeof window === "undefined" || hasLocationHash()) return;
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
}

/** Keep refresh/load on the hero unless the URL has a section hash. */
export function resetHomeScroll() {
  if (typeof window === "undefined" || hasLocationHash()) return;
  disableScrollRestoration();
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  getLenisInstance()?.scrollTo(0, { immediate: true });
}
