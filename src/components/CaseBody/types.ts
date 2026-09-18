import type { ProjectPanelBlock } from "@/data/content";

export type CaseModuleProps = {
  block: ProjectPanelBlock;
  index: number;
  className?: string;
  sectionRef: (el: HTMLElement | null) => void;
};

export type ResultModuleProps = CaseModuleProps & {
  hasImpact?: boolean;
};
