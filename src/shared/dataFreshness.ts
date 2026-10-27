/**
 * How far behind "now" each source's newest usable day is, in one place.
 *
 * These numbers were written out three times: `GSC_DATA_LAG_DAYS` in
 * `searchAnalytics.ts`, `DATA_LAG_DAYS` in `GscHistoryService.ts`, and a bare
 * `-3` inside `SearchOpportunityService.resolveCombinedDates`. Three copies of
 * one fact about Google is three chances for two screens to disagree about
 * which day the data ends on, which is the kind of difference nobody notices
 * until two numbers that should match do not.
 *
 * Sibling imports stay relative here, like the rest of `shared/`: the badseo
 * harness reaches this directory by relative path and its tsconfig declares
 * no `@/` alias.
 */

/**
 * Search Console finalises a day about two to three days late, and keeps
 * revising it for a while after. Ending a window before that boundary is the
 * difference between "traffic fell" and "Google has not counted yesterday".
 */
export const GSC_DATA_LAG_DAYS = 3;

/**
 * Analytics needs no such margin — it reports in near real time — but a
 * partial day still reads as a collapse, so the newest complete day is
 * yesterday in the property's own timezone.
 */
export const GA4_DATA_LAG_DAYS = 1;

/** The window every screen opens on, when the operator has not chosen one. */
export const DEFAULT_WINDOW_DAYS = 28;

/**
 * Inclusive archive span using a Pacific-calendar three-day lag assumption.
 * This does not verify Google's live incomplete-day metadata or acquisition
 * coverage. Start and end come from one clock reading, including across DST.
 */
export function gscHistoryWindow(
  days: number,
  now: Date = new Date(),
): { startDate: string; endDate: string } {
  const endDate = addIsoDays(gscToday(now), -GSC_DATA_LAG_DAYS);
  return { startDate: addIsoDays(endDate, -(days - 1)), endDate };
}

/**
 * Search Console's calendar. Every date the Search Analytics API accepts and
 * returns is a day in `America/Los_Angeles`; its response `metadata` says so
 * in as many words ("All dates and times provided in this object are in the
 * America/Los_Angeles time zone",
 * developers.google.com/webmaster-tools/v1/searchanalytics/query).
 */
export const GSC_TIME_ZONE = "America/Los_Angeles";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

/** `YYYY-MM-DD` shifted by whole days, stepped in UTC so DST cannot skip one. */
export function addIsoDays(date: string, days: number): string {
  const ms = Date.parse(`${date}T00:00:00Z`) + days * ONE_DAY_MS;
  return new Date(ms).toISOString().slice(0, 10);
}

/** Inclusive day count of [startDate, endDate]; 0 when end precedes start. */
export function isoDaysInclusive(startDate: string, endDate: string): number {
  const span =
    (Date.parse(`${endDate}T00:00:00Z`) -
      Date.parse(`${startDate}T00:00:00Z`)) /
    ONE_DAY_MS;
  return Number.isFinite(span) && span >= 0 ? Math.round(span) + 1 : 0;
}

/**
 * Today's date on Search Console's calendar.
 *
 * Between UTC midnight and Pacific midnight (seven or eight hours a day) the
 * UTC date is a day ahead of Google's, so a window ended at "UTC today - 3"
 * reached one day further than intended for a third of every day.
 */
export function gscToday(now: Date = new Date()): string {
  // en-CA formats as YYYY-MM-DD.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: GSC_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}
