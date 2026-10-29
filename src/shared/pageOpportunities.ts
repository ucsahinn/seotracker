/**
 * How many more clicks a month each page could bring, and what kind of work
 * gets them.
 *
 * The Opportunities screen used to rank pages by a percentile mix of demand,
 * business value and "reachability", where reachability rewarded a better
 * position. A page already at #1 with a 55% click-through scored near the top
 * and was told "emek çabuk karşılık verir"; the one number an owner needs --
 * extra clicks if this page is fixed -- was not on the screen at all.
 *
 * This works at query x page level with the engine Search performance already
 * uses (`searchInsights.ts`): the site's own CTR curve by position band,
 * brand queries split out, `clicksAtCtr` for the estimate and the snippet and
 * striking-distance thresholds as they are. Per page:
 *
 * - snippet: a query on page one whose click-through sits below 70% of what
 *   the site's non-brand queries earn at that position. The gain is reaching
 *   that site CTR at the same position -- title and description work.
 * Every other query moves ONE band up the site's CTR curve, no further
 * (`strikingTargetBand`, the same rule as striking distance, so the two
 * screens give one number):
 * - page1 (4-10): 4-5 aims at 2-3, 6-10 at 4-5.
 * - page2 (11-20): page one (the site's CTR at 6-10).
 * - deep (21+): page two (11-20). Usually a merge-or-drop decision; the
 *   number says whether it is worth one.
 *
 * A page's total is then capped at what its queries would earn if each
 * position-band group of them moved one band up (per group: its non-brand
 * impressions x the target CTR, minus its clicks), so many small query gains
 * cannot add up past what the page could plausibly reach. Grouped rather than
 * read from the page's single average position: a page at #2 on its head
 * query and #15 on the rest averages near the top, and the average would
 * zero the real upside of the tail. The figure is an upper bound and the
 * screen labels it so.
 *
 * Brand queries are skipped: someone typing the brand finds the site anyway,
 * and their click-through would make every other query look like a gap.
 *
 * Pages with a measured zero gain are counted but not listed. Pages whose
 * gain is unknown retain their observed metrics and a position-based suggestion.
 * Sibling imports stay relative, like the rest of `shared/`.
 */
import { bandOf } from "./positionBands";
import { sortBy } from "remeda";
import { allocateGain } from "./opportunityAllocation";
import {
  clicksAtCtr,
  ctrBandFor,
  ctrCurve,
  expectedCtr,
  INSIGHT_RULES,
  isBrandQuery,
  strikingTargetBand,
  thresholdsFor,
  type CtrBandId,
  type MetricRow,
  type QueryPageRow,
} from "./searchInsights";

export const WORK_KINDS = ["snippet", "page1", "page2", "deep"] as const;
export type WorkKind = (typeof WORK_KINDS)[number];

export type QueryUpside = {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  work: WorkKind;
  /** The click-through the estimate assumes this query reaches. */
  targetCtr: number;
  /** Extra clicks over the window. */
  gain: number;
  allocatedGain?: number;
  gainPerMonth?: number;
  targetBand?: CtrBandId;
};

export type PageOpportunity = {
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  /** Extra clicks over the window, summed over the page's queries. */
  gain: number | null;
  gainStatus?: "estimated" | "unknown";
  gainReason?:
    | "belowThreshold"
    | "insufficientTargetCurve"
    | "missingQueryPairs"
    | null;
  brandOnly?: boolean;
  /** Observed non-brand queries, ranked by impressions; no implied gain. */
  observedQueries?: QueryPageRow[];
  gainByWork: Record<WorkKind, number>;
  /** The kind of work that holds most of the gain. */
  work: WorkKind;
  /**
   * The page's non-brand click-through and what the site's non-brand
   * queries earn at the same position, both null when unknown.
   */
  nonBrandCtr: number | null;
  siteCtr: number | null;
  /** The queries behind the gain, largest first. */
  queries: QueryUpside[];
  /** True when the page cap cut the summed query gains. */
  capped: boolean;
  queryCount?: number;
  otherQueryGain?: number;
  otherQueryGainPerMonth?: number;
  comparableImpressions?: number;
  missingCurveImpressions?: number;
};

type PageOpportunityResult = {
  pages: PageOpportunity[];
  /** Pages Google showed that have nothing to gain (top and clicked). */
  noGainPages: number;
  reasons: Record<
    | "calculablePositive"
    | "calculableZero"
    | "belowThreshold"
    | "insufficientTargetCurve"
    | "missingQueryPairs",
    number
  >;
  /** Which curve the expectations were read from. */
  curve: "nonBrand" | "all";
  /** True when no band has enough data for any estimate at all. */
  curveInsufficient: boolean;
};

/** Queries kept per page for the detail panel. */

function zeroByWork(): Record<WorkKind, number> {
  return { snippet: 0, page1: 0, page2: 0, deep: 0 };
}

type Curve = ReturnType<typeof ctrCurve>;

