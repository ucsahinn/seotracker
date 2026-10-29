function line(points: Array<[number, number]>): string {
  return points.map(([x, y], i) => `${i ? "L" : "M"}${x},${y}`).join(" ");
}

/** Decorative companion to a metric; gaps remain gaps, never zeroes. */
export function Sparkline({
  values,
  inverted = false,
}: {
  values: readonly (number | null)[];
  inverted?: boolean;
}) {
  const measured = values.filter(
    (value): value is number => value !== null && Number.isFinite(value),
  );
  // Two points draw a lone tick or slash that reads as a glitch, not a trend.
  // A line over a handful of days at one edge reads as a notch, not a
  // trend: draw only when at least a quarter of the period was measured.
  if (measured.length < Math.max(3, values.length / 4)) return null;
  const low = Math.min(...measured);
  const range = Math.max(...measured) - low;
  // Contiguous runs of measured days; a gap ends a run instead of dropping
  // the line to zero.
  const runs: Array<Array<[number, number]>> = [];
  let run: Array<[number, number]> = [];
  values.forEach((value, index) => {
    if (value === null || !Number.isFinite(value)) {
      if (run.length) runs.push(run);
      run = [];
      return;
    }
    const x = 2 + (index / Math.max(1, values.length - 1)) * 116;
    const fraction = range === 0 ? 0.5 : (value - low) / range;
    const y = 2 + (inverted ? fraction : 1 - fraction) * 24;
    run.push([x, y]);
  });
  if (run.length) runs.push(run);
  const path = runs.map(line).join(" ");
  // A flat series is one line; a filled band under it read as a bar.
  const area = runs
    .filter((points) => range !== 0 && points.length > 1)
    .map(
      (points) =>
        `${line(points)} L${points[points.length - 1][0]},28 L${points[0][0]},28 Z`,
    )
    .join(" ");
  return (
    <svg
      viewBox="0 0 120 28"
      // Stretch to the tile's width; the stroke stays 2px (non-scaling).
      preserveAspectRatio="none"
      className="mt-1 h-7 w-full text-[var(--metric-color)]"
      aria-hidden="true"
      focusable="false"
    >
      <path d={area} className="sparkline-area" stroke="none" />
      <path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
