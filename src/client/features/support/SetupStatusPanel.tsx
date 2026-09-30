import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { CopyButton } from "@/client/components/CopyButton";
import { QueryErrorState } from "@/client/components/QueryErrorState";
import { readClientLog } from "@/client/lib/clientLog";
import { getDiagnostics } from "@/serverFunctions/diagnostics";
import { buildDiagnosticsSummary } from "./DiagnosticsBundleButton";

type Diagnostics = Awaited<ReturnType<typeof getDiagnostics>>;

/** Plain names for the checks the server reports, and where each is fixed. */
const CHECK_INFO: Record<
  string,
  { label: string; fix?: { to: "/settings"; label: string } }
> = {
  auth: { label: "Giriş ve erişim" },
  gsc: {
    label: "Google girişi",
    fix: { to: "/settings", label: "Ayarları aç" },
  },
  pagespeed: {
    label: "PageSpeed anahtarı",
    fix: { to: "/settings", label: "Anahtar gir" },
  },
  runtime: { label: "Çalışma ortamı" },
  database: { label: "Veritabanı" },
};

function checkLabel(key: string): string {
  return CHECK_INFO[key]?.label ?? key;
}

function CheckIcon({ status }: { status: string }) {
  if (status === "ok") {
    return <CheckCircle2 className="size-4 text-[var(--ink-success)]" />;
  }
  if (status === "warn") {
    return <AlertTriangle className="size-4 text-[var(--ink-warning)]" />;
  }
  return <AlertCircle className="size-4 text-[var(--ink-error)]" />;
}

const STATUS_WORD: Record<string, string> = {
  ok: "Sorun yok",
  warn: "Dikkat",
  error: "Hata",
};

/**
 * The install's own health, read live: which checks pass, which do not, and
 * where to go to fix each one.
 *
 * The copyable summary is the same text as `summary.txt` in the diagnostics
 * archive, so it carries no token, key or cookie -- only whether each is
 * configured -- and is safe to paste into an issue.
 */
export function SetupStatusPanel() {
  const query = useQuery({
    queryKey: ["diagnostics"],
    queryFn: () => getDiagnostics(),
    retry: false,
    staleTime: 0,
  });

  if (query.isPending) {
    return (
      <div
        className="space-y-2 rounded-box border border-base-300 bg-base-100 p-4"
        aria-busy
      >
        <div className="skeleton h-4 w-40" />
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="skeleton h-9" />
        ))}
      </div>
    );
  }

  if (query.isError) {
    return (
      <div className="rounded-box border border-base-300 bg-base-100">
        <QueryErrorState
          compact
          error={query.error}
          onRetry={() => void query.refetch()}
          title="Kurulum durumu okunamadı"
        />
      </div>
    );
  }

  return (
    <StatusBody
      data={query.data}
      refreshing={query.isFetching}
      onRefresh={() => void query.refetch()}
    />
  );
}

function StatusBody({
  data,
  refreshing,
  onRefresh,
}: {
  data: Diagnostics;
  refreshing: boolean;
  onRefresh: () => void;
}) {
  const checks = Object.entries(data.setup.checks);
  const problems = checks.filter(([, check]) => check.status !== "ok").length;
  const projects = data.projects.filter((project) => !project.archivedAt);
  const connected = (projectId: string) => ({
    gsc: data.connections.searchConsole.some(
      (row) => row.projectId === projectId,
    ),
    ga4: data.connections.analytics.some((row) => row.projectId === projectId),
  });

  return (
    <section
      aria-labelledby="setup-status-title"
      className="space-y-4 rounded-box border border-base-300 bg-base-100 p-4"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 id="setup-status-title" className="text-sm font-medium">
            Kurulumunuzun durumu
          </h2>
          <p className="mt-0.5 text-xs text-muted" aria-live="polite">
            {problems === 0
              ? "Tüm denetimler geçti."
              : `${problems} denetim dikkat istiyor.`}{" "}
            Sürüm {data.version}.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="btn btn-ghost btn-sm gap-1.5"
            disabled={refreshing}
            onClick={onRefresh}
          >
            {refreshing ? (
              <Loader2 className="size-4 animate-spin" aria-hidden />
            ) : (
              <RefreshCw className="size-4" aria-hidden />
            )}
            Yenile
          </button>
          <CopyButton
            value={buildDiagnosticsSummary(data, readClientLog().length)}
            label="Özeti kopyala"
            successMessage="Özet kopyalandı. İçinde gizli değer yok."
          />
        </div>
      </div>

      <ul className="divide-y divide-base-300">
        {checks.map(([key, check]) => {
          const fix = CHECK_INFO[key]?.fix;
          return (
            <li key={key} className="flex items-start gap-3 py-2.5">
              <span aria-hidden className="mt-0.5 shrink-0">
                <CheckIcon status={check.status} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">
                  {checkLabel(key)}
                  <span className="sr-only">
                    {" "}
                    — {STATUS_WORD[check.status] ?? check.status}
                  </span>
                </p>
                {check.detail ? (
                  <p className="text-xs text-muted">{check.detail}</p>
                ) : null}
              </div>
              {fix && check.status !== "ok" ? (
                <Link to={fix.to} className="btn btn-xs">
                  {fix.label}
                </Link>
              ) : null}
            </li>
          );
        })}
      </ul>

      <div className="space-y-2 border-t border-base-300 pt-3">
        <h3 className="text-xs font-medium text-muted">Projeler</h3>
        {projects.length === 0 ? (
          <p className="text-sm text-muted">
            Henüz proje yok.{" "}
            <Link to="/projects" className="link link-primary">
              Proje ekleyin
            </Link>
            .
          </p>
        ) : (
          <ul className="space-y-1.5">
            {projects.map((project) => {
              const state = connected(project.id);
              return (
                <li
                  key={project.id}
                  className="flex flex-wrap items-center justify-between gap-2 text-sm"
                >
                  <span className="min-w-0">
                    <span className="font-medium">{project.name}</span>
                    <span className="ml-2 text-xs text-muted">
                      Search Console {state.gsc ? "bağlı" : "bağlı değil"} ·
                      Analytics {state.ga4 ? "bağlı" : "bağlı değil"}
                    </span>
                  </span>
                  <Link
                    to="/p/$projectId/settings/integrations"
                    params={{ projectId: project.id }}
                    className="btn btn-ghost btn-xs"
                  >
                    Bağlantıları aç
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
