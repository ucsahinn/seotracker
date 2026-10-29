import type { SavedEvidence } from "@/shared/savedWatchlist";
import { placesDelta } from "@/shared/delta";
import { formatCount } from "@/shared/format";
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
import { useQuery } from "@tanstack/react-query";
import { Bookmark } from "lucide-react";
import { gscConnectionOptions } from "@/client/features/integrations/googleConnectionQueries";
import { formatDecimal } from "@/client/lib/format";
import { useMemo } from "react";
import {
  AppDataTable,
  makeSelectionColumn,
  useAppTable,
  useSelectionAnchor,
} from "@/client/components/table/AppDataTable";
import { SortableHeader } from "@/client/components/table/SortableHeader";
import type { SavedKeywordRow } from "@/types/keywords";
import { BAND_LABELS, bandOf } from "@/shared/positionBands";
import { TagChip } from "./TagChip";
import { SavedChange, SavedMetrics } from "./SavedKeywordMetrics";
import { Copy, Search as SearchIcon, Trash2 } from "lucide-react";
import { RowActions } from "@/client/components/table/RowActions";
import { t } from "@/shared/i18n";

const columnHelper = createColumnHelper<SavedKeywordRow>();

export function SavedKeywordsTable({
  projectId,
  blocked,
  evidence,
  onClear,
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
  blocked: boolean;
  evidence: (SavedKeywordRow & SavedEvidence)[];
  onClear: () => void;
  /** Average position per normalised keyword, from the Search Console archive. */
  positions: Map<string, number>;
  rows: SavedKeywordRow[];
  rowSelection: RowSelectionState;
  sorting: SortingState;
  isLoading: boolean;
  hasActiveFilters: boolean;
  onRowSelectionChange: OnChangeFn<RowSelectionState>;
  onSortingChange: OnChangeFn<SortingState>;
  onRemove: (row: SavedKeywordRow) => void;
  /** Opens Search Performance filtered to this keyword. */
  onInspect: (row: SavedKeywordRow) => void;
}) {
  const evidenceById = useMemo(
    () => new Map(evidence.map((row) => [row.id, row])),
    [evidence],
  );
  const selectAnchorRef = useSelectionAnchor();
  // "Karşılaştırma yok" on every row is one fact; with no comparable row the
  // change column goes and a line above the table says it once.
  const comparable = evidence.some(
    (row) => placesDelta(row.position, row.previousPosition) !== null,
  );
  const columns = useMemo<ColumnDef<SavedKeywordRow>[]>(
    () => [
      makeSelectionColumn<SavedKeywordRow>(
        selectAnchorRef,
        (row) => row.original.keyword,
      ),
      columnHelper.accessor("keyword", {
        header: ({ column }) => (
          <SortableHeader column={column} label={t("Kelime")} />
        ),
        cell: ({ getValue, row }) => (
          <div>
            <button
              type="button"
              className="link link-hover min-h-9 break-words text-left font-medium max-sm:min-h-11 max-sm:text-[15px]"
              title={t("Arşiv ayrıntısı")}
              onClick={() => onInspect(row.original)}
            >
              {getValue()}
            </button>
            <div className="mt-1 space-y-2 sm:hidden">
              <SavedMetrics
                row={evidenceById.get(row.original.id)}
                comparable={comparable}
              />
              <TagList tags={row.original.tags} hideEmpty />
            </div>
          </div>
        ),
      }),
      // Search volume, CPC, ad competition and keyword difficulty were bought
      // from DataForSEO. That data is gone, so every one of those columns
      // rendered a dash on every row: four columns of nothing, pushing the
      // useful ones off the side of the table.
      columnHelper.accessor((row) => positions.get(row.id) ?? null, {
        id: "position",
        header: ({ column }) => (
          <SortableHeader
            column={column}
            label={t("Ortalama sıra")}
            align="right"
          />
        ),
        cell: ({ row, getValue }) =>
          getValue() === null ? (
            <span
              className="text-subtle"
              title={
                evidenceById.get(row.original.id)?.positionStatus ===
                "unavailable"
                  ? t(
                      "Sıra arşivi okunamadı. Liste kayıtlı; sıra bilgisi için yeniden deneyin.",
                    )
                  : evidenceById.get(row.original.id)?.positionStatus ===
                      "unknownDueToCoverage"
                    ? t("Eksik arşiv nedeniyle gözlem yokluğu doğrulanamaz")
                    : t("Okunan arşivde eşleşen gözlem yok")
              }
            >
              {t("Sıra bilinmiyor")}
            </span>
          ) : (
            <span className="whitespace-nowrap">
              {formatDecimal(getValue()!)}
              <span className="ml-1.5 text-xs text-muted">
                {BAND_LABELS[bandOf(getValue()!)]}
              </span>
            </span>
          ),
        meta: {
          cellClassName: "hidden text-right tabular-nums sm:table-cell",
          headerClassName: "hidden text-right sm:table-cell",
        },
      }),
      columnHelper.accessor((row) => evidenceById.get(row.id)?.delta ?? null, {
        id: "delta",
        header: ({ column }) => (
          <SortableHeader column={column} label={t("Değişim")} align="right" />
        ),
        cell: ({ row }) => (
          <SavedChange row={evidenceById.get(row.original.id)} />
        ),
        meta: {
          cellClassName: "hidden text-right tabular-nums sm:table-cell",
          headerClassName: "hidden text-right sm:table-cell",
        },
      }),
      columnHelper.accessor(
        (row) => evidenceById.get(row.id)?.impressions ?? null,
        {
          id: "impressions",
          header: ({ column }) => (
            <SortableHeader
              column={column}
              label={t("Gösterimler")}
              align="right"
            />
          ),
          cell: ({ getValue }) =>
            getValue() === null ? "—" : formatCount(getValue()!),
          meta: {
            cellClassName: "hidden text-right tabular-nums sm:table-cell",
            headerClassName: "hidden text-right sm:table-cell",
          },
        },
      ),
      columnHelper.display({
        id: "tags",
        header: () => t("Etiketler"),
        cell: ({ row }) => <TagList tags={row.original.tags} />,
        enableSorting: false,
        meta: {
          cellClassName: "hidden min-w-40 max-w-64 sm:table-cell",
          headerClassName: "hidden sm:table-cell",
        },
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
            label={t("{title} için işlemler", { title: row.original.keyword })}
            actions={[
              {
                label: t("Kelimeyi kopyala"),
                icon: Copy,
                onSelect: () =>
                  void copyText(row.original.keyword, t("Kelime kopyalandı")),
              },
              {
                label: t("Arşiv ayrıntısı"),
                icon: SearchIcon,
                onSelect: () => onInspect(row.original),
              },
              {
                label: t("Kelimeyi sil"),
                icon: Trash2,
                destructive: true,
                onSelect: () => {
                  if (!blocked) onRemove(row.original);
                },
              },
            ]}
          />
        ),
        meta: { cellClassName: "w-10 text-right" },
      }),
    ],
    [
      onInspect,
      onRemove,
      positions,
      selectAnchorRef,
      evidenceById,
      blocked,
      comparable,
    ],
  );
  const table = useAppTable({
    data: rows,
    columns,
    state: {
      rowSelection,
      sorting,
      columnVisibility: { delta: comparable },
    },
    onRowSelectionChange,
    onSortingChange,
    getRowId: (row) => row.id,
    enableRowSelection: !blocked,
    manualSorting: true,
  });

  return (
    <>
      {rows.length > 0 && !comparable && !isLoading ? (
        <p className="text-xs text-muted">
          {t(
            "Değişim sütunu gizlendi: önceki dönemde bu sorguların hiçbiri için veri yok.",
          )}
        </p>
      ) : null}
      <AppDataTable
        table={table}
        caption={t("Kayıtlı kelimeler")}
        className="table table-sm [&_td]:py-1.5"
        isLoading={isLoading}
        loading={<SavedKeywordsSkeleton />}
        empty={
          <SavedKeywordsEmptyState
            projectId={projectId}
            hasActiveFilters={hasActiveFilters}
            onClear={onClear}
          />
        }
      />
    </>
  );
}

