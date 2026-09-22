import { Bot, FolderPlus, Globe, Search } from "lucide-react";
import type { DashboardActivation } from "@/server/features/dashboard/services/DashboardService";
import type { DashboardSetupStep } from "@/types/schemas/dashboard";

export const setupSteps: {
  id: DashboardSetupStep;
  label: string;
  detail: string;
  icon: typeof Globe;
}[] = [
  {
    id: "domain",
    label: "Sitenizi ekleyin",
    detail: "Bu proje için siteyi ve ülkeyi belirleyin.",
    icon: Globe,
  },
  {
    id: "project",
    label: "Birden fazla siteniz mi var?",
    detail: "Başka bir proje oluşturun, ya da siteleri ajanınıza kurdurun.",
    icon: FolderPlus,
  },
  {
    id: "mcp",
    label: "Yapay zeka ajanınızı bağlayın",
    detail:
      "seotracker'ı Claude ya da tercih ettiğiniz ajanın içinden kullanın.",
    icon: Bot,
  },
  {
    id: "gsc",
    label: "Search Console'u bağlayın",
    detail: "Gerçek tıklamalarınızı ve sorgularınızı buraya getirin.",
    icon: Search,
  },
];

export function getStepStatus(
  activation: DashboardActivation,
  step: DashboardSetupStep,
): "done" | "skipped" | "todo" {
  const completed: Record<DashboardSetupStep, boolean> = {
    domain: activation.domain !== null,
    project: activation.hasMultipleProjects,
    mcp:
      activation.mcp.authorizedAt !== null ||
      activation.mcp.firstToolCallAt !== null,
    gsc: activation.gsc.connected,
  };
  if (completed[step]) return "done";
  /*
   * `dismissedSteps` is the whole mechanism. There used to be a second
   * branch here on `mcp.cardDismissedAt`, a column nothing in this fork ever
   * writes a timestamp to - only `null` - so on the fresh install this
   * product actually ships as, it could not fire. The test that covered it
   * had to invent a value the system has no way to produce.
   */
  if (activation.dismissedSteps.includes(step)) return "skipped";
  return "todo";
}
