import { describe, expect, it } from "vitest";
import { formatCount, formatDay, formatPercent } from "@/client/lib/format";

describe("format", () => {
  /*
   * The whole point of this module is that every screen agrees, so the two
   * shapes that drifted apart in the app are the two worth pinning: a percent
   * rendered as "3.4%" on the dashboard and "%3,4" in the tables, and a
   * calendar day that read as the day before west of Greenwich.
   */
  it("writes percentages the Turkish way, sign first and comma decimal", () => {
    expect(formatPercent(0.034)).toBe("%3,4");
  });

  it("reads a bare date as a calendar day, not as UTC midnight", () => {
    // Asserted against the literal rather than against another call, so the
    // test cannot pass by being wrong in both places, and so it does not
    // depend on the zone the suite happens to run in.
    expect(formatDay("2026-08-01")).toBe("1 Ağu");
  });

  it("rounds counts rather than printing a fractional click", () => {
    expect(formatCount(1234.6)).toBe("1.235");
  });
});
