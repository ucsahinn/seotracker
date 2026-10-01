import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useReducedMotion } from "./useReducedMotion";

function mockMatchMedia(matches: boolean) {
  let listener: (() => void) | null = null;
  const list = {
    matches,
    addEventListener: (_: string, fn: () => void) => {
      listener = fn;
    },
    removeEventListener: () => {
      listener = null;
    },
  };
  vi.stubGlobal("matchMedia", () => list);
  return {
    set(next: boolean) {
      list.matches = next;
      listener?.();
    },
  };
}

describe("useReducedMotion", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("is true when the system asks for reduced motion", () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });

  it("is false without the preference", () => {
    mockMatchMedia(false);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });

  it("follows the preference when it changes", () => {
    const media = mockMatchMedia(false);
    const { result } = renderHook(() => useReducedMotion());
    act(() => media.set(true));
    expect(result.current).toBe(true);
  });
});
