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
   * The Turkish sentence that used to be in this list has moved to the
   * suite below: it is no longer "unrecognised". Two of Google's Turkish
   * renderings were verified against real stored rows -- the machine-
   * readable `indexingState`, `robotsTxtState` and `pageFetchState` match
   * their English twins exactly -- so mapping them is a reading, not a
   * guess. Everything still unverified stays silent.
   */
  it("stays silent on a sentence it does not recognise", () => {
    expect(
      classifyCoverageState("Some state Google invents in 2027"),
    ).toBeNull();
    expect(classifyCoverageState("Tanımadığımız bir Türkçe cümle")).toBeNull();
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

/*
 * The inspection used to be requested in Turkish, so rows stored then hold
 * Google's Turkish sentence rather than the English key everything else is
 * written against. Measured on the real install: 23 of 29 stored inspections
 * were in that state and every one classified as "no finding" -- four fifths
 * of the answers the operator had already spent quota on produced nothing.
 */
describe("states stored in Turkish", () => {
  it("still produces a finding", () => {
    expect(
      classifyCoverageState("Keşfedildi - şu anda dizine eklenmiş değil"),
    ).toBe("discovered-not-indexed");
    expect(classifyCoverageState("URL Google tarafından bilinmiyor")).toBe(
      "unknown-to-google",
    );
  });

  /*
   * And reads in the app's own words rather than Google's. Two phrasings of
   * one state on one screen is a difference the reader has to resolve for no
   * reason.
   */
  it("is labelled the same as its English twin", () => {
    expect(
      coverageStateLabel("Keşfedildi - şu anda dizine eklenmiş değil"),
    ).toBe(coverageStateLabel("Discovered - currently not indexed"));
    expect(coverageStateLabel("URL Google tarafından bilinmiyor")).toBe(
      coverageStateLabel("URL is unknown to Google"),
    );
  });

  /*
   * A sentence nobody has mapped must not become a wrong reason: a wrong
   * explanation for why Google will not index a page sends someone to fix
   * the wrong thing.
   */
  it("leaves an unrecognised sentence alone rather than guessing", () => {
    expect(classifyCoverageState("Bilinmeyen bir durum")).toBeNull();
    expect(coverageStateLabel("Bilinmeyen bir durum")).toBe(
      "Bilinmeyen bir durum",
    );
  });
});
