import type { Metadata } from "next";
import Link from "next/link";
import { naverResumeFilePath, siteContent } from "@/data/content";

const { hero } = siteContent;

export const metadata: Metadata = {
  title: "국문 이력서 — 김인홍",
  description: "네이버 채용 제출용 국문 이력서.",
  alternates: {
    canonical: "/resume/naver",
  },
  robots: {
    index: false,
    follow: false,
  },
};

/** 네이버 채용 제출용 국문 CV 뷰어 — `/naver` 에서만 연결 */
export default function NaverResumePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--clr-dark)] text-white">
      <header className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/naver"
            className="shrink-0 text-sm text-white/60 transition hover:text-white"
          >
            ← Portfolio
          </Link>
          <h1 className="truncate text-sm font-semibold sm:text-base">{hero.naverResumeCtaLabel}</h1>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <p className="hidden text-xs text-white/45 sm:block">브라우저에서 바로 열림 · Adobe 불필요</p>
          <a
            href={naverResumeFilePath}
            download
            className="rounded-full border border-white/25 px-3 py-1.5 text-xs font-medium text-white/90 transition hover:border-white/40 hover:bg-white/10 sm:px-4 sm:text-sm"
          >
            PDF 다운로드
          </a>
        </div>
      </header>

      <div className="relative min-h-0 flex-1">
        <iframe
          src={`${naverResumeFilePath}#view=FitH`}
          title="김인홍 — 국문 이력서 (네이버 지원용)"
          className="absolute inset-0 h-full w-full border-0 bg-white"
        />
      </div>

      <p className="shrink-0 border-t border-white/10 px-4 py-2 text-center text-xs text-white/40 sm:hidden">
        미리보기가 안 되면 위 PDF 다운로드를 이용하세요.
      </p>
    </div>
  );
}
