"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { dashboardDemo as dashboardDemoKo } from "@/data/dashboardDemo";
import { dashboardDemoEn } from "@/data/dashboardDemo.en";
import styles from "./DashboardDemo.module.css";

type DashboardData = typeof dashboardDemoKo | typeof dashboardDemoEn;
type MetricTab = DashboardData["demographics"]["metricTabs"][number];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return reduced;
}

function useInViewOnce<T extends Element>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [inView]);

  return { ref, inView };
}

function formatMetricValue(value: number, unit: string) {
  const rounded = Number.isInteger(value) ? String(value) : value.toFixed(1);
  return unit ? `${rounded}${unit}` : rounded;
}

function VisitMetricChart({
  tab,
  visitLabels,
  animateKey,
}: {
  tab: MetricTab;
  visitLabels: readonly string[];
  animateKey: string;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  const animate = inView || reducedMotion;
  const values = tab.series;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const pad = max === min ? Math.abs(max) * 0.08 || 1 : (max - min) * 0.18;
  const domainMin = min - pad;
  const domainMax = max + pad;
  const range = domainMax - domainMin || 1;

  const points = values.map((value, index) => {
    const x = (index / Math.max(values.length - 1, 1)) * 100;
    const y = 100 - ((value - domainMin) / range) * 100;
    return { x, y, value };
  });

  const linePath = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  const seriesNote = "seriesLabel" in tab && tab.seriesLabel ? tab.seriesLabel : tab.hint;

  return (
    <div
      key={animateKey}
      ref={ref}
      className={`${styles.metricChart} ${animate ? styles.chartAnimate : ""}`}
      role="img"
      aria-label={`${tab.label}: ${seriesNote}`}
    >
      <div className={styles.metricChartHead}>
        <p className={styles.metricChartTitle}>{tab.hint}</p>
        <p className={styles.metricChartNote}>{seriesNote}</p>
      </div>

      {tab.chart === "line" ? (
        <div className={styles.lineChartWrap}>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={styles.lineSvg} aria-hidden>
            <path className={styles.linePath} d={linePath} />
            {points.map((point) => (
              <circle key={`${point.x}-${point.value}`} className={styles.lineDot} cx={point.x} cy={point.y} r="1.6" />
            ))}
          </svg>
          <div className={styles.lineValueRow}>
            {points.map((point, index) => (
              <span key={visitLabels[index]} className={styles.lineValue}>
                {formatMetricValue(point.value, tab.unit)}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.vBarChart}>
          {values.map((value, index) => {
            const height = ((value - domainMin) / range) * 100;
            return (
              <div key={visitLabels[index]} className={styles.vBarCol}>
                <span className={styles.vBarValue}>{formatMetricValue(value, tab.unit)}</span>
                <div className={styles.vBarTrack}>
                  <div
                    className={styles.vBarFill}
                    style={
                      {
                        ["--bar-height" as string]: `${height}%`,
                        ["--bar-delay" as string]: `${index * 70}ms`,
                        height: reducedMotion ? `${height}%` : undefined,
                      }
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className={styles.visitAxis}>
        {visitLabels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}

function DemographicsExplorer({ data }: { data: DashboardData }) {
  const { demographics } = data;
  const tabs = demographics.metricTabs;
  const [activeId, setActiveId] = useState<string>(tabs[0]?.id ?? "age");
  const boardId = useId();
  const activeTab = useMemo(
    () => tabs.find((tab) => tab.id === activeId) ?? tabs[0],
    [tabs, activeId],
  );

  return (
    <div className={styles.metricExplorer}>
      <div className={styles.metricTabs} role="tablist" aria-label={demographics.title}>
        {tabs.map((tab) => {
          const selected = tab.id === activeTab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`${boardId}-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${boardId}-panel`}
              tabIndex={selected ? 0 : -1}
              className={`${styles.metricTab} ${selected ? styles.metricTabActive : ""}`}
              onClick={() => setActiveId(tab.id)}
              onKeyDown={(event) => {
                const index = tabs.findIndex((item) => item.id === tab.id);
                if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                  event.preventDefault();
                  const next = tabs[(index + 1) % tabs.length];
                  setActiveId(next.id);
                }
                if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                  event.preventDefault();
                  const prev = tabs[(index - 1 + tabs.length) % tabs.length];
                  setActiveId(prev.id);
                }
              }}
            >
              <span className={styles.metricTabLabel}>{tab.label}</span>
              <span className={styles.metricTabHint}>{tab.hint}</span>
            </button>
          );
        })}
      </div>

      <div
        id={`${boardId}-panel`}
        role="tabpanel"
        aria-labelledby={`${boardId}-tab-${activeTab.id}`}
        className={styles.metricBoard}
      >
        <div className={styles.metricBoardHead}>
          <p className={styles.subTitle}>{demographics.boardTitle}</p>
          <p className={styles.metricBoardAxis}>{demographics.visitAxisLabel}</p>
        </div>
        <VisitMetricChart
          tab={activeTab}
          visitLabels={demographics.visitLabels}
          animateKey={activeTab.id}
        />
      </div>
    </div>
  );
}

function CenterCollectionBars({ data }: { data: DashboardData }) {
  const centers = data.collection.centers;
  const reducedMotion = usePrefersReducedMotion();
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  const animate = inView || reducedMotion;

  return (
    <div
      ref={ref}
      className={`${styles.hBarList} ${animate ? styles.chartAnimate : ""}`}
      role="list"
      aria-label={data.collection.labsAriaLabel}
    >
      {centers.map((center, index) => (
        <div key={center.id} className={styles.hBarRow} role="listitem">
          <div className={styles.hBarMeta}>
            <span className={styles.hBarName}>{center.name}</span>
            <span className={styles.hBarStat}>
              {center.collected}/{center.planned} · {center.rate}%
            </span>
          </div>
          <div className={styles.hBarTrack}>
            <div
              className={styles.hBarFill}
              style={
                {
                  ["--bar-width" as string]: `${center.rate}%`,
                  ["--bar-delay" as string]: `${index * 90}ms`,
                  width: reducedMotion ? `${center.rate}%` : undefined,
                }
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function DashboardDemo({
  data = dashboardDemoKo,
}: {
  data?: DashboardData;
}) {
  const { header, kpis, demographics, collection, risks, insight, footerNote } = data;

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <a href={header.backHref} className={styles.backLink}>
            {header.backLabel}
          </a>
          <span className={styles.projectTag}>{header.projectLabel}</span>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>{header.eyebrow}</p>
          <h1 className={styles.title}>{header.title}</h1>
          <p className={styles.subtitle}>{header.subtitle}</p>
          <p className={styles.disclaimer} role="note">
            {header.disclaimer}
          </p>
        </section>

        <section className={styles.kpiGrid} aria-label="핵심 현황">
          {kpis.map((kpi) => (
            <article key={kpi.id} className={`${styles.kpiCard} ${styles[`tone_${kpi.tone}`]}`}>
              <p className={styles.kpiLabel}>{kpi.label}</p>
              <p className={styles.kpiValue}>
                {kpi.value}
                <span className={styles.kpiUnit}>{kpi.unit}</span>
              </p>
              <p className={styles.kpiNote}>{kpi.note}</p>
            </article>
          ))}
        </section>

        {/* 01 사용자 일반 정보 */}
        <section className={styles.panel}>
          <div className={styles.panelHead}>
            <p className={styles.sectionLabel}>{demographics.sectionLabel}</p>
            <h2 className={styles.sectionTitle}>{demographics.title}</h2>
            <p className={styles.sectionDesc}>{demographics.description}</p>
          </div>

          <div className={styles.summaryGrid}>
            {demographics.summary.map((item) => (
              <div key={item.label} className={styles.summaryCard}>
                <p className={styles.summaryLabel}>{item.label}</p>
                <p className={styles.summaryValue}>{item.value}</p>
              </div>
            ))}
          </div>

          <DemographicsExplorer data={data} />
        </section>

        {/* 02 건강 센터 수집 */}
        <section className={styles.panel}>
          <div className={styles.panelHead}>
            <p className={styles.sectionLabel}>{collection.sectionLabel}</p>
            <h2 className={styles.sectionTitle}>{collection.title}</h2>
            <p className={styles.sectionDesc}>{collection.description}</p>
          </div>

          <div className={styles.collectionMetrics}>
            {collection.metrics.map((m) => (
              <div key={m.label} className={styles.collectionMetric}>
                <p className={styles.summaryLabel}>{m.label}</p>
                <p className={styles.summaryValue}>
                  {m.value}
                  <span className={styles.kpiUnit}>{m.unit}</span>
                </p>
              </div>
            ))}
          </div>

          <CenterCollectionBars data={data} />
        </section>

        {/* 03 스마트홈 위험 */}
        <section className={styles.panel}>
          <div className={styles.panelHead}>
            <p className={styles.sectionLabel}>{risks.sectionLabel}</p>
            <h2 className={styles.sectionTitle}>{risks.title}</h2>
            <p className={styles.sectionDesc}>{risks.description}</p>
          </div>

          <div className={styles.riskStatusGrid}>
            {risks.status.map((item) => (
              <div key={item.id} className={`${styles.riskStatusCard} ${styles[`risk_${item.tone}`]}`}>
                <p className={styles.summaryLabel}>{item.label}</p>
                <p className={styles.riskCount}>
                  {item.count}
                  {risks.countSuffix ? <span>{risks.countSuffix}</span> : null}
                </p>
              </div>
            ))}
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  {risks.columns.map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {risks.rows.map((row) => (
                  <tr key={row.id}>
                    <td className={styles.mono}>{row.time}</td>
                    <td className={styles.mono}>{row.code}</td>
                    <td>{row.type}</td>
                    <td>{row.source}</td>
                    <td>{row.status}</td>
                    <td>
                      <span className={`${styles.priority} ${styles[`prio_${row.priority}`]}`}>
                        {row.priority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.insight}>
          <p className={styles.sectionLabel}>{insight.sectionLabel}</p>
          <h2 className={styles.sectionTitle}>{insight.title}</h2>
          <ul className={styles.insightList}>
            {insight.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>

        <p className={styles.footerNote}>{footerNote}</p>
      </main>
    </div>
  );
}
