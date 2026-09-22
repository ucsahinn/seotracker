import { formatDecimal, formatDuration } from "@/client/lib/format";
import type {
  LighthouseFieldData,
  LighthouseMetrics,
  LighthouseScores,
} from "./types";

export function LighthouseIssuesSummary({
  scores,
  metrics,
  fieldData,
}: {
  scores?: LighthouseScores | null;
  metrics?: LighthouseMetrics | null;
  fieldData?: LighthouseFieldData | null;
}) {
  const metricItems = getMetricItems(metrics);
  const fieldItems = getFieldItems(fieldData);

  if (!scores && metricItems.length === 0 && fieldItems.length === 0) {
    return null;
  }

  return (
    <>
      {scores ? (
        <div className="grid grid-cols-4 gap-3">
          <ScoreGauge label="Performans" score={scores.performance} />
          <ScoreGauge label="Erişilebilirlik" score={scores.accessibility} />
          <ScoreGauge
            label="En iyi uygulamalar"
            score={scores["best-practices"]}
          />
          <ScoreGauge label="SEO" score={scores.seo} />
        </div>
      ) : null}
      {metricItems.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-1 rounded-box border border-base-300 bg-base-200/25 px-4 py-3">
          {metricItems.map((metric) => (
            <div
              key={metric.label}
              className="flex items-baseline justify-between gap-2 py-1"
            >
              <span className="text-xs text-muted uppercase tracking-wide">
                {metric.label}
              </span>
              <span className="text-sm font-semibold tabular-nums text-base-content">
                {metric.value}
              </span>
            </div>
          ))}
        </div>
      ) : null}
      {fieldItems.length > 0 ? (
        <div className="rounded-box border border-base-300 bg-base-200/25 px-4 py-3">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-xs uppercase tracking-wide text-muted">
              Gerçek kullanıcı verisi · son 28 gün
            </span>
            {fieldData?.overall ? (
              <span
                className={`text-xs font-semibold ${fieldCategoryClass(fieldData.overall)}`}
              >
                {fieldCategoryLabel(fieldData.overall)}
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Yukarıdaki skorlar Google&apos;ın test makinesinde ölçüldü. Bunlar
            sitenizi gerçekten ziyaret eden Chrome kullanıcılarından geliyor.
          </p>
          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-4">
            {fieldItems.map((metric) => (
              <div
                key={metric.label}
                className="flex items-baseline justify-between gap-2 py-1"
              >
                <span className="text-xs uppercase tracking-wide text-muted">
                  {metric.label}
                </span>
                <span
                  className={`text-sm font-semibold tabular-nums ${fieldCategoryClass(metric.category)}`}
                >
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}

/** Google's own FAST / AVERAGE / SLOW verdict for a field metric. */
function fieldCategoryClass(category: string) {
  if (category === "FAST") return "text-success";
  if (category === "AVERAGE") return "text-warning";
  if (category === "SLOW") return "text-error";
  return "text-base-content";
}

function fieldCategoryLabel(category: string) {
  if (category === "FAST") return "Hızlı";
  if (category === "AVERAGE") return "Orta";
  if (category === "SLOW") return "Yavaş";
  return category;
}

function getFieldItems(fieldData?: LighthouseFieldData | null) {
  if (!fieldData) return [];

  // CLS is reported as a score scaled by 100, unlike the timing metrics.
  const cls = fieldData.cumulativeLayoutShift;
  return [
    {
      label: "LCP",
      metric: fieldData.largestContentfulPaint,
      format: (value: number) => formatDuration(value),
    },
    {
      label: "CLS",
      metric: cls,
      format: (value: number) => formatDecimal(value / 100, 3),
    },
    {
      label: "INP",
      metric: fieldData.interactionToNextPaint,
      format: (value: number) => formatDuration(value),
    },
    {
      label: "FCP",
      metric: fieldData.firstContentfulPaint,
      format: (value: number) => formatDuration(value),
    },
    {
      label: "TTFB",
      metric: fieldData.timeToFirstByte,
      format: (value: number) => formatDuration(value),
    },
  ]
    .filter(
      (
        item,
      ): item is typeof item & {
        metric: NonNullable<(typeof item)["metric"]>;
      } => item.metric !== null,
    )
    .map((item) => ({
      label: item.label,
      value: item.format(item.metric.percentile),
      category: item.metric.category,
    }));
}

function scoreColor(score: number | null) {
  if (score == null) return "text-muted";
  if (score >= 90) return "text-success";
  if (score >= 50) return "text-warning";
  return "text-error";
}

function scoreStrokeColor(score: number | null) {
  if (score == null) return "stroke-base-content/20";
  if (score >= 90) return "stroke-success";
  if (score >= 50) return "stroke-warning";
  return "stroke-error";
}

function ScoreGauge({ label, score }: { label: string; score: number | null }) {
  const displayScore = score ?? 0;
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const progress = (displayScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1.5 py-2">
      <div className="relative size-16">
        <svg viewBox="0 0 64 64" className="size-full -rotate-90">
          <circle
            cx="32"
            cy="32"
            r={radius}
            fill="none"
            strokeWidth="4"
            className="stroke-base-300/60"
          />
          {score != null ? (
            <circle
              cx="32"
              cy="32"
              r={radius}
              fill="none"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${progress} ${circumference}`}
              className={scoreStrokeColor(score)}
            />
          ) : null}
        </svg>
        <span
          className={`absolute inset-0 flex items-center justify-center text-lg font-bold ${scoreColor(score)}`}
        >
          {score ?? "-"}
        </span>
      </div>
      <span className="text-[11px] text-muted text-center leading-tight">
        {label}
      </span>
    </div>
  );
}

function getMetricItems(metrics?: LighthouseMetrics | null) {
  if (!metrics) return [];

  return [
    { label: "FCP", value: metrics.firstContentfulPaint.displayValue },
    { label: "LCP", value: metrics.largestContentfulPaint.displayValue },
    { label: "TBT", value: metrics.totalBlockingTime.displayValue },
    { label: "SI", value: metrics.speedIndex.displayValue },
    { label: "TTI", value: metrics.timeToInteractive.displayValue },
    { label: "CLS", value: metrics.cumulativeLayoutShift.displayValue },
    { label: "INP", value: metrics.interactionToNextPaint.displayValue },
    { label: "TTFB", value: metrics.serverResponseTime.displayValue },
  ].filter(
    (metric): metric is { label: string; value: string } =>
      metric.value != null,
  );
}
