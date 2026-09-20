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
  findRedirectChainsAndLoops,
  type SlimPage,
} from "@/server/lib/audit/issues/multipage-checks";
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
}): Promise<DetectedIssue[]> {
  const rows = await db
    .select({
      id: auditPages.id,
      url: auditPages.url,
      statusCode: auditPages.statusCode,
      fetchClass: auditPages.fetchClass,
      title: auditPages.title,
      metaDescription: auditPages.metaDescription,
      contentHash: auditPages.contentHash,
      redirectUrl: auditPages.redirectUrl,
      wordCount: auditPages.wordCount,
      isIndexable: auditPages.isIndexable,
      canonicalUrl: auditPages.canonicalUrl,
      headerCanonicalUrl: auditPages.headerCanonicalUrl,
      robotsMeta: auditPages.robotsMeta,
      xRobotsTag: auditPages.xRobotsTag,
      hreflangTagsJson: auditPages.hreflangTagsJson,
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
  ];
}
