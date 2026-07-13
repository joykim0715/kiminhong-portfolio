"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { fadeRevealOnScroll } from "@/lib/scrollInteractions";
import { siteContent } from "@/data/content";

const { caseStudy } = siteContent;

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

export default function CaseStudy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      fadeRevealOnScroll(".case-study-heading", section);
      fadeRevealOnScroll(".case-study-metrics", section, { start: "top 84%" });
      fadeRevealOnScroll(".case-study-meta", section, { stagger: 0.06, start: "top 84%" });
      fadeRevealOnScroll(".case-study-block", section, { stagger: 0.1, start: "top 86%" });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="case-study"
      ref={sectionRef}
      aria-labelledby="case-study-heading"
      className="relative z-[1] bg-surface/40 py-16 text-text backdrop-blur-[2px] sm:py-24"
    >
      <div className="section-container">
        <div className="case-study-heading max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
            {caseStudy.sectionLabel}
          </p>
          <h2 id="case-study-heading" className="section-title mt-3 tracking-tight">
            {caseStudy.title}
          </h2>
          <p className="mt-4 break-keep text-base leading-relaxed text-muted sm:text-lg">
            {caseStudy.subtitle}
          </p>
        </div>

        <dl className="case-study-meta mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {caseStudy.meta.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-border bg-bg/80 px-4 py-3"
            >
              <dt className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                {item.label}
              </dt>
              <dd className="mt-1.5 text-sm font-medium leading-snug text-text sm:text-base">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="case-study-metrics mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {caseStudy.metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl border border-primary/20 bg-bg px-4 py-5 text-center shadow-sm sm:px-5 sm:py-6"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
                {metric.label}
              </p>
              <p className="mt-2 text-2xl font-black tracking-tight text-secondary sm:text-3xl">
                {metric.value}
              </p>
              {metric.note ? (
                <p className="mt-1.5 text-xs text-muted">{metric.note}</p>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-10 space-y-5">
          {caseStudy.blocks.map((block, index) => (
            <article
              key={block.id}
              className="case-study-block rounded-2xl border border-border bg-bg p-5 shadow-sm sm:p-6"
            >
              <div className="flex items-baseline gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/12 text-sm font-bold text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg font-bold tracking-tight text-text sm:text-xl">{block.title}</h3>
                  {block.summary ? (
                    <p className="mt-2 break-keep text-sm leading-relaxed text-muted sm:text-base">
                      {block.summary}
                    </p>
                  ) : null}
                </div>
              </div>

              <ul className="mt-5 space-y-2.5 border-t border-border pt-5">
                {block.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3 text-sm text-text sm:text-base">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    <span className="break-keep leading-relaxed">{highlightMetrics(bullet)}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
