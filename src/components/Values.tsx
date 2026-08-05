"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { fadeRevealOnScroll } from "@/lib/scrollInteractions";
import { useSiteContent } from "./ContentProvider";

export default function Values() {
  const { values: valuesContent } = useSiteContent();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      fadeRevealOnScroll(".values-heading", section);
      fadeRevealOnScroll(".value-item", section, { stagger: 0.1, start: "top 80%" });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="values" ref={sectionRef} className="relative z-[1] -mt-px bg-bg py-24 text-text sm:py-32">
      <div className="section-container grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="values-heading lg:sticky lg:top-28 lg:self-start">
          <p className="section-eyebrow text-secondary">{valuesContent.sectionLabel}</p>
          <h2 className="section-title mt-3 tracking-tight text-text">{valuesContent.title}</h2>
          <p className="section-body mt-6 break-keep text-muted">{valuesContent.description}</p>
        </div>

        <ul className="divide-y divide-border/80 border-y border-border/80">
          {valuesContent.items.map((item, index) => (
            <li key={item} className="value-item flex items-start gap-4 py-5 sm:gap-5 sm:py-6">
              <span
                className="mt-0.5 w-7 shrink-0 font-mono text-xs font-semibold tabular-nums text-accent/80"
                aria-hidden
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="border-l-2 border-accent/45 pl-4 text-preline break-keep text-base font-medium leading-relaxed text-text sm:pl-5 sm:text-lg">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
