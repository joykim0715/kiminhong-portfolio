"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useSiteContent } from "./ContentProvider";
import styles from "./AiPractice.module.css";

const revealEase = [0.22, 1, 0.36, 1] as const;

type AiItem = ReturnType<typeof useSiteContent>["ai"]["items"][number];

function reveal(delay: number, reduce: boolean | null) {
  if (reduce) return { duration: 0 };
  return { duration: 0.45, ease: revealEase, delay };
}

function MeridianConsole({
  copy,
  reduce,
}: {
  copy: NonNullable<AiItem["meridian"]>;
  reduce: boolean | null;
}) {
  const [tick, setTick] = useState(0);
  const [view, setView] = useState<"flow" | "file">("flow");
  const [flash, setFlash] = useState(false);
  const time = copy.slots[tick] ?? copy.slots[0];
  const unread = copy.unread[tick] ?? copy.unread[0];

  function simulate() {
    setTick((current) => (current + 1) % copy.slots.length);
    setView("file");
    if (reduce) return;
    setFlash(true);
    window.setTimeout(() => setFlash(false), 420);
  }

  return (
    <div className={styles.console} data-flash={flash ? "true" : "false"}>
      <div className="flex items-center justify-between gap-3 bg-dark px-3 py-2 text-[11px] text-white">
        <p className="min-w-0 truncate font-mono">
          {copy.fileName} — {time} KST · {copy.cronNote} · {copy.mode}
        </p>
        <button
          type="button"
          onClick={simulate}
          className="shrink-0 rounded-full border border-white/20 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white"
        >
          {copy.simulate}
        </button>
      </div>
      <div className="flex gap-2 border-b border-border/80 px-3 py-2">
        {(["flow", "file"] as const).map((key) => (
          <button
            key={key}
            type="button"
            aria-pressed={view === key}
            onClick={() => setView(key)}
            className={`rounded-full px-2.5 py-1 text-[10px] font-bold tracking-[0.12em] ${
              view === key ? "bg-primary text-white" : "text-muted"
            }`}
          >
            {key === "flow" ? copy.flowTab : copy.fileTab}
          </button>
        ))}
      </div>
      <div className="px-3 py-3">
        {view === "flow" ? (
          <div className={styles.flow} aria-hidden={false}>
            {copy.nodes.map((node, index) => (
              <span key={node} className="contents">
                {index > 0 ? (
                  <span className={styles.connector} aria-hidden>
                    <span className={styles.packet} />
                  </span>
                ) : null}
                <span className={styles.node}>{node}</span>
              </span>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm font-semibold text-text">
              {copy.classified}
              <span className="ml-2 font-mono text-xs font-medium text-primary">{unread}</span>
            </p>
            <div>
              <p className="text-[10px] font-bold tracking-[0.14em] text-muted">{copy.marketTitle}</p>
              <ul className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {copy.markets.map((name) => (
                  <li key={name} className="rounded-md border border-border/80 bg-white px-2 py-1.5">
                    <p className="text-xs font-semibold text-text">{name}</p>
                    <p className="text-[10px] text-muted">{copy.marketNote}</p>
                  </li>
                ))}
              </ul>
            </div>
            <ol className="space-y-1 border-t border-border/80 pt-2 font-mono text-[11px] text-muted">
              <li>{copy.logFetch} · {unread}</li>
              <li>{copy.logClass}</li>
              <li>{copy.logWrite} · {time}</li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}

function FloorballConsole({ copy }: { copy: NonNullable<AiItem["floorball"]> }) {
  const [format, setFormat] = useState(0);
  const [role, setRole] = useState(1);
  const [step, setStep] = useState(0);
  const [rejected, setRejected] = useState(false);
  const [note, setNote] = useState(copy.roles[1]?.permit ?? "");
  const parsed = copy.formats[format];
  const currentRole = copy.roles[role];

  function advance() {
    if (!currentRole) return;
    if (currentRole.id === "player") {
      setNote(copy.blocked);
      return;
    }
    if (currentRole.id === "team" && step === 0 && !rejected) {
      setStep(1);
      setNote(currentRole.permit);
      return;
    }
    if (currentRole.id === "assoc" && step === 1) {
      setStep(2);
      setRejected(false);
      setNote(currentRole.permit);
      return;
    }
    if (currentRole.id === "national" && step === 2) {
      setStep(3);
      setRejected(false);
      setNote(currentRole.permit);
      return;
    }
    setNote(copy.blocked);
  }

  function rejectCase() {
    if (!currentRole) return;
    if ((currentRole.id === "assoc" && step === 1) || (currentRole.id === "national" && step === 2)) {
      setStep(3);
      setRejected(true);
      setNote(currentRole.permit);
      return;
    }
    setNote(copy.blocked);
  }

  const stepLabel = rejected ? copy.rejected : copy.steps[step];

  return (
    <div className={styles.console}>
      <div className="flex flex-wrap gap-1.5 border-b border-border/80 px-3 py-2.5">
        {copy.formats.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={index === format}
            onClick={() => setFormat(index)}
            className={`rounded-full border px-2 py-1 font-mono text-[10px] font-semibold ${
              index === format ? "border-primary bg-primary text-white" : "border-border bg-white text-muted"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <p className="border-b border-border/80 px-3 py-2 text-xs text-text" aria-live="polite">
        {parsed?.result}
      </p>
      <div className="flex flex-wrap gap-1.5 px-3 pt-3">
        {copy.roles.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={index === role}
            onClick={() => {
              setRole(index);
              setNote(item.permit);
            }}
            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
              index === role ? "bg-dark text-white" : "bg-white text-muted"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <ol className="mt-3 flex flex-wrap gap-1.5 px-3">
        {copy.steps.map((label, index) => {
          const done = !rejected && index < step;
          const current = index === step || (rejected && index === 3);
          const text = index === 3 && rejected ? copy.rejected : label;
          return (
            <li key={label}>
              <span
                className={`inline-flex rounded-full border px-2 py-1 text-[10px] font-semibold ${
                  current ? "border-primary text-primary" : done ? "border-border text-text" : "border-border text-muted"
                }`}
              >
                {text}
              </span>
            </li>
          );
        })}
      </ol>
      <div className="flex flex-wrap items-center gap-2 px-3 py-3">
        <button type="button" onClick={advance} className="rounded-full bg-primary px-3 py-1.5 text-[11px] font-semibold text-white">
          {copy.advance}
        </button>
        <button type="button" onClick={rejectCase} className="rounded-full border border-border bg-white px-3 py-1.5 text-[11px] font-semibold text-text">
          {copy.reject}
        </button>
        <p className="min-w-0 flex-1 text-xs text-muted">
          {stepLabel} · {note}
        </p>
      </div>
    </div>
  );
}

function Detail({ item, reduce }: { item: AiItem; reduce: boolean | null }) {
  return (
    <>
      <p className="break-keep text-sm leading-relaxed text-text">{item.summary}</p>
      {item.meridian ? <div className="mt-4"><MeridianConsole copy={item.meridian} reduce={reduce} /></div> : null}
      {item.floorball ? <div className="mt-4"><FloorballConsole copy={item.floorball} /></div> : null}
      <ul className={`${styles.rules} mt-4 px-0`}>
        {item.rules.map((rule) => (
          <li key={rule.title} className={styles.rule}>
            <p className="text-sm font-semibold tracking-tight text-text">{rule.title}</p>
            <p className="mt-1 break-keep text-xs leading-relaxed text-muted">{rule.body}</p>
          </li>
        ))}
      </ul>
    </>
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
                      className="relative flex w-full flex-col items-start gap-2 py-5 pl-4 text-left"
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
                      <span className="flex items-center gap-3">
                        <span className="font-mono text-xs font-semibold tabular-nums text-primary">{entry.index}</span>
                        <span className="text-[11px] font-bold tracking-[0.14em] text-secondary">{entry.method}</span>
                      </span>
                      <span className={`text-lg font-semibold tracking-tight ${selected ? "text-text" : "text-muted"}`}>
                        {entry.title}
                      </span>
                      <span className="flex flex-wrap gap-1.5">
                        {entry.chips.map((chip) => (
                          <span
                            key={chip}
                            className="rounded-full border border-border/80 bg-white px-2 py-0.5 text-[10px] font-medium text-muted"
                          >
                            {chip}
                          </span>
                        ))}
                      </span>
                    </button>
                    <div className={styles.mobileDetail} data-open={selected ? "true" : "false"}>
                      <div>
                        <div className="pb-5 pl-4">
                          <Detail item={entry} reduce={reduceMotion} />
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 break-keep border-t border-border/80 pt-3 text-[11px] font-medium leading-relaxed text-muted">
              {ai.credential}
            </p>
          </div>

          <div className="relative hidden min-w-0 lg:col-span-7 lg:block" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.article
                key={item.id}
                className={styles.frame}
                initial={reduceMotion ? false : { opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.15 }}
              >
                <motion.header
                  className="flex items-center justify-between gap-3 border-b border-border/80 px-4 py-3"
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={reveal(0, reduceMotion)}
                >
                  <p className="min-w-0 truncate font-mono text-[11px] font-semibold tracking-wide text-text">
                    {item.consoleTitle}
                  </p>
                  <p className="flex shrink-0 items-center gap-1.5 text-[10px] font-bold tracking-[0.14em] text-primary">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                    {ai.activeLabel}
                  </p>
                </motion.header>
                <motion.div
                  className="px-4 pt-4"
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={reveal(0.07, reduceMotion)}
                >
                  <ul className="grid grid-cols-2 gap-3 border-b border-border/70 pb-4">
                    {item.chips.map((chip) => (
                      <li key={chip} className="min-w-0">
                        <p className="break-keep text-sm font-semibold tracking-tight text-text">{chip}</p>
                      </li>
                    ))}
                  </ul>
                  <p className="section-body mt-4 break-keep text-sm text-text">{item.summary}</p>
                  {item.meridian ? <div className="mt-4 -mx-4"><MeridianConsole copy={item.meridian} reduce={reduceMotion} /></div> : null}
                  {item.floorball ? <div className="mt-4 -mx-4"><FloorballConsole copy={item.floorball} /></div> : null}
                </motion.div>
                <motion.ul
                  className={styles.rules}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={reveal(0.14, reduceMotion)}
                >
                  {item.rules.map((rule) => (
                    <li key={rule.title} className={styles.rule}>
                      <p className="text-sm font-semibold tracking-tight text-text">{rule.title}</p>
                      <p className="mt-1 break-keep text-xs leading-relaxed text-muted">{rule.body}</p>
                    </li>
                  ))}
                </motion.ul>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
