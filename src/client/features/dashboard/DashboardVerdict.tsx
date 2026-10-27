import type { PanelAction } from "./NextStepsCard";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { dashboardSearchViewQuery } from "./dashboardGscReport";
import { DeltaBadge } from "@/client/components/MetricTile";
import { countDelta } from "@/shared/searchTodoCopy";
import { formatCount, formatDate } from "@/shared/format";
import { t } from "@/shared/i18n";
export function DashboardVerdict({
  projectId,
  connected,
  action,
}: {
  projectId: string;
  connected: boolean;
  action?: PanelAction;
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
  const excluded = Math.max(
    0,
    Math.round((Date.parse(w.freshEndDate) - Date.parse(w.endDate)) / 86400000),
  );
  return (
    <section className="space-y-2" aria-label={t("Arama özeti")}>
      <div className="flex flex-wrap items-baseline gap-2">
        <p className="text-lg font-medium">
          {t(
            "Son {days} günde Google aramalarından {clicks} tıklama aldınız.",
            {
              days: formatCount(w.days),
              clicks: formatCount(view.totals.current.clicks),
            },
          )}
        </p>
        <DeltaBadge value={countDelta(view.totals.vsPrevious?.clicks)} />
        {!view.totals.previous ? (
          <span className="text-sm text-muted">{t("Karşılaştırma yok")}</span>
        ) : null}
      </div>
      {action ? (
        <p className="text-sm">
          {action.title}{" "}
          <Link
            to={action.to}
            params={action.params}
            search={action.search}
            className="link inline-flex min-h-11 items-center px-1"
          >
            {action.cta}
          </Link>
        </p>
      ) : null}
      {query.isError ? (
        <p role="status" className="text-sm text-[var(--ink-warning)]">
          {t("Son yenileme başarısız; önbellekteki veriler gösteriliyor.")}
        </p>
      ) : null}
      <p className="break-words text-sm text-muted">
        Search Console · {view.siteUrl} · {formatDate(w.startDate)} –{" "}
        {formatDate(w.endDate)} · {w.timeZone}
      </p>
      <div className="space-y-1 text-xs text-muted">
        <p>
          {t("Önceki dönem: {start} – {end}.", {
            start: formatDate(w.previous.startDate),
            end: formatDate(w.previous.endDate),
          })}
        </p>
        <p>
          {t("Son veri günü: {date}. Son {count} gün toplamlara dahil değil.", {
            date: w.lastDataDate ? formatDate(w.lastDataDate) : "–",
            count: formatCount(excluded),
          })}
        </p>
      </div>
      <details className="text-xs text-muted">
        <summary className="min-h-11 cursor-pointer py-3 focus-visible:outline-offset-[-2px]">
          {t("Veri hakkında")}
        </summary>
        <div className="space-y-2 pb-3">
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
        </div>
      </details>
    </section>
  );
}
