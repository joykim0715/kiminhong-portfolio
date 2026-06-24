"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { siteContent } from "@/data/content";

const { story: storyContent } = siteContent;

const images = [
  "/images/rs_p4_0.png",
  "/images/rs_p2_1.png",
  "/images/rs_p4_2.png",
];

export default function StorySection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="story" aria-labelledby="story-heading" className="relative z-[1] bg-dark py-24 text-white sm:py-32">
      <div className="section-container">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="space-y-6">
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

            <div className="mt-4 flex justify-center gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrent(i)}
                  aria-label={`이미지 ${i + 1}로 이동`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? "w-6 bg-accent" : "w-2 bg-neutral-300 dark:bg-neutral-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
