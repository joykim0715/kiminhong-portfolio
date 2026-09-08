"use client";

import type { Work } from "@/data/content";
import { getWorkImages } from "@/lib/workImages";
import { useSiteContent } from "./ContentProvider";
import ProjectImages from "./ProjectImages";
import DeviceMockup from "./ui/DeviceMockup";
import FrostGlassHover from "./ui/FrostGlassHover";

type ProjectCardProps = {
  work: Work;
  onClick: () => void;
  className?: string;
  /** Smaller layout with text above preview — for desktop stack */
  compact?: boolean;
};

export default function ProjectCard({ work, onClick, className = "", compact = false }: ProjectCardProps) {
  const { works } = useSiteContent();
  const images = getWorkImages(work);

  if (compact) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`gallery-card group flex w-full flex-col overflow-hidden rounded-xl border border-border bg-surface text-left text-text opacity-100 transition-[border-color,box-shadow] duration-300 hover:border-primary/40 hover:shadow-[0_16px_40px_-24px_rgba(95,168,163,0.55)] ${className}`}
      >
        <div className="border-b border-border px-5 py-4 text-center sm:px-6">
          <p className="section-meta text-primary">{work.category}</p>
          <h3 className="text-preline mt-1.5 text-base font-bold tracking-tight text-text sm:text-lg">
            {work.title}
          </h3>
          <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
            {works.openHint}
          </p>
        </div>
        <div className="relative aspect-[5/3] overflow-hidden bg-dark-surf p-3 sm:p-4">
          <DeviceMockup>
            <FrostGlassHover>
              <ProjectImages
                images={images}
                alt={work.title}
                sizes="(max-width: 768px) 100vw, 36vw"
                imageClassName="object-contain sharp-image"
              />
            </FrostGlassHover>
          </DeviceMockup>
        </div>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`gallery-card group flex w-full flex-col overflow-hidden rounded-xl border border-border bg-surface text-left text-text opacity-100 transition-[border-color,box-shadow] duration-300 hover:border-primary/40 hover:shadow-[0_16px_40px_-24px_rgba(95,168,163,0.55)] ${className}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-dark-surf p-3 sm:p-4">
        <DeviceMockup>
          <FrostGlassHover>
            <ProjectImages
              images={images}
              alt={work.title}
              sizes="(max-width: 768px) 100vw, 40vw"
              imageClassName="object-contain sharp-image"
            />
          </FrostGlassHover>
        </DeviceMockup>
      </div>
      <div className="border-t border-border p-5 text-center sm:p-6">
        <p className="section-meta text-primary">{work.category}</p>
        <h3 className="text-preline mt-2 text-lg font-bold tracking-tight text-text sm:text-xl">
          {work.title}
        </h3>
        <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
          {works.openHint}
        </p>
      </div>
    </button>
  );
}
