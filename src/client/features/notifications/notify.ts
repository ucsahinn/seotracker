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

/*
 * Set by the root once the router exists, so a toast action or a click on a
 * desktop notification moves within the app instead of reloading it.
 */
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

function showDesktop(item: AppNotification): boolean {
  if (typeof Notification === "undefined") return false;
  if (Notification.permission !== "granted") return false;
  try {
    const desktop = new Notification(item.title, {
      body: item.body,
      icon: "/icon.svg",
      // The OS replaces rather than stacks the same event from two tabs.
      tag: item.dedupeKey ?? item.id,
    });
    desktop.addEventListener("click", () => {
      window.focus();
      openNotification(item);
      desktop.close();
    });
    return true;
  } catch {
    return false;
  }
}

/**
 * The single way the app tells the operator something happened.
 *
 * Every event is stored for the bell. A visible tab gets a toast; a hidden
 * one gets a system notification when the operator turned those on. High
 * importance events also play a short tone when sounds are on. A repeat of a
 * stored `dedupeKey` does nothing at all.
 */
export function notify(input: NewNotification): AppNotification | null {
  const item = addNotification(input);
  if (!item) return null;

  const prefs = getNotificationPrefs();
  const hidden =
    typeof document !== "undefined" && document.visibilityState === "hidden";
  if (!hidden) showToast(item);
  else if (!prefs.desktop || !showDesktop(item)) showToast(item);

  if (item.importance === "high" && prefs.sound) {
    playTone(ERROR_KINDS.has(item.kind) ? "error" : "success");
  }
  return item;
}
