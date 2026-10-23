import { QueryErrorState } from "@/client/components/QueryErrorState";
import { useQuery } from "@tanstack/react-query";
import {
  MetricRow,
  MetricTile,
  type MetricTileHref,
} from "@/client/components/MetricTile";
import { describeTotals } from "@/client/features/search-performance/totals";
import { dashboardGscReportQuery } from "@/client/features/dashboard/dashboardGscReport";
import { fractionalChange } from "@/shared/delta";
import { DEFAULT_WINDOW_DAYS } from "@/shared/dataFreshness";
import {
  formatCount,
  formatDate,
  formatDecimal,
  formatPercent,
} from "@/client/lib/format";

/* The window itself lives in dashboardGscReport.ts; this is only its label. */
const DASHBOARD_RANGE_LABEL = `Son ${DEFAULT_WINDOW_DAYS} gün`;

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
  const reportQuery = useQuery(dashboardGscReportQuery(projectId, connected));

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
  const noImpressions = shownTotals && !shownTotals.hasImpressions;

  const shown = shownTotals;
  /*
   * A delta needs both a base and a period worth comparing. Without
   * impressions there is no measurement to have moved.
   */
  const delta = (pick: (totals: Totals) => number) =>
    report && shown?.hasImpressions
      ? fractionalChange(pick(report.totals), pick(report.prevTotals))
      : null;
  /*
   * Derived from the range the server resolved, not written out again. The
   * literal "Son 28 gün" appeared three times in this file against a query
   * that named its window once -- so changing the window would have left
   * three labels quietly claiming the old one.
   */
  const period = report
    ? `${formatDate(report.range.startDate)} – ${formatDate(report.range.endDate)}`
    : undefined;

  /*
   * One hint rule for all four tiles. Not connected: the same short line on
   * each, because the banner or "Sıradaki adımlar" above already carries the
   * ask and the tile is itself the link. Connected: the window, or on every tile
   * the plain fact that the window had no impressions.
   */
  const hintFor = (fallback: string | undefined) =>
    !connected
      ? "Bağlanınca görünür"
      : noImpressions
        ? "Bu dönemde gösterim yok"
        : (fallback ?? DASHBOARD_RANGE_LABEL);

  const searchPerformance: MetricTileHref = {
    to: "/p/$projectId/search-performance",
    projectId,
  };

  return (
    <MetricRow>
      <MetricTile
        label="Tıklama"
        href={searchPerformance}
        value={shown?.clicks ?? null}
        animateTo={count(report?.totals.clicks, formatCount)}
        delta={delta((totals) => totals.clicks)}
        hint={hintFor(period)}
      />
      <MetricTile
        label="Gösterim"
        href={searchPerformance}
        value={shown?.impressions ?? null}
        animateTo={count(report?.totals.impressions, formatCount)}
        delta={delta((totals) => totals.impressions)}
        hint={hintFor(period)}
      />
      <MetricTile
        label="Tıklama oranı"
        href={searchPerformance}
        value={shown?.ctr ?? null}
        animateTo={count(report?.totals.ctr, (n) => formatPercent(n))}
        delta={delta((totals) => totals.ctr)}
        hint={hintFor(period)}
      />
      <MetricTile
        label="Ortalama sıra"
        href={{ to: "/p/$projectId/rankings", projectId }}
        value={shown?.position ?? null}
        animateTo={count(report?.totals.position, (n) => formatDecimal(n))}
        delta={delta((totals) => totals.position)}
        // Position 3 is better than position 8, so a fall is the good direction.
        inverted
        hint={
          connected && !noImpressions
            ? `${period ?? DASHBOARD_RANGE_LABEL} · düşük sayı daha iyi: 1, listenin en üstü demek`
            : hintFor(undefined)
        }
      />
    </MetricRow>
  );
}

/** The count-up props, only when there is a number (tiles show "–" otherwise). */
function count(value: number | undefined, format: (n: number) => string) {
  return value === undefined ? undefined : { value, format };
}

type Totals = {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};
