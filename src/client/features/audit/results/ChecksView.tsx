import {
  CheckCircle2,
  ChevronRight,
  CircleDashed,
  XCircle,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { sort } from "remeda";
import { formatCount, formatPoints } from "@/client/lib/format";
import {
  getIssueDescriptor,
  ISSUE_SEVERITY_ORDER,
} from "@/shared/audit-issues";
import type {
  AuditBreakdown,
  AuditCheck,
  CategoryScore,
} from "@/shared/auditBreakdown";
import {
  AUDIT_CATEGORY_LABEL,
  type AuditCategory,
} from "@/shared/auditCategory";
import { t } from "@/shared/i18n";
import { EXTERNAL_CHECK_ISSUES } from "@/shared/audit-issues/external-checks";
import { HTML_CHECK_ISSUES } from "@/shared/audit-issues/html-checks";
import { LIGHTHOUSE_AUDIT_ISSUES } from "@/shared/audit-issues/lighthouse-audits";
import { SPEED_ISSUES } from "@/shared/audit-issues/speed";
import { categoryCoverage, scoreWord } from "./scoreWords";

/**
 * Every check the audit ran, by category, with its state.
 *
 * A list of problems hides what went right, and "no problems in Güvenlik"
 * reads the same as "Güvenlik was not looked at". Here each category says
 * how many checks it passed, lists what failed with the pages and points at
 * stake, and names what could not be measured instead of counting it either
 * way.
 */
export function ChecksView({
  breakdown,
  focus,
  onOpenIssues,
}: {
  breakdown: AuditBreakdown;
  focus?: AuditCategory;
  onOpenIssues: () => void;
}) {
  return (
    <div className="grid items-start gap-4 xl:grid-cols-2">
      {breakdown.categories.map((category) => (
        <CategoryCard
          key={category.category}
          category={category}
          checks={breakdown.checks.filter(
            (check) => check.category === category.category,
          )}
          focused={focus === category.category}
          onOpenIssues={onOpenIssues}
        />
      ))}
    </div>
  );
}

function order(checks: AuditCheck[]) {
  return sort(
    checks,
    (a, b) =>
      b.points - a.points ||
      ISSUE_SEVERITY_ORDER[a.severity] - ISSUE_SEVERITY_ORDER[b.severity],
  );
}

/** Turkish source text; shown through t(). */
const UNMEASURED_REASON = {
  speed:
    "Hız ölçümü (PageSpeed) bu denetimde sonuç vermedi; nedeni Hız sekmesinde.",
  google:
    "Sayfalar Google'da henüz kontrol edilmedi; Dizin durumu sekmesinden sorabilirsiniz.",
  analytics:
    "Karşılaştırma için bağlı bir Google Analytics mülkü ve sayfalarda bir G- etiketi gerekir.",
  site: "Site hakkındaki bilginin bir kısmı (sertifika, alan adı kaydı, DNS) bu denetimde okunamadı.",
  lighthouse:
    "Lighthouse bu denetimde bu ölçümleri raporlamadı, ya da denetim bu kontroller eklenmeden önce yapıldı.",
  external:
    "Dış bağlantı ve görsel boyutu kontrolü bu denetimde açık değildi ya da ölçülemedi.",
  html: "Bu kontroller denetimden sonra eklendi; yeni bir denetim onları da ölçer.",
} as const;

/**
 * Why a category's checks had no data, one sentence per cause, so a dozen
 * "Ölçülmedi" rows become one line that says what to do about them.
 */
function unmeasuredReasons(checks: AuditCheck[]) {
  const reasons = new Set<keyof typeof UNMEASURED_REASON>();
  for (const check of checks) {
    if (check.issueType in SPEED_ISSUES) reasons.add("speed");
    else if (check.issueType in LIGHTHOUSE_AUDIT_ISSUES) {
      reasons.add("lighthouse");
    } else if (check.issueType in EXTERNAL_CHECK_ISSUES) {
      reasons.add("external");
    } else if (check.issueType in HTML_CHECK_ISSUES) reasons.add("html");
    else if (
      check.issueType.startsWith("google-") ||
      check.issueType === "stale-google-verdicts"
    ) {
      reasons.add("google");
    } else if (check.issueType === "analytics-id-mismatch") {
      reasons.add("analytics");
    } else reasons.add("site");
  }
  return [...reasons].map((key) => UNMEASURED_REASON[key]);
}

function CategoryCard({
  category,
  checks,
  focused,
  onOpenIssues,
}: {
  category: CategoryScore;
  checks: AuditCheck[];
  focused: boolean;
  onOpenIssues: () => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const [showPassed, setShowPassed] = useState(false);
  const [showUnknown, setShowUnknown] = useState(false);
  useEffect(() => {
    if (focused) ref.current?.scrollIntoView({ block: "start" });
  }, [focused]);
  const failed = order(checks.filter((check) => check.state === "failed"));
  const unknown = checks.filter((check) => check.state === "unknown");
  const passed = checks.filter((check) => check.state === "passed");
  const coverage = categoryCoverage(category);
  const summary = [
    t("{count} geçti", { count: category.passed }),
    category.failed > 0
      ? t("{count} sorunlu", { count: category.failed })
      : null,
    category.unknown > 0
      ? t("{count} ölçülmedi", { count: category.unknown })
      : null,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <section
      ref={ref}
      aria-labelledby={`check-cat-${category.category}`}
      className={`min-w-0 scroll-mt-4 rounded-box border bg-base-100 ${focused ? "border-primary/50" : "border-[var(--hairline)]"}`}
    >
      <header className="space-y-2.5 border-b border-[var(--hairline)] px-4 py-3">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3
              id={`check-cat-${category.category}`}
              className="text-sm font-semibold"
            >
              {t(AUDIT_CATEGORY_LABEL[category.category])}
            </h3>
            <p className="mt-0.5 text-sm tabular-nums text-muted">
              {t("{total} kontrol: {summary}", {
                total: formatCount(checks.length),
                summary,
              })}
            </p>
          </div>
          <div className="shrink-0 text-right">
            {category.score === null ? (
              <span className="text-sm text-subtle">{t("Ölçülmedi")}</span>
            ) : (
              <>
                <p className="text-2xl font-semibold leading-none tabular-nums">
                  {category.score}
                </p>
                <p className="mt-1 text-xs text-muted">
                  {coverage === "partial"
                    ? t("Kısmi veri")
                    : scoreWord(category.score)}
                </p>
              </>
            )}
          </div>
        </div>
        <SegmentBar
          passed={category.passed}
          failed={category.failed}
          unknown={category.unknown}
        />
      </header>

      <ul className="divide-y divide-[var(--hairline)]">
        {failed.map((check) => (
          <CheckRow key={check.issueType} check={check} onOpen={onOpenIssues} />
        ))}
      </ul>

      {unknown.length > 0 ? (
        <Disclosure
          open={showUnknown}
          onToggle={() => setShowUnknown((value) => !value)}
          label={t("{count} kontrol ölçülmedi: neden?", {
            count: unknown.length,
          })}
          bordered={failed.length > 0}
        >
          <div className="space-y-1 px-4 pb-2 text-sm text-muted">
            {unmeasuredReasons(unknown).map((reason) => (
              <p key={reason} className="max-w-prose">
                {t(reason)}
              </p>
            ))}
          </div>
          <ul className="divide-y divide-[var(--hairline)]">
            {unknown.map((check) => (
              <CheckRow key={check.issueType} check={check} />
            ))}
          </ul>
        </Disclosure>
      ) : null}

      {passed.length > 0 ? (
        <Disclosure
          open={showPassed}
          onToggle={() => setShowPassed((value) => !value)}
          label={t("Geçen {count} kontrol", {
            count: formatCount(passed.length),
          })}
          bordered={failed.length > 0 || unknown.length > 0}
        >
          <ul className="divide-y divide-[var(--hairline)]">
            {passed.map((check) => (
              <CheckRow key={check.issueType} check={check} />
            ))}
          </ul>
        </Disclosure>
      ) : null}
    </section>
  );
}

function Disclosure({
  open,
  onToggle,
  label,
  bordered,
  children,
}: {
  open: boolean;
  onToggle: () => void;
  label: string;
  bordered: boolean;
  children: ReactNode;
}) {
  return (
    <div className={bordered ? "border-t border-[var(--hairline)]" : ""}>
      <button
        type="button"
        className="focus-inset flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-muted transition-colors hover:bg-base-200/40"
        aria-expanded={open}
        onClick={onToggle}
      >
        <ChevronRight
          aria-hidden
          className={`size-4 transition-transform ${open ? "rotate-90" : ""}`}
        />
        {label}
      </button>
      <div
        className="reveal-height"
        data-open={open}
        inert={!open}
        aria-hidden={!open}
      >
        <div>{children}</div>
      </div>
    </div>
  );
}

/**
 * The card's checks in one bar: passed, failed, not measured. The line
 * above says the same in words, so the segments never carry it alone; the
 * unmeasured part is hatched, a gap rather than a colour.
 */
function SegmentBar({
  passed,
  failed,
  unknown,
}: {
  passed: number;
  failed: number;
  unknown: number;
}) {
  const total = passed + failed + unknown;
  if (total === 0) return null;
  const pct = (n: number) => `${(n / total) * 100}%`;
  return (
    <div
      aria-hidden
      className="flex h-1.5 gap-0.5 overflow-hidden rounded-full"
    >
      {passed > 0 ? (
        <span
          className="h-full"
          style={{ width: pct(passed), background: "var(--mark-success)" }}
        />
      ) : null}
      {failed > 0 ? (
        <span
          className="h-full"
          style={{ width: pct(failed), background: "var(--mark-warning)" }}
        />
      ) : null}
      {unknown > 0 ? (
        <span className="mark-hatched h-full" style={{ width: pct(unknown) }} />
      ) : null}
    </div>
  );
}

const STATE_ICON = {
  passed: CheckCircle2,
  failed: XCircle,
  unknown: CircleDashed,
};

function stateInk(check: AuditCheck): string {
  if (check.state === "passed") return "var(--ink-success)";
  if (check.state === "unknown") return "var(--text-subtle)";
  return check.severity === "critical"
    ? "var(--ink-error)"
    : "var(--ink-warning)";
}

function stateText(check: AuditCheck): string {
  if (check.state === "passed") return t("Geçti");
  if (check.state === "unknown") return t("Ölçülmedi");
  return check.siteLevel
    ? t("Tüm site")
    : t("{count} sayfada", { count: formatCount(check.pages) });
}

function CheckRow({
  check,
  onOpen,
}: {
  check: AuditCheck;
  onOpen?: () => void;
}) {
  const descriptor = getIssueDescriptor(check.issueType);
  const title = descriptor ? t(descriptor.title) : check.issueType;
  const Icon = STATE_ICON[check.state];
  const points =
    check.points > 0 ? (
      <span
        title={t(
          "Düzeltilirse site puanına yaklaşık bu kadar eklenir; değerler toplanmaz.",
        )}
      >
        {t("{points} puan kayıp", {
          points: formatPoints(check.points, false),
        })}
      </span>
    ) : null;
  // On a phone the title takes the full width and the figures go under it;
  // side by side, a 390px row cut every title to two words.
  const content = (
    <>
      <Icon
        aria-hidden
        className="mt-0.5 size-4 shrink-0 sm:mt-0"
        style={{ color: stateInk(check) }}
      />
      <span className="min-w-0 flex-1">
        <span className="block text-sm sm:truncate" title={title}>
          {title}
        </span>
        <span className="mt-0.5 flex flex-wrap gap-x-3 text-xs tabular-nums text-muted sm:hidden">
          <span>{stateText(check)}</span>
          {points}
        </span>
      </span>
      <span className="hidden shrink-0 text-xs tabular-nums text-muted sm:inline">
        {stateText(check)}
      </span>
      {points ? (
        <span className="hidden w-28 shrink-0 text-right text-xs tabular-nums text-muted sm:inline">
          {points}
        </span>
      ) : null}
    </>
  );
  return (
    <li>
      {onOpen ? (
        <button
          type="button"
          onClick={onOpen}
          className="focus-inset flex w-full items-start gap-3 px-4 py-2 text-left transition-colors hover:bg-base-200/40 sm:items-center"
        >
          {content}
        </button>
      ) : (
        <div className="flex items-start gap-3 px-4 py-2 sm:items-center">
          {content}
        </div>
      )}
    </li>
  );
}
