"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { fadeRevealOnScroll } from "@/lib/scrollInteractions";
import { siteContent } from "@/data/content";

const { values: valuesContent } = siteContent;

export default function Values() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      fadeRevealOnScroll(".values-heading", section);
      fadeRevealOnScroll(".value-item", section, { stagger: 0.14, start: "top 78%" });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="values" ref={sectionRef} className="relative z-[1] bg-bg/82 py-24 text-text backdrop-blur-[2px] sm:py-32">
      <div className="section-container grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="values-heading lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-secondary">
            {valuesContent.sectionLabel}
          </p>
          <h2 className="section-title mt-3 tracking-tight text-text">{valuesContent.title}</h2>
          <p className="mt-6 break-keep text-base leading-relaxed text-muted sm:text-lg">
            {valuesContent.description}
          </p>
        </div>

        <ul className="space-y-4">
          {valuesContent.items.map((item) => (
            <li
              key={item}
              className="value-item flex items-start gap-4 rounded-2xl border border-border bg-surface p-5 shadow-sm"
            >
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden />
              <span className="break-keep text-base font-medium text-text sm:text-lg">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
