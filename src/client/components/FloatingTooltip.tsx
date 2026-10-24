import type { ReactNode } from "react";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";

type Position = { top: number; left: number; below?: boolean };

export function FloatingTooltip({
  id,
  position,
  children,
  onPointerEnter,
  onPointerLeave,
}: {
  id: string;
  position: Position;
  children: ReactNode;
  /**
   * WCAG 1.4.13 (hoverable): the pointer may move from the trigger onto the
   * tooltip without it closing. Pass the hook's `hoverBridge` handlers.
   */
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
}) {
  const panel = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    const element = panel.current;
    if (!element) return;
    element.style.left = `${position.left}px`;
    element.style.top = `${position.top}px`;
    const rect = element.getBoundingClientRect();
    const edge = 8;
    const dx =
      rect.left < edge
        ? edge - rect.left
        : Math.min(0, window.innerWidth - edge - rect.right);
    const dy =
      rect.top < edge
        ? edge - rect.top
        : Math.min(0, window.innerHeight - edge - rect.bottom);
    // The anchor's estimate cannot know a translated or multiline panel's height.
    // Correct the measured box before paint, including short laptop windows.
    if (dx) element.style.left = `${position.left + dx}px`;
    if (dy) element.style.top = `${position.top + dy}px`;
  }, [position.left, position.top, position.below, children]);
  return (
    <span
      ref={panel}
      id={id}
      role="tooltip"
      className={`fixed z-[1000] w-max max-w-[min(16rem,calc(100vw-1rem))] max-h-[calc(100dvh-1rem)] overflow-y-auto [overflow-wrap:anywhere] -translate-x-1/2 rounded-field border border-base-300 bg-base-100 px-2.5 py-2 text-xs font-normal normal-case leading-snug text-base-content shadow-md ${
        position.below ? "" : "-translate-y-full"
      }`}
      style={{ left: position.left, top: position.top }}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </span>
  );
}

export function useFloatingTooltip<T extends HTMLElement>({
  delayMs = 150,
  enabled = true,
}: {
  delayMs?: number;
  enabled?: boolean;
} = {}) {
  const tooltipId = useId();
  const triggerRef = useRef<T | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });

  const updatePosition = () => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    /*
     * Clamped and flipped, because neither was happening.
     *
     * The panel is `max-w-64` centred on the trigger and translated fully
     * above it, so a trigger near the right edge pushed 128px off-screen
     * and one near the top clipped upward. Every settings help marker sits
     * right-aligned against a label, which is exactly the at-risk spot.
     */
    const HALF = 128;
    const EDGE = 8;
    const centre = rect.left + rect.width / 2;
    /*
     * On a viewport too narrow to hold the panel with a margin on both
     * sides, the two clamps below cross and `min` wins -- which pinned the
     * tip to one fixed spot regardless of which trigger opened it. There is
     * no position that satisfies both, so centre it and let it use the
     * width it has.
     */
    const room = window.innerWidth - 2 * (HALF + EDGE);
    const left =
      room <= 0
        ? window.innerWidth / 2
        : Math.min(
            Math.max(centre, HALF + EDGE),
            window.innerWidth - HALF - EDGE,
          );
    const fitsAbove = rect.top > 120;
    setPosition({
      top: fitsAbove ? rect.top - 8 : rect.bottom + 8,
      left,
      below: !fitsAbove,
    });
  };

  const clearOpenTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const open = () => {
    if (!enabled) return;
    updatePosition();
    setIsOpen(true);
  };

  const scheduleOpen = () => {
    if (!enabled) return;
    clearOpenTimeout();
    timeoutRef.current = setTimeout(() => {
      open();
      timeoutRef.current = null;
    }, delayMs);
  };

  const close = () => {
    clearOpenTimeout();
    setIsOpen(false);
  };

  // Leaving the trigger closes after a short grace period, which the tooltip
  // cancels by being entered. Without it the 8px gap would close it first.
  const scheduleClose = () => {
    clearOpenTimeout();
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      timeoutRef.current = null;
    }, 150);
  };

  useEffect(() => clearOpenTimeout, []);

  useEffect(() => {
    if (!isOpen) return;

    updatePosition();

    const handleReposition = () => updatePosition();
    window.addEventListener("resize", handleReposition);
    window.addEventListener("scroll", handleReposition, true);

    return () => {
      window.removeEventListener("resize", handleReposition);
      window.removeEventListener("scroll", handleReposition, true);
    };
  }, [isOpen]);

  return {
    close,
    hoverBridge: {
      onPointerEnter: clearOpenTimeout,
      onPointerLeave: scheduleClose,
    },
    isOpen,
    scheduleClose,
    open,
    position,
    scheduleOpen,
    tooltipId,
    triggerRef,
  };
}
