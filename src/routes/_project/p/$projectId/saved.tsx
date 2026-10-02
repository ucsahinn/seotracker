import { PageShell } from "@/client/components/PageShell";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import type {
  OnChangeFn,
  RowSelectionState,
  SortingState,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { copyText } from "@/client/lib/copyText";
import { refreshState } from "@/client/lib/refreshState";
import { SavedKeywordsBulkActionBar } from "@/client/features/saved-keywords/SavedKeywordsBulkActionBar";
import { SavedKeywordsBulkTagsModal } from "@/client/features/saved-keywords/SavedKeywordsBulkTagsModal";
import { SavedKeywordsFilters } from "@/client/features/saved-keywords/SavedKeywordsFilters";
import { SavedKeywordsHeader } from "@/client/features/saved-keywords/SavedKeywordsHeader";
import {
  DeleteSavedKeywordsModal,
  RemoveSavedKeywordsError,
} from "@/client/features/saved-keywords/SavedKeywordsModals";
import { TablePagination } from "@/client/components/table/TablePagination";
import { SavedKeywordsSummary } from "@/client/features/saved-keywords/SavedKeywordsSummary";
import {
  filterByPosition,
  type PositionFilter,
} from "@/client/features/saved-keywords/savedKeywordPositions";
import { useSavedKeywordPositions } from "@/client/features/saved-keywords/useSavedKeywordPositions";
import { SavedKeywordsStatus } from "@/client/features/saved-keywords/SavedKeywordsStatus";
import { QueryErrorState } from "@/client/components/QueryErrorState";
import { SavedKeywordsTable } from "@/client/features/saved-keywords/SavedKeywordsTable";
import { compileSavedKeywordsFilters } from "@/client/features/saved-keywords/savedKeywordsFilterTypes";
import {
  SAVED_KEYWORD_PAGE_SIZES,
  toSavedKeywordSort,
  uniqueTagsOf,
} from "@/client/features/saved-keywords/savedKeywordsUtils";
import { useSavedKeywordsExport } from "@/client/features/saved-keywords/useSavedKeywordsExport";
import { useSavedKeywordsFilters } from "@/client/features/saved-keywords/useSavedKeywordsFilters";
import { useSavedKeywordMutations } from "@/client/features/saved-keywords/useSavedKeywordMutations";
import { useTagManage } from "@/client/features/saved-keywords/useTagManage";
import { getSavedKeywords } from "@/serverFunctions/savedKeywords";

export const Route = createFileRoute("/_project/p/$projectId/saved")({
  component: SavedKeywordsPage,
});

const FILTER_DEBOUNCE_MS = 350;

function SavedKeywordsPage() {
  const { projectId } = Route.useParams();
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  // A position group chosen in the summary. Null means the server-paged list.
  const [positionFilter, setPositionFilter] = useState<PositionFilter | null>(
    null,
  );
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] =
    useState<(typeof SAVED_KEYWORD_PAGE_SIZES)[number]>(50);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "fetchedAt", desc: true },
  ]);
  const navigate = useNavigate();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [removeError, setRemoveError] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showTagModal, setShowTagModal] = useState(false);

  const filters = useSavedKeywordsFilters();
  const [committedFilterValues, setCommittedFilterValues] = useState(
    filters.values,
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setCommittedFilterValues(filters.values);
      setPage(1);
    }, FILTER_DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [filters.values]);

  const appliedFilters = useMemo(
    () => compileSavedKeywordsFilters(committedFilterValues),
    [committedFilterValues],
  );

  const sortState = sorting[0];
  const sort = toSavedKeywordSort(sortState?.id);
  const order: "asc" | "desc" = sortState
    ? sortState.desc
      ? "desc"
      : "asc"
    : "desc";
  const tagFilterKey = selectedTagIds.join("|");
  const hasActiveFilters =
    filters.activeFilterCount > 0 ||
    selectedTagIds.length > 0 ||
    positionFilter !== null;

  const queryInput = useMemo(
    () => ({
      projectId,
      ...appliedFilters,
      tagIds: selectedTagIds.length > 0 ? selectedTagIds : undefined,
      page,
      pageSize,
      sort,
      order,
    }),
    [appliedFilters, order, page, pageSize, projectId, selectedTagIds, sort],
  );

  const savedQuery = useQuery({
    queryKey: ["savedKeywords", projectId, queryInput],
    queryFn: () => getSavedKeywords({ data: queryInput }),
    /* Only ever carry rows over within one project: a project switch must
       not show the old project's keywords while the new ones load. */
    placeholderData: (previous, previousQuery) =>
      previousQuery?.queryKey[1] === projectId ? previous : undefined,
  });
  const { data, isLoading, isFetching } = savedQuery;

  // The whole filtered list plus the Search Console archive: the summary
  // counts it, and choosing a position group pages through it locally
  // because the server knows nothing about positions.
  const positionData = useSavedKeywordPositions(projectId, {
    ...appliedFilters,
    tagIds: selectedTagIds.length > 0 ? selectedTagIds : undefined,
    sort,
    order,
  });
  const positionRows = useMemo(
    () =>
      filterByPosition(
        positionData.all.data?.rows ?? [],
        positionFilter,
        positionData.positions,
      ),
    [positionData.all.data, positionData.positions, positionFilter],
  );
  // Without the archive a position group cannot be computed, and the summary
  // then shows an error instead of the chips, so the filter could never be
  // cleared. Fall back to the plain list and let the summary carry the error.
  const trackedFailed = positionData.tracked.isError;
  const byPosition = positionFilter !== null && !trackedFailed;
  const loadingList = byPosition
    ? positionData.all.isLoading || positionData.tracked.isLoading
    : isLoading;
  const listError = byPosition ? positionData.all : savedQuery;

  useEffect(() => {
    if (trackedFailed) setPositionFilter(null);
  }, [trackedFailed]);

  const savedKeywords = byPosition
    ? positionRows.slice((page - 1) * pageSize, page * pageSize)
    : (data?.rows ?? []);
  const availableTags = data?.tags ?? [];
  const totalCount = byPosition ? positionRows.length : (data?.totalCount ?? 0);
  // A new page, sort or filter is loading behind the previous rows.
  const stale = byPosition ? false : savedQuery.isPlaceholderData;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const selectedRows = savedKeywords.filter((row) => rowSelection[row.id]);
  const selectedIds = selectedRows.map((row) => row.id);
  const selectedCount = selectedIds.length;

  const selectedRowTags = useMemo(
    () => uniqueTagsOf(selectedRows),
    [selectedRows],
  );

  useEffect(() => {
    setRowSelection({});
  }, [
    page,
    pageSize,
    appliedFilters,
    tagFilterKey,
    sort,
    order,
    positionFilter,
  ]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const { removeMutation, tagMutation } = useSavedKeywordMutations({
    projectId,
    onRemoved: () => {
      setRowSelection({});
      setShowConfirm(false);
      setRemoveError(null);
    },
    onRemoveFailed: setRemoveError,
    onTagged: () => {
      setRowSelection({});
      setShowTagModal(false);
    },
  });

  const tagManage = useTagManage(projectId);
  const exporter = useSavedKeywordsExport({
    projectId,
    // Same values the table is showing: exporting used the live filter
    // state while the table used the debounced one, so a click inside the
    // 350 ms window produced a file that did not match the screen.
    appliedFilters,
    selectedTagIds,
    sort,
    order,
    // The rows on screen while a position group narrows the table locally;
    // the server filters know nothing about positions.
    positionRows: byPosition ? positionRows : null,
  });

  const handleSortingChange: OnChangeFn<SortingState> = (updater) => {
    setSorting((current) =>
      typeof updater === "function" ? updater(current) : updater,
    );
    setPage(1);
  };

  const handleDeleteTag = async (tagId: string) => {
    const ok = await tagManage.deleteTag(tagId);
    if (ok) {
      setSelectedTagIds((current) => current.filter((id) => id !== tagId));
    }
  };

  const handleClearAllFilters = () => {
    filters.resetFilters();
    setSelectedTagIds([]);
    setPositionFilter(null);
    setPage(1);
  };

  return (
    <PageShell>
      <SavedKeywordsHeader
        totalCount={totalCount}
        refresh={refreshState([
          savedQuery,
          positionData.all,
          positionData.tracked,
        ])}
        exporting={exporter.exporting}
        onExportCsv={() => void exporter.exportFilteredCsv()}
        onExportSheets={() => void exporter.exportFilteredSheets()}
      />

      <SavedKeywordsSummary
        projectId={projectId}
        keywords={positionData.all.data?.rows}
        isLoading={positionData.all.isLoading}
        positions={{
          loading: positionData.tracked.isLoading,
          error: positionData.tracked.error,
          onRetry: () => void positionData.tracked.refetch(),
          archiveRows: positionData.tracked.data?.rows.length ?? 0,
          map: positionData.positions,
        }}
        filter={positionFilter}
        onFilter={(next) => {
          setPositionFilter(next);
          setPage(1);
        }}
      />

      <div className="overflow-hidden rounded-box border border-base-300 bg-base-100">
        <SavedKeywordsFilters
          filtersForm={filters.filtersForm}
          activeFilterCount={filters.activeFilterCount}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters((v) => !v)}
          onResetAllFilters={handleClearAllFilters}
          availableTags={availableTags}
          selectedTagIds={selectedTagIds}
          busyTagIds={tagManage.busyTagIds}
          onToggleTagFilter={(tagId) => {
            setSelectedTagIds((current) =>
              current.includes(tagId)
                ? current.filter((id) => id !== tagId)
                : [...current, tagId],
            );
            setPage(1);
          }}
          onClearTagSelection={() => {
            setSelectedTagIds([]);
            setPage(1);
          }}
          onUpdateTag={(input) => void tagManage.updateTag(input)}
          onDeleteTag={(tagId) => void handleDeleteTag(tagId)}
        />

        <div
          className={`space-y-3 p-4 transition-opacity ${
            stale ? "opacity-60" : ""
          }`}
          aria-busy={stale}
        >
          {removeError ? (
            <RemoveSavedKeywordsError message={removeError} />
          ) : null}
          {/* Hidden on error: `totalCount` falls back to 0, so this line
              read "0 kayıtlı kelime" directly above the failure notice --
              and the export button beside it disables itself on the same
              zero, which looks like an empty store rather than a failure. */}
          {listError.isError ? null : (
            <SavedKeywordsStatus
              totalCount={totalCount}
              isFetching={isFetching && !loadingList}
            />
          )}
          {/* Without this the table falls through to its empty state, so
                a transient 500 told the operator their saved keywords were
                gone. */}
          {listError.isError ? (
            <QueryErrorState
              compact
              error={listError.error}
              onRetry={() => void listError.refetch()}
              title="Kayıtlı kelimeler yüklenemedi"
            />
          ) : (
            <SavedKeywordsTable
              projectId={projectId}
              positions={positionData.positions}
              rows={savedKeywords}
              rowSelection={rowSelection}
              sorting={sorting}
              isLoading={loadingList}
              hasActiveFilters={hasActiveFilters}
              onRowSelectionChange={setRowSelection}
              onSortingChange={handleSortingChange}
              onRemove={(id) => removeMutation.mutate([id])}
              /*
               * The other end of the one-way trip. Keywords are saved from
               * Search Performance and the empty state says so, but there
               * was no way back to the numbers behind one.
               */
              onInspect={(keyword) =>
                void navigate({
                  to: "/p/$projectId/search-performance",
                  params: { projectId },
                  search: { tab: "queries", q: keyword },
                })
              }
            />
          )}
        </div>

        {/*
         * The shared component, not a fork of it. The fork had already lost
         * one of its fixes in the copy -- the wrap that keeps the next-page
         * button reachable on a phone -- which is the argument against
         * forks generally.
         */}
        <TablePagination
          page={page}
          pageSize={pageSize}
          pageSizes={SAVED_KEYWORD_PAGE_SIZES}
          totalCount={totalCount}
          hasNextPage={page * pageSize < totalCount}
          isLoading={isFetching}
          onPageChange={setPage}
          onPageSizeChange={(nextPageSize) => {
            setPageSize(nextPageSize);
            setPage(1);
          }}
        />
      </div>

      <SavedKeywordsBulkActionBar
        selectedCount={selectedCount}
        exportingSelection={exporter.exportingSelection}
        onCopy={() =>
          void copyText(
            selectedRows.map((row) => row.keyword).join("\n"),
            `${selectedCount} kelime kopyalandı`,
          )
        }
        onOpenTags={() => setShowTagModal(true)}
        onExportCsv={() => exporter.exportSelectionCsv(selectedRows)}
        onExportSheets={() => void exporter.exportSelectionSheets(selectedRows)}
        onDelete={() => setShowConfirm(true)}
        onClear={() => setRowSelection({})}
      />

      {showConfirm ? (
        <DeleteSavedKeywordsModal
          selectedCount={selectedCount}
          isPending={removeMutation.isPending}
          onClose={() => setShowConfirm(false)}
          onConfirm={() => removeMutation.mutate(selectedIds)}
        />
      ) : null}

      {showTagModal ? (
        <SavedKeywordsBulkTagsModal
          availableTags={availableTags}
          selectedCount={selectedCount}
          selectedRowTags={selectedRowTags}
          isPending={tagMutation.isPending}
          onClose={() => setShowTagModal(false)}
          onApply={({ addTags, removeTagIds }) =>
            tagMutation.mutate({
              savedKeywordIds: selectedIds,
              addTags,
              removeTagIds,
            })
          }
        />
      ) : null}
    </PageShell>
  );
}
