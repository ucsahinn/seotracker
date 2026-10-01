import { sort } from "remeda";
import { X } from "lucide-react";
import { DonutChart } from "@/client/components/DonutChart";
import { countrySegments } from "@/client/features/search-performance/countryShare";
import {
  formatCount,
  formatCountry,
  formatDecimal,
  formatPercent,
} from "@/client/lib/format";

type CountryRow = {
  key: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

/** Past this the tail is noise; the rest is summed into one row. */
const SHOWN = 6;

/**
 * Where the clicks come from.
 *
 * Search Console is asked for this breakdown on every load — clicks,
 * impressions, CTR and average position per country — and the screen used
 * all of it to label a dropdown. `<option>KZ</option>`, and the numbers
 * thrown away. Nothing on the screen could answer "which countries is this
 * traffic from", which is the first question a site with more than one
 * market has.
 *
 * Bars rather than a chart library: six rows of one number each is a list
 * with a length, and recharts for that is machinery around a `<div>`.
 */
export function CountryBreakdown({
  countries,
  selected,
  onSelect,
}: {
  countries: CountryRow[];
  /** The country filter currently in the URL, if any. */
  selected?: string;
  onSelect: (country: string | undefined) => void;
}) {
  const ranked = sort(countries, (a, b) => b.clicks - a.clicks);
  const shown = ranked.slice(0, SHOWN);
  const rest = ranked.slice(SHOWN);
  const total = ranked.reduce((sum, row) => sum + row.clicks, 0);

  // Nothing to rank, and a panel of zeroes is worse than no panel.
  if (total === 0) return null;

  const restClicks = rest.reduce((sum, row) => sum + row.clicks, 0);
  const max = shown[0]?.clicks ?? 1;

  return (
    <section className="overflow-hidden rounded-box border border-base-300 bg-base-100">
      <div className="border-b border-base-300 px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-medium">Ülkeler</h2>
          {selected ? (
            <button
              type="button"
              className="btn btn-ghost btn-xs gap-1"
              onClick={() => onSelect(undefined)}
            >
              <X className="size-3" aria-hidden />
              {formatCountry(selected)} filtresini kaldır
            </button>
          ) : null}
        </div>
        <p className="mt-0.5 text-xs text-muted">
          Tıklamaların hangi ülkelerden geldiği. Halkadan ya da tablodan bir
          ülkeye tıklayarak tüm sayfayı o ülkeye göre daraltabilirsiniz.
        </p>
      </div>
      <div className="border-b border-base-300 px-4 py-4">
        <DonutChart
          height={144}
          totalLabel="tıklama"
          segments={countrySegments(countries).map((segment) => ({
            key: segment.key ?? OTHER_COUNTRIES,
            label: segment.key ? formatCountry(segment.key) : "Diğer ülkeler",
            value: segment.clicks,
            // The pooled remainder is a neutral grey, so it reads as "the
            // rest" rather than as a fourth market.
            color: segment.key ? undefined : "var(--color-base-300)",
            disabled: segment.key === null,
          }))}
          summary={countrySummary(countries)}
          selectedKey={selected ?? null}
          onSelect={(key) =>
            onSelect(key === null || key === OTHER_COUNTRIES ? undefined : key)
          }
        />
      </div>
      <table className="table table-sm">
        <thead>
          <tr>
            <th scope="col">Ülke</th>
            <th scope="col">
              {/* Named, even though the bar restates the count beside it: an
                  empty <th> leaves the column unannounced in the header row. */}
              <span className="sr-only">Dağılım</span>
            </th>
            <th scope="col" className="text-right">
              Tıklama
            </th>
            {/* Fetched on every load and dropped: a market with plenty of
                impressions and no clicks is a snippet problem, not a
                ranking problem, and the panel held the numbers to say so. */}
            <th scope="col" className="text-right">
              Gösterim
            </th>
            <th scope="col" className="text-right">
              Tıklama oranı
            </th>
            <th scope="col" className="text-right">
              Pay
            </th>
            <th scope="col" className="text-right">
              Ort. sıra
            </th>
          </tr>
        </thead>
        <tbody>
          {shown.map((row) => (
            <tr
              key={row.key}
              className={selected === row.key ? "bg-base-200/60" : undefined}
            >
              {/* The name, not the code. GSC reports alpha-3, so a panel
                  headed "Ülkeler" read "TUR / GBR / DEU" in a Turkish UI.
                  The code stays in the title for anyone matching it against
                  Search Console's own export. */}
              <td className="font-medium" title={row.key.toUpperCase()}>
                <button
                  type="button"
                  aria-pressed={selected === row.key}
                  className="link link-hover text-left"
                  onClick={() =>
                    onSelect(selected === row.key ? undefined : row.key)
                  }
                >
                  {formatCountry(row.key)}
                </button>
              </td>
              <td className="w-1/3">
                {/* The bar is a restatement of the count beside it, so it
                    carries no label of its own. */}
                <span
                  aria-hidden
                  className="block h-1.5 rounded-full bg-primary"
                  style={{ width: `${(row.clicks / max) * 100}%` }}
                />
              </td>
              <td className="text-right tabular-nums">
                {formatCount(row.clicks)}
              </td>
              <td className="text-right tabular-nums text-muted">
                {formatCount(row.impressions)}
              </td>
              <td className="text-right tabular-nums text-muted">
                {formatPercent(row.ctr)}
              </td>
              <td className="text-right tabular-nums text-muted">
                {formatPercent(row.clicks / total)}
              </td>
              <td className="text-right tabular-nums text-muted">
                {formatDecimal(row.position)}
              </td>
            </tr>
          ))}
          {rest.length > 0 ? (
            <tr className="text-muted">
              <td>{formatCount(rest.length)} ülke daha</td>
              <td />
              <td className="text-right tabular-nums">
                {formatCount(restClicks)}
              </td>
              <td />
              <td />
              <td className="text-right tabular-nums">
                {formatPercent(restClicks / total)}
              </td>
              <td />
            </tr>
          ) : null}
        </tbody>
      </table>
    </section>
  );
}

const OTHER_COUNTRIES = "__other__";

/** The finding, for readers who cannot see the ring. */
function countrySummary(countries: { key: string; clicks: number }[]): string {
  const segments = countrySegments(countries);
  const total = segments.reduce((sum, segment) => sum + segment.clicks, 0);
  const lead = segments.find((segment) => segment.key !== null);
  return lead?.key
    ? `Toplam ${formatCount(total)} tıklamanın ${formatPercent(lead.clicks / total)} kadarı ${formatCountry(lead.key)} kaynaklı.`
    : `Toplam ${formatCount(total)} tıklama.`;
}
