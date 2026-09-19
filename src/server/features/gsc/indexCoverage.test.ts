import { describe, expect, it } from "vitest";
import {
  blankRow,
  selectDueUrls,
  summarizeCoverage,
  type CoverageRow,
} from "./indexCoverage";

const NOW = new Date("2026-06-30T12:00:00.000Z");

function checked(url: string, over: Partial<CoverageRow> = {}): CoverageRow {
  return {
    ...blankRow(url),
    verdict: "PASS",
    coverageState: "Submitted and indexed",
    googleCanonical: url,
    userCanonical: url,
    checkedAt: "2026-06-29 09:00:00",
    ...over,
  };
}

function storeOf(...rows: CoverageRow[]): Map<string, CoverageRow> {
  return new Map(rows.map((row) => [row.url, row]));
}

describe("summarizeCoverage", () => {
  it("counts a page nobody has asked about as pending, not as missing", () => {
    const result = summarizeCoverage(["https://a.test/"], new Map());

    expect(result).toMatchObject({ pending: 1, indexed: 0, notIndexed: 0 });
  });

  it("splits indexed from not indexed on Google's verdict", () => {
    const result = summarizeCoverage(
      ["https://a.test/in", "https://a.test/out"],
      storeOf(
        checked("https://a.test/in"),
        checked("https://a.test/out", {
          verdict: "NEUTRAL",
          coverageState: "Crawled - currently not indexed",
        }),
      ),
    );

    expect(result).toMatchObject({ indexed: 1, notIndexed: 1, pending: 0 });
  });

  // A failed check is not an answer, so the URL stays in the queue rather
  // than being counted as "Google says no".
  it("leaves an errored check pending", () => {
    const result = summarizeCoverage(
      ["https://a.test/"],
      storeOf(checked("https://a.test/", { error: "quota" })),
    );

    expect(result).toMatchObject({ pending: 1, notIndexed: 0 });
  });

  // Google picking a different canonical is the quiet reason a page earns
  // nothing, so it is counted rather than left for someone to spot in a table.
  it("counts the pages where Google chose a different canonical", () => {
    const result = summarizeCoverage(
      ["https://a.test/dup"],
      storeOf(
        checked("https://a.test/dup", {
          userCanonical: "https://a.test/dup",
          googleCanonical: "https://a.test/original",
        }),
      ),
    );

    expect(result.canonicalMismatches).toBe(1);
  });

  it("reports the newest check as the stamp", () => {
    const result = summarizeCoverage(
      ["https://a.test/a", "https://a.test/b"],
      storeOf(
        checked("https://a.test/a", { checkedAt: "2026-06-01 09:00:00" }),
        checked("https://a.test/b", { checkedAt: "2026-06-20 09:00:00" }),
      ),
    );

    expect(result.lastCheckedAt).toBe("2026-06-20 09:00:00");
  });
});

describe("selectDueUrls", () => {
  it("asks about nothing when every page was checked recently", () => {
    const result = selectDueUrls(
      ["https://a.test/"],
      storeOf(checked("https://a.test/")),
      NOW,
    );

    expect(result.batch).toEqual([]);
  });

  it("asks again once a check has aged out", () => {
    const result = selectDueUrls(
      ["https://a.test/"],
      storeOf(checked("https://a.test/", { checkedAt: "2026-05-01 09:00:00" })),
      NOW,
    );

    expect(result.batch).toEqual(["https://a.test/"]);
  });

  // The daily quota is the whole reason this is batched; a crawl of 200 pages
  // must not become 200 API calls behind one click.
  it("caps a run and reports what is left", () => {
    const urls = Array.from(
      { length: 40 },
      (_, index) => `https://a.test/${index}`,
    );

    const result = selectDueUrls(urls, new Map(), NOW);

    expect(result.batch).toHaveLength(25);
    expect(result.remaining).toBe(15);
  });
});
