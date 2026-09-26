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
import type { DashboardAuditSummary } from "@/server/features/dashboard/services/DashboardService";

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
              Denetim çalıştır
            </Link>
          }
        />
      </CardShell>
    );
  }

  return (
    <CardShell
      title="Site denetimi"
      stamp={`Site denetimi · ${
        audit.status === "completed"
          ? `${audit.pagesCrawled} sayfa tarandı · ${formatDay(audit.startedAt)}`
          : audit.status === "running"
            ? "tarama sürüyor"
            : "son tarama başarısız"
      }`}
      action={
        <Link
          to="/p/$projectId/audit"
          params={{ projectId }}
          className={moreDetailsClass}
        >
          Ayrıntılar
        </Link>
      }
    >
      {/* An empty issue list only means "healthy" for an audit that finished.
          A crawl still running has not looked yet, and one that failed at
          discovery never looked at all -- both used to get the green check,
          the second of them directly under a stamp reading "başarısız". */}
      {audit.status === "running" ? (
        <div className="flex items-center gap-2 text-sm text-muted">
          <Loader2 className="size-4 animate-spin" />
          Tarama sürüyor, sonuçlar bittiğinde görünecek.
        </div>
      ) : audit.status !== "completed" ? (
        <div className="flex items-center gap-2 text-sm text-muted">
          <AlertCircle className="size-4 text-warning" />
          Son tarama tamamlanamadı, bu yüzden sonuç yok.
        </div>
      ) : audit.topIssues.length === 0 ? (
        <div className="flex items-center gap-2 text-sm text-muted">
          <Check className="size-4 text-success" />
          Sorun bulunamadı, siteniz sağlıklı görünüyor.
        </div>
      ) : (
        <ul className="space-y-2">
          {audit.topIssues.map((issue) => (
            <li
              key={issue.issueType}
              className="flex items-center justify-between gap-2 text-sm"
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
                />
                <span className="truncate">
                  {issueTitles[issue.issueType] ?? issue.issueType}
                </span>
              </span>
              <span className="shrink-0 tabular-nums text-muted">
                {issue.count} sayfa
              </span>
            </li>
          ))}
          {audit.totalIssueTypes > audit.topIssues.length ? (
            <li className="text-xs text-muted">
              + {audit.totalIssueTypes - audit.topIssues.length} sorun daha
            </li>
          ) : null}
        </ul>
      )}
    </CardShell>
  );
}
