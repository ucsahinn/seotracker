import { t } from "@/shared/i18n";
import {
  GSC_DEVICES,
  type SearchPerformanceDevice,
} from "@/types/schemas/search-performance";

export const DEVICE_LABELS: Record<SearchPerformanceDevice, string> = {
  MOBILE: "Mobil",
  DESKTOP: "Bilgisayar",
  TABLET: "Tablet",
};

/**
 * Any source's device name in the UI language. Search Console says "MOBILE", GA4
 * "mobile", PageSpeed "mobile"; all three read "Mobil" on screen. Unknown
 * names pass through.
 */
export function deviceLabel(value: string): string {
  const upper = value.toUpperCase();
  if (upper === "SMART TV") return t("Akıllı TV");
  return isDevice(upper) ? t(DEVICE_LABELS[upper]) : value;
}

export function isDevice(value: string): value is SearchPerformanceDevice {
  return GSC_DEVICES.some((option) => option === value);
}
