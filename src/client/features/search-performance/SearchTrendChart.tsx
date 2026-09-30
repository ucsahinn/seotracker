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
import {
  formatCount,
  formatDay,
  formatDecimal,
  formatPercent,
} from "@/client/lib/format";

type DailyRow = {
  key: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

type MetricId = (typeof METRICS)[number]["id"];

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
  metric: MetricId;
}) {
  if (daily.length < 2) return null;

  const config = METRICS.find((entry) => entry.id === metric) ?? METRICS[0];
  const label = config.label.toLocaleLowerCase("tr");
  /*
   * A day with no impressions has no position -- `toDailyRows` fills it with
   * zero, and zero would draw as a better rank than 1. Rate and rank are
   * read on the days the site was actually shown; the counts keep every day,
   * because a day with no clicks really is zero clicks.
   */
  const shown =
    config.kind === "count"
      ? daily
      : daily.filter((row) => row.impressions > 0);
  if (shown.length < 2) return null;

  const format =
    config.kind === "count"
      ? formatCount
      : config.kind === "percent"
        ? (value: number) => formatPercent(value)
        : (value: number) => formatDecimal(value);
  const total = shown.reduce((sum, row) => sum + row[metric], 0);
  const peak = shown.reduce((best, row) =>
    // Position is better when smaller, so "peak" means the best rank.
    config.kind === "position"
      ? row[metric] < best[metric]
        ? row
        : best
      : row[metric] > best[metric]
        ? row
        : best,
  );

  return (
    <Chart
      height={180}
      summary={
        config.kind === "count"
          ? `${formatCount(shown.length)} günde toplam ${format(total)} ${label}. En yüksek gün ${formatDay(peak.key)}, ${format(peak[metric])}.`
          : `${formatCount(shown.length)} günde ortalama ${format(total / shown.length)} ${label}. En iyi gün ${formatDay(peak.key)}, ${format(peak[metric])}.`
      }
    >
      <AreaChart data={shown} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
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
          tickFormatter={format}
          /*
           * Position runs the other way: 1 is the top of the page, so the
           * axis is inverted and starts at the best rank rather than at
           * zero. `QueryHistoryCard` already draws it this way.
           */
          domain={
            config.kind === "position" ? ["dataMin", "dataMax"] : [0, "auto"]
          }
          reversed={config.kind === "position"}
          /*
           * Clicks are whole things. Without this a property with a single
           * click got a 0–1 domain sliced into fifths, and the axis read
           * "1 1 1 0 0" -- five ticks rounding to three distinct labels.
           * Rates and ranks are not whole, so they keep their decimals.
           */
          allowDecimals={config.kind !== "count"}
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
            const row = shown.find((entry) => entry.key === day);
            if (!row) return null;
            return (
              <ChartTooltip
                title={formatDay(day)}
                rows={[
                  {
                    label,
                    value: format(row[metric]),
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

/*
 * All four, not two. Search Console returns clicks, impressions, CTR and
 * position for every day in the window, and the rows were already on the
 * client -- the switch simply did not offer half of them. Average position
 * over time is *the* ranking trend line, and it cost no extra Google call.
 */
const METRICS = [
  { id: "clicks", label: "Tıklama", kind: "count" },
  { id: "impressions", label: "Gösterim", kind: "count" },
  { id: "ctr", label: "Tıklama oranı", kind: "percent" },
  { id: "position", label: "Ortalama sıra", kind: "position" },
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
