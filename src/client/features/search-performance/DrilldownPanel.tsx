import { t } from "@/shared/i18n";
import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { Area, AreaChart, Tooltip, XAxis } from "recharts";
import { BookmarkPlus, ExternalLink, X } from "lucide-react";
import {
  Chart,
  ChartTooltip,
  CHART_AXIS,
  CHART_SERIES,
} from "@/client/components/Chart";
import { QueryErrorState } from "@/client/components/QueryErrorState";
import { countComparison, MetricTile } from "@/client/components/MetricTile";
import { placesDelta, pointsDelta } from "@/shared/delta";
import { Skeleton } from "@/client/components/Skeleton";
import { getSafeExternalUrl } from "@/client/components/table/url";
import {
  formatCount,
  formatDate,
  formatDay,
  formatDecimal,
  formatPercent,
} from "@/client/lib/format";
import { useReducedMotion } from "@/client/lib/useReducedMotion";
import type { SearchPerformanceViewFilters } from "@/client/features/dashboard/dashboardGscReport";
import {
  drilldownQueryOptions,
  type ResolvedWindow,
} from "@/client/features/search-performance/searchPerformanceQueries";
import { shortPage } from "@/shared/searchTodoCopy";

export type DrillTarget = { dimension: "query" | "page"; key: string };

/**
 * One query's pages, or one page's queries, beside the screen: the key's own
 * totals and daily clicks, and the other side of the pair, each row a step
 * further in. Escape or the close button returns focus where it came from.
 * On a phone it is a bottom sheet sized to its content: full height, a
 * query with one page left most of the screen empty.
 */
