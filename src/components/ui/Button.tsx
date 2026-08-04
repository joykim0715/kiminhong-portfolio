"use client";

import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type ButtonVariant = "primary" | "ghost" | "onDark" | "onDarkGhost";

type ButtonBaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type ButtonAsButton = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = ButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

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
  const cls = `${baseClass} ${variants[variant]} ${className}`;

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={cls} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
