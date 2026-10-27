import {
  useSavedInventoryFallback,
  unavailableSavedEvidence,
} from "./useSavedInventoryFallback";
import type {
  OnChangeFn,
  RowSelectionState,
  SortingState,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import type { RemovalTarget } from "./SavedKeywordsModals";
import { useSavedKeywordPositions } from "./useSavedKeywordPositions";
import { compileSavedKeywordsFilters } from "./savedKeywordsFilterTypes";
import { uniqueTagsOf } from "./savedKeywordsUtils";
import { useSavedKeywordsExport } from "./useSavedKeywordsExport";
import { useSavedKeywordsFilters } from "./useSavedKeywordsFilters";
import { useSavedKeywordMutations } from "./useSavedKeywordMutations";
import { useTagManage } from "./useTagManage";
import {
  savedWatchlistSearchSchema,
  SAVED_TERM_LIMIT,
  type SavedWatchlistSearch,
} from "@/shared/savedWatchlist";
export type SavedPageProps = {
  projectId: string;
  search: SavedWatchlistSearch;
  update: (patch: Partial<SavedWatchlistSearch>, replace?: boolean) => void;
};
export function useSavedWatchlistPage({
  projectId,
  search,
  update,
}: SavedPageProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [removeError, setRemoveError] = useState<string | null>(null);
  const [removing, setRemoving] = useState<RemovalTarget | null>(null);
  const [confirmedIds, setConfirmedIds] = useState<string[]>([]);
  const [showTagModal, setShowTagModal] = useState(false);
  const [detailId, setDetailId] = useState<string | null>(null);
  const filters = useSavedKeywordsFilters();
  useEffect(() => {
    filters.filtersForm.setFieldValue("include", search.include);
    filters.filtersForm.setFieldValue("exclude", search.exclude);
  }, [search.include, search.exclude, projectId, filters.filtersForm]);
  const appliedFilters = useMemo(
    () =>
      compileSavedKeywordsFilters({
        ...filters.values,
        include: search.include,
        exclude: search.exclude,
      }),
    [filters.values, search.include, search.exclude],
  );
  const liveFilters = compileSavedKeywordsFilters(filters.values);
  const invalid =
    (liveFilters.includeTerms?.length ?? 0) > SAVED_TERM_LIMIT ||
    (liveFilters.excludeTerms?.length ?? 0) > SAVED_TERM_LIMIT;
  const pending =
    filters.values.include !== search.include ||
    filters.values.exclude !== search.exclude;
  useEffect(() => {
    if (!pending || invalid) return;
    const timer = window.setTimeout(
      () =>
        update({
          include: filters.values.include,
          exclude: filters.values.exclude,
          page: 1,
        }),
      350,
    );
    return () => window.clearTimeout(timer);
  }, [
    pending,
    invalid,
    filters.values.include,
    filters.values.exclude,
    update,
  ]);
  const queryInput = useMemo(
    () => ({
      projectId,
      ...appliedFilters,
      tagIds: search.tags.length ? search.tags : undefined,
      days: search.days,
      band: search.band,
      fallers: search.fallers,
      sort: search.sort,
      order: search.order,
      page: search.page,
      pageSize: search.pageSize,
    }),
    [projectId, appliedFilters, search],
  );
  const committedInvalid =
    (appliedFilters.includeTerms?.length ?? 0) > SAVED_TERM_LIMIT ||
    (appliedFilters.excludeTerms?.length ?? 0) > SAVED_TERM_LIMIT;
  const query = useSavedKeywordPositions(
    queryInput,
    !invalid && !committedInvalid,
  );
  const inventory = useSavedInventoryFallback(
    queryInput,
    query.isError && !invalid && !committedInvalid,
  );
  const inventoryReady =
    query.isError && inventory.isSuccess && !inventory.isFetching;
  const data = query.data;
  const scopeKey = JSON.stringify(queryInput);
  const [selectionScope, setSelectionScope] = useState(scopeKey);
  const stale =
    selectionScope !== scopeKey ||
    pending ||
    invalid ||
    (inventoryReady ? inventory.isFetching : query.isFetching) ||
    (query.isError && !inventoryReady) ||
    query.isPlaceholderData;
  const rows = useMemo(
    () =>
      inventoryReady
        ? inventory.data.rows.map((row) => ({
            ...row,
            ...unavailableSavedEvidence(),
          }))
        : (data?.rows ?? []),
    [data, inventoryReady, inventory.data],
  );
  const totalCount = inventoryReady
    ? inventory.data.totalCount
    : (data?.totalMatching ?? 0);
  const totalPages = Math.max(1, Math.ceil(totalCount / search.pageSize));
  const selectedRows = stale ? [] : rows.filter((row) => rowSelection[row.id]);
  const selectedIds = selectedRows.map((row) => row.id);
  const selectedRowTags = uniqueTagsOf(selectedRows);
  const availableTags = inventoryReady
    ? inventory.data.tags
    : (data?.tags ?? []);
  useEffect(() => {
    setSelectionScope(scopeKey);
    setRowSelection({});
    setRemoving(null);
    setShowTagModal(false);
    setDetailId(null);
  }, [scopeKey, pending, projectId]);
  useEffect(() => {
    if (data && !query.isFetching && search.page > totalPages)
      update({ page: totalPages }, true);
  }, [data, query.isFetching, search.page, totalPages, update]);
  const { removeMutation, tagMutation } = useSavedKeywordMutations({
    projectId,
    onRemoved: () => {
      setRowSelection({});
      setRemoving(null);
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
    input: queryInput,
    snapshot: data,
    blocked:
      stale ||
      inventoryReady ||
      !!data?.archiveError ||
      !!data?.bandUnavailable,
  });
  const clear = () => {
    filters.resetFilters();
    update({
      include: "",
      exclude: "",
      tags: [],
      band: undefined,
      fallers: false,
      page: 1,
    });
  };
  const sorting: SortingState = [
    { id: search.sort, desc: search.order === "desc" },
  ];
  const onSortingChange: OnChangeFn<SortingState> = (updater) => {
    const next = typeof updater === "function" ? updater(sorting) : updater;
    const parsed = savedWatchlistSearchSchema.parse({
      ...search,
      sort: next[0]?.id,
      order: next[0]?.desc ? "desc" : "asc",
      page: 1,
    });
    update(parsed);
  };
  const active = !!(
    search.include ||
    search.exclude ||
    search.tags.length ||
    search.band ||
    search.fallers
  );
  const positions = useMemo(
    () =>
      new Map(
        rows.filter((r) => r.position !== null).map((r) => [r.id, r.position!]),
      ),
    [rows],
  );
  const detail = rows.find((row) => row.id === detailId);
  return {
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
  };
}
