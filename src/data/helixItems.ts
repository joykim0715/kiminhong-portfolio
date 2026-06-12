import { works } from "./works";

export type HelixItem = {
  id: string;
  title: string;
  org?: string;
  date?: string;
  description: string;
  tags?: string[];
  link?: string;
  type: "Project" | "Certification";
};

const certifications: HelixItem[] = [
  {
    id: "cert-01",
    title: "Google Analytics Certification (GA4)",
    org: "Google",
    date: "2026.02.03",
    description:
      "웹·앱 사용자 행동 데이터를 이벤트 기반으로 분석하는 역량을 인증한 자격입니다.",
    tags: ["Google Analytics", "Certification"],
    type: "Certification",
  },
  {
    id: "cert-02",
    title: "스마트홈 헬스케어 지도사 2급",
    org: "대한스마트홈헬스케어협회",
    date: "2025.11.14",
    description:
      "스마트홈 기술과 헬스케어 서비스를 결합한 맞춤형 건강 관리 역량을 인증한 자격입니다.",
    tags: ["Digital Health", "Certification"],
    type: "Certification",
  },
  {
    id: "cert-03",
    title: "우등 졸업상 (Magna Cum Laude)",
    org: "성균관대학교",
    date: "2025.08.25",
    description: "학업 우수자로 선정되어 졸업 시 수여받은 상입니다.",
    tags: ["Award", "Academic"],
    type: "Certification",
  },
  {
    id: "cert-04",
    title: "학생군사교육단 우수후보생 표창",
    org: "성균관대학교",
    date: "2022.08.25",
    description: "ROTC 우수 후보생으로 선정되어 수여받은 총장 표창입니다.",
    tags: ["Award", "Leadership"],
    type: "Certification",
  },
  {
    id: "cert-05",
    title: "데이터분석준전문가 (ADsP)",
    org: "한국데이터베이스진흥원",
    date: "2026.06",
    description: "데이터 분석 기획·전처리·통계 분석 역량을 인증한 국가공인 자격입니다.",
    tags: ["Data Analysis", "Certification"],
    type: "Certification",
  },
  {
    id: "cert-06",
    title: "AIBT 2급",
    org: "한국생산성본부(KPC)",
    date: "2026.04",
    description: "AI 기반 비즈니스·기술 활용 역량을 인증한 과정입니다.",
    tags: ["AI", "Certification"],
    type: "Certification",
  },
  {
    id: "cert-07",
    title: "AI-POT 2급",
    org: "한국생산성본부",
    date: "2026.04",
    description: "AI 프로젝트 활용 역량을 인증한 과정입니다.",
    tags: ["AI", "Certification"],
    type: "Certification",
  },
  {
    id: "cert-08",
    title: "2025 추계 한국운동재활학회 우수 포스터상",
    org: "한국운동재활협회",
    date: "2025.11",
    description: "운동재활 학회 우수 포스터 발표로 선정된 수상입니다.",
    tags: ["Award", "Research"],
    type: "Certification",
  },
  {
    id: "cert-09",
    title: "2024 전국대학플로어볼선수권 대회 우승",
    org: "대한플로어볼협회",
    date: "2024.07",
    description: "전국대학 플로어볼 선수권 대회 우승.",
    tags: ["Award", "Sports"],
    type: "Certification",
  },
  {
    id: "cert-10",
    title: "TOEIC 850점",
    org: "ETS",
    date: "2025.02",
    description: "영어 의사소통 역량을 인증한 시험 성적입니다.",
    tags: ["Language", "Certification"],
    type: "Certification",
  },
  {
    id: "cert-11",
    title: "OPIC Intermediate High",
    org: "ACTFL",
    date: "2025.08",
    description: "영어 말하기 역량 IH 등급을 인증한 시험 성적입니다.",
    tags: ["Language", "Certification"],
    type: "Certification",
  },
];

function parseDate(details?: string[]): string | undefined {
  const period = details?.find((d) => d.startsWith("기간:"));
  return period?.replace("기간:", "").trim();
}

export const helixItems: HelixItem[] = [
  ...works.map((work) => ({
    id: work.id,
    title: work.title,
    org: work.category,
    date: parseDate(work.details),
    description: work.description,
    tags: [work.category, "Project"],
    type: "Project" as const,
  })),
  ...certifications,
];
