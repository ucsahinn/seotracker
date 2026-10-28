import { afterEach, expect, it } from "vitest";
import { formatCountry } from "@/shared/format";
import { setLocale } from "@/shared/i18n";

afterEach(() => setLocale("tr"));

it("names the real Search Console countries instead of exposing alpha-3 codes", () => {
  setLocale("tr");
  expect(["CRI", "LKA", "ZMB"].map(formatCountry)).toEqual([
    "Kosta Rika",
    "Sri Lanka",
    "Zambiya",
  ]);
  setLocale("en");
  expect(["CRI", "LKA", "ZMB"].map(formatCountry)).toEqual([
    "Costa Rica",
    "Sri Lanka",
    "Zambia",
  ]);
});
