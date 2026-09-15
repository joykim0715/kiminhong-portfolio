"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { useLocale } from "./ContentProvider";
import styles from "./ScrollProgress.module.css";

/**
 * Right-edge reading rail (weevolveit-style). Driven by ScrollTrigger so it
 * stays in sync with Lenis via the existing scrollerProxy.
 */
export default function ScrollProgress() {
  const meterRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const { locale } = useLocale();

  useEffect(() => {
    const meter = meterRef.current;
    const label = labelRef.current;
    if (!meter || !label) return;

    let previous = -1;
    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate(self) {
        meter.style.setProperty("--page-progress", String(self.progress));
        const percent = Math.round(self.progress * 100);
        if (percent === previous) return;
        previous = percent;
        meter.setAttribute("aria-valuenow", String(percent));
        label.textContent = `${String(percent).padStart(3, "0")}%`;
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <aside className={styles.rail}>
      <div
        ref={meterRef}
        className={styles.meter}
        role="progressbar"
        aria-label={locale === "en" ? "Page reading progress" : "페이지 스크롤 진행도"}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={0}
      >
        <span className={styles.line}>
          <i />
        </span>
        <span ref={labelRef} className={styles.percent}>
          000%
        </span>
      </div>
    </aside>
  );
}
