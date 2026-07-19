"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { fadeRevealOnScroll } from "@/lib/scrollInteractions";
import { siteContent } from "@/data/content";
import { useRecruitSafe } from "./RecruitSafeProvider";
import HeroPortrait from "./HeroPortrait";

const { story: storyContent, hero: heroContent } = siteContent;

export default function StorySection() {
  const recruitSafe = useRecruitSafe();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      fadeRevealOnScroll(".story-text", section, { stagger: 0.12 });
      if (!recruitSafe) {
        fadeRevealOnScroll(".story-portrait", section, { start: "top 82%" });
      }
    }, section);

    return () => ctx.revert();
  }, [recruitSafe]);

  return (
    <section
      id="story"
      ref={sectionRef}
      aria-labelledby="story-heading"
      className="relative z-[1] -mt-px bg-dark py-16 text-white sm:py-24"
    >
      <div className="section-container">
        <div
          className={
            recruitSafe
              ? "mx-auto max-w-2xl"
              : "grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16"
          }
        >
          <div className="story-text space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary-light">
              {storyContent.sectionLabel}
            </p>
            <h2 id="story-heading" className="section-title tracking-tight">
              {storyContent.title}
            </h2>
            {storyContent.paragraphs.map((p) => (
              <p key={p} className="break-keep text-base text-white/75 sm:text-lg">
                {p}
              </p>
            ))}
          </div>

          {!recruitSafe && heroContent.profileGallery?.length ? (
            <div className="story-portrait flex justify-center lg:justify-end">
              <HeroPortrait images={heroContent.profileGallery} hint={heroContent.profileHint} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
