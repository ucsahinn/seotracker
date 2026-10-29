import { CheckCheck } from "lucide-react";
import { PageHeader, PageShell } from "@/client/components/PageShell";
import { FactStrip } from "@/client/components/FactStrip";
import { t } from "@/shared/i18n";
import { NotificationHistory } from "./NotificationHistory";
import { markAllNotificationsRead, useNotifications } from "./store";

export function NotificationsPage() {
  const items = useNotifications();
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
      <div>
        <button
          type="button"
          className="btn btn-ghost btn-sm mb-3"
          disabled={!items.some((item) => !item.read)}
          onClick={markAllNotificationsRead}
        >
          <CheckCheck className="size-4" aria-hidden />
          {t("Tümünü okundu işaretle")}
        </button>
        <NotificationHistory />
      </div>
    </PageShell>
  );
}
