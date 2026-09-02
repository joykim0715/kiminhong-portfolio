import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import { siteContent } from "@/data/content";
import { applyTrackToContent } from "@/data/tracks";

const content = applyTrackToContent(siteContent, "planning");

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
  alternates: { canonical: "/planning" },
  openGraph: {
    title: content.meta.title,
    description: content.meta.description,
    locale: "ko_KR",
    type: "website",
  },
};

export default function PlanningPage() {
  return <HomePage track="planning" content={content} />;
}
