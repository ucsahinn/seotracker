import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import {
  searchPerformanceViewQuery,
  type SearchPerformanceViewFilters,
} from "@/client/features/dashboard/dashboardGscReport";
import { getSearchPerformanceView } from "@/serverFunctions/searchPerformance";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { t } from "@/shared/i18n";
import type { ResolvedWindow } from "./searchPerformanceQueries";

/** Exact dates are part of cache identity. A changed scope cannot reuse placeholder metrics. */
export function useSearchView(
  projectId: string,
  filters: SearchPerformanceViewFilters,
  window?: ResolvedWindow,
) {
  const client = useQueryClient();
  const base = searchPerformanceViewQuery(projectId, filters);
  const options = queryOptions({
    queryKey: window ? [...base.queryKey, window] : base.queryKey,
    queryFn: () =>
      getSearchPerformanceView({ data: { projectId, ...filters, window } }),
  });
  const viewQuery = useQuery(options);
  const refresh = useMutation({
    mutationFn: () =>
      getSearchPerformanceView({
        data: { projectId, ...filters, window, fresh: true },
      }),
    onSuccess: async (fresh) => {
      client.setQueryData(options.queryKey, fresh);
      await Promise.all(
        [
          "searchPerformanceTable",
          "searchPerformanceDrilldown",
          "cannibalization",
          "siteDailyHistory",
        ].map((key) =>
          client.invalidateQueries({ queryKey: [key, projectId] }),
        ),
      );
    },
    onError: (error) =>
      toast.error(getStandardErrorMessage(error, t("Yenilenemedi"))),
  });
  return { viewQuery, refresh };
}
