export const TRACK_IDS = ["research", "planning", "marketing", "sales"] as const;

export type TrackId = (typeof TRACK_IDS)[number];

export type CardWeight = "featured" | "support" | "low" | "strength";

export type ExperienceCardId =
  | "national-data"
  | "national-field"
  | "student-partnership"
  | "floorball"
  | "barrier-free";

export type ProofMetric = {
  value: string;
  label: string;
};

export type TrackCopy = {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    headline: string;
    tagline: string;
    bio: string;
  };
  values: {
    title: string;
    description: string;
    items: string[];
  };
  story: {
    title: string;
    paragraphs: string[];
  };
  about: {
    headline: string;
    bio: string;
  };
  bridge: {
    line1: string;
    line2: string;
  };
};
