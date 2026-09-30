import { describe, expect, it } from "vitest";
import { buildContextHealth, healthProgress } from "./contextHealth";

const base: Parameters<typeof buildContextHealth>[0] = {
  missingSections: [],
  competitorCount: 2,
  keyPageCount: 1,
  searchConsole: "done",
  analytics: "done",
  pageSpeed: "done",
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

  it("counts only finished items, not ones still loading or failed", () => {
    const items = buildContextHealth({
      ...base,
      competitorCount: 0,
      searchConsole: "loading",
      analytics: "error",
    });
    expect(healthProgress(items)).toEqual({ done: 3, total: 6 });
  });
});
