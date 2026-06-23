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

function parseDate(details?: string[]): string | undefined {
  const period = details?.find((d) => d.startsWith("기간:"));
  return period?.replace("기간:", "").trim();
}

/** @deprecated siteContent.works.projects 를 직접 사용하세요 */
export const helixItems: HelixItem[] = siteContent.works.projects.map((work) => ({
  id: work.id,
  title: work.title,
  org: work.category,
  date: parseDate(work.details),
  description: work.description,
  tags: [work.category, "Project"],
  type: "Project" as const,
}));
