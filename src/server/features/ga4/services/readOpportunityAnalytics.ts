import { COMPLETE_REPORT_LIMIT } from "./Ga4ReportEnhancements";
import { Ga4ConnectionRepository } from "../repositories/Ga4ConnectionRepository";
import { Ga4ReportingService } from "./Ga4ReportingService";
import { Ga4ReportError } from "@/server/lib/ga4Errors";

/**
 * Analytics for the same days, joined by host and path. Analytics is the
 * secondary factor here, so a project without it still gets every estimate;
 * a GA4 failure (quota, permissions) becomes a note instead of an empty
 * screen.
 */
export async function readAnalytics(
  projectId: string,
  dates: { startDate: string; endDate: string },
) {
  const connection = await Ga4ConnectionRepository.getByProjectId(projectId);
  if (!connection) return { state: "not_connected" as const };
  try {
    let report = await Ga4ReportingService.runReport({
      projectId,
      kind: "landing_pages",
      startDate: dates.startDate,
      endDate: dates.endDate,
      limit: COMPLETE_REPORT_LIMIT,
      offset: 0,
      channel: "organic_search",
    });
    const rows = [...report.rows];
    while (report.pageInfo.hasMore) {
      const offset = report.pageInfo.nextOffset;
      if (
        offset === null ||
        offset !== rows.length ||
        report.rows.length === 0
      ) {
        throw new Ga4ReportError(
          "ga4_malformed_response",
          "Google Analytics pagination did not advance.",
        );
      }
      if (
        [
          report.quota?.tokensPerDay,
          report.quota?.tokensPerHour,
          report.quota?.tokensPerProjectPerHour,
        ].some((balance) => balance && balance.remaining <= 0)
      ) {
        throw new Ga4ReportError(
          "ga4_quota_exhausted",
          "Google Analytics reporting quota was exhausted.",
          3600,
        );
      }
      const next = await Ga4ReportingService.runReport({
        projectId,
        kind: "landing_pages",
        ...dates,
        limit: COMPLETE_REPORT_LIMIT,
        offset,
        channel: "organic_search",
      });
      if (
        next.totalRowCount !== report.totalRowCount ||
        next.rows.length === 0
      ) {
        throw new Ga4ReportError(
          "ga4_malformed_response",
          "Google Analytics report changed while paging.",
        );
      }
      rows.push(...next.rows);
      report = {
        ...next,
        reportMetadata: {
          ...next.reportMetadata,
          hasLimitedData:
            report.reportMetadata.hasLimitedData ||
            next.reportMetadata.hasLimitedData,
          dataLossFromOtherRow:
            report.reportMetadata.dataLossFromOtherRow ||
            next.reportMetadata.dataLossFromOtherRow,
          subjectToThresholding:
            report.reportMetadata.subjectToThresholding ||
            next.reportMetadata.subjectToThresholding,
          sampling: [
            ...report.reportMetadata.sampling,
            ...next.reportMetadata.sampling,
          ],
          restrictedMetrics: [
            ...report.reportMetadata.restrictedMetrics,
            ...next.reportMetadata.restrictedMetrics,
          ],
          dataTruncationReasons: [
            ...(report.reportMetadata.dataTruncationReasons ?? []),
            ...(next.reportMetadata.dataTruncationReasons ?? []),
          ],
        },
      };
    }
    report = { ...report, rows, rowCount: rows.length };
    return {
      state: "connected" as const,
      report: {
        ...report,
        reportMetadata: {
          ...report.reportMetadata,
          hasLimitedData:
            report.reportMetadata.hasLimitedData ||
            report.totalRowCount > report.rows.length,
        },
      },
    };
  } catch (error) {
    if (error instanceof Ga4ReportError) {
      return { state: "unavailable" as const, code: error.code };
    }
    throw error;
  }
}
