import {
  useEffect,
  useRef,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

const FOCUSABLE =
  'a[href], button:not(:disabled), input:not(:disabled):not([type="hidden"]), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])';

/**
 * A modal dialog. Focus moves in on open, Tab is trapped, Escape calls
 * `onClose`, everything else on the page is made `inert`, and focus returns to
 * the opener on close.
 *
 * Not a native <dialog>.showModal(): that puts the dialog in the browser's top
 * layer, which would hide the sonner toasts several modals fire (validation,
 * save errors) behind it. The toaster is left out of the inert set instead.
 */
export function Modal({
  maxWidth = "max-w-sm",
  children,
  onClose,
  labelledBy,
}: {
  maxWidth?: string;
  children: ReactNode;
  onClose?: () => void;
  labelledBy?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!onClose) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || event.defaultPrevented) return;
      event.preventDefault();
      onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const opener = document.activeElement;
    const element = dialog.current;
    const inerted: Element[] = [];
    for (const sibling of document.body.children) {
      if (sibling === root.current) continue;
      if (sibling.querySelector("[data-sonner-toaster]")) continue;
      if (sibling.hasAttribute("inert")) continue;
      sibling.setAttribute("inert", "");
      inerted.push(sibling);
    }
    if (element && !element.contains(document.activeElement)) {
      (element.querySelector<HTMLElement>(FOCUSABLE) ?? element).focus();
    }
    return () => {
      for (const sibling of inerted) sibling.removeAttribute("inert");
      if (opener instanceof HTMLElement && opener.isConnected) opener.focus();
    };
  }, []);

  const trapTab = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;
    const items = [
      ...event.currentTarget.querySelectorAll<HTMLElement>(FOCUSABLE),
    ];
    const first = items[0];
    const last = items[items.length - 1];
    if (!first || !last) {
      event.preventDefault();
      return;
    }
    const active = document.activeElement;
    if (
      event.shiftKey &&
      (active === first || active === event.currentTarget)
    ) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return createPortal(
    <div
      ref={root}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <div
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        onKeyDown={trapTab}
        className={`card bg-base-100 border border-base-300 w-full ${maxWidth} max-h-full shadow-xl`}
      >
        <div className="card-body gap-4 overflow-y-auto">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
