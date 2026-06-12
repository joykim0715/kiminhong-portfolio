"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { lockPageScroll, unlockPageScroll } from "@/lib/lenisInstance";
import type { Work } from "@/data/works";

type WorkModalProps = {
  work: Work | null;
  onClose: () => void;
};

export default function WorkModal({ work, onClose }: WorkModalProps) {
  useEffect(() => {
    if (!work) return;

    lockPageScroll();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      unlockPageScroll();
    };
  }, [work, onClose]);

  return (
    <AnimatePresence>
      {work && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="work-modal-title"
            data-work-modal
            className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-surface shadow-2xl"
            initial={{ opacity: 0, y: 48, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-bg text-muted transition hover:text-text"
              aria-label="닫기"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl">
              {work.image ? (
                <Image src={work.image} alt={work.title} fill className="object-cover" sizes="672px" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-dark via-dark-surf to-secondary/40">
                  <span className="text-xs uppercase tracking-[0.3em] text-muted">이미지 준비 중</span>
                </div>
              )}
            </div>

            <div className="p-6 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary">{work.category}</p>
              <h2 id="work-modal-title" className="mt-2 text-2xl font-bold tracking-tight text-text sm:text-3xl">
                {work.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{work.description}</p>

              {work.details && work.details.length > 0 && (
                <ul className="mt-6 space-y-2 border-t border-border pt-6">
                  {work.details.map((item) => (
                    <li key={item} className="text-sm text-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
