"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { getLenisInstance } from "@/lib/lenisInstance";

const NAV_OFFSET = 64;

function scrollElementIntoView(el: HTMLElement) {
  const lenis = getLenisInstance();
  if (lenis) {
    lenis.resize();
    lenis.scrollTo(el, { offset: -NAV_OFFSET, immediate: true });
    return;
  }
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top, behavior: "auto" });
}

/**
 * Scrolls to `location.hash` after ScrollTrigger pins settle.
 * SkillsDial pinSpacing shifts #works downward — scrolling too early lands on Values.
 */
export default function HashScroll() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || hash.length < 2) return;

    const id = decodeURIComponent(hash.slice(1));
    let cancelled = false;
    let findAttempts = 0;
    const timers: number[] = [];

    const getTarget = () => document.getElementById(id);

    const scrollNow = () => {
      if (cancelled) return;
      const el = getTarget();
      if (!el) return;
      scrollElementIntoView(el);
    };

    const findThenScroll = (refreshFirst: boolean) => {
      if (cancelled) return;
      const el = getTarget();
      if (!el) {
        if (findAttempts < 40) {
          findAttempts += 1;
          timers.push(window.setTimeout(() => findThenScroll(refreshFirst), 50));
        }
        return;
      }
      if (refreshFirst) ScrollTrigger.refresh();
      scrollElementIntoView(el);
    };

    const onRefresh = () => {
      // Pin spacing just updated layout — re-align without refreshing again.
      scrollNow();
    };

    ScrollTrigger.addEventListener("refresh", onRefresh);

    timers.push(
      window.setTimeout(() => findThenScroll(true), 0),
      window.setTimeout(() => findThenScroll(true), 150),
      window.setTimeout(() => findThenScroll(true), 400),
      window.setTimeout(() => findThenScroll(true), 800),
    );

    return () => {
      cancelled = true;
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  return null;
}
