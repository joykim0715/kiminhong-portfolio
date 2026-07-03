import styles from "./SectionBlend.module.css";

type SectionBlendProps = {
  variant: "hero-bridge" | "works-story";
};

export default function SectionBlend({ variant }: SectionBlendProps) {
  const className =
    variant === "hero-bridge"
      ? `${styles.sectionBlend} ${styles.sectionBlendHeroBridge}`
      : `${styles.sectionBlend} ${styles.sectionBlendWorksStory}`;

  return <div className={className} aria-hidden="true" />;
}
