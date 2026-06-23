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
      className="skill-ring relative mx-auto w-[240px] sm:w-[260px] lg:w-[280px]"
      style={{ aspectRatio: "1" }}
    >
      <svg
        className="absolute inset-0 h-full w-full -rotate-90"
        viewBox="0 0 120 120"
        aria-hidden="true"
      >
        <circle
          cx="60"
          cy="60"
          r="52"
          fill="none"
          className="stroke-primary/15"
          strokeWidth="5"
        />
        <circle
          ref={ringRef}
          cx="60"
          cy="60"
          r="52"
          fill="none"
          className="stroke-primary"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={RING_CIRCUMFERENCE}
          strokeDashoffset={RING_CIRCUMFERENCE}
        />
      </svg>

      <div
        className="absolute flex flex-col items-center justify-center gap-1.5 rounded-full border border-primary/10 bg-surface/90 p-5 text-center shadow-sm sm:gap-2 sm:p-6"
        style={{ inset: "14px" }}
      >
        <span className="text-[10px] font-semibold uppercase tracking-widest text-primary sm:text-xs">
          {skill.category}
        </span>
        <span className="text-base font-bold leading-tight text-text sm:text-lg">{skill.tools}</span>
        <ul className="mt-1 space-y-0.5">
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
  const gridRef = useRef<HTMLDivElement>(null);
  const ringRefs = useRef<(SVGCircleElement | null)[]>([]);
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      fadeRevealOnScroll(".skills-heading", section);

      const rings = ringRefs.current.filter(Boolean) as SVGCircleElement[];
      const circles = circleRefs.current.filter(Boolean) as HTMLDivElement[];

      if (prefersReduced) {
        gsap.set(circles, { opacity: 1, y: 0, scale: 1 });
        rings.forEach((ring, i) => {
          const proficiency = skills[i].proficiency / 100;
          gsap.set(ring, { strokeDashoffset: RING_CIRCUMFERENCE * (1 - proficiency) });
        });
        return;
      }

      gsap.set(circles, { opacity: 0, y: 56, scale: 0.88 });
      rings.forEach((ring) => gsap.set(ring, { strokeDashoffset: RING_CIRCUMFERENCE }));

      const fadeStagger = 0.18;
      const ringStagger = 0.14;
      const fadeDuration = 0.28;
      const ringDuration = 0.32;
      const ringPhaseStart = circles.length * fadeStagger + 0.12;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: grid,
          start: "top 82%",
          end: "bottom 35%",
          scrub: 0.85,
        },
      });

      circles.forEach((circle, i) => {
        tl.to(
          circle,
          { opacity: 1, y: 0, scale: 1, duration: fadeDuration, ease: "power2.out" },
          i * fadeStagger,
        );
      });

      rings.forEach((ring, i) => {
        const proficiency = skills[i].proficiency / 100;
        tl.to(
          ring,
          {
            strokeDashoffset: RING_CIRCUMFERENCE * (1 - proficiency),
            duration: ringDuration,
            ease: "power2.out",
          },
          ringPhaseStart + i * ringStagger,
        );
      });
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

        <div
          ref={gridRef}
          className="skills-rings-grid mt-12 grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:gap-8 xl:gap-10"
        >
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
