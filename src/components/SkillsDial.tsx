"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { fadeRevealOnScroll } from "@/lib/scrollInteractions";
import { skillsContent } from "@/data/skills";

export default function SkillsDial() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      fadeRevealOnScroll(".skills-heading", section);
      fadeRevealOnScroll(".skill-group", section, { stagger: 0.12, start: "top 82%" });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative z-[1] bg-bg py-8 text-text sm:py-16">
      <div className="section-container py-16">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="skills-heading lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              {skillsContent.sectionLabel}
            </p>
            <h2 className="section-title mt-3 tracking-tight">{skillsContent.title}</h2>
            <p className="mt-6 break-keep text-base leading-relaxed text-muted sm:text-lg">
              {skillsContent.description}
            </p>
          </div>

          <div className="space-y-5">
            {skillsContent.groups.map((group) => (
              <div
                key={group.label}
                className="skill-group rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6"
              >
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">{group.label}</h3>
                <p className="mt-3 break-keep text-sm leading-relaxed text-muted sm:text-base">
                  {group.summary}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="inline-flex h-7 items-center rounded-full border border-border bg-bg px-3 text-[13px] leading-none text-text"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
