import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { NotificationSettings } from "./NotificationSettings";
import { setNotificationPrefs } from "./prefs";
import { clearNotifications, getNotifications } from "./store";

const { desktopNotice, playTone, toastSuccess, toastError } = vi.hoisted(
  () => ({
    desktopNotice:
      vi.fn<(title: string, options: NotificationOptions) => void>(),
    playTone: vi.fn(),
    toastSuccess: vi.fn(),
    toastError: vi.fn(),
  }),
);

vi.mock("sonner", () => ({
  toast: { success: toastSuccess, error: toastError },
}));
vi.mock("@/client/lib/sound", () => ({
  previewTone: vi.fn(),
  playTone,
}));

class FakeNotification {
  static permission = "granted";

  constructor(title: string, options: NotificationOptions) {
    desktopNotice(title, options);
  }

  addEventListener() {}

  close() {}
}

beforeEach(() => {
  clearNotifications();
  setNotificationPrefs({ desktop: true, sound: true });
  desktopNotice.mockClear();
  playTone.mockClear();
  vi.stubGlobal("Notification", FakeNotification);
});

afterEach(() => vi.unstubAllGlobals());

it("tests the in-app popup and sound without sending a Windows notification", () => {
  render(<NotificationSettings />);
  expect(screen.queryByText("Windows ve sistem bildirimleri")).toBeNull();

  fireEvent.click(
    screen.getByRole("button", { name: "Uygulama bildirimini dene" }),
  );

  expect(toastSuccess).toHaveBeenCalledWith(
    "Uygulama bildirimi testi",
    expect.anything(),
  );
  expect(desktopNotice).not.toHaveBeenCalled();
  expect(playTone).toHaveBeenCalledWith("success");
  expect(
    getNotifications().some(
      (item) => item.title === "Uygulama bildirimi testi",
    ),
  ).toBe(true);
});
