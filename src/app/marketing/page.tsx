import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import { siteContent } from "@/data/content";
import { applyTrackToContent } from "@/data/tracks";

const content = applyTrackToContent(siteContent, "marketing");

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
  alternates: { canonical: "/marketing" },
  openGraph: {
    title: content.meta.title,
    description: content.meta.description,
    locale: "ko_KR",
    type: "website",
  },
};

export default function MarketingPage() {
  return <HomePage track="marketing" content={content} />;
}
