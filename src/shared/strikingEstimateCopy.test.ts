import { expect, it } from "vitest";
import { strikingEstimateText } from "./strikingEstimateCopy";
it("keeps absent, mixed and measured-zero upper bounds distinct instead of printing an invented total", () => {
  expect(strikingEstimateText()).toContain("hesaplanamadı");
  expect(
    strikingEstimateText({
      knownGainCount: 1,
      unknownGainCount: 2,
      knownGainSum: 0,
      complete: false,
    }),
  ).toContain("2 sorguda hesaplanamadı");
  expect(
    strikingEstimateText({
      knownGainCount: 1,
      unknownGainCount: 0,
      knownGainSum: 0,
      complete: true,
    }),
  ).toContain("en fazla 0 ek tıklama");
});
