import type { Metadata } from "next";
import DashboardDemo from "@/components/DashboardDemo";
import { dashboardDemoEn } from "@/data/dashboardDemo.en";

export const metadata: Metadata = {
  title: dashboardDemoEn.meta.pageTitle,
  description: dashboardDemoEn.meta.description,
  alternates: {
    canonical: "/en/demo",
  },
};

export default function EnglishDemoPage() {
  return <DashboardDemo data={dashboardDemoEn} />;
}
