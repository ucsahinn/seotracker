import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { sort } from "remeda";
import { AuditFreshnessCard } from "./AuditFreshnessCard";
import { DashboardOnboarding } from "./DashboardOnboarding";
import { PageHeader, PageShell } from "@/client/components/PageShell";
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
import { getStandardErrorMessage } from "@/client/lib/error-messages";
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
  });
  const googleConfigured = useGoogleClientConfigured();

  const activation = activationQuery.data;
  const overview = overviewQuery.data;

  if (activationQuery.isError) {
    return (
      <PageShell>
        <div className="alert alert-error">
          {getStandardErrorMessage(activationQuery.error)}
        </div>
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
        <div className="rounded-box border border-base-300 bg-base-100">
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
            node: <GscCard projectId={projectId} connected={false} />,
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
          <Link
            to="/p/$projectId/audit"
            params={{ projectId }}
            className="btn btn-primary btn-sm"
          >
            Denetim çalıştır
          </Link>
        }
      />

      {googleConfigured === false ? <GoogleSetupBanner /> : null}

      <DashboardMetrics projectId={projectId} connected={gscConnected} />

      <AuditFreshnessCard projectId={projectId} />

      {/* Cards with data sort before setup pitches and empty states. A lone
          card takes the full width rather than leaving half the row empty. */}
      <div
        className={`grid items-start gap-5 ${
          cards.length > 1 ? "lg:grid-cols-2" : ""
        }`}
      >
        {sort(cards, (a, b) => Number(b.hasData) - Number(a.hasData)).map(
          (card) => (
            <div key={card.key}>{card.node}</div>
          ),
        )}
      </div>

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
