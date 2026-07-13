import type Lenis from "lenis";

let lenis: Lenis | null = null;
let lockCount = 0;

function isInsideScrollableOverlay(target: EventTarget | null) {
  if (!(target instanceof Node)) return false;
  return Boolean(
    document.querySelector("[data-work-modal]")?.contains(target) ||
      document.querySelector("[data-project-panel]")?.contains(target),
  );
}

function blockScrollGesture(e: Event) {
  if (isInsideScrollableOverlay(e.target)) return;
  e.preventDefault();
}

export function setLenisInstance(instance: Lenis | null) {
  lenis = instance;
}

export function getLenisInstance() {
  return lenis;
}

export function lockPageScroll() {
  lockCount += 1;
  if (lockCount > 1) return;

  lenis?.stop();
  document.documentElement.classList.add("scroll-locked");
  document.body.classList.add("scroll-locked");
  window.addEventListener("wheel", blockScrollGesture, { passive: false });
  window.addEventListener("touchmove", blockScrollGesture, { passive: false });
}

export function unlockPageScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount > 0) return;

  window.removeEventListener("wheel", blockScrollGesture);
  window.removeEventListener("touchmove", blockScrollGesture);
  document.documentElement.classList.remove("scroll-locked");
  document.body.classList.remove("scroll-locked");
  lenis?.start();
}
