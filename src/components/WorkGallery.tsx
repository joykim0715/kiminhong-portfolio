"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "@/lib/gsap";
import { fadeRevealOnScroll, refreshScrollTriggers, scrollPinViewCycle } from "@/lib/scrollInteractions";
import type { Work } from "@/data/content";
import { useSiteContent } from "./ContentProvider";
import CertificationBadge from "./CertificationBadge";
import FeaturedWork from "./FeaturedWork";
import ProjectCard from "./ProjectCard";

const ProjectPanel = dynamic(() => import("./ProjectPanel"), { ssr: false });

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

export default function WorkGallery() {
  const { works, certifications } = useSiteContent();
  const projects = works.projects;
  const featuredIdSet = useMemo(() => new Set(works.featuredIds), [works.featuredIds]);
  const featuredProjects = useMemo(
    () => works.featuredIds.map((id) => projects.find((p) => p.id === id)).filter(Boolean) as Work[],
    [works.featuredIds, projects],
  );
  const galleryProjects = useMemo(
    () => projects.filter((p) => !featuredIdSet.has(p.id)),
    [projects, featuredIdSet],
  );

  const [activeTab, setActiveTab] = useState<TabId>("projects");
  const [panelWork, setPanelWork] = useState<Work | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const pinZoneRef = useRef<HTMLDivElement>(null);
  const cycleApiRef = useRef<{ scrollToView: (view: TabId) => void } | null>(null);

  const handleProjectClick = useCallback((work: Work) => {
    setPanelWork(work);
  }, []);

  const handleTabChange = useCallback((tab: TabId) => {
    if (cycleApiRef.current) {
      cycleApiRef.current.scrollToView(tab);
      return;
    }
    setActiveTab(tab);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const pinZone = pinZoneRef.current;
    if (!section) return;

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

    const ctx = gsap.context(() => {
      fadeRevealOnScroll(".works-heading", section);
      fadeRevealOnScroll(".featured-work", section, { start: "top 82%" });

      if (isDesktop && pinZone) {
        cycleApiRef.current = scrollPinViewCycle({
          zone: pinZone,
          pinSelector: ".works-pin-panel",
          projectsSelector: ".works-cycle-projects",
          certsSelector: ".works-cycle-certs",
          durationVh: 2.2,
          onView: setActiveTab,
        });
      } else {
        fadeRevealOnScroll(".gallery-card", section, { stagger: 0.1 });
        fadeRevealOnScroll(".cert-badge", section, { stagger: 0.08 });
      }
    }, section);

    refreshScrollTriggers();
    return () => {
      cycleApiRef.current = null;
      ctx.revert();
    };
  }, [galleryProjects.length]);

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

        {featuredProjects.length > 0 ? (
          <div className="mt-12 space-y-16 sm:mt-14">
            {featuredProjects.map((work) => (
              <FeaturedWork
                key={work.id}
                work={work}
                label={works.featuredLabel}
                ctaLabel={works.featuredCta}
                onOpen={() => handleProjectClick(work)}
              />
            ))}
          </div>
        ) : null}

        <div className="mt-14 border-t border-border/70 pt-10 lg:hidden">
          {galleryProjects.length > 0 ? (
            <p className="section-meta text-muted">{works.moreLabel}</p>
          ) : null}
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {galleryProjects.map((work) => (
              <ProjectCard
                key={work.id}
                work={work}
                onClick={() => handleProjectClick(work)}
                className="gallery-card"
              />
            ))}
          </div>
          <p className="section-meta mt-10 text-muted">{works.tabs.certifications}</p>
          <div className="mt-4 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2">
            {certifications.map((cert) => (
              <CertificationBadge key={`${cert.name}-${cert.date}`} cert={cert} />
            ))}
          </div>
        </div>

        <div ref={pinZoneRef} className="mt-14 hidden border-t border-border/70 pt-10 lg:block">
          <div className="works-pin-panel flex min-h-[calc(100dvh-4rem)] flex-col bg-bg pb-5 pt-2">
            <WorksTabs activeTab={activeTab} onTabChange={handleTabChange} />

            <div className="relative mt-5 min-h-0 flex-1 motion-reduce:flex motion-reduce:flex-col">
              <div className="works-cycle-projects absolute inset-0 overflow-auto motion-reduce:relative motion-reduce:inset-auto">
                {galleryProjects.length > 0 ? (
                  <p className="section-meta mb-3 text-center text-muted">{works.moreLabel}</p>
                ) : null}
                <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4">
                  {galleryProjects.map((work) => (
                    <ProjectCard
                      key={work.id}
                      dense
                      work={work}
                      onClick={() => handleProjectClick(work)}
                    />
                  ))}
                </div>
              </div>

              <div className="works-cycle-certs pointer-events-none absolute inset-0 overflow-auto motion-reduce:relative motion-reduce:inset-auto motion-reduce:pointer-events-auto">
                <p className="section-meta mb-3 text-center text-muted">{works.tabs.certifications}</p>
                <div className="cert-grid grid grid-cols-4 items-stretch gap-3">
                  {certifications.map((cert) => (
                    <CertificationBadge compact key={cert.name} cert={cert} />
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-3 text-center text-xs text-muted">{works.scrollHint}</p>
          </div>
        </div>
      </div>

      {panelWork ? (
        <ProjectPanel key={panelWork.id} work={panelWork} onClose={() => setPanelWork(null)} />
      ) : null}
    </section>
  );
}
