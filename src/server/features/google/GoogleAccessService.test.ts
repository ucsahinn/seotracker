import { beforeEach, expect, it, vi } from "vitest";
import { googleAccessScope, observeGoogleAccess } from "./GoogleAccessService";
import { Ga4DataApiError } from "@/server/lib/ga4Errors";
const mocks = vi.hoisted(() => ({
  generation: vi.fn(),
  record: vi.fn(),
  hasServiceAccount: vi.fn(),
}));
vi.mock("./GoogleAccessRepository", () => ({ GoogleAccessRepository: mocks }));
vi.mock("@/server/lib/googleServiceAccountToken", () => ({
  hasServiceAccount: mocks.hasServiceAccount,
}));
beforeEach(() => {
  mocks.generation.mockResolvedValue(4);
  mocks.record.mockResolvedValue(undefined);
  mocks.hasServiceAccount.mockResolvedValue(true);
});
// Previously the saved OAuth account could be mistaken for the effective service identity.
it("records provider outcomes under the identity and generation captured before the read", async () => {
  const scope = await googleAccessScope({
    provider: "ga4",
    propertyId: "properties/1",
    userId: "u",
    accountId: "oauth-a",
  });
  expect(scope).toMatchObject({ generation: 4, accountId: "service-account" });
  mocks.generation.mockResolvedValue(5);
  const failure = new Ga4DataApiError(
    403,
    "private upstream text",
    null,
    "SERVICE_DISABLED",
  );
  await expect(
    observeGoogleAccess(scope, async () => {
      throw failure;
    }),
  ).rejects.toBe(failure);
  expect(mocks.record).toHaveBeenCalledWith(
    scope,
    "api_disabled",
    expect.any(String),
  );
});
