import { ChevronRight, Lightbulb } from "lucide-react";
import { useState } from "react";
import { sort } from "remeda";
import { formatCount, formatDate, formatPoints } from "@/client/lib/format";
import { getIssueDescriptor } from "@/shared/audit-issues";
import { savingsText } from "@/shared/audit-issues/details";
import {
  pageKey,
  type Effort,
  type PageTraffic,
  type TodoItem,
} from "@/shared/auditTodo";
import { t } from "@/shared/i18n";
import { SeverityChip } from "./SeverityChip";
import { AuditChanges, WorstPages } from "./TodoExtras";
import type { AuditInsightsData, AuditResultsData } from "./types";
import { FIRST_COUNT } from "./useAuditOverview";

/**
 * The complete to-do list: every fix the audit found, in the order worth
 * doing them, each with what, why, how, where, the points it gives back and
 * a rough size of the work. Below it, the pages with the most wrong and
 * what changed since the previous audit of this site.
 */

const SHOWN = 10;

/** Turkish source text; shown through t(). */
const EFFORT_LABEL: Record<Effort, string> = {
  S: "Küçük iş",
  M: "Orta iş",
  L: "Büyük iş",
};

export function TodoView({
  todos,
  firstGain,
  traffic,
  insights,
  issues,
}: {
  todos: TodoItem[];
  /** Site-score points the first FIRST_COUNT fixes give together; null if unknown. */
  firstGain: number | null;
  traffic: Map<string, PageTraffic> | null;
  /** Undefined while loading. */
  insights: AuditInsightsData | undefined;
  issues: AuditResultsData["issues"];
}) {
  const [all, setAll] = useState(false);
  const shown = all ? todos : todos.slice(0, SHOWN);
  const range = insights?.traffic;

  return (
    <div className="flex flex-col gap-8">
      <section>
        <p className="mb-3 max-w-prose text-xs text-subtle">
          {insights === undefined
            ? t(
                "Search Console trafiği yükleniyor; sıralama birazdan güncellenebilir.",
              )
            : range
              ? t(
                  "Sıralama: puan etkisi, etkilenen sayfaların Search Console tıklamalarıyla ağırlıklandırıldı ({start} – {end}).",
                  {
                    start: formatDate(range.startDate),
                    end: formatDate(range.endDate),
                  },
                )
              : t(
                  "Search Console bağlı değil ya da yanıt vermedi; sıralama yalnızca puan etkisine göre.",
                )}
        </p>
        {todos.length === 0 ? (
          <p className="text-sm text-muted">
            {t("Düzeltilecek kayıtlı sorun yok.")}
          </p>
        ) : (
          <>
            <FirstSummary
              count={Math.min(FIRST_COUNT, todos.length)}
              gain={firstGain}
            />
            <ol className="divide-y divide-[var(--hairline)] rounded-box border border-[var(--hairline)]">
              {shown.map((item, index) => (
                <TodoRow
                  key={item.issueType}
                  item={item}
                  rank={index + 1}
                  first={index < FIRST_COUNT}
                  traffic={traffic}
                />
              ))}
            </ol>
          </>
        )}
        {todos.length > SHOWN ? (
          <button
            type="button"
            className="btn btn-sm btn-ghost mt-2"
            onClick={() => setAll((value) => !value)}
          >
            {all
              ? t("İlk {count} işi göster", { count: SHOWN })
              : t("Tüm {count} işi göster", { count: todos.length })}
          </button>
        ) : null}
      </section>

      <WorstPages issues={issues} traffic={traffic} />
      <AuditChanges insights={insights} />
    </div>
  );
}

/**
 * The target above the list: do the first few and the dial moves this much.
 * Scored, not summed (see `useAuditOverview`), so the number holds.
 */
function FirstSummary({ count, gain }: { count: number; gain: number | null }) {
  return (
    <p className="mb-2 text-sm">
      <span className="font-medium">{t("Önce bunlar:")}</span>{" "}
      <span className="text-muted">
        {gain === null
          ? t("ilk {count} iş.", { count })
          : gain >= 1
            ? t(
                "ilk {count} iş birlikte site puanını yaklaşık {points} puan yükseltir.",
                {
                  count,
                  points: formatCount(gain),
                },
              )
            : t("ilk {count} iş, site puanını 1 puandan az yükseltir.", {
                count,
              })}
      </span>
    </p>
  );
}

function PointsText({ points }: { points: number }) {
  return (
    <span
      className="text-sm font-semibold tabular-nums text-[var(--ink-success)]"
      title={t(
        "Bu sorun tek başına düzeltilirse yaklaşık kazanç; değerler toplanmaz.",
      )}
    >
      {t("{points} puan", { points: formatPoints(points) })}
    </span>
  );
}

