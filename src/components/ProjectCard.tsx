"use client";

import { siteContent } from "@/data/content";
import type { Work } from "@/data/content";
import { getWorkImages } from "@/lib/workImages";
import ProjectImages from "./ProjectImages";

const { works } = siteContent;

type ProjectCardProps = {
  work: Work;
  onClick: () => void;
  className?: string;
  /** Smaller layout with text above preview — for desktop stack */
  compact?: boolean;
};

export default function ProjectCard({ work, onClick, className = "", compact = false }: ProjectCardProps) {
  const images = getWorkImages(work);

  if (compact) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`gallery-card group flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface text-left text-text opacity-100 transition-all duration-300 hover:scale-[1.02] hover:border-accent hover:shadow-xl ${className}`}
      >
        <div className="border-b border-border px-5 py-4 text-center sm:px-6">
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-primary">{work.category}</p>
          <h3 className="mt-1.5 text-base font-bold tracking-tight text-text sm:text-lg">{work.title}</h3>
          <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-secondary">
            {works.openHint}
          </p>
        </div>
        <div className="relative aspect-[5/3] overflow-hidden bg-dark-surf transform-gpu will-change-transform">
          <ProjectImages
            images={images}
            alt={work.title}
            sizes="(max-width: 768px) 100vw, 36vw"
            imageClassName="object-contain sharp-image transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`gallery-card group flex w-full flex-col overflow-hidden rounded-3xl border border-border bg-surface text-left text-text opacity-100 transition-all duration-300 hover:scale-[1.02] hover:border-accent hover:shadow-xl ${className}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-dark-surf transform-gpu will-change-transform">
        <ProjectImages
          images={images}
          alt={work.title}
          sizes="(max-width: 768px) 100vw, 40vw"
          imageClassName="object-contain sharp-image transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="border-t border-border p-5 text-center sm:p-6">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-primary">{work.category}</p>
        <h3 className="mt-2 text-lg font-bold tracking-tight text-text sm:text-xl">{work.title}</h3>
        <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary">
          {works.openHint}
        </p>
      </div>
    </button>
  );
}
