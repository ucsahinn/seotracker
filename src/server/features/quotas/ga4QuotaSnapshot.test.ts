import { expect, it } from "vitest";
import { recordGa4Quota, readGa4Quota } from "./ga4QuotaSnapshot";
// Previously an old credential's late quota response matched the current owner.
it("does not revive a previous credential's quota snapshot after rotation", () => {
  const owner = {
    projectId: "generation-test",
    propertyId: "properties/1",
    ga4AccountId: "a",
    connectedByUserId: "u",
    credentialGeneration: 1,
  };
  recordGa4Quota(owner, { tokensPerDay: { consumed: 1, remaining: 999 } });
  expect(readGa4Quota({ ...owner, credentialGeneration: 2 })).toBeNull();
  recordGa4Quota(owner, { tokensPerDay: { consumed: 1, remaining: 998 } });
  expect(readGa4Quota({ ...owner, credentialGeneration: 2 })).toBeNull();
});
