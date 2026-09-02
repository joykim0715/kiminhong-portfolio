"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useTrack } from "@/components/TrackProvider";

type DeviceMockupProps = {
  children: ReactNode;
  className?: string;
  /** monitor = featured / dashboard; bezel = gallery cards */
  variant?: "monitor" | "bezel";
};

/**
 * Craftwork-style device chrome around existing screenshots.
 * Frames only — does not replace project images.
 * Research track only; other tracks show the screenshot flat.
 */
export default function DeviceMockup({
  children,
  className,
  variant = "bezel",
}: DeviceMockupProps) {
  const { theme } = useTrack();

  if (!theme.showShapeDecor) {
    return <div className={cn("relative h-full w-full overflow-hidden", className)}>{children}</div>;
  }

  if (variant === "monitor") {
    return (
      <div className={cn("flex h-full w-full flex-col", className)}>
        <div className="relative min-h-0 flex-1 overflow-hidden rounded-t-[10px] border-[7px] border-[#1a2226] border-b-[9px] bg-[#0c1012] shadow-[0_22px_48px_-28px_rgba(0,0,0,0.55)]">
          <div
            className="pointer-events-none absolute left-1/2 top-1.5 z-10 h-1 w-1.5 -translate-x-1/2 rounded-full bg-[#3a464c]"
            aria-hidden
          />
          <div className="absolute inset-0">{children}</div>
        </div>
        <div className="mx-auto h-2.5 w-14 bg-[#1a2226]" aria-hidden />
        <div className="mx-auto h-1.5 w-24 rounded-full bg-[#2a3338]" aria-hidden />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden rounded-[14px] border-[6px] border-[#1a2226] bg-[#0c1012] shadow-[0_16px_36px_-22px_rgba(0,0,0,0.5)]",
        className,
      )}
    >
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}
