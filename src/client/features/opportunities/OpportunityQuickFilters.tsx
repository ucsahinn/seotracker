import { t } from "@/shared/i18n";
import type { Ref } from "react";
import { BadgeCheck, CircleOff, type LucideIcon } from "lucide-react";
import {
  QUICK_COPY,
  type QuickId,
} from "@/client/features/opportunities/opportunityLogic";
import { formatNumber } from "@/client/lib/format";

const ICONS: Record<QuickId, LucideIcon> = {
  converts: BadgeCheck,
  no_conversions: CircleOff,
};

/**
 * Two shortcuts on the Analytics side of the list. The page only passes the
 * chips that narrow something: one that holds no row or every row is noise,
 * which is what "Analytics'te karşılığı var 40" over a list of 40 was.
 */
export function OpportunityQuickFilters({
  chips,
  counts,
  selected,
  onSelect,
  ref,
}: {
  chips: QuickId[];
  counts: Record<QuickId, number>;
  selected: QuickId | null;
  onSelect: (next: QuickId | null) => void;
  /** Focus lands here when a reset elsewhere unmounts the button that was clicked. */
  ref?: Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="group"
      aria-label={t("Hızlı filtreler")}
      className="flex flex-wrap items-center gap-2"
    >
      {chips.map((id) => {
        const active = selected === id;
        const Icon = ICONS[id];
        return (
          <button
            key={id}
            type="button"
            aria-pressed={active}
            onClick={() => onSelect(active ? null : id)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition-colors ${
              active
                ? "border-primary bg-primary/5"
                : "border-base-300 bg-base-100 hover:border-primary/40"
            }`}
          >
            <Icon aria-hidden className="size-3.5" />
            {t(QUICK_COPY[id])}
            <span className="tabular-nums text-muted">
              {formatNumber(counts[id])}
            </span>
          </button>
        );
      })}
    </div>
  );
}
