import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import {
  SearchPerformancePage,
  SEARCH_PERFORMANCE_TABS,
} from "@/client/features/search-performance/SearchPerformancePage";

// The tab lives in the URL, like the audit page's does. Held in component
// state it could not be linked or bookmarked, reload dropped you back to the
// first tab, and Back left the page entirely.
const searchSchema = z.object({
  tab: z.enum(SEARCH_PERFORMANCE_TABS).catch("striking").default("striking"),
});

export const Route = createFileRoute(
  "/_project/p/$projectId/search-performance",
)({
  validateSearch: searchSchema,
  component: SearchPerformanceRoute,
});

function SearchPerformanceRoute() {
  const { projectId } = Route.useParams();
  const { tab } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  return (
    <SearchPerformancePage
      projectId={projectId}
      tab={tab}
      onTabChange={(next) => void navigate({ search: { tab: next } })}
    />
  );
}
