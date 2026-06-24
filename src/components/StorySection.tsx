"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/animations";
import { fadeRevealOnScroll, scrollPinCarousel } from "@/lib/scrollInteractions";
import { siteContent } from "@/data/content";

const { story: storyContent } = siteContent;

const images = [
  "/images/rs_p4_0.png",
  "/images/rs_p2_1.png",
  "/images/rs_p4_2.png",
];

export default function StorySection() {
  const [current, setCurrent] = useState(0);
  const [scrollDrive, setScrollDrive] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const pinZoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pinZone = pinZoneRef.current;
    if (!section || !pinZone) return;

    const ctx = gsap.context(() => {
      fadeRevealOnScroll(".story-text", section, { stagger: 0.12 });

      if (!prefersReducedMotion() && images.length >= 2) {
        setScrollDrive(true);
        scrollPinCarousel({
          zone: pinZone,
          pinSelector: ".story-pin-panel",
          count: images.length,
          stepVh: 0.85,
          onIndex: setCurrent,
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="story" ref={sectionRef} aria-labelledby="story-heading" className="relative z-[1] bg-dark text-white">
      <div className="section-container">
        <div ref={pinZoneRef}>
          <div className="story-pin-panel flex min-h-[calc(100dvh-4rem)] items-center py-16 sm:py-20">
            <div className="grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-2">
              <div className="story-text space-y-6">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary-light">
                  {storyContent.sectionLabel}
                </p>
                <h2 id="story-heading" className="section-title tracking-tight">
                  {storyContent.title}
                </h2>
                {storyContent.paragraphs.map((p) => (
                  <p key={p} className="break-keep text-base text-white/75 sm:text-lg">
                    {p}
                  </p>
                ))}
              </div>

              <div className="relative">
                <div className="relative aspect-[4/3] transform-gpu overflow-hidden rounded-2xl shadow-2xl will-change-transform">
                  {images.map((src, i) => (
                    <div
                      key={src}
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        i === current ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <Image
                        src={src}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover sharp-image"
                        quality={90}
                        alt={`Story image ${i + 1}`}
                      />
                    </div>
                  ))}
                  <div
                    className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-black/10 to-transparent"
                    aria-hidden="true"
                  />
                </div>

                <div className="mt-4 flex justify-center gap-2" aria-hidden="true">
                  {images.map((_, i) => (
                    <span
                      key={i}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === current ? "w-6 bg-accent" : "w-2 bg-white/30"
                      }`}
                    />
                  ))}
                </div>

                {scrollDrive && (
                  <p className="story-text mt-3 text-center text-xs text-white/45">
                    스크롤하여 사진 탐색 ·{" "}
                    <span className="font-medium text-primary-light">
                      {current + 1} / {images.length}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
