"use client";

import FadeIn from "./FadeIn";
import HelixScroll from "./HelixScroll/HelixScroll";
import { siteContent } from "@/data/content";
import { helixItems } from "@/data/helixItems";

export default function Gallery() {
  return (
    <section id="works" className="relative">
      <div className="flex min-h-screen flex-col overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(95,175,166,0.05),_transparent_60%)]" />

        <div className="relative z-10 px-5 pt-16 sm:px-8 sm:pt-20 lg:px-10">
          <FadeIn>
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-primary sm:text-sm">
              {siteContent.works.sectionLabel}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-heading sm:text-4xl lg:text-5xl">
              {siteContent.works.title}
            </h2>
          </FadeIn>
        </div>

        <div className="relative z-10 flex-1">
          <HelixScroll items={helixItems} />
        </div>

        <p className="relative z-10 pb-8 text-center text-[10px] uppercase tracking-[0.35em] text-muted sm:pb-10 sm:text-xs">
          Scroll over each column to explore · Front-facing cards are clickable
        </p>
      </div>
    </section>
  );
}
