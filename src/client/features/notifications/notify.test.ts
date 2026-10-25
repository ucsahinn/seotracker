import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { setNotificationPrefs } from "./prefs";
import { clearNotifications } from "./store";
import { notify } from "./notify";

const { toastError, toastSuccess, desktopNotice } = vi.hoisted(() => ({
  toastError: vi.fn(),
  toastSuccess: vi.fn(),
  desktopNotice: vi.fn(),
}));

vi.mock("sonner", () => ({
  toast: { error: toastError, success: toastSuccess },
}));

class FakeNotification {
  static permission = "granted";

  constructor(title: string, options: NotificationOptions) {
    desktopNotice(title, options);
  }

  addEventListener() {}

  close() {}
}

describe("notify system notifications", () => {
  beforeEach(() => {
    clearNotifications();
    setNotificationPrefs({ sound: false, desktop: false });
    desktopNotice.mockClear();
    toastError.mockClear();
    toastSuccess.mockClear();
    vi.stubGlobal("Notification", FakeNotification);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it.each([
    ["update", "A new update is available"],
    ["announcement", "New product announcement"],
  ] as const)(
    "sends %s to Windows when system notifications are enabled",
    (kind, title) => {
      setNotificationPrefs({ desktop: true });

      notify({ kind, title, importance: "low", dedupeKey: `${kind}:test` });

      expect(desktopNotice).toHaveBeenCalledWith(
        title,
        expect.objectContaining({ body: undefined }),
      );
    },
  );

  it("does not send a system notification when they are disabled", () => {
    notify({ kind: "announcement", title: "New notice", importance: "low" });

    expect(desktopNotice).not.toHaveBeenCalled();
  });
});
