import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { UrlCell } from "@/client/components/table/UrlCell";
import { formatCount } from "@/client/lib/format";
import {
  buildAffectedPages,
  filterAffectedPages,
  nextVisibleCount,
  PAGE_STEP,
  SEARCH_THRESHOLD,
  type AffectedPage,
} from "@/client/features/audit/results/issueAffected";
import type { AuditIssueRow } from "@/client/features/audit/results/issueGroups";

/**
 * The addresses behind one issue's count, ten at a time.
 *
 * A search box appears once the list is long enough that scrolling stops
 * being a way to find one address.
 */
export function AffectedPageList({
  issues,
  title,
  siteWide,
}: {
  issues: AuditIssueRow[];
  title: string;
  siteWide: boolean;
}) {
  const pages = useMemo(() => buildAffectedPages(issues), [issues]);
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE_STEP);
  const matches = useMemo(
    () => filterAffectedPages(pages, query),
    [pages, query],
  );
  const shown = matches.slice(0, visible);
  const noun = siteWide ? "adres" : "sayfa";

  if (pages.length === 0) {
    return (
      <p className="text-sm text-muted">Bu sorun için kayıtlı adres yok.</p>
    );
  }

  return (
    <section aria-label={`${title}: etkilenen adresler`} className="space-y-2">
      {pages.length > SEARCH_THRESHOLD ? (
        <label className="input input-sm flex items-center gap-2">
          <Search aria-hidden className="size-3.5 text-muted" />
          <input
            type="search"
            value={query}
            placeholder="Adres ara"
            aria-label={`${title}: adreslerde ara`}
            onChange={(event) => {
              setQuery(event.target.value);
              setVisible(PAGE_STEP);
            }}
          />
        </label>
      ) : null}
      <p role="status" className="text-xs text-muted">
        {matches.length === 0
          ? "Aramayla eşleşen adres yok."
          : `${formatCount(matches.length)} ${noun} içinden ${formatCount(shown.length)} tanesi gösteriliyor.`}
      </p>
      {matches.length > 0 ? (
        <ul className="rounded-box border border-base-300/60 bg-base-100">
          {shown.map((page) => (
            <PageRow key={page.url} page={page} />
          ))}
        </ul>
      ) : null}
      {shown.length < matches.length ? (
        <button
          type="button"
          className="btn btn-xs btn-ghost border border-[var(--control-border)]"
          onClick={() =>
            setVisible((value) => nextVisibleCount(value, matches.length))
          }
        >
          Daha fazla göster ({formatCount(matches.length - shown.length)} kaldı)
        </button>
      ) : null}
    </section>
  );
}

function PageRow({ page }: { page: AffectedPage }) {
  const detailed = page.records.filter((lines) => lines.length > 0);
  return (
    <li className="group/row flex flex-col gap-0.5 border-b border-base-300/50 px-3 py-1.5 text-sm last:border-b-0">
      <UrlCell url={page.url} />
      {page.records.length > 1 ? (
        <span className="text-xs text-muted">
          Bu sayfada {formatCount(page.records.length)} kayıt var
        </span>
      ) : null}
      {detailed.map((lines, index) => (
        <dl
          key={index}
          className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-muted"
        >
          {lines.map((line) => (
            <div key={line.label} className="flex min-w-0 gap-1">
              <dt className="shrink-0">{line.label}:</dt>
              <dd className="min-w-0 break-all">{line.value}</dd>
            </div>
          ))}
        </dl>
      ))}
    </li>
  );
}
