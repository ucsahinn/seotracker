import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { FactStrip } from "@/client/components/FactStrip";
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
  primaryAction,
  links,
}: {
  overview: Overview | undefined;
  loading?: boolean;
  failed?: boolean;
  onRetry: () => void;
  /** The card's one primary button, first in the shared action row. */
  primaryAction?: ReactNode;
  /** Extra quiet links appended to the same row. */
  links?: ReactNode;
}) {
  if (!overview)
    return (
      <div className="space-y-3 text-sm">
        {loading ? (
          <div aria-busy="true" className="space-y-2 py-3">
            <div className="skeleton h-4 w-3/4" />
            <div className="skeleton h-4 w-1/2" />
          </div>
        ) : (
          <p className="text-sm text-muted" role="status">
            {t(
              "Proje verileri okunamadı. Listeyi yenileyerek yeniden deneyin.",
            )}{" "}
            <button
              type="button"
              className="btn btn-ghost btn-sm min-h-11"
              onClick={onRetry}
            >
              {t("Yeniden dene")}
            </button>
          </p>
        )}
        {primaryAction || links ? (
          <ActionRow>
            {primaryAction}
            {links}
          </ActionRow>
        ) : null}
      </div>
    );
  const { clicks, projectId, snapshot } = overview;
  const prior = clicks?.previousClicks;
  const delta =
    clicks && prior !== null && prior !== undefined
      ? clicks.clicks === prior
        ? { text: t("Değişmedi"), improved: false, neutral: true as const }
        : countDelta({
            change: clicks.clicks - prior,
            relative:
              prior < 20 ? null : fractionalChange(clicks.clicks, prior),
          })
      : null;
  const unknown =
    failed ||
    overview.searchConsole === null ||
    overview.analytics === null ||
    overview.archiveStatus === "unavailable" ||
    overview.auditStatus === "unavailable";
  return (
    <div className="space-y-3 text-sm">
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
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-lg font-semibold text-base-content">
            {t("{count} tıklama", { count: formatCount(clicks.clicks) })}
          </span>
          <DeltaBadge value={delta} />
          <span className="w-24">
            <Sparkline values={clicks.daily} />
          </span>
        </div>
      ) : null}
      <p className="flex flex-col text-xs text-muted sm:flex-row sm:flex-wrap sm:gap-x-3">
        <span className="whitespace-nowrap">
          Search Console: {connectionLabel(overview.searchConsole)}
        </span>
        <span className="whitespace-nowrap">
          Analytics: {connectionLabel(overview.analytics)}
        </span>
      </p>
      <FactStrip
        label={t("Proje özeti")}
        facts={[
          {
            label: t("Dönem"),
            value: clicks
              ? formatDate(clicks.startDate) +
                " – " +
                formatDate(clicks.endDate)
              : t("Yok"),
          },
          {
            label: t("Son denetim"),
            value:
              overview.auditStatus !== "available"
                ? t("Okunamadı")
                : snapshot
                  ? formatDateTime(snapshot.startedAt)
                  : t("Yok"),
            hint: snapshot?.stale ? t("Denetim eski") : undefined,
          },
          {
            label: t("Kaynak"),
            value: "Search Console",
            hint: overview.property ? (
              <span className="break-all">{overview.property}</span>
            ) : undefined,
          },
          ...(clicks
            ? [
                {
                  label: t("Karşılaştırma"),
                  value:
                    formatDate(clicks.previousStartDate) +
                    " – " +
                    formatDate(clicks.previousEndDate),
                },
              ]
            : []),
          ...(snapshot
            ? [
                {
                  label: t("Bu sitenin son tamamlanan denetimi"),
                  value: <span className="break-all">{snapshot.siteKey}</span>,
                },
                {
                  label: t("Başlangıç"),
                  value: formatDateTime(snapshot.startedAt),
                },
                ...(snapshot.completedAt
                  ? [
                      {
                        label: t("Tamamlanma"),
                        value: formatDateTime(snapshot.completedAt),
                      },
                    ]
                  : []),
              ]
            : []),
        ]}
        detailsLabel={t("Proje ayrıntıları")}
        details={<ProjectProvenance overview={overview} />}
      />
      <ActionRow>
        {primaryAction}
        <Link
          className={LINK_CLASS}
          to="/p/$projectId/search-performance"
          params={{ projectId }}
        >
          {t("Arama performansı")}
        </Link>
        <Link
          className={LINK_CLASS}
          to="/p/$projectId/audit"
          params={{ projectId }}
          search={snapshot ? { auditId: snapshot.id } : {}}
        >
          {snapshot ? t("Denetimi aç") : t("Site denetimlerini aç")}
        </Link>
        {links}
      </ActionRow>
    </div>
  );
}

/** Quiet text link for a project card's secondary destinations. */
export const LINK_CLASS = "link inline-flex min-h-11 items-center";

/** One action row per card: the primary button, then quiet links. */
function ActionRow({ children }: { children: ReactNode }) {
  return (
    // The provenance strip above already ends on a hairline. On a phone
    // the primary button spans the card and the quiet links fall into an
    // even two-column grid instead of wrapping raggedly after it.
    <div className="grid grid-cols-2 gap-x-4 gap-y-1 pt-1 max-sm:[&>.btn]:col-span-2 max-sm:[&>.btn]:w-full sm:flex sm:flex-wrap sm:items-center">
      {children}
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

function ProjectProvenance({ overview }: { overview: Overview }) {
  const { clicks, snapshot, latestAttempt, projectId } = overview;
  const prior = clicks?.previousClicks;
  return (
    <>
      {clicks ? (
        <>
          <p>{t("Arama arşivi · Web · tüm cihazlar ve ülkeler")}</p>
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
        </>
      ) : overview.archiveStatus === "available" &&
        overview.searchConsole === true ? (
        <p>
          {t(
            "Bu kurulumda henüz arama arşivi yok. Arama performansını açarak veriyi okuyun.",
          )}
        </p>
      ) : null}
      {overview.auditStatus === "available" && !snapshot ? (
        <p>
          {t(
            "Bu site için tamamlanmış denetim yok. Siteyi seçip denetim başlatın.",
          )}
        </p>
      ) : null}
      {snapshot?.stale ? (
        <p>
          {t(
            "Bu denetim en az yedi gün önce başlatıldı. Güncel durum için yeni denetim başlatın.",
          )}
        </p>
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
      <p>{t("Bağlantı kaydı, verinin başarıyla okunduğunu göstermez.")}</p>
    </>
  );
}
