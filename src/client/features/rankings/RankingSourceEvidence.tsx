import { t } from "@/shared/i18n";
import { formatCount, formatDate, formatDecimal } from "@/client/lib/format";
import type { getTrackedQueries } from "@/serverFunctions/gscHistory";

export type RankingArchiveData = Awaited<ReturnType<typeof getTrackedQueries>>;

export function RankingSourceEvidence({
  data,
  notConnected,
  pick,
}: {
  data: RankingArchiveData | undefined;
  notConnected: boolean;
  pick: (query: string) => void;
}) {
  const comparisonPartial =
    data &&
    (data.coverage.complete < data.days ||
      data.previousCoverage.complete < data.days);
  return (
    <>
      {data && data.totalObserved > 0 ? (
        <section aria-live="polite" className="space-y-2">
          <p className="text-lg font-semibold">
            {data.comparableCount === 0
              ? t("Karşılaştırma yok")
              : t(
                  "Karşılaştırılabilen {count} sorguda {up} yükseldi, {down} geriledi.",
                  {
                    count: formatCount(data.comparableCount),
                    up: formatCount(data.significantUp),
                    down: formatCount(data.significantDown),
                  },
                )}
          </p>
          {data.fallers[0] ? (
            <button
              className="link link-primary min-h-11 text-left"
              onClick={() => pick(data.fallers[0].query)}
            >
              {t("Önce {query} sorgusunu inceleyin.", {
                query: data.fallers[0].query,
              })}
            </button>
          ) : data.comparableCount > 0 ? (
            <p className="text-sm text-muted">
              {t("Karşılaştırılabilen sorgularda belirgin düşüş yok.")}
            </p>
          ) : null}
          <p className="text-xs text-muted">
            {t(
              "Karşılaştırması bilinmeyen: {count}. Belirgin hareket eşiği: {threshold} sıra.",
              {
                count: formatCount(data.unknownCount),
                threshold: formatDecimal(0.5),
              },
            )}
          </p>
          {notConnected ? (
            <p className="text-sm text-[var(--ink-warning)]">
              {t(
                "Bağlantı yok; gösterilen özet kayıtlı tarihsel gözlemlerdir.",
              )}
            </p>
          ) : null}
          {comparisonPartial ? (
            <p className="text-sm text-[var(--ink-warning)]">
              {t(
                "Arşiv kapsamı kısmi veya bilinmiyor. Hareketler yalnızca kayıtlı gözlemleri karşılaştırır; sitenin tamamını temsil etmez.",
              )}
            </p>
          ) : null}
        </section>
      ) : null}

      {data ? (
        <details className="rounded-box border border-base-300 p-3 text-xs text-muted">
          <summary className="min-h-11 cursor-pointer">
            {data.siteUrl} · GSC Web · {formatDate(data.range.startDate)} –{" "}
            {formatDate(data.range.endDate)} · {data.timeZone}
          </summary>
          <p>
            {data.coverageIssues.map((day) => formatDate(day.date)).join(", ")}
          </p>
          <p>
            {t("Önceki dönem")}: {formatDate(data.previousRange.startDate)} –{" "}
            {formatDate(data.previousRange.endDate)}
          </p>
          <p>
            {t(
              "Tarih sonu üç günlük gecikme varsayımıdır; canlı tamlık doğrulaması değildir. Google gizli sorguları ve bazı üst sınır dışı satırları döndürmez.",
            )}
          </p>
          <p>
            {t(
              "API yanıtı tamamlanan / sınırlı / başarısız / bilinmeyen gün: {complete} / {limited} / {failed} / {unknown}",
              {
                complete: formatCount(data.coverage.complete),
                limited: formatCount(data.coverage.limited),
                failed: formatCount(data.coverage.failed),
                unknown: formatCount(data.coverage.unknown),
              },
            )}
          </p>
          <p>
            {t("Önceki dönem API yanıtı tamamlanan gün: {complete} / {days}", {
              complete: formatCount(data.previousCoverage.complete),
              days: formatCount(data.days),
            })}
          </p>
          <p>
            {t(
              "Haftalık çizgilerde uç haftalar kısmi olabilir. Gün sayısı yalnızca sorgunun gözlendiği günleri sayar.",
            )}
          </p>
        </details>
      ) : null}
    </>
  );
}
