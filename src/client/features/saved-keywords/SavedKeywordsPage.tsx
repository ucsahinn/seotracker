import { SavedKeywordsStatus } from "./SavedKeywordsStatus";
import { PageShell } from "@/client/components/PageShell";
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
import { QueryErrorState } from "@/client/components/QueryErrorState";
import { SavedKeywordsTable } from "@/client/features/saved-keywords/SavedKeywordsTable";
import { SAVED_KEYWORD_PAGE_SIZES } from "@/client/features/saved-keywords/savedKeywordsUtils";
import { SavedArchiveDetail } from "@/client/features/saved-keywords/SavedArchiveDetail";
import { SAVED_TERM_LIMIT } from "@/shared/savedWatchlist";
import { t } from "@/shared/i18n";

import {
  useSavedWatchlistPage,
  type SavedPageProps,
} from "./useSavedWatchlistPage";
export function SavedKeywordsPage(props: SavedPageProps) {
  const { projectId, search, update } = props;
  const {
    showFilters,
    setShowFilters,
    rowSelection,
    setRowSelection,
    removeError,
    removing,
    setRemoving,
    confirmedIds,
    setConfirmedIds,
    showTagModal,
    setShowTagModal,
    setDetailId,
    filters,
    invalid,
    pending,
    query,
    inventory,
    inventoryReady,
    data,
    stale,
    rows,
    totalCount,
    selectedRows,
    selectedIds,
    selectedRowTags,
    availableTags,
    removeMutation,
    tagMutation,
    tagManage,
    exporter,
    clear,
    sorting,
    onSortingChange,
    active,
    positions,
    detail,
  } = useSavedWatchlistPage(props);
  return (
    <PageShell>
      <SavedKeywordsHeader
        refresh={refreshState([query, inventory])}
        totalCount={totalCount}
        blocked={
          stale ||
          inventoryReady ||
          !!data?.archiveError ||
          !!data?.bandUnavailable
        }
        days={search.days}
        onDaysChange={(days) => update({ days, page: 1 })}
        exporting={exporter.exporting}
        csvDownloaded={exporter.csvDownloaded}
        onExportCsv={() => void exporter.exportFilteredCsv()}
        onExportSheets={() => void exporter.exportFilteredSheets()}
      />
      {query.isPending ? (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4" aria-busy>
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="skeleton h-28 rounded-box" />
          ))}
        </div>
      ) : data ? (
        <SavedKeywordsSummary
          projectId={projectId}
          data={data}
          filter={search.band}
          stale={query.isFetching || query.isError}
          onRetry={() => void query.refetch()}
          onFilter={(band) => update({ band, fallers: false, page: 1 })}
          onFallers={() =>
            update({
              band: undefined,
              fallers: true,
              sort: "delta",
              order: "asc",
              page: 1,
            })
          }
        />
      ) : null}
      <div className="rounded-box border border-base-300 bg-base-100">
        <div className="p-4">
          <filters.filtersForm.Field name="include">
            {(field) => (
              <label className="block space-y-1 text-sm">
                <span>{t("Kelime ara; tüm terimler eşleşir")}</span>
                <input
                  className="input min-h-11 w-full"
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder={t("Terimleri virgülle ayırın")}
                />
              </label>
            )}
          </filters.filtersForm.Field>
        </div>
        <SavedKeywordsFilters
          filtersForm={filters.filtersForm}
          activeFilterCount={filters.activeFilterCount}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters((v) => !v)}
          onResetAllFilters={clear}
          availableTags={availableTags}
          selectedTagIds={search.tags}
          busyTagIds={tagManage.busyTagIds}
          onToggleTagFilter={(id) =>
            update({
              tags: search.tags.includes(id)
                ? search.tags.filter((x) => x !== id)
                : [...search.tags, id],
              page: 1,
            })
          }
          onClearTagSelection={() => update({ tags: [], page: 1 })}
          onUpdateTag={(input) => void tagManage.updateTag(input)}
          onDeleteTag={(id) =>
            void tagManage.deleteTag(id).then((ok) => {
              if (ok)
                update({ tags: search.tags.filter((x) => x !== id), page: 1 });
            })
          }
        />
        <div className="space-y-3 p-4" aria-busy={pending || query.isFetching}>
          {removeError ? (
            <RemoveSavedKeywordsError message={removeError} />
          ) : null}
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
            {data && !query.isError ? (
              <SavedKeywordsStatus
                totalCount={totalCount}
                totalBase={data.totalSavedMatching}
                isFetching={query.isFetching}
              />
            ) : null}
            {pending ? (
              <span role="status">{t("Filtre uygulanıyor…")}</span>
            ) : null}
            {invalid ? (
              <span role="alert">
                {t("En fazla {count} terim girin; fazla terimleri kaldırın.", {
                  count: SAVED_TERM_LIMIT,
                })}
              </span>
            ) : null}
            {search.band ? (
              <span>
                {t("Etkin sıra grubu: {band}", {
                  band: savedBandLabel(search.band),
                })}
              </span>
            ) : null}
            {search.fallers ? <span>{t("Belirgin gerileyenler")}</span> : null}
            {active || invalid || pending ? (
              <button className="btn btn-ghost min-h-11" onClick={clear}>
                {t("Tümünü temizle")}
              </button>
            ) : null}
          </div>
          {inventoryReady ? (
            <QueryErrorState
              compact
              error={query.error}
              onRetry={() => void query.refetch()}
              title={t("Sıra özeti okunamadı; kayıtlı liste kullanılabilir")}
            />
          ) : null}
          {query.isError && !inventoryReady ? (
            <QueryErrorState
              compact
              error={query.error}
              onRetry={() => void query.refetch()}
              title={t("Kayıtlı kelimeler yüklenemedi")}
            />
          ) : data?.bandUnavailable ? (
            <div role="alert" className="text-sm text-[var(--ink-warning)]">
              {t(
                "Sıra grubu uygulanamadı; sıra arşivi okunamadı. Yeniden deneyin veya grubu temizleyin.",
              )}
              <button
                className="btn btn-ghost min-h-11"
                onClick={() => void query.refetch()}
              >
                {t("Tekrar dene")}
              </button>
              <button className="btn btn-ghost min-h-11" onClick={clear}>
                {t("Tümünü temizle")}
              </button>
            </div>
          ) : (
            <SavedKeywordsTable
              projectId={projectId}
              positions={positions}
              evidence={rows}
              blocked={stale}
              rows={rows}
              rowSelection={stale ? {} : rowSelection}
              sorting={sorting}
              isLoading={query.isPending}
              hasActiveFilters={active}
              onClear={clear}
              onRowSelectionChange={setRowSelection}
              onSortingChange={onSortingChange}
              onRemove={(row) => {
                if (!stale) {
                  setConfirmedIds([row.id]);
                  setRemoving(row);
                }
              }}
              onInspect={(row) => setDetailId(row.id)}
            />
          )}
        </div>
        <TablePagination
          page={search.page}
          pageSize={search.pageSize}
          pageSizes={SAVED_KEYWORD_PAGE_SIZES}
          totalCount={totalCount}
          hasNextPage={search.page * search.pageSize < totalCount}
          isLoading={inventory.isFetching || query.isFetching || pending}
          onPageChange={(page) => update({ page })}
          onPageSizeChange={(pageSize) =>
            update({
              pageSize: pageSize === 100 ? 100 : pageSize === 250 ? 250 : 50,
              page: 1,
            })
          }
        />
      </div>
      <SavedKeywordsBulkActionBar
        selectedCount={selectedRows.length}
        exportUnavailable={inventoryReady || !!data?.archiveError}
        exportingSelection={exporter.exportingSelection}
        onCopy={() =>
          void copyText(
            selectedRows.map((r) => r.keyword).join("\n"),
            t("{count} kelime kopyalandı", { count: selectedRows.length }),
          )
        }
        onOpenTags={() => {
          setConfirmedIds(selectedIds);
          setShowTagModal(true);
        }}
        onExportCsv={() => exporter.exportSelectionCsv(selectedRows)}
        onExportSheets={() => void exporter.exportSelectionSheets(selectedRows)}
        onDelete={() => {
          setConfirmedIds(selectedIds);
          setRemoving("selection");
        }}
        onClear={() => setRowSelection({})}
      />
      {removing && !stale ? (
        <DeleteSavedKeywordsModal
          target={removing}
          selectedIds={confirmedIds}
          removal={removeMutation}
          onClose={() => setRemoving(null)}
        />
      ) : null}
      {showTagModal && !stale ? (
        <SavedKeywordsBulkTagsModal
          availableTags={availableTags}
          selectedCount={confirmedIds.length}
          selectedRowTags={selectedRowTags}
          isPending={tagMutation.isPending}
          onClose={() => setShowTagModal(false)}
          onApply={({ addTags, removeTagIds }) =>
            tagMutation.mutate({
              savedKeywordIds: confirmedIds,
              addTags,
              removeTagIds,
            })
          }
        />
      ) : null}
      {detail && data ? (
        <SavedArchiveDetail
          projectId={projectId}
          row={detail}
          data={data}
          onClose={() => setDetailId(null)}
        />
      ) : null}
    </PageShell>
  );
}

function savedBandLabel(band: string) {
  switch (band) {
    case "top3":
      return t("Sıra 1–3");
    case "top10":
      return t("Sıra 4–10");
    case "top20":
      return t("Sıra 11–20");
    case "beyond":
      return t("Sıra 21+");
    case "firstPage":
      return t("İlk 10");
    case "observed":
      return t("Gözlenen kelimeler");
    default:
      return t("Sıra bilinmiyor");
  }
}
