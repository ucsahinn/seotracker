import * as React from "react";
import { useLiveAnnouncements } from "./useLiveAnnouncements";
import { useReadAnnouncementIds } from "./readState";
import { notify } from "@/client/features/notifications/notify";
import { useLocale } from "@/shared/i18n";
import { getAnnouncementText } from "@/shared/announcement";

export function AnnouncementNotifications() {
  const { data = [], isSuccess } = useLiveAnnouncements();
  const previouslyVisible = React.useRef<Set<string> | null>(null);
  const readIds = useReadAnnouncementIds();
  const locale = useLocale();

  React.useEffect(() => {
    if (!isSuccess) return;
    if (previouslyVisible.current === null) {
      previouslyVisible.current = new Set(data.map((item) => item.id));
      return;
    }
    for (const item of data) {
      if (previouslyVisible.current.has(item.id)) continue;
      if (readIds.includes(item.id)) continue;
      const content = getAnnouncementText(item, locale);
      notify({
        kind: "announcement",
        title: content.title,
        body: content.body,
        href: "/announcements",
        importance: "low",
        dedupeKey: `announcement:${item.id}`,
      });
    }
    previouslyVisible.current = new Set(data.map((item) => item.id));
  }, [data, isSuccess, locale, readIds]);

  return null;
}
