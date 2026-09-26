import { sort } from "remeda";
import { GscConnectionRepository } from "@/server/features/gsc/repositories/GscConnectionRepository";
import { createGscClient, type GscSitemap } from "@/server/lib/gscClient";
import { GscApiError } from "@/server/lib/gscErrors";

/**
 * What Google made of the sitemaps this site submitted.
 *
 * The crawler already parses sitemaps to find pages. This is the other half
 * of that conversation and the app had no access to it: whether Google ever
 * downloaded the file, when it last did, and how many errors it found. When
 * pages are missing from the index, "Google has not fetched your sitemap
 * since March" is a different problem from "Google fetched it and excluded
 * the pages", and the two were indistinguishable from inside this tool.
 *
 * Unlike URL Inspection there is no per-property daily cap on this call --
 * only a per-user rate limit far above anything one operator generates -- so
 * it is read on render rather than cached behind a button.
 */

type SitemapSummary = {
  path: string;
  lastSubmitted: string | null;
  lastDownloaded: string | null;
  isPending: boolean;
  isSitemapsIndex: boolean;
  type: string | null;
  warnings: number;
  errors: number;
  /** URLs the sitemap declares, summed across its content types. */
  submitted: number;
  contents: { type: string | null; submitted: number }[];
};

type SitemapReport =
  | { status: "ok"; siteUrl: string; sitemaps: SitemapSummary[] }
  | { status: "not_connected" }
  /**
   * Search Console's permission table documents who may *submit* a sitemap
   * and says nothing about who may list them, so a property that lists fine
   * can still answer 403 here. That is a "you cannot see this", not a fault.
   */
  | { status: "forbidden" };

function toSummary(sitemap: GscSitemap): SitemapSummary {
  return {
    path: sitemap.path ?? "",
    lastSubmitted: sitemap.lastSubmitted ?? null,
    lastDownloaded: sitemap.lastDownloaded ?? null,
    isPending: sitemap.isPending,
    isSitemapsIndex: sitemap.isSitemapsIndex,
    type: sitemap.type ?? null,
    warnings: sitemap.warnings,
    errors: sitemap.errors,
    submitted: sitemap.contents.reduce(
      (total, entry) => total + entry.submitted,
      0,
    ),
    contents: sitemap.contents.map((entry) => ({
      type: entry.type ?? null,
      submitted: entry.submitted,
    })),
  };
}

async function getSitemaps(projectId: string): Promise<SitemapReport> {
  const connection = await GscConnectionRepository.getByProjectId(projectId);
  if (!connection) return { status: "not_connected" };

  const client = createGscClient({
    userId: connection.connectedByUserId,
    gscAccountId: connection.gscAccountId ?? undefined,
  });

  try {
    const sitemaps = await client.listSitemaps(connection.siteUrl);
    return {
      status: "ok",
      siteUrl: connection.siteUrl,
      /*
       * Most errors first, then most warnings: the reason to open this
       * screen is to find the broken one, and a site with thirty clean
       * sitemaps should not make the operator scroll to it.
       */
      sitemaps: sort(
        sitemaps.map(toSummary),
        (a, b) =>
          b.errors - a.errors ||
          b.warnings - a.warnings ||
          a.path.localeCompare(b.path),
      ),
    };
  } catch (error) {
    if (error instanceof GscApiError && error.status === 403) {
      return { status: "forbidden" };
    }
    throw error;
  }
}

export const GscSitemapService = { getSitemaps };
