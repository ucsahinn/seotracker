/**
 * Reconciles audits stuck in "running" with the actual state of their
 * Cloudflare Workflow instance.
 *
 * A workflow killed by the platform (OOM, CPU limit, deploy reset) never
 * reaches its own mark-failed step, and an instance can expire from Workflows
 * retention entirely. Two callers close that gap:
 *   - AuditService.getStatus (lazy: whenever the UI polls a running audit)
 *   - the scheduled watchdog (reconcileStaleAudits, every cron tick) — so
 *     zombie rows die even if nobody ever reopens the page, and the instance
 *     error is copied into the row before Workflows retention deletes it.
 */
import { env } from "cloudflare:workers";
import { and, eq, lt } from "drizzle-orm";
import { db } from "@/db";
import { audits, projects } from "@/db/schema";
import { AuditRepository } from "@/server/features/audit/repositories/AuditRepository";
import {
  classifyAuditError,
  type AuditErrorInfo,
} from "@/server/lib/audit/audit-errors";
import { captureServerEvent } from "@/server/lib/observability";

/**
 * When this process started. This fork runs as one container against one
 * database, so any audit that began before this moment was started by a
 * previous process and nothing is executing it now. Truncated to whole
 * seconds because audit timestamps have second precision: an audit started
 * in the boot second must not read as older than the boot.
 */
const PROCESS_BOOT_MS = Math.floor(Date.now() / 1000) * 1000;

/**
 * Don't declare an instance "lost" until the audit is comfortably older than
 * any legitimate create/start delay: startAudit inserts the row before
 * creating the workflow, so a brand-new audit can briefly have no instance.
 */
const INSTANCE_LOST_GRACE_MS = 10 * 60 * 1000;

/** Audits still "running" after this long get reconciled by the watchdog. */
const STALE_RUNNING_AFTER_MS = 15 * 60 * 1000;

const WATCHDOG_BATCH_LIMIT = 100;

type RunningAudit = {
  id: string;
  workflowInstanceId: string | null;
  startedAt: string;
  currentPhase: string | null;
};

/**
 * If the audit's workflow instance is dead (errored/terminated) or gone,
 * flip the row to failed with a classified error. Returns the error info
 * when the row was flipped, null when the audit is genuinely still running.
 */
export async function reconcileRunningAudit(
  audit: RunningAudit,
): Promise<AuditErrorInfo | null> {
  if (!audit.workflowInstanceId) return null;

  /*
   * A row left "running" by a process that no longer exists.
   *
   * This fork runs as one container against one database -- Docker and
   * miniflare, as `wrangler.jsonc` says outright. Nothing else can advance
   * an audit, so an audit still marked running when this process starts
   * was abandoned by the previous one: restart the container mid-crawl and
   * nothing is executing that workflow any more.
   *
   * The instance record survives the restart and keeps reporting
   * "running", so the status check below never fires and the row stayed
   * "Sürüyor" forever -- past the crawl, past the day, past every later
   * audit. Failing it is the truthful answer, and `failAudit` keeps the
   * pages already crawled, which are persisted per batch.
   */
  if (parseStartedAt(audit.startedAt) < PROCESS_BOOT_MS) {
    const abandoned: AuditErrorInfo = {
      errorCode: "instance_lost",
      errorDetail: "Interrupted: the process running this audit restarted",
    };
    await AuditRepository.failAudit(audit.id, audit.workflowInstanceId, {
      ...abandoned,
      failedPhase: audit.currentPhase,
    });
    return abandoned;
  }

  let errorInfo: AuditErrorInfo | null = null;
  try {
    const instance = await env.SITE_AUDIT_WORKFLOW.get(
      audit.workflowInstanceId,
    );
    const status = await instance.status();
    if (status.status === "errored" || status.status === "terminated") {
      errorInfo = status.error
        ? classifyAuditError(
            typeof status.error === "string"
              ? status.error
              : (status.error.message ?? JSON.stringify(status.error)),
          )
        : {
            errorCode: "unknown",
            errorDetail: `Workflow instance ${status.status}`,
          };
    }
  } catch (error) {
    // Instance not found (never created, or expired from Workflows
    // retention). Past the grace window that means the audit can never
    // finish — without this branch such rows stay "running" forever.
    // Transient status/control-plane errors must NOT fail a live audit,
    // so only a confirmed not-found counts.
    const message = error instanceof Error ? error.message : String(error);
    if (!/not[ _]?found/i.test(message)) return null;
    if (!isOlderThan(audit.startedAt, INSTANCE_LOST_GRACE_MS)) return null;
    errorInfo = {
      errorCode: "instance_lost",
      errorDetail: "Workflow instance not found",
    };
  }
  if (!errorInfo) return null;

  await AuditRepository.failAudit(audit.id, audit.workflowInstanceId, {
    ...errorInfo,
    failedPhase: audit.currentPhase,
  });
  return errorInfo;
}

