"use client";

import { useEffect, useState } from "react";
import { siteContent } from "@/data/content";
import VisitorCounter from "./VisitorCounter";

const { nav } = siteContent;

export default function Navbar() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observers = nav.sections.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
      );

      observer.observe(el);
      return observer;
    });

    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <header className="nav-bar glass-nav-dark fixed inset-x-0 top-0 z-50 text-white">
      <nav className="section-container flex h-16 items-center justify-between gap-3">
        <div className="nav-brand flex min-w-0 items-center gap-3 sm:gap-4">
          <a href="#hero" className="shrink-0 text-sm font-bold tracking-tight text-white sm:text-base">
            {nav.siteName}
          </a>
          <div className="nav-visitor [&_p]:text-white/75 [&_span.text-primary]:text-primary-light">
            <VisitorCounter />
          </div>
        </div>

        <ul className="hidden items-center gap-6 md:flex">
          {nav.sections.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`text-sm transition-colors ${
                  active === id ? "text-primary-light" : "text-white/60 hover:text-white"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="rounded-full border border-primary/50 px-4 py-1.5 text-xs font-medium text-primary-light transition hover:bg-primary/15 sm:text-sm"
        >
          {nav.contactCta}
        </a>
      </nav>
    </header>
  );
}
