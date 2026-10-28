import { beforeAll, describe, expect, it, vi } from "vitest";
import { audits, projects, auditIssues } from "@/db/schema";
import { getAuditNotificationFeed } from "./auditNotifications";

const testDb = await vi.hoisted(async () =>
  (await import("@/server/test-support/sqlite-test-db")).createTestDb(),
);
vi.mock("cloudflare:workers", () => ({ env: {} }));
vi.mock("@/db", () => ({ db: testDb.db }));

const finishedAt = "2026-10-28T12:00:00.000Z";
beforeAll(async () => {
  await testDb.db.insert(projects).values([
    { id: "p", name: "My site", organizationId: "org" },
    { id: "other", name: "Other site", organizationId: "other-org" },
  ]);
  await testDb.db.insert(audits).values([
    {
      id: "a",
      projectId: "p",
      startedByUserId: "u",
      startUrl: "https://example.com",
      status: "completed",
      completedAt: finishedAt,
    },
    {
      id: "b",
      projectId: "p",
      startedByUserId: "u",
      startUrl: "https://example.com",
      status: "failed",
      completedAt: finishedAt,
      pagesCrawled: 3,
    },
    {
      id: "running",
      projectId: "p",
      startedByUserId: "u",
      startUrl: "https://example.com",
      status: "running",
    },
    {
      id: "private",
      projectId: "other",
      startedByUserId: "u",
      startUrl: "https://example.com",
      status: "completed",
      completedAt: finishedAt,
    },
  ]);
});

describe("audit notification feed", () => {
  it("baselines silently at the latest finished audit", async () => {
    expect(await getAuditNotificationFeed("org", null)).toEqual({
      cursor: { finishedAt, id: "b" },
      events: [],
    });
  });
  it("uses the id to break timestamp ties and returns minimal scoped outcomes", async () => {
    await testDb.db.insert(auditIssues).values({
      id: "i",
      auditId: "b",
      issueType: "missing-title",
      severity: "critical",
      pageUrl: "https://example.com",
    });
    const feed = await getAuditNotificationFeed(
      "org",
      JSON.stringify({ finishedAt, id: "a" }),
    );
    expect(feed.events).toEqual([
      {
        id: "b",
        projectName: "My site",
        outcome: "failed",
        pagesCrawled: 3,
        issueCounts: { critical: 1, warning: 0, info: 0 },
        finishedAt,
        path: "/p/p/audit?auditId=b",
      },
    ]);
    const repeated = await getAuditNotificationFeed(
      "org",
      JSON.stringify(feed.cursor),
    );
    expect(repeated.events).toEqual([]);
  });
  it("keeps an empty baseline usable for the first future audit", async () => {
    const baseline = await getAuditNotificationFeed("empty-org", null);
    expect(baseline.events).toEqual([]);
    const next = await getAuditNotificationFeed(
      "org",
      JSON.stringify(baseline.cursor),
    );
    expect(next.events).toHaveLength(2);
  });
  it("rejects malformed cursors before querying", async () => {
    await expect(
      getAuditNotificationFeed("org", '{"id":"x"}'),
    ).rejects.toThrow();
  });
  it("advances through bounded pages without dropping timestamp ties", async () => {
    await testDb.db
      .insert(projects)
      .values({ id: "paged", name: "Paged", organizationId: "paged-org" });
    for (let index = 0; index < 101; index++) {
      await testDb.db.insert(audits).values({
        id: `page-${String(index).padStart(3, "0")}`,
        projectId: "paged",
        startedByUserId: "u",
        startUrl: "https://example.com",
        status: "completed",
        completedAt: finishedAt,
      });
    }
    const first = await getAuditNotificationFeed(
      "paged-org",
      JSON.stringify({ finishedAt, id: "" }),
    );
    expect(first.events).toHaveLength(100);
    const second = await getAuditNotificationFeed(
      "paged-org",
      JSON.stringify(first.cursor),
    );
    expect(second.events.map(({ id }) => id)).toEqual(["page-100"]);
  });
});
