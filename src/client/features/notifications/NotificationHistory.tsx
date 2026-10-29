import { EmptyState } from "@/client/components/EmptyState";
import { Bell } from "lucide-react";
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
        <EmptyState
          icon={Bell}
          title={t("Henüz bildirim yok")}
          description={t(
            "Henüz bildirim yok. Bir denetim tamamlandığında veya önemli bir güncelleme olduğunda burada görünür.",
          )}
        />
      ) : (
        <ul className="divide-y divide-[var(--hairline)]">
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className="w-full rounded-field px-3 py-4 text-left hover:bg-base-200 focus-visible:outline-2 focus-visible:outline-primary"
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
                      <span className="mt-1.5 block max-w-prose break-words text-sm leading-relaxed text-muted">
                        {item.kind === "announcement" &&
                        item.body.length > 180 ? (
                          <span className="notification-preview">
                            {item.body.slice(0, 180).trimEnd()}…
                          </span>
                        ) : (
                          item.body
                        )}
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
              {item.kind === "announcement" ? (
                <div className="space-y-1.5 px-3 pb-4">
                  {item.body && item.body.length > 180 ? (
                    <details className="max-w-prose text-sm text-muted">
                      <summary className="cursor-pointer py-2">
                        {t("Tam metin")}
                      </summary>
                      <p className="whitespace-pre-wrap break-words leading-relaxed">
                        {item.body}
                      </p>
                    </details>
                  ) : null}
                  {item.href ? (
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm min-h-11"
                      onClick={() => {
                        openNotification(item);
                        onNavigate?.();
                      }}
                    >
                      {t("Duyuruyu oku")}
                    </button>
                  ) : null}
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
