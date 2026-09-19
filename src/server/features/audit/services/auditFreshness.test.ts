import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getAuditsByProject: vi.fn(),
  getIssueTypePageCountsForAudit: vi.fn(),
}));

vi.mock("@/server/features/audit/repositories/AuditRepository", () => ({
  AuditRepository: { getAuditsByProject: mocks.getAuditsByProject },
}));
vi.mock("@/server/features/audit/repositories/auditSummaryQueries", () => ({
  getIssueTypePageCountsForAudit: mocks.getIssueTypePageCountsForAudit,
}));

import { getAuditFreshness } from "./auditFreshness";

const NOW = new Date("2026-06-30T12:00:00.000Z");

/** Audits come back newest first, with SQLite's space-separated timestamps. */
function audit(id: string, startedAt: string, status = "completed") {
  return { id, startedAt, status };
}

beforeEach(() => {
  mocks.getAuditsByProject.mockResolvedValue([]);
  mocks.getIssueTypePageCountsForAudit.mockResolvedValue([]);
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

  it("reports which issues appeared and which cleared up", async () => {
    mocks.getAuditsByProject.mockResolvedValue([
      audit("a2", "2026-06-29 09:00:00"),
      audit("a1", "2026-06-22 09:00:00"),
    ]);
    mocks.getIssueTypePageCountsForAudit
      .mockResolvedValueOnce([
        { issueType: "broken-internal-link", severity: "critical", pages: 4 },
        {
          issueType: "missing-meta-description",
          severity: "warning",
          pages: 2,
        },
      ])
      .mockResolvedValueOnce([
        {
          issueType: "missing-meta-description",
          severity: "warning",
          pages: 5,
        },
        { issueType: "thin-content", severity: "warning", pages: 3 },
      ]);

    const result = await getAuditFreshness({ projectId: "p1", now: NOW });

    // Appeared since last time, and sorted with the critical one first.
    expect(result.newIssues[0]).toMatchObject({
      issueType: "broken-internal-link",
      count: 4,
      previousCount: null,
    });
    // Gone entirely, plus one that now affects fewer pages.
    expect(result.resolvedIssues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ issueType: "thin-content", count: 0 }),
        expect.objectContaining({
          issueType: "missing-meta-description",
          previousCount: 5,
          count: 2,
        }),
      ]),
    );
  });

  it("has nothing to compare when only one audit ever completed", async () => {
    mocks.getAuditsByProject.mockResolvedValue([
      audit("a1", "2026-06-29 09:00:00"),
    ]);

    const result = await getAuditFreshness({ projectId: "p1", now: NOW });

    expect(result.newIssues).toEqual([]);
    expect(mocks.getIssueTypePageCountsForAudit).not.toHaveBeenCalled();
  });
});
