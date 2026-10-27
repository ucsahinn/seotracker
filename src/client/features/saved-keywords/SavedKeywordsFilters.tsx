import { formatCount } from "@/shared/format";
import { SlidersHorizontal } from "lucide-react";
import { SavedKeywordsFilterPanel } from "./SavedKeywordsFilterPanel";
import { SavedKeywordsTagFilter } from "./SavedKeywordsTagFilter";
import type { TagColorKey } from "@/shared/tag-colors";
import type { SavedKeywordTagSummary } from "@/types/keywords";
import type { SavedKeywordsFilterForm } from "./useSavedKeywordsFilters";
import { t } from "@/shared/i18n";

export function SavedKeywordsFilters({
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
}: {
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
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-base-300 px-4 py-2.5">
        <button
          type="button"
          className={`btn btn-ghost btn-sm min-h-11 gap-1.5 ${showFilters ? "btn-active" : ""}`}
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

      {showFilters ? (
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
