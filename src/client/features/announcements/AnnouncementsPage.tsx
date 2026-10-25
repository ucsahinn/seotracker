import { useEffect } from "react";
import { Megaphone, RefreshCw } from "lucide-react";
import { EmptyState } from "@/client/components/EmptyState";
import { PageHeader, PageShell } from "@/client/components/PageShell";
import { markNotificationsReadByDedupeKeys } from "@/client/features/notifications/store";
import { formatDateTime } from "@/shared/format";
import { t, useLocale, type Locale } from "@/shared/i18n";
import {
  getAnnouncementText,
  type PublicAnnouncement,
} from "@/shared/announcement";
import { useLiveAnnouncements } from "./useLiveAnnouncements";
import { markAnnouncementsRead, useReadAnnouncementIds } from "./readState";

const CATEGORY_LABELS = {
  product: "Ürün yeniliği",
  maintenance: "Bakım",
  security: "Güvenlik",
  release: "Sürüm",
} as const;

const CATEGORY_STYLES = {
  product: "badge-primary",
  maintenance: "badge-warning",
  security: "badge-error",
  release: "badge-info",
} as const;
const EMPTY_ANNOUNCEMENTS: PublicAnnouncement[] = [];

export function AnnouncementsPage() {
  const query = useLiveAnnouncements();
  const readIds = useReadAnnouncementIds();
  const locale = useLocale();
  const announcements = query.data ?? EMPTY_ANNOUNCEMENTS;
  const unreadIds = announcements
    .filter((item) => !readIds.includes(item.id))
    .map((item) => item.id);

  useEffect(() => {
    if (!announcements.length) return;
    markAnnouncementsRead(announcements.map((item) => item.id));
    markNotificationsReadByDedupeKeys(
      announcements.map((item) => `announcement:${item.id}`),
    );
  }, [announcements, readIds]);

  return (
    <PageShell width="reading">
      <PageHeader
        title={t("Duyurular")}
        description={t(
          "seowatcher ekibinden ürün, bakım ve güvenlik güncellemeleri.",
        )}
        actions={
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => void query.refetch()}
            disabled={query.isFetching}
          >
            <RefreshCw
              className={`size-4 ${query.isFetching ? "animate-spin" : ""}`}
              aria-hidden
            />
            {t("Yenile")}
          </button>
        }
      />

      {query.isPending ? (
        <div className="space-y-3" aria-busy="true">
          {[0, 1, 2].map((key) => (
            <div
              key={key}
              className="h-32 animate-pulse rounded-box bg-base-200"
            />
          ))}
        </div>
      ) : query.isError ? (
        <section
          className="rounded-box border border-[var(--hairline)] bg-base-200 p-6"
          role="status"
        >
          <h2 className="font-semibold">{t("Duyurular şu anda alınamıyor")}</h2>
          <p className="mt-1 text-sm text-muted">
            {t("Bağlantınızı kontrol edip yeniden deneyin.")}
          </p>
          <button
            type="button"
            className="btn btn-primary btn-sm mt-4"
            onClick={() => void query.refetch()}
            disabled={query.isFetching}
          >
            {t("Yeniden dene")}
          </button>
        </section>
      ) : announcements.length === 0 ? (
        <EmptyState
          icon={Megaphone}
          title={t("Şimdilik yeni duyuru yok")}
          description={t("Yeni bir duyuru yayımlandığında burada görünecek.")}
        />
      ) : (
        <ul className="space-y-3" aria-label={t("Duyurular")}>
          {announcements.map((item) => (
            <AnnouncementCard
              key={item.id}
              announcement={item}
              locale={locale}
              unread={unreadIds.includes(item.id)}
            />
          ))}
        </ul>
      )}
    </PageShell>
  );
}

function AnnouncementCard({
  announcement,
  locale,
  unread,
}: {
  announcement: PublicAnnouncement;
  locale: Locale;
  unread: boolean;
}) {
  const { title, body } = getAnnouncementText(announcement, locale);
  return (
    <li
      className={`rounded-box border bg-base-200 p-4 sm:p-5 ${unread ? "border-primary/50" : "border-[var(--hairline)]"}`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`badge badge-sm ${CATEGORY_STYLES[announcement.category]}`}
        >
          {t(CATEGORY_LABELS[announcement.category])}
        </span>
        {unread ? (
          <span className="text-xs font-medium text-primary">{t("Yeni")}</span>
        ) : null}
        <time
          className="ml-auto text-xs text-subtle"
          dateTime={announcement.publish_at}
        >
          {formatDateTime(announcement.publish_at)}
        </time>
      </div>
      <h2 className="mt-3 text-base font-semibold text-base-content">
        {title}
      </h2>
      <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-relaxed text-muted">
        {body}
      </p>
    </li>
  );
}
