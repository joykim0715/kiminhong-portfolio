"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { getLenisInstance } from "@/lib/lenisInstance";
import { useLocale, useSiteContent } from "./ContentProvider";
import KineticGlyph, { type GlyphKind } from "./ui/KineticGlyph";
import styles from "./ResearchMethod.module.css";

const LAST_INDEX = 4;
const NAV_OFFSET = 64;

export default function ResearchMethod() {
  const { method } = useSiteContent();
  const { locale } = useLocale();
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!root || !stage || !track) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      root.dataset.pinned = "true";
      const distance = () => Math.max(0, track.scrollWidth - stage.clientWidth);
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: `top ${NAV_OFFSET}px`,
          end: () => `+=${distance()}`,
          pin: stage,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate(self) {
            const next = Math.min(LAST_INDEX, Math.round(self.progress * LAST_INDEX));
            setActive((prev) => (prev === next ? prev : next));
          },
        },
      });
      triggerRef.current = tween.scrollTrigger ?? null;
      return () => {
        triggerRef.current = null;
        delete root.dataset.pinned;
      };
    });

    const observer = new IntersectionObserver(([entry]) => {
      root.dataset.motionVisible = String(entry.isIntersecting);
    });
    observer.observe(root);
    ScrollTrigger.refresh();

    return () => {
      observer.disconnect();
      mm.revert();
    };
  }, []);

  const go = (index: number) => {
    const current = triggerRef.current;
    const lenis = getLenisInstance();

    if (current) {
      const top = current.start + (current.end - current.start) * (index / LAST_INDEX);
      if (lenis) lenis.scrollTo(top, { duration: 0.9 });
      else window.scrollTo({ top, behavior: "smooth" });
      setActive(index);
      return;
    }

    const target = document.getElementById(`method-step-${index}`);
    if (!target) return;
    if (lenis) lenis.scrollTo(target, { offset: -85, duration: 0.9 });
    else target.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(index);
  };

  return (
    <section
      id="method"
      ref={rootRef}
      className={styles.root}
      aria-labelledby="method-title"
    >
      <div ref={stageRef} className={styles.stage}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>{method.sectionLabel}</p>
            <h2 id="method-title" className={styles.title}>
              {method.title}
            </h2>
          </div>
          <div>
            <p className={styles.description}>{method.description}</p>
            <a href="#works" className={styles.skip}>
              {method.skip} ↗
            </a>
          </div>
        </header>

        <div className={styles.window}>
          <div ref={trackRef} className={styles.track}>
            {method.steps.map((step, i) => (
              <article
                key={step.english}
                id={`method-step-${i}`}
                className={styles.slide}
              >
                <span className={styles.giant} aria-hidden="true">
                  0{i + 1}
                </span>
                <div className={styles.copy}>
                  <p className={styles.slideEyebrow}>
                    0{i + 1} / {step.english}
                  </p>
                  <h3>{step.title}</h3>
                  <h4>{step.detail}</h4>
                  <p className={styles.body}>{step.body}</p>
                  <p className={styles.evidence}>{step.evidence}</p>
                </div>
                <div className={styles.glyph}>
                  <KineticGlyph kind={step.glyph as GlyphKind} />
                </div>
              </article>
            ))}
          </div>
        </div>

        <nav
          className={styles.steps}
          aria-label={locale === "en" ? "Research stages" : "연구 과정 단계"}
        >
          {method.steps.map((step, i) => (
            <button
              key={step.english}
              type="button"
              onClick={() => go(i)}
              aria-current={i === active ? "step" : undefined}
            >
              <span>0{i + 1}</span>
              {step.title}
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}
