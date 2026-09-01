"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { fadeRevealOnScroll } from "@/lib/scrollInteractions";
import { useSiteContent } from "./ContentProvider";
import HoverLift from "./ui/HoverLift";

export default function Education() {
  const { education: educationContent } = useSiteContent();
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
          <p className="section-eyebrow text-primary">{educationContent.sectionLabel}</p>
          <h2 id="education-heading" className="section-title mt-3 tracking-tight">
            {educationContent.title}
          </h2>
        </div>

        <div className="relative mt-10 space-y-8 sm:space-y-10">
          <div className="absolute bottom-2 left-[5px] top-2 w-px bg-border sm:left-[6px]" aria-hidden />
          {educationContent.items.map((item) => (
            <HoverLift key={item.school} axis="x">
            <article className="education-item relative pl-7 sm:pl-9">
              <span
                className="absolute left-0 top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-bg sm:top-2"
                aria-hidden
              />
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h3 className="text-lg font-bold tracking-tight text-text sm:text-xl">{item.school}</h3>
                <p className="shrink-0 text-sm text-muted">{item.period}</p>
              </div>
              <p className="mt-2 text-preline break-keep text-base font-medium text-primary sm:text-lg">
                {item.major}
              </p>
            </article>
            </HoverLift>
          ))}
        </div>
      </div>
    </section>
  );
}
