import { Link } from "@tanstack/react-router";
import * as React from "react";
import { HelpTip } from "@/client/components/HelpTip";
import { formatCount, formatPercent } from "@/client/lib/format";

type Severity = "critical" | "warning" | "info";

const SEGMENTS: {
  key: Severity;
  label: string;
  fill: string;
  hint: string;
}[] = [
  {
    key: "critical",
    label: "Kritik",
    fill: "bg-error",
    hint: "Aramada görünürlüğü doğrudan bozan sorunlar; önce bunlar.",
  },
  {
    key: "warning",
    label: "Uyarı",
    fill: "bg-warning",
    hint: "Sıralamayı zamanla aşındıran, ama acil olmayan sorunlar.",
  },
  {
    key: "info",
    label: "Bilgi",
    fill: "bg-base-content/30",
    hint: "Fırsat niteliğinde küçük iyileştirmeler.",
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
            search={{ auditId, tab: "issues" as const }}
            className={`${segment.fill} min-w-1 transition-opacity hover:opacity-70`}
            style={{ flexGrow: totals[segment.key] }}
            title={`${segment.label}: ${formatCount(totals[segment.key])} bulgu. ${segment.hint}`}
            aria-label={`${segment.label}: ${formatCount(totals[segment.key])} bulgu`}
          />
        ))}
      </div>
      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
        {present.map((segment) => (
          <li key={segment.key} className="flex items-center gap-1.5">
            <span
              className={`size-1.5 rounded-full ${segment.fill}`}
              aria-hidden
            />
            <span className="tabular-nums">
              {formatCount(totals[segment.key])} {segment.label.toLowerCase()}
            </span>
            <span className="text-subtle tabular-nums">
              {formatPercent(totals[segment.key] / total, 0)}
            </span>
          </li>
        ))}
        <li>
          <HelpTip label="Önem düzeyi">
            Kritik sorunlar sayfanın aramada görünmesini engelleyebilir,
            uyarılar sıralamayı zamanla aşındırır, bilgi notları ise küçük
            iyileştirmelerdir. Renkli çubuğa tıklarsanız sorun listesine
            geçersiniz.
          </HelpTip>
        </li>
      </ul>
    </div>
  );
}
