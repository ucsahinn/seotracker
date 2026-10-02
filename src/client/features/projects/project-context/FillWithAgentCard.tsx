import { Sparkles } from "lucide-react";
import { CopyButton } from "@/client/components/CopyButton";
import { buildFillContextPrompt } from "./fillContextPrompt";
import type { ProjectContextSectionKey } from "@/types/schemas/projectContext";

/**
 * Hands the page's own work to an agent.
 *
 * Every section here says what belongs in it, and the empty-state note has
 * been telling people to "ask your agent" since this page shipped — without
 * saying what to ask. This is that sentence, with the project bound in and
 * the current state of the page attached, so the agent extends what is here
 * rather than replacing it.
 */
export function FillWithAgentCard({
  projectName,
  projectId,
  domain,
  missingSections,
  competitorCount,
  keyPageCount,
}: {
  projectName: string;
  projectId: string;
  domain?: string | null;
  missingSections: ProjectContextSectionKey[];
  competitorCount: number;
  keyPageCount: number;
}) {
  const isEmpty = missingSections.length === 4;
  const prompt = buildFillContextPrompt({
    projectName,
    projectId,
    domain,
    missingSections,
    competitorCount,
    keyPageCount,
  });

  return (
    <section className="rounded-box border border-base-300 bg-base-200/30 p-4">
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
        <div className="flex min-w-0 gap-3">
          <Sparkles className="mt-0.5 size-4 shrink-0 text-muted" aria-hidden />
          <div className="min-w-0 space-y-1">
            <h2 className="text-sm font-medium text-base-content">
              {isEmpty ? "Ajanınıza doldurtun" : "Ajanınıza gözden geçirtin"}
            </h2>
            <p className="max-w-prose text-sm text-muted">
              {isEmpty
                ? "İstemi kopyalayıp Claude Code ya da Codex'e yapıştırın. Ajan sitenizi ve ölçümleri okuyup taslak hazırlar; siz onaylamadan hiçbir şey kaydetmez ve sitedeki metinleri talimat saymaz."
                : "İstemi kopyalayıp ajana yapıştırın. Yazılı olanı sitenin bugünkü haliyle karşılaştırır, yalnızca yanlış olanı düzeltir ve kaydetmeden önce size sorar; sitedeki metinleri talimat saymaz."}
            </p>
          </div>
        </div>
        <CopyButton
          value={prompt}
          label="İstemi kopyala"
          successMessage="İstem kopyalandı"
        />
      </div>
    </section>
  );
}
