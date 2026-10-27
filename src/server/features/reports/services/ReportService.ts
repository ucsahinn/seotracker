import { findForbiddenMarkup } from "./reportHtmlValidation";
import { ReportRepository } from "@/server/features/reports/repositories/ReportRepository";
import { AppError } from "@/server/lib/errors";
import { formatEnglishCount } from "@/shared/format";
import {
  REPORT_MAX_BYTES_PER_ORG,
  REPORT_MAX_HTML_BYTES,
  REPORT_MAX_PER_PROJECT,
  REPORT_MAX_SUMMARY_CHARS,
  REPORT_MAX_TITLE_CHARS,
  type ReportMetadata,
} from "@/types/schemas/reports";

// Reports: the HTML documents agents write for a project. Every caller (server
// function, MCP tool, SAM) comes through here, so the caps and the refusal copy
// exist once. Authorization is NOT done here — the caller has already
// authorized `projectId` (ensureUserMiddleware for server functions,
// withMcpProjectAuth for MCP tools) and every query is scoped to it.

// The over-size refusal prints the actual size and the limit side by side, so
// they must never round to the same number: 499,900 bytes reading "500 KB; the
// limit is 500 KB" tells the agent to shrink by nothing. Round the actual size
// up and the limit down.
const kbUp = (bytes: number) =>
  `${formatEnglishCount(Math.ceil(bytes / 1000))} KB`;
const kbDown = (bytes: number) =>
  `${formatEnglishCount(Math.floor(bytes / 1000))} KB`;
const mb = (bytes: number) =>
  `${formatEnglishCount(Math.round(bytes / 1_000_000))} MB`;

const htmlBytes = (html: string) => new TextEncoder().encode(html).length;

type SaveReportParams = {
  projectId: string;
  /** The project's organization, for the workspace-wide storage ceiling. */
  organizationId: string;
  reportId?: string;
  /** Internal callers only: never exposed as MCP save input. */
  nativeKind?: NonNullable<ReportMetadata["nativeKind"]>;
  nativeIdentity?: string;
  title: string;
  summary: string;
  html: string;
  skill?: string;
  /** Validated against the project by the caller, not here. */
  templateId?: string;
  /** Client label, stamped by the server. Never taken from the model. */
  createdBy: string;
  /** From the authenticated context, and nowhere else. */
  createdByUserId: string;
};

/**
 * Create-or-update in one call. Everything is validated before anything is
 * written, so a rejected save leaves the stored report untouched — there is no
 * version history, and a half-written overwrite is unrecoverable.
 */
