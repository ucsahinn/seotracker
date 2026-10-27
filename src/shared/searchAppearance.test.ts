import { describe, expect, it } from "vitest";
import { appearanceLabel } from "./searchAppearance";

describe("appearanceLabel", () => {
  it("names known types and shows unknown ones as sent", () => {
    expect(appearanceLabel("FAQ_RICH_RESULT")).toBe("Sık sorulan sorular");
    expect(appearanceLabel("BRAND_NEW_THING")).toBe("BRAND_NEW_THING");
  });
});
