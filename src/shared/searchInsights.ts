/* eslint-disable max-lines -- every insight rule and its threshold side by side, one pure module the screen, report and MCP share */
/**
 * Every finding the Search performance screen draws from Search Console rows.
 *
 * Pure functions over rows the server already fetched, so each rule is tested
 * on a fixture that should trip it and one that should not. Nothing here
 * reaches for data Search Console does not have: there are no volumes, no
 * competitors and no third-party CTR curve. The expected click-through rate is
 * this site's own, measured per position band, and where the site has too
 * little data in a band the answer is `null` -- never an interpolation.
 *
 * Conventions:
 * - ctr is clicks / impressions (0..1); `null` when there were no impressions.
 * - position is Google's impression-weighted average; lower is better.
 * - Thresholds are written for a 28-day window and scaled to the window
 *   actually shown (`scaleThreshold`), so a 7-day view does not demand four
 *   weeks' worth of impressions and a 3-month view is not flooded.
 *
 * Sibling imports stay relative, like the rest of `shared/`.
 */
import { sort, sortBy } from "remeda";

export type MetricRow = {
  key: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

export type QueryPageRow = {
  query: string;
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

/** A row set and whether Google had more rows than were read. */
export type RowSet<T> = { rows: T[]; truncated: boolean };

type Confidence = "high" | "medium" | "low";

// ---------------------------------------------------------------------------
// Thresholds
// ---------------------------------------------------------------------------

/** Written for 28 days; see `scaleThreshold`. */
const INSIGHT_THRESHOLDS_28D = {
  strikingMinImpressions: 50,
  snippetMinImpressions: 200,
  curveBucketMinImpressions: 500,
  moverMinClicks: 10,
  newLostMinImpressions: 50,
  zeroClickMinImpressions: 100,
  gapMinImpressions: 200,
} as const;

/**
 * Not window-dependent.
 *
 * One invariant across Search performance (striking distance, snippets), the
 * Opportunities screen (`pageOpportunities.ts`) and the dashboard card: the
 * same formula (`clicksAtCtr` at the site's own non-brand CTR, one band up),
 * the same filters (brand queries excluded, these thresholds) and the same
 * minimum impressions (`thresholdsFor`). Units and windows may differ --
 * Opportunities speaks per month -- but each screen states its own.
 */
export const INSIGHT_RULES = {
  /** A band needs this many distinct queries before its CTR is a curve point. */
  curveMinQueries: 5,
  /** Striking distance: average position rounded into 4..20. */
  strikingMinPosition: 4,
  strikingMaxPosition: 20,
  /** A snippet under-performs below this share of its band's site CTR. */
  snippetCtrRatio: 0.7,
  /** Snippet work is page-one work: rounded position at most this. */
  snippetMaxPosition: 10,
  snippetMinGain: 3,
  /** A mover needs this many clicks of change, and this share of its base. */
  moverMinChange: 3,
  moverMinRelative: 0.2,
  /** Content decay: quarter clicks vs the best of the four before it. */
  decayPeakMinClicks: 30,
  decayMaxShareOfPeak: 0.7,
  decayMinLoss: 15,
  decayQuarterDays: 91,
  /** Index of the quarter a year before the newest (4 x 91 = 364 days). */
  decayYearAgoQuarter: 4,
  /** A device or country gap: this share of impressions at least. */
  gapMinImpressionShare: 0.05,
  countryGapMinImpressionShare: 0.02,
  gapCtrRatio: 0.7,
  gapPositionPlaces: 3,
  /** Anomalies: robust z-score on same-weekday history. */
  anomalyZ: 3.5,
  anomalyMinHistory: 4,
  anomalyHistoryWeeks: 8,
  anomalyMinDeviation: 5,
  anomalyMinRelative: 0.25,
  longTailMinWords: 4,
  listLimit: 100,
  todoLimit: 30,
} as const;

/** A 28-day threshold re-expressed for a window of `days` days. */
export function scaleThreshold(base: number, days: number): number {
  return Math.max(1, Math.round((base * days) / 28));
}

export type InsightThresholds = {
  -readonly [K in keyof typeof INSIGHT_THRESHOLDS_28D]: number;
};

export function thresholdsFor(days: number): InsightThresholds {
  const base = INSIGHT_THRESHOLDS_28D;
  return {
    strikingMinImpressions: scaleThreshold(base.strikingMinImpressions, days),
    snippetMinImpressions: scaleThreshold(base.snippetMinImpressions, days),
    curveBucketMinImpressions: scaleThreshold(
      base.curveBucketMinImpressions,
      days,
    ),
    moverMinClicks: scaleThreshold(base.moverMinClicks, days),
    newLostMinImpressions: scaleThreshold(base.newLostMinImpressions, days),
    zeroClickMinImpressions: scaleThreshold(base.zeroClickMinImpressions, days),
    gapMinImpressions: scaleThreshold(base.gapMinImpressions, days),
  };
}

// ---------------------------------------------------------------------------
// Metrics
// ---------------------------------------------------------------------------

export type SearchMetrics = {
  clicks: number;
  impressions: number;
  /** null when there were no impressions to divide by. */
  ctr: number | null;
  /** Impression-weighted; null when there were no impressions. */
  position: number | null;
};

/**
 * Clicks and impressions summed, CTR recomputed from them, position weighted
 * by impressions. Only for rows that partition the same traffic (days of one
 * property, or one segment of query rows) -- never to turn a page or query
 * table into a site total.
 */
export function combineMetrics(
  rows: ReadonlyArray<{
    clicks: number;
    impressions: number;
    position: number;
  }>,
): SearchMetrics {
  let clicks = 0;
  let impressions = 0;
  let weighted = 0;
  for (const row of rows) {
    clicks += row.clicks;
    impressions += row.impressions;
    weighted += row.position * row.impressions;
  }
  return {
    clicks,
    impressions,
    ctr: impressions > 0 ? clicks / impressions : null,
    position: impressions > 0 ? weighted / impressions : null,
  };
}

function ctrOf(row: { clicks: number; impressions: number }): number {
  return row.impressions > 0 ? row.clicks / row.impressions : 0;
}

// ---------------------------------------------------------------------------
// Text folding (brand terms, questions)
// ---------------------------------------------------------------------------

/**
 * Lowercase, strip diacritics and collapse punctuation, so "Örnek-Site" and
 * "ornek site" compare equal. Turkish dotless ı and dotted İ have no Unicode
 * decomposition to a plain i, so they are mapped by hand.
 */
export function foldText(value: string): string {
  return value
    .replace(/İ/g, "i")
    .replace(/I/g, "i")
    .toLowerCase()
    .replace(/ı/g, "i")
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

// ---------------------------------------------------------------------------
// Brand
// ---------------------------------------------------------------------------

/**
 * True when the query contains one of the terms, folded and on word
 * boundaries. A multi-word term also matches typed without its spaces
 * ("orneksite" for "ornek site"); a single-word term never matches inside
 * another word, or "ford" would claim "afford" and "shop" "workshop".
 */
export function isBrandQuery(query: string, terms: readonly string[]): boolean {
  const folded = ` ${foldText(query)} `;
  const compact = folded.replace(/ /g, "");
  return terms.some((term) => {
    const t = foldText(term);
    if (!t) return false;
    if (folded.includes(` ${t} `)) return true;
    if (!t.includes(" ")) return false;
    const glued = t.replace(/ /g, "");
    // A glued match on a short term ("a b") would catch unrelated words.
    return glued.length >= 4 && compact.includes(glued);
  });
}

/*
 * Second-level labels that are part of a country's public suffix
 * ("example.co.uk", "ornek.com.tr"). A project's domain is saved as the
 * registrable domain already (`normalizeDomainInput`), but a Search Console
 * property or an older project can still carry a subdomain. A heuristic
 * rather than the public suffix list: this module is bundled into the client
 * too.
 */
const SECOND_LEVEL_SUFFIXES = new Set([
  "co",
  "com",
  "org",
  "net",
  "gov",
  "edu",
  "ac",
  "gen",
  "biz",
  "info",
  "web",
  "ltd",
  "plc",
  "ne",
  "or",
]);

/** The registrable label of a host: "blog.example.co.uk" -> "example". */
function registrableLabel(host: string): string {
  const labels = host.split(".").filter(Boolean);
  if (labels.length <= 1) return labels[0] ?? "";
  const last = labels[labels.length - 1] ?? "";
  const second = labels[labels.length - 2] ?? "";
  const suffixLength =
    labels.length >= 3 && last.length === 2 && SECOND_LEVEL_SUFFIXES.has(second)
      ? 2
      : 1;
  const owned = labels.slice(0, labels.length - suffixLength);
  // The last label before the suffix: "blog." or "shop." in front is a
  // part of the site, not its name.
  return owned[owned.length - 1] ?? "";
}

/**
 * Brand-term suggestions from the project's domain and name. Until the
 * operator confirms terms they stand in for them (`effectiveBrandTerms`),
 * and every surface says the split runs on suggestions.
 */
export function suggestBrandTerms(
  domain: string | null,
  name: string | null,
): string[] {
  const out: string[] = [];
  const push = (value: string) => {
    const v = value.trim().toLowerCase();
    if (v.length >= 2 && !out.includes(v)) out.push(v);
  };
  if (domain) {
    const host = domain
      .replace(/^[a-z]+:\/\//i, "")
      .replace(/^sc-domain:/i, "")
      .replace(/^www\./i, "")
      .split(/[/:?#]/)[0];
    const label = registrableLabel(host ?? "");
    if (label) {
      push(label.replace(/[-_]+/g, " "));
      push(label.replace(/[-_]+/g, ""));
    }
  }
  if (name) push(name);
  return out;
}

/**
 * The brand terms the insights actually use: the confirmed ones, or until
 * there are any, the ones suggested from the domain and project name. Both
 * Search performance and Opportunities read brand through this, so the two
 * screens never judge the same query against different curves; each says
 * which source it used.
 */
export function effectiveBrandTerms(
  confirmed: readonly string[],
  suggestions: readonly string[],
): { terms: string[]; source: BrandSource } {
  if (confirmed.length > 0)
    return { terms: [...confirmed], source: "confirmed" };
  if (suggestions.length > 0) {
    return { terms: [...suggestions], source: "suggested" };
  }
  return { terms: [], source: "none" };
}

/** Where the brand terms in use came from. */
type BrandSource = "confirmed" | "suggested" | "none";

type BrandSegment = SearchMetrics & { queries: number };

export type BrandSplit =
  | { status: "unset"; suggestions: string[] }
  | {
      status: "set";
      terms: string[];
      brand: BrandSegment;
      nonBrand: BrandSegment;
    };

export function brandSplit(
  queries: readonly MetricRow[],
  terms: readonly string[],
  suggestions: string[],
): BrandSplit {
  if (terms.length === 0) return { status: "unset", suggestions };
  const brand: MetricRow[] = [];
  const nonBrand: MetricRow[] = [];
  for (const row of queries) {
    (isBrandQuery(row.key, terms) ? brand : nonBrand).push(row);
  }
  return {
    status: "set",
    terms: [...terms],
    brand: { ...combineMetrics(brand), queries: brand.length },
    nonBrand: { ...combineMetrics(nonBrand), queries: nonBrand.length },
  };
}

// ---------------------------------------------------------------------------
// The site's own CTR curve
// ---------------------------------------------------------------------------

const CTR_BANDS = [
  { id: "1", min: 1, max: 1.5 },
  { id: "2-3", min: 1.5, max: 3.5 },
  { id: "4-5", min: 3.5, max: 5.5 },
  { id: "6-10", min: 5.5, max: 10.5 },
  { id: "11-20", min: 10.5, max: 20.5 },
] as const;
export type CtrBandId = (typeof CTR_BANDS)[number]["id"];

export function ctrBandFor(position: number): CtrBandId | null {
  if (!(position >= 1)) return null;
  return (
    CTR_BANDS.find((band) => position >= band.min && position < band.max)?.id ??
    null
  );
}

type CtrCurvePoint = {
  band: CtrBandId;
  queries: number;
  clicks: number;
  impressions: number;
  /** Null when the band has no impressions. */
  ctr: number | null;
  /** Enough queries and impressions for the CTR to be used as "expected". */
  sufficient: boolean;
};

export type CtrCurve = {
  all: CtrCurvePoint[];
  /** Null when there are no brand terms, confirmed or suggested. */
  brand: CtrCurvePoint[] | null;
  nonBrand: CtrCurvePoint[] | null;
};

export function ctrCurve(
  queries: readonly MetricRow[],
  minImpressions: number,
): CtrCurvePoint[] {
  return CTR_BANDS.map((band) => {
    const rows = queries.filter(
      (row) => row.position >= band.min && row.position < band.max,
    );
    const metrics = combineMetrics(rows);
    return {
      band: band.id,
      queries: rows.length,
      clicks: metrics.clicks,
      impressions: metrics.impressions,
      ctr: metrics.ctr,
      sufficient:
        rows.length >= INSIGHT_RULES.curveMinQueries &&
        metrics.impressions >= minImpressions,
    };
  });
}

/**
 * Clicks a row would have earned at `ctr`, beyond what it earned: the one
 * "potential clicks" formula behind striking distance, snippets and the
 * Opportunities screen, so the three never estimate the same row twice.
 */
export function clicksAtCtr(
  row: { impressions: number; clicks: number },
  ctr: number,
): number {
  return Math.max(0, Math.round(row.impressions * ctr - row.clicks));
}

/**
 * The band a query's gain is estimated for: ONE step up the site's CTR
 * curve from where it is, never further. Positions 4-5 aim at 2-3, 6-10 at
 * 4-5, page two (11-20) at page one (6-10), further back at page two
 * (11-20). Estimating every query for 2-3 summed to more than the demo
 * site's whole traffic -- a ceiling nobody can plan with. Rounded like the
 * bands.
 */
export function strikingTargetBand(position: number): CtrBandId {
  const rounded = Math.round(position);
  if (rounded <= 5) return "2-3";
  if (rounded <= 10) return "4-5";
  if (rounded <= 20) return "6-10";
  return "11-20";
}

/** The band's CTR when it is sufficient; never interpolated across bands. */
export function expectedCtr(
  curve: readonly CtrCurvePoint[],
  band: CtrBandId | null,
): number | null {
  if (!band) return null;
  const point = curve.find((p) => p.band === band);
  return point?.sufficient && point.ctr !== null ? point.ctr : null;
}

// ---------------------------------------------------------------------------
// Striking distance
// ---------------------------------------------------------------------------

export type StrikingQuery = {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  /** The query's own aggregate position (all pages), the selection basis. */
  position: number;
  /** Best-ranking page for the query; null when not in the query+page rows. */
  page: string | null;
  pagePosition: number | null;
  /** Pages the query appeared on, within the query+page rows held. */
  pageCount: number;
  /**
   * Clicks gained at the target band's site CTR (one band up, see
   * `strikingTargetBand`); null when the site has too little data in that
   * band to say. An upper bound per query.
   */
  potentialClicks: number | null;
  /** The band the gain is estimated for. */
  targetBand: CtrBandId;
};

/** Each query's best page: lowest position, ties to more impressions. */
function bestPageByQuery(
  rows: readonly QueryPageRow[],
): Map<string, { page: string; position: number; pageCount: number }> {
  const out = new Map<
    string,
    { page: string; position: number; impressions: number; pageCount: number }
  >();
  for (const row of rows) {
    const current = out.get(row.query);
    if (!current) {
      out.set(row.query, {
        page: row.page,
        position: row.position,
        impressions: row.impressions,
        pageCount: 1,
      });
      continue;
    }
    current.pageCount += 1;
    if (
      row.position < current.position ||
      (row.position === current.position &&
        row.impressions > current.impressions)
    ) {
      current.page = row.page;
      current.position = row.position;
      current.impressions = row.impressions;
    }
  }
  return out;
}

function roundedIn(position: number, min: number, max: number): boolean {
  const rounded = Math.round(position);
  return position > 0 && rounded >= min && rounded <= max;
}

/** Is this query in striking distance (query-level position, enough impressions)? */
function isStriking(row: MetricRow, minImpressions: number): boolean {
  return (
    row.impressions >= minImpressions &&
    roundedIn(
      row.position,
      INSIGHT_RULES.strikingMinPosition,
      INSIGHT_RULES.strikingMaxPosition,
    )
  );
}

export type StrikingResult = {
  /** The largest gains first, at most `INSIGHT_RULES.listLimit`. */
  rows: StrikingQuery[];
  /** Every striking query, not only the rows listed. */
  total: number;
  /** Summed known gain over every striking query, not only the rows listed. */
  totalGain: number;
  estimate: {
    knownGainCount: number;
    unknownGainCount: number;
    knownGainSum: number | null;
    complete: boolean;
  };
};

export function strikingDistance(
  queries: readonly MetricRow[],
  queryPages: readonly QueryPageRow[],
  curve: readonly CtrCurvePoint[],
  minImpressions: number,
  /** Brand queries are left out, as snippets and Opportunities leave them out. */
  brandTerms: readonly string[] = [],
): StrikingResult {
  const best = bestPageByQuery(queryPages);
  const rows = queries
    .filter(
      (row) =>
        isStriking(row, minImpressions) &&
        !(brandTerms.length > 0 && isBrandQuery(row.key, brandTerms)),
    )
    .map((row): StrikingQuery => {
      const page = best.get(row.key);
      const targetBand = strikingTargetBand(row.position);
      const target = expectedCtr(curve, targetBand);
      return {
        targetBand,
        query: row.key,
        clicks: row.clicks,
        impressions: row.impressions,
        ctr: ctrOf(row),
        position: row.position,
        page: page?.page ?? null,
        pagePosition: page?.position ?? null,
        pageCount: page?.pageCount ?? 0,
        potentialClicks: target === null ? null : clicksAtCtr(row, target),
      };
    });
  rows.sort(
    (a, b) =>
      (b.potentialClicks ?? -1) - (a.potentialClicks ?? -1) ||
      b.impressions - a.impressions,
  );
  return {
    rows: rows.slice(0, INSIGHT_RULES.listLimit),
    total: rows.length,
    estimate: {
      knownGainCount: rows.filter((row) => row.potentialClicks !== null).length,
      unknownGainCount: rows.filter((row) => row.potentialClicks === null)
        .length,
      knownGainSum: rows.some((row) => row.potentialClicks !== null)
        ? rows.reduce((sum, row) => sum + (row.potentialClicks ?? 0), 0)
        : null,
      complete: rows.every((row) => row.potentialClicks !== null),
    },
    totalGain: rows.reduce((sum, row) => sum + (row.potentialClicks ?? 0), 0),
  };
}

// ---------------------------------------------------------------------------
// Under-performing snippets
// ---------------------------------------------------------------------------

export type SnippetOpportunity = {
  query: string;
  page: string | null;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  band: CtrBandId;
  expectedCtr: number;
  gainClicks: number;
};

export function underperformingSnippets(input: {
  queries: readonly MetricRow[];
  queryPages: readonly QueryPageRow[];
  curve: CtrCurve;
  brandTerms: readonly string[];
  minImpressions: number;
}): SnippetOpportunity[] {
  const branded = input.brandTerms.length > 0;
  // Brand queries click far above their band; comparing a non-brand query
  // against a curve inflated by them would flag nearly every one.
  const curve = branded
    ? (input.curve.nonBrand ?? input.curve.all)
    : input.curve.all;
  const best = bestPageByQuery(input.queryPages);
  const out: SnippetOpportunity[] = [];
  for (const row of input.queries) {
    if (row.impressions < input.minImpressions) continue;
    if (Math.round(row.position) > INSIGHT_RULES.snippetMaxPosition) continue;
    if (branded && isBrandQuery(row.key, input.brandTerms)) continue;
    const band = ctrBandFor(row.position);
    const expected = expectedCtr(curve, band);
    if (!band || expected === null) continue;
    const ctr = ctrOf(row);
    if (ctr >= expected * INSIGHT_RULES.snippetCtrRatio) continue;
    const gain = clicksAtCtr(row, expected);
    if (gain < INSIGHT_RULES.snippetMinGain) continue;
    out.push({
      query: row.key,
      page: best.get(row.key)?.page ?? null,
      clicks: row.clicks,
      impressions: row.impressions,
      ctr,
      position: row.position,
      band,
      expectedCtr: expected,
      gainClicks: gain,
    });
  }
  out.sort((a, b) => b.gainClicks - a.gainClicks);
  return out.slice(0, INSIGHT_RULES.listLimit);
}

// ---------------------------------------------------------------------------
// Movers, new and lost
// ---------------------------------------------------------------------------

type MoverRow = {
  key: string;
  clicks: number;
  previousClicks: number;
  clickChange: number;
  impressions: number;
  previousImpressions: number;
  /** Null when the row had no impressions in that period. */
  position: number | null;
  previousPosition: number | null;
};

export type Movers = {
  growing: MoverRow[];
  declining: MoverRow[];
  /**
   * False when either period was truncated: rows missing from a truncated
   * set have unknown clicks, so they are left out rather than read as zero.
   */
  complete: boolean;
};

const ABSENT = { clicks: 0, impressions: 0, position: 0 };

export function movers(
  current: RowSet<MetricRow>,
  previous: RowSet<MetricRow>,
  minClicks: number,
): Movers {
  const cur = new Map(current.rows.map((r) => [r.key, r] as const));
  const prev = new Map(previous.rows.map((r) => [r.key, r] as const));
  const keys = new Set([...cur.keys(), ...prev.keys()]);
  const growing: MoverRow[] = [];
  const declining: MoverRow[] = [];
  for (const key of keys) {
    const now = cur.get(key) ?? (current.truncated ? null : ABSENT);
    const then = prev.get(key) ?? (previous.truncated ? null : ABSENT);
    if (!now || !then) continue;
    if (Math.max(now.clicks, then.clicks) < minClicks) continue;
    const change = now.clicks - then.clicks;
    if (Math.abs(change) < INSIGHT_RULES.moverMinChange) continue;
    if (
      Math.abs(change) <
      INSIGHT_RULES.moverMinRelative * Math.max(then.clicks, 1)
    )
      continue;
    const row: MoverRow = {
      key,
      clicks: now.clicks,
      previousClicks: then.clicks,
      clickChange: change,
      impressions: now.impressions,
      previousImpressions: then.impressions,
      position: now.impressions > 0 ? now.position : null,
      previousPosition: then.impressions > 0 ? then.position : null,
    };
    (change > 0 ? growing : declining).push(row);
  }
  growing.sort((a, b) => b.clickChange - a.clickChange);
  declining.sort((a, b) => a.clickChange - b.clickChange);
  return {
    growing: growing.slice(0, INSIGHT_RULES.listLimit),
    declining: declining.slice(0, INSIGHT_RULES.listLimit),
    complete: !current.truncated && !previous.truncated,
  };
}

export type QueryChangeRow = {
  query: string;
  clicks: number;
  impressions: number;
  position: number;
};

/**
 * Queries present in `from` with enough impressions and absent from `against`.
 * Null when `against` was truncated: Google sorts by clicks, so a zero-click
 * query missing from a capped table may simply be past the cap.
 */
export function appearedOnlyIn(
  from: RowSet<MetricRow>,
  against: RowSet<MetricRow>,
  minImpressions: number,
): QueryChangeRow[] | null {
  if (against.truncated) return null;
  const seen = new Set(against.rows.map((r) => r.key));
  return sort(
    from.rows.filter(
      (r) => r.impressions >= minImpressions && !seen.has(r.key),
    ),
    (a, b) => b.clicks - a.clicks || b.impressions - a.impressions,
  )
    .slice(0, INSIGHT_RULES.listLimit)
    .map((r) => ({
      query: r.key,
      clicks: r.clicks,
      impressions: r.impressions,
      position: r.position,
    }));
}

// ---------------------------------------------------------------------------
// Content decay
// ---------------------------------------------------------------------------

export type DecayQuarter = {
  startDate: string;
  endDate: string;
  rows: RowSet<MetricRow>;
};

export type DecayRow = {
  page: string;
  clicks: number;
  peakClicks: number;
  peakStartDate: string;
  peakEndDate: string;
  lostClicks: number;
  /** Clicks per quarter, newest first; null where a truncated set lacked the page. */
  quarters: Array<number | null>;
};

/**
 * Pages whose newest quarter fell well below their best of the four before,
 * and below the same quarter a year earlier (so a seasonal low is not decay).
 * `quarters[0]` is the newest. A page absent from a truncated quarter has an
 * unknown value there; absent from a complete one it had no clicks.
 */
export function contentDecay(quarters: readonly DecayQuarter[]): DecayRow[] {
  const [newest, ...older] = quarters;
  if (!newest || older.length === 0) return [];
  const maps = quarters.map((q) => new Map(q.rows.rows.map((r) => [r.key, r])));
  const pages = new Set<string>();
  for (const q of older) for (const r of q.rows.rows) pages.add(r.key);
  const out: DecayRow[] = [];
  for (const page of pages) {
    const values = quarters.map((q, i): number | null => {
      const row = maps[i]?.get(page);
      if (row) return row.clicks;
      return q.rows.truncated ? null : 0;
    });
    const now = values[0];
    if (now === null || now === undefined) continue;
    let peak = -1;
    let peakIndex = -1;
    values.slice(1).forEach((value, i) => {
      if (value !== null && value > peak) {
        peak = value;
        peakIndex = i + 1;
      }
    });
    const peakQuarter = quarters[peakIndex];
    if (!peakQuarter || peak < INSIGHT_RULES.decayPeakMinClicks) continue;
    if (now > peak * INSIGHT_RULES.decayMaxShareOfPeak) continue;
    if (peak - now < INSIGHT_RULES.decayMinLoss) continue;
    /*
     * Seasonality is not decay. The oldest quarter is the same 13 weeks a
     * year earlier (4 x 91 = 364 days, weekday-aligned); a page that holds
     * up against it is having its off-season, not losing ground.
     */
    const yearAgo = values[INSIGHT_RULES.decayYearAgoQuarter] ?? null;
    if (
      yearAgo !== null &&
      yearAgo > 0 &&
      now > yearAgo * INSIGHT_RULES.decayMaxShareOfPeak
    )
      continue;
    out.push({
      page,
      clicks: now,
      peakClicks: peak,
      peakStartDate: peakQuarter.startDate,
      peakEndDate: peakQuarter.endDate,
      lostClicks: peak - now,
      quarters: values,
    });
  }
  out.sort((a, b) => b.lostClicks - a.lostClicks);
  return out.slice(0, INSIGHT_RULES.listLimit);
}

// ---------------------------------------------------------------------------
// Pages with impressions and no clicks
// ---------------------------------------------------------------------------

export type ZeroClickPage = {
  page: string;
  impressions: number;
  position: number;
};

export function zeroClickPages(
  pages: readonly MetricRow[],
  minImpressions: number,
): { rows: ZeroClickPage[]; total: number } {
  const rows = sort(
    pages.filter((r) => r.clicks === 0 && r.impressions >= minImpressions),
    (a, b) => b.impressions - a.impressions,
  ).map((r) => ({
    page: r.key,
    impressions: r.impressions,
    position: r.position,
  }));
  return { rows: rows.slice(0, INSIGHT_RULES.listLimit), total: rows.length };
}

// ---------------------------------------------------------------------------
// Position distribution
// ---------------------------------------------------------------------------

const POSITION_BUCKETS = [
  { id: "1-3", min: 1, max: 3 },
  { id: "4-10", min: 4, max: 10 },
  { id: "11-20", min: 11, max: 20 },
  { id: "21-50", min: 21, max: 50 },
  { id: "51+", min: 51, max: Infinity },
] as const;
type PositionBucketId = (typeof POSITION_BUCKETS)[number]["id"];

/** Rounded the same way as the quick filters, so a row never lands in two places. */
export function positionBucketFor(position: number): PositionBucketId | null {
  if (!(position > 0)) return null;
  const rounded = Math.max(1, Math.round(position));
  return (
    POSITION_BUCKETS.find((b) => rounded >= b.min && rounded <= b.max)?.id ??
    null
  );
}

export type PositionBucket = {
  bucket: PositionBucketId;
  queries: number;
  clicks: number;
  impressions: number;
};

function positionDistribution(queries: readonly MetricRow[]): PositionBucket[] {
  const out = POSITION_BUCKETS.map(
    (b): PositionBucket => ({
      bucket: b.id,
      queries: 0,
      clicks: 0,
      impressions: 0,
    }),
  );
  for (const row of queries) {
    const id = positionBucketFor(row.position);
    const bucket = out.find((b) => b.bucket === id);
    if (!bucket) continue;
    bucket.queries += 1;
    bucket.clicks += row.clicks;
    bucket.impressions += row.impressions;
  }
  return out;
}

// ---------------------------------------------------------------------------
// Device and country gaps
// ---------------------------------------------------------------------------

export type GapRow = {
  key: string;
  clicks: number;
  impressions: number;
  ctr: number | null;
  position: number | null;
  impressionShare: number | null;
  /** ctr / site ctr; null when either is unknown. */
  ctrRatio: number | null;
  /** position - site position (positive = ranks lower); null when unknown. */
  positionGap: number | null;
  ctrGap: boolean;
  positionGapFlag: boolean;
  /** Clicks at the site's CTR minus actual; null when not a CTR gap. */
  gainClicks: number | null;
};

export function segmentGaps(
  rows: readonly MetricRow[],
  base: SearchMetrics,
  minImpressions: number,
  minShare: number,
): GapRow[] {
  return rows.map((row) => {
    const ctr = row.impressions > 0 ? row.clicks / row.impressions : null;
    const position = row.impressions > 0 ? row.position : null;
    const share =
      base.impressions > 0 ? row.impressions / base.impressions : null;
    const eligible =
      row.impressions >= minImpressions && share !== null && share >= minShare;
    const ctrRatio =
      ctr !== null && base.ctr !== null && base.ctr > 0 ? ctr / base.ctr : null;
    const positionGap =
      position !== null && base.position !== null
        ? position - base.position
        : null;
    const ctrGap =
      eligible && ctrRatio !== null && ctrRatio < INSIGHT_RULES.gapCtrRatio;
    return {
      key: row.key,
      clicks: row.clicks,
      impressions: row.impressions,
      ctr,
      position,
      impressionShare: share,
      ctrRatio,
      positionGap,
      ctrGap,
      positionGapFlag:
        eligible &&
        positionGap !== null &&
        positionGap >= INSIGHT_RULES.gapPositionPlaces,
      gainClicks:
        ctrGap && base.ctr !== null
          ? Math.max(0, Math.round(row.impressions * base.ctr - row.clicks))
          : null,
    };
  });
}

// ---------------------------------------------------------------------------
// Question and long-tail lenses
// ---------------------------------------------------------------------------

/*
 * Question words in the six interface languages, folded (see foldText). A
 * query's language is not the interface's, so all are applied at once.
 * Words that are also everyday nouns or articles in another listed language
 * ("come", "che", "was", "wo") are left out: a lens that calls "was hast du"
 * a question is fine, one that calls every Italian query with "che" one is not.
 */
const QUESTION_WORDS = new Set([
  // Turkish
  "nasil",
  "neden",
  "nedir",
  "niye",
  "nicin",
  "hangi",
  "hangisi",
  "kac",
  "kim",
  "kimdir",
  "nerede",
  "nereden",
  "nereye",
  "ne",
  "neler",
  "mi",
  "mu",
  "midir",
  "mudur",
  "misin",
  "musun",
  // English
  "how",
  "what",
  "why",
  "when",
  "where",
  "who",
  "which",
  "whats",
  "can",
  "does",
  "should",
  "is",
  "are",
  // German
  "wie",
  "warum",
  "wann",
  "wer",
  "welche",
  "welcher",
  "welches",
  "wieso",
  "weshalb",
  // French
  "comment",
  "pourquoi",
  "quand",
  "ou",
  "quel",
  "quelle",
  "quels",
  "quelles",
  "combien",
  "qu",
  // Italian
  "perche",
  "quando",
  "dove",
  "chi",
  "quale",
  "quali",
  "quanto",
  "cosa",
  // Portuguese
  "como",
  "onde",
  "quem",
  "qual",
  "quais",
]);

/*
 * Words that make a question only at the start ("is", "are", "can", "does",
 * "should", "ou") -- "price is right" is not a question, "is it safe" is.
 */
const LEADING_ONLY = new Set(["is", "are", "can", "does", "should", "ou"]);

/*
 * Turkish particles (mi/mı/mu/mü, folded to "mi"/"mu", and "ne") that make a
 * question only after another word: "iade var mı" is one, "mi band 8" and
 * "mu online" are product names.
 */
const NOT_LEADING = new Set(["mi", "mu", "ne"]);

export function isQuestionQuery(query: string): boolean {
  if (query.includes("?")) return true;
  const words = foldText(query).split(" ").filter(Boolean);
  return words.some(
    (word, index) =>
      QUESTION_WORDS.has(word) &&
      (index === 0 ? !NOT_LEADING.has(word) : !LEADING_ONLY.has(word)),
  );
}

export function isLongTailQuery(query: string): boolean {
  return (
    foldText(query).split(" ").filter(Boolean).length >=
    INSIGHT_RULES.longTailMinWords
  );
}

export type Lens = SearchMetrics & {
  queries: number;
  /** Share of the clicks in the query rows (not of the site total). */
  clickShare: number | null;
  impressionShare: number | null;
  top: MetricRow[];
};

function lens(
  queries: readonly MetricRow[],
  matches: (query: string) => boolean,
): Lens {
  const rows = queries.filter((r) => matches(r.key));
  const all = combineMetrics(queries);
  const metrics = combineMetrics(rows);
  return {
    ...metrics,
    queries: rows.length,
    clickShare: all.clicks > 0 ? metrics.clicks / all.clicks : null,
    impressionShare:
      all.impressions > 0 ? metrics.impressions / all.impressions : null,
    top: sort(rows, (a, b) => b.impressions - a.impressions).slice(0, 20),
  };
}

// ---------------------------------------------------------------------------
// Anomalies
// ---------------------------------------------------------------------------

export type DailyValue = {
  date: string;
  clicks: number;
  impressions: number;
  /** Only complete days take part, as history or as candidates. */
  complete: boolean;
};

export type Anomaly = {
  date: string;
  metric: "clicks" | "impressions";
  value: number;
  /** Median of the same weekday over the weeks before. */
  expected: number;
  z: number;
  direction: "up" | "down";
};

function median(values: number[]): number {
  const sorted = sort(values, (a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 1
    ? (sorted[mid] ?? 0)
    : ((sorted[mid - 1] ?? 0) + (sorted[mid] ?? 0)) / 2;
}

/**
 * Days in [fromDate, toDate] that sit far outside the same weekday's recent
 * history. Comparing a Monday to the Mondays before it removes the weekly
 * cycle; median and MAD keep one earlier spike from hiding the next. The
 * scale has a floor (√expected, and 10% of it) so a perfectly flat history
 * does not turn a one-click wobble into an alarm.
 */
export function detectAnomalies(
  series: readonly DailyValue[],
  fromDate: string,
  toDate: string,
): Anomaly[] {
  const byDate = new Map(series.map((d) => [d.date, d] as const));
  const out: Anomaly[] = [];
  for (const day of series) {
    if (!day.complete || day.date < fromDate || day.date > toDate) continue;
    for (const metric of ["clicks", "impressions"] as const) {
      const history: number[] = [];
      for (let week = 1; week <= INSIGHT_RULES.anomalyHistoryWeeks; week += 1) {
        const then = byDate.get(shiftDate(day.date, -7 * week));
        if (then?.complete) history.push(then[metric]);
      }
      if (history.length < INSIGHT_RULES.anomalyMinHistory) continue;
      const expected = median(history);
      const mad = median(history.map((v) => Math.abs(v - expected)));
      const scale = Math.max(
        1.4826 * mad,
        Math.sqrt(Math.max(expected, 1)),
        0.1 * expected,
      );
      const deviation = day[metric] - expected;
      const z = deviation / scale;
      if (Math.abs(z) < INSIGHT_RULES.anomalyZ) continue;
      if (
        Math.abs(deviation) <
        Math.max(
          INSIGHT_RULES.anomalyMinDeviation,
          INSIGHT_RULES.anomalyMinRelative * expected,
        )
      )
        continue;
      out.push({
        date: day.date,
        metric,
        value: day[metric],
        expected,
        z,
        direction: deviation > 0 ? "up" : "down",
      });
    }
  }
  // Newest first.
  return sortBy(out, [(a) => a.date, "desc"]);
}

function shiftDate(date: string, days: number): string {
  return new Date(Date.parse(`${date}T00:00:00Z`) + days * 86_400_000)
    .toISOString()
    .slice(0, 10);
}

// ---------------------------------------------------------------------------
// The to-do list
// ---------------------------------------------------------------------------

type TodoBase = {
  /** Stable across reloads, for a locally stored "done" mark. */
  id: string;
  /** Clicks per window this would plausibly add back; null when unknowable. */
  estimatedClicks: number | null;
  confidence: Confidence;
};

export type TodoItem = TodoBase &
  (
    | {
        kind: "striking";
        query: string;
        page: string | null;
        clicks: number;
        impressions: number;
        position: number;
      }
    | {
        kind: "snippet";
        query: string;
        page: string | null;
        impressions: number;
        ctr: number;
        expectedCtr: number;
        position: number;
      }
    | {
        kind: "decliningQuery" | "decliningPage";
        key: string;
        clicks: number;
        previousClicks: number;
        position: number | null;
        previousPosition: number | null;
      }
    | {
        kind: "decay";
        page: string;
        clicks: number;
        peakClicks: number;
        peakStartDate: string;
        peakEndDate: string;
      }
    | {
        kind: "zeroClickPage";
        page: string;
        impressions: number;
        position: number;
      }
    | {
        kind: "lostQuery";
        query: string;
        previousClicks: number;
        previousImpressions: number;
      }
    | {
        kind: "deviceGap" | "countryGap";
        key: string;
        ctr: number | null;
        siteCtr: number | null;
        position: number | null;
        sitePosition: number | null;
        impressions: number;
      }
    | {
        kind: "anomaly";
        date: string;
        metric: "clicks" | "impressions";
        value: number;
        expected: number;
      }
    | { kind: "setBrandTerms"; suggestions: string[] }
  );

export type SearchInsights = {
  thresholds: InsightThresholds;
  ctrCurve: CtrCurve;
  snippets: SnippetOpportunity[];
  striking: StrikingResult;
  movers: { queries: Movers; pages: Movers };
  /** Null when the comparison set was truncated (see appearedOnlyIn). */
  newQueries: QueryChangeRow[] | null;
  lostQueries: QueryChangeRow[] | null;
  /** Null when the quarter tables could not be read. */
  decay: DecayRow[] | null;
  zeroClickPages: { rows: ZeroClickPage[]; total: number };
  positionDistribution: PositionBucket[];
  deviceGaps: GapRow[];
  countryGaps: GapRow[];
  questions: Lens;
  longTail: Lens;
  brand: BrandSplit;
  /**
   * The terms the curve, snippets, striking distance and split ran on, and
   * where they came from: "confirmed" by the operator, "suggested" from the
   * domain and project name until then, or "none" when there is nothing to
   * suggest. Suggested terms are applied, so every surface that shows the
   * split also says when they are unconfirmed.
   */
  brandState: ReturnType<typeof effectiveBrandTerms>;
  anomalies: Anomaly[];
};

type InsightInput = {
  days: number;
  queries: RowSet<MetricRow>;
  previousQueries: RowSet<MetricRow>;
  pages: RowSet<MetricRow>;
  previousPages: RowSet<MetricRow>;
  queryPages: RowSet<QueryPageRow>;
  decayQuarters: DecayQuarter[] | null;
  devices: MetricRow[];
  deviceBase: SearchMetrics;
  countries: MetricRow[];
  countryBase: SearchMetrics;
  daily: DailyValue[];
  windowStart: string;
  windowEnd: string;
  brandTerms: string[];
  brandSuggestions: string[];
};

export function buildInsights(input: InsightInput): SearchInsights {
  const thresholds = thresholdsFor(input.days);
  const queries = input.queries.rows;
  // Suggested terms stand in until some are confirmed; the screen reads
  // `brandState.source` to say the split is unconfirmed.
  const used = effectiveBrandTerms(input.brandTerms, input.brandSuggestions);
  const branded = used.terms.length > 0;
  const brandRows = branded
    ? queries.filter((r) => isBrandQuery(r.key, used.terms))
    : [];
  const nonBrandRows = branded
    ? queries.filter((r) => !isBrandQuery(r.key, used.terms))
    : [];
  const curve: CtrCurve = {
    all: ctrCurve(queries, thresholds.curveBucketMinImpressions),
    brand: branded
      ? ctrCurve(brandRows, thresholds.curveBucketMinImpressions)
      : null,
    nonBrand: branded
      ? ctrCurve(nonBrandRows, thresholds.curveBucketMinImpressions)
      : null,
  };
  return {
    thresholds,
    ctrCurve: curve,
    snippets: underperformingSnippets({
      queries,
      queryPages: input.queryPages.rows,
      curve,
      brandTerms: used.terms,
      minImpressions: thresholds.snippetMinImpressions,
    }),
    striking: strikingDistance(
      queries,
      input.queryPages.rows,
      curve.nonBrand ?? curve.all,
      thresholds.strikingMinImpressions,
      used.terms,
    ),
    movers: {
      queries: movers(
        input.queries,
        input.previousQueries,
        thresholds.moverMinClicks,
      ),
      pages: movers(
        input.pages,
        input.previousPages,
        thresholds.moverMinClicks,
      ),
    },
    newQueries: appearedOnlyIn(
      input.queries,
      input.previousQueries,
      thresholds.newLostMinImpressions,
    ),
    lostQueries: appearedOnlyIn(
      input.previousQueries,
      input.queries,
      thresholds.newLostMinImpressions,
    ),
    decay: input.decayQuarters ? contentDecay(input.decayQuarters) : null,
    zeroClickPages: zeroClickPages(
      input.pages.rows,
      thresholds.zeroClickMinImpressions,
    ),
    positionDistribution: positionDistribution(queries),
    deviceGaps: segmentGaps(
      input.devices,
      input.deviceBase,
      thresholds.gapMinImpressions,
      INSIGHT_RULES.gapMinImpressionShare,
    ),
    countryGaps: segmentGaps(
      input.countries,
      input.countryBase,
      thresholds.gapMinImpressions,
      INSIGHT_RULES.countryGapMinImpressionShare,
    ),
    questions: lens(queries, isQuestionQuery),
    longTail: lens(queries, isLongTailQuery),
    brand: brandSplit(queries, used.terms, input.brandSuggestions),
    brandState: used,
    anomalies: detectAnomalies(input.daily, input.windowStart, input.windowEnd),
  };
}

const BAND_ORDER: readonly CtrBandId[] = CTR_BANDS.map((band) => band.id);

/**
 * What a page with impressions and no clicks would plausibly earn: the
 * site's CTR one band BELOW where it sits (a page nobody clicks is not
 * performing like its band), and never more than the one-band-up rule every
 * other gain uses. It feeds the verdict sentence, so it errs low: null on
 * page two and beyond, where there is no lower band on the curve.
 */
function zeroClickEstimate(
  row: { impressions: number; position: number },
  curve: readonly CtrCurvePoint[],
): number | null {
  const band = ctrBandFor(row.position);
  if (!band) return null;
  const lower = BAND_ORDER[BAND_ORDER.indexOf(band) + 1];
  const conservative = lower ? expectedCtr(curve, lower) : null;
  if (conservative === null) return null;
  const cap = expectedCtr(
    curve,
    row.position < 3.5 ? band : strikingTargetBand(row.position),
  );
  const rate = cap === null ? conservative : Math.min(conservative, cap);
  return Math.round(row.impressions * rate);
}

/** How many of each kind make the list, so one kind cannot crowd out the rest. */
const TODO_PER_KIND = 8;

/**
 * One ranked list from every insight: estimated clicks first (largest gain
 * on top), then the items whose gain cannot be estimated.
 */
export function buildTodo(
  insights: SearchInsights,
  context: {
    days: number;
    deviceBase: SearchMetrics;
    countryBase: SearchMetrics;
  },
): TodoItem[] {
  const items: TodoItem[] = [];
  const minStriking = insights.thresholds.strikingMinImpressions;

  for (const row of insights.striking.rows.slice(0, TODO_PER_KIND)) {
    items.push({
      kind: "striking",
      id: `striking:${row.query}`,
      query: row.query,
      page: row.page,
      clicks: row.clicks,
      impressions: row.impressions,
      position: row.position,
      estimatedClicks: row.potentialClicks,
      confidence:
        row.potentialClicks === null
          ? "low"
          : row.impressions >= minStriking * 3
            ? "high"
            : "medium",
    });
  }
  for (const row of insights.snippets.slice(0, TODO_PER_KIND)) {
    items.push({
      kind: "snippet",
      id: `snippet:${row.query}`,
      query: row.query,
      page: row.page,
      impressions: row.impressions,
      ctr: row.ctr,
      expectedCtr: row.expectedCtr,
      position: row.position,
      estimatedClicks: row.gainClicks,
      confidence:
        row.impressions >= insights.thresholds.snippetMinImpressions * 3
          ? "high"
          : "medium",
    });
  }
  const declining = [
    ...insights.movers.queries.declining
      .slice(0, TODO_PER_KIND)
      .map((row) => ({ row, kind: "decliningQuery" as const })),
    ...insights.movers.pages.declining
      .slice(0, TODO_PER_KIND)
      .map((row) => ({ row, kind: "decliningPage" as const })),
  ];
  for (const { row, kind } of declining) {
    items.push({
      kind,
      id: `${kind}:${row.key}`,
      key: row.key,
      clicks: row.clicks,
      previousClicks: row.previousClicks,
      position: row.position,
      previousPosition: row.previousPosition,
      estimatedClicks: -row.clickChange,
      confidence: "medium",
    });
  }
  for (const row of (insights.decay ?? []).slice(0, TODO_PER_KIND)) {
    items.push({
      kind: "decay",
      id: `decay:${row.page}`,
      page: row.page,
      clicks: row.clicks,
      peakClicks: row.peakClicks,
      peakStartDate: row.peakStartDate,
      peakEndDate: row.peakEndDate,
      // A quarter's loss re-expressed for the window on screen.
      estimatedClicks: Math.round(
        (row.lostClicks * context.days) / INSIGHT_RULES.decayQuarterDays,
      ),
      confidence: "medium",
    });
  }
  const curve = insights.ctrCurve.nonBrand ?? insights.ctrCurve.all;
  for (const row of insights.zeroClickPages.rows.slice(0, TODO_PER_KIND)) {
    items.push({
      kind: "zeroClickPage",
      id: `zeroClickPage:${row.page}`,
      page: row.page,
      impressions: row.impressions,
      position: row.position,
      estimatedClicks: zeroClickEstimate(row, curve),
      confidence: "low",
    });
  }
  for (const row of (insights.lostQueries ?? []).slice(0, TODO_PER_KIND)) {
    if (row.clicks === 0) continue;
    items.push({
      kind: "lostQuery",
      id: `lostQuery:${row.query}`,
      query: row.query,
      previousClicks: row.clicks,
      previousImpressions: row.impressions,
      estimatedClicks: row.clicks,
      confidence: "low",
    });
  }
  const gaps = [
    ...insights.deviceGaps.map((row) => ({
      row,
      kind: "deviceGap" as const,
      base: context.deviceBase,
    })),
    ...insights.countryGaps.map((row) => ({
      row,
      kind: "countryGap" as const,
      base: context.countryBase,
    })),
  ];
  for (const { row, kind, base } of gaps) {
    if (!row.ctrGap && !row.positionGapFlag) continue;
    items.push({
      kind,
      id: `${kind}:${row.key}`,
      key: row.key,
      ctr: row.ctr,
      siteCtr: base.ctr,
      position: row.position,
      sitePosition: base.position,
      impressions: row.impressions,
      estimatedClicks: row.gainClicks,
      confidence: "low",
    });
  }
  const latestDrop = insights.anomalies.find(
    (a) => a.direction === "down" && a.metric === "clicks",
  );
  if (latestDrop) {
    items.push({
      kind: "anomaly",
      id: `anomaly:${latestDrop.date}:${latestDrop.metric}`,
      date: latestDrop.date,
      metric: latestDrop.metric,
      value: latestDrop.value,
      expected: latestDrop.expected,
      estimatedClicks: null,
      confidence: "medium",
    });
  }
  // Suggested terms are applied until confirmed; the to-do asks for the
  // confirmation and carries them. With nothing to suggest it asks for terms.
  if (insights.brandState.source !== "confirmed") {
    items.push({
      kind: "setBrandTerms",
      id: "setBrandTerms",
      suggestions:
        insights.brandState.source === "suggested"
          ? [...insights.brandState.terms]
          : [],
      estimatedClicks: null,
      confidence: "high",
    });
  }

  const rank = { high: 0, medium: 1, low: 2 } as const;
  items.sort(
    (a, b) =>
      (b.estimatedClicks ?? -1) - (a.estimatedClicks ?? -1) ||
      rank[a.confidence] - rank[b.confidence],
  );
  return items.slice(0, INSIGHT_RULES.todoLimit);
}
