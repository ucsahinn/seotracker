import { t } from "@/shared/i18n";
import { DATA_SERIES } from "@/client/components/Chart";
import { OpportunityAnalyticsLink } from "./OpportunityAnalyticsLink";
import { copyText } from "@/client/lib/copyText";
import { Link } from "@tanstack/react-router";
import { Check, Copy, ExternalLink, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Modal } from "@/client/components/Modal";
import { getSafeExternalUrl } from "@/client/components/table/url";
import {
  explainRow,
  monthlyImpressions,
  pathOf,
  valueText,
  WORK_COPY,
  rowAction,
  workColor,
  type OpportunityRow,
} from "@/client/features/opportunities/opportunityLogic";
import {
  formatCount,
  formatDate,
  formatDecimal,
  formatPercent,
} from "@/client/lib/format";

function Fact({
  label,
  value,
  metric,
}: {
  label: string;
  value: string;
  metric?: keyof typeof DATA_SERIES;
}) {
  const style:
    | (React.CSSProperties & { "--metric-color": string })
    | undefined = metric
    ? { "--metric-color": DATA_SERIES[metric] }
    : undefined;
  return (
    <div
      className={
        metric
          ? "metric-tile rounded-field px-3 py-2"
          : "rounded-field bg-base-200 px-3 py-2"
      }
      data-metric={metric}
      style={style}
    >
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="metric-value text-sm font-semibold tabular-nums">
        {value}
      </dd>
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
  dateRange,
  projectId,
  onClose,
}: {
  row: OpportunityRow;
  days: number;
  dateRange?: { startDate: string; endDate: string };
  projectId: string;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [copied, setCopied] = useState(false);
  const work = WORK_COPY[row.work];
  const safeUrl = getSafeExternalUrl(row.page);
  const value = valueText(row);

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
          {row.gainPerMonth === null
            ? t("Kazanç bilinmiyor")
            : t("En fazla +{gain} tıklama / 30 gün (üst sınır)", {
                gain: formatCount(row.gainPerMonth),
              })}
        </p>
        <p className="text-sm">{explainRow(row)}</p>
        {dateRange ? (
          <p className="text-xs text-muted">
            {formatDate(dateRange.startDate)} – {formatDate(dateRange.endDate)}{" "}
            · America/Los_Angeles
          </p>
        ) : null}
        {row.capped ? (
          <p className="mt-1 text-xs text-muted">
            {t(
              "Aramaların toplamı daha büyük; sayfanın tamamı hedef orana ulaşsa alacağı kadarla sınırlandı.",
            )}
          </p>
        ) : null}
      </div>

      <dl className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <Fact
          metric="impressions"
          label={t("Ölçülen gösterim (30 güne ölçekli)")}
          value={t("ayda {count} gösterim", {
            count: formatCount(monthlyImpressions(row, days)),
          })}
        />
        <Fact
          label={t("Değer (Analytics)")}
          value={value ?? t("Analytics'te karşılığı yok")}
        />
        <Fact
          metric="position"
          label={t("Ortalama sıra")}
          value={formatDecimal(row.position)}
        />
      </dl>
      {row.joinPrecision && row.joinPrecision !== "exact" ? (
        <p className="text-xs text-muted">
          {t(
            "Analytics bu adres grubunu birlikte ölçüyor; oturumları farklı URL satırları arasında toplamayın.",
          )}{" "}
          {row.normalizedPage}
        </p>
      ) : null}

      <p className="text-xs text-muted">
        {t(
          "Karşılaştırılabilen marka dışı gösterim: {known}; oranı bilinmeyen: {unknown}.",
          {
            known: formatCount(row.comparableImpressions ?? 0),
            unknown: formatCount(row.missingCurveImpressions ?? 0),
          },
        )}
      </p>
      <section aria-labelledby="opportunity-queries" className="space-y-2">
        <h3 id="opportunity-queries" className="text-sm font-medium">
          {t("Hangi aramalar?")}{" "}
          {formatCount(
            row.gain === null
              ? (row.observedQueries?.length ?? 0)
              : row.queries.length,
          )}{" "}
          /{" "}
          {formatCount(
            row.gain === null
              ? (row.observedQueries?.length ?? 0)
              : (row.queryCount ?? row.queries.length),
          )}
        </h3>
        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr>
                <th>{t("Arama")}</th>
                <th className="text-right">{t("Gösterim")}</th>
                <th className="text-right">{t("Sıra")}</th>
                <th className="text-right">{t("Tıklama oranı")}</th>
                <th className="text-right">{t("Kazanç/ay")}</th>
              </tr>
            </thead>
            <tbody>
              {row.observedQueries?.map((query) => (
                <tr key={query.query}>
                  <td className="max-w-56 break-words whitespace-normal">
                    {query.query}
                  </td>
                  <td className="text-right">
                    {formatCount(query.impressions)}
                  </td>
                  <td className="text-right">
                    {formatDecimal(query.position)}
                  </td>
                  <td className="text-right">{formatPercent(query.ctr)}</td>
                  <td className="text-right">{t("Kazanç bilinmiyor")}</td>
                </tr>
              ))}
              {row.queries.map((query) => (
                <tr key={query.query}>
                  <td className="max-w-56">
                    <span
                      className="block break-words whitespace-normal"
                      title={query.query}
                    >
                      {query.query}
                    </span>
                    <span className="block text-xs text-muted">
                      {t(WORK_COPY[query.work].action)}
                    </span>
                  </td>
                  <td className="text-right tabular-nums">
                    {formatCount(query.impressions)}
                  </td>
                  <td className="text-right tabular-nums">
                    {formatDecimal(query.position)}
                    <span className="block text-xs text-muted">
                      {query.targetBand ?? t(WORK_COPY[query.work].target)}
                    </span>
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
                    +{formatCount(query.gainPerMonth ?? 0)}
                  </td>
                </tr>
              ))}
              {(row.queryCount ?? 0) > row.queries.length ? (
                <tr>
                  <td colSpan={4}>{t("Diğer aramalar (dağıtılmış kalan)")}</td>
                  <td className="text-right">
                    +{formatCount(row.otherQueryGainPerMonth ?? 0)}
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>

      {row.brandOnly ? (
        <p className="text-xs text-muted">{t("Yalnızca marka aramaları")}</p>
      ) : null}

      <section aria-label={t("Ne yapmalı?")} className="space-y-2">
        <h3 className="text-sm font-medium">
          {t("Ne yapmalı? {action}", { action: t(rowAction(row)) })}
        </h3>
        <ul className="space-y-1.5">
          {(row.gain === null
            ? [
                "Önce ölçülen aramalarla başlığın ve içeriğin uyumunu kontrol edin; yalnızca bir sorun doğrularsanız değişiklik yapın.",
              ]
            : work.todo
          ).map((item) => (
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
        <OpportunityAnalyticsLink
          row={row}
          projectId={projectId}
          dateRange={dateRange}
        />
        {dateRange ? (
          <Link
            to="/p/$projectId/search-performance"
            params={{ projectId }}
            search={{
              tab: "pages" as const,
              exactPage: row.page,
              startDate: dateRange.startDate,
              endDate: dateRange.endDate,
            }}
            className="btn btn-primary btn-sm gap-1.5"
          >
            <Search className="size-4" />
            {t("Arama performansında aç")}
          </Link>
        ) : null}
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
