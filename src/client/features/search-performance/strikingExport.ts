import { t } from "@/shared/i18n";
import type { Report } from "./SearchPerformanceColumns";

export function strikingExportTable(report: Report) {
  const stamp = `${report.range.startDate}-to-${report.range.endDate}`;
  return {
    filename: `search-performance-striking-distance-${stamp}.csv`,
    headers: [t("Sorgu"), t("Sayfa"), t("Gösterim"), t("Tıklama"), t("Sıra")],
    rows: report.strikingDistance.map((row) => [
      row.query,
      row.page,
      row.impressions,
      row.clicks,
      row.position,
    ]),
  };
}