export async function saveReport(params: SaveReportParams): Promise<{
  reportId: string;
  title: string;
  created: boolean;
  htmlBytes: number;
}> {
  const { projectId, title, summary, html } = params;

  if (title.length > REPORT_MAX_TITLE_CHARS) {
    throw new AppError(
      "VALIDATION_ERROR",
      `Title is ${formatEnglishCount(title.length)} characters; the limit is ${formatEnglishCount(REPORT_MAX_TITLE_CHARS)}. Shorten it and save again.`,
    );
  }
  if (summary.length > REPORT_MAX_SUMMARY_CHARS) {
    throw new AppError(
      "VALIDATION_ERROR",
      `Summary is ${formatEnglishCount(summary.length)} characters; the limit is ${formatEnglishCount(REPORT_MAX_SUMMARY_CHARS)}. Shorten it and save again.`,
    );
  }
  // UTF-8 bytes, not code units: a `.length` check understates multi-byte
  // content and is what actually reaches the column and the worker's heap.
  const sizeBytes = htmlBytes(html);
  if (sizeBytes > REPORT_MAX_HTML_BYTES) {
    throw new AppError(
      "VALIDATION_ERROR",
      `Report is ${kbUp(sizeBytes)}; the limit is ${kbDown(REPORT_MAX_HTML_BYTES)}. Inlined images are the usual cause. Remove them and save again.`,
    );
  }
  // The cheap structural check, not an HTML parser: models have stopped
  // mid-document with no error, and update-in-place would silently destroy the
  // previous good report.
  const trimmed = html.trim().toLowerCase();
  if (!trimmed.includes("<html") || !trimmed.endsWith("</html>")) {
    throw new AppError(
      "VALIDATION_ERROR",
      "The HTML has no closing </html>; the model stopped early. On Codex, escape backticks and ${.",
    );
  }

  /*
   * Defence in depth. The report is served under a CSP `sandbox` that blocks
   * all of this, so the header is the real control; refusing it at save time
   * means a one-line regression of the header cannot turn a stored report into
   * script running on the app's origin, and the agent is told why instead of
   * saving something that renders half-broken. Tag context only, so prose
   * that merely mentions a script is not refused.
   */
  const forbidden = findForbiddenMarkup(html);
  if (forbidden) {
    throw new AppError(
      "VALIDATION_ERROR",
      `The HTML contains ${forbidden}, which reports may not use (scripts, event handlers, frames, forms, base or refresh tags are blocked when a report renders). Remove it and save again.`,
    );
  }

  if (Boolean(params.nativeKind) !== Boolean(params.nativeIdentity)) {
    throw new AppError(
      "VALIDATION_ERROR",
      "Native kind and source identity must be supplied together.",
    );
  }
  const native =
    params.nativeKind && params.nativeIdentity
      ? await ReportRepository.findReportByNativeIdentity(
          projectId,
          params.nativeKind,
          params.nativeIdentity,
        )
      : null;
  const existing =
    native ??
    (params.reportId
      ? await ReportRepository.getReport(projectId, params.reportId)
      : null);
  if (
    existing?.nativeKind &&
    (existing.nativeKind !== params.nativeKind ||
      existing.nativeIdentity !== params.nativeIdentity)
  ) {
    throw new AppError(
      "VALIDATION_ERROR",
      "Native reports must be regenerated from their source screen; agents cannot replace their evidence.",
    );
  }
  if (
    params.nativeKind &&
    existing &&
    (!existing.nativeKind || existing.nativeIdentity !== params.nativeIdentity)
  ) {
    throw new AppError(
      "VALIDATION_ERROR",
      "Native source identity cannot replace another report.",
    );
  }
  if (params.reportId && !existing) {
    throw new AppError(
      "NOT_FOUND",
      `No report ${params.reportId} in this project. Call list_reports, or omit reportId to create a new one.`,
    );
  }

  // Titles are unique within a project, which the skills state as a contract
  // and which keeps the duplicate pointer below unambiguous. A rename has to
  // clear the same bar as a create.
  const clash = await ReportRepository.findReportByTitle(projectId, title);
  if (clash && clash.id !== existing?.id) {
    throw new AppError(
      "VALIDATION_ERROR",
      // A same-title save without a reportId is almost always an agent that
      // forgot to list first; point it at the id it should have reused.
      `A report titled '${clash.title}' exists (id ${clash.id}). Pass reportId to update it, or change the title.`,
    );
  }

  if (!existing) {
    // Plain read-then-write: concurrent saves can both pass at 99, so a project
    // may briefly hold a few more than the cap. That is accepted — this is a
    // storage guardrail, not an invariant, and the next save refuses.
    const total = await ReportRepository.countReports(projectId);
    if (total >= REPORT_MAX_PER_PROJECT) {
      throw new AppError(
        "VALIDATION_ERROR",
        `This project has ${formatEnglishCount(REPORT_MAX_PER_PROJECT)} reports, the limit. Delete one from the Reports page.`,
      );
    }
  }

  // The workspace-wide ceiling, checked on updates as well as creates: projects
  // are unlimited, so the per-project cap on its own bounds nothing, and an
  // update that grows a report is the other way to add bytes.
  const orgBytes = await ReportRepository.sumReportBytesForOrganization(
    params.organizationId,
  );
  if (
    orgBytes - (existing?.sizeBytes ?? 0) + sizeBytes >
    REPORT_MAX_BYTES_PER_ORG
  ) {
    throw new AppError(
      "VALIDATION_ERROR",
      `This workspace is storing ${mb(orgBytes)} of reports, the limit. Delete reports you no longer need from the Reports page.`,
    );
  }

  if (existing) {
    const updated = await guardTitle(title, () =>
      ReportRepository.updateReportContent({
        reportId: existing.id,
        projectId,
        title,
        summary,
        html,
        // An update that omits the slug keeps the stored one: `skill` is
        // optional on save_report, and clearing it would drop the report out of
        // the list's Type column for no reason the caller asked for.
        // `||`: an empty slug counts as omitted too.
        ...(params.nativeKind
          ? {
              nativeKind: params.nativeKind,
              nativeIdentity: params.nativeIdentity,
            }
          : {}),
        skill: params.skill || existing.skill,
        // Same rule for the template the report was written from.
        templateId: params.templateId ?? existing.templateId,
        sizeBytes,
      }),
    );
    if (!updated) throw notFound(existing.id);
    return {
      reportId: existing.id,
      title,
      created: false,
      htmlBytes: sizeBytes,
    };
  }

  const id = crypto.randomUUID();
  await guardTitle(title, () =>
    ReportRepository.insertReport({
      id,
      projectId,
      title,
      summary,
      html,
      ...(params.nativeKind
        ? {
            nativeKind: params.nativeKind,
            nativeIdentity: params.nativeIdentity,
          }
        : {}),
      skill: params.skill || null,
      templateId: params.templateId ?? null,
      createdBy: params.createdBy,
      createdByUserId: params.createdByUserId,
      sizeBytes,
    }),
  );
  return { reportId: id, title, created: true, htmlBytes: sizeBytes };
}

