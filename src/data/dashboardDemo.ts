/**
 * 시니어 헬스케어 의사결정 대시보드 데모.
 * Figma「20251230 피드백 수정」IA를 기존 3섹션 구조에 맞춰 보정했습니다.
 * 수치는 합성 데이터이며 실제 참여자·원본 로그는 포함하지 않습니다.
 */

export const dashboardDemoPath: string = "/demo";

export const dashboardDemo = {
  meta: {
    title: "Decision Dashboard Demo",
    pageTitle: "의사결정 대시보드 데모 — Inhong Kim",
    description:
      "시니어 헬스케어 실증용 대시보드 데모 — 코호트 프로필, 방문·측정 수집, 스마트홈 원격모니터링을 한 화면에서 확인합니다.",
  },
  header: {
    eyebrow: "Interactive Demo",
    title: "AAL 스마트 홈케어 운영 대시보드",
    subtitle:
      "피드백 반영 기획안을 기존 의사결정 3섹션으로 재현했습니다. 코호트 현황 → 방문·측정 수집 → 스마트홈 원격모니터링(H코드) 흐름입니다.",
    backLabel: "← Portfolio",
    backHref: "/#works",
    projectLabel: "Project 01 · Case Study",
    disclaimer:
      "데모용 합성 데이터입니다. 실제 참여자 개인정보·원본 로그는 포함하지 않습니다.",
  },
  kpis: [
    {
      id: "enrolled",
      label: "등록 참여자",
      value: "224",
      unit: "명",
      note: "코호트 전체",
      tone: "neutral" as const,
    },
    {
      id: "active",
      label: "활성 참여자",
      value: "150",
      unit: "명",
      note: "최근 7일 로그 기준",
      tone: "good" as const,
    },
    {
      id: "centers",
      label: "방문·측정 수집률",
      value: "92",
      unit: "%",
      note: "예정 대비 완료",
      tone: "good" as const,
    },
    {
      id: "risks",
      label: "모니터링 알림",
      value: "6",
      unit: "건",
      note: "H코드 미확인 포함",
      tone: "warn" as const,
    },
  ],
  /** 1. 사용자 일반 정보 현황 (코호트 프로필) */
  demographics: {
    sectionLabel: "01 · Cohort",
    title: "사용자 일반 정보 현황",
    description:
      "코호트 나이·성별·키·체중 등 기본 프로필을 센터 방문 회차(1~5)별 분포로 탐색합니다.",
    boardTitle: "회차별 분포",
    visitAxisLabel: "센터 방문 회차",
    countSuffix: "명",
    summary: [
      { label: "평균 연령", value: "72.4세" },
      { label: "평균 키", value: "158.2cm" },
      { label: "평균 체중", value: "59.6kg" },
      { label: "BMI 평균", value: "23.8" },
    ],
    visitLabels: ["1회차", "2회차", "3회차", "4회차", "5회차"],
    metricTabs: [
      {
        id: "age",
        label: "연령",
        hint: "회차별 평균 연령",
        unit: "세",
        chart: "line" as const,
        series: [71.8, 72.1, 72.4, 72.6, 72.9],
      },
      {
        id: "gender",
        label: "성별",
        hint: "회차별 여성 비율",
        unit: "%",
        chart: "bar" as const,
        series: [61, 62, 63, 62, 64],
        seriesLabel: "여성 비율",
      },
      {
        id: "height",
        label: "키",
        hint: "회차별 평균 키",
        unit: "cm",
        chart: "bar" as const,
        series: [158.0, 158.1, 158.2, 158.3, 158.2],
      },
      {
        id: "weight",
        label: "체중",
        hint: "회차별 평균 체중",
        unit: "kg",
        chart: "bar" as const,
        series: [60.2, 59.9, 59.6, 59.4, 59.1],
      },
      {
        id: "bmi",
        label: "BMI",
        hint: "회차별 BMI 평균",
        unit: "",
        chart: "bar" as const,
        series: [24.1, 23.9, 23.8, 23.7, 23.6],
      },
    ],
  },
  /** 2. 개인 방문 및 측정 현황 */
  collection: {
    sectionLabel: "02 · Visits & Measures",
    title: "개인 방문 및 측정 현황",
    description: "측정실별 방문·측정 수집이 예정 대비 얼마나 채워졌는지 모니터링합니다.",
    labsAriaLabel: "측정실별 수집률",
    centers: [
      { id: "c1", name: "체성분 측정실", planned: 56, collected: 54, rate: 96 },
      { id: "c2", name: "근력 측정실", planned: 48, collected: 45, rate: 94 },
      { id: "c3", name: "인지 능력 측정실", planned: 42, collected: 39, rate: 93 },
      { id: "c4", name: "낙상 위험도 측정실", planned: 38, collected: 31, rate: 82 },
    ],
    metrics: [
      { label: "누적 방문", value: "4,820", unit: "건" },
      { label: "누적 측정", value: "6.9만", unit: "건" },
      { label: "미완료 일정", value: "18", unit: "건" },
    ],
  },
  /** 3. 스마트홈 원격모니터링 */
  risks: {
    sectionLabel: "03 · Smart Home",
    title: "스마트홈 원격모니터링",
    description:
      "심혈관·근골격·정신건강 신호를 H코드 가구 단위로 우선순위에 따라 모니터링합니다.",
    status: [
      { id: "cardio", label: "심혈관계", count: 3, tone: "high" as const },
      { id: "msk", label: "근골격계", count: 2, tone: "high" as const },
      { id: "mental", label: "정신건강", count: 1, tone: "med" as const },
    ],
    countSuffix: "건",
    columns: ["시간", "코드", "유형", "위치/센서", "상태", "우선순위"],
    rows: [
      {
        id: "r1",
        time: "14:22",
        code: "H-014",
        type: "근골격 · 낙상",
        source: "거실 · 모션센서",
        status: "미확인",
        priority: "High" as const,
      },
      {
        id: "r2",
        time: "13:51",
        code: "H-001",
        type: "심혈관 · 혈압",
        source: "혈압계 · 수축기 168",
        status: "확인 중",
        priority: "High" as const,
      },
      {
        id: "r3",
        time: "12:08",
        code: "H-007",
        type: "심혈관 · 혈압",
        source: "혈압계 · 이완기 98",
        status: "미확인",
        priority: "High" as const,
      },
      {
        id: "r4",
        time: "11:40",
        code: "H-012",
        type: "심혈관 · 심박",
        source: "웨어러블 · 분당 118",
        status: "모니터링",
        priority: "Med" as const,
      },
      {
        id: "r5",
        time: "09:33",
        code: "H-026",
        type: "근골격 · 충격",
        source: "욕실 · 충격센서",
        status: "오탐 처리",
        priority: "Low" as const,
      },
      {
        id: "r6",
        time: "08:47",
        code: "H-021",
        type: "정신건강 · 무활동",
        source: "거실 · 활동센서",
        status: "가이드 발송",
        priority: "Low" as const,
      },
    ],
  },
  insight: {
    sectionLabel: "Decision Note",
    title: "이 화면으로 무엇을 결정했나",
    points: [
      "코호트 프로필·방문/측정·스마트홈 모니터링을 한 흐름으로 묶어 운영·파트너 미팅에서 즉시 설명",
      "S번호 대신 H코드로 가구를 식별하고, 심혈관·근골격·정신건강 카테고리로 대응 우선순위를 분리",
      "MOU·서비스 계약 5건 의사결정 자료로 활용 (포트폴리오 실적 기준)",
    ],
  },
  footerNote:
    "Synthetic demo · feedback-aligned IA (cohort · visits/measures · smart-home remote monitoring)",
} as const;

export type DashboardDemo = typeof dashboardDemo;
