import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, Loader2, TrendingDown, TrendingUp } from "lucide-react";
import {
  getQueryHistory,
  getTrackedQueries,
  syncGscHistory,
} from "@/serverFunctions/gscHistory";
import { getStandardErrorMessage } from "@/client/lib/error-messages";

const WINDOWS = [
  { days: 30, label: "30 gün" },
  { days: 90, label: "90 gün" },
  { days: 180, label: "6 ay" },
  { days: 480, label: "Tümü" },
] as const;

export function RankingsPage({ projectId }: { projectId: string }) {
  const [days, setDays] = useState<number>(90);
  const [selected, setSelected] = useState<string | null>(null);

  // Catching the archive up is the page's first act: with nothing missing it
  // makes no API call, and with a gap it fills what it can before the table
  // reads. Kept fresh for a minute so switching windows does not re-sync.
  const sync = useQuery({
    queryKey: ["gscHistorySync", projectId],
    queryFn: () => syncGscHistory({ data: { projectId } }),
    staleTime: 60_000,
    retry: false,
  });

  const tracked = useQuery({
    queryKey: ["trackedQueries", projectId, days],
    queryFn: () => getTrackedQueries({ data: { projectId, days, limit: 25 } }),
    enabled: sync.isSuccess || sync.isError,
  });

  const history = useQuery({
    queryKey: ["queryHistory", projectId, selected, days],
    queryFn: () =>
      getQueryHistory({ data: { projectId, query: selected ?? "", days } }),
    enabled: selected !== null,
  });

  const rows = tracked.data?.rows ?? [];

  return (
    <div className="h-full overflow-auto px-4 py-4 pb-24 md:px-6 md:py-6 md:pb-8">
      <div className="mx-auto max-w-(--container-page) space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold">Sıralama takibi</h1>
            <p className="mt-1 text-sm text-base-content/70">
              Google&apos;ın kendi ölçtüğü ortalama sıra. Arşiv yerelde
              tutulduğu için 16 aylık Google sınırının ötesine geçebilir.
            </p>
          </div>
          <div role="tablist" className="tabs tabs-border">
            {WINDOWS.map((option) => (
              <button
                key={option.days}
                type="button"
                role="tab"
                aria-selected={days === option.days}
                className={`tab ${days === option.days ? "tab-active" : ""}`}
                onClick={() => setDays(option.days)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <ArchiveStatus sync={sync} />

        {tracked.isError ? (
          <div className="alert alert-error">
            <AlertCircle className="size-4" />
            {getStandardErrorMessage(tracked.error)}
          </div>
        ) : null}

        <div className="overflow-hidden rounded-lg border border-base-300 bg-base-100">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Sorgu</th>
                <th className="text-right">Ort. sıra</th>
                <th className="text-right">Gösterim</th>
                <th className="text-right">Tıklama</th>
                <th className="text-right">Gün</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && !tracked.isLoading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-8 text-center text-sm text-muted"
                  >
                    {sync.data?.rowCount === 0
                      ? "Arşiv henüz boş. Search Console bağlıysa bu sayfa açıldığında dolmaya başlar."
                      : "Bu aralıkta kayıtlı sorgu yok."}
                  </td>
                </tr>
              ) : null}
              {rows.map((row) => (
                <tr
                  key={row.query}
                  className={`cursor-pointer hover:bg-base-200/50 ${
                    selected === row.query ? "bg-base-200/60" : ""
                  }`}
                  onClick={() =>
                    setSelected(selected === row.query ? null : row.query)
                  }
                >
                  <td className="max-w-md truncate">{row.query}</td>
                  <td className="text-right tabular-nums">
                    {row.position.toFixed(1)}
                  </td>
                  <td className="text-right tabular-nums">
                    {row.impressions.toLocaleString("tr-TR")}
                  </td>
                  <td className="text-right tabular-nums">
                    {row.clicks.toLocaleString("tr-TR")}
                  </td>
                  <td className="text-right tabular-nums text-muted">
                    {row.days}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selected ? (
          <QueryHistoryCard
            query={selected}
            rows={history.data?.rows ?? []}
            loading={history.isLoading}
          />
        ) : null}
      </div>
    </div>
  );
}

function ArchiveStatus({
  sync,
}: {
  sync: {
    isLoading: boolean;
    data?: {
      earliestDate: string | null;
      lastDate: string | null;
      rowCount: number;
      daysFetched: number;
      hasMore: boolean;
      notConnected: boolean;
      error: string | null;
    };
  };
}) {
  if (sync.isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted">
        <Loader2 className="size-4 animate-spin" />
        Arşiv güncelleniyor…
      </div>
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

  if (data.rowCount === 0) return null;

  return (
    <p className="text-xs text-muted">
      Arşiv {data.earliestDate} – {data.lastDate} arasını kapsıyor,{" "}
      {data.rowCount.toLocaleString("tr-TR")} satır.
      {data.daysFetched > 0
        ? ` Bu açılışta ${data.daysFetched} gün eklendi.`
        : ""}
      {data.hasMore ? " Daha eski günler sonraki açılışta çekilecek." : ""}
    </p>
  );
}

function QueryHistoryCard({
  query,
  rows,
  loading,
}: {
  query: string;
  rows: {
    date: string;
    position: number;
    clicks: number;
    impressions: number;
  }[];
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-base-300 p-4 text-sm text-muted">
        <Loader2 className="size-4 animate-spin" />
        Geçmiş yükleniyor…
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="rounded-lg border border-base-300 p-4 text-sm text-muted">
        Bu sorgu için kayıtlı gün yok.
      </div>
    );
  }

  const first = rows[0];
  const last = rows[rows.length - 1];
  if (!first || !last) return null;
  // Lower position numbers are better, so a drop in the number is an
  // improvement. The arrow follows the ranking, not the arithmetic.
  const delta = first.position - last.position;
  const improved = delta > 0;

  return (
    <div className="space-y-3 rounded-lg border border-base-300 bg-base-100 p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-sm font-semibold">{query}</h2>
        <span
          className={`inline-flex items-center gap-1 text-sm font-semibold ${
            Math.abs(delta) < 0.1
              ? "text-muted"
              : improved
                ? "text-success"
                : "text-error"
          }`}
        >
          {Math.abs(delta) < 0.1 ? null : improved ? (
            <TrendingUp className="size-4" />
          ) : (
            <TrendingDown className="size-4" />
          )}
          {first.position.toFixed(1)} → {last.position.toFixed(1)}
        </span>
      </div>
      <PositionSparkline rows={rows} />
      <p className="text-xs text-muted">
        {first.date} – {last.date} · {rows.length} gün kayıtlı
      </p>
    </div>
  );
}

/**
 * Position over time. Drawn with the y axis inverted, because position 1 is the
 * top of the page: a line going up has to mean the ranking improved.
 */
function PositionSparkline({
  rows,
}: {
  rows: { date: string; position: number }[];
}) {
  if (rows.length < 2) return null;

  const width = 600;
  const height = 120;
  const positions = rows.map((row) => row.position);
  const best = Math.min(...positions);
  const worst = Math.max(...positions);
  const span = Math.max(worst - best, 1);

  const points = rows
    .map((row, index) => {
      const x = (index / (rows.length - 1)) * width;
      const y = ((row.position - best) / span) * (height - 16) + 8;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-28 w-full"
        role="img"
        aria-label={`Sıra geçmişi: ${best.toFixed(1)} ile ${worst.toFixed(1)} arasında`}
      >
        <polyline
          points={points}
          fill="none"
          className="stroke-primary"
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
      <div className="flex justify-between text-xs text-muted">
        <span>En iyi {best.toFixed(1)}</span>
        <span>En kötü {worst.toFixed(1)}</span>
      </div>
    </div>
  );
}
