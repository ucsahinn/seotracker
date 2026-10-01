import { describe, expect, it } from "vitest";
import { issueDelta, previousAuditIds, siteKey } from "./auditDelta";

const row = (
  id: string,
  startUrl: string,
  startedAt: string,
  status = "completed",
) => ({
  id,
  startUrl,
  startedAt,
  status,
  issues: { critical: 0, warning: 0 },
});

describe("previousAuditIds", () => {
  it("pairs each audit with the nearest earlier completed one of the same site", () => {
    const previous = previousAuditIds([
      row("c", "https://example.com", "2026-03-01"),
      row("a", "https://www.example.com/", "2026-01-01"),
      row("other", "https://other.com", "2026-02-01"),
      row("failed", "https://example.com", "2026-02-15", "failed"),
      row("b", "http://example.com/blog", "2026-02-01"),
    ]);
    expect(previous.get("c")).toBe("b");
    expect(previous.get("b")).toBe("a");
    expect(previous.has("a")).toBe(false);
    expect(previous.has("other")).toBe(false);
    expect(previous.has("failed")).toBe(false);
  });
});

describe("issueDelta", () => {
  it("has no percentage when the previous audit found nothing", () => {
    expect(issueDelta(3, 0)).toEqual({ diff: 3, fraction: null });
    expect(issueDelta(3, 4)).toEqual({ diff: -1, fraction: -0.25 });
  });
});

describe("siteKey", () => {
  it("falls back to the trimmed text for an unparseable address", () => {
    expect(siteKey(" Not A Url ")).toBe("not a url");
  });
});
