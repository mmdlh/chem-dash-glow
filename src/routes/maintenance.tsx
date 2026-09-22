import { createFileRoute } from "@tanstack/react-router";
import { ChemicalDashboard } from "@/components/dashboard/ChemicalDashboard";
export const Route = createFileRoute("/maintenance")({
  head: () => ({ meta: [
    { title: "设备运维｜智化云擎" }, { name: "description", content: "智慧化工设备健康评估、预测预警与检修工单管理。" },
    { property: "og:title", content: "设备运维｜智化云擎" }, { property: "og:description", content: "智慧化工设备健康评估、预测预警与检修工单管理。" },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: () => <ChemicalDashboard page="maintenance" />,
});
