import { z } from "zod";
import { AuditService } from "@/server/features/audit/services/AuditService";
import { getAuditInsights } from "@/server/features/audit/services/auditInsights";
import { buildProjectMeta } from "@/server/mcp/context";
import { mcpResponse } from "@/server/mcp/formatters";
import {
  looseObjectOutputSchema,
  optionalMetaOutputSchema,
} from "@/server/mcp/output-schemas";
import { withMcpProjectAuth } from "@/server/mcp/project-auth";
import { projectIdSchema } from "@/server/mcp/schemas";
import {
  auditIdSchema,
  auditPath,
  auditProgressFields,
  auditProgressOutputSchema,
  incompleteAuditNote,
  latestAudit,
  noAuditsYet,
} from "@/server/mcp/tools/audit-shared";
import { getIssueDescriptor } from "@/shared/audit-issues";
import { buildAuditBreakdown } from "@/shared/auditBreakdown";
import { findingsFromIssues } from "@/shared/auditScore";
import { auditStanding, thinCategoryLines } from "@/shared/auditStanding";
import { pageKey, rankTodos, todoInputs } from "@/shared/auditTodo";

// ─── get_audit_summary ───────────────────────────────────────────────────────

const summaryInputSchema = {
  projectId: projectIdSchema,
  auditId: auditIdSchema,
} as const;

type SummaryArgs = z.infer<z.ZodObject<typeof summaryInputSchema>>;

/** How many to-do items the summary carries; the rest are in get_audit_issues. */
const TODO_LIMIT = 15;

