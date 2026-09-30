import { formatDecimal, formatDuration } from "@/client/lib/format";
import { LabFieldComparison } from "./LabFieldComparison";
import type {
  LighthouseFieldData,
  LighthouseMetrics,
  LighthouseScores,
} from "./types";

export function LighthouseIssuesSummary({
  scores,
  metrics,
  fieldData,
  originFieldData,
}: {
  scores?: LighthouseScores | null;
  metrics?: LighthouseMetrics | null;
  fieldData?: LighthouseFieldData | null;
  /*
   * The whole site's numbers, which matter most when the page has none of
   * its own: a URL needs its own Chrome traffic to get field data, so on a
   * small site this card was empty on almost every page while Google had
   * been returning origin numbers in the same response all along.
   */
  originFieldData?: LighthouseFieldData | null;
}) {
  const metricItems = getMetricItems(metrics);
  const pageItems = getFieldItems(fieldData);
  const originItems = getFieldItems(originFieldData);
  /*
   * The page's own numbers when it has them, the site's otherwise. Never
   * both: two rows of the same five metrics, one of which is not about this
   * page, is a comparison the reader has to be told not to make.
   */
  const usingOrigin = pageItems.length === 0 && originItems.length > 0;
  const fieldItems = usingOrigin ? originItems : pageItems;
  const shownFieldData = usingOrigin ? originFieldData : fieldData;

  if (!scores && metricItems.length === 0 && fieldItems.length === 0) {
    return null;
  }

  return (
    <>
      {scores ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
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
        /*
         * Stacked, not label-left/value-right. In a four-column grid that
         * layout pushed each value hard against the *next* column's label,
         * so "FCP … 1,1 sn. LCP" read as if the number belonged to LCP.
         */
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-3 rounded-box border border-base-300 bg-base-200/25 px-4 py-3">
          {metricItems.map((metric) => (
            <div key={metric.label} className="flex flex-col gap-0.5">
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
              {usingOrigin
                ? "Gerçek kullanıcı verisi · site geneli · son 28 gün"
                : "Gerçek kullanıcı verisi · bu sayfa · son 28 gün"}
            </span>
            {shownFieldData?.overall ? (
              <span
                className={`text-xs font-semibold ${fieldCategoryClass(shownFieldData.overall)}`}
              >
                {fieldCategoryLabel(shownFieldData.overall)}
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Yukarıdaki skorlar Google&apos;ın test makinesinde ölçüldü. Bunlar
            sitenizi gerçekten ziyaret eden Chrome kullanıcılarından geliyor.
            {usingOrigin
              ? " Bu sayfanın kendi ziyaretçi sayısı Google'ın eşiğinin altında kaldığı için sitenizin tamamının ortalaması gösteriliyor."
              : ""}
          </p>
          <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
            {fieldItems.map((metric) => (
              <div key={metric.label} className="flex flex-col gap-0.5">
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
      {/* Only against the page's own numbers: comparing a lab run of one
          page with the whole site's field data is two different subjects. */}
      {usingOrigin ? null : (
        <LabFieldComparison metrics={metrics} fieldData={fieldData} />
      )}
    </>
  );
}

/** Google's own FAST / AVERAGE / SLOW verdict for a field metric. */
function fieldCategoryClass(category: string) {
  /*
   * The ink tokens, not the fills. On a base-100 surface `text-warning`
   * lands near 2.6:1 -- under SC 1.4.3 and under even the 3:1 large-text
   * floor -- while `--ink-warning` is around 8:1. The same thresholds are
   * already rendered correctly in `LighthouseScoreBadge`, so a score of 62
   * was readable in the table and barely legible in the gauge.
   */
  if (category === "FAST") return "text-[var(--ink-success)]";
  if (category === "AVERAGE") return "text-[var(--ink-warning)]";
  if (category === "SLOW") return "text-[var(--ink-error)]";
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
  if (score >= 90) return "text-[var(--ink-success)]";
  if (score >= 50) return "text-[var(--ink-warning)]";
  return "text-[var(--ink-error)]";
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
    /*
     * The one metric whose `displayValue` is a sentence rather than a value.
     * Lighthouse returns "Root document took 0 ms" for `server-response-time`
     * where every other audit returns "1,2 s" -- so the grid, which is label
     * beside number, was rendering "TTFB · Root doküman 0 ms. sürdü". The
     * numeric value is right there and goes through the app's own formatter,
     * the way the field column beside it already does.
     */
    {
      label: "TTFB",
      value:
        metrics.serverResponseTime.numericValue == null
          ? null
          : formatDuration(metrics.serverResponseTime.numericValue),
    },
  ].filter(
    (metric): metric is { label: string; value: string } =>
      metric.value != null,
  );
}
