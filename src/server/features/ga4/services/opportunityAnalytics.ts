export type Ga4PageValue = {
  sessions: number | null;
  activeUsers: number | null;
  engagedSessions: number | null;
  engagementRate: number | null;
  keyEvents: number | null;
  sessionKeyEventRate: number | null;
  transactions: number | null;
  purchaseRevenue: number | null;
};

/**
 * What GA4 says about the page's business value, as a label next to the
 * click estimate rather than a weight inside it.
 *
 * - converts: enough organic sessions to judge, and key events among them.
 * - no_conversions: enough sessions, none converted, while other pages on the
 *   property do convert (so key events are set up).
 * - too_little_traffic: under the session floor; one lucky conversion on
 *   three sessions is not a conversion rate.
 *
 * Null when Analytics has no row for the page or is not connected.
 */
export type ValueSignal = "converts" | "no_conversions" | "too_little_traffic";

export function normalizePageKey(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed || trimmed === "(not set)") return null;
  try {
    const url = new URL(
      trimmed.includes("://") ? trimmed : `https://${trimmed}`,
    );
    let host = url.hostname.toLowerCase();
    const defaultPort =
      (url.protocol === "http:" && url.port === "80") ||
      (url.protocol === "https:" && url.port === "443");
    if (url.port && !defaultPort) host += `:${url.port}`;
    let path = url.pathname || "/";
    if (path.length > 1) path = path.replace(/\/+$/, "");
    return `${host}${path}`;
  } catch {
    return null;
  }
}

function numberField(
  row: Record<string, string | number | null>,
  name: string,
): number | null {
  const value = row[name];
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

export type Ga4PageTotals = Ga4PageValue & {
  /** Session-weighted rate sums, divided out by `finishRates`. */
  weighted: { engagement: number | null; keyEvent: number | null };
};

function addKnown(
  previous: number | null | undefined,
  next: number | null,
): number | null {
  return previous === null || next === null ? null : (previous ?? 0) + next;
}

function weighted(sessions: number | null, rate: number | null): number | null {
  return sessions === null || rate === null ? null : sessions * rate;
}

/**
 * Fold one GA4 landing-page row into the totals for its page.
 *
 * `normalizePageKey` drops the query string on purpose, because Search
 * Console reports `/blog` where GA4 reports `/blog?utm_source=newsletter`
 * and the two have to meet. Collapsing without adding, though, kept whichever
 * variant GA4 happened to return last: a page with 800 organic sessions and
 * 40 conversions could be read off its own `?utm_source=` row at 120 and 2,
 * and since business value is a percentile over those numbers, the best page
 * on the site sorted below pages a tenth its size.
 *
 * Sessions, conversions and revenue are additive, so they add. `activeUsers`
 * is a distinct count and summing it double-counts anyone who arrived through
 * two variants - GA4 does not expose the overlap, it is the closer of the two
 * available answers, and nothing is ranked on it.
 */
export function addRow(
  totals: Ga4PageTotals | undefined,
  row: Record<string, string | number | null>,
): Ga4PageTotals {
  const revenue =
    typeof row.purchaseRevenue === "number" &&
    Number.isFinite(row.purchaseRevenue)
      ? row.purchaseRevenue
      : null;
  const sessions = numberField(row, "sessions");
  return {
    sessions: addKnown(totals?.sessions, sessions),
    activeUsers: addKnown(totals?.activeUsers, numberField(row, "activeUsers")),
    engagedSessions: addKnown(
      totals?.engagedSessions,
      numberField(row, "engagedSessions"),
    ),
    keyEvents: addKnown(totals?.keyEvents, numberField(row, "keyEvents")),
    transactions: addKnown(
      totals?.transactions,
      numberField(row, "transactions"),
    ),
    purchaseRevenue: addKnown(totals?.purchaseRevenue, revenue),
    weighted: {
      engagement: addKnown(
        totals?.weighted.engagement,
        weighted(sessions, numberField(row, "engagementRate")),
      ),
      keyEvent: addKnown(
        totals?.weighted.keyEvent,
        weighted(sessions, numberField(row, "sessionKeyEventRate")),
      ),
    },
    // Divided out by `finishRates` once every variant has been folded in.
    engagementRate: 0,
    sessionKeyEventRate: 0,
  };
}

/**
 * Rates are ratios, so they cannot be added - a page whose variants ran at 40%
 * and 60% is not a 100% page. Each variant's rate is weighted by the sessions
 * it was measured over, which is the rate the whole page ran at.
 *
 * Deliberately not recomputed from the counts we hold: GA4's
 * `sessionKeyEventRate` is the share of *sessions that fired at least one key
 * event*, not `keyEvents / sessions`, and one session can fire several - so
 * dividing the totals would report rates above 1 on a page with repeat
 * conversions. Weighting keeps Google's definition intact, and for the
 * ordinary page with a single variant it returns exactly what GA4 reported.
 */
export function finishRates(totals: Ga4PageTotals): void {
  totals.engagementRate =
    totals.sessions === null || totals.weighted.engagement === null
      ? null
      : totals.sessions > 0
        ? totals.weighted.engagement / totals.sessions
        : 0;
  totals.sessionKeyEventRate =
    totals.sessions === null || totals.weighted.keyEvent === null
      ? null
      : totals.sessions > 0
        ? totals.weighted.keyEvent / totals.sessions
        : 0;
}

export function valueSignal(
  ga4: Ga4PageValue | null,
  minSessions: number,
  propertyConverts: boolean,
): ValueSignal | null {
  if (!ga4 || ga4.sessions === null) return null;
  if (ga4.sessions < minSessions) return "too_little_traffic";
  if (ga4.keyEvents === null || ga4.sessionKeyEventRate === null) return null;
  if (ga4.keyEvents > 0) return "converts";
  return propertyConverts ? "no_conversions" : null;
}

/** Whether a landing-page cohort measures this address alone or several variants. */
export function joinPrecisionFor(
  page: string,
  cohortCounts: ReadonlyMap<string, number>,
  sources: ReadonlyMap<string, ReadonlySet<string>>,
): "exact" | "collapsed" | "ambiguous" | null {
  const key = normalizePageKey(page);
  if (!key) return null;
  const source = sources.get(key);
  if (!source) return null;
  if ((cohortCounts.get(key) ?? 0) > 1) return "ambiguous";
  return source.size === 1 && source.has(page.replace(/^https?:\/\//, ""))
    ? "exact"
    : "collapsed";
}
