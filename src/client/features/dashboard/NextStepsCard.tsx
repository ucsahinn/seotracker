import { warningAction } from "./warningAction";
import type { DashboardAuditSummary } from "@/types/schemas/dashboard";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Link2,
  Radar,
  Search,
  TriangleAlert,
} from "lucide-react";
import { auditIsStale } from "@/shared/panelAudit";
import { describeTodo } from "@/shared/searchTodoCopy";
import type { TodoItem } from "@/shared/searchInsights";
import { formatCount } from "@/shared/format";
import { formatDate, parseTimestamp } from "@/client/lib/format";
import { describeAuditFailure } from "@/client/features/audit/results/auditFailureCopy";
import { t } from "@/shared/i18n";
import { setupVerdict, type SetupSignals } from "@/shared/projectSetup";
import { SETUP_LABELS } from "@/client/features/projects/projectSetupQuery";
import { GoogleSetupBanner } from "./GoogleSetupBanner";

/**
 * What to do next, in order, on the one screen an operator opens first.
 *
 * The dashboard answered "how is the site" with four cards of numbers and
 * left "so what do I do" to the reader. Everything needed to answer it was
 * already on the page — the audit's severity totals, whether Search Console
 * is connected, how old the last crawl is — just never assembled into a
 * sentence with a button on the end.
 *
 * No new request: every field here is already fetched by the two queries the
 * dashboard runs. Ranked by what it costs to act on, cheapest first, and
 * capped at three so it stays a next step rather than a backlog.
 */

/** Past this a crawl describes a site that has since changed. */

const SHOWN = 3;

export type PanelAction = {
  key: string;
  icon: typeof Radar;
  title: string;
  detail: string;
  to: string;
  params?: Record<string, string>;
  search?: Record<string, string>;
  /** One short verb. The title already says what the step is about. */
  cta: string;
};

