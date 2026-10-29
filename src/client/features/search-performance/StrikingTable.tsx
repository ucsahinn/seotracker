import { t } from "@/shared/i18n";
import * as React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { Copy, Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import {
  AppDataTable,
  makeSelectionColumn,
  useAppTable,
  useSelectionAnchor,
} from "@/client/components/table/AppDataTable";
import {
  TableBulkActionBar,
  TableBulkActionButton,
} from "@/client/components/table/TableBulkActionBar";
import { TablePagination } from "@/client/components/table/TablePagination";
import { SortableHeader } from "@/client/components/table/SortableHeader";
import { copyText } from "@/client/lib/copyText";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { captureClientEvent } from "@/client/lib/observability";
import { formatCount, formatDecimal, formatPercent } from "@/client/lib/format";
import { saveKeywords } from "@/serverFunctions/savedKeywords";
import { type StrikingQuery } from "@/shared/searchInsights";
import { SEARCH_PERFORMANCE_PAGE_SIZES } from "@/types/schemas/search-performance";
import { gainText, shortPage } from "@/shared/searchTodoCopy";
import type { DrillTarget } from "@/client/features/search-performance/DrilldownPanel";

const SAVE_BATCH_SIZE = 500;

export function KeyButton({
  label,
  title,
  onClick,
}: {
  label: string;
  title: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="block max-w-full truncate text-left hover:underline focus-visible:outline-2 focus-visible:outline-primary"
      title={title}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

const helper = createColumnHelper<StrikingQuery>();
const right = {
  headerClassName: "text-right",
  cellClassName: "text-right tabular-nums",
} as const;

function strikingColumns(
  anchorRef: ReturnType<typeof useSelectionAnchor>,
  onOpen: (target: DrillTarget) => void,
): ColumnDef<StrikingQuery>[] {
  return [
    makeSelectionColumn<StrikingQuery>(anchorRef, (row) => row.original.query),
    helper.accessor("query", {
      enableSorting: false,
      header: () => t("Sorgu"),
      cell: ({ getValue }) => (
        <span className="block max-w-xs">
          <KeyButton
            label={getValue()}
            title={getValue()}
            onClick={() => onOpen({ dimension: "query", key: getValue() })}
          />
        </span>
      ),
    }),
    helper.accessor("page", {
      enableSorting: false,
      header: () => t("Hedef sayfa"),
      cell: ({ getValue, row }) => {
        const page = getValue();
        if (!page) return <span className="text-subtle">–</span>;
        return (
          <span className="block max-w-xs">
            <KeyButton
              label={shortPage(page)}
              title={page}
              onClick={() => onOpen({ dimension: "page", key: page })}
            />
            {row.original.pageCount > 1 ? (
              <span className="text-xs text-subtle">
                {t("{count} sayfa bu sorguda", {
                  count: row.original.pageCount,
                })}
              </span>
            ) : null}
          </span>
        );
      },
    }),
    helper.accessor("position", {
      header: ({ column }) => (
        <SortableHeader column={column} label={t("Sıra")} align="right" />
      ),
      cell: ({ getValue }) => formatDecimal(getValue()),
      meta: right,
    }),
    // CTR rather than impressions: it says whether the result is already
    // pulling its weight. Impressions stay in the cell's tooltip.
    helper.accessor("ctr", {
      header: ({ column }) => (
        <SortableHeader
          column={column}
          label={t("Tıklama oranı")}
          align="right"
        />
      ),
      cell: ({ getValue, row }) => (
        <span
          title={t("{impressions} gösterim", {
            impressions: formatCount(row.original.impressions),
          })}
        >
          {formatPercent(getValue())}
        </span>
      ),
      meta: right,
    }),
    helper.accessor("clicks", {
      header: ({ column }) => (
        <SortableHeader column={column} label={t("Tıklama")} align="right" />
      ),
      cell: ({ getValue }) => formatCount(getValue()),
      meta: right,
    }),
    helper.accessor((row) => row.potentialClicks ?? -1, {
      id: "potential",
      header: ({ column }) => (
        <SortableHeader
          column={column}
          label={t("Olası kazanç (en fazla)")}
          align="right"
        />
      ),
      cell: ({ row }) =>
        row.original.potentialClicks === null ? (
          <span className="text-subtle" title={t("Yetersiz veri")}>
            –
          </span>
        ) : (
          <span className="font-medium text-[var(--ink-success)]">
            {gainText(row.original.potentialClicks)}
          </span>
        ),
      meta: right,
    }),
  ];
}

export function StrikingTable({
  projectId,
  rows,
  onOpen,
}: {
  projectId: string;
  rows: StrikingQuery[];
  onOpen: (target: DrillTarget) => void;
}) {
  const queryClient = useQueryClient();
  const anchorRef = useSelectionAnchor();
  const [rowSelection, setRowSelection] = React.useState({});
  const columns = React.useMemo(
    () => strikingColumns(anchorRef, onOpen),
    [anchorRef, onOpen],
  );
  const table = useAppTable({
    data: rows,
    columns,
    withSorting: true,
    withPagination: true,
    enableRowSelection: true,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    getRowId: (row) => row.query,
    initialState: {
      sorting: [{ id: "potential", desc: true }],
      pagination: { pageIndex: 0, pageSize: 25 },
    },
  });
  const pagination = table.getState().pagination;
  const selected = table
    .getSelectedRowModel()
    .rows.map((row) => row.original.query);

  const save = useMutation({
    mutationFn: async (keywords: string[]) => {
      const savedKeywordIds: string[] = [];
      for (let start = 0; start < keywords.length; start += SAVE_BATCH_SIZE) {
        const result = await saveKeywords({
          data: {
            projectId,
            keywords: keywords.slice(start, start + SAVE_BATCH_SIZE),
          },
        });
        savedKeywordIds.push(...result.savedKeywordIds);
      }
      return { savedKeywordIds };
    },
    onSuccess: (result, keywords) => {
      captureClientEvent("keyword:save", {
        source_feature: "search_performance",
        keyword_count: keywords.length,
      });
      void queryClient.invalidateQueries({
        queryKey: ["savedKeywords", projectId],
      });
      toast.success(
        t("{count} kelime kayıtlı", { count: result.savedKeywordIds.length }),
      );
      setRowSelection({});
    },
    onError: (error) =>
      toast.error(getStandardErrorMessage(error, t("Kelimeler kaydedilemedi"))),
  });

  return (
    <>
      {/* Below 640px the table lost its gain column off the right edge, so
          each row becomes a two-line card there. */}
      <ul className="divide-y divide-[var(--hairline)] border-t border-[var(--hairline)] sm:hidden">
        {table.getRowModel().rows.map((row) => {
          const item = row.original;
          return (
            <li key={item.query}>
              <button
                type="button"
                className="flex min-h-11 w-full flex-col gap-0.5 px-4 py-2.5 text-left hover:bg-base-200/50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
                onClick={() => onOpen({ dimension: "query", key: item.query })}
              >
                <span className="text-sm font-medium [overflow-wrap:anywhere]">
                  {item.query}
                </span>
                <span className="text-xs tabular-nums text-muted [overflow-wrap:anywhere]">
                  {[
                    t("Sıra {position}", {
                      position: formatDecimal(item.position),
                    }),
                    item.potentialClicks === null
                      ? null
                      : gainText(item.potentialClicks),
                    item.page ? shortPage(item.page) : null,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <AppDataTable
        table={table}
        caption={t("Sıra 4-20 arasındaki sorgular")}
        className="table table-sm"
        wrapperClassName="hidden overflow-x-auto sm:block"
      />
      {rows.length > 25 ? (
        <TablePagination
          page={pagination.pageIndex + 1}
          pageSize={pagination.pageSize}
          pageSizes={SEARCH_PERFORMANCE_PAGE_SIZES}
          totalCount={rows.length}
          hasNextPage={table.getCanNextPage()}
          isLoading={false}
          onPageChange={(next) => table.setPageIndex(next - 1)}
          onPageSizeChange={(next) => table.setPageSize(next)}
        />
      ) : null}
      <TableBulkActionBar
        selectedCount={selected.length}
        selectedLabel={t("kelime")}
        onClear={() => setRowSelection({})}
        actions={
          <div className="flex items-center gap-1 px-1.5">
            <TableBulkActionButton
              icon={<Copy className="size-3.5" />}
              onClick={() =>
                void copyText(
                  selected.join("\n"),
                  t("{count} kelime kopyalandı", { count: selected.length }),
                )
              }
            >
              {t("Kelimeleri kopyala")}
            </TableBulkActionButton>
            <TableBulkActionButton
              icon={
                save.isPending ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <Save className="size-3.5" />
                )
              }
              onClick={() => save.mutate(selected)}
              disabled={save.isPending}
            >
              {t("Kelime olarak kaydet")}
            </TableBulkActionButton>
          </div>
        }
      />
    </>
  );
}
