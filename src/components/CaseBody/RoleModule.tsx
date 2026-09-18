import SectionFrame from "./SectionFrame";
import { emphasizeMetrics } from "./formatBlockText";
import type { CaseModuleProps } from "./types";
import styles from "./CaseBody.module.css";

export default function RoleModule({ block, index, className, sectionRef }: CaseModuleProps) {
  return (
    <SectionFrame
      block={block}
      index={index}
      className={className}
      innerClassName={styles.roleInner}
      sectionRef={sectionRef}
    >
      {block.summary ? <p className={`text-preline ${styles.intro}`}>{block.summary}</p> : null}
      <div className={styles.roleGrid}>
        {block.bullets.map((bullet, i) => (
          <div key={bullet} className={styles.roleItem}>
            <span className={styles.roleIndex}>{String(i + 1).padStart(2, "0")}</span>
            <p className={styles.roleText}>{emphasizeMetrics(bullet)}</p>
          </div>
        ))}
      </div>
    </SectionFrame>
  );
}
