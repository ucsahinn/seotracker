import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { reportInventorySchema } from "@/shared/reportInventory";
import { AuthRepository } from "@/server/auth/repositories/AuthRepository";
import { ReportInventoryService } from "@/server/features/reports/services/ReportInventoryService";
import { ReportService } from "@/server/features/reports/services/ReportService";
import { ReportTemplateService } from "@/server/features/reports/services/ReportTemplateService";
import { requireProjectContext } from "@/serverFunctions/middleware";
import type { ReportMetadata } from "@/types/schemas/reports";

// Reports read path for the app. The `projectId` field in each validator is
// what triggers project authorization (ADR 0001); the service never authorizes.
// The stored `html` is deliberately unreachable from here — the /r/<id> render
// route is its only reader, so no server function can pull documents into the
// app worker's heap.

const reportRefSchema = z.object({
  projectId: z.string().min(1),
  reportId: z.string().min(1),
});

/** Bounded summary previews are plain text; HTML stays in the render route. */
export type ReportListItem = ReportMetadata & {
  /**
   * Display name behind `createdByUserId`, or null when the user is gone
   * (GDPR re-attribution) or has no name. The UI falls back to the client
   * label alone.
   */
  createdByName: string | null;
  /** The template's name, or null when the report followed none or its id no longer resolves in this project. */
  templateName: string | null;
};

// One lookup for all savers and one for all templates, not one per row. The
// project's whole template list is the name lookup: it is capped at ten rows.
async function withDisplayNames(
  reports: ReportMetadata[],
  projectId: string,
): Promise<ReportListItem[]> {
  const userIds = [...new Set(reports.map((report) => report.createdByUserId))];
  const [users, { templates }] = await Promise.all([
    AuthRepository.getHostedUserNames(userIds),
    ReportTemplateService.listReportTemplates(projectId),
  ]);
  const names = new Map(users.map((user) => [user.id, user.name]));
  const templateNames = new Map(templates.map((t) => [t.id, t.name]));
  return reports.map((report) => ({
    ...report,
    summary: report.summary.slice(0, 600),
    createdByName: names.get(report.createdByUserId) ?? null,
    templateName: report.templateId
      ? (templateNames.get(report.templateId) ?? null)
      : null,
  }));
}

/** Metadata only. The document itself is served by /r/<reportId>. */
export const getReport = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(reportRefSchema)
  .handler(async ({ data, context }) => {
    const report = await ReportService.getReport(
      context.projectId,
      data.reportId,
    );
    const [withNames] = await withDisplayNames([report], context.projectId);
    return withNames;
  });

export const deleteReport = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(reportRefSchema)
  .handler(async ({ data, context }) => {
    await ReportService.deleteReport(context.projectId, data.reportId);
    return { reportId: data.reportId };
  });

export const listReportInventory = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(reportInventorySchema)
  .handler(async ({ data, context }) => {
    const result = await ReportInventoryService.listReportInventory({
      ...data,
      projectId: context.projectId,
    });
    const named = await withDisplayNames(
      [...result.reports, ...(result.latest ? [result.latest] : [])],
      context.projectId,
    );
    return {
      ...result,
      reports: named.slice(0, result.reports.length),
      latest: result.latest ? named[named.length - 1] : null,
    };
  });
export type ReportInventory = Awaited<ReturnType<typeof listReportInventory>>;

/** Authorization is identical to the metadata read; no document is transferred. */
export const getReportAvailability = createServerFn({ method: "POST" })
  .middleware(requireProjectContext)
  .validator(reportRefSchema)
  .handler(async ({ data, context }) =>
    ReportService.reportAvailability(context.projectId, data.reportId),
  );
