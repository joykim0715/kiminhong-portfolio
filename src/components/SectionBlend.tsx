import styles from "./SectionBlend.module.css";

type SectionBlendProps = {
  variant: "hero-bridge" | "bridge-values" | "works-story" | "career-work" | "work-certs";
};

export default function SectionBlend({ variant }: SectionBlendProps) {
  const className = {
    "hero-bridge": `${styles.sectionBlend} ${styles.sectionBlendHeroBridge}`,
    "bridge-values": `${styles.sectionBlend} ${styles.sectionBlendBridgeValues}`,
    "works-story": `${styles.sectionBlend} ${styles.sectionBlendWorksStory}`,
    "career-work": `${styles.sectionBlend} ${styles.sectionBlendCareerWork}`,
    "work-certs": `${styles.sectionBlend} ${styles.sectionBlendWorkCerts}`,
  }[variant];

  return <div className={className} aria-hidden="true" />;
}
