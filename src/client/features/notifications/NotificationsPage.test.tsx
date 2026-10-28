import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, expect, it } from "vitest";
import { NotificationsPage } from "./NotificationsPage";
import { addNotification, clearNotifications, getNotifications } from "./store";
import { setLocale } from "@/shared/i18n";

beforeEach(() => {
  setLocale("tr");
  clearNotifications();
});
it("explains an empty browser history and links to notification settings", () => {
  render(<NotificationsPage />);
  expect(screen.getByRole("heading", { name: "Bildirimler" })).toBeTruthy();
  expect(
    screen.getByText(/Bildirim geçmişi bu tarayıcıda saklanır/),
  ).toBeTruthy();
  expect(
    screen
      .getByRole("link", { name: "Bildirim ayarları" })
      .getAttribute("href"),
  ).toBe("/settings#bildirimler");
});
it("marks a stored event read without removing it from the page", () => {
  addNotification({
    kind: "report",
    title: "Denetim tamamlandı",
    importance: "low",
  });
  render(<NotificationsPage />);
  fireEvent.click(screen.getByRole("button", { name: /Denetim tamamlandı/ }));
  expect(getNotifications()[0].read).toBe(true);
  expect(screen.getByText("Denetim tamamlandı")).toBeTruthy();
});
