import { setLocale } from "./i18n";
import { afterEach, describe, expect, it } from "vitest";
import { fractionalChange, placesDelta, pointsDelta } from "./delta";

describe("fractionalChange", () => {
  it("is the change relative to the previous value", () => {
    expect(fractionalChange(150, 100)).toBe(0.5);
    expect(fractionalChange(50, 100)).toBe(-0.5);
  });

  it("has no answer without a positive base", () => {
    expect(fractionalChange(10, 0)).toBeNull();
    expect(fractionalChange(10, -5)).toBeNull();
  });
});

describe("placesDelta", () => {
  it("says no change, rather than nothing, when both periods exist but did not move", () => {
    expect(placesDelta(8.92, 8.9)).toMatchObject({ neutral: true });
    expect(placesDelta(8.9, null)).toBeNull();
  });
});

it("distinguishes unchanged rates, including zero, from missing evidence", () => {
  expect(pointsDelta(0, 0)).toMatchObject({ neutral: true });
  expect(pointsDelta(0.5, 0.5)).toMatchObject({ neutral: true });
  expect(pointsDelta(0.5, null)).toBeNull();
});

afterEach(() => setLocale("tr"));
it("distinguishes percentage-point changes from relative percent changes in both UI languages", () => {
  setLocale("tr");
  expect(pointsDelta(0.018, 0.2)?.text).toBe("-18,2 yüzde puan");
  setLocale("en");
  expect(pointsDelta(0.018, 0.2)?.text).toBe("-18.2 percentage points");
});
