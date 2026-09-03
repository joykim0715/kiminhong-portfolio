"use client";

import Image from "next/image";
import { shouldOpenInNewTab } from "@/lib/contact";
import { useSiteContent } from "./ContentProvider";
import { useRecruitSafe } from "./RecruitSafeProvider";
import { useTrack } from "./TrackProvider";
import HoverLink from "./ui/HoverLink";
import ShapeDecor from "./ui/ShapeDecor";
import HeroProcess from "./HeroProcess";
import styles from "./Hero.module.css";

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 17L17 7M17 7H9M17 7V15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Hero() {
  const { hero, nav, socialLinks } = useSiteContent();
  const recruitSafe = useRecruitSafe();
  const { track, theme } = useTrack();
  const cutoutSrc = hero.cutoutImage ?? hero.profileImage;
  const publicSocialLinks = recruitSafe ? [] : socialLinks;
  const salesCta = track === "sales";
  const planningHero = track === "planning";

  return (
    <section id="hero" className={`${styles.hero} relative flex min-h-screen flex-col pt-16`}>
      {recruitSafe && theme.showShapeDecor ? <ShapeDecor /> : null}
      <div className={`section-container ${styles.heroGrid}${recruitSafe ? ` ${styles.heroGridSafe}` : ""}${planningHero ? ` ${styles.heroGridPlanning}` : ""}`}>
        <div className={styles.heroContent}>
          <h1 className={`${styles.heroName} hero-name-line text-gradient-light`}>{hero.name}</h1>

          <p className={`${styles.heroHeadline} hero-desc-line`}>{hero.headline}</p>
          <p className={`${styles.heroTagline} hero-desc-line`}>{hero.tagline}</p>

          <div className={`${styles.heroCtaRow} hero-cta`}>
            {recruitSafe ? (
              <>
                <a
                  href={hero.naverResumeUrl}
                  className={styles.heroBtnPrimary}
                  target={shouldOpenInNewTab(hero.naverResumeUrl) ? "_blank" : undefined}
                  rel={shouldOpenInNewTab(hero.naverResumeUrl) ? "noopener noreferrer" : undefined}
                >
                  {hero.naverResumeCtaLabel}
                  <ArrowIcon />
                </a>
                <a href="#works" className={styles.heroBtnGhost}>
                  View projects
                  <ArrowIcon />
                </a>
              </>
            ) : planningHero ? (
              <>
                <a href="#cases" className={styles.heroBtnPrimary}>
                  케이스 보기
                  <ArrowIcon />
                </a>
                <a
                  href={hero.koResumeUrl}
                  className={styles.heroBtnGhost}
                  target={shouldOpenInNewTab(hero.koResumeUrl) ? "_blank" : undefined}
                  rel={shouldOpenInNewTab(hero.koResumeUrl) ? "noopener noreferrer" : undefined}
                >
                  {hero.koResumeCtaLabel}
                  <ArrowIcon />
                </a>
                <a href="#contact" className={styles.heroBtnGhost}>
                  {nav.contactCta}
                  <ArrowIcon />
                </a>
              </>
            ) : salesCta ? (
              <>
                <a href="#contact" className={styles.heroBtnPrimary}>
                  {nav.contactCta}
                  <ArrowIcon />
                </a>
                <a
                  href={hero.koResumeUrl}
                  className={styles.heroBtnGhost}
                  target={shouldOpenInNewTab(hero.koResumeUrl) ? "_blank" : undefined}
                  rel={shouldOpenInNewTab(hero.koResumeUrl) ? "noopener noreferrer" : undefined}
                >
                  {hero.koResumeCtaLabel}
                  <ArrowIcon />
                </a>
                <a
                  href={hero.resumeUrl}
                  className={styles.heroBtnGhost}
                  target={shouldOpenInNewTab(hero.resumeUrl) ? "_blank" : undefined}
                  rel={shouldOpenInNewTab(hero.resumeUrl) ? "noopener noreferrer" : undefined}
                >
                  {hero.resumeCtaLabel}
                  <ArrowIcon />
                </a>
              </>
            ) : (
              <>
                <a
                  href={hero.koResumeUrl}
                  className={styles.heroBtnPrimary}
                  target={shouldOpenInNewTab(hero.koResumeUrl) ? "_blank" : undefined}
                  rel={shouldOpenInNewTab(hero.koResumeUrl) ? "noopener noreferrer" : undefined}
                >
                  {hero.koResumeCtaLabel}
                  <ArrowIcon />
                </a>
                <a
                  href={hero.resumeUrl}
                  className={styles.heroBtnGhost}
                  target={shouldOpenInNewTab(hero.resumeUrl) ? "_blank" : undefined}
                  rel={shouldOpenInNewTab(hero.resumeUrl) ? "noopener noreferrer" : undefined}
                >
                  {hero.resumeCtaLabel}
                  <ArrowIcon />
                </a>
                <a href="#contact" className={styles.heroBtnGhost}>
                  {nav.contactCta}
                  <ArrowIcon />
                </a>
              </>
            )}
          </div>

          {publicSocialLinks.length > 0 ? (
            <nav className={`${styles.heroSocial} hero-desc-line`} aria-label="Social links">
              {publicSocialLinks.map((link) => (
                <HoverLink
                  key={link.label}
                  href={link.href}
                  className={styles.heroSocialLink}
                  showArrow
                  target={shouldOpenInNewTab(link.href) ? "_blank" : undefined}
                  rel={shouldOpenInNewTab(link.href) ? "noopener noreferrer" : undefined}
                >
                  {link.label}
                </HoverLink>
              ))}
            </nav>
          ) : null}
        </div>

        {!recruitSafe && planningHero ? (
          <div className={`${styles.heroVisual} ${styles.heroVisualProcess} hero-visual`}>
            <HeroProcess />
          </div>
        ) : !recruitSafe ? (
          <div className={`${styles.heroVisual} hero-visual`}>
            {theme.showShapeDecor ? <ShapeDecor className="z-[2]" /> : null}
            <div className={styles.heroCutoutWrap}>
              <Image
                src={cutoutSrc}
                alt={`${hero.name} profile`}
                fill
                priority
                quality={100}
                className={`${styles.heroCutoutImage} sharp-image`}
                sizes="(max-width: 1024px) 98vw, 1100px"
              />
            </div>
          </div>
        ) : null}
      </div>

      <div className={styles.heroBottomFade} aria-hidden="true" />
    </section>
  );
}
