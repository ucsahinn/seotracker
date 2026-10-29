import { t } from "@/shared/i18n";
import * as React from "react";
import {
  GRAIN_LABEL,
  METRICS,
  type MetricId,
} from "@/client/features/search-performance/trendPoints";
import type { Granularity } from "@/client/features/search-performance/searchTabs";
import { CHART_SERIES, DATA_SERIES } from "@/client/components/Chart";

/**
 * The fills the trend draws with: the settled area fades to nothing at the
 * axis, and the days Google is still counting are hatched.
 */
export function TrendDefs() {
  return (
    <defs>
      <linearGradient id="sp-area" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={CHART_SERIES.primary} stopOpacity={0.14} />
        <stop offset="100%" stopColor={CHART_SERIES.primary} stopOpacity={0} />
      </linearGradient>
      <pattern
        id="sp-unsettled"
        width="6"
        height="6"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(45)"
      >
        <line
          x1="0"
          y1="0"
          x2="0"
          y2="6"
          stroke="currentColor"
          strokeOpacity="0.22"
          strokeWidth="2"
        />
      </pattern>
    </defs>
  );
}

/**
 * A week or month marker: filled on the settled line, hollow on the dashed
 * tail of a cut-off or still-counting period, nothing elsewhere.
 */
export function periodDot(
  points: ReadonlyArray<{ unsettled: boolean }>,
  tail: boolean,
) {
  return function Dot({
    cx,
    cy,
    index,
  }: {
    cx?: number;
    cy?: number;
    index?: number;
  }) {
    const unsettled = points[index ?? -1]?.unsettled ?? false;
    if (unsettled !== tail) return <g key={index} />;
    return (
      <circle
        key={index}
        cx={cx}
        cy={cy}
        r={4}
        stroke={CHART_SERIES.primary}
        strokeWidth={2}
        fill={tail ? "var(--color-base-100)" : CHART_SERIES.primary}
      />
    );
  };
}

export function TrendLegend({
  metric,
  label,
  compareLabel,
  unsettled,
  granularity,
  compareOff,
}: {
  metric: MetricId;
  label: string;
  compareLabel: string | null;
  unsettled: boolean;
  granularity: Granularity;
  compareOff: boolean;
}) {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-1.5" aria-label={t("Gösterge")}>
      <li className="inline-flex items-center gap-1.5">
        <span
          aria-hidden
          className="inline-block h-0.5 w-5 rounded-full"
          style={{ backgroundColor: DATA_SERIES[metric] }}
        />
        {label}
      </li>
      {compareLabel ? (
        <li className="inline-flex items-center gap-1.5">
          <span
            aria-hidden
            className="inline-block w-5 border-t-2 border-dashed"
            style={{ borderColor: DATA_SERIES[metric] }}
          />
          {compareLabel}
        </li>
      ) : null}
      {unsettled ? (
        <li className="inline-flex items-center gap-1.5">
          <span
            aria-hidden
            className="inline-block size-3 rounded-sm border border-[var(--hairline-strong)] bg-[repeating-linear-gradient(45deg,currentColor_0_1px,transparent_1px_4px)] opacity-60"
          />
          {granularity === "day"
            ? t("Taralı günler: Google hâlâ sayıyor, toplamlara katılmadı")
            : t("İçi boş nokta: eksik ya da kesinleşmemiş dönem")}
        </li>
      ) : null}
      {granularity !== "day" && !compareOff ? (
        <li>{t("Karşılaştırma çizgisi yalnızca gün görünümünde.")}</li>
      ) : null}
    </ul>
  );
}

/*
 * Two segmented groups with the same frame and the same padding, held
 * apart by a hairline so "Tıklama … Gün" never reads as one row of six
 * buttons. Each group wraps on its own instead of clipping the card edge.
 */
const GROUP =
  "flex max-w-full flex-wrap gap-0.5 rounded-field border border-[var(--hairline)] p-0.5";
const option = (active: boolean) =>
  `btn btn-sm whitespace-nowrap border-0 shadow-none ${
    active ? "btn-active" : "btn-ghost"
  }`;

export function TrendControls({
  metric,
  onMetric,
  granularity,
  onGranularity,
}: {
  metric: MetricId;
  onMetric: (next: MetricId) => void;
  granularity: Granularity;
  onGranularity: (next: Granularity) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <div role="group" aria-label={t("Grafik ölçüsü")} className={GROUP}>
        {METRICS.map((entry) => (
          <button
            key={entry.id}
            type="button"
            aria-pressed={metric === entry.id}
            onClick={() => onMetric(entry.id)}
            className={option(metric === entry.id)}
          >
            <span className="sm:hidden">{t(entry.short)}</span>
            <span className="hidden sm:inline">{t(entry.label)}</span>
          </button>
        ))}
      </div>
      <span
        aria-hidden
        className="hidden h-6 border-l border-[var(--hairline)] sm:block"
      />
      <div role="group" aria-label={t("Zaman birimi")} className={GROUP}>
        {(["day", "week", "month"] as const).map((grain) => (
          <button
            key={grain}
            type="button"
            aria-pressed={granularity === grain}
            onClick={() => onGranularity(grain)}
            className={option(granularity === grain)}
          >
            {t(GRAIN_LABEL[grain])}
          </button>
        ))}
      </div>
    </div>
  );
}