export function NextStepsCard({
  projectId,
  gscConnected,
  setup,
  googleMissing = false,
  audit,
  overviewUnavailable = false,
  siteSelected = true,
  searchUnavailable = false,
  searchTodo = [],
  now = Date.now(),
}: {
  projectId: string;
  gscConnected: boolean;
  overviewUnavailable?: boolean;
  siteSelected?: boolean;
  searchUnavailable?: boolean;
  searchTodo?: TodoItem[];
  now?: number;
  /** The shared setup checklist (shared/projectSetup); undefined while it loads. */
  setup?: SetupSignals;
  /**
   * The Google access key is not entered yet. The setup action inside this
   * panel handles it, and Search Console cannot be connected before it.
   */
  googleMissing?: boolean;
  audit: {
    auditId: string;
    status: "running" | "completed" | "failed";
    startedAt: string;
    errorCode?: string | null;
    failedPhase?: string | null;
    severityTotals: { critical: number; warning: number; info: number };
    severityCheckTypes?: { critical: number; warning: number; info: number };
    topIssues?: DashboardAuditSummary["topIssues"];
  } | null;
}) {
  const steps = buildPanelActions({
    projectId,
    gscConnected,
    googleMissing,
    audit,
    overviewUnavailable,
    searchTodo,
    now,
    siteSelected,
    searchUnavailable,
  }).slice(0, SHOWN);
  const verdict = setup ? setupVerdict(setup) : null;
  return (
    <section className="overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-[var(--shadow-raise)]">
      {/*
       * The setup verdict is one line, not a 0-100 ring: it is a checklist,
       * and it was the biggest number on the dashboard while saying nothing
       * about the site. Same items and count as Proje bilgisi.
       */}
      <div className="border-b border-base-300 px-5 py-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h2 className="text-base font-semibold leading-tight">
            {t("Sıradaki adımlar")}
          </h2>
          {verdict ? (
            <span
              className={`badge badge-sm tabular-nums ${
                verdict.complete
                  ? "border-success/30 bg-success/10 text-[var(--ink-success)]"
                  : "badge-ghost"
              }`}
            >
              {verdict.complete ? (
                <CheckCircle2 aria-hidden className="size-3" />
              ) : null}
              {verdict.complete
                ? t("Kurulum tamam")
                : t("Kurulum {done} / {total}", {
                    done: formatCount(verdict.done),
                    total: formatCount(verdict.total),
                  })}
            </span>
          ) : null}
        </div>
        <p className="mt-1 text-sm text-muted">
          {t("Ölçülen bulgulara göre önce şu işleri değerlendirin.")}
        </p>
        {verdict && verdict.missing.length > 0 ? (
          <p className="mt-2 text-xs text-muted">
            {t("Kurulumda eksik: {items}.", {
              items: verdict.missing
                .map((item) => t(SETUP_LABELS[item]))
                .join(", "),
            })}{" "}
            <Link
              to="/p/$projectId/context"
              params={{ projectId }}
              className="link"
            >
              {t("Tamamla")}
            </Link>
          </p>
        ) : null}
        {verdict && verdict.unknown.length > 0 ? (
          <p className="mt-2 text-xs text-muted">
            {t(
              "Kurulum durumu okunamayanlar: {items}. Yenile ile tekrar deneyin.",
              {
                items: verdict.unknown
                  .map((item) => t(SETUP_LABELS[item]))
                  .join(", "),
              },
            )}
          </p>
        ) : null}
      </div>

      {googleMissing ? (
        <div className="border-b border-base-300 p-4">
          <GoogleSetupBanner />
        </div>
      ) : null}

      {steps.length === 0 ? (
        googleMissing ? null : (
          <p className="flex items-center gap-2 px-5 py-6 text-sm text-muted">
            <CheckCircle2
              aria-hidden
              className="size-4 text-[var(--ink-success)]"
            />
            {t("Ölçülen kapsamda öncelikli iş bulunmadı.")}
          </p>
        )
      ) : (
        <ul className="divide-y divide-base-300">
          {steps.map((step, index) => (
            <li key={step.key}>
              <Link
                to={step.to}
                params={step.params}
                search={step.search}
                /*
                 * The whole row is the target, not a small link at the end:
                 * this is the one list on the dashboard whose entire purpose
                 * is to be clicked.
                 */
                className="group min-h-11 focus-visible:outline-offset-[-2px] flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-base-200/40"
              >
                <span
                  aria-hidden
                  /*
                   * Neutral circles, the accent only on the step to take
                   * first: red belongs to severity, and a column of three
                   * coloured circles says "everything is urgent".
                   */
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full ${
                    index === 0
                      ? "bg-primary/10 text-primary"
                      : "bg-base-200 text-muted"
                  }`}
                >
                  <step.icon className="size-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block break-words text-sm font-medium [overflow-wrap:anywhere]">
                    {step.title}
                  </span>
                  <span className="block text-xs text-muted">
                    {step.detail}
                  </span>
                </span>
                <span className="flex max-w-24 shrink-0 flex-wrap items-center gap-1 text-sm text-muted transition-colors group-hover:text-base-content">
                  {step.cta}
                  <ArrowRight
                    aria-hidden
                    className="size-3.5 transition-transform motion-reduce:transition-none group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export function buildPanelActions({
  projectId,
  gscConnected,
  googleMissing,
  audit,
  overviewUnavailable,
  searchTodo,
  now,
  siteSelected,
  searchUnavailable,
}: {
  projectId: string;
  gscConnected: boolean;
  googleMissing: boolean;
  overviewUnavailable: boolean;
  siteSelected: boolean;
  searchUnavailable: boolean;
  searchTodo: TodoItem[];
  now: number;
  audit: {
    auditId: string;
    status: "running" | "completed" | "failed";
    startedAt: string;
    errorCode?: string | null;
    failedPhase?: string | null;
    severityTotals: { critical: number; warning: number; info: number };
    severityCheckTypes?: { critical: number; warning: number; info: number };
    topIssues?: DashboardAuditSummary["topIssues"];
  } | null;
}): PanelAction[] {
  const steps: PanelAction[] = [];
  const params = { projectId };

  /*
   * Search Console first, because without it half the app has nothing to
   * show: rankings, opportunities and the whole search side are empty until
   * it is connected, and connecting it is free and takes a minute.
   */
  if (!gscConnected && !googleMissing) {
    steps.push({
      key: "gsc",
      icon: Link2,
      title: t("Search Console'u bağlayın"),
      detail: t(
        "Hangi kelimede kaçıncı sırada olduğunuzu yalnızca Google bilir. Bağlantı ücretsiz.",
      ),
      to: "/p/$projectId/settings/integrations",
      params,
      cta: t("Bağla"),
    });
  }

  if (searchUnavailable)
    steps.push({
      key: "search-unavailable",
      icon: Search,
      title: t("Search Console verisi alınamadı"),
      detail: t("Arama verisi şu an okunamadı. Yenile ile tekrar deneyin."),
      to: "/p/$projectId/search-performance",
      params,
      cta: t("Gör"),
    });
  if (!siteSelected)
    steps.push({
      key: "site-unselected",
      icon: Radar,
      title: t("Site seçilmedi"),
      detail: t(
        "Kendi sitenizin denetimini göstermek için proje ayarlarına alan adını girin.",
      ),
      to: "/p/$projectId/settings",
      params,
      cta: t("Ayarlar"),
    });
  if (overviewUnavailable) {
    steps.push({
      key: "audit-unavailable",
      icon: Radar,
      title: t("Denetim özeti okunamadı"),
      detail: t(
        "İlk denetim olup olmadığı bilinmiyor. Denetim geçmişini açın veya Yenile ile tekrar deneyin.",
      ),
      to: "/p/$projectId/audit",
      params,
      cta: t("Gör"),
    });
  }
  if (!audit && !overviewUnavailable && siteSelected) {
    steps.push({
      key: "first-audit",
      icon: Radar,
      title: t("İlk denetimi başlatın"),
      detail: t(
        "Sitenizi tarar, teknik sorunları önem sırasına göre listeler.",
      ),
      to: "/p/$projectId/audit",
      params,
      cta: t("Başlat"),
    });
  }

  if (!audit) return steps;

  const findingTypes = audit.severityCheckTypes ?? audit.severityTotals;
  if (audit.status === "failed") {
    steps.push({
      key: "retry-audit",
      icon: Radar,
      title: t("Denetimi yeniden başlatın"),
      detail: failedAuditDetail(audit),
      to: "/p/$projectId/audit",
      params,
      cta: t("Yeniden denetle"),
    });
  } else if (audit.status === "running") {
    steps.push({
      key: "running-audit",
      icon: Radar,
      title: t("Denetim sürüyor"),
      detail: t("İlerlemeyi ve bitiş özetini denetim ekranında izleyin."),
      to: "/p/$projectId/audit",
      params,
      search: { auditId: audit.auditId },
      cta: t("İlerlemeyi gör"),
    });
  }

  if (audit.status === "completed" && findingTypes.critical > 0) {
    steps.push({
      key: "critical",
      icon: TriangleAlert,
      title: t("{count} kontrolde kritik sorun", {
        count: formatCount(findingTypes.critical),
      }),
      detail: t(
        "Kritik sorunlar Google'ın sayfayı taramasını ya da dizine almasını engelleyebilir.",
      ),
      to: "/p/$projectId/audit",
      params,
      search: { auditId: audit.auditId, tab: "issues", severity: "critical" },
      cta: t("Gör"),
    });
  }

  if (audit.status === "completed" && findingTypes.warning > 0) {
    steps.push(warningAction(audit, params));
  }

  for (const item of searchTodo.slice(0, 1)) {
    const copy = describeTodo(item);
    steps.push({
      key: item.id,
      icon: Search,
      title: copy.title,
      detail: copy.evidence,
      to: "/p/$projectId/search-performance",
      params,
      search:
        copy.target?.kind === "drill"
          ? {
              tab: copy.target.dimension === "query" ? "queries" : "pages",
              q: copy.target.key,
            }
          : { tab: "todo" },
      cta: t("Aç"),
    });
  }

  /*
   * A crawl older than a week describes a site that has since changed, and
   * audit findings only describe the measured snapshot.
   */
  if (
    audit.status === "completed" &&
    auditIsStale(parseTimestamp(audit.startedAt), now)
  ) {
    steps.push({
      key: "rescan",
      icon: Radar,
      title: t("Denetimi tazeleyin"),
      detail: t(
        "Son denetim {when}. Denetim bulguları yalnızca bu taramaya dayanır.",
        { when: formatDate(audit.startedAt) },
      ),
      to: "/p/$projectId/audit",
      params,
      cta: t("Başlat"),
    });
  }

  return steps;
}

/** The same reason-aware wording as the audit screen's banner. */
function failedAuditDetail(audit: {
  errorCode?: string | null;
  failedPhase?: string | null;
}): string {
  if (!audit.errorCode) {
    return t("Önceki denetim tamamlanamadı. Yeniden deneyin.");
  }
  const copy = describeAuditFailure(audit);
  return `${t(copy.cause)} ${t(copy.side)} ${t(copy.action)}`;
}
