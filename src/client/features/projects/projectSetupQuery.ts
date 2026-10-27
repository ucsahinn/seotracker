import { queryOptions } from "@tanstack/react-query";
import { getProjectSetup } from "@/serverFunctions/projectSetup";
import type { SetupItem } from "@/shared/projectSetup";

/** One key for every screen that shows the setup checklist. */
export const projectSetupOptions = (projectId: string) =>
  queryOptions({
    queryKey: ["projectSetup", projectId],
    queryFn: () => getProjectSetup({ data: { projectId } }),
    staleTime: 60_000,
  });

/** Turkish source labels, translated where they render. */
export const SETUP_LABELS: Record<SetupItem, string> = {
  searchConsole: "Search Console",
  analytics: "Analytics",
  audit: "Güncel denetim",
  projectInfo: "Proje tanımı",
  pageSpeed: "PageSpeed anahtarı",
  agent: "Yapay zeka ajanı",
};
