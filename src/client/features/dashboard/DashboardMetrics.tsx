import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { MetricRow, MetricTile } from "@/client/components/MetricTile";
import { formatCount, formatDecimal, formatPercent } from "@/client/lib/format";
import { getSearchPerformanceReport } from "@/serverFunctions/searchPerformance";

/**
 * The four numbers the dashboard exists to show, across the top of the page.
 *
 * They used to live inside a half-width card below a setup checklist, which
 * put the reason for opening the app in third place. When Search Console is
 * not connected the row still renders, with dashes and one line saying what
 * to do: an empty shape that explains itself beats a screen that hides the
 * feature until it works.
 */
export function DashboardMetrics({
  projectId,
  connected,
}: {
  projectId: string;
  connected: boolean;
}) {
  const reportQuery = useQuery({
    queryKey: ["dashboardGscReport", projectId],
    queryFn: () =>
      getSearchPerformanceReport({
        data: { projectId, dateRange: "last_28_days" },
      }),
    enabled: connected,
  });

  const report = reportQuery.data?.connected ? reportQuery.data : null;

  if (connected && reportQuery.isPending) {
    return (
      <MetricRow>
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="px-5 py-4">
            <div className="skeleton h-3 w-20" />
            <div className="skeleton mt-2.5 h-7 w-24" />
          </div>
        ))}
      </MetricRow>
    );
  }

  const hint = connected ? undefined : (
    <Link
      to="/p/$projectId/search-performance"
      params={{ projectId }}
      className="link link-hover text-primary"
    >
      Search Console'u bağlayın
    </Link>
  );

  return (
    <MetricRow>
      <MetricTile
        label="Tıklama"
        value={report ? formatCount(report.totals.clicks) : null}
        delta={
          report ? ratio(report.totals.clicks, report.prevTotals.clicks) : null
        }
        hint={hint}
      />
      <MetricTile
        label="Gösterim"
        value={report ? formatCount(report.totals.impressions) : null}
        delta={
          report
            ? ratio(report.totals.impressions, report.prevTotals.impressions)
            : null
        }
        hint={report ? "Son 28 gün" : undefined}
      />
      <MetricTile
        label="Tıklama oranı"
        value={report ? formatPercent(report.totals.ctr) : null}
        delta={report ? ratio(report.totals.ctr, report.prevTotals.ctr) : null}
        hint={report ? "Son 28 gün" : undefined}
      />
      <MetricTile
        label="Ortalama sıra"
        value={report ? formatDecimal(report.totals.position) : null}
        delta={
          report
            ? ratio(report.totals.position, report.prevTotals.position)
            : null
        }
        // Position 3 is better than position 8, so a fall is the good direction.
        inverted
        hint={report ? "Son 28 gün" : undefined}
      />
    </MetricRow>
  );
}

/** Fractional change against the previous period; null when there is no base. */
function ratio(current: number, previous: number): number | null {
  if (!previous) return null;
  return (current - previous) / previous;
}
