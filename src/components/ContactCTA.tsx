"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/animations";
import { revealOnScroll } from "@/lib/scrollReveal";
import { mailtoHref, shouldOpenInNewTab, telHref } from "@/lib/contact";
import { useSiteContent } from "./ContentProvider";
import { useRecruitSafe } from "./RecruitSafeProvider";
import Button from "./ui/Button";

export default function ContactCTA() {
  const recruitSafe = useRecruitSafe();
  const { about, hero, socialLinks } = useSiteContent();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = prefersReducedMotion();
    const ctx = gsap.context(() => {
      revealOnScroll(".cta-headline", section);
      revealOnScroll(".cta-body", section);
      revealOnScroll(".cta-button", section);
      revealOnScroll(".cta-logo", section, { stagger: 0.08 });

      if (!reduced) {
        gsap.to(".cta-button", {
          y: -5,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  /** 채용 제출용: 연락처·이력서 없이 클로징 문구만 */
  if (recruitSafe) {
    return (
      <section
        id="closing"
        ref={sectionRef}
        className="relative z-[1] -mt-px flex min-h-[50vh] flex-col items-center justify-center overflow-hidden bg-dark py-24 text-white"
        aria-labelledby="closing-heading"
      >
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{ background: "var(--gradient-contact)" }}
        />
        <div className="section-container relative z-10 flex flex-col items-center text-center">
          <h2
            id="closing-heading"
            className="cta-headline hero-title text-preline text-gradient-light max-w-4xl tracking-tight"
          >
            {about.headline}
          </h2>
          <p className="cta-body section-body text-preline mx-auto mt-6 max-w-xl break-keep text-white/70">
            {about.bio}
          </p>
          <p className="cta-body mt-16 text-xs text-white/40 sm:text-sm">
            &copy; {new Date().getFullYear()} {about.copyright}. {about.rightsReserved}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-[1] -mt-px flex min-h-screen flex-col items-center justify-center overflow-hidden bg-dark py-24 text-white"
      aria-labelledby="contact-heading"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{ background: "var(--gradient-contact)" }}
      />

      <div className="section-container relative z-10 flex flex-col items-center text-center">
        <h2
          id="contact-heading"
          className="cta-headline hero-title text-preline text-gradient-light max-w-4xl tracking-tight"
        >
          {about.headline}
        </h2>
        <p className="cta-body section-body text-preline mx-auto mt-6 max-w-xl break-keep text-white/70">
          {about.bio}
        </p>

        <div className="cta-button mt-12 flex w-full max-w-lg flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3">
          <Button href={mailtoHref(about.email)} variant="onDark">
            {about.ctaButton}
          </Button>
          <Button
            href={hero.koResumeUrl}
            target={shouldOpenInNewTab(hero.koResumeUrl) ? "_blank" : undefined}
            rel={shouldOpenInNewTab(hero.koResumeUrl) ? "noopener noreferrer" : undefined}
            variant="onDarkGhost"
          >
            {hero.koResumeCtaLabel}
          </Button>
          <Button
            href={hero.resumeUrl}
            target={shouldOpenInNewTab(hero.resumeUrl) ? "_blank" : undefined}
            rel={shouldOpenInNewTab(hero.resumeUrl) ? "noopener noreferrer" : undefined}
            variant="onDarkGhost"
          >
            {hero.resumeCtaLabel}
          </Button>
          <Button href={telHref(about.phone)} variant="onDarkGhost">
            {about.phoneCtaLabel} · {about.phone}
          </Button>
        </div>

        <nav
          className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:mt-16 sm:gap-x-10"
          aria-label="Social links"
        >
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={shouldOpenInNewTab(link.href) ? "_blank" : undefined}
              rel={shouldOpenInNewTab(link.href) ? "noopener noreferrer" : undefined}
              className="cta-logo section-meta text-white/45 transition hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="cta-body mt-16 text-xs text-white/40 sm:text-sm">
          &copy; {new Date().getFullYear()} {about.copyright}. {about.rightsReserved}
        </p>
      </div>
    </section>
  );
}
