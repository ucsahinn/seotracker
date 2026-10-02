import { ProgressBar } from "@/client/components/ProgressBar";
import { formatCount } from "@/client/lib/format";
import { PROJECT_CONTEXT_SECTION_KEYS } from "@/types/schemas/projectContext";
import type { ProjectContextData } from "./shared";

/**
 * How many of the written sections are filled, plus the list sizes. Every
 * number comes from the context the page already loaded.
 */
export function SectionCompleteness({
  context,
}: {
  context: Pick<
    ProjectContextData,
    "missingSections" | "competitors" | "keyPages"
  >;
}) {
  const total = PROJECT_CONTEXT_SECTION_KEYS.length;
  const filled = total - context.missingSections.length;
  return (
    <div className="space-y-1.5">
      <ProgressBar
        label="Dolu bölüm"
        value={filled}
        max={total}
        state={filled === total ? "done" : "warning"}
        showCount
        showPercent={false}
      />
      <p className="text-xs text-muted">
        {formatCount(context.competitors.length)} rakip ·{" "}
        {formatCount(context.keyPages.length)} anahtar sayfa
      </p>
    </div>
  );
}
