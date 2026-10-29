import { HelpTip } from "@/client/components/HelpTip";
import { MetricRow, MetricTile } from "@/client/components/MetricTile";
import { DATA_SERIES } from "@/client/components/Chart";
import type { SummaryPlan } from "./reportBuckets";
import type { Kpi } from "./reportKpis";
import { formatGa4Metric } from "./ReportTable";
import { t } from "@/shared/i18n";

/** Solid marks preserve category identities and overlapping user counts. */
export function ReportSummary({
  plan,
  kpis,
  selectedKey,
  onSelect,
  currencyCode,
}: {
  plan: SummaryPlan | null;
  kpis: Kpi[];
  selectedKey: string | null;
  onSelect: (key: string | null) => void;
  currencyCode: string | null;
}) {
  if (!plan && !kpis.length) return null;
  const max = Math.max(1, ...(plan?.segments.map((s) => s.value) ?? []));
  return (
    <div className="space-y-4">
      {kpis.length ? (
        <MetricRow>
          {kpis.map((k) => (
            <MetricTile
              key={k.label}
              metric={k.metric}
              label={k.label}
              value={k.value}
              animateTo={k.animateTo}
              hint={k.hint}
            />
          ))}
        </MetricRow>
      ) : null}
      {plan ? (
        <section className="rounded-box border border-base-300 bg-base-100 p-4">
          <h2 className="text-sm font-medium">{plan.title}</h2>
          <p className="mb-3 text-xs text-muted">
            {t("Birine tıklayın, aşağıdaki tablo o satırlara daralsın.")}
          </p>
          {!plan.showShares ? (
            <HelpTip label={t("Veri ayrıntıları")}>
              {t(
                "Kullanıcılar kategoriler arasında tekrar sayılabilir; bu değerler benzersiz mülk toplamı değildir.",
              )}
            </HelpTip>
          ) : null}
          <div className="space-y-1">
            {plan.segments.map((s) => (
              <button
                type="button"
                key={s.key}
                aria-pressed={s.key === selectedKey}
                onClick={() => onSelect(s.key === selectedKey ? null : s.key)}
                className="block min-h-11 w-full rounded-field px-2 py-2 text-left hover:bg-base-200 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary"
              >
                <span className="flex min-w-0 flex-wrap justify-between gap-2 text-xs">
                  <span className="break-all">{s.label}</span>
                  <span>
                    {formatGa4Metric(plan.field, s.value, currencyCode)}
                  </span>
                </span>
                <span aria-hidden className="mt-1 block h-1.5 w-full">
                  <span
                    className="block h-full origin-left rounded-full motion-safe:transition-transform"
                    style={{
                      transform: "scaleX(" + s.value / max + ")",
                      backgroundColor:
                        plan.field === "sessions"
                          ? DATA_SERIES.sessions
                          : plan.field === "keyEvents"
                            ? DATA_SERIES.conversions
                            : "var(--color-base-content)",
                    }}
                  />
                </span>
              </button>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
