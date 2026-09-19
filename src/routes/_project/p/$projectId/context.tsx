import { PageShell } from "@/client/components/PageShell";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ProjectContextPage } from "@/client/features/projects/project-context/ProjectContextPage";
import { getProjects } from "@/serverFunctions/projects";

export const Route = createFileRoute("/_project/p/$projectId/context")({
  component: ProjectContextRoute,
});

function ProjectContextRoute() {
  const { projectId } = Route.useParams();
  const projectsQuery = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
  });
  const project = projectsQuery.data?.find((entry) => entry.id === projectId);

  return (
    <PageShell width="reading">
      <div>
        <h1 className="text-2xl font-semibold">Proje bilgisi</h1>
        <p className="text-sm text-muted">{project?.name ?? " "}</p>
      </div>

      <ProjectContextPage projectId={projectId} />
    </PageShell>
  );
}
