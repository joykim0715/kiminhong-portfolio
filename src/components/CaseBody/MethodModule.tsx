import type { CSSProperties } from "react";
import SectionFrame from "./SectionFrame";
import { emphasizeMetrics } from "./formatBlockText";
import type { CaseModuleProps } from "./types";
import styles from "./CaseBody.module.css";

export default function MethodModule({ block, index, className, sectionRef }: CaseModuleProps) {
  return (
    <SectionFrame
      block={block}
      index={index}
      className={className}
      innerClassName={styles.methodInner}
      sectionRef={sectionRef}
    >
      {block.summary ? <p className={`text-preline ${styles.intro}`}>{block.summary}</p> : null}
      <ol
        className={`${styles.methodTrack} ${block.bullets.length >= 4 ? styles.methodTrackWrap : ""}`}
        style={
          {
            "--method-steps": String(block.bullets.length >= 4 ? 2 : Math.max(block.bullets.length, 1)),
          } as CSSProperties
        }
      >
        {block.bullets.map((bullet, i) => (
          <li key={bullet} className={styles.methodStep}>
            <span className={styles.methodIndex}>{String(i + 1).padStart(2, "0")}</span>
            <p className={styles.methodText}>{emphasizeMetrics(bullet)}</p>
          </li>
        ))}
      </ol>
    </SectionFrame>
  );
}
