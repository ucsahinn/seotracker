import * as React from "react";
import { useLiveAnnouncements } from "./useLiveAnnouncements";
import { useReadAnnouncementIds } from "./readState";
import { notify } from "@/client/features/notifications/notify";
import { useLocale } from "@/shared/i18n";
import { getAnnouncementText } from "@/shared/announcement";

export function AnnouncementNotifications() {
  const { data = [] } = useLiveAnnouncements();
  const readIds = useReadAnnouncementIds();
  const locale = useLocale();

  React.useEffect(() => {
    for (const item of data) {
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
  }, [data, locale, readIds]);

  return null;
}
