/**
 * Cross-page (multipage) issue checks over the app DB's page rows:
 * duplicates, redirect chains/loops, and canonical targets. Pure set-queries over crawl data —
 * no fetching, no DOM.
 *
 * The two link-edge checks (broken-internal-link, orphan-page) live in the
 * audit's scratchpad Durable Object (AuditScratchpad.runFinalizeChecks),
 * next to the link edges themselves — link rows never touch the app DB.
 */
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { auditPages } from "@/db/schema";
import {
  findCanonicalTargetProblems,
  findDuplicates,
  findHreflangReturnTagProblems,
  findHreflangTargetProblems,
  findMissingStructuredData,
  findRedirectChainsAndLoops,
  type SlimPage,
} from "@/server/lib/audit/issues/multipage-checks";
import { findGoogleVerdictProblems } from "@/server/lib/audit/issues/google-verdict-checks";
import { findLighthouseProblems } from "@/server/lib/audit/issues/lighthouse-checks";
import { findMissingOpenGraph } from "@/server/lib/audit/issues/open-graph-check";
import type { DetectedIssue } from "@/server/lib/audit/issues/page-reporters";
import type { HreflangAlternate } from "@/server/lib/audit/types";

/*
 * The column is written by this app, but it is still a text column that an
 * older crawl may have filled with a different shape: before return tags
 * were checked it stored bare language codes. Parsing it back through a
 * schema means a stale audit renders as "no alternates" rather than
 * throwing halfway through the checks.
 */
const hreflangAlternatesSchema = z
  .array(z.object({ hreflang: z.string(), href: z.string() }))
  .catch([]);

function parseHreflangAlternates(json: string | null): HreflangAlternate[] {
  if (!json) return [];
  try {
    return hreflangAlternatesSchema.parse(JSON.parse(json));
  } catch {
    return [];
  }
}

export async function runMultipageChecks(input: {
  auditId: string;
  projectId: string;
  /** For findings about the crawl as a whole rather than about one page. */
  startUrl: string;
}): Promise<DetectedIssue[]> {
  const rows = await db
    .select({
      id: auditPages.id,
      url: auditPages.url,
      statusCode: auditPages.statusCode,
      fetchClass: auditPages.fetchClass,
      title: auditPages.title,
      firstH1: auditPages.firstH1,
      metaDescription: auditPages.metaDescription,
      contentHash: auditPages.contentHash,
      redirectUrl: auditPages.redirectUrl,
      wordCount: auditPages.wordCount,
      isIndexable: auditPages.isIndexable,
      canonicalUrl: auditPages.canonicalUrl,
      headerCanonicalUrl: auditPages.headerCanonicalUrl,
      robotsMeta: auditPages.robotsMeta,
      googlebotMeta: auditPages.googlebotMeta,
      xRobotsTag: auditPages.xRobotsTag,
      hreflangTagsJson: auditPages.hreflangTagsJson,
      hasStructuredData: auditPages.hasStructuredData,
      ogTitle: auditPages.ogTitle,
      ogImage: auditPages.ogImage,
    })
    .from(auditPages)
    .where(eq(auditPages.auditId, input.auditId));

  const pages: SlimPage[] = rows.map(({ hreflangTagsJson, ...page }) => ({
    ...page,
    hreflangAlternates: parseHreflangAlternates(hreflangTagsJson),
  }));

  return [
    ...findDuplicates(pages),
    ...findRedirectChainsAndLoops(pages),
    ...findCanonicalTargetProblems(pages),
    ...findHreflangReturnTagProblems(pages),
    ...findHreflangTargetProblems(pages),
    ...findMissingStructuredData(pages, input.startUrl),
    ...findMissingOpenGraph(pages, input.startUrl),
    /*
     * Google's own verdicts, read from the inspection cache these rows can
     * be joined to. Free: nothing is called, so it spends none of the
     * 2000-per-property-per-day URL Inspection allowance. Silent until
     * something has actually been inspected, which is every fresh install.
     */
    ...(await findGoogleVerdictProblems({
      projectId: input.projectId,
      pages,
    })),
    /*
     * The speed measurement, which the Lighthouse phase has already written
     * by the time finalize runs. Silent when the audit was started with
     * Lighthouse off, because then there are no rows.
     */
    ...(await findLighthouseProblems({ auditId: input.auditId })),
  ];
}