function TodoRow({
  item,
  rank,
  first,
  traffic,
}: {
  item: TodoItem;
  rank: number;
  /** One of the fixes the summary above counts. */
  first: boolean;
  traffic: Map<string, PageTraffic> | null;
}) {
  const [open, setOpen] = useState(false);
  const descriptor = getIssueDescriptor(item.issueType);
  const title = descriptor ? t(descriptor.title) : item.issueType;
  const savings = savingsText(item.savingsMs, item.savingsBytes);
  const pages = traffic
    ? sort(
        item.pageUrls,
        (a, b) =>
          (traffic.get(pageKey(b))?.clicks ?? 0) -
          (traffic.get(pageKey(a))?.clicks ?? 0),
      )
    : item.pageUrls;

  return (
    <li>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="focus-inset grid w-full grid-cols-[1.75rem_1fr_auto] items-start gap-x-3 px-3 py-3 text-left transition-colors hover:bg-base-200/40 sm:px-4"
      >
        <span
          className={
            first
              ? "flex size-6 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold tabular-nums text-[var(--ink-primary)]"
              : "flex size-6 items-center justify-center text-sm font-semibold tabular-nums text-subtle"
          }
        >
          {rank}
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-medium">{title}</span>
          <span className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
            <SeverityChip severity={item.severity} />
            <span className="tabular-nums">
              {item.siteLevel
                ? t("Tüm site")
                : t("{count} sayfa", { count: formatCount(item.pageCount) })}
            </span>
            <span>{t(EFFORT_LABEL[item.effort])}</span>
            {savings ? (
              <span
                className="tabular-nums"
                title={t(
                  "Lighthouse'un tahmini; en çok kazandıran sayfa için.",
                )}
              >
                {t("Tahmini kazanç: {value}", { value: savings })}
              </span>
            ) : null}
            {/* Only for a page-level fix: a site-wide one's "traffic" is
                the whole site's, the same number on every such row. */}
            {item.clicks !== null && !item.siteLevel ? (
              <span className="hidden tabular-nums sm:inline">
                {t("{clicks} tıklama, {impressions} gösterim", {
                  clicks: formatCount(item.clicks),
                  impressions: formatCount(item.impressions ?? 0),
                })}
              </span>
            ) : null}
            <span className="sm:hidden">
              <PointsText points={item.points} />
            </span>
          </span>
        </span>
        <span className="flex items-center gap-2 pt-0.5">
          <span className="hidden sm:inline">
            <PointsText points={item.points} />
          </span>
          <ChevronRight
            aria-hidden
            className={`size-4 text-muted transition-transform ${open ? "rotate-90" : ""}`}
          />
        </span>
      </button>
      <div
        className="reveal-height"
        data-open={open}
        inert={!open}
        aria-hidden={!open}
      >
        <div>
          <div className="space-y-3 pb-4 pl-[3.25rem] pr-3 sm:pl-[3.75rem] sm:pr-4">
            {descriptor ? (
              <p className="max-w-prose text-sm text-muted">
                <span className="font-medium text-base-content">
                  {t("Neden:")}{" "}
                </span>
                {t(descriptor.explanation)}
              </p>
            ) : null}
            {descriptor ? (
              <div className="flex max-w-prose gap-2.5 rounded-box border border-[var(--hairline)] bg-base-200/40 px-3 py-2.5 text-sm">
                <Lightbulb
                  aria-hidden
                  className="mt-0.5 size-4 shrink-0 text-[var(--ink-warning)]"
                />
                <p>
                  <span className="font-medium">{t("Nasıl düzeltilir?")} </span>
                  <span className="text-muted">{t(descriptor.howToFix)}</span>
                </p>
              </div>
            ) : null}
            {pages.length > 0 ? (
              <ul className="space-y-1 text-xs">
                {pages.slice(0, 10).map((url) => {
                  const row = traffic?.get(pageKey(url));
                  return (
                    <li key={url} className="flex items-center gap-3">
                      <span
                        className="min-w-0 flex-1 truncate font-mono text-muted"
                        title={url}
                      >
                        {url}
                      </span>
                      {row ? (
                        <span className="shrink-0 tabular-nums text-subtle">
                          {t("{count} tıklama", {
                            count: formatCount(row.clicks),
                          })}
                        </span>
                      ) : null}
                    </li>
                  );
                })}
                {pages.length > 10 ? (
                  <li className="text-subtle">
                    {t("ve {count} sayfa daha", { count: pages.length - 10 })}
                  </li>
                ) : null}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </li>
  );
}
