/**
 * What the local archive holds and whether it is still filling.
 *
 * Split out of `RankingsPage` when that file crossed its line ceiling. It is
 * the one part of that screen that describes the *archive* rather than the
 * queries in it -- which is also why it sits above the table with its own
 * dates: the table's window and the archive's span are different things.
 */
import { AlertCircle } from "lucide-react";
import { formatDate, formatNumber } from "@/client/lib/format";
import { QueryErrorState } from "@/client/components/QueryErrorState";

export function ArchiveStatus({
  sync,
}: {
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
      rowCount: number;
      newDays: number;
      hasMore: boolean;
      notConnected: boolean;
      error: string | null;
    };
  };
}) {
  if (sync.isLoading) {
    /*
     * A line of text where a line of text is coming. `ArchiveStatus` renders
     * one sentence, so a skeleton of the same shape is the honest
     * placeholder -- and unlike the spinner it does not claim motion the
     * archive sync may not have.
     */
    return <div className="skeleton h-4 w-72" aria-busy />;
  }

  // An unexpected server error used to render nothing at all, leaving the
  // table below with no explanation for why it was empty.
  if (sync.isError) {
    return (
      <QueryErrorState
        compact
        error={sync.error}
        onRetry={() => void sync.refetch()}
        title="Arşiv durumu okunamadı"
      />
    );
  }

  const data = sync.data;
  if (!data) return null;

  // Setup being unfinished is not a sync failure, so it gets a plain
  // instruction rather than a warning alert.
  if (data.notConnected) {
    return (
      <p className="text-sm text-muted">
        Sıralama arşivi Search Console verisinden doldurulur. Bağladığınızda
        geçmiş günler kendiliğinden birikmeye başlar.
      </p>
    );
  }

  if (data.error) {
    return (
      <div className="alert alert-warning text-sm">
        <AlertCircle className="size-4 shrink-0" />
        <span>Arşiv güncellenemedi: {data.error}</span>
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
      <p className="text-xs text-muted">
        {data.scannedThrough
          ? `${formatDate(data.scannedThrough)} tarihine kadar kontrol edildi, kelime verisi bulunamadı.`
          : "Veri yükleme henüz başlamadı."}
        {data.hasMore ? " Kalan günler sonraki açılışlarda yüklenecek." : ""}
      </p>
    );
  }

  // Both ends are nullable. Interpolated raw they rendered as nothing, so a
  // half-populated archive read "Arşiv  –  arasını kapsıyor"; the range is
  // either there or the sentence does without it.
  const span =
    data.earliestDate && data.lastDate
      ? `${formatDate(data.earliestDate)} – ${formatDate(data.lastDate)} arasını kapsıyor, `
      : "";

  return (
    <p className="text-xs text-muted">
      Arşiv {span}
      {formatNumber(data.rowCount)} satır.
      {/* `newDays`, not the days written. A caught-up archive re-reads the
          three days Search Console is still revising on every open, and
          reporting that as days added claimed growth that never happened. */}
      {data.newDays > 0 ? ` Bu açılışta ${data.newDays} gün eklendi.` : ""}
      {/* The backfill walks oldest to newest, so what is left is the recent
          end, not the old one. */}
      {data.hasMore ? " Kalan günler sonraki açılışta tamamlanacak." : ""}
    </p>
  );
}
