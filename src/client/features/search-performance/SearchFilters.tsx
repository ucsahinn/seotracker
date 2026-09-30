import { formatCountry } from "@/client/lib/format";
import {
  GSC_DEVICES,
  SEARCH_PERFORMANCE_RANGES,
  type SearchPerformanceDateRange,
  type SearchPerformanceDevice,
} from "@/types/schemas/search-performance";

const RANGE_LABELS: Record<SearchPerformanceDateRange, string> = {
  last_7_days: "Son 7 gün",
  last_28_days: "Son 28 gün",
  last_3_months: "Son 3 ay",
};
const RANGE_OPTIONS = SEARCH_PERFORMANCE_RANGES.map((value) => ({
  value,
  label: RANGE_LABELS[value],
}));

const DEVICE_LABELS: Record<SearchPerformanceDevice, string> = {
  DESKTOP: "Masaüstü",
  MOBILE: "Mobil",
  TABLET: "Tablet",
};
const DEVICE_OPTIONS = GSC_DEVICES.map((value) => ({
  value,
  label: DEVICE_LABELS[value],
}));

// Sentinel for "no filter" in the selects; never sent to the server.
const ALL = "ALL";

function isDateRange(value: string): value is SearchPerformanceDateRange {
  return SEARCH_PERFORMANCE_RANGES.some((option) => option === value);
}

function isDevice(value: string): value is SearchPerformanceDevice {
  return GSC_DEVICES.some((option) => option === value);
}

/** The device, country and date-range selects beside the tabs. */
export function SearchFilters({
  range,
  device,
  country,
  countries,
  onViewChange,
}: {
  range: SearchPerformanceDateRange;
  device?: SearchPerformanceDevice;
  country?: string;
  countries: { key: string }[];
  onViewChange: (next: {
    range?: SearchPerformanceDateRange;
    device?: SearchPerformanceDevice;
    country?: string;
  }) => void;
}) {
  return (
    <>
      <select
        className="select select-bordered select-sm w-36"
        value={device ?? ALL}
        onChange={(event) =>
          onViewChange({
            device: isDevice(event.target.value)
              ? event.target.value
              : undefined,
          })
        }
        aria-label="Cihaz filtresi"
      >
        <option value={ALL}>Tüm cihazlar</option>
        {DEVICE_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <select
        className="select select-bordered select-sm w-36"
        value={country ?? ALL}
        onChange={(event) =>
          onViewChange({
            country:
              event.target.value === ALL ? undefined : event.target.value,
          })
        }
        aria-label="Ülke filtresi"
      >
        <option value={ALL}>Tüm ülkeler</option>
        {countries.map((row) => (
          <option key={row.key} value={row.key}>
            {formatCountry(row.key)}
          </option>
        ))}
      </select>
      <select
        className="select select-bordered select-sm w-36"
        value={range}
        onChange={(event) => {
          if (isDateRange(event.target.value)) {
            onViewChange({ range: event.target.value });
          }
        }}
        aria-label="Tarih aralığı"
      >
        {RANGE_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
}
