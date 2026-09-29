import { ArrowDown, ArrowUp } from "lucide-react";
import { HeaderHelpLabel } from "@/client/features/saved-keywords/components";

type SortableColumn = {
  getIsSorted: () => false | "asc" | "desc";
  getToggleSortingHandler: () => ((event: unknown) => void) | undefined;
};

export function SortableHeader({
  column,
  label,
  helpText,
  align,
}: {
  column: SortableColumn;
  label: string;
  helpText?: string;
  align?: "left" | "right";
}) {
  const sorted = column.getIsSorted();
  const content = (
    <button
      type="button"
      /*
       * `min-h-6` and the negative margin: the label's own line box is 17px
       * tall, which is under the 24 CSS px WCAG 2.2 SC 2.5.8 asks of a
       * target. The padding grows the hit area without moving the text, and
       * the margin takes the space back out of the header row so the table
       * does not get taller.
       */
      className="-my-1 inline-flex min-h-6 items-center gap-1 py-1 font-medium transition-colors hover:text-base-content"
      onClick={column.getToggleSortingHandler()}
      /* Direction lives in `aria-sort` on the cell; this names the action. */
      aria-label={
        sorted === "asc"
          ? `${label} sütununa göre sırala (şu an artan)`
          : sorted === "desc"
            ? `${label} sütununa göre sırala (şu an azalan)`
            : `${label} sütununa göre sırala`
      }
    >
      {helpText ? <HeaderHelpLabel label={label} helpText={helpText} /> : label}
      {sorted === "asc" ? (
        <ArrowUp className="size-3 shrink-0" />
      ) : sorted === "desc" ? (
        <ArrowDown className="size-3 shrink-0" />
      ) : null}
    </button>
  );

  if (align === "right") {
    return <span className="flex w-full justify-end">{content}</span>;
  }

  return content;
}
