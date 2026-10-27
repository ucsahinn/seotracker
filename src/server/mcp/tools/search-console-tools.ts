/* eslint-disable max-lines */
import { z } from "zod";
import { buildProjectMeta } from "@/server/mcp/context";
import { mcpResponse } from "@/server/mcp/formatters";
import { optionalMetaOutputSchema } from "@/server/mcp/output-schemas";
import { withMcpProjectAuth } from "@/server/mcp/project-auth";
import { formatMcpTable, type McpTableColumn } from "@/server/mcp/table";
import { projectIdSchema } from "@/server/mcp/schemas";
import { buildDashboardUrl } from "@/server/mcp/urls";
import { hasSelfHostedGoogleOAuthConfig } from "@/server/features/google/oauth-config";
import { inspectAndRecord } from "@/server/features/gsc/services/GscIndexCoverageService";
import { GscService } from "@/server/features/gsc/services/GscService";
import { captureServerError } from "@/server/lib/observability";
import { hasServiceAccount } from "@/server/lib/googleServiceAccountToken";
import {
  GSC_DATE_RANGES,
  GSC_DEFAULT_ROW_LIMIT,
  GSC_DIMENSIONS,
  GSC_FILTER_OPERATORS,
  GSC_MAX_ROW_LIMIT,
  GSC_SEARCH_TYPES,
  sixteenMonthFloor,
  type GscPerformanceInput,
} from "@/server/features/gsc/searchAnalytics";
import {
  GscApiError,
  GscNotConnectedError,
  GscTokenError,
} from "@/server/lib/gscErrors";
import { GSC_SELF_HOSTED_SETUP_DOCS_URL } from "@/shared/gsc";
import { SearchPerformanceService } from "@/server/features/gsc/services/SearchPerformanceService";
import {
  GSC_DEVICES,
  SEARCH_PERFORMANCE_RANGES,
} from "@/types/schemas/search-performance";
import type { SearchInsights, TodoItem } from "@/shared/searchInsights";
import { gscToday } from "@/shared/dataFreshness";

const TEXT_SUMMARY_ROWS = 15;

type GscPerfRow = {
  keys?: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position?: number;
};

const GSC_PERF_COLUMNS: McpTableColumn<GscPerfRow>[] = [
  { header: "key", value: (row) => row.keys?.join(" / ") ?? "(total)" },
  { header: "clicks", value: (row) => row.clicks },
  { header: "impressions", value: (row) => row.impressions },
  {
    header: "CTR",
    value: (row) => row.ctr,
    format: (value) =>
      typeof value === "number" ? `${(value * 100).toFixed(1)}%` : "—",
  },
  {
    header: "position",
    value: (row) => row.position,
    format: (value) => (typeof value === "number" ? value.toFixed(1) : "—"),
  },
];

type ProjectAuthContext = {
  auth: { organizationId: string };
  baseUrl: string;
};

function connectGscUrl(baseUrl: string, projectId: string): string {
  // GSC Insights hosts the connection card AND the data the user came for,
  // so land them there rather than in settings.
  return buildDashboardUrl(baseUrl, `/p/${projectId}/search-performance`);
}

/** Search Console needs a Google OAuth client, entered on the settings page.
 *  Tools return this nudge before attempting a token lookup when none is set,
 *  so an agent gets a next step instead of an empty result. */
async function missingSelfHostedGoogleClientResponse(
  context: ProjectAuthContext,
  projectId: string,
) {
  // A stored service account is a complete credential on its own (the UI and
  // gscClient accept it), so it must not be told to configure an OAuth client.
  if ((await hasServiceAccount()) || (await hasSelfHostedGoogleOAuthConfig())) {
    return null;
  }

  return mcpResponse({
    text: `This seotracker instance is not configured for Search Console yet. Open Settings in the app, enter a Google OAuth client id and secret, then connect Search Console from the project. Setup docs: ${GSC_SELF_HOSTED_SETUP_DOCS_URL}`,
    meta: buildProjectMeta(context, projectId),
    structuredContent: {
      ok: false,
      connected: false,
      reason: "gsc_oauth_not_configured",
      setupDocsUrl: GSC_SELF_HOSTED_SETUP_DOCS_URL,
    },
  });
}

