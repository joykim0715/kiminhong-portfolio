import type { Work } from "@/data/content";

export function getWorkImages(work: Pick<Work, "image" | "images">): string[] {
  if (work.images?.length) return work.images;
  if (work.image) return [work.image];
  return [];
}
