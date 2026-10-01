import { HelpCircle } from "lucide-react";
import { createPortal } from "react-dom";
import {
  FloatingTooltip,
  useFloatingTooltip,
} from "@/client/components/FloatingTooltip";

/**
 * A "how do I do this?" marker beside a control.
 *
 * A real button, not a hoverable span. The pattern this grew out of
 * (`HeaderHelpLabel`) listened for `onFocus` on a `<span>` with no
 * `tabIndex`, so the handler could never fire and every explanation on that
 * screen was mouse-only. Here the trigger is focusable by construction,
 * opens on focus as well as hover, closes on Escape, and names itself for a
 * screen reader.
 *
 * The text is the instruction, not a restatement of the label: a tooltip
 * that says "API anahtarı: the API key" costs a hover and teaches nothing.
 */
export function HelpTip({
  label,
  children,
}: {
  label: string;
  children: string;
}) {
  const tooltip = useFloatingTooltip<HTMLButtonElement>({ delayMs: 120 });

  return (
    <>
      <button
        ref={tooltip.triggerRef}
        type="button"
        // Explanations are not actions: clicking one should not submit the
        // form it sits inside.
        aria-label={`${label} — nasıl yapılır`}
        aria-describedby={tooltip.isOpen ? tooltip.tooltipId : undefined}
        /*
         * 24px, not 16. WCAG 2.2 SC 2.5.8 sets the minimum target at 24
         * CSS px, and the spacing exception does not apply here: these sit
         * inline against a label and, on the project form, immediately
         * beside a focusable input. The negative margin keeps the 14px
         * glyph and the surrounding layout unchanged.
         */
        className="-m-1 inline-flex size-6 shrink-0 items-center justify-center rounded-full text-subtle transition-colors hover:text-base-content focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        onMouseEnter={tooltip.scheduleOpen}
        onMouseLeave={tooltip.scheduleClose}
        onFocus={tooltip.open}
        onBlur={tooltip.close}
        /*
         * Always open, never toggle. Hovering schedules an open after a
         * short delay, so a mouse user who hovers and then clicks was
         * toggling off an explanation that had just appeared -- and on
         * touch, where there is no hover, click is the only way in.
         * Closing is mouseleave, blur or Escape.
         */
        onClick={tooltip.open}
        onKeyDown={(event) => {
          if (event.key === "Escape") tooltip.close();
        }}
      >
        <HelpCircle className="size-3.5" aria-hidden />
      </button>
      {tooltip.isOpen && typeof document !== "undefined"
        ? createPortal(
            <FloatingTooltip
              id={tooltip.tooltipId}
              position={tooltip.position}
              {...tooltip.hoverBridge}
            >
              {children}
            </FloatingTooltip>,
            document.body,
          )
        : null}
    </>
  );
}

/** A section heading with its own explanation, for a settings block. */
export function SettingsHeading({
  title,
  help,
}: {
  title: string;
  help: string;
}) {
  return (
    <h2 className="flex items-center gap-1.5 text-sm font-medium text-muted">
      {title}
      <HelpTip label={title}>{help}</HelpTip>
    </h2>
  );
}
