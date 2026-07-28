import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import { siteContentEn } from "@/data/content.en";

export const metadata: Metadata = {
  title: siteContentEn.meta.title,
  description: siteContentEn.meta.description,
  alternates: {
    canonical: "/en",
    languages: {
      ko: "/",
      en: "/en",
    },
  },
  openGraph: {
    title: siteContentEn.meta.title,
    description: siteContentEn.meta.description,
    locale: "en_GB",
    type: "website",
  },
};

/** English portfolio for UK Working Holiday / international applications */
export default function EnglishHomePage() {
  return <HomePage locale="en" content={siteContentEn} />;
}
