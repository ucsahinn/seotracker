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
