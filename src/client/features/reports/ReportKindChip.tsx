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
  UNKNOWN_APP_KIND,
  kindLabel,
} from "@/client/features/reports/reportStats";
import { t } from "@/shared/i18n";

const KIND_ICONS: Record<string, LucideIcon> = {
  [AUDIT_EXPORT_KIND]: ClipboardCheck,
  "search-performance-export": FileText,
  "seo-audit": ClipboardCheck,
  "seo-check-in": ArrowLeftRight,
  "seo-triage": TrendingDown,
  [OTHER_KIND]: FileText,
  [UNKNOWN_APP_KIND]: FileText,
};

/** A report's kind as a small pill: an icon and its Turkish name. */
export function ReportKindChip({
  kind,
  isTemplate,
  wrap = false,
}: {
  kind: string;
  isTemplate: boolean;
  wrap?: boolean;
}) {
  const Icon = KIND_ICONS[kind] ?? (isTemplate ? LayoutTemplate : Sparkles);
  return (
    <span
      title={kindLabel(kind)}
      className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-[var(--hairline)] px-2 py-0.5 text-xs text-muted"
    >
      <Icon aria-hidden className="size-3.5 shrink-0" />
      <span className={wrap ? "min-w-0 whitespace-normal" : "truncate"}>
        {kind === UNKNOWN_APP_KIND ? t("Eski rapor") : kindLabel(kind)}
      </span>
    </span>
  );
}
