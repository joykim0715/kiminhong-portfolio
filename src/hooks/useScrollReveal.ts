"use client";

import { useEffect, useRef } from "react";
import { revealOnScroll } from "@/lib/scrollReveal";

type ScrollRevealOptions = {
  y?: number;
  x?: number;
  opacity?: number;
  duration?: number;
  start?: string;
  stagger?: number;
  childSelector?: string;
};

export function useScrollReveal<T extends HTMLElement>(options: ScrollRevealOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { childSelector, stagger, ...rest } = options;
    const targets = childSelector ? el.querySelectorAll(childSelector) : el;
    const tween = revealOnScroll(targets, el, { stagger, ...rest });

    return () => {
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, [
    options.y,
    options.x,
    options.opacity,
    options.duration,
    options.start,
    options.stagger,
    options.childSelector,
  ]);

  return ref;
}
