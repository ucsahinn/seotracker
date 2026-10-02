import { QueryClient } from "@tanstack/react-query";
import { describe, expect, it } from "vitest";
import { invalidatePropertyDependents } from "./invalidatePropertyDependents";

describe("invalidatePropertyDependents", () => {
  it("invalidates property-derived queries of this project by prefix, and no other project's", () => {
    const client = new QueryClient();
    const keys = [
      ["searchOpportunities", "p1", 50, 28],
      ["trackedQueries", "p1", 28],
      ["queryHistory", "p1", "kw", 28],
      ["ga4Overview", "p1", 28],
      ["quotaStatus", "p1", "ga4"],
      ["searchOpportunities", "p2", 50, 28],
    ];
    for (const key of keys) client.setQueryData(key, 1);

    invalidatePropertyDependents(client, "p1");

    const invalidated = keys.map(
      (key) => client.getQueryState(key)?.isInvalidated,
    );
    expect(invalidated).toEqual([true, true, true, true, true, false]);
  });
});
