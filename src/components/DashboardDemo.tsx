"use client";

import { useId, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { dashboardDemo as dashboardDemoKo } from "@/data/dashboardDemo";
import { dashboardDemoEn } from "@/data/dashboardDemo.en";
import { CenterCollectionBars, VisitMetricChart } from "@/components/DashboardCharts";
import styles from "./DashboardDemo.module.css";

type DashboardData = typeof dashboardDemoKo | typeof dashboardDemoEn;

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
        />
      </div>
    </div>
  );
}

export default function DashboardDemo({
  data = dashboardDemoKo,
}: {
  data?: DashboardData;
}) {
  const { header, kpis, demographics, collection, risks, insight, footerNote } = data;
  const reduceMotion = useReducedMotion();

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
          {kpis.map((kpi, index) => (
            <motion.article
              key={kpi.id}
              className={`${styles.kpiCard} ${styles[`tone_${kpi.tone}`]}`}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className={styles.kpiLabel}>{kpi.label}</p>
              <p className={styles.kpiValue}>
                {kpi.value}
                <span className={styles.kpiUnit}>{kpi.unit}</span>
              </p>
              <p className={styles.kpiNote}>{kpi.note}</p>
            </motion.article>
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

          <CenterCollectionBars
            ariaLabel={collection.labsAriaLabel}
            centers={collection.centers}
          />
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
