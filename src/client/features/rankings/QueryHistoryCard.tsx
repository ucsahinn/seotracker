import { t } from "@/shared/i18n";
import { FactStrip } from "@/client/components/FactStrip";
import * as React from "react";
import { QueryErrorState } from "@/client/components/QueryErrorState";
import { Link } from "@tanstack/react-router";
import { formatCount, formatDate, formatDecimal } from "@/client/lib/format";
import { PositionSparkline } from "@/client/features/rankings/PositionSparkline";
import { PositionChange } from "./PositionChange";
import { isoDaysInclusive } from "@/shared/dataFreshness";
import { searchScopeUnavailableReason } from "@/client/features/search-performance/searchScope";

/**
 * One query's history, opened from the table beside it.
 *
 * Split out of `RankingsPage` when that file crossed its line ceiling. This
 * is the detail half; the file it came from owns the archive sync, the
 * table and the pagination.
 */
export function QueryHistoryCard({
  ref,
  projectId,
  query,
  rows,
  loading,
  error,
  onRetry,
  range,
  comparison,
  coverage,
}: {
  /*
   * So the page can scroll the card into view and move focus to it when a
   * query is opened: on a phone the card lands about a screen below the
   * fold, and the only feedback in place was the row's tint.
   */
  ref?: React.Ref<HTMLDivElement>;
  projectId: string;
  query: string;
  rows: {
    date: string;
    position: number;
    clicks: number;
    impressions: number;
  }[];
  loading: boolean;
  /*
   * A failed fetch used to fall through to `rows.length === 0` and tell the
   * operator the archive had nothing for a query the table directly above
   * had just reported as having hundreds of archived days.
   */
  error: unknown;
  onRetry: () => void;
  range?: { startDate: string; endDate: string };
  comparison?: {
    position: number | null;
    previousPosition: number | null;
    delta: number | null;
  };
  coverage?: {
    date: string;
    status: "complete-response" | "own-cap-limited" | "failed";
  }[];
}) {
  if (loading) {
    /*
     * Shaped like the card that is coming -- title bar, chart block, footer
     * line -- rather than a one-line spinner box. The spinner version was a
     * third the height of the loaded card, so opening a query made the page
     * jump once the history landed.
     */
    return (
      <div
        ref={ref}
        tabIndex={-1}
        className="space-y-3 rounded-box border border-base-300 bg-base-100 p-4"
        aria-busy
      >
        <div className="flex items-baseline justify-between gap-2">
          <div className="skeleton h-4 w-48" />
          <div className="skeleton h-4 w-24" />
        </div>
        <div className="skeleton h-28 w-full" />
        <div className="skeleton h-3 w-2/3" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        ref={ref}
        tabIndex={-1}
        className="rounded-box border border-base-300"
      >
        <QueryErrorState
          compact
          error={error}
          onRetry={onRetry}
          title={t("Sorgu geçmişi yüklenemedi")}
        />
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div
        ref={ref}
        tabIndex={-1}
        className="space-y-4 rounded-box border border-base-300 bg-base-100 p-4 text-sm text-muted"
      >
        <h2 className="break-all font-semibold">{query}</h2>
        {range ? (
          <FactStrip
            label={t("Dönem")}
            facts={[
              {
                label: t("Dönem"),
                value: `${formatDate(range.startDate)} – ${formatDate(range.endDate)}`,
              },
            ]}
          />
        ) : null}
        <p>
          {t("Bu sorgu için kayıtlı gün yok.")}{" "}
          {t("Daha geniş bir dönem seçmeyi deneyin.")}
        </p>
      </div>
    );
  }

  const first = rows[0];
  const last = rows[rows.length - 1];
  if (!first || !last) return null;
  // Lower position numbers are better, so a drop in the number is an
  // improvement. The arrow follows the ranking, not the arithmetic.
  const delta = first.position - last.position;

  const totalClicks = rows.reduce((sum, row) => sum + row.clicks, 0);
  const totalImpressions = rows.reduce((sum, row) => sum + row.impressions, 0);

  return (
    <div
      ref={ref}
      tabIndex={-1}
      className="enter space-y-4 rounded-box border border-base-300 bg-base-100 p-4"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="min-w-0 break-words text-lg font-semibold">{query}</h2>
        <PositionChange delta={comparison?.delta ?? null} />
      </div>
      {range ? (
        <FactStrip
          label={t("Dönem")}
          facts={[
            { label: t("Kaynak"), value: "GSC Web" },
            {
              label: t("Dönem"),
              value: `${formatDate(range.startDate)} – ${formatDate(range.endDate)}`,
            },
            {
              label: t("Gözlenen gün"),
              value: `${formatCount(rows.length)} / ${formatCount(isoDaysInclusive(range.startDate, range.endDate))}`,
            },
          ]}
        />
      ) : null}
      {comparison?.position != null ? (
        <p className="text-sm">
          {t("Dönem ortalaması")}:{" "}
          {comparison.previousPosition == null
            ? t("Karşılaştırma yok")
            : formatDecimal(comparison.previousPosition)}{" "}
          → {formatDecimal(comparison.position)}
        </p>
      ) : null}
      <PositionSparkline rows={rows} range={range} coverage={coverage} />
      <details className="max-w-prose text-sm text-muted">
        <summary className="min-h-11 cursor-pointer">{t("Ayrıntılar")}</summary>
        <p>
          {t("İlk/son kayıtlı gün")}: {formatDate(first.date)} ·{" "}
          {formatDecimal(first.position)} → {formatDate(last.date)} ·{" "}
          {formatDecimal(last.position)} <PositionChange delta={delta} />
        </p>
        <div className="space-y-1.5">
          <p>
            {t("{start} – {end} · {count} gün kayıtlı", {
              start: formatDate(first.date),
              end: formatDate(last.date),
              count: formatCount(rows.length),
            })}
          </p>
          <p>
            {t("Toplam tıklama / gösterim: {clicks} / {impressions}", {
              clicks: formatCount(totalClicks),
              impressions: formatCount(totalImpressions),
            })}
          </p>
        </div>
      </details>
      <details className="text-xs">
        <summary className="min-h-11 cursor-pointer">
          {t("Günlük değerler")}
        </summary>
        <ul>
          {rows.map((row) => (
            <li key={row.date}>
              {formatDate(row.date)} · {formatDecimal(row.position)} ·{" "}
              {formatCount(row.clicks)} / {formatCount(row.impressions)}
            </li>
          ))}
        </ul>
      </details>
      {range && searchScopeUnavailableReason(range.startDate) ? (
        <p role="status" className="text-xs text-muted">
          {searchScopeUnavailableReason(range.startDate)}
        </p>
      ) : range ? (
        <Link
          to="/p/$projectId/search-performance"
          params={{ projectId }}
          search={{ tab: "queries" as const, exactQuery: query, ...range }}
          className="btn btn-outline min-h-11 h-auto max-w-full rounded-full whitespace-normal"
        >
          {t("Arama performansında aç")}
        </Link>
      ) : null}
    </div>
  );
}
