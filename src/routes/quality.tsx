import { createFileRoute } from "@tanstack/react-router";
import { ChemicalDashboard } from "@/components/dashboard/ChemicalDashboard";
export const Route = createFileRoute("/quality")({
  head: () => ({ meta: [
    { title: "质量分析｜智化云擎" }, { name: "description", content: "智慧化工批次质量、实验室检测与质量趋势分析。" },
    { property: "og:title", content: "质量分析｜智化云擎" }, { property: "og:description", content: "智慧化工批次质量、实验室检测与质量趋势分析。" },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: () => <ChemicalDashboard page="quality" />,
});