export function DrilldownPanel({
  projectId,
  filters,
  window: span,
  target,
  onNavigate,
  onClose,
  onSaveKeyword,
}: {
  projectId: string;
  filters: SearchPerformanceViewFilters;
  window: ResolvedWindow;
  target: DrillTarget;
  onNavigate: (next: DrillTarget) => void;
  onClose: () => void;
  onSaveKeyword: (keyword: string) => void;
}) {
  const reduced = useReducedMotion();
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const titleId = React.useId();
  const query = useQuery(
    drilldownQueryOptions(projectId, filters, span, target),
  );

  React.useEffect(() => {
    const previous = document.activeElement;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, [onClose]);

  const isPage = target.dimension === "page";
  const data = query.data?.connected ? query.data : null;
  const previous = data?.previousTotals ?? null;
  const deltaTitle = data
    ? t("{start} – {end} dönemine göre", {
        start: formatDate(data.previousWindow.startDate),
        end: formatDate(data.previousWindow.endDate),
      })
    : undefined;
  const safeUrl = isPage ? getSafeExternalUrl(target.key) : null;

  return (
    <>
      <button
        type="button"
        aria-label={t("Paneli kapat")}
        tabIndex={-1}
        className="fixed inset-0 z-40 bg-black/30 lg:hidden"
        onClick={onClose}
      />
      <aside
        role="dialog"
        aria-modal="false"
        aria-labelledby={titleId}
        className="enter fixed inset-x-0 bottom-0 z-50 flex max-h-[88dvh] w-full flex-col rounded-t-box border-t border-[var(--hairline)] bg-base-100 shadow-[var(--shadow-float)] sm:inset-x-auto sm:inset-y-0 sm:right-0 sm:max-h-none sm:max-w-md sm:rounded-none sm:border-l sm:border-t-0"
      >
        <header className="flex items-start gap-3 border-b border-[var(--hairline)] px-4 py-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted">
              {isPage ? t("Sayfa") : t("Sorgu")}
            </p>
            <h2
              id={titleId}
              className="font-medium [overflow-wrap:anywhere]"
              title={target.key}
            >
              {isPage ? shortPage(target.key) : target.key}
            </h2>
            <div className="mt-1 flex flex-wrap gap-1">
              {safeUrl ? (
                <a
                  href={safeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-xs gap-1"
                >
                  <ExternalLink className="size-3.5" aria-hidden />
                  {t("Sayfayı aç")}
                </a>
              ) : null}
              {!isPage ? (
                <button
                  type="button"
                  className="btn btn-ghost btn-xs gap-1"
                  onClick={() => onSaveKeyword(target.key)}
                >
                  <BookmarkPlus className="size-3.5" aria-hidden />
                  {t("Kelime olarak kaydet")}
                </button>
              ) : null}
            </div>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="btn btn-ghost btn-sm btn-square"
            aria-label={t("Paneli kapat")}
            onClick={onClose}
          >
            <X className="size-4" aria-hidden />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
          {query.isPending ? (
            <div className="flex flex-col gap-4">
              <Skeleton variant="metric" />
              <Skeleton variant="list" rows={6} />
            </div>
          ) : query.isError ? (
            <QueryErrorState
              compact
              error={query.error}
              onRetry={() => void query.refetch()}
              title={t("Ayrıntı yüklenemedi")}
            />
          ) : !data ? (
            <p className="text-sm text-muted">
              {t("Search Console bağlantısı yok.")}
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="text-xs text-muted">
                {t("{start} – {end}, kesin günler", {
                  start: formatDate(span.startDate),
                  end: formatDate(span.endDate),
                })}
              </p>
              {/* The key's four numbers with their change against the period
                  before, like the screen's own tiles, so a drill-down says
                  whether this query or page is the one that moved. */}
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-box border border-[var(--hairline)] bg-[var(--hairline)] [&>*]:bg-base-100">
                <MetricTile
                  metric="clicks"
                  label={t("Tıklama")}
                  value={formatCount(data.totals.clicks)}
                  delta={
                    previous
                      ? countComparison(data.totals.clicks, previous.clicks)
                      : null
                  }
                  deltaTitle={deltaTitle}
                />
                <MetricTile
                  metric="impressions"
                  label={t("Gösterim")}
                  value={formatCount(data.totals.impressions)}
                  delta={
                    previous
                      ? countComparison(
                          data.totals.impressions,
                          previous.impressions,
                        )
                      : null
                  }
                  deltaTitle={deltaTitle}
                />
                <MetricTile
                  metric="ctr"
                  label={t("Tıklama oranı")}
                  value={
                    data.totals.ctr === null
                      ? null
                      : formatPercent(data.totals.ctr)
                  }
                  delta={pointsDelta(data.totals.ctr, previous?.ctr)}
                  deltaTitle={deltaTitle}
                  trend={data.daily.map((d) => d.ctr)}
                />
                <MetricTile
                  metric="position"
                  label={t("Ortalama sıra")}
                  value={
                    data.totals.position === null
                      ? null
                      : formatDecimal(data.totals.position)
                  }
                  delta={placesDelta(data.totals.position, previous?.position)}
                  deltaTitle={deltaTitle}
                  trend={data.daily.map((d) => d.position)}
                  inverted
                />
              </div>
              {previous === null ? (
                <p className="text-xs text-muted">
                  {t("Önceki dönemle karşılaştırılamadı.")}
                </p>
              ) : null}
              {data.daily.length > 1 ? (
                <figure className="flex flex-col gap-1">
                  <figcaption className="text-xs font-medium text-muted">
                    {t("Günlük tıklama")}
                  </figcaption>
                  <Chart
                    height={110}
                    summary={t("{key} için günlük tıklama, toplam {total}.", {
                      key: target.key,
                      total: formatCount(data.totals.clicks),
                    })}
                  >
                    <AreaChart
                      data={data.daily}
                      margin={{ top: 4, right: 4, bottom: 0, left: 4 }}
                    >
                      <XAxis
                        dataKey="date"
                        {...CHART_AXIS}
                        tickFormatter={formatDay}
                        minTickGap={40}
                      />
                      <Tooltip
                        cursor={{ stroke: "currentColor", strokeOpacity: 0.2 }}
                        content={({ active, label }) => {
                          if (!active || typeof label !== "string") return null;
                          const row = data.daily.find((d) => d.date === label);
                          if (!row) return null;
                          return (
                            <ChartTooltip
                              title={formatDay(label)}
                              rows={[
                                {
                                  label: t("Tıklama"),
                                  value: formatCount(row.clicks),
                                  color: CHART_SERIES.primary,
                                },
                              ]}
                            />
                          );
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="clicks"
                        stroke={CHART_SERIES.primary}
                        strokeWidth={2}
                        fill={CHART_SERIES.primary}
                        fillOpacity={0.08}
                        isAnimationActive={!reduced}
                      />
                    </AreaChart>
                  </Chart>
                </figure>
              ) : null}

              <section>
                <h3 className="mb-1 text-sm font-medium">
                  {isPage
                    ? t("Bu sayfanın sorguları ({count})", {
                        count: data.rows.length,
                      })
                    : t("Bu sorguda görünen sayfalar ({count})", {
                        count: data.rows.length,
                      })}
                </h3>
                {data.rows.length === 0 ? (
                  <p className="text-sm text-muted">
                    {isPage
                      ? t(
                          "Bu sayfa için listelenen sorgu yok; tıklamaları Google'ın gizlediği sorgulardan geliyor olabilir.",
                        )
                      : t("Bu sorgu için sayfa satırı yok.")}
                  </p>
                ) : (
                  <ul className="divide-y divide-[var(--hairline)]">
                    {data.rows.map((row) => (
                      <li key={row.key}>
                        <button
                          type="button"
                          className="flex w-full items-start gap-3 py-2 text-left hover:bg-base-200/50 focus-visible:outline-2 focus-visible:outline-primary"
                          onClick={() =>
                            onNavigate({
                              dimension: isPage ? "query" : "page",
                              key: row.key,
                            })
                          }
                        >
                          <span className="min-w-0 flex-1 text-sm [overflow-wrap:anywhere]">
                            {isPage ? row.key : shortPage(row.key)}
                          </span>
                          <span className="shrink-0 text-right text-xs tabular-nums text-muted">
                            {t("{clicks} tıklama", {
                              clicks: formatCount(row.clicks),
                            })}
                            <br />
                            {t("sıra {position}", {
                              position: formatDecimal(row.position),
                            })}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                {data.truncated ? (
                  <p className="mt-2 text-xs text-muted">
                    {t(
                      "Sorgu-sayfa tablosu satır sınırında kesildi; bazı eşleşmeler eksik olabilir.",
                    )}
                  </p>
                ) : null}
                {isPage ? (
                  <p className="mt-2 text-xs text-subtle">
                    {t(
                      "Sorgu satırlarının toplamı sayfanın toplamından küçük olabilir: gizli sorgular listelenmez.",
                    )}
                  </p>
                ) : null}
              </section>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
