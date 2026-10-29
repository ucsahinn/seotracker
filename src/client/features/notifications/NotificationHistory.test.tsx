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
  const full = screen.getByText(body.trim());
  expect(full.closest("details")?.open).toBe(false);
  expect(
    container.querySelector(".notification-preview")?.textContent?.length,
  ).toBeLessThanOrEqual(181);
  expect(screen.getByRole("button", { name: "Duyuruyu oku" })).toBeTruthy();
  fireEvent.click(screen.getByText("Tam metin"));
  expect(full.closest("details")?.open).toBe(true);
});
