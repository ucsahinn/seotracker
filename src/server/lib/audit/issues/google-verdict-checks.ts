/**
 * What Google already told us about these pages, turned into audit findings.
 *
 * `gsc_url_inspections` has held Google's own verdict since the Index
 * Coverage screen was built, and it was rendered only on that screen. So the
 * one thing Google can say that a crawler genuinely cannot -- that a page
 * returning 200 is a soft 404 -- appeared nowhere in the issue list, the
 * severity rollup, the CSV export, or the MCP issue tool.
 *
 * Free by construction: this reads the cache and never calls Google, so it
 * spends nothing against the 2000-per-property-per-day URL Inspection
 * allowance that `GscIndexCoverageService` manages.
 */
import { and, eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import { gscUrlInspections } from "@/db/schema";
import type { DetectedIssue } from "@/server/lib/audit/issues/page-reporters";
import { URL_BIND_CHUNK } from "@/server/features/gsc/indexCoverage";
import { canonicalUrlKey } from "@/server/lib/audit/url-utils";

type PageRef = { id: string; url: string };

export async function findGoogleVerdictProblems(input: {
  projectId: string;
  pages: PageRef[];
}): Promise<DetectedIssue[]> {
  if (input.pages.length === 0) return [];

  const byUrl = new Map(input.pages.map((page) => [page.url, page]));
  const urls = [...byUrl.keys()];
  const issues: DetectedIssue[] = [];

  for (let i = 0; i < urls.length; i += URL_BIND_CHUNK) {
    const rows = await db
      .select({
        url: gscUrlInspections.url,
        verdict: gscUrlInspections.verdict,
        pageFetchState: gscUrlInspections.pageFetchState,
        indexingState: gscUrlInspections.indexingState,
        robotsTxtState: gscUrlInspections.robotsTxtState,
        googleCanonical: gscUrlInspections.googleCanonical,
        userCanonical: gscUrlInspections.userCanonical,
        checkedAt: gscUrlInspections.checkedAt,
      })
      .from(gscUrlInspections)
      .where(
        and(
          eq(gscUrlInspections.projectId, input.projectId),
          inArray(gscUrlInspections.url, urls.slice(i, i + URL_BIND_CHUNK)),
        ),
      );

    for (const row of rows) {
      const page = byUrl.get(row.url);
      if (!page) continue;
      const at = { pageId: page.id, pageUrl: page.url };
      /*
       * The stored answer can be up to fourteen days old, which is the
       * staleness window the refresh scheduler uses. Every finding carries
       * the timestamp so the report can say when Google said it, rather
       * than implying it is true right now.
       */
      const details = { checkedAt: row.checkedAt };

      if (row.pageFetchState === "SOFT_404") {
        issues.push({ ...at, issueType: "google-soft-404", details });
      }
      if (
        row.robotsTxtState === "DISALLOWED" ||
        row.indexingState === "BLOCKED_BY_ROBOTS_TXT"
      ) {
        issues.push({
          ...at,
          issueType: "google-blocked-by-robots",
          details: { ...details, robotsTxtState: row.robotsTxtState },
        });
      }
      if (row.indexingState === "BLOCKED_BY_META_TAG") {
        issues.push({ ...at, issueType: "google-blocked-by-meta", details });
      }
      /*
       * Only when the page actually declared one. Google overriding an
       * undeclared canonical is ordinary behaviour on any site with
       * parameterised URLs, and reporting it would bury the case worth
       * seeing. Compared through `canonicalUrlKey` for the same reason the
       * coverage tile is: a trailing slash is not a disagreement.
       */
      if (
        row.userCanonical &&
        row.googleCanonical &&
        canonicalUrlKey(row.userCanonical) !==
          canonicalUrlKey(row.googleCanonical)
      ) {
        issues.push({
          ...at,
          issueType: "google-chose-different-canonical",
          details: {
            ...details,
            declared: row.userCanonical,
            chosen: row.googleCanonical,
          },
        });
      }
    }
  }

  return issues;
}
