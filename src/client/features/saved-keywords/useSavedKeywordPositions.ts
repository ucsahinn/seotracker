import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getTrackedQueries } from "@/serverFunctions/gscHistory";
import { exportSavedKeywords } from "@/serverFunctions/savedKeywords";
import type { ExportSavedKeywordsInput } from "@/types/schemas/keywords";
import { indexPositions } from "./savedKeywordPositions";

/** The window the average position is read over: a quarter. */
export const POSITION_WINDOW_DAYS = 90;
/** The most queries one archive read returns. */
const TRACKED_LIMIT = 500;

/**
 * Every saved keyword that matches the current filters, next to the average
 * position Search Console archived for it.
 *
 * The table is paged on the server, so its page alone cannot say how many
 * keywords sit on page one. This is the whole filtered set plus the archive,
 * which is what the summary counts and what the table narrows to when a
 * position group is chosen.
 */
export function useSavedKeywordPositions(
  projectId: string,
  filters: Omit<ExportSavedKeywordsInput, "projectId">,
) {
  const all = useQuery({
    queryKey: ["savedKeywords", projectId, "all", filters],
    queryFn: () => exportSavedKeywords({ data: { projectId, ...filters } }),
    placeholderData: keepPreviousData,
  });
  const tracked = useQuery({
    queryKey: ["trackedQueries", projectId, POSITION_WINDOW_DAYS, "saved"],
    queryFn: () =>
      getTrackedQueries({
        data: {
          projectId,
          days: POSITION_WINDOW_DAYS,
          limit: TRACKED_LIMIT,
        },
      }),
    staleTime: 60_000,
  });

  const positions = useMemo(
    () => indexPositions(tracked.data?.rows ?? []),
    [tracked.data],
  );

  return { all, tracked, positions };
}
