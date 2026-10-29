import { RotateCw, Trash2 } from "lucide-react";
import { RowActions } from "@/client/components/table/RowActions";
import type { getAuditHistory } from "@/serverFunctions/audit";
import { t } from "@/shared/i18n";
import { describeAuditFailure } from "../results/auditFailureCopy";

type HistoryRow = Awaited<ReturnType<typeof getAuditHistory>>[number];

export function FailureReason({ audit }: { audit: HistoryRow }) {
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

export function HistoryActions({
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
