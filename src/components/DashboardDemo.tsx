"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { dashboardDemo as dashboardDemoKo } from "@/data/dashboardDemo";
import { dashboardDemoEn } from "@/data/dashboardDemo.en";
import styles from "./DashboardDemo.module.css";

type DashboardData = typeof dashboardDemoKo | typeof dashboardDemoEn;
type MonitorCategory = DashboardData["monitoring"]["categories"][number];
type HouseholdTone = MonitorCategory["households"][number]["tone"];

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

function UtilizationChart({
  months,
  series,
  unit,
  title,
}: {
  months: readonly string[];
  series: readonly number[];
  unit: string;
  title: string;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  const animate = inView || reducedMotion;
  const max = Math.max(...series, 1);

  return (
    <div
      ref={ref}
      className={`${styles.subPanel} ${animate ? styles.chartAnimate : ""}`}
      role="img"
      aria-label={`${title}: ${series.join(", ")}${unit}`}
    >
      <p className={styles.subTitle}>{title}</p>
      <div className={styles.utilChart}>
        {series.map((value, index) => {
          const height = (value / max) * 100;
          return (
            <div key={months[index]} className={styles.utilCol}>
              <span className={styles.utilValue}>
                {value}
                {unit}
              </span>
              <div className={styles.utilTrack}>
                <div
                  className={styles.utilFill}
                  style={
                    {
                      ["--bar-height" as string]: `${height}%`,
                      ["--bar-delay" as string]: `${index * 40}ms`,
                      height: reducedMotion ? `${height}%` : undefined,
                    }
                  }
                />
              </div>
              <span className={styles.utilLabel}>{months[index]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RegionBuildPanel({
  data,
}: {
  data: DashboardData["overview"];
}) {
  const [activeId, setActiveId] = useState<string>(
    () => data.regions.find((r) => r.active)?.id ?? data.regions[0]?.id ?? "",
  );
  const active = data.regions.find((r) => r.id === activeId) ?? data.regions[0];

  return (
    <div className={styles.subPanel}>
      <p className={styles.subTitle}>{data.buildTitle}</p>
      <p className={styles.buildSubtitle}>{data.buildSubtitle}</p>
      <p className={styles.buildRate}>{data.buildRate}</p>

      <div className={styles.regionFocus} aria-live="polite">
        <p className={styles.regionFocusName}>{active?.name}</p>
        <p className={styles.regionFocusValue}>
          {active?.households}
          <span>{data.regionUnit}</span>
        </p>
      </div>

      <div className={styles.regionChips} role="list" aria-label={data.buildTitle}>
        {data.regions.map((region) => {
          const selected = region.id === activeId;
          return (
            <button
              key={region.id}
              type="button"
              role="listitem"
              className={`${styles.regionChip} ${selected ? styles.regionChipActive : ""}`}
              onClick={() => setActiveId(region.id)}
              aria-pressed={selected}
            >
              <span>{region.name}</span>
              <span className={styles.regionChipCount}>{region.households}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function AgeDonut({
  title,
  slices,
}: {
  title: string;
  slices: DashboardData["visits"]["ageSlices"];
}) {
  const total = slices.reduce((sum, slice) => sum + slice.value, 0) || 1;
  let cumulative = 0;
  const gradientStops = slices
    .map((slice) => {
      const start = (cumulative / total) * 100;
      cumulative += slice.value;
      const end = (cumulative / total) * 100;
      return `${slice.color} ${start}% ${end}%`;
    })
    .join(", ");

  return (
    <div className={styles.subPanel}>
      <p className={styles.subTitle}>{title}</p>
      <div className={styles.donutWrap}>
        <div
          className={styles.donut}
          style={{ background: `conic-gradient(${gradientStops})` }}
          role="img"
          aria-label={slices.map((s) => `${s.label} ${s.value}%`).join(", ")}
        >
          <div className={styles.donutHole}>
            <span className={styles.donutTotal}>{total}</span>
            <span className={styles.donutTotalLabel}>%</span>
          </div>
        </div>
        <ul className={styles.donutLegend}>
          {slices.map((slice) => (
            <li key={slice.id}>
              <span className={styles.legendSwatch} style={{ background: slice.color }} />
              <span className={styles.legendLabel}>{slice.label}</span>
              <span className={styles.legendValue}>{slice.value}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function DualTrendChart({
  title,
  labels,
  visitSeries,
  measureSeries,
  visitLabel,
  measureLabel,
}: {
  title: string;
  labels: readonly string[];
  visitSeries: readonly number[];
  measureSeries: readonly number[];
  visitLabel: string;
  measureLabel: string;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  const animate = inView || reducedMotion;
  const max = Math.max(...visitSeries, ...measureSeries, 1);

  return (
    <div
      ref={ref}
      className={`${styles.subPanel} ${animate ? styles.chartAnimate : ""}`}
    >
      <div className={styles.trendHead}>
        <p className={styles.subTitle}>{title}</p>
        <div className={styles.trendLegend}>
          <span className={styles.trendLegendVisit}>{visitLabel}</span>
          <span className={styles.trendLegendMeasure}>{measureLabel}</span>
        </div>
      </div>
      <div className={styles.dualTrend} role="img" aria-label={title}>
        {labels.map((label, index) => {
          const visitH = (visitSeries[index] / max) * 100;
          const measureH = (measureSeries[index] / max) * 100;
          return (
            <div key={label} className={styles.dualCol}>
              <div className={styles.dualPair}>
                <div className={styles.dualTrack}>
                  <div
                    className={`${styles.dualFill} ${styles.dualVisit}`}
                    style={
                      {
                        ["--bar-height" as string]: `${visitH}%`,
                        ["--bar-delay" as string]: `${index * 50}ms`,
                        height: reducedMotion ? `${visitH}%` : undefined,
                      }
                    }
                  />
                </div>
                <div className={styles.dualTrack}>
                  <div
                    className={`${styles.dualFill} ${styles.dualMeasure}`}
                    style={
                      {
                        ["--bar-height" as string]: `${measureH}%`,
                        ["--bar-delay" as string]: `${index * 50 + 30}ms`,
                        height: reducedMotion ? `${measureH}%` : undefined,
                      }
                    }
                  />
                </div>
              </div>
              <span className={styles.utilLabel}>{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LabBars({
  labs,
  ariaLabel,
}: {
  labs: DashboardData["visits"]["labs"];
  ariaLabel: string;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  const animate = inView || reducedMotion;

  return (
    <div
      ref={ref}
      className={`${styles.hBarList} ${animate ? styles.chartAnimate : ""}`}
      role="list"
      aria-label={ariaLabel}
    >
      {labs.map((lab, index) => (
        <div key={lab.id} className={styles.hBarRow} role="listitem">
          <div className={styles.hBarMeta}>
            <span className={styles.hBarName}>{lab.name}</span>
            <span className={styles.hBarStat}>
              {lab.collected}/{lab.planned} · {lab.rate}%
            </span>
          </div>
          <div className={styles.hBarTrack}>
            <div
              className={styles.hBarFill}
              style={
                {
                  ["--bar-width" as string]: `${lab.rate}%`,
                  ["--bar-delay" as string]: `${index * 90}ms`,
                  width: reducedMotion ? `${lab.rate}%` : undefined,
                }
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function statusToneClass(tone: HouseholdTone) {
  if (tone === "alert") return styles.statusAlert;
  if (tone === "warn") return styles.statusWarn;
  return styles.statusOk;
}

function MonitoringBoard({ data }: { data: DashboardData["monitoring"] }) {
  const categories = data.categories;
  const [categoryId, setCategoryId] = useState<string>(categories[0]?.id ?? "cardio");
  const [regionId, setRegionId] = useState<string>(data.regions[0]?.id ?? "");
  const boardId = useId();

  const activeCategory = useMemo(
    () => categories.find((c) => c.id === categoryId) ?? categories[0],
    [categories, categoryId],
  );

  const regionName = data.regions.find((r) => r.id === regionId)?.name ?? "";

  return (
    <div className={styles.monitorLayout}>
      <div className={styles.monitorSide}>
        <p className={styles.subTitle}>{data.regionLabel}</p>
        <div className={styles.regionChips} role="list">
          {data.regions.map((region) => {
            const selected = region.id === regionId;
            return (
              <button
                key={region.id}
                type="button"
                className={`${styles.regionChip} ${selected ? styles.regionChipActive : ""}`}
                onClick={() => setRegionId(region.id)}
                aria-pressed={selected}
              >
                {region.name}
              </button>
            );
          })}
        </div>
        <p className={styles.regionHint}>{regionName}</p>
      </div>

      <div className={styles.monitorMain}>
        <div className={styles.categoryTabs} role="tablist" aria-label={data.title}>
          {categories.map((cat) => {
            const selected = cat.id === activeCategory.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                id={`${boardId}-tab-${cat.id}`}
                aria-selected={selected}
                aria-controls={`${boardId}-panel`}
                tabIndex={selected ? 0 : -1}
                className={`${styles.categoryTab} ${selected ? styles.categoryTabActive : ""}`}
                onClick={() => setCategoryId(cat.id)}
                onKeyDown={(event) => {
                  const index = categories.findIndex((item) => item.id === cat.id);
                  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                    event.preventDefault();
                    setCategoryId(categories[(index + 1) % categories.length].id);
                  }
                  if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                    event.preventDefault();
                    setCategoryId(categories[(index - 1 + categories.length) % categories.length].id);
                  }
                }}
              >
                <span className={styles.metricTabLabel}>{cat.label}</span>
                <span className={styles.metricTabHint}>{cat.hint}</span>
              </button>
            );
          })}
        </div>

        <div
          id={`${boardId}-panel`}
          role="tabpanel"
          aria-labelledby={`${boardId}-tab-${activeCategory.id}`}
          className={styles.householdGrid}
        >
          {activeCategory.households.map((home) => (
            <article key={`${activeCategory.id}-${home.id}`} className={styles.householdCard}>
              <div className={styles.householdTop}>
                <span className={styles.mono}>{home.code}</span>
                <span className={`${styles.statusBadge} ${statusToneClass(home.tone)}`}>
                  {home.status}
                </span>
              </div>
              <p className={styles.householdPeople}>{home.people}</p>
              <p className={styles.householdNote}>{home.note}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DashboardDemo({
  data = dashboardDemoKo,
}: {
  data?: DashboardData;
}) {
  const { header, kpis, overview, visits, monitoring, insight, footerNote } = data;

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <Link href={header.backHref} className={styles.backLink}>
            {header.backLabel}
          </Link>
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

        <section className={styles.kpiGrid} aria-label="Key metrics">
          {kpis.map((kpi) => (
            <article key={kpi.id} className={`${styles.kpiCard} ${styles[`tone_${kpi.tone}`]}`}>
              <p className={styles.kpiLabel}>{kpi.label}</p>
              <p className={styles.kpiValue}>
                {kpi.value}
                {kpi.unit ? <span className={styles.kpiUnit}>{kpi.unit}</span> : null}
              </p>
              <p className={styles.kpiNote}>{kpi.note}</p>
            </article>
          ))}
        </section>

        {/* 01 운영현황 */}
        <section className={styles.panel}>
          <div className={styles.panelHead}>
            <p className={styles.sectionLabel}>{overview.sectionLabel}</p>
            <h2 className={styles.sectionTitle}>{overview.title}</h2>
            <p className={styles.sectionDesc}>{overview.description}</p>
          </div>

          <div className={styles.overviewGrid}>
            <UtilizationChart
              title={overview.utilizationTitle}
              months={overview.months}
              series={overview.utilizationSeries}
              unit={overview.utilizationUnit}
            />
            <RegionBuildPanel data={overview} />
          </div>

          <div className={styles.liveStrip}>
            <p className={styles.liveTitle}>{overview.liveTitle}</p>
            <div className={styles.liveItems}>
              {overview.liveItems.map((item) => (
                <div key={item.id} className={styles.liveCard}>
                  <span className={styles.mono}>{item.code}</span>
                  <span className={styles.livePeople}>{item.people}</span>
                  <span className={`${styles.statusBadge} ${statusToneClass(item.tone)}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 02 방문·측정 */}
        <section className={styles.panel}>
          <div className={styles.panelHead}>
            <p className={styles.sectionLabel}>{visits.sectionLabel}</p>
            <h2 className={styles.sectionTitle}>{visits.title}</h2>
            <p className={styles.sectionDesc}>{visits.description}</p>
          </div>

          <div className={styles.summaryGrid}>
            {visits.metrics.map((item) => (
              <div key={item.label} className={styles.summaryCard}>
                <p className={styles.summaryLabel}>{item.label}</p>
                <p className={styles.summaryValue}>
                  {item.value}
                  {item.unit ? <span className={styles.kpiUnit}>{item.unit}</span> : null}
                </p>
              </div>
            ))}
          </div>

          <div className={styles.visitsGrid}>
            <AgeDonut title={visits.ageTitle} slices={visits.ageSlices} />
            <DualTrendChart
              title={visits.trendTitle}
              labels={visits.trendLabels}
              visitSeries={visits.visitSeries}
              measureSeries={visits.measureSeries}
              visitLabel={visits.visitSeriesLabel}
              measureLabel={visits.measureSeriesLabel}
            />
          </div>

          <div className={styles.labsBlock}>
            <p className={styles.subTitle}>{visits.labsTitle}</p>
            <LabBars labs={visits.labs} ariaLabel={visits.labsAriaLabel} />
          </div>
        </section>

        {/* 03 스마트홈 원격모니터링 */}
        <section className={styles.panel}>
          <div className={styles.panelHead}>
            <p className={styles.sectionLabel}>{monitoring.sectionLabel}</p>
            <h2 className={styles.sectionTitle}>{monitoring.title}</h2>
            <p className={styles.sectionDesc}>{monitoring.description}</p>
          </div>

          <div className={styles.riskStatusGrid}>
            {monitoring.statusSummary.map((item) => (
              <div
                key={item.id}
                className={`${styles.riskStatusCard} ${styles[`risk_${item.tone}`]}`}
              >
                <p className={styles.summaryLabel}>{item.label}</p>
                <p className={styles.riskCount}>
                  {item.count}
                  {monitoring.countSuffix ? <span>{monitoring.countSuffix}</span> : null}
                </p>
              </div>
            ))}
          </div>

          <MonitoringBoard data={monitoring} />
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
