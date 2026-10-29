import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { FactStrip, type Fact } from "@/client/components/FactStrip";
import { dashboardSearchViewQuery } from "./dashboardGscReport";
import { DeltaBadge } from "@/client/components/MetricTile";
import { countDelta } from "@/client/components/MetricTile";
import { formatCount, formatDate } from "@/shared/format";
import { t } from "@/shared/i18n";
import { searchSampleNote } from "../search-performance/searchSample";
export function DashboardVerdict({
  projectId,
  connected,
}: {
  projectId: string;
  connected: boolean;
}) {
  const query = useQuery(dashboardSearchViewQuery(projectId, connected));
  if (!connected || query.data?.connected === false)
    return (
      <p className="text-sm text-muted">
        {t("Arama verisi için Search Console bağlantısını kontrol edin.")}{" "}
        <Link
          to="/p/$projectId/settings/integrations"
          params={{ projectId }}
          className="link"
        >
          {t("Bağla")}
        </Link>
      </p>
    );
  if (query.isPending) return <div className="skeleton h-20" aria-busy />;
  const view = query.data?.connected ? query.data : null;
  if (!view)
    return (
      <p className="text-sm text-muted">
        {t("Arama verisi şu an okunamadı. Yenile ile tekrar deneyin.")}
      </p>
    );
  const w = view.window;
  const sampleNote = searchSampleNote(view, "previous");
  const excludedStart = new Date(Date.parse(w.endDate) + 86400000)
    .toISOString()
    .slice(0, 10);
  const hasExcludedDays = w.freshEndDate > w.endDate;
  const hasProvisionalData =
    w.lastDataDate !== null && w.lastDataDate > w.endDate;
  const facts: Fact[] = [
    {
      label: t("Kaynak"),
      value: "Search Console",
      hint: view.siteUrl,
    },
    {
      label: t("Dönem"),
      value: `${formatDate(w.startDate)} – ${formatDate(w.endDate)}`,
      hint: w.timeZone,
    },
    {
      label: t("Karşılaştırma"),
      value: `${formatDate(w.previous.startDate)} – ${formatDate(w.previous.endDate)}`,
      hint: t("Önceki dönem"),
    },
    {
      label: t("Kesin veri"),
      value: formatDate(w.endDate),
      hint: hasExcludedDays
        ? t("{start} – {end} toplamlara dahil değil.", {
            start: formatDate(excludedStart),
            end: formatDate(w.freshEndDate),
          })
        : undefined,
    },
    hasProvisionalData
      ? {
          label: t("Geçici veri"),
          value: formatDate(w.lastDataDate!),
          hint: t("Google son günleri sonradan düzeltebilir."),
        }
      : {
          label: t("Geçici veri"),
          value: t("Yok"),
        },
  ];
  return (
    <section className="space-y-4" aria-label={t("Arama özeti")}>
      <div className="space-y-2">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <p className="text-xl font-semibold leading-snug text-balance">
            {t(
              "Son {days} günde Google aramalarından {clicks} tıklama aldınız.",
              {
                days: formatCount(w.days),
                clicks: formatCount(view.totals.current.clicks),
              },
            )}
          </p>
          {!sampleNote ? (
            <DeltaBadge value={countDelta(view.totals.vsPrevious?.clicks)} />
          ) : null}
          {!view.totals.previous ? (
            <span className="text-sm text-muted">{t("Karşılaştırma yok")}</span>
          ) : null}
        </div>
        {sampleNote ? (
          <p className="max-w-prose text-sm text-muted">{sampleNote}</p>
        ) : null}
      </div>
      {query.isError ? (
        <p role="status" className="text-sm text-[var(--ink-warning)]">
          {t("Son yenileme başarısız; önbellekteki veriler gösteriliyor.")}
        </p>
      ) : null}
      <FactStrip
        label={t("Search Console veri kapsamı")}
        facts={facts}
        detailsLabel={t("Search Console veri kapsamı")}
        details={
          <>
            {w.incompleteSource === "assumed" ? (
              <p>{t("Google tarih bildirmedi; son günler dışarıda.")}</p>
            ) : null}
            <p>
              {view.coverage.queries.truncated
                ? t(
                    "Sorgu listesi satır sınırında kesildi; tahminler yalnızca alınan sorguları kapsar.",
                  )
                : t(
                    "Google bazı sorguları gizler; sorgu listesi site toplamının tamamı değildir.",
                  )}
            </p>
          </>
        }
      />
    </section>
  );
}
