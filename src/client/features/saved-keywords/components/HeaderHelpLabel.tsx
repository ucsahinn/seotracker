import { createPortal } from "react-dom";
import {
  FloatingTooltip,
  useFloatingTooltip,
} from "@/client/components/FloatingTooltip";

/** A table header label with a hover/focus tooltip explaining the column. */
export function HeaderHelpLabel({
  label,
  helpText,
  delayMs = 150,
}: {
  label: string;
  helpText: string;
  delayMs?: number;
}) {
  const tooltip = useFloatingTooltip<HTMLSpanElement>({ delayMs });

  return (
    <span
      ref={tooltip.triggerRef}
      className="relative inline-flex items-center"
      onMouseEnter={tooltip.scheduleOpen}
      onMouseLeave={tooltip.scheduleClose}
      onFocus={tooltip.scheduleOpen}
      onBlur={tooltip.close}
      onKeyDown={(e) => {
        if (e.key === "Escape") tooltip.close();
      }}
      aria-describedby={tooltip.isOpen ? tooltip.tooltipId : undefined}
    >
      <span>{label}</span>
      {tooltip.isOpen && typeof document !== "undefined"
        ? createPortal(
            <FloatingTooltip
              id={tooltip.tooltipId}
              position={tooltip.position}
              {...tooltip.hoverBridge}
            >
              {helpText}
            </FloatingTooltip>,
            document.body,
          )
        : null}
    </span>
  );
}
