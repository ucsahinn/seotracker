import { Link } from "@tanstack/react-router";
import * as React from "react";
import { HelpTip } from "@/client/components/HelpTip";
import { formatPercent } from "@/client/lib/format";
import { t } from "@/shared/i18n";

type Severity = "critical" | "warning" | "info";

/* Turkish source strings, translated by t() where they render. */
const SEGMENTS: {
  key: Severity;
  label: string;
  /** The legend entry, a count and the severity in one sentence. */
  legend: string;
  fill: string;
  hint: string;
}[] = [
  {
    key: "critical",
    label: "Kritik",
    legend: "{count} kritik",
    fill: "bg-error",
    hint: "Aramada görünürlüğü doğrudan bozan sorunlar; önce bunlar.",
  },
  {
    key: "warning",
    label: "Uyarı",
    legend: "{count} uyarı",
    fill: "bg-warning",
    hint: "Sıralamayı zamanla aşındıran, ama acil olmayan sorunlar.",
  },
  {
    key: "info",
    label: "Bilgi",
    legend: "{count} bilgi",
    fill: "bg-base-content/30",
    hint: "Küçük iyileştirme fırsatları.",
  },
];

/**
 * How the findings divide by severity, as one animated bar.
 *
 * A bar rather than a ring: three parts on a card that is already a list read
 * best as a length, and the card has no room for a hole with a number in it.
 * Each part is a link into the audit's issue list, so the chart is also the
 * shortest way from "3 kritik" to the three criticals. The label and count
 * sit beside every segment, so colour is never the only encoding.
 */
export function SeverityBar({
  projectId,
  auditId,
  totals,
}: {
  projectId: string;
  auditId: string;
  totals: Record<Severity, number>;
}) {
  const total = totals.critical + totals.warning + totals.info;
  const [drawn, setDrawn] = React.useState(false);
  React.useEffect(() => {
    const frame = requestAnimationFrame(() => setDrawn(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (total === 0) return null;
  const present = SEGMENTS.filter((segment) => totals[segment.key] > 0);

  return (
    <div className="pt-1">
      <div
        className="flex h-2 origin-left gap-0.5 overflow-hidden rounded-full transition-transform duration-700 ease-out motion-reduce:transition-none"
        style={{ transform: drawn ? "scaleX(1)" : "scaleX(0)" }}
      >
        {present.map((segment) => (
          <Link
            key={segment.key}
            to="/p/$projectId/audit"
            params={{ projectId }}
            search={{ auditId, tab: "issues" as const, severity: segment.key }}
            className={`${segment.fill} min-w-1 transition-opacity hover:opacity-70`}
            style={{ flexGrow: totals[segment.key] }}
            title={t("{severity}: {count} bulgu. {hint}", {
              severity: t(segment.label),
              count: totals[segment.key],
              hint: t(segment.hint),
            })}
            // The legend below carries the same links with a readable hit
            // area, so the thin bar is a pointer shortcut only.
            aria-hidden
            tabIndex={-1}
          />
        ))}
      </div>
      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
        {present.map((segment) => (
          <li key={segment.key}>
            <Link
              to="/p/$projectId/audit"
              params={{ projectId }}
              search={{
                auditId,
                tab: "issues" as const,
                severity: segment.key,
              }}
              className="flex items-center gap-1.5 rounded-field py-0.5 transition-colors hover:text-base-content"
              title={t(segment.hint)}
            >
              <span
                className={`size-1.5 rounded-full ${segment.fill}`}
                aria-hidden
              />
              <span className="tabular-nums">
                {t(segment.legend, { count: totals[segment.key] })}
              </span>
              <span className="text-subtle tabular-nums">
                {formatPercent(totals[segment.key] / total, 0)}
              </span>
            </Link>
          </li>
        ))}
        <li>
          <HelpTip label={t("Önem düzeyi")}>
            {t(
              "Kritik sorunlar sayfanın aramada görünmesini engelleyebilir, uyarılar sıralamayı zamanla aşındırır, bilgi notları ise küçük iyileştirmelerdir. Çubuğa ya da altındaki etiketlerden birine tıklarsanız sorun listesine geçersiniz.",
            )}
          </HelpTip>
        </li>
      </ul>
    </div>
  );
}
