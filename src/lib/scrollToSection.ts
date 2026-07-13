import { getLenisInstance } from "@/lib/lenisInstance";

const NAV_OFFSET = 64;

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const lenis = getLenisInstance();
  if (lenis) {
    lenis.scrollTo(el, { offset: -NAV_OFFSET, duration: 0.75 });
    return;
  }

  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
}
