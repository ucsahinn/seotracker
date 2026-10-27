import { t } from "@/shared/i18n";
import * as React from "react";
import { formatCount, formatDate, formatDecimal } from "@/client/lib/format";
import { addIsoDays, isoDaysInclusive } from "@/shared/dataFreshness";

type Day = {
  date: string;
  position: number;
  clicks: number;
  impressions: number;
};
type Coverage = {
  date: string;
  status: "complete-response" | "own-cap-limited" | "failed";
};

/** The calendar, including absent observations, is the horizontal axis. */
export function PositionSparkline({
  rows,
  range,
  coverage = [],
}: {
  rows: Day[];
  range?: { startDate: string; endDate: string };
  coverage?: Coverage[];
}) {
  const [hovered, setHovered] = React.useState<number | null>(null);
  if (!rows.length) return null;
  const start = range?.startDate ?? rows[0].date;
  const end = range?.endDate ?? rows.at(-1)!.date;
  const count = isoDaysInclusive(start, end);
  const byDate = new Map(rows.map((row) => [row.date, row]));
  const coverageByDate = new Map(coverage.map((day) => [day.date, day.status]));
  const dates = Array.from({ length: count }, (_, i) => addIsoDays(start, i));
  const best = Math.min(...rows.map((row) => row.position));
  const worst = Math.max(...rows.map((row) => row.position));
  const lastIndex = count - 1;
  const xOf = (i: number) => (count === 1 ? 300 : (i / lastIndex) * 600);
  const yOf = (position: number) =>
    ((position - best) / Math.max(worst - best, 1)) * 104 + 8;
  let path = "";
  let connected = false;
  dates.forEach((date, i) => {
    const row = byDate.get(date);
    if (!row) {
      connected = false;
      return;
    }
    path +=
      (connected ? " L " : " M ") +
      xOf(i).toFixed(1) +
      "," +
      yOf(row.position).toFixed(1);
    connected = true;
  });
  const at = Math.min(lastIndex, Math.max(0, hovered ?? lastIndex));
  const date = dates[at];
  const day = byDate.get(date);
  const missing =
    coverageByDate.get(date) === "complete-response"
      ? t("Bu gün sorgu gözlenmedi; API yanıtı tamamlandı.")
      : t("Bu gün arşiv kapsamı eksik veya bilinmiyor.");
  const readout = day
    ? t(
        "{date} · Sıra {position} · {clicks} tıklama · {impressions} gösterim",
        {
          date: formatDate(date),
          position: formatDecimal(day.position),
          clicks: formatCount(day.clicks),
          impressions: formatCount(day.impressions),
        },
      )
    : formatDate(date) + " · " + missing;
  const onKey = (event: React.KeyboardEvent<SVGSVGElement>) => {
    const step =
      event.key === "ArrowLeft" ? -1 : event.key === "ArrowRight" ? 1 : 0;
    if (!step && event.key !== "Home" && event.key !== "End") return;
    event.preventDefault();
    setHovered(
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? lastIndex
          : Math.min(lastIndex, Math.max(0, at + step)),
    );
  };
  return (
    <div>
      <svg
        viewBox="0 0 600 120"
        className="h-28 w-full touch-pan-y"
        role="slider"
        tabIndex={0}
        aria-label={t("Sıra geçmişi: {best} ile {worst} arasında", {
          best: formatDecimal(best),
          worst: formatDecimal(worst),
        })}
        aria-valuemin={0}
        aria-valuemax={lastIndex}
        aria-valuenow={at}
        aria-valuetext={readout}
        onPointerMove={(event) => {
          const box = event.currentTarget.getBoundingClientRect();
          if (box.width)
            setHovered(
              Math.min(
                lastIndex,
                Math.max(
                  0,
                  Math.round(
                    ((event.clientX - box.left) / box.width) * lastIndex,
                  ),
                ),
              ),
            );
        }}
        onPointerLeave={() => setHovered(null)}
        onKeyDown={onKey}
        onBlur={() => setHovered(null)}
      >
        <path
          d={path}
          fill="none"
          stroke="var(--ink-primary)"
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {dates.map((pointDate, i) => {
          const row = byDate.get(pointDate);
          return row ? (
            <circle
              key={pointDate}
              cx={xOf(i)}
              cy={yOf(row.position)}
              r={i === at ? 4 : 2}
              fill="var(--ink-primary)"
            />
          ) : null;
        })}
      </svg>
      <div className="flex justify-between text-xs text-muted">
        <span>{formatDate(start)}</span>
        <span>{formatDate(end)}</span>
      </div>
      <p className="mt-1 min-h-4 text-xs tabular-nums" aria-live="polite">
        {readout}
      </p>
      <p className="text-xs text-subtle">
        {t(
          "Boşluklar doldurulmaz; sıra sıfır kabul edilmez. Ok tuşlarıyla günleri inceleyin.",
        )}
      </p>
    </div>
  );
}