function invalidRequest(
  meta: ReturnType<typeof buildProjectMeta>,
  message: string,
) {
  return mcpResponse({
    text: message,
    meta,
    structuredContent: { ok: false, reason: "invalid_request" },
  });
}

function describeGscError(error: unknown): string {
  if (error instanceof GscNotConnectedError) {
    return "Search Console is not connected for this project.";
  }
  if (error instanceof GscTokenError) {
    return "The Search Console connection has expired or was revoked. Reconnect it to continue.";
  }
  if (error instanceof GscApiError) {
    return error.message;
  }
  // Anything else is not Google's wording and can carry SQL or bound
  // parameters; the agent gets a generic line and the container log the detail.
  void captureServerError(error, { scope: "searchConsoleTools" });
  return "Search Console could not be read because of an internal error. Check the server log (Docker: `docker compose logs`; Windows package: %LOCALAPPDATA%\\seowatcher\\logs\\server.log).";
}

// ---------------------------------------------------------------------------
// get_search_console_performance
// ---------------------------------------------------------------------------

type MetricFilter = {
  minPosition?: number;
  maxPosition?: number;
  minImpressions?: number;
};

function pickMetricFilter(args: MetricFilter): MetricFilter | null {
  const { minPosition, maxPosition, minImpressions } = args;
  if (
    minPosition === undefined &&
    maxPosition === undefined &&
    minImpressions === undefined
  ) {
    return null;
  }
  return { minPosition, maxPosition, minImpressions };
}

// Rows without a position (discover/googleNews) never match a position bound.
function matchesMetricFilter(row: GscPerfRow, filter: MetricFilter): boolean {
  if (
    filter.minImpressions !== undefined &&
    row.impressions < filter.minImpressions
  ) {
    return false;
  }
  if (filter.minPosition !== undefined) {
    if (row.position === undefined || row.position < filter.minPosition)
      return false;
  }
  if (filter.maxPosition !== undefined) {
    if (row.position === undefined || row.position > filter.maxPosition)
      return false;
  }
  return true;
}

// Google returns full-precision floats (0.041237113402061855); four decimals of
// CTR and one of position is all anyone reads and trims ~40 bytes per row.
function roundMetrics<T extends GscPerfRow>(row: T): T {
  return {
    ...row,
    ctr: Math.round(row.ctr * 10_000) / 10_000,
    ...(row.position === undefined
      ? {}
      : { position: Math.round(row.position * 10) / 10 }),
  };
}

const filterSchema = z.object({
  dimension: z.enum(GSC_DIMENSIONS),
  operator: z.enum(GSC_FILTER_OPERATORS).default("equals"),
  expression: z.string().min(1),
});

