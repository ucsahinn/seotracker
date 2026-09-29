import { QueryErrorState } from "@/client/components/QueryErrorState";
import { formatDate, formatDecimal } from "@/client/lib/format";
import { DeltaBadge } from "@/client/components/MetricTile";

/**
 * One query's history, opened from the table beside it.
 *
 * Split out of `RankingsPage` when that file crossed its line ceiling. This
 * is the detail half; the file it came from owns the archive sync, the
 * table and the pagination.
 */
export function QueryHistoryCard({
  query,
  rows,
  loading,
  error,
  onRetry,
}: {
  query: string;
  rows: {
    date: string;
    position: number;
    clicks: number;
    impressions: number;
  }[];
  loading: boolean;
  /*
   * A failed fetch used to fall through to `rows.length === 0` and tell the
   * operator the archive had nothing for a query the table directly above
   * had just reported as having hundreds of archived days.
   */
  error: unknown;
  onRetry: () => void;
}) {
  if (loading) {
    /*
     * Shaped like the card that is coming -- title bar, chart block, footer
     * line -- rather than a one-line spinner box. The spinner version was a
     * third the height of the loaded card, so opening a query made the page
     * jump once the history landed.
     */
    return (
      <div
        className="space-y-3 rounded-box border border-base-300 bg-base-100 p-4"
        aria-busy
      >
        <div className="flex items-baseline justify-between gap-2">
          <div className="skeleton h-4 w-48" />
          <div className="skeleton h-4 w-24" />
        </div>
        <div className="skeleton h-28 w-full" />
        <div className="skeleton h-3 w-2/3" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-box border border-base-300">
        <QueryErrorState
          compact
          error={error}
          onRetry={onRetry}
          title="Sorgu geçmişi yüklenemedi"
        />
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="rounded-box border border-base-300 p-4 text-sm text-muted">
        Bu sorgu için kayıtlı gün yok.
      </div>
    );
  }

  const first = rows[0];
  const last = rows[rows.length - 1];
  if (!first || !last) return null;
  // Lower position numbers are better, so a drop in the number is an
  // improvement. The arrow follows the ranking, not the arithmetic.
  const delta = first.position - last.position;
  const improved = delta > 0;

  return (
    <div className="space-y-3 rounded-box border border-base-300 bg-base-100 p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-sm font-semibold">{query}</h2>
        {/*
         * `DeltaBadge`, not a fourth copy of the pattern it retired. The
         * hand-rolled version painted direction with `text-success` /
         * `text-error` -- the fill colours, which land near 3.3:1 on a
         * base-100 surface -- and gave its arrows no `aria-hidden` and no
         * spoken direction, so a screen reader heard "12,4 → 8,1" with the
         * improvement carried in colour alone.
         */}
        {Math.abs(delta) < 0.1 ? (
          <span className="text-sm font-semibold text-muted">
            {formatDecimal(first.position)} → {formatDecimal(last.position)}
          </span>
        ) : (
          <DeltaBadge
            value={{
              text: `${formatDecimal(first.position)} → ${formatDecimal(last.position)}`,
              improved,
            }}
          />
        )}
      </div>
      <PositionSparkline rows={rows} />
      <p className="text-xs text-muted">
        {formatDate(first.date)} – {formatDate(last.date)} · {rows.length} gün
        kayıtlı
      </p>
    </div>
  );
}

/**
 * Position over time. Drawn with the y axis inverted, because position 1 is the
 * top of the page: a line going up has to mean the ranking improved.
 */
function PositionSparkline({
  rows,
}: {
  rows: { date: string; position: number }[];
}) {
  if (rows.length < 2) return null;

  const width = 600;
  const height = 120;
  const positions = rows.map((row) => row.position);
  const best = Math.min(...positions);
  const worst = Math.max(...positions);
  const span = Math.max(worst - best, 1);

  const points = rows
    .map((row, index) => {
      const x = (index / (rows.length - 1)) * width;
      const y = ((row.position - best) / span) * (height - 16) + 8;
      // SVG path geometry, not a number anyone reads. A decimal comma
      // here would be a second coordinate.
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-28 w-full"
        role="img"
        aria-label={`Sıra geçmişi: ${formatDecimal(best)} ile ${formatDecimal(worst)} arasında`}
      >
        <polyline
          points={points}
          fill="none"
          className="stroke-primary"
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
      <div className="flex justify-between text-xs text-muted">
        <span>En iyi {formatDecimal(best)}</span>
        <span>En kötü {formatDecimal(worst)}</span>
      </div>
    </div>
  );
}
