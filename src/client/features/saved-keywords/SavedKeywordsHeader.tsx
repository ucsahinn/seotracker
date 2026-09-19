import { ChevronDown, Download, FileDown, Loader2, Sheet } from "lucide-react";

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
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold">Kayıtlı Kelimeler</h1>
        <p className="text-sm text-base-content/70">
          Önemsediğiniz sorguları bir arada tutun, etiketleyin ve harekete
          geçmeye hazır olduğunuzda geri dönün.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <div className="dropdown dropdown-end">
          <button
            type="button"
            tabIndex={0}
            disabled={disabled}
            aria-haspopup="menu"
            className={`btn btn-ghost btn-sm gap-1.5 ${disabled ? "btn-disabled" : ""}`}
          >
            {exporting != null ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Download className="size-4" />
            )}
            Dışa aktar
            <ChevronDown className="size-3 opacity-60" />
          </button>
          <ul
            tabIndex={0}
            role="menu"
            className="dropdown-content menu z-10 w-56 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg"
          >
            <li>
              <button
                type="button"
                onClick={onExportSheets}
                disabled={disabled}
              >
                <Sheet className="size-4" />
                Sheets&apos;e aktar
              </button>
            </li>
            <li>
              <button type="button" onClick={onExportCsv} disabled={disabled}>
                <FileDown className="size-4" />
                CSV indir
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
