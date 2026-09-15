"use client";

import { useRef } from "react";
import { usePageLoadEntrance } from "@/hooks/usePageLoadEntrance";
import { useLocale } from "./ContentProvider";
import styles from "./PageLoadEntrance.module.css";

export default function PageLoadEntrance() {
  const { locale } = useLocale();
  const coverRef = useRef<HTMLDivElement>(null);
  usePageLoadEntrance(coverRef);
  const greeting = locale === "en" ? "Hello!" : "안녕하세요!";

  return (
    <div
      ref={coverRef}
      className={styles.cover}
      data-intro-cover
      aria-hidden="true"
    >
      <div className={`${styles.panel} ${styles.panelTop} intro-panel-top`} />
      <div className={`${styles.panel} ${styles.panelBottom} intro-panel-bottom`} />
      <div className={styles.seamSlot}>
        <div className={`${styles.seam} intro-seam`} />
      </div>
      <div className={styles.nameWrap}>
        <p className={`${styles.name} intro-name`}>{greeting}</p>
      </div>
    </div>
  );
}