const perfInputSchema = {
  projectId: projectIdSchema,
  dimensions: z
    .array(z.enum(GSC_DIMENSIONS))
    .min(1)
    .max(4)
    .optional()
    .describe(
      "Group rows by these dimensions. Default ['query']. Use ['page'] for top pages, ['query','page'] to map queries to pages / spot cannibalization, ['date'] for a time series.",
    ),
  dateRange: z
    .enum(GSC_DATE_RANGES)
    .optional()
    .describe(
      "Convenience window (default last_28_days). End is set ~3 days back for GSC data lag. Ignored if startDate+endDate are given. Max lookback is 16 months.",
    ),
  startDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .describe("Explicit start (YYYY-MM-DD, Pacific Time). Use with endDate."),
  endDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .describe("Explicit end (YYYY-MM-DD, Pacific Time). Use with startDate."),
  filters: z
    .array(filterSchema)
    .max(5)
    .optional()
    .describe(
      "AND-combined filters. To get the queries for one page: [{dimension:'page',operator:'equals',expression:'https://example.com/post'}] with dimensions ['query'].",
    ),
  rowLimit: z
    .number()
    .int()
    .min(1)
    .max(GSC_MAX_ROW_LIMIT)
    .optional()
    .describe(
      `Rows per call (default ${GSC_DEFAULT_ROW_LIMIT}, max ${GSC_MAX_ROW_LIMIT}). GSC sorts by clicks desc; paginate with startRow when hasMore is true.`,
    ),
  startRow: z.number().int().min(0).optional().describe("Pagination offset."),
  minPosition: z
    .number()
    .min(1)
    .optional()
    .describe(
      "Keep rows with average position >= this. For 'striking distance' queries use dimensions ['query'] with minPosition 3.5, maxPosition 20.5 and minImpressions 50 per 28 days: the same rule as the Search performance screen and get_search_summary, which judge the query's own position across all its pages.",
    ),
  maxPosition: z
    .number()
    .min(1)
    .optional()
    .describe("Keep rows with average position <= this."),
  minImpressions: z
    .number()
    .int()
    .min(0)
    .optional()
    .describe("Keep rows with at least this many impressions."),
  type: z
    .enum(GSC_SEARCH_TYPES)
    .optional()
    .describe("Search type (default web)."),
  dataState: z
    .enum(["all", "final"])
    .optional()
    .describe("'all' (default) includes fresh/incomplete recent data."),
} as const;

type PerfArgs = z.infer<z.ZodObject<typeof perfInputSchema>>;

