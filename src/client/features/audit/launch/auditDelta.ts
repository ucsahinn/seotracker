import { sort } from "remeda";
import { fractionalChange } from "@/shared/delta";
import { siteKey } from "@/shared/auditTodo";

export { siteKey };

type Counts = { critical: number; warning: number };

type DeltaRow = {
  id: string;
  startUrl: string;
  status: string;
  startedAt: string;
  issues: Counts;
};

export type IssueDelta = {
  /** Signed change in the raw count; negative means fewer issues. */
  diff: number;
  /** Null when the previous count was zero, so there is no base to scale. */
  fraction: number | null;
};

/**
 * For each completed audit, the nearest earlier completed audit of the same
 * site. A running or failed audit holds partial counts, so it is neither
 * compared nor used as a base.
 */
export function previousAuditIds(rows: DeltaRow[]): Map<string, string> {
  const completed = sort(
    rows.filter((row) => row.status === "completed"),
    (a, b) => a.startedAt.localeCompare(b.startedAt),
  );
  const lastBySite = new Map<string, string>();
  const previous = new Map<string, string>();
  for (const row of completed) {
    const key = siteKey(row.startUrl);
    const base = lastBySite.get(key);
    if (base) previous.set(row.id, base);
    lastBySite.set(key, row.id);
  }
  return previous;
}

export type AuditSite = { key: string; label: string; count: number };

/**
 * The sites a project's audits covered, by host, the project's own first and
 * then by audit count. One project can hold audits of several addresses
 * (a client's site, a test crawl of something else), and a trend line or a
 * "previous audit" across two of them compares two different sites.
 */
export function auditSites(
  rows: ReadonlyArray<{ startUrl: string }>,
  projectDomain: string | null,
): AuditSite[] {
  const counts = new Map<string, number>();
  for (const row of rows) {
    const key = siteHost(row.startUrl);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  const own = projectDomain ? siteHost(projectDomain) : null;
  return sort(
    [...counts].map(([key, count]) => ({ key, label: key, count })),
    (a, b) =>
      Number(b.key === own) - Number(a.key === own) || b.count - a.count,
  );
}

/** A site's host without "www.", the key `auditSites` groups by. */
export function siteHost(url: string): string {
  const withScheme = url.includes("://") ? url : `https://${url}`;
  return siteKey(withScheme).split("/")[0] ?? url;
}

export function issueDelta(current: number, previous: number): IssueDelta {
  return {
    diff: current - previous,
    fraction: fractionalChange(current, previous),
  };
}