function TagList({
  tags,
  hideEmpty = false,
}: {
  tags: SavedKeywordRow["tags"];
  hideEmpty?: boolean;
}) {
  if (tags.length === 0) {
    return hideEmpty ? null : <span className="text-subtle">-</span>;
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
           Eklenme, işlemler. It was a nine-column grid holding eight
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
  onClear,
}: {
  onClear: () => void;
  projectId: string;
  hasActiveFilters: boolean;
}) {
  // The query screen is a dead end until Search Console is connected, so the
  // one next action depends on the connection.
  const connection = useQuery(gscConnectionOptions(projectId));
  if (hasActiveFilters) {
    return (
      <EmptyState
        icon={Bookmark}
        title={t("Bu filtrelere uyan kelime yok")}
        description={t("Filtreleri gevşetin ya da temizleyin.")}
        action={
          <button className="btn btn-sm" onClick={onClear}>
            {t("Tümünü temizle")}
          </button>
        }
      />
    );
  }
  const notConnected = connection.data?.connected === false;
  return (
    <EmptyState
      icon={Bookmark}
      title={t("Henüz kayıtlı kelime yok")}
      description={t(
        "Arama performansı ekranında bir ya da birkaç sorguyu seçip “Kelime olarak kaydet” deyin. Kaydettikleriniz burada etiketlenir, sıralamayla birlikte listelenir ve dışa aktarılır.",
      )}
      action={
        connection.isPending ? undefined : connection.isError ? (
          <button
            className="btn btn-sm"
            onClick={() => void connection.refetch()}
          >
            {t("Bağlantı okunamadı; yeniden dene")}
          </button>
        ) : notConnected ? (
          <Link
            to="/p/$projectId/settings/integrations"
            params={{ projectId }}
            className="btn btn-primary btn-sm"
          >
            {t("Search Console'u bağla")}
          </Link>
        ) : (
          <Link
            to="/p/$projectId/search-performance"
            params={{ projectId }}
            search={{ tab: "queries" }}
            className="btn btn-primary btn-sm gap-1.5"
          >
            <SearchIcon className="size-4" aria-hidden />
            {t("Sorgulara göz at")}
          </Link>
        )
      }
    />
  );
}
