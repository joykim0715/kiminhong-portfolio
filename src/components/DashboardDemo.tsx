"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { dashboardDemo } from "@/data/dashboardDemo";
import styles from "./DashboardDemo.module.css";

type SeriesKey = "active" | "retention" | "validity";

const SERIES_KEYS: SeriesKey[] = ["active", "retention", "validity"];

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

function useInViewOnce<T extends Element>(options?: IntersectionObserverInit) {
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
      { threshold: 0.35, rootMargin: "0px 0px -8% 0px", ...options },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [inView, options]);

  return { ref, inView };
}

function TrendChart() {
  const { weeks, series } = dashboardDemo.trend;
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const [pathLengths, setPathLengths] = useState<number[]>([0, 0, 0]);
  const lengthsReady = pathLengths.some((length) => length > 0);
  const animate = (inView && lengthsReady) || reducedMotion;

  const { paths, points, width, height, pad } = useMemo(() => {
    const width = 640;
    const height = 220;
    const pad = { top: 16, right: 12, bottom: 28, left: 36 };
    const innerW = width - pad.left - pad.right;
    const innerH = height - pad.top - pad.bottom;

    const scales: Record<SeriesKey, (v: number) => number> = {
      active: (v) => pad.top + innerH - ((v - 110) / (155 - 110)) * innerH,
      retention: (v) => pad.top + innerH - ((v - 65) / (90 - 65)) * innerH,
      validity: (v) => pad.top + innerH - ((v - 65) / (90 - 65)) * innerH,
    };

    const xAt = (i: number) => pad.left + (i / Math.max(weeks.length - 1, 1)) * innerW;

    const paths = SERIES_KEYS.map((key) => {
      const d = weeks
        .map((w, i) => {
          const x = xAt(i);
          const y = scales[key](w[key]);
          return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
        })
        .join(" ");
      return { key, d, color: series.find((s) => s.id === key)?.color ?? "var(--clr-primary)" };
    });

    const points = weeks.map((w, i) => ({
      i,
      x: xAt(i),
      week: w.week,
      values: {
        active: w.active,
        retention: w.retention,
        validity: w.validity,
        blackout: w.blackout,
      },
      ys: {
        active: scales.active(w.active),
        retention: scales.retention(w.retention),
        validity: scales.validity(w.validity),
      },
    }));

    return { paths, points, width, height, pad };
  }, [weeks, series]);

  useLayoutEffect(() => {
    const lengths = pathRefs.current.map((path) => (path ? path.getTotalLength() : 0));
    setPathLengths(lengths);
  }, [paths]);

  const active = hoverIndex !== null ? points[hoverIndex] : points[points.length - 1];

  return (
    <div ref={ref} className={styles.chartWrap}>
      <svg
        className={`${styles.chart} ${animate ? styles.chartAnimate : ""}`}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="주간 활성 참여자, 리텐션, 유효성 추이"
        onMouseLeave={() => setHoverIndex(null)}
      >
        {[0, 0.25, 0.5, 0.75, 1].map((t) => {
          const y = pad.top + (height - pad.top - pad.bottom) * t;
          return (
            <line
              key={t}
              x1={pad.left}
              x2={width - pad.right}
              y1={y}
              y2={y}
              className={styles.gridLine}
            />
          );
        })}

        {paths.map((p, index) => {
          const length = pathLengths[index] || 0;
          return (
            <path
              key={p.key}
              ref={(el) => {
                pathRefs.current[index] = el;
              }}
              d={p.d}
              fill="none"
              stroke={p.color}
              strokeWidth={2.4}
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.linePath}
              style={
                {
                  ["--line-delay" as string]: `${index * 160}ms`,
                  strokeDasharray: reducedMotion || !length ? undefined : length,
                  strokeDashoffset: reducedMotion || !length ? undefined : length,
                  opacity: lengthsReady || reducedMotion ? 1 : 0,
                }
              }
            />
          );
        })}

        {points.map((p) => (
          <g key={p.week}>
            <rect
              x={p.x - 18}
              y={pad.top}
              width={36}
              height={height - pad.top - pad.bottom}
              fill="transparent"
              onMouseEnter={() => setHoverIndex(p.i)}
            />
            <text x={p.x} y={height - 8} textAnchor="middle" className={styles.axisLabel}>
              {p.week}
            </text>
          </g>
        ))}

        {active ? (
          <line
            x1={active.x}
            x2={active.x}
            y1={pad.top}
            y2={height - pad.bottom}
            className={styles.hoverLine}
          />
        ) : null}

        {SERIES_KEYS.map((key, index) => {
          const pt = active;
          if (!pt) return null;
          const color = series.find((s) => s.id === key)?.color ?? "var(--clr-primary)";
          return (
            <circle
              key={key}
              cx={pt.x}
              cy={pt.ys[key]}
              r={4.2}
              fill={color}
              stroke="#fff"
              strokeWidth={1.5}
              className={styles.lineDot}
              style={{ ["--dot-delay" as string]: `${480 + index * 80}ms` }}
            />
          );
        })}
      </svg>

      <div className={styles.chartMeta}>
        <div className={styles.legend}>
          {series.map((s) => (
            <span key={s.id} className={styles.legendItem}>
              <i style={{ background: s.color }} aria-hidden />
              {s.label}
            </span>
          ))}
        </div>
        {active ? (
          <p className={styles.hoverReadout} aria-live="polite">
            <strong>{active.week}</strong>
            {" · "}활성 {active.values.active}명
            {" · "}리텐션 {active.values.retention}%
            {" · "}유효성 {active.values.validity}%
            {" · "}blackout {active.values.blackout}%
          </p>
        ) : null}
      </div>
    </div>
  );
}

