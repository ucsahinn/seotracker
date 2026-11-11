import { useState } from "react";
import {
  useIsFetching,
  useQueryClient,
  type Query,
} from "@tanstack/react-query";
import {
  DASHBOARD_FILTERS,
  dashboardSearchViewQuery,
} from "@/client/features/dashboard/dashboardGscReport";
import { getSearchPerformanceView } from "@/serverFunctions/searchPerformance";

const PROJECT_QUERIES = [
  "dashboardActivation",
  "dashboardOverview",
  "searchPerformanceView",
  "ga4Overview",
  "auditFreshness",
  "projectSetup",
  "audit-status",
];
const GLOBAL_QUERIES = [
  "googleOAuthClientStatus",
  "googleServiceAccountStatus",
];
export function useDashboardRefresh(projectId: string) {
  const client = useQueryClient();
  const searchView = dashboardSearchViewQuery(projectId, true);
  const predicate = (q: Query) =>
    GLOBAL_QUERIES.includes(String(q.queryKey[0])) ||
    (q.queryKey[1] === projectId &&
      PROJECT_QUERIES.includes(String(q.queryKey[0])));
  const isFetching = useIsFetching({ predicate }) > 0;
  const [outcome, setOutcome] = useState<"success" | "partial" | null>(null);
  const queries = client
    .getQueryCache()
    .findAll({ predicate })
    .filter((q) => q.isActive());
  const timestamps = queries
    .filter((q) => q.state.dataUpdatedAt > 0)
    .map((q) => q.state.dataUpdatedAt);
  return {
    isFetching,
    outcome,
    sources: queries.map((q) => ({
      key: JSON.stringify(q.queryKey),
      source: String(q.queryKey[0]),
      updatedAt: q.state.dataUpdatedAt,
      failed: q.state.status === "error",
    })),
    dataUpdatedAt: timestamps.length ? Math.min(...timestamps) : 0,
    onRefresh: async () => {
      setOutcome(null);
      // The server remembers Google's answers for ten minutes. Without this
      // the button said "refreshed" over the same remembered numbers; the
      // fresh read replaces that memory, and the refetch below then reads it.
      if (client.getQueryCache().find(searchView)?.isActive())
        await getSearchPerformanceView({
          data: { ...DASHBOARD_FILTERS, projectId, fresh: true },
        }).catch(() => undefined);
      await client.refetchQueries({ predicate, type: "active" });
      setOutcome(
        client
          .getQueryCache()
          .findAll({ predicate })
          .some((q) => q.isActive() && q.state.status === "error")
          ? "partial"
          : "success",
      );
    },
  };
}
