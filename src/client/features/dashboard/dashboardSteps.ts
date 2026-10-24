import { Bot, BookOpen, FolderPlus, Globe, Search } from "lucide-react";
import type {
  DashboardActivation,
  DashboardSetupStep,
} from "@/types/schemas/dashboard";

/* Labels and details are Turkish source strings, translated where they render. */
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
    label: "Başka sitelerinizi de ekleyin",
    detail: "Her site için ayrı proje açın.",
    icon: FolderPlus,
  },
  {
    id: "mcp",
    label: "Yapay zeka ajanınızı bağlayın",
    detail:
      "seowatcher'ı Claude ya da tercih ettiğiniz ajanın içinden kullanın.",
    icon: Bot,
  },
  {
    id: "gsc",
    label: "Search Console'u bağlayın",
    detail: "Gerçek tıklamalarınızı ve sorgularınızı buraya getirin.",
    icon: Search,
  },
  // Last, deliberately: it is the only step that asks the operator to write
  // something rather than click a button, and it is worth far more once
  // there is an audit and some Search Console data to write about.
  {
    id: "context",
    label: "Projeyi anlatın",
    detail: "Ajanınız ve raporlarınız siteyi tanısın.",
    icon: BookOpen,
  },
];

export function getStepStatus(
  activation: DashboardActivation,
  step: DashboardSetupStep,
): "done" | "skipped" | "todo" {
  const completed: Record<DashboardSetupStep, boolean> = {
    domain: activation.domain !== null,
    project: activation.hasMultipleProjects,
    // A successful tool call is the whole signal. The other half of this
    // condition read `firstMcpAuthorizedAt`, a column whose writer had no
    // caller in this fork - an OAuth step that went with the multi-tenant
    // surface - so it was always null and contributed nothing.
    mcp: activation.mcp.firstToolCallAt !== null,
    gsc: activation.gsc.connected,
    context: activation.hasProjectContext,
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
