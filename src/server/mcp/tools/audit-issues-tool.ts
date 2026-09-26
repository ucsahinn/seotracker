import { sort } from "remeda";
import { z } from "zod";
import { AuditRepository } from "@/server/features/audit/repositories/AuditRepository";
import {
  AUDIT_ISSUE_TYPES,
  getIssueDescriptor,
  ISSUE_SEVERITY_ORDER,
  resolveIssueSeverity,
  type IssueSeverity,
} from "@/shared/audit-issues";
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

// ─── get_audit_issues ────────────────────────────────────────────────────────

const issuesInputSchema = {
  projectId: projectIdSchema,
  auditId: auditIdSchema,
  severity: z
    .enum(["critical", "warning", "info"])
    .optional()
    .describe("Only return issues of this severity."),
  issueType: z
    .string()
    .optional()
    .describe(
      `Only return issues of this type. One of: ${Object.keys(AUDIT_ISSUE_TYPES).join(", ")}`,
    ),
  limit: z
    .number()
    .int()
    .min(1)
    .max(1_000)
    .optional()
    .describe("Max issues to return (default 200)."),
} as const;

type IssuesArgs = z.infer<z.ZodObject<typeof issuesInputSchema>>;

export const getAuditIssuesTool = {
  name: "get_audit_issues",
  config: {
    title: "Get site audit issues",
    description:
      "Read the prioritized issue report from a completed site audit. Every issue carries a how_to_fix with concrete remediation steps an agent can act on. Free — reads seotracker state. Omit auditId for the most recent audit.",
    inputSchema: issuesInputSchema,
    outputSchema: z
      .object({
        summary: z.array(looseObjectOutputSchema),
        issues: z.array(looseObjectOutputSchema),
        ...optionalMetaOutputSchema,
      })
      .passthrough(),
    annotations: {
      readOnlyHint: true,
      openWorldHint: false,
      destructiveHint: false,
    },
  },
  handler: withMcpProjectAuth(async (args: IssuesArgs, context) => {
    const audit = await latestAudit(args.projectId, args.auditId);
    if (!audit) {
      return noAuditsYet(context, args.projectId, { summary: [], issues: [] });
    }
    /*
     * Filtered here rather than in SQL on purpose: the column holds the
     * severity stored at write time, the registry holds what the app reports
     * today. Filtering on one and labelling from the other let a response to
     * `severity: "critical"` carry a summary row reading `warning` for the
     * very type its own `issues` array called critical.
     */
    const unsorted = await AuditRepository.getIssuesForAudit(audit.id, {
      issueType: args.issueType,
    });
    const resolved = unsorted
      .map((row) => ({ ...row, severity: resolveIssueSeverity(row) }))
      .filter((row) => !args.severity || row.severity === args.severity);
    // Severity-first so truncation drops info rows, never critical ones.
    // `resolveIssueSeverity` always returns one of the three keys, so this
    // subtraction cannot go NaN and quietly drop that guarantee.
    const rows = sort(
      resolved,
      (a, b) =>
        ISSUE_SEVERITY_ORDER[a.severity] - ISSUE_SEVERITY_ORDER[b.severity] ||
        a.issueType.localeCompare(b.issueType),
    );

    const counts = new Map<
      string,
      { count: number; severity: IssueSeverity }
    >();
    for (const row of rows) {
      const entry = counts.get(row.issueType);
      if (entry) entry.count += 1;
      // The severity is carried from the rows themselves, so the two arrays
      // in one response cannot disagree about the same issue type.
      else counts.set(row.issueType, { count: 1, severity: row.severity });
    }
    const summary = sort(
      Array.from(counts.entries()).map(([issueType, { count, severity }]) => {
        const descriptor = getIssueDescriptor(issueType);
        return {
          issueType,
          title: descriptor?.title ?? issueType,
          severity,
          count,
        };
      }),
      (a, b) =>
        ISSUE_SEVERITY_ORDER[a.severity] - ISSUE_SEVERITY_ORDER[b.severity] ||
        b.count - a.count,
    );

    const limit = args.limit ?? 200;
    const issues = rows.slice(0, limit).map((row) => {
      const descriptor = getIssueDescriptor(row.issueType);
      return {
        severity: row.severity,
        issueType: row.issueType,
        title: descriptor?.title ?? row.issueType,
        url: row.pageUrl,
        details: row.detailsJson
          ? (JSON.parse(row.detailsJson) as unknown)
          : null,
        howToFix: descriptor?.howToFix ?? null,
      };
    });

    const text =
      rows.length === 0
        ? args.severity || args.issueType
          ? `No issues found for audit ${audit.id} matching the given filters.`
          : `No issues recorded for audit ${audit.id}. Note: audits run before issue checks existed have no issue data — re-run the audit with run_site_audit to get a real report.`
        : [
            `Audit ${audit.id} (${audit.startUrl}): ${rows.length} issues${rows.length > limit ? ` (showing ${limit})` : ""}.`,
            "By type:",
            ...summary.map(
              (entry) =>
                `- [${entry.severity}] ${entry.title} (${entry.issueType}): ${entry.count}`,
            ),
            "Full issue rows with how_to_fix instructions are in structuredContent.issues.",
          ].join("\n");

    return mcpResponse({
      text,
      meta: buildProjectMeta(
        context,
        args.projectId,
        auditPath(args.projectId, audit.id),
      ),
      structuredContent: { summary, issues },
    });
  }),
};
