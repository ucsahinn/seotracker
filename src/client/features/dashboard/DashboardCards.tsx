import { Link } from "@tanstack/react-router";
import { AlertCircle, Check, Loader2 } from "lucide-react";
import { SearchConsoleConnectionCard } from "@/client/features/gsc/SearchConsoleConnectionCard";
import { AUDIT_ISSUE_TYPES } from "@/shared/audit-issues";
import {
  CardShell,
  EmptyCardBody,
  formatDay,
  moreDetailsClass,
} from "@/client/features/dashboard/cardParts";
import { SeverityBar } from "@/client/features/dashboard/SeverityBar";
import { useFlashOnChange } from "@/client/components/useFlashOnChange";
import { formatCount } from "@/client/lib/format";
import { extractPathname } from "@/client/features/audit/shared";
import { SEVERITY_LABEL } from "@/client/features/audit/results/IssuesView";
import type { DashboardAuditSummary } from "@/types/schemas/dashboard";

// Plain string-keyed view of the registry: issue types from the DB are not
// statically guaranteed to be registry keys.
const issueTitles: Record<string, string | undefined> = Object.fromEntries(
  Object.entries(AUDIT_ISSUE_TYPES).map(([key, value]) => [key, value.title]),
);

/**
 * The Search Console pitch, for a project that has not connected it.
 *
 * It used to carry a four-stat body as well, behind a `connected` prop --
 * and the one call site passes `connected={false}` literally, because when
 * Search Console *is* connected those numbers are already in the metric row
 * above and the card would only repeat them. So the body could never render.
 * Deleted rather than left as a second, drifting copy of the metric row.
 */
export function GscCard({ projectId }: { projectId: string }) {
  return (
    <div id="connect-gsc">
      <SearchConsoleConnectionCard projectId={projectId} />
    </div>
  );
}

export function AuditHealthCard({
  projectId,
  audit,
}: {
  projectId: string;
  audit: DashboardAuditSummary | null;
}) {
  if (!audit) {
    return (
      <CardShell title="Site denetimi">
        <EmptyCardBody
          message="Kırık bağlantılar, eksik etiketler ve dizine girme sorunları için sitenizi tarayın."
          cta={
            <Link
              to="/p/$projectId/audit"
              params={{ projectId }}
              className="btn btn-primary btn-sm"
            >
              Denetimi başlat
            </Link>
          }
        />
      </CardShell>
    );
  }

  return <RunningAuditCard projectId={projectId} audit={audit} />;
}

