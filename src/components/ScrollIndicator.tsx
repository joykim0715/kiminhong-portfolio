"use client";

import { motion } from "framer-motion";

export default function ScrollIndicator() {
  return (
    <motion.a
      href="#works"
      aria-label="Scroll to selected works"
      className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-muted"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8 }}
    >
      <span className="text-[10px] font-medium uppercase tracking-[0.35em] sm:text-xs">
        Scroll
      </span>
      <motion.span
        className="flex h-10 w-6 items-start justify-center rounded-full border border-border p-1.5"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="h-2 w-1 rounded-full bg-body" />
      </motion.span>
    </motion.a>
  );
}
