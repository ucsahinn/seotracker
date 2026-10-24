import { t } from "@/shared/i18n";
import { DonutCard, donutSummary } from "@/client/components/DonutChart";
import {
  deviceSegments,
  isDevice,
} from "@/client/features/search-performance/deviceShare";
import type { SearchPerformanceDevice } from "@/types/schemas/search-performance";

/**
 * Clicks split by device. Clicking a segment sets the same `device` URL
 * filter as the dropdown, so the whole screen narrows to it.
 */
export function DeviceBreakdown({
  devices,
  selected,
  onSelect,
}: {
  devices: { key: string; clicks: number }[];
  selected?: SearchPerformanceDevice;
  onSelect: (device: SearchPerformanceDevice | undefined) => void;
}) {
  const segments = deviceSegments(devices);
  if (segments.length === 0) return null;

  return (
    <DonutCard
      title={t("Cihazlar")}
      description={t(
        "Tıklamaların hangi cihazlardan geldiği. Bir cihaza tıklayarak tüm sayfayı o cihaza göre daraltabilirsiniz.",
      )}
      totalLabel={t("tıklama")}
      height={144}
      segments={segments}
      summary={donutSummary(segments, t("tıklama"))}
      selectedKey={selected ?? null}
      onSelect={(key) =>
        onSelect(key !== null && isDevice(key) ? key : undefined)
      }
    />
  );
}
