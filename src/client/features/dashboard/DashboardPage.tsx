import { Fragment } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { sort } from "remeda";
import { AuditFreshnessCard } from "./AuditFreshnessCard";
import { DashboardOnboarding } from "./DashboardOnboarding";
import { PageHeader, PageShell } from "@/client/components/PageShell";
import { PageActions, RefreshButton } from "@/client/components/RefreshButton";
import { Reveal } from "@/client/components/Reveal";
import { useDashboardRefresh } from "@/client/features/dashboard/useDashboardRefresh";
import {
  AuditHealthCard,
  GscCard,
} from "@/client/features/dashboard/DashboardCards";
import { DashboardMetrics } from "@/client/features/dashboard/DashboardMetrics";
import {
  GoogleSetupBanner,
  useGoogleClientConfigured,
} from "@/client/features/dashboard/GoogleSetupBanner";
import { Ga4Card } from "@/client/features/dashboard/Ga4Card";
import { QueryErrorState } from "@/client/components/QueryErrorState";
import { SearchInsights } from "@/client/features/dashboard/SearchInsights";
import { NextStepsCard } from "@/client/features/dashboard/NextStepsCard";
import {
  getDashboardActivation,
  getDashboardOverview,
} from "@/serverFunctions/dashboard";

export function DashboardPage({ projectId }: { projectId: string }) {
  const activationQuery = useQuery({
    queryKey: ["dashboardActivation", projectId],
    queryFn: () => getDashboardActivation({ data: { projectId } }),
  });
  const overviewQuery = useQuery({
    queryKey: ["dashboardOverview", projectId],
    queryFn: () => getDashboardOverview({ data: { projectId } }),
    /*
     * The audit card promises "sonuçlar bittiğinde görünecek" while a crawl
     * runs. Nothing refetched it, so the promise needed a reload to come
     * true. Polls only while there is a crawl to wait for.
     */
    refetchInterval: (query) =>
      query.state.data?.audit?.status === "running" ? 5_000 : false,
  });
  const googleConfigured = useGoogleClientConfigured();
  const refresh = useDashboardRefresh(projectId);

  const activation = activationQuery.data;
  const overview = overviewQuery.data;

  if (activationQuery.isError) {
    return (
      <PageShell>
        <QueryErrorState
          error={activationQuery.error}
          onRetry={() => void activationQuery.refetch()}
          title="Panel yüklenemedi"
        />
      </PageShell>
    );
  }

  // Wait for the overview too: rendering cards from `overview === undefined`
  // flashes their empty states (and reshuffles the data-first sort) once the
  // real data lands. An overview error falls through so the page still loads.
  if (!activation || overviewQuery.isPending) {
    return (
      <PageShell>
        <div className="flex flex-col gap-6" aria-busy>
          <div className="skeleton h-9 w-56" />
          <div className="skeleton h-[104px]" />
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="skeleton h-52" />
            <div className="skeleton h-52" />
          </div>
        </div>
      </PageShell>
    );
  }

  const gscConnected = activation.gsc.connected;
  const ga4Connected = activation.ga4.connected;

  const cards = [
    {
      key: "audit",
      hasData: overview?.audit != null,
      /*
       * A failed overview is not an operator who has never run an audit.
       * `overview` is undefined on error just as it is before the first
       * audit, so this card used to answer a 500 with "tarayın" and a button
       * -- inviting someone with a week of audits to spend a fresh crawl.
       */
      node: overviewQuery.isError ? (
        <div className="rounded-box border border-base-300 bg-base-100 shadow-[var(--shadow-raise)]">
          <QueryErrorState
            error={overviewQuery.error}
            onRetry={() => void overviewQuery.refetch()}
            title="Denetim özeti yüklenemedi"
          />
        </div>
      ) : (
        <AuditHealthCard
          projectId={projectId}
          audit={overview?.audit ?? null}
        />
      ),
    },
    // Connected, the Search Console numbers are already in the metric row, so
    // the card would only repeat them. Disconnected, it is the thing that runs
    // the whole OAuth flow, so it has to be on the page - unless there is no
    // OAuth client yet, in which case the banner above already says so and a
    // card that cannot connect is just a second copy of the same warning.
    ...(gscConnected || googleConfigured === false
      ? []
      : [
          {
            key: "gsc",
            hasData: false,
            node: <GscCard projectId={projectId} />,
          },
        ]),
    ...((ga4Connected || !activation.ga4.cardDismissedAt) &&
    googleConfigured !== false
      ? [
          {
            key: "ga4",
            hasData: ga4Connected,
            node: <Ga4Card projectId={projectId} connected={ga4Connected} />,
          },
        ]
      : []),
  ];

  return (
    <PageShell>
      <PageHeader
        title="Panel"
        description={activation.domain ?? undefined}
        actions={
          <PageActions>
            <RefreshButton {...refresh} shortcut />
            <Link
              to="/p/$projectId/audit"
              params={{ projectId }}
              className="btn btn-primary btn-sm"
            >
              Denetimi başlat
            </Link>
          </PageActions>
        }
      />

      {googleConfigured === false ? <GoogleSetupBanner /> : null}

      <DashboardMetrics projectId={projectId} connected={gscConnected} />

      {/*
       * Above the cards on purpose: everything below is "how is the site",
       * and this is "so what do I do" -- which is the question an operator
       * opens the dashboard with. Built from the data the two queries above
       * already fetched, so it costs no extra request.
       */}
      <NextStepsCard
        projectId={projectId}
        gscConnected={gscConnected}
        audit={overview?.audit ?? null}
      />

      <AuditFreshnessCard projectId={projectId} />

      <SearchInsights projectId={projectId} connected={gscConnected} />

      {/* Cards with data sort before setup pitches and empty states. A lone
          card takes the full width rather than leaving half the row empty. */}
      <Reveal
        className={`grid items-start gap-5 ${
          cards.length > 1 ? "lg:grid-cols-2" : ""
        }`}
        stepMs={60}
      >
        {sort(cards, (a, b) => Number(b.hasData) - Number(a.hasData)).map(
          (card) => (
            <Fragment key={card.key}>{card.node}</Fragment>
          ),
        )}
      </Reveal>

      {/* Setup last. It is the one thing on this page you finish and never
          look at again, so it does not get the top of the screen. */}
      <DashboardOnboarding
        key={projectId}
        projectId={projectId}
        activation={activation}
      />
    </PageShell>
  );
}
