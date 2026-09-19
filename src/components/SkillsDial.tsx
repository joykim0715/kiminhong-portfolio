"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { type SkillItem } from "@/data/content";
import { useSiteContent } from "./ContentProvider";
import KineticGlyph, { type GlyphKind } from "./ui/KineticGlyph";

const SKILL_GLYPH: Record<string, GlyphKind> = {
  oa: "oa",
  data: "data",
  viz: "viz",
  ai: "ai",
};

const RING_CIRCUMFERENCE = 2 * Math.PI * 52;
const NAV_OFFSET = 64;
const SKILLS_SCROLL_VH = 0.96;
const SKILLS_SCROLL_VH_MOBILE = 0.84;

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
      className="skill-ring relative mx-auto w-[248px] transition-[filter] duration-300 sm:w-[270px] lg:w-[282px] xl:w-[300px] hover:drop-shadow-[0_8px_18px_rgba(95,168,163,0.28)]"
      style={{ aspectRatio: "1" }}
    >
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full -rotate-90 overflow-visible"
        viewBox="0 0 120 120"
        aria-hidden="true"
      >
        <circle
          cx="60"
          cy="60"
          r="52"
          fill="none"
          className="stroke-primary/18"
          strokeWidth="4"
        />
        <circle
          ref={ringGlowRef}
          cx="60"
          cy="60"
          r="52"
          fill="none"
          className="stroke-primary/40"
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeDasharray={RING_CIRCUMFERENCE}
          strokeDashoffset={RING_CIRCUMFERENCE}
        />
        <circle
          ref={ringRef}
          cx="60"
          cy="60"
          r="52"
          fill="none"
          className="stroke-primary"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={RING_CIRCUMFERENCE}
          strokeDashoffset={RING_CIRCUMFERENCE}
        />
      </svg>

      <div className="absolute inset-0 overflow-visible px-3 sm:px-4">
        <div className="absolute inset-x-3 top-[6%] flex h-8 items-center justify-center sm:inset-x-4 sm:top-[7%] sm:h-9">
          <span className="px-1 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-primary sm:text-xs">
            {skill.category}
          </span>
        </div>
        <div className="absolute left-1/2 top-[18%] h-16 w-16 -translate-x-1/2 text-primary sm:top-[19%] sm:h-20 sm:w-20 lg:h-[5.5rem] lg:w-[5.5rem]">
          <KineticGlyph kind={SKILL_GLYPH[skill.id] ?? "data"} />
        </div>
        <div className="absolute inset-x-2 top-[50%] flex flex-col items-center text-center sm:inset-x-3 sm:top-[51%]">
          <span className="px-1 text-[12px] font-medium leading-snug text-muted sm:text-[13px] lg:text-sm">
            {skill.tools}
          </span>
          <ul className="mt-1.5 w-full max-w-[13.5rem] space-y-0.5 sm:mt-2 sm:max-w-[15rem]">
            {skill.details.map((detail) => (
              <li key={detail} className="text-preline text-[10px] leading-snug text-muted sm:text-[11px]">
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function SkillsDial() {
  const skillsContent = useSiteContent().skills;
  const skills = skillsContent.items;
  const sectionRef = useRef<HTMLElement>(null);
  const pinZoneRef = useRef<HTMLDivElement>(null);
  const pinPanelRef = useRef<HTMLDivElement>(null);
  const ringRefs = useRef<(SVGCircleElement | null)[]>([]);
  const ringGlowRefs = useRef<(SVGCircleElement | null)[]>([]);
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const pinZone = pinZoneRef.current;
    const pinPanel = pinPanelRef.current;
    if (!section || !pinZone || !pinPanel) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const rings = ringRefs.current.filter(Boolean) as SVGCircleElement[];
      const ringGlows = ringGlowRefs.current.filter(Boolean) as SVGCircleElement[];
      const circles = circleRefs.current.filter(Boolean) as HTMLDivElement[];

      const setRingProgress = (ring: SVGCircleElement, proficiency: number) => {
        gsap.set(ring, { strokeDashoffset: RING_CIRCUMFERENCE * (1 - proficiency) });
      };

      if (prefersReduced) {
        gsap.set(circles, { opacity: 1, scale: 1 });
        rings.forEach((ring, i) => setRingProgress(ring, skills[i].proficiency / 100));
        ringGlows.forEach((ring, i) => setRingProgress(ring, skills[i].proficiency / 100));
        return;
      }

      gsap.set(circles, { opacity: 0, scale: 0.96 });
      rings.forEach((ring) => gsap.set(ring, { strokeDashoffset: RING_CIRCUMFERENCE }));
      ringGlows.forEach((ring) => gsap.set(ring, { strokeDashoffset: RING_CIRCUMFERENCE }));

      const fadeStagger = 0.16;
      const ringStagger = 0.16;
      const fadeDuration = 0.35;
      const ringDuration = 0.42;
      const ringPhaseStart = circles.length * fadeStagger + 0.12;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinZone,
          start: `top ${NAV_OFFSET}px`,
          end: () =>
            `+=${window.innerHeight * (window.innerWidth < 768 ? SKILLS_SCROLL_VH_MOBILE : SKILLS_SCROLL_VH)}`,
          pin: pinPanel,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.95,
          invalidateOnRefresh: true,
        },
      });

      circles.forEach((circle, i) => {
        tl.to(
          circle,
          { opacity: 1, scale: 1, duration: fadeDuration, ease: "power2.out" },
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

    const observer = new IntersectionObserver(([entry]) => {
      section.dataset.motionVisible = String(entry.isIntersecting);
    });
    observer.observe(section);

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, [skills]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      aria-labelledby="skills-heading"
      className="relative z-[1] overflow-x-hidden bg-bg py-12 text-text sm:py-16"
    >
      <div className="section-container">
        <div ref={pinZoneRef}>
          <div ref={pinPanelRef} className="skills-pin-panel bg-bg py-2 sm:py-4">
            <div className="skills-heading text-center lg:text-left">
              <p className="section-eyebrow text-primary">{skillsContent.sectionLabel}</p>
              <h2 id="skills-heading" className="section-title mt-3 tracking-tight">
                {skillsContent.title}
              </h2>
              <p className="section-body mx-auto mt-4 max-w-xl break-keep text-muted lg:mx-0">
                {skillsContent.description}
              </p>
            </div>

            <div className="skills-rings-grid mt-8 grid grid-cols-1 justify-items-center gap-6 sm:mt-9 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-6 xl:gap-8">
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
      </div>
    </section>
  );
}
