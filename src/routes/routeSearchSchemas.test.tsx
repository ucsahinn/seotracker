import { describe, expect, it } from "vitest";
import { z } from "zod";
import { Route as analytics } from "./_project/p/$projectId/analytics";
import { Route as auditIndex } from "./_project/p/$projectId/audit/index";
import { Route as opportunities } from "./_project/p/$projectId/opportunities";
import { Route as rankings } from "./_project/p/$projectId/rankings";
import { Route as report } from "./_project/p/$projectId/reports/$reportId";
import { Route as searchPerformance } from "./_project/p/$projectId/search-performance";

// A hand-edited or stale URL must degrade to defaults, never throw out of
// validateSearch (which would show the route error screen).
const hostile = {
  windowDays: "abc",
  days: 45,
  tab: "zzz",
  limit: 0,
  country: "x",
  q: "a".repeat(201),
  full: "yes",
};

function parseSearch(
  route: { options: { validateSearch?: unknown } },
  input: unknown,
) {
  const schema = route.options.validateSearch;
  if (!(schema instanceof z.ZodType)) throw new Error("not a zod schema");
  return schema.parse(input);
}

const routes = [
  ["analytics", analytics, { windowDays: 28 }],
  ["audit", auditIndex, { tab: "todo" }],
  ["opportunities", opportunities, { windowDays: 28, limit: 50 }],
  ["rankings", rankings, { days: 90 }],
  ["reports detail", report, {}],
  ["search-performance", searchPerformance, { tab: "todo" }],
] as const;

describe("route search schemas", () => {
  it.each(routes)(
    "%s falls back to defaults on hostile values",
    (_, route, expected) => {
      const parsed = parseSearch(route, hostile);

      expect(parsed).toMatchObject(expected);
      expect(parsed).not.toHaveProperty("country", hostile.country);
      expect(parsed).not.toHaveProperty("q", hostile.q);
      expect(parsed).not.toHaveProperty("full", hostile.full);
      expect(parsed).not.toHaveProperty("limit", hostile.limit);
    },
  );
});

// Fields that are only valid together: half of a pair is a hand-edited link,
// and it must open the default view rather than the route error screen.
it.each([
  ["analytics", analytics, { startDate: "2026-01-01" }],
  ["analytics", analytics, { host: "example.com" }],
  ["analytics", analytics, { pageGroup: "blog", view: "key_events" }],
  ["rankings", rankings, { startDate: "2026-02-01", endDate: "2026-01-01" }],
  ["search-performance", searchPerformance, { endDate: "2026-01-01" }],
  [
    "search-performance",
    searchPerformance,
    { exactQuery: "a", exactPage: "/b" },
  ],
] as const)("%s drops an incomplete field group %#", (_, route, input) => {
  const parsed = z
    .record(z.string(), z.unknown())
    .parse(parseSearch(route, input));
  for (const key of ["startDate", "endDate", "host", "path", "pageGroup"]) {
    expect(parsed[key]).toBeUndefined();
  }
  expect(parsed).not.toHaveProperty("exactQuery", "a");
});

// Links and bookmarks from before the tab redesign still land on the list.
it("maps old Search performance tabs onto the tabs that hold them now", () => {
  expect(parseSearch(searchPerformance, { tab: "striking" })).toMatchObject({
    tab: "opportunities",
  });
  expect(
    parseSearch(searchPerformance, { tab: "cannibalization" }),
  ).toMatchObject({ tab: "overlaps" });
});
