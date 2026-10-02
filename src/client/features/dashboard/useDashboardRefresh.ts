import {
  useIsFetching,
  useQueryClient,
  type Query,
} from "@tanstack/react-query";

/** Every query the Panel's cards and metric row read, keyed by project at [1]. */
const DASHBOARD_QUERIES = [
  "dashboardActivation",
  "dashboardOverview",
  "dashboardGscReport",
  "dashboardGa4Report",
  "auditFreshness",
];

/**
 * One refresh for the whole Panel. The cards own their queries, so this goes
 * through the query cache instead of threading each result up: refetch every
 * active dashboard query of this project, busy while any is fetching, and
 * report the oldest load.
 */
export function useDashboardRefresh(projectId: string) {
  const queryClient = useQueryClient();
  const predicate = (query: Query) =>
    query.queryKey[1] === projectId &&
    DASHBOARD_QUERIES.includes(String(query.queryKey[0]));
  const isFetching = useIsFetching({ predicate }) > 0;
  const loaded = queryClient
    .getQueryCache()
    .findAll({ predicate })
    .map((query) => query.state.dataUpdatedAt)
    .filter((at) => at > 0);
  return {
    isFetching,
    dataUpdatedAt: loaded.length > 0 ? Math.min(...loaded) : 0,
    onRefresh: () =>
      void queryClient.refetchQueries({ predicate, type: "active" }),
  };
}
