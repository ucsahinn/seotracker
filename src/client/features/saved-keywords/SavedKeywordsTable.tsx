import { copyText } from "@/client/lib/copyText";
import { EmptyState } from "@/client/components/EmptyState";
import {
  createColumnHelper,
  type ColumnDef,
  type OnChangeFn,
  type RowSelectionState,
  type SortingState,
} from "@tanstack/react-table";
import { Link } from "@tanstack/react-router";
import { BarChart3, Bookmark } from "lucide-react";
import { formatDecimal } from "@/client/lib/format";
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
import { positionInk } from "@/client/features/rankings/positionBands";
import { TagChip } from "./TagChip";
import { formatSavedKeywordDate } from "./savedKeywordsUtils";
import { positionOf } from "./savedKeywordPositions";
import { Copy, Search as SearchIcon, Trash2 } from "lucide-react";
import { RowActions } from "@/client/components/table/RowActions";

const columnHelper = createColumnHelper<SavedKeywordRow>();

export function SavedKeywordsTable({
  projectId,
  positions,
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
  projectId: string;
  /** Average position per normalised keyword, from the Search Console archive. */
  positions: Map<string, number>;
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
      makeSelectionColumn<SavedKeywordRow>(
        selectAnchorRef,
        (row) => row.original.keyword,
      ),
      columnHelper.accessor("keyword", {
        header: ({ column }) => (
          <SortableHeader column={column} label="Kelime" />
        ),
        cell: ({ getValue }) => (
          <button
            type="button"
            className="link link-hover text-left font-medium"
            title="Arama performansında göster"
            onClick={() => onInspect(getValue())}
          >
            {getValue()}
          </button>
        ),
      }),
      // Search volume, CPC, ad competition and keyword difficulty were bought
      // from DataForSEO. That data is gone, so every one of those columns
      // rendered a dash on every row: four columns of nothing, pushing the
      // useful ones off the side of the table.
      columnHelper.display({
        id: "position",
        header: () => "Ort. sıra",
        cell: ({ row }) => {
          const position = positionOf(row.original.keyword, positions);
          return position === null ? (
            <span
              className="text-subtle"
              title="Search Console bu kelime için sıra kaydetmemiş"
            >
              -
            </span>
          ) : (
            <span className={`tabular-nums ${positionInk(position)}`}>
              {formatDecimal(position)}
            </span>
          );
        },
        enableSorting: false,
      }),
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
          <SortableHeader column={column} label="Veri tarihi" />
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
                onSelect: () =>
                  void copyText(row.original.keyword, "Kelime kopyalandı"),
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
    [onInspect, onRemove, positions, selectAnchorRef],
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
      caption="Kayıtlı anahtar kelimeler"
      className="table table-sm"
      isLoading={isLoading}
      loading={<SavedKeywordsSkeleton />}
      empty={
        <SavedKeywordsEmptyState
          projectId={projectId}
          hasActiveFilters={hasActiveFilters}
        />
      }
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
        /* Seven columns, matching the table: select, Kelime, Ort. sıra, Amaç, Etiketler,
           Veri tarihi, işlemler. It was a nine-column grid holding eight
           children, so none of the bars lined up with what landed. */
        <div
          key={index}
          className="grid grid-cols-[1.5rem_2fr_1fr_1fr_2fr_1fr_2rem] items-center gap-3"
        >
          {Array.from({ length: 7 }).map((_cell, cell) => (
            <div key={cell} className="skeleton h-4" />
          ))}
        </div>
      ))}
    </div>
  );
}

function SavedKeywordsEmptyState({
  projectId,
  hasActiveFilters,
}: {
  projectId: string;
  hasActiveFilters: boolean;
}) {
  if (hasActiveFilters) {
    return (
      <EmptyState
        icon={Bookmark}
        title="Bu filtrelere uyan kelime yok"
        description="Filtreleri gevşetin ya da temizleyin."
      />
    );
  }
  return (
    <EmptyState
      icon={Bookmark}
      title="Henüz kayıtlı kelime yok"
      description="Arama performansının Sorgular sekmesinde bir ya da birkaç sorguyu seçip “Kelime olarak kaydet” deyin. Kaydettikleriniz burada etiketlenir, ortalama sırasıyla listelenir ve dışa aktarılır."
      action={
        <div className="flex flex-wrap justify-center gap-2">
          <Link
            to="/p/$projectId/search-performance"
            params={{ projectId }}
            search={{ tab: "queries" }}
            className="btn btn-primary btn-sm gap-1.5"
          >
            <SearchIcon className="size-4" aria-hidden />
            Sorgulara göz at
          </Link>
          <Link
            to="/p/$projectId/rankings"
            params={{ projectId }}
            className="btn btn-ghost btn-sm gap-1.5"
          >
            <BarChart3 className="size-4" aria-hidden />
            Sıralamayı aç
          </Link>
        </div>
      }
    />
  );
}
