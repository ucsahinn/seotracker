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
import type { DetailLine } from "@/shared/audit-issues/details";
import { t } from "@/shared/i18n";

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
  const showing = {
    total: formatCount(matches.length),
    shown: formatCount(shown.length),
  };

  if (pages.length === 0) {
    return (
      <p className="text-sm text-muted">
        {t("Bu sorun için kayıtlı adres yok.")}
      </p>
    );
  }

  return (
    <section
      aria-label={t("{title}: etkilenen adresler", { title })}
      className="space-y-2"
    >
      {pages.length > SEARCH_THRESHOLD ? (
        <label className="input input-sm flex items-center gap-2">
          <Search aria-hidden className="size-3.5 text-muted" />
          <input
            type="search"
            value={query}
            placeholder={t("Adres ara")}
            aria-label={t("{title}: adreslerde ara", { title })}
            onChange={(event) => {
              setQuery(event.target.value);
              setVisible(PAGE_STEP);
            }}
          />
        </label>
      ) : null}
      <p role="status" className="text-xs text-muted">
        {matches.length === 0
          ? t("Aramayla eşleşen adres yok.")
          : siteWide
            ? t("{total} adres içinden {shown} tanesi gösteriliyor.", showing)
            : t("{total} sayfa içinden {shown} tanesi gösteriliyor.", showing)}
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
          {t("Daha fazla göster ({left} kaldı)", {
            left: formatCount(matches.length - shown.length),
          })}
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
          {t("Bu sayfada {count} kayıt var", { count: page.records.length })}
        </span>
      ) : null}
      {detailed.map((lines, index) => (
        <div
          key={index}
          className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-muted"
        >
          {lines.map((line, lineIndex) => (
            <DetailRow key={lineIndex} line={line} />
          ))}
        </div>
      ))}
    </li>
  );
}

/**
 * One line of evidence: a sentence, a "label: value" pair, or a list of
 * addresses and markup set as code, each on its own line so a long URL
 * wraps instead of running into the next item.
 */
function DetailRow({ line }: { line: DetailLine }) {
  if (line.label === null) {
    return <p className="basis-full text-base-content">{line.value}</p>;
  }
  if (line.items) {
    return (
      <dl className="basis-full">
        <dt>{line.label}:</dt>
        <dd>
          <ul className="mt-0.5 space-y-0.5">
            {line.items.map((item) => (
              <li key={item} className="break-all font-mono text-[11px]">
                {item}
              </li>
            ))}
            {line.more ? (
              <li>{t("ve {count} tane daha", { count: line.more })}</li>
            ) : null}
          </ul>
        </dd>
      </dl>
    );
  }
  return (
    <dl className="flex min-w-0 gap-1">
      <dt className="shrink-0">{line.label}:</dt>
      <dd className="min-w-0 break-all">{line.value}</dd>
    </dl>
  );
}
