/**
 * Google's own view of the site's sitemaps.
 *
 * Distinct from crawling the sitemap yourself, which is what
 * `run_site_audit` does: this says whether Google ever downloaded the file,
 * when it last did, and how many errors it found in it. When pages are
 * missing from the index those are different problems with different fixes,
 * and neither the app nor an agent could tell them apart before.
 *
 * Free in the sense that matters: unlike `inspect_urls` there is no
 * per-property daily cap, only a per-user rate limit far above what one
 * operator generates.
 */
import { z } from "zod";
import { GscSitemapService } from "@/server/features/gsc/services/GscSitemapService";
import { buildProjectMeta } from "@/server/mcp/context";
import { mcpResponse } from "@/server/mcp/formatters";
import { optionalMetaOutputSchema } from "@/server/mcp/output-schemas";
import { withMcpProjectAuth } from "@/server/mcp/project-auth";
import { projectIdSchema } from "@/server/mcp/schemas";

const inputSchema = { projectId: projectIdSchema } as const;

type Args = z.infer<z.ZodObject<typeof inputSchema>>;

export const getSitemapsTool = {
  name: "get_sitemaps",
  config: {
    title: "Get sitemap status",
    description:
      "What Google made of this property's submitted sitemaps: when each was last downloaded, how many errors and warnings Google found in it, and how many URLs it declares. This is Google's side of the conversation, not a crawl of the file -- 'Google has not fetched your sitemap since March' and 'Google fetched it and excluded the pages' are different problems and this is the tool that tells them apart. Read-only and free: no per-property daily quota, unlike inspect_urls.",
    inputSchema,
    outputSchema: {
      status: z.enum(["ok", "not_connected", "forbidden"]),
      siteUrl: z.string().optional(),
      sitemaps: z.array(z.record(z.string(), z.unknown())).optional(),
      ...optionalMetaOutputSchema,
    },
    annotations: {
      readOnlyHint: true,
      openWorldHint: true,
      destructiveHint: false,
    },
  },
  handler: withMcpProjectAuth(async (args: Args, context) => {
    const report = await GscSitemapService.getSitemaps(args.projectId);
    const meta = buildProjectMeta(
      context,
      args.projectId,
      `/p/${args.projectId}/settings/integrations`,
    );

    if (report.status === "not_connected") {
      return mcpResponse({
        text: "Search Console is not connected for this project, so there are no sitemaps to read.",
        meta,
        structuredContent: { status: report.status },
      });
    }
    if (report.status === "forbidden") {
      return mcpResponse({
        text: "Google refused to list this property's sitemaps. Search Console documents who may submit a sitemap and not who may list them, so a restricted account can reach the property and still be denied here.",
        meta,
        structuredContent: { status: report.status },
      });
    }

    /*
     * Nobody has submitted one and Google found nothing are the same
     * answer here, and both are worth saying plainly: an absent sitemap is
     * not an error, it is a thing Google recommends and this site has not
     * done.
     */
    if (report.sitemaps.length === 0) {
      return mcpResponse({
        text: `No sitemap is submitted for ${report.siteUrl}. Google discovers pages without one, but a sitemap is how a site states which pages it considers canonical and worth crawling.`,
        meta,
        structuredContent: {
          status: report.status,
          siteUrl: report.siteUrl,
          sitemaps: [],
        },
      });
    }

    const lines = report.sitemaps.map((sitemap) => {
      const downloaded = sitemap.lastDownloaded
        ? `last downloaded ${sitemap.lastDownloaded}`
        : "never downloaded by Google";
      const problems =
        sitemap.errors > 0 || sitemap.warnings > 0
          ? `, ${sitemap.errors} errors, ${sitemap.warnings} warnings`
          : "";
      const pending = sitemap.isPending ? ", not processed yet" : "";
      return `  ${sitemap.path} — ${sitemap.submitted} URLs, ${downloaded}${problems}${pending}`;
    });

    const withErrors = report.sitemaps.filter(
      (sitemap) => sitemap.errors > 0,
    ).length;
    const neverFetched = report.sitemaps.filter(
      (sitemap) => !sitemap.lastDownloaded,
    ).length;

    const headline =
      `${report.sitemaps.length} sitemap${report.sitemaps.length === 1 ? "" : "s"} submitted for ${report.siteUrl}.` +
      (withErrors > 0 ? ` ${withErrors} with errors.` : "") +
      (neverFetched > 0 ? ` ${neverFetched} Google has never downloaded.` : "");

    return mcpResponse({
      text: `${headline}\n${lines.join("\n")}`,
      meta,
      structuredContent: {
        status: report.status,
        siteUrl: report.siteUrl,
        sitemaps: report.sitemaps,
      },
    });
  }),
};
