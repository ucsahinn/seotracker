import { Link } from "@tanstack/react-router";
import { DonutCard, donutSummary } from "@/client/components/DonutChart";
import { Reveal } from "@/client/components/Reveal";
import { MetricRow, MetricTile } from "@/client/components/MetricTile";
import {
  filterCounts,
  kindSegments,
  latestUpdate,
} from "@/client/features/reports/reportStats";
import {
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
  projectId,
  reports,
  visibleReports,
  now,
  selectedKind,
  onSelectKind,
}: {
  projectId: string;
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
    <Reveal className="space-y-4">
      <MetricRow>
        <MetricTile
          label="Rapor"
          value={formatCount(counts.all)}
          animateTo={{ value: counts.all, format: formatCount }}
        />
        <MetricTile
          label="Son 7 gün"
          value={formatCount(counts.recent)}
          animateTo={{ value: counts.recent, format: formatCount }}
          hint="Bu sürede güncellenen"
        />
        <MetricTile
          label="Son güncelleme"
          value={latest ? formatRelativeTime(latest.updatedAt) : null}
          flashKey={latest?.updatedAt ?? null}
          hint={
            latest ? (
              <Link
                to="/p/$projectId/reports/$reportId"
                params={{ projectId, reportId: latest.id }}
                className="link link-hover"
              >
                {formatDateTime(latest.updatedAt)} · raporu aç
              </Link>
            ) : undefined
          }
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
    </Reveal>
  );
}
