import { createServerFn } from "@tanstack/react-start";
import { waitUntil } from "cloudflare:workers";
import { requireOrgPermission } from "@/server/auth/org-gate";
import { AuditService } from "@/server/features/audit/services/AuditService";
import { captureServerEvent } from "@/server/lib/observability";
import { requireProjectContext } from "@/serverFunctions/middleware";
import {
  deleteAuditSchema,
  getAuditHistorySchema,
  getAuditResultsSchema,
  getAuditStatusSchema,
  getCrawlProgressSchema,
  startAuditSchema,
} from "@/types/schemas/audit";

export const startAudit = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(startAuditSchema)
  .handler(async ({ data, context }) => {
    const result = await AuditService.startAudit({
      actorUserId: context.userId,
      organizationId: context.organizationId,
      projectId: context.projectId,
      startUrl: data.startUrl,
      maxPages: data.maxPages,
      lighthouseStrategy: data.lighthouseStrategy,
    });

    waitUntil(
      captureServerEvent({
        distinctId: context.userId,
        event: "site_audit:start",
        organizationId: context.organizationId,
        properties: {
          project_id: context.projectId,
          max_pages: data.maxPages ?? 50,
          run_lighthouse: data.lighthouseStrategy !== "none",
        },
      }),
    );

    return result;
  });

export const getAuditStatus = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(getAuditStatusSchema)
  .handler(async ({ data, context }) => {
    return AuditService.getStatus(data.auditId, context.projectId);
  });

export const getAuditResults = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(getAuditResultsSchema)
  .handler(async ({ data, context }) => {
    return AuditService.getResults(data.auditId, context.projectId);
  });

export const getAuditHistory = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(getAuditHistorySchema)
  .handler(async ({ context }) => {
    return AuditService.getHistory(context.projectId);
  });

export const getCrawlProgress = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(getCrawlProgressSchema)
  .handler(async ({ data, context }) => {
    return AuditService.getCrawlProgress(data.auditId, context.projectId);
  });

export const deleteAudit = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(deleteAuditSchema)
  .handler(async ({ data, context }) => {
    // Deleting audits frees the org's free-plan capacity ceiling (a SUM over
    // audit rows), so it gets the same destructive-action gate as archiving.
    requireOrgPermission(context, { project: ["delete"] });
    await AuditService.remove(data.auditId, context.projectId);
    return { success: true };
  });
