import { describe, expect, it } from "vitest";
import {
  countPositionGroups,
  filterByPosition,
  indexPositions,
} from "./savedKeywordPositions";

const positions = indexPositions([
  { query: "ISPARTA otel", position: 2.4 },
  { query: "gül yağı", position: 10.4 },
  { query: "gül suyu", position: 14 },
  { query: "lavanta", position: 35 },
]);
const keywords = [
  "ısparta otel",
  "isparta otel",
  "gül yağı",
  "gül suyu",
  "lavanta",
  "hiç görünmeyen",
].map((keyword) => ({ keyword }));

describe("saved keyword positions", () => {
  it("matches by Turkish-lowercased text and keeps unranked keywords apart", () => {
    // Turkish "I" lower-cases to dotless "ı", so "ISPARTA otel" folds onto
    // "ısparta otel" and not onto the dotted "isparta otel".
    expect(countPositionGroups(keywords, positions)).toEqual({
      top3: 1,
      top10: 1,
      top20: 1,
      beyond: 1,
      none: 2,
      firstPage: 2,
    });
  });

  it("never files a keyword without data under a rank", () => {
    const none = filterByPosition(keywords, "none", positions);
    expect(none.map((row) => row.keyword)).toEqual([
      "isparta otel",
      "hiç görünmeyen",
    ]);
    expect(filterByPosition(keywords, null, positions)).toHaveLength(6);
  });
});
