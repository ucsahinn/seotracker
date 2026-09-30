import type { WorkflowStep } from "cloudflare:workers";
import { discoverUrls, parseRobotsTxt } from "@/server/lib/audit/discovery";
import {
  failedLighthouseFetch,
  fetchLighthouseResult,
  storeLighthouseResult,
} from "@/server/lib/audit/lighthouse";
import {
  getOrigin,
  isSameOrigin,
  normalizeUrl,
} from "@/server/lib/audit/url-utils";
import { isCrawlableUrl } from "@/server/lib/audit/url-policy";
import { selectLighthouseWork } from "@/server/workflows/siteAuditWorkflowLighthouseSelect";
import { AuditLighthouseRepository } from "@/server/features/audit/repositories/AuditLighthouseRepository";
import { AuditRepository } from "@/server/features/audit/repositories/AuditRepository";
import { getAuditScratchpad } from "@/server/features/audit/AuditScratchpad";
import { AuditProgressKV } from "@/server/lib/audit/progress-kv";
import { runMultipageChecks } from "@/server/lib/audit/issues/multipage";
import {
  siteLevelIssues,
  type RobotsFindings,
  type SitemapProblems,
} from "@/server/lib/audit/issues/site-level-checks";
import type { DetectedIssue } from "@/server/lib/audit/issues/page-reporters";
import type { AuditConfig } from "@/server/lib/audit/types";
import { captureServerEvent } from "@/server/lib/observability";
import {
  runCrawlPhase,
  type CrawlPhaseResult,
} from "@/server/workflows/siteAuditWorkflowCrawl";
import {
  DB_STEP,
  DISCOVERY_STEP,
  LIGHTHOUSE_FETCH_STEP,
  LIGHTHOUSE_PERSIST_STEP,
  MULTIPAGE_CHECKS_STEP,
} from "@/server/workflows/auditStepConfigs";

/**
 * URLs fetched concurrently per wave. Each URL runs mobile + desktop, so one
 * wave holds up to 10 PageSpeed calls in flight; the aux worker's parse lock
 * serializes the memory-heavy payload parsing behind them.
 */
const LIGHTHOUSE_URL_CONCURRENCY = 5;
/** Frontier seeds per scratchpad RPC call. */
const SEED_RPC_BATCH = 2_000;

type AuditPhasesParams = {
  auditId: string;
  workflowInstanceId: string;
  actorUserId: string;
  projectId: string;
  startUrl: string;
  config: AuditConfig;
};

export async function runAuditPhases(
  step: WorkflowStep,
  params: AuditPhasesParams,
) {
  const {
    auditId,
    workflowInstanceId,
    actorUserId,
    projectId,
    startUrl,
    config,
  } = params;
  const origin = getOrigin(startUrl);
  const maxPages = config.maxPages;

  const discovery = await runDiscoveryPhase(step, {
    auditId,
    workflowInstanceId,
    origin,
    startUrl,
    maxPages,
  });
  // Parsed outside the step from checkpointed text, so replays see the exact
  // robots rules the original run used (a live re-fetch could differ and
  // desync the frontier from already-persisted crawl batches).
  const robots = parseRobotsTxt(origin, discovery.robotsText);
  const crawl = await runCrawlPhase(step, {
    auditId,
    workflowInstanceId,
    origin,
    maxPages,
    robots,
    seededCount: discovery.seededCount,
  });
  await runLighthousePhase(step, {
    auditId,
    workflowInstanceId,
    actorUserId,
    projectId,
    startUrl,
    config,
  });
  await finalizeAudit({
    step,
    auditId,
    workflowInstanceId,
    actorUserId,
    projectId,
    startUrl,
    config,
    crawl,
    robotsFindings: discovery.robots,
    sitemapProblems: discovery.sitemapProblems,
  });
}

