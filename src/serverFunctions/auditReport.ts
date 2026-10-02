import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { AuditService } from "@/server/features/audit/services/AuditService";
import { buildAuditReportHtml } from "@/server/features/audit/report/buildAuditReportHtml";
import { getIndexCoverage } from "@/server/features/gsc/services/GscIndexCoverageService";
import { ReportRepository } from "@/server/features/reports/repositories/ReportRepository";
import { ReportService } from "@/server/features/reports/services/ReportService";
import { AppError } from "@/server/lib/errors";
import { APP_REPORT_CREATOR } from "@/shared/report-creator";
import { requireProjectContext } from "@/serverFunctions/middleware";
import { REPORT_MAX_HTML_BYTES } from "@/types/schemas/reports";

const schema = z.object({
  projectId: z.string().min(1),
  auditId: z.string().min(1),
});

/**
 * Turns a finished audit into a saved report.
 *
 * Built here rather than in the browser so the document is the same whichever
 * screen asked for it, and so it lands in the reports table on the way out —
 * a report someone downloads and then loses is a report they have to
 * re-generate, and the audit it came from may be deleted by then.
 *
 * `getResults` is already project-scoped, which is what authorizes this.
 */
export const createAuditReport = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(schema)
  .handler(async ({ context, data }) => {
    const results = await AuditService.getResults(
      data.auditId,
      context.projectId,
    );
    if (results.audit.status === "running") {
      throw new AppError(
        "VALIDATION_ERROR",
        "Denetim hâlâ çalışıyor. Rapor, denetim bitince oluşturulabilir.",
      );
    }

    /*
     * Stored inspections only: `getIndexCoverage` never calls Google, so
     * building a report spends none of the 2000-a-day quota. A failure here
     * drops the index section rather than the whole report.
     */
    const indexCoverage = await getIndexCoverage({
      projectId: context.projectId,
      auditId: data.auditId,
    }).catch(() => null);

    const document = buildAuditReportHtml({
      siteUrl: results.audit.startUrl,
      startedAt: results.audit.startedAt,
      completedAt: results.audit.completedAt,
      pagesCrawled: results.audit.pagesCrawled,
      pages: results.pages,
      issues: results.issues,
      lighthouse: results.lighthouse,
      indexCoverage,
      maxPages: results.audit.config.maxPages,
      lighthouseMode: results.audit.config.lighthouseStrategy,
      lighthouseTotal: results.audit.lighthouseTotal,
      status: results.audit.status,
      auditId: results.audit.id,
    });

    /*
     * The builder shrinks its lists until the document fits, so reaching here
     * over the cap means the parts it cannot cut are too large. Say that:
     * saveReport's own message blames inlined images, which this report has none of.
     */
    if (
      new TextEncoder().encode(document.html).length > REPORT_MAX_HTML_BYTES
    ) {
      throw new AppError(
        "VALIDATION_ERROR",
        "Bu denetim raporu, sorun listeleri en aza indirilse bile saklama sınırını aşıyor. Raporu oluşturmak için denetimi daha az sayfa veya daha kısa adreslerle yeniden çalıştırın.",
      );
    }

    /*
     * The title carries the site, the day and a short audit id, so downloading
     * the same audit again refreshes its report. Only a report the app itself
     * made is overwritten: an agent's report with the same title is left alone
     * and the save is refused as a duplicate title instead.
     */
    const existing = await ReportRepository.findReportByTitle(
      context.projectId,
      document.title,
    );
    const sameDay =
      existing?.createdBy === APP_REPORT_CREATOR ? existing : null;

    const saved = await ReportService.saveReport({
      reportId: sameDay?.id,
      projectId: context.projectId,
      organizationId: context.organizationId,
      title: document.title,
      summary: document.summary,
      html: document.html,
      // Not a skill slug: this report came from a button, and labelling it
      // with a skill would claim an agent wrote it.
      createdBy: APP_REPORT_CREATOR,
      createdByUserId: context.userId,
    });

    return { reportId: saved.reportId, title: saved.title };
  });
