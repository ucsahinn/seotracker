import { formatCount, formatDateTime } from "@/shared/format";
import { FactStrip } from "@/client/components/FactStrip";
import { PageActions } from "@/client/components/RefreshButton";
import { PageHeader } from "@/client/components/PageShell";
import { TableExportMenu } from "@/client/components/table/TableBulkActionBar";
import type { refreshState } from "@/client/lib/refreshState";
import { useDoneFlash } from "@/client/lib/useDoneFlash";
import { CheckCircle2, Download, FileDown, Loader2, Sheet } from "lucide-react";
import { t } from "@/shared/i18n";

export function SavedKeywordsHeader({
  blocked,
  days,
  onDaysChange,
  refresh,
  totalCount,
  exporting,
  csvDownloaded,
  onExportCsv,
  onExportSheets,
}: {
  blocked: boolean;
  days: 30 | 90 | 180;
  onDaysChange: (days: 30 | 90 | 180) => void;
  refresh: ReturnType<typeof refreshState>;
  totalCount: number;
  exporting: "csv" | "sheets" | null;
  csvDownloaded: boolean;
  onExportCsv: () => void;
  onExportSheets: () => void;
}) {
  const disabled = blocked || exporting != null;
  // Only the CSV lands in Downloads; a Sheets export opens its own tab.
  const flash = useDoneFlash(exporting === "csv", csvDownloaded);

  return (
    <>
      <PageHeader
        title={t("Kayıtlı kelimeler")}
        description={t(
          "Kaydettiğiniz aramaların ortalama sırasını ve dönemler arasındaki değişimini inceleyin.",
        )}
        actions={
          <PageActions>
            <label className="flex items-center gap-2 text-sm">
              {t("Arşiv dönemi")}
              <select
                aria-label={t("Arşiv dönemi")}
                className="select min-h-11"
                value={days}
                onChange={(event) =>
                  onDaysChange(
                    Number(event.target.value) === 30
                      ? 30
                      : Number(event.target.value) === 180
                        ? 180
                        : 90,
                  )
                }
              >
                {([30, 90, 180] as const).map((n) => (
                  <option key={n} value={n}>
                    {t("{count} gün", { count: formatCount(n) })}
                  </option>
                ))}
              </select>
            </label>
            <button
              className="btn btn-outline min-h-11"
              onClick={refresh.onRefresh}
              disabled={refresh.isFetching}
            >
              {t("Listeyi yenile")}
            </button>
            {/*
             * The shared menu, not a third copy of the same dropdown. The inline
             * one had no `aria-expanded`, no Escape handler, and could be clipped
             * by an overflow ancestor — all three already solved once in
             * `TableExportMenu`, and all three reintroduced by copying it.
             */}
            {totalCount === 0 ? null : (
              <TableExportMenu
                buttonClassName={`btn btn-outline btn-sm min-h-11 gap-1.5 ${
                  disabled ? "btn-disabled" : ""
                }`}
                triggerIcon={
                  exporting != null ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : flash === "done" ? (
                    <CheckCircle2 className="enter size-4 text-success" />
                  ) : (
                    <Download className="size-4" />
                  )
                }
                triggerLabel={
                  flash === "done" ? (
                    t("İndirildi")
                  ) : (
                    <span
                      title={t("Filtrelenen {count} kelimeyi aktar", {
                        count: formatCount(totalCount),
                      })}
                    >
                      {t("Dışa aktar")}
                    </span>
                  )
                }
                actions={[
                  {
                    label: t("E-Tablolar'a aktar"),
                    icon: <Sheet className="size-4" />,
                    onClick: onExportSheets,
                    disabled,
                  },
                  {
                    label: t("CSV indir"),
                    icon: <FileDown className="size-4" />,
                    onClick: onExportCsv,
                    disabled,
                  },
                ]}
              />
            )}
          </PageActions>
        }
      />
      {refresh.dataUpdatedAt > 0 ? (
        <FactStrip
          label={t("Kayıtlı kelimeler")}
          facts={[
            {
              label: t("Güncellendi"),
              value: formatDateTime(
                new Date(refresh.dataUpdatedAt).toISOString(),
              ),
            },
          ]}
        />
      ) : null}
    </>
  );
}
