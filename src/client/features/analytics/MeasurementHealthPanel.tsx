import { FactStrip } from "@/client/components/FactStrip";
import { useQuery } from "@tanstack/react-query";
import { Check, X } from "lucide-react";
import { AnalyticsNotConnected } from "@/client/features/analytics/AnalyticsNotConnected";
import { MetricRow, MetricTile } from "@/client/components/MetricTile";
import { QueryErrorState } from "@/client/components/QueryErrorState";
import { HelpTip } from "@/client/components/HelpTip";
import { StatusPill } from "@/client/components/StatusPill";
import { formatCount, formatDateTime } from "@/client/lib/format";
import { getGa4MeasurementHealth } from "@/serverFunctions/ga4MeasurementHealth";
import { t } from "@/shared/i18n";

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
 * All the copy maps below hold Turkish source strings, translated by t()
 * where they render.
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
  inventory_incomplete: {
    title: "Envanter eksik olabilir",
    fix: 'Google bu mülkün listesini eksik verdi. Sayımlara ve "eksik yok" sonucuna tam güvenmeyin.',
  },
};

const MEASUREMENT_TOGGLES = [
  ["scrollsEnabled", "Kaydırma"],
  ["outboundClicksEnabled", "Dış bağlantı"],
  ["siteSearchEnabled", "Site içi arama"],
  ["videoEngagementEnabled", "Video"],
  ["fileDownloadsEnabled", "Dosya indirme"],
  ["formInteractionsEnabled", "Form"],
  ["pageChangesEnabled", "Sayfa geçişleri"],
] as const;

/*
 * How GA4 counts a key event. The choice changes every conversion number on
 * the other tabs: once per event inflates a form that fires twice, once per
 * session hides a second purchase.
 */
const COUNTING_METHOD_COPY: Record<string, string> = {
  ONCE_PER_EVENT: "Her tetiklemede sayılır",
  ONCE_PER_SESSION: "Oturumda bir kez sayılır",
};

