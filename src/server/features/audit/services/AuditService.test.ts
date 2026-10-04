import { beforeEach, describe, expect, it, vi } from "vitest";
import { AUDIT_LIMITS } from "@/server/features/audit/services/audit-capacity";

const mocks = vi.hoisted(() => ({
  createAudit: vi.fn(),
  getAuditForProject: vi.fn(),
  r2List: vi.fn(),
  r2Delete: vi.fn(),
  workflowGet: vi.fn(),
  deleteAuditForProject: vi.fn(),
  getAuditUsageForOrganization: vi.fn(),
  workflowCreate: vi.fn(),
}));

vi.mock("cloudflare:workers", () => ({
  env: {
    R2: { delete: mocks.r2Delete, list: mocks.r2List },
    AUDIT_ENGINE: { destroyScratchpad: vi.fn() },
    SITE_AUDIT_WORKFLOW: {
      create: mocks.workflowCreate,
      get: mocks.workflowGet,
    },
  },
}));
vi.mock("@/server/features/audit/repositories/AuditRepository", () => ({
  AuditRepository: {
    createAudit: mocks.createAudit,
    getAuditForProject: mocks.getAuditForProject,
    deleteAuditForProject: mocks.deleteAuditForProject,
    getAuditUsageForOrganization: mocks.getAuditUsageForOrganization,
  },
}));
vi.mock("@/server/features/lighthouse/pagespeed-config", () => ({
  getPageSpeedApiKey: vi.fn().mockResolvedValue("key"),
}));
vi.mock("@/server/lib/audit/url-policy", () => ({
  normalizeAndValidateStartUrl: vi.fn(async (url: string) => url),
  resolveStartUrlRedirects: vi.fn(async (url: string) => url),
}));
vi.mock("@/server/features/audit/services/auditReconciler", () => ({
  reconcileRunningAudit: vi.fn(),
  reconcileStaleAudits: vi.fn(),
}));

import { AuditService } from "./AuditService";

function start() {
  return AuditService.startAudit({
    actorUserId: "u",
    organizationId: "o",
    projectId: "p",
    startUrl: "https://example.com",
  });
}

beforeEach(() => {
  mocks.workflowGet.mockRejectedValue(new Error("gone"));
  mocks.workflowCreate.mockResolvedValue(undefined);
  mocks.getAuditUsageForOrganization.mockResolvedValue({
    runningCount: 1,
    capacityUnits: 0,
  });
});

// The usage read happens after this audit's own row is inserted, so the count
// already includes it: exactly the limit passes, one more refuses.
describe("AuditService.startAudit limits", () => {
  it("allows the maximum number of running audits and refuses one more", async () => {
    mocks.getAuditUsageForOrganization.mockResolvedValue({
      runningCount: AUDIT_LIMITS.maxRunningAudits,
      capacityUnits: 0,
    });
    await expect(start()).resolves.toHaveProperty("auditId");

    mocks.getAuditUsageForOrganization.mockResolvedValue({
      runningCount: AUDIT_LIMITS.maxRunningAudits + 1,
      capacityUnits: 0,
    });
    await expect(start()).rejects.toMatchObject({
      code: "AUDIT_ALREADY_RUNNING",
    });
    expect(mocks.deleteAuditForProject).toHaveBeenCalledTimes(1);
  });

  it("allows capacity exactly at the ceiling and refuses above it", async () => {
    mocks.getAuditUsageForOrganization.mockResolvedValue({
      runningCount: 1,
      capacityUnits: AUDIT_LIMITS.maxCapacityUnits,
    });
    await expect(start()).resolves.toHaveProperty("auditId");

    mocks.getAuditUsageForOrganization.mockResolvedValue({
      runningCount: 1,
      capacityUnits: AUDIT_LIMITS.maxCapacityUnits + 1,
    });
    await expect(start()).rejects.toMatchObject({
      code: "AUDIT_CAPACITY_REACHED",
    });
  });
});

describe("AuditService.remove", () => {
  beforeEach(() => {
    mocks.getAuditForProject.mockResolvedValue({
      id: "a1",
      status: "completed",
    });
    mocks.r2List
      .mockResolvedValueOnce({ objects: [{ key: "k1" }, { key: "k2" }] })
      .mockResolvedValue({ objects: [] });
  });

  it("sweeps the audit's R2 prefix until it is empty, then deletes the rows", async () => {
    await AuditService.remove("a1", "p");

    expect(mocks.r2List).toHaveBeenCalledWith(
      expect.objectContaining({ prefix: "site-audit/p/a1/" }),
    );
    expect(mocks.r2Delete).toHaveBeenCalledWith(["k1", "k2"]);
    expect(mocks.deleteAuditForProject).toHaveBeenCalledWith("a1", "p");
  });

  it("keeps the audit when its R2 payloads cannot be deleted", async () => {
    mocks.r2Delete.mockRejectedValue(new Error("r2 down"));
    vi.spyOn(console, "error").mockImplementation(() => undefined);

    await expect(AuditService.remove("a1", "p")).rejects.toMatchObject({
      code: "INTERNAL_ERROR",
    });
    expect(mocks.deleteAuditForProject).not.toHaveBeenCalled();
  });

  describe("a running audit", () => {
    beforeEach(() => {
      mocks.getAuditForProject.mockResolvedValue({
        id: "a1",
        status: "running",
        workflowInstanceId: "a1",
      });
      vi.spyOn(console, "error").mockImplementation(() => undefined);
    });

    it("is not deleted while the workflow state cannot be verified", async () => {
      mocks.workflowGet.mockRejectedValue(new Error("control plane timeout"));

      await expect(AuditService.remove("a1", "p")).rejects.toMatchObject({
        code: "CONFLICT",
      });
      expect(mocks.deleteAuditForProject).not.toHaveBeenCalled();
    });

    it("is not deleted when terminate fails and the status is unreadable or live", async () => {
      const instance = {
        terminate: vi.fn().mockRejectedValue(new Error("busy")),
        status: vi.fn().mockRejectedValue(new Error("boom")),
      };
      mocks.workflowGet.mockResolvedValue(instance);
      await expect(AuditService.remove("a1", "p")).rejects.toMatchObject({
        code: "CONFLICT",
      });

      instance.status.mockResolvedValue({ status: "running" });
      await expect(AuditService.remove("a1", "p")).rejects.toMatchObject({
        code: "CONFLICT",
      });
      expect(mocks.deleteAuditForProject).not.toHaveBeenCalled();
    });

    it("is deleted once the instance is confirmed gone or terminal", async () => {
      mocks.workflowGet.mockRejectedValueOnce(new Error("instance.not_found"));
      await AuditService.remove("a1", "p");

      mocks.workflowGet.mockResolvedValueOnce({
        terminate: vi.fn().mockRejectedValue(new Error("already done")),
        status: vi.fn().mockResolvedValue({ status: "complete" }),
      });
      await AuditService.remove("a1", "p");

      expect(mocks.deleteAuditForProject).toHaveBeenCalledTimes(2);
    });
  });
});
