"use client";

import Image from "next/image";
import { siteContent } from "@/data/content";
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
  return (
    <section id="hero" className={`${styles.hero} relative z-[1] flex min-h-screen flex-col overflow-hidden pt-16`}>
      <div className={styles.heroGlow} aria-hidden="true" />

      <div className={`section-container ${styles.heroGrid}`}>
        <div className={styles.heroContent}>
          <h1 className={`${styles.heroName} hero-name-line text-gradient-light`}>{hero.name}</h1>

          <p className={`${styles.heroTagline} hero-desc-line`}>{hero.tagline}</p>
          <p className={`${styles.heroHeadline} hero-desc-line`}>{hero.headline}</p>
          <p className={`${styles.heroBio} hero-desc-line`}>{hero.bio}</p>

          <div className={`${styles.heroCtaRow} hero-cta`}>
            <a href={hero.resumeUrl} className={styles.heroBtnPrimary} target="_blank" rel="noopener noreferrer">
              {hero.resumeCtaLabel}
              <ArrowIcon />
            </a>
            <a href="#contact" className={styles.heroBtnGhost}>
              {nav.contactCta}
              <ArrowIcon />
            </a>
          </div>

          <nav className={`${styles.heroSocial} hero-desc-line`} aria-label="Social links">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={styles.heroSocialLink}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className={`${styles.heroVisual} hero-visual`}>
          <Image
            src={hero.profileImage}
            alt={`${hero.name} 프로필`}
            fill
            priority
            quality={95}
            className={`${styles.heroReferencePhoto} sharp-image`}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>

      <div className={styles.heroBottomFade} aria-hidden="true" />
    </section>
  );
}
