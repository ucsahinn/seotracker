import { describe, expect, it, vi } from "vitest";
import { resolveFilteredRows } from "@/client/features/saved-keywords/savedKeywordsUtils";

describe("resolveFilteredRows", () => {
  it("exports the rows on screen when a position group narrows the table, even if that is none", async () => {
    const load = vi.fn().mockResolvedValue([]);
    await expect(resolveFilteredRows([], load)).resolves.toEqual([]);
    expect(load).not.toHaveBeenCalled();
  });

  it("falls back to the server filters when no position group is active", async () => {
    const load = vi.fn().mockResolvedValue([]);
    await resolveFilteredRows(null, load);
    expect(load).toHaveBeenCalledOnce();
  });
});
