import { PageShell } from "@/client/components/PageShell";
import { QueryErrorState } from "@/client/components/QueryErrorState";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ExternalLink,
  Link2,
  Maximize2,
  MoreHorizontal,
  Printer,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { PortalMenu } from "@/client/components/PortalMenu";
import { ReportDownloadButton } from "@/client/features/reports/ReportDownloadButton";
import { ReportFullscreen } from "@/client/features/reports/ReportFullscreen";
import { ReportKindChip } from "@/client/features/reports/ReportKindChip";
import { hasTemplate, reportKind } from "@/client/features/reports/reportStats";
import { ReportViewer } from "@/client/features/reports/ReportViewer";
import {
  DeleteReportModal,
  formatCreatedBy,
  reportQueryKey,
  useDeleteReport,
} from "@/client/features/reports/shared";
import {
  formatBytes,
  formatDateTime,
  formatRelativeTime,
} from "@/client/lib/format";
import { getErrorCode } from "@/client/lib/error-messages";
import { captureClientEvent } from "@/client/lib/observability";
import { booleanSearchParamSchema } from "@/types/schemas/search-params";
import { getReport } from "@/serverFunctions/reports";
import { backLinkClass, BackLinkLabel } from "@/client/components/BackLink";

// Expand lives in the URL, not in state, so a refresh (or a link someone
// pasted) comes back expanded.
const reportDetailSearchSchema = z.object({
  full: booleanSearchParamSchema.optional().catch(undefined),
});

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
  const titleRef = useRef<HTMLHeadingElement>(null);
  const wasFullRef = useRef(false);

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

  // The normal view (and with it the button that opened the expanded one) is
  // unmounted while expanded, so on leaving, focus goes to the page title
  // rather than falling back to <body>.
  useEffect(() => {
    if (wasFullRef.current && !full) titleRef.current?.focus();
    wasFullRef.current = Boolean(full);
  }, [full]);

  if (!report && reportQuery.isPending) {
    // Shaped like the viewer: the back link, the title row, then the report
    // itself filling the rest of the height.
    return (
      <PageShell width="fill">
        <div className="flex h-full min-h-0 flex-col gap-3" aria-busy>
          <div className="skeleton h-4 w-24" />
          <div className="skeleton h-8 w-72" />
          <div className="skeleton min-h-0 flex-1" />
        </div>
      </PageShell>
    );
  }

  // Gate on missing data, not on the error flag: a failed background refetch
  // keeps the loaded report and must not replace it with an error screen.
  if (!report) {
    const notFound = getErrorCode(reportQuery.error) === "NOT_FOUND";
    return (
      <PageShell width="reading">
        <Link
          to="/p/$projectId/reports"
          params={{ projectId }}
          className={backLinkClass}
        >
          <BackLinkLabel>Raporlar</BackLinkLabel>
        </Link>
        {notFound ? (
          // A deleted report and another project's report are the same
          // answer on purpose, so ids cannot be probed.
          <div className="alert alert-error">
            <span className="text-sm">
              Bu rapor bulunamadı. Silinmiş olabilir ya da başka bir projeye ait
              olabilir.
            </span>
          </div>
        ) : (
          <div className="rounded-box border border-base-300 bg-base-100">
            <QueryErrorState
              error={reportQuery.error}
              onRetry={() => void reportQuery.refetch()}
              title="Rapor yüklenemedi"
            />
          </div>
        )}
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
      <ReportFullscreen report={report} onExit={() => setExpanded(false)} />
    );
  }

  /*
   * `PageShell width="fill"` rather than a fourth padding written out here.
   * The iframe has to own the height, which the shell's bottom padding and
   * centring max-width fought -- so this route had `md:px-6 md:py-6`, a
   * padding used nowhere else, written twice so the skeleton and the loaded
   * view could drift apart.
   */
  return (
    <PageShell width="fill">
      <div className="flex h-full min-h-0 flex-col gap-3">
        <div className="space-y-3">
          <Link
            to="/p/$projectId/reports"
            params={{ projectId }}
            className={backLinkClass}
          >
            <BackLinkLabel>Raporlar</BackLinkLabel>
          </Link>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <h1
                ref={titleRef}
                tabIndex={-1}
                className="text-2xl font-semibold [overflow-wrap:anywhere] focus:outline-none"
              >
                {report.title}
              </h1>
              <dl className="mt-1.5 flex flex-wrap items-baseline gap-x-6 gap-y-1 text-sm">
                <div className="flex items-baseline gap-1.5">
                  <dt className="text-muted">Oluşturan</dt>
                  <dd>{formatCreatedBy(report)}</dd>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <dt className="text-muted">Tür</dt>
                  {/* As in the list's Type column: the template name when the
                    report followed one, else the skill, else an em dash. */}
                  <dd>
                    <ReportKindChip
                      kind={reportKind(report)}
                      isTemplate={hasTemplate(report)}
                    />
                  </dd>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <dt className="text-muted">Oluşturulma</dt>
                  <dd title={formatRelativeTime(report.createdAt)}>
                    {formatDateTime(report.createdAt)}
                  </dd>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <dt className="text-muted">Boyut</dt>
                  <dd>{formatBytes(report.sizeBytes)}</dd>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <dt className="text-muted">Güncellenme</dt>
                  <dd title={formatDateTime(report.updatedAt)}>
                    {formatRelativeTime(report.updatedAt)}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <ReportDownloadButton
                reportId={report.id}
                title={report.title}
                label="HTML olarak indir"
                primary
              />
              <button
                type="button"
                className="btn btn-sm hidden gap-1.5 md:inline-flex"
                onClick={exportPdf}
              >
                <Printer aria-hidden className="size-4" />
                PDF olarak kaydet (yazdır)
              </button>
              <a
                href={`/r/${report.id}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm hidden gap-1.5 md:inline-flex"
              >
                <ExternalLink aria-hidden className="size-4" />
                Yeni sekmede aç
              </a>
              <button
                type="button"
                className="btn btn-ghost btn-sm gap-1.5 text-[var(--ink-error)]"
                onClick={() => setShowDelete(true)}
              >
                <Trash2 aria-hidden className="size-4" />
                Sil
              </button>
              <PortalMenu
                ariaLabel="Diğer işlemler"
                triggerClassName="btn btn-ghost btn-sm btn-square"
                triggerContent={<MoreHorizontal className="size-4" />}
                menuClassName="w-56"
              >
                {(close) => (
                  <>
                    <li className="md:hidden">
                      <button
                        onClick={() => {
                          close();
                          exportPdf();
                        }}
                      >
                        <Printer className="size-4" />
                        PDF olarak kaydet (yazdır)
                      </button>
                    </li>
                    <li className="md:hidden">
                      <a
                        href={`/r/${report.id}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => close()}
                      >
                        <ExternalLink className="size-4" />
                        Yeni sekmede aç
                      </a>
                    </li>
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
                      <button
                        onClick={() => {
                          close();
                          // Undefined on a non-secure origin (http://LAN-IP),
                          // where calling it would throw before any .catch.
                          if (!navigator.clipboard?.writeText) {
                            toast.error("Bağlantı kopyalanamadı");
                            return;
                          }
                          void navigator.clipboard
                            .writeText(window.location.href)
                            .then(() => toast.success("Bağlantı kopyalandı"))
                            .catch(() => toast.error("Bağlantı kopyalanamadı"));
                        }}
                      >
                        <Link2 className="size-4" />
                        Bağlantıyı kopyala
                      </button>
                    </li>
                  </>
                )}
              </PortalMenu>
            </div>
          </div>
        </div>

        <div className="min-h-[70vh] flex-1">
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
    </PageShell>
  );
}
