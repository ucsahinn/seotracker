import { PageActions, RefreshButton } from "@/client/components/RefreshButton";
import { ReportsQuota } from "@/client/features/reports/ReportsQuota";
import { PageHeader, PageShell } from "@/client/components/PageShell";
import { CopyButton } from "@/client/components/CopyButton";
import { reportRequestPrompt } from "@/client/features/reports/reportRequestPrompt";
import { createFileRoute, Link } from "@tanstack/react-router";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ReportsList } from "@/client/features/reports/ReportsList";
import { ReportKindsHelp } from "@/client/features/reports/ReportKindsHelp";
import {
  ReportsSummary,
  ReportsSummarySkeleton,
} from "@/client/features/reports/ReportsSummary";
import {
  DeleteReportModal,
  reportsQueryKey,
  useDeleteReport,
} from "@/client/features/reports/shared";
import {
  listReportInventory,
  type ReportListItem,
} from "@/serverFunctions/reports";
import { reportInventorySchema } from "@/shared/reportInventory";
import { QueryErrorState } from "@/client/components/QueryErrorState";
import { getProjects } from "@/serverFunctions/projects";
import { t } from "@/shared/i18n";

export const Route = createFileRoute("/_project/p/$projectId/reports/")({
  validateSearch: reportInventorySchema.omit({ projectId: true }),
  component: ReportsPage,
});

function ReportsPage() {
  const { projectId } = Route.useParams();
  const projects = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
  });
  const project = projects.data?.find(
    (candidate) => candidate.id === projectId,
  );
  const filters = Route.useSearch();
  const navigate = Route.useNavigate();
  const [pendingDelete, setPendingDelete] = useState<ReportListItem | null>(
    null,
  );

  const reportsQuery = useQuery({
    queryKey: [...reportsQueryKey(projectId), filters],
    queryFn: () => listReportInventory({ data: { projectId, ...filters } }),
    // This page exists to inspect what an agent just wrote; the app-wide
    // 5-minute staleTime would show a pre-save list as current.
    staleTime: 0,
    placeholderData: keepPreviousData,
  });

  const deleteMutation = useDeleteReport(projectId, () =>
    setPendingDelete(null),
  );

  return (
    <PageShell>
      <PageHeader
        title={t("Raporlar")}
        description={t(
          "Hazırlanan raporlar. Her raporu açabilir, indirebilir ya da silebilirsiniz.",
        )}
        actions={
          <PageActions>
            <RefreshButton
              onRefresh={() => void reportsQuery.refetch()}
              isFetching={reportsQuery.isFetching}
              dataUpdatedAt={reportsQuery.dataUpdatedAt}
              shortcut
            />

            <CopyButton
              primary
              small
              value={reportRequestPrompt(projectId)}
              label={t("Rapor komutunu kopyala")}
              successMessage={t("Komut kopyalandı. Ajanınıza yapıştırın")}
            />
            <Link
              to="/p/$projectId/reports/templates"
              params={{ projectId }}
              className="btn btn-sm"
            >
              {t("Şablonlar")}
            </Link>
          </PageActions>
        }
      />

      {reportsQuery.data?.totalProject !== 0 ? (
        <div className="flex flex-wrap gap-2">
          <Link
            to="/p/$projectId/search-performance"
            params={{ projectId }}
            className="btn min-h-11"
          >
            {t("Arama raporu hazırla")}
          </Link>
          <Link
            to="/p/$projectId/audit"
            params={{ projectId }}
            className="btn min-h-11"
          >
            {t("Denetim raporu hazırla")}
          </Link>
        </div>
      ) : null}

      {!reportsQuery.data && reportsQuery.isPending ? (
        <div className="space-y-4">
          <div className="space-y-2" aria-busy>
            {Array.from({ length: 5 }, (_, index) => (
              <div key={index} className="skeleton h-16" />
            ))}
          </div>
          <ReportsSummarySkeleton />
        </div>
      ) : !reportsQuery.data ? (
        <div className="rounded-box border border-base-300 bg-base-100">
          <QueryErrorState
            error={reportsQuery.error}
            onRetry={() => void reportsQuery.refetch()}
            title={t("Raporlar yüklenemedi")}
          />
        </div>
      ) : (
        <div className="space-y-5">
          {reportsQuery.isError ? (
            <div role="alert" className="text-sm text-[var(--ink-warning)]">
              {t(
                "Liste yenilenemedi. Son alınan kayıtlar gösteriliyor; Yenile ile tekrar deneyin.",
              )}
            </div>
          ) : null}
          {reportsQuery.isPlaceholderData ? (
            <p role="status" className="text-sm text-muted">
              {t(
                "Filtreler uygulanıyor. Yeni sonuçlar gelene kadar önceki liste gösteriliyor.",
              )}
            </p>
          ) : null}
          <ReportsSummary
            projectId={projectId}
            latest={reportsQuery.data.latest}
            projectDomain={project?.domain}
          />
          <ReportsList
            projectId={projectId}
            inventory={reportsQuery.data}
            pending={reportsQuery.isPlaceholderData}
            filters={filters}
            onChange={(next) => void navigate({ search: next })}
            onDelete={setPendingDelete}
          />
        </div>
      )}

      <ReportKindsHelp />

      <ReportsQuota projectId={projectId} />

      {pendingDelete ? (
        <DeleteReportModal
          title={pendingDelete.title}
          isPending={deleteMutation.isPending}
          onClose={() => setPendingDelete(null)}
          onConfirm={() => deleteMutation.mutate(pendingDelete.id)}
        />
      ) : null}
    </PageShell>
  );
}
