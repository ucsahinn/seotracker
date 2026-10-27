import { describe, expect, it } from "vitest";
import { reportInventorySchema, reportSearchText } from "./reportInventory";
import { boundedReportTitle } from "./reportTitle";

describe("saved report contracts", () => {
  it("keeps Turkish I and İ distinct without treating percent as a wildcard", () => {
    expect(reportSearchText("İSTANBUL IŞIK %_")).toBe("istanbul ışık %_");
  });
  it("fits the storage code-unit limit without splitting a grapheme", () => {
    const title = boundedReportTitle("a".repeat(116) + "👨‍👩‍👧‍👦test");
    expect(title.length).toBeLessThanOrEqual(120);
    expect(title).toBe("a".repeat(116) + "…");
  });
  it("rejects unbounded offsets and chooses updated time as the default order", () => {
    expect(reportInventorySchema.parse({ projectId: "p" }).sort).toBe(
      "updatedAt",
    );
    expect(
      reportInventorySchema.safeParse({ projectId: "p", page: 0 }).success,
    ).toBe(false);
  });
});
