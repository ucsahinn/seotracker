import { PageShell } from "@/client/components/PageShell";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import {
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
import {
  formatBytes,
  formatDateTime,
  formatRelativeTime,
} from "@/client/lib/format";
import {
  getErrorCode,
  getStandardErrorMessage,
} from "@/client/lib/error-messages";
import { captureClientEvent } from "@/client/lib/observability";
import { getReport } from "@/serverFunctions/reports";
import { backLinkClass, BackLinkLabel } from "@/client/components/BackLink";

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

  if (reportQuery.isError || !report) {
    return (
      <PageShell width="reading">
        <div className="alert alert-error">
          <span className="text-sm">
            {/* A deleted report and another project's report are the
                  same answer on purpose, so ids cannot be probed. */}
            {getErrorCode(reportQuery.error) === "NOT_FOUND"
              ? "Bu rapor bulunamadı. Silinmiş olabilir ya da başka bir projeye ait olabilir."
              : getStandardErrorMessage(reportQuery.error, "Rapor yüklenemedi")}
          </span>
        </div>
        <Link
          to="/p/$projectId/reports"
          params={{ projectId }}
          className="btn btn-ghost btn-sm"
        >
          ← Raporlara dön
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
          <div className="flex min-w-0 items-baseline gap-2">
            <span className="truncate text-sm font-medium">{report.title}</span>
            {/*
             * The age, which the normal view shows and this one dropped.
             * `?full=true` is a shareable link, and the report body is
             * agent-written HTML with no timestamp of its own -- so without
             * this a reader landing on that link sees a rendered SEO report
             * with no date anywhere and no way to tell it is a month old.
             */}
            <time
              dateTime={report.updatedAt}
              title={formatDateTime(report.updatedAt)}
              className="shrink-0 text-xs text-muted"
            >
              {formatRelativeTime(report.updatedAt)}
            </time>
          </div>
          <button
            type="button"
            ref={exitRef}
            className="btn btn-ghost btn-sm gap-1.5"
            onClick={() => setExpanded(false)}
          >
            <Minimize2 aria-hidden className="size-4" />
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
                  <dt className="text-muted">Oluşturulma</dt>
                  <dd title={formatDateTime(report.createdAt)}>
                    {formatRelativeTime(report.createdAt)}
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
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                className="btn btn-primary btn-sm gap-1.5"
                onClick={exportPdf}
              >
                <FileDown aria-hidden className="size-4" />
                PDF olarak kaydet
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
                    <li
                      role="separator"
                      className="mx-1 my-1 h-px bg-base-300"
                    />
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
    </PageShell>
  );
}
