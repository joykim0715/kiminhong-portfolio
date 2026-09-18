import styles from "./CaseBody.module.css";

const SPLIT_RE = /(\d+\.?\d*만\s*건|\+?\d+%|\d+건|\d+명|\d+k)/gi;
const TOKEN_RE = /^\d+\.?\d*만\s*건$|^\+?\d+%$|^\d+건$|^\d+명$|^\d+k$/i;

export function emphasizeMetrics(text: string) {
  return text.split(SPLIT_RE).map((part, i) =>
    TOKEN_RE.test(part) ? (
      <strong key={`${part}-${i}`} className={styles.metric}>
        {part}
      </strong>
    ) : (
      part
    ),
  );
}