export const getSearchConsolePerformanceTool = {
  name: "get_search_console_performance",
  config: {
    title: "Get Google Search Console performance",
    description:
      "Query the connected Search Console property's Search Analytics: clicks, impressions, CTR, and average position by query/page/country/device/date. First-party data — use it for what already ranks, near-ranking queries, and pages with real demand. Google sorts by clicks and can't filter by position, so minPosition/maxPosition/minImpressions are applied server-side over the top 1000 rows of the window — use them instead of fetching everything. ctr is a 0-1 fraction; position is a 1-based average and is omitted from rows when type is 'discover' or 'googleNews' (Google does not report it there — treat it as unavailable, not a failure); dates are Pacific Time; the last ~3 days may be incomplete. A page or query table is NOT the site total: Google counts every result a page appears in separately, so summing rows overstates impressions and clicks; for site totals use dimensions ['date'] (or no dimensions) and never sum a page/query table. Read-only.",
    inputSchema: perfInputSchema,
    outputSchema: {
      ok: z.boolean(),
      reason: z.string().optional(),
      connectUrl: z.string().optional(),
      setupDocsUrl: z.string().optional(),
      siteUrl: z.string().optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      dimensions: z.array(z.string()).optional(),
      rowCount: z.number().optional(),
      rows: z
        .array(
          z
            .object({
              keys: z.array(z.string()).optional(),
              clicks: z.number(),
              impressions: z.number(),
              ctr: z.number(),
              // Google omits position for the discover and googleNews search
              // types even though the other metrics are present. The table
              // already renders a missing position as an em dash.
              position: z.number().optional(),
            })
            .passthrough(),
        )
        .optional(),
      hasMore: z.boolean().optional(),
      nextStartRow: z.number().optional(),
      ...optionalMetaOutputSchema,
    },
    annotations: {
      readOnlyHint: true,
      openWorldHint: false,
      destructiveHint: false,
    },
  },
  handler: withMcpProjectAuth(async (args: PerfArgs, context) => {
    const blocked = await missingSelfHostedGoogleClientResponse(
      context,
      args.projectId,
    );
    if (blocked) return blocked;

    const connectUrl = connectGscUrl(context.baseUrl, args.projectId);
    /*
     * The same place `connectGscUrl` names. It pointed at the integrations
     * page even when the call succeeded, so the only navigational hint on a
     * healthy read was "go fix your connection" — and on the error path one
     * payload carried two different URLs.
     */
    const meta = buildProjectMeta(
      context,
      args.projectId,
      `/p/${args.projectId}/search-performance`,
    );

    // GSC rejects searchAppearance combined with any other dimension.
    if (
      args.dimensions &&
      args.dimensions.includes("searchAppearance") &&
      args.dimensions.length > 1
    ) {
      return invalidRequest(
        meta,
        "searchAppearance must be the only dimension when used.",
      );
    }
    // A half-specified explicit range would silently fall back to a default window.
    if (Boolean(args.startDate) !== Boolean(args.endDate)) {
      return invalidRequest(
        meta,
        "Provide both startDate and endDate, or neither (use dateRange instead).",
      );
    }
    /*
     * Checked here because Google's own answer is untrue. It clamps the
     * start to its 16-month floor and then reports the clamped range as
     * "End date cannot precede the start date" — a claim the caller can
     * verify is false, and will either retry or read as corruption.
     */
    if (args.startDate && args.endDate) {
      if (args.endDate < args.startDate) {
        return invalidRequest(meta, "endDate is before startDate.");
      }
      const today = gscToday();
      const floorDate = sixteenMonthFloor(new Date(`${today}T12:00:00Z`));
      if (args.endDate < floorDate) {
        return invalidRequest(
          meta,
          `Search Console keeps 16 months. The earliest date available today is ${floorDate}.`,
        );
      }
      // A future window is not an empty property, and the two were
      // indistinguishable: both came back "0 rows".
      if (args.startDate > today) {
        return invalidRequest(
          meta,
          `startDate is in the future (today is ${today}).`,
        );
      }
    }

    try {
      const requestedLimit = args.rowLimit ?? GSC_DEFAULT_ROW_LIMIT;
      const metricFilter = pickMetricFilter(args);
      // Google can't filter by position or impressions, so with a metric filter
      // we fetch the full window and filter here; fetched == returned otherwise.
      const fetchLimit = metricFilter ? GSC_MAX_ROW_LIMIT : requestedLimit;
      const result = await GscService.getPerformance({
        projectId: args.projectId,
        dimensions: args.dimensions,
        dateRange: args.dateRange,
        startDate: args.startDate,
        endDate: args.endDate,
        filters: args.filters,
        rowLimit: fetchLimit,
        startRow: args.startRow,
        type: args.type,
        dataState: args.dataState,
      } satisfies GscPerformanceInput);
      const dimensions = result.request.dimensions ?? ["query"];
      const startRow = result.request.startRow ?? 0;
      // Discover and Google News do not measure position. The shared client
      // retains a numeric fallback for other consumers; omit it on this surface
      // before filtering so an unmeasured row cannot satisfy a position bound.
      const fetched =
        args.type === "discover" || args.type === "googleNews"
          ? result.rows.map(({ position: _position, ...row }) => row)
          : result.rows;
      const kept = metricFilter
        ? fetched.filter((row) => matchesMetricFilter(row, metricFilter))
        : fetched;
      const rows = kept.slice(0, requestedLimit).map(roundMetrics);
      // Pagination stays in Google's row space: the next page starts right after
      // the last row we returned (which may be well past rows.length when a
      // metric filter dropped rows before it).
      const lastReturned = kept[rows.length - 1];
      const truncated = kept.length > rows.length;
      const hasMore = truncated || fetched.length >= fetchLimit;
      const nextStartRow =
        truncated && lastReturned
          ? startRow + fetched.indexOf(lastReturned) + 1
          : startRow + fetched.length;

      const filterText = metricFilter
        ? ` · filtered ${fetched.length} rows → ${kept.length}`
        : "";
      const header =
        `${result.siteUrl} · ${dimensions.join("+")} · ${result.request.startDate}→${result.request.endDate} · ` +
        `${rows.length} row${rows.length === 1 ? "" : "s"}${filterText}${hasMore ? " (more available — paginate with startRow)" : ""}`;
      const text =
        rows.length > 0
          ? `${header}\n${formatMcpTable(rows, GSC_PERF_COLUMNS)}`
          : `${header}\nNo rows for this query/date range.`;

      return mcpResponse({
        text,
        meta,
        structuredContent: {
          ok: true,
          siteUrl: result.siteUrl,
          startDate: result.request.startDate,
          endDate: result.request.endDate,
          dimensions,
          rowCount: rows.length,
          rows,
          hasMore,
          nextStartRow: hasMore ? nextStartRow : undefined,
        },
      });
    } catch (error) {
      const isNotConnected = error instanceof GscNotConnectedError;
      return mcpResponse({
        text: `${describeGscError(error)}${isNotConnected ? ` Connect it here: ${connectUrl}` : ` (reconnect at ${connectUrl})`}`,
        meta,
        structuredContent: {
          ok: false,
          reason: isNotConnected ? "not_connected" : "api_error",
          connectUrl,
        },
      });
    }
  }),
};

