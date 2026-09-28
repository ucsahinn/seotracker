import { QueryErrorState } from "@/client/components/QueryErrorState";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { MetricRow, MetricTile } from "@/client/components/MetricTile";
import { describeTotals } from "@/client/features/search-performance/totals";
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

  /*
   * A connected property whose report call fails suppressed the "connect
   * Search Console" hint - correctly, it is connected - and then rendered
   * four bare em-dashes with nothing to click, indistinguishable from a
   * property that simply has no data.
   */
  if (connected && reportQuery.isError) {
    return (
      <QueryErrorState
        compact
        error={reportQuery.error}
        onRetry={() => void reportQuery.refetch()}
        title="Search Console verisi alınamadı"
      />
    );
  }

  const shownTotals = report ? describeTotals(report.totals) : null;

  /*
   * Connected-but-empty is a third state, and it had no copy.
   *
   * A property Google has no data for renders 0 / 0 / -- / -- with nothing
   * saying why and nothing to click: the most prominent block on the
   * dashboard, dead. "Not connected" and "has data" were both handled; this
   * one was left looking like a broken integration. The likeliest causes
   * are a newly verified property and Search Console's two-to-three day
   * lag, and both are worth naming.
   */
  const hint = !connected ? (
    <Link
      to="/p/$projectId/search-performance"
      params={{ projectId }}
      className="link link-hover text-primary"
    >
      Search Console'u bağlayın
    </Link>
  ) : shownTotals && !shownTotals.hasImpressions ? (
    <Link
      to="/p/$projectId/search-performance"
      params={{ projectId }}
      className="link link-hover text-muted"
    >
      Bu dönemde gösterim yok — ayrıntılar
    </Link>
  ) : (
    <Link
      to="/p/$projectId/search-performance"
      params={{ projectId }}
      className="link link-hover text-muted"
    >
      Son 28 gün
    </Link>
  );

  const shown = shownTotals;
  /*
   * A delta needs both a base and a period worth comparing. Without
   * impressions there is no measurement to have moved.
   */
  const delta = (pick: (totals: Totals) => number) =>
    report && shown?.hasImpressions
      ? ratio(pick(report.totals), pick(report.prevTotals))
      : null;
  /*
   * Every tile carries the window, and the first one carries the way in.
   * Until now nothing on this row was clickable once connected, so the four
   * numbers the dashboard exists to show led nowhere.
   */
  const period = report ? "Son 28 gün" : undefined;

  return (
    <MetricRow>
      <MetricTile
        label="Tıklama"
        value={shown?.clicks ?? null}
        delta={delta((totals) => totals.clicks)}
        hint={hint}
      />
      <MetricTile
        label="Gösterim"
        value={shown?.impressions ?? null}
        delta={delta((totals) => totals.impressions)}
        hint={period}
      />
      <MetricTile
        label="Tıklama oranı"
        value={shown?.ctr ?? null}
        delta={delta((totals) => totals.ctr)}
        hint={period}
      />
      <MetricTile
        label="Ortalama sıra"
        value={shown?.position ?? null}
        delta={delta((totals) => totals.position)}
        // Position 3 is better than position 8, so a fall is the good direction.
        inverted
        hint={period}
      />
    </MetricRow>
  );
}

type Totals = {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

/** Fractional change against the previous period; null when there is no base. */
function ratio(current: number, previous: number): number | null {
  if (!previous) return null;
  return (current - previous) / previous;
}
