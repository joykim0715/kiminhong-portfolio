"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { trackHoverSpring } from "@/lib/hoverMotion";
import { useTrack } from "@/components/TrackProvider";

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
  const { theme } = useTrack();
  const lift = theme.density === "proof" ? 2 : theme.density === "kpi" ? 3 : 4;
  const hover = reduceMotion
    ? undefined
    : axis === "x"
      ? { x: theme.density === "proof" ? 4 : 6 }
      : { y: -lift };

  return (
    <motion.div
      className={className}
      whileHover={hover}
      transition={trackHoverSpring(theme.hoverBounce, theme.hoverDuration)}
    >
      {children}
    </motion.div>
  );
}
