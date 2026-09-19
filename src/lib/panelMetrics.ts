import type { ProjectPanelMetric } from "@/data/content";

const IMPACT_VALUE =
  /^\+?\d+(?:\.\d+)?만\s*건$|^\+?\d+%$|^\d+건$|^\d+명$|^\d+k$|^\d+$/i;

const NON_RESULT_LABEL =
  /목표|target|기간|period|duration|program|프로그램|산출|output|센서|sensor|서비스 영역|domain|종목|sport|콘텐츠|content|채널|channel|업무|scope|study period/i;

export function isImpactMetric(metric: ProjectPanelMetric): boolean {
  if (NON_RESULT_LABEL.test(metric.label)) return false;
  return IMPACT_VALUE.test(metric.value.trim());
}

export function getImpactMetrics(metrics?: ProjectPanelMetric[]): ProjectPanelMetric[] {
  return (metrics ?? []).filter(isImpactMetric);
}

export function getInfoMetrics(
  metrics: ProjectPanelMetric[] | undefined,
  context: string,
): ProjectPanelMetric[] {
  const blob = context.replace(/\s+/g, "").toLowerCase();

  return (metrics ?? []).filter((metric) => {
    if (isImpactMetric(metric)) return false;
    if (/목표|target/i.test(metric.label)) return false;
    if (/기간|period|duration|study period/i.test(metric.label)) return false;

    const value = metric.value.replace(/\s+/g, "").toLowerCase();
    if (value.length >= 2 && blob.includes(value)) return false;
    return true;
  });
}

export function formatMetaValue(value: string): string {
  return value.replace(/\s*,\s*/g, " · ").replace(/\s*~\s*/g, " — ");
}
