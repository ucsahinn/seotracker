import { toast } from "sonner";
import { playTone } from "@/client/lib/sound";
import { t } from "@/shared/i18n";
import { getNotificationPrefs } from "./prefs";
import {
  addNotification,
  markNotificationRead,
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

/**
 * The single way the app tells the operator something happened.
 *
 * Every event is stored for the bell and shown as an in-app toast while the
 * app is visible. OS/browser notifications are intentionally never created,
 * so the same event cannot appear as overlapping popups. High importance
 * events also play a short tone when sounds are on. A repeat of a stored
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
  // The bell history is kept even when the app is in a background tab. Only
  // the app's own popup is shown, and only while its interface is visible
  // and the operator is not already looking at what it announces.
  if (!hidden && options.toast !== false) showToast(item);

  if (item.importance === "high" && prefs.sound) {
    playTone(ERROR_KINDS.has(item.kind) ? "error" : "success");
  }
  return item;
}
