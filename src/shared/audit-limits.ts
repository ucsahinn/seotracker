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
 * Wall-clock seconds the ten checks of one wave (five pages) take, from the
 * usual 20-60 second PageSpeed response time. Used only for the estimate.
 */
const LIGHTHOUSE_SECONDS_PER_WAVE = 40;
/**
 * Pause between two waves. Sustained throughput stays near ten checks per
 * (wave + pause) seconds, about 12 a minute, far under the 240 a minute that
 * docs/PAGESPEED_API_KEY.md quotes. UNVERIFIED: Google's public docs state no
 * per-minute number, and a burst of ten calls was rejected in a measured run,
 * so this is a conservative choice, not a documented limit.
 */
export const LIGHTHOUSE_WAVE_PAUSE_SECONDS = 10;
const LIGHTHOUSE_PAGES_PER_WAVE = 5;
/**
 * Start of the stored error for a check that was not run because Google's
 * daily quota ran out. The results screen recognises it by this prefix.
 */
export const LIGHTHOUSE_QUOTA_MARKER = "Kota doldu";

/**
 * Start of the stored error for a check Google rejected for its per-minute
 * limit even after the pauses and re-passes. The results screen recognises it
 * by this prefix.
 */
export const LIGHTHOUSE_RATE_LIMIT_MARKER = "Dakikalık sınır";
/**
 * Start of the stored error for a check that hit Google's shared keyless
 * quota because no PageSpeed key is set.
 */
export const LIGHTHOUSE_NO_KEY_MARKER = "Anahtar yok";

/**
 * A LOWER BOUND in minutes for the speed stage, not an expected time.
 *
 * The 40 second wave time is an assumption from the usual 20-60 second
 * PageSpeed response time and is unmeasured. The formula ignores the 65 second
 * cooldown re-passes after a per-minute rejection and the 120 second request
 * timeout. The only real data point: a 212-page audit took about 35 minutes
 * (02:10:45Z to 02:45:41Z) with 40 rate-limited failures. The formula also
 * gives 35 for 212 pages, but that is one run, so it is a single data point
 * and no validation; a run with more rejections takes longer.
 */
export function estimateLighthouseMinutes(pages: number) {
  const seconds =
    (pages / LIGHTHOUSE_PAGES_PER_WAVE) *
    (LIGHTHOUSE_SECONDS_PER_WAVE + LIGHTHOUSE_WAVE_PAUSE_SECONDS);
  return Math.max(1, Math.round(seconds / 60));
}
