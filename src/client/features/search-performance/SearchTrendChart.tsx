import { t } from "@/shared/i18n";
import * as React from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceArea,
  ReferenceLine,
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
  formatDate,
  formatDay,
  formatMonth,
} from "@/client/lib/format";
import { useReducedMotion } from "@/client/lib/useReducedMotion";
import {
  buildPoints,
  formatterFor,
  GRAIN_LABEL,
  METRICS,
  placedAnnotations,
  type MetricId,
  type Point,
} from "@/client/features/search-performance/trendPoints";
import type { SearchPerformanceView } from "@/shared/searchPerformanceView";
import type {
  CompareMode,
  Granularity,
} from "@/client/features/search-performance/searchTabs";
import {
  ANNOTATION_KIND_LABEL,
  annotationText,
  SearchNotes,
} from "@/client/features/search-performance/SearchNotes";
import {
  periodDot,
  TrendControls,
  TrendDefs,
  TrendLegend,
} from "@/client/features/search-performance/TrendParts";

/**
 * The trend, one metric at a time, with what it is compared against drawn as
 * a dashed line, the days Google is still counting shaded, and numbered
 * markers for Google updates, audits and the operator's own notes.
 *
 * Clicks and impressions share an axis badly (impressions run one to two
 * orders of magnitude higher), so they are switched, not stacked.
 */
