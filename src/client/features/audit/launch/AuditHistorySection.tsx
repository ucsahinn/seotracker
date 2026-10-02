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
import { formatCount, formatPercent } from "@/client/lib/format";
import { issueDelta, previousAuditIds, type IssueDelta } from "./auditDelta";
import type { getAuditHistory } from "@/serverFunctions/audit";
import { RowActions } from "@/client/components/table/RowActions";
import { formatDateTime, StatusBadge } from "@/client/features/audit/shared";
import { CopyButton } from "@/client/components/CopyButton";
import { AuditTrendChart } from "./AuditTrendChart";
import { SortableHeader } from "@/client/components/table/SortableHeader";
import {
  compareText,
  useLocalSort,
} from "@/client/components/table/useLocalSort";

type HistoryRow = Awaited<ReturnType<typeof getAuditHistory>>[number];

export function AuditHistorySection({
  projectId,
  history,
  isLoading,
  error,
  onRetry,
  onDelete,
  onRerun,
  onStartFirst,
  isRerunPending = false,
}: {
  projectId: string;
  history: Awaited<ReturnType<typeof getAuditHistory>>;
  isLoading: boolean;
  /** Moves focus to the address field of the launch form above. */
  onStartFirst: () => void;
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

  // A failed load used to fall into "Henüz denetim yok", telling an operator
  // with a dozen audits that they had never run one.
  if (error) {
    return (
      <QueryErrorState
        error={error}
        onRetry={onRetry}
        title="Denetim geçmişi yüklenemedi"
      />
    );
  }

  if (history.length === 0 && !isLoading) {
    return (
      <section className="rounded-box border border-base-300 bg-base-100 p-4">
        <EmptyState
          icon={ScanSearch}
          title="Henüz denetim yok"
          description="Denetim geçmişi, ilk taramadan sonra burada listelenir. İlk denetimi yukarıdaki formdan başlatın."
          action={
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={onStartFirst}
            >
              Site adresini gir
            </button>
          }
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
        <h2 className="text-sm font-semibold">Önceki denetimler</h2>
        <AuditTrendChart history={history} />
        <div className="overflow-x-auto">
          <table className="table table-sm">
            <thead>
              <tr>
                <th aria-sort={sorting.ariaSort("startedAt")}>
                  <SortableHeader
                    column={sorting.column("startedAt")}
                    label="Tarih"
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
                    label="Durum"
                  />
                </th>
                <th aria-sort={sorting.ariaSort("pages")}>
                  <SortableHeader
                    column={sorting.column("pages")}
                    label="Sayfa"
                  />
                </th>
                <th
                  className="text-right"
                  aria-sort={sorting.ariaSort("critical")}
                >
                  <SortableHeader
                    column={sorting.column("critical")}
                    label="Kritik"
                    helpText="Yüz sayfa başına (toplam ayrıca parantezde)"
                    align="right"
                  />
                </th>
                <th
                  className="text-right"
                  aria-sort={sorting.ariaSort("warning")}
                >
                  <SortableHeader
                    column={sorting.column("warning")}
                    label="Uyarı"
                    helpText="Yüz sayfa başına (toplam ayrıca parantezde)"
                    align="right"
                  />
                </th>
                <th>
                  {/* lang="en": the header is uppercased, and under lang="tr" "Lighthouse" would print as "LİGHTHOUSE". */}
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
                        label="Adresi kopyala"
                        successMessage="Adres kopyalandı"
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
                      <span className="badge badge-ghost badge-xs">Evet</span>
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
                        aria-label={`${formatDateTime(audit.startedAt)} denetimini görüntüle`}
                      >
                        <Eye className="size-3.5" aria-hidden />
                        Görüntüle
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
      {delta && delta.diff !== 0 ? <DeltaText delta={delta} /> : null}
    </div>
  );
}

/** Fewer issues is the good direction; the arrow carries it, not the tint. */
function DeltaText({ delta }: { delta: IssueDelta }) {
  const fewer = delta.diff < 0;
  const Icon = fewer ? ArrowDown : ArrowUp;
  const size = Math.abs(delta.diff);
  // A change that rounds to "%0" would read as no change under an arrow.
  const percent =
    delta.fraction === null ? 0 : Math.round(Math.abs(delta.fraction) * 100);

  return (
    <span
      className={`inline-flex items-center gap-0.5 text-xs ${
        fewer ? "text-[var(--ink-success)]" : "text-[var(--ink-error)]"
      }`}
      title="Aynı siteye ait bir önceki denetime göre"
    >
      <Icon className="size-3" aria-hidden />
      <span className="sr-only">{fewer ? "azaldı" : "arttı"} </span>
      {delta.fraction !== null && percent > 0
        ? formatPercent(Math.abs(delta.fraction), 0)
        : formatCount(size)}
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
        label={`${audit.startUrl} denetimi için işlemler`}
        actions={[
          {
            label: "Aynı ayarlarla yeniden başlat",
            icon: RotateCw,
            onSelect: () => onRerun(audit),
            disabledReason: isRerunPending
              ? "Bir denetim zaten başlatılıyor"
              : undefined,
          },
          {
            label: "Denetimi sil",
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
