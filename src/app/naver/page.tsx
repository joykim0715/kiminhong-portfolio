import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import { siteContent } from "@/data/content";

export const metadata: Metadata = {
  title: `${siteContent.hero.name} — Portfolio (채용 제출용)`,
  description:
    "헬스케어 실무 경력 1년 포트폴리오. 스포츠과학, 데이터 분석, 디지털 헬스케어 프로젝트를 소개합니다. (사진·연락처 미포함)",
  alternates: {
    canonical: "/naver",
  },
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * 네이버 등 채용 지원용 — 본인 사진·이메일·전화·이력서 링크를 숨긴 버전.
 * 원본(/)은 그대로 유지됩니다.
 */
export default function NaverRecruitPage() {
  return <HomePage recruitSafe />;
}
