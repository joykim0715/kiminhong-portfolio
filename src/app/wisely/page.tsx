import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import { siteContentWisely } from "@/data/content.wisely";

export const metadata: Metadata = {
  title: siteContentWisely.meta.title,
  description: siteContentWisely.meta.description,
  alternates: {
    canonical: "/wisely",
  },
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * 와이즐리 헬스팀(프로덕트) 지원용 — 사진·연락처 숨김, JD 맞춤 카피.
 * 원본(/)·네이버용(/naver)과 분리됩니다.
 */
export default function WiselyRecruitPage() {
  return (
    <HomePage
      content={siteContentWisely}
      recruitSafe={{
        resumeUrl: "/resume/wisely",
        resumeCtaLabel: siteContentWisely.hero.koResumeCtaLabel,
        homeHref: "/wisely",
      }}
    />
  );
}