/** The gain and kind of work for one query on one page, or null when none. */
function queryUpside(
  row: Omit<QueryPageRow, "page">,
  curve: Curve,
  thresholds: { snippetMinImpressions: number; strikingMinImpressions: number },
): QueryUpside | null {
  if (!(row.position > 0) || row.impressions <= 0) return null;
  const ctr = row.clicks / row.impressions;
  const base = {
    query: row.query,
    clicks: row.clicks,
    impressions: row.impressions,
    ctr,
    position: row.position,
  };
  const band = bandOf(row.position);

  // Page one first: a snippet gap there is the cheapest work on the screen.
  if (
    Math.round(row.position) <= INSIGHT_RULES.snippetMaxPosition &&
    row.impressions >= thresholds.snippetMinImpressions
  ) {
    const expected = expectedCtr(curve, ctrBandFor(row.position));
    if (expected !== null && ctr < expected * INSIGHT_RULES.snippetCtrRatio) {
      const gain = clicksAtCtr(row, expected);
      if (gain >= INSIGHT_RULES.snippetMinGain) {
        return { ...base, work: "snippet", targetCtr: expected, gain };
      }
    }
  }

  if (band === "top3") return null;
  if (row.impressions < thresholds.strikingMinImpressions) return null;
  const work: Exclude<WorkKind, "snippet"> =
    band === "top10" ? "page1" : band === "top20" ? "page2" : "deep";
  const target = expectedCtr(curve, strikingTargetBand(row.position));
  if (target === null) return null;
  const gain = clicksAtCtr(row, target);
  return gain > 0 ? { ...base, work, targetCtr: target, gain } : null;
}

/** The band a query is capped at: one up, or its own in the top three. */
function capBand(position: number): CtrBandId | null {
  // In the top three there is no band up to aim at; the query's own band is
  // the most it could earn (what a snippet fix reaches).
  return position < 3.5 ? ctrBandFor(position) : strikingTargetBand(position);
}

/**
 * The most a page could gain as a whole: its queries grouped by the band
 * they would move to, and per group the group's impressions at that band's
 * site CTR minus the group's clicks. A group whose band has no curve point
 * cannot be capped, so it passes its own query gains through.
 */
function pageCap(
  rows: readonly QueryPageRow[],
  queries: readonly QueryUpside[],
  curve: Curve,
): number {
  const groups = new Map<
    CtrBandId | null,
    { clicks: number; impressions: number; gain: number }
  >();
  const groupOf = (position: number) => {
    const band = position > 0 ? capBand(position) : null;
    const group = groups.get(band) ?? { clicks: 0, impressions: 0, gain: 0 };
    groups.set(band, group);
    return group;
  };
  for (const row of rows) {
    const group = groupOf(row.position);
    group.clicks += row.clicks;
    group.impressions += row.impressions;
  }
  for (const query of queries) groupOf(query.position).gain += query.gain;
  let cap = 0;
  for (const [band, group] of groups) {
    const target = expectedCtr(curve, band);
    cap += target === null ? group.gain : clicksAtCtr(group, target);
  }
  return cap;
}

