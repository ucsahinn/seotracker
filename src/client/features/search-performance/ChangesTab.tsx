import { sourceOutcomeMessage } from "@/shared/searchSourceOutcome";
import { t } from "@/shared/i18n";
import * as React from "react";
import { reverse, sort } from "remeda";
import {
  formatCount,
  formatDate,
  formatDecimal,
  formatPercent,
} from "@/client/lib/format";
import {
  INSIGHT_RULES,
  type Movers,
  type QueryChangeRow,
} from "@/shared/searchInsights";
import type { SearchPerformanceView } from "@/shared/searchPerformanceView";
import type {
  SearchPerformanceDevice,
  SearchPerformanceType,
} from "@/types/schemas/search-performance";
import type { DrillTarget } from "@/client/features/search-performance/DrilldownPanel";
import { Section } from "@/client/features/search-performance/Section";
import { positionMove, shortPage } from "@/shared/searchTodoCopy";
import { LongTermTrend } from "@/client/features/search-performance/LongTermTrend";

type MoverRow = Movers["growing"][number];

function MoverList({
  rows,
  dimension,
  onOpen,
}: {
  rows: MoverRow[];
  dimension: "query" | "page";
  onOpen: (target: DrillTarget) => void;
}) {
  if (rows.length === 0) {
    return <p className="text-sm text-muted">{t("Eşiği aşan değişim yok.")}</p>;
  }
  return (
    <ul className="divide-y divide-[var(--hairline)]">
      {rows.slice(0, 10).map((row) => {
        const up = row.clickChange > 0;
        const move = positionMove(row.previousPosition, row.position);
        return (
          <li key={row.key}>
            <button
              type="button"
              className="flex w-full items-start gap-3 py-2 text-left hover:bg-base-200/50 focus-visible:outline-2 focus-visible:outline-primary"
              onClick={() => onOpen({ dimension, key: row.key })}
              title={row.key}
            >
              <span className="min-w-0 flex-1 text-sm [overflow-wrap:anywhere]">
                {dimension === "page" ? shortPage(row.key) : row.key}
                <span className="block text-xs text-muted tabular-nums">
                  {t("{previous} → {current} tıklama", {
                    previous: formatCount(row.previousClicks),
                    current: formatCount(row.clicks),
                  })}
                  {move ? ` · ${move}` : ""}
                </span>
              </span>
              <span
                className={`shrink-0 text-sm font-medium tabular-nums ${
                  up ? "text-[var(--ink-success)]" : "text-[var(--ink-error)]"
                }`}
              >
                <span aria-hidden>{up ? "↑" : "↓"}</span>
                <span className="sr-only">
                  {up ? t("arttı") : t("azaldı")}{" "}
                </span>
                {formatCount(Math.abs(row.clickChange))}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

/** Rows shown before "show all". */
const QUERY_LIST_SHOWN = 10;

/**
 * New or lost queries, most impressions first: a query nobody clicked yet
 * is still worth seeing if Google showed it a thousand times. Clicks are
 * printed only where there were some; the section says once that most had
 * none.
 */
function QueryList({
  rows,
  empty,
  onOpen,
}: {
  rows: QueryChangeRow[];
  empty: string;
  onOpen: (target: DrillTarget) => void;
}) {
  const [showAll, setShowAll] = React.useState(false);
  if (rows.length === 0) return <p className="text-sm text-muted">{empty}</p>;
  const sorted = sort(rows, (a, b) => b.impressions - a.impressions);
  const shown = showAll ? sorted : sorted.slice(0, QUERY_LIST_SHOWN);
  return (
    <>
      <ul className="divide-y divide-[var(--hairline)]">
        {shown.map((row) => (
          <li key={row.query}>
            <button
              type="button"
              className="flex w-full items-start gap-3 py-2 text-left hover:bg-base-200/50 focus-visible:outline-2 focus-visible:outline-primary"
              onClick={() => onOpen({ dimension: "query", key: row.query })}
            >
              <span className="min-w-0 flex-1 text-sm [overflow-wrap:anywhere]">
                {row.query}
              </span>
              <span className="shrink-0 text-right text-xs tabular-nums text-muted">
                {row.clicks > 0
                  ? t("{impressions} gösterim · {clicks} tıklama", {
                      clicks: formatCount(row.clicks),
                      impressions: formatCount(row.impressions),
                    })
                  : t("{impressions} gösterim", {
                      impressions: formatCount(row.impressions),
                    })}
                <br />
                {t("sıra {position}", {
                  position: formatDecimal(row.position),
                })}
              </span>
            </button>
          </li>
        ))}
      </ul>
      {sorted.length > QUERY_LIST_SHOWN ? (
        <button
          type="button"
          className="btn btn-ghost btn-sm self-start max-sm:min-h-11"
          aria-expanded={showAll}
          onClick={() => setShowAll((v) => !v)}
        >
          {showAll
            ? t("Daha az göster")
            : t("Tümünü göster ({count})", { count: sorted.length })}
        </button>
      ) : null}
    </>
  );
}

/**
 * A page's clicks per quarter as five small labelled bars, oldest to newest:
 * a bare sparkline had no scale, so "fading" had to be taken on trust.
 */
function QuarterBars({ quarters }: { quarters: Array<number | null> }) {
  const oldestFirst = reverse(quarters);
  const max = Math.max(1, ...oldestFirst.map((v) => v ?? 0));
  return (
    <figure className="flex w-full shrink-0 flex-col gap-1 sm:w-44">
      <div className="flex h-10 items-end gap-1" aria-hidden>
        {oldestFirst.map((value, index) => (
          <span
            key={index}
            className={`flex-1 rounded-t-sm ${
              index === oldestFirst.length - 1
                ? "bg-[var(--ink-error)]"
                : "bg-[color-mix(in_oklab,var(--color-primary)_55%,var(--color-base-100))]"
            }`}
            style={{
              height:
                value === null ? 2 : `${Math.max(4, (value / max) * 100)}%`,
              opacity: value === null ? 0.3 : 1,
            }}
            title={value === null ? "–" : formatCount(value)}
          />
        ))}
      </div>
      <figcaption className="flex justify-between text-[11px] text-muted">
        <span>{t("1 yıl önce")}</span>
        <span>{t("Son çeyrek")}</span>
      </figcaption>
      <span className="sr-only">
        {t("Çeyrek başına tıklama, eskiden yeniye: {values}", {
          values: oldestFirst
            .map((v) => (v === null ? "–" : formatCount(v)))
            .join(", "),
        })}
      </span>
    </figure>
  );
}

function MoverPanel({
  title,
  movers,
  dimension,
  onOpen,
}: {
  title: string;
  movers: Movers;
  dimension: "query" | "page";
  onOpen: (target: DrillTarget) => void;
}) {
  const [direction, setDirection] = React.useState<"declining" | "growing">(
    "declining",
  );
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h4 className="text-sm font-medium">{title}</h4>
        <div role="group" aria-label={title} className="join">
          {(
            [
              [
                "declining",
                t("Düşenler ({count})", { count: movers.declining.length }),
              ],
              [
                "growing",
                t("Yükselenler ({count})", { count: movers.growing.length }),
              ],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              aria-pressed={direction === id}
              className={`btn join-item btn-xs ${direction === id ? "btn-active" : "btn-ghost"}`}
              onClick={() => setDirection(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <MoverList
        rows={movers[direction]}
        dimension={dimension}
        onOpen={onOpen}
      />
    </div>
  );
}

export function ChangesTab({
  projectId,
  view,
  searchType,
  device,
  onOpen,
}: {
  projectId: string;
  view: SearchPerformanceView;
  searchType: SearchPerformanceType;
  device?: SearchPerformanceDevice;
  onOpen: (target: DrillTarget) => void;
}) {
  const { movers, newQueries, lostQueries, decay, thresholds } = view.insights;
  const previous = view.window.previous;
  const zeroClick = [...(newQueries ?? []), ...(lostQueries ?? [])].filter(
    (row) => row.clicks === 0,
  ).length;
  return (
    <div className="flex flex-col divide-y divide-[var(--hairline)]">
      <Section
        title={t("Önceki döneme göre en çok değişenler")}
        description={t(
          "{start} – {end} ile karşılaştırma. En az {clicks} tıklamalık ve {share} oranında bir değişim aranır.",
          {
            share: formatPercent(INSIGHT_RULES.moverMinRelative, 0),
            start: formatDate(previous.startDate),
            end: formatDate(previous.endDate),
            clicks: formatCount(thresholds.moverMinClicks),
          },
        )}
        note={
          movers.queries.complete && movers.pages.complete
            ? undefined
            : t(
                "Satır sınırı yüzünden bir dönemin tablosu eksik; yalnızca iki dönemde de görünen satırlar karşılaştırıldı.",
              )
        }
      >
        <div className="grid gap-6 px-4 pb-2 lg:grid-cols-2">
          <MoverPanel
            title={t("Sorgular")}
            movers={movers.queries}
            dimension="query"
            onOpen={onOpen}
          />
          <MoverPanel
            title={t("Sayfalar")}
            movers={movers.pages}
            dimension="page"
            onOpen={onOpen}
          />
        </div>
      </Section>

      <Section
        title={t("Yeni ve kaybolan sorgular")}
        description={[
          t(
            "Yalnızca bir dönemde en az {impressions} gösterim alan sorgular, en çok gösterimden aza.",
            { impressions: formatCount(thresholds.newLostMinImpressions) },
          ),
          zeroClick > 0
            ? t("{count} tanesi hiç tıklama almadı.", { count: zeroClick })
            : null,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="grid gap-6 px-4 pb-2 lg:grid-cols-2">
          <div className="flex min-w-0 flex-col gap-2">
            <h4 className="text-sm font-medium">{t("Yeni görünenler")}</h4>
            {newQueries === null ? (
              <p className="text-sm text-muted">
                {t(
                  "Önceki dönemin tablosu satır sınırında kesildiği için hangi sorguların yeni olduğu bilinemiyor.",
                )}
              </p>
            ) : (
              <QueryList
                rows={newQueries}
                empty={t("Bu dönemde yeni görünen sorgu yok.")}
                onOpen={onOpen}
              />
            )}
          </div>
          <div className="flex min-w-0 flex-col gap-2">
            <h4 className="text-sm font-medium">
              {t("Kaybolanlar (önceki dönemdeki değerleriyle)")}
            </h4>
            {lostQueries === null ? (
              <p className="text-sm text-muted">
                {t(
                  "Bu dönemin tablosu satır sınırında kesildiği için hangi sorguların kaybolduğu bilinemiyor.",
                )}
              </p>
            ) : (
              <QueryList
                rows={lostQueries}
                empty={t("Kaybolan sorgu yok.")}
                onOpen={onOpen}
              />
            )}
          </div>
        </div>
      </Section>

      <Section
        title={t("Gücünü kaybeden sayfalar")}
        description={t(
          "Son çeyrekteki tıklamaları, önceki dört çeyreğin en iyisinin {share} kadarından aza düşen ve geçen yılın aynı çeyreğinden de geride kalan sayfalar.",
          { share: formatPercent(INSIGHT_RULES.decayMaxShareOfPeak, 0) },
        )}
      >
        {view.sourceOutcomes?.decay?.status === "partial" &&
        decay !== null &&
        decay.length > 0 ? (
          <p className="px-4 text-sm text-muted">
            {sourceOutcomeMessage(view.sourceOutcomes.decay)}
          </p>
        ) : null}
        {decay === null ? (
          <p className="px-4 text-sm text-muted">
            {sourceOutcomeMessage(view.sourceOutcomes?.decay)}
          </p>
        ) : decay.length === 0 ? (
          <p className="px-4 text-sm text-muted">
            {view.sourceOutcomes?.decay?.status === "partial"
              ? sourceOutcomeMessage(view.sourceOutcomes.decay)
              : t(
                  "Okunan sayfalarda güç kaybı koşulunu sağlayan kayıt bulunmadı.",
                )}
          </p>
        ) : (
          <ul className="divide-y divide-[var(--hairline)] px-4">
            {decay.slice(0, 15).map((row) => (
              <li key={row.page}>
                <button
                  type="button"
                  className="flex w-full flex-col gap-2 py-2.5 text-left hover:bg-base-200/50 focus-visible:outline-2 focus-visible:outline-primary sm:flex-row sm:items-center sm:gap-4"
                  onClick={() => onOpen({ dimension: "page", key: row.page })}
                  title={row.page}
                >
                  <span className="min-w-0 flex-1 text-sm [overflow-wrap:anywhere]">
                    {shortPage(row.page)}
                    <span className="block text-xs text-muted tabular-nums">
                      {t("Son çeyrek {clicks} · en iyisi {peak} tıklama", {
                        clicks: formatCount(row.clicks),
                        peak: formatCount(row.peakClicks),
                      })}
                    </span>
                  </span>
                  <QuarterBars quarters={row.quarters} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section
        title={t("Uzun dönem: aylık tıklama")}
        description={t(
          "Search Console en fazla 16 ay geriye gider; bu arşiv günlük toplamları bu bilgisayarda daha uzun saklar.",
        )}
      >
        <LongTermTrend
          projectId={projectId}
          searchType={searchType}
          device={device}
        />
      </Section>
    </div>
  );
}
