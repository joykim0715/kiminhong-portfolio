"use client";

import type { Work } from "@/data/content";
import { getWorkImages } from "@/lib/workImages";
import ProjectImages from "./ProjectImages";
import DeviceMockup from "./ui/DeviceMockup";

type FeaturedWorkProps = {
  work: Work;
  label: string;
  ctaLabel: string;
  onOpen: () => void;
};

export default function FeaturedWork({ work, label, ctaLabel, onOpen }: FeaturedWorkProps) {
  const images = getWorkImages(work);
  const metrics = work.panel.metrics?.slice(0, 4) ?? [];
  const summary = work.panel.subtitle || work.description;

  return (
    <article className="featured-work">
      <p className="section-eyebrow text-secondary">{label}</p>

      <button
        type="button"
        onClick={onOpen}
        className="group mt-5 w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-dark-surf p-3 sm:aspect-[2/1] sm:p-5">
          <DeviceMockup variant="monitor">
            <div className="relative h-full w-full overflow-hidden">
              <ProjectImages
                images={images}
                alt={work.title}
                sizes="(max-width: 768px) 100vw, 1200px"
                imageClassName="object-cover sharp-image transition-transform duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                quality={95}
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dark/45 via-dark/8 to-transparent transition-opacity duration-500 group-hover:opacity-90"
                aria-hidden
              />
            </div>
          </DeviceMockup>
        </div>

        <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-end lg:gap-12">
          <div>
            <p className="section-meta text-primary">{work.category}</p>
            <h3 className="text-preline mt-2 text-[clamp(1.5rem,3.2vw,2.35rem)] font-bold tracking-tight text-text">
              {work.title}
            </h3>
            <p className="section-body text-preline mt-4 max-w-2xl break-keep text-muted">{summary}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-text transition-colors duration-300 group-hover:text-primary">
              {ctaLabel}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                <path
                  d="M7 17L17 7M17 7H9M17 7V15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>

          {metrics.length > 0 ? (
            <ul className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border/80 pt-5 sm:gap-x-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
              {metrics.map((metric) => (
                <li key={metric.label}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                    {metric.label}
                  </p>
                  <p className="mt-1 text-xl font-bold tabular-nums tracking-tight text-text sm:text-2xl">
                    {metric.value}
                  </p>
                  {metric.note ? (
                    <p className="mt-1 text-xs leading-snug text-muted">{metric.note}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </button>
    </article>
  );
}
