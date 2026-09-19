import { createFileRoute } from "@tanstack/react-router";
import { OpportunitiesPage } from "@/client/features/opportunities/OpportunitiesPage";

export const Route = createFileRoute("/_project/p/$projectId/opportunities")({
  component: OpportunitiesRoute,
});

function OpportunitiesRoute() {
  const { projectId } = Route.useParams();
  return <OpportunitiesPage projectId={projectId} />;
}
