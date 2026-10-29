import { QueryErrorState } from "@/client/components/QueryErrorState";
import { Link } from "@tanstack/react-router";
import { Eye, RotateCw, ScanSearch, Trash2 } from "lucide-react";
import { EmptyState } from "@/client/components/EmptyState";
import { formatCount } from "@/client/lib/format";
import { useState } from "react";
import { auditSites, previousAuditIds, siteHost } from "./auditDelta";
import type { getAuditHistory } from "@/serverFunctions/audit";
import { RowActions } from "@/client/components/table/RowActions";
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
import { describeAuditFailure } from "../results/auditFailureCopy";

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
      <section className="rounded-box border border-base-300 bg-base-100 p-4">
        <EmptyState
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
        className="space-y-3 rounded-box border border-base-300 bg-base-100 p-4"
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
        <p className="text-xs text-muted sm:hidden">
          {t("Tüm sütunları ve işlemleri görmek için tabloyu yana kaydırın.")}
        </p>
        <details className="max-w-prose text-sm text-muted">
          <summary className="cursor-pointer py-1.5">{t("Ayrıntılar")}</summary>
          {t(
            "Sayılar kaydedilen tüm bulgulardır: sayfa bulguları ve site geneli kontroller birlikte; aynı sayfada birden çok bulgu olabilir.",
          )}
        </details>
        <div
          className="overflow-x-auto"
          role="region"
          aria-label={t("Önceki denetimler")}
          tabIndex={0}
        >
          <table className="table table-sm">
            <thead>
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
                <th aria-sort={sorting.ariaSort("pages")}>
                  <SortableHeader
                    column={sorting.column("pages")}
                    label={t("Taranan sayfa")}
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
            <tbody>
              {sorting.apply(history, compareAudits).map((audit) => (
                <tr key={audit.id} className="hover group">
                  <td className="text-xs">
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
                  <td className="max-w-[220px]">
                    <div className="flex items-center gap-1">
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
                  <td className="min-w-64">
                    <StatusBadge status={audit.status} />
                    {audit.status === "completed" ? (
                      <div className="space-y-1 text-xs text-muted">
                        <p>
                          {audit.maxPages
                            ? t("Tarama sınırı: {count} sayfa", {
                                count: formatCount(audit.maxPages),
                              })
                            : t("Tarama sınırı kaydedilmemiş.")}
                        </p>
                        <Link
                          to="/p/$projectId/audit"
                          params={{ projectId }}
                          search={{ auditId: audit.id, tab: "checks" }}
                          className="btn btn-ghost btn-sm mt-1 min-h-11"
                        >
                          {t("Kapsam ayrıntıları")}
                        </Link>
                      </div>
                    ) : null}
                    {audit.status === "failed" ? (
                      <FailureReason audit={audit} />
                    ) : null}
                  </td>
                  <td>{formatCount(audit.pagesCrawled)}</td>
                  <td className="text-right">
                    <AuditHistorySeverityCell
                      row={audit}
                      previous={byId.get(previousIds.get(audit.id) ?? "")}
                      severity="critical"
                    />
                  </td>
                  <td className="text-right">
                    <AuditHistorySeverityCell
                      row={audit}
                      previous={byId.get(previousIds.get(audit.id) ?? "")}
                      severity="warning"
                    />
                  </td>
                  <td className="text-right">
                    <AuditHistorySeverityCell
                      row={audit}
                      previous={byId.get(previousIds.get(audit.id) ?? "")}
                      severity="info"
                    />
                  </td>
                  <td>
                    {audit.ranLighthouse ? (
                      <span className="badge badge-ghost badge-xs">
                        {t("Evet")}
                      </span>
                    ) : (
                      <span className="text-xs text-muted">{t("Hayır")}</span>
                    )}
                  </td>
                  <td>
                    <div className="flex items-center justify-end gap-2">
                      {/* Always visible: the row actions below only appear on
                          hover, and the date link alone did not read as a
                          button. */}
                      <Link
                        to="/p/$projectId/audit"
                        params={{ projectId }}
                        search={{ auditId: audit.id, tab: "pages" }}
                        className="btn btn-ghost btn-xs gap-1"
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
      </div>
    </section>
  );
}

function FailureReason({ audit }: { audit: HistoryRow }) {
  const copy = describeAuditFailure(audit);
  return (
    <details className="mt-2 max-w-xs whitespace-normal text-sm text-muted">
      <summary className="cursor-pointer py-1.5">{t("Ayrıntılar")}</summary>
      <div className="mt-1.5 space-y-1.5 leading-relaxed">
        <p>{t(copy.cause)}</p>
        {copy.side === "Nedeni belirlenemedi." ? <p>{t(copy.side)}</p> : null}
        <p>{t(copy.action)}</p>
      </div>
    </details>
  );
}

function HistoryActions({
  audit,
  onDelete,
  onRerun,
  isRerunPending,
}: {
  audit: HistoryRow;
  onDelete: (auditId: string) => void;
  onRerun: (audit: HistoryRow) => void;
  isRerunPending: boolean;
}) {
  return (
    <div className="flex items-center justify-end gap-2 transition-opacity can-hover:opacity-0 can-hover:group-hover:opacity-100 can-hover:group-focus-within:opacity-100">
      <RowActions
        label={t("{url} denetimi için işlemler", { url: audit.startUrl })}
        actions={[
          {
            label: t("Aynı ayarlarla yeniden başlat"),
            icon: RotateCw,
            onSelect: () => onRerun(audit),
            disabledReason: isRerunPending
              ? t("Bir denetim zaten başlatılıyor")
              : undefined,
          },
          {
            label: t("Denetimi sil"),

            icon: Trash2,
            destructive: true,
            onSelect: () => onDelete(audit.id),
          },
        ]}
      />
    </div>
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
