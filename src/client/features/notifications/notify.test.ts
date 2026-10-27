import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { setNotificationPrefs } from "./prefs";
import { clearNotifications, getNotifications } from "./store";
import { notify, setNotificationNavigator } from "./notify";

const { toastError, toastSuccess, desktopNotice, playTone } = vi.hoisted(
  () => ({
    toastError: vi.fn(),
    toastSuccess:
      vi.fn<
        (title: string, options?: { action?: { onClick: () => void } }) => void
      >(),
    desktopNotice: vi.fn(),
    playTone: vi.fn(),
  }),
);

vi.mock("sonner", () => ({
  toast: { error: toastError, success: toastSuccess },
}));

vi.mock("@/client/lib/sound", () => ({ playTone }));

class FakeNotification {
  static permission = "granted";

  constructor(title: string, options: NotificationOptions) {
    desktopNotice(title, options);
  }
}

describe("in-app notifications", () => {
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

  it("shows app notifications in the in-app toast and never opens an OS popup", () => {
    setNotificationPrefs({ desktop: true }); // Legacy preference must be ignored.

    notify({ kind: "announcement", title: "New notice", importance: "low" });

    expect(toastSuccess).toHaveBeenCalledWith("New notice", expect.anything());
    expect(desktopNotice).not.toHaveBeenCalled();
  });

  it("keeps background-tab events in the bell without creating browser popups", () => {
    vi.stubGlobal("document", { visibilityState: "hidden" });

    notify({
      kind: "announcement",
      title: "New survey",
      importance: "high",
      dedupeKey: "announcement:survey-background",
    });

    expect(toastSuccess).not.toHaveBeenCalled();
    expect(desktopNotice).not.toHaveBeenCalled();
    expect(getNotifications()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: "New survey" }),
      ]),
    );
  });

  it("plays the app's success tone for an important notification without an OS popup", () => {
    setNotificationPrefs({ desktop: true, sound: true });

    notify({
      kind: "announcement",
      title: "Security update",
      importance: "high",
      dedupeKey: "announcement:security-test",
    });

    expect(desktopNotice).not.toHaveBeenCalled();
    expect(playTone).toHaveBeenCalledWith("success");
  });

  it("opens the linked app screen when the in-app toast action is clicked", () => {
    const navigate = vi.fn();
    setNotificationNavigator(navigate);
    setNotificationPrefs({ desktop: true });

    notify({
      kind: "announcement",
      title: "New product update",
      href: "/announcements",
      importance: "high",
      dedupeKey: "announcement:click-test",
    });
    toastSuccess.mock.lastCall?.[1]?.action?.onClick();

    expect(navigate).toHaveBeenCalledWith("/announcements");
    expect(desktopNotice).not.toHaveBeenCalled();
  });
});
