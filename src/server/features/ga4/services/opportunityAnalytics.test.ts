import { describe, expect, it } from "vitest";
import { addRow, finishRates, valueSignal } from "./opportunityAnalytics";

describe("opportunity Analytics availability", () => {
  it("keeps a partially restricted cohort unknown instead of reporting a partial total as complete", () => {
    const first = addRow(undefined, {
      sessions: 100,
      keyEvents: 5,
      sessionKeyEventRate: 0.04,
    });
    const cohort = addRow(first, {
      sessions: 100,
      keyEvents: null,
      sessionKeyEventRate: null,
    });
    finishRates(cohort);
    expect(cohort.sessions).toBe(200);
    expect(cohort.keyEvents).toBeNull();
    expect(cohort.sessionKeyEventRate).toBeNull();
    expect(valueSignal(cohort, 30, true)).toBeNull();
  });

  it("keeps unknown sessions unknown without erasing known event counts", () => {
    const cohort = addRow(undefined, {
      sessions: null,
      keyEvents: 5,
      sessionKeyEventRate: null,
    });
    finishRates(cohort);
    expect(cohort.sessions).toBeNull();
    expect(cohort.keyEvents).toBe(5);
    expect(valueSignal(cohort, 30, true)).toBeNull();
  });

  it("distinguishes observed zero events from restricted events", () => {
    const cohort = addRow(undefined, {
      sessions: 100,
      keyEvents: 0,
      sessionKeyEventRate: 0,
    });
    finishRates(cohort);
    expect(cohort.keyEvents).toBe(0);
    expect(valueSignal(cohort, 30, true)).toBe("no_conversions");
  });
});
