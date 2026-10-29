import { sort as sortProjects } from "remeda";
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
import {
  LINK_CLASS,
  ProjectFacts,
} from "@/client/features/projects/ProjectFacts";
import { invalidateProjectLists } from "@/client/features/projects/projectQueries";
import { t } from "@/shared/i18n";

export const Route = createFileRoute("/_app/projects")({
  component: ProjectsPage,
});

function ProjectsPage() {
  const [search, setSearch] = React.useState("");
  const [sort, setSort] = React.useState("name");
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
  const overviewById = new Map(
    overviewQuery.data?.map((row) => [row.projectId, row]),
  );
  const visible = sortProjects(
    projects.filter((project) =>
      (project.name + " " + (project.domain ?? ""))
        .toLowerCase()
        .includes(search.toLowerCase()),
    ),
    (a, b) =>
      (sort === "domain" ? (a.domain ?? "") : a.name).localeCompare(
        sort === "domain" ? (b.domain ?? "") : b.name,
      ),
  );
  const refresh = async () => {
    await Promise.all([projectsQuery.refetch(), overviewQuery.refetch()]);
  };

  return (
    <PageShell width="reading">
      <PageHeader
        title={t("Projeler")}
        description={t(
          "Sitelerinizi açın; arşiv verisini, son denetimi ve eksik bağlantıları burada görün.",
        )}
        actions={
          <PageActions>
            <RefreshButton
              onRefresh={() => void refresh()}
              isFetching={projectsQuery.isFetching || overviewQuery.isFetching}
            />
            <button
              type="button"
              className="btn btn-primary btn-sm min-h-11 shrink-0"
              onClick={() => setCreating(true)}
            >
              <Plus className="size-4" />
              {t("Yeni proje")}
            </button>
          </PageActions>
        }
      />

      {projects.length > 1 ? (
        <div className="mb-4 grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium">{t("Proje ara")}</span>
            <input
              type="search"
              className="input input-bordered w-full"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t("Ad veya alan adı")}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium">{t("Sırala")}</span>
            <select
              className="select select-bordered w-full"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              <option value="name">{t("Ad")}</option>
              <option value="domain">{t("Alan adı")}</option>
            </select>
          </label>
        </div>
      ) : null}
      {projectsQuery.isError && projectsQuery.data ? (
        <p role="status" className="text-sm text-muted">
          {t(
            "Liste yenilenemedi; son alınan projeler gösteriliyor. Yeniden deneyin.",
          )}
        </p>
      ) : null}
      {overviewQuery.isError ? (
        <p role="status" className="text-sm text-muted">
          {t(
            "Proje verileri yenilenemedi. Listeyi yenileyerek yeniden deneyin.",
          )}
        </p>
      ) : null}
      {projectsQuery.isLoading ? (
        <Skeleton variant="list" rows={4} />
      ) : projectsQuery.isError && !projectsQuery.data ? (
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
        <div className="space-y-4">
          {visible.length === 0 ? (
            <p role="status" className="text-sm text-muted">
              {t("Bu aramayla eşleşen proje yok. Aramayı değiştirin.")}
            </p>
          ) : null}
          <ul className="space-y-3">
            {visible.map((project) => {
              const overview = overviewById.get(project.id);
              return (
                <li
                  key={project.id}
                  className="space-y-3 rounded-box border border-[var(--hairline)] bg-base-100 p-4"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <Link
                        to="/p/$projectId"
                        params={{ projectId: project.id }}
                        className="block break-all font-semibold focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
                      >
                        {project.name}
                      </Link>
                      <p className="break-all text-sm text-muted">
                        {project.domain ??
                          t("Site eklenmedi. Bu proje için bir site seçin.")}
                      </p>
                    </div>
                    {projects.length > 1 && project.id === currentProjectId ? (
                      <StatusPill tone="neutral" label={t("Son açılan")} />
                    ) : null}
                  </div>
                  <ProjectFacts
                    overview={overview}
                    loading={overviewQuery.isPending}
                    failed={overviewQuery.isError}
                    onRetry={() => void overviewQuery.refetch()}
                    primaryAction={
                      !project.domain ? (
                        <Link
                          to="/p/$projectId/settings"
                          params={{ projectId: project.id }}
                          className="btn btn-primary btn-sm min-h-11"
                        >
                          {t("Site ekle")}
                        </Link>
                      ) : overview?.searchConsole === false ? (
                        <Link
                          to="/p/$projectId/settings/integrations"
                          params={{ projectId: project.id }}
                          hash="search-console"
                          className="btn btn-primary btn-sm min-h-11"
                        >
                          {t("Search Console bağla")}
                        </Link>
                      ) : (
                        <Link
                          to="/p/$projectId"
                          params={{ projectId: project.id }}
                          className="btn btn-primary btn-sm min-h-11"
                        >
                          {t("Paneli aç")}
                        </Link>
                      )
                    }
                    links={
                      <>
                        <Link
                          to="/p/$projectId/context"
                          params={{ projectId: project.id }}
                          className={LINK_CLASS}
                        >
                          {t("Proje bilgisi")}
                        </Link>
                        <Link
                          to="/p/$projectId/settings"
                          params={{ projectId: project.id }}
                          className={LINK_CLASS}
                        >
                          {t("Ayarlar")}
                        </Link>
                      </>
                    }
                  />
                </li>
              );
            })}
          </ul>
        </div>
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
      await invalidateProjectLists(queryClient);
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
        <div className="rounded-box border border-[var(--hairline)]">
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
      {archivedQuery.isError ? (
        <QueryErrorState
          compact
          title={t(
            "Arşivlenen liste yenilenemedi; son alınan liste gösteriliyor",
          )}
          error={archivedQuery.error}
          onRetry={() => void archivedQuery.refetch()}
        />
      ) : null}
      <ul className="divide-y divide-[var(--hairline)] overflow-hidden rounded-box border border-[var(--hairline)]">
        {archived.map((project) => (
          <li
            key={project.id}
            className="flex items-center justify-between gap-3 p-3"
          >
            <span className="flex min-w-0 flex-col">
              <span className="break-all font-medium text-muted">
                {project.name}
              </span>
              <span className="break-all text-xs text-muted">
                {project.domain ?? t("Site eklenmedi")}
              </span>
            </span>
            <button
              type="button"
              className="btn btn-ghost btn-sm min-h-11 shrink-0"
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
