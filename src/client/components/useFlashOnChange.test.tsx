import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useFlashOnChange } from "./useFlashOnChange";

describe("useFlashOnChange", () => {
  it("flashes only when the value changes after mount", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useFlashOnChange(value),
      { initialProps: { value: "a" } },
    );
    expect(result.current).toEqual({ key: 0, className: "" });

    rerender({ value: "a" });
    expect(result.current).toEqual({ key: 0, className: "" });

    rerender({ value: "b" });
    expect(result.current).toEqual({ key: 1, className: "flash" });
  });
});

describe("useFlashOnChange on first arrival", () => {
  it("does not flash when a value replaces null", () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: string | null }) => useFlashOnChange(value),
      { initialProps: { value: null as string | null } },
    );
    rerender({ value: "a" });
    expect(result.current.className).toBe("");
    rerender({ value: "b" });
    expect(result.current.className).toBe("flash");
  });
});
