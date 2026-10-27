import { t } from "@/shared/i18n";
import * as React from "react";
import { Check, ChevronRight, ListChecks, RotateCcw } from "lucide-react";
import { EmptyState } from "@/client/components/EmptyState";
import { SafeExternalLink } from "@/client/components/SafeExternalLink";
import type { TodoItem } from "@/shared/searchInsights";
import {
  CONFIDENCE_LABEL,
  combinedGain,
  describeTodo,
  gainText,
  shortPage,
  todoGroupTitle,
  todoSubjectLabel,
  type TodoTarget,
} from "@/shared/searchTodoCopy";
import { BrandTermsEditor } from "@/client/features/search-performance/BrandTerms";
import type { DoneTodos } from "@/client/features/search-performance/useDoneTodos";
import { formatCount } from "@/client/lib/format";

/** How many to-dos are marked "first". */
export const FIRST_TODOS = 3;
/** Rows per group before "show all": a group of eight reads as noise. */
const SHOWN = 4;

type OpenTarget = Exclude<TodoTarget, null | { kind: "brand" }>;
type Ranked = { item: TodoItem; rank: number };

/**
 * The open items grouped by kind, groups in the order of their best-ranked
 * item, rows keeping their overall rank.
 */
function groupByKind(open: readonly TodoItem[]) {
  const groups = new Map<TodoItem["kind"], Ranked[]>();
  open.forEach((item, index) => {
    const rows = groups.get(item.kind) ?? [];
    rows.push({ item, rank: index + 1 });
    groups.set(item.kind, rows);
  });
  return [...groups.entries()];
}

export function TodoTab({
  projectId,
  todo,
  days,
  doneTodos,
  onTarget,
}: {
  projectId: string;
  todo: TodoItem[];
  /** Window length, for "per N days" wording. */
  days: number;
  doneTodos: DoneTodos;
  onTarget: (target: OpenTarget) => void;
}) {
  const { done, toggle } = doneTodos;
  const open = todo.filter((item) => !done.has(item.id));
  const finished = todo.filter((item) => done.has(item.id));

  if (todo.length === 0) {
    return (
      <EmptyState
        icon={ListChecks}
        title={t("Şu an önerilecek iş yok")}
        description={t(
          "Search Console verisinde eşiği aşan bir fırsat ya da düşüş bulunmadı. Daha uzun bir dönem seçmek ya da birkaç gün sonra tekrar bakmak yeni bulgular çıkarabilir.",
        )}
      />
    );
  }

  const first = open.slice(0, FIRST_TODOS);
  const gain = combinedGain(first);

  return (
    <div className="flex flex-col gap-4 p-4">
      {first.length > 0 ? (
        <p className="text-sm">
          <span className="font-medium">{t("Önce bunlar:")}</span>{" "}
          <span className="text-muted">
            {gain === null
              ? t("ilk {count} iş.", { count: first.length })
              : t(
                  "ilk {count} iş birlikte {days} günde en fazla {clicks} ek tıklama getirebilir (üst sınır).",
                  {
                    count: first.length,
                    days,
                    clicks: formatCount(Math.round(gain)),
                  },
                )}
          </span>
        </p>
      ) : (
        <p className="text-sm text-muted">
          {t("Listedeki işlerin hepsini yapıldı olarak işaretlediniz.")}
        </p>
      )}

      {groupByKind(open).map(([kind, rows]) => (
        <TodoGroup
          key={kind}
          projectId={projectId}
          kind={kind}
          rows={rows}
          onToggle={toggle}
          onTarget={onTarget}
        />
      ))}

      {finished.length > 0 ? (
        <details className="rounded-box border border-[var(--hairline)] px-4 py-2">
          <summary className="cursor-pointer text-sm">
            {t("Yapıldı olarak işaretlenenler ({count})", {
              count: finished.length,
            })}
          </summary>
          <ul className="mt-2 flex flex-col gap-1">
            {finished.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <span className="min-w-0 truncate text-muted line-through">
                  {describeTodo(item).title}
                </span>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm gap-1 max-sm:min-h-11"
                  onClick={() => toggle(item.id)}
                >
                  <RotateCcw className="size-3.5" aria-hidden />
                  {t("Geri al")}
                </button>
              </li>
            ))}
          </ul>
        </details>
      ) : null}

      <p className="text-xs text-muted">
        {t(
          "Tıklama kazançları, sitenizin kendi sıra ve tıklama oranlarından hesaplanan yaklaşık değerlerdir. Aynı sorgu ya da sayfa için birden çok iş varsa üstteki özet onu bir kez sayar. Yapıldı işaretleri yalnızca bu tarayıcıda saklanır.",
        )}
      </p>
    </div>
  );
}

/**
 * One kind of work: a heading that counts it, the advice said once (behind
 * "Why and what to do"), then one compact row per query or page.
 */
