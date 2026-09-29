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

/** One sentence naming the window and why it stops short of today. */
export function describeWindow(
  startDate: string,
  endDate: string,
  formatDate: (value: string) => string,
): string {
  return `${formatDate(startDate)} – ${formatDate(endDate)} · Search Console verisi ${GSC_DATA_LAG_DAYS} gün gecikmeli gelir, bu yüzden aralık bugünde bitmez.`;
}
