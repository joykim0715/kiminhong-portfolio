"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { getLenisInstance } from "@/lib/lenisInstance";
import type { Work } from "@/data/content";
import { useLocale, useSiteContent } from "./ContentProvider";
import WorkVisual from "./WorkVisual";
import DeviceMockup from "./ui/DeviceMockup";
import {
  applyReelHandoff,
  bindReelSlide,
  clearReelHandoff,
  type ReelSlideMotion,
} from "./workReelHandoff";
import styles from "./WorkReel.module.css";

const NAV_OFFSET = 64;
/** Fraction of each slide's scroll spent parked before the next move. */
const HOLD = 0.4;
/** Extra viewport height per slide so the pause is felt, not just a curve. */
const PAUSE_VH = 0.18;

const MOVE_EASE = gsap.parseEase("power2.inOut");

function holdThenGo(progress: number, lastIndex: number) {
  if (lastIndex <= 0) return progress;
  const t = progress * lastIndex;
  const i = Math.min(lastIndex - 1, Math.floor(t));
  const local = t - i;
  if (local <= HOLD) return i / lastIndex;
  return (i + MOVE_EASE((local - HOLD) / (1 - HOLD))) / lastIndex;
}

type WorkReelProps = {
  projects: Work[];
  onOpen: (work: Work) => void;
};

export default function WorkReel({ projects, onOpen }: WorkReelProps) {
  const { works } = useSiteContent();
  const { locale } = useLocale();
  const lastIndex = Math.max(0, projects.length - 1);
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!root || !stage || !track || projects.length < 2) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      root.dataset.pinned = "true";
      const distance = () => Math.max(0, track.scrollWidth - stage.clientWidth);
      const pausePx = () => Math.round(window.innerHeight * PAUSE_VH);
      const slides: ReelSlideMotion[] = [];
      const slideEls = track.querySelectorAll<HTMLElement>("[data-reel-slide]");
      for (let i = 0; i < slideEls.length; i += 1) {
        slides.push(bindReelSlide(slideEls[i]));
      }
      applyReelHandoff(slides, 0);

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: (p) => holdThenGo(p, lastIndex),
        scrollTrigger: {
          trigger: root,
          start: `top ${NAV_OFFSET}px`,
          end: () => `+=${distance() + pausePx() * lastIndex}`,
          pin: stage,
          scrub: 0.45,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: 1 / lastIndex,
            duration: 0.18,
            delay: 0.04,
            ease: "power1.out",
            inertia: false,
          },
          onUpdate(self) {
            const visual = holdThenGo(self.progress, lastIndex);
            applyReelHandoff(slides, visual * lastIndex);
            const next = Math.min(lastIndex, Math.round(visual * lastIndex));
            if (next !== activeRef.current) {
              activeRef.current = next;
              setActive(next);
            }
          },
        },
      });
      triggerRef.current = tween.scrollTrigger ?? null;
      return () => {
        triggerRef.current = null;
        delete root.dataset.pinned;
        clearReelHandoff(root);
      };
    });

    ScrollTrigger.refresh();
    return () => mm.revert();
  }, [lastIndex, projects.length]);

  const go = (index: number) => {
    const current = triggerRef.current;
    const lenis = getLenisInstance();

    if (current) {
      const parked = (index + HOLD * 0.45) / lastIndex;
      const top = current.start + (current.end - current.start) * parked;
      if (lenis) lenis.scrollTo(top, { duration: 0.9 });
      else window.scrollTo({ top, behavior: "smooth" });
      activeRef.current = index;
      setActive(index);
      return;
    }

    const target = document.getElementById(`work-slide-${index}`);
    if (!target) return;
    if (lenis) lenis.scrollTo(target, { offset: -85, duration: 0.9 });
    else target.scrollIntoView({ behavior: "smooth", block: "start" });
    activeRef.current = index;
    setActive(index);
  };

  return (
    <div
      ref={rootRef}
      className={styles.root}
      aria-labelledby="works-reel-title"
    >
      <div ref={stageRef} className={styles.stage}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>{works.sectionLabel}</p>
            <h2 id="works-reel-title" className={styles.title}>
              {works.title}
            </h2>
          </div>
          <div>
            <p className={styles.description}>
              {locale === "en"
                ? "Scroll sideways through the case work, then continue to certifications."
                : "스크롤하면 프로젝트가 가로로 넘어갑니다. 이어서 자격증을 확인할 수 있습니다."}
            </p>
            <a href="#certificates" className={styles.skip}>
              {works.tabs.certifications} ↗
            </a>
          </div>
        </header>

        <div className={styles.window}>
          <div ref={trackRef} className={styles.track}>
            {projects.map((work, i) => {
              const summary = work.panel.subtitle || work.description;
              const metrics = work.panel.metrics?.slice(0, 4) ?? [];
              const indexLabel = String(i + 1).padStart(2, "0");

              return (
                <article
                  key={work.id}
                  id={`work-slide-${i}`}
                  className={styles.slide}
                  data-reel-slide
                >
                  <span className={styles.giant} aria-hidden="true">
                    <span
                      className={styles.giantInner}
                      data-reel-anim
                      data-reel-giant
                    >
                      {indexLabel}
                    </span>
                  </span>
                  <div className={styles.copy}>
                    <p className={styles.slideEyebrow}>
                      <span className={styles.indexMask}>
                        <span data-reel-anim data-reel-index>
                          {indexLabel}
                        </span>
                      </span>
                      <span> / {work.category}</span>
                    </p>
                    <div className={styles.titleMask}>
                      <h3 data-reel-anim data-reel-title>
                        {work.title}
                      </h3>
                    </div>
                    <p className={styles.body} data-reel-anim data-reel-body>
                      {summary}
                    </p>
                    {metrics.length > 0 ? (
                      <ul className={styles.metrics}>
                        {metrics.map((metric) => (
                          <li key={metric.label} data-reel-anim data-reel-metric>
                            <span>{metric.label}</span>
                            <strong>{metric.value}</strong>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <button
                      type="button"
                      className={styles.cta}
                      data-reel-anim
                      data-reel-cta
                      onClick={() => onOpen(work)}
                    >
                      {works.featuredCta} ↗
                    </button>
                  </div>
                  <button
                    type="button"
                    className={styles.visual}
                    onClick={() => onOpen(work)}
                    aria-label={work.title}
                  >
                    <span className={styles.visualStage} data-reel-anim data-reel-visual>
                      <DeviceMockup variant="monitor">
                        <div className="relative h-full w-full overflow-hidden">
                          <WorkVisual
                            work={work}
                            alt={work.title}
                            sizes="(max-width: 1024px) 90vw, 42vw"
                            imageClassName="object-cover sharp-image"
                            quality={90}
                          />
                        </div>
                      </DeviceMockup>
                    </span>
                  </button>
                </article>
              );
            })}
          </div>
        </div>

        <nav
          className={styles.steps}
          aria-label={locale === "en" ? "Projects" : "프로젝트 단계"}
        >
          {projects.map((work, i) => (
            <button
              key={work.id}
              type="button"
              onClick={() => go(i)}
              aria-current={i === active ? "step" : undefined}
              title={work.title}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
              {work.category}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
