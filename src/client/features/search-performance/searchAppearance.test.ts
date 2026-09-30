import { describe, expect, it } from "vitest";
import {
  appearanceLabel,
  appearanceSegments,
} from "@/client/features/search-performance/searchAppearance";

const row = (key: string, clicks: number, impressions = clicks * 10) => ({
  key,
  clicks,
  impressions,
});

describe("appearanceLabel", () => {
  it("names known types and shows unknown ones as sent", () => {
    expect(appearanceLabel("FAQ_RICH_RESULT")).toBe("Sık sorulan sorular");
    expect(appearanceLabel("BRAND_NEW_THING")).toBe("BRAND_NEW_THING");
  });
});

describe("appearanceSegments", () => {
  it("returns nothing when Google returned no rows", () => {
    expect(appearanceSegments([]).segments).toEqual([]);
  });

  it("sorts by clicks and drops zero-value rows", () => {
    const { metric, segments } = appearanceSegments([
      row("VIDEO", 2),
      row("REVIEW_SNIPPET", 9),
      row("BREADCRUMB", 0),
    ]);
    expect(metric).toBe("clicks");
    expect(segments.map((s) => s.key)).toEqual(["REVIEW_SNIPPET", "VIDEO"]);
  });

  it("falls back to impressions when nothing was clicked", () => {
    const { metric, segments } = appearanceSegments([
      row("VIDEO", 0, 40),
      row("BREADCRUMB", 0, 70),
    ]);
    expect(metric).toBe("impressions");
    expect(segments.map((s) => s.value)).toEqual([70, 40]);
  });

  it("pools the tail into one disabled segment", () => {
    const rows = ["A", "B", "C", "D", "E", "F", "G"].map((k, i) =>
      row(k, 10 - i),
    );
    const { segments } = appearanceSegments(rows);
    expect(segments).toHaveLength(6);
    expect(segments[5]).toMatchObject({ value: 5 + 4, disabled: true });
  });
});
