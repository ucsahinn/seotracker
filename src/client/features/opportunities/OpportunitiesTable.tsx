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
import { Target } from "lucide-react";
import { EmptyState } from "@/client/components/EmptyState";

/*
 * The three parts a score is made of, at the weights that make it.
 *
 * The page already explains in prose that the score is 50% demand, 30%
 * business value and 20% reachability. It never showed which of the three a
 * given row's number came from -- and "67, all of it demand" and "67, the
 * page already earns" argue for different weeks of work. The widths are the
 * weighted contributions, so the filled part of the bar is literally the
 * score out of 100.
 */
const SCORE_PARTS = [
  { key: "demand", label: "Talep", weight: 0.5, opacity: 1 },
  { key: "businessValue", label: "İş değeri", weight: 0.3, opacity: 0.62 },
  { key: "reachability", label: "Yakınlık", weight: 0.2, opacity: 0.34 },
] as const;

function ScoreBadge({
  score,
  components,
}: {
  score: number | null | undefined;
  components?: OpportunityRow["scoreComponents"];
}) {
  if (score == null) {
    return <span className="text-subtle">-</span>;
  }
  // One threshold, not a rainbow: above 60 is worth planning work around.
  const strong = score >= 60;

  const parts = components
    ? SCORE_PARTS.map((part) => ({
        ...part,
        // Already 0-1 from the service; the weight turns it into points.
        points: (components[part.key] ?? 0) * part.weight * 100,
      }))
    : null;

  return (
    <div className="flex flex-col items-end gap-1">
      <span
        className={`badge badge-sm tabular-nums ${
          strong
            ? "border-success/30 bg-success/10 text-[var(--ink-success)]"
            : "border-base-300 bg-base-200 text-muted"
        }`}
      >
        {score}
      </span>
      {parts ? (
        <span
          className="flex h-1 w-16 overflow-hidden rounded-full bg-base-200"
          /* The bar is a restatement of the number beside it, so it carries
             the breakdown as a title rather than as its own announcement. */
          title={parts
            .map(
              (part) =>
                `${part.label}: ${formatDecimal(part.points)} / ${part.weight * 100}`,
            )
            .join(" · ")}
          aria-hidden
        >
          {parts.map((part) => (
            <span
              key={part.key}
              className="h-full bg-primary"
              style={{ width: `${part.points}%`, opacity: part.opacity }}
            />
          ))}
        </span>
      ) : null}
    </div>
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
          /* Reachable in normal use: pick a position band with rows, then
             change the window. "Gösterilecek satır yok." with no reason and
             no way back was the whole of it. */
          <EmptyState
            compact
            icon={Target}
            title="Gösterilecek satır yok"
            description="Seçili sıra bandında bu dönem için fırsat çıkmadı. Bandı kaldırmayı ya da dönemi genişletmeyi deneyin."
          />
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
      cell: ({ getValue, row }) => (
        <ScoreBadge
          score={getValue()}
          components={row.original.scoreComponents}
        />
      ),
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