async function runDiscoveryPhase(
  step: WorkflowStep,
  input: {
    auditId: string;
    workflowInstanceId: string;
    origin: string;
    startUrl: string;
    maxPages: number;
  },
) {
  const { auditId, workflowInstanceId, origin, startUrl, maxPages } = input;
  // "-v2": the checkpoint shape changed (seeds now live in the scratchpad DO
  // instead of the step return). A pre-refactor instance replayed under this
  // code must re-run discovery — resuming from the old cached {sitemapUrls}
  // shape would leave the scratchpad empty and finalize a zero-page audit.
  return step.do("discover-urls-v2", DISCOVERY_STEP, async () => {
    const result = await discoverUrls(origin, maxPages);
    const robots = parseRobotsTxt(origin, result.robotsText);
    const scratchpad = getAuditScratchpad(auditId);

    // Seeds go straight into the scratchpad frontier — nothing large is
    // returned as step state (an uncapped seed list used to blow the ~1MiB
    // step-output limit on big sitemaps).
    let seededCount = 0;
    const normalizedStart = normalizeUrl(startUrl) ?? startUrl;
    /*
     * Recorded, not just acted on. A start URL its own robots.txt forbids
     * produced a zero-page audit with no stated reason, which reads as a
     * broken tool rather than as the finding it is.
     */
    const startBlocked = !robots.isAllowed(normalizedStart);
    if (!startBlocked && isSameOrigin(normalizedStart, origin)) {
      await scratchpad.seedStart(normalizedStart);
      seededCount += 1;
    }

    // The start URL is deliberately not excluded here: seedSitemapUrls
    // upserts, so a start URL that also appears in the sitemap keeps its
    // link-queue position but gains the in-sitemap flag.
    const seen = new Set<string>();
    const seeds: string[] = [];
    const disallowedSitemapUrls: string[] = [];
    for (const url of result.urls) {
      const normalized = normalizeUrl(url);
      if (!normalized || seen.has(normalized)) continue;
      seen.add(normalized);
      if (!isSameOrigin(normalized, origin)) continue;
      if (!isCrawlableUrl(normalized)) continue;
      // Two of the site's own systems disagreeing about one URL: the
      // sitemap says crawl it, robots.txt says do not. Counted rather than
      // dropped in silence.
      if (!robots.isAllowed(normalized)) {
        disallowedSitemapUrls.push(normalized);
        continue;
      }
      seeds.push(normalized);
    }
    for (let i = 0; i < seeds.length; i += SEED_RPC_BATCH) {
      await scratchpad.seedSitemapUrls(seeds.slice(i, i + SEED_RPC_BATCH));
    }
    seededCount += seeds.filter((seed) => seed !== normalizedStart).length;

    await AuditRepository.updateAuditProgress(auditId, workflowInstanceId, {
      pagesTotal: Math.min(seededCount, maxPages),
      currentPhase: "crawling",
    });
    return {
      robotsText: result.robotsText,
      seededCount,
      sitemapProblems: result.sitemapProblems,
      robots: {
        status: result.robotsFetch.status,
        truncated: result.robotsFetch.truncated,
        startBlocked,
        // Capped: this is durable step state with a ~1MiB ceiling, and the
        // count is the finding while the samples only illustrate it.
        disallowedSitemapSample: disallowedSitemapUrls.slice(0, 10),
        disallowedSitemapCount: disallowedSitemapUrls.length,
      },
    };
  });
}

