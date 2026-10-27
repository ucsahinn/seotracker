import { useQuery } from "@tanstack/react-query";
import { getSavedKeywords } from "@/serverFunctions/savedKeywords";
import type {
  SavedWatchlistInput,
  SavedEvidence,
} from "@/shared/savedWatchlist";
/** An overview failure must not erase a separately readable inventory page. Rank refinements never broaden here. */
export function useSavedInventoryFallback(
  input: SavedWatchlistInput,
  overviewFailed: boolean,
) {
  const allowed =
    !input.band &&
    !input.fallers &&
    (input.sort === "createdAt" || input.sort === "keyword");
  return useQuery({
    queryKey: ["savedKeywords", input.projectId, "inventoryFallback", input],
    queryFn: () =>
      getSavedKeywords({
        data: {
          ...input,
          sort: input.sort === "keyword" ? "keyword" : "createdAt",
        },
      }),
    enabled: overviewFailed && allowed,
    staleTime: 60000,
  });
}
export function unavailableSavedEvidence(): SavedEvidence {
  return {
    position: null,
    previousPosition: null,
    delta: null,
    impressions: null,
    clicks: null,
    observation: null,
    previousObservation: null,
    positionStatus: "unavailable",
  };
}
