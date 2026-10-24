import { act, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { SettingsIndex } from "./SettingsIndex";

afterEach(() => {
  window.location.hash = "";
  vi.unstubAllGlobals();
});
it("keeps the requested section selected when the previous section still intersects", () => {
  let notify: IntersectionObserverCallback | undefined;
  const observer = {
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
    takeRecords: () => [],
    root: null,
    rootMargin: "",
    thresholds: [],
  };
  vi.stubGlobal(
    "IntersectionObserver",
    function Observer(callback: IntersectionObserverCallback) {
      notify = callback;
      return observer;
    },
  );
  window.location.hash = "windows";
  render(
    <>
      <SettingsIndex />
      <section id="bildirimler" />
      <section id="windows" />
    </>,
  );
  const previous = document.getElementById("bildirimler");
  const current = document.getElementById("windows");
  if (!previous || !current) throw new Error("Missing fixture sections");
  act(() =>
    notify?.(
      [
        {
          target: previous,
          isIntersecting: true,
          boundingClientRect: new DOMRect(),
          intersectionRatio: 1,
          intersectionRect: new DOMRect(),
          rootBounds: null,
          time: 0,
        },
        {
          target: current,
          isIntersecting: true,
          boundingClientRect: new DOMRect(),
          intersectionRatio: 1,
          intersectionRect: new DOMRect(),
          rootBounds: null,
          time: 0,
        },
      ],
      observer,
    ),
  );
  expect(
    screen.getByRole("link", { name: "Windows" }).getAttribute("aria-current"),
  ).toBe("location");
});
