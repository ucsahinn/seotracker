import { t } from "@/shared/i18n";
import { copyText } from "@/client/lib/copyText";
import { Link } from "@tanstack/react-router";
import { Check, Copy, ExternalLink, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Modal } from "@/client/components/Modal";
import { getSafeExternalUrl } from "@/client/components/table/url";
import {
  explainRow,
  extraConversions,
  monthlyImpressions,
  pathOf,
  valueText,
  WORK_COPY,
  workColor,
  type OpportunityRow,
} from "@/client/features/opportunities/opportunityLogic";
import { perMonth } from "@/shared/pageOpportunities";
import { formatCount, formatDecimal, formatPercent } from "@/client/lib/format";

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-field bg-base-200 px-3 py-2">
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="text-sm font-semibold tabular-nums">{value}</dd>
    </div>
  );
}

/**
 * What a row is worth, where it comes from, and what to do.
 *
 * A page's position is an average over every search it showed for, so "move
 * up" cannot be acted on without saying which search. The queries behind the
 * estimate are the panel's centre: each with its position, its click-through
 * against the one the estimate assumes, and its share of the gain.
 */
export function OpportunityDetail({
  row,
  days,
  projectId,
  onClose,
}: {
  row: OpportunityRow;
  days: number;
  projectId: string;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [copied, setCopied] = useState(false);
  const work = WORK_COPY[row.work];
  const safeUrl = getSafeExternalUrl(row.page);
  const value = valueText(row);
  const conversions = extraConversions(row);

  // Focus goes into the dialog and comes back to whatever opened it.
  useEffect(() => {
    const opener = document.activeElement;
    closeRef.current?.focus();
    return () => {
      if (opener instanceof HTMLElement) opener.focus();
    };
  }, []);

  return (
    <Modal
      maxWidth="max-w-2xl"
      onClose={onClose}
      labelledBy="opportunity-title"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-1.5 text-xs text-muted">
            <span
              aria-hidden
              className="inline-block size-2 rounded-full"
              style={{ backgroundColor: workColor(row.work) }}
            />
            {t(work.label)}
          </span>
          <h2
            id="opportunity-title"
            className="mt-1 break-all text-lg font-semibold"
            title={row.page}
          >
            {pathOf(row.page)}
          </h2>
        </div>
        <button
          ref={closeRef}
          type="button"
          className="btn btn-ghost btn-sm btn-square"
          aria-label={t("Kapat")}
          onClick={onClose}
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="rounded-box bg-primary/8 px-4 py-3">
        <p className="text-2xl font-semibold tabular-nums">
          {t("+{gain} tıklama/ay", { gain: formatCount(row.gainPerMonth) })}
        </p>
        <p className="text-sm">{explainRow(row)}</p>
        {row.capped ? (
          <p className="mt-1 text-xs text-muted">
            {t(
              "Aramaların toplamı daha büyük; sayfanın tamamı hedef orana ulaşsa alacağı kadarla sınırlandı.",
            )}
          </p>
        ) : null}
        {conversions !== null && conversions >= 0.5 ? (
          <p className="mt-1 text-xs text-muted">
            {t(
              "Bugünkü dönüşüm oranıyla bu, ayda yaklaşık +{count} anahtar olay eder (tahmin).",
              { count: formatDecimal(conversions, conversions < 10 ? 1 : 0) },
            )}
          </p>
        ) : null}
      </div>

      <dl className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <Fact
          label={t("Talep")}
          value={t("ayda {count} gösterim", {
            count: formatCount(monthlyImpressions(row, days)),
          })}
        />
        <Fact
          label={t("Değer (Analytics)")}
          value={value ?? t("Analytics'te karşılığı yok")}
        />
        <Fact
          label={t("Mesafe")}
          value={t("{position}. sıra → hedef {target}", {
            position: formatDecimal(row.position),
            target: t(work.target),
          })}
        />
      </dl>

      <section aria-labelledby="opportunity-queries" className="space-y-2">
        <h3 id="opportunity-queries" className="text-sm font-medium">
          {t("Hangi aramalar?")}
        </h3>
        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr>
                <th>{t("Arama")}</th>
                <th className="text-right">{t("Sıra")}</th>
                <th className="text-right">{t("Tıklama oranı")}</th>
                <th className="text-right">{t("Kazanç/ay")}</th>
              </tr>
            </thead>
            <tbody>
              {row.queries.map((query) => (
                <tr key={query.query}>
                  <td className="max-w-56">
                    <span className="block truncate" title={query.query}>
                      {query.query}
                    </span>
                    <span className="block text-xs text-muted">
                      {t(WORK_COPY[query.work].action)}
                    </span>
                  </td>
                  <td className="text-right tabular-nums">
                    {formatDecimal(query.position)}
                  </td>
                  <td className="text-right tabular-nums">
                    {formatPercent(query.ctr)}
                    <span className="block text-xs text-muted">
                      {t("hedef {ctr}", {
                        ctr: formatPercent(query.targetCtr),
                      })}
                    </span>
                  </td>
                  <td className="text-right font-medium tabular-nums">
                    +{formatCount(perMonth(query.gain, days))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-label={t("Ne yapmalı?")} className="space-y-2">
        <h3 className="text-sm font-medium">
          {t("Ne yapmalı? {action}", { action: t(work.action) })}
        </h3>
        <ul className="space-y-1.5">
          {work.todo.map((item) => (
            <li key={item} className="flex gap-2 text-sm">
              <Check
                aria-hidden
                className="mt-0.5 size-4 shrink-0 text-muted"
              />
              <span>{t(item)}</span>
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
          {t("Arama performansında aç")}
        </Link>
        <button
          type="button"
          className="btn btn-sm gap-1.5"
          onClick={() => {
            void copyText(row.page, t("Adres kopyalandı")).then((ok) => {
              if (!ok) return;
              setCopied(true);
              window.setTimeout(() => setCopied(false), 2000);
            });
          }}
        >
          <Copy className="size-4" />
          {copied ? t("Kopyalandı") : t("Adresi kopyala")}
        </button>
        {safeUrl ? (
          <a
            href={safeUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="btn btn-sm gap-1.5"
          >
            <ExternalLink className="size-4" />
            {t("Sayfayı aç")}
          </a>
        ) : null}
      </div>
    </Modal>
  );
}
