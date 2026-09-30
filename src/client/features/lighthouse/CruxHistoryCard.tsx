import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import * as React from "react";
import { formatDate } from "@/client/lib/format";
import { getCruxHistory } from "@/serverFunctions/cruxHistory";
import type { CruxSeries } from "@/shared/cruxHistory";
import { CruxSparkline } from "./CruxSparkline";
import {
  CRUX_METRIC_LABEL,
  CRUX_RATING_LABEL,
  describeCruxSeries,
  formatCruxValue,
  summarizeCruxSeries,
  type CruxSeriesSummary,
} from "./cruxHistoryView";

type FormFactor = "PHONE" | "DESKTOP";

const FORM_FACTORS: Array<{ id: FormFactor; label: string }> = [
  { id: "PHONE", label: "Telefon" },
  { id: "DESKTOP", label: "Masaüstü" },
];

/** The history moves one window a week, so an hour-old answer is current. */
const STALE_MS = 6 * 60 * 60 * 1000;

const RATING_CLASS = {
  good: "text-[var(--ink-success)]",
  "needs-improvement": "text-[var(--ink-warning)]",
  poor: "text-[var(--ink-error)]",
} as const;

/**
 * What PageSpeed cannot show: how the real-visitor numbers moved.
 *
 * PageSpeed returns one 28-day CrUX snapshot. The Chrome UX Report History
 * API returns that same rolling p75 for each of the last weeks, free and
 * with the same key, so "is it getting better" has an answer.
 */
export function CruxHistoryCard({ url }: { url: string }) {
  const [formFactor, setFormFactor] = React.useState<FormFactor>("PHONE");
  const query = useQuery({
    queryKey: ["crux-history", url, formFactor],
    queryFn: () => getCruxHistory({ data: { url, formFactor } }),
    staleTime: STALE_MS,
    retry: false,
  });
  const data = query.data;

  return (
    <section className="rounded-box border border-base-300 bg-base-200/25 px-4 py-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-xs uppercase tracking-wide text-muted">
          Gerçek kullanıcı hızı, son haftalar
        </h3>
        <fieldset className="join">
          <legend className="sr-only">Cihaz türü</legend>
          {FORM_FACTORS.map((option) => (
            <label
              key={option.id}
              className={`btn btn-xs join-item ${formFactor === option.id ? "btn-active" : ""}`}
            >
              <input
                type="radio"
                name="crux-form-factor"
                className="sr-only"
                checked={formFactor === option.id}
                onChange={() => setFormFactor(option.id)}
              />
              {option.label}
            </label>
          ))}
        </fieldset>
      </div>

      {query.isPending ? (
        <div className="mt-3 grid gap-3 sm:grid-cols-3" aria-busy>
          {[0, 1, 2].map((slot) => (
            <div key={slot} className="skeleton h-24" />
          ))}
        </div>
      ) : query.isError || data?.status === "error" ? (
        <Message
          text={
            data?.status === "error" ? data.message : "Google'a ulaşılamadı."
          }
          action={
            <button
              type="button"
              className="btn btn-xs"
              onClick={() => void query.refetch()}
            >
              Tekrar dene
            </button>
          }
        />
      ) : data?.status === "no_key" ? (
        <Message
          text="Bu geçmiş için Google anahtarı gerekiyor; PageSpeed anahtarıyla aynı."
          action={
            <Link to="/settings" className="btn btn-xs">
              Ayarlar&apos;a git
            </Link>
          }
        />
      ) : data?.status === "no_data" ? (
        <Message text="Google bu site için yeterli ziyaretçi verisine sahip değil. Siteye Chrome ile gelen ziyaretçi arttıkça burada görünür." />
      ) : data?.status === "ok" ? (
        <Trends series={data.series} />
      ) : null}
    </section>
  );
}

function Message({ text, action }: { text: string; action?: React.ReactNode }) {
  return (
    <div className="mt-2 flex flex-wrap items-center gap-3">
      <p className="text-xs leading-relaxed text-muted">{text}</p>
      {action}
    </div>
  );
}

function Trends({ series }: { series: CruxSeries[] }) {
  const items = series.flatMap((entry) => {
    const summary = summarizeCruxSeries(entry);
    return summary ? [{ entry, summary }] : [];
  });
  if (items.length === 0) {
    return (
      <Message text="Google bu site için yeterli ziyaretçi verisine sahip değil." />
    );
  }

  // Every series shares the same collection periods, so any one has the last.
  const lastDate = items[0]?.entry.points.at(-1)?.date;

  return (
    <>
      <p className="mt-1 text-xs leading-relaxed text-muted">
        Her nokta, o haftada biten 28 günlük pencerenin ziyaretçilerin yüzde
        75&apos;inin gördüğü değerdir (p75). Kesikli çizgiler iyi ve zayıf
        sınırlarıdır.
      </p>
      <ul className="mt-3 grid gap-3 sm:grid-cols-3">
        {items.map(({ entry, summary }) => (
          <li
            key={entry.metric}
            role="img"
            aria-label={describeCruxSeries(summary)}
            className="rounded-field border border-base-300 bg-base-100 px-3 py-2"
          >
            <MetricTile series={entry} summary={summary} />
          </li>
        ))}
      </ul>
      {lastDate ? (
        <p className="mt-2 text-xs text-subtle">
          Son pencere {formatDate(lastDate)} tarihinde bitiyor.
        </p>
      ) : null}
    </>
  );
}

function MetricTile({
  series,
  summary,
}: {
  series: CruxSeries;
  summary: CruxSeriesSummary;
}) {
  return (
    <>
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-sm font-medium">
          {CRUX_METRIC_LABEL[series.metric]}
        </span>
        <span className="text-xs font-medium tabular-nums">
          {formatCruxValue(series.metric, summary.latest)}
          <span className={`ml-1.5 ${RATING_CLASS[summary.rating]}`}>
            {CRUX_RATING_LABEL[summary.rating]}
          </span>
        </span>
      </div>
      <CruxSparkline series={series} summary={summary} />
    </>
  );
}
