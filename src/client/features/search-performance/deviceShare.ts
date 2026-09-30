import { sort } from "remeda";
import {
  GSC_DEVICES,
  type SearchPerformanceDevice,
} from "@/types/schemas/search-performance";

export const DEVICE_LABELS: Record<SearchPerformanceDevice, string> = {
  MOBILE: "Mobil",
  DESKTOP: "Bilgisayar",
  TABLET: "Tablet",
};

export function isDevice(value: string): value is SearchPerformanceDevice {
  return GSC_DEVICES.some((option) => option === value);
}

type DeviceRow = { key: string; clicks: number };

/**
 * One segment per device GSC reported with clicks, biggest first. Keys GSC
 * might add later are dropped rather than shown under a raw code, since the
 * device filter could not select them either.
 */
export function deviceSegments(
  rows: DeviceRow[],
): { key: SearchPerformanceDevice; label: string; value: number }[] {
  const segments: {
    key: SearchPerformanceDevice;
    label: string;
    value: number;
  }[] = [];
  for (const row of rows) {
    if (isDevice(row.key) && row.clicks > 0) {
      segments.push({
        key: row.key,
        label: DEVICE_LABELS[row.key],
        value: row.clicks,
      });
    }
  }
  return sort(segments, (a, b) => b.value - a.value);
}
