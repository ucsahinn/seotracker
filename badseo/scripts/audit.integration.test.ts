import { expect, test, vi } from "vitest";
import { runAudit } from "./run-audit";

// Only the fixture runner admits loopback. Production URL policy is unchanged.
vi.mock("../../src/server/lib/audit/url-policy", async (importOriginal) => {
  const original =
    await importOriginal<
      typeof import("../../src/server/lib/audit/url-policy")
    >();
  const fixture = new URL(process.env.BADSEO_URL ?? "http://127.0.0.1:8787");
  if (
    !["127.0.0.1", "localhost", "[::1]"].includes(fixture.hostname) ||
    fixture.protocol !== "http:"
  ) {
    throw new Error("BADSEO_URL must name the local HTTP fixture server");
  }
  return {
    ...original,
    assertPublicHostname: async (host: string) => {
      if (host !== fixture.hostname) await original.assertPublicHostname(host);
    },
    isCrawlableUrl: (value: string) => {
      const url = new URL(value);
      return (
        (url.origin === fixture.origin && !url.username && !url.password) ||
        original.isCrawlableUrl(value)
      );
    },
  };
});

test("all deliberately broken fixture pages report their expected findings", async () => {
  expect(await runAudit()).toBe(0);
});
