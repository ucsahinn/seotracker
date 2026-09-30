import { useEffect, useState } from "react";
import { formatCount, formatPercent } from "@/client/lib/format";

export type DistributionRow = {
  key: string;
  label: string;
  /** A second line that says what the bucket means, in plain words. */
  hint?: string;
  count: number;
  /** A CSS colour. The label and the count carry the meaning as well. */
  color: string;
  active: boolean;
};

/**
 * A ranked set of buckets as bars you can click.
 *
 * Every bar is a button that hands its key back: the caller decides what
 * "filter to this" means, so the same widget drives a status-code filter, a
 * depth filter and a speed-band filter without knowing about any of them.
 *
 * Bars grow from zero on arrival and glide when the numbers change; a bucket
 * with nothing in it stays visible but inert, because "no server errors" is
 * itself the answer the reader came for.
 */
export function DistributionBars({
  rows,
  onSelect,
  summary,
}: {
  rows: DistributionRow[];
  onSelect: (key: string) => void;
  /** The finding, for readers who cannot see the bars. */
  summary: string;
}) {
  const [grown, setGrown] = useState(false);
  useEffect(() => {
    // A frame late, so the first paint is at zero and the width transition
    // has something to travel from.
    const frame = requestAnimationFrame(() => setGrown(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const total = rows.reduce((sum, row) => sum + row.count, 0);
  const max = Math.max(1, ...rows.map((row) => row.count));

  return (
    <ul aria-label={summary} className="space-y-1">
      {rows.map((row) => {
        const width = grown ? (row.count / max) * 100 : 0;
        return (
          <li key={row.key}>
            <button
              type="button"
              aria-pressed={row.active}
              disabled={row.count === 0 && !row.active}
              onClick={() => onSelect(row.key)}
              className={`group grid w-full grid-cols-[minmax(0,9rem)_1fr_auto] items-center gap-3 rounded-field px-2 py-1.5 text-left text-sm transition-colors enabled:hover:bg-base-200/60 disabled:cursor-default disabled:opacity-50 ${
                row.active ? "bg-primary/10 ring-1 ring-primary/40" : ""
              }`}
            >
              <span className="min-w-0">
                <span className="block truncate">{row.label}</span>
                {row.hint ? (
                  <span className="block truncate text-xs text-subtle">
                    {row.hint}
                  </span>
                ) : null}
              </span>
              <span
                aria-hidden
                className="h-2.5 overflow-hidden rounded-full bg-base-200"
              >
                <span
                  className="block h-full rounded-full transition-[width] duration-700 ease-out"
                  style={{
                    width: `${width}%`,
                    minWidth: row.count > 0 && grown ? "4px" : 0,
                    background: row.color,
                  }}
                />
              </span>
              <span className="text-right tabular-nums">
                {formatCount(row.count)}
                <span className="ml-1.5 text-xs text-muted">
                  {total > 0 ? formatPercent(row.count / total) : ""}
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
