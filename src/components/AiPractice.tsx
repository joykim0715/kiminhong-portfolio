"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useSiteContent } from "./ContentProvider";
import styles from "./AiPractice.module.css";

type AiItem = ReturnType<typeof useSiteContent>["ai"]["items"][number];

function BriefIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden>
      <rect x="8" y="7" width="26" height="34" rx="4" fill="#f7f8f6" stroke="#1c2b30" strokeWidth="1.5" />
      <path d="M14 16h14M14 22h10" stroke="#5fa8a3" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="33" cy="33" r="8" fill="#1c2b30" />
      <path d="M33 29.5V33l2.2 1.6" stroke="#7ec8c2" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function RosterIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden>
      <rect x="7" y="10" width="28" height="28" rx="4" fill="#f7f8f6" stroke="#1c2b30" strokeWidth="1.5" />
      <path d="M13 19h12M13 25h8" stroke="#6faed9" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="34" cy="32" r="8" fill="#5fa8a3" />
      <path d="M30.5 32.2l2.2 2.2 4.3-4.6" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function Artwork({ src, alt, children }: { src: string; alt: string; children: ReactNode }) {
  const [live, setLive] = useState(false);

  useEffect(() => {
    const probe = new window.Image();
    probe.onload = () => setLive(true);
    probe.onerror = () => setLive(false);
    probe.src = src;
  }, [src]);

  return (
    <div className={styles.canvas}>
      {live ? (
        <Image src={src} alt={alt} fill className={styles.shot} sizes="(min-width: 1024px) 46vw, 100vw" />
      ) : (
        children
      )}
    </div>
  );
}

function MeridianArt({ item }: { item: AiItem }) {
  return (
    <div className={styles.meridian} aria-hidden>
      <div className={styles.flow}>
        <p className={styles.label}>SBH News</p>
        <div className={styles.lane}>
          <span className={styles.dot} style={{ left: 0 }} />
          <span className={styles.dot} style={{ left: 16 }} />
          <i style={{ left: 0 }} />
          <i style={{ left: 10 }} />
        </div>
        <p className={styles.cursor}>Cursor MCP</p>
        <div className={styles.tags}>
          {item.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
      <article className={styles.sheet}>
        <header className={styles.sheetHead}>
          <span className={styles.clock}>
            <i>07:30</i>
            <i>08:00</i>
            <i>08:30</i>
          </span>
          <span className={styles.overwritten}>OVERWRITTEN</span>
        </header>
        <div className={styles.widgets}>
          <p className={styles.widget}>
            <b>S&P 500</b>
            <span className={styles.bar} />
          </p>
          <p className={styles.widget}>
            <b>USD / KRW</b>
            <span className={styles.bar} />
          </p>
        </div>
        <div className={styles.rows}>
          <span className={styles.line} />
          <span className={styles.line} />
          <span className={`${styles.line} ${styles.short}`} />
        </div>
        <span className={styles.scan} />
      </article>
    </div>
  );
}

function FloorballArt({ item }: { item: AiItem }) {
  return (
    <div className={styles.floorball} aria-hidden>
      <div className={styles.files}>
        {item.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <div className={styles.steps}>
        {item.steps.map((step) => (
          <span key={step}>{step}</span>
        ))}
      </div>
      <article className={styles.roster}>
        <header className={styles.rosterHead}>
          <span>Roster</span>
          <span className={styles.approved}>APPROVED</span>
        </header>
        <div className={styles.rows}>
          {[0, 1, 2].map((row) => (
            <div key={row} className={styles.person}>
              <span className={styles.avatar} />
              <span className={styles.line} />
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}

function Visual({ item }: { item: AiItem }) {
  return (
    <Artwork src={item.image} alt={item.title}>
      {item.id === "meridian" ? <MeridianArt item={item} /> : <FloorballArt item={item} />}
    </Artwork>
  );
}

function Copy({ item }: { item: AiItem }) {
  return (
    <div className="px-1 pt-4">
      <p className="break-keep text-lg font-semibold tracking-tight text-text">{item.summary}</p>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {item.chips.map((chip) => (
          <li
            key={chip}
            className="rounded-full border border-border/80 bg-white px-2.5 py-1 text-[11px] font-medium text-muted"
          >
            {chip}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AiPractice() {
  const { ai } = useSiteContent();
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const item = ai.items[active] ?? ai.items[0];

  return (
    <section id="ai" aria-labelledby="ai-heading" className="relative z-[1] -mt-px bg-bg py-20 text-text sm:py-24">
      <div className="section-container">
        <header className="max-w-3xl">
          <p className="section-eyebrow text-primary">{ai.sectionLabel}</p>
          <h2 id="ai-heading" className="section-title mt-3 tracking-tight text-text">
            {ai.title}
          </h2>
          <p className="section-body mt-6 break-keep text-muted">{ai.description}</p>
        </header>

        <div className="mt-12 grid items-start gap-8 lg:mt-16 lg:grid-cols-12 lg:gap-10">
          <div className="min-w-0 lg:col-span-5">
            <ul className="border-t border-border/80">
              {ai.items.map((entry, index) => {
                const selected = index === active;
                return (
                  <li key={entry.id} className="border-b border-border/80">
                    <button
                      type="button"
                      className="relative flex w-full items-center gap-3 py-4 pl-4 text-left"
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
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg border border-border/80 bg-white">
                        {entry.id === "meridian" ? <BriefIcon /> : <RosterIcon />}
                      </span>
                      <span className="min-w-0">
                        <span className="flex items-center gap-2">
                          <span className="font-mono text-xs font-semibold text-primary">{entry.index}</span>
                          <span className="text-[11px] font-bold tracking-[0.14em] text-secondary">{entry.method}</span>
                        </span>
                        <span className={`mt-0.5 block text-lg font-semibold tracking-tight ${selected ? "text-text" : "text-muted"}`}>
                          {entry.title}
                        </span>
                      </span>
                    </button>
                    <div className="pb-4 pl-4 lg:hidden">
                      {selected ? (
                        <>
                          <Visual item={entry} />
                          <Copy item={entry} />
                        </>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 break-keep border-t border-border/80 pt-3 text-[11px] font-medium leading-relaxed text-muted">
              {ai.credential}
            </p>
          </div>

          <div className="hidden min-w-0 lg:col-span-7 lg:block" aria-live="polite">
            <article className="rounded-xl border border-border bg-surface p-3 sm:p-4">
              <Visual item={item} />
              <Copy item={item} />
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
