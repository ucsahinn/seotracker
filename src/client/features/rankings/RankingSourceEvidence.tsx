import { t } from "@/shared/i18n";
import { formatCount, formatDate, formatDecimal } from "@/client/lib/format";
import type { getTrackedQueries } from "@/serverFunctions/gscHistory";
import { FactStrip, type Fact } from "@/client/components/FactStrip";
import { AlertTriangle } from "lucide-react";
import type { ReactNode } from "react";

export type RankingArchiveData = Awaited<ReturnType<typeof getTrackedQueries>>;

export function RankingSourceEvidence({
  data,
  notConnected,
  pick,
  archive,
}: {
  data: RankingArchiveData | undefined;
  notConnected: boolean;
  pick: (query: string) => void;
  /** The local archive's span, folded into this one source block. */
  archive?: { facts: Fact[]; details: ReactNode } | null;
}) {
  const comparisonPartial =
    data &&
    (data.coverage.complete < data.days ||
      data.previousCoverage.complete < data.days);
  return (
    <>
      {data && data.totalObserved > 0 ? (
        // Headline, its qualifiers as chips beside it, then the one next
        // step: three loose lines of different sizes and colours read as
        // three separate messages.
        <section aria-live="polite" className="space-y-3">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <p className="text-lg font-semibold">
              {data.comparableCount === 0
                ? t("{count} sorgu gözlendi.", {
                    count: formatCount(data.totalObserved),
                  })
                : t(
                    "Karşılaştırılabilen {count} sorguda {up} yükseldi, {down} geriledi.",
                    {
                      count: formatCount(data.comparableCount),
                      up: formatCount(data.significantUp),
                      down: formatCount(data.significantDown),
                    },
                  )}
            </p>
            {data.comparableCount === 0 ? (
              <span className="rounded-full border border-[var(--hairline)] px-2.5 py-0.5 text-xs text-muted">
                {t("Karşılaştırma yok")}
              </span>
            ) : null}
            {comparisonPartial ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-warning/30 bg-warning/10 px-2.5 py-0.5 text-xs text-[var(--ink-warning)]">
                <AlertTriangle aria-hidden className="size-3 shrink-0" />
                {t(
                  "Tam yanıtlı gün: {current}/{days}; önceki dönem: {previous}/{days}.",
                  {
                    current: formatCount(data.coverage.complete),
                    previous: formatCount(data.previousCoverage.complete),
                    days: formatCount(data.days),
                  },
                )}
              </span>
            ) : null}
          </div>
          {data.fallers[0] ? (
            <button
              className="btn btn-sm h-auto min-h-9 max-w-full whitespace-normal break-words text-left"
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
        </section>
      ) : null}

      {data ? (
        <FactStrip
          label={t("Kaynak")}
          facts={[
            {
              label: t("Kaynak"),
              value: "GSC Web",
              hint: (
                <>
                  {data.siteUrl}
                  <br />
                  {data.timeZone}
                </>
              ),
            },
            {
              label: t("Dönem"),
              value: `${formatDate(data.range.startDate)} – ${formatDate(data.range.endDate)}`,
            },
            ...(archive?.facts ?? []),
            {
              label: t("Karşılaştırma"),
              value: `${formatDate(data.previousRange.startDate)} – ${formatDate(data.previousRange.endDate)}`,
            },
          ]}
          detailsLabel={t("Veri kapsamı ve hesaplama")}
          details={
            <>
              {archive?.details}
              <p>
                {t(
                  "Karşılaştırması bilinmeyen: {count}. Belirgin hareket eşiği: {threshold} sıra.",
                  {
                    count: formatCount(data.unknownCount),
                    threshold: formatDecimal(0.5),
                  },
                )}
              </p>
              {notConnected ? (
                <p className="text-[var(--ink-warning)]">
                  {t(
                    "Bağlantı yok; gösterilen özet kayıtlı tarihsel gözlemlerdir.",
                  )}
                </p>
              ) : null}
              {comparisonPartial ? (
                <p className="text-[var(--ink-warning)]">
                  {t(
                    "Arşiv kapsamı kısmi veya bilinmiyor. Hareketler yalnızca kayıtlı gözlemleri karşılaştırır; sitenin tamamını temsil etmez.",
                  )}
                </p>
              ) : null}
              <p>
                {data.coverageIssues
                  .map((day) => formatDate(day.date))
                  .join(", ")}
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
                {t(
                  "Önceki dönem API yanıtı tamamlanan gün: {complete} / {days}",
                  {
                    complete: formatCount(data.previousCoverage.complete),
                    days: formatCount(data.days),
                  },
                )}
              </p>
              <p>
                {t(
                  "Haftalık çizgilerde uç haftalar kısmi olabilir. Gün sayısı yalnızca sorgunun gözlendiği günleri sayar.",
                )}
              </p>
            </>
          }
        />
      ) : null}
    </>
  );
}
