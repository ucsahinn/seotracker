import { PageShell } from "@/client/components/PageShell";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ProjectContextPage } from "@/client/features/projects/project-context/ProjectContextPage";
import { t } from "@/shared/i18n";
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
      {!project ? (
        <p role="status" className="text-sm text-muted">
          {projectsQuery.isPending
            ? t("Proje kimliği okunuyor…")
            : t("Proje kimliği okunamadı. Proje listesini yeniden yükleyin.")}
          <button
            type="button"
            className="btn btn-ghost btn-sm min-h-11"
            onClick={() => void projectsQuery.refetch()}
          >
            {t("Yeniden dene")}
          </button>
        </p>
      ) : null}
      <ProjectContextPage
        projectId={projectId}
        projectName={project?.name ?? projectId}
        identityReady={!!project && !projectsQuery.isError}
        domain={project?.domain}
      />
    </PageShell>
  );
}
