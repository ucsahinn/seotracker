import { toast } from "sonner";
import { playTone } from "@/client/lib/sound";
import { t } from "@/shared/i18n";
import { getNotificationPrefs } from "./prefs";
import {
  addNotification,
  getNotifications,
  markNotificationRead,
  NOTIFICATION_CAP,
  type AppNotification,
  type NewNotification,
} from "./store";

type Navigate = (href: string) => void;

/* Set by the root once the router exists so toast actions stay in the app. */
let navigate: Navigate = (href) => window.location.assign(href);

export function setNotificationNavigator(next: Navigate): void {
  navigate = next;
}

export function openNotification(item: AppNotification): void {
  markNotificationRead(item.id);
  if (item.href) navigate(item.href);
}

const ERROR_KINDS = new Set<AppNotification["kind"]>([
  "audit-failed",
  "google-auth",
  "error",
]);

function showToast(item: AppNotification): void {
  const options = {
    description: item.body,
    action: item.href
      ? { label: t("Aç"), onClick: () => openNotification(item) }
      : undefined,
  };
  if (ERROR_KINDS.has(item.kind)) toast.error(item.title, options);
  else toast.success(item.title, options);
}

// Only eligible events from this page lifetime are replayed, never old history.
const pending = new Set<string>();

function flushMissedNotifications(): void {
  if (document.visibilityState !== "visible") return;
  document.removeEventListener("visibilitychange", flushMissedNotifications);
  const items = getNotifications().filter(
    (item) => pending.has(item.id) && !item.read,
  );
  pending.clear();
  if (items.length >= 3) {
    toast.success(
      t("Siz yokken {count} bildirim geldi", { count: items.length }),
      {
        action: {
          label: t("Bildirimler"),
          onClick: () => navigate("/notifications"),
        },
      },
    );
  } else {
    items.forEach(showToast);
  }
  const important = items.filter((item) => item.importance === "high");
  if (important.length && getNotificationPrefs().sound) {
    playTone(
      important.some((item) => ERROR_KINDS.has(item.kind))
        ? "error"
        : "success",
    );
  }
}

/**
 * The single way the app tells the operator something happened.
 *
 * Every event is stored for the bell. Eligible events received while hidden
 * are shown on return, individually or as a summary. OS/browser notifications
 * are intentionally never created, so the same event cannot appear as
 * overlapping popups. High importance events also play a short tone when
 * sounds are on. A repeat of a stored
 * `dedupeKey` does nothing at all.
 */
export function notify(
  input: NewNotification,
  options: { toast?: boolean } = {},
): AppNotification | null {
  const item = addNotification(input);
  if (!item) return null;

  const prefs = getNotificationPrefs();
  const hidden =
    typeof document !== "undefined" && document.visibilityState === "hidden";
  if (options.toast !== false) {
    if (hidden) {
      pending.add(item.id);
      // Match the bell's bound even if the tab stays hidden for a long time.
      if (pending.size > NOTIFICATION_CAP)
        pending.delete(pending.values().next().value!);
      document.addEventListener("visibilitychange", flushMissedNotifications);
    } else {
      showToast(item);
    }
  }

  if (!hidden && item.importance === "high" && prefs.sound) {
    playTone(ERROR_KINDS.has(item.kind) ? "error" : "success");
  }
  return item;
}
