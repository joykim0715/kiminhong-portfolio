"use client";

import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { motion, useReducedMotion } from "motion/react";
import { hoverSpring } from "@/lib/hoverMotion";
import { useRadialReveal } from "@/lib/useRadialReveal";

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
  "relative inline-flex items-center justify-center overflow-hidden rounded-md text-sm font-medium transition-[border-color] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:text-base";

const faceClass =
  "inline-flex w-full items-center justify-center px-7 py-3 sm:px-8 sm:py-3.5";

const variants: Record<ButtonVariant, string> = {
  primary: "border border-primary/55 bg-primary/10 text-text btn-glow hover:border-primary",
  ghost: "border border-border bg-transparent text-text hover:border-primary/45",
  onDark: "border border-white/28 bg-white/10 text-white hover:border-white/40",
  onDarkGhost: "border border-white/22 bg-transparent text-white/90 hover:border-white/40",
};

const hoverFace: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white",
  ghost: "bg-primary/20 text-text",
  onDark: "bg-primary text-white",
  onDarkGhost: "bg-white/18 text-white",
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const reduceMotion = useReducedMotion();
  const { overlayRef, onPointerEnter, onPointerLeave } = useRadialReveal();
  const cls = `${baseClass} ${variants[variant]} ${className}`;
  const hover = reduceMotion ? undefined : { y: -3 };
  const tap = reduceMotion ? undefined : { scale: 0.98 };
  const overlay = (
    <span
      ref={overlayRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${faceClass} ${hoverFace[variant]}`}
      style={{ clipPath: "circle(0% at 100% 100%)" }}
    >
      {children}
    </span>
  );

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    return (
      <motion.a
        href={href}
        className={cls}
        whileHover={hover}
        whileTap={tap}
        transition={hoverSpring}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        {...rest}
      >
        <span className={`relative z-[1] ${faceClass}`}>{children}</span>
        {overlay}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      className={cls}
      whileHover={hover}
      whileTap={tap}
      transition={hoverSpring}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      {...(props as Omit<ButtonHTMLAttributes<HTMLButtonElement>, MotionSafe>)}
    >
      <span className={`relative z-[1] ${faceClass}`}>{children}</span>
      {overlay}
    </motion.button>
  );
}
