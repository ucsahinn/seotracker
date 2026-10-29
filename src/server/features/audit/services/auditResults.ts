import { AuditSiteFactsRepository } from "../repositories/AuditSiteFactsRepository";
import { AuditRepository } from "../repositories/AuditRepository";
import { AppError } from "@/server/lib/errors";
import { parseAuditConfig } from "@/server/lib/audit/types";
import { redactUrlUserinfo } from "@/server/lib/audit/url-policy";
import { storedAuditErrorCode } from "@/server/lib/audit/audit-errors";
import { t } from "@/shared/i18n";

export async function getAuditResults(auditId: string, projectId: string) {
  const { audit, pages, lighthouse, issues } =
    await AuditRepository.getAuditResultsForProject(auditId, projectId);

  if (!audit) throw new AppError("NOT_FOUND");
  // Null for an audit that predates the site probes, or one still running.
  const siteFacts = await AuditSiteFactsRepository.getSiteFacts(audit.id);

  const parsedConfig = parseAuditConfig(audit.config);
  if (!parsedConfig) {
    throw new AppError("INTERNAL_ERROR", t("Denetim ayarları geçersiz."));
  }

  return {
    audit: {
      id: audit.id,
      startUrl: redactUrlUserinfo(audit.startUrl),
      status: audit.status,
      pagesCrawled: audit.pagesCrawled,
      pagesTotal: audit.pagesTotal,
      lighthouseTotal: audit.lighthouseTotal,
      startedAt: audit.startedAt,
      completedAt: audit.completedAt,
      config: parsedConfig,
      analyticsCompared: audit.analyticsCompared,
      // Why a failed audit stopped, for the "no score" panel on its results.
      errorCode: storedAuditErrorCode(audit),
      failedPhase: audit.failedPhase,
      noticeCode: audit.noticeCode,
      // Null on audits from before it was recorded.
      urlsDiscovered: audit.urlsDiscovered,
    },
    pages,
    lighthouse,
    issues,
    siteFacts,
  };
}
