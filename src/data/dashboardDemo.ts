/**
 * 시니어 헬스케어 의사결정 대시보드 데모용 콘텐츠·합성 데이터.
 * 실제 참여자·원본 로그는 포함하지 않습니다.
 */

export const dashboardDemoPath = "/demo" as const;

export const dashboardDemo = {
  meta: {
    title: "Decision Dashboard Demo",
    pageTitle: "의사결정 대시보드 데모 — Inhong Kim",
    description:
      "시니어 헬스케어 실증의 참여·데이터 품질·이탈 위험 지표를 한 화면에서 보는 인터랙티브 데모입니다. 합성 데이터 기반.",
  },
  header: {
    eyebrow: "Interactive Demo",
    title: "시니어 헬스케어 의사결정 대시보드",
    subtitle:
      "파트너사·운영팀이 B2B 미팅에서 바로 쓰는 핵심 KPI 화면입니다. Figma 기획을 웹 데모로 30% 구현한 버전입니다.",
    backLabel: "← Portfolio",
    backHref: "/",
    projectLabel: "Project 01 · Case Study",
    disclaimer:
      "데모용 합성 데이터입니다. 실제 참여자 개인정보·원본 로그는 포함하지 않습니다.",
  },
  /** 포트폴리오 실적과 맞춘 요약 KPI */
  kpis: [
    {
      id: "participants",
      label: "활성 참여자",
      value: "150",
      unit: "명",
      note: "전체 224명 중 67%",
      tone: "neutral" as const,
    },
    {
      id: "retention",
      label: "참여 유지율",
      value: "83",
      unit: "%",
      note: "맞춤형 건강 가이드 적용 후",
      tone: "good" as const,
    },
    {
      id: "validity",
      label: "분석 유효성",
      value: "85",
      unit: "%",
      note: "blackout 구간 관리 후",
      tone: "good" as const,
    },
    {
      id: "blackout",
      label: "Blackout 비율",
      value: "12",
      unit: "%",
      note: "주간 로그 공백 구간",
      tone: "warn" as const,
    },
  ],
  trend: {
    sectionLabel: "Weekly Trend",
    title: "주간 참여·데이터 품질 추이",
    description: "운영 개입 이후 리텐션과 유효성이 함께 회복되는 구간을 보여줍니다.",
    weeks: [
      { week: "W1", active: 118, retention: 71, validity: 68, blackout: 24 },
      { week: "W2", active: 124, retention: 73, validity: 71, blackout: 22 },
      { week: "W3", active: 129, retention: 75, validity: 74, blackout: 20 },
      { week: "W4", active: 133, retention: 76, validity: 76, blackout: 18 },
      { week: "W5", active: 138, retention: 78, validity: 79, blackout: 16 },
      { week: "W6", active: 142, retention: 80, validity: 81, blackout: 15 },
      { week: "W7", active: 146, retention: 81, validity: 83, blackout: 14 },
      { week: "W8", active: 150, retention: 83, validity: 85, blackout: 12 },
    ],
    series: [
      { id: "active", label: "활성 참여자(명)", color: "var(--clr-secondary)" },
      { id: "retention", label: "리텐션(%)", color: "var(--clr-primary)" },
      { id: "validity", label: "유효성(%)", color: "#8bb8a8" },
    ],
  },
  alerts: {
    sectionLabel: "Risk Alerts",
    title: "이상 구간 · 이탈 위험 알림",
    description: "의사결정자가 바로 후속 액션을 잡을 수 있도록 위험군만 추렸습니다.",
    columns: ["ID", "유형", "신호", "권장 액션", "우선순위"],
    rows: [
      {
        id: "P-041",
        type: "이탈 위험",
        signal: "야간 미착용 3일 + 기능 사용 급감",
        action: "온보딩 재안내 · 현장 콜",
        priority: "High" as const,
      },
      {
        id: "P-088",
        type: "Blackout",
        signal: "주간 로그 공백 42시간",
        action: "기기 충전·착용 가이드 발송",
        priority: "High" as const,
      },
      {
        id: "P-112",
        type: "이탈 위험",
        signal: "가이드 열람 0회 / 7일",
        action: "맞춤형 가이드 재구성",
        priority: "Med" as const,
      },
      {
        id: "P-019",
        type: "Blackout",
        signal: "센서 오류 의 결측 반복",
        action: "기기 교체 검토",
        priority: "Med" as const,
      },
      {
        id: "P-156",
        type: "품질 주의",
        signal: "유효성 구간 78% (목표 85% 미만)",
        action: "주간 품질 리뷰 포함",
        priority: "Low" as const,
      },
    ],
  },
  insight: {
    sectionLabel: "Decision Note",
    title: "이 화면으로 무엇을 결정했나",
    points: [
      "활성 사용자·이탈 위험군·blackout을 한 화면에 모아 B2B 미팅에서 즉시 설명",
      "심미성보다 ‘다음에 누구를 관리할지’가 보이는 지표 구조를 우선",
      "MOU·서비스 계약 5건 의사결정 자료로 활용 (포트폴리오 실적 기준)",
    ],
  },
  footerNote: "Synthetic demo · aligned with Project 01 outcomes (85% validity · 83% retention)",
} as const;

export type DashboardDemo = typeof dashboardDemo;
