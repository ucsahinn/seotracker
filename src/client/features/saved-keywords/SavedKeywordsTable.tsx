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
import { Copy, Search as SearchIcon, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { RowActions } from "@/client/components/table/RowActions";

const columnHelper = createColumnHelper<SavedKeywordRow>();

export function SavedKeywordsTable({
  rows,
  rowSelection,
  sorting,
  isLoading,
  hasActiveFilters,
  onRowSelectionChange,
  onSortingChange,
  onRemove,
  onInspect,
}: {
  rows: SavedKeywordRow[];
  rowSelection: RowSelectionState;
  sorting: SortingState;
  isLoading: boolean;
  hasActiveFilters: boolean;
  onRowSelectionChange: OnChangeFn<RowSelectionState>;
  onSortingChange: OnChangeFn<SortingState>;
  onRemove: (id: string) => void;
  /** Opens Search Performance filtered to this keyword. */
  onInspect: (keyword: string) => void;
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
      /*
       * Per-row actions. Everything here used to live only in the bulk bar,
       * so copying one keyword meant: tick its box, wait for the bar, open
       * a dropdown, pick "copy keywords". Four steps to move one word.
       */
      columnHelper.display({
        id: "actions",
        header: () => null,
        cell: ({ row }) => (
          <RowActions
            label={`${row.original.keyword} için işlemler`}
            actions={[
              {
                label: "Kelimeyi kopyala",
                icon: Copy,
                onSelect: () => {
                  void navigator.clipboard
                    .writeText(row.original.keyword)
                    .then(() => toast.success("Kelime kopyalandı"))
                    .catch(() => toast.error("Panoya kopyalanamadı"));
                },
              },
              {
                label: "Arama performansında ara",
                icon: SearchIcon,
                onSelect: () => onInspect(row.original.keyword),
              },
              {
                label: "Kelimeyi sil",
                icon: Trash2,
                destructive: true,
                onSelect: () => onRemove(row.original.id),
              },
            ]}
          />
        ),
        meta: { cellClassName: "w-10 text-right" },
      }),
    ],
    [onInspect, onRemove, selectAnchorRef],
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
        /* Six columns, matching the table: select, Kelime, Amaç, Etiketler,
           Son alınma, işlemler. It was a nine-column grid holding eight
           children, so none of the bars lined up with what landed. */
        <div
          key={index}
          className="grid grid-cols-[1.5rem_2fr_1fr_2fr_1fr_2rem] items-center gap-3"
        >
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
