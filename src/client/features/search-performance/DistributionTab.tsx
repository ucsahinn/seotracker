import { t } from "@/shared/i18n";
import * as React from "react";
import {
  formatCount,
  formatCountry,
  formatDecimal,
  formatPercent,
} from "@/client/lib/format";
import type { SearchPerformanceView } from "@/shared/searchPerformanceView";
import { INSIGHT_RULES, type Lens } from "@/shared/searchInsights";
import {
  deviceLabel,
  isDevice,
} from "@/client/features/search-performance/deviceShare";
import { appearanceLabel } from "@/shared/searchAppearance";
import { BrandTermsEditor } from "@/client/features/search-performance/BrandTerms";
import type { DrillTarget } from "@/client/features/search-performance/DrilldownPanel";
import { Section } from "@/client/features/search-performance/Section";
import type { SearchPerformanceDevice } from "@/types/schemas/search-performance";
import { PositionDistribution } from "@/client/features/search-performance/PositionDistribution";
import {
  BreakdownTable,
  ShareBar,
} from "@/client/features/search-performance/BreakdownTable";

/* Ordinal buckets on one hue, darkest for the top of the page. */
function LensCard({
  title,
  lens,
  onOpen,
}: {
  title: string;
  lens: Lens;
  onOpen: (target: DrillTarget) => void;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <h4 className="text-sm font-medium">{title}</h4>
      <p className="text-sm">
        {t("{count} sorgu · {clicks} tıklama", {
          count: lens.queries,
          clicks: formatCount(lens.clicks),
        })}
        {lens.clickShare !== null ? (
          <span className="text-muted">
            {" "}
            {t("(sorgu tıklamalarının {share} kadarı)", {
              share: formatPercent(lens.clickShare),
            })}
          </span>
        ) : null}
      </p>
      <p className="text-xs text-muted">
        {t("Tıklama oranı {ctr} · ortalama sıra {position}", {
          ctr: lens.ctr === null ? "–" : formatPercent(lens.ctr),
          position: lens.position === null ? "–" : formatDecimal(lens.position),
        })}
      </p>
      {lens.top.length > 0 ? (
        <ul className="divide-y divide-[var(--hairline)]">
          {lens.top.slice(0, 5).map((row) => (
            <li key={row.key}>
              <button
                type="button"
                className="flex w-full items-start gap-3 py-1.5 text-left text-sm hover:bg-base-200/50 focus-visible:outline-2 focus-visible:outline-primary"
                onClick={() => onOpen({ dimension: "query", key: row.key })}
              >
                <span className="min-w-0 flex-1 [overflow-wrap:anywhere]">
                  {row.key}
                </span>
                <span className="shrink-0 text-xs tabular-nums text-muted">
                  {t("{clicks} tıklama", { clicks: formatCount(row.clicks) })}
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function BrandSplitBlock({
  projectId,
  view,
}: {
  projectId: string;
  view: SearchPerformanceView;
}) {
  const [editing, setEditing] = React.useState(false);
  const brand = view.insights.brand;
  // The view says which terms the split ran on; nothing to infer here.
  const unconfirmed = view.insights.brandState.source === "suggested";
  if (brand.status === "unset" && !editing) {
    // Nothing to split by: one row that says so and opens the editor,
    // rather than a whole form under every visit to this tab.
    return (
      <div className="mx-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 rounded-box border border-[var(--hairline)] px-4 py-2.5 text-sm">
        <span>
          <span className="font-medium">{t("Marka aramaları ayrılmadı")}</span>
          <span className="text-muted">
            {" · "}
            {t(
              "Marka adınızı girmeden hangi aramaların sizi adınızla bulduğu bilinemez.",
            )}
          </span>
        </span>
        <button
          type="button"
          className="btn btn-sm max-sm:min-h-11"
          aria-expanded={false}
          onClick={() => setEditing(true)}
        >
          {t("Marka adını ekle")}
        </button>
      </div>
    );
  }
  if (brand.status === "unset" || editing) {
    return (
      <div className="flex flex-col gap-2 px-4">
        <BrandTermsEditor
          projectId={projectId}
          onSaved={() => setEditing(false)}
        />
        <button
          type="button"
          className="btn btn-ghost btn-sm self-start"
          onClick={() => setEditing(false)}
        >
          {t("Kapat")}
        </button>
      </div>
    );
  }
  const total = brand.brand.clicks + brand.nonBrand.clicks;
  const segments = [
    { id: "brand", name: t("Marka aramaları"), data: brand.brand },
    { id: "nonBrand", name: t("Marka dışı aramalar"), data: brand.nonBrand },
  ];
  return (
    <div className="flex flex-col gap-3 px-4">
      {unconfirmed ? (
        <p className="text-sm">
          <span className="font-medium">{t("Onaylanmadı.")}</span>{" "}
          <span className="text-muted">
            {t(
              "Alan adından önerilen marka adlarıyla ölçüldü: {terms}. Onaylayın ya da düzeltin.",
              { terms: brand.terms.join(", ") },
            )}
          </span>
        </p>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2">
        {segments.map((segment) => (
          <div
            key={segment.id}
            className="rounded-box border border-[var(--hairline)] px-4 py-3"
          >
            <p className="text-xs text-muted">{segment.name}</p>
            <p className="text-xl font-semibold tabular-nums">
              {formatCount(segment.data.clicks)}
              <span className="ml-1.5 text-sm font-normal text-muted">
                {t("tıklama")}
                {total > 0
                  ? ` · ${formatPercent(segment.data.clicks / total)}`
                  : ""}
              </span>
            </p>
            <ShareBar share={total > 0 ? segment.data.clicks / total : 0} />
            <p className="mt-2 text-xs text-muted">
              {t(
                "{count} sorgu · tıklama oranı {ctr} · ortalama sıra {position}",
                {
                  count: segment.data.queries,
                  ctr:
                    segment.data.ctr === null
                      ? "–"
                      : formatPercent(segment.data.ctr),
                  position:
                    segment.data.position === null
                      ? "–"
                      : formatDecimal(segment.data.position),
                },
              )}
            </p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
        <span>
          {t(
            "Marka adları: {terms}. Paylar okunan sorgulara göre; gizli sorgular dahil değil.",
            {
              terms: brand.terms.join(", "),
            },
          )}
        </span>
        <button
          type="button"
          className="btn btn-ghost btn-xs"
          onClick={() => setEditing(true)}
        >
          {t("Marka adlarını düzenle")}
        </button>
      </div>
    </div>
  );
}

/** How the traffic splits: by position, device, country, result type, brand and query shape. */
export function DistributionTab({
  projectId,
  view,
  device,
  country,
  onDevice,
  onCountry,
  onOpen,
}: {
  projectId: string;
  view: SearchPerformanceView;
  device?: SearchPerformanceDevice;
  country?: string;
  onDevice: (next: SearchPerformanceDevice | undefined) => void;
  onCountry: (next: string | undefined) => void;
  onOpen: (target: DrillTarget) => void;
}) {
  const { devices, countries, searchAppearance } = view.breakdowns;
  return (
    <div className="flex flex-col divide-y divide-[var(--hairline)]">
      <Section
        title={t("Sıra dağılımı")}
        description={t("Sorgularınız Google'da hangi sıralarda görünüyor.")}
      >
        <PositionDistribution view={view} />
      </Section>

      <Section
        title={t("Marka ve marka dışı aramalar")}
        description={t(
          "Adınızla gelen aramalar ile sizi bilmeden bulanlar ayrı ölçülür.",
        )}
      >
        <BrandSplitBlock projectId={projectId} view={view} />
      </Section>

      <Section
        title={t("Cihazlar")}
        description={t(
          "Bir cihaza tıklayınca tüm ekran o cihaza göre daralır.",
        )}
      >
        <BreakdownTable
          caption={t("Cihaz")}
          breakdown={devices}
          label={deviceLabel}
          selected={device}
          onSelect={(key) => onDevice(key && isDevice(key) ? key : undefined)}
        />
      </Section>

      <Section
        title={t("Ülkeler")}
        description={t(
          "Bir ülkeye tıklayınca tüm ekran o ülkeye göre daralır.",
        )}
      >
        <BreakdownTable
          caption={t("Ülke")}
          breakdown={countries}
          label={formatCountry}
          limit={10}
          selected={country}
          onSelect={onCountry}
        />
      </Section>

      <Section
        title={t("Arama görünümü")}
        description={t(
          "Sonuçlarınızın Google'da hangi özel biçimlerle göründüğü. Google bu dökümü sayfa bazında toplar.",
        )}
      >
        {searchAppearance && searchAppearance.rows.length > 0 ? (
          <BreakdownTable
            caption={t("Görünüm")}
            breakdown={searchAppearance}
            label={appearanceLabel}
          />
        ) : (
          <p className="px-4 text-sm text-muted">
            {t(
              "Google bu dönem için özel bir sonuç biçimi (zengin sonuç, video vb.) bildirmedi.",
            )}
          </p>
        )}
      </Section>

      <Section
        title={t("Soru ve uzun aramalar")}
        description={t(
          "Soru kalıbındaki aramalar ve {words} ya da daha çok kelimeli aramalar: içerik fikirlerinin en net kaynağı.",
          { words: INSIGHT_RULES.longTailMinWords },
        )}
      >
        <div className="grid gap-6 px-4 lg:grid-cols-2">
          <LensCard
            title={t("Soru aramaları")}
            lens={view.insights.questions}
            onOpen={onOpen}
          />
          <LensCard
            title={t("Uzun aramalar")}
            lens={view.insights.longTail}
            onOpen={onOpen}
          />
        </div>
      </Section>
    </div>
  );
}
