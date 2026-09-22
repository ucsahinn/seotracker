import { PageShell } from "@/client/components/PageShell";
import * as React from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronRight, FolderPlus, Plus } from "lucide-react";
import { EmptyState } from "@/client/components/EmptyState";
import { QueryErrorState } from "@/client/components/QueryErrorState";
import { toast } from "sonner";
import {
  getArchivedProjects,
  getProjects,
  restoreProject,
} from "@/serverFunctions/projects";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { getLastProjectId } from "@/client/lib/active-project";
import { CreateProjectModal } from "@/client/features/projects/CreateProjectModal";

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

  return (
    <PageShell width="reading">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Projeler</h1>
          <p className="mt-1 text-sm text-muted">
            Her projenin kendi Search Console bağlantısı, arama performansı
            verisi ve site denetimleri olur.
          </p>
        </div>
        <button
          type="button"
          className="btn btn-primary btn-sm shrink-0"
          onClick={() => setCreating(true)}
        >
          <Plus className="size-4" />
          Yeni proje
        </button>
      </div>

      {projectsQuery.isLoading ? (
        <div className="space-y-2" aria-busy>
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="skeleton h-14" />
          ))}
        </div>
      ) : projectsQuery.isError ? (
        <QueryErrorState
          error={projectsQuery.error}
          onRetry={() => void projectsQuery.refetch()}
          title="Projeler yüklenemedi"
        />
      ) : projects.length === 0 ? (
        // Reachable only through a failure upstream, since the loader
        // guarantees one project - but a bare 1px box said nothing at all.
        <EmptyState
          icon={FolderPlus}
          title="Henüz proje yok"
          description="Bir proje oluşturun, sonra sitesini ekleyin."
        />
      ) : (
        <ul className="divide-y divide-base-300 overflow-hidden rounded-box border border-base-300">
          {projects.map((project) => (
            <li key={project.id}>
              <Link
                to="/p/$projectId/settings"
                params={{ projectId: project.id }}
                className="flex items-center justify-between gap-3 p-3 transition-colors hover:bg-base-200/40"
              >
                <span className="flex min-w-0 flex-col">
                  <span className="flex items-center gap-2">
                    <span className="truncate font-medium">{project.name}</span>
                    {project.id === currentProjectId ? (
                      <span className="shrink-0 rounded-full bg-base-300/70 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted">
                        Etkin
                      </span>
                    ) : null}
                  </span>
                  <span className="truncate text-xs text-muted">
                    {project.domain ?? "Site belirlenmemiş"}
                  </span>
                </span>
                <ChevronRight className="size-4 shrink-0 text-muted" />
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
      toast.success("Proje geri alındı");
    },
    onError: (error) =>
      toast.error(getStandardErrorMessage(error, "Proje geri alınamadı")),
  });

  if (archived.length === 0) return null;

  return (
    <section className="space-y-3">
      <h2 className="text-sm font-medium text-muted">Arşivlendi</h2>
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
                {project.domain ?? "Site belirlenmemiş"}
              </span>
            </span>
            <button
              type="button"
              className="btn btn-ghost btn-sm shrink-0"
              onClick={() => restoreMutation.mutate(project.id)}
              disabled={restoreMutation.isPending}
            >
              Geri al
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
