import { CheckCheck } from "lucide-react";
import { PageHeader, PageShell } from "@/client/components/PageShell";
import { FactStrip } from "@/client/components/FactStrip";
import { formatCount } from "@/shared/format";
import { t } from "@/shared/i18n";
import { NotificationHistory } from "./NotificationHistory";
import { markAllNotificationsRead, useNotifications } from "./store";

export function NotificationsPage() {
  const items = useNotifications();
  const unread = items.filter((item) => !item.read).length;
  return (
    <PageShell width="reading">
      <PageHeader
        title={t("Bildirimler")}
        actions={
          <a href="/settings#bildirimler" className="btn btn-sm">
            {t("Bildirim ayarları")}
          </a>
        }
      />
      <FactStrip
        label={t("Bildirimler")}
        facts={[{ label: t("Kaynak"), value: t("Bu tarayıcı") }]}
        detailsLabel={t("Ayrıntılar")}
        details={
          <p>
            {t(
              "Bildirim geçmişi bu tarayıcıda saklanır. Denetim sonuçları, yeni sürümler ve bağlantı sorunları burada görünür.",
            )}
          </p>
        }
      />
      <div className="space-y-2">
        {unread > 0 ? (
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-muted" role="status">
              {t("{count} okunmamış", { count: formatCount(unread) })}
            </p>
            <button
              type="button"
              className="btn btn-sm"
              onClick={markAllNotificationsRead}
            >
              <CheckCheck className="size-4" aria-hidden />
              {t("Tümünü okundu işaretle")}
            </button>
          </div>
        ) : null}
        <NotificationHistory framed />
      </div>
    </PageShell>
  );
}
