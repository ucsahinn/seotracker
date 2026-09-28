import { formatCount, formatPercent } from "@/client/lib/format";

type ShareSegment = {
  label: string;
  value: number;
  /** A CSS colour. Segments are labelled as well, never told apart by this alone. */
  color: string;
};

/**
 * One bar, split by share, with every segment named and counted.
 *
 * A pie was the obvious reach here and the wrong one: these are parts of a
 * known whole read against each other, which a single bar shows at a glance
 * and a pie makes you compare angles for. It is also the shape that survives
 * a segment being 1% — a pie slice that thin is a line.
 *
 * Every segment carries its label and its number in the legend below,
 * because the house rule is that direction and meaning are never colour
 * alone: `--color-success` and `--color-error` sit at nearly the same
 * lightness.
 */
export function StackedShare({
  segments,
  summary,
}: {
  segments: ShareSegment[];
  /** What the bar says, for readers who cannot see it. */
  summary: string;
}) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);
  if (total === 0) return null;

  return (
    <figure className="space-y-2">
      <div
        role="img"
        aria-label={summary}
        className="flex h-2.5 overflow-hidden rounded-full bg-base-200"
      >
        {segments
          .filter((segment) => segment.value > 0)
          .map((segment) => (
            <span
              key={segment.label}
              className="h-full"
              style={{
                width: `${(segment.value / total) * 100}%`,
                background: segment.color,
              }}
            />
          ))}
      </div>
      <figcaption className="flex flex-wrap gap-x-4 gap-y-1">
        {segments.map((segment) => (
          <span
            key={segment.label}
            className="inline-flex items-center gap-1.5 text-xs text-muted"
          >
            <span
              aria-hidden
              className="size-2 shrink-0 rounded-full"
              style={{ background: segment.color }}
            />
            {segment.label}
            <span className="font-medium text-base-content">
              {formatCount(segment.value)}
            </span>
            <span className="text-subtle">
              {formatPercent(segment.value / total)}
            </span>
          </span>
        ))}
      </figcaption>
    </figure>
  );
}
