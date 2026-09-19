import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ getOptionalEnvValue: vi.fn() }));

vi.mock("@/server/lib/runtime-env", () => ({
  getOptionalEnvValue: mocks.getOptionalEnvValue,
}));

import { MissingInstanceKeyError, openSecret, sealSecret } from "./secretBox";

const KEY = "an-instance-key-long-enough-to-be-real";

beforeEach(() => {
  mocks.getOptionalEnvValue.mockResolvedValue(KEY);
});

describe("secretBox", () => {
  it("reads back what it sealed", async () => {
    const sealed = await sealSecret("GOCSPX-super-secret");

    expect(sealed).not.toContain("GOCSPX");
    await expect(openSecret(sealed)).resolves.toBe("GOCSPX-super-secret");
  });

  // A fresh nonce per call, or identical secrets would be visibly identical
  // in the database.
  it("produces different ciphertext each time", async () => {
    const [first, second] = await Promise.all([
      sealSecret("same"),
      sealSecret("same"),
    ]);

    expect(first).not.toBe(second);
  });

  it("returns null when the instance key changed", async () => {
    const sealed = await sealSecret("GOCSPX-super-secret");
    mocks.getOptionalEnvValue.mockResolvedValue("a-completely-different-key");

    await expect(openSecret(sealed)).resolves.toBeNull();
  });

  it("returns null on a corrupted value rather than throwing", async () => {
    await expect(openSecret("not base64 at all")).resolves.toBeNull();
  });

  it("refuses to work without an instance key", async () => {
    mocks.getOptionalEnvValue.mockResolvedValue(undefined);

    await expect(sealSecret("x")).rejects.toBeInstanceOf(
      MissingInstanceKeyError,
    );
  });
});
