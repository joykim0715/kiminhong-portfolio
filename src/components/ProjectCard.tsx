"use client";

import Image from "next/image";
import type { Work } from "@/data/content";

type ProjectCardProps = {
  work: Work;
  onClick: () => void;
  className?: string;
  /** Smaller layout with text above preview — for desktop stack */
  compact?: boolean;
};

export default function ProjectCard({ work, onClick, className = "", compact = false }: ProjectCardProps) {
  if (compact) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`gallery-card group flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface text-left text-text opacity-100 ${className}`}
      >
        <div className="border-b border-border px-5 py-4 text-center sm:px-6">
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-primary">{work.category}</p>
          <h3 className="mt-1.5 text-base font-bold tracking-tight text-text sm:text-lg">{work.title}</h3>
        </div>
        <div className="relative flex aspect-[5/3] items-center justify-center overflow-hidden bg-dark-surf p-4 sm:p-5">
          {work.image ? (
            <div className="relative h-full w-full max-w-[65%]">
              <Image
                src={work.image}
                alt={work.title}
                fill
                className="object-contain transition duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 36vw"
              />
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br from-dark via-dark-surf to-secondary/40">
              <span className="text-[10px] uppercase tracking-[0.28em] text-muted">Preview</span>
            </div>
          )}
        </div>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`gallery-card group flex w-full flex-col overflow-hidden rounded-3xl border border-border bg-surface text-left text-text opacity-100 ${className}`}
    >
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-dark-surf p-6 sm:p-8">
        {work.image ? (
          <div className="relative h-full w-full max-w-[70%]">
            <Image
              src={work.image}
              alt={work.title}
              fill
              className="object-contain transition duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-dark via-dark-surf to-secondary/40">
            <span className="text-xs uppercase tracking-[0.3em] text-muted">Preview</span>
          </div>
        )}
      </div>
      <div className="border-t border-border p-5 text-center sm:p-6">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-primary">{work.category}</p>
        <h3 className="mt-2 text-lg font-bold tracking-tight text-text sm:text-xl">{work.title}</h3>
      </div>
    </button>
  );
}
