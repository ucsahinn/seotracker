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
      <ProjectContextPage
        projectId={projectId}
        projectName={project?.name ?? "bu proje"}
        domain={project?.domain}
      />
    </PageShell>
  );
}
