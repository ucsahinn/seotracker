import { t } from "@/shared/i18n";

/**
 * A placeholder shaped like what is coming, so the page does not jump when
 * it arrives. Screens used to draw a stack of identical `h-10` bars whatever
 * the content was, which says "loading" and nothing about what.
 *
 * Variants
 *   metric  a row of four KPI tiles (label, number)
 *   table   a header line and `rows` table rows
 *   form    `rows` label + field pairs and a button
 *   chart   a title line and a plot area
 *   list    `rows` two-line list items
 * The wrapper is `aria-busy` with one sr-only "Yükleniyor" so a screen reader
 * hears that something is on its way, not a dozen empty boxes.
 */
type Variant = "metric" | "table" | "form" | "chart" | "list";

export function Skeleton({
  variant,
  rows = 5,
  className = "",
}: {
  variant: Variant;
  rows?: number;
  className?: string;
}) {
  return (
    <div className={className} aria-busy="true">
      <span className="sr-only" role="status">
        {t("Yükleniyor")}
      </span>
      <div aria-hidden>{shape(variant, rows)}</div>
    </div>
  );
}

function shape(variant: Variant, rows: number) {
  const lines = Array.from({ length: rows }, (_, index) => index);
  switch (variant) {
    case "metric":
      return (
        <div className="grid grid-cols-2 divide-x divide-y divide-base-300 overflow-hidden rounded-box border border-base-300 bg-base-100 lg:grid-cols-4 lg:divide-y-0">
          {[0, 1, 2, 3].map((index) => (
            <div key={index} className="flex flex-col gap-2.5 px-5 py-4">
              <div className="skeleton h-3 w-20" />
              <div className="skeleton h-7 w-24" />
            </div>
          ))}
        </div>
      );
    case "table":
      return (
        <div className="flex flex-col gap-2">
          <div className="skeleton h-4 w-1/3" />
          {lines.map((index) => (
            <div key={index} className="flex items-center gap-4 py-1.5">
              <div className="skeleton h-4 flex-1" />
              <div className="skeleton h-4 w-16" />
              <div className="skeleton h-4 w-16" />
            </div>
          ))}
        </div>
      );
    case "form":
      return (
        <div className="flex flex-col gap-4">
          {lines.map((index) => (
            <div key={index} className="flex flex-col gap-1.5">
              <div className="skeleton h-3 w-24" />
              <div className="skeleton h-10" />
            </div>
          ))}
          <div className="skeleton h-9 w-28 self-end" />
        </div>
      );
    case "chart":
      return (
        <div className="flex flex-col gap-3">
          <div className="skeleton h-4 w-40" />
          <div className="skeleton h-56" />
        </div>
      );
    case "list":
      return (
        <div className="flex flex-col gap-3">
          {lines.map((index) => (
            <div key={index} className="flex flex-col gap-1.5 py-1">
              <div className="skeleton h-4 w-3/5" />
              <div className="skeleton h-3 w-2/5" />
            </div>
          ))}
        </div>
      );
  }
}