// ---------------------------------------------------------------------------
// inspect_urls
// ---------------------------------------------------------------------------

const plural = (n: number) => (n === 1 ? "URL" : "URLs");

const inspectInputSchema = {
  projectId: projectIdSchema,
  urls: z
    .array(z.string().url())
    .min(1)
    .max(10)
    .describe(
      "1–10 absolute URLs to inspect. Each must belong to the connected property.",
    ),
  languageCode: z
    .string()
    .optional()
    .describe(
      "BCP-47 language for the inspection result (e.g. 'en-US'). Leave it unset. This writes the stored `coverageState` sentence, and the app asks for English on purpose: the audit's indexing findings are keyed on Google's English wording, so a row written in another language is stored and displayed correctly but produces no finding at all.",
    ),
  force: z
    .boolean()
    .optional()
    .describe(
      "Ask Google again even for URLs with a recent stored answer. Off by default; use it only when the user asks for it: each URL costs one of the property's 2000 daily inspections and they do not replenish early.",
    ),
} as const;

type InspectArgs = z.infer<z.ZodObject<typeof inspectInputSchema>>;

export const inspectUrlsTool = {
  name: "inspect_urls",
  config: {
    title: "Inspect URLs in Google Search Console",
    description:
      "Run Google Search Console's URL Inspection on up to 10 URLs of the connected property: index/coverage state, last crawl time, and Google-selected vs declared canonical. Answers are stored for get_index_coverage. Costs one of the property's 2000 daily inspections per URL, and that allowance does not replenish early -- call get_index_coverage first, which reads the stored answers for free, and point this at only the pages it reports as unanswered or due. URLs with a recent stored answer are skipped rather than bought again. Per-URL failures are reported inline.",
    inputSchema: inspectInputSchema,
    outputSchema: {
      ok: z.boolean(),
      reason: z.string().optional(),
      connectUrl: z.string().optional(),
      setupDocsUrl: z.string().optional(),
      siteUrl: z.string().optional(),
      results: z
        .array(
          z
            .object({
              url: z.string(),
              result: z.unknown().nullable().optional(),
              error: z.string().optional(),
            })
            .passthrough(),
        )
        .optional(),
      /** URLs actually sent to Google. */
      requested: z.number().optional(),
      /** URLs not inspected because a recent stored answer exists (read them with get_index_coverage). */
      fresh: z.number().optional(),
      /** URLs not inspected because today's quota ran out. */
      skipped: z.number().optional(),
      quotaRemaining: z.number().optional(),
      ...optionalMetaOutputSchema,
    },
    annotations: {
      // Not read-only: it writes the answers to gsc_url_inspections and the
      // attempt ledger, calls Google and consumes a daily allowance that does
      // not come back, so a client that auto-approves read-only tools must
      // not auto-approve this one. Nothing it writes is destructive.
      readOnlyHint: false,
      openWorldHint: true,
      destructiveHint: false,
    },
  },
  handler: withMcpProjectAuth(async (args: InspectArgs, context) => {
    const blocked = await missingSelfHostedGoogleClientResponse(
      context,
      args.projectId,
    );
    if (blocked) return blocked;

    const connectUrl = connectGscUrl(context.baseUrl, args.projectId);
    /*
     * The same place `connectGscUrl` names. It pointed at the integrations
     * page even when the call succeeded, so the only navigational hint on a
     * healthy read was "go fix your connection" — and on the error path one
     * payload carried two different URLs.
     */
    const meta = buildProjectMeta(
      context,
      args.projectId,
      `/p/${args.projectId}/search-performance`,
    );

    try {
      /*
       * Through the budgeted path, not `GscService.inspectUrls` directly:
       * this is the one tool that spends a Google allowance that does not
       * replenish (2000 URLs per property per day), and calling the client
       * raw both ignored the remaining budget and left no ledger row, so the
       * spend was invisible to the Index Coverage screen's own accounting.
       */
      const { siteUrl, results, requested, skipped, fresh, quotaRemaining } =
        await inspectAndRecord({
          projectId: args.projectId,
          urls: args.urls,
          languageCode: args.languageCode,
          force: args.force,
        });

      const quotaNote =
        skipped > 0
          ? `
${skipped} ${plural(skipped)} not inspected: the property's daily URL Inspection quota is used up. ${quotaRemaining} left today.`
          : "";
      /*
       * Neither a failure nor a quota skip: the answer was already stored.
       * Saying so is what stops an agent reaching for `force` to "fix" a
       * result that came back shorter than the list it passed in.
       */
      const freshNote =
        fresh > 0
          ? `
${fresh} ${plural(fresh)} skipped, already answered recently. Read those with get_index_coverage, which is free.`
          : "";

      const summaryLines = results.slice(0, TEXT_SUMMARY_ROWS).map((r) => {
        if (r.error) return `  ${r.url} — error: ${r.error}`;
        const index = r.result?.indexStatusResult;
        const verdict = index?.verdict ?? "UNKNOWN";
        const coverage = index?.coverageState ?? "—";
        const canonical = index?.googleCanonical
          ? `, google-canonical ${index.googleCanonical}`
          : "";
        return `  ${r.url} — ${verdict}: ${coverage}${canonical}`;
      });
      const text =
        `${siteUrl ?? "Search Console"} · inspected ${results.length} URL${results.length === 1 ? "" : "s"}\n` +
        summaryLines.join("\n") +
        quotaNote +
        freshNote;

      return mcpResponse({
        text,
        meta,
        /*
         * `siteUrl` is omitted rather than sent as null when nothing was
         * asked: the declared schema says `z.string().optional()`, and the
         * SDK validates the body against it, so a null turns a correct
         * empty result into "Output validation error" -- worse than the
         * state it describes. Exactly the mistake the `noAuditsYet` helper
         * was written to stop, reintroduced on a new path and caught only
         * by calling the tool twice against a live property.
         */
        structuredContent: {
          ok: true,
          ...(siteUrl ? { siteUrl } : {}),
          results,
          /*
           * The counts the text carries, in the body too: a client that
           * shows only structuredContent otherwise sees an empty `results`
           * with no reason when every URL was answered recently.
           */
          requested,
          fresh,
          skipped,
          quotaRemaining,
        },
      });
    } catch (error) {
      const isNotConnected = error instanceof GscNotConnectedError;
      return mcpResponse({
        text: `${describeGscError(error)}${isNotConnected ? ` Connect it here: ${connectUrl}` : ` (reconnect at ${connectUrl})`}`,
        meta,
        structuredContent: {
          ok: false,
          reason: isNotConnected ? "not_connected" : "api_error",
          connectUrl,
        },
      });
    }
  }),
};

