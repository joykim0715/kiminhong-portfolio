"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { fadeRevealOnScroll } from "@/lib/scrollInteractions";
import { siteContent, type SkillItem } from "@/data/content";

const skillsContent = siteContent.skills;
const skills = skillsContent.items;
const RING_CIRCUMFERENCE = 2 * Math.PI * 52;
const NAV_OFFSET = 64;
const SKILLS_SCROLL_VH = 1.5;

type SkillRingProps = {
  skill: SkillItem;
  ringRef: (el: SVGCircleElement | null) => void;
  ringGlowRef: (el: SVGCircleElement | null) => void;
  circleRef: (el: HTMLDivElement | null) => void;
};

function SkillRing({ skill, ringRef, ringGlowRef, circleRef }: SkillRingProps) {
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
        <defs>
          <filter id={`skill-ring-glow-${skill.id}`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle
          cx="60"
          cy="60"
          r="52"
          fill="none"
          className="stroke-primary/20"
          strokeWidth="6"
        />
        <circle
          ref={ringGlowRef}
          cx="60"
          cy="60"
          r="52"
          fill="none"
          className="stroke-secondary/70"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={RING_CIRCUMFERENCE}
          strokeDashoffset={RING_CIRCUMFERENCE}
          filter={`url(#skill-ring-glow-${skill.id})`}
        />
        <circle
          ref={ringRef}
          cx="60"
          cy="60"
          r="52"
          fill="none"
          className="stroke-secondary"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={RING_CIRCUMFERENCE}
          strokeDashoffset={RING_CIRCUMFERENCE}
        />
      </svg>

      <div
        className="absolute flex flex-col items-center px-3 text-center"
        style={{ inset: "14px" }}
      >
        <div className="flex h-9 w-full shrink-0 items-center justify-center sm:h-10">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-primary sm:text-xs">
            {skill.category}
          </span>
        </div>
        <div className="mt-1 w-full shrink-0 px-1">
          <span className="text-base font-bold leading-tight text-text sm:text-lg">{skill.tools}</span>
        </div>
        <ul className="mt-2 w-full space-y-0.5">
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
  const pinZoneRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ringRefs = useRef<(SVGCircleElement | null)[]>([]);
  const ringGlowRefs = useRef<(SVGCircleElement | null)[]>([]);
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const pinZone = pinZoneRef.current;
    const grid = gridRef.current;
    if (!section || !pinZone || !grid) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      fadeRevealOnScroll(".skills-heading", section);

      const rings = ringRefs.current.filter(Boolean) as SVGCircleElement[];
      const ringGlows = ringGlowRefs.current.filter(Boolean) as SVGCircleElement[];
      const circles = circleRefs.current.filter(Boolean) as HTMLDivElement[];

      const setRingProgress = (ring: SVGCircleElement, proficiency: number) => {
        gsap.set(ring, { strokeDashoffset: RING_CIRCUMFERENCE * (1 - proficiency) });
      };

      if (prefersReduced) {
        gsap.set(circles, { opacity: 1, y: 0, scale: 1 });
        rings.forEach((ring, i) => setRingProgress(ring, skills[i].proficiency / 100));
        ringGlows.forEach((ring, i) => setRingProgress(ring, skills[i].proficiency / 100));
        return;
      }

      gsap.set(circles, { opacity: 0, y: 56, scale: 0.88 });
      rings.forEach((ring) => gsap.set(ring, { strokeDashoffset: RING_CIRCUMFERENCE }));
      ringGlows.forEach((ring) => gsap.set(ring, { strokeDashoffset: RING_CIRCUMFERENCE }));

      const fadeStagger = 0.2;
      const ringStagger = 0.18;
      const fadeDuration = 0.3;
      const ringDuration = 0.38;
      const ringPhaseStart = circles.length * fadeStagger + 0.15;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinZone,
          start: `top ${NAV_OFFSET}px`,
          end: () => `+=${window.innerHeight * SKILLS_SCROLL_VH}`,
          pin: grid,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.85,
          invalidateOnRefresh: true,
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
        const target = RING_CIRCUMFERENCE * (1 - proficiency);
        const at = ringPhaseStart + i * ringStagger;
        tl.to(ring, { strokeDashoffset: target, duration: ringDuration, ease: "power2.out" }, at);
        if (ringGlows[i]) {
          tl.to(ringGlows[i], { strokeDashoffset: target, duration: ringDuration, ease: "power2.out" }, at);
        }
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

        <div ref={pinZoneRef} className="mt-12">
          <div
            ref={gridRef}
            className="skills-pin-panel skills-rings-grid grid grid-cols-1 justify-items-center gap-8 bg-bg py-4 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:gap-8 xl:gap-10"
          >
            {skills.map((skill, i) => (
              <SkillRing
                key={skill.id}
                skill={skill}
                ringRef={(el) => {
                  ringRefs.current[i] = el;
                }}
                ringGlowRef={(el) => {
                  ringGlowRefs.current[i] = el;
                }}
                circleRef={(el) => {
                  circleRefs.current[i] = el;
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
