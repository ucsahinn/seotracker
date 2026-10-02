import { describe, expect, it, vi } from "vitest";
import { refreshState } from "@/client/lib/refreshState";

const query = (dataUpdatedAt: number, isFetching = false) => ({
  refetch: vi.fn().mockResolvedValue(undefined),
  isFetching,
  dataUpdatedAt,
});

describe("refreshState", () => {
  it("refetches every query, is busy if any is, and reports the oldest load", () => {
    const a = query(2000);
    const b = query(1000, true);
    const never = query(0);
    const state = refreshState([a, b, never]);
    state.onRefresh();
    expect([a, b, never].every((q) => q.refetch.mock.calls.length === 1)).toBe(
      true,
    );
    expect(state.isFetching).toBe(true);
    expect(state.dataUpdatedAt).toBe(1000);
  });

  it("reports 0 when nothing has loaded", () => {
    expect(refreshState([query(0)]).dataUpdatedAt).toBe(0);
  });
});
