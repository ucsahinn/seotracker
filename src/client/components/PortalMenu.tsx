import type { KeyboardEvent as ReactKeyboardEvent, ReactNode } from "react";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MoreHorizontal } from "lucide-react";

/**
 * Kebab actions menu rendered through a portal in fixed position, so it can't
 * be clipped by overflow containers (scrollable tables, overflow-hidden
 * cards). Opens below or above the trigger within the viewport. Closes on outside click,
 * Escape, Tab, scroll, and resize.
 *
 * Keyboard: opening moves focus to the first item (the menu lives at the end
 * of <body>, so focus would otherwise stay on the trigger and the items would
 * be unreachable); arrows/Home/End move between items; Escape, Tab and
 * choosing an item return focus to the trigger. Callers pass plain
 * `<li><button/></li>` rows; the menu stamps the menu roles on them.
 */
const ITEM_SELECTOR = "button, a[href]";
const ENABLED_ITEM_SELECTOR = "button:not(:disabled), a[href]";

export function PortalMenu({
  ariaLabel,
  triggerClassName = "btn btn-ghost btn-xs btn-square",
  triggerContent = <MoreHorizontal className="size-3.5" />,
  menuClassName = "w-40",
  children,
}: {
  ariaLabel: string;
  triggerClassName?: string;
  triggerContent?: ReactNode;
  menuClassName?: string;
  /** Menu <li> items; call `close` before running an item's action. */
  children: (close: () => void) => ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLUListElement | null>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const menuId = useId();

  const closeAndRefocus = () => {
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  useLayoutEffect(() => {
    const menu = menuRef.current;
    const trigger = buttonRef.current;
    if (!isOpen || !menu || !trigger) return;
    const rect = trigger.getBoundingClientRect();
    const measured = menu.getBoundingClientRect();
    const margin = 8;
    const maxHeight = Math.max(0, window.innerHeight - margin * 2);
    const height = Math.min(measured.height, maxHeight);
    const below = rect.bottom + 4;
    const preferred =
      below + height <= window.innerHeight - margin
        ? below
        : rect.top - 4 - height;
    setPosition({
      top: Math.max(
        margin,
        Math.min(preferred, window.innerHeight - margin - height),
      ),
      left: Math.max(
        margin,
        Math.min(
          rect.right - measured.width,
          window.innerWidth - margin - measured.width,
        ),
      ),
    });
  }, [isOpen]);

  useEffect(() => {
    const menu = menuRef.current;
    if (!isOpen || !menu) return;
    for (const item of menu.querySelectorAll("li"))
      item.setAttribute("role", "none");
    for (const item of menu.querySelectorAll(ITEM_SELECTOR))
      if (!item.hasAttribute("role")) item.setAttribute("role", "menuitem");
    menu.querySelector<HTMLElement>(ENABLED_ITEM_SELECTOR)?.focus();
  }, [isOpen]);

  const moveFocus = (event: ReactKeyboardEvent<HTMLUListElement>) => {
    const items = [
      ...event.currentTarget.querySelectorAll<HTMLElement>(
        ENABLED_ITEM_SELECTOR,
      ),
    ];
    if (event.key === "Tab") {
      closeAndRefocus();
      return;
    }
    const current = items.findIndex((item) => item === document.activeElement);
    const target =
      event.key === "ArrowDown"
        ? (current + 1) % items.length
        : event.key === "ArrowUp"
          ? (current <= 0 ? items.length : current) - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? items.length - 1
              : null;
    if (target === null || items.length === 0) return;
    event.preventDefault();
    items[target]?.focus();
  };

  useEffect(() => {
    if (!isOpen) return;
    const closeOnOutsideClick = (event: MouseEvent) => {
      const target = event.target;
      if (
        target instanceof Node &&
        (buttonRef.current?.contains(target) ||
          menuRef.current?.contains(target))
      ) {
        return;
      }
      setIsOpen(false);
    };
    const close = () => setIsOpen(false);
    const closeOnScroll = (event: Event) => {
      // Scrolling inside the menu itself shouldn't dismiss it.
      const target = event.target;
      if (target instanceof Node && menuRef.current?.contains(target)) return;
      setIsOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeAndRefocus();
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    window.addEventListener("scroll", closeOnScroll, true);
    window.addEventListener("resize", close);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("scroll", closeOnScroll, true);
      window.removeEventListener("resize", close);
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={triggerClassName}
        aria-label={ariaLabel}
        aria-haspopup="menu"
        aria-controls={isOpen ? menuId : undefined}
        aria-expanded={isOpen}
        onClick={() => {
          const rect = buttonRef.current?.getBoundingClientRect();
          if (rect) setPosition({ top: rect.bottom + 4, left: rect.right });
          setIsOpen((open) => !open);
        }}
      >
        {triggerContent}
      </button>
      {isOpen && typeof document !== "undefined"
        ? createPortal(
            <ul
              ref={menuRef}
              id={menuId}
              role="menu"
              aria-label={ariaLabel}
              onKeyDown={moveFocus}
              className={`menu fixed z-[1000] rounded-box border border-base-300 bg-base-100 p-2 shadow-lg ${menuClassName}`}
              style={{
                top: position.top,
                left: position.left,
                maxHeight: Math.max(0, window.innerHeight - 16),
                maxWidth: Math.max(0, window.innerWidth - 16),
                overflowY: "auto",
                flexWrap: "nowrap",
              }}
            >
              {children(closeAndRefocus)}
            </ul>,
            document.body,
          )
        : null}
    </>
  );
}
