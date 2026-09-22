import { PageShell } from "@/client/components/PageShell";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ExternalLink,
  FileDown,
  Maximize2,
  Minimize2,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { z } from "zod";
import { PortalMenu } from "@/client/components/PortalMenu";
import { ReportViewer } from "@/client/features/reports/ReportViewer";
import {
  DeleteReportModal,
  formatCreatedBy,
  reportQueryKey,
  useDeleteReport,
} from "@/client/features/reports/shared";
import { formatDateTime, formatRelativeTime } from "@/client/lib/format";
import {
  getErrorCode,
  getStandardErrorMessage,
} from "@/client/lib/error-messages";
import { captureClientEvent } from "@/client/lib/observability";
import { getReport } from "@/serverFunctions/reports";

// Expand lives in the URL, not in state, so a refresh (or a link someone
// pasted) comes back expanded.
const reportDetailSearchSchema = z.object({ full: z.boolean().optional() });

export const Route = createFileRoute(
  "/_project/p/$projectId/reports/$reportId",
)({
  validateSearch: reportDetailSearchSchema,
  component: ReportDetailPage,
});

function ReportDetailPage() {
  const { projectId, reportId } = Route.useParams();
  const { full } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const [showDelete, setShowDelete] = useState(false);
  const openedRef = useRef<string | null>(null);
  const exitRef = useRef<HTMLButtonElement>(null);

  const reportQuery = useQuery({
    queryKey: reportQueryKey(projectId, reportId),
    queryFn: () => getReport({ data: { projectId, reportId } }),
    // The report may have been replaced by an agent seconds ago; the app-wide
    // 5-minute staleTime would show the previous metadata as current.
    staleTime: 0,
    // A deleted report is a NOT_FOUND, not a flake; retrying it only delays the
    // not-found copy by several seconds.
    retry: false,
  });
  const report = reportQuery.data;

  const deleteMutation = useDeleteReport(projectId, () => {
    setShowDelete(false);
    // `replace`, so Back does not return to the deleted report's URL.
    void navigate({
      to: "/p/$projectId/reports",
      params: { projectId },
      replace: true,
    });
  });

  // useCallback so the Esc listener below is not re-registered every render.
  const setExpanded = useCallback(
    (expanded: boolean) => {
      void navigate({
        search: () => (expanded ? { full: true } : {}),
        replace: true,
      });
    },
    [navigate],
  );

  // One open event per report, once its metadata (and so its skill) is known.
  useEffect(() => {
    if (!report || openedRef.current === report.id) return;
    openedRef.current = report.id;
    captureClientEvent("report:opened", {
      project_id: projectId,
      report_id: report.id,
      skill: report.skill,
    });
  }, [projectId, report]);

  // Esc leaves the expanded view, the same key Modal.tsx uses to close. The
  // listener is on the parent window, and the expanded body is almost entirely
  // the sandboxed iframe: one click inside moves focus into the frame, which
  // has no scripts and so cannot forward the key. Focusing Exit on entry keeps
  // Esc working until the reader clicks into the report; Exit is the
  // guaranteed path.
  useEffect(() => {
    if (!full) return;
    exitRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || event.defaultPrevented) return;
      event.preventDefault();
      setExpanded(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [full, setExpanded]);

  if (reportQuery.isPending) {
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-md" />
      </div>
    );
  }

  if (reportQuery.isError || !report) {
    return (
      <PageShell width="reading">
        <div className="alert alert-error">
          <span className="text-sm">
            {/* A deleted report and another project's report are the
                  same answer on purpose, so ids cannot be probed. */}
            {getErrorCode(reportQuery.error) === "NOT_FOUND"
              ? "Bu rapor yok ya da bu rapora erişiminiz yok."
              : getStandardErrorMessage(reportQuery.error, "Rapor yüklenemedi")}
          </span>
        </div>
        <Link
          to="/p/$projectId/reports"
          params={{ projectId }}
          className="btn btn-ghost btn-sm"
        >
          &larr; Raporlara dön
        </Link>
      </PageShell>
    );
  }

  // `?print=1` serves the same document with a print() script appended, so the
  // new tab opens the print dialog itself.
  const exportPdf = () => {
    captureClientEvent("report:exported_pdf", {
      project_id: projectId,
      report_id: report.id,
    });
    window.open(`/r/${report.id}?print=1`, "_blank", "noopener");
  };

  if (full) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-base-100">
        <div className="flex items-center justify-between gap-3 border-b border-base-300 px-4 py-2">
          <span className="truncate text-sm font-medium">{report.title}</span>
          <button
            type="button"
            ref={exitRef}
            className="btn btn-ghost btn-sm gap-1.5"
            onClick={() => setExpanded(false)}
          >
            <Minimize2 className="size-4" />
            Çık
          </button>
        </div>
        <div className="min-h-0 flex-1 p-2">
          <ReportViewer
            src={`/r/${report.id}`}
            title={report.title}
            className="h-full w-full bg-base-100"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col gap-3 px-4 py-4 md:px-6 md:py-6">
      <div className="space-y-3">
        <Link
          to="/p/$projectId/reports"
          params={{ projectId }}
          className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-base-content"
        >
          <ChevronLeft className="size-4" />
          Raporlar
        </Link>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold">{report.title}</h1>
            <dl className="mt-1.5 flex flex-wrap items-baseline gap-x-6 gap-y-1 text-sm">
              <div className="flex items-baseline gap-1.5">
                <dt className="text-muted">Oluşturan</dt>
                <dd>{formatCreatedBy(report)}</dd>
              </div>
              <div className="flex items-baseline gap-1.5">
                <dt className="text-muted">Tür</dt>
                {/* As in the list's Type column: the template name when the
                    report followed one, else the skill, else an em dash. */}
                <dd>{report.templateName ?? report.skill ?? "—"}</dd>
              </div>
              <div className="flex items-baseline gap-1.5">
                <dt className="text-muted">Güncellenme</dt>
                <dd title={formatDateTime(report.updatedAt)}>
                  {formatRelativeTime(report.updatedAt)}
                </dd>
              </div>
            </dl>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              className="btn btn-primary btn-sm gap-1.5"
              onClick={exportPdf}
            >
              <FileDown className="size-4" />
              Dışa aktar
            </button>
            <PortalMenu
              ariaLabel="Rapor işlemleri"
              triggerClassName="btn btn-ghost btn-sm btn-square"
              triggerContent={<MoreHorizontal className="size-4" />}
              menuClassName="w-52"
            >
              {(close) => (
                <>
                  <li>
                    <button
                      onClick={() => {
                        close();
                        setExpanded(true);
                      }}
                    >
                      <Maximize2 className="size-4" />
                      Tam ekran
                    </button>
                  </li>
                  <li>
                    <a
                      href={`/r/${report.id}`}
                      target="_blank"
                      rel="noreferrer"
                      onClick={close}
                    >
                      <ExternalLink className="size-4" />
                      Yeni sekmede aç
                    </a>
                  </li>
                  <li role="separator" className="mx-1 my-1 h-px bg-base-300" />
                  <li>
                    <button
                      className="text-error"
                      onClick={() => {
                        close();
                        setShowDelete(true);
                      }}
                    >
                      <Trash2 className="size-4" />
                      Sil
                    </button>
                  </li>
                </>
              )}
            </PortalMenu>
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1">
        <ReportViewer src={`/r/${report.id}`} title={report.title} />
      </div>

      {showDelete ? (
        <DeleteReportModal
          title={report.title}
          isPending={deleteMutation.isPending}
          onClose={() => setShowDelete(false)}
          onConfirm={() => deleteMutation.mutate(report.id)}
        />
      ) : null}
    </div>
  );
}
