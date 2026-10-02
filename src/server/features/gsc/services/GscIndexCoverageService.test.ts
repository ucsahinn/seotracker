import { readFileSync } from "node:fs";
import type { Client } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { inspectAndRecord } from "./GscIndexCoverageService";

// Real in-memory SQLite: what the upsert's conflict clause keeps is the
// contract, and a mocked builder chain cannot see it.
const state = await vi.hoisted(async () => {
  const { createClient } = await import("@libsql/client");
  return {
    inspectUrls: vi.fn(),
    client: createClient({ url: "file::memory:" }),
  };
});
const client: Client = state.client;

vi.mock("cloudflare:workers", () => ({ env: {} }));
vi.mock("@/db", () => ({ db: drizzle(state.client) }));
vi.mock("@/db/runBatch", () => ({
  executeInBatches: async (
    items: unknown[],
    build: (tx: unknown, item: unknown) => Promise<unknown>,
  ) => {
    for (const item of items) await build(drizzle(state.client), item);
  },
}));
vi.mock("@/server/features/gsc/services/GscService", () => ({
  GscService: { inspectUrls: state.inspectUrls },
}));

beforeAll(async () => {
  await client.executeMultiple(
    [
      `CREATE TABLE projects (id text PRIMARY KEY);`,
      `INSERT INTO projects (id) VALUES ('p1');`,
      ...readFileSync("drizzle/0050_gsc_url_inspections.sql", "utf8").split(
        "--> statement-breakpoint",
      ),
    ].join("\n"),
  );
});

afterAll(() => client.close());

describe("inspectAndRecord", () => {
  it("keeps a stored verdict when a later inspection of the URL fails", async () => {
    const url = "https://example.com/a";
    state.inspectUrls.mockResolvedValueOnce({
      siteUrl: "sc-domain:example.com",
      results: [
        {
          url,
          result: { indexStatusResult: { verdict: "PASS" } },
        },
      ],
    });
    await inspectAndRecord({ projectId: "p1", urls: [url] });

    state.inspectUrls.mockResolvedValueOnce({
      siteUrl: "sc-domain:example.com",
      results: [{ url, result: null, error: "quota" }],
    });
    await inspectAndRecord({ projectId: "p1", urls: [url], force: true });

    const { rows } = await client.execute(
      "SELECT verdict, error FROM gsc_url_inspections WHERE url = 'https://example.com/a'",
    );
    expect(rows[0]).toMatchObject({ verdict: "PASS", error: "quota" });
  });

  it("keeps a stored verdict when a later answer has neither result nor error", async () => {
    const url = "https://example.com/b";
    state.inspectUrls.mockResolvedValueOnce({
      siteUrl: "sc-domain:example.com",
      results: [{ url, result: { indexStatusResult: { verdict: "PASS" } } }],
    });
    await inspectAndRecord({ projectId: "p1", urls: [url] });

    state.inspectUrls.mockResolvedValueOnce({
      siteUrl: "sc-domain:example.com",
      results: [{ url, result: null }],
    });
    await inspectAndRecord({ projectId: "p1", urls: [url], force: true });

    const { rows } = await client.execute(
      "SELECT verdict FROM gsc_url_inspections WHERE url = 'https://example.com/b'",
    );
    expect(rows[0]).toMatchObject({ verdict: "PASS" });
  });
});
