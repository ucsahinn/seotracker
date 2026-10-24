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
  if (measured.length < 2) return null;
  const low = Math.min(...measured);
  const range = Math.max(...measured) - low;
  let connected = false;
  const path = values
    .map((value, index) => {
      if (value === null || !Number.isFinite(value)) {
        connected = false;
        return "";
      }
      const x = 2 + (index / Math.max(1, values.length - 1)) * 116;
      const fraction = range === 0 ? 0.5 : (value - low) / range;
      const y = 2 + (inverted ? fraction : 1 - fraction) * 24;
      const command = connected ? "L" : "M";
      connected = true;
      return `${command}${x},${y}`;
    })
    .join(" ");
  return (
    <svg
      viewBox="0 0 120 28"
      className="mt-1 h-7 w-full text-primary"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
