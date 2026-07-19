"use client";

import Image from "next/image";
import { siteContent } from "@/data/content";
import { shouldOpenInNewTab } from "@/lib/contact";
import { useRecruitSafe } from "./RecruitSafeProvider";
import styles from "./Hero.module.css";

const { hero, nav, socialLinks } = siteContent;

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
  const recruitSafe = useRecruitSafe();
  const cutoutSrc = hero.cutoutImage ?? hero.profileImage;
  const publicSocialLinks = recruitSafe
    ? socialLinks.filter((link) => !link.href.startsWith("mailto:") && !link.href.startsWith("tel:") && link.href !== "/resume")
    : socialLinks;

  return (
    <section id="hero" className={`${styles.hero} relative z-[1] flex min-h-screen flex-col overflow-hidden pt-16`}>
      <div className={`section-container ${styles.heroGrid}${recruitSafe ? ` ${styles.heroGridSafe}` : ""}`}>
        <div className={styles.heroContent}>
          <h1 className={`${styles.heroName} hero-name-line text-gradient-light`}>{hero.name}</h1>

          <p className={`${styles.heroTagline} hero-desc-line`}>{hero.tagline}</p>
          <p className={`${styles.heroHeadline} hero-desc-line`}>{hero.headline}</p>
          <p className={`${styles.heroBio} hero-desc-line`}>{hero.bio}</p>

          <div className={`${styles.heroCtaRow} hero-cta`}>
            {recruitSafe ? (
              <a href="#works" className={styles.heroBtnPrimary}>
                프로젝트 보기
                <ArrowIcon />
              </a>
            ) : (
              <>
                <a
                  href={hero.resumeUrl}
                  className={styles.heroBtnPrimary}
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
                <a
                  key={link.label}
                  href={link.href}
                  className={styles.heroSocialLink}
                  target={shouldOpenInNewTab(link.href) ? "_blank" : undefined}
                  rel={shouldOpenInNewTab(link.href) ? "noopener noreferrer" : undefined}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          ) : null}
        </div>

        {!recruitSafe ? (
          <div className={`${styles.heroVisual} hero-visual`}>
            <div className={styles.heroCutoutWrap}>
              <Image
                src={cutoutSrc}
                alt={`${hero.name} 프로필`}
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
