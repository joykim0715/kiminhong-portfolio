"use client";

import { useMemo } from "react";
import type { Certification } from "@/data/content";
import { useSiteContent } from "./ContentProvider";
import CertificationBadge from "./CertificationBadge";
import styles from "./Credentials.module.css";

const COLUMN_TYPES = ["cert", "english", "award"] as const;

type CredentialsProps = {
  id: string;
  showHeading?: boolean;
};

export default function Credentials({ id, showHeading = true }: CredentialsProps) {
  const { certifications, credentials } = useSiteContent();

  const columns = useMemo(
    () =>
      COLUMN_TYPES.map((type) => ({
        type,
        heading: credentials.headings[type],
        items: certifications.filter((item: Certification) => item.type === type),
      })),
    [certifications, credentials.headings],
  );

  return (
    <section id={id} className={`credentials ${styles.root}`} aria-labelledby={`${id}-heading`}>
      {showHeading ? (
        <header className={styles.header}>
          <p className="section-eyebrow text-secondary">{credentials.sectionLabel}</p>
          <h2 id={`${id}-heading`} className="section-title mt-3 tracking-tight text-text">
            {credentials.title}
          </h2>
        </header>
      ) : (
        <h2 id={`${id}-heading`} className="sr-only">
          {credentials.title}
        </h2>
      )}

      <div className={styles.columns}>
        {columns.map((column) => (
          <div key={column.type} className={styles.column}>
            <h3 className={styles.columnHeading}>{column.heading}</h3>
            <ul className={styles.list}>
              {column.items.map((item) => (
                <li key={`${item.name}-${item.date}`}>
                  <CertificationBadge cert={item} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
