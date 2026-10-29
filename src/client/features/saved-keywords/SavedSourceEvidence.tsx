import { FactStrip } from "@/client/components/FactStrip";
import type { SavedWatchlist } from "@/server/features/keywords/services/SavedWatchlistService";
import { formatCount, formatDate, formatDecimal } from "@/shared/format";
import { t } from "@/shared/i18n";

export function SavedSourceEvidence({
  data,
  reason,
}: {
  data: SavedWatchlist;
  reason: string;
}) {
  return (
    <FactStrip
      label={t("Kaynak")}
      facts={[
        {
          label: t("Kaynak"),
          value: "Google Web",
          hint: (
            <>
              {data.siteUrl ?? t("Bilinmiyor")}
              <br />
              {t("Google Web · tüm ülkeler ve cihazlar · {zone}", {
                zone: data.timeZone,
              })}
            </>
          ),
        },
        {
          label: t("Dönem"),
          value: `${formatDate(data.range.startDate)} – ${formatDate(data.range.endDate)}`,
        },
        {
          label: t("Karşılaştırma"),
          value: `${formatDate(data.previousRange.startDate)} – ${formatDate(data.previousRange.endDate)}`,
        },
        {
          label: t("Gözlenen gün"),
          value: `${data.archiveError ? t("Bilinmiyor") : formatCount(data.observedDates.length)} / ${formatCount(data.requestedDays)}`,
          hint: data.observedDates.length
            ? `${formatDate(data.observedDates[0])} – ${formatDate(data.observedDates.at(-1)!)}`
            : undefined,
        },
      ]}
      detailsLabel={t("Veri kapsamı ve hesaplama")}
      details={
        <div className="max-w-prose space-y-1.5">
          <p>{reason}</p>
          <p>
            {t("Belirgin hareket ≥{value} sıra", {
              value: formatDecimal(0.5),
            })}
          </p>
          {!data.archiveError ? (
            <>
              <p>
                {data.previousError
                  ? t(
                      "Önceki dönem okunamadı; karşılaştırma için yeniden deneyin.",
                    )
                  : data.comparableCount === 0
                    ? t("Karşılaştırma yok")
                    : t(
                        "Belirgin değişmedi: {stable}; önceki gözlem yok: {previous}; güncel gözlem yok: {current}.",
                        {
                          stable: formatCount(data.stableComparable),
                          previous: formatCount(data.noPrevious),
                          current: formatCount(data.noCurrent),
                        },
                      )}
              </p>
              <p>
                {t(
                  "Sıra gruplarının tabanı: {count} kayıtlı kelime (sıra grubu uygulanmadan önce).",
                  { count: formatCount(data.totalSavedMatching) },
                )}
              </p>
            </>
          ) : null}
          <p>
            {t("Son arşiv aktarımı: {date}", {
              date: data.status?.lastRunAt
                ? formatDate(data.status.lastRunAt)
                : t("Bilinmiyor"),
            })}
          </p>
          <p>
            {t(
              "Tam yanıt: {complete}; sınırlı: {limited}; başarısız: {failed}; doğrulanmamış gün: {unknown}.",
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
              "Önceki dönemde tam yanıt: {complete} / {days}; eşleşen gözlem günü: {observed}.",
              {
                complete: formatCount(data.previousCoverage.complete),
                days: formatCount(data.requestedDays),
                observed: data.previousError
                  ? t("Bilinmiyor")
                  : formatCount(data.previousObservedDates.length),
              },
            )}
          </p>
          <p>
            {t(
              "Konum ve dil kayıt bilgisi olarak korunur. Arşiv tüm ülkeleri ve cihazları kapsar. Türkçe büyük/küçük harf ve birden fazla boşluk eşleştirilir; ham sorgular gösterimle ağırlıklandırılır. Google bazı nadir sorguları döndürmeyebilir.",
            )}
          </p>
          <p>
            {t(
              "Listeyi yenile yalnızca yerel veritabanını okur; Google'dan yeni veri almaz. Tarihler Pasifik takviminde üç günlük gecikme varsayımıyla seçilir; bu, tam arşiv kanıtı değildir.",
            )}
          </p>
          {data.statusError ? (
            <p>
              {t(
                "Arşiv aktarım durumu okunamadı. Son aktarım bilgisi için yeniden deneyin.",
              )}
            </p>
          ) : null}
        </div>
      }
    />
  );
}
