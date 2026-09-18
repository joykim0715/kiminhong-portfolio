import SectionFrame from "./SectionFrame";
import type { CaseModuleProps } from "./types";
import styles from "./CaseBody.module.css";

export default function ReflectionModule({ block, index, className, sectionRef }: CaseModuleProps) {
  const isLearnings = block.id === "learnings";
  const [lead, ...rest] = block.bullets;

  return (
    <SectionFrame
      block={block}
      index={index}
      className={className}
      innerClassName={styles.reflectionInner}
      sectionRef={sectionRef}
    >
      {isLearnings ? (
        <ol className={styles.learnList}>
          {block.bullets.map((bullet, i) => (
            <li key={bullet} className={styles.learnItem}>
              <span className={styles.learnIndex}>{String(i + 1).padStart(2, "0")}</span>
              <p className={styles.learnText}>{bullet}</p>
            </li>
          ))}
        </ol>
      ) : (
        <>
          {lead ? <p className={styles.insightLead}>{lead}</p> : null}
          {rest.length > 0 ? (
            <ul className={`${styles.plainList} ${styles.insightRest}`}>
              {rest.map((bullet) => (
                <li key={bullet} className={styles.plainItem}>
                  {bullet}
                </li>
              ))}
            </ul>
          ) : null}
        </>
      )}
    </SectionFrame>
  );
}
