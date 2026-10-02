import type { LucideIcon } from "lucide-react";
import { PortalMenu } from "@/client/components/PortalMenu";

type RowAction = {
  label: string;
  icon: LucideIcon;
  onSelect: () => void;
  /** Deletes and the like: rendered in the error colour. */
  destructive?: boolean;
  /** Present but unavailable, with the reason as its tooltip. */
  disabledReason?: string;
};

/**
 * The kebab menu at the end of a row.
 *
 * Three tables had grown their own copy of the same twelve lines —
 * `PortalMenu`, an `<li>`, a button, `close()` then the handler — and each
 * had drifted a little: one coloured its delete, one did not, one forgot to
 * close before acting, which left the menu hanging over the confirm dialog
 * it had just opened. Closing first is the part worth having in one place.
 */
export function RowActions({
  label,
  actions,
  triggerClassName,
}: {
  /** Names the row, so screen readers get "Actions for <this row>". */
  label: string;
  actions: RowAction[];
  /** Overrides the compact default trigger, e.g. a larger touch target. */
  triggerClassName?: string;
}) {
  const usable = actions.filter(Boolean);
  if (usable.length === 0) return null;

  return (
    <PortalMenu
      ariaLabel={label}
      triggerClassName={triggerClassName}
      menuClassName="w-56"
    >
      {(close) => (
        <>
          {usable.map((action) => (
            <li key={action.label}>
              <button
                type="button"
                className={
                  action.destructive ? "text-[var(--ink-error)]" : undefined
                }
                disabled={Boolean(action.disabledReason)}
                title={action.disabledReason}
                onClick={() => {
                  // Close first. A menu left open over the dialog its own
                  // item just opened swallows the first click on it.
                  close();
                  action.onSelect();
                }}
              >
                <action.icon className="size-3.5" aria-hidden />
                {action.label}
              </button>
            </li>
          ))}
        </>
      )}
    </PortalMenu>
  );
}
