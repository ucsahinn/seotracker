import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Chart,
  ChartTooltip,
  CHART_AXIS,
  CHART_GRID,
  CHART_SERIES,
} from "@/client/components/Chart";
import { formatCount, formatDay } from "@/client/lib/format";

type DailyRow = { key: string; clicks: number; impressions: number };

/**
 * What the four totals above it cannot say: when it happened.
 *
 * Search Console is already asked for these rows by date — the totals are a
 * sum of them — so this reads data the screen was throwing away rather than
 * spending another call. "Down 12%" is a different problem depending on
 * whether the drop is a step on one day or a slope across four weeks, and
 * the four totals above cannot tell those apart.
 *
 * One series. The previous period is summed into the delta badges above and
 * is deliberately not drawn here: the comparison it would support is the
 * shape of the *current* period, and a second band at a different scale
 * competes with the line it is meant to explain.
 */
function SearchTrendChart({
  daily,
  metric,
}: {
  daily: DailyRow[];
  metric: "clicks" | "impressions";
}) {
  if (daily.length < 2) return null;

  const label = metric === "clicks" ? "tıklama" : "gösterim";
  const total = daily.reduce((sum, row) => sum + row[metric], 0);
  const peak = daily.reduce((best, row) =>
    row[metric] > best[metric] ? row : best,
  );

  return (
    <Chart
      height={180}
      summary={`${daily.length} günde toplam ${formatCount(total)} ${label}. En yüksek gün ${formatDay(peak.key)}, ${formatCount(peak[metric])} ${label}.`}
    >
      <AreaChart data={daily} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
        <CartesianGrid {...CHART_GRID} />
        <XAxis
          dataKey="key"
          {...CHART_AXIS}
          tickFormatter={formatDay}
          minTickGap={24}
        />
        <YAxis
          {...CHART_AXIS}
          width={48}
          tickFormatter={formatCount}
          domain={[0, "auto"]}
          /*
           * Clicks are whole things. Without this a property with a single
           * click got a 0–1 domain sliced into fifths, and the axis read
           * "1 1 1 0 0" -- five ticks rounding to three distinct labels.
           */
          allowDecimals={false}
        />
        <Tooltip
          cursor={{ stroke: "currentColor", strokeOpacity: 0.2 }}
          /*
           * The value is looked up in `daily` rather than read off recharts'
           * `payload`, which is typed as `any` -- so this stays type-checked
           * and the tooltip cannot drift from the series it is describing.
           */
          content={({ active, label: day }) => {
            if (!active || typeof day !== "string") return null;
            const row = daily.find((entry) => entry.key === day);
            if (!row) return null;
            return (
              <ChartTooltip
                title={formatDay(day)}
                rows={[
                  {
                    label,
                    value: formatCount(row[metric]),
                    color: CHART_SERIES.primary,
                  },
                ]}
              />
            );
          }}
        />
        <Area
          type="monotone"
          dataKey={metric}
          stroke={CHART_SERIES.primary}
          strokeWidth={2}
          fill={CHART_SERIES.primary}
          fillOpacity={0.08}
        />
      </AreaChart>
    </Chart>
  );
}

const METRICS = [
  { id: "clicks", label: "Tıklama" },
  { id: "impressions", label: "Gösterim" },
] as const;

/**
 * The trend with its own metric switch, framed like the panels around it.
 *
 * Clicks and impressions share an axis badly — impressions run one to two
 * orders of magnitude higher, so plotted together the clicks line lies flat
 * on the floor and says nothing. One at a time, full height each.
 */
export function SearchTrendPanel({ daily }: { daily: DailyRow[] }) {
  const [metric, setMetric] =
    React.useState<(typeof METRICS)[number]["id"]>("clicks");

  // One day is a dot, and a dot is not a trend.
  if (daily.length < 2) return null;

  /*
   * A flat line along zero is not a trend either -- it is a shape that looks
   * like an answer. Search Console returns rows for days a property was
   * queried at all, so a new property produces a full set of zeros. Say that
   * instead, the way the dashboard card already does for empty GA4 windows.
   */
  const hasAnything = daily.some(
    (row) => row.clicks > 0 || row.impressions > 0,
  );

  return (
    <section className="overflow-hidden rounded-box border border-base-300 bg-base-100">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-base-300 px-4 py-3">
        <div>
          <h2 className="text-sm font-medium">Günlük seyir</h2>
          <p className="mt-0.5 text-xs text-muted">
            Yukarıdaki toplamların günlere dağılımı.
          </p>
        </div>
        <div role="group" aria-label="Grafik ölçüsü" className="join">
          {METRICS.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={metric === option.id}
              onClick={() => setMetric(option.id)}
              className={`btn join-item btn-sm ${
                metric === option.id ? "btn-active" : "btn-ghost"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      {hasAnything ? (
        <div className="px-2 py-3">
          <SearchTrendChart daily={daily} metric={metric} />
        </div>
      ) : (
        <p className="px-4 py-6 text-sm text-muted">
          Bu dönemde hiç gösterim yok, çizilecek bir seyir de yok. Search
          Console sayfalarınızı arama sonuçlarında göstermeye başladığında
          burada günlük dağılım çıkar.
        </p>
      )}
    </section>
  );
}
