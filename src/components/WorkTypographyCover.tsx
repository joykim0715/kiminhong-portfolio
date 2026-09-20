import type { WorkTypographyCover as Cover } from "@/lib/workImages";
import styles from "./WorkTypographyCover.module.css";

type WorkTypographyCoverProps = {
  cover: Cover;
};

export default function WorkTypographyCover({ cover }: WorkTypographyCoverProps) {
  return (
    <div className={styles.cover} aria-hidden="true">
      <div className={styles.copy}>
        <p className={styles.kicker}>{cover.kicker}</p>
        <p className={styles.heading}>{cover.heading}</p>
        {cover.detail ? <p className={styles.detail}>{cover.detail}</p> : null}
        <span className={styles.rule} />
      </div>
      {cover.stats.length > 0 ? (
        <dl className={styles.stats}>
          {cover.stats.map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <dt className={styles.label}>{stat.label}</dt>
              <dd className={styles.value}>{stat.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </div>
  );
}