function RunningAuditCard({
  projectId,
  audit,
}: {
  projectId: string;
  audit: DashboardAuditSummary;
}) {
  /*
   * The overview is polled every 5s while a crawl runs, and this is what that
   * poll can change: status, pages crawled and the findings. The body tints
   * once when any of them moves, so the operator who looks back sees that
   * something landed. Not on first paint, not on a refetch that changed nothing.
   */
  const { critical, warning, info } = audit.severityTotals;
  const flash = useFlashOnChange(
    `${audit.status}:${audit.pagesCrawled}:${critical}:${warning}:${info}`,
  );
  return (
    <CardShell
      title="Site denetimi"
      // Not prefixed with "Site denetimi": CardShell renders that as the
      // title directly above, so the one metadata line was spending its
      // first third repeating it.
      stamp={
        audit.status === "completed"
          ? `${formatCount(audit.pagesCrawled)} sayfa tarandı · ${formatDay(audit.startedAt)}`
          : audit.status === "running"
            ? "denetim sürüyor"
            : "son denetim başarısız"
      }
      action={
        <Link
          to="/p/$projectId/audit"
          params={{ projectId }}
          // The audit this card is about, not the launch form. Without the
          // id, clicking through from "474 sayfa tarandı · 3 kritik" landed
          // on a page asking you to start a new crawl.
          search={{ auditId: audit.auditId, tab: "issues" as const }}
          className={moreDetailsClass}
        >
          Ayrıntılar
        </Link>
      }
    >
      <div key={flash.key} className={flash.className}>
        {/* An empty issue list only means "healthy" for an audit that finished.
          A crawl still running has not looked yet, and one that failed at
          discovery never looked at all -- both used to get the green check,
          the second of them directly under a stamp reading "başarısız". */}
        {audit.status === "running" ? (
          <div className="flex items-center gap-2 text-sm text-muted">
            <Loader2 className="size-4 animate-spin" />
            Denetim sürüyor, sonuçlar bittiğinde görünecek.
          </div>
        ) : audit.status !== "completed" ? (
          <div className="flex items-center gap-2 text-sm text-muted">
            {/*
             * Measured at 2.69:1 on base-100 in the light theme, under the
             * 3:1 SC 1.4.11 asks of a meaningful graphic. The text beside it
             * carries the same meaning, so nothing was lost -- but the ink
             * token is 8.49:1 and costs nothing.
             */}
            <AlertCircle className="size-4 text-[var(--ink-warning)]" />
            Son denetim tamamlanamadı, bu yüzden sonuç yok.
          </div>
        ) : audit.topIssues.length === 0 ? (
          <div className="flex items-center gap-2 text-sm text-muted">
            <Check className="size-4 text-success" />
            Sorun bulunamadı, siteniz sağlıklı görünüyor.
          </div>
        ) : (
          <ul className="space-y-2">
            {audit.topIssues.map((issue) => (
              <li key={issue.issueType}>
                <Link
                  to="/p/$projectId/audit"
                  params={{ projectId }}
                  search={{ auditId: audit.auditId, tab: "issues" as const }}
                  className="flex items-center justify-between gap-2 rounded-field px-1 py-0.5 text-sm transition-colors hover:bg-base-200/60"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <span
                      className={`size-2 shrink-0 rounded-full ${
                        issue.severity === "critical"
                          ? "bg-error"
                          : issue.severity === "warning"
                            ? "bg-warning"
                            : "bg-base-content/30"
                      }`}
                      aria-hidden
                    />
                    {/* The dot alone carried severity: no text, no accessible
                      name. The house rule says direction is never colour
                      alone, and rank is no different. */}
                    <span className="sr-only">
                      {SEVERITY_LABEL[issue.severity]}:{" "}
                    </span>
                    <span className="truncate">
                      {issueTitles[issue.issueType] ?? issue.issueType}
                    </span>
                  </span>
                  <span className="shrink-0 tabular-nums text-muted">
                    {formatCount(issue.count)} sayfa
                  </span>
                </Link>
              </li>
            ))}
            {/* Severity across every finding, not just the three above. The
              overflow line used to hide whether the rest held criticals. */}
            {audit.totalIssueTypes > audit.topIssues.length ? (
              <li>
                <Link
                  to="/p/$projectId/audit"
                  params={{ projectId }}
                  search={{ auditId: audit.auditId, tab: "issues" as const }}
                  className="text-xs text-muted underline decoration-base-content/25 underline-offset-4 hover:text-base-content"
                >
                  +{" "}
                  {formatCount(audit.totalIssueTypes - audit.topIssues.length)}{" "}
                  sorun daha
                </Link>
              </li>
            ) : null}
            <li>
              <SeverityBar
                projectId={projectId}
                auditId={audit.auditId}
                totals={audit.severityTotals}
              />
            </li>
          </ul>
        )}

        {audit.topPages.length > 0 ? (
          <div className="mt-4 space-y-2 border-t border-base-300 pt-3">
            {/* The card named issue types and never pages, yet opening a page
              is always the next move. Worst severity first, then count. */}
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
              En çok sorunu olan sayfalar
            </h3>
            <ul className="space-y-1">
              {audit.topPages.map((page) => (
                <li key={page.pageUrl}>
                  <Link
                    to="/p/$projectId/audit"
                    params={{ projectId }}
                    search={{ auditId: audit.auditId, tab: "pages" as const }}
                    className="flex items-center justify-between gap-2 rounded-field px-1 py-0.5 text-sm transition-colors hover:bg-base-200/60"
                    title={page.pageUrl}
                  >
                    <span className="min-w-0 truncate text-muted">
                      {extractPathname(page.pageUrl)}
                    </span>
                    <span className="shrink-0 tabular-nums text-muted">
                      {formatCount(page.issueCount)} sorun
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </CardShell>
  );
}
