import { useIsFetching, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAnalyticsQuota } from "./useAnalyticsQuota";
import { PageHeader, PageShell } from "@/client/components/PageShell";
import { PageActions, RefreshButton } from "@/client/components/RefreshButton";
import { QuotaCard } from "@/client/features/quotas/QuotaCard";
import { QueryErrorState } from "@/client/components/QueryErrorState";
import { OrganicTrendPanel } from "@/client/features/analytics/OrganicTrendPanel";
import { ReportView } from "@/client/features/analytics/ReportView";
import { MeasurementHealthPanel } from "@/client/features/analytics/MeasurementHealthPanel";
import { AnalyticsNotConnected } from "@/client/features/analytics/AnalyticsNotConnected";
import { ga4ConnectionOptions } from "@/client/features/integrations/googleConnectionQueries";
import { getGa4Report } from "@/serverFunctions/ga4Reports";
import { getGa4MeasurementHealth } from "@/serverFunctions/ga4MeasurementHealth";
import { type Ga4ReportKindName } from "@/shared/ga4-reports";
import { t } from "@/shared/i18n";
import { formatCount } from "@/shared/format";
import {
  AnalyticsControls,
  AnalyticsBreakdownControls,
  HEALTH,
  type Scope,
  type View,
  type Channel,
  type WindowDays,
  type Breakdown,
  type AcquisitionBreakdown,
} from "./AnalyticsControls";

/** The cached answers the visible Analytics screen is made of. */
const VISIBLE_REPORT_KEYS: readonly string[] = [
  "ga4Report",
  "ga4Overview",
  "ga4MeasurementHealth",
];

/** The one question each tab answers, in plain words, above its content. */
const REPORT_QUESTIONS: Record<Ga4ReportKindName, string> = {
  landing_pages:
    "Ziyaretçiler siteye hangi sayfadan giriyor ve o sayfada kalıp bir sonuca ulaşıyor mu?",
  page_performance:
    "Hangi sayfalar en çok görüntüleniyor ve okurlar orada ne kadar vakit geçiriyor?",
  traffic_acquisition:
    "Ziyaretçiler hangi kanallardan geliyor ve hangi kanal gerçekten sonuç getiriyor?",
  key_events:
    "Sonuç saydığınız olaylar ne sıklıkla gerçekleşiyor ve kaç kişi tetikliyor?",
  ecommerce_performance:
    "Hangi ürünler görüntüleniyor, sepete ekleniyor ve gelir getiriyor? Mülkte e-ticaret ölçümü yoksa bu sekme boş kalır.",
  site_search:
    "Ziyaretçiler hangi konuları aradı? Sonuçları inceleyin; arama sıklığı, eksik içerik kanıtı değildir.",
  audience_breakdown:
    "Ziyaretçileriniz hangi cihazlardan geliyor ve cihaza göre deneyim nasıl değişiyor?",
};

