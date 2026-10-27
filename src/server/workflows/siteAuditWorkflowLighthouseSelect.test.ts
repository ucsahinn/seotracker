import type { WorkflowStep } from "cloudflare:workers";
import { beforeEach, describe, expect, it, vi } from "vitest";

const {
  getPageSpeedApiKeyMock,
  selectMock,
  progressMock,
  noticeMock,
  stepDoMock,
} = vi.hoisted(() => ({
  stepDoMock: vi.fn(),
  getPageSpeedApiKeyMock: vi.fn(),
  selectMock: vi.fn(),
  progressMock: vi.fn(),
  noticeMock: vi.fn(),
}));

vi.mock("cloudflare:workers", () => ({ env: {} }));
vi.mock("@/server/features/lighthouse/pagespeed-config", () => ({
  getPageSpeedApiKey: getPageSpeedApiKeyMock,
}));
vi.mock("@/server/lib/audit/lighthouse", () => ({
  selectLighthousePages: selectMock,
}));
vi.mock("@/server/features/audit/repositories/AuditRepository", () => ({
  AuditRepository: {
    getPagesForAudit: async () => [{ id: "p1", url: "https://example.com/" }],
    updateAuditProgress: progressMock,
    recordAuditNotice: noticeMock,
  },
}));

import { UNKEYED_LIGHTHOUSE_PAGE_CAP } from "@/shared/audit-limits";
import { selectLighthouseWork } from "./siteAuditWorkflowLighthouseSelect";

const step: WorkflowStep = {
  do: stepDoMock,
  sleep: vi.fn(),
  sleepUntil: vi.fn(),
  waitForEvent: vi.fn(),
};

const run = () =>
  selectLighthouseWork({
    step,
    auditId: "audit-1",
    workflowInstanceId: "wf-1",
    startUrl: "https://example.com/",
    strategy: "auto",
  });

describe("selectLighthouseWork with a saved PageSpeed key the worker cannot open", () => {
  beforeEach(() => {
    selectMock.mockReturnValue(["https://example.com/"]);
    stepDoMock.mockImplementation(
      async (_n: string, _c: unknown, callback: () => Promise<unknown>) =>
        callback(),
    );
  });

  it("runs unkeyed and records a notice instead of failing the audit", async () => {
    getPageSpeedApiKeyMock.mockRejectedValue(
      new Error(
        "MissingInstanceKeyError: No instance encryption key. In Docker the container generates one at startup; outside it, set BETTER_AUTH_SECRET.",
      ),
    );

    await run();

    expect(selectMock.mock.calls[0]?.[3]).toBe(UNKEYED_LIGHTHOUSE_PAGE_CAP);
    expect(noticeMock).toHaveBeenCalledWith(
      "audit-1",
      "wf-1",
      expect.objectContaining({ noticeCode: "missing_secret" }),
    );
  });

  it("marks the speed phase before reading the key and rethrows other errors", async () => {
    getPageSpeedApiKeyMock.mockRejectedValue(new Error("D1_ERROR: busy"));

    await expect(run()).rejects.toThrow("D1_ERROR");

    expect(progressMock).toHaveBeenCalledWith("audit-1", "wf-1", {
      currentPhase: "lighthouse",
    });
    expect(noticeMock).not.toHaveBeenCalled();
  });
});
