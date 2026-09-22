import { createFileRoute } from "@tanstack/react-router";
import { ChemicalDashboard } from "@/components/dashboard/ChemicalDashboard";
export const Route = createFileRoute("/energy")({
  head: () => ({ meta: [
    { title: "能源管理｜智化云擎" }, { name: "description", content: "智慧化工能源介质、成本与能效优化管理。" },
    { property: "og:title", content: "能源管理｜智化云擎" }, { property: "og:description", content: "智慧化工能源介质、成本与能效优化管理。" },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: () => <ChemicalDashboard page="energy" />,
});
