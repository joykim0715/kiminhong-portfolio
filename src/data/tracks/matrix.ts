import type { CardWeight, ExperienceCardId, ProofMetric, TrackId } from "./types";

/**
 * 경험 카드 × 트랙 가중치.
 * 사실(숫자·기간·자격)은 content.ts / 기준정보가 우선. 여기에는 강조만 둔다.
 * 없는 경력을 만들지 않는다. 세일즈는 현장 설득·제휴·의사결정 지원으로만 말한다.
 */
export const EXPERIENCE_CARDS: Record<
  ExperienceCardId,
  { label: string; workIds: string[]; note: string }
> = {
  "national-data": {
    label: "국책 데이터",
    workIds: ["01"],
    note: "6.9만 건, 유효 85%, 대시보드, /demo. 의사결정 5건은 보조 강조.",
  },
  "national-field": {
    label: "국책 현장",
    workIds: ["01"],
    note: "150명 참여, 리텐션 83%, 현장 면담.",
  },
  "student-partnership": {
    label: "학생회 제휴",
    workIds: ["04"],
    note: "200명 설문, 제휴 물량 +30%.",
  },
  floorball: {
    label: "플로어볼",
    workIds: [],
    note: "슈팅 64%→75%, 2024 대학선수권 우승. 별도 작품 카드 없음 — Story로만.",
  },
  "barrier-free": {
    label: "배리어프리맵",
    workIds: ["03"],
    note: "전 트랙 장단점 소재. 주력 featured는 아님.",
  },
};

export const CARD_WEIGHTS: Record<TrackId, Record<ExperienceCardId, CardWeight>> = {
  research: {
    "national-data": "featured",
    "national-field": "support",
    "student-partnership": "low",
    floorball: "low",
    "barrier-free": "strength",
  },
  planning: {
    "national-data": "featured",
    "national-field": "support",
    "student-partnership": "featured",
    floorball: "low",
    "barrier-free": "strength",
  },
  marketing: {
    "national-data": "support",
    "national-field": "featured",
    "student-partnership": "featured",
    floorball: "featured",
    "barrier-free": "strength",
  },
  sales: {
    "national-data": "support",
    "national-field": "featured",
    "student-partnership": "featured",
    floorball: "low",
    "barrier-free": "strength",
  },
};

export const TRACK_NAV: {
  id: TrackId;
  href: string;
  label: string;
  shortLabel: string;
}[] = [
  { id: "research", href: "/", label: "연구원", shortLabel: "연구원" },
  { id: "planning", href: "/planning", label: "기획", shortLabel: "기획" },
  { id: "marketing", href: "/marketing", label: "마케팅", shortLabel: "마케팅" },
  { id: "sales", href: "/sales", label: "세일즈", shortLabel: "세일즈" },
];

export const TRACK_HREF: Record<TrackId, string> = {
  research: "/",
  planning: "/planning",
  marketing: "/marketing",
  sales: "/sales",
};

/** Works featured 순서 — 없는 프로젝트 id를 만들지 않음 (01–05만). */
export const FEATURED_WORK_IDS: Record<TrackId, string[]> = {
  research: ["01"],
  planning: ["01", "04"],
  marketing: ["05", "04"],
  sales: ["04"],
};

export const SKILL_ORDER: Record<TrackId, string[]> = {
  research: ["oa", "data", "viz", "ai"],
  planning: ["data", "viz", "oa", "ai"],
  marketing: ["viz", "ai", "oa", "data"],
  sales: ["oa", "data", "viz", "ai"],
};

export const PROOF_METRICS: Record<TrackId, ProofMetric[] | undefined> = {
  research: undefined,
  planning: [
    { value: "6.9만", label: "로그 데이터" },
    { value: "85%", label: "분석 유효" },
    { value: "+30%", label: "제휴 물량" },
  ],
  marketing: [
    { value: "83%", label: "리텐션" },
    { value: "+30%", label: "제휴 물량" },
    { value: "64→75%", label: "슈팅 성공률" },
  ],
  sales: [
    { value: "150명", label: "현장 참여" },
    { value: "+30%", label: "제휴 물량" },
    { value: "5건", label: "MOU·계약 지원" },
  ],
};
