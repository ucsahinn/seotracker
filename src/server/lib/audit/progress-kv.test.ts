import { beforeEach, describe, expect, it, vi } from "vitest";

const kv = vi.hoisted(() => ({
  get: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
}));
vi.mock("cloudflare:workers", () => ({ env: { KV: kv } }));

import { AuditProgressKV } from "@/server/lib/audit/progress-kv";

const entry = { url: "https://example.com/", statusCode: 200, title: "A" };

describe("AuditProgressKV.pushCrawledUrls", () => {
  beforeEach(() => {
    kv.get.mockResolvedValue(null);
  });

  // The live feed is a convenience; a KV hiccup must not fail the crawl chunk.
  it("does not throw when KV fails", async () => {
    kv.put.mockRejectedValue(new Error("KV unavailable"));
    vi.spyOn(console, "warn").mockImplementation(() => undefined);

    await expect(
      AuditProgressKV.pushCrawledUrls("audit-1", [{ ...entry, crawledAt: 1 }]),
    ).resolves.toBeUndefined();
    expect(console.warn).toHaveBeenCalled();
  });
});
