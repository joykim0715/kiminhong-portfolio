import type { Metadata } from "next";
import Link from "next/link";
import { resumeFilePath, siteContent } from "@/data/content";

const { hero } = siteContent;

export const metadata: Metadata = {
  title: "Resume (EN) — Inhong Kim",
  description: "English resume — healthcare data and digital health.",
  alternates: {
    canonical: "/resume",
  },
};

export default function ResumePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--clr-dark)] text-white">
      <header className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/"
            className="shrink-0 text-sm text-white/60 transition hover:text-white"
          >
            ← Portfolio
          </Link>
          <h1 className="truncate text-sm font-semibold sm:text-base">{hero.resumeCtaLabel}</h1>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <p className="hidden text-xs text-white/45 sm:block">Opens in browser · Adobe not required</p>
          <a
            href={resumeFilePath}
            download
            className="rounded-full border border-white/25 px-3 py-1.5 text-xs font-medium text-white/90 transition hover:border-white/40 hover:bg-white/10 sm:px-4 sm:text-sm"
          >
            Download PDF
          </a>
        </div>
      </header>

      <div className="relative min-h-0 flex-1">
        <iframe
          src={`${resumeFilePath}#view=FitH`}
          title="Inhong Kim — English Resume"
          className="absolute inset-0 h-full w-full border-0 bg-white"
        />
      </div>

      <p className="shrink-0 border-t border-white/10 px-4 py-2 text-center text-xs text-white/40 sm:hidden">
        If the preview does not load, use Download PDF above.
      </p>
    </div>
  );
}