export function AnalyticsPage({
  projectId,
  windowDays,
  onWindowChange,
  scope,
  onScopeChange,
}: {
  projectId: string;
  /** Held in the URL by the route, so a reload or a shared link keeps it. */
  windowDays: WindowDays;
  onWindowChange: (days: WindowDays) => void;
  scope: Scope;
  onScopeChange: (next: Partial<Scope>) => void;
}) {
  const {
    view,
    channel,
    offset,
    limit: rowLimit,
    audience: breakdown,
    acquisition,
  } = scope;
  const setOffset = (next: number) => onScopeChange({ offset: next });
  const setView = (next: View) =>
    onScopeChange({
      view: next,
      offset: 0,
      pageGroup: undefined,
      host: undefined,
      path: undefined,
    });
  const setChannel = (next: Channel) =>
    onScopeChange({ channel: next, offset: 0 });
  const setRowLimit = (next: 50 | 100 | 200) =>
    onScopeChange({ limit: next, offset: 0 });
  const setBreakdown = (next: Breakdown) =>
    onScopeChange({ audience: next, offset: 0 });
  const setAcquisition = (next: AcquisitionBreakdown) =>
    onScopeChange({ acquisition: next, offset: 0 });
  const kind = view === HEALTH ? "landing_pages" : view;
  const effectiveChannel = kind === "site_search" ? "all" : channel;

  // Asked first: with no property there is nothing to filter, tab through or
  // measure, so the whole screen becomes the one connect step.
  const connection = useQuery(ga4ConnectionOptions(projectId));
  const notConnected = connection.data?.connected === false;
  // Observe previously requested inventory without spending Admin calls on render.
  const cachedHealth = useQuery({
    queryKey: ["ga4MeasurementHealth", projectId],
    queryFn: () => getGa4MeasurementHealth({ data: { projectId } }),
    enabled: false,
  });

  const reportQuery = useQuery({
    queryKey: [
      "ga4Report",
      projectId,
      kind,
      effectiveChannel,
      windowDays,
      rowLimit,
      breakdown,
      acquisition,
      offset,
      scope.startDate ?? null,
      scope.endDate ?? null,
      scope.pageGroup ?? null,
    ],
    queryFn: () =>
      getGa4Report({
        data: {
          projectId,
          kind,
          channel: effectiveChannel,
          windowDays,
          limit: rowLimit,
          audienceBreakdown: breakdown,
          acquisitionBreakdown: acquisition,
          offset,
          startDate: scope.startDate,
          endDate: scope.endDate,
          pageGroup: scope.pageGroup,
        },
      }),
    enabled: view !== HEALTH && connection.data?.connected === true,
    retry: 1,
  });
  const result = reportQuery.data;

  const queryClient = useQueryClient();
  useAnalyticsQuota(projectId);
  const isRefreshing =
    useIsFetching({
      predicate: (query) =>
        query.queryKey[1] === projectId &&
        VISIBLE_REPORT_KEYS.includes(String(query.queryKey[0])),
    }) > 0;
  const refreshVisible = async () => {
    await queryClient.refetchQueries({
      type: "active",
      predicate: (query) =>
        query.queryKey[1] === projectId &&
        VISIBLE_REPORT_KEYS.includes(String(query.queryKey[0])),
    });
  };

  if (connection.isError) {
    return (
      <PageShell>
        <PageHeader title="Analytics" />
        <QueryErrorState
          error={connection.error}
          onRetry={() => void connection.refetch()}
          title={t("Bağlantı yükleniyor")}
        />
      </PageShell>
    );
  }
  if (notConnected) {
    return (
      <PageShell>
        <PageHeader
          title="Analytics"
          description={t(
            "Ziyaretçiler siteye hangi sayfadan giriyor, orada ne yapıyor.",
          )}
        />
        <AnalyticsNotConnected projectId={projectId} />
      </PageShell>
    );
  }

  return (
    <PageShell>
      {/* One description for the page. The tab's own question used to sit
          here, and a long one wrapped to a second line, so the tab strip
          below jumped 20px on some tabs. It now opens the tab's panel. */}
      <PageHeader
        title="Analytics"
        description={t(
          "Ziyaretçiler siteye hangi sayfadan giriyor, orada ne yapıyor.",
        )}
        actions={
          <PageActions>
            <RefreshButton
              onRefresh={() => void refreshVisible()}
              isFetching={isRefreshing}
              dataUpdatedAt={
                view === HEALTH
                  ? undefined
                  : reportQuery.dataUpdatedAt || undefined
              }
              shortcut
            />
          </PageActions>
        }
      />

      <AnalyticsControls
        {...{
          view,
          setView,
          kind,
          rowLimit,
          setRowLimit,
          windowDays,
          onWindowChange,
          scope,
          setOffset,
          channel,
          setChannel,
        }}
      />

      <div className="space-y-4">
        <p className="max-w-[75ch] text-sm text-muted">
          {view === HEALTH
            ? t(
                "Bu kontrol yalnızca mülk ayarlarını okur; etiketin veri gönderdiğini doğrulamaz.",
              )
            : t(REPORT_QUESTIONS[kind])}
        </p>
        {/* The report query keeps its last result while the health tab is
            open, so without this branch the two panels stacked and the page
            said "Google Analytics bağlı değil" twice. */}
        {view === HEALTH ? (
          <MeasurementHealthPanel projectId={projectId} />
        ) : (
          <>
            {/* Overview and detail share the selected property, channel and dates. */}
            {
              <OrganicTrendPanel
                projectId={projectId}
                windowDays={windowDays}
                channel={effectiveChannel}
                startDate={scope.startDate}
                endDate={scope.endDate}
                onOpenHealth={() => setView(HEALTH)}
              />
            }
            {reportQuery.isPending ? (
              <div className="space-y-2" aria-busy>
                <div className="skeleton h-10" />
                <div className="skeleton h-64" />
              </div>
            ) : null}

            <AnalyticsBreakdownControls
              {...{
                kind,
                breakdown,
                setBreakdown,
                acquisition,
                setAcquisition,
              }}
            />

            {reportQuery.isError ? (
              <QueryErrorState
                error={reportQuery.error}
                onRetry={() => void reportQuery.refetch()}
                title={t("Rapor alınamadı")}
              />
            ) : null}

            {result?.status === "needs_ga4" ? (
              <AnalyticsNotConnected projectId={projectId} />
            ) : null}

            {result?.status === "ok" ? (
              <ReportView
                key={`${kind}-${effectiveChannel}-${windowDays}-${rowLimit}-${breakdown}-${acquisition}-${offset}-${scope.startDate}-${scope.endDate}-${scope.pageGroup}`}
                kind={kind}
                result={result}
                configurationState={
                  cachedHealth.data?.status === "ok" &&
                  cachedHealth.data.propertyId ===
                    connection.data?.propertyId &&
                  Date.now() - cachedHealth.dataUpdatedAt < 5 * 60 * 1000
                    ? cachedHealth.data.configurationState
                    : "unknown"
                }
                onClearPageGroup={() =>
                  onScopeChange({ pageGroup: undefined, offset: 0 })
                }
                organicOnly={effectiveChannel === "organic_search"}
                exactPage={
                  kind === "landing_pages" && scope.host && scope.path
                    ? { host: scope.host, path: scope.path }
                    : undefined
                }
                onOrganicOnlyChange={(next) =>
                  setChannel(next ? "organic_search" : "all")
                }
                onOpenHealth={() => setView(HEALTH)}
              />
            ) : null}
          </>
        )}
        {view !== HEALTH && result?.status === "ok" ? (
          <nav
            aria-label={t("Rapor sayfaları")}
            className="flex flex-wrap items-center justify-between gap-3"
          >
            <button
              type="button"
              className="btn btn-sm min-h-11"
              disabled={offset === 0 || reportQuery.isFetching}
              onClick={() => setOffset(Math.max(0, offset - rowLimit))}
            >
              {t("Önceki sayfa")}
            </button>
            <span role="status" className="text-xs text-muted">
              {formatCount(offset + (result.rowCount ? 1 : 0))}–
              {formatCount(offset + result.rowCount)} /{" "}
              {formatCount(result.totalRowCount)}
            </span>
            <button
              type="button"
              className="btn btn-sm min-h-11"
              disabled={!result.pageInfo.hasMore || reportQuery.isFetching}
              onClick={() => {
                if (result.pageInfo.nextOffset !== null)
                  setOffset(result.pageInfo.nextOffset);
              }}
            >
              {t("Sonraki sayfa")}
            </button>
          </nav>
        ) : null}
      </div>

      {connection.data?.connected ? (
        <details>
          <summary className="min-h-11 cursor-pointer py-3 text-sm">
            {t("Kota ve sınırlar")}
          </summary>
          <QuotaCard
            projectId={projectId}
            kinds={["ga4"]}
            refreshable={false}
          />
        </details>
      ) : null}
    </PageShell>
  );
}
