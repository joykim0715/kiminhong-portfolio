import styles from "./SectionBlend.module.css";

type SectionBlendProps = {
  variant: "hero-bridge" | "bridge-values" | "works-story";
};

export default function SectionBlend({ variant }: SectionBlendProps) {
  const className = {
    "hero-bridge": `${styles.sectionBlend} ${styles.sectionBlendHeroBridge}`,
    "bridge-values": `${styles.sectionBlend} ${styles.sectionBlendBridgeValues}`,
    "works-story": `${styles.sectionBlend} ${styles.sectionBlendWorksStory}`,
  }[variant];

  return <div className={className} aria-hidden="true" />;
}
