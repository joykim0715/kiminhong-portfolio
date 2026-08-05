/**
 * English labels for `/en/demo`.
 * Structure mirrors `dashboardDemo.ts` (synthetic data).
 */

export const dashboardDemoEn = {
  meta: {
    title: "Decision Dashboard Demo",
    pageTitle: "Operations Dashboard Demo — Inhong Kim",
    description:
      "Interactive demo of a senior healthcare operations dashboard — center ops, visits & measures, and smart-home remote monitoring.",
  },
  header: {
    eyebrow: "Interactive Demo",
    title: "AAL smart home-care operations dashboard",
    subtitle:
      "Rebuilt from the feedback-aligned Figma IA: main ops overview → visits & measures → smart-home remote monitoring. Households use H-codes.",
    backLabel: "← Portfolio",
    backHref: "/en",
    projectLabel: "Project 01 · Case Study",
    disclaimer:
      "Synthetic demo data only. No real participant personal data or raw logs are included.",
  },
  kpis: [
    {
      id: "utilization",
      label: "Equipment utilization",
      value: "87",
      unit: "%",
      note: "All validation labs",
      tone: "good" as const,
    },
    {
      id: "homes",
      label: "Smart homes built",
      value: "312",
      unit: "",
      note: "Incheon pilot area",
      tone: "neutral" as const,
    },
    {
      id: "visits",
      label: "Visits & measures",
      value: "1,240",
      unit: "",
      note: "This week at center",
      tone: "good" as const,
    },
    {
      id: "monitor",
      label: "Monitoring alerts",
      value: "9",
      unit: "",
      note: "Including unchecked",
      tone: "warn" as const,
    },
  ],
  overview: {
    sectionLabel: "01 · Operations",
    title: "AAL smart home-care validation center ops",
    description:
      "Equipment utilization, regional smart-home rollout, and live household status on one operations screen.",
    utilizationTitle: "Overall equipment utilization",
    utilizationUnit: "%",
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    utilizationSeries: [72, 78, 81, 76, 84, 88, 86, 90, 87, 85, 83, 87],
    buildTitle: "Smart-home rollout",
    buildSubtitle: "Current rollout completion",
    buildRate: "78%",
    regions: [
      { id: "michuhol", name: "Michuhol", households: 64, active: true },
      { id: "dong", name: "Dong", households: 28, active: false },
      { id: "jung", name: "Jung", households: 41, active: false },
      { id: "yeonsu", name: "Yeonsu", households: 52, active: false },
      { id: "namdong", name: "Namdong", households: 47, active: false },
      { id: "bupyeong", name: "Bupyeong", households: 38, active: false },
      { id: "gyeyang", name: "Gyeyang", households: 22, active: false },
      { id: "seo", name: "Seo", households: 20, active: false },
    ],
    regionUnit: "homes",
    liveTitle: "Live smart homes",
    liveItems: [
      { id: "l1", code: "H-011", people: "1", status: "OK", tone: "ok" as const },
      { id: "l2", code: "H-014", people: "2", status: "Watch", tone: "warn" as const },
      { id: "l3", code: "H-026", people: "1", status: "Check", tone: "alert" as const },
    ],
  },
  visits: {
    sectionLabel: "02 · Visits & Measures",
    title: "Individual visits & measurements",
    description:
      "Check cohort age mix and visit/measurement volume to gauge center operating density.",
    ageTitle: "Cohort age distribution",
    ageSlices: [
      { id: "u50", label: "≤50", value: 8, color: "#7eb8b3" },
      { id: "a50", label: "50–60", value: 18, color: "#5fa8a3" },
      { id: "a60", label: "60–70", value: 34, color: "#4a8f9a" },
      { id: "a70", label: "70–80", value: 28, color: "#3d7a86" },
      { id: "a80", label: "80+", value: 12, color: "#2f5f78" },
    ],
    metrics: [
      { label: "Cumulative visits", value: "4,820", unit: "" },
      { label: "Cumulative measures", value: "69k", unit: "" },
      { label: "Visits this week", value: "186", unit: "" },
      { label: "Incomplete visits", value: "18", unit: "" },
    ],
    trendTitle: "Monthly visits & measures",
    trendLabels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    visitSeries: [142, 158, 171, 165, 180, 186],
    measureSeries: [980, 1050, 1120, 1090, 1180, 1240],
    visitSeriesLabel: "Visits",
    measureSeriesLabel: "Measures",
    labsTitle: "Collection rate by lab",
    labsAriaLabel: "Collection rate by measurement lab",
    labs: [
      { id: "c1", name: "Body composition lab", planned: 56, collected: 54, rate: 96 },
      { id: "c2", name: "Strength lab", planned: 48, collected: 45, rate: 94 },
      { id: "c3", name: "Cognitive lab", planned: 42, collected: 39, rate: 93 },
      { id: "c4", name: "Fall-risk lab", planned: 38, collected: 31, rate: 82 },
    ],
  },
  monitoring: {
    sectionLabel: "03 · Smart Home",
    title: "Smart-home remote monitoring",
    description:
      "Monitor households (H-codes) by cardiovascular, musculoskeletal, and mental-health categories, filtered by district.",
    regionLabel: "Select district",
    regions: [
      { id: "michuhol", name: "Michuhol" },
      { id: "dong", name: "Dong" },
      { id: "jung", name: "Jung" },
      { id: "yeonsu", name: "Yeonsu" },
      { id: "namdong", name: "Namdong" },
      { id: "bupyeong", name: "Bupyeong" },
      { id: "gyeyang", name: "Gyeyang" },
      { id: "seo", name: "Seo" },
    ],
    categories: [
      {
        id: "cardio",
        label: "Cardiovascular",
        hint: "BP / HR anomaly homes",
        households: [
          { id: "h1", code: "H-001", people: "1", status: "Watch", tone: "warn" as const, note: "SYS rising" },
          { id: "h2", code: "H-007", people: "2", status: "OK", tone: "ok" as const, note: "Stable" },
          { id: "h3", code: "H-012", people: "1", status: "Check", tone: "alert" as const, note: "HR 118" },
          { id: "h4", code: "H-019", people: "1", status: "OK", tone: "ok" as const, note: "Guide done" },
          { id: "h5", code: "H-022", people: "2", status: "Watch", tone: "warn" as const, note: "DIA rising" },
          { id: "h6", code: "H-031", people: "1", status: "OK", tone: "ok" as const, note: "Monitoring" },
        ],
      },
      {
        id: "msk",
        label: "Musculoskeletal",
        hint: "Fall / trauma signal homes",
        households: [
          { id: "h1", code: "H-014", people: "1", status: "Check", tone: "alert" as const, note: "Leg impact" },
          { id: "h2", code: "H-026", people: "1", status: "Watch", tone: "warn" as const, note: "Balance drop" },
          { id: "h3", code: "H-033", people: "2", status: "OK", tone: "ok" as const, note: "Normal activity" },
          { id: "h4", code: "H-041", people: "1", status: "OK", tone: "ok" as const, note: "False alarm cleared" },
          { id: "h5", code: "H-045", people: "1", status: "Watch", tone: "warn" as const, note: "Gait pattern" },
          { id: "h6", code: "H-052", people: "2", status: "Check", tone: "alert" as const, note: "Bath impact" },
        ],
      },
      {
        id: "mental",
        label: "Mental health",
        hint: "Sleep / activity / mood signals",
        households: [
          { id: "h1", code: "H-008", people: "1", status: "Watch", tone: "warn" as const, note: "Fragmented sleep" },
          { id: "h2", code: "H-016", people: "1", status: "OK", tone: "ok" as const, note: "Activity held" },
          { id: "h3", code: "H-021", people: "2", status: "Check", tone: "alert" as const, note: "Inactivity up" },
          { id: "h4", code: "H-028", people: "1", status: "OK", tone: "ok" as const, note: "Counsel done" },
          { id: "h5", code: "H-036", people: "1", status: "Watch", tone: "warn" as const, note: "Night waking" },
          { id: "h6", code: "H-048", people: "1", status: "OK", tone: "ok" as const, note: "Stable" },
        ],
      },
    ],
    statusSummary: [
      { id: "alert", label: "Needs check", count: 3, tone: "high" as const },
      { id: "warn", label: "Watch", count: 4, tone: "med" as const },
      { id: "ok", label: "OK", count: 2, tone: "ok" as const },
    ],
    countSuffix: "",
  },
  insight: {
    sectionLabel: "Decision Note",
    title: "What this screen helped decide",
    points: [
      "Tied ops overview, visits/measures, and smart-home monitoring into one flow for partner briefings",
      "Identified households with H-codes (not S-codes) and split response priority by category tabs",
      "Used as decision-support material for 5 MOUs / service contracts (portfolio outcomes)",
    ],
  },
  footerNote:
    "Synthetic demo · reconstructed from Figma feedback IA (ops overview · visits/measures · smart-home remote monitoring)",
} as const;
