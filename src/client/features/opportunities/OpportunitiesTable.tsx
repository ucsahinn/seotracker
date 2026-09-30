import { useMemo, useState, type MouseEvent } from "react";
import { Target } from "lucide-react";
import { EmptyState } from "@/client/components/EmptyState";
import {
  AppDataTable,
  useAppTable,
} from "@/client/components/table/AppDataTable";
import { TableExportMenu } from "@/client/components/table/TableBulkActionBar";
import { buildOpportunityColumns } from "@/client/features/opportunities/OpportunityColumns";
import { OpportunityDetail } from "@/client/features/opportunities/OpportunityDetail";
import type { OpportunityRow } from "@/client/features/opportunities/opportunityLogic";
import { buildCsv, downloadCsv, type CsvValue } from "@/client/lib/csv";
import { exportTableToSheets } from "@/client/lib/exportToSheets";
import { formatNumber } from "@/client/lib/format";

const OPPORTUNITY_HEADERS = [
  "Puan",
  "Sayfa",
  "Sıra",
  "Gösterim",
  "Tıklama",
  "Tıklama oranı",
  "Oturum",
] as const;

/**
 * The ranked worklist, as a real table.
 *
 * A row opens the detail panel: the numbers alone never said why a page was
 * on the list or what to do about it. The button in the page cell is the
 * keyboard route; a click anywhere else on the row is the same thing for a
 * mouse, unless it landed on a control that has its own job.
 */
export function OpportunitiesTable({
  projectId,
  rows,
  onReset,
}: {
  projectId: string;
  rows: OpportunityRow[];
  /** Clears the filters that emptied the table, when there are any. */
  onReset?: () => void;
}) {
  const [openPage, setOpenPage] = useState<string | null>(null);
  const columns = useMemo(
    () => buildOpportunityColumns((row) => setOpenPage(row.page)),
    [],
  );
  const table = useAppTable({
    data: rows,
    columns,
    withSorting: true,
    // Score is the point of the screen, so it stays the default order.
    initialState: { sorting: [{ id: "score", desc: true }] },
  });

  const opened = rows.find((row) => row.page === openPage) ?? null;

  const csvRows = rows.map((row): CsvValue[] => [
    row.score,
    row.page,
    row.position,
    row.impressions,
    row.clicks,
    row.ctr,
    row.ga4?.sessions ?? null,
  ]);

  return (
    <div className="overflow-hidden rounded-box border border-base-300 bg-base-100">
      <div className="flex items-center justify-between gap-3 border-b border-base-300 px-3 py-2">
        <p className="text-xs text-muted">
          Ayrıntı ve öneriler için bir satıra tıklayın.
        </p>
        <TableExportMenu
          buttonClassName="btn btn-ghost btn-sm gap-1"
          actions={[
            {
              label: `Sheets'e aktar (${formatNumber(rows.length)} satır)`,
              onClick: () =>
                void exportTableToSheets({
                  headers: [...OPPORTUNITY_HEADERS],
                  rows: csvRows,
                  feature: "search_opportunities",
                }),
            },
            {
              label: `CSV (${formatNumber(rows.length)} satır)`,
              onClick: () =>
                downloadCsv(
                  "firsatlar.csv",
                  buildCsv([...OPPORTUNITY_HEADERS], csvRows),
                ),
            },
          ]}
        />
      </div>
      <AppDataTable
        table={table}
        className="table table-sm"
        wrapperClassName="overflow-x-auto"
        getRowProps={(row) => ({
          className: "cursor-pointer hover:bg-base-200/60",
          onClick: (event: MouseEvent<HTMLTableRowElement>) => {
            if (
              event.target instanceof Element &&
              event.target.closest("a, button, [role=menu]")
            ) {
              return;
            }
            setOpenPage(row.original.page);
          },
        })}
        empty={
          <EmptyState
            compact
            icon={Target}
            title="Bu süzgece uyan sayfa yok"
            description="Seçtiğiniz tür ya da hızlı süzgeç bu dönemde hiçbir sayfayla eşleşmedi. Süzgeçleri kaldırın ya da dönemi genişletin."
            action={
              onReset ? (
                <button type="button" className="btn btn-sm" onClick={onReset}>
                  Süzgeçleri kaldır
                </button>
              ) : undefined
            }
          />
        }
      />
      {opened ? (
        <OpportunityDetail
          row={opened}
          projectId={projectId}
          onClose={() => setOpenPage(null)}
        />
      ) : null}
    </div>
  );
}
