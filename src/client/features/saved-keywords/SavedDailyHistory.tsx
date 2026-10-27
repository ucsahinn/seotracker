import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSavedHistory } from "@/serverFunctions/savedKeywords";
import { savedWatchlistSchema } from "@/shared/savedWatchlist";
import type { SavedWatchlist } from "@/server/features/keywords/services/SavedWatchlistService";
import { PositionSparkline } from "@/client/features/rankings/PositionSparkline";
import { formatDate, formatCount, formatDecimal } from "@/shared/format";
import { t } from "@/shared/i18n";
export function SavedDailyHistory({
  data,
  savedId,
  projectId,
}: {
  data: SavedWatchlist;
  savedId: string;
  projectId: string;
}) {
  const [open, setOpen] = useState(false);
  const input = savedWatchlistSchema.parse({
    ...data.filters,
    band: data.filters.band ?? undefined,
    projectId,
    days: data.requestedDays,
    page: data.page,
    pageSize: data.pageSize,
    startDate: data.range.startDate,
    endDate: data.range.endDate,
    expectedSnapshot: data.snapshot,
  });
  const daily = useQuery({
    queryKey: ["savedKeywords", projectId, "daily", savedId, data.snapshot],
    queryFn: () => getSavedHistory({ data: { ...input, savedId } }),
    enabled: open,
    staleTime: 60000,
  });
  return (
    <div className="space-y-3">
      <button
        className="btn btn-outline min-h-11"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {t("Günlük arşiv gözlemlerini göster")}
      </button>
      {open ? (
        daily.isPending ? (
          <div className="skeleton h-28" aria-busy />
        ) : daily.isError ? (
          <div role="alert" className="text-sm text-[var(--ink-warning)]">
            <p>
              {t(
                "Günlük arşiv okunamadı veya liste değişti. Ayrıntıyı kapatıp listeyi yenileyin; ardından yeniden açın.",
              )}
            </p>
            <button
              className="btn btn-ghost min-h-11"
              onClick={() => void daily.refetch()}
            >
              {t("Tekrar dene")}
            </button>
          </div>
        ) : daily.data?.rows.length ? (
          <>
            <PositionSparkline
              rows={daily.data.rows}
              range={daily.data.range}
              coverage={daily.data.coverage}
            />
            <details className="text-xs">
              <summary className="min-h-11 cursor-pointer">
                {t("Günlük değerler")}
              </summary>
              <ul>
                {daily.data.rows.map((row) => (
                  <li key={row.date}>
                    {formatDate(row.date)} · {formatDecimal(row.position)} ·{" "}
                    {formatCount(row.clicks)} / {formatCount(row.impressions)}
                  </li>
                ))}
              </ul>
            </details>
          </>
        ) : (
          <p className="text-sm text-muted">
            {t(
              "Bu tarihlerde eşleşen günlük gözlem yok; eksik günler sıfır sayılmaz.",
            )}
          </p>
        )
      ) : null}
    </div>
  );
}
