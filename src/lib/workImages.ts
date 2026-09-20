import type { Work } from "@/data/content";

export type WorkTypographyCover = {
  kicker: string;
  heading: string;
  detail: string;
  stats: { label: string; value: string }[];
};

export function getWorkImages(work: Pick<Work, "image" | "images" | "visual">): string[] {
  if (work.visual === "typography") return [];
  if (work.images?.length) return work.images;
  if (work.image) return [work.image];
  return [];
}

export function getWorkTypographyCover(
  work: Pick<Work, "title" | "visual" | "panel">,
): WorkTypographyCover | null {
  if (work.visual !== "typography") return null;

  const org = work.panel.meta.find((item) => item.label === "소속" || item.label === "Org");
  const role = work.panel.meta.find((item) => item.label === "역할" || item.label === "Role");

  return {
    kicker: work.panel.sectionLabel,
    heading: org?.value ?? work.title,
    detail: role?.value ?? "",
    stats: (work.panel.metrics ?? []).slice(0, 2).map((metric) => ({
      label: metric.label,
      value: metric.value,
    })),
  };
}
