import { QueryClient } from "@tanstack/react-query";
import { describe, expect, it } from "vitest";
import { invalidatePropertyDependents } from "./invalidatePropertyDependents";

describe("invalidatePropertyDependents", () => {
  it("guards client-1: reloads monthly history after changing a property without expiring another project", async () => {
    const client = new QueryClient({
      defaultOptions: { queries: { staleTime: 600_000 } },
    });
    const key = ["siteDailyHistory", "p1", "web", null];
    const other = ["siteDailyHistory", "p2", "web", null];
    client.setQueryData(key, { clicks: 10 });
    client.setQueryData(other, { clicks: 20 });
    invalidatePropertyDependents(client, "p1");
    expect(
      await client.fetchQuery({
        queryKey: key,
        queryFn: async () => ({ clicks: 30 }),
      }),
    ).toEqual({ clicks: 30 });
    expect(client.getQueryState(other)?.isInvalidated).toBe(false);
    client.clear();
  });
  it("invalidates property-derived queries of this project by prefix, and no other project's", () => {
    const client = new QueryClient();
    const keys = [
      ["searchOpportunities", "p1", 50, 28],
      ["trackedQueries", "p1", 28],
      ["queryHistory", "p1", "kw", 28],
      ["ga4Overview", "p1", 28],
      ["quotaStatus", "p1", "ga4"],
      ["cannibalization", "p1", "last28", undefined, undefined, "web"],
      ["searchOpportunities", "p2", 50, 28],
    ];
    for (const key of keys) client.setQueryData(key, 1);

    invalidatePropertyDependents(client, "p1");

    const invalidated = keys.map(
      (key) => client.getQueryState(key)?.isInvalidated,
    );
    expect(invalidated).toEqual([true, true, true, true, true, true, false]);
  });
});
