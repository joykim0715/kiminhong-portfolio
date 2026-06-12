"use client";

import Image from "next/image";
import type { Work } from "@/data/works";

type ImageStackProps = {
  items: Work[];
  className?: string;
};

const offsets = [
  { rotate: -7, x: -16, y: 0, z: 1 },
  { rotate: 5, x: 20, y: -24, z: 2 },
  { rotate: -3, x: 0, y: -48, z: 3 },
];

export default function ImageStack({ items, className = "" }: ImageStackProps) {
  const cards = items.slice(0, 3);

  return (
    <>
      {/* Mobile: static vertical stack */}
      <div className={`flex flex-col gap-4 md:hidden ${className}`}>
        {cards.map((item) => (
          <Card key={item.id} item={item} className="hero-card" />
        ))}
      </div>

      {/* Desktop: overlapping rotated stack */}
      <div
        className={`hero-cards relative mx-auto hidden h-[360px] w-full max-w-[520px] md:block ${className}`}
      >
        {cards.map((item, i) => {
          const offset = offsets[i] ?? offsets[0];
          return (
            <div
              key={item.id}
              className="hero-card absolute inset-x-6 top-8"
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px) rotate(${offset.rotate}deg)`,
                zIndex: offset.z,
              }}
            >
              <Card item={item} />
            </div>
          );
        })}
      </div>
    </>
  );
}

function Card({ item, className = "" }: { item: Work; className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl ${className}`}
    >
      <div className="relative aspect-[16/10] w-full bg-dark-surf">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 480px"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-xs uppercase tracking-[0.3em] text-muted">Preview</span>
          </div>
        )}
      </div>
      <div className="p-4 sm:p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
          {item.category}
        </p>
        <p className="mt-2 text-base font-bold tracking-tight text-text sm:text-lg">{item.title}</p>
      </div>
    </div>
  );
}
