import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Link2,
  Radar,
  Search,
  TriangleAlert,
} from "lucide-react";
import { formatCount, formatRelativeTime } from "@/client/lib/format";

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
  cta: string;
  tone: "urgent" | "normal";
};

export function NextStepsCard({
  projectId,
  gscConnected,
  audit,
}: {
  projectId: string;
  gscConnected: boolean;
  audit: {
    auditId: string;
    status: "running" | "completed" | "failed";
    startedAt: string;
    severityTotals: { critical: number; warning: number; info: number };
  } | null;
}) {
  const steps = buildSteps({ projectId, gscConnected, audit }).slice(0, SHOWN);

  return (
    <section className="overflow-hidden rounded-box border border-base-300 bg-base-100">
      <div className="border-b border-base-300 px-4 py-3">
        <h2 className="text-sm font-medium">Sıradaki adımlar</h2>
        <p className="mt-0.5 text-xs text-muted">
          Sitenizin verisine bakarak, en hızlı kazanç veren işten başlayarak.
        </p>
      </div>

      {steps.length === 0 ? (
        <p className="flex items-center gap-2 px-4 py-6 text-sm text-muted">
          <CheckCircle2
            aria-hidden
            className="size-4 text-[var(--ink-success)]"
          />
          Acil bir iş görünmüyor. Denetim güncel ve kritik sorun yok.
        </p>
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
                className="group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-base-200/40"
              >
                <span
                  aria-hidden
                  /*
                   * `attention` breathes a ring twice and stops. Looping it
                   * would make the whole dashboard shimmer the moment a
                   * critical finding exists, which teaches the reader to stop
                   * seeing it -- so it is a nudge, not an alarm.
                   */
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full ${
                    step.tone === "urgent"
                      ? "attention bg-error/10 text-[var(--ink-error)]"
                      : "bg-primary/10 text-primary"
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
                <span className="flex shrink-0 items-center gap-1 text-xs text-muted transition-colors group-hover:text-base-content">
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
  audit,
}: {
  projectId: string;
  gscConnected: boolean;
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
  if (!gscConnected) {
    steps.push({
      key: "gsc",
      icon: Link2,
      title: "Search Console'u bağlayın",
      detail:
        "Hangi kelimede kaçıncı sırada olduğunuzu ancak Google'ın kendi verisi söyler. Ücretsiz.",
      to: "/p/$projectId/settings/integrations",
      params,
      cta: "Search Console'u bağla",
      tone: "urgent",
    });
  }

  if (!audit) {
    steps.push({
      key: "first-audit",
      icon: Radar,
      title: "İlk denetimi başlatın",
      detail:
        "Sitenizi kendi tarayıcımızla tarar; teknik sorunları önem sırasına göre listeler.",
      to: "/p/$projectId/audit",
      params,
      cta: "Denetimi başlat",
      tone: "urgent",
    });
    return steps;
  }

  if (audit.status === "completed" && audit.severityTotals.critical > 0) {
    steps.push({
      key: "critical",
      icon: TriangleAlert,
      title: `${formatCount(audit.severityTotals.critical)} kritik sorun var`,
      detail:
        "Kritik sorunlar Google'ın sayfayı taramasını ya da dizine almasını engelleyebilir.",
      to: "/p/$projectId/audit",
      params,
      search: { auditId: audit.auditId, tab: "issues" },
      cta: "Kritik sorunları gör",
      tone: "urgent",
    });
  }

  if (gscConnected) {
    steps.push({
      key: "opportunities",
      icon: Search,
      title: "Fırsatlara bakın",
      detail:
        "Sıraya göre değil, üzerinde çalışmanın değerine göre sıralanmış sayfalarınız.",
      to: "/p/$projectId/opportunities",
      params,
      cta: "Fırsatları aç",
      tone: "normal",
    });
  }

  /*
   * A crawl older than a week describes a site that has since changed, and
   * every number on this screen comes from it.
   */
  const ageDays =
    (Date.now() - new Date(audit.startedAt).getTime()) / 86_400_000;
  if (audit.status === "completed" && ageDays > STALE_AFTER_DAYS) {
    steps.push({
      key: "rescan",
      icon: Radar,
      title: "Denetimi tazeleyin",
      detail: `Son tarama ${formatRelativeTime(audit.startedAt)}. Bu ekrandaki sayılar o taramadan geliyor.`,
      to: "/p/$projectId/audit",
      params,
      cta: "Yeniden denetle",
      tone: "normal",
    });
  }

  if (audit.status === "completed" && audit.severityTotals.warning > 0) {
    steps.push({
      key: "warnings",
      icon: TriangleAlert,
      title: `${formatCount(audit.severityTotals.warning)} uyarı var`,
      detail: "Kritik değil ama Google'ın sayfayı anlamasını zorlaştırıyor.",
      to: "/p/$projectId/audit",
      params,
      search: { auditId: audit.auditId, tab: "issues" },
      cta: "Uyarıları gör",
      tone: "normal",
    });
  }

  return steps;
}
