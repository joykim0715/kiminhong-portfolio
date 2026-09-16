"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/animations";
import { fadeRevealOnScroll } from "@/lib/scrollInteractions";
import { useSiteContent } from "./ContentProvider";
import HoverLift from "./ui/HoverLift";

const METRIC_RE = /^\d+\.?\d*만\s*건$|^\d+k$|^\d+%$|^\d+건$|^\d+명$/;

function highlightMetrics(text: string) {
  const parts = text.split(/(\d+\.?\d*만\s*건|\d+k|\d+%|\d+건|\d+명)/g);
  return parts.map((part, i) =>
    METRIC_RE.test(part) ? (
      <span
        key={i}
        className="experience-metric mx-0.5 inline-block rounded-sm bg-secondary/12 px-1.5 py-0.5 text-[0.95em] font-extrabold tabular-nums text-secondary sm:text-[1.05em]"
      >
        {part}
      </span>
    ) : (
      part
    ),
  );
}

export default function Experience() {
  const { experience: experienceContent } = useSiteContent();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      fadeRevealOnScroll(".experience-heading", section);

      const items = gsap.utils.toArray<HTMLElement>(".experience-item");
      const reduced = prefersReducedMotion();

      items.forEach((item) => {
        const role = item.querySelectorAll(".experience-role");
        const metrics = item.querySelectorAll(".experience-metric");
        const bullets = item.querySelectorAll(".experience-bullet");
        const sectionTitles = item.querySelectorAll(".experience-section");
        const body = [...sectionTitles, ...bullets];

        if (reduced) {
          gsap.set([role, metrics, body], { clearProps: "opacity,transform,visibility" });
          return;
        }

        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: item,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        });

        if (role.length) {
          tl.from(role, { opacity: 0, y: 8, duration: 0.28 }, 0);
        }

        if (body.length) {
          tl.from(body, { opacity: 0, y: 6, duration: 0.24, stagger: 0.035 }, 0.06);
        }

        if (metrics.length) {
          tl.from(
            metrics,
            { opacity: 0, scale: 0.96, duration: 0.2, stagger: 0.03, transformOrigin: "50% 50%" },
            0.1,
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      aria-labelledby="experience-heading"
      className="relative z-[1] bg-bg/82 py-16 text-text backdrop-blur-[2px] sm:py-24 lg:bg-bg lg:pb-10 lg:backdrop-blur-none"
    >
      <div className="section-container">
        <div className="experience-heading">
          <p className="section-eyebrow text-primary">{experienceContent.sectionLabel}</p>
          <h2 id="experience-heading" className="section-title mt-3 tracking-tight">
            {experienceContent.title}
          </h2>
        </div>

        <div className="mt-10 divide-y divide-border/70 border-y border-border/70">
          {experienceContent.items.map((item) => (
            <HoverLift key={`${item.organization}-${item.period}`}>
              <article className="experience-item rounded-lg py-7 transition-colors hover:bg-surface/60 sm:py-8">
              <header className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:gap-6">
                <div>
                  <h3 className="text-preline text-lg font-bold tracking-tight text-text sm:text-xl">
                    {item.organization}
                  </h3>
                  <p className="experience-role mt-1.5 text-xl font-semibold tracking-tight text-primary sm:text-[1.375rem]">
                    {item.role}
                  </p>
                  <p className="mt-1 text-sm text-muted">{item.period}</p>
                </div>
                <span className="w-fit shrink-0 border border-border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                  {item.employmentType}
                </span>
              </header>

              {item.sections.length > 0 && (
                <div className="mt-5 space-y-5 border-l border-accent/35 pl-4 sm:mt-6 sm:pl-5">
                  {item.sections.map((section) => (
                    <div key={section.title}>
                      <h4 className="experience-section text-preline text-sm font-semibold text-text sm:text-base">
                        {section.title}
                      </h4>
                      <ul className="mt-2.5 space-y-2">
                        {section.points.map((point) => (
                          <li
                            key={point}
                            className="experience-bullet flex items-start gap-3 text-sm text-text sm:text-base"
                          >
                            <span
                              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                              aria-hidden
                            />
                            <span className="text-preline break-keep leading-relaxed">
                              {highlightMetrics(point)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </article>
            </HoverLift>
          ))}
        </div>
      </div>
    </section>
  );
}
