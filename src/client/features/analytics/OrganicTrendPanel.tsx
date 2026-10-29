import { AnalyticsTotal } from "./AnalyticsTotal";
import { FactStrip } from "@/client/components/FactStrip";
import { DataTruncationNotice } from "./DataTruncationNotice";
import { GA4_HELP } from "@/client/features/analytics/metricHelp";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getGa4DashboardReport } from "@/serverFunctions/ga4";
import { QueryErrorState } from "@/client/components/QueryErrorState";
import {
  formatCount,
  formatDate,
  formatDateTime,
  formatMoney,
  formatDecimal,
  formatPercent,
} from "@/client/lib/format";
import { OrganicTrendChart } from "./OrganicTrendChart";
import { ga4OverviewQuery } from "@/client/features/dashboard/ga4OverviewQuery";
import { MeasurementWarning } from "./MeasurementWarning";
import { t } from "@/shared/i18n";

/** The selected property's daily sessions and period totals, above its detailed report. */
export function OrganicTrendPanel({
  projectId,
  windowDays,
  channel = "organic_search",
  startDate,
  endDate,
  onOpenHealth,
  onMeasurementUnknownChange,
}: {
  projectId: string;
  windowDays: number;
  channel?: "organic_search" | "all";
  startDate?: string;
  endDate?: string;
  onOpenHealth?: () => void;
  onMeasurementUnknownChange?: (unknown: boolean) => void;
}) {
  const defaults = ga4OverviewQuery(projectId, windowDays);
  const query = useQuery(
    channel === "organic_search" && !startDate && !endDate
      ? defaults
      : {
          ...defaults,
          queryKey: [
            "ga4Overview",
            projectId,
            windowDays,
            channel,
            startDate ?? "",
            endDate ?? "",
          ],
          queryFn: () =>
            getGa4DashboardReport({
              data: { projectId, windowDays, channel, startDate, endDate },
            }),
        },
  );

  const measurementUnknown =
    query.isError ||
    (query.data?.connected === true && query.data.totals.sessions === null);
  useEffect(() => {
    onMeasurementUnknownChange?.(measurementUnknown);
  }, [measurementUnknown, onMeasurementUnknownChange]);
  if (query.isPending) return <div className="skeleton h-40" aria-busy />;
  // A failure is said here too: the tables below read other queries, and can
  // succeed while this one fails, which left a silent gap above them.
  if (query.isError && !query.data?.connected)
    return (
      <section className="rounded-box border border-base-300 bg-base-100">
        <QueryErrorState
          compact
          title={t("Google Analytics verileri yüklenemedi.")}
          error={query.error}
          onRetry={() => void query.refetch()}
        />
      </section>
    );
  // Not connected: the tables below say so in their own words.
  if (!query.data?.connected) return null;

  const { totals, prevTotals, trend, previousDateRange } = query.data;
  /* The same sentence the search-performance totals use, so a reader who
     has seen one knows what the other means. */
  const deltaTitle = t("{start} – {end} dönemine göre", {
    start: formatDate(previousDateRange.startDate),
    end: formatDate(previousDateRange.endDate),
  });
  const rows = trend;
  const limited =
    query.data.reportMetadata.hasLimitedData || query.data.warnings.length > 0;
  const unknownTotals = totals.sessions === null || totals.keyEvents === null;

  return (
    <section className="overflow-hidden rounded-box border border-base-300 bg-base-100">
      {query.isError ? (
        <div>
          <QueryErrorState
            compact
            error={query.error}
            onRetry={() => void query.refetch()}
            title={t(
              "Son yenileme başarısız; önbellekteki veriler gösteriliyor.",
            )}
          />
        </div>
      ) : null}
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-base-300 px-4 py-3">
        <div>
          <h2 className="text-base font-semibold">
            {channel === "all" ? t("Tüm trafik") : t("Organik arama motorları")}
          </h2>
          <p className="mt-0.5 text-xs text-muted">
            {t("Seçtiğiniz aralık, gün gün.")}
          </p>
        </div>
        <div className="grid w-full grid-cols-2 gap-4 sm:w-auto sm:grid-cols-4">
          <AnalyticsTotal
            metric="sessions"
            label={t("Oturum")}
            value={totals.sessions}
            previous={limited ? null : prevTotals.sessions}
            deltaTitle={deltaTitle}
            format={formatCount}
          />
          <AnalyticsTotal
            label={t("Etkileşim oranı")}
            help={t(GA4_HELP.engagementRate)}
            value={totals.engagementRate}
            previous={limited ? null : prevTotals.engagementRate}
            deltaTitle={deltaTitle}
            format={(n) => formatPercent(n)}
            rate
          />
          <AnalyticsTotal
            metric="conversions"
            label={t("Anahtar olay")}
            help={t(GA4_HELP.keyEvents)}
            value={totals.keyEvents}
            previous={limited ? null : prevTotals.keyEvents}
            deltaTitle={deltaTitle}
            format={formatCount}
          />
          {/* Zero and unknown revenue remain visible with currency context. */}
          <AnalyticsTotal
            label={t("Gelir")}
            value={totals.purchaseRevenue}
            previous={limited ? null : prevTotals.purchaseRevenue}
            deltaTitle={deltaTitle}
            format={(value) =>
              query.data.currencyCode
                ? formatMoney(value, query.data.currencyCode)
                : t("{value} (para birimi bilinmiyor)", {
                    value: formatDecimal(value),
                  })
            }
          />
        </div>
      </div>

      <div className="space-y-4 px-4 py-4">
        <FactStrip
          label={t("Veri ayrıntıları")}
          facts={[
            { label: t("Kaynak"), value: "Google Analytics" },
            {
              label: t("Dönem"),
              value:
                formatDate(query.data.resolvedDateRange.startDate) +
                " – " +
                formatDate(query.data.resolvedDateRange.endDate),
              hint: query.data.propertyTimeZone ?? t("Saat dilimi bilinmiyor"),
            },
            {
              label: t("Karşılaştırma"),
              value:
                formatDate(previousDateRange.startDate) +
                " – " +
                formatDate(previousDateRange.endDate),
            },
            ...(query.data.fetchedAt
              ? [
                  {
                    label: t("Yenilendi"),
                    value: formatDateTime(query.data.fetchedAt),
                  },
                ]
              : []),
          ]}
          detailsLabel={limited ? t("Uyarı") : t("Veri ayrıntıları")}
          details={
            <div className="max-w-prose space-y-4">
              <p>
                {t(
                  "Mülk kapsamı: tüm ana makineler ve akışlar. Bu toplam yalnızca projenin sitesine ait olmayabilir.",
                )}
              </p>
              {limited ? (
                <p role="status" className="text-[var(--ink-warning)]">
                  {t(
                    "Analytics verisi sınırlı veya eksik. Bilinmeyen değerler çizilmez; dönem karşılaştırması gösterilmez.",
                  )}
                </p>
              ) : null}
              <DataTruncationNotice
                reasons={query.data.reportMetadata.reports.flatMap(
                  (report) => report.dataTruncationReasons ?? [],
                )}
              />
              {query.data.warnings.includes("property_time_zone_changed") ? (
                <p role="status">
                  {t(
                    "Mülkün saat dilimi değişmiş; bağlantı ayarlarını yenileyip tarihleri yeniden kontrol edin.",
                  )}
                </p>
              ) : null}
              {query.data.warnings.includes("end_date_clamped") ? (
                <p role="status">
                  {t(
                    "Bitiş tarihi, mülkün saat diliminde düne çekildi; gösterilen tarihleri kullanın.",
                  )}
                </p>
              ) : null}
            </div>
          }
        />
        {/* The one place the screen explains an unreadable period: the
            empty table below no longer repeats the heading or the retry. */}
        {totals.sessions === null ? (
          <div className="space-y-2">
            <h3 className="text-base font-semibold">
              {t("Bu dönemin trafiği belirlenemedi")}
            </h3>
            <MeasurementWarning
              reports={query.data.reportMetadata.reports}
              unknown
              onRetry={() => void query.refetch()}
              onOpenHealth={onOpenHealth}
            />
          </div>
        ) : (
          <>
            <MeasurementWarning
              reports={query.data.reportMetadata.reports}
              unknown={unknownTotals}
              onRetry={() => void query.refetch()}
              onOpenHealth={onOpenHealth}
            />
            <SessionsTrend rows={rows} />
          </>
        )}
        {/* Both disclosures sit together after the content, one hairline
            above them, instead of two loose rows 60px apart. */}
        <div className="border-t border-[var(--hairline)] pt-1">
          <details>
            <summary className="min-h-11 cursor-pointer py-3 text-sm">
              {t("Analytics verisini yorumlama")}
            </summary>
            <p className="mb-2 text-sm">
              {totals.sessions === null || totals.keyEvents === null
                ? t(
                    "Trafik veya sonuç ölçümü okunamadı; dönüşüm yorumu yapılamıyor.",
                  )
                : t(
                    "Bu dönemde {sessions} oturum ve {events} anahtar olay kaydedildi.",
                    {
                      sessions: formatCount(totals.sessions),
                      events: formatCount(totals.keyEvents),
                    },
                  )}
            </p>
            {totals.sessions !== null &&
            totals.sessions > 0 &&
            totals.sessions < 30 ? (
              <p className="mb-2 max-w-prose text-sm text-muted">
                {t(
                  "Az sayıda oturumda tek bir ziyaret bile oranları belirgin değiştirir. Yüzde değişimini tek başına başarı veya kayıp saymayın.",
                )}
              </p>
            ) : null}
            {totals.keyEvents === 0 ? (
              <p className="mb-2 max-w-prose text-sm text-muted">
                {t(
                  "Anahtar olay kaydedilmedi. Form gönderme gibi hedefler tanımlı değilse bu sayı sıfır kalır; ölçüm durumunu kontrol edin.",
                )}
              </p>
            ) : null}
            <p className="mb-2 text-xs text-muted">{deltaTitle}</p>
            <p className="text-xs text-muted">
              {t(
                "Google arama tıklamaları ile organik oturumlar farklı ölçümlerdir; Analytics diğer arama motorlarını da kapsar.",
              )}
            </p>
            <p className="mt-2 text-xs text-muted">
              {t(
                "Son günler yeniden işlenebilir; dün, tamamlanmış bir takvim günüdür, kesinleşmiş veri garantisi değildir.",
              )}
            </p>
            <p className="mt-2 text-xs text-muted">
              {t(
                "Satış ölçümü doğrulanmadı; sıfır satış, mağaza olmadığı anlamına gelmez.",
              )}
            </p>
            {!limited &&
            query.data.diagnostics.some(
              (d) => d.code === "key_events_sharp_decline",
            ) ? (
              <p className="mt-2 text-sm text-[var(--ink-warning)]">
                {t(
                  "Anahtar olaylar önceki döneme göre en az yarıya düştü. Bu bir gözlemdir; nedenini belirlemek için olayları ve ölçüm ayarlarını inceleyin.",
                )}
              </p>
            ) : null}
            {onOpenHealth ? (
              <button
                type="button"
                className="btn btn-ghost btn-sm mt-2 min-h-11 sm:min-h-0"
                onClick={onOpenHealth}
              >
                {t("Ölçüm durumu")}
              </button>
            ) : null}
          </details>
          <DailyValues rows={rows} />
        </div>
      </div>
    </section>
  );
}