function TodoGroup({
  projectId,
  kind,
  rows,
  onToggle,
  onTarget,
}: {
  projectId: string;
  kind: TodoItem["kind"];
  rows: Ranked[];
  onToggle: (id: string) => void;
  onTarget: (target: OpenTarget) => void;
}) {
  const [showAll, setShowAll] = React.useState(false);
  const copies = rows.map((row) => describeTodo(row.item));
  // The advice is the same for most of a kind; a kind with variants (a
  // drop with or without a lost position) lists each variant once.
  const actions = [...new Set(copies.map((copy) => copy.action))];
  const shown = showAll ? rows : rows.slice(0, SHOWN);
  const brand = kind === "setBrandTerms";

  return (
    <section className="rounded-box border border-[var(--hairline)]">
      <header className="flex flex-col gap-1 border-b border-[var(--hairline)] px-4 py-2.5">
        <h3 className="text-sm font-semibold">
          {/* The brand to-do is one item whose title says whether it asks
              to confirm suggestions or to set terms. */}
          {brand && rows[0]
            ? todoSubjectLabel(rows[0].item)
            : todoGroupTitle(kind, rows.length)}
        </h3>
        <details className="group text-sm">
          <summary className="inline-flex min-h-6 cursor-pointer list-none items-center gap-1 rounded-field text-xs font-medium text-muted hover:text-base-content focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary max-sm:min-h-11 [&::-webkit-details-marker]:hidden">
            <ChevronRight
              className="size-3.5 transition-transform group-open:rotate-90"
              aria-hidden
            />
            {t("Neden ve ne yapmalı")}
          </summary>
          <div className="mt-1.5 flex flex-col gap-1.5 pl-[1.125rem]">
            {brand ? <p className="text-muted">{copies[0]?.evidence}</p> : null}
            {actions.map((action) => (
              <p key={action}>{action}</p>
            ))}
          </div>
        </details>
      </header>
      <ol className="divide-y divide-[var(--hairline)]">
        {shown.map(({ item, rank }, index) => (
          <TodoRow
            key={item.id}
            projectId={projectId}
            item={item}
            copy={copies[index] ?? describeTodo(item)}
            rank={rank}
            onToggle={() => onToggle(item.id)}
            onTarget={onTarget}
          />
        ))}
      </ol>
      {rows.length > SHOWN ? (
        <div className="border-t border-[var(--hairline)] px-2 py-1">
          <button
            type="button"
            className="btn btn-ghost btn-sm max-sm:min-h-11"
            aria-expanded={showAll}
            onClick={() => setShowAll((v) => !v)}
          >
            {showAll
              ? t("Daha az göster")
              : t("Tümünü göster ({count})", { count: rows.length })}
          </button>
        </div>
      ) : null}
    </section>
  );
}

function TodoRow({
  projectId,
  item,
  copy,
  rank,
  onToggle,
  onTarget,
}: {
  projectId: string;
  item: TodoItem;
  copy: ReturnType<typeof describeTodo>;
  rank: number;
  onToggle: () => void;
  onTarget: (target: OpenTarget) => void;
}) {
  const [brandOpen, setBrandOpen] = React.useState(false);
  const target = copy.target;
  const first = rank <= FIRST_TODOS;
  const gain =
    item.estimatedClicks !== null && item.estimatedClicks > 0
      ? item.estimatedClicks
      : null;
  const brand = item.kind === "setBrandTerms";

  return (
    <li className="px-4 py-2.5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <span
            className={`mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
              first
                ? "bg-primary text-primary-content"
                : "border border-[var(--hairline-strong)] text-muted"
            }`}
            aria-hidden
          >
            {rank}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium [overflow-wrap:anywhere]">
              <span className="sr-only">
                {t("{rank}. sıradaki iş:", { rank })}{" "}
              </span>
              {brand ? copy.action : todoSubjectLabel(item)}
            </p>
            <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-muted [overflow-wrap:anywhere]">
              {brand ? null : <span>{copy.evidence}</span>}
              {/* The target page, when the row names a query; a page row
                  already names its page. */}
              {copy.page && shortPage(copy.page) !== todoSubjectLabel(item) ? (
                <SafeExternalLink
                  url={copy.page}
                  label={shortPage(copy.page)}
                  className="link link-hover inline-flex max-w-full items-center gap-1 truncate"
                />
              ) : null}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1 pl-9 sm:pl-0">
          <span className="mr-auto flex flex-col items-start sm:mr-2 sm:items-end">
            {gain !== null ? (
              <span
                className="whitespace-nowrap text-sm font-semibold tabular-nums text-[var(--ink-success)]"
                title={t(
                  "Bu iş yapılırsa aynı uzunlukta bir dönemde beklenen en fazla ek tıklama (üst sınır).",
                )}
              >
                {gainText(gain)}
              </span>
            ) : null}
            {item.confidence !== "high" ? (
              <span className="text-xs text-muted">
                {t(CONFIDENCE_LABEL[item.confidence])}
              </span>
            ) : null}
          </span>
          {target && target.kind === "brand" ? (
            <button
              type="button"
              className="btn btn-sm max-sm:min-h-11"
              aria-expanded={brandOpen}
              onClick={() => setBrandOpen((v) => !v)}
            >
              {t("Marka adını gir")}
            </button>
          ) : target ? (
            <button
              type="button"
              className="btn btn-ghost btn-sm gap-1 max-sm:min-h-11"
              onClick={() => onTarget(target)}
            >
              {target.kind === "drill" ? t("Ayrıntı") : t("Bu kırılımı aç")}
              <ChevronRight className="size-3.5" aria-hidden />
            </button>
          ) : null}
          <button
            type="button"
            className="btn btn-ghost btn-sm gap-1 max-sm:min-h-11"
            onClick={onToggle}
          >
            <Check className="size-3.5" aria-hidden />
            {t("Yapıldı")}
          </button>
        </div>
      </div>
      {brandOpen ? (
        <div className="mt-3 sm:pl-9">
          <BrandTermsEditor
            projectId={projectId}
            onSaved={() => setBrandOpen(false)}
          />
        </div>
      ) : null}
    </li>
  );
}
