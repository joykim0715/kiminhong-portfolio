"use client";

import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { motion, useReducedMotion } from "motion/react";
import { trackHoverSpring } from "@/lib/hoverMotion";
import { useTrack } from "@/components/TrackProvider";

type ButtonVariant = "primary" | "ghost" | "onDark" | "onDarkGhost";

type ButtonBaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type MotionSafe = "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd" | "onDragOver";

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, MotionSafe> & { href?: undefined };

type ButtonAsLink = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, MotionSafe> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const baseClass =
  "inline-flex items-center justify-center rounded-md px-7 py-3 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:px-8 sm:py-3.5 sm:text-base";

const variants: Record<ButtonVariant, string> = {
  primary:
    "border border-primary/55 bg-primary/10 text-text btn-glow hover:bg-primary/18 hover:border-primary",
  ghost: "border border-border bg-transparent text-text hover:border-primary/45 hover:text-text",
  onDark:
    "border border-white/28 bg-white/10 text-white hover:border-white/40 hover:bg-white/16",
  onDarkGhost:
    "border border-white/22 bg-transparent text-white/90 hover:border-white/40 hover:bg-white/10",
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const reduceMotion = useReducedMotion();
  const { theme } = useTrack();
  const cls = `${baseClass} ${variants[variant]} ${className}`;
  const hover = reduceMotion ? undefined : { y: theme.density === "proof" ? -2 : -3 };
  const tap = reduceMotion ? undefined : { scale: 0.98 };
  const spring = trackHoverSpring(theme.hoverBounce, theme.hoverDuration);

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    return (
      <motion.a
        href={href}
        className={cls}
        whileHover={hover}
        whileTap={tap}
        transition={spring}
        {...rest}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      className={cls}
      whileHover={hover}
      whileTap={tap}
      transition={spring}
      {...(props as Omit<ButtonHTMLAttributes<HTMLButtonElement>, MotionSafe>)}
    >
      {children}
    </motion.button>
  );
}
