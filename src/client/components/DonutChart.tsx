import * as React from "react";
import { Cell, Pie, PieChart, Tooltip } from "recharts";
import { Chart, ChartTooltip } from "@/client/components/Chart";
import { formatCount, formatPercent } from "@/client/lib/format";

/**
 * A share of a whole, as a ring.
 *
 * A donut rather than a pie: the hole carries the total, which is the number
 * a reader wants next to the split and which a pie has nowhere to put. It
 * also keeps the segments as arcs rather than wedges meeting at a point,
 * where the thin ones become invisible.
 *
 * Deliberately limited to a handful of segments. Past five or six, arc
 * lengths stop being comparable by eye and a sorted bar list is the better
 * chart — which is why the country breakdown and the position bands stayed
 * bars. This exists for the case a ring genuinely answers: "how is one total
 * divided", where the parts sum to something meaningful.
 *
 * Every segment carries its name and number in the legend beside it, so the
 * colours are a second encoding rather than the only one.
 */

type Segment = { key: string; label: string; value: number; color: string };

export function DonutChart({
  segments,
  totalLabel,
  summary,
  height = 200,
}: {
  segments: Segment[];
  /** What the number in the hole is, e.g. "sayfa". */
  totalLabel: string;
  /** The finding, for readers who cannot see the ring. */
  summary: string;
  height?: number;
}) {
  const [hovered, setHovered] = React.useState<number | null>(null);
  const shown = segments.filter((segment) => segment.value > 0);
  const total = shown.reduce((sum, segment) => sum + segment.value, 0);

  // A ring of nothing is a shape that looks like an answer.
  if (total === 0 || shown.length === 0) return null;

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <div className="relative shrink-0" style={{ width: height }}>
        <Chart height={height} summary={summary}>
          <PieChart>
            <Pie
              data={shown}
              dataKey="value"
              nameKey="label"
              innerRadius="62%"
              outerRadius="92%"
              paddingAngle={2}
              stroke="none"
              isAnimationActive={false}
              onMouseEnter={(_, index: number) => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              {shown.map((segment) => (
                <Cell key={segment.key} fill={segment.color} />
              ))}
            </Pie>
            <Tooltip
              /*
               * The hovered segment comes from `onMouseEnter`'s index, not
               * from recharts' `payload` -- which is typed `any`, so reading
               * a label off it would put the tooltip's correctness outside
               * the type checker. Same call the trend charts make.
               */
              content={({ active }) => {
                if (!active) return null;
                const segment = hovered === null ? null : shown[hovered];
                if (!segment) return null;
                return (
                  <ChartTooltip
                    title={segment.label}
                    rows={[
                      {
                        label: totalLabel,
                        value: `${formatCount(segment.value)} · ${formatPercent(segment.value / total)}`,
                        color: segment.color,
                      },
                    ]}
                  />
                );
              }}
            />
          </PieChart>
        </Chart>
        {/*
         * The total, in the hole. `pointer-events-none` so it never steals
         * a hover from the arc underneath it.
         */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold tabular-nums">
            {formatCount(total)}
          </span>
          <span className="text-xs text-muted">{totalLabel}</span>
        </div>
      </div>

      {/*
       * The legend is a list with numbers, not a colour key. A reader who
       * cannot separate the hues still gets the whole finding from it.
       */}
      <ul className="w-full space-y-1.5">
        {shown.map((segment) => (
          <li
            key={segment.key}
            className="flex items-baseline justify-between gap-3 text-sm"
          >
            <span className="flex min-w-0 items-center gap-2">
              <span
                aria-hidden
                className="size-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: segment.color }}
              />
              <span className="truncate">{segment.label}</span>
            </span>
            <span className="shrink-0 tabular-nums">
              {formatCount(segment.value)}
              <span className="ml-2 text-muted">
                {formatPercent(segment.value / total)}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
