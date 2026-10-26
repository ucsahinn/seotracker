import { PageActions, RefreshButton } from "@/client/components/RefreshButton";
import { PageHeader } from "@/client/components/PageShell";
import { TableExportMenu } from "@/client/components/table/TableBulkActionBar";
import type { refreshState } from "@/client/lib/refreshState";
import { useDoneFlash } from "@/client/lib/useDoneFlash";
import { CheckCircle2, Download, FileDown, Loader2, Sheet } from "lucide-react";
import { t } from "@/shared/i18n";

export function SavedKeywordsHeader({
  refresh,
  totalCount,
  exporting,
  csvDownloaded,
  onExportCsv,
  onExportSheets,
}: {
  refresh: ReturnType<typeof refreshState>;
  totalCount: number;
  exporting: "csv" | "sheets" | null;
  csvDownloaded: boolean;
  onExportCsv: () => void;
  onExportSheets: () => void;
}) {
  const disabled = exporting != null;
  // Only the CSV lands in Downloads; a Sheets export opens its own tab.
  const flash = useDoneFlash(exporting === "csv", csvDownloaded);

  return (
    <PageHeader
      title={t("Kayıtlı kelimeler")}
      description={t(
        "Etiketleyin, Search Console'daki ortalama sıralarına bakın, CSV ya da E-Tablolar olarak dışa aktarın.",
      )}
      actions={
        <PageActions>
          <RefreshButton
            onRefresh={refresh.onRefresh}
            isFetching={refresh.isFetching}
            dataUpdatedAt={refresh.dataUpdatedAt}
            shortcut
          />
          {/*
           * The shared menu, not a third copy of the same dropdown. The inline
           * one had no `aria-expanded`, no Escape handler, and could be clipped
           * by an overflow ancestor — all three already solved once in
           * `TableExportMenu`, and all three reintroduced by copying it.
           */}
          {totalCount === 0 ? null : (
            <TableExportMenu
              buttonClassName={`btn btn-outline btn-sm gap-1.5 ${
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
              triggerLabel={flash === "done" ? t("İndirildi") : undefined}
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
  );
}
