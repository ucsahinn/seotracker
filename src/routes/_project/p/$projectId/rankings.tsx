import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import {
  RANKING_WINDOWS,
  RankingsPage,
} from "@/client/features/rankings/RankingsPage";

/*
 * In the URL for the same reason the search-performance range is: the window
 * was React state, so a reload or a shared link dropped a 16-month view back
 * to 90 days without saying so. `catch` degrades a hand-edited value rather
 * than throwing.
 */
const DEFAULT_DAYS = 90;
const searchSchema = z.object({
  days: z
    .number()
    .int()
    .refine((value) => RANKING_WINDOWS.some((option) => option.days === value))
    .catch(DEFAULT_DAYS)
    .default(DEFAULT_DAYS),
});

export const Route = createFileRoute("/_project/p/$projectId/rankings")({
  component: RankingsRoute,
  validateSearch: searchSchema,
});

function RankingsRoute() {
  const { projectId } = Route.useParams();
  const { days } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  return (
    <RankingsPage
      projectId={projectId}
      days={days}
      onDaysChange={(next) => {
        void navigate({ search: (prev) => ({ ...prev, days: next }) });
      }}
    />
  );
}
