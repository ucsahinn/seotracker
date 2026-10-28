import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { setNotificationPrefs } from "./prefs";
import {
  clearNotifications,
  getNotifications,
  markNotificationRead,
} from "./store";
import { setLocale } from "@/shared/i18n";
import { notify, setNotificationNavigator } from "./notify";

const { toastError, toastSuccess, desktopNotice, playTone } = vi.hoisted(
  () => ({
    toastError:
      vi.fn<
        (title: string, options?: { action?: { onClick: () => void } }) => void
      >(),
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
    if (typeof document !== "undefined") {
      Object.defineProperty(document, "visibilityState", {
        value: "visible",
        configurable: true,
      });
      document.dispatchEvent(new Event("visibilitychange"));
    }
    setLocale("tr");
    vi.unstubAllGlobals();
  });

  function backgroundTab() {
    const tab = new EventTarget();
    let visibilityState = "hidden";
    Object.defineProperty(tab, "visibilityState", {
      get: () => visibilityState,
      configurable: true,
    });
    vi.stubGlobal("document", tab);
    return (state = "visible") => {
      visibilityState = state;
      tab.dispatchEvent(new Event("visibilitychange"));
    };
  }

  it.each([1, 2])(
    "shows %i missed events once with their normal actions and severity",
    (count) => {
      const changeVisibility = backgroundTab();
      const navigate = vi.fn();
      setNotificationNavigator(navigate);
      for (let i = 0; i < count; i++) {
        notify({
          kind: "error",
          title: `Failure ${i}`,
          href: "/settings",
          importance: "low",
          dedupeKey: `failure:${i}`,
        });
      }
      expect(toastError).not.toHaveBeenCalled();
      changeVisibility("hidden");
      expect(toastError).not.toHaveBeenCalled();
      changeVisibility();
      expect(toastError).toHaveBeenCalledTimes(count);
      expect(toastError).toHaveBeenCalledWith("Failure 0", expect.anything());
      toastError.mock.lastCall?.[1]?.action?.onClick();
      expect(navigate).toHaveBeenCalledWith("/settings");
      changeVisibility();
      expect(toastError).toHaveBeenCalledTimes(count);
    },
  );

  it("summarizes three or more missed events and opens the notifications list", () => {
    const changeVisibility = backgroundTab();
    const navigate = vi.fn();
    setNotificationNavigator(navigate);
    setLocale("en");
    for (let i = 0; i < 3; i++) {
      notify({ kind: "announcement", title: `Notice ${i}`, importance: "low" });
    }
    changeVisibility();
    expect(toastSuccess).toHaveBeenCalledTimes(1);
    expect(toastSuccess).toHaveBeenCalledWith(
      "3 notifications arrived while you were away",
      expect.anything(),
    );
    toastSuccess.mock.lastCall?.[1]?.action?.onClick();
    expect(navigate).toHaveBeenCalledWith("/notifications");
    changeVisibility();
    expect(toastSuccess).toHaveBeenCalledTimes(1);
  });

  it("skips read, deleted, suppressed and duplicate events on return", () => {
    const changeVisibility = backgroundTab();
    setNotificationPrefs({ sound: true });
    const read = notify({
      kind: "announcement",
      title: "Already read",
      importance: "high",
    })!;
    markNotificationRead(read.id);
    notify(
      { kind: "audit-completed", title: "Watching audit", importance: "high" },
      { toast: false },
    );
    const input = {
      kind: "announcement",
      title: "Unread",
      importance: "low",
      dedupeKey: "unread",
    } as const;
    notify(input);
    notify(input);
    changeVisibility();
    expect(toastSuccess).toHaveBeenCalledTimes(1);
    expect(playTone).not.toHaveBeenCalled();
    expect(toastSuccess).toHaveBeenCalledWith("Unread", expect.anything());
    changeVisibility("hidden");
    notify({ kind: "announcement", title: "Deleted", importance: "low" });
    clearNotifications();
    changeVisibility();
    expect(toastSuccess).toHaveBeenCalledTimes(1);
  });

  it("defers hidden-event tones and plays at most once per flush", () => {
    const changeVisibility = backgroundTab();
    setNotificationPrefs({ sound: true });
    notify({ kind: "announcement", title: "Important", importance: "high" });
    notify({ kind: "error", title: "Failure", importance: "high" });
    expect(playTone).not.toHaveBeenCalled();
    changeVisibility();
    expect(playTone).toHaveBeenCalledTimes(1);
    expect(playTone).toHaveBeenCalledWith("error");
    changeVisibility();
    expect(playTone).toHaveBeenCalledTimes(1);
  });

  it("respects sound being disabled before return", () => {
    const changeVisibility = backgroundTab();
    setNotificationPrefs({ sound: true });
    notify({ kind: "error", title: "Failure", importance: "high" });
    setNotificationPrefs({ sound: false });
    changeVisibility();
    expect(playTone).not.toHaveBeenCalled();
  });

  it("shows app notifications in the in-app toast and never opens an OS popup", () => {
    setNotificationPrefs({ desktop: true }); // Legacy preference must be ignored.

    notify({ kind: "announcement", title: "New notice", importance: "low" });

    expect(toastSuccess).toHaveBeenCalledWith("New notice", expect.anything());
    expect(desktopNotice).not.toHaveBeenCalled();
  });

  it("keeps background-tab events in the bell without creating browser popups", () => {
    backgroundTab();

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
