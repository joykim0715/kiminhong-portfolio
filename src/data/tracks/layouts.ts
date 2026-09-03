import type { TrackId } from "./types";

export type TrackSectionId =
  | "hero"
  | "proof"
  | "gradient"
  | "cases"
  | "values"
  | "skills"
  | "education"
  | "experience"
  | "works"
  | "blend"
  | "story"
  | "contact";

export type TrackNavItem = { id: string; label: string };

export type TrackLayout = {
  sections: TrackSectionId[];
  nav: TrackNavItem[];
  worksPin: boolean;
  collapseSecondaryExperience: boolean;
};

const RESEARCH_NAV: TrackNavItem[] = [
  { id: "hero", label: "Home" },
  { id: "values", label: "Values" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "works", label: "Work" },
  { id: "story", label: "Story" },
  { id: "contact", label: "Contact" },
];

/** 네 트랙 공통 섹션 순서. 차이는 히어로 구도·팔레트·스크롤 브리지. */
const SHARED_SECTIONS: TrackSectionId[] = [
  "hero",
  "proof",
  "gradient",
  "values",
  "skills",
  "education",
  "experience",
  "works",
  "blend",
  "story",
  "contact",
];

export const TRACK_LAYOUT: Record<TrackId, TrackLayout> = {
  research: {
    sections: SHARED_SECTIONS,
    nav: RESEARCH_NAV,
    worksPin: true,
    collapseSecondaryExperience: false,
  },
  planning: {
    sections: SHARED_SECTIONS,
    nav: RESEARCH_NAV,
    worksPin: true,
    collapseSecondaryExperience: false,
  },
  marketing: {
    sections: SHARED_SECTIONS,
    nav: RESEARCH_NAV,
    worksPin: true,
    collapseSecondaryExperience: false,
  },
  sales: {
    sections: SHARED_SECTIONS,
    nav: RESEARCH_NAV,
    worksPin: true,
    collapseSecondaryExperience: false,
  },
};

export const PLANNING_PROCESS = [
  {
    step: "01",
    title: "수요",
    detail: "재학생 200명 설문으로 제휴 우선순위를 정했습니다.",
  },
  {
    step: "02",
    title: "제안",
    detail: "로그 6.9만 건을 대시보드로 묶어 의사결정을 도왔습니다.",
  },
  {
    step: "03",
    title: "남는 숫자",
    detail: "제휴 물량 +30%, 분석 유효 85%.",
  },
] as const;
