"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { fadeRevealOnScroll } from "@/lib/scrollInteractions";
import { educationContent } from "@/data/education";

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      fadeRevealOnScroll(".education-heading", section);
      fadeRevealOnScroll(".education-item", section, { stagger: 0.12, start: "top 82%" });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      aria-labelledby="education-heading"
      className="relative z-[1] bg-bg py-16 text-text sm:py-24"
    >
      <div className="section-container">
        <div className="education-heading">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
            {educationContent.sectionLabel}
          </p>
          <h2 id="education-heading" className="section-title mt-3 tracking-tight">
            {educationContent.title}
          </h2>
        </div>

        <div className="relative mt-10 space-y-6">
          <div className="absolute bottom-0 left-[7px] top-2 w-px bg-border sm:left-[9px]" aria-hidden />
          {educationContent.items.map((item) => (
            <article
              key={item.school}
              className="education-item relative pl-8 sm:pl-10"
            >
              <span
                className="absolute left-0 top-2 h-4 w-4 rounded-full border-2 border-primary bg-bg sm:h-5 sm:w-5"
                aria-hidden
              />
              <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-lg font-bold tracking-tight text-text sm:text-xl">{item.school}</h3>
                  <p className="text-sm text-muted">{item.period}</p>
                </div>
                <p className="mt-3 break-keep text-base font-semibold text-primary sm:text-lg">
                  {item.major}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
