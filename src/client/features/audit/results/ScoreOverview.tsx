import {
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  CircleDashed,
  OctagonAlert,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import { sort } from "remeda";
import { formatCount, formatDate, formatPoints } from "@/client/lib/format";
import type { AuditBreakdown, CategoryScore } from "@/shared/auditBreakdown";
import {
  AUDIT_CATEGORY_LABEL,
  type AuditCategory,
} from "@/shared/auditCategory";
import { t } from "@/shared/i18n";
import { ScoreGauge } from "./ScoreGauge";
import {
  categoryCoverage,
  scoreFill,
  scoreVerdict,
  scoreWord,
} from "./scoreWords";

/**
 * The audit at a glance: one score on a dial, four counts a reader can
 * repeat to someone else ("no critical problems, 30 improvements, 86 checks
 * passed, 19 not measured"), the score broken down by category, worst
 * first, and -- once there is more than one audit -- where the score has
 * been.
 *
 * Every number here comes from `buildAuditBreakdown`, which uses the same
 * formula as the score, so "Güvenlik: 2,6 puan kayıp" adds up with the dial.
 * The counts share the findings' vocabulary (kritik, uyarı, bilgi) and all
 * count checks, so the four tiles add up to the checks the audit has.
 */

type ScorePoint = {
  auditId: string;
  startedAt: string;
  score: number | null;
  /** Scored on the checks every audit in the window measured, not all of its own. */
  partial?: boolean;
};

export function ScoreOverview({
  score,
  breakdown,
  history,
  animate = false,
  onOpenChecks,
}: {
  score: number;
  breakdown: AuditBreakdown;
  /** Oldest first, this audit last; undefined while it loads. */
  history: ScorePoint[] | undefined;
  /** The reader watched this audit finish: the dial counts up once. */
  animate?: boolean;
  onOpenChecks: (category?: AuditCategory) => void;
}) {
  const { counters } = breakdown;
  const scored = (history ?? []).filter(
    (point): point is ScorePoint & { score: number } => point.score !== null,
  );
  const hasHistory = scored.length >= 2;
  // Worst first: the category to open is the one at the top. A category
  // nobody could measure has no place in that order and goes last.
  const categories = sort(
    breakdown.categories,
    (a, b) => (a.score ?? 101) - (b.score ?? 101),
  );

  return (
    <section
      aria-labelledby="audit-score-heading"
      className="rounded-box border border-[var(--hairline)] bg-base-100 shadow-[var(--shadow-raise)]"
    >
      <div className="grid gap-6 p-5 md:grid-cols-[15rem_1fr] md:items-center">
        <div>
          <ScoreGauge score={score} animate={animate} />
          {history !== undefined && !hasHistory ? (
            <p className="mx-auto mt-1 max-w-[15rem] text-center text-xs text-subtle">
              {t("İlk denetim. Puanın seyri bir sonrakinde başlar.")}
            </p>
          ) : null}
        </div>
        <div className="min-w-0">
          <h2 id="audit-score-heading" className="text-base font-semibold">
            {t("Site puanı")}
          </h2>
          <p className="mt-1 max-w-prose text-sm text-muted">
            {scoreVerdict(score, counters.errors)}
          </p>
          <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-box border border-[var(--hairline)] bg-[var(--hairline)] lg:grid-cols-4">
            <Counter
              Icon={OctagonAlert}
              ink={counters.errors > 0 ? "var(--ink-error)" : undefined}
              value={counters.errors}
              label={t("Kritik sorun")}
            />
            <Counter
              Icon={TriangleAlert}
              ink={
                counters.opportunities > 0 ? "var(--ink-warning)" : undefined
              }
              value={counters.opportunities}
              label={t("İyileştirme")}
              hint={t("Uyarı ve bilgi")}
            />
            <Counter
              Icon={CheckCircle2}
              ink="var(--ink-success)"
              value={counters.passed}
              label={t("Geçen kontrol")}
            />
            <Counter
              Icon={CircleDashed}
              value={counters.unknown}
              label={t("Ölçülmedi")}
              hint={t("Veri toplanamadı")}
            />
          </dl>
        </div>
      </div>

      <div
        className={`grid gap-6 border-t border-[var(--hairline)] p-5 ${hasHistory ? "lg:grid-cols-[1fr_17rem]" : ""}`}
      >
        <div>
          <div className="mb-2 flex items-baseline justify-between gap-3">
            <h3 className="text-sm font-medium">{t("Kategori puanları")}</h3>
            <button
              type="button"
              className="link link-primary text-xs"
              onClick={() => onOpenChecks()}
            >
              {t("Tüm kontroller")}
            </button>
          </div>
          <ul
            className={`grid gap-x-6 gap-y-1 sm:grid-cols-2 ${hasHistory ? "" : "xl:grid-cols-3"}`}
          >
            {categories.map((category) => (
              <CategoryRow
                key={category.category}
                category={category}
                onOpen={() => onOpenChecks(category.category)}
              />
            ))}
          </ul>
        </div>
        {hasHistory ? <ScoreHistory scored={scored} /> : null}
      </div>
    </section>
  );
}

function Counter({
  Icon,
  ink,
  value,
  label,
  hint,
}: {
  Icon: LucideIcon;
  /** Only when the count says something is wrong (or right); zero stays quiet. */
  ink?: string;
  value: number;
  label: string;
  hint?: string;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-0.5 bg-base-100 px-4 py-3">
      <dt className="order-2 text-sm font-medium">{label}</dt>
      <dd className="order-1 flex items-center gap-2 text-2xl font-semibold leading-tight tabular-nums">
        {formatCount(value)}
        <Icon
          aria-hidden
          className="size-4"
          style={{ color: ink ?? "var(--text-subtle)" }}
        />
      </dd>
      {hint ? (
        <dd className="order-3 truncate text-xs text-subtle">{hint}</dd>
      ) : null}
    </div>
  );
}

function CategoryRow({
  category,
  onOpen,
}: {
  category: CategoryScore;
  onOpen: () => void;
}) {
  const label = t(AUDIT_CATEGORY_LABEL[category.category]);
  const coverage = categoryCoverage(category);
  const total = category.passed + category.failed + category.unknown;
  const measured = category.passed + category.failed;
  const coverageText = t("{measured}/{total} kontrol ölçüldü", {
    measured: formatCount(measured),
    total: formatCount(total),
  });
  const meta =
    coverage === "unmeasured"
      ? t("Bu denetimde veri toplanamadı")
      : [
          category.impact > 0
            ? t("{points} puan kayıp", {
                points: formatPoints(category.impact, false),
              })
            : t("{passed}/{total} geçti", {
                passed: formatCount(category.passed),
                total: formatCount(measured),
              }),
          coverage === "partial" ? coverageText : null,
        ]
          .filter(Boolean)
          .join(", ");

  return (
    <li>
      <button
        type="button"
        onClick={onOpen}
        aria-label={t("{category}: {state}. Kontrolleri aç", {
          category: label,
          state:
            category.score === null
              ? t("Ölçülmedi")
              : coverage === "partial"
                ? `${category.score}/100, ${t("Kısmi veri")}`
                : `${category.score}/100, ${scoreWord(category.score)}`,
        })}
        className="focus-inset flex w-full flex-col gap-1.5 rounded-field px-2 py-2 text-left transition-colors hover:bg-base-200/50"
      >
        <span className="flex items-baseline justify-between gap-3">
          <span className="min-w-0 truncate text-sm">{label}</span>
          <span className="shrink-0 text-sm tabular-nums">
            {category.score === null ? (
              <span className="text-subtle">{t("Ölçülmedi")}</span>
            ) : (
              <>
                <span className="font-semibold">{category.score}</span>
                <span className="text-subtle">
                  {" "}
                  {coverage === "partial"
                    ? t("Kısmi veri")
                    : scoreWord(category.score)}
                </span>
              </>
            )}
          </span>
        </span>
        <span
          className={`h-1.5 overflow-hidden rounded-full ${category.score === null ? "mark-hatched" : "bg-[var(--mark-track)]"}`}
        >
          {category.score === null ? null : (
            <span
              className="block h-full rounded-full"
              style={{
                width: `${category.score}%`,
                background: scoreFill(category.score),
              }}
            />
          )}
        </span>
        <span className="text-xs tabular-nums text-subtle">{meta}</span>
      </button>
    </li>
  );
}

function ScoreHistory({
  scored,
}: {
  scored: (ScorePoint & { score: number })[];
}) {
  const last = scored.at(-1);
  const previous = scored.at(-2);
  const delta = last && previous ? last.score - previous.score : null;

  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <h3 className="text-sm font-medium">{t("Puan geçmişi")}</h3>
        {delta === null ? null : <Delta value={delta} />}
      </div>
      <ol
        className="flex h-32 items-end gap-2"
        aria-label={t("Son {count} denetimin puanı", {
          count: scored.length,
        })}
      >
        {scored.map((point, index) => (
          <li
            key={point.auditId}
            className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1"
            title={`${formatDate(point.startedAt)}: ${point.score}`}
          >
            <span
              className={`text-xs tabular-nums ${index === scored.length - 1 ? "font-semibold" : "text-muted"}`}
            >
              {point.score}
            </span>
            <span
              className="w-full max-w-8 rounded-t-[4px]"
              style={{
                height: `${Math.max(4, point.score * 0.8)}%`,
                background: scoreFill(point.score),
                opacity: index === scored.length - 1 ? 1 : 0.55,
              }}
            />
            <span className="w-full truncate text-center text-[11px] text-subtle">
              {formatDate(point.startedAt)}
            </span>
          </li>
        ))}
      </ol>
      {scored.some((point) => point.partial) ? (
        <p className="mt-2 text-xs text-subtle">
          {t(
            "Yeni kontroller eklendi; bu karşılaştırma yalnızca iki denetimin de ölçtüğü kontrolleri kapsar.",
          )}
        </p>
      ) : null}
    </div>
  );
}

function Delta({ value }: { value: number }) {
  if (value === 0) {
    return <span className="text-xs text-subtle">{t("Öncekiyle aynı")}</span>;
  }
  const up = value > 0;
  const Icon = up ? ArrowUpRight : ArrowDownRight;
  return (
    <span
      className="inline-flex items-center gap-0.5 text-xs font-medium tabular-nums"
      style={{ color: up ? "var(--ink-success)" : "var(--ink-error)" }}
    >
      <Icon aria-hidden className="size-3.5" />
      {t("{value} puan, öncekine göre", {
        value: up ? `+${formatCount(value)}` : `−${formatCount(-value)}`,
      })}
    </span>
  );
}
