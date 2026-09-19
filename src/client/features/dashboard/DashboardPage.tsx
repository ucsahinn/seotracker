import { useQuery } from "@tanstack/react-query";
import { sort } from "remeda";
import { DashboardOnboarding } from "./DashboardOnboarding";
import {
  AuditHealthCard,
  GscCard,
} from "@/client/features/dashboard/DashboardCards";
import { Ga4Card } from "@/client/features/dashboard/Ga4Card";
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

  const activation = activationQuery.data;
  const overview = overviewQuery.data;

  if (activationQuery.isError) {
    return (
      <div className="px-4 py-4 md:px-6 md:py-6">
        <div className="alert alert-error">
          {getStandardErrorMessage(activationQuery.error)}
        </div>
      </div>
    );
  }

  // Wait for the overview too: rendering cards from `overview === undefined`
  // flashes their empty states (and reshuffles the data-first sort) once the
  // real data lands. An overview error falls through so the page still loads.
  if (!activation || overviewQuery.isPending) {
    return (
      <div
        className="mx-auto flex max-w-5xl flex-col gap-5 px-4 py-4 md:px-6 md:py-6"
        aria-busy
      >
        <div className="skeleton h-8 w-52" />
        <div className="skeleton h-36" />
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="skeleton h-44" />
          <div className="skeleton h-44" />
        </div>
      </div>
    );
  }

  const gscConnected = activation.gsc.connected;
  const ga4Connected = activation.ga4.connected;

  const cards = [
    ...(gscConnected
      ? [
          {
            key: "gsc",
            hasData: true,
            node: <GscCard projectId={projectId} connected />,
          },
        ]
      : []),
    ...(ga4Connected || !activation.ga4.cardDismissedAt
      ? [
          {
            key: "ga4",
            hasData: ga4Connected,
            node: <Ga4Card projectId={projectId} connected={ga4Connected} />,
          },
        ]
      : []),
    {
      key: "audit",
      hasData: overview?.audit != null,
      node: (
        <AuditHealthCard
          projectId={projectId}
          audit={overview?.audit ?? null}
        />
      ),
    },
  ];

  return (
    <div className="px-4 py-4 pb-24 md:px-6 md:py-6 md:pb-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-5">
        <h1 className="text-2xl font-semibold">Dashboard</h1>

        <DashboardOnboarding
          key={projectId}
          projectId={projectId}
          activation={activation}
        />

        {/* Every card is half width on large screens (only the checklist spans).
          Cards with data render before setup pitches and empty states. */}
        <div className="grid items-start gap-5 lg:grid-cols-2">
          {sort(cards, (a, b) => Number(b.hasData) - Number(a.hasData)).map(
            (card) => (
              <div key={card.key}>{card.node}</div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
