import { beforeEach, describe, expect, it, vi } from "vitest";
import { formatEnglishCount } from "@/shared/format";
import {
  REPORT_MAX_BYTES_PER_ORG,
  REPORT_MAX_PER_PROJECT,
} from "@/types/schemas/reports";
import { deleteReport, getReport, saveReport } from "./ReportService";

const mocks = vi.hoisted(() => ({
  listReports: vi.fn(),
  getReport: vi.fn(),
  findReportByTitle: vi.fn(),
  countReports: vi.fn(),
  sumReportBytesForOrganization: vi.fn(),
  insertReport: vi.fn(),
  updateReportContent: vi.fn(),
  deleteReport: vi.fn(),
}));

vi.mock("@/server/features/reports/repositories/ReportRepository", () => ({
  ReportRepository: mocks,
}));
vi.mock("@/server/lib/observability", () => ({ captureServerEvent: vi.fn() }));

const html = "<!doctype html><html><body>Hi</body></html>";

const save = (overrides: Partial<Parameters<typeof saveReport>[0]> = {}) =>
  saveReport({
    projectId: "project_1",
    organizationId: "org_1",
    title: "badseo.dev SEO audit, Sep 2026",
    summary: "One clear verdict.",
    html,
    createdBy: "Claude Code",
    createdByUserId: "user_1",
    ...overrides,
  });

const storedReport = {
  id: "report_1",
  projectId: "project_1",
  title: "badseo.dev SEO audit, Sep 2026",
  summary: "One clear verdict.",
  skill: "seo-audit",
  createdBy: "Codex",
  createdByUserId: "user_original",
  sizeBytes: 42,
  shareToken: null,
  sharedAt: null,
  createdAt: "2026-09-01T10:00:00.000Z",
  updatedAt: "2026-09-01T10:00:00.000Z",
};

describe("saveReport", () => {
  beforeEach(() => {
    mocks.findReportByTitle.mockResolvedValue(null);
    mocks.countReports.mockResolvedValue(0);
    mocks.sumReportBytesForOrganization.mockResolvedValue(0);
    mocks.getReport.mockResolvedValue(storedReport);
  });

  it("updates in place, keeping the stored skill and attribution", async () => {
    const result = await save({ reportId: "report_1", title: "New title" });

    expect(result).toEqual({
      reportId: "report_1",
      title: "New title",
      created: false,
      htmlBytes: html.length,
    });
    expect(mocks.insertReport).not.toHaveBeenCalled();
    // Exact payload: the attribution columns are absent, so an overwrite keeps
    // the original saver, and an omitted `skill` keeps the stored slug rather
    // than clearing it.
    expect(mocks.updateReportContent).toHaveBeenCalledWith({
      reportId: "report_1",
      projectId: "project_1",
      title: "New title",
      summary: "One clear verdict.",
      html,
      skill: "seo-audit",
      sizeBytes: html.length,
    });
  });

  it("refuses an unknown reportId", async () => {
    mocks.getReport.mockResolvedValue(null);

    await expect(save({ reportId: "report_gone" })).rejects.toThrow(
      "No report report_gone in this project. Call list_reports, or omit reportId to create a new one.",
    );
    expect(mocks.updateReportContent).not.toHaveBeenCalled();
  });

  it("refuses an over-long title and writes nothing", async () => {
    await expect(save({ title: "T".repeat(143) })).rejects.toThrow(
      "Title is 143 characters; the limit is 120. Shorten it and save again.",
    );
    expect(mocks.insertReport).not.toHaveBeenCalled();
  });

  it("refuses an over-long summary", async () => {
    await expect(save({ summary: "s".repeat(2720) })).rejects.toThrow(
      "Summary is 2,720 characters; the limit is 2,500. Shorten it and save again.",
    );
  });

  it("measures the byte cap in UTF-8, not code units", async () => {
    // 320,000 two-byte characters: under the cap by String.length, over it by
    // the bytes that actually reach the column.
    await expect(save({ html: "é".repeat(320_000) })).rejects.toThrow(
      "Report is 640 KB; the limit is 500 KB. Inlined images are the usual cause. Remove them and save again.",
    );
    expect(mocks.insertReport).not.toHaveBeenCalled();
  });

  it("refuses a document that stopped mid-write", async () => {
    await expect(save({ html: "<html><body>half a repo" })).rejects.toThrow(
      "The HTML has no closing </html>; the model stopped early. On Codex, escape backticks and ${.",
    );
  });

  it("refuses a rename onto another report's title", async () => {
    mocks.findReportByTitle.mockResolvedValue({
      id: "report_2",
      title: "Taken",
    });

    await expect(
      save({ reportId: "report_1", title: "Taken" }),
    ).rejects.toThrow(
      "A report titled 'Taken' exists (id report_2). Pass reportId to update it, or change the title.",
    );
    expect(mocks.updateReportContent).not.toHaveBeenCalled();
  });

  it("refuses a create at the per-project cap", async () => {
    mocks.countReports.mockResolvedValue(REPORT_MAX_PER_PROJECT);

    await expect(save()).rejects.toThrow(
      `This project has ${formatEnglishCount(REPORT_MAX_PER_PROJECT)} reports, the limit. Delete one from the Reports page.`,
    );
    expect(mocks.insertReport).not.toHaveBeenCalled();
  });

  it("applies the cap to creates only, not updates", async () => {
    mocks.countReports.mockResolvedValue(REPORT_MAX_PER_PROJECT);

    await expect(save({ reportId: "report_1" })).resolves.toMatchObject({
      created: false,
    });
  });

  // The per-project cap bounds nothing on its own: projects are unlimited, and
  // save_report is free, so this is the guardrail on total storage.
  it("refuses a save that would push the organization over its byte ceiling", async () => {
    mocks.sumReportBytesForOrganization.mockResolvedValue(
      REPORT_MAX_BYTES_PER_ORG,
    );

    await expect(save()).rejects.toThrow(
      `This organization is storing ${formatEnglishCount(REPORT_MAX_BYTES_PER_ORG / 1_000_000)} MB of reports, the limit. Delete reports you no longer need from the Reports page.`,
    );
    expect(mocks.insertReport).not.toHaveBeenCalled();
  });

  it("counts an update against the ceiling net of the bytes it replaces", async () => {
    // At the ceiling, but the row being replaced is bigger than the new one.
    mocks.sumReportBytesForOrganization.mockResolvedValue(
      REPORT_MAX_BYTES_PER_ORG,
    );
    mocks.getReport.mockResolvedValue({ ...storedReport, sizeBytes: 1_000 });

    await expect(save({ reportId: "report_1" })).resolves.toMatchObject({
      created: false,
    });
  });
});

describe("reads and deletes", () => {
  it("scopes a read to the project and refuses an unknown id", async () => {
    mocks.getReport.mockResolvedValue(null);

    await expect(getReport("project_1", "report_gone")).rejects.toThrow(
      "No report report_gone in this project. Call list_reports to see what exists.",
    );
    expect(mocks.getReport).toHaveBeenCalledWith("project_1", "report_gone");
  });

  it("refuses a delete whose id is not in this project", async () => {
    mocks.deleteReport.mockResolvedValue(false);

    await expect(deleteReport("project_1", "report_gone")).rejects.toThrow(
      "No report report_gone in this project.",
    );
    expect(mocks.deleteReport).toHaveBeenCalledWith("project_1", "report_gone");
  });
});
