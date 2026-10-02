import * as React from "react";

/**
 * Fade-up on mount with a per-child delay (CSS only, via `.stagger`).
 *
 * Props
 *   stepMs     delay between children, default 40ms, capped at the 6th child
 *   className  layout classes for the container (grid, gap, ...)
 * Reduced motion: app.css switches the animation off.
 *
 * Example
 *   <Reveal className="grid gap-4 md:grid-cols-2">
 *     <CardA /><CardB />
 *   </Reveal>
 */
export function Reveal({
  children,
  stepMs = 40,
  className = "",
}: {
  children: React.ReactNode;
  stepMs?: number;
  className?: string;
}) {
  return (
    <div className={`stagger ${className}`.trim()}>
      {React.Children.map(children, (child, index) => (
        <div style={{ animationDelay: `${Math.min(index, 5) * stepMs}ms` }}>
          {child}
        </div>
      ))}
    </div>
  );
}
