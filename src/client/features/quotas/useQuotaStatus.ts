import { useQuery } from "@tanstack/react-query";
import { sortBy } from "remeda";
import {
  QUOTA_KINDS,
  type QuotaKind,
} from "@/server/features/quotas/quotaTypes";
import { getQuotaStatus } from "@/serverFunctions/quotas";

/** The server reads stored figures only, so a minute-old answer is current. */
const STALE_MS = 60_000;

/**
 * Quota meters for one project. `kinds` picks the limits a screen cares
 * about, or "all". Refetches on window focus only: no polling.
 */
export function useQuotaStatus(
  projectId: string,
  kinds: readonly QuotaKind[] | "all" = "all",
) {
  const wanted = kinds === "all" ? QUOTA_KINDS : kinds;
  return useQuery({
    queryKey: [
      "quotaStatus",
      projectId,
      sortBy(wanted, (kind) => kind).join(","),
    ],
    queryFn: () => getQuotaStatus({ data: { projectId, kinds: [...wanted] } }),
    staleTime: STALE_MS,
    refetchOnWindowFocus: true,
    retry: false,
  });
}
