import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { SearchPerformancePage } from "@/client/features/search-performance/SearchPerformancePage";
import {
  COMPARE_MODES,
  GRANULARITIES,
  ROUTE_TAB_VALUES,
  canonicalTab,
} from "@/client/features/search-performance/searchTabs";
import { QUICK_FILTER_IDS } from "@/client/features/search-performance/quickFilters";
import {
  GSC_DEVICES,
  SEARCH_PERFORMANCE_RANGES,
  SEARCH_PERFORMANCE_TYPES,
  searchPerformanceLinkSchema,
} from "@/types/schemas/search-performance";

/*
 * The whole view state lives in the URL, not just the tab.
 *
 * On this screen the filter *is* the finding -- "mobile, Turkey, last 3
 * months" is the answer. A reload, a Back, or a link sent to a colleague
 * must arrive at what the sender was looking at. `catch` on every field
 * means a hand-edited URL degrades to the default rather than throwing.
 *
 * The tab also accepts the values older links carry (`striking`,
 * `cannibalization`) and maps them onto the tab that now holds that list.
 */
const searchSchema = z
  .object({
    ...searchPerformanceLinkSchema.shape,
    tab: z
      .enum(ROUTE_TAB_VALUES)
      .catch("todo")
      .default("todo")
      .transform(canonicalTab),
    range: z
      .enum(SEARCH_PERFORMANCE_RANGES)
      .catch("last_28_days")
      .default("last_28_days"),
    device: z.enum(GSC_DEVICES).optional().catch(undefined),
    /* Search type; web is the default, so only the others show in the URL. */
    type: z.enum(SEARCH_PERFORMANCE_TYPES).optional().catch(undefined),
    // Alpha-3 only, like the server schema.
    country: z.string().length(3).optional().catch(undefined),
    /* Free-text narrowing of the queries/pages table. */
    q: z.string().max(200).optional().catch(undefined),
    /* Chip filter on the queries/pages tables. */
    f: z.enum(QUICK_FILTER_IDS).optional().catch(undefined),
    /* What the tiles and the chart compare against; previous period by default. */
    cmp: z.enum(COMPARE_MODES).optional().catch(undefined),
    /* Chart grain; daily by default. */
    g: z.enum(GRANULARITIES).optional().catch(undefined),
  })
  .refine(
    (value) => searchPerformanceLinkSchema.safeParse(value).success,
    "Invalid exact Search scope.",
  );

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
      compare={search.cmp ?? "previous"}
      granularity={search.g ?? "day"}
      window={
        search.startDate && search.endDate
          ? { startDate: search.startDate, endDate: search.endDate }
          : undefined
      }
      exactTarget={
        search.exactPage
          ? { dimension: "page", key: search.exactPage }
          : search.exactQuery
            ? { dimension: "query", key: search.exactQuery }
            : undefined
      }
      onViewChange={(next) =>
        void navigate({
          search: (current) => ({
            ...current,
            ...next,
            ...("range" in next
              ? { startDate: undefined, endDate: undefined }
              : {}),
          }),
          // A search term is a refinement of the same view, not a new place
          // to go Back to: replace the entry instead of one per pause.
          replace: Object.keys(next).length === 1 && "q" in next,
        })
      }
    />
  );
}
