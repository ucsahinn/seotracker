import { PageHeader } from "@/client/components/PageShell";
import { TableExportMenu } from "@/client/components/table/TableBulkActionBar";
import { Download, FileDown, Loader2, Sheet } from "lucide-react";

export function SavedKeywordsHeader({
  totalCount,
  exporting,
  onExportCsv,
  onExportSheets,
}: {
  totalCount: number;
  exporting: "csv" | "sheets" | null;
  onExportCsv: () => void;
  onExportSheets: () => void;
}) {
  const disabled = totalCount === 0 || exporting != null;

  return (
    <PageHeader
      title="Kayıtlı kelimeler"
      description="Arama performansından kaydettiğiniz sorgular. Etiketleyin, Search Console'daki ortalama sıralarına bakın, CSV ya da Sheets'e aktarın."
      actions={
        /*
         * The shared menu, not a third copy of the same dropdown. The inline
         * one had no `aria-expanded`, no Escape handler, and could be clipped
         * by an overflow ancestor — all three already solved once in
         * `TableExportMenu`, and all three reintroduced by copying it.
         */
        <TableExportMenu
          buttonClassName={`btn btn-ghost btn-sm gap-1.5 ${
            disabled ? "btn-disabled" : ""
          }`}
          triggerIcon={
            exporting != null ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Download className="size-4" />
            )
          }
          actions={[
            {
              label: "Sheets'e aktar",
              icon: <Sheet className="size-4" />,
              onClick: onExportSheets,
              disabled,
            },
            {
              label: "CSV indir",
              icon: <FileDown className="size-4" />,
              onClick: onExportCsv,
              disabled,
            },
          ]}
        />
      }
    />
  );
}
