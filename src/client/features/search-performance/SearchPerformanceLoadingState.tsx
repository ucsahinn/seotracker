import { t } from "@/shared/i18n";
import { MetricRow } from "@/client/components/MetricTile";

/**
 * Shaped like the screen that is coming -- filters, the data strip, four
 * tiles, the chart and the to-do list -- so nothing moves when it lands.
 */
export function SearchPerformanceLoadingState() {
  return (
    <div className="flex flex-col gap-5" aria-busy="true">
      <span className="sr-only" role="status">
        {t("Yükleniyor")}
      </span>
      <div className="flex flex-wrap gap-2" aria-hidden>
        {[32, 36, 36, 36, 44].map((w, index) => (
          <div
            key={index}
            className="skeleton h-8"
            style={{ width: `${w * 4}px` }}
          />
        ))}
      </div>
      <div
        className="grid grid-cols-2 gap-4 rounded-box border border-[var(--hairline)] p-4 xl:grid-cols-3"
        aria-hidden
      >
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <div key={index} className="space-y-2">
            <div className="skeleton h-3 w-16" />
            <div className="skeleton h-5 w-4/5" />
          </div>
        ))}
      </div>
      <div aria-hidden>
        <MetricRow>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-2.5 px-5 py-4">
              <div className="skeleton h-3 w-20" />
              <div className="skeleton h-7 w-28" />
              <div className="skeleton h-6 w-28" />
            </div>
          ))}
        </MetricRow>
      </div>
      <div
        className="flex flex-col gap-3 rounded-box border border-[var(--hairline)] p-4"
        aria-hidden
      >
        <div className="flex justify-between gap-3">
          <div className="skeleton h-4 w-28" />
          <div className="skeleton h-8 w-72 max-w-full" />
        </div>
        <div className="skeleton h-56" />
      </div>
      <div
        className="overflow-hidden rounded-box border border-[var(--hairline)]"
        aria-hidden
      >
        <div className="flex gap-4 border-b border-[var(--hairline)] px-4 py-3">
          {[28, 20, 20, 20, 24].map((w, index) => (
            <div
              key={index}
              className="skeleton h-5 shrink-0"
              style={{ width: `${w * 4}px` }}
            />
          ))}
        </div>
        <div className="flex flex-col gap-2 p-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 rounded-box border border-[var(--hairline)] p-4"
            >
              <div className="skeleton h-4 w-3/5" />
              <div className="skeleton h-3 w-2/5" />
              <div className="skeleton h-3 w-4/5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
