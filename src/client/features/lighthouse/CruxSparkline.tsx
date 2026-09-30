import { CRUX_THRESHOLDS, type CruxSeries } from "@/shared/cruxHistory";
import type { CruxSeriesSummary } from "./cruxHistoryView";

const WIDTH = 160;
const HEIGHT = 44;
const PAD = 3;

const RATING_CLASS = {
  good: "text-[var(--ink-success)]",
  "needs-improvement": "text-[var(--ink-warning)]",
  poor: "text-[var(--ink-error)]",
} as const;

/**
 * The p75 line with the two Web Vitals thresholds as dashed rules, so "where
 * is this against good" is readable without a legend. The scale starts at
 * zero and always reaches the good line, so a flat, healthy site is not
 * stretched into a dramatic slope. Decorative: the sentence beside it is the
 * accessible description.
 */
export function CruxSparkline({
  series,
  summary,
}: {
  series: CruxSeries;
  summary: CruxSeriesSummary;
}) {
  const [good, poor] = CRUX_THRESHOLDS[series.metric];
  const values = series.points.flatMap((point) =>
    point.p75 === null ? [] : [point.p75],
  );
  const top = Math.max(...values, good * 1.15);
  const y = (value: number) =>
    HEIGHT - PAD - (value / top) * (HEIGHT - PAD * 2);
  const last = series.points.length - 1;
  const x = (index: number) =>
    last === 0 ? WIDTH / 2 : PAD + (index / last) * (WIDTH - PAD * 2);

  // A week with no value breaks the line instead of being drawn as zero.
  const runs: Array<Array<[number, number]>> = [[]];
  series.points.forEach((point, index) => {
    if (point.p75 === null) {
      runs.push([]);
      return;
    }
    runs[runs.length - 1]?.push([x(index), y(point.p75)]);
  });

  // The newest week that has a value gets the dot.
  let end: { index: number; p75: number } | null = null;
  for (const [index, point] of series.points.entries()) {
    if (point.p75 !== null) end = { index, p75: point.p75 };
  }

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className={`h-auto w-full ${RATING_CLASS[summary.rating]}`}
    >
      {[good, poor].map((threshold) =>
        threshold <= top ? (
          <line
            key={threshold}
            x1={0}
            x2={WIDTH}
            y1={y(threshold)}
            y2={y(threshold)}
            className="stroke-base-content/25"
            strokeDasharray="3 3"
            vectorEffect="non-scaling-stroke"
          />
        ) : null,
      )}
      {runs.map((run) =>
        run.length > 1 ? (
          <polyline
            key={run.map(([px]) => px).join("-")}
            points={run.map(([px, py]) => `${px},${py}`).join(" ")}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        ) : null,
      )}
      {end ? (
        <circle cx={x(end.index)} cy={y(end.p75)} r={2.5} fill="currentColor" />
      ) : null}
    </svg>
  );
}
