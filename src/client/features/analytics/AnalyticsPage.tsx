import { useQuery } from "@tanstack/react-query";
import { BarChart3 } from "lucide-react";
import * as React from "react";
import { EmptyState } from "@/client/components/EmptyState";
import { PageHeader, PageShell } from "@/client/components/PageShell";
import { QueryErrorState } from "@/client/components/QueryErrorState";
import { TabPanel, Tabs } from "@/client/components/Tabs";
import { OrganicTrendPanel } from "@/client/features/analytics/OrganicTrendPanel";
import { ReportView } from "@/client/features/analytics/ReportView";
import { MeasurementHealthPanel } from "@/client/features/analytics/MeasurementHealthPanel";
import { getGa4Report } from "@/serverFunctions/ga4Reports";
import {
  GA4_REPORT_KINDS,
  GA4_REPORT_LABELS,
  type Ga4ReportKindName,
} from "@/shared/ga4-reports";

type Channel = "organic_search" | "all";
/** Matches the windows Search Performance offers, so the two read alike. */
type WindowDays = 7 | 28 | 90;
const WINDOWS: { value: WindowDays; label: string }[] = [
  { value: 7, label: "Son 7 gün" },
  { value: 28, label: "Son 28 gün" },
  { value: 90, label: "Son 3 ay" },
];

type Breakdown = "device" | "country" | "new_vs_returning";
const BREAKDOWNS: { value: Breakdown; label: string }[] = [
  { value: "device", label: "Cihaz" },
  { value: "country", label: "Ülke" },
  { value: "new_vs_returning", label: "Yeni / geri dönen" },
];

type AcquisitionBreakdown = "channel_group" | "source_medium" | "campaign";
const ACQUISITION_BREAKDOWNS: { value: AcquisitionBreakdown; label: string }[] =
  [
    { value: "channel_group", label: "Kanal grubu" },
    { value: "source_medium", label: "Kaynak / ortam" },
    { value: "campaign", label: "Kampanya" },
  ];

/** Matches the ceiling `ga4Reports`' schema enforces. */
const ROW_LIMITS = [50, 100, 200] as const;

const CHANNELS: { value: Channel; label: string }[] = [
  { value: "organic_search", label: "Organik arama" },
  { value: "all", label: "Tüm trafik" },
];

/**
 * The seven Google Analytics reports.
 *
 * The engine behind these has existed since the fork began and only an agent
 * could reach it — seven MCP tools, no screen. The columns come from the
 * report definition rather than being hard-coded per report, which is why one
 * table serves all seven.
 */
/*
 * The setup check rides in the same strip as the seven reports rather than
 * taking its own route. It is an Analytics view, one nav entry is enough,
 * and this repo's own trap is a route with no nav entry: `getProjectNavGroups`
 * names paths one by one, so a new page orphans silently.
 */
const HEALTH = "measurement_health";

/** The one question each tab answers, in plain words, above its content. */
const REPORT_QUESTIONS: Record<Ga4ReportKindName, string> = {
  landing_pages:
    "Ziyaretçiler siteye hangi sayfadan giriyor ve o sayfada kalıp bir sonuca ulaşıyor mu?",
  page_performance:
    "Hangi sayfalar en çok görüntüleniyor ve okurlar orada ne kadar vakit geçiriyor?",
  traffic_acquisition:
    "Ziyaretçiler hangi kanallardan geliyor ve hangi kanal gerçekten sonuç getiriyor?",
  key_events:
    "Sonuç saydığınız olaylar ne sıklıkla gerçekleşiyor ve kaç kişi tetikliyor?",
  ecommerce_performance:
    "Hangi ürünler görüntüleniyor, sepete ekleniyor ve gelir getiriyor? Mülkte e-ticaret ölçümü yoksa bu sekme boş kalır.",
  site_search:
    "Ziyaretçiler sitenizde ne arıyor? Bulamadıkları içerik, yazacağınız yeni sayfaların ipucudur.",
  audience_breakdown:
    "Ziyaretçileriniz hangi cihazlardan geliyor ve cihaza göre deneyim nasıl değişiyor?",
};

/*
 * The organic trend describes landing-page and channel questions. Repeated
 * on all seven tabs it was the same chart seven times, and on "Site içi
 * arama" or "Anahtar olaylar" it answered a question nobody had asked.
 */
const TREND_REPORTS = new Set<Ga4ReportKindName>([
  "landing_pages",
  "traffic_acquisition",
]);
type View = Ga4ReportKindName | typeof HEALTH;

