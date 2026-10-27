import { describe, expect, it } from "vitest";
import {
  searchPerformanceViewInputSchema,
  searchReportInputSchema,
  searchPerformanceLinkSchema,
} from "@/types/schemas/search-performance";
import { searchScopeUnavailableReason } from "./searchScope";

describe("exact Search scope (previously stripped from links and report inputs)", () => {
  const window = { startDate: "2026-07-01", endDate: "2026-09-28" };
  it("explains retention before an old local archive can open a different live scope", () => {
    const now = new Date("2026-10-27T12:00:00Z");
    expect(searchScopeUnavailableReason("2020-01-01", now)).toBeTypeOf(
      "string",
    );
    expect(searchScopeUnavailableReason("2026-07-01", now)).toBeUndefined();
  });
  it("keeps the displayed span in view and report requests instead of re-resolving a preset", () => {
    expect(
      searchPerformanceViewInputSchema.parse({ projectId: "p", window }).window,
    ).toEqual(window);
    expect(
      searchReportInputSchema.parse({ projectId: "p", window }).window,
    ).toEqual(window);
    expect(searchReportInputSchema.safeParse({ projectId: "p" }).success).toBe(
      false,
    );
  });
  it("rejects impossible, partial, reversed and ambiguous exact scopes rather than falling back", () => {
    for (const input of [
      { startDate: "2026-02-30", endDate: "2026-03-01" },
      { startDate: "2026-01-01" },
      { startDate: "2026-03-02", endDate: "2026-03-01" },
      { exactQuery: "one", exactPage: "https://site.test/one" },
    ])
      expect(searchPerformanceLinkSchema.safeParse(input).success).toBe(false);
  });
  it("preserves literal query and page identities, including URL parameters", () => {
    expect(
      searchPerformanceLinkSchema.parse({ ...window, exactQuery: "cat + CAT" }),
    ).toMatchObject({ ...window, exactQuery: "cat + CAT" });
    expect(
      searchPerformanceLinkSchema.parse({
        ...window,
        exactPage: "https://site.test/a?x=1&y=2",
      }),
    ).toMatchObject({ ...window, exactPage: "https://site.test/a?x=1&y=2" });
  });
});
