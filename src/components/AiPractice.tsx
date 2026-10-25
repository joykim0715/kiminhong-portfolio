"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useSiteContent } from "./ContentProvider";
import styles from "./AiPractice.module.css";

const panelEase = [0.75, 0, 0.25, 1] as const;

export default function AiPractice() {
  const { ai } = useSiteContent();
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const item = ai.items[active] ?? ai.items[0];

  return (
    <section id="ai" aria-labelledby="ai-heading" className="relative z-[1] -mt-px bg-bg py-20 text-text sm:py-24">
      <div className="section-container">
        <header className="max-w-xl">
          <p className="section-eyebrow text-primary">{ai.sectionLabel}</p>
          <h2 id="ai-heading" className="section-title mt-3 tracking-tight text-text">
            {ai.title}
          </h2>
          <p className="section-body mt-6 break-keep text-muted">{ai.description}</p>
        </header>

        <div className="mt-12 grid items-start gap-8 lg:mt-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <ul className="border-t border-border/80">
            {ai.items.map((entry, index) => {
              const selected = index === active;
              return (
                <li key={entry.id} className="border-b border-border/80">
                  <button
                    type="button"
                    className="relative flex w-full items-start gap-4 py-5 text-left sm:gap-5 sm:py-6"
                    aria-expanded={selected}
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    onClick={() => setActive(index)}
                  >
                    {selected ? (
                      <motion.span
                        layoutId="ai-active-rule"
                        className="absolute inset-y-3 left-0 w-0.5 bg-primary"
                        transition={
                          reduceMotion
                            ? { duration: 0 }
                            : { type: "spring", bounce: 0.12, visualDuration: 0.35 }
                        }
                      />
                    ) : null}
                    <span className="w-8 shrink-0 pt-1 font-mono text-xs font-semibold tabular-nums text-primary">
                      {entry.index}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-secondary">
                        {entry.method}
                      </span>
                      <span
                        className={`mt-1 block text-lg font-semibold tracking-tight sm:text-xl ${
                          selected ? "text-text" : "text-muted"
                        }`}
                      >
                        {entry.title}
                      </span>
                    </span>
                  </button>
                  <div className={styles.mobileDetail} data-open={selected ? "true" : "false"}>
                    <div>
                      <div className="pb-5 pl-12">
                        <p className="break-keep text-sm leading-relaxed text-text">{entry.summary}</p>
                        <ul className="mt-3 space-y-2">
                          {entry.points.map((point) => (
                            <li key={point} className="break-keep text-sm leading-relaxed text-muted">
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="relative hidden min-h-[24rem] lg:block" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.article
                key={item.id}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: reduceMotion ? 0 : 0.45, ease: panelEase }}
                className="lg:sticky lg:top-28"
              >
                <p className="font-mono text-[5.5rem] font-semibold leading-none tracking-tight text-primary/20" aria-hidden>
                  {item.index}
                </p>
                <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-primary">{item.method}</p>
                <h3 className="mt-2 text-3xl font-semibold tracking-tight">{item.title}</h3>
                <p className="section-body mt-4 max-w-xl break-keep text-text">{item.summary}</p>
                <ul className="mt-6 max-w-xl space-y-3 border-t border-border/80 pt-5">
                  {item.points.map((point) => (
                    <li key={point} className="break-keep text-sm leading-relaxed text-muted">
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