export const getAuditSummaryTool = {
  name: "get_audit_summary",
  config: {
    title: "Get site audit summary",
    description:
      "One-call overview of a site audit, the same numbers as the audit screen: the 0-100 site score (the weighted average of the category scores; null when the audit failed, is running or its crawl was cut short, with standing.reason saying which), its coverage (measured/total checks and a 0-1 ratio weighted like the score), whether it is provisional (coverage below 0.7, or crawl/indexing/content/speed under half measured: no tier word applies) and its tier; the score itself is capped by severity (any failed critical check caps it at 69, 5+ failed warning checks at 89; standing.cappedBy says when a cap holds it down, and each to-do's points include releasing it), a score per category (crawl, content, indexing, speed, security, accessibility, social/structured data) with the points each category takes off the site score, counts of failed critical checks, failed warning/info checks, passed and unmeasured checks, the prioritized to-do list (score impact weighted by the affected pages' Search Console clicks over the last 28 days when Search Console is connected), the score of the last five audits of the same site, and the site-level facts the audit probed (server headers, security headers, https redirect, DNS records, TLS certificate from public Certificate Transparency logs, domain expiry from RDAP, robots.txt AI-crawler access, llms.txt). A null fact or a check in state 'unknown' was not measured; do not read it as a pass or a fail. Free; may read Search Console once. Omit auditId for the most recent audit.",
    inputSchema: summaryInputSchema,
    outputSchema: z
      .object({
        score: z.number().nullable(),
        standing: looseObjectOutputSchema,
        categories: z.array(looseObjectOutputSchema),
        counters: looseObjectOutputSchema,
        todos: z.array(looseObjectOutputSchema),
        history: z.array(looseObjectOutputSchema),
        siteFacts: looseObjectOutputSchema.nullable(),
        ...auditProgressOutputSchema,
        ...optionalMetaOutputSchema,
      })
      .passthrough(),
    annotations: {
      readOnlyHint: true,
      openWorldHint: true,
      destructiveHint: false,
    },
  },
  handler: withMcpProjectAuth(async (args: SummaryArgs, context) => {
    const audit = await latestAudit(args.projectId, args.auditId);
    if (!audit) {
      return noAuditsYet(context, args.projectId, {
        score: null,
        standing: { kind: "withheld", reason: "empty" },
        categories: [],
        counters: {},
        todos: [],
        history: [],
        siteFacts: null,
      });
    }
    const [results, insights] = await Promise.all([
      AuditService.getResults(audit.id, args.projectId),
      getAuditInsights({ projectId: args.projectId, auditId: audit.id }).catch(
        () => null,
      ),
    ]);
    const pagesCrawled = results.audit.pagesCrawled;
    const findings = findingsFromIssues(results.issues, pagesCrawled);
    const breakdown = buildAuditBreakdown(findings, {
      pagesCrawled,
      hasLighthouse: results.lighthouse.some(
        (row) => row.performanceScore !== null,
      ),
      siteFacts: results.siteFacts,
      googleInspected: insights?.googleInspected ?? null,
      analyticsCompared: results.audit.analyticsCompared,
    });
    const standing = auditStanding(breakdown, results.audit.status);
    const score = standing.kind === "scored" ? standing.score : null;
    const thinLines = thinCategoryLines(standing, breakdown.categories, {
      lighthouse: results.lighthouse,
      speedOff: results.audit.config.lighthouseStrategy === "none",
      googleInspected: insights?.googleInspected ?? null,
    });
    const traffic = insights?.traffic
      ? new Map(
          insights.traffic.rows.map((row) => [
            pageKey(row.url),
            { clicks: row.clicks, impressions: row.impressions },
          ]),
        )
      : null;
    const todos = rankTodos(
      todoInputs(results.issues, breakdown.gains),
      traffic,
    )
      .slice(0, TODO_LIMIT)
      .map((item) => {
        const descriptor = getIssueDescriptor(item.issueType);
        return {
          issueType: item.issueType,
          title: descriptor?.title ?? item.issueType,
          severity: item.severity,
          points: Math.round(item.points * 10) / 10,
          effort: item.effort,
          siteLevel: item.siteLevel,
          pageCount: item.pageCount,
          clicks: item.clicks,
          impressions: item.impressions,
          samplePages: item.pageUrls.slice(0, 5),
          howToFix: descriptor?.howToFix ?? null,
        };
      });
    const categories = breakdown.categories.map((category) => ({
      ...category,
      impact: Math.round(category.impact * 10) / 10,
    }));
    const history = insights?.history ?? [];

    const note = incompleteAuditNote(audit);
    const c = breakdown.counters;
    const body = [
      `Audit ${audit.id} (${results.audit.startUrl}): score ${score ?? "n/a"}/100 over ${pagesCrawled} pages.`,
      standing.kind === "withheld"
        ? `No score: ${standing.reason === "cut-short" ? "the crawl was cut short by the site's rate limit" : standing.reason === "failed" ? "the audit failed" : standing.reason === "running" ? "the audit is still running" : "nothing was crawled"}; the findings are incomplete.`
        : `Coverage: ${standing.coverage.measured}/${standing.coverage.total} checks measured (${Math.round(standing.coverage.ratio * 100)}% weighted). ${standing.provisional ? `Provisional score, no tier.${standing.thinCategories.length > 0 ? ` Mostly unmeasured: ${standing.thinCategories.join(", ")}.` : ""}` : `Tier: ${standing.tier}${standing.cappedBy ? ` (score capped by ${standing.cappedBy === "critical" ? "a critical finding" : "many warnings"})` : ""}.`}`,
      `Checks: ${c.errors} critical failed, ${c.opportunities} warning/info failed, ${c.passed} passed, ${c.unknown} not measured.`,
      `Categories: ${categories.map((cat) => `${cat.category} ${cat.score ?? "not measured"}${cat.impact > 0 ? ` (-${cat.impact})` : ""}`).join(", ")}.`,
      history.length > 1
        ? `Score history: ${history.map((point) => point.score ?? "n/a").join(" -> ")}.`
        : "",
      traffic
        ? "To-do order weights score impact by Search Console clicks (last 28 days)."
        : "Search Console not available: to-do order is score impact only.",
      "To-do:",
      ...todos.map(
        (item, index) =>
          `${index + 1}. [${item.severity}] ${item.title} (${item.issueType}): +${item.points} points, effort ${item.effort}, ${item.siteLevel ? "whole site" : `${item.pageCount} pages`}${item.clicks === null ? "" : `, ${item.clicks} clicks`}`,
      ),
      "Site facts, categories and full to-do rows are in structuredContent.",
    ]
      .filter(Boolean)
      .join("\n");

    return mcpResponse({
      text: note ? `${note}\n${body}` : body,
      meta: buildProjectMeta(
        context,
        args.projectId,
        auditPath(args.projectId, audit.id),
      ),
      structuredContent: {
        score,
        standing:
          standing.kind === "scored" ? { ...standing, thinLines } : standing,
        categories,
        counters: breakdown.counters,
        todos,
        history,
        siteFacts: results.siteFacts,
        ...auditProgressFields(audit),
      },
    });
  }),
};
