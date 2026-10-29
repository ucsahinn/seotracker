import { useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { PageHeader, PageShell } from "@/client/components/PageShell";
import { PageActions } from "@/client/components/RefreshButton";
import { QueryErrorState } from "@/client/components/QueryErrorState";
import {
  getDashboardActivation,
  getDashboardOverview,
} from "@/serverFunctions/dashboard";
import { getAuditStatus } from "@/serverFunctions/audit";
import { projectSetupOptions } from "@/client/features/projects/projectSetupQuery";
import { t } from "@/shared/i18n";
import { DashboardVerdict } from "./DashboardVerdict";
import { DashboardMetrics } from "./DashboardMetrics";
import { NextStepsCard } from "./NextStepsCard";
import { ClickTrendCard, StrikingQueriesCard } from "./SearchInsights";
import { GscCard } from "./DashboardCards";
import { DashboardAuditPanel } from "./DashboardAuditPanel";
import { Ga4Card } from "./Ga4Card";
import { DashboardOnboarding } from "./DashboardOnboarding";
import { PanelRefreshButton, PanelRefreshStatus } from "./PanelRefreshButton";
import { useDashboardRefresh } from "./useDashboardRefresh";
import { useGoogleConfiguration } from "./GoogleSetupBanner";
import { dashboardSearchViewQuery } from "./dashboardGscReport";
export function DashboardPage({ projectId }: { projectId: string }) {
  const client = useQueryClient();
  const refresh = useDashboardRefresh(projectId);
  const activationQuery = useQuery({
    queryKey: ["dashboardActivation", projectId],
    queryFn: () => getDashboardActivation({ data: { projectId } }),
  });
  const setupQuery = useQuery(projectSetupOptions(projectId));
  const overviewQuery = useQuery({
    queryKey: ["dashboardOverview", projectId],
    queryFn: () => getDashboardOverview({ data: { projectId } }),
  });
  const configured = useGoogleConfiguration();
  const activation = activationQuery.data;
  const overview = overviewQuery.data;
  const searchQuery = useQuery(
    dashboardSearchViewQuery(projectId, activation?.gsc.connected === true),
  );
  const attempt = overview?.latestAttempt;
  const progress = useQuery({
    queryKey: ["audit-status", projectId, attempt?.auditId],
    queryFn: () =>
      getAuditStatus({ data: { projectId, auditId: attempt!.auditId } }),
    enabled: attempt?.status === "running",
    refetchInterval: (q) => (q.state.data?.status === "running" ? 5000 : false),
  });
  const wasRunning = useRef(false);
  const running = progress.data
    ? progress.data.status === "running"
    : attempt?.status === "running";
  useEffect(() => {
    if (wasRunning.current && !running) {
      void client.invalidateQueries({ queryKey: ["projectSetup", projectId] });
      void client.invalidateQueries({
        queryKey: ["dashboardOverview", projectId],
      });
      void client.invalidateQueries({
        queryKey: ["auditFreshness", projectId],
      });
    }
    wasRunning.current = running;
  }, [running, client, projectId]);
  if (activationQuery.isError && !activation)
    return (
      <PageShell>
        <QueryErrorState
          error={activationQuery.error}
          onRetry={() => void activationQuery.refetch()}
          title={t("Panel yüklenemedi")}
        />
      </PageShell>
    );
  if (!activation || overviewQuery.isPending)
    return (
      <PageShell>
        <div className="space-y-6" aria-busy>
          <div className="skeleton h-9 w-56" />
          <div className="skeleton h-20" />
          <div className="skeleton h-28" />
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="skeleton h-64" />
            <div className="skeleton h-64" />
          </div>
        </div>
      </PageShell>
    );
  const view = searchQuery.data?.connected ? searchQuery.data : null;
  const audit = overview?.audit ?? null;
  const siteSelected = overviewQuery.isError || !!overview?.domain;
  const now = Date.now();
  return (
    <PageShell>
      <PageHeader
        title={t("Panel")}
        description={
          <>
            {activation.domain ? (
              <>
                <span>{activation.domain}</span>
                <span aria-hidden> · </span>
              </>
            ) : null}
            <PanelRefreshStatus refresh={refresh} />
          </>
        }
        actions={
          <PageActions>
            <PanelRefreshButton refresh={refresh} />
            <Link
              to="/p/$projectId/audit"
              params={{ projectId }}
              className="btn btn-primary btn-sm min-h-11"
            >
              {t("Denetimler")}
            </Link>
          </PageActions>
        }
      />
      {/*
       * No "do this first" chip here any more: it was the first row of
       * Sıradaki adımlar, a few hundred pixels further down, so the same
       * finding read three times with the audit list.
       */}
      <DashboardVerdict
        projectId={projectId}
        connected={activation.gsc.connected}
      />
      <DashboardMetrics
        projectId={projectId}
        connected={activation.gsc.connected}
      />
      {activationQuery.isError ? (
        <QueryErrorState
          compact
          error={activationQuery.error}
          onRetry={() => void activationQuery.refetch()}
          title={t("Bağlantı durumu yenilenemedi")}
        />
      ) : null}
      {configured === "error" ? (
        <p role="status" className="text-sm text-muted">
          {t("Google yapılandırması okunamadı. Yenile ile tekrar deneyin.")}
        </p>
      ) : null}
      {configured === "pending" ? (
        <div className="skeleton h-8" aria-busy />
      ) : null}
      {/*
       * The short cards stack in the narrow column, so the chart beside them
       * is not left with a hole under "Sıradaki adımlar".
       */}
      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="min-w-0 space-y-5 lg:col-start-2 lg:row-start-1">
          <NextStepsCard
            now={now}
            projectId={projectId}
            gscConnected={activation.gsc.connected}
            googleMissing={configured === "missing"}
            setup={setupQuery.data}
            audit={audit}
            overviewUnavailable={overviewQuery.isError}
            siteSelected={siteSelected}
            searchUnavailable={searchQuery.isError}
            searchTodo={view?.todo ?? []}
          />
          <StrikingQueriesCard
            projectId={projectId}
            connected={activation.gsc.connected}
          />
        </div>
        <div className="min-w-0 lg:col-start-1 lg:row-start-1">
          <ClickTrendCard
            projectId={projectId}
            connected={activation.gsc.connected}
          />
        </div>
      </div>
      {/* Stretched, so the two cards end on one line. */}
      <div className="grid items-stretch gap-5 lg:grid-cols-2">
        <DashboardAuditPanel
          projectId={projectId}
          overview={overview}
          isError={overviewQuery.isError}
          error={overviewQuery.error}
          onRetry={() => void overviewQuery.refetch()}
          progressPages={progress.data?.pagesCrawled}
        />
        <div className="min-w-0">
          {(activation.ga4.connected || !activation.ga4.cardDismissedAt) &&
          configured !== "missing" ? (
            <Ga4Card
              projectId={projectId}
              connected={activation.ga4.connected}
            />
          ) : null}
        </div>
      </div>
      {!activation.gsc.connected && configured === "ready" ? (
        <GscCard projectId={projectId} />
      ) : null}
      {setupQuery.isError ? (
        <QueryErrorState
          compact
          error={setupQuery.error}
          onRetry={() => void setupQuery.refetch()}
          title={t("Kurulum durumu okunamadı")}
        />
      ) : null}
      <DashboardOnboarding
        key={projectId}
        projectId={projectId}
        activation={{
          ...activation,
          hasProjectContext: setupQuery.data?.projectInfo === true,
        }}
      />
    </PageShell>
  );
}