// ---------------------------------------------------------------------------
// get_search_summary
// ---------------------------------------------------------------------------

const summaryInputSchema = {
  projectId: projectIdSchema,
  dateRange: z
    .enum(SEARCH_PERFORMANCE_RANGES)
    .optional()
    .describe("Window of complete days (default last_28_days)."),
  device: z.enum(GSC_DEVICES).optional(),
  country: z
    .string()
    .length(3)
    .optional()
    .describe("ISO-3166-1 alpha-3, lowercase, as Search Console returns it."),
} as const;

type SummaryArgs = z.infer<z.ZodObject<typeof summaryInputSchema>>;

/** Rows per list in the structured answer; the screen holds the rest. */
const SUMMARY_LIST_LIMIT = 20;

const pct = (value: number | null) =>
  value === null ? "unknown" : `${(value * 100).toFixed(1)}%`;
const signed = (value: number | null, digits = 0) =>
  value === null
    ? "unknown"
    : `${value > 0 ? "+" : ""}${value.toFixed(digits)}`;

function describeTodo(item: TodoItem): string {
  const gain =
    item.estimatedClicks === null
      ? "gain unknown"
      : `~${item.estimatedClicks} clicks`;
  switch (item.kind) {
    case "striking":
      return `Striking distance: "${item.query}" at position ${item.position.toFixed(1)} (${item.impressions} impressions)${item.page ? ` -> improve ${item.page}` : ""}; ${gain}.`;
    case "snippet":
      return `Low CTR for its position: "${item.query}" ${pct(item.ctr)} vs site ${pct(item.expectedCtr)} at ${item.position.toFixed(1)}${item.page ? ` (${item.page})` : ""}; rewrite title/description; ${gain}.`;
    case "decliningQuery":
    case "decliningPage":
      return `Declining ${item.kind === "decliningQuery" ? "query" : "page"}: ${item.key} ${item.previousClicks} -> ${item.clicks} clicks; ${gain}.`;
    case "decay":
      return `Content decay: ${item.page} ${item.clicks} clicks this quarter vs ${item.peakClicks} at its peak (${item.peakStartDate}..${item.peakEndDate}); refresh it; ${gain}.`;
    case "zeroClickPage":
      return `Impressions but no clicks: ${item.page} (${item.impressions} impressions, position ${item.position.toFixed(1)}); ${gain}.`;
    case "lostQuery":
      return `Lost query: "${item.query}" had ${item.previousClicks} clicks last period and none now; ${gain}.`;
    case "deviceGap":
    case "countryGap":
      return `${item.kind === "deviceGap" ? "Device" : "Country"} gap: ${item.key} CTR ${pct(item.ctr)} vs site ${pct(item.siteCtr)}; ${gain}.`;
    case "anomaly":
      return `Unusual drop on ${item.date}: ${item.value} ${item.metric} vs ~${Math.round(item.expected)} expected for that weekday.`;
    case "setBrandTerms":
      return item.suggestions.length > 0
        ? `Confirm the brand terms in the app: the split currently runs on ones suggested from the domain and project name (${item.suggestions.join(", ")}), not confirmed.`
        : "Set brand terms in the app to split brand from non-brand queries (nothing to suggest from the domain).";
  }
}

