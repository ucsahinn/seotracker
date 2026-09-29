import { QueryErrorState } from "@/client/components/QueryErrorState";
import { Link } from "@tanstack/react-router";
import { RotateCw, ScanSearch, Trash2 } from "lucide-react";
import type { getAuditHistory } from "@/serverFunctions/audit";
import { RowActions } from "@/client/components/table/RowActions";
import { formatDate, StatusBadge } from "@/client/features/audit/shared";
import { CopyButton } from "@/client/components/CopyButton";

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
        <div className="overflow-x-auto">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Tarih</th>
                <th>URL</th>
                <th>Durum</th>
                <th>Sayfa</th>
                <th>Lighthouse</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {history.map((audit) => (
                <tr key={audit.id} className="hover group">
                  <td className="text-xs text-muted">
                    {formatDate(audit.startedAt)}
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
    <div className="flex items-center justify-end gap-2 transition-opacity md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
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
            label: "Aynı ayarlarla yeniden çalıştır",
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
