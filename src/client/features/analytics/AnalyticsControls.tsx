import {
  GA4_REPORT_KINDS,
  GA4_REPORT_LABELS,
  type Ga4ReportKindName,
} from "@/shared/ga4-reports";
import { t } from "@/shared/i18n";
import { formatCount } from "@/shared/format";
/*
 * Option labels and tab questions are Turkish source strings, translated by
 * t() where they render: the locale is not known at import time.
 */
export type Channel = "organic_search" | "all";
/** Matches the windows Search Performance offers, so the two read alike. */
export type WindowDays = 7 | 28 | 90;
const WINDOWS: { value: WindowDays; label: string }[] = [
  { value: 7, label: "Son 7 gün" },
  { value: 28, label: "Son 28 gün" },
  { value: 90, label: "Son 3 ay" },
];

export type Breakdown = "device" | "country" | "new_vs_returning";
const BREAKDOWNS: { value: Breakdown; label: string }[] = [
  { value: "device", label: "Cihaz" },
  { value: "country", label: "Ülke" },
  { value: "new_vs_returning", label: "Yeni / geri dönen" },
];

export type AcquisitionBreakdown =
  | "channel_group"
  | "source_medium"
  | "campaign";
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
export const HEALTH = "measurement_health";

export type View = Ga4ReportKindName | typeof HEALTH;
export type Scope = {
  view: View;
  channel: Channel;
  limit: 50 | 100 | 200;
  offset: number;
  audience: Breakdown;
  acquisition: AcquisitionBreakdown;
  startDate?: string;
  endDate?: string;
  host?: string;
  path?: string;
};

export function AnalyticsBreakdownControls({
  kind,
  breakdown,
  setBreakdown,
  acquisition,
  setAcquisition,
}: {
  kind: Ga4ReportKindName;
  breakdown: Breakdown;
  setBreakdown: (next: Breakdown) => void;
  acquisition: AcquisitionBreakdown;
  setAcquisition: (next: AcquisitionBreakdown) => void;
}) {
  return (
    <>
      {kind === "audience_breakdown" ? (
        <div
          role="radiogroup"
          aria-label={t("Kitleyi neye göre böl")}
          className="flex flex-wrap gap-1"
        >
          {BREAKDOWNS.map((option) => (
            <label
              key={option.value}
              className={`btn min-h-11 btn-sm gap-2 ${
                option.value === breakdown ? "btn-active" : "btn-ghost"
              }`}
            >
              <input
                type="radio"
                className="radio radio-xs"
                name="analytics-breakdown"
                checked={option.value === breakdown}
                onChange={() => setBreakdown(option.value)}
              />
              {t(option.label)}
            </label>
          ))}
        </div>
      ) : null}

      {kind === "traffic_acquisition" ? (
        <div
          role="radiogroup"
          aria-label={t("Trafiği neye göre böl")}
          className="flex flex-wrap gap-1"
        >
          {ACQUISITION_BREAKDOWNS.map((option) => (
            <label
              key={option.value}
              className={`btn min-h-11 btn-sm gap-2 ${
                option.value === acquisition ? "btn-active" : "btn-ghost"
              }`}
            >
              <input
                type="radio"
                className="radio radio-xs"
                name="analytics-acquisition"
                checked={option.value === acquisition}
                onChange={() => setAcquisition(option.value)}
              />
              {t(option.label)}
            </label>
          ))}
        </div>
      ) : null}
    </>
  );
}

export function AnalyticsControls({
  view,
  setView,
  kind,
  rowLimit,
  setRowLimit,
  windowDays,
  onWindowChange,
  scope,
  channel,
  setChannel,
}: {
  view: View;
  setView: (next: View) => void;
  kind: Ga4ReportKindName;
  rowLimit: 50 | 100 | 200;
  setRowLimit: (next: 50 | 100 | 200) => void;
  windowDays: WindowDays;
  onWindowChange: (next: WindowDays) => void;
  scope: Scope;
  channel: Channel;
  setChannel: (next: Channel) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <label className="flex min-w-0 max-w-full flex-col items-start gap-2 text-sm sm:flex-row sm:items-center">
        {t("Raporlar")}
        <select
          className="select select-bordered min-h-11 max-w-full"
          value={view}
          onChange={(event) =>
            setView(
              GA4_REPORT_KINDS.find(
                (reportKind) => reportKind === event.target.value,
              ) ?? HEALTH,
            )
          }
        >
          {GA4_REPORT_KINDS.map((value) => (
            <option key={value} value={value}>
              {GA4_REPORT_LABELS[value].label}
            </option>
          ))}
          <option value={HEALTH}>{t("Ölçüm durumu")}</option>
        </select>
      </label>

      {/* A pick-one filter, not a second tab strip: it narrows the report
            the tabs above chose rather than swapping the panel. Gone on the
            setup-check tab, where it used to flip its own active state and
            change nothing -- a control that visibly responds and has no
            effect is worse than a disabled one. */}
      {view === HEALTH ? null : (
        <div className="flex flex-wrap items-center gap-2">
          <label className="flex items-center gap-2 text-xs text-muted">
            <span className="whitespace-nowrap">{t("Satır sayısı")}</span>
            <select
              className="select select-bordered min-h-11 select-sm w-20"
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
                  {formatCount(option)}
                </option>
              ))}
            </select>
          </label>
          <select
            className="select select-bordered min-h-11 select-sm w-32"
            value={scope.startDate ? "exact" : windowDays}
            onChange={(event) => {
              const next = WINDOWS.find(
                (option) => String(option.value) === event.target.value,
              );
              if (next) {
                onWindowChange(next.value);
              }
            }}
            aria-label={t("Tarih aralığı")}
          >
            {scope.startDate ? (
              <option value="exact">{t("Özel tarih aralığı")}</option>
            ) : null}
            {WINDOWS.map((option) => (
              <option key={option.value} value={option.value}>
                {t(option.label)}
              </option>
            ))}
          </select>
          {kind !== "site_search" ? (
            <div
              className="flex flex-wrap gap-1"
              role="group"
              aria-label={t("Kanal")}
            >
              {CHANNELS.map((option) => (
                <label
                  key={option.value}
                  className={`btn min-h-11 btn-sm ${
                    option.value === channel ? "btn-active" : ""
                  }`}
                >
                  <input
                    type="radio"
                    className="radio radio-xs"
                    name="analytics-channel"
                    checked={option.value === channel}
                    onChange={() => setChannel(option.value)}
                  />
                  {t(option.label)}
                </label>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted">
              {t("Tüm trafik · ölçülmüş arama sonuçları")}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
