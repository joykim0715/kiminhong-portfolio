"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/animations";
import { parallaxFadeOnScroll } from "@/lib/scrollInteractions";
import { siteContent } from "@/data/content";
import Button from "./ui/Button";
import GradientMesh from "./ui/GradientMesh";
import HeroBackground from "./HeroBackground";
import HeroPortrait from "./HeroPortrait";

export default function Hero() {
  const { hero } = siteContent;
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        parallaxFadeOnScroll(headingRef.current, section, {
          y: 32,
          opacity: 1,
          start: "top top",
          end: "bottom top",
        });
      }
      if (photoRef.current) {
        gsap.to(photoRef.current, {
          y: -24,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative z-[1] flex min-h-screen flex-col overflow-hidden pt-16 text-text"
    >
      <div className="absolute inset-0 z-0">
        <HeroBackground />
        <GradientMesh />
      </div>

      <div className="section-container relative z-10 grid flex-1 items-center gap-12 py-12 lg:grid-cols-2 lg:gap-16 lg:py-20">
        <div ref={headingRef} className="hero-heading max-w-5xl">
          <h1 className="hero-name hero-title text-gradient w-full text-left tracking-tight">{hero.name}</h1>

          <p className="hero-desc-line mt-6 text-xs font-medium uppercase tracking-[0.35em] text-primary sm:text-sm">
            {hero.tagline}
          </p>
          <p className="hero-desc-line mt-4 text-xl font-medium tracking-tight text-text sm:text-2xl lg:text-3xl">
            {hero.headline}
          </p>
          <p className="hero-desc-line mt-4 max-w-2xl break-keep text-base leading-relaxed text-muted sm:text-lg">
            {hero.bio}
          </p>

          <div className="hero-cta mt-10">
            {/* TODO: 실제 이력서 PDF 경로로 교체 필요 */}
            <Button href={hero.resumeUrl} target="_blank" rel="noopener noreferrer">
              {hero.resumeCtaLabel}
            </Button>
          </div>
        </div>

        <div ref={photoRef} className="flex justify-center lg:justify-end">
          {hero.profileGallery?.length ? (
            <HeroPortrait images={hero.profileGallery} hint={hero.profileHint} />
          ) : (
            <div className="flex h-[460px] w-[400px] flex-col items-center justify-center gap-2 rounded-[58%_42%_52%_48%/46%_54%_46%_54%] bg-surface text-muted">
              <span className="px-4 text-center text-xs">{hero.noProfileImage}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
