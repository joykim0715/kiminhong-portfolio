import type { Metadata } from "next";
import DashboardDemo from "@/components/DashboardDemo";
import { dashboardDemo } from "@/data/dashboardDemo";

export const metadata: Metadata = {
  title: dashboardDemo.meta.pageTitle,
  description: dashboardDemo.meta.description,
  alternates: {
    canonical: "/demo",
  },
};

export default function DemoPage() {
  return <DashboardDemo />;
}
