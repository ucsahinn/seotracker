import { t } from "@/shared/i18n";
import * as React from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import type { CompareMode } from "@/client/features/search-performance/searchTabs";
import {
  DEVICE_LABELS,
  isDevice,
} from "@/client/features/search-performance/deviceShare";
import { formatCountry } from "@/client/lib/format";
import {
  GSC_DEVICES,
  SEARCH_PERFORMANCE_RANGES,
  SEARCH_PERFORMANCE_TYPES,
  type SearchPerformanceDateRange,
  type SearchPerformanceDevice,
  type SearchPerformanceType,
} from "@/types/schemas/search-performance";

// Labels stay Turkish here and go through t() where they render.
const RANGE_LABELS: Record<SearchPerformanceDateRange, string> = {
  last_7_days: "Son 7 gün",
  last_28_days: "Son 28 gün",
  last_3_months: "Son 3 ay",
};
const RANGE_OPTIONS = SEARCH_PERFORMANCE_RANGES.map((value) => ({
  value,
  label: RANGE_LABELS[value],
}));

const DEVICE_OPTIONS = GSC_DEVICES.map((value) => ({
  value,
  label: DEVICE_LABELS[value],
}));

const TYPE_LABELS: Record<SearchPerformanceType, string> = {
  web: "Web",
  image: "Görsel",
  video: "Video",
  news: "Haber",
};
const TYPE_OPTIONS = SEARCH_PERFORMANCE_TYPES.map((value) => ({
  value,
  label: TYPE_LABELS[value],
}));

function isSearchType(value: string): value is SearchPerformanceType {
  return SEARCH_PERFORMANCE_TYPES.some((option) => option === value);
}

// Sentinel for "no filter" in the selects; never sent to the server.
const ALL = "ALL";

const COMPARE_LABEL: Record<CompareMode, string> = {
  previous: "Önceki dönemle",
  yoy: "Geçen yılla",
  none: "Karşılaştırma yok",
};

function isDateRange(value: string): value is SearchPerformanceDateRange {
  return SEARCH_PERFORMANCE_RANGES.some((option) => option === value);
}

/**
 * The search type, device, country, date-range and comparison selects. On a
 * phone five stacked selects pushed the numbers below the fold, so there
 * they fold behind one "Filters (Web · All devices · ...)" button that says
 * what is applied.
 */
export function SearchFilters({
  pinned = false,
  range,
  device,
  country,
  searchType,
  compare,
  countries,
  onViewChange,
}: {
  pinned?: boolean;
  range: SearchPerformanceDateRange;
  device?: SearchPerformanceDevice;
  country?: string;
  searchType: SearchPerformanceType;
  compare: CompareMode;
  countries: { key: string }[];
  onViewChange: (next: {
    range?: SearchPerformanceDateRange;
    device?: SearchPerformanceDevice;
    country?: string;
    type?: SearchPerformanceType;
    cmp?: CompareMode;
  }) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const panelId = React.useId();
  const summary = [
    t(TYPE_LABELS[searchType]),
    device ? t(DEVICE_LABELS[device]) : t("Tüm cihazlar"),
    country ? formatCountry(country) : t("Tüm ülkeler"),
    pinned ? t("Özel tarih aralığı") : t(RANGE_LABELS[range]),
    t(COMPARE_LABEL[compare]),
  ];
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
      <button
        type="button"
        className="btn btn-sm h-auto min-h-11 justify-start gap-2 py-2 sm:hidden"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <SlidersHorizontal className="size-4 shrink-0" aria-hidden />
        {/* Wraps at the separators rather than cutting a label mid-word. */}
        <span className="min-w-0 flex-1 whitespace-normal text-left font-normal leading-snug">
          <span className="font-medium">{t("Filtreler")}</span>{" "}
          <span className="text-muted">
            {summary.map((part, index) => (
              <React.Fragment key={part}>
                {index > 0 ? " · " : null}
                <span className="whitespace-nowrap">{part}</span>
              </React.Fragment>
            ))}
          </span>
        </span>
        <ChevronDown
          className={`size-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      <div
        id={panelId}
        className={`${open ? "grid" : "hidden"} grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-end sm:gap-3`}
      >
        <label className="flex min-w-0 flex-col gap-1">
          <span className="text-xs text-muted">{t("Arama türü")}</span>
          <select
            className="select select-sm w-full sm:w-40"
            value={searchType}
            onChange={(event) => {
              if (isSearchType(event.target.value)) {
                // Web is the default, so it leaves the URL instead of sitting in it.
                onViewChange({
                  type:
                    event.target.value === "web"
                      ? undefined
                      : event.target.value,
                });
              }
            }}
          >
            {TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {t(option.label)}
              </option>
            ))}
          </select>
        </label>
        <label className="flex min-w-0 flex-col gap-1">
          <span className="text-xs text-muted">{t("Cihaz")}</span>
          <select
            className="select select-sm w-full sm:w-40"
            value={device ?? ALL}
            onChange={(event) =>
              onViewChange({
                device: isDevice(event.target.value)
                  ? event.target.value
                  : undefined,
              })
            }
          >
            <option value={ALL}>{t("Tüm cihazlar")}</option>
            {DEVICE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {t(option.label)}
              </option>
            ))}
          </select>
        </label>
        <label className="flex min-w-0 flex-col gap-1">
          <span className="text-xs text-muted">{t("Ülke")}</span>
          <select
            className="select select-sm w-full sm:w-40"
            value={country ?? ALL}
            onChange={(event) =>
              onViewChange({
                country:
                  event.target.value === ALL ? undefined : event.target.value,
              })
            }
          >
            <option value={ALL}>{t("Tüm ülkeler")}</option>
            {countries.map((row) => (
              <option key={row.key} value={row.key}>
                {formatCountry(row.key)}
              </option>
            ))}
          </select>
        </label>
        <label className="flex min-w-0 flex-col gap-1">
          <span className="text-xs text-muted">{t("Tarih aralığı")}</span>
          <select
            className="select select-sm w-full sm:w-40"
            value={pinned ? "exact" : range}
            onChange={(event) => {
              if (isDateRange(event.target.value)) {
                onViewChange({ range: event.target.value });
              }
            }}
          >
            {pinned ? (
              <option value="exact" disabled>
                {t("Özel tarih aralığı")}
              </option>
            ) : null}
            {RANGE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {t(option.label)}
              </option>
            ))}
          </select>
        </label>
        <label className="flex min-w-0 flex-col gap-1 col-span-2">
          <span className="text-xs text-muted">{t("Karşılaştırma")}</span>
          <select
            className="select select-sm w-full sm:w-40"
            value={compare}
            onChange={(event) => {
              const next = event.target.value;
              if (next === "previous" || next === "yoy" || next === "none") {
                onViewChange({ cmp: next === "previous" ? undefined : next });
              }
            }}
          >
            {(["previous", "yoy", "none"] as const).map((mode) => (
              <option key={mode} value={mode}>
                {t(COMPARE_LABEL[mode])}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
