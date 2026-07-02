"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { fadeRevealOnScroll } from "@/lib/scrollInteractions";
import { siteContent } from "@/data/content";

const { experience: experienceContent } = siteContent;

const METRIC_RE = /^\d+\.?\d*만\s*건$|^\d+%$|^\d+건$|^\d+명$/;

function highlightMetrics(text: string) {
  const parts = text.split(/(\d+\.?\d*만\s*건|\d+%|\d+건|\d+명)/g);
  return parts.map((part, i) =>
    METRIC_RE.test(part) ? (
      <span
        key={i}
        className="mx-0.5 inline-block rounded-md bg-secondary/15 px-1.5 py-0.5 text-[0.95em] font-extrabold tabular-nums text-secondary sm:text-[1.05em]"
      >
        {part}
      </span>
    ) : (
      part
    ),
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      fadeRevealOnScroll(".experience-heading", section);
      fadeRevealOnScroll(".experience-item", section, { stagger: 0.12, start: "top 82%" });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      aria-labelledby="experience-heading"
      className="relative z-[1] bg-bg/82 py-16 text-text backdrop-blur-[2px] sm:py-24"
    >
      <div className="section-container">
        <div className="experience-heading">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
            {experienceContent.sectionLabel}
          </p>
          <h2 id="experience-heading" className="section-title mt-3 tracking-tight">
            {experienceContent.title}
          </h2>
        </div>

        <div className="mt-10 space-y-6">
          {experienceContent.items.map((item) => (
            <article
              key={`${item.organization}-${item.period}`}
              className="experience-item rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6"
            >
              <header className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold tracking-tight text-text sm:text-xl">
                    {item.organization}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-primary sm:text-base">{item.role}</p>
                  <p className="mt-1 text-sm text-muted">{item.period}</p>
                </div>
                <span className="shrink-0 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                  {item.employmentType}
                </span>
              </header>

              {item.sections.length > 0 && (
                <div className="mt-6 space-y-5">
                  {item.sections.map((section) => (
                    <div key={section.title}>
                      <h4 className="text-sm font-semibold text-text sm:text-base">{section.title}</h4>
                      <ul className="mt-2.5 space-y-2">
                        {section.points.map((point) => (
                          <li
                            key={point}
                            className="flex items-start gap-3 text-sm text-text sm:text-base"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                            <span className="break-keep leading-relaxed">{highlightMetrics(point)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
