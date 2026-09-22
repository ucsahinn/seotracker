import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { Ga4ReportingService } from "@/server/features/ga4/services/Ga4ReportingService";
import { Ga4ReportError } from "@/server/lib/ga4Errors";
import { requireProjectContext } from "@/serverFunctions/middleware";
import { GA4_REPORT_KINDS } from "@/shared/ga4-reports";

const schema = z.object({
  projectId: z.string().min(1),
  kind: z.enum(GA4_REPORT_KINDS),
  channel: z.enum(["organic_search", "all"]).default("organic_search"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  limit: z.number().int().min(1).max(200).default(50),
  comparePreviousPeriod: z.boolean().default(false),
});

/**
 * The seven Google Analytics reports, handed to a screen.
 *
 * `Ga4ReportingService` has driven these since the fork began and only an
 * agent could reach them: seven MCP tools, no server function, no page. The
 * engine, its error mapping, its normalization and its tests already
 * existed — this is the missing layer, not a new capability.
 *
 * "Not connected" comes back as a value rather than an exception, for the
 * same reason as `getSearchOpportunities`: it is the expected first state,
 * and a thrown error reaches the client as a generic code that cannot say
 * which integration is missing.
 */
export const getGa4Report = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(schema)
  .handler(async ({ context, data }) => {
    try {
      const report = await Ga4ReportingService.runReport({
        projectId: context.projectId,
        kind: data.kind,
        channel: data.channel,
        startDate: data.startDate,
        endDate: data.endDate,
        limit: data.limit,
        comparePreviousPeriod: data.comparePreviousPeriod,
      });

      /*
       * Projected rather than passed through. The service's result carries
       * the whole run — the raw request, quota counters, comparison
       * scaffolding — and the screen needs the columns, the rows and enough
       * context to caption them. Narrowing here also avoids shipping
       * `undefined` through the serializer, which it refuses.
       */
      return {
        status: "ok" as const,
        propertyDisplayName: report.source.propertyDisplayName ?? null,
        dateRange: report.request.resolvedDateRange,
        currencyCode: report.request.currencyCode ?? null,
        dimensions: report.request.dimensions,
        metrics: report.request.metrics,
        rows: report.rows,
        rowCount: report.rowCount,
        totalRowCount: report.totalRowCount,
        /** Google's own note that a row set is sampled or thresholded. */
        sampled: report.reportMetadata.sampling.length > 0,
        thresholded: report.reportMetadata.subjectToThresholding,
        emptyReason: report.reportMetadata.emptyReason ?? null,
      };
    } catch (error) {
      if (
        error instanceof Ga4ReportError &&
        error.code === "ga4_not_connected"
      ) {
        return { status: "needs_ga4" as const };
      }
      throw error;
    }
  });
