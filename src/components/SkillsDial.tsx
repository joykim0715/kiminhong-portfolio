"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { fadeRevealOnScroll } from "@/lib/scrollInteractions";
import { siteContent, type SkillItem } from "@/data/content";

const skillsContent = siteContent.skills;
const skills = skillsContent.items;
const RING_CIRCUMFERENCE = 2 * Math.PI * 52;

type SkillRingProps = {
  skill: SkillItem;
  ringRef: (el: SVGCircleElement | null) => void;
  circleRef: (el: HTMLDivElement | null) => void;
};

function SkillRing({ skill, ringRef, circleRef }: SkillRingProps) {
  return (
    <div
      ref={circleRef}
      className="skill-ring relative mx-auto w-[180px] sm:w-[200px] lg:w-[220px]"
      style={{ aspectRatio: "1" }}
    >
      <svg
        className="absolute inset-0 h-full w-full -rotate-90 text-text"
        viewBox="0 0 120 120"
        aria-hidden="true"
      >
        <circle
          cx="60"
          cy="60"
          r="52"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.12"
          strokeWidth="5"
        />
        <circle
          ref={ringRef}
          cx="60"
          cy="60"
          r="52"
          fill="none"
          className="stroke-accent"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={RING_CIRCUMFERENCE}
          strokeDashoffset={RING_CIRCUMFERENCE}
        />
      </svg>

      <div
        className="absolute flex flex-col items-center justify-center gap-1 rounded-full bg-surface/80 p-4 text-center sm:p-5"
        style={{ inset: "12px" }}
      >
        <span className="text-[10px] font-medium uppercase tracking-widest text-muted sm:text-xs">
          {skill.category}
        </span>
        <span className="text-xs font-bold leading-tight text-text sm:text-sm">{skill.tools}</span>
        <ul className="mt-1.5 space-y-0.5">
          {skill.details.map((detail) => (
            <li key={detail} className="text-[10px] leading-snug text-muted sm:text-xs">
              · {detail}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function SkillsDial() {
  const sectionRef = useRef<HTMLElement>(null);
  const ringRefs = useRef<(SVGCircleElement | null)[]>([]);
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      fadeRevealOnScroll(".skills-heading", section);

      ringRefs.current.forEach((ring, i) => {
        if (!ring) return;

        const proficiency = skills[i].proficiency / 100;
        const targetOffset = RING_CIRCUMFERENCE * (1 - proficiency);

        gsap.to(ring, {
          strokeDashoffset: targetOffset,
          duration: prefersReduced ? 0 : 1.4,
          ease: "power3.out",
          delay: prefersReduced ? 0 : i * 0.15,
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
            once: true,
          },
        });
      });

      if (!prefersReduced) {
        gsap.from(circleRefs.current.filter(Boolean), {
          opacity: 0,
          y: 30,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
            once: true,
          },
        });
      } else {
        ringRefs.current.forEach((ring, i) => {
          if (!ring) return;
          const proficiency = skills[i].proficiency / 100;
          gsap.set(ring, { strokeDashoffset: RING_CIRCUMFERENCE * (1 - proficiency) });
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      aria-labelledby="skills-heading"
      className="relative z-[1] overflow-hidden bg-bg py-16 text-text sm:py-24"
    >
      <div className="section-container">
        <div className="skills-heading text-center lg:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
            {skillsContent.sectionLabel}
          </p>
          <h2 id="skills-heading" className="section-title mt-3 tracking-tight">
            {skillsContent.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl break-keep text-base leading-relaxed text-muted sm:text-lg lg:mx-0">
            {skillsContent.description}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-6 xl:gap-8">
          {skills.map((skill, i) => (
            <SkillRing
              key={skill.id}
              skill={skill}
              ringRef={(el) => {
                ringRefs.current[i] = el;
              }}
              circleRef={(el) => {
                circleRefs.current[i] = el;
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
