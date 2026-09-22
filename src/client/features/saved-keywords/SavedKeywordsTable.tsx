import { EmptyState } from "@/client/components/EmptyState";
import {
  createColumnHelper,
  type ColumnDef,
  type OnChangeFn,
  type RowSelectionState,
  type SortingState,
} from "@tanstack/react-table";
import { Search } from "lucide-react";
import { useMemo } from "react";
import {
  AppDataTable,
  makeSelectionColumn,
  useAppTable,
  useSelectionAnchor,
} from "@/client/components/table/AppDataTable";
import { SortableHeader } from "@/client/components/table/SortableHeader";
import { IntentBadge } from "@/client/features/saved-keywords/components";
import type { KeywordIntent, SavedKeywordRow } from "@/types/keywords";
import { TagChip } from "./TagChip";
import { formatSavedKeywordDate } from "./savedKeywordsUtils";

const columnHelper = createColumnHelper<SavedKeywordRow>();

export function SavedKeywordsTable({
  rows,
  rowSelection,
  sorting,
  isLoading,
  hasActiveFilters,
  onRowSelectionChange,
  onSortingChange,
}: {
  rows: SavedKeywordRow[];
  rowSelection: RowSelectionState;
  sorting: SortingState;
  isLoading: boolean;
  hasActiveFilters: boolean;
  onRowSelectionChange: OnChangeFn<RowSelectionState>;
  onSortingChange: OnChangeFn<SortingState>;
}) {
  const selectAnchorRef = useSelectionAnchor();
  const columns = useMemo<ColumnDef<SavedKeywordRow>[]>(
    () => [
      makeSelectionColumn<SavedKeywordRow>(selectAnchorRef),
      columnHelper.accessor("keyword", {
        header: ({ column }) => (
          <SortableHeader column={column} label="Kelime" />
        ),
        cell: ({ getValue }) => (
          <span className="font-medium">{getValue()}</span>
        ),
      }),
      // Search volume, CPC, ad competition and keyword difficulty were bought
      // from DataForSEO. That data is gone, so every one of those columns
      // rendered a dash on every row: four columns of nothing, pushing the
      // useful ones off the side of the table.
      columnHelper.accessor("intent", {
        header: () => "Amaç",
        cell: ({ getValue }) => (
          <IntentBadge intent={normalizeIntent(getValue())} />
        ),
        enableSorting: false,
      }),
      columnHelper.display({
        id: "tags",
        header: () => "Etiketler",
        cell: ({ row }) => <TagList tags={row.original.tags} />,
        enableSorting: false,
        meta: { cellClassName: "min-w-40 max-w-64" },
      }),
      columnHelper.accessor("fetchedAt", {
        header: ({ column }) => (
          <SortableHeader column={column} label="Son alınma" />
        ),
        cell: ({ getValue }) => (
          <span className="text-xs text-muted">
            {formatSavedKeywordDate(getValue())}
          </span>
        ),
      }),
    ],
    [selectAnchorRef],
  );
  const table = useAppTable({
    data: rows,
    columns,
    state: { rowSelection, sorting },
    onRowSelectionChange,
    onSortingChange,
    getRowId: (row) => row.id,
    enableRowSelection: true,
    manualSorting: true,
  });

  return (
    <AppDataTable
      table={table}
      className="table table-sm"
      isLoading={isLoading}
      loading={<SavedKeywordsSkeleton />}
      empty={<SavedKeywordsEmptyState hasActiveFilters={hasActiveFilters} />}
    />
  );
}

function normalizeIntent(value: string | null): KeywordIntent {
  switch (value) {
    case "informational":
    case "commercial":
    case "transactional":
    case "navigational":
    case "unknown":
      return value;
    default:
      return "unknown";
  }
}

function TagList({ tags }: { tags: SavedKeywordRow["tags"] }) {
  if (tags.length === 0) {
    return <span className="text-subtle">-</span>;
  }
  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag) => (
        <TagChip key={tag.id} tag={tag} size="xs" />
      ))}
    </div>
  );
}

function SavedKeywordsSkeleton() {
  return (
    <div className="space-y-3" aria-busy>
      <div className="skeleton h-4 w-48" />
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="grid grid-cols-9 items-center gap-3">
          <div className="skeleton h-4" />
          <div className="skeleton col-span-2 h-4" />
          <div className="skeleton h-4" />
          <div className="skeleton h-4" />
          <div className="skeleton h-4" />
          <div className="skeleton h-4" />
          <div className="skeleton h-4" />
          <div className="skeleton h-4" />
        </div>
      ))}
    </div>
  );
}

function SavedKeywordsEmptyState({
  hasActiveFilters,
}: {
  hasActiveFilters: boolean;
}) {
  return (
    <EmptyState
      icon={Search}
      title={
        hasActiveFilters
          ? "Bu filtrelere uyan kelime yok"
          : "Henüz kayıtlı kelime yok"
      }
      description={
        hasActiveFilters
          ? "Filtreleri gevşetin ya da temizleyin."
          : "Arama Performansı sayfasındaki sorgularınızı kaydederek buraya ekleyin."
      }
    />
  );
}
