import type { Metadata } from "next";
import Link from "next/link";
import { koResumeFilePath, siteContent } from "@/data/content";

const { hero } = siteContent;

export const metadata: Metadata = {
  title: "국문 이력서 — 김인홍 (와이즐리 지원용)",
  description: "와이즐리 채용 제출용 국문 이력서.",
  alternates: {
    canonical: "/resume/wisely",
  },
  robots: {
    index: false,
    follow: false,
  },
};

/** 와이즐리 지원용 국문 이력서 뷰어 — `/wisely` 에서 연결 (일반 국문 PDF) */
export default function WiselyResumePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--clr-dark)] text-white">
      <header className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/wisely"
            className="shrink-0 text-sm text-white/60 transition hover:text-white"
          >
            ← Portfolio
          </Link>
          <h1 className="truncate text-sm font-semibold sm:text-base">{hero.koResumeCtaLabel}</h1>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <p className="hidden text-xs text-white/45 sm:block">브라우저에서 바로 열림 · Adobe 불필요</p>
          <a
            href={koResumeFilePath}
            download
            className="rounded-full border border-white/25 px-3 py-1.5 text-xs font-medium text-white/90 transition hover:border-white/40 hover:bg-white/10 sm:px-4 sm:text-sm"
          >
            PDF 다운로드
          </a>
        </div>
      </header>

      <div className="relative min-h-0 flex-1">
        <iframe
          src={`${koResumeFilePath}#view=FitH`}
          title="김인홍 — 국문 이력서 (와이즐리 지원용)"
          className="absolute inset-0 h-full w-full border-0 bg-white"
        />
      </div>

      <p className="shrink-0 border-t border-white/10 px-4 py-2 text-center text-xs text-white/40 sm:hidden">
        미리보기가 안 되면 위 PDF 다운로드를 이용하세요.
      </p>
    </div>
  );
}
