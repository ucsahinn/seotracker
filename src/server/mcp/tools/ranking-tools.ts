/**
 * The two things this install knows that Google will not tell you twice.
 *
 * Search Console deletes everything past 16 months, so the archive here is
 * the only place a longer series exists; and Google reports a query's
 * position without saying which of your pages earned it, so a query split
 * across two of your own pages looks fine in Search Console and is only
 * visible once the pages are compared.
 *
 * Both were reachable from the app and not from an agent, which made the MCP
 * surface a strictly smaller product than the screens beside it.
 */
import { z } from "zod";
import type { CannibalizedQuery } from "@/server/features/gsc/cannibalization";
import { getCannibalization } from "@/server/features/gsc/services/CannibalizationService";
import { GscHistoryService } from "@/server/features/gsc/services/GscHistoryService";
import { buildProjectMeta } from "@/server/mcp/context";
import { mcpResponse } from "@/server/mcp/formatters";
import { optionalMetaOutputSchema } from "@/server/mcp/output-schemas";
import { withMcpProjectAuth } from "@/server/mcp/project-auth";
import { projectIdSchema } from "@/server/mcp/schemas";

function sinceDate(days: number): string {
  const since = new Date();
  since.setUTCDate(since.getUTCDate() - days);
  return since.toISOString().slice(0, 10);
}

