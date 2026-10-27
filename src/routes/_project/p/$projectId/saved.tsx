import { createFileRoute } from "@tanstack/react-router";
import { useCallback } from "react";
import { SavedKeywordsPage } from "@/client/features/saved-keywords/SavedKeywordsPage";
import {
  savedWatchlistSearchSchema,
  type SavedWatchlistSearch,
} from "@/shared/savedWatchlist";
export const Route = createFileRoute("/_project/p/$projectId/saved")({
  validateSearch: (search) => savedWatchlistSearchSchema.parse(search),
  component: SavedPage,
});
function SavedPage() {
  const { projectId } = Route.useParams();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const update = useCallback(
    (patch: Partial<SavedWatchlistSearch>, replace = false) =>
      void navigate({
        search: (current) => ({ ...current, ...patch }),
        replace,
      }),
    [navigate],
  );
  return (
    <SavedKeywordsPage projectId={projectId} search={search} update={update} />
  );
}
