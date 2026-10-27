import { describe, expect, it } from "vitest";
import { hasFreshOwnAudit, setupVerdict } from "./projectSetup";

const DAY = 86_400_000;
const NOW = Date.UTC(2026, 9, 26);

describe("hasFreshOwnAudit", () => {
  it("counts only a recent completed audit of the project's own host", () => {
    const own = {
      status: "completed",
      startUrl: "https://www.ornek-site.com/blog",
      startedAt: NOW - DAY,
    };
    const other = { ...own, startUrl: "https://www.npr.org/" };
    expect(hasFreshOwnAudit([own], "ornek-site.com", NOW)).toBe(true);
    // An audit of another site is not this project's fresh audit.
    expect(hasFreshOwnAudit([other], "ornek-site.com", NOW)).toBe(false);
    expect(
      hasFreshOwnAudit(
        [{ ...own, startedAt: NOW - 8 * DAY }],
        "ornek-site.com",
        NOW,
      ),
    ).toBe(false);
    expect(
      hasFreshOwnAudit([{ ...own, status: "failed" }], "ornek-site.com", NOW),
    ).toBe(false);
  });
});

describe("setupVerdict", () => {
  it("is complete only when every item is known and done", () => {
    const all = {
      searchConsole: true,
      analytics: true,
      audit: true,
      projectInfo: true,
      pageSpeed: true,
      agent: true,
    };
    expect(setupVerdict(all)).toMatchObject({
      done: 6,
      total: 6,
      complete: true,
    });
    expect(
      setupVerdict({ ...all, pageSpeed: false, agent: null }),
    ).toMatchObject({
      done: 4,
      complete: false,
      missing: ["pageSpeed"],
      unknown: ["agent"],
    });
  });
});
