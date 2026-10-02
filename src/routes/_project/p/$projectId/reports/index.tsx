import { PageHeader, PageShell } from "@/client/components/PageShell";
import { CopyButton } from "@/client/components/CopyButton";
import { reportRequestPrompt } from "@/client/features/reports/reportRequestPrompt";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ReportsList } from "@/client/features/reports/ReportsList";
import { ReportKindsHelp } from "@/client/features/reports/ReportKindsHelp";
import { ReportsSummarySkeleton } from "@/client/features/reports/ReportsSummary";
import {
  DeleteReportModal,
  reportsQueryKey,
  useDeleteReport,
} from "@/client/features/reports/shared";
import { listReports, type ReportListItem } from "@/serverFunctions/reports";
import { REPORT_APP_LIST_LIMIT } from "@/types/schemas/reports";
import { QueryErrorState } from "@/client/components/QueryErrorState";

export const Route = createFileRoute("/_project/p/$projectId/reports/")({
  component: ReportsPage,
});

function ReportsPage() {
  const { projectId } = Route.useParams();
  const [pendingDelete, setPendingDelete] = useState<ReportListItem | null>(
    null,
  );

  const reportsQuery = useQuery({
    queryKey: reportsQueryKey(projectId),
    queryFn: () =>
      listReports({ data: { projectId, limit: REPORT_APP_LIST_LIMIT } }),
    // This page exists to inspect what an agent just wrote; the app-wide
    // 5-minute staleTime would show a pre-save list as current.
    staleTime: 0,
  });

  const deleteMutation = useDeleteReport(projectId, () =>
    setPendingDelete(null),
  );

  return (
    <PageShell>
      <PageHeader
        title="Raporlar"
        description="Projeniz için hazırlanmış SEO raporları. Her raporu buradan açabilir, indirebilir ya da silebilirsiniz."
        actions={
          <div className="flex items-center gap-2">
            {/* With no reports the empty state carries this primary action. */}
            {reportsQuery.data?.reports.length === 0 ? null : (
              <CopyButton
                primary
                value={reportRequestPrompt(projectId)}
                label="Yeni rapor iste"
                successMessage="İstem kopyalandı, ajanınıza yapıştırın"
              />
            )}
            <Link
              to="/p/$projectId/reports/templates"
              params={{ projectId }}
              className="btn btn-ghost btn-sm"
            >
              Şablonlar
            </Link>
          </div>
        }
      />

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
            title="Raporlar yüklenemedi"
          />
        </div>
      ) : (
        <ReportsList
          projectId={projectId}
          reports={reportsQuery.data.reports}
          onDelete={setPendingDelete}
        />
      )}

      <ReportKindsHelp />

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
