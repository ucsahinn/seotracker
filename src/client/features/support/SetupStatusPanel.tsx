import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  AlertTriangle,
  ArrowUpCircle,
  CheckCircle2,
} from "lucide-react";
import { CopyButton } from "@/client/components/CopyButton";
import { QueryErrorState } from "@/client/components/QueryErrorState";
import { readClientLog } from "@/client/lib/clientLog";
import { formatDateTime } from "@/client/lib/format";
import type { getDiagnostics } from "@/serverFunctions/diagnostics";
import { describeCheck, type CheckStatus } from "./checkCopy";
import { buildDiagnosticsSummary } from "./DiagnosticsBundleButton";
import { useSetupSnapshot } from "./useSetupSnapshot";

type Diagnostics = Awaited<ReturnType<typeof getDiagnostics>>;
type Update = ReturnType<typeof useSetupSnapshot>["update"];

/** Plain names for the checks the server reports, and where each is fixed. */
const CHECK_INFO: Record<
  string,
  {
    label: string;
    fix?: { hash: string; label: string };
  }
> = {
  auth: { label: "Giriş ve erişim" },
  gsc: {
    label: "Google girişi",
    fix: { hash: "google", label: "Ayarları aç" },
  },
  pagespeed: {
    label: "PageSpeed anahtarı",
    fix: { hash: "hiz-olcumu", label: "Anahtar gir" },
  },
  runtime: { label: "Çalışma ortamı" },
  database: { label: "Veritabanı" },
};

function checkLabel(key: string): string {
  return CHECK_INFO[key]?.label ?? key;
}

function CheckIcon({ status }: { status: CheckStatus }) {
  if (status === "ok") {
    return <CheckCircle2 className="size-4 text-[var(--ink-success)]" />;
  }
  if (status === "warn") {
    return <AlertTriangle className="size-4 text-[var(--ink-warning)]" />;
  }
  return <AlertCircle className="size-4 text-[var(--ink-error)]" />;
}

const STATUS_WORD: Record<CheckStatus, string> = {
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
  const { diagnostics, update, googleReady } = useSetupSnapshot();

  if (diagnostics.isPending) {
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

  if (diagnostics.isError) {
    return (
      <div className="rounded-box border border-base-300 bg-base-100">
        <QueryErrorState
          compact
          error={diagnostics.error}
          onRetry={() => void diagnostics.refetch()}
          title="Kurulum durumu okunamadı"
        />
      </div>
    );
  }

  return (
    <StatusBody
      data={diagnostics.data}
      update={update}
      googleReady={googleReady}
    />
  );
}

function VersionLine({ version, update }: { version: string; update: Update }) {
  if (update?.updateAvailable) {
    return (
      <Link
        to="/settings"
        hash="guncelleme"
        className="link link-primary inline-flex items-center gap-1"
      >
        <ArrowUpCircle className="size-3.5" aria-hidden />
        Sürüm {version}, yeni sürüm {update.latestVersion} var
      </Link>
    );
  }
  if (update?.enabled && update.outcome === "error") {
    return (
      <>
        Sürüm {version}. Güncelleme kontrolü başarısız oldu; son bilinen sürüm{" "}
        {update.latestVersion}.
      </>
    );
  }
  if (update?.enabled && update.outcome === "ok") {
    return <>Sürüm {version}, güncel.</>;
  }
  if (update && !update.enabled) {
    return <>Sürüm {version}. Güncelleme kontrolü kapalı.</>;
  }
  return <>Sürüm {version}.</>;
}

function StatusBody({
  data,
  update,
  googleReady,
}: {
  data: Diagnostics;
  update: Update;
  googleReady: boolean | null;
}) {
  const checks = Object.entries(data.setup.checks).map(([key, check]) => ({
    key,
    described: describeCheck(key, check, googleReady),
  }));
  const problems = checks.filter(
    (check) => check.described.status !== "ok",
  ).length;
  const worst: CheckStatus = checks.some((c) => c.described.status === "error")
    ? "error"
    : problems > 0
      ? "warn"
      : "ok";
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
      className="enter space-y-4 rounded-box border border-base-300 bg-base-100 p-4"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span aria-hidden className="mt-0.5">
            <CheckIcon status={worst} />
          </span>
          <div>
            <h2 id="setup-status-title" className="text-sm font-medium">
              Kurulumunuzun durumu
            </h2>
            <p className="mt-0.5 text-sm" aria-live="polite">
              {problems === 0
                ? "Her şey yolunda."
                : problems === 1
                  ? "1 şey dikkat istiyor."
                  : `${problems} şey dikkat istiyor.`}
            </p>
            <p className="mt-0.5 text-xs text-muted">
              <VersionLine version={data.version} update={update} /> Kontrol:{" "}
              {formatDateTime(data.generatedAt)}.
            </p>
          </div>
        </div>
        <CopyButton
          value={buildDiagnosticsSummary(data, readClientLog().length)}
          label="Özeti kopyala"
          successMessage="Özet kopyalandı. İçinde gizli değer yok."
        />
      </div>

      <ul className="divide-y divide-base-300">
        {checks.map(({ key, described }) => {
          const fix = CHECK_INFO[key]?.fix;
          return (
            <li key={key} className="flex items-start gap-3 py-2.5">
              <span aria-hidden className="mt-0.5 shrink-0">
                <CheckIcon status={described.status} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">
                  {checkLabel(key)}
                  <span className="sr-only">
                    {" "}
                    — {STATUS_WORD[described.status]}
                  </span>
                </p>
                {described.text ? (
                  <p
                    className="text-xs text-muted"
                    lang={described.foreign ? "en" : undefined}
                  >
                    {described.text}
                  </p>
                ) : null}
              </div>
              {fix && described.status !== "ok" ? (
                <Link
                  to="/settings"
                  hash={fix.hash}
                  className="btn btn-xs shrink-0"
                >
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
