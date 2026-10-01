import * as React from "react";

/**
 * The frame every screen sits in.
 *
 * Nine different max-widths were in use, so the same content jumped between
 * 672px and 1280px as you moved through the app, and the dashboard left half
 * of a laptop screen empty. Two widths replace them, and the choice is about
 * what the screen holds rather than which file it lives in:
 *
 *   "wide"    tables, charts, dashboards. Fills the display.
 *   "reading" forms and prose. A 1344px-wide text field is not a feature.
 *   "fill"    one element that must own the height, such as the report
 *             viewer's iframe. It needs `h-full`, which the bottom padding
 *             and the centring max-width fight -- and the alternative was a
 *             fourth padding written out by hand in that one route, which is
 *             how the app got nine widths the first time.
 */
type ShellWidth = "wide" | "reading" | "fill";

const WIDTH_CLASS: Record<ShellWidth, string> = {
  wide: "max-w-(--container-page)",
  reading: "max-w-3xl",
  fill: "max-w-none h-full min-h-0",
};

export function PageShell({
  width = "wide",
  children,
}: {
  width?: ShellWidth;
  children: React.ReactNode;
}) {
  return (
    // The outer scroll container belongs to the app shell, not to this.
    <div
      className={
        width === "fill"
          ? "flex h-full min-h-0 flex-col px-4 py-5 md:px-8 md:py-7"
          : "px-4 py-5 pb-10 md:px-8 md:py-7"
      }
    >
      <div className={`mx-auto flex flex-col gap-6 ${WIDTH_CLASS[width]}`}>
        {children}
      </div>
    </div>
  );
}

/**
 * One page title treatment instead of five. `eyebrow` is for a parent screen
 * you can return to, not decoration; `actions` sits on the title's baseline so
 * the primary action is always in the same place.
 */
export function PageHeader({
  title,
  description,
  eyebrow,
  actions,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  eyebrow?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      {eyebrow}
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
        <div className="min-w-0 space-y-1">
          <h1 className="text-2xl font-semibold text-base-content [overflow-wrap:anywhere]">
            {title}
          </h1>
          {description ? (
            // A description that runs the full 1,300px of a wide page is read
            // as one line that never ends; ~75 characters is where the eye
            // can still find the next line.
            <p className="max-w-[75ch] text-sm text-muted">{description}</p>
          ) : null}
        </div>
        {actions ? (
          <div className="flex shrink-0 items-center gap-2">{actions}</div>
        ) : null}
      </div>
    </div>
  );
}
