import { createFileRoute } from "@tanstack/react-router";
import { ChemicalDashboard } from "@/components/dashboard/ChemicalDashboard";
export const Route = createFileRoute("/production")({
  head: () => ({ meta: [
    { title: "生产监控｜智化云擎" }, { name: "description", content: "智慧化工生产装置、流程与工艺参数实时监控。" },
    { property: "og:title", content: "生产监控｜智化云擎" }, { property: "og:description", content: "智慧化工生产装置、流程与工艺参数实时监控。" },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: () => <ChemicalDashboard page="production" />,
});
