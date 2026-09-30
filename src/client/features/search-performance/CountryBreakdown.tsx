import { sort } from "remeda";
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
export function CountryBreakdown({ countries }: { countries: CountryRow[] }) {
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
        <h2 className="text-sm font-medium">Ülkeler</h2>
        <p className="mt-0.5 text-xs text-muted">
          Tıklamaların ülkelere dağılımı. Bir ülkeyi seçmek için yukarıdaki
          filtreyi kullanın.
        </p>
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
              TO
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
            <tr key={row.key}>
              {/* The name, not the code. GSC reports alpha-3, so a panel
                  headed "Ülkeler" read "TUR / GBR / DEU" in a Turkish UI.
                  The code stays in the title for anyone matching it against
                  Search Console's own export. */}
              <td className="font-medium" title={row.key.toUpperCase()}>
                {formatCountry(row.key)}
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
