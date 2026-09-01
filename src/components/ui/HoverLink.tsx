"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type HoverLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  /** Skiper 40 Link001 — underline + arrow on hover */
  showArrow?: boolean;
};

/**
 * Skiper UI skiper40 (CssLink) — underline that grows on hover.
 * Attribution: Skiper UI, https://skiper-ui.com
 */
export default function HoverLink({
  children,
  className,
  showArrow = false,
  ...props
}: HoverLinkProps) {
  return (
    <a
      className={cn(
        "group relative inline-flex items-center",
        "before:pointer-events-none before:absolute before:bottom-0 before:left-0 before:h-px before:w-full before:bg-current before:content-['']",
        "before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
        "hover:before:origin-left hover:before:scale-x-100",
        "motion-reduce:before:transition-none",
        className,
      )}
      {...props}
    >
      {children}
      {showArrow ? (
        <svg
          className="ml-[0.35em] size-[0.55em] translate-y-0.5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none"
          fill="none"
          viewBox="0 0 10 10"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
    </a>
  );
}
