import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { AnalyticsPage } from "@/client/features/analytics/AnalyticsPage";
import { DEFAULT_WINDOW_DAYS } from "@/shared/dataFreshness";

/*
 * The window lives in the URL, the way the search-performance screen's does.
 * It was React state, so a reload, a Back, or a link sent to someone else
 * silently reset it to 28 days -- and a screenshot of "son 90 gün" pasted
 * into a message opened on a different period than the sender saw.
 *
 * `catch` degrades a hand-edited value to the default rather than throwing.
 */
const searchSchema = z.object({
  windowDays: z
    .union([z.literal(7), z.literal(28), z.literal(90)])
    .catch(DEFAULT_WINDOW_DAYS)
    .default(DEFAULT_WINDOW_DAYS),
});

export const Route = createFileRoute("/_project/p/$projectId/analytics")({
  component: RouteComponent,
  validateSearch: searchSchema,
});

function RouteComponent() {
  const { projectId } = Route.useParams();
  const { windowDays } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  return (
    <AnalyticsPage
      projectId={projectId}
      windowDays={windowDays}
      onWindowChange={(next) => {
        void navigate({ search: (prev) => ({ ...prev, windowDays: next }) });
      }}
    />
  );
}
