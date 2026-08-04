"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "@/lib/gsap";
import { fadeRevealOnScroll, refreshScrollTriggers, scrollPinStack } from "@/lib/scrollInteractions";
import { getLenisInstance } from "@/lib/lenisInstance";
import type { Work } from "@/data/content";
import { useSiteContent } from "./ContentProvider";
import CertificationBadge from "./CertificationBadge";
import ProjectCard from "./ProjectCard";

const ProjectPanel = dynamic(() => import("./ProjectPanel"), { ssr: false });

const STACK_STEP_VH = 0.9;
const NAV_OFFSET = 64;

type TabId = "projects" | "certifications";

const TAB_CLASS_ACTIVE =
  "rounded-md bg-accent px-5 py-2 text-sm font-semibold text-white transition-colors duration-200 sm:px-6 sm:py-2.5 sm:text-base";
const TAB_CLASS_IDLE =
  "rounded-md border border-border bg-transparent px-5 py-2 text-sm font-semibold text-muted transition-colors duration-200 hover:border-primary/35 hover:text-text sm:px-6 sm:py-2.5 sm:text-base";

function WorksTabs({
  activeTab,
  onTabChange,
}: {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}) {
  const { works } = useSiteContent();
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
      <div className="flex flex-wrap gap-3" role="tablist" aria-label={works.title}>
        {(["projects", "certifications"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={activeTab === tab}
            onClick={() => onTabChange(tab)}
            className={activeTab === tab ? TAB_CLASS_ACTIVE : TAB_CLASS_IDLE}
          >
            {works.tabs[tab]}
          </button>
        ))}
      </div>
      <p className="text-xs leading-snug text-muted sm:text-sm">{works.tabHint}</p>
    </div>
  );
}

function scrollToPinZone(pinZone: HTMLElement) {
  const lenis = getLenisInstance();
  if (lenis) {
    lenis.scrollTo(pinZone, { offset: -NAV_OFFSET, duration: 0.55 });
  } else {
    const top = pinZone.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export default function WorkGallery() {
  const { works, certifications } = useSiteContent();
  const projects = works.projects;
  const [activeTab, setActiveTab] = useState<TabId>("projects");
  const [panelWork, setPanelWork] = useState<Work | null>(null);
  const [activeStackIndex, setActiveStackIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const pinZoneRef = useRef<HTMLDivElement>(null);
  const prevTabRef = useRef<TabId>("projects");

  const stackLabel = works.stackLabels[activeTab];

  const handleProjectClick = useCallback((work: Work) => {
    setPanelWork(work);
  }, []);

  const handleTabChange = useCallback((tab: TabId) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
  }, [activeTab]);

  useEffect(() => {
    const section = sectionRef.current;
    const pinZone = pinZoneRef.current;
    if (!section) return;

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

    const ctx = gsap.context(() => {
      fadeRevealOnScroll(".works-heading", section);

      if (isDesktop && pinZone && activeTab === "projects" && projects.length > 1) {
        scrollPinStack({
          zone: pinZone,
          pinSelector: ".works-pin-panel--projects",
          cardSelector: ".stack-card",
          stepVh: STACK_STEP_VH,
          scrub: 1.2,
          holdDuration: 0.5,
          onIndex: setActiveStackIndex,
        });
      } else if (!isDesktop) {
        fadeRevealOnScroll(activeTab === "projects" ? ".gallery-card" : ".cert-badge", section, {
          stagger: 0.12,
        });
      } else if (activeTab === "certifications") {
        fadeRevealOnScroll(".cert-badge", section, { stagger: 0.08 });
      }
    }, section);

    refreshScrollTriggers();
    return () => ctx.revert();
  }, [activeTab]);

  useEffect(() => {
    const prevTab = prevTabRef.current;
    prevTabRef.current = activeTab;
    setActiveStackIndex(0);

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const pinZone = pinZoneRef.current;

    if (isDesktop && prevTab === "projects" && activeTab === "certifications" && pinZone) {
      requestAnimationFrame(() => {
        refreshScrollTriggers();
        requestAnimationFrame(() => {
          scrollToPinZone(pinZone);
          refreshScrollTriggers();
        });
      });
    } else {
      refreshScrollTriggers();
    }
  }, [activeTab]);

  return (
    <section id="works" ref={sectionRef} className="relative z-[1] overflow-hidden bg-bg py-24 text-text sm:py-32">
      <svg
        className="pointer-events-none absolute inset-0 z-0 h-full w-full text-text opacity-[0.035]"
        aria-hidden="true"
      >
        <defs>
          <pattern id="dot-grid" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid)" />
      </svg>

      <div className="section-container relative z-10">
        <div className="works-heading">
          <p className="section-eyebrow text-secondary">{works.sectionLabel}</p>
          <h2 className="section-title mt-3 tracking-tight text-text">{works.title}</h2>
        </div>

        <div className="mt-10 lg:hidden">
          <WorksTabs activeTab={activeTab} onTabChange={handleTabChange} />
          {activeTab === "projects" ? (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {projects.map((work) => (
                <ProjectCard
                  key={work.id}
                  work={work}
                  onClick={() => handleProjectClick(work)}
                  className="gallery-card"
                />
              ))}
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {certifications.map((cert) => (
                <CertificationBadge key={`${cert.name}-${cert.date}`} cert={cert} />
              ))}
            </div>
          )}
        </div>

        <div ref={pinZoneRef} className="mt-10 hidden lg:block">
          <WorksTabs activeTab={activeTab} onTabChange={handleTabChange} />

          <div className={activeTab === "projects" ? "" : "hidden"} aria-hidden={activeTab !== "projects"}>
            <div className="works-pin-panel works-pin-panel--projects flex min-h-[calc(100dvh-4rem)] flex-col justify-start bg-bg pb-6 pt-4 sm:pt-6">
              <div className="relative mx-auto mt-2 h-[min(42vh,320px)] w-full max-w-xl">
                {projects.map((work, i) => (
                  <div
                    key={work.id}
                    className="stack-card absolute inset-x-0 top-0"
                    style={{
                      // 활성(맨 앞) 카드만 클릭 가능 — 인덱스는 전환 중반부터 갱신됨
                      pointerEvents: i === activeStackIndex ? "auto" : "none",
                    }}
                  >
                    <ProjectCard compact work={work} onClick={() => handleProjectClick(work)} />
                  </div>
                ))}
              </div>

              <p className="mx-auto mt-4 max-w-xl text-center text-xs text-muted">
                {works.scrollHint.replace("{label}", stackLabel)}{" "}
                <span className="font-medium text-primary">
                  {activeStackIndex + 1} / {projects.length}
                </span>
              </p>
            </div>
          </div>

          <div
            className={activeTab === "certifications" ? "mt-5" : "hidden"}
            aria-hidden={activeTab !== "certifications"}
          >
            <div className="works-pin-panel works-pin-panel--certs bg-bg py-3">
              <div className="cert-grid grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
                {certifications.map((cert) => (
                  <CertificationBadge key={cert.name} cert={cert} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {panelWork ? (
        <ProjectPanel key={panelWork.id} work={panelWork} onClose={() => setPanelWork(null)} />
      ) : null}
    </section>
  );
}
