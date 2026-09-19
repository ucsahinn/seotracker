import type { LighthouseMode } from "@/server/lib/audit/types";
import {
  DEFAULT_AUDIT_PAGES,
  MAX_AUDIT_PAGES,
  MIN_AUDIT_PAGES,
} from "@/shared/audit-limits";

// A self-hosted install crawls its own sites on its own compute, so there is no
// abuse budget to enforce — only the technical ceiling the Workflow and the
// database can carry per audit.
export const AUDIT_LIMITS = {
  maxPagesPerAudit: MAX_AUDIT_PAGES,
  maxCapacityUnits: Number.POSITIVE_INFINITY,
  maxRunningAudits: Number.POSITIVE_INFINITY,
};

export function clampAuditMaxPages(maxPages?: number) {
  return Math.min(
    Math.max(maxPages ?? DEFAULT_AUDIT_PAGES, MIN_AUDIT_PAGES),
    MAX_AUDIT_PAGES,
  );
}

export function getEstimatedAuditCapacity(input: {
  maxPages?: number;
  lighthouseStrategy?: LighthouseMode;
}) {
  const pagesTotal = clampAuditMaxPages(input.maxPages);
  const lighthouseStrategy = input.lighthouseStrategy ?? "auto";
  // "auto" samples up to 10 pages, checked on mobile + desktop.
  const lighthouseChecks = lighthouseStrategy === "auto" ? 20 : 0;

  return {
    pagesTotal,
    lighthouseTotal: lighthouseChecks,
    total: pagesTotal + lighthouseChecks,
  };
}
