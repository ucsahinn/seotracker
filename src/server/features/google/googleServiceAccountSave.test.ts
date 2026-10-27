import { beforeAll, expect, it, vi } from "vitest";
import { saveGoogleServiceAccount } from "@/serverFunctions/googleServiceAccount";
import { GoogleServiceAccountRepository } from "./GoogleServiceAccountRepository";
import { GoogleAccessRepository } from "./GoogleAccessRepository";

const testDb = await vi.hoisted(async () =>
  (await import("@/server/test-support/sqlite-test-db")).createTestDb(),
);
const clearTokenCache = vi.hoisted(() => vi.fn());
vi.mock("@/db", () => ({ db: testDb.db }));
vi.mock("@/server/lib/secretBox", () => ({
  sealSecret: async (value: string) => value,
  openSecret: async (value: string) => value,
}));
vi.mock("@/server/lib/googleServiceAccountToken", () => ({
  clearServiceAccountTokenCache: clearTokenCache,
}));
vi.mock("@/server/dev/demoGoogle", () => ({ isDemoGoogle: () => false }));
vi.mock("@/serverFunctions/middleware", () => ({
  requireAuthenticatedContext: [],
}));
// Keep the actual save entry point; only replace the transport/auth wrapper.
vi.mock("@tanstack/react-start", () => ({
  createServerFn: () => ({
    middleware: () => ({
      validator: () => ({ handler: (handler: unknown) => handler }),
      handler: (handler: unknown) => handler,
    }),
  }),
}));

let privateKey: string;
beforeAll(async () => {
  const pair = await crypto.subtle.generateKey(
    {
      name: "RSASSA-PKCS1-v1_5",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["sign", "verify"],
  );
  const bytes = await crypto.subtle.exportKey("pkcs8", pair.privateKey);
  privateKey = `-----BEGIN PRIVATE KEY-----\n${Buffer.from(bytes).toString("base64")}\n-----END PRIVATE KEY-----`; // gitleaks:allow (generated per run)
});

it("guards BSEC-02: rejects malformed RSA before replacing a working account or invalidating its token", async () => {
  await GoogleServiceAccountRepository.save({
    clientEmail: "working@example.test",
    projectId: null,
    privateKey,
  });
  const previous = await GoogleServiceAccountRepository.get();
  const generation = await GoogleAccessRepository.generation();
  const save = vi.spyOn(GoogleServiceAccountRepository, "save");
  const result = await saveGoogleServiceAccount({
    data: {
      keyJson: JSON.stringify({
        type: "service_account",
        client_email: "probe@example.test",
        private_key:
          "-----BEGIN PRIVATE KEY-----\nAAAA\n-----END PRIVATE KEY-----",
      }),
    },
  });
  expect(result.ok).toBe(false);
  if (!result.ok) expect(result.reason.length).toBeGreaterThan(0);
  expect(save).not.toHaveBeenCalled();
  expect(clearTokenCache).not.toHaveBeenCalled();
  expect(await GoogleServiceAccountRepository.get()).toEqual(previous);
  expect(await GoogleAccessRepository.generation()).toBe(generation);
});

it("guards BSEC-02: accepts a disposable locally valid RSA signing key", async () => {
  expect(
    await saveGoogleServiceAccount({
      data: {
        keyJson: JSON.stringify({
          type: "service_account",
          client_email: "valid@example.test",
          private_key: privateKey,
        }),
      },
    }),
  ).toEqual({ ok: true, clientEmail: "valid@example.test" });
  expect((await GoogleServiceAccountRepository.get())?.privateKey).toBe(
    privateKey,
  );
  expect(clearTokenCache).toHaveBeenCalledOnce();
});
