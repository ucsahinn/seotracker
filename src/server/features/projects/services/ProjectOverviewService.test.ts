import { beforeEach, describe, expect, it, vi } from "vitest";
import { ProjectOverviewService } from "./ProjectOverviewService";
const reads = vi.hoisted(() => ({
  projects: vi.fn(),
  gsc: vi.fn(),
  ga4: vi.fn(),
  days: vi.fn(),
  audits: vi.fn(),
}));
vi.mock("./projects", () => ({ listProjects: reads.projects }));
vi.mock("@/server/features/gsc/repositories/GscConnectionRepository", () => ({
  GscConnectionRepository: { getByProjectId: reads.gsc },
}));
vi.mock("@/server/features/ga4/repositories/Ga4ConnectionRepository", () => ({
  Ga4ConnectionRepository: { getByProjectId: reads.ga4 },
}));
vi.mock("@/server/features/gsc/repositories/GscSiteDailyRepository", () => ({
  GscSiteDailyRepository: { getDays: reads.days },
}));
vi.mock("@/server/features/audit/repositories/AuditRepository", () => ({
  AuditRepository: { getAuditsByProject: reads.audits },
}));
const audit = (id: string, host: string, status: string) => ({
  id,
  startUrl: "https://" + host,
  status,
  startedAt: "2026-10-25T10:00:00Z",
  completedAt: status === "running" ? null : "2026-10-25T10:30:00Z",
});
beforeEach(() => {
  reads.projects.mockResolvedValue([{ id: "p1", domain: "example.com" }]);
  reads.gsc.mockResolvedValue({ siteUrl: "sc-domain:example.com" });
  reads.ga4.mockResolvedValue(null);
  reads.days.mockResolvedValue([{ date: "2026-10-24", clicks: 0 }]);
  reads.audits.mockResolvedValue([]);
});
describe("ProjectOverviewService", () => {
  it("retains good facts when an individual source fails", async () => {
    reads.ga4.mockRejectedValue(new Error("unavailable"));
    const [row] = await ProjectOverviewService.getOverview("org");
    expect(row).toMatchObject({
      analytics: null,
      searchConsole: true,
      archiveStatus: "available",
      clicks: { clicks: 0, observedDays: 1 },
    });
  });
  it("selects the own-host snapshot separately from the latest failed attempt", async () => {
    reads.audits.mockResolvedValue([
      audit("other", "other.com", "completed"),
      audit("failed", "www.example.com", "failed"),
      audit("own", "example.com/blog", "completed"),
    ]);
    const [row] = await ProjectOverviewService.getOverview("org");
    expect(row?.snapshot?.id).toBe("own");
    expect(row?.latestAttempt?.id).toBe("failed");
  });
  it("does not attribute any audit when no site is selected", async () => {
    reads.projects.mockResolvedValue([{ id: "p1", domain: null }]);
    reads.audits.mockResolvedValue([audit("own", "example.com", "completed")]);
    const [row] = await ProjectOverviewService.getOverview("org");
    expect(row?.snapshot).toBeNull();
    expect(row?.latestAttempt).toBeNull();
  });
  it("distinguishes failed archive and audit reads from known empty results", async () => {
    reads.days.mockRejectedValue(new Error("unavailable"));
    reads.audits.mockRejectedValue(new Error("unavailable"));
    expect((await ProjectOverviewService.getOverview("org"))[0]).toMatchObject({
      archiveStatus: "unavailable",
      auditStatus: "unavailable",
      clicks: null,
      snapshot: null,
    });
  });
});
