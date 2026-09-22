import { createFileRoute } from "@tanstack/react-router";
import { ChemicalDashboard } from "@/components/dashboard/ChemicalDashboard";
export const Route = createFileRoute("/safety")({
  head: () => ({ meta: [
    { title: "安全环保｜智化云擎" }, { name: "description", content: "智慧化工安全态势、风险预警与环保排放监测。" },
    { property: "og:title", content: "安全环保｜智化云擎" }, { property: "og:description", content: "智慧化工安全态势、风险预警与环保排放监测。" },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: () => <ChemicalDashboard page="safety" />,
});
