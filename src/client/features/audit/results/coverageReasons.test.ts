import { describe, expect, it } from "vitest";
import { coverageReasons } from "./coverageReasons";

const none = {
  robotsTxtState: null,
  indexingState: null,
  pageFetchState: null,
  richResultsVerdict: null,
};

describe("coverageReasons", () => {
  /*
   * The two stored inspections on the real install that carry a reason:
   * one blocked by robots.txt, one indexed. Taken from the database rather
   * than invented, so the strings are the ones Google actually sends.
   */
  it("explains a URL robots.txt blocks", () => {
    expect(
      coverageReasons({
        robotsTxtState: "DISALLOWED",
        indexingState: "INDEXING_STATE_UNSPECIFIED",
        pageFetchState: "BLOCKED_ROBOTS_TXT",
        richResultsVerdict: null,
      }),
    ).toEqual(["robots.txt engelliyor", "robots.txt engelledi"]);
  });

  it("explains an indexed URL", () => {
    expect(
      coverageReasons({
        robotsTxtState: "ALLOWED",
        indexingState: "INDEXING_ALLOWED",
        pageFetchState: "SUCCESSFUL",
        richResultsVerdict: null,
      }),
    ).toEqual([
      "robots.txt izin veriyor",
      "Dizine almaya izin var",
      "Sayfa başarıyla alındı",
    ]);
  });

  /*
   * UNSPECIFIED means Google has not looked yet, which the verdict badge
   * beside it already says -- so it must not fill the cell with four lines
   * of "henüz bakmadı".
   */
  it("says nothing for a URL Google has not looked at", () => {
    expect(
      coverageReasons({
        robotsTxtState: "ROBOTS_TXT_STATE_UNSPECIFIED",
        indexingState: "INDEXING_STATE_UNSPECIFIED",
        pageFetchState: "PAGE_FETCH_STATE_UNSPECIFIED",
        richResultsVerdict: null,
      }),
    ).toEqual([]);
  });

  it("says nothing when there is nothing stored", () => {
    expect(coverageReasons(none)).toEqual([]);
  });

  /*
   * Google adds enum members. An unfamiliar word is better than a blank
   * cell, so an unknown value passes through unchanged.
   */
  it("passes an unknown value through rather than dropping it", () => {
    expect(
      coverageReasons({ ...none, pageFetchState: "SOME_NEW_STATE" }),
    ).toEqual(["SOME_NEW_STATE"]);
  });
});
