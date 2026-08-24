"use client";

import { createContext, useContext, type ReactNode } from "react";

export type RecruitSafeConfig = {
  enabled: boolean;
  /** 채용 제출용 히어로 이력서 CTA */
  resumeUrl: string;
  resumeCtaLabel: string;
  /** 이력서 뷰어에서 돌아갈 포트폴리오 경로 */
  homeHref: string;
};

const defaultConfig: RecruitSafeConfig = {
  enabled: false,
  resumeUrl: "",
  resumeCtaLabel: "",
  homeHref: "/",
};

const RecruitSafeContext = createContext<RecruitSafeConfig>(defaultConfig);

/** 채용 제출용 — 사진·연락처를 숨기고 지정한 이력서만 노출. 원본(/)에는 영향 없음. */
export function RecruitSafeProvider({
  enabled = false,
  resumeUrl = "",
  resumeCtaLabel = "",
  homeHref = "/",
  children,
}: {
  enabled?: boolean;
  resumeUrl?: string;
  resumeCtaLabel?: string;
  homeHref?: string;
  children: ReactNode;
}) {
  return (
    <RecruitSafeContext.Provider
      value={{ enabled, resumeUrl, resumeCtaLabel, homeHref }}
    >
      {children}
    </RecruitSafeContext.Provider>
  );
}

export function useRecruitSafe(): boolean {
  return useContext(RecruitSafeContext).enabled;
}

export function useRecruitSafeConfig(): RecruitSafeConfig {
  return useContext(RecruitSafeContext);
}
