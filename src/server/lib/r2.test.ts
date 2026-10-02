import { describe, expect, it, vi } from "vitest";
import { deleteManyFromR2 } from "./r2";

const r2 = vi.hoisted(() => ({
  delete: vi.fn<(keys: string[]) => Promise<void>>(),
}));
vi.mock("cloudflare:workers", () => ({ env: { R2: r2 } }));

describe("deleteManyFromR2", () => {
  it("sends at most 1000 keys per delete call", async () => {
    const keys = Array.from({ length: 2500 }, (_, i) => `k${i}`);

    await deleteManyFromR2(keys);

    expect(r2.delete.mock.calls.map(([chunk]) => chunk.length)).toEqual([
      1000, 1000, 500,
    ]);
  });
});
