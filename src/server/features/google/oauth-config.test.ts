import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
  getOptionalEnvValue: vi.fn(),
}));

vi.mock("@/server/features/google/GoogleOAuthClientRepository", () => ({
  GoogleOAuthClientRepository: { get: mocks.get },
}));
vi.mock("@/server/lib/runtime-env", () => ({
  getOptionalEnvValue: mocks.getOptionalEnvValue,
}));

import {
  getGoogleOAuthClientConfig,
  getGoogleOAuthClientSource,
  hasSelfHostedGoogleOAuthConfig,
} from "./oauth-config";

const LONG_ENOUGH_KEY = "0123456789012345678901234567890123456789";

function envValues(values: Record<string, string | undefined>) {
  mocks.getOptionalEnvValue.mockImplementation((name: string) =>
    Promise.resolve(values[name]),
  );
}

beforeEach(() => {
  mocks.get.mockResolvedValue(null);
  envValues({});
});

describe("getGoogleOAuthClientConfig", () => {
  it("has nothing to return when neither source is set", async () => {
    await expect(getGoogleOAuthClientConfig()).resolves.toBeNull();
  });

  it("falls back to the environment", async () => {
    envValues({
      GOOGLE_CLIENT_ID: "env-id",
      GOOGLE_CLIENT_SECRET: "env-secret",
    });

    await expect(getGoogleOAuthClientConfig()).resolves.toEqual({
      clientId: "env-id",
      clientSecret: "env-secret",
    });
  });

  // Settings can be changed without recreating the container, so a value
  // entered there has to beat a stale env var.
  it("prefers what the settings page stored", async () => {
    mocks.get.mockResolvedValue({
      clientId: "db-id",
      clientSecret: "db-secret",
      updatedAt: "2026-09-19T00:00:00.000Z",
    });
    envValues({
      GOOGLE_CLIENT_ID: "env-id",
      GOOGLE_CLIENT_SECRET: "env-secret",
    });

    await expect(getGoogleOAuthClientConfig()).resolves.toEqual({
      clientId: "db-id",
      clientSecret: "db-secret",
    });
    await expect(getGoogleOAuthClientSource()).resolves.toBe("settings");
  });

  it("ignores half a configuration", async () => {
    envValues({ GOOGLE_CLIENT_ID: "env-id" });

    await expect(getGoogleOAuthClientConfig()).resolves.toBeNull();
    await expect(getGoogleOAuthClientSource()).resolves.toBeNull();
  });
});

describe("hasSelfHostedGoogleOAuthConfig", () => {
  it("stays false until the instance key is long enough to be a key", async () => {
    mocks.get.mockResolvedValue({
      clientId: "db-id",
      clientSecret: "db-secret",
      updatedAt: "2026-09-19T00:00:00.000Z",
    });
    envValues({ BETTER_AUTH_SECRET: "short" });

    await expect(hasSelfHostedGoogleOAuthConfig()).resolves.toBe(false);

    envValues({ BETTER_AUTH_SECRET: LONG_ENOUGH_KEY });

    await expect(hasSelfHostedGoogleOAuthConfig()).resolves.toBe(true);
  });
});
