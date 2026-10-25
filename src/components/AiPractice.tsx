"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
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

function MeridianScreen({ screen }: { screen: Extract<AiItem["screen"], { names: string[] }> }) {
  return (
    <div className={styles.realMeridian}>
      <header className={styles.realHead}>
        <div>
          <p className={styles.realKicker}>{screen.kicker}</p>
          <p className={styles.realTitle}>{screen.title}</p>
        </div>
      </header>
      <div className={styles.realSplit}>
        <section>
          <p className={styles.zone}>{screen.left}</p>
          <div className={styles.ranges}>
            {screen.range.map((label, index) => (
              <span key={label} data-on={index === 1 ? "true" : "false"}>
                {label}
              </span>
            ))}
          </div>
          <ul className={styles.names}>
            {screen.names.map((name) => (
              <li key={name}>
                <b>{name}</b>
                <i />
              </li>
            ))}
          </ul>
          <p className={styles.basis}>{screen.basis}</p>
        </section>
        <section>
          <p className={styles.zone}>{screen.right}</p>
          <article className={styles.newsCard}>
            <p>{screen.newsTitle}</p>
            <h4>{screen.newsBody}</h4>
            <span />
            <span />
          </article>
        </section>
      </div>
    </div>
  );
}

function FloorballScreen({
  screen,
  steps,
}: {
  screen: Extract<AiItem["screen"], { filters: string[] }>;
  steps: string[];
}) {
  return (
    <div className={styles.realFloor}>
      <p className={styles.floorKicker}>{screen.kicker}</p>
      <h4 className={styles.floorTitle}>{screen.title}</h4>
      <p className={styles.floorNote}>{screen.note}</p>
      <div className={styles.filters}>
        {screen.filters.map((label, index) => (
          <span key={label} data-on={index === 0 ? "true" : "false"}>
            {label}
          </span>
        ))}
      </div>
      <article className={styles.caseCard}>
        <header>
          <div>
            <p>{screen.kind}</p>
            <h5>{screen.name}</h5>
            <small>{screen.team}</small>
          </div>
          <span>{screen.status}</span>
        </header>
        <ol>
          {steps.map((step, index) => (
            <li key={step} data-on={index < 2 ? "true" : "false"}>
              {step}
            </li>
          ))}
        </ol>
      </article>
    </div>
  );
}

function ScreenDialog({
  item,
  onClose,
}: {
  item: AiItem;
  onClose: () => void;
}) {
  const { ai } = useSiteContent();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className={styles.backdrop}
      role="presentation"
      onClick={onClose}
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduceMotion ? undefined : { opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={item.title}
        className={styles.dialog}
        onClick={(event) => event.stopPropagation()}
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduceMotion ? undefined : { opacity: 0, y: 8 }}
        transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.dialogBar}>
          <p>{ai.exampleTag}</p>
          <button type="button" onClick={onClose} autoFocus>
            {ai.closePreview}
          </button>
        </div>
        {item.screen.names && item.screen.range && item.screen.left && item.screen.right ? (
          <MeridianScreen
            screen={{
              kicker: item.screen.kicker,
              title: item.screen.title,
              left: item.screen.left,
              right: item.screen.right,
              range: item.screen.range,
              names: item.screen.names,
              basis: item.screen.basis ?? "",
              newsTitle: item.screen.newsTitle ?? "",
              newsBody: item.screen.newsBody ?? "",
            }}
          />
        ) : (
          <FloorballScreen
            screen={{
              kicker: item.screen.kicker,
              title: item.screen.title,
              filters: item.screen.filters ?? [],
              kind: item.screen.kind ?? "",
              name: item.screen.name ?? "",
              team: item.screen.team ?? "",
              status: item.screen.status ?? "",
              note: item.screen.note ?? "",
            }}
            steps={item.steps}
          />
        )}
      </motion.div>
    </motion.div>
  );
}

function PreviewButton({ item, onOpen }: { item: AiItem; onOpen: () => void }) {
  const { ai } = useSiteContent();
  return (
    <button type="button" className={styles.preview} onClick={onOpen} aria-haspopup="dialog">
      <Visual item={item} />
      <span className={styles.cue}>
        {ai.openPreview}
        <span className={styles.cueArrow} aria-hidden>
          ↗
        </span>
      </span>
    </button>
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
  const [open, setOpen] = useState(false);
  const closePreview = useCallback(() => setOpen(false), []);
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
            <p className={styles.hoverNote}>{ai.hoverNote}</p>
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
                      <span className={styles.tabHint} aria-hidden>
                        {ai.switchHint}
                      </span>
                    </button>
                    <div className="pb-4 pl-4 lg:hidden">
                      {selected ? (
                        <>
                          <PreviewButton item={entry} onOpen={() => setOpen(true)} />
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
              <PreviewButton item={item} onOpen={() => setOpen(true)} />
              <Copy item={item} />
            </article>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {open ? <ScreenDialog item={item} onClose={closePreview} /> : null}
      </AnimatePresence>
    </section>
  );
}
