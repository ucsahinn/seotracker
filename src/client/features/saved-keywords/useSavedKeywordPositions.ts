import { useQuery } from "@tanstack/react-query";
import { getSavedWatchlist } from "@/serverFunctions/savedKeywords";
import type { SavedWatchlistInput } from "@/shared/savedWatchlist";
/** One project/filter/range snapshot supplies rows, summary and export provenance. */
export function useSavedKeywordPositions(
  input: SavedWatchlistInput,
  enabled = true,
) {
  return useQuery({
    queryKey: ["savedKeywords", input.projectId, "watchlist", input],
    queryFn: () => getSavedWatchlist({ data: input }),
    enabled,
    staleTime: 60000,
  });
}
