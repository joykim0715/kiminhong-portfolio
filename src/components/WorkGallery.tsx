"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "@/lib/gsap";
import { fadeRevealOnScroll, refreshScrollTriggers, scrollPinStack } from "@/lib/scrollInteractions";
import { siteContent } from "@/data/content";
import { certifications } from "@/data/certifications";
import { helixItems } from "@/data/helixItems";
import type { HelixItem } from "@/data/helixItems";
import type { Work } from "@/data/works";
import CertificationBadge from "./CertificationBadge";
import ProjectCard from "./ProjectCard";

const WorkModal = dynamic(() => import("./WorkModal"), { ssr: false });

const projects = helixItems.filter((item) => item.type === "Project");

const STACK_STEP_VH = 0.9;

type TabId = "projects" | "certifications";

const TAB_CLASS_ACTIVE =
  "rounded-full bg-accent px-4 py-1.5 text-[13px] font-medium text-white transition-all duration-200";
const TAB_CLASS_IDLE =
  "rounded-full bg-surface px-4 py-1.5 text-[13px] font-medium text-muted transition-all duration-200 hover:bg-primary/10";

function helixToWork(item: HelixItem): Work {
  return {
    id: item.id,
    title: item.title,
    category: item.org ?? item.type,
    description: item.description,
    details: item.date ? [`기간: ${item.date}`, ...(item.tags ?? [])] : item.tags,
  };
}

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
          {tab === "projects" ? "Projects" : "Certifications"}
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

  const activeProjects = projects;
  const stackLabel = activeTab === "projects" ? "프로젝트" : "자격증";

  useEffect(() => {
    const section = sectionRef.current;
    const pinZone = pinZoneRef.current;
    if (!section) return;

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

    const ctx = gsap.context(() => {
      fadeRevealOnScroll(".works-heading", section);

      if (isDesktop && pinZone && activeTab === "projects" && activeProjects.length > 1) {
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
      }
    }, section);

    refreshScrollTriggers();
    return () => ctx.revert();
  }, [activeTab, activeProjects.length]);

  useEffect(() => {
    setActiveStackIndex(0);
    refreshScrollTriggers();
  }, [activeTab]);

  const openModal = (item: HelixItem) => setSelected(helixToWork(item));

  return (
    <section id="works" ref={sectionRef} className="relative z-[1] bg-bg py-24 text-text sm:py-32">
      <div className="section-container relative z-[1]">
        <div className="works-heading">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-secondary">
            {siteContent.works.sectionLabel}
          </p>
          <h2 className="section-title mt-3 tracking-tight text-text">{siteContent.works.title}</h2>
        </div>

        <div className="mt-10 lg:hidden">
          <WorksTabs activeTab={activeTab} onTabChange={setActiveTab} />
          {activeTab === "projects" ? (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {activeProjects.map((item) => (
                <ProjectCard
                  key={item.id}
                  work={helixToWork(item)}
                  onClick={() => openModal(item)}
                  className="gallery-card"
                />
              ))}
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {certifications.map((cert) => (
                <CertificationBadge key={cert.name} cert={cert} />
              ))}
            </div>
          )}
        </div>

        <div ref={pinZoneRef} className="mt-10 hidden lg:block">
          {activeTab === "projects" ? (
            <div className="works-pin-panel flex min-h-[calc(100dvh-4rem)] flex-col justify-center bg-bg py-3">
              <WorksTabs activeTab={activeTab} onTabChange={setActiveTab} />

              <div className="relative mx-auto mt-5 h-[min(42vh,320px)] w-full max-w-xl">
                {activeProjects.map((item) => (
                  <div key={`${activeTab}-${item.id}`} className="stack-card absolute inset-x-0 top-0">
                    <ProjectCard compact work={helixToWork(item)} onClick={() => openModal(item)} />
                  </div>
                ))}
              </div>

              <p className="mx-auto mt-4 max-w-xl text-center text-xs text-muted">
                스크롤하여 {stackLabel} 탐색 ·{" "}
                <span className="font-medium text-primary">
                  {activeStackIndex + 1} / {activeProjects.length}
                </span>
              </p>
            </div>
          ) : (
            <div className="works-pin-panel bg-bg py-3">
              <WorksTabs activeTab={activeTab} onTabChange={setActiveTab} />
              <div className="mt-8 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
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
