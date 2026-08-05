/**
 * 시니어 헬스케어 의사결정 대시보드 데모.
 * Figma「20251230 피드백 수정 부분」핵심 3화면 IA 기준:
 * 메인메뉴 운영현황 · 개인 방문/측정 · 스마트홈 원격모니터링.
 * 수치는 합성 데이터이며 실제 참여자·원본 로그는 포함하지 않습니다.
 */

export const dashboardDemoPath: string = "/demo";

export const dashboardDemo = {
  meta: {
    title: "Decision Dashboard Demo",
    pageTitle: "의사결정 대시보드 데모 — Inhong Kim",
    description:
      "시니어 헬스케어 실증용 대시보드 데모 — 운영현황, 개인 방문·측정, 스마트홈 원격모니터링을 한 화면에서 확인합니다.",
  },
  header: {
    eyebrow: "Interactive Demo",
    title: "AAL 스마트 홈케어 운영 대시보드",
    subtitle:
      "피드백 반영 기획안(메인메뉴 · 개인 방문/측정 · 스마트홈 원격모니터링)을 웹 데모로 재현했습니다. H코드 기준으로 운영·현장 대응을 지원합니다.",
    backLabel: "← Portfolio",
    backHref: "/",
    projectLabel: "Project 01 · Case Study",
    disclaimer:
      "데모용 합성 데이터입니다. 실제 참여자 개인정보·원본 로그는 포함하지 않습니다.",
  },
  kpis: [
    {
      id: "utilization",
      label: "장비 가동률",
      value: "87",
      unit: "%",
      note: "검증센터 전체",
      tone: "good" as const,
    },
    {
      id: "homes",
      label: "스마트홈 구축",
      value: "312",
      unit: "가구",
      note: "인천 실증 구역",
      tone: "neutral" as const,
    },
    {
      id: "visits",
      label: "금주 방문·측정",
      value: "1,240",
      unit: "건",
      note: "센터 방문 기준",
      tone: "good" as const,
    },
    {
      id: "monitor",
      label: "모니터링 알림",
      value: "9",
      unit: "건",
      note: "미확인 포함",
      tone: "warn" as const,
    },
  ],
  /** 01 · 메인메뉴 — AAL 운영현황 */
  overview: {
    sectionLabel: "01 · Operations",
    title: "AAL 스마트 홈케어 서비스 검증센터 운영현황",
    description:
      "장비 가동률과 지역별 스마트홈 구축, 실시간 가구 상태를 한눈에 보는 메인 운영 화면입니다.",
    utilizationTitle: "전체 장비 가동률",
    utilizationUnit: "%",
    months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
    utilizationSeries: [72, 78, 81, 76, 84, 88, 86, 90, 87, 85, 83, 87],
    buildTitle: "스마트홈 구축 현황",
    buildSubtitle: "현재 스마트홈 구축 달성률",
    buildRate: "78%",
    regions: [
      { id: "michuhol", name: "미추홀구", households: 64, active: true },
      { id: "dong", name: "동구", households: 28, active: false },
      { id: "jung", name: "중구", households: 41, active: false },
      { id: "yeonsu", name: "연수구", households: 52, active: false },
      { id: "namdong", name: "남동구", households: 47, active: false },
      { id: "bupyeong", name: "부평구", households: 38, active: false },
      { id: "gyeyang", name: "계양구", households: 22, active: false },
      { id: "seo", name: "서구", households: 20, active: false },
    ],
    regionUnit: "가구",
    liveTitle: "실시간 스마트홈",
    liveItems: [
      { id: "l1", code: "H-011", people: "1명", status: "정상", tone: "ok" as const },
      { id: "l2", code: "H-014", people: "2명", status: "주의", tone: "warn" as const },
      { id: "l3", code: "H-026", people: "1명", status: "확인", tone: "alert" as const },
    ],
  },
  /** 02 · 개인 방문 및 측정 현황 */
  visits: {
    sectionLabel: "02 · Visits & Measures",
    title: "개인 방문 및 측정 현황",
    description:
      "코호트 연령 분포와 방문·측정 수집 추이로 센터 운영 밀도를 점검합니다.",
    ageTitle: "코호트 연령 분포",
    ageSlices: [
      { id: "u50", label: "50대 이하", value: 8, color: "#7eb8b3" },
      { id: "a50", label: "50–60", value: 18, color: "#5fa8a3" },
      { id: "a60", label: "60–70", value: 34, color: "#4a8f9a" },
      { id: "a70", label: "70–80", value: 28, color: "#3d7a86" },
      { id: "a80", label: "80대 이상", value: 12, color: "#2f5f78" },
    ],
    metrics: [
      { label: "누적 방문", value: "4,820", unit: "건" },
      { label: "누적 측정", value: "6.9만", unit: "건" },
      { label: "금주 방문", value: "186", unit: "건" },
      { label: "미완료 일정", value: "18", unit: "건" },
    ],
    trendTitle: "월별 방문·측정 건수",
    trendLabels: ["7월", "8월", "9월", "10월", "11월", "12월"],
    visitSeries: [142, 158, 171, 165, 180, 186],
    measureSeries: [980, 1050, 1120, 1090, 1180, 1240],
    visitSeriesLabel: "방문",
    measureSeriesLabel: "측정",
    labsTitle: "측정실별 수집률",
    labsAriaLabel: "측정실별 수집률",
    labs: [
      { id: "c1", name: "체성분 측정실", planned: 56, collected: 54, rate: 96 },
      { id: "c2", name: "근력 측정실", planned: 48, collected: 45, rate: 94 },
      { id: "c3", name: "인지 능력 측정실", planned: 42, collected: 39, rate: 93 },
      { id: "c4", name: "낙상 위험도 측정실", planned: 38, collected: 31, rate: 82 },
    ],
  },
  /** 03 · 스마트홈 원격모니터링 */
  monitoring: {
    sectionLabel: "03 · Smart Home",
    title: "스마트홈 원격모니터링",
    description:
      "심혈관계·근골격계·정신건강 카테고리별로 가구(H코드) 상태를 지역 단위로 모니터링합니다.",
    regionLabel: "지역 선택",
    regions: [
      { id: "michuhol", name: "미추홀구" },
      { id: "dong", name: "동구" },
      { id: "jung", name: "중구" },
      { id: "yeonsu", name: "연수구" },
      { id: "namdong", name: "남동구" },
      { id: "bupyeong", name: "부평구" },
      { id: "gyeyang", name: "계양구" },
      { id: "seo", name: "서구" },
    ],
    categories: [
      {
        id: "cardio",
        label: "심혈관계",
        hint: "혈압·심박 이상 가구",
        households: [
          { id: "h1", code: "H-001", people: "1명", status: "주의", tone: "warn" as const, note: "수축기 상승" },
          { id: "h2", code: "H-007", people: "2명", status: "정상", tone: "ok" as const, note: "안정 구간" },
          { id: "h3", code: "H-012", people: "1명", status: "확인", tone: "alert" as const, note: "심박 118" },
          { id: "h4", code: "H-019", people: "1명", status: "정상", tone: "ok" as const, note: "가이드 완료" },
          { id: "h5", code: "H-022", people: "2명", status: "주의", tone: "warn" as const, note: "이완기 상승" },
          { id: "h6", code: "H-031", people: "1명", status: "정상", tone: "ok" as const, note: "모니터링 중" },
        ],
      },
      {
        id: "msk",
        label: "근골격계",
        hint: "낙상·외상 신호 가구",
        households: [
          { id: "h1", code: "H-014", people: "1명", status: "확인", tone: "alert" as const, note: "하지 충격" },
          { id: "h2", code: "H-026", people: "1명", status: "주의", tone: "warn" as const, note: "균형 저하" },
          { id: "h3", code: "H-033", people: "2명", status: "정상", tone: "ok" as const, note: "활동 정상" },
          { id: "h4", code: "H-041", people: "1명", status: "정상", tone: "ok" as const, note: "오탐 해제" },
          { id: "h5", code: "H-045", people: "1명", status: "주의", tone: "warn" as const, note: "보행 패턴" },
          { id: "h6", code: "H-052", people: "2명", status: "확인", tone: "alert" as const, note: "욕실 충격" },
        ],
      },
      {
        id: "mental",
        label: "정신건강",
        hint: "수면·활동·정서 신호",
        households: [
          { id: "h1", code: "H-008", people: "1명", status: "주의", tone: "warn" as const, note: "수면 분절" },
          { id: "h2", code: "H-016", people: "1명", status: "정상", tone: "ok" as const, note: "활동 유지" },
          { id: "h3", code: "H-021", people: "2명", status: "확인", tone: "alert" as const, note: "무활동 증가" },
          { id: "h4", code: "H-028", people: "1명", status: "정상", tone: "ok" as const, note: "상담 완료" },
          { id: "h5", code: "H-036", people: "1명", status: "주의", tone: "warn" as const, note: "야간 각성" },
          { id: "h6", code: "H-048", people: "1명", status: "정상", tone: "ok" as const, note: "안정" },
        ],
      },
    ],
    statusSummary: [
      { id: "alert", label: "확인 필요", count: 3, tone: "high" as const },
      { id: "warn", label: "주의", count: 4, tone: "med" as const },
      { id: "ok", label: "정상", count: 2, tone: "ok" as const },
    ],
    countSuffix: "건",
  },
  insight: {
    sectionLabel: "Decision Note",
    title: "이 화면으로 무엇을 결정했나",
    points: [
      "운영현황·방문/측정·스마트홈 모니터링을 한 흐름으로 묶어 파트너·단장 미팅에서 즉시 설명",
      "S번호 대신 H코드로 가구를 식별하고, 카테고리 탭으로 현장 대응 우선순위를 분리",
      "MOU·서비스 계약 5건 의사결정 자료로 활용 (포트폴리오 실적 기준)",
    ],
  },
  footerNote:
    "Synthetic demo · reconstructed from Figma feedback IA (ops overview · visits/measures · smart-home remote monitoring)",
} as const;

export type DashboardDemo = typeof dashboardDemo;