function round(value: number | null | undefined, digits = 1): number | null {
  if (value == null || !Number.isFinite(value)) return null;
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

// --- get_ranking_history ---------------------------------------------------

const historyInputSchema = {
  projectId: projectIdSchema,
  days: z
    .number()
    .int()
    .min(7)
    .max(480)
    .optional()
    .describe(
      "Window in days, read from the local archive rather than from Google. Default 90. Up to 480, which is past Search Console's own 16-month limit -- that is the point of the archive.",
    ),
  query: z
    .string()
    .min(1)
    .max(200)
    .optional()
    .describe(
      "One query's day-by-day series instead of the summary. Omit for the list of tracked queries.",
    ),
  limit: z
    .number()
    .int()
    .min(1)
    .max(100)
    .optional()
    .describe("Maximum queries in the summary. Default 25."),
} as const;

type HistoryArgs = z.infer<z.ZodObject<typeof historyInputSchema>>;

export const getRankingHistoryTool = {
  name: "get_ranking_history",
  config: {
    title: "Get ranking history",
    description:
      "Average position, clicks and impressions per query from this install's own Search Console archive, which keeps going after Google's 16-month window closes. Pass `query` for one query's day-by-day series, which is how you answer whether something moved and when. Free: reads the local database, not Google. The archive fills in when the Rankings page is opened, so a brand-new install may have little in it.",
    inputSchema: historyInputSchema,
    outputSchema: {
      days: z.number(),
      rows: z.array(z.record(z.string(), z.unknown())),
      ...optionalMetaOutputSchema,
    },
    annotations: {
      readOnlyHint: true,
      openWorldHint: false,
      destructiveHint: false,
    },
  },
  handler: withMcpProjectAuth(async (args: HistoryArgs, context) => {
    const days = args.days ?? 90;
    const meta = buildProjectMeta(
      context,
      args.projectId,
      `/p/${args.projectId}/rankings`,
    );

    if (args.query) {
      const rows = await GscHistoryService.getQueryHistory({
        projectId: args.projectId,
        query: args.query,
        since: sinceDate(days),
      });
      const text =
        rows.length === 0
          ? `No archived days for "${args.query}" in the last ${days} days. The archive fills in when the Rankings page is opened.`
          : `"${args.query}" - ${rows.length} archived days\n` +
            rows
              .map(
                (row) =>
                  `- ${row.date}  pos:${round(row.position)}  clicks:${row.clicks}  impressions:${row.impressions}`,
              )
              .join("\n");
      return mcpResponse({ text, meta, structuredContent: { days, rows } });
    }

    const rows = await GscHistoryService.getTrackedQueries({
      projectId: args.projectId,
      since: sinceDate(days),
      limit: args.limit ?? 25,
    });
    const text =
      rows.length === 0
        ? `The archive has nothing for the last ${days} days yet. It fills in when the Rankings page is opened; a property with no Search Console traffic stays empty.`
        : `Tracked queries (${rows.length}), last ${days} days from the local archive:\n` +
          rows
            .map(
              (row) =>
                `- ${row.query}  pos:${round(row.position)}  clicks:${row.clicks}  impressions:${row.impressions}  days:${row.days} (${row.firstDate} to ${row.lastDate})`,
            )
            .join("\n");
    return mcpResponse({ text, meta, structuredContent: { days, rows } });
  }),
};

// --- get_cannibalization ---------------------------------------------------

const cannibalizationInputSchema = {
  projectId: projectIdSchema,
  dateRange: z
    .enum(["last_28_days", "last_3_months", "last_6_months"])
    .optional()
    .describe("Window to compare over. Default last_28_days."),
} as const;

type CannibalizationArgs = z.infer<
  z.ZodObject<typeof cannibalizationInputSchema>
>;

type Conflicts = CannibalizedQuery[];

function conflictLines(conflicts: Conflicts): string {
  return conflicts
    .map((conflict) => {
      const others = conflict.competitors
        .map(
          (page) =>
            `    ${page.page}  pos:${round(page.position)}  impressions:${page.impressions}`,
        )
        .join("\n");
      return [
        `- "${conflict.query}"  impressions:${conflict.impressions}  best pos:${round(conflict.bestPosition)}  split:${Math.round(conflict.splitShare * 100)}%`,
        `    ${conflict.primary.page}  pos:${round(conflict.primary.position)}  impressions:${conflict.primary.impressions}  (the page Google favours)`,
        others,
      ].join("\n");
    })
    .join("\n");
}

export const getCannibalizationTool = {
  name: "get_cannibalization",
  config: {
    title: "Get keyword cannibalization",
    description:
      "Queries where more than one of this site's own pages competes for the same result. Search Console reports a query's position without saying which page earned it, so a split looks healthy there and is only visible once the pages are compared. Names the page Google favours, the pages chasing it, and the share of impressions going to the wrong one. Read-only; costs one Search Console call.",
    inputSchema: cannibalizationInputSchema,
    outputSchema: {
      rows: z.array(z.record(z.string(), z.unknown())),
      queriesAnalyzed: z.number(),
      splitImpressions: z.number(),
      startDate: z.string(),
      endDate: z.string(),
      truncated: z.boolean(),
      ...optionalMetaOutputSchema,
    },
    annotations: {
      readOnlyHint: true,
      // It reaches Search Console.
      openWorldHint: true,
      destructiveHint: false,
    },
  },
  handler: withMcpProjectAuth(async (args: CannibalizationArgs, context) => {
    const result = await getCannibalization({
      projectId: args.projectId,
      dateRange: args.dateRange ?? "last_28_days",
    });
    const meta = buildProjectMeta(
      context,
      args.projectId,
      `/p/${args.projectId}/search-performance?tab=cannibalization`,
    );

    /*
     * "None found" and "we did not see all of it" must not read the same.
     * Google sorts by clicks descending and truncates the tail, which is
     * exactly where cannibalisation lives.
     */
    const text =
      result.rows.length === 0
        ? `No query has two of your pages competing for it between ${result.startDate} and ${result.endDate}, out of ${result.queriesAnalyzed} examined. That is the healthy answer, not a missing one.${result.truncated ? " Google truncated its answer, so the low-click tail was not fully seen." : ""}`
        : `${result.rows.length} of ${result.queriesAnalyzed} queries have competing pages, ${result.startDate} to ${result.endDate}. ${result.splitImpressions} impressions are going to a page Google did not pick.${result.truncated ? " Truncated by Google." : ""}\n` +
          conflictLines(result.rows);

    return mcpResponse({ text, meta, structuredContent: result });
  }),
};
