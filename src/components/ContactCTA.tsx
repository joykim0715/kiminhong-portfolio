"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/animations";
import { revealOnScroll } from "@/lib/scrollReveal";
import { siteContent } from "@/data/content";
import { mailtoHref, shouldOpenInNewTab, telHref } from "@/lib/contact";
import Button from "./ui/Button";

export default function ContactCTA() {
  const { about, hero, socialLinks } = siteContent;
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
          y: -12,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
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
        <h2 id="contact-heading" className="cta-headline hero-title text-gradient-light max-w-4xl tracking-tight">
          {about.headline}
        </h2>
        <p className="cta-body mx-auto mt-6 max-w-xl break-keep text-base text-white/75 sm:text-lg">{about.bio}</p>

        <div className="cta-button mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Button href={mailtoHref(about.email)} className="!border-white/30 !bg-white/10 !text-white hover:!bg-white/20">
            {about.ctaButton}
          </Button>
          <Button
            href={hero.resumeUrl}
            target={shouldOpenInNewTab(hero.resumeUrl) ? "_blank" : undefined}
            rel={shouldOpenInNewTab(hero.resumeUrl) ? "noopener noreferrer" : undefined}
            variant="ghost"
            className="!border-white/25 !text-white/90 hover:!border-white/40 hover:!bg-white/10"
          >
            {hero.resumeCtaLabel}
          </Button>
          <Button
            href={telHref(about.phone)}
            variant="ghost"
            className="!border-white/25 !text-white/90 hover:!border-white/40 hover:!bg-white/10"
          >
            {about.phoneCtaLabel} · {about.phone}
          </Button>
        </div>

        <nav
          className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
          aria-label="Social links"
        >
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={shouldOpenInNewTab(link.href) ? "_blank" : undefined}
              rel={shouldOpenInNewTab(link.href) ? "noopener noreferrer" : undefined}
              className="cta-logo text-sm font-semibold uppercase tracking-[0.2em] text-white/50 transition hover:text-primary-light sm:text-base"
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
