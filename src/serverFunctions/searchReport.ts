import { createServerFn } from "@tanstack/react-start";
import { SearchPerformanceService } from "@/server/features/gsc/services/SearchPerformanceService";
import { getCannibalization } from "@/server/features/gsc/services/CannibalizationService";
import { buildSearchReportHtml } from "@/server/features/search/report/buildSearchReportHtml";
import { ReportRepository } from "@/server/features/reports/repositories/ReportRepository";
import { ReportService } from "@/server/features/reports/services/ReportService";
import { AppError } from "@/server/lib/errors";
import { APP_REPORT_CREATOR } from "@/shared/report-creator";
import { requireProjectContext } from "@/serverFunctions/middleware";
import { REPORT_MAX_HTML_BYTES } from "@/types/schemas/reports";
import { searchPerformanceInputSchema } from "@/types/schemas/search-performance";
import { t } from "@/shared/i18n";

/**
 * Turns the Search performance view on screen into a saved, printable report.
 *
 * The same view call the screen makes (same filters, same window, served
 * from the server's short cache when the screen just asked), so the report's
 * numbers are the screen's numbers. Nothing leaves the machine: the document
 * is built here and stored in the local reports table.
 */
export const createSearchReport = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(searchPerformanceInputSchema)
  .handler(async ({ context, data }) => {
    const filters = {
      dateRange: data.dateRange,
      device: data.device,
      country: data.country,
      searchType: data.searchType,
    };
    const view = await SearchPerformanceService.getView({
      projectId: context.projectId,
      filters,
    });
    // A failure here drops the overlaps section, not the report.
    const overlaps = await getCannibalization({
      projectId: context.projectId,
      dateRange:
        data.dateRange === "last_7_days" ? "last_28_days" : data.dateRange,
      device: data.device,
      country: data.country,
      searchType: data.searchType,
    }).catch(() => null);

    const document = buildSearchReportHtml({ view, overlaps });
    if (
      new TextEncoder().encode(document.html).length > REPORT_MAX_HTML_BYTES
    ) {
      throw new AppError(
        "VALIDATION_ERROR",
        t(
          "Arama performansı raporu saklama sınırını aşıyor. Daha kısa bir dönem ya da filtre seçip yeniden deneyin.",
        ),
      );
    }

    // The same title (site, window, filters) refreshes the app's own report.
    const existing = await ReportRepository.findReportByTitle(
      context.projectId,
      document.title,
    );
    const same = existing?.createdBy === APP_REPORT_CREATOR ? existing : null;

    const saved = await ReportService.saveReport({
      reportId: same?.id,
      projectId: context.projectId,
      organizationId: context.organizationId,
      title: document.title,
      summary: document.summary,
      html: document.html,
      createdBy: APP_REPORT_CREATOR,
      createdByUserId: context.userId,
    });
    return { reportId: saved.reportId, title: saved.title };
  });
