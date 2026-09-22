import { createFileRoute } from "@tanstack/react-router";
import { ChemicalDashboard } from "@/components/dashboard/ChemicalDashboard";
export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "智慧总览｜智化云擎" }, { name: "description", content: "智慧化工平台全域生产态势与核心指标总览。" },
    { property: "og:title", content: "智慧总览｜智化云擎" }, { property: "og:description", content: "智慧化工平台全域生产态势与核心指标总览。" },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: () => <ChemicalDashboard page="overview" />,
});
