import { useId, useState } from "react";
import { Bell, CheckCheck, X } from "lucide-react";
import { Modal } from "@/client/components/Modal";
import { formatCount, formatDateTime } from "@/shared/format";
import { t } from "@/shared/i18n";
import { openNotification } from "./notify";
import { markAllNotificationsRead, useNotifications } from "./store";

export function NotificationBell({ onNavigate }: { onNavigate?: () => void }) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const items = useNotifications();
  const unread = items.filter((item) => !item.read).length;
  return (
    <>
      <button
        type="button"
        className="flex w-full items-center gap-2.5 rounded-field px-3 py-2 text-sm text-muted hover:bg-base-300/30 hover:text-base-content"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label={t("Bildirimler ({count} okunmamış)", { count: unread })}
      >
        <Bell className="size-4 shrink-0" aria-hidden />
        <span>{t("Bildirimler")}</span>
        {unread > 0 && (
          <span className="badge badge-primary badge-sm ml-auto">
            {formatCount(unread)}
          </span>
        )}
      </button>
      {open && (
        <Modal
          onClose={() => setOpen(false)}
          labelledBy={titleId}
          maxWidth="max-w-lg"
        >
          <div className="flex items-center justify-between gap-3">
            <h2 id={titleId} className="text-lg font-semibold">
              {t("Bildirimler")}
            </h2>
            <button
              type="button"
              className="btn btn-ghost btn-circle btn-sm"
              onClick={() => setOpen(false)}
              aria-label={t("Kapat")}
            >
              <X className="size-4" />
            </button>
          </div>
          <button
            type="button"
            className="btn btn-ghost btn-sm my-3"
            disabled={unread === 0}
            onClick={markAllNotificationsRead}
          >
            <CheckCheck className="size-4" />
            {t("Tümünü okundu işaretle")}
          </button>
          {items.length === 0 ? (
            <p className="py-8 text-sm text-muted">
              {t(
                "Henüz bildirim yok. İşlemler tamamlandığında burada görünür.",
              )}
            </p>
          ) : (
            <ul className="max-h-[60dvh] overflow-y-auto divide-y divide-[var(--hairline)]">
              {items.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className="w-full rounded-field px-3 py-3 text-left hover:bg-base-200"
                    onClick={() => {
                      openNotification(item);
                      if (item.href) {
                        setOpen(false);
                        onNavigate?.();
                      }
                    }}
                  >
                    <span className="flex items-start gap-2">
                      <span
                        className={`mt-1.5 size-2 shrink-0 rounded-full ${item.read ? "bg-base-300" : "bg-primary"}`}
                        aria-label={item.read ? t("Okundu") : t("Okunmamış")}
                      />
                      <span className="min-w-0">
                        <span
                          className={`block text-sm ${item.read ? "text-muted" : "font-medium"}`}
                        >
                          {item.title}
                        </span>
                        {item.body && (
                          <span className="block break-words text-sm text-muted">
                            {item.body}
                          </span>
                        )}
                        <time
                          className="mt-1 block text-xs text-subtle"
                          dateTime={item.createdAt}
                        >
                          {formatDateTime(item.createdAt)}
                        </time>
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Modal>
      )}
    </>
  );
}
