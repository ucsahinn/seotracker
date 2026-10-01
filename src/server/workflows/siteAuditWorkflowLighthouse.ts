import type { WorkflowStep } from "cloudflare:workers";
import {
  failedLighthouseFetch,
  fetchLighthouseResult,
  storeLighthouseResult,
} from "@/server/lib/audit/lighthouse";
import type { AuditConfig, LighthouseStrategy } from "@/server/lib/audit/types";
import { selectLighthouseWork } from "@/server/workflows/siteAuditWorkflowLighthouseSelect";
import { AuditLighthouseRepository } from "@/server/features/audit/repositories/AuditLighthouseRepository";
import { AuditRepository } from "@/server/features/audit/repositories/AuditRepository";
import {
  LIGHTHOUSE_CHUNK_STEP,
  LIGHTHOUSE_PERSIST_STEP,
} from "@/server/workflows/auditStepConfigs";
import {
  LIGHTHOUSE_RATE_LIMIT_PASSES,
  LIGHTHOUSE_RATE_LIMIT_PAUSE,
  LIGHTHOUSE_URLS_PER_STEP,
} from "@/server/workflows/auditStepBudget";
import { LIGHTHOUSE_WAVE_PAUSE_SECONDS } from "@/shared/audit-limits";

type LighthouseFetched = Awaited<ReturnType<typeof fetchLighthouseResult>>;

type Check = { url: string; pageId: string; strategy: LighthouseStrategy };

/** What a pass step returns: counts only, never the multi-MB payloads. */
type PassCounts = {
  completed: number;
  failed: number;
  quotaExhausted: boolean;
  /** Checks Google rejected per minute; the next pass re-runs just these. */
  pending: Check[];
};

type LighthousePhaseParams = {
  auditId: string;
  workflowInstanceId: string;
  actorUserId: string;
  projectId: string;
  startUrl: string;
  config: AuditConfig;
};

type WaveContext = {
  projectId: string;
  auditId: string;
  workflowInstanceId: string;
};

/**
 * One pass over `checks`: fetch, store the raw payloads to R2, insert rows and
 * bump progress, then return only counts. Raw payloads are far over the 1MiB
 * step-result limit, so they never become step state. A retry re-runs the free
 * PageSpeed calls; rows have deterministic ids and R2 keys, so the writes are
 * idempotent.
 *
 * A check that hit the per-minute limit or a transient failure (network, 5xx)
 * is not stored unless this is the last pass (or the daily quota is gone, when
 * waiting cannot help): it is handed back as `pending` so the caller can pause
 * and re-run it. Everything else, including successes, is stored now and never
 * fetched again, so one flaky check cannot discard its siblings.
 */
async function runPass(
  step: WorkflowStep,
  ctx: WaveContext,
  input: {
    name: string;
    checks: Check[];
    prior: { completed: number; failed: number };
    /** Counters before this wave's first pass, and the wave's page ids. */
    wave: { completed: number; failed: number; pageIds: string[] };
    lastPass: boolean;
  },
): Promise<PassCounts> {
  const { name, checks, prior, wave, lastPass } = input;

  const persist = async (
    fetched: LighthouseFetched[],
    pending: Check[],
    keepExisting: boolean,
  ): Promise<PassCounts> => {
    const results = await Promise.all(
      fetched.map((result) =>
        storeLighthouseResult({
          projectId: ctx.projectId,
          auditId: ctx.auditId,
          fetched: result,
        }),
      ),
    );
    await AuditLighthouseRepository.insertLighthouseResults(
      ctx.auditId,
      results,
      { keepExisting },
    );
    // The fallback may not know what a failed attempt already stored, so it
    // reads the wave's counts back instead of trusting its own list.
    let failed = results.filter((result) => result.errorMessage).length;
    let completed = results.length - failed;
    if (keepExisting) {
      const stored = await AuditLighthouseRepository.countResultsForPages(
        ctx.auditId,
        wave.pageIds,
      );
      completed = wave.completed + stored.ok - prior.completed;
      failed = wave.failed + stored.error - prior.failed;
    }
    await AuditRepository.updateAuditProgress(
      ctx.auditId,
      ctx.workflowInstanceId,
      {
        lighthouseCompleted: prior.completed + completed,
        lighthouseFailed: prior.failed + failed,
      },
    );
    return {
      completed,
      failed,
      quotaExhausted: fetched.some((item) => item.quotaExhausted),
      pending,
    };
  };

  try {
    return await step.do(name, LIGHTHOUSE_CHUNK_STEP, async () => {
      const fetched = await Promise.all(
        checks.map(({ url, pageId, strategy }) =>
          fetchLighthouseResult(url, pageId, strategy),
        ),
      );
      const waiting = !lastPass && !fetched.some((item) => item.quotaExhausted);
      // Settled per check: successes and final failures are stored now, only
      // the transient ones (429, network, 5xx) wait for the next pass.
      const isDeferred = (item: LighthouseFetched | undefined) =>
        waiting && Boolean(item?.rateLimited || item?.retryable);
      return persist(
        fetched.filter((item) => !isDeferred(item)),
        checks.filter((_check, index) => isDeferred(fetched[index])),
        false,
      );
    });
  } catch (error) {
    // Step timeout or retries exhausted: these checks still land as error rows
    // so the crawl results and the other waves are not lost.
    const message = error instanceof Error ? error.message : String(error);
    return step.do(`${name}-failed`, LIGHTHOUSE_PERSIST_STEP, () =>
      persist(
        checks.map(({ url, pageId, strategy }) =>
          failedLighthouseFetch(url, pageId, strategy, message),
        ),
        [],
        // Some checks of this wave may already be stored as successes.
        true,
      ),
    );
  }
}

