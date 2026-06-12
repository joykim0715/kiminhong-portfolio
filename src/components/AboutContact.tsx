"use client";

import { motion } from "framer-motion";
import FadeIn from "./FadeIn";
import { siteContent } from "@/data/content";

export default function AboutContact() {
  const { about, socialLinks } = siteContent;

  return (
    <section
      id="contact"
      className="border-t border-border/80 px-5 py-20 sm:px-8 sm:py-28 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-3xl text-center">
        <FadeIn>
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-primary sm:text-sm">
            {about.sectionLabel}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-heading sm:text-4xl lg:text-5xl">
            {about.headline}
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-body sm:text-base lg:text-lg">
            {about.bio}
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <nav
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
            aria-label="Social links"
          >
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted transition-colors hover:text-heading sm:text-base"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </FadeIn>

        <FadeIn delay={0.3}>
          <motion.a
            href={`mailto:${about.email}`}
            className="mt-10 inline-flex items-center justify-center rounded-full border border-border bg-surface px-8 py-3.5 text-sm font-medium text-heading transition-colors hover:border-primary/50 hover:bg-surface-muted sm:px-10 sm:py-4 sm:text-base"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {about.email}
          </motion.a>
        </FadeIn>

        <FadeIn delay={0.4}>
          <p className="mt-16 text-xs text-muted sm:text-sm">
            &copy; {new Date().getFullYear()} {about.copyright}. All rights reserved.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
