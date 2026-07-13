"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { lockPageScroll, unlockPageScroll } from "@/lib/lenisInstance";
import { siteContent } from "@/data/content";
import type { Work } from "@/data/works";
import styles from "./CaseStudyPanel.module.css";

const { caseStudy } = siteContent;

const METRIC_RE = /^\d+\.?\d*만\s*건$|^\d+%$|^\d+건$|^\d+명$/;

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

type CaseStudyPanelProps = {
  work: Work | null;
  onClose: () => void;
};

export default function CaseStudyPanel({ work, onClose }: CaseStudyPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeBlockId, setActiveBlockId] = useState(caseStudy.blocks[0]?.id ?? "");
  const blockRefs = useRef<Record<string, HTMLElement | null>>({});

  const scrollToBlock = useCallback((id: string) => {
    const container = scrollRef.current;
    const target = blockRefs.current[id];
    if (!container || !target) return;
    container.scrollTo({
      top: target.offsetTop - 12,
      behavior: "smooth",
    });
    setActiveBlockId(id);
  }, []);

  useEffect(() => {
    if (!work) return;

    lockPageScroll();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      unlockPageScroll();
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

    caseStudy.blocks.forEach((block) => {
      const el = blockRefs.current[block.id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [work]);

  useEffect(() => {
    if (!work || !scrollRef.current) return;

    const blocks = scrollRef.current.querySelectorAll<HTMLElement>(`.${styles.block}`);
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.blockVisible);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { root: scrollRef.current, threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    blocks.forEach((block) => revealObserver.observe(block));
    return () => revealObserver.disconnect();
  }, [work]);

  return (
    <AnimatePresence>
      {work ? (
        <motion.div
          className={styles.panel}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-panel-title"
        >
          <motion.button
            type="button"
            className={styles.backdrop}
            aria-label="케이스 스터디 닫기"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className={styles.shell}
            initial={{ y: "100%", opacity: 0.9 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "18%", opacity: 0 }}
            transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <header className={styles.hero}>
              <div className={styles.heroGlow} aria-hidden="true" />
              <button type="button" className={styles.close} onClick={onClose} aria-label="닫기">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className={`section-container ${styles.heroGrid}`}>
                <div className={styles.thumb}>
                  {work.image ? (
                    <Image
                      src={work.image}
                      alt={work.title}
                      fill
                      className="object-contain sharp-image p-3"
                      sizes="120px"
                      quality={88}
                    />
                  ) : null}
                </div>

                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-primary-light">
                    {caseStudy.sectionLabel}
                  </p>
                  <h2 id="case-study-panel-title" className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">
                    {caseStudy.title}
                  </h2>
                  <p className="mt-2 break-keep text-sm leading-relaxed text-white/72 sm:text-base">
                    {caseStudy.subtitle}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {caseStudy.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-center"
                      >
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">
                          {metric.label}
                        </p>
                        <p className="mt-1 text-lg font-black text-primary-light sm:text-xl">{metric.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </header>

            <div className={styles.body}>
              <nav className={styles.rail} aria-label="케이스 스터디 목차">
                {caseStudy.blocks.map((block, index) => (
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

              <div className="flex min-h-0 min-w-0 flex-1 flex-col">
                <div className={styles.mobileNav} aria-label="케이스 스터디 목차">
                  {caseStudy.blocks.map((block) => (
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

                <div ref={scrollRef} className={styles.scroll}>
                  <div className={`section-container ${styles.content}`}>
                    <dl className="mb-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                      {caseStudy.meta.map((item) => (
                        <div
                          key={item.label}
                          className="rounded-xl border border-border bg-bg/80 px-4 py-3"
                        >
                          <dt className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                            {item.label}
                          </dt>
                          <dd className="mt-1.5 text-sm font-medium leading-snug text-text">{item.value}</dd>
                        </div>
                      ))}
                    </dl>

                    {caseStudy.blocks.map((block, index) => (
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
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
