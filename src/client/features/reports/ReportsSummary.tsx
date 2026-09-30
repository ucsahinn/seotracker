import { DonutCard, donutSummary } from "@/client/components/DonutChart";
import { MetricRow, MetricTile } from "@/client/components/MetricTile";
import {
  filterCounts,
  kindSegments,
  latestUpdate,
  totalBytes,
} from "@/client/features/reports/reportStats";
import {
  formatBytes,
  formatCount,
  formatDateTime,
  formatRelativeTime,
} from "@/client/lib/format";
import type { ReportListItem } from "@/serverFunctions/reports";

/** Placeholder shaped like the summary while the list loads. */
export function ReportsSummarySkeleton() {
  return (
    <div className="space-y-4" aria-busy>
      <div className="skeleton h-24" />
      <div className="skeleton h-56" />
    </div>
  );
}

/**
 * Numbers and a ring computed from the reports already on screen, so they
 * match the table. The ring filters the list by report type.
 */
export function ReportsSummary({
  reports,
  visibleReports,
  now,
  selectedKind,
  onSelectKind,
}: {
  /** The reports the quick filter keeps; the kind ring splits these. */
  reports: ReportListItem[];
  /** What the table shows (quick filter and kind): the tiles count these. */
  visibleReports: ReportListItem[];
  now: number;
  selectedKind: string | null;
  onSelectKind: (kind: string | null) => void;
}) {
  const counts = filterCounts(visibleReports, now);
  const latest = latestUpdate(visibleReports);
  const segments = kindSegments(reports);

  return (
    <div className="space-y-4">
      <MetricRow>
        <MetricTile label="Rapor" value={formatCount(counts.all)} />
        <MetricTile
          label="Son 7 gün"
          value={formatCount(counts.recent)}
          hint="Bu sürede güncellenen"
        />
        <MetricTile
          label="Son güncelleme"
          value={latest ? formatRelativeTime(latest) : null}
          hint={latest ? formatDateTime(latest) : undefined}
        />
        <MetricTile
          label="Toplam boyut"
          value={formatBytes(totalBytes(visibleReports))}
        />
      </MetricRow>
      <DonutCard
        title="Türe göre raporlar"
        description="Bir türe tıklayarak listeyi o türdeki raporlarla sınırlayın."
        segments={segments}
        totalLabel="rapor"
        summary={donutSummary(segments, "rapor")}
        selectedKey={selectedKind}
        onSelect={onSelectKind}
      />
    </div>
  );
}
