import { expect, it, vi } from "vitest";
import { GoogleAccessRepository } from "./GoogleAccessRepository";
const testDb = await vi.hoisted(async () =>
  (await import("@/server/test-support/sqlite-test-db")).createTestDb(),
);
vi.mock("@/db", () => ({ db: testDb.db }));

// Before the fix an old request could restore healthy evidence after key rotation.
it("isolates late evidence by credential generation, property and account", async () => {
  const scope = {
    provider: "ga4" as const,
    propertyId: "properties/1",
    userId: "u",
    accountId: "a",
  };
  const generation = await GoogleAccessRepository.generation();
  await GoogleAccessRepository.record({ ...scope, generation }, null);
  expect(
    await GoogleAccessRepository.read({ ...scope, generation }),
  ).toMatchObject({ reason: null });
  await GoogleAccessRepository.record({ ...scope, generation }, "timeout");
  expect(
    await GoogleAccessRepository.read({ ...scope, generation }),
  ).toMatchObject({ reason: "timeout" });
  expect(
    (await GoogleAccessRepository.read({ ...scope, generation }))
      ?.lastSuccessAt,
  ).toBeTruthy();
  expect(
    await GoogleAccessRepository.read({ ...scope, generation, accountId: "b" }),
  ).toBeNull();
  expect(
    await GoogleAccessRepository.read({
      ...scope,
      generation,
      propertyId: "properties/2",
    }),
  ).toBeNull();
  testDb.database.exec(
    "INSERT INTO google_service_account (id, client_email, private_key_encrypted) VALUES ('default', 'a@example.test', 'dummy')",
  );
  const next = await GoogleAccessRepository.generation();
  expect(next).not.toBe(generation);
  await GoogleAccessRepository.record({ ...scope, generation }, null);
  expect(
    await GoogleAccessRepository.read({ ...scope, generation: next }),
  ).toBeNull();
});
