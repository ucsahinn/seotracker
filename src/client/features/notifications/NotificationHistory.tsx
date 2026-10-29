import { EmptyState } from "@/client/components/EmptyState";
import { ArrowRight, Bell, ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import { formatDateTime } from "@/shared/format";
import { t } from "@/shared/i18n";
import { openNotification } from "./notify";
import { useNotifications, type AppNotification } from "./store";

/**
 * Past this many characters a body may run beyond two lines, so the row gets
 * a "full text" toggle. The clamp itself is CSS on the whole text: a cut by
 * character count stopped mid-sentence at a different place on every width.
 */
const LONG_BODY = 100;

/** Shared history for the bell dialog and its directly addressable page. */
export function NotificationHistory({
  onNavigate,
  framed = false,
}: {
  onNavigate?: () => void;
  /** On the page the rows sit in a panel; the bell dialog is the panel. */
  framed?: boolean;
}) {
  const items = useNotifications();
  if (items.length === 0) {
    return (
      <EmptyState
        icon={Bell}
        title={t("Henüz bildirim yok")}
        description={t(
          "Henüz bildirim yok. Bir denetim tamamlandığında veya önemli bir güncelleme olduğunda burada görünür.",
        )}
      />
    );
  }
  return (
    <ul
      className={`divide-y divide-[var(--hairline)] ${
        framed
          ? "overflow-hidden rounded-box border border-[var(--hairline)] bg-base-100"
          : ""
      }`}
    >
      {items.map((item) => (
        <NotificationRow key={item.id} item={item} onNavigate={onNavigate} />
      ))}
    </ul>
  );
}

function NotificationRow({
  item,
  onNavigate,
}: {
  item: AppNotification;
  onNavigate?: () => void;
}) {
  const long =
    item.kind === "announcement" && !!item.body && item.body.length > LONG_BODY;
  const [expanded, setExpanded] = useState(false);
  const bodyId = useId();
  return (
    <li>
      <button
        type="button"
        className="w-full px-3 py-3 text-left transition-colors hover:bg-base-200 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
        onClick={() => {
          openNotification(item);
          if (item.href) onNavigate?.();
        }}
      >
        <span className="flex items-start gap-2.5">
          <span
            className={`mt-1.5 size-2 shrink-0 rounded-full ${item.read ? "bg-base-300" : "bg-primary"}`}
            aria-label={item.read ? t("Okundu") : t("Okunmamış")}
          />
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-baseline justify-between gap-x-3">
              <span
                className={`min-w-0 break-words text-sm ${item.read ? "text-muted" : "font-medium"}`}
              >
                {item.title}
              </span>
              <time
                className="shrink-0 text-xs text-subtle"
                dateTime={item.createdAt}
              >
                {formatDateTime(item.createdAt)}
              </time>
            </span>
            {item.body ? (
              <span
                id={bodyId}
                className={`mt-1 block max-w-prose break-words text-sm leading-relaxed text-muted ${
                  long && !expanded
                    ? "notification-preview line-clamp-2"
                    : "whitespace-pre-wrap"
                }`}
              >
                {item.body}
              </span>
            ) : null}
          </span>
        </span>
      </button>
      {item.kind === "announcement" && (long || item.href) ? (
        // One action row: the toggle and the link sit side by side
        // instead of a disclosure stacked over a button.
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 px-3 pb-3 pl-[1.875rem]">
          {long ? (
            <button
              type="button"
              className="btn btn-ghost btn-sm min-h-11 gap-1.5"
              aria-expanded={expanded}
              aria-controls={bodyId}
              onClick={() => setExpanded((value) => !value)}
            >
              <ChevronDown
                className={`size-3.5 transition-transform ${expanded ? "rotate-180" : ""}`}
                aria-hidden
              />
              {t("Tam metin")}
            </button>
          ) : null}
          {item.href ? (
            <button
              type="button"
              className="btn btn-sm min-h-11 gap-1.5"
              onClick={() => {
                openNotification(item);
                onNavigate?.();
              }}
            >
              {t("Duyuruyu oku")}
              <ArrowRight className="size-3.5" aria-hidden />
            </button>
          ) : null}
        </div>
      ) : null}
    </li>
  );
}