export async function runLighthousePhase(
  step: WorkflowStep,
  params: LighthousePhaseParams,
) {
  const { auditId, workflowInstanceId, projectId, startUrl, config } = params;
  if (config.lighthouseStrategy === "none") return;

  const lighthouseWork = await selectLighthouseWork({
    step,
    auditId,
    workflowInstanceId,
    startUrl,
    strategy: config.lighthouseStrategy,
  });
  const ctx = { projectId, auditId, workflowInstanceId };

  let completedChecks = 0;
  let failedChecks = 0;
  for (
    let chunkStart = 0;
    chunkStart < lighthouseWork.length;
    chunkStart += LIGHTHOUSE_URLS_PER_STEP
  ) {
    const chunkIds = lighthouseWork.slice(
      chunkStart,
      chunkStart + LIGHTHOUSE_URLS_PER_STEP,
    );
    const urlById = new Map(
      (await AuditRepository.getPageUrlsByIds(auditId, chunkIds)).map(
        (page) => [page.id, page.url],
      ),
    );
    const chunkIndex = Math.floor(chunkStart / LIGHTHOUSE_URLS_PER_STEP) + 1;

    // ONE step per wave pass (5 URLs x mobile + desktop = 10 PageSpeed calls in
    // parallel). Checks rejected for the per-minute limit are re-run after a
    // pause; `step.sleep` does not count toward the Workflow step limit.
    let pending: Check[] = chunkIds.flatMap((pageId) => {
      const url = urlById.get(pageId);
      return url
        ? (["mobile", "desktop"] as const).map((strategy) => ({
            url,
            pageId,
            strategy,
          }))
        : [];
    });
    let quotaExhausted = false;
    const wave = {
      completed: completedChecks,
      failed: failedChecks,
      pageIds: chunkIds,
    };
    for (
      let pass = 0;
      pass <= LIGHTHOUSE_RATE_LIMIT_PASSES && pending.length > 0;
      pass += 1
    ) {
      if (pass > 0) {
        await step.sleep(
          `lighthouse-chunk-${chunkIndex}-cooldown-${pass}`,
          LIGHTHOUSE_RATE_LIMIT_PAUSE,
        );
      }
      const counts = await runPass(step, ctx, {
        name:
          pass === 0
            ? `lighthouse-chunk-${chunkIndex}`
            : `lighthouse-chunk-${chunkIndex}-retry-${pass}`,
        checks: pending,
        prior: { completed: completedChecks, failed: failedChecks },
        wave,
        lastPass: pass === LIGHTHOUSE_RATE_LIMIT_PASSES,
      });
      completedChecks += counts.completed;
      failedChecks += counts.failed;
      quotaExhausted ||= counts.quotaExhausted;
      pending = counts.pending;
    }

    // Daily quota spent: stop and keep what is stored; the results screen
    // explains the gap from the quota rows and the planned total.
    if (quotaExhausted) break;

    // Pace the waves so sustained throughput stays well under the per-minute
    // limit. Not after the last wave, and a sleep adds no step.
    if (chunkStart + LIGHTHOUSE_URLS_PER_STEP < lighthouseWork.length) {
      await step.sleep(
        `lighthouse-pause-${chunkIndex}`,
        `${LIGHTHOUSE_WAVE_PAUSE_SECONDS} seconds`,
      );
    }
  }
}
