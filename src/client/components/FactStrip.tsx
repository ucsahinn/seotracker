import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { t } from "@/shared/i18n";

export type Fact = {
  label: string;
  value: ReactNode;
  /** Smaller line under the value, for the one qualifier that matters. */
  hint?: ReactNode;
  tone?: "warning";
};

function Facts({ facts }: { facts: Fact[] }) {
  return (
    <dl
      className="fact-strip-grid"
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 8rem), 1fr))",
        gap: "0.5rem 1rem",
      }}
    >
      {facts.map((fact) => (
        <div key={fact.label} className="fact" data-tone={fact.tone}>
          <dt>{fact.label}</dt>
          <dd>
            <span className="fact-value">{fact.value}</span>
            {fact.hint ? <span className="fact-hint">{fact.hint}</span> : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Primary source facts stay visible; secondary facts and caveats share one disclosure. */
export function FactStrip({
  facts,
  label,
  details,
  detailsLabel,
}: {
  facts: Fact[];
  label: string;
  details?: ReactNode;
  detailsLabel?: string;
}) {
  const secondary = facts.slice(2);
  return (
    <section className="fact-strip" aria-label={label}>
      <Facts facts={facts.slice(0, 2)} />
      {secondary.length > 0 || details ? (
        <details className="fact-strip-details group">
          <summary className="gap-2">
            <ChevronRight
              aria-hidden="true"
              className="size-3.5 shrink-0 transition-transform group-open:rotate-90"
            />
            {detailsLabel ?? t("Ayrıntılar")}
          </summary>
          {secondary.length > 0 ? <Facts facts={secondary} /> : null}
          {details ? <div className="space-y-1.5">{details}</div> : null}
        </details>
      ) : null}
    </section>
  );
}
