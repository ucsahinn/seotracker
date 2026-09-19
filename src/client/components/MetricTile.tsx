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
/**
 * A change, either as a fraction to be formatted here or already worded.
 * Search Performance computes its own deltas (a position delta is not a
 * percentage), and before this it cloned the whole tile to say so.
 */
type MetricDelta =
  | number
  | { text: string; improved: boolean }
  | null
  | undefined;

export function MetricTile({
  label,
  value,
  delta,
  deltaTitle,
  hint,
  /** Lower is better, as with an average search position. */
  inverted = false,
}: {
  label: string;
  value: string | null;
  delta?: MetricDelta;
  deltaTitle?: string;
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
          <DeltaBadge value={delta} inverted={inverted} title={deltaTitle} />
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
  title,
}: {
  value: MetricDelta;
  inverted: boolean;
  title?: string;
}) {
  if (value == null) return null;

  // An arrow, not just a colour. Success and error sit at almost the same
  // lightness, so under the common colour-vision deficiencies the tint alone
  // says nothing about which direction a number moved.
  const resolved =
    typeof value === "number"
      ? (() => {
          if (!Number.isFinite(value)) return null;
          const rounded = Math.round(value * 1000) / 1000;
          if (rounded === 0) return null;
          return {
            text: formatPercent(Math.abs(rounded), 0),
            improved: inverted ? rounded < 0 : rounded > 0,
            up: rounded > 0,
          };
        })()
      : { text: value.text, improved: value.improved, up: value.improved };
  if (!resolved) return null;

  const Icon = resolved.up ? ArrowUpRight : ArrowDownRight;

  return (
    <span
      title={title}
      className={`flex items-center gap-0.5 text-xs font-medium ${
        resolved.improved
          ? "text-[var(--ink-success)]"
          : "text-[var(--ink-error)]"
      }`}
    >
      <Icon className="size-3.5" aria-hidden />
      {resolved.text}
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
