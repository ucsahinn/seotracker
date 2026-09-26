import { z } from "zod";
import { AuditRepository } from "@/server/features/audit/repositories/AuditRepository";
import { AuditService } from "@/server/features/audit/services/AuditService";
import { AppError } from "@/server/lib/errors";
import { captureServerEvent } from "@/server/lib/observability";
import { PAGE_FETCH_CLASSES } from "@/shared/audit-fetch-class";
import { mcpResponse } from "@/server/mcp/formatters";
import { buildProjectMeta } from "@/server/mcp/context";
import {
  looseObjectOutputSchema,
  optionalMetaOutputSchema,
} from "@/server/mcp/output-schemas";
import { withMcpProjectAuth } from "@/server/mcp/project-auth";
import { projectIdSchema } from "@/server/mcp/schemas";
import {
  auditIdSchema,
  auditPath,
  latestAudit,
  noAuditsYet,
} from "@/server/mcp/tools/audit-shared";

// ─── run_site_audit ──────────────────────────────────────────────────────────

const runInputSchema = {
  projectId: projectIdSchema,
  url: z.string().min(1).max(2048).describe("Start URL to crawl."),
  maxPages: z
    .number()
    .int()
    .min(10)
    .max(10_000)
    .optional()
    .describe("Page budget for the crawl (default 50)."),
  runLighthouse: z
    .boolean()
    .optional()
    .describe(
      "Run Lighthouse on a sample of up to 10 representative pages (default false — it adds several minutes of wall-clock time). Pass true only when the user wants performance/Core Web Vitals detail.",
    ),
} as const;

type RunArgs = z.infer<z.ZodObject<typeof runInputSchema>>;

export const runSiteAuditTool = {
  name: "run_site_audit",
  config: {
    title: "Run site audit",
    description:
      "Start a site audit: crawls the site (robots.txt-aware, same-origin), checks every page for SEO issues (broken links, duplicate/missing titles and descriptions, redirect chains, orphan pages, canonical problems, thin content, and more), and optionally runs Lighthouse on a sample of pages. Runs in the background — poll get_audit_status, then read get_audit_issues. If the site rate limits the crawler it slows down and retries; pages it still cannot read are honestly flagged as blocked or rate-limited rather than misreported.",
    inputSchema: runInputSchema,
    outputSchema: z
      .object({
        // Expected refusal responses (for example, account audit capacity)
        // do not start an audit and therefore have no id.
        auditId: z.string().optional(),
        ...optionalMetaOutputSchema,
      })
      .passthrough(),
    annotations: {
      readOnlyHint: false,
      // It fetches arbitrary external URLs; that is the whole job.
      openWorldHint: true,
      destructiveHint: false,
    },
  },
  handler: withMcpProjectAuth(async (args: RunArgs, context) => {
    // Default OFF for agent calls: Lighthouse turns a 1-2 minute crawl into a
    // many-minute wait, which chat agents handle badly. The app UI passes its
    // own explicit lighthouseStrategy, so this default only governs agents.
    const lighthouseStrategy = (args.runLighthouse ?? false) ? "auto" : "none";
    let auditId: string;
    try {
      ({ auditId } = await AuditService.startAudit({
        actorUserId: context.auth.userId,
        organizationId: context.auth.organizationId,
        projectId: args.projectId,
        startUrl: args.url,
        maxPages: args.maxPages,
        lighthouseStrategy,
      }));
    } catch (error) {
      // Expected refusals become readable answers instead of protocol errors:
      // no audit started, so there is no auditId to report.
      const refusalText =
        error instanceof AppError && error.code === "AUDIT_CAPACITY_REACHED"
          ? "Audit capacity reached for this account — delete old audits in the dashboard to free capacity, then try again."
          : error instanceof AppError && error.code === "AUDIT_ALREADY_RUNNING"
            ? "This account is at its limit of concurrently running audits. Poll get_audit_status until one finishes, then try again."
            : null;
      if (refusalText) {
        return mcpResponse({
          text: refusalText,
          meta: buildProjectMeta(
            context,
            args.projectId,
            `/p/${args.projectId}/audit`,
          ),
        });
      }
      throw error;
    }

    await captureServerEvent({
      distinctId: context.auth.userId,
      event: "site_audit:start",
      organizationId: context.auth.organizationId,
      properties: {
        project_id: args.projectId,
        max_pages: args.maxPages ?? 50,
        run_lighthouse: lighthouseStrategy !== "none",
        source: "mcp",
      },
    });

    return mcpResponse({
      text: `Audit ${auditId} started for ${args.url}. Poll get_audit_status until it finishes, then call get_audit_issues for the prioritized issue report (even a failed audit keeps results for every page it crawled).`,
      meta: buildProjectMeta(
        context,
        args.projectId,
        auditPath(args.projectId, auditId),
      ),
      structuredContent: { auditId },
    });
  }),
};

// ─── get_audit_status ────────────────────────────────────────────────────────

const statusInputSchema = {
  projectId: projectIdSchema,
  auditId: auditIdSchema,
} as const;

type StatusArgs = z.infer<z.ZodObject<typeof statusInputSchema>>;

