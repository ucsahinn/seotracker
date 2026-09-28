import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { useMemo } from "react";
import {
  AppDataTable,
  useAppTable,
} from "@/client/components/table/AppDataTable";
import { SortableHeader } from "@/client/components/table/SortableHeader";
import { nullableNumberSort } from "@/client/features/audit/results/AuditResultsTableFilterLogic";
import { TableExportMenu } from "@/client/components/table/TableBulkActionBar";
import { buildCsv, downloadCsv, type CsvValue } from "@/client/lib/csv";
import { exportTableToSheets } from "@/client/lib/exportToSheets";
import {
  formatDecimal,
  formatNumber,
  formatPercent,
} from "@/client/lib/format";
import type { OpportunityReport } from "@/client/features/opportunities/report";

function ScoreBadge({ score }: { score: number | null | undefined }) {
  if (score == null) {
    return <span className="text-subtle">-</span>;
  }
  // One threshold, not a rainbow: above 60 is worth planning work around.
  const strong = score >= 60;
  return (
    <span
      className={`badge badge-sm tabular-nums ${
        strong
          ? "border-success/30 bg-success/10 text-[var(--ink-success)]"
          : "border-base-300 bg-base-200 text-muted"
      }`}
    >
      {score}
    </span>
  );
}

function pathOf(url: string): string {
  try {
    return new URL(url).pathname || "/";
  } catch {
    return url;
  }
}

type OpportunityRow = OpportunityReport["rows"][number];
const opportunityHelper = createColumnHelper<OpportunityRow>();

const OPPORTUNITY_HEADERS = [
  "Puan",
  "Sayfa",
  "Sıra",
  "Gösterim",
  "Tıklama",
  "TO",
  "Oturum",
] as const;

/**
 * The ranked worklist, as a real table.
 *
 * It used to be a raw `<table>`: no sortable headers, no way into a row, no
 * export. Its nearest neighbour -- the striking-distance table, same Search
 * Console shape -- sorts, paginates, selects and saves, so an operator who
 * wanted "the ones with the most impressions" or "the closest to page one"
 * had to re-read fifty rows by eye on the one screen whose whole job is to
 * rank them.
 */
export function OpportunitiesTable({
  projectId,
  rows,
}: {
  projectId: string;
  rows: OpportunityRow[];
}) {
  const columns = useMemo(
    () => buildOpportunityColumns(projectId),
    [projectId],
  );
  const table = useAppTable({
    data: rows,
    columns,
    withSorting: true,
    // Score is the point of the screen, so it stays the default order.
    initialState: { sorting: [{ id: "score", desc: true }] },
  });

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
      <div className="flex items-center justify-end border-b border-base-300 px-3 py-2">
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
        empty={
          <p className="p-6 text-sm text-muted">Gösterilecek satır yok.</p>
        }
      />
    </div>
  );
}

function buildOpportunityColumns(
  projectId: string,
): ColumnDef<OpportunityRow>[] {
  const right = {
    headerClassName: "text-right",
    cellClassName: "text-right tabular-nums",
  } as const;
  return [
    opportunityHelper.accessor("score", {
      header: ({ column }) => (
        <SortableHeader column={column} label="Puan" align="right" />
      ),
      cell: ({ getValue }) => <ScoreBadge score={getValue()} />,
      meta: right,
    }),
    opportunityHelper.accessor("page", {
      header: ({ column }) => <SortableHeader column={column} label="Sayfa" />,
      cell: ({ getValue }) => {
        const url = getValue();
        return (
          <span className="flex min-w-0 items-center gap-2">
            {/* Two exits, because the question splits: what does this page
                look like, and what is it ranking for. Neither existed. */}
            <Link
              to="/p/$projectId/search-performance"
              params={{ projectId }}
              search={{ tab: "pages" as const }}
              className="link link-hover min-w-0 truncate"
              title={url}
            >
              {pathOf(url)}
            </Link>
            <a
              href={url}
              target="_blank"
              rel="noreferrer noopener"
              className="shrink-0 text-muted hover:text-base-content"
              aria-label="Sayfayı yeni sekmede aç"
            >
              <ExternalLink className="size-3.5" />
            </a>
          </span>
        );
      },
      meta: { cellClassName: "max-w-md" },
    }),
    opportunityHelper.accessor("position", {
      header: ({ column }) => (
        <SortableHeader column={column} label="Sıra" align="right" />
      ),
      cell: ({ getValue }) => formatDecimal(getValue()),
      meta: right,
    }),
    opportunityHelper.accessor("impressions", {
      header: ({ column }) => (
        <SortableHeader column={column} label="Gösterim" align="right" />
      ),
      cell: ({ getValue }) => formatNumber(getValue()),
      meta: right,
    }),
    opportunityHelper.accessor("clicks", {
      header: ({ column }) => (
        <SortableHeader column={column} label="Tıklama" align="right" />
      ),
      cell: ({ getValue }) => formatNumber(getValue()),
      meta: right,
    }),
    opportunityHelper.accessor("ctr", {
      header: ({ column }) => (
        <SortableHeader column={column} label="TO" align="right" />
      ),
      cell: ({ getValue }) => formatPercent(getValue()),
      meta: right,
    }),
    opportunityHelper.accessor((row) => row.ga4?.sessions ?? null, {
      id: "sessions",
      header: ({ column }) => (
        <SortableHeader column={column} label="Oturum" align="right" />
      ),
      cell: ({ getValue }) => {
        const value = getValue();
        return value === null ? (
          <span className="text-subtle">-</span>
        ) : (
          formatNumber(value)
        );
      },
      sortingFn: nullableNumberSort,
      meta: right,
    }),
  ];
}
