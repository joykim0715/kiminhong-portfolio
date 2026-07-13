import { siteContent } from "./content";

export type HelixItem = {
  id: string;
  title: string;
  org?: string;
  date?: string;
  description: string;
  tags?: string[];
  link?: string;
  type: "Project" | "Certification";
};

function parseDate(meta: { label: string; value: string }[]): string | undefined {
  const period = meta.find((item) => item.label === "기간");
  return period?.value;
}

/** @deprecated siteContent.works.projects 를 직접 사용하세요 */
export const helixItems: HelixItem[] = siteContent.works.projects.map((work) => ({
  id: work.id,
  title: work.title,
  org: work.category,
  date: parseDate(work.panel.meta),
  description: work.description,
  tags: [work.category, "Project"],
  type: "Project" as const,
}));
