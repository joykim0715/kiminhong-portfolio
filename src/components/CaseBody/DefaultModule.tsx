import SectionFrame from "./SectionFrame";
import { emphasizeMetrics } from "./formatBlockText";
import type { CaseModuleProps } from "./types";
import styles from "./CaseBody.module.css";

export default function DefaultModule({ block, index, className, sectionRef }: CaseModuleProps) {
  return (
    <SectionFrame
      block={block}
      index={index}
      className={className}
      innerClassName={styles.defaultInner}
      sectionRef={sectionRef}
    >
      {block.summary ? <p className={`text-preline ${styles.intro}`}>{block.summary}</p> : null}
      {block.bullets.length > 0 ? (
        <ul className={styles.contextList}>
          {block.bullets.map((bullet) => (
            <li key={bullet} className={styles.contextItem}>
              {emphasizeMetrics(bullet)}
            </li>
          ))}
        </ul>
      ) : null}
    </SectionFrame>
  );
}
