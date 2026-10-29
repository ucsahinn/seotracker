import {
  strikingEstimateText,
  strikingMethodText,
} from "@/shared/strikingEstimateCopy";
import { t } from "@/shared/i18n";
import * as React from "react";
import { Target } from "lucide-react";
import { EmptyState } from "@/client/components/EmptyState";
import {
  formatCount,
  formatDate,
  formatDecimal,
  formatPercent,
} from "@/client/lib/format";
import type { SearchPerformanceView } from "@/shared/searchPerformanceView";
import { INSIGHT_RULES } from "@/shared/searchInsights";
import { strikingEmptyCopy } from "@/client/features/search-performance/strikingEmptyCopy";
import { gainText, shortPage } from "@/shared/searchTodoCopy";
import type { DrillTarget } from "@/client/features/search-performance/DrilldownPanel";
import { Section } from "@/client/features/search-performance/Section";
import {
  KeyButton,
  StrikingTable,
} from "@/client/features/search-performance/StrikingTable";

// Mirrors the max(500) of saveKeywordsSchema.
const BAND_LABEL: Record<string, string> = {
  "1": "1",
  "2-3": "2–3",
  "4-5": "4–5",
  "6-10": "6–10",
  "11-20": "11–20",
};

function CtrCurve({ view }: { view: SearchPerformanceView }) {
  const curve = view.insights.ctrCurve;
  const points = curve.nonBrand ?? curve.all;
  const max = Math.max(...points.map((p) => p.ctr ?? 0), 0.0001);
  return (
    <div className="flex flex-col gap-2">
      <ul className="flex flex-col gap-1.5">
        {points.map((point) => (
          <li
            key={point.band}
            className="grid grid-cols-[4.5rem_minmax(0,1fr)_6.5rem] items-center gap-3 text-sm"
          >
            <span className="tabular-nums text-muted">
              {t("Sıra {band}", { band: BAND_LABEL[point.band] ?? point.band })}
            </span>
            <span className="h-2.5 overflow-hidden rounded-full bg-[var(--mark-track)]">
              {point.sufficient && point.ctr !== null ? (
                <span
                  className="block h-full rounded-full bg-primary"
                  style={{ width: `${(point.ctr / max) * 100}%` }}
                />
              ) : (
                <span className="block h-full w-full bg-[repeating-linear-gradient(45deg,var(--hairline-strong)_0_3px,transparent_3px_7px)]" />
              )}
            </span>
            <span className="text-right tabular-nums">
              {point.sufficient && point.ctr !== null ? (
                formatPercent(point.ctr)
              ) : (
                <span className="text-xs text-subtle">
                  {t("Yetersiz veri")}
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
      <details className="text-sm text-muted">
        <summary className="min-h-11 cursor-pointer py-3">
          {t("Veri hakkında")}
        </summary>
        <p className="max-w-prose leading-relaxed">
          {curve.nonBrand
            ? t(
                "Marka dışı sorgularınızın her sıradaki tıklama oranı. Bir sırada en az {queries} sorgu ve {impressions} gösterim yoksa o sıra hesaba katılmaz; tahmin yapılmaz.",
                {
                  queries: INSIGHT_RULES.curveMinQueries,
                  impressions: formatCount(
                    view.insights.thresholds.curveBucketMinImpressions,
                  ),
                },
              )
            : t(
                "Sorgularınızın her sıradaki tıklama oranı (marka adları tanımlanmadığı için marka aramaları dahil). Bir sırada en az {queries} sorgu ve {impressions} gösterim yoksa o sıra hesaba katılmaz; tahmin yapılmaz.",
                {
                  queries: INSIGHT_RULES.curveMinQueries,
                  impressions: formatCount(
                    view.insights.thresholds.curveBucketMinImpressions,
                  ),
                },
              )}
        </p>
      </details>
    </div>
  );
}

/**
 * Where clicks can be won without new content: queries just off the top,
 * results seen but under-clicked for their position, and pages Google shows
 * that nobody clicks. Every gain is measured against the site's own CTR
 * curve, shown at the end.
 */
export function OpportunitiesTab({
  projectId,
  view,
  segmentFiltered,
  onOpen,
}: {
  projectId: string;
  view: SearchPerformanceView;
  segmentFiltered: boolean;
  onOpen: (target: DrillTarget) => void;
}) {
  const { striking, snippets, zeroClickPages, thresholds } = view.insights;
  // Over every striking query, not only the rows listed below.
  // Gains are clicks over this window, the same window the dashboard and
  // the report state; Opportunities scales its own to a month and says so.
  const windowNote = t("Dönem: {start} – {end}.", {
    start: formatDate(view.window.startDate),
    end: formatDate(view.window.endDate),
  });
  const empty = strikingEmptyCopy({
    filtered: false,
    hasQueryData: view.coverage.queries.rows > 0,
    segmentFiltered,
    minImpressions: thresholds.strikingMinImpressions,
    brandExcluded: view.insights.brandState.terms.length > 0,
  });

  return (
    <div className="flex flex-col divide-y divide-[var(--hairline)]">
      <Section
        title={t("Bir üst sıra bandına çıkabilecek sorgular")}
        description={
          striking.total > 0
            ? [
                strikingEstimateText(striking.estimate),
                windowNote,
                strikingMethodText(
                  view.insights.brandState.source,
                  view.coverage.queries.truncated,
                ),
              ].join(" ")
            : undefined
        }
        note={
          striking.total > striking.rows.length
            ? t("En büyük kazançlı {shown} tanesi listeleniyor.", {
                shown: striking.rows.length,
              })
            : undefined
        }
      >
        {striking.rows.length === 0 ? (
          <div className="px-4">
            <EmptyState compact icon={Target} title={empty.title} />
            <details className="text-sm text-muted">
              <summary className="min-h-11 cursor-pointer py-3">
                {t("Veri hakkında")}
              </summary>
              <p className="max-w-prose leading-relaxed">{empty.description}</p>
            </details>
          </div>
        ) : (
          <StrikingTable
            projectId={projectId}
            rows={striking.rows}
            onOpen={onOpen}
          />
        )}
      </Section>

      <Section
        title={t("Sırasına göre az tıklanan sonuçlar")}
        description={t(
          "Tıklama oranı, sitenizde aynı sıradaki sonuçların ortalamasının {share} kadarından az olan ve en az {impressions} gösterim alan sorgular. Başlık ve açıklama yeniden yazılarak kazanılabilir.",
          {
            share: formatPercent(INSIGHT_RULES.snippetCtrRatio, 0),
            impressions: formatCount(thresholds.snippetMinImpressions),
          },
        )}
      >
        {snippets.length === 0 ? (
          <p className="px-4 pb-4 text-sm text-muted">
            {t(
              "Sırasına göre belirgin biçimde az tıklanan sonuç yok ya da karşılaştırma için yeterli veri yok.",
            )}
          </p>
        ) : (
          <>
            <ul className="divide-y divide-[var(--hairline)] border-t border-[var(--hairline)] sm:hidden">
              {snippets.slice(0, 25).map((row) => (
                <li key={row.query}>
                  <button
                    type="button"
                    className="flex min-h-11 w-full flex-col gap-0.5 px-4 py-2.5 text-left hover:bg-base-200/50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
                    onClick={() =>
                      onOpen({ dimension: "query", key: row.query })
                    }
                  >
                    <span className="text-sm font-medium [overflow-wrap:anywhere]">
                      {row.query}
                    </span>
                    <span className="text-xs tabular-nums text-muted">
                      {t(
                        "Sıra {position} · tıklama oranı {ctr} (bu sırada {expected}) · {gain}",
                        {
                          position: formatDecimal(row.position),
                          ctr: formatPercent(row.ctr),
                          expected: formatPercent(row.expectedCtr),
                          gain: gainText(row.gainClicks),
                        },
                      )}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="hidden overflow-x-auto sm:block">
              <table className="table table-sm">
                <caption className="sr-only">
                  {t("Sırasına göre az tıklanan sonuçlar")}
                </caption>
                <thead>
                  <tr className="text-muted">
                    <th scope="col">{t("Sorgu")}</th>
                    <th scope="col" className="text-right">
                      {t("Sıra")}
                    </th>
                    <th scope="col" className="text-right">
                      {t("Tıklama oranı")}
                    </th>
                    <th scope="col" className="text-right">
                      {t("Bu sırada beklenen")}
                    </th>
                    <th scope="col" className="text-right">
                      {t("Olası kazanç (en fazla)")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {snippets.slice(0, 25).map((row) => (
                    <tr key={row.query}>
                      <td className="max-w-0 w-full">
                        <KeyButton
                          label={row.query}
                          title={row.query}
                          onClick={() =>
                            onOpen({ dimension: "query", key: row.query })
                          }
                        />
                        {row.page ? (
                          <span className="block truncate text-[11px] text-subtle">
                            {shortPage(row.page)}
                          </span>
                        ) : null}
                      </td>
                      <td className="text-right tabular-nums">
                        {formatDecimal(row.position)}
                      </td>
                      <td className="text-right tabular-nums">
                        {formatPercent(row.ctr)}
                      </td>
                      <td className="text-right tabular-nums">
                        {formatPercent(row.expectedCtr)}
                      </td>
                      <td className="whitespace-nowrap text-right font-medium tabular-nums text-[var(--ink-success)]">
                        {gainText(row.gainClicks)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </Section>

      <Section
        title={t("Görünen ama hiç tıklanmayan sayfalar")}
        description={t(
          "Bu dönemde en az {impressions} gösterim alıp tek tıklama almayan sayfalar.",
          { impressions: formatCount(thresholds.zeroClickMinImpressions) },
        )}
        note={
          zeroClickPages.total > zeroClickPages.rows.length
            ? t("{shown} / {total} sayfa listeleniyor.", {
                shown: zeroClickPages.rows.length,
                total: zeroClickPages.total,
              })
            : undefined
        }
      >
        {zeroClickPages.rows.length === 0 ? (
          <p className="px-4 pb-4 text-sm text-muted">
            {t("Gösterim alıp hiç tıklanmayan sayfa yok.")}
          </p>
        ) : (
          <ul className="divide-y divide-[var(--hairline)] px-4 pb-2">
            {zeroClickPages.rows.slice(0, 25).map((row) => (
              <li
                key={row.page}
                className="flex items-start justify-between gap-3 py-2 text-sm"
              >
                <span className="min-w-0 flex-1">
                  <KeyButton
                    label={shortPage(row.page)}
                    title={row.page}
                    onClick={() => onOpen({ dimension: "page", key: row.page })}
                  />
                </span>
                <span className="shrink-0 text-right text-xs tabular-nums text-muted">
                  {t("{impressions} gösterim", {
                    impressions: formatCount(row.impressions),
                  })}
                  <br />
                  {t("sıra {position}", {
                    position: formatDecimal(row.position),
                  })}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section
        title={t("Sitenizin sıraya göre tıklama oranı")}
        description={t(
          "Yukarıdaki kazançların ölçüsü: başka sitelerin değil, sizin sonuçlarınızın her sıradaki tıklama oranı.",
        )}
      >
        <div className="px-4 pb-4">
          <CtrCurve view={view} />
        </div>
      </Section>
    </div>
  );
}
