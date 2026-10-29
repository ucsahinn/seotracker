import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  Check,
  Info,
  OctagonAlert,
  TriangleAlert,
} from "lucide-react";
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
import { extractPathname } from "@/client/features/audit/shared";
import { SEVERITY_LABEL } from "@/client/features/audit/results/IssuesView";
import type { DashboardAuditSummary } from "@/types/schemas/dashboard";
import { formatCount } from "@/shared/format";
import { describeAuditFailure } from "@/client/features/audit/results/auditFailureCopy";
import { t } from "@/shared/i18n";
import { FactStrip } from "@/client/components/FactStrip";

// Plain string-keyed view of the registry: issue types from the DB are not
// statically guaranteed to be registry keys. Read at render time and passed
// through t(), since the registry's titles are Turkish source strings.
const issueTypes: Record<string, { title: string } | undefined> =
  AUDIT_ISSUE_TYPES;

const SEVERITY_ICON = {
  critical: OctagonAlert,
  warning: TriangleAlert,
  info: Info,
} as const;

const SEVERITY_INK = {
  critical: "text-[var(--ink-error)]",
  warning: "text-[var(--ink-warning)]",
  info: "text-subtle",
} as const;

function issueTitle(issueType: string): string {
  const title = issueTypes[issueType]?.title;
  return title ? t(title) : issueType;
}

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
      <CardShell title={t("Site denetimi")}>
        <EmptyCardBody
          message={t(
            "Kırık bağlantılar, eksik etiketler ve dizine girme sorunları için sitenizi tarayın.",
          )}
          cta={
            <Link
              to="/p/$projectId/audit"
              params={{ projectId }}
              className="btn btn-primary btn-sm"
            >
              {t("Denetimi başlat")}
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
      title={t("Site denetimi")}
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
          {t("Ayrıntılar")}
        </Link>
      }
    >
      <div key={flash.key} className={flash.className}>
        <div className="mb-4">
          <FactStrip
            label={t("Site denetimi")}
            facts={[
              { label: t("Kaynak"), value: audit.startUrl },
              {
                label: t("Tarih"),
                value:
                  audit.status === "completed"
                    ? t("{count} sayfa tarandı · {date}", {
                        count: formatCount(audit.pagesCrawled),
                        date: formatDay(audit.startedAt),
                      })
                    : audit.status === "running"
                      ? t("denetim sürüyor")
                      : t("son denetim başarısız"),
                hint: audit.limitNote ? t("Kısmi veri") : undefined,
                tone: audit.limitNote ? "warning" : undefined,
              },
              ...(audit.coverage
                ? [
                    {
                      label: t("Site denetimi"),
                      value: t("{measured} / {total} kontrol ölçüldü.", {
                        measured: formatCount(audit.coverage.measured),
                        total: formatCount(audit.coverage.total),
                      }),
                    },
                  ]
                : []),
            ]}
            detailsLabel={t("Veri hakkında")}
            details={
              audit.affectedPages !== undefined || audit.limitNote ? (
                <div className="max-w-prose space-y-1.5 text-sm text-muted">
                  {audit.affectedPages !== undefined ? (
                    <p>
                      {t(
                        "Etkilenen benzersiz sayfa: {pages} · Kontrol türü: {types}.",
                        {
                          types: formatCount(audit.totalIssueTypes),
                          pages: formatCount(audit.affectedPages),
                        },
                      )}
                    </p>
                  ) : null}
                  {audit.limitNote ? (
                    <p className="text-[var(--ink-warning)]">
                      {audit.limitNote}
                    </p>
                  ) : null}
                </div>
              ) : undefined
            }
          />
        </div>
        {/* An empty issue list only means "healthy" for an audit that finished.
          A crawl still running has not looked yet, and one that failed at
          discovery never looked at all -- both used to get the green check,
          the second of them directly under a stamp reading "başarısız". */}
        {audit.status === "running" ? (
          <div className="flex items-center gap-2 text-sm text-muted">
            {/* The live dot the audit screen uses for a running crawl, not a
                spinner: nothing is loading here, a job is running. */}
            <span className="dot-live text-primary" aria-hidden />
            {t("Denetim sürüyor, sonuçlar bittiğinde görünecek.")}
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
            {audit.errorCode
              ? t(describeAuditFailure(audit).cause) +
                " " +
                t(describeAuditFailure(audit).action)
              : t("Son denetim tamamlanamadı, bu yüzden sonuç yok.")}
          </div>
        ) : audit.topIssues.length === 0 ? (
          <div className="flex items-center gap-2 text-sm text-muted">
            <Check className="size-4 text-[var(--ink-success)]" />
            {audit.coverage &&
            audit.coverage.measured === audit.coverage.total &&
            !audit.limitNote &&
            audit.standing?.kind === "scored" &&
            !audit.standing.provisional
              ? t("Taranan kapsamda sorun bulunamadı.")
              : t(
                  "Ölçülmeyen kontroller var; tüm site için sağlıklı sonucu çıkarılamaz. Ayrıntılarda kapsamı kontrol edin.",
                )}
          </div>
        ) : (
          <>
            <ul className="space-y-0.5">
              {audit.topIssues.map((issue) => {
                const Icon = SEVERITY_ICON[issue.severity];
                return (
                  <li key={issue.issueType}>
                    <Link
                      to="/p/$projectId/audit"
                      params={{ projectId }}
                      search={{
                        auditId: audit.auditId,
                        tab: "issues" as const,
                      }}
                      className="flex min-h-10 items-start justify-between gap-2 rounded-field px-1 py-2 text-sm transition-colors hover:bg-base-200/60 focus-visible:outline-offset-[-2px]"
                    >
                      <span className="flex min-w-0 items-start gap-2">
                        {/* A shape per severity as well as an ink, so rank
                          never rests on colour alone; the sr-only label
                          names it for a screen reader. */}
                        <Icon
                          className={`mt-0.5 size-4 shrink-0 ${SEVERITY_INK[issue.severity]}`}
                          aria-hidden
                        />
                        <span className="sr-only">
                          {t(SEVERITY_LABEL[issue.severity])}:{" "}
                        </span>
                        <span className="min-w-0 whitespace-normal break-words">
                          {issueTitle(issue.issueType)}
                        </span>
                      </span>
                      <span className="shrink-0 tabular-nums text-muted">
                        {issue.siteLevel
                          ? t("Site geneli")
                          : t("{count} sayfa", { count: issue.count })}
                      </span>
                    </Link>
                  </li>
                );
              })}
              {/* Severity across every finding, not just the three above. The
                overflow line used to hide whether the rest held criticals. */}
              {audit.totalIssueTypes > audit.topIssues.length ? (
                <li>
                  <Link
                    to="/p/$projectId/audit"
                    params={{ projectId }}
                    search={{ auditId: audit.auditId, tab: "issues" as const }}
                    className="btn btn-ghost btn-xs mt-1"
                  >
                    {t("+ {count} kontrol türü daha", {
                      count: audit.totalIssueTypes - audit.topIssues.length,
                    })}
                  </Link>
                </li>
              ) : null}
            </ul>
            <div className="mt-3 border-t border-base-300 pt-3">
              <SeverityBar
                projectId={projectId}
                auditId={audit.auditId}
                totals={audit.severityTotals}
                siteTotals={audit.siteSeverityTotals}
              />
            </div>
          </>
        )}

        {audit.topPages.length > 0 ? (
          <div className="mt-4 space-y-2 border-t border-base-300 pt-3">
            {/* The card named issue types and never pages, yet opening a page
              is always the next move. Worst severity first, then count. */}
            <h3 className="text-[13px] font-semibold text-base-content">
              {t("En çok sorunu olan sayfalar")}
            </h3>
            <ul className="space-y-0.5">
              {audit.topPages.map((page) => (
                <li key={page.pageUrl}>
                  <Link
                    to="/p/$projectId/audit"
                    params={{ projectId }}
                    search={{
                      auditId: audit.auditId,
                      tab: "issues" as const,
                      pageUrl: page.pageUrl,
                    }}
                    className="flex items-center justify-between gap-2 rounded-field min-h-10 px-1 py-2 text-sm focus-visible:outline-offset-[-2px] transition-colors hover:bg-base-200/60"
                    title={page.pageUrl}
                  >
                    <span className="min-w-0 truncate text-muted">
                      {extractPathname(page.pageUrl)}
                    </span>
                    <span className="shrink-0 tabular-nums text-muted">
                      {t("{count} sorun", {
                        count: page.issueCount,
                      })}
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
