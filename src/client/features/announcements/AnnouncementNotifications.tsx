import * as React from "react";
import { useLiveAnnouncements } from "./useLiveAnnouncements";
import { useReadAnnouncementIds } from "./readState";
import { notify } from "@/client/features/notifications/notify";
import { useLocale } from "@/shared/i18n";

export function AnnouncementNotifications() {
  const { data = [] } = useLiveAnnouncements();
  const readIds = useReadAnnouncementIds();
  const locale = useLocale();

  React.useEffect(() => {
    for (const item of data) {
      if (readIds.includes(item.id)) continue;
      notify({
        kind: "announcement",
        title: locale === "en" ? item.title_en : item.title_tr,
        body: locale === "en" ? item.body_en : item.body_tr,
        href: "/announcements",
        importance: "low",
        dedupeKey: `announcement:${item.id}`,
      });
    }
  }, [data, locale, readIds]);

  return null;
}