type LighthousePhaseParams = {
  auditId: string;
  workflowInstanceId: string;
  actorUserId: string;
  projectId: string;
  startUrl: string;
  config: AuditConfig;
};

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

  let completedChecks = 0;
  let failedChecks = 0;
  for (
    let chunkStart = 0;
    chunkStart < lighthouseWork.length;
    chunkStart += LIGHTHOUSE_URL_CONCURRENCY
  ) {
    const chunk = lighthouseWork.slice(
      chunkStart,
      chunkStart + LIGHTHOUSE_URL_CONCURRENCY,
    );

    // The paid calls are checkpointed separately from all storage. With
    // Workflow retries disabled, a later R2/DB/progress failure cannot replay
    // DataForSEO. One URL groups its mobile + desktop checks into one compact
    // checkpoint. allSettled, not all: a rejected step must not orphan the
    // sibling calls mid-flight — their checkpoints complete and persist below
    // either way.
    const settled = await Promise.allSettled(
      chunk.map(({ url, pageId }, chunkOffset) =>
        step.do(
          `lighthouse-fetch-${chunkStart + chunkOffset + 1}`,
          LIGHTHOUSE_FETCH_STEP,
          () =>
            Promise.all([
              fetchLighthouseResult(url, pageId, "mobile"),
              fetchLighthouseResult(url, pageId, "desktop"),
            ]),
        ),
      ),
    );
    const fetched = settled.flatMap((outcome, chunkOffset) => {
      if (outcome.status === "fulfilled") return outcome.value;
      // Step timeout or engine failure — provider errors never reject here
      // (the audit-layer fetch converts them into errorMessage results).
      const { url, pageId } = chunk[chunkOffset];
      const message =
        outcome.reason instanceof Error
          ? outcome.reason.message
          : String(outcome.reason);
      return (["mobile", "desktop"] as const).map((strategy) =>
        failedLighthouseFetch(url, pageId, strategy, message),
      );
    });

    const chunkIndex = Math.floor(chunkStart / LIGHTHOUSE_URL_CONCURRENCY) + 1;
    const priorCompleted = completedChecks;
    const priorFailed = failedChecks;
    const counts = await step.do(
      `lighthouse-persist-chunk-${chunkIndex}`,
      LIGHTHOUSE_PERSIST_STEP,
      async () => {
        const results = await Promise.all(
          fetched.map((result) =>
            storeLighthouseResult({
              projectId,
              auditId,
              fetched: result,
            }),
          ),
        );
        await AuditLighthouseRepository.insertLighthouseResults(
          auditId,
          results,
        );

        const failed = results.filter((result) => result.errorMessage).length;
        const completed = results.length - failed;
        await AuditRepository.updateAuditProgress(auditId, workflowInstanceId, {
          lighthouseCompleted: priorCompleted + completed,
          lighthouseFailed: priorFailed + failed,
        });
        return { completed, failed };
      },
    );

    completedChecks += counts.completed;
    failedChecks += counts.failed;

    // Daily quota spent: stop and keep what is stored; the results screen
    // explains the gap from the quota rows and the planned total.
    if (fetched.some((item) => item.quotaExhausted)) break;
  }
}

