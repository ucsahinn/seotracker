import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ getOptionalEnvValue: vi.fn() }));

vi.mock("@/server/lib/runtime-env", () => ({
  getOptionalEnvValue: mocks.getOptionalEnvValue,
}));

import { MissingInstanceKeyError, openSecret, sealSecret } from "./secretBox";

const KEY = "an-instance-key-long-enough-to-be-real";

/** The key derivation this module used before it was salted. */
async function sealTheOldWay(plaintext: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(KEY),
  );
  const key = await crypto.subtle.importKey("raw", digest, "AES-GCM", false, [
    "encrypt",
  ]);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    new TextEncoder().encode(plaintext),
  );
  const packed = new Uint8Array(iv.length + ciphertext.byteLength);
  packed.set(iv);
  packed.set(new Uint8Array(ciphertext), iv.length);
  return btoa(String.fromCharCode(...packed));
}

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

  /*
   * The compatibility guarantee. An install that predates the salted format
   * has its Google client secret and service-account key sealed the old way,
   * and losing them would mean re-entering both with no warning that they
   * were gone.
   */
  it("still opens a value sealed with the pre-salt key", async () => {
    const legacy = await sealTheOldWay("GOCSPX-from-an-older-install");

    await expect(openSecret(legacy)).resolves.toBe(
      "GOCSPX-from-an-older-install",
    );
  });

  // And the new format is actually being written, or the guarantee above
  // would be the only path anything ever took.
  it("writes the salted format, not the old one", async () => {
    const sealed = await sealSecret("x");

    expect(atob(sealed).charCodeAt(0)).toBe(2);
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