export const getAuditStatusTool = {
  name: "get_audit_status",
  config: {
    title: "Get site audit status",
    description:
      "Check the progress of a site audit (phase, pages crawled, Lighthouse progress). Free — reads seotracker state and may reconcile a dead workflow by marking its audit failed, which is why it is not annotated read-only even though polling it is the documented way to wait for an audit. Omit auditId for the most recent audit.",
    inputSchema: statusInputSchema,
    outputSchema: z
      .object({
        status: looseObjectOutputSchema,
        ...optionalMetaOutputSchema,
      })
      .passthrough(),
    annotations: {
      readOnlyHint: false,
      openWorldHint: false,
      destructiveHint: false,
    },
  },
  handler: withMcpProjectAuth(async (args: StatusArgs, context) => {
    // getStatus fetches (and self-heals) the audit row itself; only hit the
    // DB here when we need to default to the most recent audit.
    const audit = await latestAudit(args.projectId, args.auditId);
    if (!audit) {
      return noAuditsYet(context, args.projectId, {
        status: { status: "none", pagesCrawled: 0, pagesTotal: 0 },
      });
    }
    const auditId = audit.id;
    const status = await AuditService.getStatus(auditId, args.projectId);

    const lighthouseNote =
      status.lighthouseTotal > 0
        ? `, lighthouse ${status.lighthouseCompleted + status.lighthouseFailed}/${status.lighthouseTotal}`
        : "";
    // Failed audits keep partial results — point agents at them instead of
    // letting a mid-crawl death read as "no data".
    const nextStep =
      status.status === "completed"
        ? " Call get_audit_issues for the issue report."
        : status.status === "failed" && status.pagesCrawled > 0
          ? ` The audit stopped early but kept results for the ${status.pagesCrawled} pages it crawled — call get_audit_issues for the partial issue report.`
          : "";
    return mcpResponse({
      text: `Audit ${status.id} (${status.startUrl}): ${status.status} — phase ${status.currentPhase}, ${status.pagesCrawled}/${status.pagesTotal} pages${lighthouseNote}.${nextStep}`,
      meta: buildProjectMeta(
        context,
        args.projectId,
        auditPath(args.projectId, status.id),
      ),
      structuredContent: { status },
    });
  }),
};

// ─── get_audit_pages ─────────────────────────────────────────────────────────

const pagesInputSchema = {
  projectId: projectIdSchema,
  auditId: auditIdSchema,
  fetchClass: z
    .enum(PAGE_FETCH_CLASSES)
    .optional()
    .describe(
      'Filter by fetch outcome ("blocked" = the site\'s bot protection challenged the crawler; "rate_limited" = a 429 prevented the crawler from reading the page).',
    ),
  statusCode: z
    .number()
    .int()
    .optional()
    .describe("Filter by exact HTTP status code."),
  urlContains: z
    .string()
    .optional()
    .describe("Filter to URLs containing this substring."),
  limit: z
    .number()
    .int()
    .min(1)
    .max(1_000)
    .optional()
    .describe("Max pages to return (default 100)."),
} as const;

type PagesArgs = z.infer<z.ZodObject<typeof pagesInputSchema>>;

export const getAuditPagesTool = {
  name: "get_audit_pages",
  config: {
    title: "Get site audit pages",
    description:
      "List crawled pages from a site audit with per-page SEO data (status, title, description, word count, indexability, crawl depth, link counts). Free — reads seotracker state. Omit auditId for the most recent audit.",
    inputSchema: pagesInputSchema,
    outputSchema: z
      .object({
        pages: z.array(looseObjectOutputSchema),
        total: z.number(),
        ...optionalMetaOutputSchema,
      })
      .passthrough(),
    annotations: {
      readOnlyHint: true,
      openWorldHint: false,
      destructiveHint: false,
    },
  },
  handler: withMcpProjectAuth(async (args: PagesArgs, context) => {
    const audit = await latestAudit(args.projectId, args.auditId);
    if (!audit) {
      return noAuditsYet(context, args.projectId, { pages: [], total: 0 });
    }
    const allPages = await AuditRepository.getPagesForAudit(audit.id);

    const filtered = allPages.filter(
      (page) =>
        (!args.fetchClass || page.fetchClass === args.fetchClass) &&
        (args.statusCode === undefined ||
          page.statusCode === args.statusCode) &&
        (!args.urlContains || page.url.includes(args.urlContains)),
    );
    const limit = args.limit ?? 100;
    const pages = filtered.slice(0, limit);

    const text = [
      `Audit ${audit.id}: ${filtered.length} pages${filtered.length > limit ? ` (showing ${limit})` : ""}.`,
      ...pages
        .slice(0, 25)
        .map(
          (page) =>
            `- ${page.statusCode} ${page.url}${page.fetchClass !== "ok" ? ` [${page.fetchClass}]` : ""}  "${page.title ?? ""}"`,
        ),
      "Full rows are in structuredContent.pages.",
    ].join("\n");

    return mcpResponse({
      text,
      meta: buildProjectMeta(
        context,
        args.projectId,
        auditPath(args.projectId, audit.id),
      ),
      structuredContent: { pages, total: filtered.length },
    });
  }),
};
