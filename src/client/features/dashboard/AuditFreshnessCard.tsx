import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowDown, ArrowUp, CalendarClock } from "lucide-react";
import { getAuditFreshnessForProject } from "@/serverFunctions/audit";
import { getIssueDescriptor } from "@/shared/audit-issues";

/**
 * Two things the dashboard can say about the audit that a single crawl cannot:
 * that it has gone stale, and what changed since the crawl before it. The
 * comparison is the useful half — a list of forty issues is wallpaper, while
 * "three of these are new since last week" is a task.
 */
export function AuditFreshnessCard({ projectId }: { projectId: string }) {
  const freshness = useQuery({
    queryKey: ["auditFreshness", projectId],
    queryFn: () => getAuditFreshnessForProject({ data: { projectId } }),
  });

  const data = freshness.data;
  if (!data?.hasAudit) return null;

  const hasChanges =
    data.newIssues.length > 0 || data.resolvedIssues.length > 0;
  if (!data.isStale && !hasChanges) return null;

  return (
    <div className="space-y-3 rounded-box border border-base-300 bg-base-100 p-4 shadow-[var(--shadow-raise)] sm:p-5">
      {data.isStale ? (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm">
            <CalendarClock className="size-4 shrink-0 text-warning" />
            <span>
              Son denetimin üzerinden {data.daysSince} gün geçti. Sitede
              değişiklik yaptıysanız yeniden taramak iyi olur.
            </span>
          </div>
          <Link
            to="/p/$projectId/audit"
            params={{ projectId }}
            search={{}}
            className="btn btn-primary btn-sm"
          >
            Denetim çalıştır
          </Link>
        </div>
      ) : null}

      {hasChanges ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <IssueDeltaList
            title="Son denetimde yeni çıkanlar"
            emptyLabel="Yeni sorun yok."
            tone="new"
            items={data.newIssues}
          />
          <IssueDeltaList
            title="Düzelenler"
            emptyLabel="Düzelen sorun yok."
            tone="resolved"
            items={data.resolvedIssues}
          />
        </div>
      ) : null}
    </div>
  );
}

type Delta = {
  issueType: string;
  severity: "critical" | "warning" | "info";
  count: number;
  previousCount: number | null;
};

function IssueDeltaList({
  title,
  emptyLabel,
  tone,
  items,
}: {
  title: string;
  emptyLabel: string;
  tone: "new" | "resolved";
  items: Delta[];
}) {
  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">
        {title}
      </h3>
      {items.length === 0 ? (
        <p className="text-sm text-muted">{emptyLabel}</p>
      ) : (
        <ul className="space-y-1.5">
          {items.slice(0, 4).map((item) => (
            <li
              key={item.issueType}
              className="flex items-baseline justify-between gap-2 text-sm"
            >
              <span className="truncate">
                {getIssueDescriptor(item.issueType)?.title ?? item.issueType}
              </span>
              <span
                className={`inline-flex shrink-0 items-center gap-1 tabular-nums ${
                  tone === "new" ? "text-error" : "text-success"
                }`}
              >
                {tone === "new" ? (
                  <ArrowUp className="size-3.5" />
                ) : (
                  <ArrowDown className="size-3.5" />
                )}
                {item.previousCount === null
                  ? `${item.count} sayfa`
                  : `${item.previousCount} → ${item.count}`}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
