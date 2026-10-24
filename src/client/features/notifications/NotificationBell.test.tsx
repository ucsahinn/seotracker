import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { NotificationBell } from "./NotificationBell";
import { addNotification, clearNotifications, getNotifications } from "./store";

it("opens stored events and marks them read without dismissing the history", () => {
  clearNotifications();
  addNotification({ kind: "report", title: "Ready", importance: "low" });
  render(<NotificationBell />);
  fireEvent.click(screen.getByRole("button", { name: /Bildirimler/ }));
  expect(screen.getByRole("dialog").textContent).toContain("Ready");
  fireEvent.click(
    screen.getByRole("button", { name: "Tümünü okundu işaretle" }),
  );
  expect(getNotifications().every((item) => item.read)).toBe(true);
  expect(screen.getByRole("dialog").textContent).toContain("Ready");
});

it("recovers from malformed persisted events", () => {
  clearNotifications();
  vi.stubGlobal("localStorage", {
    getItem: () => '[null,{"title":"broken"}]',
    setItem: vi.fn(),
  });
  expect(() =>
    addNotification({ kind: "report", title: "Ready", importance: "low" }),
  ).not.toThrow();
  expect(getNotifications()).toHaveLength(1);
  vi.unstubAllGlobals();
});