/** Metadata only, newest update first. `remaining` is the room left under the cap. */
async function listReports(params: {
  projectId: string;
  limit: number;
  offset: number;
}): Promise<{
  reports: ReportMetadata[];
  totalCount: number;
  remaining: number;
}> {
  const [rows, totalCount] = await Promise.all([
    ReportRepository.listReports(params),
    ReportRepository.countReports(params.projectId),
  ]);
  return {
    reports: rows,
    totalCount,
    remaining: Math.max(0, REPORT_MAX_PER_PROJECT - totalCount),
  };
}

export async function getReport(
  projectId: string,
  reportId: string,
): Promise<ReportMetadata> {
  const report = await ReportRepository.getReport(projectId, reportId);
  if (!report) throw notFound(reportId);
  return report;
}

/** The only reader of the `html` column, and it reads the metadata with it. */
async function getReportWithHtml(
  projectId: string,
  reportId: string,
): Promise<{ report: ReportMetadata; html: string }> {
  const row = await ReportRepository.getReportWithHtml(projectId, reportId);
  if (!row) throw notFound(reportId);
  const { html, ...report } = row;
  return { report, html };
}

export async function deleteReport(
  projectId: string,
  reportId: string,
): Promise<void> {
  const deleted = await ReportRepository.deleteReport(projectId, reportId);
  if (!deleted) throw notFound(reportId);
}

// The unique (project, title) index is the real guard; the read above only
// gives the friendly pointer. A concurrent save that slipped past it lands
// here, so it gets the same refusal rather than a raw database error.
async function guardTitle<T>(title: string, write: () => Promise<T>) {
  try {
    return await write();
  } catch (error) {
    const message = [error, error instanceof Error ? error.cause : null]
      .map((e) => (e instanceof Error ? e.message : ""))
      .join(" ");
    if (!message.includes("UNIQUE constraint failed")) throw error;
    throw new AppError(
      "VALIDATION_ERROR",
      `A report titled '${title}' exists. Call list_reports and pass its reportId to update it, or change the title.`,
    );
  }
}

// Shared by the reads and the delete, where `reportId` is a required argument —
// so no "omit reportId" hint here; that one belongs to save_report, which has
// its own message above.
function notFound(reportId: string) {
  return new AppError(
    "NOT_FOUND",
    `No report ${reportId} in this project. Call list_reports to see what exists.`,
  );
}

async function reportAvailability(projectId: string, reportId: string) {
  return {
    available: await ReportRepository.hasReportDocument(projectId, reportId),
  };
}

export const ReportService = {
  reportAvailability,
  saveReport,
  listReports,
  getReport,
  getReportWithHtml,
  deleteReport,
} as const;
