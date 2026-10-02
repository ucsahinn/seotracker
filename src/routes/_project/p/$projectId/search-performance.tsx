import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import {
  SearchPerformancePage,
  SEARCH_PERFORMANCE_TABS,
} from "@/client/features/search-performance/SearchPerformancePage";
import { QUICK_FILTER_IDS } from "@/client/features/search-performance/quickFilters";
import {
  GSC_DEVICES,
  SEARCH_PERFORMANCE_RANGES,
  SEARCH_PERFORMANCE_TYPES,
} from "@/types/schemas/search-performance";

/*
 * The whole view state lives in the URL, not just the tab.
 *
 * On this screen the filter *is* the finding -- "mobile, Turkey, last 3
 * months" is the answer, and it was component state. A reload, a Back, or a
 * link sent to a colleague dropped all of it back to the defaults, on the
 * one screen where the reader most needs to arrive at what the sender was
 * looking at. `catch` on every field means a hand-edited URL degrades to
 * the default rather than throwing.
 */
const searchSchema = z.object({
  tab: z.enum(SEARCH_PERFORMANCE_TABS).catch("striking").default("striking"),
  range: z
    .enum(SEARCH_PERFORMANCE_RANGES)
    .catch("last_28_days")
    .default("last_28_days"),
  device: z.enum(GSC_DEVICES).optional().catch(undefined),
  /* Arama türü; web varsayılan olduğu için URL'de yalnızca diğerleri görünür. */
  type: z.enum(SEARCH_PERFORMANCE_TYPES).optional().catch(undefined),
  country: z.string().min(2).max(3).optional().catch(undefined),
  /* Free-text narrowing of the queries/pages table. In the URL so a link
     from a saved keyword lands on that keyword, and so a reload keeps it. */
  q: z.string().max(200).optional().catch(undefined),
  /* Chip filter on the queries/pages tables ("Hiç tıklanmayan" and so on). */
  f: z.enum(QUICK_FILTER_IDS).optional().catch(undefined),
  // Page is deliberately not persisted: it is a position inside a result
  // set, and the set is rebuilt whenever any filter above it changes.
});

export const Route = createFileRoute(
  "/_project/p/$projectId/search-performance",
)({
  validateSearch: searchSchema,
  component: SearchPerformanceRoute,
});

function SearchPerformanceRoute() {
  const { projectId } = Route.useParams();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  return (
    <SearchPerformancePage
      projectId={projectId}
      tab={search.tab}
      range={search.range}
      device={search.device}
      country={search.country}
      searchType={search.type ?? "web"}
      query={search.q ?? ""}
      quickFilter={search.f}
      onViewChange={(next) =>
        void navigate({
          search: (current) => ({ ...current, ...next }),
          // A search term is a refinement of the same view, not a new place
          // to go Back to: replace the entry instead of one per pause.
          replace: Object.keys(next).length === 1 && "q" in next,
        })
      }
    />
  );
}
