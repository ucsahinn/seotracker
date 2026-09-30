import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { formatDecimal, formatDuration } from "@/client/lib/format";
import type { LighthouseFieldData, LighthouseMetrics } from "./types";

/**
 * Lab against field, for the metrics Google reports on both sides.
 *
 * The screen already showed the two sets — one grid of Lighthouse numbers, one
 * grid of CrUX percentiles — a few hundred pixels apart, with no way to read
 * the one question that decides what to do next: is the lab run telling the
 * truth about what visitors experience? A 1.2 s lab LCP beside a 4.8 s field
 * LCP means the test machine is not the audience, and chasing the lab score
 * will not move the number Google ranks on.
 *
 * INP is deliberately absent. The lab run cannot simulate an interaction, so
 * `pagespeedPayload` copies the field percentile into the lab slot — comparing
 * them would draw a perfect match that means nothing.
 */

/** Below this the two sides are the same measurement with noise on top. */
const CLOSE = 1.25;

/** A gap under this many ms is not worth a verdict, whatever the ratio. */
const FLOOR_MS = 200;

/** Same idea for CLS, which is unitless and small. */
const FLOOR_CLS = 0.02;

type Row = {
  label: string;
  title: string;
  lab: number;
  field: number;
  format: (value: number) => string;
  floor: number;
};

export function LabFieldComparison({
  metrics,
  fieldData,
}: {
  metrics?: LighthouseMetrics | null;
  fieldData?: LighthouseFieldData | null;
}) {
  const rows = getRows(metrics, fieldData);
  if (rows.length === 0) return null;

  const optimistic = rows.filter((row) => verdictOf(row) === "slower").length;

  return (
    <section className="rounded-box border border-base-300 bg-base-200/25 px-4 py-3">
      <h3 className="text-xs uppercase tracking-wide text-muted">
        Laboratuvar ↔ gerçek kullanıcı
      </h3>
      <p className="mt-1 text-xs leading-relaxed text-muted">
        {optimistic > 0
          ? "Test makinesi sitenizi ziyaretçilerden daha hızlı görüyor. Google sıralamada sağdaki sütunu kullanır."
          : "İki ölçüm örtüşüyor; laboratuvar puanı ziyaretçilerin gördüğünü temsil ediyor."}
      </p>
      <table className="mt-3 table table-sm">
        <thead>
          <tr>
            <th>Ölçüm</th>
            <th className="text-right">Laboratuvar</th>
            <th className="text-right">Gerçek kullanıcı</th>
            <th className="text-right">Fark</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <ComparisonRow key={row.label} row={row} />
          ))}
        </tbody>
      </table>
    </section>
  );
}

function ComparisonRow({ row }: { row: Row }) {
  const verdict = verdictOf(row);

  return (
    <tr>
      <td>
        <span className="font-medium uppercase">{row.label}</span>
        <span className="ml-2 text-xs text-muted normal-case">{row.title}</span>
      </td>
      <td className="text-right tabular-nums text-muted">
        {row.format(row.lab)}
      </td>
      <td className="text-right tabular-nums font-medium">
        {row.format(row.field)}
      </td>
      <td className="text-right">
        <GapLabel row={row} verdict={verdict} />
      </td>
    </tr>
  );
}

/*
 * Arrow as well as tint: success and error sit at nearly the same lightness in
 * both themes, so the colour alone does not carry the direction.
 */
function GapLabel({
  row,
  verdict,
}: {
  row: Row;
  verdict: "slower" | "faster" | "close";
}) {
  if (verdict === "close") {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-muted">
        <Minus aria-hidden className="size-3" />
        Örtüşüyor
      </span>
    );
  }

  const gap = row.format(Math.abs(row.field - row.lab));

  if (verdict === "slower") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--ink-error)]">
        <ArrowUp aria-hidden className="size-3" />
        {gap} daha yavaş
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--ink-success)]">
      <ArrowDown aria-hidden className="size-3" />
      {gap} daha hızlı
    </span>
  );
}

/** Which way the real users land relative to the test machine. */
function verdictOf(row: Row): "slower" | "faster" | "close" {
  if (Math.abs(row.field - row.lab) < row.floor) return "close";
  if (row.lab === 0) return row.field > 0 ? "slower" : "close";

  const ratio = row.field / row.lab;
  if (ratio >= CLOSE) return "slower";
  if (ratio <= 1 / CLOSE) return "faster";
  return "close";
}

function getRows(
  metrics?: LighthouseMetrics | null,
  fieldData?: LighthouseFieldData | null,
): Row[] {
  if (!metrics || !fieldData) return [];

  const candidates: Array<
    Omit<Row, "lab" | "field"> & {
      lab: number | null;
      field: number | null;
    }
  > = [
    {
      label: "LCP",
      title: "en büyük içerik",
      lab: metrics.largestContentfulPaint.numericValue,
      field: fieldData.largestContentfulPaint?.percentile ?? null,
      format: formatDuration,
      floor: FLOOR_MS,
    },
    {
      label: "FCP",
      title: "ilk içerik",
      lab: metrics.firstContentfulPaint.numericValue,
      field: fieldData.firstContentfulPaint?.percentile ?? null,
      format: formatDuration,
      floor: FLOOR_MS,
    },
    {
      label: "TTFB",
      title: "sunucu yanıtı",
      lab: metrics.serverResponseTime.numericValue,
      field: fieldData.timeToFirstByte?.percentile ?? null,
      format: formatDuration,
      floor: FLOOR_MS,
    },
    {
      label: "CLS",
      title: "düzen kayması",
      lab: metrics.cumulativeLayoutShift.numericValue,
      // CrUX reports CLS scaled by 100; the lab value is the raw score.
      field:
        fieldData.cumulativeLayoutShift == null
          ? null
          : fieldData.cumulativeLayoutShift.percentile / 100,
      format: (value: number) => formatDecimal(value, 3),
      floor: FLOOR_CLS,
    },
  ];

  return candidates.filter(
    (row): row is Row => row.lab != null && row.field != null,
  );
}
