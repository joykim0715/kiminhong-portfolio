"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { fadeRevealOnScroll } from "@/lib/scrollInteractions";
import type { ExperienceItem } from "@/data/content";
import { useSiteContent } from "./ContentProvider";
import HoverLift from "./ui/HoverLift";
import styles from "./Experience.module.css";

function hasMetrics(item: ExperienceItem): item is ExperienceItem & {
  metrics: NonNullable<ExperienceItem["metrics"]>;
} {
  return (item.metrics?.length ?? 0) > 0;
}

const CIRCLED_INDEX = /^[①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮]\s*/u;

function displaySectionTitle(title: string) {
  return title.replace(CIRCLED_INDEX, "");
}

function FeaturedExperience({
  item,
  metricsLabel,
}: {
  item: ExperienceItem & { metrics: NonNullable<ExperienceItem["metrics"]> };
  metricsLabel: string;
}) {
  return (
    <article className={`experience-item ${styles.featured}`}>
      <header className={styles.identity}>
        <h3 className={`text-preline ${styles.org}`}>{item.organization}</h3>
        <p className={`text-preline ${styles.role}`}>{item.role}</p>
        <p className={styles.meta}>
          <span>{item.period}</span>
          <span className={styles.metaDot} aria-hidden>
            ·
          </span>
          <span>{item.employmentType}</span>
        </p>
      </header>

      <ul className={styles.metricRow} aria-label={metricsLabel}>
        {item.metrics.map((metric) => (
          <li key={`${metric.value}-${metric.label}`} className={styles.metric}>
            <p className={styles.metricValue}>{metric.value}</p>
            <p className={`break-keep ${styles.metricLabel}`}>{metric.label}</p>
          </li>
        ))}
      </ul>

      {item.sections.length > 0 ? (
        <div className={styles.axes}>
          {item.sections.map((section, index) => (
            <div key={section.title} className={styles.axis}>
              <span className={styles.axisIndex} aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h4 className={`text-preline ${styles.axisTitle}`}>
                  {displaySectionTitle(section.title)}
                </h4>
                <ul className={styles.points}>
                  {section.points.map((point) => (
                    <li key={point} className={styles.point}>
                      <span className={styles.pointMark} aria-hidden />
                      <span className={`text-preline break-keep ${styles.pointText}`}>
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </article>
  );
}

function CompactExperience({ item }: { item: ExperienceItem }) {
  return (
    <HoverLift>
      <article className={`experience-item ${styles.compactRow}`}>
        <h4 className={styles.compactOrg}>{item.organization}</h4>
        <p className={styles.compactRole}>{item.role}</p>
        <p className={styles.compactMeta}>
          <span className={styles.compactPeriod}>{item.period}</span>
          <span className={styles.compactDot} aria-hidden>
            ·
          </span>
          <span className={styles.compactType}>{item.employmentType}</span>
        </p>
      </article>
    </HoverLift>
  );
}

export default function Experience() {
  const { experience: experienceContent } = useSiteContent();
  const sectionRef = useRef<HTMLElement>(null);
  const featured = experienceContent.items.filter(hasMetrics);
  const secondary = experienceContent.items.filter((item) => !hasMetrics(item));

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
      className="relative z-[1] bg-bg/82 py-16 text-text backdrop-blur-[2px] sm:py-24 lg:bg-bg lg:pb-10 lg:backdrop-blur-none"
    >
      <div className="section-container">
        <div className="experience-heading">
          <p className="section-eyebrow text-primary">{experienceContent.sectionLabel}</p>
          <h2 id="experience-heading" className="section-title mt-3 tracking-tight">
            {experienceContent.title}
          </h2>
        </div>

        <div className="mt-10">
          {featured.map((item) => (
            <FeaturedExperience
              key={`${item.organization}-${item.period}`}
              item={item}
              metricsLabel={experienceContent.metricsLabel}
            />
          ))}

          {secondary.length > 0 ? (
            <div className={styles.other}>
              <h3 className={styles.otherHeading}>{experienceContent.otherLabel}</h3>
              <div className={styles.compactList}>
                {secondary.map((item) => (
                  <CompactExperience key={`${item.organization}-${item.period}`} item={item} />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
