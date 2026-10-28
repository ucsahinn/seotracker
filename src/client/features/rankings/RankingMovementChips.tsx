import type { ComponentProps } from "react";
import type { FilterChips } from "@/client/features/search-performance/FilterChips";
import { formatCount } from "@/client/lib/format";
import { t } from "@/shared/i18n";
import type { MoveId } from "./rankingMoves";

export function RankingMovementChips({
  comparable,
  chips,
  active,
  onChange,
  label,
}: ComponentProps<typeof FilterChips<MoveId>> & { comparable: boolean }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {chips.map((chip) => {
        const unknown = !comparable && chip.id !== "top10";
        const pressed = active === chip.id;
        const Icon = chip.icon;
        return (
          <button
            key={chip.id}
            type="button"
            aria-pressed={pressed}
            disabled={(unknown || chip.count === 0) && !pressed}
            title={unknown ? t("Karşılaştırma yok") : chip.hint}
            onClick={() => onChange(pressed ? undefined : chip.id)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${pressed ? "border-primary bg-primary/10 text-[var(--ink-primary)]" : "border-[var(--control-border)] bg-base-100 hover:bg-base-200/60"}`}
          >
            <Icon className="size-3.5" aria-hidden />
            {chip.label}{" "}
            <span className="tabular-nums text-muted">
              {unknown ? "—" : formatCount(chip.count)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