function BlackoutBars() {
  const weeks = dashboardDemo.trend.weeks;
  const max = Math.max(...weeks.map((w) => w.blackout));
  const reducedMotion = usePrefersReducedMotion();
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  const animate = inView || reducedMotion;

  return (
    <div
      ref={ref}
      className={`${styles.barChart} ${animate ? styles.barChartAnimate : ""}`}
      role="img"
      aria-label="주간 blackout 비율"
    >
      {weeks.map((w, index) => (
        <div key={w.week} className={styles.barCol}>
          <div className={styles.barTrack}>
            <div
              className={styles.barFill}
              style={
                {
                  ["--bar-height" as string]: `${(w.blackout / max) * 100}%`,
                  ["--bar-delay" as string]: `${index * 70}ms`,
                  height: reducedMotion ? `${(w.blackout / max) * 100}%` : undefined,
                }
              }
              title={`${w.week}: ${w.blackout}%`}
            />
          </div>
          <span className={styles.barLabel}>{w.week}</span>
          <span className={styles.barValue}>{w.blackout}%</span>
        </div>
      ))}
    </div>
  );
}

export default function DashboardDemo() {
  const { header, kpis, trend, alerts, insight, footerNote } = dashboardDemo;

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

        <section className={styles.kpiGrid} aria-label="핵심 KPI">
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

        <section className={styles.panel}>
          <div className={styles.panelHead}>
            <div>
              <p className={styles.sectionLabel}>{trend.sectionLabel}</p>
              <h2 className={styles.sectionTitle}>{trend.title}</h2>
              <p className={styles.sectionDesc}>{trend.description}</p>
            </div>
          </div>
          <div className={styles.trendGrid}>
            <div className={styles.trendMain}>
              <TrendChart />
            </div>
            <aside className={styles.trendSide}>
              <p className={styles.sideTitle}>Blackout 주간 비율</p>
              <p className={styles.sideDesc}>공백 구간이 줄수록 분석 유효성이 함께 회복됩니다.</p>
              <BlackoutBars />
            </aside>
          </div>
        </section>

        <section className={styles.panel}>
          <div className={styles.panelHead}>
            <div>
              <p className={styles.sectionLabel}>{alerts.sectionLabel}</p>
              <h2 className={styles.sectionTitle}>{alerts.title}</h2>
              <p className={styles.sectionDesc}>{alerts.description}</p>
            </div>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  {alerts.columns.map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {alerts.rows.map((row) => (
                  <tr key={row.id}>
                    <td className={styles.mono}>{row.id}</td>
                    <td>{row.type}</td>
                    <td>{row.signal}</td>
                    <td>{row.action}</td>
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