export function AnalyticsPage({
  projectId,
  windowDays,
  onWindowChange,
}: {
  projectId: string;
  /** Held in the URL by the route, so a reload or a shared link keeps it. */
  windowDays: WindowDays;
  onWindowChange: (days: WindowDays) => void;
}) {
  const [view, setView] = React.useState<View>("landing_pages");
  const [channel, setChannel] = React.useState<Channel>("organic_search");
  /*
   * The page was pinned to 28 days with no control, while the server
   * function had accepted a range all along -- so the one question an
   * Analytics screen exists for, "is this better or worse than before",
   * could not be asked.
   */
  const kind = view === HEALTH ? "landing_pages" : view;
  /*
   * The row cap was a literal 50 with no control, over a report that says
   * "50 / 800 satır" right above the table -- so the screen named 750 rows
   * the operator had no way to reach. 200 is the server's own ceiling.
   */
  const [rowLimit, setRowLimit] = React.useState<(typeof ROW_LIMITS)[number]>(
    ROW_LIMITS[0],
  );

  /*
   * What the audience report splits by. Only that report has one, so it is
   * only offered there; the service has supported all three since it was
   * written, and the screen was stuck on device.
   */
  const [breakdown, setBreakdown] = React.useState<Breakdown>("device");

  const [acquisition, setAcquisition] =
    React.useState<AcquisitionBreakdown>("channel_group");

  const reportQuery = useQuery({
    queryKey: [
      "ga4Report",
      projectId,
      kind,
      channel,
      windowDays,
      rowLimit,
      breakdown,
      acquisition,
    ],
    queryFn: () =>
      getGa4Report({
        data: {
          projectId,
          kind,
          channel,
          windowDays,
          limit: rowLimit,
          audienceBreakdown: breakdown,
          acquisitionBreakdown: acquisition,
        },
      }),
    enabled: view !== HEALTH,
  });
  const result = reportQuery.data;

  return (
    <PageShell>
      <PageHeader
        title="Analytics raporları"
        description={
          view === HEALTH
            ? "Analytics gerçekten ölçüyor mu? Mülkünüzün kurulum ayarlarını okur; rapor kotanızdan harcamaz."
            : REPORT_QUESTIONS[kind]
        }
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Tabs
          group="ga4-report"
          value={view}
          onChange={setView}
          items={[
            ...GA4_REPORT_KINDS.map((value) => ({
              id: value as View,
              label: GA4_REPORT_LABELS[value].label,
            })),
            { id: HEALTH as View, label: "Ölçüm durumu" },
          ]}
        />

        {/* A pick-one filter, not a second tab strip: it narrows the report
            the tabs above chose rather than swapping the panel. Gone on the
            setup-check tab, where it used to flip its own active state and
            change nothing -- a control that visibly responds and has no
            effect is worse than a disabled one. */}
        {view === HEALTH ? null : (
          <div className="flex flex-wrap items-center gap-2">
            <label className="flex items-center gap-2 text-xs text-muted">
              <span className="whitespace-nowrap">Satır</span>
              <select
                className="select select-bordered select-sm w-20"
                value={rowLimit}
                onChange={(event) => {
                  const next = ROW_LIMITS.find(
                    (option) => String(option) === event.target.value,
                  );
                  if (next) setRowLimit(next);
                }}
              >
                {ROW_LIMITS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <select
              className="select select-bordered select-sm w-32"
              value={windowDays}
              onChange={(event) => {
                const next = WINDOWS.find(
                  (option) => String(option.value) === event.target.value,
                );
                if (next) onWindowChange(next.value);
              }}
              aria-label="Tarih aralığı"
            >
              {WINDOWS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="join" role="radiogroup" aria-label="Kanal">
              {CHANNELS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  role="radio"
                  aria-checked={option.value === channel}
                  className={`btn join-item btn-sm ${
                    option.value === channel ? "btn-active" : ""
                  }`}
                  onClick={() => setChannel(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <TabPanel group="ga4-report" value={view} className="space-y-4">
        {/* The report query keeps its last result while the health tab is
            open, so without this branch the two panels stacked and the page
            said "Google Analytics bağlı değil" twice. */}
        {view === HEALTH ? (
          <MeasurementHealthPanel projectId={projectId} />
        ) : (
          <>
            {/* The window's shape, above whichever report lists it. Its own
                query, so a slow overview never holds up the table. */}
            {TREND_REPORTS.has(kind) ? (
              <OrganicTrendPanel
                projectId={projectId}
                windowDays={windowDays}
              />
            ) : null}
            {reportQuery.isPending ? (
              <div className="space-y-2" aria-busy>
                <div className="skeleton h-10" />
                <div className="skeleton h-64" />
              </div>
            ) : null}

            {kind === "audience_breakdown" ? (
              <div
                role="radiogroup"
                aria-label="Kitleyi neye göre böl"
                className="join"
              >
                {BREAKDOWNS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={option.value === breakdown}
                    onClick={() => setBreakdown(option.value)}
                    className={`btn btn-sm join-item ${
                      option.value === breakdown ? "btn-active" : "btn-ghost"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            ) : null}

            {kind === "traffic_acquisition" ? (
              <div
                role="radiogroup"
                aria-label="Trafiği neye göre böl"
                className="join"
              >
                {ACQUISITION_BREAKDOWNS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={option.value === acquisition}
                    onClick={() => setAcquisition(option.value)}
                    className={`btn btn-sm join-item ${
                      option.value === acquisition ? "btn-active" : "btn-ghost"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            ) : null}

            {reportQuery.isError ? (
              <QueryErrorState
                error={reportQuery.error}
                onRetry={() => void reportQuery.refetch()}
                title="Rapor alınamadı"
              />
            ) : null}

            {result?.status === "needs_ga4" ? (
              <div className="rounded-box border border-base-300 bg-base-100">
                <EmptyState
                  icon={BarChart3}
                  title="Google Analytics bağlı değil"
                  description="Bu raporlar GA4 mülkünüzden gelir. Proje ayarlarındaki Entegrasyonlar sekmesinden bağlayın."
                />
              </div>
            ) : null}

            {result?.status === "ok" ? (
              <ReportView
                key={`${kind}-${channel}-${windowDays}-${rowLimit}-${breakdown}-${acquisition}`}
                kind={kind}
                result={result}
                organicOnly={channel === "organic_search"}
                onOrganicOnlyChange={(next) =>
                  setChannel(next ? "organic_search" : "all")
                }
              />
            ) : null}
          </>
        )}
      </TabPanel>
    </PageShell>
  );
}
