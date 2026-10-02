import type { LighthouseMode } from "@/server/lib/audit/types";
import {
  DEFAULT_AUDIT_PAGES,
  LIGHTHOUSE_CHECKS_PER_PAGE,
  MAX_AUDIT_PAGES,
  MIN_AUDIT_PAGES,
  UNKEYED_LIGHTHOUSE_PAGE_CAP,
} from "@/shared/audit-limits";

/*
 * A self-hosted install crawls its own sites on its own compute, so these are
 * not an abuse budget - they are what one machine can carry at once.
 *
 * They used to be `Infinity`, which made the concurrency guard in
 * `AuditService` unreachable. That guard is the only thing standing between
 * the machine and fifty simultaneous ten-thousand-page crawls, and `/mcp`
 * hands `run_site_audit` to an agent that can issue them in a loop: fifty
 * Workflows, fifty Durable Objects, the PageSpeed key spent, and the crawler
 * pointed at the target site all at once. Finite numbers cost a legitimate
 * operator nothing - three concurrent audits is already more than anyone
 * runs by hand - and turn a runaway agent into a clear error.
 */
export const AUDIT_LIMITS = {
  maxPagesPerAudit: MAX_AUDIT_PAGES,
  // Two full-size audits (10,000 pages + 20,000 Lighthouse checks each),
  // counted in pages + Lighthouse checks, across the audits running right
  // now. Finished audits do not count.
  maxCapacityUnits: 60_000,
  maxRunningAudits: 3,
};

export function clampAuditMaxPages(maxPages?: number) {
  // NaN survives Math.max/min and would become a NaN capacity reservation.
  const requested =
    typeof maxPages === "number" && Number.isFinite(maxPages)
      ? maxPages
      : DEFAULT_AUDIT_PAGES;
  return Math.min(Math.max(requested, MIN_AUDIT_PAGES), MAX_AUDIT_PAGES);
}

export function getEstimatedAuditCapacity(input: {
  maxPages?: number;
  lighthouseStrategy?: LighthouseMode;
  /** False when no PageSpeed key is set: the run measures at most 50 pages. */
  hasPageSpeedKey?: boolean;
}) {
  const pagesTotal = clampAuditMaxPages(input.maxPages);
  const lighthouseStrategy = input.lighthouseStrategy ?? "auto";
  // "auto" measures every crawled page on mobile + desktop. This is the
  // ceiling: the workflow replaces it with the real count once the crawl is
  // done. Without a PageSpeed key it measures at most the unkeyed cap, so the
  // reservation is capped the same way instead of overstating it.
  const measuredPages =
    input.hasPageSpeedKey === false
      ? Math.min(pagesTotal, UNKEYED_LIGHTHOUSE_PAGE_CAP)
      : pagesTotal;
  const lighthouseChecks =
    lighthouseStrategy === "auto"
      ? measuredPages * LIGHTHOUSE_CHECKS_PER_PAGE
      : 0;

  return {
    pagesTotal,
    lighthouseTotal: lighthouseChecks,
    total: pagesTotal + lighthouseChecks,
  };
}
