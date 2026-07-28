/**
 * English labels for `/en/demo`.
 * Structure mirrors `dashboardDemo.ts` (synthetic data).
 */

export const dashboardDemoEn = {
  meta: {
    title: "Decision Dashboard Demo",
    pageTitle: "Operations Dashboard Demo — Inhong Kim",
    description:
      "Interactive demo of a senior healthcare operations dashboard — participant profiles, health-center collection, and smart-home risk alerts.",
  },
  header: {
    eyebrow: "Interactive Demo",
    title: "Senior healthcare operations dashboard",
    subtitle:
      "Rebuilt from the real screen structure I planned and used: participants → center collection → smart-home risk detection for decision support.",
    backLabel: "← Portfolio",
    backHref: "/en",
    projectLabel: "Project 01 · Case Study",
    disclaimer:
      "Synthetic demo data only. No real participant personal data or raw logs are included.",
  },
  kpis: [
    {
      id: "enrolled",
      label: "Enrolled",
      value: "224",
      unit: "",
      note: "Full pilot cohort",
      tone: "neutral" as const,
    },
    {
      id: "active",
      label: "Active users",
      value: "150",
      unit: "",
      note: "Logs in last 7 days",
      tone: "good" as const,
    },
    {
      id: "centers",
      label: "Center collection",
      value: "91",
      unit: "%",
      note: "Completed vs planned",
      tone: "good" as const,
    },
    {
      id: "risks",
      label: "Live risk alerts",
      value: "7",
      unit: "",
      note: "Including unchecked",
      tone: "warn" as const,
    },
  ],
  demographics: {
    sectionLabel: "01 · Participants",
    title: "Participant profile overview",
    description: "Age, sex, height, and weight at a glance.",
    genderTitle: "Sex",
    ageTitle: "Age bands",
    countSuffix: "",
    summary: [
      { label: "Avg age", value: "72.4 yrs" },
      { label: "Avg height", value: "158.2 cm" },
      { label: "Avg weight", value: "59.6 kg" },
      { label: "Avg BMI", value: "23.8" },
    ],
    gender: [
      { id: "female", label: "Female", value: 138, pct: 62 },
      { id: "male", label: "Male", value: 86, pct: 38 },
    ],
    ageBands: [
      { label: "65–69", count: 48 },
      { label: "70–74", count: 71 },
      { label: "75–79", count: 58 },
      { label: "80–84", count: 32 },
      { label: "85+", count: 15 },
    ],
  },
  collection: {
    sectionLabel: "02 · Health Center",
    title: "Health center data collection",
    description: "Track how each center is filling planned visits and measurements.",
    centers: [
      { id: "c1", name: "Center A", planned: 56, collected: 54, rate: 96 },
      { id: "c2", name: "Center B", planned: 48, collected: 45, rate: 94 },
      { id: "c3", name: "Center C", planned: 42, collected: 39, rate: 93 },
      { id: "c4", name: "Center D", planned: 38, collected: 31, rate: 82 },
      { id: "c5", name: "Center E", planned: 40, collected: 35, rate: 88 },
    ],
    metrics: [
      { label: "Cumulative measures", value: "69k", unit: "" },
      { label: "This week", value: "1,240", unit: "" },
      { label: "Incomplete visits", value: "18", unit: "" },
    ],
  },
  risks: {
    sectionLabel: "03 · Smart Home",
    title: "Smart-home real-time risk detection",
    description: "Prioritize signals that need field response — falls, blood pressure, and more.",
    status: [
      { id: "fall", label: "Fall detected", count: 2, tone: "high" as const },
      { id: "bp", label: "BP anomaly", count: 3, tone: "high" as const },
      { id: "hr", label: "HR anomaly", count: 1, tone: "med" as const },
      { id: "inactive", label: "Long inactivity", count: 1, tone: "med" as const },
    ],
    columns: ["Time", "Type", "Location / sensor", "Status", "Priority"],
    rows: [
      {
        id: "r1",
        time: "14:22",
        type: "Fall detected",
        source: "Living room · motion",
        status: "Unchecked",
        priority: "High" as const,
      },
      {
        id: "r2",
        time: "13:51",
        type: "BP anomaly",
        source: "BP meter · SYS 168",
        status: "In review",
        priority: "High" as const,
      },
      {
        id: "r3",
        time: "12:08",
        type: "BP anomaly",
        source: "BP meter · DIA 98",
        status: "Unchecked",
        priority: "High" as const,
      },
      {
        id: "r4",
        time: "11:40",
        type: "HR anomaly",
        source: "Wearable · 118 bpm",
        status: "Monitoring",
        priority: "Med" as const,
      },
      {
        id: "r5",
        time: "10:15",
        type: "Long inactivity",
        source: "Bedroom · 4h+",
        status: "Call done",
        priority: "Med" as const,
      },
      {
        id: "r6",
        time: "09:33",
        type: "Fall detected",
        source: "Bathroom · impact",
        status: "False alarm",
        priority: "Low" as const,
      },
      {
        id: "r7",
        time: "08:47",
        type: "BP anomaly",
        source: "BP meter · SYS 152",
        status: "Guide sent",
        priority: "Low" as const,
      },
    ],
  },
  insight: {
    sectionLabel: "Decision Note",
    title: "What this screen helped decide",
    points: [
      "Put profiles, center collection, and smart-home risks on one screen for ops and partner meetings",
      "Prioritize structure that answers who / which center / which risk — over aesthetics",
      "Used as decision material supporting 5 MOU / service contracts (portfolio outcomes)",
    ],
  },
  footerNote: "Synthetic demo · reconstructed from actual dashboard IA (participants · center · smart-home risk)",
} as const;
