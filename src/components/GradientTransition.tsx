"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/animations";
import { revealOnScroll } from "@/lib/scrollReveal";
import { siteContent } from "@/data/content";

export default function GradientTransition() {
  const { bridge } = siteContent;
  const sectionRef = useRef<HTMLElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const section = sectionRef.current;
    const gradient = gradientRef.current;
    if (!section || !gradient) return;

    const ctx = gsap.context(() => {
      revealOnScroll(".gradient-reveal-text", section);

      if (!reduced) {
        gsap.fromTo(
          gradient,
          { yPercent: -8, scale: 1.05 },
          {
            yPercent: 8,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );

        gsap.to(gradient, {
          backgroundPosition: "50% 100%",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-[1] -mt-px h-[100vh] overflow-hidden" aria-hidden="false">
      <div
        ref={gradientRef}
        className="absolute inset-0 will-change-transform"
        style={{
          background: "var(--gradient-bridge)",
          backgroundSize: "100% 120%",
          backgroundPosition: "50% 0%",
        }}
      />

      <div className="gradient-reveal-text relative z-10 flex h-full items-center justify-center px-6">
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
