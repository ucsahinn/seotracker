import { QueryErrorState } from "@/client/components/QueryErrorState";
import { Link } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowUp,
  Eye,
  RotateCw,
  ScanSearch,
  Trash2,
} from "lucide-react";
import { EmptyState } from "@/client/components/EmptyState";
import { formatCount, formatSignedPercent } from "@/client/lib/format";
import { useState } from "react";
import {
  auditSites,
  issueDelta,
  previousAuditIds,
  siteHost,
  type IssueDelta,
} from "./auditDelta";
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
    <section className="space-y-3 rounded-box border border-base-300 bg-base-100 p-4">
      <div className="space-y-3">
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
        <div className="overflow-x-auto">
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
                    label={t("Sayfa")}
                  />
                </th>
                <th
                  className="text-right"
                  aria-sort={sorting.ariaSort("critical")}
                >
                  <SortableHeader
                    column={sorting.column("critical")}
                    label={t("Kritik")}
                    helpText={t("Yüz sayfa başına (toplam ayrıca parantezde)")}
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
                    helpText={t("Yüz sayfa başına (toplam ayrıca parantezde)")}
                    align="right"
                  />
                </th>
                <th className="normal-case">
                  {/* The sortable headers beside it are not uppercased, so this
                      one is not either. lang="en" keeps any uppercasing from
                      turning the I into "İ". */}
                  <span lang="en">Lighthouse</span>
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
                  <td>
                    <StatusBadge status={audit.status} />
                  </td>
                  <td>{pagesShown(audit)}</td>
                  <td className="text-right">
                    <SeverityCell
                      row={audit}
                      previous={byId.get(previousIds.get(audit.id) ?? "")}
                      severity="critical"
                    />
                  </td>
                  <td className="text-right">
                    <SeverityCell
                      row={audit}
                      previous={byId.get(previousIds.get(audit.id) ?? "")}
                      severity="warning"
                    />
                  </td>
                  <td>
                    {audit.ranLighthouse ? (
                      <span className="badge badge-ghost badge-xs">
                        {t("Evet")}
                      </span>
                    ) : null}
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

const CHIP = {
  critical: "border-error/30 bg-error/10 text-[var(--ink-error)]",
  warning: "border-warning/30 bg-warning/10 text-[var(--ink-warning)]",
};

function SeverityCell({
  row,
  previous,
  severity,
}: {
  row: HistoryRow;
  previous: HistoryRow | undefined;
  severity: "critical" | "warning";
}) {
  // Counts of a crawl that is still running or failed are partial.
  if (row.status !== "completed") return <span className="text-subtle">–</span>;
  const count = row.issues[severity];
  const delta = previous ? issueDelta(count, previous.issues[severity]) : null;

  return (
    <div className="flex flex-col items-end gap-0.5">
      {count > 0 ? (
        <span
          className={`inline-flex rounded-full border px-2 text-xs font-medium ${CHIP[severity]}`}
        >
          {formatCount(count)}
        </span>
      ) : (
        <span className="text-xs text-muted">0</span>
      )}
      {delta && delta.diff !== 0 ? (
        <DeltaText delta={delta} current={count} />
      ) : null}
    </div>
  );
}

/** Fewer issues is the good direction; the arrow carries it, not the tint. */
function DeltaText({ delta, current }: { delta: IssueDelta; current: number }) {
  const fewer = delta.diff < 0;
  const Icon = fewer ? ArrowDown : ArrowUp;
  const before = current - delta.diff;
  /*
   * Counts, not a percentage, on a small base: 1 -> 0 printed "-%100,0",
   * which reads as a site transformed. The percentage only once the earlier
   * count is large enough for it to mean something.
   */
  const percent =
    delta.fraction === null || before < 20
      ? null
      : formatSignedPercent(delta.fraction);

  return (
    <span
      className={`inline-flex items-center gap-0.5 text-xs ${
        fewer ? "text-[var(--ink-success)]" : "text-[var(--ink-error)]"
      }`}
      title={t("Aynı siteye ait bir önceki denetime göre")}
    >
      <Icon className="size-3" aria-hidden />
      <span className="sr-only">{fewer ? t("azaldı") : t("arttı")} </span>
      {percent ?? `${formatCount(before)} → ${formatCount(current)}`}
    </span>
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
/**
 * `pagesTotal` is the reservation the audit started with, so a finished
 * audit shows what it actually crawled; one still planning has crawled
 * nothing yet and shows the reservation.
 */
function pagesShown(a: HistoryRow): number {
  if (a.status === "completed") return a.pagesCrawled;
  return a.pagesTotal || a.pagesCrawled;
}

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
  return pagesShown(a) - pagesShown(b);
}
