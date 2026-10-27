import * as React from "react";
import { useLiveAnnouncements } from "./useLiveAnnouncements";
import { useReadAnnouncementIds } from "./readState";
import { notify } from "@/client/features/notifications/notify";
import { useLocale } from "@/shared/i18n";
import { getAnnouncementText } from "@/shared/announcement";

export function AnnouncementNotifications() {
  const { data = [], isSuccess } = useLiveAnnouncements();
  const notifiedIds = React.useRef<Set<string>>(new Set());
  const readIds = useReadAnnouncementIds();
  const locale = useLocale();

  React.useEffect(() => {
    if (!isSuccess) return;
    for (const item of data) {
      if (notifiedIds.current.has(item.id)) continue;
      if (readIds.includes(item.id)) continue;
      notifiedIds.current.add(item.id);
      const content = getAnnouncementText(item, locale);
      notify({
        kind: "announcement",
        title: content.title,
        body: content.body,
        href: "/announcements",
        // All announcement categories are operator-relevant; keep alerts in-app.
        importance: "high",
        dedupeKey: `announcement:${item.id}`,
      });
    }
  }, [data, isSuccess, locale, readIds]);

  return null;
}
