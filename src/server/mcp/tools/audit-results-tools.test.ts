import { beforeEach, describe, expect, it, vi } from "vitest";
import { getAuditIssuesTool } from "./audit-issues-tool";
import { getIndexCoverageTool } from "./index-coverage-tool";
import { makeToolContext, textContent } from "./tool-test-support";

const mocks = vi.hoisted(() => ({
  getProjectForOrganization: vi.fn(),
  getLatestAuditForProject: vi.fn(),
  getIssuesForAudit: vi.fn(),
  getIndexCoverage: vi.fn(),
}));

vi.mock("@/server/features/projects/services/ProjectService", () => ({
  ProjectService: {
    getProjectForOrganization: mocks.getProjectForOrganization,
  },
}));
vi.mock("@/server/auth/repositories/AuthRepository", () => ({
  AuthRepository: { getMembership: vi.fn() },
}));
vi.mock("@/server/features/audit/repositories/AuditRepository", () => ({
  AuditRepository: {
    getLatestAuditForProject: mocks.getLatestAuditForProject,
    getIssuesForAudit: mocks.getIssuesForAudit,
  },
}));
vi.mock("@/server/features/gsc/services/GscIndexCoverageService", () => ({
  getIndexCoverage: mocks.getIndexCoverage,
}));

const toolContext = makeToolContext();
const args = { projectId: "project_1" };

function latestIs(status: "running" | "completed") {
  mocks.getLatestAuditForProject.mockResolvedValue({
    id: "audit_1",
    startUrl: "https://example.com/",
    status,
    pagesCrawled: 42,
  });
}

beforeEach(() => {
  mocks.getProjectForOrganization.mockResolvedValue({ id: "project_1" });
  mocks.getIssuesForAudit.mockResolvedValue([]);
  mocks.getIndexCoverage.mockResolvedValue({
    checked: 0,
    indexed: 0,
    notIndexed: 0,
    pending: 0,
    asked: 0,
    due: 0,
    rows: [],
  });
});

describe.each([
  ["get_audit_issues", getAuditIssuesTool],
  ["get_index_coverage", getIndexCoverageTool],
])("%s on an unfinished audit", (_name, tool) => {
  it("says the results are incomplete and reports the audit status", async () => {
    latestIs("running");

    const result = await tool.handler(args, toolContext);

    expect(textContent(result)).toContain("still running, results incomplete");
    expect(result.structuredContent).toMatchObject({
      auditStatus: "running",
      pagesCrawled: 42,
    });
  });

  it("adds no warning once the audit has completed", async () => {
    latestIs("completed");

    const result = await tool.handler(args, toolContext);

    expect(textContent(result)).not.toContain("incomplete");
    expect(result.structuredContent).toMatchObject({
      auditStatus: "completed",
    });
  });
});
