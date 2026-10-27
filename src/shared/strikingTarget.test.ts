import { describe, expect, it } from "vitest";
import {
  ctrCurve,
  strikingDistance,
  strikingTargetBand,
} from "./searchInsights";

/** Five queries per band at the given CTR, 200 impressions each. */
const curve = ctrCurve(
  (
    [
      [1.2, 0.3],
      [2.5, 0.15],
      [4.5, 0.08],
      [8, 0.03],
      [15, 0.01],
    ] as const
  ).flatMap(([position, ctr], b) =>
    Array.from({ length: 5 }, (_, i) => ({
      key: `band${b}-q${i}`,
      clicks: Math.round(200 * ctr),
      impressions: 200,
      ctr,
      position,
    })),
  ),
  500,
);

/*
 * One band up, never further. Estimating every query for positions 2-3
 * summed to more than the demo site's total clicks.
 */
describe("strikingTargetBand", () => {
  it("targets the next band up only", () => {
    expect(strikingTargetBand(5)).toBe("2-3");
    expect(strikingTargetBand(7)).toBe("4-5");
    expect(strikingTargetBand(15)).toBe("6-10");
    expect(strikingTargetBand(34)).toBe("11-20");
  });

  it("estimates a page-two query for page one, not for the top three", () => {
    const row = {
      key: "q",
      clicks: 2,
      impressions: 400,
      ctr: 0.005,
      position: 15,
    };
    // 400 x the 6-10 site CTR (0.03) is 12 clicks; 2 held.
    expect(strikingDistance([row], [], curve, 50).rows[0]).toMatchObject({
      targetBand: "6-10",
      potentialClicks: 10,
    });
  });
});
