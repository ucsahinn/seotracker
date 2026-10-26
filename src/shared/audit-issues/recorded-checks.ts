/**
 * Checks whose measurement each audit records explicitly
 * (`audit_measured_checks`, migration 0067), read back as
 * `SiteFacts.measuredChecks`.
 *
 * Unlike the checks that only need "the crawl ran", these depend on
 * something that may or may not have happened in a given audit: Lighthouse
 * reporting that particular audit, the opt-in external requests, a complete
 * link graph. An audit that did not record one -- because it predates
 * these checks, ran with the option off, or could not measure it -- shows
 * it as unknown, never as passed.
 */
import { EXTERNAL_CHECK_ISSUES } from "./external-checks";
import { HTML_CHECK_ISSUES } from "./html-checks";
import { LIGHTHOUSE_AUDIT_ISSUES } from "./lighthouse-audits";
import { ROBOTS_SITEMAP_CHECK_ISSUES } from "./robots-sitemap-checks";

export const RECORDED_CHECKS: ReadonlySet<string> = new Set([
  ...Object.keys(LIGHTHOUSE_AUDIT_ISSUES),
  ...Object.keys(HTML_CHECK_ISSUES),
  ...Object.keys(EXTERNAL_CHECK_ISSUES),
  ...Object.keys(ROBOTS_SITEMAP_CHECK_ISSUES),
]);
