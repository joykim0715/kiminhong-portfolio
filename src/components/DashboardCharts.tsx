"use client";

import { Bar } from "@/components/charts/bar";
import { BarChart } from "@/components/charts/bar-chart";
import { BarXAxis } from "@/components/charts/bar-x-axis";
import { BarYAxis } from "@/components/charts/bar-y-axis";
import { chartCssVars } from "@/components/charts/chart-context";
import { Grid } from "@/components/charts/grid";
import { Line } from "@/components/charts/line";
import { LineChart } from "@/components/charts/line-chart";
import { ChartTooltip } from "@/components/charts/tooltip";
import styles from "./DashboardDemo.module.css";

type MetricTab = {
  id: string;
  label: string;
  hint: string;
  unit: string;
  chart: "line" | "bar";
  series: readonly number[];
  seriesLabel?: string;
};

function formatMetricValue(value: number, unit: string) {
  const rounded = Number.isInteger(value) ? String(value) : value.toFixed(1);
  return unit ? `${rounded}${unit}` : rounded;
}

export function VisitMetricChart({
  tab,
  visitLabels,
}: {
  tab: MetricTab;
  visitLabels: readonly string[];
}) {
  const seriesNote = tab.seriesLabel ?? tab.hint;
  const barData = visitLabels.map((visit, index) => ({
    visit,
    value: tab.series[index] ?? 0,
  }));
  const lineData = visitLabels.map((visit, index) => ({
    date: new Date(Date.UTC(2026, 0, index + 1)),
    visit,
    value: tab.series[index] ?? 0,
  }));

  return (
    <div className={styles.metricChart} role="img" aria-label={`${tab.label}: ${seriesNote}`}>
      <div className={styles.metricChartHead}>
        <p className={styles.metricChartTitle}>{tab.hint}</p>
        <p className={styles.metricChartNote}>{seriesNote}</p>
      </div>

      {tab.chart === "line" ? (
        <LineChart
          aspectRatio="16 / 9"
          className={styles.bklitChartCanvas}
          data={[...lineData]}
          margin={{ top: 16, right: 12, bottom: 36, left: 12 }}
          revealSignature={tab.id}
        >
          <Grid horizontal />
          <Line dataKey="value" showMarkers stroke={chartCssVars.linePrimary} />
          <ChartTooltip
            rows={(point) => [
              {
                color: chartCssVars.linePrimary,
                label: String(point.visit ?? tab.label),
                value: formatMetricValue(Number(point.value), tab.unit),
              },
            ]}
            showDatePill={false}
          />
        </LineChart>
      ) : (
        <BarChart
          aspectRatio="16 / 9"
          className={styles.bklitChartCanvas}
          data={[...barData]}
          margin={{ top: 16, right: 12, bottom: 36, left: 8 }}
          revealSignature={tab.id}
          xDataKey="visit"
        >
          <Grid horizontal />
          <Bar dataKey="value" fill={chartCssVars.linePrimary} lineCap="round" />
          <BarXAxis showAllLabels />
          <ChartTooltip
            rows={(point) => [
              {
                color: chartCssVars.linePrimary,
                label: String(point.visit ?? tab.label),
                value: formatMetricValue(Number(point.value), tab.unit),
              },
            ]}
            showDatePill={false}
          />
        </BarChart>
      )}

      {tab.chart === "line" ? (
        <div className={styles.visitAxis}>
          {visitLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function CenterCollectionBars({
  centers,
  ariaLabel,
}: {
  centers: readonly {
    id: string;
    name: string;
    planned: number;
    collected: number;
    rate: number;
  }[];
  ariaLabel: string;
}) {
  const data = centers.map((center) => ({
    name: center.name,
    rate: center.rate,
    collected: center.collected,
    planned: center.planned,
  }));

  return (
    <div className={styles.bklitChartWide} role="img" aria-label={ariaLabel}>
      <BarChart
        aspectRatio="5 / 3"
        className={styles.bklitChartCanvas}
        data={[...data]}
        margin={{ top: 8, right: 28, bottom: 12, left: 118 }}
        orientation="horizontal"
        xDataKey="name"
      >
        <Grid horizontal={false} vertical />
        <Bar dataKey="rate" fill={chartCssVars.linePrimary} lineCap="round" />
        <BarYAxis />
        <ChartTooltip
          rows={(point) => [
            {
              color: chartCssVars.linePrimary,
              label: String(point.name ?? ""),
              value: `${point.collected}/${point.planned} · ${point.rate}%`,
            },
          ]}
          showDatePill={false}
        />
      </BarChart>
    </div>
  );
}
