import { createFileRoute } from "@tanstack/react-router";
import { AnalyticsPage } from "@/client/features/analytics/AnalyticsPage";

export const Route = createFileRoute("/_project/p/$projectId/analytics")({
  component: RouteComponent,
});

function RouteComponent() {
  const { projectId } = Route.useParams();
  return <AnalyticsPage projectId={projectId} />;
}
