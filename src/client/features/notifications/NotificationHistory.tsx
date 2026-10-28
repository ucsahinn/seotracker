import { formatDateTime } from "@/shared/format";
import { t } from "@/shared/i18n";
import { openNotification } from "./notify";
import { useNotifications } from "./store";

/** Shared history for the bell dialog and its directly addressable page. */
export function NotificationHistory({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const items = useNotifications();
  return (
    <>
      {items.length === 0 ? (
        <p className="py-8 text-sm text-muted">
          {t(
            "Henüz bildirim yok. Bir denetim tamamlandığında veya önemli bir güncelleme olduğunda burada görünür.",
          )}
        </p>
      ) : (
        <ul className="divide-y divide-[var(--hairline)]">
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className="w-full rounded-field px-3 py-3 text-left hover:bg-base-200"
                onClick={() => {
                  openNotification(item);
                  if (item.href) onNavigate?.();
                }}
              >
                <span className="flex items-start gap-2">
                  <span
                    className={`mt-1.5 size-2 shrink-0 rounded-full ${item.read ? "bg-base-300" : "bg-primary"}`}
                    aria-label={item.read ? t("Okundu") : t("Okunmamış")}
                  />
                  <span className="min-w-0">
                    <span
                      className={`block break-words text-sm ${item.read ? "text-muted" : "font-medium"}`}
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
    </>
  );
}
