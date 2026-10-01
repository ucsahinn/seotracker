import { beforeEach, describe, expect, it, vi } from "vitest";
import { AUDIT_LIMITS } from "@/server/features/audit/services/audit-capacity";

const mocks = vi.hoisted(() => ({
  createAudit: vi.fn(),
  deleteAuditForProject: vi.fn(),
  getAuditUsageForOrganization: vi.fn(),
  workflowCreate: vi.fn(),
}));

vi.mock("cloudflare:workers", () => ({
  env: {
    SITE_AUDIT_WORKFLOW: {
      create: mocks.workflowCreate,
      get: vi.fn().mockRejectedValue(new Error("gone")),
    },
  },
}));
vi.mock("@/server/features/audit/repositories/AuditRepository", () => ({
  AuditRepository: {
    createAudit: mocks.createAudit,
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
