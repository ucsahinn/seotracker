import { useState } from "react";
import {
  ChevronRight,
  Copy,
  Download,
  Lightbulb,
  ListFilter,
} from "lucide-react";
import { toast } from "sonner";
import { formatCount } from "@/client/lib/format";
import { downloadCsv } from "@/client/lib/csv";
import type { IssueSeverity } from "@/shared/audit-issues";
import { AffectedPageList } from "@/client/features/audit/results/AffectedPageList";
import {
  buildCopyText,
  buildCountLabel,
  buildIssueCsv,
  isSiteWide,
  issueCsvFilename,
} from "@/client/features/audit/results/issueAffected";
import type { IssueGroup } from "@/client/features/audit/results/issueGroups";

const ACTION_BUTTON =
  "btn btn-xs btn-ghost gap-1.5 border border-[var(--control-border)]";

const SEVERITY_DOT: Record<IssueSeverity, string> = {
  critical: "bg-error",
  warning: "bg-warning",
  info: "bg-base-content/30",
};

const SEVERITY_RULE: Record<IssueSeverity, string> = {
  critical: "border-l-error/60",
  warning: "border-l-warning/60",
  info: "border-l-base-content/20",
};

/**
 * One kind of problem, closed to a line and open to a card.
 *
 * Open, it answers the three things someone fixing it asks in order: why it
 * matters, what to do, and which pages. The actions sit above the list
 * because they act on all of it -- copy every address, or carry the whole set
 * to the Sayfalar tab, where the table can sort and filter it.
 */
export function IssueCard({
  group,
  defaultOpen = false,
  onShowPages,
}: {
  group: IssueGroup;
  defaultOpen?: boolean;
  /** Carries this problem's pages to the Sayfalar tab as a filter. */
  onShowPages: (urls: string[], label: string) => void;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const siteWide = isSiteWide(group.issues);
  const countLabel = buildCountLabel(group, siteWide);

  return (
    <div
      className={
        open
          ? `border-l-2 ${SEVERITY_RULE[group.severity]} bg-base-200/20`
          : "border-l-2 border-l-transparent"
      }
    >
      <button
        type="button"
        className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-base-200/40"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={`${group.title}, ${countLabel}`}
      >
        <span
          className={`size-2 shrink-0 rounded-full ${SEVERITY_DOT[group.severity]}`}
        />
        <span
          className="min-w-0 flex-1 truncate text-sm font-medium"
          title={group.title}
        >
          {group.title}
        </span>
        <span className="shrink-0 text-xs tabular-nums text-muted">
          {countLabel}
        </span>
        <ChevronRight
          className={`size-4 shrink-0 text-muted transition-transform ${
            open ? "rotate-90" : ""
          }`}
        />
      </button>

      {open && (
        <div className="space-y-3 pb-4 pl-9 pr-4 pt-0.5">
          {group.explanation && (
            <p className="max-w-prose text-sm text-muted">
              {group.explanation}
            </p>
          )}
          {group.howToFix && (
            <div className="flex max-w-prose gap-2.5 rounded-box border border-base-300 bg-base-100 px-3 py-2.5 text-sm">
              <Lightbulb
                aria-hidden
                className="mt-0.5 size-4 shrink-0 text-[var(--ink-warning)]"
              />
              <p>
                <span className="font-medium">Nasıl düzeltilir? </span>
                <span className="text-muted">{group.howToFix}</span>
              </p>
            </div>
          )}
          {siteWide ? (
            <p className="text-sm text-muted">
              Bu sorun tek bir sayfayla değil, sitenin tamamıyla ilgili.
            </p>
          ) : null}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className={ACTION_BUTTON}
              onClick={() => copyUrls(group.pageUrls)}
            >
              <Copy aria-hidden className="size-3.5" />
              URL&apos;leri kopyala ({formatCount(group.pageUrls.length)})
            </button>
            <button
              type="button"
              className={ACTION_BUTTON}
              onClick={() =>
                downloadCsv(issueCsvFilename(group), buildIssueCsv(group))
              }
            >
              <Download aria-hidden className="size-3.5" />
              CSV indir
            </button>
            {siteWide ? null : (
              <button
                type="button"
                className={ACTION_BUTTON}
                onClick={() => onShowPages(group.pageUrls, group.title)}
              >
                <ListFilter aria-hidden className="size-3.5" />
                Sayfalar sekmesinde göster
              </button>
            )}
          </div>
          <AffectedPageList
            issues={group.issues}
            title={group.title}
            siteWide={siteWide}
          />
        </div>
      )}
    </div>
  );
}

function copyUrls(urls: string[]) {
  if (typeof navigator === "undefined" || !navigator.clipboard) {
    toast.error("Pano kullanılamıyor");
    return;
  }
  navigator.clipboard.writeText(buildCopyText(urls)).then(
    () => toast.success(`${formatCount(urls.length)} adres kopyalandı`),
    () => toast.error("Panoya kopyalanamadı"),
  );
}
