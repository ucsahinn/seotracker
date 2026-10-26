import { searchFold } from "@/client/lib/searchFold";
import { buildCsv } from "@/client/lib/csv";
import { formatCount } from "@/client/lib/format";
import {
  describeIssueDetails,
  detailLineText,
  type DetailLine,
} from "@/shared/audit-issues/details";
import {
  SEVERITY_LABEL,
  type AuditIssueRow,
  type IssueGroup,
} from "@/client/features/audit/results/issueGroups";
import { t } from "@/shared/i18n";

export const PAGE_STEP = 10;
/** Past this many pages a search box earns its place. */
export const SEARCH_THRESHOLD = 20;

/** One page, with what was found on it (one entry per record). */
export interface AffectedPage {
  url: string;
  records: DetailLine[][];
}

/**
 * A finding about the whole site (robots.txt, sitemap) rather than a page.
 * The crawler files those with no page id, pointing at the start address, so
 * printing "1 sayfa" for them named a page that has nothing wrong with it.
 */
export function isSiteWide(issues: AuditIssueRow[]): boolean {
  return issues.length > 0 && issues.every((issue) => issue.pageId === null);
}

/** Distinct pages in first-seen order, each with all of its records. */
export function buildAffectedPages(issues: AuditIssueRow[]): AffectedPage[] {
  const pages = new Map<string, AffectedPage>();
  for (const issue of issues) {
    let page = pages.get(issue.pageUrl);
    if (!page) {
      page = { url: issue.pageUrl, records: [] };
      pages.set(issue.pageUrl, page);
    }
    page.records.push(describeIssueDetails(issue.issueType, issue.detailsJson));
  }
  return Array.from(pages.values());
}

export function filterAffectedPages(
  pages: AffectedPage[],
  query: string,
): AffectedPage[] {
  const needle = searchFold(query.trim());
  if (!needle) return pages;
  return pages.filter(
    (page) =>
      searchFold(page.url).includes(needle) ||
      page.records.some((lines) =>
        lines.some((line) => searchFold(line.value).includes(needle)),
      ),
  );
}

/** How many rows to show after pressing "daha fazla göster". */
export function nextVisibleCount(current: number, total: number): number {
  return Math.min(current + PAGE_STEP, total);
}

/** What the copy button puts on the clipboard: every address, one per line. */
export function buildCopyText(urls: string[]): string {
  return urls.join("\n");
}

/**
 * What the count beside an issue says. Pages are what the operator fixes; the
 * ring above counts records, so when the two differ both are named.
 */
export function buildCountLabel(group: IssueGroup, siteWide: boolean): string {
  if (siteWide) return t("Tüm site");
  return group.issues.length === group.pageCount
    ? t("{count} sayfa", { count: group.pageCount })
    : t("{count} sayfa · {findings} bulgu", {
        count: group.pageCount,
        findings: formatCount(group.issues.length),
      });
}

export function buildIssueCsv(group: IssueGroup): string {
  const rows = group.issues.map((issue) => [
    t(SEVERITY_LABEL[group.severity]),
    group.title,
    issue.pageUrl,
    describeIssueDetails(issue.issueType, issue.detailsJson)
      .map(detailLineText)
      .join(" | "),
    group.howToFix,
  ]);
  return buildCsv(
    [t("Önem"), t("Sorun"), t("Adres"), t("Ayrıntı"), t("Nasıl düzeltilir")],
    rows,
  );
}

export function issueCsvFilename(group: IssueGroup): string {
  return `sorun-${group.issueType}.csv`;
}
