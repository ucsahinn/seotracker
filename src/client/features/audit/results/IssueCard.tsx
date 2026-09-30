import { useMemo, useState } from "react";
import {
  ChevronRight,
  Copy,
  ExternalLink,
  Lightbulb,
  ListFilter,
} from "lucide-react";
import { toast } from "sonner";
import { UrlCell } from "@/client/components/table/UrlCell";
import { getSafeExternalUrl } from "@/client/components/table/url";
import { formatCount, formatNumber } from "@/client/lib/format";
import type { IssueSeverity } from "@/shared/audit-issues";
import type {
  AuditIssueRow,
  IssueGroup,
} from "@/client/features/audit/results/issueGroups";

const MAX_RENDERED_URLS = 100;

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
  const firstUrl = group.pageUrls
    .map((url) => getSafeExternalUrl(url))
    .find((url) => url !== null);

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
      >
        <span
          className={`size-2 shrink-0 rounded-full ${SEVERITY_DOT[group.severity]}`}
        />
        <span className="min-w-0 flex-1 truncate text-sm font-medium">
          {group.title}
        </span>
        <span className="shrink-0 text-xs tabular-nums text-muted">
          {formatCount(group.pageCount)} sayfa
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
          <div className="flex flex-wrap items-center gap-2">
            <CopyAddresses urls={group.pageUrls} />
            <button
              type="button"
              className={ACTION_BUTTON}
              onClick={() => onShowPages(group.pageUrls, group.title)}
            >
              <ListFilter aria-hidden className="size-3.5" />
              Sayfalar sekmesinde göster
            </button>
            {firstUrl ? (
              <a
                href={firstUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={ACTION_BUTTON}
              >
                <ExternalLink aria-hidden className="size-3.5" />
                İlk sayfayı aç
              </a>
            ) : null}
          </div>
          <AffectedUrlList issues={group.issues} />
        </div>
      )}
    </div>
  );
}

function CopyAddresses({ urls }: { urls: string[] }) {
  return (
    <button
      type="button"
      className={ACTION_BUTTON}
      onClick={() => {
        if (typeof navigator === "undefined" || !navigator.clipboard) {
          toast.error("Pano kullanılamıyor");
          return;
        }
        navigator.clipboard.writeText(urls.join("\n")).then(
          () => toast.success(`${formatCount(urls.length)} adres kopyalandı`),
          () => toast.error("Panoya kopyalanamadı"),
        );
      }}
    >
      <Copy aria-hidden className="size-3.5" />
      Adresleri kopyala ({formatCount(urls.length)})
    </button>
  );
}

function AffectedUrlList({ issues }: { issues: AuditIssueRow[] }) {
  const rendered = issues.slice(0, MAX_RENDERED_URLS);
  const remaining = issues.length - rendered.length;

  return (
    <div className="max-h-[320px] overflow-y-auto rounded-box border border-base-300/60 bg-base-100">
      {rendered.map((issue) => (
        <div
          key={issue.id}
          className="group/row flex flex-col gap-0.5 border-b border-base-300/50 px-3 py-1.5 text-sm last:border-b-0"
        >
          <UrlCell url={issue.pageUrl} className="text-muted" />
          <IssueDetails detailsJson={issue.detailsJson} />
        </div>
      ))}
      {remaining > 0 && (
        <div className="px-3 py-2 text-xs text-muted">
          ...ve {formatNumber(remaining)} kayıt daha. Tam liste için sorunları
          CSV olarak dışa aktarın.
        </div>
      )}
    </div>
  );
}

function parseDetails(detailsJson: string): Array<[string, unknown]> | null {
  try {
    const parsed: unknown = JSON.parse(detailsJson);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      !Array.isArray(parsed)
    ) {
      return Object.entries(parsed);
    }
    return null;
  } catch {
    return null;
  }
}

function IssueDetails({ detailsJson }: { detailsJson: string | null }) {
  const details = useMemo(
    () => (detailsJson ? parseDetails(detailsJson) : null),
    [detailsJson],
  );

  if (!details) return null;

  const entries = details.filter(
    ([, value]) => value !== null && value !== undefined,
  );
  if (entries.length === 0) return null;

  /*
   * Lists on their own lines, scalars on one. Everything used to be joined
   * into a single truncated line, which reads fine for "count: 3" and turns
   * a list of image addresses into an unreadable smear -- and a list of
   * addresses is exactly what an operator fixing the finding needs to copy.
   */
  const lists = entries.filter(([, value]) => isStringList(value));
  const scalars = entries.filter(([, value]) => !isStringList(value));

  return (
    <span className="block min-w-0 space-y-0.5 text-xs text-muted">
      {scalars.length > 0 ? (
        <span className="block truncate">
          {scalars
            .map(([key, value]) => {
              const rendered = Array.isArray(value)
                ? value.join(" → ")
                : String(value);
              return `${key}: ${rendered}`;
            })
            .join(" · ")}
        </span>
      ) : null}
      {lists.map(([key, value]) =>
        Array.isArray(value)
          ? value.map((item) => (
              <span
                key={`${key}-${String(item)}`}
                className="block truncate font-mono"
                title={String(item)}
              >
                {String(item)}
              </span>
            ))
          : null,
      )}
    </span>
  );
}

/** A list of address-like strings, as opposed to a heading-order sequence. */
function isStringList(value: unknown): boolean {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((item) => typeof item === "string" && item.length > 12)
  );
}
