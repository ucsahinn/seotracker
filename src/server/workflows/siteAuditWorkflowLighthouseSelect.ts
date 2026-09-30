import type { WorkflowStep } from "cloudflare:workers";
import { selectLighthousePages } from "@/server/lib/audit/lighthouse";
import { AuditRepository } from "@/server/features/audit/repositories/AuditRepository";
import { getPageSpeedApiKey } from "@/server/features/lighthouse/pagespeed-config";
import type { AuditConfig } from "@/server/lib/audit/types";
import { DB_STEP } from "@/server/workflows/auditStepConfigs";
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
    // Crawled pages come from the DB — the crawl phase no longer holds a
    // whole-crawl page list in memory.
    const crawledPages = await AuditRepository.getPagesForAudit(auditId);
    // No key: Google's shared quota is tiny, so the run is capped.
    const hasKey = Boolean(await getPageSpeedApiKey());
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
    const selectedUrls = new Set(sample);

    await AuditRepository.updateAuditProgress(auditId, workflowInstanceId, {
      currentPhase: "lighthouse",
      lighthouseTotal: sample.length * 2,
      lighthouseCompleted: 0,
      lighthouseFailed: 0,
    });
    return crawledPages.flatMap((page) =>
      selectedUrls.has(page.url) ? [{ url: page.url, pageId: page.id }] : [],
    );
  });
}
