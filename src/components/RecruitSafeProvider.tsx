"use client";

import { createContext, useContext, type ReactNode } from "react";

const RecruitSafeContext = createContext(false);

/** 네이버 등 채용 제출용 — 사진·연락처·이력서 링크를 숨깁니다. 원본(/)에는 영향 없음. */
export function RecruitSafeProvider({
  enabled = false,
  children,
}: {
  enabled?: boolean;
  children: ReactNode;
}) {
  return <RecruitSafeContext.Provider value={enabled}>{children}</RecruitSafeContext.Provider>;
}

export function useRecruitSafe() {
  return useContext(RecruitSafeContext);
}
