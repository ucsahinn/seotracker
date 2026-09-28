import { describe, expect, it } from "vitest";
import {
  classifyCoverageState,
  coverageStateLabel,
} from "./gsc-coverage-states";

describe("classifyCoverageState", () => {
  /*
   * These four are the whole reason the sentence is read at all: the enums
   * stored beside it are identical for "discovered, not indexed" and
   * "unknown to Google" (both NEUTRAL / UNSPECIFIED / no crawl time), and
   * the two send an operator to opposite fixes — one to internal linking,
   * one to the sitemap.
   */
  it("classifies the states that say why Google has not indexed a page", () => {
    expect(classifyCoverageState("Crawled - currently not indexed")).toBe(
      "crawled-not-indexed",
    );
    expect(classifyCoverageState("Discovered - currently not indexed")).toBe(
      "discovered-not-indexed",
    );
    expect(classifyCoverageState("URL is unknown to Google")).toBe(
      "unknown-to-google",
    );
    expect(
      classifyCoverageState("Duplicate without user-selected canonical"),
    ).toBe("duplicate-no-canonical");
  });

  /*
   * Rows stored while the inspection asked for Turkish are still in the
   * table. Guessing at a translation would attach a confident reason to
   * the wrong page; silence leaves the row reported by the enums alone.
   */
  it("stays silent on a sentence it does not recognise", () => {
    expect(
      classifyCoverageState("Keşfedildi - şu anda dizine eklenmiş değil"),
    ).toBeNull();
    expect(
      classifyCoverageState("Some state Google invents in 2027"),
    ).toBeNull();
    expect(classifyCoverageState(null)).toBeNull();
  });

  /*
   * Already reported from the enums by `google-blocked-by-robots`. Adding
   * them here would file two findings for one fact.
   */
  it("leaves the states the enum checks already cover to those checks", () => {
    expect(classifyCoverageState("Blocked by robots.txt")).toBeNull();
    expect(classifyCoverageState("Submitted and indexed")).toBeNull();
  });
});

describe("coverageStateLabel", () => {
  it("translates the documented states and passes anything else through", () => {
    expect(coverageStateLabel("Submitted and indexed")).toBe(
      "Site haritasında var, dizine alındı",
    );
    expect(coverageStateLabel("Mars'tan bir durum")).toBe("Mars'tan bir durum");
    expect(coverageStateLabel(null)).toBeNull();
  });
});
