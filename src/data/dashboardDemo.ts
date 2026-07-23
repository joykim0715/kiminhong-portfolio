/**
 * 시니어 헬스케어 의사결정 대시보드 데모.
 * 실제 사용했던 Figma/운영 화면 구성(1~3)을 기준으로 재구성했습니다.
 * 수치는 합성 데이터이며 실제 참여자·원본 로그는 포함하지 않습니다.
 */

export const dashboardDemoPath = "/demo" as const;

export const dashboardDemo = {
  meta: {
    title: "Decision Dashboard Demo",
    pageTitle: "의사결정 대시보드 데모 — Inhong Kim",
    description:
      "시니어 헬스케어 실증용 대시보드 데모 — 참여자 현황, 건강센터 수집, 스마트홈 위험 감지를 한 화면에서 확인합니다.",
  },
  header: {
    eyebrow: "Interactive Demo",
    title: "시니어 헬스케어 운영 대시보드",
    subtitle:
      "실제 기획·활용했던 화면 구성을 웹 데모로 재현했습니다. 참여자 현황 → 센터 수집 → 스마트홈 위험 감지 흐름으로 의사결정을 지원합니다.",
    backLabel: "← Portfolio",
    backHref: "/",
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
      note: "실증 대상 전체",
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
      label: "건강센터 수집률",
      value: "91",
      unit: "%",
      note: "예정 대비 완료",
      tone: "good" as const,
    },
    {
      id: "risks",
      label: "실시간 위험 알림",
      value: "7",
      unit: "건",
      note: "미확인 포함",
      tone: "warn" as const,
    },
  ],
  /** 1. 사용자 일반 정보 현황 */
  demographics: {
    sectionLabel: "01 · Participants",
    title: "사용자 일반 정보 현황",
    description: "나이·성별·키·체중 등 기본 프로필을 한눈에 파악하는 영역입니다.",
    summary: [
      { label: "평균 연령", value: "72.4세" },
      { label: "평균 키", value: "158.2cm" },
      { label: "평균 체중", value: "59.6kg" },
      { label: "BMI 평균", value: "23.8" },
    ],
    gender: [
      { id: "female", label: "여성", value: 138, pct: 62 },
      { id: "male", label: "남성", value: 86, pct: 38 },
    ],
    ageBands: [
      { label: "65–69", count: 48 },
      { label: "70–74", count: 71 },
      { label: "75–79", count: 58 },
      { label: "80–84", count: 32 },
      { label: "85+", count: 15 },
    ],
  },
  /** 2. 건강 센터 데이터 수집 현황 */
  collection: {
    sectionLabel: "02 · Health Center",
    title: "건강 센터 데이터 수집 현황",
    description: "센터별 방문·측정 수집이 예정 대비 얼마나 채워졌는지 모니터링합니다.",
    centers: [
      { id: "c1", name: "A 건강센터", planned: 56, collected: 54, rate: 96 },
      { id: "c2", name: "B 건강센터", planned: 48, collected: 45, rate: 94 },
      { id: "c3", name: "C 건강센터", planned: 42, collected: 39, rate: 93 },
      { id: "c4", name: "D 건강센터", planned: 38, collected: 31, rate: 82 },
      { id: "c5", name: "E 건강센터", planned: 40, collected: 35, rate: 88 },
    ],
    metrics: [
      { label: "누적 측정", value: "6.9만", unit: "건" },
      { label: "금주 수집", value: "1,240", unit: "건" },
      { label: "미완료 일정", value: "18", unit: "건" },
    ],
  },
  /** 3. 스마트홈 실시간 위험 감지 */
  risks: {
    sectionLabel: "03 · Smart Home",
    title: "스마트홈 실시간 위험 감지",
    description: "낙상·혈압 이상 등 현장 대응이 필요한 신호를 우선순위로 보여줍니다.",
    status: [
      { id: "fall", label: "낙상 감지", count: 2, tone: "high" as const },
      { id: "bp", label: "혈압 이상", count: 3, tone: "high" as const },
      { id: "hr", label: "심박 이상", count: 1, tone: "med" as const },
      { id: "inactive", label: "장시간 무활동", count: 1, tone: "med" as const },
    ],
    columns: ["시간", "유형", "위치/센서", "상태", "우선순위"],
    rows: [
      {
        id: "r1",
        time: "14:22",
        type: "낙상 감지",
        source: "거실 · 모션센서",
        status: "미확인",
        priority: "High" as const,
      },
      {
        id: "r2",
        time: "13:51",
        type: "혈압 이상",
        source: "혈압계 · 수축기 168",
        status: "확인 중",
        priority: "High" as const,
      },
      {
        id: "r3",
        time: "12:08",
        type: "혈압 이상",
        source: "혈압계 · 이완기 98",
        status: "미확인",
        priority: "High" as const,
      },
      {
        id: "r4",
        time: "11:40",
        type: "심박 이상",
        source: "웨어러블 · 분당 118",
        status: "모니터링",
        priority: "Med" as const,
      },
      {
        id: "r5",
        time: "10:15",
        type: "장시간 무활동",
        source: "침실 · 4시간+",
        status: "콜 완료",
        priority: "Med" as const,
      },
      {
        id: "r6",
        time: "09:33",
        type: "낙상 감지",
        source: "욕실 · 충격센서",
        status: "오탐 처리",
        priority: "Low" as const,
      },
      {
        id: "r7",
        time: "08:47",
        type: "혈압 이상",
        source: "혈압계 · 수축기 152",
        status: "가이드 발송",
        priority: "Low" as const,
      },
    ],
  },
  insight: {
    sectionLabel: "Decision Note",
    title: "이 화면으로 무엇을 결정했나",
    points: [
      "참여자 프로필·센터 수집·스마트홈 위험을 한 화면에 모아 운영·파트너 미팅에서 즉시 설명",
      "심미성보다 ‘지금 누구를·어느 센터를·어떤 위험을’ 볼지가 보이는 구조를 우선",
      "MOU·서비스 계약 5건 의사결정 자료로 활용 (포트폴리오 실적 기준)",
    ],
  },
  footerNote: "Synthetic demo · reconstructed from actual dashboard IA (participants · center · smart-home risk)",
} as const;

export type DashboardDemo = typeof dashboardDemo;
