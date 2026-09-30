import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { AuditService } from "@/server/features/audit/services/AuditService";
import { buildAuditReportHtml } from "@/server/features/audit/report/buildAuditReportHtml";
import { getIndexCoverage } from "@/server/features/gsc/services/GscIndexCoverageService";
import { ReportRepository } from "@/server/features/reports/repositories/ReportRepository";
import { ReportService } from "@/server/features/reports/services/ReportService";
import { requireProjectContext } from "@/serverFunctions/middleware";

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
    });

    /*
     * Titles are unique per project and this one is the site and the day, so
     * downloading the same audit twice in a day would be refused as a
     * duplicate. Downloading again should refresh the same report instead.
     */
    const sameDay = await ReportRepository.findReportByTitle(
      context.projectId,
      document.title,
    );

    const saved = await ReportService.saveReport({
      reportId: sameDay?.id,
      projectId: context.projectId,
      organizationId: context.organizationId,
      title: document.title,
      summary: document.summary,
      html: document.html,
      // Not a skill slug: this report came from a button, and labelling it
      // with a skill would claim an agent wrote it.
      createdBy: "seotracker",
      createdByUserId: context.userId,
    });

    return { reportId: saved.reportId, title: saved.title };
  });
