import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { version } from "../../../../package.json";
import { makeToolContext } from "./tool-test-support";
import { whoamiTool } from "./whoami";

const mocks = vi.hoisted(() => ({ getCachedStatus: vi.fn() }));
vi.mock("@/server/features/updates/UpdateCheckService", () => ({
  UpdateCheckService: { getCachedStatus: mocks.getCachedStatus },
}));

beforeEach(() => {
  vi.stubEnv("INSTALL_KIND", "windows");
  vi.stubEnv("WINDOWS_PORT_FALLBACK", "8787->8788");
});
afterEach(() => {
  vi.unstubAllEnvs();
});

it("names an instance older than the latest release, and its port fallback", async () => {
  mocks.getCachedStatus.mockResolvedValue({ latestVersion: "99.0.0" });

  const result = await whoamiTool.handler({}, makeToolContext());

  expect(result.structuredContent?.instance).toMatchObject({
    version,
    installKind: "windows",
    latestVersion: "99.0.0",
    stale: true,
    port: {
      configured: 8787,
      actual: 8788,
      fallback: { configured: 8787, actual: 8788 },
    },
  });
  expect(result.structuredContent?.instance.agentNote).toMatch(
    /^Tell the user before using any data/,
  );
});

it("is not stale when the update check never answered", async () => {
  mocks.getCachedStatus.mockResolvedValue({ latestVersion: null });

  const result = await whoamiTool.handler({}, makeToolContext());

  expect(result.structuredContent?.instance).toMatchObject({
    latestVersion: null,
    stale: false,
  });
});
