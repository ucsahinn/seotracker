import {
  useEffect,
  useRef,
  type KeyboardEvent as ReactKeyboardEvent,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import { Sidebar } from "@/client/components/Sidebar";
import { t } from "@/shared/i18n";

export const MOBILE_DRAWER_ID = "mobile-sidebar-drawer";

/** Wrap Tab / Shift+Tab at the panel's edges so focus never reaches the page behind. */
function keepTabInside(event: ReactKeyboardEvent<HTMLDivElement>) {
  if (event.key !== "Tab") return;
  const items = [
    ...event.currentTarget.querySelectorAll<HTMLElement>(
      "a[href], button:not(:disabled)",
    ),
  ];
  const first = items[0];
  const last = items[items.length - 1];
  if (!first || !last) return;
  const active = document.activeElement;
  if (event.shiftKey && (active === first || active === event.currentTarget)) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
  }
}

export function MobileSidebarDrawer({
  open,
  projectId,
  onClose,
  openerRef,
}: {
  open: boolean;
  projectId: string | null;
  onClose: () => void;
  /** The button that opened the drawer; gets focus back on close. */
  openerRef: RefObject<HTMLButtonElement | null>;
}) {
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  // Read through a ref so a new onClose identity on each parent render does
  // not re-run the effect below and steal focus back to the panel.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const opener = openerRef.current;
    const inerted: Element[] = [];
    for (const sibling of document.body.children) {
      if (sibling === root.current) continue;
      if (sibling.querySelector("[data-sonner-toaster]")) continue;
      if (sibling.hasAttribute("inert")) continue;
      sibling.setAttribute("inert", "");
      inerted.push(sibling);
    }
    panel.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !event.defaultPrevented)
        onCloseRef.current();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      for (const sibling of inerted) sibling.removeAttribute("inert");
      opener?.focus();
    };
  }, [open, openerRef]);

  if (!open) return null;

  return createPortal(
    <div ref={root} className="fixed inset-0 z-50 md:hidden">
      <button
        type="button"
        tabIndex={-1}
        aria-label={t("Kenar çubuğunu kapat")}
        className="absolute inset-0 bg-black/45"
        onClick={onClose}
      />
      <div
        ref={panel}
        id={MOBILE_DRAWER_ID}
        role="dialog"
        aria-modal="true"
        aria-label={t("Ana menü")}
        tabIndex={-1}
        onKeyDown={keepTabInside}
        className="absolute left-0 top-0 h-full shadow-xl focus:outline-none"
      >
        <Sidebar projectId={projectId} onNavigate={onClose} onClose={onClose} />
      </div>
    </div>,
    document.body,
  );
}
