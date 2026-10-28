import { SavedSummaryCard } from "./SavedSummaryCard";
import { Link } from "@tanstack/react-router";
import type { SavedWatchlist } from "@/server/features/keywords/services/SavedWatchlistService";
import type { SavedBand } from "@/shared/savedWatchlist";
import {
  formatCount,
  formatDecimal,
  formatDate,
  formatPercent,
} from "@/shared/format";
import { t } from "@/shared/i18n";
export function SavedKeywordsSummary({
  projectId,
  data,
  filter,
  stale,
  onRetry,
  onFilter,
  onFallers,
}: {
  projectId: string;
  data: SavedWatchlist;
  filter?: SavedBand;
  stale: boolean;
  onRetry: () => void;
  onFilter: (filter: SavedBand | undefined) => void;
  onFallers: () => void;
}) {
  if (data.totalSavedMatching === 0) return null;
  const partial = hasPartialArchive(data);
  const archiveStale =
    !!data.status?.lastDate && data.status.lastDate < data.range.endDate;
  const reason = archiveReason(data, partial, archiveStale);
  const bands = [
    { id: "top3", label: t("Sıra 1–3") },
    { id: "top10", label: t("Sıra 4–10") },
    { id: "top20", label: t("Sıra 11–20") },
    { id: "beyond", label: t("Sıra 21+") },
    { id: "none", label: t("Sıra bilinmiyor") },
  ] as const;
  return (
    <section
      className="space-y-4"
      aria-label={t("Kayıtlı kelimelerin arşiv özeti")}
    >
      <div className="space-y-2 text-sm">
        <p className="font-medium">
          {data.archiveError
            ? t(
                "Kelimeler kayıtlı; sıra karşılaştırması şu anda kullanılamıyor.",
              )
            : t(
                "Kaydettiğiniz {saved} kelimenin {observed} tanesi bu aralıkta arşivde gözlendi.",
                {
                  saved: formatCount(data.totalSavedMatching),
                  observed: formatCount(data.totalObservedMatching),
                },
              )}
        </p>
        <p className="text-muted">
          {t("Google Web · tüm ülkeler ve cihazlar · {zone}", {
            zone: data.timeZone,
          })}
          <br />
          {t("Dönem: {start} – {end}", {
            start: formatDate(data.range.startDate),
            end: formatDate(data.range.endDate),
          })}
          <br />
          {t("Önceki dönem: {start} – {end}", {
            start: formatDate(data.previousRange.startDate),
            end: formatDate(data.previousRange.endDate),
          })}
        </p>
        <p className="text-muted">
          {t("Eşleşen kelimelerde gözlenen gün: {observed} / {requested}", {
            observed: data.archiveError
              ? t("Bilinmiyor")
              : formatCount(data.observedDates.length),
            requested: formatCount(data.requestedDays),
          })}
          {data.observedDates.length
            ? " · " +
              formatDate(data.observedDates[0]) +
              " – " +
              formatDate(data.observedDates.at(-1)!)
            : ""}
        </p>
        {stale ? (
          <p role="status" className="text-[var(--ink-warning)]">
            {t(
              "Son doğrulanmış yanıt gösteriliyor; liste yenilenirken işlem yapmayın.",
            )}
          </p>
        ) : null}
        <p className="text-muted">{reason}</p>
        <div className="flex flex-wrap gap-2">
          {data.archiveError || data.connectionError || data.statusError ? (
            <button className="btn btn-outline min-h-11" onClick={onRetry}>
              {t("Tekrar dene")}
            </button>
          ) : !data.siteUrl ? (
            <Link
              to="/p/$projectId/settings/integrations"
              params={{ projectId }}
              className="btn btn-outline min-h-11"
            >
              {t("Search Console'u bağla")}
            </Link>
          ) : partial || archiveStale || !data.status?.lastRunAt ? (
            <Link
              to="/p/$projectId/rankings"
              params={{ projectId }}
              className="btn btn-outline min-h-11"
            >
              {t("Sıralama takibi'nde arşivi güncelle")}
            </Link>
          ) : data.downSignificant > 0 ? (
            <button className="btn btn-outline min-h-11" onClick={onFallers}>
              {t("Gerileyenleri incele")}
            </button>
          ) : null}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <SavedSummaryCard
          label={t("Kayıtlı kelimeler")}
          value={formatCount(data.totalSavedMatching)}
          numericValue={data.totalSavedMatching}
          note={t("Metin ve etiket filtresine uyan kayıtlar")}
          onClick={() => onFilter(undefined)}
        />
        <SavedSummaryCard
          label={t("Gözlenen kelimeler")}
          numericValue={
            data.archiveError ? undefined : data.totalObservedMatching
          }
          value={
            data.archiveError ? "—" : formatCount(data.totalObservedMatching)
          }
          note={t("{count} kayıtlı kelime içinde", {
            count: formatCount(data.totalSavedMatching),
          })}
          onClick={() => onFilter("observed")}
          disabled={data.archiveError}
        />
        <SavedSummaryCard
          label={t("Belirgin hareket ≥{value} sıra", {
            value: formatDecimal(0.5),
          })}
          value={
            data.archiveError ||
            data.previousError ||
            data.comparableCount === 0
              ? t("Karşılaştırma yok")
              : t("↑ {up} · ↓ {down}", {
                  up: formatCount(data.upSignificant),
                  down: formatCount(data.downSignificant),
                })
          }
          note={t("Karşılaştırılabilen: {comparable} / {total}", {
            comparable: formatCount(data.comparableCount),
            total: formatCount(data.totalSavedMatching),
          })}
          onClick={onFallers}
          disabled={
            data.archiveError ||
            data.previousError ||
            data.comparableCount === 0 ||
            data.downSignificant === 0
          }
        />
        <SavedSummaryCard
          label={t("Sıra bilinmiyor")}
          numericValue={data.archiveError ? undefined : data.noCurrent}
          value={data.archiveError ? "—" : formatCount(data.noCurrent)}
          note={
            data.noCurrent === 0
              ? t("Tüm kayıtlı kelimeler bu dönemde gözlendi.")
              : partial
                ? t("Eksik arşiv nedeniyle gözlem yokluğu doğrulanamaz")
                : t("Okunan arşivde eşleşen gözlem yok")
          }
          onClick={() => onFilter("none")}
          disabled={data.archiveError || data.noCurrent === 0}
        />
      </div>
      {!data.archiveError ? (
        <>
          <p className="text-xs text-muted">
            {data.previousError
              ? t("Önceki dönem okunamadı; karşılaştırma için yeniden deneyin.")
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
          <p className="text-xs text-muted">
            {t(
              "Sıra gruplarının tabanı: {count} kayıtlı kelime (sıra grubu uygulanmadan önce).",
              { count: data.totalSavedMatching },
            )}
          </p>
          <div
            className="grid gap-2 sm:grid-cols-5"
            aria-label={t(
              "Sıra grupları; metin ve etiket filtresi sonrası tüm kayıtlar",
            )}
          >
            {bands.map((band) => (
              <button
                key={band.id}
                className="min-h-20 rounded-field border border-[var(--control-border)] p-3 text-left focus-visible:outline-2 focus-visible:outline-primary"
                aria-pressed={filter === band.id}
                onClick={() =>
                  onFilter(filter === band.id ? undefined : band.id)
                }
              >
                <span className="block text-xs text-muted">
                  {band.label}
                  {filter === band.id ? " ✓" : ""}
                </span>
                <strong>{formatCount(data.bands[band.id])}</strong>
                <span className="ml-2 text-xs text-muted">
                  {formatPercent(data.bands[band.id] / data.totalSavedMatching)}
                </span>
                <span
                  className="mt-2 block h-1.5 rounded-full bg-base-300"
                  aria-hidden
                >
                  <span
                    className={
                      band.id === "none"
                        ? "block h-full rounded-full"
                        : "block h-full rounded-full bg-[var(--data-position)]"
                    }
                    style={{
                      backgroundImage:
                        band.id === "none"
                          ? "repeating-linear-gradient(135deg, var(--color-base-content) 0, var(--color-base-content) 2px, transparent 2px, transparent 4px)"
                          : undefined,
                      width: formatBar(
                        data.bands[band.id],
                        data.totalSavedMatching,
                      ),
                    }}
                  />
                </span>
              </button>
            ))}
          </div>
        </>
      ) : null}
      <details className="rounded-box border border-base-300 p-3 text-xs text-muted">
        <summary className="cursor-pointer">
          {t("Veri kapsamı ve hesaplama")}
        </summary>
        <div className="mt-3 space-y-2">
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
      </details>
    </section>
  );
}
function formatBar(n: number, total: number) {
  return String((n / total) * 100) + "%";
}

function hasPartialArchive(data: SavedWatchlist) {
  return (
    data.coverage.complete < data.requestedDays ||
    !!(
      data.status?.incompleteFrom &&
      data.status.incompleteThrough &&
      data.status.incompleteFrom <= data.range.endDate &&
      data.status.incompleteThrough >= data.range.startDate
    )
  );
}

function archiveReason(
  data: SavedWatchlist,
  partial: boolean,
  archiveStale: boolean,
) {
  if (data.statusError)
    return t(
      "Arşiv aktarım durumu okunamadı. Son aktarım bilgisi için yeniden deneyin.",
    );
  return data.archiveError
    ? t(
        "Sıra arşivi okunamadı. Liste kayıtlı; sıra bilgisi için yeniden deneyin.",
      )
    : data.connectionError
      ? t(
          "Search Console bağlantısı okunamadı. Bağlantıyı denetleyin veya yeniden deneyin.",
        )
      : !data.siteUrl
        ? t(
            "Kelimeleriniz kayıtlı. Güncel sıra verisi için Search Console bağlantısı gerekiyor.",
          )
        : !data.status?.lastRunAt
          ? t(
              "Search Console bağlı; bu aralık henüz arşive alınmadı. Sıralama takibi'nden arşivi güncelleyin.",
            )
          : data.status?.lastError
            ? t(
                "Son arşiv aktarımı tamamlanamadı. Sıralamalar ekranında hatayı inceleyip yeniden deneyin.",
              )
            : partial
              ? t(
                  "Arşiv bu tarihlerin tümünü doğrulamıyor. Eksik veya sınırlı günler için Sıralama takibi'nden arşivi güncelleyin.",
                )
              : archiveStale
                ? t(
                    "Arşiv seçilen dönemin sonuna ulaşmadı. Sıralama takibi'nden arşivi güncelleyin.",
                  )
                : data.totalObservedMatching === 0
                  ? t(
                      "Bu tarihlerde okunan arşivde eşleşen sorgu yok. Bu, Google'da görünmediğiniz anlamına gelmez.",
                    )
                  : t(
                      "Sıralar, kaydedilen nihai Google yanıtlarından hesaplanan ortalamalardır; bugünkü sabit sıranız değildir.",
                    );
}