/** Cron watchdog: sweep stale running audits and reconcile each. */
export async function reconcileStaleAudits() {
  // An audit from before this boot is a candidate however young it is; a
  // newer one only once it has been running suspiciously long.
  const cutoff = new Date(
    Math.max(Date.now() - STALE_RUNNING_AFTER_MS, PROCESS_BOOT_MS),
  );
  const stale = await getStaleRunningAudits(cutoff, WATCHDOG_BATCH_LIMIT);

  for (const audit of stale) {
    try {
      const errorInfo = await reconcileRunningAudit(audit);
      if (!errorInfo) continue;

      console.warn(
        `Audit watchdog: marked ${audit.id} failed (${errorInfo.errorCode}, phase=${audit.currentPhase})`,
      );
      const project = await db.query.projects.findFirst({
        where: eq(projects.id, audit.projectId),
      });
      if (!project) continue;
      await captureServerEvent({
        distinctId: audit.startedByUserId,
        event: "site_audit:complete",
        organizationId: project.organizationId,
        properties: {
          project_id: audit.projectId,
          status: "failed",
          reconciled_by: "watchdog",
          error_code: errorInfo.errorCode,
          pages_crawled: audit.pagesCrawled,
          pages_total: audit.pagesTotal,
        },
      });
    } catch (error) {
      // One unreconcilable audit must not stop the sweep.
      console.error(`Audit watchdog: failed to reconcile ${audit.id}:`, error);
    }
  }
}

/**
 * Running audits started before the cutoff — watchdog candidates. Timestamps
 * are stored as text, so this compares lexicographically: PG rows use ISO
 * with a "T", D1-default rows use "YYYY-MM-DD HH:MM:SS" (space < "T", so a
 * same-day ISO cutoff would misorder against D1 rows without the reformat).
 */
async function getStaleRunningAudits(cutoff: Date, limit: number) {
  const iso = cutoff.toISOString();
  // D1 stores timestamps in SQLite's "YYYY-MM-DD HH:MM:SS" form, so compare in
  // the same shape (a same-day ISO cutoff would misorder against those rows).
  const startedBefore = iso.replace("T", " ").slice(0, 19);
  // Oldest first: genuinely dead audits age past the cutoff and stay there,
  // while long-but-live crawls are the newest of the stale set — without a
  // deterministic order they could occupy the whole batch every sweep and
  // starve real zombies.
  return db.query.audits.findMany({
    where: and(
      eq(audits.status, "running"),
      lt(audits.startedAt, startedBefore),
    ),
    orderBy: audits.startedAt,
    columns: {
      id: true,
      workflowInstanceId: true,
      projectId: true,
      startedByUserId: true,
      startedAt: true,
      currentPhase: true,
      pagesCrawled: true,
      pagesTotal: true,
    },
    limit,
  });
}

/** Epoch ms of a stored timestamp; unparseable reads as infinitely old. */
function parseStartedAt(startedAt: string): number {
  // D1-default timestamps ("YYYY-MM-DD HH:MM:SS") lack the T/Z; normalize so
  // Date.parse reads them as UTC, matching the PG ISO format.
  const parsed = Date.parse(
    startedAt.includes("T") ? startedAt : `${startedAt.replace(" ", "T")}Z`,
  );
  return Number.isNaN(parsed) ? Number.NEGATIVE_INFINITY : parsed;
}

function isOlderThan(startedAt: string, ageMs: number): boolean {
  return parseStartedAt(startedAt) < Date.now() - ageMs;
}
