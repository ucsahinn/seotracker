import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, expect, it } from "vitest";
import { NotificationHistory } from "./NotificationHistory";
import { addNotification, clearNotifications } from "./store";
beforeEach(clearNotifications);
it("C32 gives long announcements a short preview and keeps the full body reachable", () => {
  const body = "Release notes. ".repeat(60);
  addNotification({
    kind: "announcement",
    title: "Version update",
    body,
    href: "/announcements",
    importance: "low",
  });
  const { container } = render(<NotificationHistory />);
  const text = container.querySelector(".notification-preview");
  // The whole body, clamped by CSS - not a character cut mid-sentence.
  expect(text?.textContent).toBe(body);
  expect(text?.className).toContain("line-clamp-2");
  expect(screen.getByRole("button", { name: "Duyuruyu oku" })).toBeTruthy();
  const toggle = screen.getByRole("button", { name: "Tam metin" });
  fireEvent.click(toggle);
  expect(toggle.getAttribute("aria-expanded")).toBe("true");
  expect(container.querySelector(".notification-preview")).toBeNull();
});
