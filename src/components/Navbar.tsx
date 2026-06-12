"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "hero", label: "Home" },
  { id: "values", label: "Values" },
  { id: "skills", label: "Skills" },
  { id: "works", label: "Work" },
  { id: "gallery", label: "Gallery" },
  { id: "story", label: "Story" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observers = sections.map(({ id }) => {
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
    <header className="nav-bar glass-nav fixed inset-x-0 top-0 z-50">
      <nav className="section-container flex h-16 items-center justify-between">
        <a href="#hero" className="text-sm font-bold tracking-tight text-text sm:text-base">
          김인홍
        </a>

        <ul className="hidden items-center gap-6 md:flex">
          {sections.map(({ id, label }) => (
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
          Contact
        </a>
      </nav>
    </header>
  );
}
