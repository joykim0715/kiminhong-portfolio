"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { fadeRevealOnScroll, parallaxFadeOnScroll } from "@/lib/scrollInteractions";
import { prefersReducedMotion } from "@/lib/animations";
import { inspirationItems } from "@/data/inspiration";

const heightClass = {
  short: "h-48",
  medium: "h-64",
  tall: "h-80",
};

export default function InspirationGallery() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      fadeRevealOnScroll(".gallery-heading", section);
      fadeRevealOnScroll(".masonry-item", section, { stagger: 0.08 });

      if (!prefersReducedMotion()) {
        section.querySelectorAll(".masonry-item").forEach((item, i) => {
          parallaxFadeOnScroll(item, section, {
            y: 20 + (i % 3) * 8,
            start: "top bottom",
            end: "bottom top",
          });
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="gallery" ref={sectionRef} className="relative z-[1] bg-bg/82 py-24 text-text backdrop-blur-[2px] sm:py-32">
      <div className="section-container">
        <div className="gallery-heading">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-secondary">Inspiration</p>
          <h2 className="section-title mt-3 tracking-tight text-text">Beyond the screen</h2>
          <p className="mt-4 max-w-xl text-base text-muted">
            Travel, nature, lifestyle, and photography — moments that shape perspective.
          </p>
        </div>

        <div className="masonry-grid mt-12">
          {inspirationItems.map((item) => (
            <article
              key={item.id}
              className={`masonry-item group overflow-hidden rounded-2xl border border-border bg-surface shadow-sm ${heightClass[item.height]}`}
            >
              <div className="relative h-full w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/70">{item.category}</p>
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
