"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/animations";
import { fadeRevealOnScroll, parallaxFadeOnScroll } from "@/lib/scrollInteractions";
import { storyContent } from "@/data/story";

const depthFactors = [0.3, 0.6, 0.9];

const positions = [
  "left-0 top-8 z-10 w-[55%]",
  "right-0 top-0 z-20 w-[50%]",
  "bottom-0 left-1/4 z-30 w-[60%]",
];

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const ctx = gsap.context(() => {
      fadeRevealOnScroll(".story-text", section, { stagger: 0.12 });

      if (!isMobile) {
        storyContent.photos.forEach((_, i) => {
          const el = section.querySelector(`[data-photo="${i}"]`);
          if (!el) return;

          gsap.to(el, {
            y: () => -100 * depthFactors[i],
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });

        const photoStack = section.querySelector(".story-photo-stack");
        if (photoStack) {
          parallaxFadeOnScroll(photoStack as Element, section, { y: 24 });
        }
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="story" ref={sectionRef} aria-labelledby="story-heading" className="relative z-[1] bg-dark py-24 text-white sm:py-32">
      <div className="section-container grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="story-text text-xs font-semibold uppercase tracking-[0.35em] text-primary-light">
            {storyContent.sectionLabel}
          </p>
          <h2 id="story-heading" className="story-text section-title mt-3 tracking-tight">{storyContent.title}</h2>
          {storyContent.paragraphs.map((p) => (
            <p key={p} className="story-text mt-6 break-keep text-base text-white/75 sm:text-lg">
              {p}
            </p>
          ))}
        </div>

        <div className="flex flex-col gap-4 md:hidden">
          {storyContent.photos.map((photo) => (
            <PhotoCard key={photo.id} photo={photo} />
          ))}
        </div>

        <div className="story-photo-stack relative mx-auto hidden h-[480px] w-full max-w-md md:block">
          {storyContent.photos.map((photo, i) => (
            <div key={photo.id} data-photo={i} className={`absolute shadow-2xl ${positions[i]}`}>
              <PhotoCard photo={photo} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PhotoCard({ photo }: { photo: (typeof storyContent.photos)[number] }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10">
      <div className="relative aspect-[4/5] w-full">
        <Image
          src={photo.image}
          alt={photo.label}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 300px"
          loading="lazy"
        />
      </div>
      <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
        {photo.label}
      </span>
    </div>
  );
}
