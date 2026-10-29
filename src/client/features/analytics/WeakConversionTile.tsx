import { AnimatedNumber } from "@/client/components/AnimatedNumber";
import { formatCount } from "@/shared/format";
import { t } from "@/shared/i18n";
import type { ReportRow } from "./reportInsights";
/**
 * The one finding on this screen worth acting on first: busy pages that
 * convert below the report's median. It used to be one chip among four; as a
 * tile it says how many and opens the list.
 */
export function WeakConversionTile({
  chip,
  active,
  onShow,
  candidate,
}: {
  chip: { count: number; hint: string } | undefined;
  active: boolean;
  onShow: () => void;
  candidate?: ReportRow;
}) {
  if (!chip || chip.count === 0) return null;
  return (
    <div className="space-y-1.5">
      <button
        type="button"
        aria-pressed={active}
        onClick={onShow}
        className={`flex w-full flex-wrap items-center gap-x-4 gap-y-1 rounded-box border px-4 py-3 text-left transition-colors ${
          active
            ? "border-primary bg-primary/5"
            : "border-base-300 bg-base-100 hover:border-primary/40"
        }`}
      >
        <span className="text-2xl font-semibold tabular-nums">
          <AnimatedNumber value={chip.count} format={formatCount} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-medium">
            {t("Trafiği yüksek, dönüşümü düşük sayfa")}
          </span>
          {candidate ? (
            <span className="block break-all text-xs text-muted">
              {String(candidate.hostName ?? "")}
              {String(candidate.landingPage ?? "")} ·{" "}
              {t("{count} oturum", {
                count: formatCount(Number(candidate.sessions)),
              })}
            </span>
          ) : null}
        </span>
        <span className="text-sm text-muted">
          {active ? t("Listede gösteriliyor") : t("Listele")}
        </span>
      </button>
      <details className="max-w-prose text-sm text-muted">
        <summary className="min-h-11 cursor-pointer py-3">
          {t("Ayrıntılar")}
        </summary>
        <p>{chip.hint}</p>
      </details>
    </div>
  );
}