/** The trend as a table, for reading exact days. */
function DailyValues({
  rows,
}: {
  rows: { date: string; sessions: number | null }[];
}) {
  return (
    <details>
      <summary className="min-h-11 cursor-pointer py-3 text-sm">
        {t("Günlük değerler")}
      </summary>
      <table className="table table-sm max-w-sm">
        <caption className="text-left text-xs text-muted">
          {t(
            "Son günler yeniden işlenebilir; dün, tamamlanmış bir takvim günüdür, kesinleşmiş veri garantisi değildir.",
          )}
        </caption>
        <thead>
          <tr>
            <th>{t("Tarih")}</th>
            <th className="text-right">{t("Oturum")}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.date}>
              <td>{formatDate(row.date)}</td>
              <td className="text-right tabular-nums">
                {row.sessions === null ? (
                  <span className="text-subtle" title={t("Bilinmiyor")}>
                    <span aria-hidden>–</span>
                    <span className="sr-only">{t("Bilinmiyor")}</span>
                  </span>
                ) : (
                  formatCount(row.sessions)
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </details>
  );
}

/** The daily line, or the one sentence that replaces a line with nothing on it. */
function SessionsTrend({
  rows,
}: {
  rows: { date: string; sessions: number | null }[];
}) {
  if (!rows.some((row) => row.sessions !== null))
    return (
      <p className="text-sm text-muted">
        {t("Gösterilecek oturum verisi yok.")}
      </p>
    );
  // A flat line at zero is 180px saying one word; say the word instead.
  // Only when every day is a measured zero: a gap is not a zero.
  if (rows.every((row) => row.sessions === 0))
    return (
      <p className="text-sm text-muted">
        {t("Bu dönemde hiç oturum kaydedilmedi.")}
      </p>
    );
  return <OrganicTrendChart rows={rows} />;
}
