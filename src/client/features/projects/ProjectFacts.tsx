import { Link } from "@tanstack/react-router";
import { DeltaBadge } from "@/client/components/MetricTile";
import { Sparkline } from "@/client/components/Sparkline";
import { formatCount, formatDate, formatDateTime } from "@/client/lib/format";
import { fractionalChange } from "@/shared/delta";
import { countDelta } from "@/shared/searchTodoCopy";
import { t } from "@/shared/i18n";
import type { getProjectsOverview } from "@/serverFunctions/projects";

type Overview = Awaited<ReturnType<typeof getProjectsOverview>>[number];

export function ProjectFacts({
  overview,
  loading,
  failed,
  onRetry,
}: {
  overview: Overview | undefined;
  loading?: boolean;
  failed?: boolean;
  onRetry: () => void;
}) {
  if (!overview)
    return loading ? (
      <div aria-busy="true" className="space-y-2 py-3">
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-4 w-1/2" />
      </div>
    ) : (
      <p className="text-sm text-muted" role="status">
        {t("Proje verileri okunamadı. Listeyi yenileyerek yeniden deneyin.")}{" "}
        <button
          type="button"
          className="btn btn-ghost btn-sm min-h-11"
          onClick={onRetry}
        >
          {t("Yeniden dene")}
        </button>
      </p>
    );
  const { clicks, projectId, snapshot, latestAttempt } = overview;
  const prior = clicks?.previousClicks;
  const delta =
    clicks && prior !== null && prior !== undefined
      ? clicks.clicks === prior
        ? { text: t("Değişmedi"), improved: false, neutral: true as const }
        : countDelta({
            change: clicks.clicks - prior,
            relative: fractionalChange(clicks.clicks, prior),
          })
      : null;
  const unknown =
    failed ||
    overview.searchConsole === null ||
    overview.analytics === null ||
    overview.archiveStatus === "unavailable" ||
    overview.auditStatus === "unavailable";
  return (
    <div className="space-y-3 text-xs text-muted">
      {unknown ? (
        <p role="status">
          {t("Bazı kaynaklar okunamadı; gösterilen diğer bilgiler korunuyor.")}{" "}
          <button
            type="button"
            className="btn btn-ghost btn-sm min-h-11"
            onClick={onRetry}
          >
            {t("Yeniden dene")}
          </button>
        </p>
      ) : null}
      {clicks ? (
        <div className="space-y-1">
          <p>{t("Arama arşivi · Web · tüm cihazlar ve ülkeler")}</p>
          {overview.property ? (
            <p className="break-all">{overview.property}</p>
          ) : null}
          <p>
            {formatDate(clicks.startDate)} – {formatDate(clicks.endDate)}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-lg font-semibold text-base-content">
              {t("{count} tıklama", { count: clicks.clicks })}
            </span>
            <DeltaBadge value={delta} />
            <span className="w-24">
              <Sparkline values={clicks.daily} />
            </span>
          </div>
          <p>
            {t(
              "{observed}/{total} gün kayıtlı; toplam yalnızca kayıtlı günleri içerir.",
              {
                observed: formatCount(clicks.observedDays),
                total: formatCount(clicks.windowDays),
              },
            )}
          </p>
          {clicks.observedDays === clicks.windowDays && clicks.clicks === 0 ? (
            <p>{t("Kayıtlı günlerde ölçülen tıklama sayısı sıfır.")}</p>
          ) : null}
          <p>
            {t(
              "Önceki dönem: {start} – {end} · {observed}/{total} gün kayıtlı",
              {
                start: formatDate(clicks.previousStartDate),
                end: formatDate(clicks.previousEndDate),
                observed: formatCount(clicks.previousObservedDays),
                total: formatCount(clicks.windowDays),
              },
            )}
          </p>
          {prior !== null ? (
            <p>
              {t("{previous} → {current} tıklama", {
                previous: formatCount(prior ?? 0),
                current: formatCount(clicks.clicks),
              })}
            </p>
          ) : (
            <p>
              {t(
                "İki dönemin de tüm günleri kayıtlı olmadığı için değişim hesaplanmadı.",
              )}
            </p>
          )}
          <details>
            <summary className="cursor-pointer focus-visible:outline-2 focus-visible:outline-primary">
              {t("Arşiv kaynağı")}
            </summary>
            <p>
              {t("Son kayıtlı gün: {date}", {
                date: formatDate(clicks.endDate),
              })}
            </p>
            {clicks.fetchedAt ? (
              <p>
                {t("Son arşiv okuması: {date}", {
                  date: formatDateTime(clicks.fetchedAt),
                })}
              </p>
            ) : null}
            <p>{t("Kesinleşme kaynağı arşivde kayıtlı değil")}</p>
          </details>
        </div>
      ) : overview.archiveStatus === "available" &&
        overview.searchConsole === true ? (
        <p>
          {t(
            "Bu kurulumda henüz arama arşivi yok. Arama performansını açarak veriyi okuyun.",
          )}
        </p>
      ) : null}
      <Link
        className="link inline-flex min-h-11 items-center"
        to="/p/$projectId/search-performance"
        params={{ projectId }}
      >
        {t("Arama performansı")}
      </Link>
      <div className="space-y-1">
        {overview.auditStatus === "available" ? (
          snapshot ? (
            <>
              <p>
                {t("Son tamamlanan bu-site denetimi")}:{" "}
                <span className="break-all">{snapshot.siteKey}</span>
              </p>
              <p>
                {t("Başlangıç: {date}", {
                  date: formatDateTime(snapshot.startedAt),
                })}
              </p>
              {snapshot.completedAt ? (
                <p>
                  {t("Tamamlanma: {date}", {
                    date: formatDateTime(snapshot.completedAt),
                  })}
                </p>
              ) : null}
              {snapshot.stale ? (
                <p>
                  {t(
                    "Bu denetim en az yedi gün önce başlatıldı. Güncel durum için yeni denetim başlatın.",
                  )}
                </p>
              ) : null}
              <Link
                className="link inline-flex min-h-11 items-center break-all"
                to="/p/$projectId/audit"
                params={{ projectId }}
                search={{ auditId: snapshot.id }}
              >
                {t("Denetimi aç")}
              </Link>
            </>
          ) : (
            <p>
              {t(
                "Bu site için tamamlanmış denetim yok. Siteyi seçip denetim başlatın.",
              )}
            </p>
          )
        ) : null}
        {latestAttempt && latestAttempt.id !== snapshot?.id ? (
          <p>
            {latestAttempt.status === "failed"
              ? t("Son deneme başarısız")
              : latestAttempt.status === "running"
                ? t("Son denetim sürüyor")
                : t("Son deneme tamamlanmadı")}
            :{" "}
            <Link
              className="link break-all"
              to="/p/$projectId/audit"
              params={{ projectId }}
              search={{ auditId: latestAttempt.id }}
            >
              {formatDateTime(latestAttempt.startedAt)}
            </Link>
          </p>
        ) : null}
      </div>
      <p>
        Search Console: {connectionLabel(overview.searchConsole)} · Analytics:{" "}
        {connectionLabel(overview.analytics)}
      </p>
      <p>{t("Bağlantı kaydı, verinin başarıyla okunduğunu göstermez.")}</p>
    </div>
  );
}
function connectionLabel(value: boolean | null) {
  return value === null
    ? t("Okunamadı")
    : value
      ? t("Bağlantı kayıtlı")
      : t("Bağlı değil");
}
