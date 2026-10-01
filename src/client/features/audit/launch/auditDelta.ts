import { sort } from "remeda";
import { fractionalChange } from "@/shared/delta";

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
 * "https://www.Example.com/blog/" and "http://example.com/blog" are one
 * scope: the address is typed by hand each run. The start path counts, since
 * a crawl of /blog is not comparable with a crawl of the whole host, and a
 * delta between them would be noise.
 */
export function siteKey(url: string): string {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase().replace(/^www\./, "");
    return host + parsed.pathname.replace(/\/+$/, "");
  } catch {
    return url.trim().toLowerCase();
  }
}

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

export function issueDelta(current: number, previous: number): IssueDelta {
  return {
    diff: current - previous,
    fraction: fractionalChange(current, previous),
  };
}
