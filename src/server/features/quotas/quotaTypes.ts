/**
 * The wire shape of the quota layer, shared by the service, the server
 * function and the client. Pure data and pure rules: no database, no React.
 */

/** Which screen asks for which meters. */
export const QUOTA_KINDS = [
  "url_inspection",
  "pagespeed",
  "ga4",
  "audit",
  "reports",
] as const;
export type QuotaKind = (typeof QUOTA_KINDS)[number];

export type QuotaState = "ok" | "warn" | "critical" | "unknown";

export type QuotaUnit =
  | "sorgu"
  | "ölçüm"
  | "belirteç"
  | "sayfa"
  | "rapor"
  | "şablon"
  | "bayt";

export type QuotaItem = {
  id: string;
  kind: QuotaKind;
  label: string;
  /** Null when the code has no real counter for this limit. */
  used: number | null;
  /** Null when no verified ceiling exists: the item then shows status text. */
  limit: number | null;
  unit: QuotaUnit;
  state: QuotaState;
  /** One Turkish sentence: the window, and what the figure does not say. */
  detail: string;
  /** Where the number comes from, shown beside it. */
  source: string;
  /** When the figure was computed or last seen; null for a static limit. */
  updatedAt: string | null;
};

export type QuotaStatus = { items: QuotaItem[]; generatedAt: string };

const WARN_FRACTION = 0.7;
const CRITICAL_FRACTION = 0.9;

/** Share of the limit used, clamped to 0..1; null without both numbers. */
export function usedFraction(
  used: number | null,
  limit: number | null,
): number | null {
  if (used === null || limit === null || limit <= 0) return null;
  return Math.min(Math.max(used / limit, 0), 1);
}

/** warn from 70 %, critical from 90 %; unknown when there is no ratio. */
export function stateFromUsage(
  used: number | null,
  limit: number | null,
): QuotaState {
  const fraction = usedFraction(used, limit);
  if (fraction === null) return "unknown";
  if (fraction >= CRITICAL_FRACTION) return "critical";
  if (fraction >= WARN_FRACTION) return "warn";
  return "ok";
}
