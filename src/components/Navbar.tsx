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
    <header className="nav-bar glass-nav fixed inset-x-0 top-0 z-50 text-text">
      <nav className="section-container flex h-16 items-center justify-between gap-3">
        <div className="nav-brand flex min-w-0 items-center gap-3 sm:gap-4">
          <a href="#hero" className="shrink-0 text-sm font-bold tracking-tight text-text sm:text-base">
            {nav.siteName}
          </a>
          <div className="nav-visitor [&_p]:text-muted [&_span.text-primary]:text-primary">
            <VisitorCounter />
          </div>
        </div>

        <ul className="hidden items-center gap-6 md:flex">
          {nav.sections.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`text-sm transition-colors ${
                  active === id ? "text-primary" : "text-muted hover:text-text"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="rounded-full border border-primary/40 px-4 py-1.5 text-xs font-medium text-primary transition hover:bg-primary/10 sm:text-sm"
        >
          {nav.contactCta}
        </a>
      </nav>
    </header>
  );
}
