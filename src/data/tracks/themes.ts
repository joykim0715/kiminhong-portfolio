import type { TrackId } from "./types";

export type TrackTheme = {
  bg: string;
  surface: string;
  primary: string;
  accent: string;
  primaryLight: string;
  secondary: string;
  /** Motion whileHover spring — research keeps current low bounce. */
  hoverBounce: number;
  hoverDuration: number;
  showShapeDecor: boolean;
  /** planning: tighter KPI feel. sales: snap. marketing: slightly more lift. */
  density: "clinical" | "kpi" | "story" | "proof";
};

/** 연구원 = 현행 globals.css :root. 다른 트랙만 톤을 바꾼다. */
export const TRACK_THEMES: Record<TrackId, TrackTheme> = {
  research: {
    bg: "#f7f8f6",
    surface: "#e7ecef",
    primary: "#5fa8a3",
    accent: "#6eb8c4",
    primaryLight: "#7ec8c2",
    secondary: "#6faed9",
    hoverBounce: 0.12,
    hoverDuration: 0.32,
    showShapeDecor: true,
    density: "clinical",
  },
  planning: {
    bg: "#f6f4ef",
    surface: "#ece7dc",
    primary: "#4d7c78",
    accent: "#c4a35a",
    primaryLight: "#6e9a96",
    secondary: "#5b7f9a",
    hoverBounce: 0.08,
    hoverDuration: 0.28,
    showShapeDecor: false,
    density: "kpi",
  },
  marketing: {
    bg: "#f4f7f5",
    surface: "#e2ece6",
    primary: "#2f9e8f",
    accent: "#e07a3d",
    primaryLight: "#5cbcaf",
    secondary: "#4a90c8",
    hoverBounce: 0.2,
    hoverDuration: 0.36,
    showShapeDecor: false,
    density: "story",
  },
  sales: {
    bg: "#f3f5f4",
    surface: "#dde5e3",
    primary: "#1c4f4a",
    accent: "#2a7a72",
    primaryLight: "#3d7a73",
    secondary: "#3d6a8a",
    hoverBounce: 0.06,
    hoverDuration: 0.22,
    showShapeDecor: false,
    density: "proof",
  },
};
