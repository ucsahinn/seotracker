import { queryOptions } from "@tanstack/react-query";
import { getGa4DashboardReport } from "@/serverFunctions/ga4";
export const ga4OverviewQuery = (projectId: string, windowDays = 28) =>
  queryOptions({
    queryKey: ["ga4Overview", projectId, windowDays],
    queryFn: () => getGa4DashboardReport({ data: { projectId, windowDays } }),
    retry: 1,
  });
