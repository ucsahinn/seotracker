import { sort } from "remeda";
import {
  getIssueDescriptor,
  ISSUE_SEVERITY_ORDER,
  resolveIssueSeverity,
  type IssueSeverity,
} from "@/shared/audit-issues";
import { CRAWL_ISSUES } from "@/shared/audit-issues/crawl";
import { CONTENT_ISSUES } from "@/shared/audit-issues/content";
import { INDEXING_ISSUES } from "@/shared/audit-issues/indexing";
import { SPEED_ISSUES } from "@/shared/audit-issues/speed";
import { auditScoreTier, scoreAudit } from "@/shared/auditScore";
import { lighthouseBand } from "@/shared/lighthouse";
import { describeDetails } from "./reportFormat";
import type {
  AuditReportInput,
  ReportLighthouse,
  ReportPage,
} from "./reportTypes";

/* Pure numbers and groupings. No HTML in here: the sections draw from these. */

export type IssueCategory =
  | "crawl"
  | "content"
  | "indexing"
  | "speed"
  | "other";

export const CATEGORY_ORDER: IssueCategory[] = [
  "crawl",
  "content",
  "indexing",
  "speed",
  "other",
];

export const CATEGORY_LABEL: Record<IssueCategory, string> = {
  crawl: "Tarama",
  content: "İçerik",
  indexing: "Dizine alma",
  speed: "Hız",
  other: "Diğer",
};

export const SEVERITY_LABEL: Record<IssueSeverity, string> = {
  critical: "Kritik",
  warning: "Uyarı",
  info: "Bilgi",
};

export const SEVERITIES: IssueSeverity[] = ["critical", "warning", "info"];

/** The registry is split into one file per subject; that split is the category. */
function categoryOf(issueType: string): IssueCategory {
  if (issueType in CRAWL_ISSUES) return "crawl";
  if (issueType in CONTENT_ISSUES) return "content";
  if (issueType in INDEXING_ISSUES) return "indexing";
  if (issueType in SPEED_ISSUES) return "speed";
  return "other";
}

type IssueRow = { url: string; detail: string; siteLevel: boolean };

export type IssueGroup = {
  issueType: string;
  title: string;
  severity: IssueSeverity;
  category: IssueCategory;
  /** Distinct pages; a site-level finding counts as every crawled page. */
  pageCount: number;
  siteLevel: boolean;
  explanation: string;
  howToFix: string;
  rows: IssueRow[];
  /** Points fixing this gives back, from the same formula as the app. */
  points: number;
};

export function groupIssues(input: AuditReportInput): IssueGroup[] {
  const byType = new Map<string, { group: IssueGroup; pages: Set<string> }>();
  for (const issue of input.issues) {
    let entry = byType.get(issue.issueType);
    if (!entry) {
      const descriptor = getIssueDescriptor(issue.issueType);
      entry = {
        group: {
          issueType: issue.issueType,
          title: descriptor?.title ?? issue.issueType,
          // An unset severity falls back to the descriptor's, which is what
          // `resolveIssueSeverity` does with a value it does not recognise.
          severity: resolveIssueSeverity({
            issueType: issue.issueType,
            severity: issue.severity ?? "",
          }),
          category: categoryOf(issue.issueType),
          pageCount: 0,
          siteLevel: false,
          explanation: descriptor?.explanation ?? "",
          howToFix: descriptor?.howToFix ?? "",
          rows: [],
          points: 0,
        },
        pages: new Set(),
      };
      byType.set(issue.issueType, entry);
    }
    const siteLevel = issue.pageId === null;
    if (siteLevel) entry.group.siteLevel = true;
    else if (issue.pageUrl) entry.pages.add(issue.pageUrl);
    entry.group.rows.push({
      url: issue.pageUrl ?? "",
      detail: describeDetails(issue.detailsJson),
      siteLevel,
    });
  }

  const groups = [...byType.values()].map(({ group, pages }) => ({
    ...group,
    pageCount: group.siteLevel ? input.pagesCrawled : pages.size,
  }));

  const { gains } = scoreGroups(groups, input.pagesCrawled);
  const points = new Map(gains.map((gain) => [gain.issueType, gain.points]));

  /*
   * Severity first, then pages. The reader of a report opens it to answer
   * "what do I fix", and a critical on two pages outranks an info on ninety
   * -- the opposite of the in-app chart, which answers "where is the bulk".
   */
  return sort(
    groups.map((g) => ({ ...g, points: points.get(g.issueType) ?? 0 })),
    (a, b) =>
      ISSUE_SEVERITY_ORDER[a.severity] - ISSUE_SEVERITY_ORDER[b.severity] ||
      b.pageCount - a.pageCount,
  );
}

function scoreGroups(groups: IssueGroup[], pagesCrawled: number) {
  return scoreAudit(
    groups.map((g) => ({
      issueType: g.issueType,
      severity: g.severity,
      pages: g.pageCount,
    })),
    pagesCrawled,
  );
}

