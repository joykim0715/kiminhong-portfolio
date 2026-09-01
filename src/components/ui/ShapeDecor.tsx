"use client";

import { cn } from "@/lib/utils";
import styles from "./ShapeDecor.module.css";

type ShapeDecorProps = {
  className?: string;
  /** Dark hero/contact vs light sections */
  tone?: "dark" | "light";
};

/**
 * Shapefest-inspired 3D clay shapes (original CSS, not Shapefest files).
 * One torus + one sphere. Keep to 1–2 per section.
 */
export default function ShapeDecor({ className, tone = "dark" }: ShapeDecorProps) {
  return (
    <div className={cn(styles.wrap, tone === "light" && styles.light, className)} aria-hidden="true">
      <div className={styles.sphere} />
      <div className={styles.torus} />
    </div>
  );
}
