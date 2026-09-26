/**
 * Helpers the audit tools share.
 *
 * Split out when `site-audit-tools.ts` crossed the 400-line lint ceiling;
 * `get_audit_issues` went with them into its own file.
 */
import { z } from "zod";
import { AuditRepository } from "@/server/features/audit/repositories/AuditRepository";
import { AppError } from "@/server/lib/errors";
import { mcpResponse } from "@/server/mcp/formatters";
import { buildProjectMeta } from "@/server/mcp/context";

export const auditIdSchema = z
  .string()
  .optional()
  .describe("Audit ID. If omitted, uses the project's most recent audit.");

/**
 * The audit asked for, or the newest one.
 *
 * A named id that does not exist is a caller mistake and throws. Having no
 * audits at all is not: it is what every fresh install looks like, and it
 * used to come back as `isError: true` with no `structuredContent` and no
 * `_meta` — the only empty state on this surface modelled as a failure,
 * while `list_reports`, `list_saved_keywords` and `list_report_templates`
 * all answer with success plus an empty result. An agent reads the
 * difference as a malfunction, and the telemetry counted a fresh install's
 * first three audit calls as failures.
 */
async function resolveAudit(projectId: string, auditId: string) {
  const audit = await AuditRepository.getAuditForProject(auditId, projectId);
  if (!audit) {
    throw new AppError(
      "NOT_FOUND",
      `Audit ${auditId} not found in this project.`,
    );
  }
  return audit;
}

/** null when the project has never run one. */
export async function latestAudit(projectId: string, auditId?: string) {
  return auditId
    ? resolveAudit(projectId, auditId)
    : AuditRepository.getLatestAuditForProject(projectId);
}

/**
 * The shape each tool declares differs, so the empty body is passed in.
 *
 * Returning one generic object here failed the SDK's own output validation
 * and turned a clean empty state into "Output validation error: expected
 * object, received undefined" - worse than the `isError` it replaced. Caught
 * by calling the tools against a running install; nothing in the unit suite
 * validates a tool response against its declared schema.
 */
export function noAuditsYet(
  context: Parameters<typeof buildProjectMeta>[0],
  projectId: string,
  structuredContent: Record<string, unknown>,
) {
  return mcpResponse({
    text: "No audits exist for this project yet. Start one with run_site_audit.",
    meta: buildProjectMeta(context, projectId, `/p/${projectId}/audit`),
    structuredContent,
  });
}

export function auditPath(projectId: string, auditId: string) {
  return `/p/${projectId}/audit?auditId=${auditId}`;
}
