import { describe, expect, it } from "vitest";
import { buildContextHealth, healthProgress } from "./contextHealth";

const base: Parameters<typeof buildContextHealth>[0] = {
  missingSections: [],
  competitorCount: 2,
  keyPageCount: 1,
  searchConsole: "done",
  analytics: "done",
  pageSpeed: "done",
  audit: "done",
  agent: "done",
};

describe("buildContextHealth", () => {
  it("points the prose item at the first empty section", () => {
    const items = buildContextHealth({
      ...base,
      missingSections: ["positioning", "current_goal"],
    });
    expect(items[0]).toMatchObject({
      state: "todo",
      target: { kind: "anchor", id: "context-positioning" },
    });
  });

  /* Same count as the dashboard: competitors and key pages are advice. */
  it("counts the shared checklist only, finished items only", () => {
    const items = buildContextHealth({
      ...base,
      competitorCount: 0,
      searchConsole: "loading",
      analytics: "error",
    });
    expect(healthProgress(items)).toEqual({ done: 4, total: 6 });
  });
});
