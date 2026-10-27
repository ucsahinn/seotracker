import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getAuditsByProject: vi.fn(),
  getProjectById: vi.fn(),
  loadSnapshot: vi.fn(),
}));

vi.mock("@/server/features/projects/repositories/ProjectRepository", () => ({
  ProjectRepository: { getProjectById: mocks.getProjectById },
}));

vi.mock("@/server/features/audit/repositories/AuditRepository", () => ({
  AuditRepository: { getAuditsByProject: mocks.getAuditsByProject },
}));

vi.mock("./panelAuditSnapshot", () => ({
  loadPanelAuditSnapshot: mocks.loadSnapshot,
}));
import { getAuditFreshness } from "./auditFreshness";

const NOW = new Date("2026-06-30T12:00:00.000Z");

/** Audits come back newest first, with SQLite's space-separated timestamps. */
function audit(
  id: string,
  startedAt: string,
  status = "completed",
  startUrl = "https://example.com/",
) {
  return { id, startedAt, status, startUrl };
}

beforeEach(() => {
  mocks.loadSnapshot.mockResolvedValue({
    completed: true,
    startUrl: "https://example.com/",
    config: { maxPages: 100, lighthouseStrategy: "none" },
    pages: [],
    measuredChecks: [],
    counts: [],
  });
  mocks.getProjectById.mockResolvedValue({ domain: "example.com" });
  mocks.getAuditsByProject.mockResolvedValue([]);
});

describe("getAuditFreshness", () => {
  it("says nothing when the project has never been audited", async () => {
    const result = await getAuditFreshness({ projectId: "p1", now: NOW });

    expect(result.hasAudit).toBe(false);
    expect(result.isStale).toBe(false);
  });

  it("calls an audit stale after a week", async () => {
    mocks.getAuditsByProject.mockResolvedValue([
      audit("a1", "2026-06-20 09:00:00"),
    ]);

    const result = await getAuditFreshness({ projectId: "p1", now: NOW });

    expect(result.daysSince).toBe(10);
    expect(result.isStale).toBe(true);
  });

  it("leaves a recent audit alone", async () => {
    mocks.getAuditsByProject.mockResolvedValue([
      audit("a1", "2026-06-28 09:00:00"),
    ]);

    const result = await getAuditFreshness({ projectId: "p1", now: NOW });

    expect(result.isStale).toBe(false);
  });

  // A running or failed audit is not something to compare against.
  it("ignores audits that never completed", async () => {
    mocks.getAuditsByProject.mockResolvedValue([
      audit("a2", "2026-06-29 09:00:00", "running"),
      audit("a1", "2026-06-01 09:00:00"),
    ]);

    const result = await getAuditFreshness({ projectId: "p1", now: NOW });

    expect(result.lastCompletedAt).toBe("2026-06-01 09:00:00");
    expect(result.isStale).toBe(true);
  });

  it("withholds resolution claims when per-URL measured scope is unknown (counts alone previously claimed fixes)", async () => {
    mocks.getAuditsByProject.mockResolvedValue([
      audit("a2", "2026-06-29 09:00:00"),
      audit("a1", "2026-06-22 09:00:00"),
    ]);
    const result = await getAuditFreshness({ projectId: "p1", now: NOW });
    expect(result.comparisonUnavailable).toBe(true);
    expect(result.resolvedIssues).toEqual([]);
  });

  it("has nothing to compare when only one audit ever completed", async () => {
    mocks.getAuditsByProject.mockResolvedValue([
      audit("a1", "2026-06-29 09:00:00"),
    ]);

    const result = await getAuditFreshness({ projectId: "p1", now: NOW });

    expect(result.newIssues).toEqual([]);
    expect(mocks.loadSnapshot).not.toHaveBeenCalled();
  });

  it("selects the project host even when a foreign completed audit is newest", async () => {
    mocks.getAuditsByProject.mockResolvedValue([
      audit("foreign", "2026-06-29 10:00:00", "completed", "https://npr.org"),
      audit("own", "2026-06-20 10:00:00"),
    ]);
    const result = await getAuditFreshness({ projectId: "p1", now: NOW });
    expect(result.auditId).toBe("own");
  });
});

it("returns measured changes for identical own-site scopes instead of suppressing every comparison", async () => {
  mocks.getAuditsByProject.mockResolvedValue([
    audit("new", "2026-06-29 10:00:00"),
    audit("old", "2026-06-20 10:00:00"),
  ]);
  const common = {
    completed: true,
    startUrl: "https://example.com/",
    config: { maxPages: 100, lighthouseStrategy: "none" },
    pages: [{ url: "https://example.com/", fetchClass: "ok" }],
    measuredChecks: ["missing-title"],
  };
  mocks.loadSnapshot
    .mockResolvedValueOnce({ ...common, counts: [] })
    .mockResolvedValueOnce({
      ...common,
      counts: [{ issueType: "missing-title", severity: "critical", pages: 1 }],
    });
  const result = await getAuditFreshness({ projectId: "p1", now: NOW });
  expect(result.comparisonUnavailable).toBe(false);
  expect(result.previousAuditId).toBe("old");
  expect(result.resolvedIssues).toEqual([
    {
      issueType: "missing-title",
      severity: "critical",
      count: 0,
      previousCount: 1,
    },
  ]);
});
