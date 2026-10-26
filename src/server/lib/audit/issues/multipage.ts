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
import {
  auditPageAnalyticsIds,
  auditPages,
  auditPageSchemaTypes,
  audits,
} from "@/db/schema";
import { AuditSiteFactsRepository } from "@/server/features/audit/repositories/AuditSiteFactsRepository";
import { HTML_CHECK_ISSUES } from "@/shared/audit-issues/html-checks";
import { Ga4ConnectionRepository } from "@/server/features/ga4/repositories/Ga4ConnectionRepository";
import { createGa4AdminClient } from "@/server/lib/ga4Client";
import {
  analyticsWasCompared,
  findAnalyticsTagProblems,
} from "@/server/lib/audit/issues/analytics-tag-check";
import { findNearDuplicates } from "@/server/lib/audit/issues/near-duplicate-check";
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
import {
  findMissingFeed,
  isArticleType,
} from "@/server/lib/audit/issues/site-structure-checks";
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

/** A third-party read that must never hold up or fail the audit. */
const GA4_LOOKUP_TIMEOUT_MS = 8_000;

/**
 * The connected GA4 property's web stream measurement ids, or null when no
 * property is connected or Google could not be asked in time. Null means
 * "not compared", never "mismatch".
 */
async function loadGa4MeasurementIds(
  projectId: string,
): Promise<string[] | null> {
  try {
    const connection = await Ga4ConnectionRepository.getByProjectId(projectId);
    if (!connection) return null;
    const client = createGa4AdminClient({
      userId: connection.connectedByUserId,
      ga4AccountId: connection.ga4AccountId,
    });
    let timer: ReturnType<typeof setTimeout> | undefined;
    const timeout = new Promise<null>((resolve) => {
      timer = setTimeout(() => resolve(null), GA4_LOOKUP_TIMEOUT_MS);
    });
    const streams = await Promise.race([
      client.listDataStreams(connection.propertyId),
      timeout,
    ]).finally(() => clearTimeout(timer));
    if (!streams) return null;
    const ids = streams.items
      .filter((stream) => stream.type === "WEB_DATA_STREAM")
      .map((stream) => stream.webStreamData?.measurementId)
      .filter((id): id is string => Boolean(id));
    // A cut-short list without the id proves nothing.
    return ids.length > 0 || streams.complete ? ids : null;
  } catch (error) {
    console.warn("GA4 measurement id lookup skipped:", error);
    return null;
  }
}

async function loadArticlePageIds(auditId: string): Promise<Set<string>> {
  const rows = await db
    .select({
      pageId: auditPageSchemaTypes.pageId,
      schemaType: auditPageSchemaTypes.schemaType,
    })
    .from(auditPageSchemaTypes)
    .where(eq(auditPageSchemaTypes.auditId, auditId));
  return new Set(
    rows.filter((row) => isArticleType(row.schemaType)).map((r) => r.pageId),
  );
}

async function loadTagIdsByPage(auditId: string) {
  const rows = await db
    .select({
      pageId: auditPageAnalyticsIds.pageId,
      tagId: auditPageAnalyticsIds.tagId,
    })
    .from(auditPageAnalyticsIds)
    .where(eq(auditPageAnalyticsIds.auditId, auditId));
  const byPage = new Map<string, string[]>();
  for (const row of rows) {
    const list = byPage.get(row.pageId);
    if (list) list.push(row.tagId);
    else byPage.set(row.pageId, [row.tagId]);
  }
  return byPage;
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
      contentSimhash: auditPages.contentSimhash,
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
      hasFeedLink: auditPages.hasFeedLink,
    })
    .from(auditPages)
    .where(eq(auditPages.auditId, input.auditId));

  const pages: SlimPage[] = rows.map(({ hreflangTagsJson, ...page }) => ({
    ...page,
    hreflangAlternates: parseHreflangAlternates(hreflangTagsJson),
  }));
  const feed = findMissingFeed({
    pages: rows,
    articlePageIds: await loadArticlePageIds(input.auditId),
    startUrl: input.startUrl,
  });
  /*
   * The per-page HTML checks ran during the crawl. A crawl that reads them
   * stores the feed flag on every analyzed page, so the flag doubles as the
   * proof that they ran. The breadcrumb check is recorded by the finalize
   * step, which alone knows whether click depths are exact.
   */
  if (feed.measured) {
    await AuditSiteFactsRepository.recordMeasuredChecks(
      input.auditId,
      Object.keys(HTML_CHECK_ISSUES).filter(
        (id) => id !== "missing-breadcrumbs",
      ),
    );
  }

  const analytics = {
    pages,
    tagIdsByPage: await loadTagIdsByPage(input.auditId),
    propertyMeasurementIds: await loadGa4MeasurementIds(input.projectId),
  };
  // Idempotent, so a retried finalize step writes the same answer.
  await db
    .update(audits)
    .set({ analyticsCompared: analyticsWasCompared(analytics) })
    .where(eq(audits.id, input.auditId));

  return [
    ...findDuplicates(pages),
    ...findNearDuplicates(pages),
    ...findRedirectChainsAndLoops(pages),
    ...findCanonicalTargetProblems(pages),
    ...findHreflangReturnTagProblems(pages),
    ...findHreflangTargetProblems(pages),
    ...findMissingStructuredData(pages, input.startUrl),
    ...findMissingOpenGraph(pages, input.startUrl),
    ...findAnalyticsTagProblems({ ...analytics, startUrl: input.startUrl }),
    ...feed.issues,
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
    ...(await findLighthouseProblems({
      auditId: input.auditId,
      startUrl: input.startUrl,
    })),
  ];
}
