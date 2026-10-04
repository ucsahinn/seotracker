import type { WorkflowStep } from "cloudflare:workers";
import { discoverUrls, parseRobotsTxt } from "@/server/lib/audit/discovery";
import {
  getOrigin,
  isSameOrigin,
  normalizeUrl,
} from "@/server/lib/audit/url-utils";
import { isCrawlableUrl } from "@/server/lib/audit/url-policy";
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
  MULTIPAGE_CHECKS_STEP,
} from "@/server/workflows/auditStepConfigs";
import { runLighthousePhase } from "@/server/workflows/siteAuditWorkflowLighthouse";

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
      // False means discovery stopped early: a page missing from the sitemap
      // flag is then "unknown", not proven absent.
      sitemapMembershipComplete: result.membershipComplete,
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
