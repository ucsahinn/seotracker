/** The slice of a TanStack Query result a refresh button needs. */
type Refreshable = {
  refetch: () => Promise<unknown>;
  isFetching: boolean;
  dataUpdatedAt: number;
};

/**
 * Fold several queries into one `RefreshButton`: refetch all of them, busy
 * while any is fetching, "Güncellendi" shows the oldest data (the honest
 * answer to "how fresh is this screen"). Queries that never loaded (0) are
 * ignored for the timestamp.
 */
export function refreshState(queries: Refreshable[]) {
  const loaded = queries
    .map((query) => query.dataUpdatedAt)
    .filter((at) => at > 0);
  return {
    onRefresh: () => {
      for (const query of queries) void query.refetch();
    },
    isFetching: queries.some((query) => query.isFetching),
    dataUpdatedAt: loaded.length > 0 ? Math.min(...loaded) : 0,
  };
}
