import { beforeEach, describe, expect, it, vi } from "vitest";
import { AUDIT_LIMITS } from "@/server/features/audit/services/audit-capacity";

const mocks = vi.hoisted(() => ({
  createAudit: vi.fn(),
  getAuditForProject: vi.fn(),
  getR2KeysForAudit: vi.fn(),
  r2Delete: vi.fn(),
  deleteAuditForProject: vi.fn(),
  getAuditUsageForOrganization: vi.fn(),
  workflowCreate: vi.fn(),
}));

vi.mock("cloudflare:workers", () => ({
  env: {
    R2: { delete: mocks.r2Delete },
    AUDIT_ENGINE: { destroyScratchpad: vi.fn() },
    SITE_AUDIT_WORKFLOW: {
      create: mocks.workflowCreate,
      get: vi.fn().mockRejectedValue(new Error("gone")),
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
vi.mock(
  "@/server/features/audit/repositories/AuditLighthouseRepository",
  () => ({
    AuditLighthouseRepository: { getR2KeysForAudit: mocks.getR2KeysForAudit },
  }),
);
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
    mocks.getR2KeysForAudit.mockResolvedValue(["k1", "k2"]);
  });

  it("deletes the audit's Lighthouse payloads from R2 with its rows", async () => {
    await AuditService.remove("a1", "p");

    expect(mocks.deleteAuditForProject).toHaveBeenCalledWith("a1", "p");
    expect(mocks.r2Delete).toHaveBeenCalledWith(["k1", "k2"]);
  });

  it("still deletes the audit when R2 cannot be reached", async () => {
    mocks.r2Delete.mockRejectedValue(new Error("r2 down"));
    vi.spyOn(console, "warn").mockImplementation(() => undefined);

    await expect(AuditService.remove("a1", "p")).resolves.toBeUndefined();
    expect(mocks.deleteAuditForProject).toHaveBeenCalledTimes(1);
  });
});