export function SearchTrendPanel({
  projectId,
  view,
  compare,
  granularity,
  onGranularityChange,
}: {
  projectId: string;
  view: SearchPerformanceView;
  compare: CompareMode;
  granularity: Granularity;
  onGranularityChange: (next: Granularity) => void;
}) {
  const reduced = useReducedMotion();
  const [metric, setMetric] = React.useState<MetricId>("clicks");
  const config = METRICS.find((entry) => entry.id === metric) ?? METRICS[0];
  const format = formatterFor(config);
  const label = t(config.label);

  const points = buildPoints(view, metric, granularity, compare);
  const marks = placedAnnotations(view.annotations, points);
  const hasAnything = view.series.daily.some(
    (p) => p.clicks > 0 || p.impressions > 0,
  );
  const unsettled = points.filter((p) => p.unsettled);
  const firstUnsettled = granularity === "day" ? unsettled[0] : undefined;
  const lastPoint = points[points.length - 1];
  const showsCompare =
    granularity === "day" && points.some((p) => p.compare !== null);
  const compareLabel = compare === "yoy" ? t("Geçen yıl") : t("Önceki dönem");

  const measured = points.filter(
    (p): p is Point & { value: number } => p.value !== null && !p.unsettled,
  );
  const best = measured.reduce<(Point & { value: number }) | null>(
    (top, p) =>
      top === null ||
      (config.kind === "position" ? p.value < top.value : p.value > top.value)
        ? p
        : top,
    null,
  );
  /*
   * The settled stretch is a filled area; the days Google is still counting
   * are a thin dashed line with no fill, joined to the last settled point.
   * A solid line diving to the right edge read as traffic collapsing.
   */
  const chartData = points.map((p, i) => {
    // Two dashed series, so an unsettled period joins the settled point
    // before it (the tail at the right edge) and after it (a cut-off first
    // week), without one dashed line also running over the settled stretch.
    return {
      ...p,
      solid: p.unsettled ? null : p.value,
      lead: p.unsettled || points[i - 1]?.unsettled ? p.value : null,
      tail: p.unsettled || points[i + 1]?.unsettled ? p.value : null,
    };
  });
  const xLabel = (x: string) =>
    granularity === "month" ? formatMonth(x) : formatDay(x);

  return (
    <section className="overflow-hidden rounded-box border border-[var(--hairline)] bg-base-100 shadow-[var(--shadow-raise)]">
      <div className="flex flex-col gap-3 border-b border-[var(--hairline)] px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-sm font-medium">{t("Zaman içinde")}</h2>
        <TrendControls
          metric={metric}
          onMetric={setMetric}
          granularity={granularity}
          onGranularity={onGranularityChange}
        />
      </div>

      {!hasAnything ? (
        <p className="px-4 py-6 text-sm text-muted">
          {t(
            "Bu dönemde hiç gösterim yok, grafik boş. Search Console sayfalarınızı arama sonuçlarında göstermeye başlayınca günlük dağılım burada görünür.",
          )}
        </p>
      ) : points.length < 2 ? (
        <p className="px-4 py-6 text-sm text-muted">
          {t("Bu zaman biriminde çizilecek kadar dönem yok.")}
        </p>
      ) : (
        <div className="px-2 pt-3">
          <Chart
            metric={metric}
            height={240}
            table={{
              caption: t("{metric} ({grain})", {
                metric: label,
                grain: t(GRAIN_LABEL[granularity]),
              }),
              columns: [
                t("Dönem"),
                label,
                ...(showsCompare ? [compareLabel] : []),
                t("Durum"),
              ],
              rows: points.map((p) => [
                xLabel(p.x),
                p.value === null ? "–" : format(p.value),
                ...(showsCompare
                  ? [p.compare === null ? "–" : format(p.compare)]
                  : []),
                p.state === "pending"
                  ? t("Henüz veri yok")
                  : p.unsettled
                    ? t("Kesinleşmedi")
                    : p.state === "noImpressions"
                      ? t("Gösterim yok")
                      : t("Kesin"),
              ]),
            }}
            summary={
              best
                ? t(
                    "{count} dönemlik {metric} grafiği. En iyi dönem {day}, {value}.",
                    {
                      count: formatCount(points.length),
                      metric: t(config.inline),
                      day: xLabel(best.x),
                      value: format(best.value),
                    },
                  )
                : t("{metric} grafiği", { metric: label })
            }
          >
            <ComposedChart
              data={chartData}
              margin={{ top: 18, right: 12, bottom: 0, left: 0 }}
            >
              <TrendDefs />
              <CartesianGrid {...CHART_GRID} />
              {firstUnsettled && lastPoint ? (
                <ReferenceArea
                  x1={firstUnsettled.x}
                  x2={lastPoint.x}
                  fill="url(#sp-unsettled)"
                  fillOpacity={1}
                  label={{
                    value: t("Kesinleşmedi"),
                    position: "insideTopRight",
                    fill: "var(--text-muted)",
                    fontSize: 10,
                  }}
                />
              ) : null}
              {marks.map((mark) => (
                <ReferenceLine
                  key={`${mark.annotation.kind}-${mark.n}`}
                  x={mark.x}
                  stroke={
                    mark.annotation.kind === "note"
                      ? "var(--color-primary)"
                      : "currentColor"
                  }
                  strokeOpacity={0.6}
                  strokeDasharray="3 4"
                  label={{
                    value: String(mark.n),
                    position: "top",
                    fill: "currentColor",
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                />
              ))}
              <XAxis
                dataKey="x"
                {...CHART_AXIS}
                tickFormatter={xLabel}
                minTickGap={24}
              />
              <YAxis
                {...CHART_AXIS}
                width={52}
                tickFormatter={format}
                domain={
                  config.kind === "position"
                    ? ["dataMin", "dataMax"]
                    : [0, "auto"]
                }
                reversed={config.kind === "position"}
                allowDecimals={config.kind !== "count"}
              />
              <Tooltip
                cursor={{ stroke: "currentColor", strokeOpacity: 0.2 }}
                content={({ active, label: x }) => {
                  if (!active || typeof x !== "string") return null;
                  const p = points.find((entry) => entry.x === x);
                  if (!p) return null;
                  const here = marks.filter((m) => m.x === x);
                  return (
                    <ChartTooltip
                      title={
                        p.end === p.x
                          ? formatDate(p.x)
                          : `${formatDate(p.x)} – ${formatDate(p.end)}`
                      }
                      rows={[
                        {
                          label,
                          value:
                            p.value === null
                              ? t("Henüz veri yok")
                              : format(p.value),
                          color: CHART_SERIES.primary,
                        },
                        ...(showsCompare
                          ? [
                              {
                                label: compareLabel,
                                value:
                                  p.compare === null ? "–" : format(p.compare),
                              },
                            ]
                          : []),
                        ...(p.unsettled
                          ? [
                              {
                                label: t("Durum"),
                                value:
                                  granularity === "day"
                                    ? t(
                                        "Google hâlâ sayıyor; bu gün toplamlara katılmadı",
                                      )
                                    : t("Eksik dönem"),
                              },
                            ]
                          : []),
                        ...here.map((m) => ({
                          label: `${m.n}. ${t(ANNOTATION_KIND_LABEL[m.annotation.kind])}`,
                          value: annotationText(m.annotation),
                        })),
                      ]}
                    />
                  );
                }}
              />
              {showsCompare ? (
                <Line
                  type="monotone"
                  dataKey="compare"
                  stroke={CHART_SERIES.comparison}
                  strokeWidth={1.75}
                  strokeDasharray="5 4"
                  dot={false}
                  connectNulls={false}
                  isAnimationActive={!reduced}
                />
              ) : null}
              <Line
                type="monotone"
                dataKey="tail"
                stroke={CHART_SERIES.primary}
                strokeWidth={1.5}
                strokeDasharray="4 3"
                dot={granularity === "day" ? false : periodDot(points, true)}
                activeDot={false}
                connectNulls={false}
                isAnimationActive={!reduced}
              />
              <Line
                type="monotone"
                dataKey="lead"
                stroke={CHART_SERIES.primary}
                strokeWidth={1.5}
                strokeDasharray="4 3"
                dot={false}
                activeDot={false}
                connectNulls={false}
                isAnimationActive={!reduced}
              />
              <Area
                type="monotone"
                dataKey="solid"
                stroke={CHART_SERIES.primary}
                strokeWidth={2}
                fill="url(#sp-area)"
                fillOpacity={1}
                connectNulls={false}
                dot={granularity === "day" ? false : periodDot(points, false)}
                isAnimationActive={!reduced}
              />
            </ComposedChart>
          </Chart>
        </div>
      )}

      <div className="flex flex-col gap-2 px-4 pb-3 pt-1 text-xs text-muted">
        <TrendLegend
          metric={metric}
          label={label}
          compareLabel={showsCompare ? compareLabel : null}
          unsettled={unsettled.length > 0}
          granularity={granularity}
          compareOff={compare === "none"}
        />
        <SearchNotes
          projectId={projectId}
          marks={marks}
          defaultDate={view.window.lastDataDate ?? view.window.endDate}
          floorDate={view.window.floorDate}
          lastDate={view.window.freshEndDate}
        />
      </div>
    </section>
  );
}
