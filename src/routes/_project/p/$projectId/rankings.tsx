import { createFileRoute } from "@tanstack/react-router";
import { RankingsPage } from "@/client/features/rankings/RankingsPage";

export const Route = createFileRoute("/_project/p/$projectId/rankings")({
  component: RankingsRoute,
});

function RankingsRoute() {
  const { projectId } = Route.useParams();
  return <RankingsPage projectId={projectId} />;
}
