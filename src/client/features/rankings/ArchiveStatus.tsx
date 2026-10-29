import { t } from "@/shared/i18n";
/**
 * What the local archive holds and whether it is still filling.
 *
 * Split out of `RankingsPage` when that file crossed its line ceiling. It is
 * the one part of that screen that describes the *archive* rather than the
 * queries in it -- which is also why it sits above the table with its own
 * dates: the table's window and the archive's span are different things.
 */
import { AlertCircle } from "lucide-react";
import { formatDate, formatDateTime, formatNumber } from "@/client/lib/format";
import { QueryErrorState } from "@/client/components/QueryErrorState";
import { Link } from "@tanstack/react-router";
import { FactStrip } from "@/client/components/FactStrip";

export function ArchiveStatus({
  sync,
  projectId,
}: {
  projectId: string;
  sync: {
    isLoading: boolean;
    // `data.error` is a sync outcome the service reports; `isError` is the
    // call itself failing. The component used to be handed only the first.
    isError: boolean;
    error: unknown;
    refetch: () => unknown;
    data?: {
      earliestDate: string | null;
      lastDate: string | null;
      /** How far the sweep has looked, data or not. */
      scannedThrough: string | null;
      lastRunAt?: string | null;
      rowCount: number;
      newDays: number;
      hasMore: boolean;
      notConnected: boolean;
      error: string | null;
      errorCode?: "auth" | "quota" | "network" | "unknown" | null;
    };
  };
}) {
  if (sync.isLoading) {
    // Match the loaded archive's fact strip rather than a single text line.
    return <div className="skeleton h-24 w-full rounded-box" aria-busy />;
  }

  // An unexpected server error used to render nothing at all, leaving the
  // table below with no explanation for why it was empty.
  if (sync.isError) {
    return (
      <QueryErrorState
        compact
        error={sync.error}
        onRetry={() => void sync.refetch()}
        title={t("Arşiv durumu okunamadı")}
      />
    );
  }

  const data = sync.data;
  if (!data) return null;
  const lastChecked = data.lastRunAt
    ? t("Son kontrol: {date}", { date: formatDateTime(data.lastRunAt) })
    : null;

  // Setup being unfinished is not a sync failure, so it gets a plain
  // instruction rather than a warning alert.
  if (data.notConnected) {
    return (
      <details className="max-w-prose text-sm text-muted">
        <summary className="min-h-11 cursor-pointer">{t("Ayrıntılar")}</summary>
        <p>
          {t(
            "Sıralama arşivi Search Console verisinden doldurulur. Bağladığınızda geçmiş günler kendiliğinden birikmeye başlar.",
          )}
        </p>
      </details>
    );
  }

  if (data.error) {
    return (
      <div className="space-y-4 text-sm">
        <p className="flex items-center gap-2 text-[var(--ink-warning)]">
          <AlertCircle className="size-4 shrink-0" aria-hidden />
          {t("Arşiv durumu okunamadı")}
        </p>
        <details className="max-w-prose text-muted">
          <summary className="min-h-11 cursor-pointer">
            {t("Ayrıntılar")}
          </summary>
          <p>
            {t("Arşiv güncellenemedi: {error}", { error: data.error })}{" "}
            {t(
              "Kayıtlı geçmiş korunur. Bağlantıyı ve kotayı kontrol edin, sonra yeniden deneyin.",
            )}
            {data.errorCode === "quota"
              ? t("Google kotası doldu. Kota yenilendiğinde yeniden deneyin.")
              : data.errorCode === "network"
                ? t(
                    "Ağ bağlantısı kurulamadı. İnternet bağlantınızı kontrol edip yeniden deneyin.",
                  )
                : null}
            {data.lastDate ? ` ${formatDate(data.lastDate)}` : ""}
            {lastChecked ? ` ${lastChecked}` : ""}
          </p>
        </details>
        {data.errorCode === "auth" ? (
          <Link
            className="btn btn-outline min-h-11"
            to="/p/$projectId/settings/integrations"
            params={{ projectId }}
          >
            {t("Search Console'u bağla")}
          </Link>
        ) : (
          <button
            className="btn btn-outline min-h-11"
            onClick={() => void sync.refetch()}
          >
            {t("Yeniden dene")}
          </button>
        )}
      </div>
    );
  }

  if (data.rowCount === 0) {
    /*
     * The state that used to render nothing at all -- no span, no progress,
     * no reason -- directly above a table promising the archive was filling.
     * `scannedThrough` is how far the sweep has looked; without it there was
     * no way to tell "still working through the back catalogue" from
     * "Google has nothing for this property".
     */
    return (
      <FactStrip
        label={t("Arşiv dönemi")}
        facts={[
          {
            label: t("Güncellendi"),
            value: data.lastRunAt
              ? formatDateTime(data.lastRunAt)
              : t("Bilinmiyor"),
          },
        ]}
        detailsLabel={t("Ayrıntılar")}
        details={
          <p>
            {lastChecked ? `${lastChecked}. ` : ""}
            {data.scannedThrough
              ? t(
                  "{date} tarihine kadar kontrol edildi, kelime verisi bulunamadı.",
                  { date: formatDate(data.scannedThrough) },
                )
              : t("Veri yükleme henüz başlamadı.")}
            {data.hasMore
              ? ` ${t("Bu sayfa açıkken kalan günler otomatik yüklenir; bağlantı veya kota hatasında beklenir.")}`
              : ""}
          </p>
        }
      />
    );
  }

  // Both ends are nullable. Interpolated raw they rendered as nothing, so a
  // half-populated archive read "Arşiv  –  arasını kapsıyor"; the range is
  // either there or the sentence does without it.
  // Row counts are storage plumbing; the dates are what an owner reads.
  const rows = formatNumber(data.rowCount);
  const summary =
    data.earliestDate && data.earliestDate === data.lastDate
      ? t(
          "{date} tarihli geçmiş bu bilgisayarda saklı; Google'ın 16 ay sınırı buna uygulanmaz.",
          { date: formatDate(data.earliestDate) },
        )
      : data.earliestDate && data.lastDate
        ? t(
            "Bu bilgisayarda {start} – {end} arasının geçmişi saklı; Google'ın 16 ay sınırı buna uygulanmaz.",
            {
              start: formatDate(data.earliestDate),
              end: formatDate(data.lastDate),
            },
          )
        : t("Arşiv {rows} satır.", { rows });

  return (
    <FactStrip
      label={t("Arşiv dönemi")}
      facts={[
        {
          label: t("Arşiv dönemi"),
          value:
            data.earliestDate && data.lastDate
              ? data.earliestDate === data.lastDate
                ? formatDate(data.lastDate)
                : `${formatDate(data.earliestDate)} – ${formatDate(data.lastDate)}`
              : t("Bilinmiyor"),
        },
        {
          label: t("Güncellendi"),
          value: data.lastRunAt
            ? formatDateTime(data.lastRunAt)
            : t("Bilinmiyor"),
        },
      ]}
      detailsLabel={t("Ayrıntılar")}
      details={
        <>
          <p>{summary}</p>
          {lastChecked ? <p>{lastChecked}</p> : null}
          <p>
            {` ${t("Google anonim sorguları gizler ve günlük satırları sınırlar; bu arşiv tüm aramaları içermez.")}`}
          </p>
          {data.scannedThrough ? (
            <p>
              {t("Taranan son gün: {date}", {
                date: formatDate(data.scannedThrough),
              })}
            </p>
          ) : null}
          <p>
            {/* `newDays`, not the days written. A caught-up archive re-reads the
          three days Search Console is still revising on every open, and
          reporting that as days added claimed growth that never happened. */}
            {data.newDays > 0
              ? ` ${t("Bu açılışta {count} gün eklendi.", { count: formatNumber(data.newDays) })}`
              : ""}
            {/* The backfill walks oldest to newest, so what is left is the recent
          end, not the old one. */}
            {data.hasMore
              ? ` ${t("Bu sayfa açıkken kalan günler otomatik yüklenir; bağlantı veya kota hatasında beklenir.")}`
              : ""}
          </p>
        </>
      }
    />
  );
}
