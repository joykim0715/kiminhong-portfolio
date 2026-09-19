"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { hoverSpring } from "@/lib/hoverMotion";

type WeightHoverTextProps = {
  children: string;
};

/** OriginKit weight-hover — letters thicken on hover, one after another. */
export default function WeightHoverText({ children }: WeightHoverTextProps) {
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useReducedMotion();
  const chars = Array.from(children);

  return (
    <span className="inline-flex">
      <span className="sr-only">{children}</span>
      <span
        aria-hidden="true"
        className="inline-flex"
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        {chars.map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            className="inline-block"
            animate={{ fontWeight: hovered ? 700 : 500 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { ...hoverSpring, delay: hovered ? index * 0.028 : 0 }
            }
          >
            {char === " " ? "\u00a0" : char}
          </motion.span>
        ))}
      </span>
    </span>
  );
}
