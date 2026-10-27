import { PageHeader, PageShell } from "@/client/components/PageShell";
import { Skeleton } from "@/client/components/Skeleton";
import { Spinner } from "@/client/components/Spinner";
import * as React from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FolderPlus, Plus } from "lucide-react";
import { PageActions, RefreshButton } from "@/client/components/RefreshButton";
import { EmptyState } from "@/client/components/EmptyState";
import { StatusPill } from "@/client/components/StatusPill";
import { QueryErrorState } from "@/client/components/QueryErrorState";
import { toast } from "sonner";
import {
  getArchivedProjects,
  getProjects,
  getProjectsOverview,
  restoreProject,
} from "@/serverFunctions/projects";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { getLastProjectId } from "@/client/lib/active-project";
import { CreateProjectModal } from "@/client/features/projects/CreateProjectModal";
import { ProjectFacts } from "@/client/features/projects/ProjectFacts";
import { t } from "@/shared/i18n";

export const Route = createFileRoute("/_app/projects")({
  component: ProjectsPage,
});

function ProjectsPage() {
  const [creating, setCreating] = React.useState(false);
  // Read after mount to keep SSR/first render stable.
  const [currentProjectId, setCurrentProjectId] = React.useState<string | null>(
    null,
  );
  React.useEffect(() => {
    setCurrentProjectId(getLastProjectId());
  }, []);
  const projectsQuery = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
  });
  const projects = projectsQuery.data ?? [];
  // Local database only: the archive, audits and connections.
  const overviewQuery = useQuery({
    queryKey: ["projectsOverview"],
    queryFn: () => getProjectsOverview(),
  });
  const overviewOf = (id: string) =>
    overviewQuery.data?.find((row) => row.projectId === id);

  return (
    <PageShell width="reading">
      <PageHeader
        title={t("Projeler")}
        description={t(
          "Her projenin kendi Search Console bağlantısı, arama verisi ve site denetimleri vardır.",
        )}
        actions={
          <PageActions>
            <RefreshButton
              onRefresh={() => void projectsQuery.refetch()}
              isFetching={projectsQuery.isFetching}
              dataUpdatedAt={projectsQuery.dataUpdatedAt}
            />
            <button
              type="button"
              className="btn btn-primary btn-sm shrink-0"
              onClick={() => setCreating(true)}
            >
              <Plus className="size-4" />
              {t("Yeni proje")}
            </button>
          </PageActions>
        }
      />

      {projectsQuery.isLoading ? (
        <Skeleton variant="list" rows={4} />
      ) : projectsQuery.isError ? (
        <QueryErrorState
          error={projectsQuery.error}
          onRetry={() => void projectsQuery.refetch()}
          title={t("Projeler yüklenemedi")}
        />
      ) : projects.length === 0 ? (
        // Reachable only through a failure upstream, since the loader
        // guarantees one project - but a bare 1px box said nothing at all.
        <EmptyState
          icon={FolderPlus}
          title={t("Henüz proje yok")}
          description={t("Bir proje oluşturun, sonra sitesini ekleyin.")}
        />
      ) : (
        <ul className="divide-y divide-base-300 overflow-hidden rounded-box border border-base-300">
          {projects.map((project) => (
            <li
              key={project.id}
              className="flex items-center gap-3 transition-colors hover:bg-base-200/40"
            >
              {/* The row opens the project; the action on the right is the
                  one thing worth doing from this list, kept as a sibling
                  because a link cannot sit inside a link. */}
              <Link
                to="/p/$projectId"
                params={{ projectId: project.id }}
                className="flex min-w-0 flex-1 flex-col p-3"
              >
                <span className="flex items-center gap-2">
                  <span className="truncate font-medium">{project.name}</span>
                  {/* With one project "active" is not information. */}
                  {projects.length > 1 && project.id === currentProjectId ? (
                    <StatusPill tone="neutral" label={t("Etkin")} />
                  ) : null}
                </span>
                <span className="truncate text-xs text-muted">
                  {project.domain ?? t("Site eklenmedi")}
                </span>
                <ProjectFacts overview={overviewOf(project.id)} />
              </Link>
              <Link
                to="/p/$projectId/settings"
                params={{ projectId: project.id }}
                className="btn btn-ghost btn-sm mr-2 shrink-0"
              >
                {project.domain ? t("Ayarlar") : t("Site ekle")}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <ArchivedProjects />

      {creating ? (
        <CreateProjectModal onClose={() => setCreating(false)} />
      ) : null}
    </PageShell>
  );
}

function ArchivedProjects() {
  const queryClient = useQueryClient();
  const archivedQuery = useQuery({
    queryKey: ["projects", "archived"],
    queryFn: () => getArchivedProjects(),
  });
  const archived = archivedQuery.data ?? [];

  const restoreMutation = useMutation({
    mutationFn: (projectId: string) =>
      restoreProject({ data: { archivedProjectId: projectId } }),
    onSuccess: async () => {
      // Prefix match invalidates both the active and archived lists.
      await queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success(t("Proje geri alındı"));
    },
    onError: (error) =>
      toast.error(getStandardErrorMessage(error, t("Proje geri alınamadı"))),
  });

  // A failed read used to make the section vanish, which reads as "nothing
  // archived" -- the one answer that sends nobody looking.
  if (archivedQuery.isError && archived.length === 0) {
    return (
      <section className="space-y-3">
        <h2 className="text-sm font-medium text-muted">{t("Arşivlendi")}</h2>
        <div className="rounded-box border border-base-300">
          <QueryErrorState
            compact
            title={t("Arşivlenen projeler yüklenemedi")}
            error={archivedQuery.error}
            onRetry={() => void archivedQuery.refetch()}
          />
        </div>
      </section>
    );
  }
  if (archived.length === 0) return null;

  return (
    <section className="space-y-3">
      <h2 className="text-sm font-medium text-muted">{t("Arşivlendi")}</h2>
      <ul className="divide-y divide-base-300 overflow-hidden rounded-box border border-base-300">
        {archived.map((project) => (
          <li
            key={project.id}
            className="flex items-center justify-between gap-3 p-3"
          >
            <span className="flex min-w-0 flex-col">
              <span className="truncate font-medium text-muted">
                {project.name}
              </span>
              <span className="truncate text-xs text-muted">
                {project.domain ?? t("Site eklenmedi")}
              </span>
            </span>
            <button
              type="button"
              className="btn btn-ghost btn-sm shrink-0"
              onClick={() => restoreMutation.mutate(project.id)}
              disabled={restoreMutation.isPending}
            >
              {restoreMutation.isPending &&
              restoreMutation.variables === project.id ? (
                <Spinner delay={false} />
              ) : null}
              {t("Geri al")}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
