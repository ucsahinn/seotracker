import type { LucideIcon } from "lucide-react";
import { formatCount } from "@/client/lib/format";

type FilterChip<Id extends string> = {
  id: Id;
  label: string;
  icon: LucideIcon;
  count: number;
  /** What the chip selects, shown as a native tooltip. */
  hint: string;
};

/**
 * One-click row filters with a live count.
 *
 * Toggle buttons (`aria-pressed`), single-select: pressing the active chip
 * clears it. A chip that would match nothing is disabled rather than hidden,
 * so the row does not reshuffle between views, and the zero says why -- unless
 * it is the active one, which must stay pressable to be turned off.
 */
export function FilterChips<Id extends string>({
  chips,
  active,
  onChange,
  label,
}: {
  chips: FilterChip<Id>[];
  active: Id | undefined;
  onChange: (next: Id | undefined) => void;
  /** Names the group for screen readers. */
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {chips.map((chip) => {
        const pressed = active === chip.id;
        const Icon = chip.icon;
        return (
          <button
            key={chip.id}
            type="button"
            aria-pressed={pressed}
            disabled={chip.count === 0 && !pressed}
            title={chip.hint}
            onClick={() => onChange(pressed ? undefined : chip.id)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
              pressed
                ? "border-primary bg-primary/10 text-[var(--ink-primary)]"
                : "border-[var(--control-border)] bg-base-100 hover:bg-base-200/60"
            }`}
          >
            <Icon className="size-3.5" aria-hidden />
            {chip.label}
            <span className="tabular-nums text-muted">
              {formatCount(chip.count)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
