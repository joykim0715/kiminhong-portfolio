"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "@/lib/gsap";
import { fadeRevealOnScroll, refreshScrollTriggers, scrollPinStack } from "@/lib/scrollInteractions";
import { siteContent } from "@/data/content";
import { helixItems } from "@/data/helixItems";
import type { HelixItem } from "@/data/helixItems";
import type { Work } from "@/data/works";
import ProjectCard from "./ProjectCard";

const WorkModal = dynamic(() => import("./WorkModal"), { ssr: false });

const projects = helixItems.filter((item) => item.type === "Project");
const certifications = helixItems.filter((item) => item.type === "Certification");

const STACK_STEP_VH = 0.9;

type TabId = "projects" | "certifications";

const TAB_CLASS_ACTIVE =
  "rounded-full bg-[#5FA8A3] px-4 py-1.5 text-[13px] font-medium text-white transition-all duration-200";
const TAB_CLASS_IDLE =
  "rounded-full bg-[#E7ECEF] px-4 py-1.5 text-[13px] font-medium text-[#6B8390] transition-all duration-200 hover:bg-[#5FA8A3]/10";

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

  const activeItems = activeTab === "projects" ? projects : certifications;
  const stackLabel = activeTab === "projects" ? "프로젝트" : "자격증";

  useEffect(() => {
    const section = sectionRef.current;
    const pinZone = pinZoneRef.current;
    if (!section) return;

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

    const ctx = gsap.context(() => {
      fadeRevealOnScroll(".works-heading", section);

      if (isDesktop && pinZone && activeItems.length > 1) {
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
        fadeRevealOnScroll(".gallery-card", section, { stagger: 0.1 });
      }
    }, section);

    refreshScrollTriggers();
    return () => ctx.revert();
  }, [activeTab, activeItems.length]);

  useEffect(() => {
    setActiveStackIndex(0);
    refreshScrollTriggers();
  }, [activeTab]);

  const openModal = (item: HelixItem) => setSelected(helixToWork(item));

  return (
    <section id="works" ref={sectionRef} className="relative z-[1] bg-bg py-24 text-text sm:py-32">
      <div className="section-container relative z-[1]">
        {/* Section title scrolls away before pin zone */}
        <div className="works-heading">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-secondary">
            {siteContent.works.sectionLabel}
          </p>
          <h2 className="section-title mt-3 tracking-tight text-[#24323A]">{siteContent.works.title}</h2>
        </div>

        {/* Mobile */}
        <div className="mt-10 lg:hidden">
          <WorksTabs activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {activeItems.map((item) => (
              <ProjectCard
                key={item.id}
                work={helixToWork(item)}
                onClick={() => openModal(item)}
                className="gallery-card"
              />
            ))}
          </div>
        </div>

        {/* Desktop: GSAP pin — tabs + cards fixed until stack completes */}
        <div ref={pinZoneRef} className="mt-10 hidden lg:block">
          <div className="works-pin-panel flex min-h-[calc(100dvh-4rem)] flex-col justify-center bg-bg py-3">
            <WorksTabs activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="relative mx-auto mt-5 h-[min(42vh,320px)] w-full max-w-xl">
              {activeItems.map((item) => (
                <div key={`${activeTab}-${item.id}`} className="stack-card absolute inset-x-0 top-0">
                  <ProjectCard compact work={helixToWork(item)} onClick={() => openModal(item)} />
                </div>
              ))}
            </div>

            <p className="mx-auto mt-4 max-w-xl text-center text-xs text-muted">
              스크롤하여 {stackLabel} 탐색 ·{" "}
              <span className="font-medium text-primary">
                {activeStackIndex + 1} / {activeItems.length}
              </span>
            </p>
          </div>
        </div>
      </div>

      {selected && <WorkModal work={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
