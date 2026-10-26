import { Gauge } from "lucide-react";
import { formatCount, formatDecimal } from "@/client/lib/format";
import { t } from "@/shared/i18n";
import type { AuditInsightsData } from "./types";

type Speed = NonNullable<AuditInsightsData["speed"]>;
type Field = NonNullable<Speed["page"]>;
type FieldKey = Exclude<keyof Field, "overall">;
type LabKey = keyof Speed["lab"];

/*
 * Google's Core Web Vitals boundaries, for the lab column (field rows carry
 * Google's own FAST / AVERAGE / SLOW verdict).
 */
const ROWS: {
  name: string;
  plain: string;
  field: FieldKey;
  lab: LabKey;
  good: number;
  poor: number;
  cls?: boolean;
}[] = [
  {
    name: "LCP",
    plain: "Ana içeriğin görünmesi",
    field: "largestContentfulPaint",
    lab: "lcpMs",
    good: 2500,
    poor: 4000,
  },
  {
    name: "INP",
    plain: "Tıklamaya tepki",
    field: "interactionToNextPaint",
    lab: "inpMs",
    good: 200,
    poor: 500,
  },
  {
    name: "CLS",
    plain: "Görsel kayma",
    field: "cumulativeLayoutShift",
    lab: "cls",
    good: 0.1,
    poor: 0.25,
    cls: true,
  },
  {
    name: "FCP",
    plain: "İlk içerik",
    field: "firstContentfulPaint",
    lab: "fcpMs",
    good: 1800,
    poor: 3000,
  },
  {
    name: "TTFB",
    plain: "Sunucunun ilk yanıtı",
    field: "timeToFirstByte",
    lab: "ttfbMs",
    good: 800,
    poor: 1800,
  },
];

type Band = "good" | "fair" | "poor";

/** Turkish source text; shown through t(). */
const BAND_WORD: Record<Band, string> = {
  good: "İyi",
  fair: "İyileştirilmeli",
  poor: "Zayıf",
};

const BAND_DOT: Record<Band, string> = {
  good: "bg-success",
  fair: "bg-[var(--mark-warning)]",
  poor: "bg-error",
};

function fieldBand(category: string): Band | null {
  if (category === "FAST") return "good";
  if (category === "AVERAGE") return "fair";
  if (category === "SLOW") return "poor";
  return null;
}

function Value({ text, band }: { text: string; band: Band | null }) {
  return (
    <span className="inline-flex flex-col items-end gap-0.5">
      <span className="font-medium tabular-nums">{text}</span>
      {band ? (
        <span className="inline-flex items-center gap-1 text-[11px] text-muted">
          <span
            className={`size-1.5 rounded-full ${BAND_DOT[band]}`}
            aria-hidden
          />
          {t(BAND_WORD[band])}
        </span>
      ) : null}
    </span>
  );
}

function NotMeasured() {
  return <span className="text-xs text-subtle">{t("Ölçülmedi")}</span>;
}

function show(value: number, cls: boolean | undefined) {
  return cls ? formatDecimal(value, 2) : `${formatCount(Math.round(value))} ms`;
}

function FieldCell({
  field,
  row,
}: {
  field: Field | null;
  row: (typeof ROWS)[number];
}) {
  const metric = field?.[row.field];
  if (!metric) return <NotMeasured />;
  const value = row.cls ? metric.percentile / 100 : metric.percentile;
  return (
    <Value text={show(value, row.cls)} band={fieldBand(metric.category)} />
  );
}

function LabCell({ speed, row }: { speed: Speed; row: (typeof ROWS)[number] }) {
  const value = speed.lab[row.lab];
  if (value === null) return <NotMeasured />;
  const band: Band =
    value <= row.good ? "good" : value <= row.poor ? "fair" : "poor";
  return <Value text={show(value, row.cls)} band={band} />;
}

/**
 * Real-user speed (CrUX) next to the lab run, for the start page and the
 * whole site. Field data is what Google uses; the lab run is a reproducible
 * proxy. A small site often has no field data of its own, so the origin
 * column is usually the one with numbers.
 */
export function FieldDataPanel({
  speed,
  speedError,
}: {
  speed: Speed | null;
  /** Why the start page's own PageSpeed run has no numbers, when it failed. */
  speedError: string | null;
}) {
  if (!speed) {
    // One line, not a hero-sized empty state: the Hız tab is where this
    // gets explained and fixed.
    return (
      <section className="flex items-start gap-3 rounded-box border border-[var(--hairline)] bg-base-100 px-4 py-3">
        <Gauge aria-hidden className="mt-0.5 size-4 shrink-0 text-subtle" />
        <div className="min-w-0 text-sm">
          <p className="font-medium">
            {speedError ? t("Hız ölçülemedi") : t("Hız ölçülmedi")}
          </p>
          <p className="mt-0.5 max-w-prose text-muted">
            {speedError
              ? t(
                  "PageSpeed ölçümü bu denetimde sonuç vermedi: {error} Ölçüm çalışınca gerçek kullanıcı verisi (CrUX) ve laboratuvar sonuçları burada görünür.",
                  { error: speedError },
                )
              : t(
                  "Bu denetimde başlangıç sayfası için PageSpeed ölçümü yok. Denetimi hız ölçümü açık başlatırsanız gerçek kullanıcı verisi (CrUX) ve laboratuvar sonuçları burada görünür.",
                )}
          </p>
        </div>
      </section>
    );
  }
  return (
    <section className="rounded-box border border-[var(--hairline)] bg-base-100">
      <header className="border-b border-[var(--hairline)] px-4 py-3">
        <h3 className="text-sm font-medium">{t("Temel Web Verileri")}</h3>
        {speed.isStartPage ? null : (
          <p className="mt-0.5 text-xs text-muted [overflow-wrap:anywhere]">
            {t(
              "Başlangıç sayfası ölçülemedi; gösterilen, ölçülen en üst sayfa: {url}",
              { url: speed.url },
            )}
          </p>
        )}
        <p className="mt-0.5 text-xs text-subtle">
          {t(
            "Gerçek kullanıcı verisi Chrome Kullanıcı Deneyimi Raporu'ndan (CrUX, son 28 gün, mobil); laboratuvar sütunu PageSpeed Insights'ın tek ölçümü.",
          )}
        </p>
      </header>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-muted">
              <th className="px-4 py-2 font-medium">{t("Metrik")}</th>
              <th className="px-4 py-2 text-right font-medium">
                {t("Bu sayfa, gerçek")}
              </th>
              <th className="px-4 py-2 text-right font-medium">
                {t("Tüm site, gerçek")}
              </th>
              <th className="px-4 py-2 text-right font-medium">
                {t("Laboratuvar")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--hairline)]">
            {ROWS.map((row) => (
              <tr key={row.name}>
                <td className="px-4 py-2.5">
                  <span className="font-medium">{row.name}</span>
                  <span className="block text-xs text-subtle">
                    {t(row.plain)}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-right">
                  <FieldCell field={speed.page} row={row} />
                </td>
                <td className="px-4 py-2.5 text-right">
                  <FieldCell field={speed.origin} row={row} />
                </td>
                <td className="px-4 py-2.5 text-right">
                  <LabCell speed={speed} row={row} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
