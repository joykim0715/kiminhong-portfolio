import type { ReactNode } from "react";
import type { ProjectPanelBlock } from "@/data/content";
import styles from "./CaseBody.module.css";

type SectionFrameProps = {
  block: ProjectPanelBlock;
  index: number;
  className?: string;
  innerClassName?: string;
  sectionRef: (el: HTMLElement | null) => void;
  children: ReactNode;
};

export default function SectionFrame({
  block,
  index,
  className,
  innerClassName,
  sectionRef,
  children,
}: SectionFrameProps) {
  return (
    <section
      id={block.id}
      data-case-block
      data-case-section
      ref={sectionRef}
      className={`${styles.section} ${className ?? ""}`}
      aria-labelledby={`${block.id}-title`}
    >
      <div className={`${styles.inner} ${innerClassName ?? ""}`}>
        <div className={styles.kicker}>
          <span className={styles.kickerIndex}>{String(index + 1).padStart(2, "0")}</span>
          <span className={styles.kickerSlash} aria-hidden="true">
            /
          </span>
          <h3 id={`${block.id}-title`} className={styles.kickerTitle}>
            {block.title}
          </h3>
        </div>
        {children}
      </div>
    </section>
  );
}
