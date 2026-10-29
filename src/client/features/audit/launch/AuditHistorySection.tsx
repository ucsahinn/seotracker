import { QueryErrorState } from "@/client/components/QueryErrorState";
import { Link } from "@tanstack/react-router";
import { Eye, ScanSearch } from "lucide-react";
import { EmptyState } from "@/client/components/EmptyState";
import { formatCount } from "@/client/lib/format";
import { useState } from "react";
import { auditSites, previousAuditIds, siteHost } from "./auditDelta";
import type { getAuditHistory } from "@/serverFunctions/audit";
import { formatDateTime, StatusBadge } from "@/client/features/audit/shared";
import { CopyButton } from "@/client/components/CopyButton";
import { AuditTrendChart } from "./AuditTrendChart";
import { AuditSiteFilter } from "./AuditSiteFilter";
import { SortableHeader } from "@/client/components/table/SortableHeader";
import {
  compareText,
  useLocalSort,
} from "@/client/components/table/useLocalSort";
import { t } from "@/shared/i18n";

import { AuditHistorySeverityCell } from "./AuditHistorySeverityCell";
import { FailureReason, HistoryActions } from "./AuditHistoryRowParts";

type HistoryRow = Awaited<ReturnType<typeof getAuditHistory>>[number];

export function AuditHistorySection({
  projectId,
  projectDomain = null,
  history: allHistory,
  isLoading,
  error,
  onRetry,
  onDelete,
  onRerun,
  isRerunPending = false,
}: {
  projectId: string;
  /** The project's own site; its audits are shown first. */
  projectDomain?: string | null;
  history: Awaited<ReturnType<typeof getAuditHistory>>;
  isLoading: boolean;
  error?: unknown;
  onRetry?: () => void;
  onDelete: (auditId: string) => void;
  onRerun: (audit: HistoryRow) => void;
  /** A start is already in flight; the "run again" action waits for it. */
  isRerunPending?: boolean;
}) {
  /*
   * Sortable, because this list only grows. `getAuditHistory` returns every
   * audit the project has ever run with no cap, so on a long-lived install
   * the newest-first order the server happens to produce is the only order
   * there is -- and "which crawl found the most pages" meant scrolling.
   */
  const sorting = useLocalSort<HistorySortKey>({
    key: "startedAt",
    desc: true,
  });

  /*
   * One site at a time when the project holds audits of several. The trend
   * line used to zigzag between npr.org, sqlite.org and the project's own
   * site, which is a comparison of sites, not of time. The project's own
   * site is the default; "Tümü" keeps every row reachable.
   */
  const sites = auditSites(allHistory, projectDomain);
  const [picked, setPicked] = useState<string | null>(null);
  const site =
    sites.length > 1
      ? picked === "all" || sites.some((entry) => entry.key === picked)
        ? picked
        : (sites[0]?.key ?? null)
      : null;
  const history =
    site === null || site === "all"
      ? allHistory
      : allHistory.filter((row) => siteHost(row.startUrl) === site);

  // A failed load used to fall into "Henüz denetim yok", telling an operator
  // with a dozen audits that they had never run one.
  if (error) {
    return (
      <QueryErrorState
        error={error}
        onRetry={onRetry}
        title={t("Denetim geçmişi yüklenemedi")}
      />
    );
  }

  if (history.length === 0 && !isLoading) {
    return (
      <section className="rounded-box border border-[var(--hairline)] bg-base-100 p-4">
        <EmptyState
          compact
          icon={ScanSearch}
          title={t("Henüz denetim yok")}
          description={t(
            "Henüz denetim yapılmadı. Yukarıya site adresinizi yazıp başlatın; geçmiş burada listelenir.",
          )}
        />
      </section>
    );
  }

  if (history.length === 0 && isLoading) {
    /*
     * Shaped like the table that is coming. This branch used to `return null`
     * while the first load ran, so the screen below the launch form was empty
     * and nothing said more was on the way.
     */
    return (
      <section
        className="space-y-3 rounded-box border border-[var(--hairline)] bg-base-100 p-4"
        aria-busy
      >
        <div className="skeleton h-5 w-40" />
        <div className="space-y-2">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="skeleton h-8" />
          ))}
        </div>
      </section>
    );
  }

  if (history.length === 0) return null;

  const previousIds = previousAuditIds(history);
  const byId = new Map(history.map((row) => [row.id, row]));

  return (
    <section className="space-y-4 rounded-box border border-[var(--hairline)] bg-base-100 p-4 sm:p-5">
      <div className="space-y-4">
        <h2 className="text-sm font-semibold">{t("Önceki denetimler")}</h2>
        {sites.length > 1 ? (
          <AuditSiteFilter
            sites={sites}
            total={allHistory.length}
            selected={site}
            onSelect={setPicked}
          />
        ) : null}
        {site === "all" ? (
          <p className="text-xs text-muted">
            {t(
              "Grafik ve değişim okları her zaman aynı sitenin denetimlerini karşılaştırır; birden çok site seçiliyken grafik gizlenir.",
            )}
          </p>
        ) : (
          <AuditTrendChart history={history} />
        )}
        <div
          className="overflow-x-auto"
          role="region"
          aria-label={t("Önceki denetimler")}
          tabIndex={0}
        >
          {/* Below md each audit is a stacked row: date and actions, the
              address, the status, then a labelled grid of counts. The
              labels come from data-label through ::before, so a cell's
              accessible name still carries its column on phones. */}
          <table className="table table-sm max-md:block">
            <thead className="max-md:hidden">
              <tr>
                <th aria-sort={sorting.ariaSort("startedAt")}>
                  <SortableHeader
                    column={sorting.column("startedAt")}
                    label={t("Tarih")}
                  />
                </th>
                <th aria-sort={sorting.ariaSort("startUrl")}>
                  <SortableHeader
                    column={sorting.column("startUrl", false)}
                    label="URL"
                  />
                </th>
                <th aria-sort={sorting.ariaSort("status")}>
                  <SortableHeader
                    column={sorting.column("status", false)}
                    label={t("Durum")}
                  />
                </th>
                <th
                  className="text-right"
                  aria-sort={sorting.ariaSort("pages")}
                >
                  <SortableHeader
                    column={sorting.column("pages")}
                    label={t("Taranan sayfa")}
                    align="right"
                  />
                </th>
                <th
                  className="text-right"
                  aria-sort={sorting.ariaSort("critical")}
                >
                  <SortableHeader
                    column={sorting.column("critical")}
                    label={t("Kritik")}
                    align="right"
                  />
                </th>
                <th
                  className="text-right"
                  aria-sort={sorting.ariaSort("warning")}
                >
                  <SortableHeader
                    column={sorting.column("warning")}
                    label={t("Uyarı")}
                    align="right"
                  />
                </th>
                <th className="text-right">{t("Bilgi")}</th>
                <th className="normal-case">
                  {/* Configuration records a request, not a successful measurement. */}
                  <span>{t("Hız ölçümü istendi")}</span>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody className="max-md:block">
              {sorting.apply(history, compareAudits).map((audit) => (
                <tr
                  key={audit.id}
                  className="hover group align-top max-md:grid max-md:grid-cols-3 max-md:gap-x-4 max-md:gap-y-2 max-md:border-b max-md:border-[var(--hairline)] max-md:py-3 max-md:last:border-b-0 max-md:[&>td]:p-0"
                >
                  <td className="whitespace-nowrap text-sm max-md:col-span-2 max-md:self-center">
                    {/* With the time. Six audits in one day all read
                        "28 Eyl 2026" and could not be told apart. The
                        whole row opens through this link. */}
                    <Link
                      to="/p/$projectId/audit"
                      params={{ projectId }}
                      search={{ auditId: audit.id, tab: "pages" }}
                      className="link link-hover"
                    >
                      {formatDateTime(audit.startedAt)}
                    </Link>
                  </td>
                  <td className="max-w-[220px] max-md:col-span-3 max-md:max-w-none">
                    <div className="flex min-w-0 items-center gap-1">
                      <span
                        className="truncate text-muted"
                        title={audit.startUrl}
                      >
                        {audit.startUrl}
                      </span>
                      {/* The cell truncates, and the full address was not
                          reachable from anywhere on this screen. */}
                      <CopyButton
                        iconOnly
                        value={audit.startUrl}
                        label={t("Adresi kopyala")}
                        successMessage={t("Adres kopyalandı")}
                      />
                    </div>
                  </td>
                  <td className="min-w-64 max-md:col-span-3 max-md:min-w-0">
                    <StatusBadge status={audit.status} />
                    {audit.status === "completed" ? (
                      // One muted second line: the limit, then the link to
                      // what the crawl covered.
                      <p className="mt-1 text-xs text-muted">
                        <span>
                          {audit.maxPages
                            ? t("Tarama sınırı: {count} sayfa", {
                                count: formatCount(audit.maxPages),
                              })
                            : t("Tarama sınırı kaydedilmemiş.")}
                        </span>
                        {" · "}
                        <Link
                          to="/p/$projectId/audit"
                          params={{ projectId }}
                          search={{ auditId: audit.id, tab: "checks" }}
                          className="link link-hover inline-flex items-center max-md:min-h-11"
                        >
                          {t("Kapsam ayrıntıları")}
                        </Link>
                      </p>
                    ) : null}
                    {audit.status === "failed" ? (
                      <FailureReason audit={audit} />
                    ) : null}
                  </td>
                  <td
                    data-label={t("Taranan sayfa")}
                    className="text-right tabular-nums max-md:text-left max-md:before:mb-0.5 max-md:before:block max-md:before:text-xs max-md:before:font-normal max-md:before:text-muted max-md:before:content-[attr(data-label)]"
                  >
                    {formatCount(audit.pagesCrawled)}
                  </td>
                  <td
                    data-label={t("Kritik")}
                    className="text-right max-md:text-left max-md:before:mb-0.5 max-md:before:block max-md:before:text-xs max-md:before:font-normal max-md:before:text-muted max-md:before:content-[attr(data-label)]"
                  >
                    <AuditHistorySeverityCell
                      row={audit}
                      previous={byId.get(previousIds.get(audit.id) ?? "")}
                      severity="critical"
                    />
                  </td>
                  <td
                    data-label={t("Uyarı")}
                    className="text-right max-md:text-left max-md:before:mb-0.5 max-md:before:block max-md:before:text-xs max-md:before:font-normal max-md:before:text-muted max-md:before:content-[attr(data-label)]"
                  >
                    <AuditHistorySeverityCell
                      row={audit}
                      previous={byId.get(previousIds.get(audit.id) ?? "")}
                      severity="warning"
                    />
                  </td>
                  <td
                    data-label={t("Bilgi")}
                    className="text-right max-md:text-left max-md:before:mb-0.5 max-md:before:block max-md:before:text-xs max-md:before:font-normal max-md:before:text-muted max-md:before:content-[attr(data-label)]"
                  >
                    <AuditHistorySeverityCell
                      row={audit}
                      previous={byId.get(previousIds.get(audit.id) ?? "")}
                      severity="info"
                    />
                  </td>
                  <td
                    data-label={t("Hız ölçümü istendi")}
                    className="text-xs max-md:col-span-2 max-md:before:mb-0.5 max-md:before:block max-md:before:text-xs max-md:before:font-normal max-md:before:text-muted max-md:before:content-[attr(data-label)]"
                  >
                    {audit.ranLighthouse ? (
                      t("Evet")
                    ) : (
                      <span className="text-muted">{t("Hayır")}</span>
                    )}
                  </td>
                  <td className="max-md:col-start-3 max-md:row-start-1">
                    <div className="flex items-center justify-end gap-2">
                      {/* Always visible: the row actions below only appear on
                          hover, and the date link alone did not read as a
                          button. */}
                      <Link
                        to="/p/$projectId/audit"
                        params={{ projectId }}
                        search={{ auditId: audit.id, tab: "pages" }}
                        className="btn btn-ghost btn-sm min-h-11 gap-1 sm:min-h-0"
                        aria-label={t("{date} denetimini görüntüle", {
                          date: formatDateTime(audit.startedAt),
                        })}
                      >
                        <Eye className="size-3.5" aria-hidden />
                        {t("Görüntüle")}
                      </Link>
                      <HistoryActions
                        audit={audit}
                        onDelete={onDelete}
                        onRerun={onRerun}
                        isRerunPending={isRerunPending}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <details className="max-w-prose text-sm text-muted">
          <summary className="min-h-11 cursor-pointer py-3">
            {t("Ayrıntılar")}
          </summary>
          {t(
            "Sayılar kaydedilen tüm bulgulardır: sayfa bulguları ve site geneli kontroller birlikte; aynı sayfada birden çok bulgu olabilir.",
          )}
        </details>
      </div>
    </section>
  );
}

type HistorySortKey =
  | "startedAt"
  | "startUrl"
  | "status"
  | "pages"
  | "critical"
  | "warning";

/** Ascending; `useLocalSort` applies the direction. */
function compareAudits(
  a: HistoryRow,
  b: HistoryRow,
  key: HistorySortKey,
): number {
  if (key === "startedAt") return compareText(a.startedAt, b.startedAt);
  if (key === "startUrl") return compareText(a.startUrl, b.startUrl);
  if (key === "status") return compareText(a.status, b.status);
  if (key === "critical") return a.issues.critical - b.issues.critical;
  if (key === "warning") return a.issues.warning - b.issues.warning;
  return a.pagesCrawled - b.pagesCrawled;
}
