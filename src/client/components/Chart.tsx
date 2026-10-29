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
type ChartTable = {
  caption: string;
  columns: string[];
  rows: string[][];
};

export function Chart({
  children,
  summary,
  table,
  height = 200,
  className,
  metric,
}: {
  /** A single recharts chart element. */
  children: React.ReactElement;
  /** What the chart shows, in a sentence, for readers who cannot see it. */
  summary: string;
  /**
   * The same values as the marks, as a table for readers who cannot hover.
   * Visually hidden; the summary says the finding, this holds the numbers.
   */
  table?: ChartTable;
  height?: number;
  className?: string;
  /** Named metric overrides the default clicks hue, including comparison. */
  metric?: keyof typeof DATA_SERIES;
}) {
  /*
   * Measured here before recharts is allowed to measure it.
   *
   * These pages are server-rendered, and `ResponsiveContainer` reads its
   * box the moment it mounts. Before layout settles that read comes back
   * as -1 by -1, and recharts logs a warning to the console of every
   * install on every page with a chart — for a chart that then draws
   * correctly a frame later. Waiting for a real width means it never sees
   * the bad one. The box keeps its height throughout, so nothing moves.
   */
  const box = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(0);
  const style:
    | (React.CSSProperties & { "--chart-series": string })
    | undefined = metric
    ? { "--chart-series": DATA_SERIES[metric] }
    : undefined;

  React.useEffect(() => {
    const element = box.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry?.contentRect.width ?? 0);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <figure className={className} style={style}>
      {/*
       * `text-muted` on the wrapper, so axis ticks can inherit it through
       * `fill="currentColor"` instead of each chart picking its own grey.
       */}
      <div
        ref={box}
        className="w-full text-muted"
        style={{ height }}
        role="img"
        aria-label={summary}
      >
        {/*
         * A fixed width, not `100%`: it is the width this element actually
         * has, so recharts does no measuring of its own and cannot catch
         * the element mid-layout.
         */}
        {width > 0 ? (
          <ResponsiveContainer width={width} height={height}>
            {children}
          </ResponsiveContainer>
        ) : null}
      </div>
      {table ? (
        /*
         * `sr-only` on a wrapper, not on the table: a table cannot shrink
         * below its content, so a 1px sr-only table still laid out at full
         * width and pushed the page sideways on a phone (452px at 390). The
         * wrapper's 1px box with overflow hidden actually clips it.
         */
        <div className="sr-only">
          <table>
            <caption>{table.caption}</caption>
            <thead>
              <tr>
                {table.columns.map((column) => (
                  <th key={column} scope="col">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row) => (
                <tr key={row.join("|")}>
                  {row.map((value, index) => (
                    <td key={table.columns[index] ?? index}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
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
  tick: { fill: "currentColor", fontSize: 12 },
  tickLine: false,
  axisLine: false,
  stroke: "currentColor",
} as const;

export const CHART_GRID = {
  stroke: "var(--color-base-300)",
  strokeDasharray: "3 3",
  vertical: false,
} as const;

/** Stable metric identities, shared by cards, legends and chart marks. */
export const DATA_SERIES = {
  clicks: "var(--data-clicks)",
  impressions: "var(--data-impressions)",
  ctr: "var(--data-ctr)",
  position: "var(--data-position)",
  sessions: "var(--data-sessions)",
  conversions: "var(--data-conversions)",
} as const;

/** Default search series; comparison lines also need a dash or label. */
export const CHART_SERIES = {
  primary: "var(--chart-series, var(--data-clicks))",
  comparison: "var(--chart-series, var(--data-clicks))",
} as const;
