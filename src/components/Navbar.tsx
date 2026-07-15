"use client";

import { useEffect, useState } from "react";
import { siteContent } from "@/data/content";
import VisitorCounter from "./VisitorCounter";

const { nav } = siteContent;

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {open ? (
        <path
          d="M6 6L18 18M18 6L6 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M4 7H20M4 12H20M4 17H20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

export default function Navbar() {
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

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

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const sectionLinkClass = (id: string, compact = false) =>
    [
      "transition-colors",
      compact ? "block rounded-lg px-3 py-2.5 text-sm font-medium" : "text-sm",
      active === id
        ? compact
          ? "bg-primary/15 text-primary-light"
          : "text-primary-light"
        : compact
          ? "text-white/75 hover:bg-white/8 hover:text-white"
          : "text-white/60 hover:text-white",
    ].join(" ");

  return (
    <header className="nav-bar glass-nav-dark fixed inset-x-0 top-0 z-50 text-white">
      <nav className="section-container flex h-16 items-center justify-between gap-3">
        <div className="nav-brand flex min-w-0 items-center gap-2 sm:gap-4">
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
              <a href={`#${id}`} className={sectionLinkClass(id)}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:border-white/35 hover:bg-white/10 hover:text-white md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={menuOpen ? "메뉴 닫기" : "섹션 메뉴 열기"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <MenuIcon open={menuOpen} />
          </button>

          <a
            href="#contact"
            className="rounded-full border border-primary/50 px-3 py-1.5 text-xs font-medium text-primary-light transition hover:bg-primary/15 sm:px-4 sm:text-sm"
            onClick={() => setMenuOpen(false)}
          >
            {nav.contactCta}
          </a>
        </div>
      </nav>

      {menuOpen ? (
        <div
          id="mobile-nav-menu"
          className="border-t border-white/10 bg-[#0a1211]/95 backdrop-blur-md md:hidden"
        >
          <ul className="section-container grid grid-cols-2 gap-1 py-3">
            {nav.sections.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={sectionLinkClass(id, true)}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
