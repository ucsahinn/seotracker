/**
 * Cloudflare Workflow for site audit crawling.
 *
 * Each step is durable - if a step fails, it retries without redoing
 * completed steps.
 */
import {
  WorkflowEntrypoint,
  type WorkflowEvent,
  type WorkflowStep,
} from "cloudflare:workers";
import { AuditRepository } from "@/server/features/audit/repositories/AuditRepository";
import { classifyAuditError } from "@/server/lib/audit/audit-errors";
import type { AuditConfig } from "@/server/lib/audit/types";
import {
  captureServerError,
  captureServerEvent,
} from "@/server/lib/observability";
import { runAuditPhases } from "@/server/workflows/siteAuditWorkflowPhases";
import { DB_STEP } from "@/server/workflows/auditStepConfigs";

interface AuditParams {
  auditId: string;
  actorUserId: string;
  projectId: string;
  startUrl: string;
  config: AuditConfig;
}

export class SiteAuditWorkflow extends WorkflowEntrypoint<Env, AuditParams> {
  async run(event: WorkflowEvent<AuditParams>, step: WorkflowStep) {
    // Scope a per-request Postgres client for this workflow invocation (no-op in
    // D1 mode). The socket is reclaimed when the invocation ends, so there is
    // nothing to tear down here.
    return this.runScoped(event, step);
  }

  private async runScoped(
    event: WorkflowEvent<AuditParams>,
    step: WorkflowStep,
  ) {
    const { auditId, actorUserId, projectId, startUrl, config } = event.payload;

    try {
      // Inside a step so the D1 read is retried and replay-cached; a bare
      // read here would re-execute on every replay and a transient failure
      // would kill the instance before the catch below exists.
      await step.do("validate-context", DB_STEP, async () => {
        const audit = await AuditRepository.getAuditForWorkflow(
          auditId,
          event.instanceId,
        );

        if (!audit) {
          throw new Error("Audit workflow context mismatch");
        }

        if (audit.projectId !== projectId) {
          throw new Error("Audit workflow project mismatch");
        }
      });

      await runAuditPhases(step, {
        auditId,
        workflowInstanceId: event.instanceId,
        actorUserId,
        projectId,
        startUrl,
        config,
      });
    } catch (error) {
      console.error(`Audit ${auditId} failed:`, error);
      // Workflow entrypoints run outside the server-function middleware, so
      // nothing else forwards this throw to PostHog as a $exception. Capture it
      // here (awaited — Workflows have no ctx.waitUntil) before re-throwing.
      // Deploy-time resets are expected churn, not actionable errors.
      const isDeployReset =
        error instanceof Error &&
        error.message.includes(
          "Durable Object reset because its code was updated",
        );
      if (!isDeployReset) {
        await captureServerError(
          error,
          {
            source: "site_audit_workflow",
            audit_id: auditId,
            project_id: projectId,
          },
          actorUserId,
        );
      }
      const errorInfo = classifyAuditError(error);
      await step.do("mark-failed", DB_STEP, async () => {
        // Read the phase before failAudit stamps currentPhase = "failed".
        const runningAudit = await AuditRepository.getAuditForWorkflow(
          auditId,
          event.instanceId,
        );
        await AuditRepository.failAudit(auditId, event.instanceId, {
          ...errorInfo,
          failedPhase: runningAudit?.currentPhase ?? null,
        });

        await captureServerEvent({
          distinctId: actorUserId,
          event: "site_audit:complete",
          properties: {
            project_id: projectId,
            status: "failed",
            error_code: errorInfo.errorCode,
            failed_phase: runningAudit?.currentPhase,
            pages_crawled: runningAudit?.pagesCrawled,
            pages_total: runningAudit?.pagesTotal,
            run_lighthouse: config.lighthouseStrategy !== "none",
          },
        });
      });
      throw error;
    }
  }
}
