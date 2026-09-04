"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { hoverSpring } from "@/lib/hoverMotion";

type HoverLiftProps = {
  children: ReactNode;
  className?: string;
  /** List rows: slide sideways instead of lifting. */
  axis?: "y" | "x";
};

/**
 * Vengeance-style card hover via Motion whileHover.
 * Pattern: https://examples.motion.dev/react/gestures
 */
export default function HoverLift({ children, className, axis = "y" }: HoverLiftProps) {
  const reduceMotion = useReducedMotion();
  const hover = reduceMotion ? undefined : axis === "x" ? { x: 6 } : { y: -4 };

  return (
    <motion.div
      className={className}
      whileHover={hover}
      transition={hoverSpring}
    >
      {children}
    </motion.div>
  );
}
