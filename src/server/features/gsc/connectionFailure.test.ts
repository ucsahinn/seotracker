import { describe, expect, it, vi } from "vitest";

vi.mock("@/server/features/gsc/services/GscService", () => ({
  GscService: {},
  isExpectedGrantFailure: () => false,
  GscNotConnectedError: class GscNotConnectedError extends Error {},
}));

const { GscNotConnectedError } =
  await import("@/server/features/gsc/services/GscService");
const { optionalRows } = await import("./connectionFailure");

describe("optionalRows", () => {
  it("returns the rows on success", async () => {
    const rows = await optionalRows(Promise.resolve({ rows: [] }));
    expect(rows).toEqual([]);
  });

  it("swallows a non-connection failure so the report still loads", async () => {
    const rows = await optionalRows(Promise.reject(new Error("429")));
    expect(rows).toEqual([]);
  });

  it("rethrows connection failures so the connect card shows", async () => {
    await expect(
      optionalRows(Promise.reject(new GscNotConnectedError("not connected"))),
    ).rejects.toBeInstanceOf(GscNotConnectedError);
  });
});
