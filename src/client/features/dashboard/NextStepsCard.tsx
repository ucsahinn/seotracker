import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Link2,
  Radar,
  Search,
  TriangleAlert,
} from "lucide-react";
import { formatCount } from "@/shared/format";
import { formatRelativeTime, parseTimestamp } from "@/client/lib/format";
import { t } from "@/shared/i18n";
import { getReadinessScore } from "./readinessScore";
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
const STALE_AFTER_DAYS = 7;
const SHOWN = 3;

type Step = {
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
  ga4Connected = false,
  hasProjectContext = false,
  agentConnected = false,
  googleMissing = false,
  audit,
}: {
  projectId: string;
  gscConnected: boolean;
  ga4Connected?: boolean;
  hasProjectContext?: boolean;
  agentConnected?: boolean;
  /**
   * The Google access key is not entered yet. The setup action inside this
   * panel handles it, and Search Console cannot be connected before it.
   */
  googleMissing?: boolean;
  audit: {
    auditId: string;
    status: "running" | "completed" | "failed";
    startedAt: string;
    severityTotals: { critical: number; warning: number; info: number };
  } | null;
}) {
  const steps = buildSteps({
    projectId,
    gscConnected,
    googleMissing,
    audit,
  }).slice(0, SHOWN);
  const auditCompleted = audit?.status === "completed";
  const ageMs = audit ? Date.now() - parseTimestamp(audit.startedAt) : NaN;
  const auditFresh =
    auditCompleted &&
    Number.isFinite(ageMs) &&
    ageMs >= 0 &&
    ageMs <= STALE_AFTER_DAYS * 86_400_000;
  const readiness = getReadinessScore({
    gscConnected,
    ga4Connected,
    auditCompleted,
    auditFresh,
    hasProjectContext,
    agentConnected,
  });

  return (
    <section className="overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-[var(--shadow-raise)]">
      <div className="border-b border-base-300 px-5 py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <div
            role="progressbar"
            aria-label={t("Hazırlık puanı")}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={readiness.score}
            className="relative size-14 shrink-0"
          >
            <svg viewBox="0 0 56 56" className="-rotate-90" aria-hidden>
              <circle
                cx="28"
                cy="28"
                r="23"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                className="text-base-300"
              />
              <circle
                cx="28"
                cy="28"
                r="23"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${(readiness.score / 100) * 144.5} 144.5`}
                className="text-primary transition-[stroke-dasharray] duration-300 ease-out"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold tabular-nums">
              {formatCount(readiness.score)}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <h2 className="text-base font-semibold leading-tight">
                {t("Sıradaki adımlar")}
              </h2>
              <span className="badge badge-ghost badge-sm tabular-nums">
                {t("{completed} / {total} hazır", {
                  completed: formatCount(readiness.completed),
                  total: formatCount(readiness.total),
                })}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted">
              {t("En hızlı kazandıracak işten başlayın.")}
            </p>
          </div>

          <div className="sm:max-w-44 sm:text-right">
            <p className="text-xs font-medium text-muted">
              {t("Hazırlık puanı")}
            </p>
            <p className="text-lg font-semibold tabular-nums">
              {formatCount(readiness.score)} / 100
            </p>
          </div>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-subtle">
          {t(
            "Puan; Google bağlantıları, güncel denetim, proje bilgisi ve ajan kurulumunun hazır olup olmadığını gösterir. Arama sırası ya da SEO başarısı değildir.",
          )}
        </p>
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
            {t("Acil bir iş görünmüyor. Denetim güncel ve kritik sorun yok.")}
          </p>
        )
      ) : (
        <ul className="stagger divide-y divide-base-300">
          {steps.map((step, index) => (
            <li key={step.key} style={{ animationDelay: `${index * 60}ms` }}>
              <Link
                to={step.to}
                params={step.params}
                search={step.search}
                /*
                 * The whole row is the target, not a small link at the end:
                 * this is the one list on the dashboard whose entire purpose
                 * is to be clicked.
                 */
                className="group flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-base-200/40"
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
                  <span className="block text-sm font-medium">
                    {step.title}
                  </span>
                  <span className="block text-xs text-muted">
                    {step.detail}
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-1 text-sm text-muted transition-colors group-hover:text-base-content">
                  {step.cta}
                  <ArrowRight
                    aria-hidden
                    className="size-3.5 transition-transform group-hover:translate-x-0.5"
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

function buildSteps({
  projectId,
  gscConnected,
  googleMissing,
  audit,
}: {
  projectId: string;
  gscConnected: boolean;
  googleMissing: boolean;
  audit: {
    auditId: string;
    status: "running" | "completed" | "failed";
    startedAt: string;
    severityTotals: { critical: number; warning: number; info: number };
  } | null;
}): Step[] {
  const steps: Step[] = [];
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

  if (!audit) {
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
    return steps;
  }

  if (audit.status === "failed") {
    steps.push({
      key: "retry-audit",
      icon: Radar,
      title: t("Denetimi yeniden başlatın"),
      detail: t("Önceki denetim tamamlanamadı. Yeniden deneyin."),
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
      cta: t("İlerlemeyi gör"),
    });
  }

  if (audit.status === "completed" && audit.severityTotals.critical > 0) {
    steps.push({
      key: "critical",
      icon: TriangleAlert,
      title: t("{count} kritik sorun var", {
        count: audit.severityTotals.critical,
      }),
      detail: t(
        "Kritik sorunlar Google'ın sayfayı taramasını ya da dizine almasını engelleyebilir.",
      ),
      to: "/p/$projectId/audit",
      params,
      search: { auditId: audit.auditId, tab: "issues" },
      cta: t("Gör"),
    });
  }

  if (gscConnected) {
    steps.push({
      key: "opportunities",
      icon: Search,
      title: t("Fırsatlara bakın"),
      detail: t(
        "Sayfalarınız, sıralarına göre değil, üzerinde çalışmaya ne kadar değdiğine göre sıralı.",
      ),
      to: "/p/$projectId/opportunities",
      params,
      cta: t("Aç"),
    });
  }

  /*
   * A crawl older than a week describes a site that has since changed, and
   * every number on this screen comes from it.
   */
  const ageDays = (Date.now() - parseTimestamp(audit.startedAt)) / 86_400_000;
  if (audit.status === "completed" && ageDays > STALE_AFTER_DAYS) {
    steps.push({
      key: "rescan",
      icon: Radar,
      title: t("Denetimi tazeleyin"),
      detail: t(
        "Son denetim {when}. Bu ekrandaki sayılar o denetimden geliyor.",
        { when: formatRelativeTime(audit.startedAt) },
      ),
      to: "/p/$projectId/audit",
      params,
      cta: t("Başlat"),
    });
  }

  if (audit.status === "completed" && audit.severityTotals.warning > 0) {
    steps.push({
      key: "warnings",
      icon: TriangleAlert,
      title: t("{count} uyarı var", { count: audit.severityTotals.warning }),
      detail: t("Kritik değil ama Google'ın sayfayı anlamasını zorlaştırıyor."),
      to: "/p/$projectId/audit",
      params,
      search: { auditId: audit.auditId, tab: "issues" },
      cta: t("Gör"),
    });
  }

  return steps;
}
