import { QueryErrorState } from "@/client/components/QueryErrorState";
import { Link } from "@tanstack/react-router";
import { RotateCw, ScanSearch, Trash2 } from "lucide-react";
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
}: {
  projectId: string;
  history: Awaited<ReturnType<typeof getAuditHistory>>;
  isLoading: boolean;
  error?: unknown;
  onRetry?: () => void;
  onDelete: (auditId: string) => void;
  onRerun: (audit: HistoryRow) => void;
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
      <div className="flex items-center justify-center py-16">
        <div className="text-center text-muted space-y-3">
          <ScanSearch className="size-12 mx-auto opacity-30" />
          <p className="text-lg font-medium">Henüz denetim yok</p>
        </div>
      </div>
    );
  }

  if (history.length === 0 && isLoading) {
    /*
     * Shaped like the table that is coming. This branch used to `return null`
     * while the first load ran, so the screen below the launch form was empty
     * and nothing said more was on the way.
     */
    return (
      <div className="card bg-base-100 border border-base-300" aria-busy>
        <div className="card-body gap-3">
          <div className="skeleton h-5 w-40" />
          <div className="space-y-2">
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className="skeleton h-8" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (history.length === 0) return null;

  return (
    <div className="card bg-base-100 border border-base-300">
      <div className="card-body gap-3">
        <h2 className="card-title text-base">Önceki denetimler</h2>
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
                <th>Lighthouse</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sorting.apply(history, compareAudits).map((audit) => (
                <tr key={audit.id} className="hover group">
                  <td className="text-xs text-muted">
                    {/* With the time. Six audits in one day all read
                        "28 Eyl 2026" and could not be told apart. */}
                    {formatDateTime(audit.startedAt)}
                  </td>
                  <td className="max-w-[220px]">
                    <div className="flex items-center gap-1">
                      <span className="truncate" title={audit.startUrl}>
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
                  <td>{audit.pagesTotal || audit.pagesCrawled}</td>
                  <td>
                    {audit.ranLighthouse ? (
                      <span className="badge badge-ghost badge-xs">Evet</span>
                    ) : null}
                  </td>
                  <td>
                    <HistoryActions
                      projectId={projectId}
                      audit={audit}
                      onDelete={onDelete}
                      onRerun={onRerun}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function HistoryActions({
  projectId,
  audit,
  onDelete,
  onRerun,
}: {
  projectId: string;
  audit: HistoryRow;
  onDelete: (auditId: string) => void;
  onRerun: (audit: HistoryRow) => void;
}) {
  return (
    <div className="flex items-center justify-end gap-2 transition-opacity can-hover:opacity-0 can-hover:group-hover:opacity-100 can-hover:group-focus-within:opacity-100">
      <Link
        to="/p/$projectId/audit"
        params={{ projectId }}
        search={{ auditId: audit.id, tab: "pages" }}
        className="btn btn-primary btn-xs"
      >
        Görüntüle
      </Link>
      <RowActions
        label={`${audit.startUrl} denetimi için işlemler`}
        actions={[
          {
            label: "Aynı ayarlarla yeniden başlat",
            icon: RotateCw,
            onSelect: () => onRerun(audit),
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

type HistorySortKey = "startedAt" | "startUrl" | "status" | "pages";

/** Ascending; `useLocalSort` applies the direction. */
function compareAudits(
  a: HistoryRow,
  b: HistoryRow,
  key: HistorySortKey,
): number {
  if (key === "startedAt") return compareText(a.startedAt, b.startedAt);
  if (key === "startUrl") return compareText(a.startUrl, b.startUrl);
  if (key === "status") return compareText(a.status, b.status);
  // The number the row actually shows: `pagesTotal` while a crawl is
  // planning, `pagesCrawled` once it has started returning pages.
  return (a.pagesTotal || a.pagesCrawled) - (b.pagesTotal || b.pagesCrawled);
}
