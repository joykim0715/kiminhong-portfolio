"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/animations";
import { revealOnScroll } from "@/lib/scrollReveal";
import { useSiteContent } from "./ContentProvider";
import { useTrack } from "./TrackProvider";
import styles from "./GradientTransition.module.css";

const BRIDGE_REVEAL = {
  research: { y: 28, duration: 0.72 },
  planning: { y: 14, duration: 0.38 },
  marketing: { y: 48, duration: 1.05 },
  sales: { y: 8, duration: 0.26 },
} as const;

export default function GradientTransition() {
  const { bridge } = useSiteContent();
  const { track } = useTrack();
  const sectionRef = useRef<HTMLElement>(null);
  const reveal = BRIDGE_REVEAL[track];

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      revealOnScroll(".gradient-reveal-text", section, {
        y: reveal.y,
        duration: reveal.duration,
      });
    }, section);

    if (reduced) return () => ctx.revert();
    return () => ctx.revert();
  }, [reveal.duration, reveal.y]);

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
        <p className="text-preline max-w-2xl break-keep text-center text-2xl font-medium tracking-tight text-white sm:text-3xl lg:text-4xl">
          {bridge.line1}
          <span className="mt-2 block font-bold text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)]">
            {bridge.line2}
          </span>
        </p>
      </div>
    </section>
  );
}
