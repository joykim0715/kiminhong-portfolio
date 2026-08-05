"use client";

import { useEffect } from "react";
import { getLenisInstance } from "@/lib/lenisInstance";

const NAV_OFFSET = 64;

/**
 * Scrolls to `location.hash` on home load (e.g. /#works from demo back link).
 * Uses Lenis when available so smooth-scroll doesn't leave the user at the hero.
 */
export default function HashScroll() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || hash.length < 2) return;

    const id = decodeURIComponent(hash.slice(1));
    let cancelled = false;
    let attempts = 0;

    const scrollToTarget = () => {
      if (cancelled) return;
      const el = document.getElementById(id);
      if (!el) {
        if (attempts < 20) {
          attempts += 1;
          window.setTimeout(scrollToTarget, 50);
        }
        return;
      }

      const lenis = getLenisInstance();
      if (lenis) {
        lenis.scrollTo(el, { offset: -NAV_OFFSET, immediate: true });
      } else {
        const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
        window.scrollTo({ top, behavior: "auto" });
      }
    };

    // Wait one frame so Lenis / layout are ready after route change.
    const raf = window.requestAnimationFrame(() => {
      window.setTimeout(scrollToTarget, 0);
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
