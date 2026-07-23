"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { dashboardDemo } from "@/data/dashboardDemo";
import styles from "./DashboardDemo.module.css";

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

function AgeBandChart() {
  const bands = dashboardDemo.demographics.ageBands;
  const max = Math.max(...bands.map((b) => b.count));
  const reducedMotion = usePrefersReducedMotion();
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  const animate = inView || reducedMotion;

  return (
    <div
      ref={ref}
      className={`${styles.vBarChart} ${animate ? styles.chartAnimate : ""}`}
      role="img"
      aria-label="연령대별 참여자 수"
    >
      {bands.map((band, index) => (
        <div key={band.label} className={styles.vBarCol}>
          <span className={styles.vBarValue}>{band.count}</span>
          <div className={styles.vBarTrack}>
            <div
              className={styles.vBarFill}
              style={
                {
                  ["--bar-height" as string]: `${(band.count / max) * 100}%`,
                  ["--bar-delay" as string]: `${index * 80}ms`,
                  height: reducedMotion ? `${(band.count / max) * 100}%` : undefined,
                }
              }
            />
          </div>
          <span className={styles.vBarLabel}>{band.label}</span>
        </div>
      ))}
    </div>
  );
}

function CenterCollectionBars() {
  const centers = dashboardDemo.collection.centers;
  const reducedMotion = usePrefersReducedMotion();
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  const animate = inView || reducedMotion;

  return (
    <div
      ref={ref}
      className={`${styles.hBarList} ${animate ? styles.chartAnimate : ""}`}
      role="list"
      aria-label="센터별 수집률"
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

export default function DashboardDemo() {
  const { header, kpis, demographics, collection, risks, insight, footerNote } = dashboardDemo;

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

          <div className={styles.demoGrid}>
            <div className={styles.subPanel}>
              <p className={styles.subTitle}>성별 구성</p>
              <div className={styles.genderSplit}>
                {demographics.gender.map((g) => (
                  <div key={g.id} className={styles.genderCard}>
                    <div className={styles.genderTop}>
                      <span>{g.label}</span>
                      <strong>{g.pct}%</strong>
                    </div>
                    <div className={styles.genderTrack}>
                      <div className={styles.genderFill} style={{ width: `${g.pct}%` }} />
                    </div>
                    <p className={styles.genderCount}>{g.value}명</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.subPanel}>
              <p className={styles.subTitle}>연령대 분포</p>
              <AgeBandChart />
            </div>
          </div>
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

          <CenterCollectionBars />
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
                  <span>건</span>
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
