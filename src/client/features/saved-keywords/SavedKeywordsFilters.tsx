import { formatCount } from "@/shared/format";
import type { ReactNode } from "react";
import { SlidersHorizontal } from "lucide-react";
import { SavedKeywordsFilterPanel } from "./SavedKeywordsFilterPanel";
import { SavedKeywordsTagFilter } from "./SavedKeywordsTagFilter";
import type { TagColorKey } from "@/shared/tag-colors";
import type { SavedKeywordTagSummary } from "@/types/keywords";
import type { SavedKeywordsFilterForm } from "./useSavedKeywordsFilters";
import { t } from "@/shared/i18n";

export function SavedKeywordsFilters({
  tagsOnly = false,
  filtersForm,
  activeFilterCount,
  showFilters,
  onToggleFilters,
  onResetAllFilters,
  availableTags,
  selectedTagIds,
  busyTagIds,
  onToggleTagFilter,
  onClearTagSelection,
  onUpdateTag,
  onDeleteTag,
  search,
}: {
  /** The keyword search, set on the same row as the filter buttons. */
  search?: ReactNode;
  tagsOnly?: boolean;
  filtersForm: SavedKeywordsFilterForm;
  activeFilterCount: number;
  showFilters: boolean;
  onToggleFilters: () => void;
  onResetAllFilters: () => void;
  availableTags: SavedKeywordTagSummary[];
  selectedTagIds: string[];
  busyTagIds: Set<string>;
  onToggleTagFilter: (tagId: string) => void;
  onClearTagSelection: () => void;
  onUpdateTag: (input: {
    tagId: string;
    name?: string;
    color?: TagColorKey | null;
  }) => void;
  onDeleteTag: (tagId: string) => void;
}) {
  return (
    <>
      {/* Search, Filtreler and Etiketler on one row, as one kind of control:
          a ghost text button beside a bordered dropdown read as two
          different things. */}
      <div className="flex flex-wrap items-end gap-3 border-b border-[var(--hairline)] p-4">
        {search && !tagsOnly ? (
          <div className="min-w-0 flex-1 basis-64">{search}</div>
        ) : null}
        {!tagsOnly ? (
          <button
            type="button"
            className={`btn btn-sm gap-1.5 ${showFilters ? "btn-active" : ""}`}
            onClick={onToggleFilters}
            title={t("Tablo filtrelerini aç/kapat")}
            aria-expanded={showFilters}
            aria-controls="saved-advanced-filters"
          >
            <SlidersHorizontal className="size-3.5" />
            {t("Filtreler")}
            {activeFilterCount > 0 ? (
              <span className="badge badge-xs badge-primary border-0 text-primary-content">
                {formatCount(activeFilterCount)}
              </span>
            ) : null}
          </button>
        ) : null}
        <SavedKeywordsTagFilter
          availableTags={availableTags}
          selectedTagIds={selectedTagIds}
          busyTagIds={busyTagIds}
          onToggleTagFilter={onToggleTagFilter}
          onClearSelection={onClearTagSelection}
          onUpdateTag={onUpdateTag}
          onDeleteTag={onDeleteTag}
        />
      </div>

      {showFilters && !tagsOnly ? (
        <div id="saved-advanced-filters">
          <SavedKeywordsFilterPanel
            form={filtersForm}
            activeFilterCount={activeFilterCount}
            onReset={onResetAllFilters}
          />
        </div>
      ) : null}
    </>
  );
}
