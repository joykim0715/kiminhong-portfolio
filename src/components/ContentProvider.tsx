"use client";

import { createContext, useContext, type ReactNode } from "react";
import { siteContent as koContent, type SiteContent } from "@/data/content";

export type Locale = "ko" | "en";

type ContentContextValue = {
  locale: Locale;
  content: SiteContent;
  homeHref: string;
  otherLocaleHref: string;
  otherLocaleLabel: string;
};

const ContentContext = createContext<ContentContextValue>({
  locale: "ko",
  content: koContent,
  homeHref: "/",
  otherLocaleHref: "/en",
  otherLocaleLabel: "EN",
});

export function ContentProvider({
  locale = "ko",
  content = koContent,
  children,
}: {
  locale?: Locale;
  content?: SiteContent;
  children: ReactNode;
}) {
  const value: ContentContextValue = {
    locale,
    content,
    homeHref: locale === "en" ? "/en" : "/",
    otherLocaleHref: locale === "en" ? "/" : "/en",
    otherLocaleLabel: locale === "en" ? "KO" : "EN",
  };

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useSiteContent() {
  return useContext(ContentContext).content;
}

export function useLocale() {
  return useContext(ContentContext);
}
