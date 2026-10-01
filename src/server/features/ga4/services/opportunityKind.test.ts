import { describe, expect, it } from "vitest";
import {
  classify,
  ctrGap,
  expectedCtrByBucket,
} from "@/server/features/ga4/services/opportunityKind";

function row(position: number, ctr: number, impressions = 1000) {
  return { position, ctr, impressions };
}

describe("expectedCtrByBucket", () => {
  /*
   * The bar is the site's own median, not a published CTR curve. A brand
   * term at position 3 behaves nothing like a comparison term at position 3,
   * so somebody else's average is not a bar this site can be judged against.
   */
  it("takes the median of each position bucket", () => {
    const expected = expectedCtrByBucket([
      row(2, 0.1),
      row(2, 0.2),
      row(3, 0.3),
    ]);

    expect(expected.get(3)).toBe(0.2);
  });

  /*
   * The median rather than the mean: one brand page earning 60% would drag a
   * mean high enough to make every other page in its bucket look like a gap.
   */
  it("is not dragged by a single outlier", () => {
    const expected = expectedCtrByBucket([
      row(2, 0.05),
      row(2, 0.06),
      row(2, 0.07),
      row(2, 0.6),
    ]);

    expect(expected.get(3)).toBeCloseTo(0.065, 5);
  });

  /*
   * One click out of three is a 33% click-through rate and pure noise. Left
   * in, a page with a handful of impressions sets the bar for its bucket.
   */
  it("ignores rows with too few impressions to mean anything", () => {
    const expected = expectedCtrByBucket([
      row(2, 0.9, 3),
      row(2, 0.1),
      row(2, 0.1),
      row(2, 0.1),
    ]);

    expect(expected.get(3)).toBe(0.1);
  });

  it("gives no bar for a bucket with too few pages to have a normal", () => {
    expect(
      expectedCtrByBucket([row(2, 0.1), row(2, 0.2)]).get(3),
    ).toBeUndefined();
  });
});

describe("classify", () => {
  const expected = expectedCtrByBucket([
    row(2, 0.2),
    row(2, 0.2),
    row(2, 0.2),
    row(12, 0.05),
    row(12, 0.05),
    row(12, 0.05),
  ]);

  /*
   * The finding the old 4–20 band threw away: a page ranking second that
   * nobody clicks. It never appeared on this screen at all, and it is the
   * cheapest fix on it — a title and a description.
   */
  it("calls a well-ranked page with a weak click-through a CTR gap", () => {
    expect(classify(row(2, 0.03), expected)).toBe("ctr_gap");
  });

  it("leaves a well-ranked page earning its normal rate alone", () => {
    expect(classify(row(2, 0.2), expected)).toBe("top");
  });

  /*
   * "Slightly below average" is not a finding. Half the bucket's median is
   * the bar, so ordinary variation does not fill the screen.
   */
  it("does not call ordinary variation a gap", () => {
    expect(classify(row(2, 0.15), expected)).toBe("top");
  });

  /*
   * The other half the band threw away: real demand, too deep to be an
   * afternoon. It is a content decision, and the screen should say so
   * rather than pretend the page does not exist.
   */
  it("keeps a deep page with demand, as its own kind", () => {
    expect(classify(row(34, 0.01, 4000), expected)).toBe("deep");
  });

  it("keeps a deep page deep even with a low click-through and a bar", () => {
    const withDeepBar = expectedCtrByBucket([
      row(34, 0.05),
      row(34, 0.05),
      row(34, 0.05),
    ]);
    expect(classify(row(34, 0.001, 4000), withDeepBar)).toBe("deep");
  });

  it("still calls a top-3 page top without a baseline, since it has nowhere to climb", () => {
    expect(classify(row(1.5, 0, 5000), new Map())).toBe("top");
  });

  it("uses the first bucket's edge for top", () => {
    const wide = expectedCtrByBucket([
      row(3.5, 0.1),
      row(3.5, 0.1),
      row(3.5, 0.1),
    ]);
    expect(classify(row(3.5, 0.1), wide)).toBe("near_miss");
  });

  it("has no opinion when the bucket has no bar", () => {
    expect(classify(row(80, 0.001), expected)).toBe("deep");
  });
});

describe("ctrGap", () => {
  const expected = expectedCtrByBucket([row(2, 0.2), row(2, 0.2), row(2, 0.2)]);

  it("reports the distance from the bar, signed", () => {
    expect(ctrGap(row(2, 0.05), expected)).toBeCloseTo(-0.15, 5);
    expect(ctrGap(row(2, 0.25), expected)).toBeCloseTo(0.05, 5);
  });

  it("reports nothing when there is nothing to compare against", () => {
    expect(ctrGap(row(40, 0.05), expected)).toBeNull();
    expect(ctrGap(row(2, 0.05, 3), expected)).toBeNull();
  });
});
