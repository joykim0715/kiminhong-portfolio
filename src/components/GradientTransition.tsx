"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/animations";
import { revealOnScroll } from "@/lib/scrollReveal";
import { siteContent } from "@/data/content";
import styles from "./GradientTransition.module.css";

export default function GradientTransition() {
  const { bridge } = siteContent;
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      revealOnScroll(".gradient-reveal-text", section);
    }, section);

    if (reduced) return () => ctx.revert();
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.bridgeSection}
      aria-hidden="false"
    >
      <div className={styles.bridgeGradient} aria-hidden="true" />
      <div className={styles.bridgeTopFade} aria-hidden="true" />
      <div className={styles.bridgeBottomFade} aria-hidden="true" />

      <div className="gradient-reveal-text relative z-10 flex min-h-[inherit] items-center justify-center px-6 py-24">
        <p className="max-w-2xl break-keep text-center text-2xl font-medium tracking-tight text-white sm:text-3xl lg:text-4xl">
          {bridge.line1}
          <span className="mt-2 block font-bold text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)]">
            {bridge.line2}
          </span>
        </p>
      </div>
    </section>
  );
}
