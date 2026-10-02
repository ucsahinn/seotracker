import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useDebouncedUrlSearch } from "@/client/features/search-performance/useDebouncedUrlSearch";

describe("useDebouncedUrlSearch", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("keeps every keystroke locally and commits once after typing stops", () => {
    const onCommit = vi.fn();
    const { result } = renderHook(() => useDebouncedUrlSearch("", onCommit));
    for (const text of ["g", "gü", "gül"]) {
      act(() => result.current[1](text));
      act(() => void vi.advanceTimersByTime(100));
    }
    expect(result.current[0]).toBe("gül");
    expect(onCommit).not.toHaveBeenCalled();
    act(() => void vi.advanceTimersByTime(300));
    expect(onCommit).toHaveBeenCalledExactlyOnceWith("gül");
  });

  it("adopts an outside change to the URL", () => {
    const { result, rerender } = renderHook(
      ({ url }) => useDebouncedUrlSearch(url, vi.fn()),
      { initialProps: { url: "gül" } },
    );
    rerender({ url: "" });
    expect(result.current[0]).toBe("");
  });
});
