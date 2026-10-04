import { beforeEach, describe, expect, it, vi } from "vitest";
import { makeToolContext, textContent } from "./tool-test-support";
import * as searchConsoleTools from "./search-console-tools";

const mocks = vi.hoisted(() => ({
  hasSelfHostedGoogleOAuthConfig: vi.fn(),
  hasServiceAccount: vi.fn(),
  getProject: vi.fn(),
  getPerformance: vi.fn(),
}));

vi.mock("cloudflare:workers", () => ({ env: {} }));
vi.mock("@/server/features/google/oauth-config", () => ({
  hasSelfHostedGoogleOAuthConfig: mocks.hasSelfHostedGoogleOAuthConfig,
}));
vi.mock("@/server/lib/googleServiceAccountToken", () => ({
  hasServiceAccount: mocks.hasServiceAccount,
}));
vi.mock("@/server/features/projects/services/ProjectService", () => ({
  ProjectService: {
    getProjectForOrganization: mocks.getProject,
  },
}));
vi.mock("@/server/features/gsc/services/GscService", () => ({
  GscService: { getPerformance: mocks.getPerformance },
}));
vi.mock("@/server/features/gsc/services/GscIndexCoverageService", () => ({
  inspectAndRecord: vi.fn(),
}));

const toolContext = makeToolContext();

describe("search console tool guards", () => {
  beforeEach(() => {
    mocks.hasSelfHostedGoogleOAuthConfig.mockResolvedValue(true);
    mocks.hasServiceAccount.mockResolvedValue(false);
    mocks.getProject.mockResolvedValue({ id: "project_1" });
  });

  // A service account is a complete credential; telling its owner to enter an
  // OAuth client would block a working install.
  it("does not demand an OAuth client when a service account is stored", async () => {
    mocks.hasSelfHostedGoogleOAuthConfig.mockResolvedValue(false);
    mocks.hasServiceAccount.mockResolvedValue(true);
    mocks.getPerformance.mockResolvedValue({
      siteUrl: "https://example.com/",
      connectedBy: "sa@example.com",
      request: { startDate: "2026-04-27", endDate: "2026-05-25" },
      rows: [],
    });
    const { getSearchConsolePerformanceTool } = searchConsoleTools;

    const result = await getSearchConsolePerformanceTool.handler(
      { projectId: "project_1" },
      toolContext,
    );

    expect(result.structuredContent).toMatchObject({ ok: true });
  });

  // `setUTCMonth(-16)` alone turns 31 March into 1 December, which would
  // reject a date Search Console still holds.
  it("keeps the 16-month floor on the last day of a shorter month", async () => {
    vi.useFakeTimers({
      toFake: ["Date"],
      now: new Date("2026-03-31T12:00:00Z"),
    });
    mocks.getPerformance.mockResolvedValue({
      siteUrl: "https://example.com/",
      connectedBy: "alice@example.com",
      request: { startDate: "2024-11-30", endDate: "2024-11-30" },
      rows: [],
    });
    const { getSearchConsolePerformanceTool } = searchConsoleTools;

    try {
      const result = await getSearchConsolePerformanceTool.handler(
        {
          projectId: "project_1",
          startDate: "2024-11-30",
          endDate: "2024-11-30",
        },
        toolContext,
      );
      expect(result.structuredContent).toMatchObject({ ok: true });
    } finally {
      vi.useRealTimers();
    }
  });

  it("does not leak the message of an unexpected error", async () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    mocks.getPerformance.mockRejectedValue(
      new Error("SQLITE_ERROR: bad params ['secret-value']"),
    );
    const { getSearchConsolePerformanceTool } = searchConsoleTools;

    const result = await getSearchConsolePerformanceTool.handler(
      { projectId: "project_1" },
      toolContext,
    );

    expect(textContent(result)).not.toContain("secret-value");
  });
});