function describeBrand(state: SearchInsights["brandState"]): string {
  switch (state.source) {
    case "confirmed":
      return `Brand terms (confirmed): ${state.terms.join(", ")}.`;
    case "suggested":
      return `Brand terms (suggested from the domain, not confirmed): ${state.terms.join(", ")}.`;
    case "none":
      return "Brand terms: none, so brand queries are not split out.";
  }
}

export const getSearchSummaryTool = {
  name: "get_search_summary",
  config: {
    title: "Get Search Console summary and to-do list",
    description:
      "The Search performance screen in one call: the window of complete days (Pacific dates, ending before the first day Google is still counting), site totals from Search Console's own property aggregate (never summed from query or page rows) with the change against the previous equal-length period and the same weeks a year ago, the share of clicks from anonymized queries, and a to-do list ranked by estimated clicks: striking-distance queries (the query's own position 4-20, brand queries excluded, gain at the site's own non-brand CTR one band up per query: 4-5 -> 2-3, 6-10 -> 4-5, 11-20 -> 6-10), snippets far below the site's CTR for their position, declining queries and pages, content decay against the best of the four previous quarters, pages with impressions and no clicks, lost queries, device/country CTR gaps, and the latest unusual drop. A null or 'unknown' value means Search Console does not say; never read it as zero. Brand queries are split out with the confirmed brand terms, or until some are confirmed, with terms suggested from the domain and project name; brand.source says which (confirmed; suggested = applied but unconfirmed; none = no brand split). Free; about 14 Search Analytics requests on a cold call, cached for minutes after. Read-only.",
    inputSchema: summaryInputSchema,
    outputSchema: {
      ok: z.boolean(),
      reason: z.string().optional(),
      connectUrl: z.string().optional(),
      setupDocsUrl: z.string().optional(),
      window: z.record(z.string(), z.unknown()).optional(),
      totals: z.record(z.string(), z.unknown()).optional(),
      hiddenQueries: z.record(z.string(), z.unknown()).optional(),
      todo: z.array(z.record(z.string(), z.unknown())).optional(),
      striking: z.array(z.record(z.string(), z.unknown())).optional(),
      anomalies: z.array(z.record(z.string(), z.unknown())).optional(),
      brand: z
        .object({
          source: z.enum(["confirmed", "suggested", "none"]),
          terms: z.array(z.string()),
        })
        .optional(),
      requests: z.number().optional(),
      ...optionalMetaOutputSchema,
    },
    annotations: {
      readOnlyHint: true,
      openWorldHint: false,
      destructiveHint: false,
    },
  },
  handler: withMcpProjectAuth(async (args: SummaryArgs, context) => {
    const blocked = await missingSelfHostedGoogleClientResponse(
      context,
      args.projectId,
    );
    if (blocked) return blocked;
    const connectUrl = connectGscUrl(context.baseUrl, args.projectId);
    const meta = buildProjectMeta(
      context,
      args.projectId,
      `/p/${args.projectId}/search-performance`,
    );
    try {
      const view = await SearchPerformanceService.getView({
        projectId: args.projectId,
        filters: {
          dateRange: args.dateRange ?? "last_28_days",
          device: args.device,
          country: args.country?.toLowerCase(),
          searchType: "web",
        },
      });
      const { current, vsPrevious, vsYoy, provisional } = view.totals;
      const hidden = view.coverage.hiddenQueries;
      const lines = [
        `${view.siteUrl} · ${view.window.startDate}..${view.window.endDate} (${view.window.days} complete days, Pacific; first incomplete day ${view.window.firstIncompleteDate ?? "none"}, ${view.window.incompleteSource})`,
        `Clicks ${current.clicks} (${signed(vsPrevious?.clicks.change ?? null)} vs previous, ${signed(vsYoy?.clicks.change ?? null)} vs a year ago) · impressions ${current.impressions} · CTR ${pct(current.ctr)} · position ${current.position?.toFixed(1) ?? "unknown"} (${signed(vsPrevious?.position.change ?? null, 1)} places)`,
        ...(provisional
          ? [
              `Provisional days after the window (still changing): ${provisional.clicks} clicks, ${provisional.impressions} impressions.`,
            ]
          : []),
        `Anonymized queries: ${pct(hidden.clickShare)} of clicks${hidden.exact ? "" : " (includes rows past the row limit)"}.`,
        describeBrand(view.insights.brandState),
        "To do, ranked by estimated clicks:",
        ...view.todo
          .slice(0, SUMMARY_LIST_LIMIT)
          .map((item, i) => `${i + 1}. ${describeTodo(item)}`),
      ];
      return mcpResponse({
        text: lines.join("\n"),
        meta,
        structuredContent: {
          ok: true,
          window: view.window,
          totals: view.totals,
          hiddenQueries: hidden,
          todo: view.todo.slice(0, SUMMARY_LIST_LIMIT),
          striking: view.insights.striking.rows.slice(0, SUMMARY_LIST_LIMIT),
          anomalies: view.insights.anomalies.slice(0, SUMMARY_LIST_LIMIT),
          brand: {
            source: view.insights.brandState.source,
            terms: view.insights.brandState.terms,
          },
          requests: view.quota.requests,
        },
      });
    } catch (error) {
      const isNotConnected =
        error instanceof GscNotConnectedError || error instanceof GscTokenError;
      return mcpResponse({
        text: `${describeGscError(error)}${isNotConnected ? ` Connect it here: ${connectUrl}` : ""}`,
        meta,
        structuredContent: {
          ok: false,
          reason: isNotConnected ? "not_connected" : "api_error",
          connectUrl,
        },
      });
    }
  }),
};
