"use client";

import { useLayoutEffect } from "react";

/** Keeps `<html lang>` in sync with the active ContentProvider locale. */
export default function HtmlLang({ locale }: { locale: "ko" | "en" }) {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const previous = root.lang;
    root.lang = locale === "en" ? "en" : "ko";
    return () => {
      root.lang = previous || "ko";
    };
  }, [locale]);

  return null;
}
