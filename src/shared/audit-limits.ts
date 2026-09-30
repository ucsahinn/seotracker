// Per-audit page bounds. Shared so the launch form, the input schema, and the
// server-side capacity check all read the same numbers and can't drift apart.
export const MIN_AUDIT_PAGES = 10;
export const DEFAULT_AUDIT_PAGES = 50;
export const MAX_AUDIT_PAGES = 10_000;

/*
 * Speed (PageSpeed Insights) measurement.
 *
 * With a key every crawled page is measured on mobile and desktop. Without
 * one, Google's shared keyless quota is tiny, so the run is capped at this many
 * pages; past it the audit would only hit a 429 halfway through.
 */
export const UNKEYED_LIGHTHOUSE_PAGE_CAP = 50;
/** Each measured page costs one mobile and one desktop check. */
export const LIGHTHOUSE_CHECKS_PER_PAGE = 2;
/**
 * Wall-clock seconds per page in a wave of five pages (ten checks), from the
 * usual 20-60 second PageSpeed response time. Used only for the estimate.
 */
const LIGHTHOUSE_SECONDS_PER_PAGE = 8;
/**
 * Start of the stored error for a check that was not run because Google's
 * daily quota ran out. The results screen recognises it by this prefix.
 */
export const LIGHTHOUSE_QUOTA_MARKER = "Kota doldu";

/** Rough minutes the speed stage takes for this many pages. */
export function estimateLighthouseMinutes(pages: number) {
  return Math.max(1, Math.round((pages * LIGHTHOUSE_SECONDS_PER_PAGE) / 60));
}
