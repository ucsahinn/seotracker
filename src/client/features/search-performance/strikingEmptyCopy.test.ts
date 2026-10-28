import { expect, it } from "vitest";
import { strikingEmptyCopy } from "./strikingEmptyCopy";

it("explains the impression threshold rather than claiming no query ranks in the band", () => {
  const copy = strikingEmptyCopy({
    filtered: false,
    hasQueryData: true,
    segmentFiltered: false,
    minImpressions: 161,
    brandExcluded: true,
  });
  expect(copy.description).toContain("161");
  expect(copy.description).toContain("Marka");
  expect(copy.description).not.toContain("Hiçbir kelimeniz");
});

it("does not promise that withheld low-volume queries will arrive later", () => {
  const copy = strikingEmptyCopy({
    filtered: false,
    hasQueryData: false,
    segmentFiltered: false,
    minImpressions: 50,
    brandExcluded: false,
  });
  expect(copy.description).toContain("gizlilik");
  expect(copy.description).not.toContain("Veri gelince");
});
