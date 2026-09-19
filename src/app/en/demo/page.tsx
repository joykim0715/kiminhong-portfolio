import type { Metadata } from "next";
import DashboardDemo from "@/components/DashboardDemo";
import HtmlLang from "@/components/HtmlLang";
import { dashboardDemoEn } from "@/data/dashboardDemo.en";

export const metadata: Metadata = {
  title: dashboardDemoEn.meta.pageTitle,
  description: dashboardDemoEn.meta.description,
  alternates: {
    canonical: "/en/demo",
  },
};

export default function EnglishDemoPage() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang="en"`,
        }}
      />
      <HtmlLang locale="en" />
      <DashboardDemo data={dashboardDemoEn} />
    </>
  );
}
