/**
 * Whether the site carries a Google tag at all, and whether it is the one
 * the connected Analytics property expects.
 *
 * Both are statements about the site, so both are site-level findings on
 * the start URL, like the structured data and Open Graph ones. Both are
 * read from the HTML the crawler fetched: a tag injected later by another
 * script (a consent manager, a bundled loader) is invisible here, which is
 * why the missing-tag finding is `info` and its copy says so.
 */
import type { DetectedIssue } from "@/server/lib/audit/issues/page-reporters";
import type { SlimPage } from "@/server/lib/audit/issues/multipage-checks";

function isOkPage(page: SlimPage): boolean {
  return (
    page.fetchClass === "ok" &&
    page.statusCode !== null &&
    page.statusCode >= 200 &&
    page.statusCode < 300
  );
}

/**
 * Whether the pages' GA4 ids could be held against the property's: both
 * sides must have at least one. Recorded with the audit so the check reads
 * "passed" only when it really compared, and "not measured" otherwise.
 */
export function analyticsWasCompared(input: {
  pages: SlimPage[];
  tagIdsByPage: Map<string, string[]>;
  propertyMeasurementIds: string[] | null;
}): boolean {
  const expected = input.propertyMeasurementIds;
  if (!expected || expected.length === 0) return false;
  return input.pages
    .filter(isOkPage)
    .some((page) =>
      (input.tagIdsByPage.get(page.id) ?? []).some((id) => id.startsWith("G-")),
    );
}

export function findAnalyticsTagProblems(input: {
  pages: SlimPage[];
  /** Tag ids found per page id. */
  tagIdsByPage: Map<string, string[]>;
  startUrl: string;
  /**
   * The connected GA4 property's web stream measurement ids; null when no
   * property is connected or the list could not be read.
   */
  propertyMeasurementIds: string[] | null;
}): DetectedIssue[] {
  const okPages = input.pages.filter(isOkPage);
  if (okPages.length === 0) return [];
  const found = new Set(
    okPages.flatMap((page) => input.tagIdsByPage.get(page.id) ?? []),
  );

  if (found.size === 0) {
    return [
      {
        issueType: "analytics-tag-missing",
        pageId: null,
        pageUrl: input.startUrl,
        details: { pagesChecked: okPages.length },
      },
    ];
  }

  /*
   * Only GA4 ids can be compared with the property. A page that loads only
   * a Tag Manager container may well send to the right property from
   * inside it, and nothing here can see that, so it is not judged.
   */
  const pageMeasurementIds = [...found].filter((id) => id.startsWith("G-"));
  const expected = input.propertyMeasurementIds;
  if (!expected || expected.length === 0 || pageMeasurementIds.length === 0) {
    return [];
  }
  if (pageMeasurementIds.some((id) => expected.includes(id))) return [];
  return [
    {
      issueType: "analytics-id-mismatch",
      pageId: null,
      pageUrl: input.startUrl,
      details: {
        pageMeasurementIds,
        propertyMeasurementIds: expected,
      },
    },
  ];
}
