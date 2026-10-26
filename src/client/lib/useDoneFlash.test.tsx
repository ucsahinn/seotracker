import { act, renderHook } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { DONE_FLASH_MS, useDoneFlash } from "./useDoneFlash";

afterEach(() => {
  vi.useRealTimers();
});

it("flashes done for two seconds after success, and not after a failure", () => {
  vi.useFakeTimers();
  const { result, rerender } = renderHook(
    ({ pending, ok }) => useDoneFlash(pending, ok),
    { initialProps: { pending: false, ok: true } },
  );
  expect(result.current).toBe("idle");

  rerender({ pending: true, ok: true });
  expect(result.current).toBe("pending");
  rerender({ pending: false, ok: true });
  expect(result.current).toBe("done");
  act(() => {
    vi.advanceTimersByTime(DONE_FLASH_MS - 1);
  });
  expect(result.current).toBe("done");
  act(() => {
    vi.advanceTimersByTime(1);
  });
  expect(result.current).toBe("idle");

  rerender({ pending: true, ok: false });
  rerender({ pending: false, ok: false });
  expect(result.current).toBe("idle");
});
