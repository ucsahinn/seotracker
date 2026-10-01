import { ChevronDown, Download, Loader2, X } from "lucide-react";
import type { ReactNode } from "react";
import { PortalMenu } from "@/client/components/PortalMenu";

export function TableBulkActionBar({
  selectedCount,
  // The UI is Turkish; this default rendered "12 selected" in it.
  selectedLabel = "seçili",
  actions,
  onClear,
  placement = "fixed",
}: {
  selectedCount: number;
  selectedLabel?: string;
  actions: ReactNode;
  onClear: () => void;
  placement?: "fixed" | "inline";
}) {
  if (selectedCount === 0) return null;

  const wrapperClass =
    placement === "fixed"
      ? "pointer-events-none fixed inset-x-0 bottom-6 z-30 flex justify-center px-4"
      : "flex justify-center";
  const toolbarClass =
    placement === "fixed"
      ? "pointer-events-auto flex items-stretch overflow-visible rounded-box border border-base-content/15 bg-base-300/85 shadow-2xl backdrop-blur"
      : "flex items-stretch overflow-visible rounded-box border border-base-content/15 bg-base-200";

  return (
    <div className={wrapperClass}>
      {/* Announced, because this bar materialises at the bottom of the
          screen the moment a row is checked -- a keyboard user got six new
          actions with nothing saying they had appeared. */}
      <div
        role="toolbar"
        aria-label="Toplu işlemler"
        aria-live="polite"
        className={toolbarClass}
      >
        <div className="flex items-center gap-2 border-r border-base-content/10 px-3 py-2 text-sm">
          <button
            type="button"
            aria-label="Seçimi kaldır"
            className="-ml-1 rounded-field p-1 text-muted hover:bg-base-content/10 hover:text-base-content"
            onClick={onClear}
          >
            <X className="size-3.5" />
          </button>
          <span className="font-medium tabular-nums">{selectedCount}</span>
          <span className="text-muted">{selectedLabel}</span>
        </div>
        {actions}
      </div>
    </div>
  );
}

export function TableBulkActionButton({
  icon,
  children,
  onClick,
  disabled,
  variant = "default",
}: {
  icon?: ReactNode;
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: "default" | "danger";
}) {
  const color =
    variant === "danger"
      ? "text-error hover:bg-error/10"
      : "text-muted hover:bg-base-content/10";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-1.5 rounded-field px-2.5 py-1.5 text-sm disabled:opacity-50 ${color}`}
    >
      {icon}
      {children}
    </button>
  );
}

export function TableBulkExportMenu({
  actions,
  busy,
}: {
  actions: Array<{
    label: ReactNode;
    icon?: ReactNode;
    onClick: () => void;
    disabled?: boolean;
  }>;
  busy?: boolean;
}) {
  // Same move as `TableExportMenu`: the CSS dropdown had no `aria-expanded`,
  // no Escape, and lived inside a clipping ancestor.
  return (
    <PortalMenu
      ariaLabel="Seçili satırları dışa aktar"
      triggerClassName="inline-flex items-center gap-1.5 rounded-field px-2.5 py-1.5 text-sm text-muted hover:bg-base-content/10 disabled:opacity-50"
      triggerContent={
        <>
          {busy ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <Download className="size-3.5" />
          )}
          Dışa aktar
          <ChevronDown className="size-3 opacity-60" />
        </>
      }
      menuClassName="w-52"
    >
      {(close) =>
        actions.map((action, index) => (
          <li key={index}>
            <button
              type="button"
              role="menuitem"
              disabled={busy || action.disabled}
              onClick={() => {
                close();
                action.onClick();
              }}
            >
              {action.icon}
              {action.label}
            </button>
          </li>
        ))
      }
    </PortalMenu>
  );
}

export function TableExportMenu({
  actions,
  buttonClassName = "btn btn-sm gap-1",
  menuClassName = "w-56",
  triggerIcon,
}: {
  actions: Array<{
    label: ReactNode;
    icon?: ReactNode;
    onClick: () => void;
    disabled?: boolean;
  }>;
  buttonClassName?: string;
  menuClassName?: string;
  /** Replaces the download glyph — a spinner while an export is running. */
  triggerIcon?: ReactNode;
}) {
  /*
   * Through `PortalMenu` rather than a daisyUI CSS dropdown.
   *
   * Two problems, both of which that component already solves. It carried no
   * `aria-expanded`, no Escape handler and no `role="menuitem"` on its items,
   * so nothing announced whether it was open. And it rendered inside the
   * table's `overflow-hidden rounded-box` wrapper -- on a table with no rows
   * the card is about 110px tall, so a menu opening below the button was cut
   * off with no way to scroll to it. `PortalMenu` renders fixed, through a
   * portal, and closes on outside click, Escape, scroll and resize.
   */
  return (
    <PortalMenu
      ariaLabel="Dışa aktarma seçenekleri"
      triggerClassName={buttonClassName}
      triggerContent={
        <>
          {triggerIcon ?? <Download className="size-4" />}
          Dışa aktar
          <ChevronDown className="size-3 opacity-60" />
        </>
      }
      menuClassName={menuClassName}
    >
      {(close) =>
        actions.map((action, index) => (
          <li key={index}>
            <button
              type="button"
              role="menuitem"
              disabled={action.disabled}
              // Close first: the action can navigate or open a modal, and a
              // menu left mounted over it has to be dismissed by hand.
              onClick={() => {
                close();
                action.onClick();
              }}
            >
              {action.icon}
              {action.label}
            </button>
          </li>
        ))
      }
    </PortalMenu>
  );
}
