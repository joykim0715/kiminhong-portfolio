"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "@/lib/gsap";
import { fadeRevealOnScroll, refreshScrollTriggers } from "@/lib/scrollInteractions";
import type { Work } from "@/data/content";
import { useSiteContent } from "./ContentProvider";
import Credentials from "./Credentials";
import FeaturedWork from "./FeaturedWork";
import ProjectCard from "./ProjectCard";
import SectionBlend from "./SectionBlend";
import WorkReel from "./WorkReel";

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
  const { works } = useSiteContent();
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

  const handleProjectClick = useCallback((work: Work) => {
    setPanelWork(work);
  }, []);

  const handleTabChange = useCallback(
    (tab: TabId) => {
      if (tab === activeTab) return;
      setActiveTab(tab);
    },
    [activeTab],
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      fadeRevealOnScroll(".works-heading", section);
      fadeRevealOnScroll(".featured-work", section, { start: "top 82%" });
      fadeRevealOnScroll(activeTab === "projects" ? ".gallery-card" : ".credentials", section, {
        stagger: 0.08,
        start: "top 88%",
      });
    }, section);

    refreshScrollTriggers();
    return () => ctx.revert();
  }, [activeTab]);

  return (
    <section id="works" ref={sectionRef} className="relative z-[1] bg-bg text-text lg:bg-[#0a1918]">
      <div className="px-0 py-24 sm:py-32 lg:hidden">
        <svg
          className="pointer-events-none absolute inset-0 z-0 h-full w-full text-text opacity-[0.035]"
          aria-hidden="true"
        >
          <defs>
            <pattern id="dot-grid-mobile" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-grid-mobile)" />
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

          <div className="mt-14 border-t border-border/70 pt-10">
            <WorksTabs activeTab={activeTab} onTabChange={handleTabChange} />
            {activeTab === "projects" ? (
              <>
                {galleryProjects.length > 0 ? (
                  <p className="section-meta mt-8 text-muted">{works.moreLabel}</p>
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
              </>
            ) : (
              <div id="certificates-mobile" className="mt-8">
                <Credentials id="credentials-mobile" showHeading={false} />
              </div>
            )}
          </div>
        </div>
      </div>

      <WorkReel projects={projects} onOpen={handleProjectClick} />
      <SectionBlend variant="work-certs" />

      <div
        id="certificates"
        className="relative z-10 hidden bg-bg py-16 lg:block lg:py-20"
      >
        <div className="section-container">
          <Credentials id="credentials-desktop" />
        </div>
      </div>

      <ProjectPanel work={panelWork} onClose={() => setPanelWork(null)} />
    </section>
  );
}
