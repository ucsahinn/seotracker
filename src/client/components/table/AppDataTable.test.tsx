import { describe, expect, it } from "vitest";
import { selectRowLabel } from "./AppDataTable";

describe("selectRowLabel", () => {
  it("names the checkbox after the row's primary cell", () => {
    expect(selectRowLabel("seo araçları")).toBe("Satırı seç: seo araçları");
  });

  it("falls back to the plain label for a missing or blank name", () => {
    expect(selectRowLabel()).toBe("Satırı seç");
    expect(selectRowLabel("   ")).toBe("Satırı seç");
  });
});
