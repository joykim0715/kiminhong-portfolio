"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRecruitSafe } from "./RecruitSafeProvider";
import VisitorCounter from "./VisitorCounter";
import { useLocale, useSiteContent } from "./ContentProvider";
import { useTrack } from "./TrackProvider";
import HoverLink from "./ui/HoverLink";

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
  const { nav } = useSiteContent();
  const { otherLocaleHref, otherLocaleLabel, locale, homeHref } = useLocale();
  const { track, nav: trackNav } = useTrack();
  const recruitSafe = useRecruitSafe();
  const localeSwitchLabel = locale === "en" ? "한국어" : "EN";
  const sections = useMemo(
    () => (recruitSafe ? nav.sections.filter((s) => s.id !== "contact") : nav.sections),
    [recruitSafe, nav.sections],
  );
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

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
  }, [sections]);

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
      compact ? "block rounded-lg px-3 py-2.5 text-sm font-medium" : "relative text-sm",
      active === id
        ? compact
          ? "bg-accent/15 text-accent"
          : "text-accent after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-accent/70"
        : compact
          ? "text-white/75 hover:bg-white/8 hover:text-white"
          : "text-white/60 hover:text-white",
    ].join(" ");

  return (
    <header className="nav-bar glass-nav-dark fixed inset-x-0 top-0 z-50 text-white">
      <nav className="section-container flex h-16 items-center justify-between gap-2 sm:gap-3">
        <div className="nav-brand flex min-w-0 items-center gap-2 sm:gap-3">
          <a href={homeHref} className="shrink-0 text-sm font-bold tracking-tight text-white sm:text-base">
            {nav.siteName}
          </a>
          {!recruitSafe ? (
            <ul
              className="hidden min-w-0 items-center gap-0.5 rounded-md border border-white/15 p-0.5 md:flex"
              aria-label="지원 트랙"
            >
              {trackNav.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={[
                      "block rounded px-2 py-1 text-[11px] font-semibold tracking-wide transition-colors sm:text-xs",
                      track === item.id
                        ? "bg-white/15 text-white"
                        : "text-white/50 hover:bg-white/8 hover:text-white/85",
                    ].join(" ")}
                    aria-current={track === item.id ? "page" : undefined}
                  >
                    {item.shortLabel}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
          <div className="nav-visitor hidden min-w-0 xl:block [&_p]:text-[11px] [&_p]:font-medium [&_p]:text-white/50 [&_span.text-primary]:text-sm [&_span.text-primary]:font-semibold [&_span.text-primary]:text-accent">
            <VisitorCounter />
          </div>
        </div>

        <ul className="hidden items-center gap-6 lg:flex">
          {sections.map(({ id, label }) => (
            <li key={id}>
              <HoverLink href={`#${id}`} className={sectionLinkClass(id)}>
                {label}
              </HoverLink>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          {!recruitSafe ? (
            <a
              href={otherLocaleHref}
              className="inline-flex items-center rounded-md px-2 py-1.5 text-xs font-semibold tracking-wide text-white/55 transition hover:text-white sm:px-2.5"
              aria-label={locale === "en" ? "Switch to Korean" : "Switch to English"}
              title={locale === "en" ? "한국어로 보기" : "View in English"}
            >
              <span>{localeSwitchLabel}</span>
              <span className="ml-1.5 hidden text-[10px] font-medium uppercase tracking-[0.14em] text-white/35 sm:inline">
                {otherLocaleLabel}
              </span>
            </a>
          ) : null}
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-white/80 transition hover:border-white/30 hover:bg-white/8 hover:text-white lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={menuOpen ? "메뉴 닫기" : "섹션 메뉴 열기"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <MenuIcon open={menuOpen} />
          </button>

          {!recruitSafe ? (
            <a
              href="#contact"
              className="rounded-md border border-white/20 px-3 py-1.5 text-xs font-medium text-white/85 transition hover:border-accent/50 hover:text-accent sm:px-3.5 sm:text-sm"
              onClick={() => setMenuOpen(false)}
            >
              {nav.contactCta}
            </a>
          ) : (
            <a
              href="#works"
              className="rounded-md border border-white/20 px-3 py-1.5 text-xs font-medium text-white/85 transition hover:border-accent/50 hover:text-accent sm:px-3.5 sm:text-sm"
              onClick={() => setMenuOpen(false)}
            >
              Work
            </a>
          )}
        </div>
      </nav>

      {menuOpen ? (
        <div
          id="mobile-nav-menu"
          className="border-t border-white/10 bg-[#0a1211]/95 backdrop-blur-md lg:hidden"
        >
          <ul className="section-container grid grid-cols-2 gap-1 py-3">
            {!recruitSafe
              ? trackNav.map((item) => (
                  <li key={item.id} className="md:hidden">
                    <Link
                      href={item.href}
                      className={[
                        "block rounded-lg px-3 py-2.5 text-sm font-medium",
                        track === item.id
                          ? "bg-accent/15 text-accent"
                          : "text-white/75 hover:bg-white/8 hover:text-white",
                      ].join(" ")}
                      onClick={() => setMenuOpen(false)}
                      aria-current={track === item.id ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))
              : null}
            {sections.map(({ id, label }) => (
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
          <div className="section-container border-t border-white/8 py-2.5 sm:hidden [&_p]:text-[11px] [&_p]:font-medium [&_p]:text-white/45 [&_span.text-primary]:text-sm [&_span.text-primary]:text-accent">
            <VisitorCounter />
          </div>
        </div>
      ) : null}
    </header>
  );
}