async function finalizeAudit(args: {
  step: WorkflowStep;
  auditId: string;
  workflowInstanceId: string;
  actorUserId: string;
  projectId: string;
  startUrl: string;
  config: AuditConfig;
  crawl: CrawlPhaseResult;
  /*
   * Optional because this is durable Workflow state: a run that started
   * before this field existed replays its discovery step from storage and
   * gets the old shape back. Absent means "not recorded", never "clean".
   */
  robotsFindings?: RobotsFindings;
  /** Optional for the same replay reason as `robotsFindings`. */
  sitemapProblems?: SitemapProblems;
}) {
  const {
    step,
    auditId,
    workflowInstanceId,
    actorUserId,
    projectId,
    startUrl,
    config,
    crawl,
    robotsFindings,
    sitemapProblems,
  } = args;

  await step.do("multipage-checks", MULTIPAGE_CHECKS_STEP, async () => {
    await AuditRepository.updateAuditProgress(auditId, workflowInstanceId, {
      currentPhase: "finalizing",
    });

    // Integrity guard: pages are persisted inside crawl-chunk steps. If the
    // crawl claims pages but the DB has none, fail loudly instead of
    // completing with an empty audit.
    if (
      crawl.pagesCrawled > 0 &&
      !(await AuditRepository.hasPagesForAudit(auditId))
    ) {
      throw new Error(
        `Audit ${auditId}: crawl reported ${crawl.pagesCrawled} pages but none were persisted`,
      );
    }

    const issues = await runMultipageChecks({ auditId, projectId, startUrl });
    issues.push(...(await runScratchpadLinkChecks(auditId, startUrl, crawl)));
    if (crawl.rateLimited) {
      issues.push({
        issueType: "crawl-rate-limited",
        pageId: null,
        pageUrl: startUrl,
      });
    }
    issues.push(
      ...siteLevelIssues({ startUrl, robotsFindings, sitemapProblems }),
    );
    await AuditRepository.insertIssues(auditId, issues);
    return { issueCount: issues.length };
  });

  await step.do("finalize", DB_STEP, async () => {
    const blockedPages = await AuditRepository.countPagesByFetchClass(
      auditId,
      "blocked",
    );
    const rateLimitedPages = await AuditRepository.countPagesByFetchClass(
      auditId,
      "rate_limited",
    );
    await AuditRepository.completeAudit(auditId, workflowInstanceId, {
      pagesCrawled: crawl.pagesCrawled,
      pagesTotal: crawl.pagesCrawled,
    });
    await captureServerEvent({
      distinctId: actorUserId,
      event: "site_audit:complete",
      properties: {
        project_id: projectId,
        status: "completed",
        pages_crawled: crawl.pagesCrawled,
        pages_total: crawl.pagesCrawled,
        crawl_completed: crawl.completed,
        pages_blocked: blockedPages,
        pages_rate_limited: rateLimitedPages,
        run_lighthouse: config.lighthouseStrategy !== "none",
      },
    });
    await AuditProgressKV.clear(auditId);
    // Crawl scratch state (frontier, links, mirror) is no longer needed.
    await getAuditScratchpad(auditId).destroy();
  });
}

/**
 * The two finalize checks that need link edges run as SQL inside the
 * audit's scratchpad DO; map their rows onto DetectedIssue.
 */
async function runScratchpadLinkChecks(
  auditId: string,
  startUrl: string,
  crawl: CrawlPhaseResult,
): Promise<DetectedIssue[]> {
  const scratchpad = getAuditScratchpad(auditId);
  const { brokenLinks, redirectLinks, orphanPages, repairedDepths } =
    await scratchpad.runFinalizeChecks({
      // Page rows store normalized URLs; normalize the start URL the same
      // way so the orphan exclusion matches.
      startUrl: normalizeUrl(startUrl) ?? startUrl,
      // Orphan detection only makes sense when the crawl wasn't truncated.
      crawlCompleted: crawl.completed,
    });

  /*
   * Backfill the click depth the frontier worked out after each page row
   * was written. Sitemap seeds are leased at depth NULL, and the row is
   * persisted then; a link reaching the same URL later repairs the frontier
   * and never touches the row. On a sitemap-driven crawl that left most
   * pages at NULL, and `deep-page` skips NULL -- so the check was off for
   * almost the whole site. Runs before the checks below read the rows.
   */
  await AuditRepository.backfillCrawlDepths(auditId, repairedDepths);

  return [
    ...brokenLinks.map((row) => ({
      issueType: "broken-internal-link" as const,
      pageId: row.sourcePageId,
      pageUrl: row.sourceUrl,
      dedupeKey: row.targetUrl,
      details: { targetUrl: row.targetUrl, targetStatus: row.targetStatus },
    })),
    ...redirectLinks.map((row) => ({
      issueType: "internal-link-to-redirect" as const,
      pageId: row.sourcePageId,
      pageUrl: row.sourceUrl,
      dedupeKey: row.targetUrl,
      details: {
        targetUrl: row.targetUrl,
        targetStatus: row.targetStatus,
        finalUrl: row.finalUrl,
      },
    })),
    ...orphanPages.map((row) => ({
      issueType: "orphan-page" as const,
      pageId: row.pageId,
      pageUrl: row.url,
    })),
  ];
}