export function pageOpportunities(input: {
  days: number;
  /** Query rows (all pages) for the CTR curve, as Search performance reads it. */
  queries: readonly MetricRow[];
  queryPages: readonly QueryPageRow[];
  /** Page rows: the page's own totals, anonymised queries included. */
  pages: readonly MetricRow[];
  brandTerms: readonly string[];
}): PageOpportunityResult {
  const thresholds = thresholdsFor(input.days);
  const branded = input.brandTerms.length > 0;
  const isBrand = (query: string) =>
    branded && isBrandQuery(query, input.brandTerms);
  const curve = ctrCurve(
    input.queries.filter((row) => !isBrand(row.key)),
    thresholds.curveBucketMinImpressions,
  );

  const byPage = new Map<string, QueryPageRow[]>();
  const brandPages = new Set<string>();
  for (const row of input.queryPages) {
    if (isBrand(row.query)) {
      if (row.impressions > 0) brandPages.add(row.page);
      continue;
    }
    if (row.impressions <= 0) continue;
    const list = byPage.get(row.page);
    if (list) list.push(row);
    else byPage.set(row.page, [row]);
  }

  const pages: PageOpportunity[] = [];
  const reasons = {
    calculablePositive: 0,
    calculableZero: 0,
    belowThreshold: 0,
    insufficientTargetCurve: 0,
    missingQueryPairs: 0,
  };
  let noGainPages = 0;
  for (const pageRow of input.pages) {
    if (pageRow.impressions <= 0) continue;
    const rows = byPage.get(pageRow.key) ?? [];
    const unknown =
      rows.length === 0
        ? "missingQueryPairs"
        : rows.some(
              (row) =>
                row.impressions >= thresholds.strikingMinImpressions &&
                expectedCtr(curve, capBand(row.position)) === null,
            )
          ? "insufficientTargetCurve"
          : rows.every(
                (row) =>
                  row.impressions <
                  Math.min(
                    thresholds.snippetMinImpressions,
                    thresholds.strikingMinImpressions,
                  ),
              )
            ? "belowThreshold"
            : null;
    if (unknown) reasons[unknown] += 1;
    const addUnknownPage = () => {
      if (unknown) {
        pages.push({
          page: pageRow.key,
          clicks: pageRow.clicks,
          impressions: pageRow.impressions,
          ctr: pageRow.clicks / pageRow.impressions,
          position: pageRow.position,
          gain: null,
          gainStatus: "unknown",
          gainReason: unknown,
          brandOnly: rows.length === 0 && brandPages.has(pageRow.key),
          observedQueries: sortBy(rows, [(row) => row.impressions, "desc"]),
          gainByWork: zeroByWork(),
          work:
            pageRow.position <= 5
              ? "snippet"
              : pageRow.position <= 10
                ? "page1"
                : pageRow.position <= 20
                  ? "page2"
                  : "deep",
          nonBrandCtr: null,
          siteCtr: null,
          queries: [],
          capped: false,
        });
      }
    };
    const gainByWork = zeroByWork();
    const queries: QueryUpside[] = [];
    for (const row of rows) {
      const upside = queryUpside(row, curve, thresholds);
      if (!upside) continue;
      gainByWork[upside.work] += upside.gain;
      queries.push(upside);
    }
    const raw = WORK_KINDS.reduce((sum, kind) => sum + gainByWork[kind], 0);
    if (raw <= 0) {
      addUnknownPage();
      if (!unknown) {
        noGainPages += 1;
        reasons.calculableZero += 1;
      }
      continue;
    }
    queries.sort((a, b) => b.gain - a.gain);
    const comparable = rows.filter(
      (row) => expectedCtr(curve, ctrBandFor(row.position)) !== null,
    );
    const comparableImpressions = comparable.reduce(
      (sum, row) => sum + row.impressions,
      0,
    );
    const expectedClicks = comparable.reduce(
      (sum, row) =>
        sum +
        row.impressions * (expectedCtr(curve, ctrBandFor(row.position)) ?? 0),
      0,
    );
    const work = WORK_KINDS.reduce((best, kind) =>
      gainByWork[kind] > gainByWork[best] ? kind : best,
    );
    const gain = Math.min(raw, pageCap(rows, queries, curve));
    if (gain <= 0) {
      addUnknownPage();
      if (!unknown) {
        noGainPages += 1;
        reasons.calculableZero += 1;
      }
      continue;
    }
    reasons.calculablePositive += 1;
    const allocation = allocateGain(
      WORK_KINDS.map((kind) => gainByWork[kind]),
      gain,
    );
    WORK_KINDS.forEach((kind, index) => {
      gainByWork[kind] = allocation[index];
    });
    // Allocate within each work group so query and work contributions agree.
    for (const kind of WORK_KINDS) {
      const group = queries.filter((query) => query.work === kind);
      const values = allocateGain(
        group.map((query) => query.gain),
        gainByWork[kind],
      );
      group.forEach((query, index) => {
        query.allocatedGain = values[index];
        query.targetBand =
          (query.work === "snippet"
            ? ctrBandFor(query.position)
            : capBand(query.position)) ?? undefined;
      });
    }
    const monthly = allocateGain(
      queries.map((query) => query.allocatedGain ?? 0),
      perMonth(gain, input.days),
    );
    queries.forEach((query, index) => {
      query.gainPerMonth = monthly[index];
    });
    pages.push({
      page: pageRow.key,
      clicks: pageRow.clicks,
      impressions: pageRow.impressions,
      ctr: pageRow.impressions > 0 ? pageRow.clicks / pageRow.impressions : 0,
      position: pageRow.position,
      gain,
      gainStatus: "estimated",
      gainReason: null,
      gainByWork,
      work,
      nonBrandCtr:
        comparableImpressions > 0
          ? comparable.reduce((sum, row) => sum + row.clicks, 0) /
            comparableImpressions
          : null,
      siteCtr:
        comparableImpressions > 0
          ? expectedClicks / comparableImpressions
          : null,
      comparableImpressions,
      missingCurveImpressions:
        rows.reduce((sum, row) => sum + row.impressions, 0) -
        comparableImpressions,
      queryCount: queries.length,
      otherQueryGain: 0,
      otherQueryGainPerMonth: 0,
      queries,
      capped: gain < raw,
    });
  }
  pages.sort(
    (a, b) =>
      Number(a.gain === null) - Number(b.gain === null) ||
      (b.gain ?? 0) - (a.gain ?? 0) ||
      b.impressions - a.impressions,
  );
  return {
    pages,
    noGainPages,
    reasons,
    curve: branded ? "nonBrand" : "all",
    curveInsufficient: !curve.some((point) => point.sufficient),
  };
}

/** A window's gain as a month of thirty days, which is what the screen says. */
export function perMonth(gain: number, days: number): number {
  return days > 0 ? Math.round((gain * 30) / days) : 0;
}
