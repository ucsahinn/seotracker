import { copyText } from "@/client/lib/copyText";
import { Link } from "@tanstack/react-router";
import { Check, Copy, ExternalLink, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Modal } from "@/client/components/Modal";
import { getSafeExternalUrl } from "@/client/components/table/url";
import {
  explainRow,
  KIND_COPY,
  pathOf,
  scoreWords,
  type OpportunityRow,
} from "@/client/features/opportunities/opportunityLogic";
import {
  formatDecimal,
  formatNumber,
  formatPercent,
} from "@/client/lib/format";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-field bg-base-200 px-3 py-2">
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="text-sm font-semibold tabular-nums">{value}</dd>
    </div>
  );
}

/**
 * What a row means and what to do about it.
 *
 * The table says a page is an opportunity and shows six numbers; it never
 * says why, or what an afternoon on it would look like. Opening a row answers
 * both, and its buttons are the two things an operator does next: take the
 * address somewhere, or see which searches bring people to it.
 */
export function OpportunityDetail({
  row,
  projectId,
  onClose,
}: {
  row: OpportunityRow;
  projectId: string;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [copied, setCopied] = useState(false);
  const kind = KIND_COPY[row.kind];
  const parts = scoreWords(row.scoreComponents);
  const safeUrl = getSafeExternalUrl(row.page);

  // Focus goes into the dialog and comes back to whatever opened it.
  useEffect(() => {
    const opener = document.activeElement;
    closeRef.current?.focus();
    return () => {
      if (opener instanceof HTMLElement) opener.focus();
    };
  }, []);

  return (
    <Modal maxWidth="max-w-xl" onClose={onClose} labelledBy="opportunity-title">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="badge badge-sm border-base-300 bg-base-200 text-muted">
            {kind.label}
          </span>
          <h2
            id="opportunity-title"
            className="mt-2 break-all text-lg font-semibold"
            title={row.page}
          >
            {pathOf(row.page)}
          </h2>
        </div>
        <button
          ref={closeRef}
          type="button"
          className="btn btn-ghost btn-sm btn-square"
          aria-label="Kapat"
          onClick={onClose}
        >
          <X className="size-4" />
        </button>
      </div>

      <p className="text-sm">{explainRow(row)}</p>

      <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Stat label="Sıra" value={formatDecimal(row.position)} />
        <Stat label="Gösterim" value={formatNumber(row.impressions)} />
        <Stat label="Tıklama" value={formatNumber(row.clicks)} />
        <Stat label="Tıklama oranı" value={formatPercent(row.ctr)} />
        {row.ga4 ? (
          <Stat
            label="Analytics oturumu"
            value={formatNumber(row.ga4.sessions)}
          />
        ) : null}
      </dl>

      {parts ? (
        <section aria-label="Puanın dökümü" className="space-y-2">
          <h3 className="text-sm font-medium">
            Puan {row.score === null ? "" : formatNumber(row.score)} nereden
            geliyor?
          </h3>
          <ul className="space-y-2">
            {parts.map((part) => (
              <li key={part.key} className="text-sm">
                <div className="flex justify-between gap-3">
                  <span>{part.label}</span>
                  <span className="tabular-nums text-muted">
                    {formatDecimal(part.points)} / {part.max}
                  </span>
                </div>
                <span
                  aria-hidden
                  className="mt-1 block h-1.5 rounded-full bg-base-200"
                >
                  <span
                    className="block h-full rounded-full bg-primary"
                    style={{ width: `${(part.points / part.max) * 100}%` }}
                  />
                </span>
                <span className="text-xs text-muted">{part.sentence}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section aria-label="Ne yapmalı?" className="space-y-2">
        <h3 className="text-sm font-medium">Ne yapmalı?</h3>
        <ul className="space-y-1.5">
          {kind.todo.map((item) => (
            <li key={item} className="flex gap-2 text-sm">
              <Check
                aria-hidden
                className="mt-0.5 size-4 shrink-0 text-muted"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="flex flex-wrap gap-2">
        <Link
          to="/p/$projectId/search-performance"
          params={{ projectId }}
          search={{ tab: "pages" as const, q: row.page }}
          className="btn btn-primary btn-sm gap-1.5"
        >
          <Search className="size-4" />
          Arama performansında aç
        </Link>
        <button
          type="button"
          className="btn btn-sm gap-1.5"
          onClick={() => {
            void copyText(row.page, "Adres kopyalandı").then((ok) => {
              if (!ok) return;
              setCopied(true);
              window.setTimeout(() => setCopied(false), 2000);
            });
          }}
        >
          <Copy className="size-4" />
          {copied ? "Kopyalandı" : "Adresi kopyala"}
        </button>
        {safeUrl ? (
          <a
            href={safeUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="btn btn-sm gap-1.5"
          >
            <ExternalLink className="size-4" />
            Sayfayı aç
          </a>
        ) : null}
      </div>
    </Modal>
  );
}
