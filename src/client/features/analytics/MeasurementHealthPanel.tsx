import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Activity, Check, X } from "lucide-react";
import { EmptyState } from "@/client/components/EmptyState";
import { MetricRow, MetricTile } from "@/client/components/MetricTile";
import { QueryErrorState } from "@/client/components/QueryErrorState";
import { StatusPill } from "@/client/components/StatusPill";
import { formatCount } from "@/client/lib/format";
import { getGa4MeasurementHealth } from "@/serverFunctions/ga4MeasurementHealth";

/**
 * Whether Analytics is measuring anything, before you read what it measured.
 *
 * This is the question behind almost every "my traffic dropped": a broken tag
 * and a deindexed section look identical from a dashboard, and the fix for
 * one makes the other worse. The Admin API answers it for free -- no
 * reporting quota, no sampling -- and the service has been able to ask since
 * the fork began, reachable only by an agent.
 */

/*
 * Google's own issue codes, turned into a sentence an operator can act on.
 * The code is the contract with the MCP tool; these are for the screen.
 */
const ISSUE_COPY: Record<string, { title: string; fix: string }> = {
  no_web_stream: {
    title: "Web veri akışı yok",
    fix: "Bu mülke bir web veri akışı eklenmeden site trafiği hiç ölçülmez.",
  },
  enhanced_measurement_disabled: {
    title: "Gelişmiş ölçüm kapalı",
    fix: "Kaydırma, dış bağlantı ve dosya indirme gibi olaylar toplanmıyor. Akış ayarlarından açabilirsiniz.",
  },
  site_search_measurement_disabled: {
    title: "Site içi arama ölçülmüyor",
    fix: "Sitenizde arama kutusu varsa, ziyaretçilerin ne aradığını göremezsiniz.",
  },
  no_key_events_configured: {
    title: "Anahtar olay tanımlı değil",
    fix: "Anahtar olay olmadan trafiğin sonuca dönüşüp dönüşmediği ölçülemez; her rapor oturum sayısında kalır.",
  },
};

const MEASUREMENT_TOGGLES = [
  ["scrollsEnabled", "Kaydırma"],
  ["outboundClicksEnabled", "Dış bağlantı"],
  ["siteSearchEnabled", "Site içi arama"],
  ["videoEngagementEnabled", "Video"],
  ["fileDownloadsEnabled", "Dosya indirme"],
  ["formInteractionsEnabled", "Form"],
] as const;

export function MeasurementHealthPanel({ projectId }: { projectId: string }) {
  const query = useQuery({
    queryKey: ["ga4MeasurementHealth", projectId],
    queryFn: () => getGa4MeasurementHealth({ data: { projectId } }),
    retry: false,
  });

  if (query.isPending) {
    return (
      <div className="space-y-4" aria-busy>
        <div className="skeleton h-[104px]" />
        <div className="skeleton h-64" />
      </div>
    );
  }

  if (query.isError) {
    return (
      <QueryErrorState
        error={query.error}
        onRetry={() => void query.refetch()}
        title="Ölçüm durumu okunamadı"
      />
    );
  }

  if (query.data.status === "needs_ga4") {
    return (
      <div className="rounded-box border border-base-300 bg-base-100">
        <EmptyState
          icon={Activity}
          title="Google Analytics bağlı değil"
          description="Bu kontrol GA4 mülkünüzün ayarlarını okur. Proje ayarlarındaki Entegrasyonlar sekmesinden bağlayın."
          action={
            <Link
              to="/p/$projectId/settings/integrations"
              params={{ projectId }}
              className="btn btn-sm"
            >
              Entegrasyonlar
            </Link>
          }
        />
      </div>
    );
  }

  const health = query.data;

  return (
    <div className="space-y-4">
      <MetricRow>
        <MetricTile
          label="Web veri akışı"
          value={formatCount(health.summary.webStreamCount)}
          hint={
            health.summary.dataStreamCount > health.summary.webStreamCount
              ? `${formatCount(health.summary.dataStreamCount)} akışın webi`
              : "Tüm akışlar web"
          }
        />
        <MetricTile
          label="Anahtar olay"
          value={formatCount(health.summary.keyEventCount)}
          hint="Sonuç ölçen olaylar"
        />
        <MetricTile
          label="Özel boyut"
          value={formatCount(health.summary.customDimensionCount)}
          hint={`${formatCount(health.summary.customMetricCount)} özel metrik`}
        />
        <MetricTile
          label="Bulgu"
          value={formatCount(health.summary.issueCount)}
          hint={
            health.summary.issueCount === 0
              ? "Kurulum eksiksiz"
              : "Aşağıda açıklanıyor"
          }
        />
      </MetricRow>

      {/* Nothing wrong is a real answer, and saying it plainly is what makes
          the finding list mean something when it is not empty. */}
      {health.issues.length === 0 ? (
        <div className="flex items-center gap-2 rounded-box border border-base-300 bg-base-100 p-4 text-sm text-muted">
          <Check className="size-4 text-success" />
          Ölçüm kurulumunda eksik bulunamadı.
        </div>
      ) : (
        <ul className="space-y-2">
          {health.issues.map((issue) => {
            const copy = ISSUE_COPY[issue];
            return (
              <li
                key={issue}
                className="rounded-box border border-base-300 bg-base-100 p-4"
              >
                <p className="text-sm font-medium">{copy?.title ?? issue}</p>
                {copy ? (
                  <p className="mt-1 text-sm text-muted">{copy.fix}</p>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}

      {health.webStreams.map((stream) => (
        <section
          key={stream.streamId}
          className="rounded-box border border-base-300 bg-base-100 p-4"
        >
          <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
            <div className="min-w-0">
              <h3 className="truncate text-sm font-medium">
                {stream.displayName}
              </h3>
              <p className="truncate text-xs text-muted">
                {stream.defaultUri ?? "adres yok"}
                {stream.measurementId ? ` · ${stream.measurementId}` : ""}
              </p>
            </div>
            <StatusPill
              tone={
                stream.enhancedMeasurement.streamEnabled ? "success" : "warning"
              }
              label={
                stream.enhancedMeasurement.streamEnabled
                  ? "Gelişmiş ölçüm açık"
                  : "Gelişmiş ölçüm kapalı"
              }
            />
          </div>

          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
            {MEASUREMENT_TOGGLES.map(([key, label]) => {
              const on = stream.enhancedMeasurement[key];
              return (
                <li
                  key={key}
                  className="flex items-center gap-1.5 text-xs text-muted"
                >
                  {/* An icon as well as the colour: success and error sit at
                      nearly the same lightness in both themes. */}
                  {on ? (
                    <Check className="size-3.5 text-success" />
                  ) : (
                    <X className="size-3.5 text-subtle" />
                  )}
                  {label}
                </li>
              );
            })}
          </ul>
        </section>
      ))}

      {health.keyEvents.length > 0 ? (
        <section className="rounded-box border border-base-300 bg-base-100 p-4">
          <h3 className="text-sm font-medium">Anahtar olaylar</h3>
          <ul className="mt-2 flex flex-wrap gap-2">
            {health.keyEvents.map((event) => (
              <li
                key={event.eventName}
                className="rounded-full border border-base-300 px-2.5 py-1 font-mono text-xs text-muted"
              >
                {event.eventName}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
