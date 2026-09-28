import * as React from "react";
import { ResponsiveContainer } from "recharts";

/**
 * The frame every chart in the app sits in.
 *
 * Three charts existed before this and no two were built the same way: one
 * recharts area, one hand-written `<polyline>`, one hand-written `<circle>`
 * gauge. The fourth would have been a fourth approach. This is the shared
 * part — height, the sizing container, and the screen-reader summary — so a
 * chart file only describes the marks.
 *
 * `summary` is not optional on purpose. Recharts renders an SVG full of
 * `<path>` elements and says nothing useful to a screen reader, so a chart
 * without a sentence describing what it shows is a chart some readers cannot
 * read at all. Write the finding, not the shape: "28 günde 4.200 tıklama,
 * 14. günden sonra düşüşte", not "tıklama grafiği".
 */
export function Chart({
  children,
  summary,
  height = 200,
  className,
}: {
  /** A single recharts chart element. */
  children: React.ReactElement;
  /** What the chart shows, in a sentence, for readers who cannot see it. */
  summary: string;
  height?: number;
  className?: string;
}) {
  return (
    <figure className={className}>
      {/*
       * `text-muted` on the wrapper, so axis ticks can inherit it through
       * `fill="currentColor"` instead of each chart picking its own grey.
       */}
      <div
        className="w-full text-muted"
        style={{ height }}
        role="img"
        aria-label={summary}
      >
        {/* `minWidth={0}` keeps recharts from warning about a -1 measurement
            on the first paint, before the server-rendered markup has layout. */}
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          {children}
        </ResponsiveContainer>
      </div>
    </figure>
  );
}

/** The tooltip card, so every chart's hover looks like every other one's. */
export function ChartTooltip({
  title,
  rows,
}: {
  title?: string;
  rows: Array<{ label: string; value: string; color?: string }>;
}) {
  return (
    <div className="rounded-box border border-base-300 bg-base-100 px-3 py-2 shadow-sm">
      {title ? <p className="text-xs text-muted">{title}</p> : null}
      <div className="space-y-0.5">
        {rows.map((row) => (
          <p
            key={row.label}
            className="flex items-center gap-2 text-sm tabular-nums"
          >
            {row.color ? (
              <span
                aria-hidden
                className="size-2 shrink-0 rounded-full"
                style={{ background: row.color }}
              />
            ) : null}
            <span className="text-muted">{row.label}</span>
            <span className="ml-auto font-medium">{row.value}</span>
          </p>
        ))}
      </div>
    </div>
  );
}

/**
 * The axis/grid greys, as recharts props rather than classes.
 *
 * Recharts writes SVG attributes, so Tailwind classes do not reach the ticks.
 * Everything here resolves to a theme token, which is what makes the charts
 * follow the light/dark switch without a second palette.
 */
export const CHART_AXIS = {
  tick: { fill: "currentColor", fontSize: 11 },
  tickLine: false,
  axisLine: false,
  stroke: "currentColor",
} as const;

export const CHART_GRID = {
  stroke: "var(--color-base-300)",
  strokeDasharray: "3 3",
  vertical: false,
} as const;

/**
 * One accent, then tints of it — the house rule for charts too.
 *
 * Severity colours are the exception and come from the caller, because
 * `--color-error` and `--color-warning` sit at nearly the same lightness:
 * a series told apart by those two alone is not told apart at all, so any
 * chart using them also labels its marks.
 */
export const CHART_SERIES = {
  primary: "var(--color-primary)",
  /** The comparison series: same hue, receded. */
  comparison: "var(--color-base-300)",
} as const;