/** The site score, through the very function the app's score card uses. */
export function siteScore(groups: IssueGroup[], pagesCrawled: number) {
  return scoreGroups(groups, pagesCrawled);
}

export function countSeverities(groups: IssueGroup[]) {
  return {
    total: groups.length,
    critical: groups.filter((g) => g.severity === "critical").length,
    warning: groups.filter((g) => g.severity === "warning").length,
    info: groups.filter((g) => g.severity === "info").length,
  };
}

export function scoreVerdict(score: number | null): string {
  if (score === null) return "Taranan sayfa olmadığı için puan hesaplanamadı.";
  if (score === 100) return "Kayıtlı hiçbir sorun yok. Site temiz görünüyor.";
  switch (auditScoreTier(score)) {
    case "excellent":
      return "Site sağlıklı. Kalan birkaç düzeltme puanı yukarı çeker.";
    case "good":
      return "Temel sağlam, ama düzeltilmesi gereken belirgin sorunlar var.";
    case "fair":
      return "Orta düzeyde. Kritik ve uyarı sorunları aramadaki performansı gölgeliyor.";
    case "poor":
      return "Zayıf. Önce kritik sorunlar düzeltilmeli; bunlar sayfaların aramada görünmesini engelleyebilir.";
  }
}

type Bucket = { label: string; value: number };

function tally(
  labels: string[],
  values: Array<number | null>,
  pick: (value: number) => number,
): Bucket[] {
  const counts = labels.map(() => 0);
  for (const value of values) {
    if (value === null) continue;
    counts[pick(value)] += 1;
  }
  return labels.map((label, i) => ({ label, value: counts[i] }));
}

export function statusBuckets(pages: ReportPage[]): Bucket[] {
  const labels = ["2xx", "3xx", "4xx", "5xx", "Yanıt yok"];
  const counts = [0, 0, 0, 0, 0];
  for (const page of pages) {
    const code = page.statusCode;
    if (code === null || code < 200 || code >= 600) counts[4] += 1;
    else counts[Math.floor(code / 100) - 2] += 1;
  }
  return labels.map((label, i) => ({ label, value: counts[i] }));
}

export function depthBuckets(pages: ReportPage[]): Bucket[] {
  const labels = ["0", "1", "2", "3", "4", "5+"];
  const known = pages.map((p) => p.crawlDepth ?? null);
  const buckets = tally(labels, known, (d) => Math.min(5, Math.max(0, d)));
  const unknown = known.filter((d) => d === null).length;
  return unknown > 0
    ? [...buckets, { label: "Bilinmiyor", value: unknown }]
    : buckets;
}

export function titleLengthBuckets(pages: ReportPage[]): Bucket[] {
  const labels = ["Yok", "1-29", "30-60", "61+"];
  const counts = [0, 0, 0, 0];
  for (const page of pages) {
    const length = page.title?.trim().length ?? 0;
    counts[length === 0 ? 0 : length < 30 ? 1 : length <= 60 ? 2 : 3] += 1;
  }
  return labels.map((label, i) => ({ label, value: counts[i] }));
}

export function responseBuckets(pages: ReportPage[]): Bucket[] {
  return tally(
    ["<200 ms", "200-499", "500-999", "1000+"],
    pages.map((p) => p.responseTimeMs),
    (ms) => (ms < 200 ? 0 : ms < 500 ? 1 : ms < 1000 ? 2 : 3),
  );
}

export function describePages(pages: ReportPage[]) {
  const timed = pages.filter((page) => page.responseTimeMs !== null);
  const total = timed.reduce(
    (sum, page) => sum + (page.responseTimeMs ?? 0),
    0,
  );
  return {
    indexable: pages.filter((page) => page.isIndexable).length,
    inSitemap: pages.filter((page) => page.inSitemap).length,
    missingTitle: pages.filter((page) => !page.title).length,
    missingDescription: pages.filter((page) => !page.metaDescription).length,
    avgResponseMs: timed.length === 0 ? null : Math.round(total / timed.length),
  };
}

export function describeLighthouse(rows: ReportLighthouse[]) {
  const scored = rows.filter(
    (row) => row.strategy === "mobile" && row.performanceScore !== null,
  );
  if (scored.length === 0) return null;
  const bands = { poor: 0, fair: 0, good: 0 };
  const bins = Array.from({ length: 10 }, () => 0);
  for (const row of scored) {
    const score = row.performanceScore ?? 0;
    bands[lighthouseBand(score)] += 1;
    bins[Math.min(9, Math.floor(score / 10))] += 1;
  }
  const histogram: Bucket[] = bins.map((value, i) => ({
    label: i === 9 ? "90-100" : `${i * 10}-${i * 10 + 9}`,
    value,
  }));
  return { measured: scored.length, ...bands, histogram };
}
