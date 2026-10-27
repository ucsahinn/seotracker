import { expect, it, vi } from "vitest";
import { createGa4DataClient } from "./ga4Client";
import { buildGa4OverviewRequest } from "@/server/features/ga4/services/Ga4ReportDefinitions";
const mocks = vi.hoisted(() => ({
  generation: 0,
  getAccessToken: vi.fn(),
  hasServiceAccount: vi.fn(),
  fetch: vi.fn<typeof fetch>(),
}));
vi.mock("@/lib/auth", () => ({
  getGoogleGrantAuth: async () => ({
    api: { getAccessToken: mocks.getAccessToken },
  }),
}));
vi.mock("@/server/lib/googleServiceAccountToken", () => ({
  hasServiceAccount: mocks.hasServiceAccount,
  getServiceAccountToken: vi.fn(),
}));
vi.mock("@/server/features/google/GoogleAccessService", () => ({
  googleAccessScope: async (scope: object) => ({
    ...scope,
    generation: mocks.generation,
  }),
  observeGoogleAccess: async (_scope: object, read: () => Promise<unknown>) =>
    read(),
}));
const reportRequest = buildGa4OverviewRequest({
  startDate: "2026-01-01",
  endDate: "2026-01-01",
});

// Previously a client could reuse its old token after the stored credential changed.
it("reacquires its token when the captured credential generation changes", async () => {
  mocks.getAccessToken.mockResolvedValue({ accessToken: "dummy" });
  mocks.hasServiceAccount.mockResolvedValue(false);
  mocks.fetch.mockImplementation(async () => Response.json({}));
  vi.stubGlobal("fetch", mocks.fetch);
  const client = createGa4DataClient({
    userId: "u",
    ga4AccountId: "a",
    propertyId: "properties/1",
  });
  try {
    mocks.generation = 1;
    const first = await client.runReport(reportRequest);
    mocks.generation = 2;
    const second = await client.runReport(reportRequest);
    expect(first.credentialGeneration).toBe(1);
    expect(second.credentialGeneration).toBe(2);
    expect(mocks.getAccessToken).toHaveBeenCalledTimes(2);
  } finally {
    vi.unstubAllGlobals();
  }
});
// Before the fix the Zod boundary stripped all truncation reasons.
it("preserves the current Google ResponseMetaData truncation contract", async () => {
  mocks.getAccessToken.mockResolvedValue({ accessToken: "dummy" });
  mocks.hasServiceAccount.mockResolvedValue(false);
  vi.stubGlobal("fetch", mocks.fetch);
  const reason = {
    dataTruncationType: "DATA_TRUNCATION_TYPE_DATE_RANGE",
    dataTruncationDate: "2026-01-01",
    dataTruncationMessage: "Date boundary",
    dataTruncationDateRanges: [
      { startDate: "2025-01-01", endDate: "2025-12-31" },
    ],
  };
  mocks.fetch.mockResolvedValueOnce(
    Response.json({ metadata: { dataTruncationReasons: [reason] } }),
  );
  try {
    const result = await createGa4DataClient({
      userId: "u",
      ga4AccountId: "a",
      propertyId: "properties/1",
    }).runReport(reportRequest);
    expect(result.metadata?.dataTruncationReasons).toEqual([reason]);
  } finally {
    vi.unstubAllGlobals();
  }
});
