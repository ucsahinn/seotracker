import { pointsDelta } from "@/shared/delta";
import { AnimatedNumber } from "@/client/components/AnimatedNumber";
import { DATA_SERIES } from "@/client/components/Chart";
import { HeaderHelpLabel } from "@/client/features/saved-keywords/components/HeaderHelpLabel";
import { countComparison, DeltaBadge } from "@/client/components/MetricTile";
import { t } from "@/shared/i18n";

export function AnalyticsTotal({
  label,
  value,
  previous,
  deltaTitle,
  format,
  help,
  metric,
  rate = false,
}: {
  label: string;
  metric?: keyof typeof DATA_SERIES;
  help?: string;
  /** A rate moves in points ("-0,3 puan"), as CTR does, not as a percentage of itself. */
  rate?: boolean;
  value: number | null;
  previous: number | null;
  /** What the delta is measured against, named rather than implied. */
  deltaTitle: string;
  format: (value: number) => string;
}) {
  const change =
    value === null || previous === null
      ? null
      : rate
        ? pointsDelta(value, previous)
        : countComparison(value, previous, format);
  const style:
    | (React.CSSProperties & { "--metric-color": string })
    | undefined = metric
    ? { "--metric-color": DATA_SERIES[metric] }
    : undefined;
  return (
    <div
      className={
        metric
          ? "metric-tile min-w-0 rounded-field p-2 text-left"
          : "min-w-0 text-left"
      }
      data-metric={metric}
      style={style}
    >
      <p className="text-xs text-muted">
        {help ? <HeaderHelpLabel label={label} helpText={help} /> : label}
      </p>
      <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-lg font-semibold tabular-nums">
        {value === null ? (
          t("Bilinmiyor")
        ) : (
          <span className="metric-value">
            <AnimatedNumber value={value} format={format} />
          </span>
        )}
        {change === null ? null : (
          <DeltaBadge value={change} title={deltaTitle} />
        )}
      </p>
      {value !== null && previous === null ? (
        <span className="inline-flex">
          <HeaderHelpLabel
            label={t("Karşılaştırma yok")}
            helpText={t(
              "Karşılaştırma yok; önceki değer okunamadı veya veri sınırlı.",
            )}
          />
        </span>
      ) : null}
    </div>
  );
}
