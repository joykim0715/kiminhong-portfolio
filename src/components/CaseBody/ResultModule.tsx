import SectionFrame from "./SectionFrame";
import type { ResultModuleProps } from "./types";
import styles from "./CaseBody.module.css";

export default function ResultModule({
  block,
  index,
  className,
  sectionRef,
  hasImpact = false,
}: ResultModuleProps) {
  return (
    <SectionFrame
      block={block}
      index={index}
      className={className}
      innerClassName={`${styles.resultInner} ${hasImpact ? "" : styles.resultInnerStrong}`}
      sectionRef={sectionRef}
    >
      {block.summary ? (
        <p
          className={`text-preline ${styles.statement} ${
            hasImpact ? styles.resultStatement : styles.resultStatementStrong
          }`}
        >
          {block.summary}
        </p>
      ) : null}
      {block.bullets.length > 0 ? (
        <ul className={styles.plainList}>
          {block.bullets.map((bullet) => (
            <li key={bullet} className={styles.plainItem}>
              {bullet}
            </li>
          ))}
        </ul>
      ) : null}
    </SectionFrame>
  );
}
