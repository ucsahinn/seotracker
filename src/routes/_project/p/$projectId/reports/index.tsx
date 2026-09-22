import { PageShell } from "@/client/components/PageShell";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ReportsList } from "@/client/features/reports/ReportsList";
import {
  DeleteReportModal,
  reportsQueryKey,
  useDeleteReport,
} from "@/client/features/reports/shared";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { listReports, type ReportListItem } from "@/serverFunctions/reports";
import { REPORT_APP_LIST_LIMIT } from "@/types/schemas/reports";

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
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Raporlar</h1>
          <p className="text-sm text-base-content/70">
            Ajanlarınızın bu projeye kaydettiği HTML raporlar.
          </p>
        </div>
        <Link
          to="/p/$projectId/reports/templates"
          params={{ projectId }}
          className="btn btn-ghost btn-sm"
        >
          Şablonlar
        </Link>
      </div>

      {reportsQuery.isPending ? (
        <div className="space-y-2" aria-busy>
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="skeleton h-14" />
          ))}
        </div>
      ) : reportsQuery.isError ? (
        <div className="alert alert-error">
          <span className="text-sm">
            {getStandardErrorMessage(
              reportsQuery.error,
              "Raporlar yüklenemedi",
            )}
          </span>
        </div>
      ) : (
        <ReportsList
          projectId={projectId}
          reports={reportsQuery.data.reports}
          onDelete={setPendingDelete}
        />
      )}

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
