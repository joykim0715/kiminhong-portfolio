"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "@/lib/gsap";
import { fadeRevealOnScroll, refreshScrollTriggers, scrollPinStack } from "@/lib/scrollInteractions";
import { siteContent } from "@/data/content";
import type { Work } from "@/data/content";
import CertificationBadge from "./CertificationBadge";
import ProjectCard from "./ProjectCard";

const WorkModal = dynamic(() => import("./WorkModal"), { ssr: false });

const { works, certifications } = siteContent;
const projects = works.projects;

const STACK_STEP_VH = 0.9;

type TabId = "projects" | "certifications";

const TAB_CLASS_ACTIVE =
  "rounded-full bg-accent px-4 py-1.5 text-[13px] font-medium text-white transition-all duration-200";
const TAB_CLASS_IDLE =
  "rounded-full bg-surface px-4 py-1.5 text-[13px] font-medium text-muted transition-all duration-200 hover:bg-primary/10";

function WorksTabs({
  activeTab,
  onTabChange,
}: {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {(["projects", "certifications"] as const).map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onTabChange(tab)}
          className={activeTab === tab ? TAB_CLASS_ACTIVE : TAB_CLASS_IDLE}
        >
          {works.tabs[tab]}
        </button>
      ))}
    </div>
  );
}

export default function WorkGallery() {
  const [activeTab, setActiveTab] = useState<TabId>("projects");
  const [selected, setSelected] = useState<Work | null>(null);
  const [activeStackIndex, setActiveStackIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const pinZoneRef = useRef<HTMLDivElement>(null);

  const stackLabel = works.stackLabels[activeTab];

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
          pinSelector: ".works-pin-panel",
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
    setActiveStackIndex(0);
    refreshScrollTriggers();
  }, [activeTab]);

  return (
    <section id="works" ref={sectionRef} className="relative z-[1] bg-bg py-24 text-text sm:py-32">
      <div className="section-container relative z-[1]">
        <div className="works-heading">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-secondary">
            {works.sectionLabel}
          </p>
          <h2 className="section-title mt-3 tracking-tight text-text">{works.title}</h2>
        </div>

        <div className="mt-10 lg:hidden">
          <WorksTabs activeTab={activeTab} onTabChange={setActiveTab} />
          {activeTab === "projects" ? (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {projects.map((work) => (
                <ProjectCard
                  key={work.id}
                  work={work}
                  onClick={() => setSelected(work)}
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
          {activeTab === "projects" ? (
            <div className="works-pin-panel flex min-h-[calc(100dvh-4rem)] flex-col justify-center bg-bg py-3">
              <WorksTabs activeTab={activeTab} onTabChange={setActiveTab} />

              <div className="relative mx-auto mt-5 h-[min(42vh,320px)] w-full max-w-xl">
                {projects.map((work) => (
                  <div key={`${activeTab}-${work.id}`} className="stack-card absolute inset-x-0 top-0">
                    <ProjectCard compact work={work} onClick={() => setSelected(work)} />
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
          ) : (
            <div className="works-pin-panel bg-bg py-3">
              <WorksTabs activeTab={activeTab} onTabChange={setActiveTab} />
              <div className="cert-grid mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
                {certifications.map((cert) => (
                  <CertificationBadge key={cert.name} cert={cert} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {selected && <WorkModal work={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
