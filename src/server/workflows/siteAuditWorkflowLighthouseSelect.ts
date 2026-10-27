import type { WorkflowStep } from "cloudflare:workers";
import { selectLighthousePages } from "@/server/lib/audit/lighthouse";
import { AuditRepository } from "@/server/features/audit/repositories/AuditRepository";
import { getPageSpeedApiKey } from "@/server/features/lighthouse/pagespeed-config";
import type { AuditConfig } from "@/server/lib/audit/types";
import { resolveLighthouseWork } from "@/server/workflows/site-audit-workflow-helpers";
import { DB_STEP } from "@/server/workflows/auditStepConfigs";
import { classifyAuditError } from "@/server/lib/audit/audit-errors";
import { UNKEYED_LIGHTHOUSE_PAGE_CAP } from "@/shared/audit-limits";

// Step name predates "all pages"; a run in flight replays steps by name.
export async function selectLighthouseWork(params: {
  step: WorkflowStep;
  auditId: string;
  workflowInstanceId: string;
  startUrl: string;
  strategy: AuditConfig["lighthouseStrategy"];
}) {
  const { step, auditId, workflowInstanceId, startUrl, strategy } = params;
  return step.do("select-lighthouse-sample", DB_STEP, async () => {
    // First, so a failure below is attributed to the speed phase and not to
    // the crawl that had already finished.
    await AuditRepository.updateAuditProgress(auditId, workflowInstanceId, {
      currentPhase: "lighthouse",
    });
    // Crawled pages come from the DB — the crawl phase no longer holds a
    // whole-crawl page list in memory.
    const crawledPages = await AuditRepository.getPagesForAudit(auditId);
    /*
     * No key: Google's shared quota is tiny, so the run is capped. A saved key
     * this worker cannot open is the same as no key, plus a notice: speed
     * tests are a bonus on top of the crawl, so they must not cost the audit.
     */
    let hasKey = false;
    try {
      hasKey = Boolean(await getPageSpeedApiKey());
    } catch (error) {
      const info = classifyAuditError(error);
      if (info.errorCode !== "missing_secret") throw error;
      await AuditRepository.recordAuditNotice(auditId, workflowInstanceId, {
        noticeCode: info.errorCode,
        noticeDetail: info.errorDetail,
      });
    }
    const sample = selectLighthousePages(
      crawledPages.map((page) => ({
        url: page.url,
        statusCode: page.statusCode ?? 0,
        fetchClass: page.fetchClass,
      })),
      startUrl,
      strategy,
      hasKey ? Number.POSITIVE_INFINITY : UNKEYED_LIGHTHOUSE_PAGE_CAP,
    );
    const idByUrl = new Map(crawledPages.map((page) => [page.url, page.id]));

    const work = resolveLighthouseWork(sample, idByUrl);

    await AuditRepository.updateAuditProgress(auditId, workflowInstanceId, {
      currentPhase: "lighthouse",
      lighthouseTotal: work.lighthouseTotal,
      lighthouseCompleted: 0,
      lighthouseFailed: 0,
    });
    /*
     * Page ids only, in measurement order (start page first, so an early
     * quota stop still covers it). The result is step state, limited to
     * 1 MiB: ids are ~40 bytes each, where id + URL per page was ~135 and
     * overflowed around 7,500 pages. Each wave looks its URLs up.
     */
    return work.pageIds;
  });
}
