import { afterEach, beforeEach, expect, it, vi } from "vitest";

vi.mock("cloudflare:workers", () => ({
  env: { GOOGLE_CLIENT_ID: "env-id", GOOGLE_CLIENT_SECRET: "env-secret" },
}));

import { createBaseAuthConfig } from "./auth-config";

const mocks = vi.hoisted(() => ({ fetch: vi.fn<typeof fetch>() }));

beforeEach(() => {
  vi.stubGlobal("fetch", mocks.fetch);
  mocks.fetch.mockImplementation((input) => {
    const url = input instanceof Request ? input.url : String(input);
    return Promise.resolve(
      url.includes("openid-configuration")
        ? Response.json({ token_endpoint: "https://oauth.test/token" })
        : Response.json({ access_token: "fresh", expires_in: 3600 }),
    );
  });
});
afterEach(() => vi.unstubAllGlobals());

/** The form body of the token-endpoint call made while refreshing. */
async function refreshRequestBody(
  config: ReturnType<typeof createBaseAuthConfig>,
) {
  const plugin = config.plugins.find((p) => p.id === "generic-oauth");
  // The provider list does not read the context; building a full one needs a database.
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- init ignores ctx when it only builds the provider list
  const ctx = {} as Parameters<NonNullable<typeof plugin>["init"] & {}>[0];
  const providers = plugin?.init?.(ctx)?.context?.socialProviders;
  const provider = Array.isArray(providers) ? providers[0] : undefined;
  await provider?.refreshAccessToken?.("refresh-token");
  const tokenCall = mocks.fetch.mock.calls.find(([input]) =>
    String(input instanceof Request ? input.url : input).endsWith("/token"),
  );
  const init = tokenCall?.[1];
  return init?.body instanceof URLSearchParams
    ? init.body
    : new URLSearchParams(typeof init?.body === "string" ? init.body : "");
}

// Refresh signs in with the provider's client. A client entered in Settings
// must reach it, or refresh sends an empty client_id an hour after connecting.
it("refreshes grants with the client it was given, not the environment's", async () => {
  const body = await refreshRequestBody(
    createBaseAuthConfig({ clientId: "db-id", clientSecret: "db-secret" }),
  );

  expect(body.get("client_id")).toBe("db-id");
  expect(body.get("client_secret")).toBe("db-secret");
});

it("falls back to the environment client", async () => {
  const body = await refreshRequestBody(createBaseAuthConfig());

  expect(body.get("client_id")).toBe("env-id");
});
