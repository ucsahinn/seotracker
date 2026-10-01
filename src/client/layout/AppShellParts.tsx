import {
  useEffect,
  useRef,
  type KeyboardEvent as ReactKeyboardEvent,
  type RefObject,
} from "react";
import { Sidebar } from "@/client/components/Sidebar";

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
  const panel = useRef<HTMLDivElement>(null);
  // Read through a ref so a new onClose identity on each parent render does
  // not re-run the effect below and steal focus back to the panel.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const opener = openerRef.current;
    panel.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseRef.current();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      opener?.focus();
    };
  }, [open, openerRef]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <button
        type="button"
        tabIndex={-1}
        aria-label="Kenar çubuğunu kapat"
        className="absolute inset-0 bg-black/45"
        onClick={onClose}
      />
      <div
        ref={panel}
        id={MOBILE_DRAWER_ID}
        role="dialog"
        aria-modal="true"
        aria-label="Ana menü"
        tabIndex={-1}
        onKeyDown={keepTabInside}
        className="absolute left-0 top-0 h-full shadow-xl focus:outline-none"
      >
        <Sidebar projectId={projectId} onNavigate={onClose} onClose={onClose} />
      </div>
    </div>
  );
}
