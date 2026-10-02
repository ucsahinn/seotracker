import {
  ArrowLeftRight,
  ClipboardCheck,
  FileText,
  LayoutTemplate,
  Sparkles,
  TrendingDown,
  type LucideIcon,
} from "lucide-react";
import {
  AUDIT_EXPORT_KIND,
  OTHER_KIND,
  kindLabel,
} from "@/client/features/reports/reportStats";

const KIND_ICONS: Record<string, LucideIcon> = {
  [AUDIT_EXPORT_KIND]: ClipboardCheck,
  "seo-audit": ClipboardCheck,
  "seo-check-in": ArrowLeftRight,
  "seo-triage": TrendingDown,
  [OTHER_KIND]: FileText,
};

/** A report's kind as a small pill: an icon and its Turkish name. */
export function ReportKindChip({
  kind,
  isTemplate,
}: {
  kind: string;
  isTemplate: boolean;
}) {
  const Icon = KIND_ICONS[kind] ?? (isTemplate ? LayoutTemplate : Sparkles);
  return (
    <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-base-300 px-2 py-0.5 text-xs text-muted">
      <Icon aria-hidden className="size-3.5 shrink-0" />
      <span className="truncate">{kindLabel(kind)}</span>
    </span>
  );
}
