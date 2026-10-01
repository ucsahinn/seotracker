import * as React from "react";
import { formatCount, formatDate, formatDecimal } from "@/client/lib/format";

type Day = {
  date: string;
  position: number;
  clicks: number;
  impressions: number;
};

const WIDTH = 600;
const HEIGHT = 120;

/**
 * Position over time. Drawn with the y axis inverted, because position 1 is the
 * top of the page: a line going up has to mean the ranking improved.
 *
 * Hovering (or touching) the chart reads out that day's numbers below it; the
 * first and last day are marked so the line has visible ends.
 */
export function PositionSparkline({ rows }: { rows: Day[] }) {
  const [hovered, setHovered] = React.useState<number | null>(null);
  if (rows.length < 2) return null;

  const positions = rows.map((row) => row.position);
  const best = Math.min(...positions);
  const worst = Math.max(...positions);
  const span = Math.max(worst - best, 1);
  const lastIndex = rows.length - 1;

  const xOf = (index: number) => (index / lastIndex) * WIDTH;
  const yOf = (position: number) =>
    ((position - best) / span) * (HEIGHT - 16) + 8;

  // SVG path geometry, not a number anyone reads. A decimal comma
  // here would be a second coordinate.
  const points = rows
    .map(
      (row, index) =>
        `${xOf(index).toFixed(1)},${yOf(row.position).toFixed(1)}`,
    )
    .join(" ");

  const onMove = (event: React.PointerEvent<SVGSVGElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    if (box.width === 0) return;
    const ratio = (event.clientX - box.left) / box.width;
    setHovered(Math.min(lastIndex, Math.max(0, Math.round(ratio * lastIndex))));
  };

  const onKey = (event: React.KeyboardEvent<SVGSVGElement>) => {
    const step =
      event.key === "ArrowLeft" ? -1 : event.key === "ArrowRight" ? 1 : 0;
    if (step === 0) return;
    event.preventDefault();
    setHovered((current) =>
      Math.min(lastIndex, Math.max(0, (current ?? lastIndex) + step)),
    );
  };

  const day = hovered === null ? undefined : rows[hovered];
  const marked = [...new Set([0, lastIndex, hovered ?? 0])];

  return (
    <div>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="h-28 w-full touch-pan-y"
        role="slider"
        tabIndex={0}
        aria-label={`Sıra geçmişi: ${formatDecimal(best)} ile ${formatDecimal(worst)} arasında`}
        aria-valuemin={0}
        aria-valuemax={lastIndex}
        aria-valuenow={hovered ?? lastIndex}
        aria-valuetext={formatDate(rows[hovered ?? lastIndex]?.date ?? "")}
        onPointerMove={onMove}
        onPointerLeave={() => setHovered(null)}
        onKeyDown={onKey}
        onBlur={() => setHovered(null)}
      >
        <polyline
          points={points}
          fill="none"
          className="stroke-primary"
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {marked.map((index) => {
          const row = rows[index];
          if (!row) return null;
          return (
            <circle
              key={index}
              cx={xOf(index)}
              cy={yOf(row.position)}
              r={index === hovered ? 5 : 3.5}
              className="fill-primary"
            />
          );
        })}
      </svg>
      <div className="flex justify-between text-xs text-muted">
        <span>En iyi {formatDecimal(best)}</span>
        <span>En kötü {formatDecimal(worst)}</span>
      </div>
      <p className="mt-1 min-h-4 text-xs tabular-nums" aria-live="polite">
        {day ? (
          <>
            {formatDate(day.date)} · Sıra {formatDecimal(day.position)} ·{" "}
            {formatCount(day.clicks)} tıklama · {formatCount(day.impressions)}{" "}
            gösterim
          </>
        ) : (
          <span className="text-subtle">
            Günlük değeri görmek için grafiğin üzerine gelin ya da grafiğe
            odaklanıp sol ve sağ ok tuşlarını kullanın.
          </span>
        )}
      </p>
    </div>
  );
}
