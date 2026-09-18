"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { lockPageScroll, unlockPageScroll } from "@/lib/lenisInstance";
import { hideNavBarForPanel, showNavBarAfterPanel } from "@/lib/navBarVisibility";
import { getWorkImages } from "@/lib/workImages";
import { formatMetaValue, getImpactMetrics, getInfoMetrics } from "@/lib/panelMetrics";
import type { Work } from "@/data/works";
import { useLocale } from "./ContentProvider";
import ProjectImages from "./ProjectImages";
import styles from "./ProjectPanel.module.css";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const METRIC_RE = /^\d+\.?\d*만\s*건$|^\d+%$|^\d+건$|^\d+명$/;
const HERO_SIZES = "(max-width: 1023px) 100vw, 60vw";
const EMPTY_BLOCKS: Work["panel"]["blocks"] = [];

function useCompactPanel() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setCompact(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return compact;
}

function highlightMetrics(text: string) {
  const parts = text.split(/(\d+\.?\d*만\s*건|\d+%|\d+건|\d+명)/g);
  return parts.map((part, i) =>
    METRIC_RE.test(part) ? (
      <span
        key={i}
        className="mx-0.5 inline-block rounded-md bg-secondary/15 px-1.5 py-0.5 text-[0.95em] font-extrabold tabular-nums text-secondary sm:text-[1.05em]"
      >
        {part}
      </span>
    ) : (
      part
    ),
  );
}

type ProjectPanelProps = {
  work: Work | null;
  onClose: () => void;
};

