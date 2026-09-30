import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { OpportunitiesPage } from "@/client/features/opportunities/OpportunitiesPage";
import { DEFAULT_WINDOW_DAYS } from "@/shared/dataFreshness";

/*
 * Window and row count live in the URL, like the search-performance range
 * and the analytics window. They were React state, so a reload, a Back, or a
 * link sent to someone else silently reset them -- and a screenshot of "son
 * 90 gün" opened on a different period than the sender saw.
 *
 * `catch` degrades a hand-edited value to the default rather than throwing.
 */
const searchSchema = z.object({
  windowDays: z
    .union([z.literal(7), z.literal(28), z.literal(90)])
    .catch(DEFAULT_WINDOW_DAYS)
    .default(DEFAULT_WINDOW_DAYS),
  limit: z
    .union([z.literal(25), z.literal(50), z.literal(100)])
    .catch(50)
    .default(50),
});

export const Route = createFileRoute("/_project/p/$projectId/opportunities")({
  component: OpportunitiesRoute,
  validateSearch: searchSchema,
});

function OpportunitiesRoute() {
  const { projectId } = Route.useParams();
  const { windowDays, limit } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  return (
    <OpportunitiesPage
      projectId={projectId}
      windowDays={windowDays}
      limit={limit}
      onViewChange={(next) => {
        void navigate({ search: (prev) => ({ ...prev, ...next }) });
      }}
    />
  );
}
