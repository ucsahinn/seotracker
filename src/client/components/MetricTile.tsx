import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import * as React from "react";
import { formatPercent } from "@/client/lib/format";

/**
 * One number, read at a glance.
 *
 * The tiles used to be plain bordered boxes with a label above a value. Two
 * things were missing and both matter more than the frame: a tile had no way
 * to say "there is no data yet" other than printing a zero, and a change with
 * no direction is just another number. `value` accepts null for the first and
 * `delta` carries the second.
 */
export function MetricTile({
  label,
  value,
  delta,
  hint,
  /** Lower is better, as with an average search position. */
  inverted = false,
}: {
  label: string;
  value: string | null;
  delta?: number | null;
  hint?: React.ReactNode;
  inverted?: boolean;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5 px-5 py-4">
      <p className="truncate text-xs font-medium uppercase tracking-wider text-muted">
        {label}
      </p>
      {value === null ? (
        <p className="text-2xl font-semibold text-subtle">--</p>
      ) : (
        <div className="flex items-baseline gap-2">
          <p className="truncate text-2xl font-semibold tracking-tight">
            {value}
          </p>
          <DeltaBadge value={delta} inverted={inverted} />
        </div>
      )}
      {/* Not truncated: a hint is usually the one link that makes the tile
          useful, and half a link is worse than a second line. */}
      {hint ? <p className="text-xs text-subtle">{hint}</p> : null}
    </div>
  );
}

function DeltaBadge({
  value,
  inverted,
}: {
  value: number | null | undefined;
  inverted: boolean;
}) {
  // A change of nothing is not worth an arrow, and rounding hides the rest.
  if (value == null || !Number.isFinite(value)) return null;
  const rounded = Math.round(value * 1000) / 1000;
  if (rounded === 0) return null;

  const improved = inverted ? rounded < 0 : rounded > 0;
  const Icon = rounded > 0 ? ArrowUpRight : ArrowDownRight;

  return (
    <span
      className={`flex items-center gap-0.5 text-xs font-medium ${
        improved ? "text-success" : "text-error"
      }`}
    >
      <Icon className="size-3.5" strokeWidth={2} aria-hidden />
      {formatPercent(Math.abs(rounded), 0).replace("%", "")}%
    </span>
  );
}

/**
 * The tiles as a row. Divided by hairlines rather than gapped into separate
 * cards: they are one reading, not four unrelated facts.
 */
export function MetricRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 divide-x divide-y divide-base-300 overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-[var(--shadow-raise)] lg:grid-cols-4 lg:divide-y-0">
      {children}
    </div>
  );
}
