"use client";

import Image from "next/image";
import { siteContent } from "@/data/content";
import styles from "./Hero.module.css";

const { hero, nav, socialLinks, skills: skillsContent } = siteContent;

const CODE_SNIPPET = `const healthData = await fetchMetrics({
  cohort: "senior-wellness",
  window: "90d",
});

export function analyzeMovement(data) {
  return data.filter(v => v.validity >= 0.85)
    .map(v => ({ ...v, insight: score(v) }));
}`;

const KEYWORDS = ["DATA", "HEALTH", "ANALYTICS", "MOVEMENT"];

function splitName(name: string) {
  if (name.length <= 1) return { line1: name, line2: "" };
  return { line1: name.slice(0, 1), line2: name.slice(1) };
}

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
  const { line1, line2 } = splitName(hero.name);
  const topSkills = skillsContent.items.slice(0, 4);
  const performanceValue = Math.max(...skillsContent.items.map((s) => s.proficiency));

  return (
    <section id="hero" className={`${styles.hero} relative z-[1] flex min-h-screen flex-col overflow-hidden pt-16`}>
      <div className={styles.heroGlow} aria-hidden="true" />

      <div className={`section-container ${styles.heroGrid}`}>
        <div className={styles.heroContent}>
          <div className={styles.heroNameBlock}>
            <h1 className="hero-name">
              <span className={`${styles.heroNameLine1} hero-name-line`}>{line1}</span>
              {line2 && <span className={`${styles.heroNameLine2} hero-name-line`}>{line2}</span>}
            </h1>
            <span className={`${styles.heroSignature} hero-desc-line`} aria-hidden="true">
              {hero.name}
            </span>
          </div>

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
          <pre className={styles.heroCodeBg} aria-hidden="true">
            {CODE_SNIPPET}
          </pre>

          <div className={styles.heroPortraitWrap}>
            <div className={styles.heroPortraitImage}>
              <Image
                src={hero.profileImage}
                alt={`${hero.name} 프로필`}
                fill
                priority
                quality={92}
                className="sharp-image"
                sizes="(max-width: 1024px) 90vw, 420px"
              />
            </div>
          </div>

          <div className={`${styles.heroWidget} ${styles.heroWidgetPerformance}`} aria-hidden="true">
            <p className={styles.heroWidgetLabel}>Performance Overview</p>
            <p className={styles.heroWidgetValue}>{performanceValue}%</p>
            <p className={styles.heroWidgetSub}>Core competency index</p>
          </div>

          <div className={`${styles.heroWidget} ${styles.heroWidgetSkills}`} aria-hidden="true">
            <p className={styles.heroWidgetLabel}>Skills</p>
            {topSkills.map((skill) => (
              <div key={skill.id} className={styles.heroSkillRow}>
                <div className={styles.heroSkillRowHead}>
                  <span>{skill.category}</span>
                  <span>{skill.proficiency}%</span>
                </div>
                <div className={styles.heroSkillBar}>
                  <div className={styles.heroSkillBarFill} style={{ width: `${skill.proficiency}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className={styles.heroKeywords} aria-hidden="true">
            {KEYWORDS.map((word, i) => (
              <span key={word} className={i === KEYWORDS.length - 1 ? styles.heroKeywordAccent : undefined}>
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
