import { sort } from "remeda";
import { siteKey } from "./auditTodo";

type Severity = "critical" | "warning" | "info";
type PanelIssueDelta = {
  issueType: string;
  severity: Severity;
  count: number;
  previousCount: number | null;
};
export type PanelAuditSnapshot = {
  startUrl: string;
  completed: boolean;
  config: {
    maxPages: number;
    lighthouseStrategy: string;
    externalChecks?: boolean;
  };
  pages: readonly { url: string; fetchClass: string }[];
  measuredChecks: readonly string[];
  speedUrls?: readonly string[];
  counts: readonly { issueType: string; severity: Severity; pages: number }[];
};

/** Compare a fixed URL population and only checks that both snapshots measured. */
export function comparePanelAudits(
  current: PanelAuditSnapshot,
  previous: PanelAuditSnapshot,
) {
  if (
    !current.completed ||
    !previous.completed ||
    siteKey(current.startUrl) !== siteKey(previous.startUrl)
  )
    return null;
  if (
    current.config.maxPages !== previous.config.maxPages ||
    current.config.lighthouseStrategy !== previous.config.lighthouseStrategy ||
    !!current.config.externalChecks !== !!previous.config.externalChecks
  )
    return null;
  if (
    !current.pages.length ||
    [...current.pages, ...previous.pages].some(
      (page) => page.fetchClass !== "ok",
    )
  )
    return null;
  const beforeUrls = new Set(previous.pages.map((page) => page.url));
  const nowUrls = new Set(current.pages.map((page) => page.url));
  if (
    nowUrls.size !== beforeUrls.size ||
    [...nowUrls].some((url) => !beforeUrls.has(url))
  )
    return null;
  const previousSpeed = new Set(previous.speedUrls ?? []);
  const currentSpeed = new Set(current.speedUrls ?? []);
  if (
    currentSpeed.size !== previousSpeed.size ||
    [...currentSpeed].some((url) => !previousSpeed.has(url))
  )
    return null;
  const previousChecks = new Set(previous.measuredChecks);
  const common = new Set(
    current.measuredChecks.filter((check) => previousChecks.has(check)),
  );
  if (!common.size) return null;
  const before = new Map(previous.counts.map((row) => [row.issueType, row]));
  const now = new Map(current.counts.map((row) => [row.issueType, row]));
  const newIssues: PanelIssueDelta[] = [];
  const resolvedIssues: PanelIssueDelta[] = [];
  for (const type of common) {
    const old = before.get(type);
    const next = now.get(type);
    const prior = old?.pages ?? 0;
    const count = next?.pages ?? 0;
    const severity = next?.severity ?? old?.severity;
    if (!severity || prior === count) continue;
    const delta = { issueType: type, severity, count, previousCount: prior };
    (count > prior ? newIssues : resolvedIssues).push(delta);
  }
  const rank = { critical: 0, warning: 1, info: 2 };
  const bySeverity = (a: PanelIssueDelta, b: PanelIssueDelta) =>
    rank[a.severity] - rank[b.severity] ||
    Math.max(b.count, b.previousCount ?? 0) -
      Math.max(a.count, a.previousCount ?? 0);
  return {
    newIssues: sort(newIssues, bySeverity),
    resolvedIssues: sort(resolvedIssues, bySeverity),
    partial:
      common.size <
      new Set([...current.measuredChecks, ...previous.measuredChecks]).size,
  };
}
