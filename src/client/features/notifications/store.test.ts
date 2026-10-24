import { expect, it } from "vitest";
import {
  NOTIFICATION_CAP,
  addNotification,
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead,
  markNotificationsReadByDedupeKeys,
} from "./store";

// Node has no localStorage, so this exercises the in-memory fallback the
// store also uses when a browser blocks storage.
it("caps the list, counts unread, marks read and drops duplicates", () => {
  for (let index = 0; index < NOTIFICATION_CAP + 5; index++) {
    addNotification({ kind: "report", title: `n${index}`, importance: "low" });
  }
  const list = getNotifications();
  expect(list).toHaveLength(NOTIFICATION_CAP);
  expect(list[0]?.title).toBe(`n${NOTIFICATION_CAP + 4}`);
  expect(list.filter((n) => !n.read)).toHaveLength(NOTIFICATION_CAP);

  markNotificationRead(list[0].id);
  expect(getNotifications().filter((n) => !n.read)).toHaveLength(
    NOTIFICATION_CAP - 1,
  );

  markAllNotificationsRead();
  expect(getNotifications().some((n) => !n.read)).toBe(false);

  const input = {
    kind: "update",
    title: "v2",
    importance: "high",
    dedupeKey: "update:2",
  } as const;
  expect(addNotification(input)).not.toBeNull();
  expect(addNotification(input)).toBeNull();

  addNotification({
    kind: "announcement",
    title: "Maintenance",
    importance: "low",
    dedupeKey: "announcement:notice-1",
  });
  markNotificationsReadByDedupeKeys(["announcement:notice-1"]);
  expect(
    getNotifications().find(
      (item) => item.dedupeKey === "announcement:notice-1",
    )?.read,
  ).toBe(true);
});
