"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { helixItems } from "@/data/helixItems";

const CERTS = helixItems
  .filter((item) => item.type === "Certification")
  .map((item, i) => ({
    id: item.id,
    name: item.title,
    issuer: item.org ?? "",
    year: item.date ?? "",
    accent: i % 2 === 0 ? "#5FA8A3" : "#6FAED9",
  }));

type CertificationCarouselProps = {
  /** Controlled index (e.g. scroll-driven on desktop) */
  activeIndex?: number;
  onIndexChange?: (index: number) => void;
  showNavButtons?: boolean;
};

export default function CertificationCarousel({
  activeIndex: controlledIndex,
  onIndexChange,
  showNavButtons = true,
}: CertificationCarouselProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const isControlled = controlledIndex !== undefined;
  const current = isControlled ? controlledIndex : internalIndex;

  const setIndex = (next: number, direction?: number) => {
    const clamped = (next + CERTS.length) % CERTS.length;
    if (direction !== undefined) setDir(direction);
    if (!isControlled) setInternalIndex(clamped);
    onIndexChange?.(clamped);
  };

  const go = (delta: number) => {
    setDir(delta);
    setIndex(current + delta, delta);
  };

  if (CERTS.length === 0) return null;

  const cert = CERTS[current];

  return (
    <div className="flex w-full max-w-[288px] flex-col gap-3.5">
      <div className="relative h-[184px]">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={current}
            custom={dir}
            initial={{ x: dir * 48, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -dir * 48, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0 flex flex-col justify-between rounded-2xl p-5"
            style={{
              background: `linear-gradient(135deg, ${cert.accent}18 0%, ${cert.accent}30 100%)`,
              border: `1px solid ${cert.accent}40`,
            }}
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#6B8390]">
              {cert.issuer}
            </span>
            <div>
              <h3 className="mb-0.5 break-keep text-lg font-bold leading-snug text-[#24323A]">
                {cert.name}
              </h3>
              <p className="text-xs text-[#6B8390]">{cert.year}</p>
            </div>
            <div className="flex items-center gap-1.5">
              {CERTS.map((_, i) => (
                <button
                  key={CERTS[i].id}
                  type="button"
                  onClick={() => setIndex(i, i > current ? 1 : -1)}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? "18px" : "6px",
                    background: i === current ? cert.accent : "#E7ECEF",
                  }}
                  aria-label={`자격증 ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {showNavButtons && (
        <div className="flex items-center justify-between px-0.5">
          <button
            type="button"
            onClick={() => go(-1)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E7ECEF] text-sm text-[#24323A] transition-colors hover:bg-[#5FA8A3] hover:text-white"
            aria-label="이전 자격증"
          >
            ←
          </button>
          <span className="text-xs text-[#6B8390]">
            {current + 1} / {CERTS.length}
          </span>
          <button
            type="button"
            onClick={() => go(1)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E7ECEF] text-sm text-[#24323A] transition-colors hover:bg-[#5FA8A3] hover:text-white"
            aria-label="다음 자격증"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
