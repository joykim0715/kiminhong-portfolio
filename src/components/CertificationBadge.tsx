import type { Certification } from "@/data/content";
import styles from "./Credentials.module.css";

type CredentialItemProps = {
  cert: Certification;
};

function showSecondaryName(name: string, fullName: string) {
  const compactName = name.replace(/\s+/g, "");
  const compactFull = fullName.replace(/\s+/g, "");
  if (!compactFull || compactFull === compactName) return false;
  if (compactName.includes(compactFull) || compactFull.includes(compactName)) return false;
  return true;
}

/** Compact credential row — used by Certificates V2. Not a card/badge. */
export default function CertificationBadge({ cert }: CredentialItemProps) {
  const isLanguage = cert.type === "english";
  const secondary = showSecondaryName(cert.name, cert.fullName);

  return (
    <article className={`credential-item ${styles.item}`} tabIndex={0}>
      <h4 className={`text-preline ${styles.name}`}>{cert.name}</h4>
      {isLanguage ? (
        <p className={`text-preline ${styles.score}`}>{cert.fullName}</p>
      ) : secondary ? (
        <p className={`text-preline ${styles.fullName}`}>{cert.fullName}</p>
      ) : null}
      <p className={styles.meta}>
        {cert.issuer} · {cert.date}
      </p>
      <p className={`text-preline break-keep ${styles.detail}`}>{cert.description}</p>
    </article>
  );
}
