import { BarChart3, TrendingUp, type LucideIcon } from "lucide-react";
import {
  QUICK_COPY,
  type QuickId,
} from "@/client/features/opportunities/opportunityLogic";
import { formatNumber } from "@/client/lib/format";

const CHIPS: ReadonlyArray<{
  id: QuickId;
  icon: LucideIcon;
  /** Shown as text, not a tooltip, when the chip has nothing behind it. */
  emptyReason: string;
}> = [
  {
    id: "analytics",
    icon: BarChart3,
    emptyReason:
      "Analytics'te trafiği olan sayfa yok; Analytics bağlı değilse önce bağlayın.",
  },
  {
    id: "top_impressions",
    icon: TrendingUp,
    emptyReason: "Listelenecek sayfa yok.",
  },
];

/**
 * Two shortcuts on top of the kind tiles. Counts are over the whole set, not
 * over what the tiles left, so a chip never promises rows a kind has hidden;
 * one with nothing behind it is disabled rather than hidden, and says why in
 * text beside it (a tooltip never reaches touch or keyboard users).
 */
export function OpportunityQuickFilters({
  counts,
  selected,
  onSelect,
}: {
  counts: Record<QuickId, number>;
  selected: QuickId | null;
  onSelect: (next: QuickId | null) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Hızlı süzgeçler"
      className="flex flex-wrap items-center gap-2"
    >
      {CHIPS.map(({ id, icon: Icon, emptyReason }) => {
        const active = selected === id;
        return (
          <span key={id} className="inline-flex flex-wrap items-center gap-2">
            <button
              type="button"
              aria-pressed={active}
              disabled={counts[id] === 0}
              onClick={() => onSelect(active ? null : id)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition-colors disabled:cursor-default disabled:opacity-50 ${
                active
                  ? "border-primary bg-primary/5"
                  : "border-base-300 bg-base-100 enabled:hover:border-primary/40"
              }`}
            >
              <Icon aria-hidden className="size-3.5" />
              {QUICK_COPY[id]}
              <span className="tabular-nums text-muted">
                {formatNumber(counts[id])}
              </span>
            </button>
            {counts[id] === 0 ? (
              <span className="text-xs text-muted">{emptyReason}</span>
            ) : null}
          </span>
        );
      })}
    </div>
  );
}