const STREAM_TYPE_COPY: Record<string, string> = {
  ANDROID_APP_DATA_STREAM: "Android uygulaması",
  IOS_APP_DATA_STREAM: "iOS uygulaması",
};

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
        title={t("Ölçüm durumu okunamadı")}
      />
    );
  }

  if (query.data.status === "needs_ga4") {
    return <AnalyticsNotConnected projectId={projectId} />;
  }

  const health = query.data;
  const count = (value: number, list: string) =>
    health.incompleteLists?.includes(list)
      ? t("En az {count}", { count: formatCount(value) })
      : formatCount(value);

  return (
    <div className="space-y-4">
      <FactStrip
        label={t("Ölçüm durumu")}
        facts={[
          {
            label: t("Kaynak"),
            value: "Google Analytics",
            hint: health.propertyDisplayName ?? health.propertyId,
          },
          {
            label: t("Yenilendi"),
            value: formatDateTime(health.fetchedAt ?? query.dataUpdatedAt),
          },
        ]}
        detailsLabel={t("Veri ayrıntıları")}
        details={
          <p>
            {t(
              "Bu kontrol yalnızca mülk ayarlarını okur; etiketin veri gönderdiğini doğrulamaz.",
            )}
          </p>
        }
      />
      <a
        className="btn btn-sm min-h-11 h-auto rounded-full py-2 text-left"
        href="https://developers.google.com/analytics/devguides/collection/ga4/troubleshoot"
        target="_blank"
        rel="noopener noreferrer"
      >
        {t("Etiket veri toplamayı doğrulama adımları")}
      </a>
      <MetricRow>
        <MetricTile
          label={t("Web veri akışı")}
          value={count(health.summary.webStreamCount, "data_streams")}
          hint={
            health.summary.dataStreamCount > health.summary.webStreamCount
              ? t("{count} akıştan web olanlar", {
                  count: count(health.summary.dataStreamCount, "data_streams"),
                })
              : health.incompleteLists?.includes("data_streams")
                ? t("Envanter eksik olabilir")
                : health.summary.webStreamCount === 0
                  ? t("Web akışı yok")
                  : health.incompleteLists?.includes("data_streams")
                    ? t("Envanter eksik olabilir")
                    : t("Tüm akışlar web")
          }
        />
        <MetricTile
          label={t("Anahtar olay")}
          value={count(health.summary.keyEventCount, "key_events")}
          hint={
            <HelpTip label={t("Veri ayrıntıları")}>
              {t(
                "Tanımlanmış olay sayısıdır; bu dönemde tetiklenen olay sayısı veya veri toplama kanıtı değildir.",
              )}
            </HelpTip>
          }
        />
        <MetricTile
          label={t("Özel boyut")}
          value={count(
            health.summary.customDimensionCount,
            "custom_dimensions",
          )}
          hint={t("{count} özel metrik", {
            count: count(health.summary.customMetricCount, "custom_metrics"),
          })}
        />
        <MetricTile
          label={t("Bulgu")}
          value={formatCount(health.summary.issueCount)}
          animateTo={{ value: health.summary.issueCount, format: formatCount }}
          hint={
            health.summary.issueCount === 0
              ? t("Kontrol edilen ayarlarda eksik bulunmadı")
              : t("Aşağıda açıklanıyor")
          }
        />
      </MetricRow>

      {/* Nothing wrong is a real answer, and saying it plainly is what makes
          the finding list mean something when it is not empty. */}
      {health.issues.length === 0 ? (
        <div className="flex items-center gap-2 rounded-box border border-base-300 bg-base-100 p-4 text-sm text-muted">
          <Check className="size-4 text-[var(--ink-success)]" />
          {t("Kontrol edilen ayarlarda eksik bulunmadı")}
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
                <p className="text-sm font-medium">
                  {copy ? t(copy.title) : issue}
                </p>
                {copy ? (
                  <details className="max-w-prose text-sm text-muted">
                    <summary className="min-h-11 cursor-pointer py-3">
                      {t("Ayrıntılar")}
                    </summary>
                    <p>{t(copy.fix)}</p>
                  </details>
                ) : null}
                <a
                  href={
                    "https://analytics.google.com/analytics/web/#/p" +
                    encodeURIComponent(
                      health.propertyId.replace(/^properties\//, ""),
                    ) +
                    "/admin"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm mt-3 min-h-11 rounded-full"
                  aria-label={t(
                    "GA4 yönetiminde akış ve anahtar olay ayarlarını aç",
                  )}
                >
                  {t("Aç")}
                </a>
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
              <h3 className="break-words text-base font-semibold">
                {stream.displayName}
              </h3>
              <p className="break-all text-sm text-muted">
                {stream.defaultUri ?? t("adres yok")}
                {stream.measurementId ? ` · ${stream.measurementId}` : ""}
              </p>
            </div>
            <StatusPill
              tone={
                stream.enhancedMeasurement.streamEnabled ? "success" : "warning"
              }
              label={
                stream.enhancedMeasurement.streamEnabled
                  ? t("Gelişmiş ölçüm açık")
                  : t("Gelişmiş ölçüm kapalı")
              }
            />
          </div>

          <p className="mt-3 text-xs text-muted">
            {t("{on} / {count} otomatik olay açık", {
              on: formatCount(
                MEASUREMENT_TOGGLES.filter(
                  ([key]) =>
                    stream.enhancedMeasurement.streamEnabled &&
                    stream.enhancedMeasurement[key],
                ).length,
              ),
              count: formatCount(MEASUREMENT_TOGGLES.length),
            })}
            <HelpTip label={t("Gelişmiş ölçüm")}>
              {t(
                "Gelişmiş ölçüm; kaydırma, dış bağlantı tıklaması ve dosya indirme gibi olayları koda dokunmadan toplar. Kapalı olanlar raporlarda hiç görünmez.",
              )}
            </HelpTip>
          </p>
          <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {MEASUREMENT_TOGGLES.map(([key, label]) => {
              const on =
                stream.enhancedMeasurement.streamEnabled &&
                stream.enhancedMeasurement[key];
              return (
                <li
                  key={key}
                  className="flex items-center gap-1.5 text-xs text-muted"
                >
                  {/* An icon as well as the colour: success and error sit at
                      nearly the same lightness in both themes. */}
                  {on ? (
                    <Check
                      aria-hidden
                      className="size-3.5 text-[var(--ink-success)]"
                    />
                  ) : (
                    <X aria-hidden className="size-3.5 text-subtle" />
                  )}
                  {/*
                   * Lucide emits a bare <svg> with no role and no name, so
                   * without this a screen reader heard six feature names and
                   * no states at all -- the panel read as a list rather than
                   * as three on and three off.
                   */}
                  <span className="sr-only">
                    {on ? t("açık:") : t("kapalı:")}{" "}
                  </span>
                  {t(label)}
                </li>
              );
            })}
          </ul>
        </section>
      ))}

      {health.otherStreams.length > 0 ? (
        <section className="rounded-box border border-base-300 bg-base-100 p-4">
          <h3 className="text-sm font-medium">{t("Uygulama veri akışları")}</h3>
          <p className="mt-0.5 text-xs text-muted">
            {t(
              "Bu mülke bağlı, web dışındaki akışlar. Buradaki raporlar yalnızca web trafiğini kapsamaz; uygulama verisi de toplamlara karışır.",
            )}
          </p>
          <ul className="mt-2 space-y-1">
            {health.otherStreams.map((stream) => (
              <li
                key={stream.streamId}
                className="flex items-baseline justify-between gap-3 text-sm"
              >
                <span className="truncate">{stream.displayName}</span>
                <span className="shrink-0 text-xs text-muted">
                  {STREAM_TYPE_COPY[stream.type]
                    ? t(STREAM_TYPE_COPY[stream.type])
                    : stream.type}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {health.keyEvents.length > 0 ? (
        <section className="rounded-box border border-base-300 bg-base-100 p-4">
          <h3 className="flex items-center gap-1.5 text-sm font-medium">
            {t("Anahtar olaylar")}
            <HelpTip label={t("Sayım yöntemi")}>
              {t(
                "Sayım yöntemi, aynı oturumda tekrarlanan bir olayın kaç kez sayılacağını belirler. Dönüşüm rakamlarını karşılaştırırken bu ayara bakın.",
              )}
            </HelpTip>
          </h3>
          <ul className="mt-2 divide-y divide-base-300">
            {health.keyEvents.map((event) => (
              <li
                key={event.eventName}
                className="flex flex-wrap items-baseline justify-between gap-x-3 py-1.5"
              >
                <span className="font-mono text-xs">{event.eventName}</span>
                <span className="text-xs text-muted">
                  {COUNTING_METHOD_COPY[event.countingMethod]
                    ? t(COUNTING_METHOD_COPY[event.countingMethod])
                    : event.countingMethod}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