export default function ProjectPanel({ work, onClose }: ProjectPanelProps) {
  const { locale } = useLocale();
  const reduceMotion = useReducedMotion() === true;
  const compact = useCompactPanel();
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const panel = work?.panel;
  const blocks = panel?.blocks ?? EMPTY_BLOCKS;
  const images = work ? getWorkImages(work) : [];
  const primaryImage = images[0];
  const secondaryImage = images[1];
  const impactMetrics = getImpactMetrics(panel?.metrics);
  const infoMetrics = getInfoMetrics(
    panel?.metrics,
    [work?.title, panel?.subtitle, ...(panel?.meta.map((item) => `${item.label} ${item.value}`) ?? [])].join("\n"),
  );
  const metaItems = [...(panel?.meta ?? []), ...infoMetrics];
  const firstBlockId = blocks[0]?.id ?? "";
  const [activeBlockId, setActiveBlockId] = useState(firstBlockId);
  const [openedWorkId, setOpenedWorkId] = useState(work?.id);
  const blockRefs = useRef<Record<string, HTMLElement | null>>({});

  if (work?.id !== openedWorkId) {
    setOpenedWorkId(work?.id);
    setActiveBlockId(firstBlockId);
  }
  const shellY = compact ? 22 : 36;
  const exitY = compact ? 18 : 28;

  const scrollToBlock = useCallback((id: string) => {
    const container = scrollRef.current;
    const target = blockRefs.current[id];
    if (!container || !target) return;
    const nextTop =
      target.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop - 12;
    container.scrollTo({
      top: nextTop,
      behavior: "smooth",
    });
    setActiveBlockId(id);
  }, []);

  const handlePanelWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    const container = scrollRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const canScroll = scrollHeight > clientHeight + 1;
    if (!canScroll) return;

    const atTop = scrollTop <= 0;
    const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
    const scrollingUp = e.deltaY < 0;
    const scrollingDown = e.deltaY > 0;

    if ((scrollingUp && !atTop) || (scrollingDown && !atBottom)) {
      e.stopPropagation();
    }
  }, []);

  useEffect(() => {
    blockRefs.current = {};
    scrollRef.current?.scrollTo({ top: 0 });
  }, [work]);

  useEffect(() => {
    if (!work) return;

    hideNavBarForPanel();
    lockPageScroll();

    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusId = window.requestAnimationFrame(() => {
      closeBtnRef.current?.focus();
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(focusId);
      window.removeEventListener("keydown", onKeyDown);
      unlockPageScroll();
      showNavBarAfterPanel();
      previous?.focus?.();
    };
  }, [work, onClose]);

  useEffect(() => {
    if (!work) return;

    const container = scrollRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setActiveBlockId(visible.target.id);
        }
      },
      {
        root: container,
        threshold: [0.25, 0.45, 0.65],
        rootMargin: "-8% 0px -55% 0px",
      },
    );

    blocks.forEach((block) => {
      const el = blockRefs.current[block.id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [work, blocks]);

  useEffect(() => {
    if (!work || !scrollRef.current) return;

    const blocksEls = scrollRef.current.querySelectorAll<HTMLElement>(`.${styles.block}`);
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.blockVisible);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { root: scrollRef.current, threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    blocksEls.forEach((block) => revealObserver.observe(block));

    requestAnimationFrame(() => {
      blocksEls.forEach((block) => {
        const rect = block.getBoundingClientRect();
        const rootRect = scrollRef.current?.getBoundingClientRect();
        if (!rootRect) return;
        if (rect.top < rootRect.bottom && rect.bottom > rootRect.top) {
          block.classList.add(styles.blockVisible);
        }
      });
    });

    return () => revealObserver.disconnect();
  }, [work]);

  return (
    <AnimatePresence>
      {work && panel ? (
        <motion.div
          key={work.id}
          className={styles.panel}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-panel-title"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{ duration: reduceMotion ? 0.16 : 0.38, ease: EASE_OUT }}
        >
          <motion.button
            type="button"
            className={styles.backdrop}
            aria-label={locale === "en" ? "Close project details" : "프로젝트 상세 닫기"}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: reduceMotion ? 0.12 : 0.18, ease: EASE_OUT },
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: reduceMotion ? 0.12 : 0.22,
                delay: reduceMotion ? 0 : 0.1,
                ease: EASE_OUT,
              },
            }}
          />

          <motion.div
            className={styles.shell}
            data-project-panel
            initial={reduceMotion ? { opacity: 0 } : { y: shellY, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: {
                duration: reduceMotion ? 0.16 : compact ? 0.42 : 0.52,
                delay: reduceMotion ? 0 : 0.05,
                ease: EASE_OUT,
              },
            }}
            exit={
              reduceMotion
                ? { opacity: 0, transition: { duration: 0.14, ease: EASE_OUT } }
                : {
                    y: exitY,
                    opacity: 0,
                    transition: { duration: 0.32, ease: EASE_OUT },
                  }
            }
            style={{ willChange: "transform, opacity" }}
            onClick={(e) => e.stopPropagation()}
            onWheel={handlePanelWheel}
          >
            <div className={styles.shellInner}>
              <div className={styles.toolbar}>
                <button
                  ref={closeBtnRef}
                  type="button"
                  className={styles.backButton}
                  onClick={onClose}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M15 19l-7-7 7-7" />
                  </svg>
                  {locale === "en" ? "Back" : "뒤로 가기"}
                </button>
                <span className={styles.toolbarLabel}>{panel.sectionLabel}</span>
              </div>

              <div ref={scrollRef} className={styles.scroll} data-project-panel-scroll>
                <header className={styles.hero}>
                  <div className={styles.heroGlow} aria-hidden="true" />
                  <div className={`section-container ${styles.heroGrid}`}>
                    <div className={styles.heroCopy}>
                      <motion.div
                        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: compact ? 10 : 16 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: reduceMotion ? 0.12 : compact ? 0.34 : 0.42,
                            delay: reduceMotion ? 0 : compact ? 0.1 : 0.16,
                            ease: EASE_OUT,
                          },
                        }}
                      >
                        <p className={styles.heroCategory}>{work.category}</p>
                        <h2 id="project-panel-title" className={`text-preline ${styles.heroTitle}`}>
                          {work.title}
                        </h2>
                      </motion.div>
                      <motion.div
                        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: compact ? 8 : 12 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: reduceMotion ? 0.12 : compact ? 0.32 : 0.4,
                            delay: reduceMotion ? 0 : compact ? 0.14 : 0.22,
                            ease: EASE_OUT,
                          },
                        }}
                      >
                        <p className={`text-preline ${styles.heroSubtitle}`}>{panel.subtitle}</p>
                      </motion.div>
                    </div>

                    {primaryImage ? (
                      <motion.div
                        className={styles.visualStage}
                        initial={
                          reduceMotion
                            ? { opacity: 1 }
                            : { opacity: 0.72, scale: compact ? 1.012 : 1.025 }
                        }
                        animate={{
                          opacity: 1,
                          scale: 1,
                          transition: {
                            duration: reduceMotion ? 0.12 : compact ? 0.36 : 0.48,
                            delay: reduceMotion ? 0 : compact ? 0.08 : 0.12,
                            ease: EASE_OUT,
                          },
                        }}
                        style={{ willChange: reduceMotion ? undefined : "transform, opacity" }}
                      >
                        <ProjectImages
                          images={[primaryImage]}
                          alt={work.title}
                          sizes={HERO_SIZES}
                          quality={90}
                          priority
                        />
                        {secondaryImage ? (
                          <div className={styles.visualInset}>
                            <ProjectImages
                              images={[secondaryImage]}
                              alt={`${work.title} 2`}
                              sizes="(max-width: 1023px) 30vw, 160px"
                              quality={84}
                            />
                          </div>
                        ) : null}
                      </motion.div>
                    ) : null}

                    {metaItems.length > 0 ? (
                      <motion.dl
                        className={styles.heroMeta}
                        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: compact ? 8 : 12 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: reduceMotion ? 0.12 : compact ? 0.32 : 0.4,
                            delay: reduceMotion ? 0 : compact ? 0.16 : 0.24,
                            ease: EASE_OUT,
                          },
                        }}
                      >
                        {metaItems.map((item) => (
                          <div key={`${item.label}-${item.value}`}>
                            <dt>{item.label}</dt>
                            <dd className="text-preline">{formatMetaValue(item.value)}</dd>
                          </div>
                        ))}
                      </motion.dl>
                    ) : null}
                  </div>
                </header>

                {impactMetrics.length > 0 ? (
                  <section className={styles.impact} aria-label={locale === "en" ? "Impact" : "성과"}>
                    <div className={`section-container ${styles.impactInner}`}>
                      <p className={styles.impactLabel}>{locale === "en" ? "Impact" : "성과"}</p>
                      <div className={styles.impactRow}>
                        {impactMetrics.map((metric) => (
                          <div key={metric.label}>
                            <p className={styles.impactValue}>{metric.value}</p>
                            <p className={styles.impactKey}>{metric.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                ) : null}

                <div className={styles.body}>
                  <nav className={styles.rail} aria-label={locale === "en" ? "Project outline" : "프로젝트 목차"}>
                    {blocks.map((block, index) => (
                      <button
                        key={block.id}
                        type="button"
                        className={`${styles.railButton} ${
                          activeBlockId === block.id ? styles.railButtonActive : ""
                        }`}
                        onClick={() => scrollToBlock(block.id)}
                      >
                        <span className={styles.railIndex}>{String(index + 1).padStart(2, "0")}</span>
                        <span>{block.title}</span>
                      </button>
                    ))}
                  </nav>

                  <div className={styles.contentColumn}>
                    <div className={styles.mobileNav} aria-label={locale === "en" ? "Project outline" : "프로젝트 목차"}>
                      {blocks.map((block) => (
                        <button
                          key={block.id}
                          type="button"
                          className={`${styles.mobilePill} ${
                            activeBlockId === block.id ? styles.mobilePillActive : ""
                          }`}
                          onClick={() => scrollToBlock(block.id)}
                        >
                          {block.title}
                        </button>
                      ))}
                    </div>

                    <div className={`section-container ${styles.content}`}>
                      {panel.demoHref && panel.demoCtaLabel ? (
                        <div className="mb-5">
                          <Link
                            href={panel.demoHref}
                            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90"
                          >
                            {panel.demoCtaLabel}
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                          <p className="mt-2 text-xs text-muted">
                            {locale === "en"
                              ? "Web reconstruction of the real ops screens (participants · center · smart-home risk) — synthetic data only"
                              : "실제 운영 화면 구성(참여자·센터 수집·스마트홈 위험)을 웹으로 재현한 데모 (합성 데이터)"}
                          </p>
                        </div>
                      ) : null}

                      {blocks.map((block, index) => (
                        <article
                          key={block.id}
                          id={block.id}
                          ref={(el) => {
                            blockRefs.current[block.id] = el;
                          }}
                          className={styles.block}
                          style={{ transitionDelay: `${index * 40}ms` }}
                        >
                          <div className="flex items-baseline gap-3">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/12 text-sm font-bold text-primary">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <div className="min-w-0">
                              <h3 className="text-lg font-bold tracking-tight text-text">{block.title}</h3>
                              {block.summary ? (
                                <p className="mt-2 break-keep text-sm leading-relaxed text-muted sm:text-base">
                                  {block.summary}
                                </p>
                              ) : null}
                            </div>
                          </div>

                          <ul className="mt-5 space-y-2.5 border-t border-border pt-5">
                            {block.bullets.map((bullet) => (
                              <li key={bullet} className="flex items-start gap-3 text-sm text-text sm:text-base">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                                <span className="break-keep leading-relaxed">{highlightMetrics(bullet)}</span>
                              </li>
                            ))}
                          </ul>
                        </article>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
