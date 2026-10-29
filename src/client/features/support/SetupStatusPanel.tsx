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
import { formatCount, formatDateTime } from "@/client/lib/format";
import type { getDiagnostics } from "@/serverFunctions/diagnostics";
import { t } from "@/shared/i18n";
import { fillParts } from "@/client/features/settings/fillParts";
import { describeCheck, type CheckStatus } from "./checkCopy";
import { portFallbackMessage } from "./portFallbackCopy";
import { buildDiagnosticsSummary } from "./DiagnosticsBundleButton";
import { useSetupSnapshot } from "./useSetupSnapshot";

type Diagnostics = Awaited<ReturnType<typeof getDiagnostics>>;
type Update = ReturnType<typeof useSetupSnapshot>["update"];

/**
 * Plain names for the checks the server reports, and where each is fixed.
 * Labels stay Turkish here and go through t() where they render.
 */
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
  const label = CHECK_INFO[key]?.label;
  return label ? t(label) : key;
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
        className="space-y-2 rounded-box border border-[var(--hairline)] bg-base-100 p-4"
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
      <div className="rounded-box border border-[var(--hairline)] bg-base-100">
        <QueryErrorState
          compact
          error={diagnostics.error}
          onRetry={() => void diagnostics.refetch()}
          title={t("Kurulum durumu okunamadı")}
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
      <>
        {t("Sürümünüz v{version}.", { version })}{" "}
        <Link
          to="/settings"
          hash="guncelleme"
          className="link link-primary inline-flex items-center gap-1"
        >
          <ArrowUpCircle className="size-3.5" aria-hidden />
          {t("Yeni sürüm {version} çıktı", {
            version: update.latestVersion ?? "",
          })}
        </Link>
      </>
    );
  }
  if (update?.enabled && update.outcome === "error") {
    return (
      <>
        {update.latestVersion
          ? t(
              "Sürümünüz v{version}. Güncelleme kontrolü başarısız oldu; son bilinen sürüm {latest}.",
              { version, latest: update.latestVersion },
            )
          : t(
              "Sürümünüz v{version}. Güncelleme kontrolü başarısız oldu; yeni sürüm olup olmadığı doğrulanamadı. Ayarlar'daki güncelleme bölümünden yeniden deneyin.",
              { version },
            )}
      </>
    );
  }
  if (update?.enabled && update.outcome === "ok") {
    return <>{t("Sürümünüz v{version}, güncel.", { version })}</>;
  }
  if (update && !update.enabled) {
    return (
      <>{t("Sürümünüz v{version}. Güncelleme kontrolü kapalı.", { version })}</>
    );
  }
  return <>{t("Sürümünüz v{version}.", { version })}</>;
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
    described: describeCheck(
      key,
      check,
      googleReady,
      data.setup.installKind,
      data.setup.authMode,
    ),
  }));
  const problems = checks.filter(
    (check) => check.described.status !== "ok",
  ).length;
  const worst: CheckStatus = checks.some((c) => c.described.status === "error")
    ? "error"
    : problems > 0 || checks.length === 0
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
      className="enter space-y-4 rounded-box border border-[var(--hairline)] bg-base-100 p-4"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span aria-hidden className="mt-0.5">
            <CheckIcon status={worst} />
          </span>
          <div>
            <h2 id="setup-status-title" className="text-sm font-medium">
              {t("Uygulamanın durumu")}
            </h2>
            {/* Install health, not a project's setup: that checklist is on
                the dashboard and Proje bilgisi, and the two must not be
                read as one verdict. */}
            <p className="mt-0.5 text-sm" aria-live="polite">
              {checks.length === 0
                ? t(
                    "Kurulum kontrolü sonucu alınamadı. Durumu yeniden kontrol edin.",
                  )
                : problems === 0
                  ? t("Kurulum kontrollerinde sorun bulunmadı.")
                  : t("{count} kurulum kontrolü dikkat istiyor.", {
                      count: formatCount(problems),
                    })}
            </p>
            <p className="mt-1 text-sm">
              <VersionLine version={data.version} update={update} />
            </p>
            <dl className="mt-1 flex flex-wrap gap-x-1.5 text-xs">
              <dt className="text-subtle">{t("Son kontrol")}</dt>
              <dd className="text-muted">{formatDateTime(data.generatedAt)}</dd>
            </dl>
            {data.setup.port.fallback ? (
              <p className="mt-2 flex max-w-prose items-start gap-1.5 text-sm">
                <AlertTriangle
                  aria-hidden
                  className="mt-0.5 size-4 shrink-0 text-[var(--ink-warning)]"
                />
                <span>{portFallbackMessage(data.setup.port.fallback)}</span>
              </p>
            ) : null}
            <details className="text-xs text-muted">
              <summary className="cursor-pointer py-1">
                {t("Ayrıntılar")}
              </summary>
              <p className="max-w-prose text-sm text-muted">
                {t(
                  "Bu kurulumun kendisi. Bir projenin kurulum listesi Panel'de ve Proje bilgisi'nde.",
                )}
              </p>
            </details>
          </div>
        </div>
        <CopyButton
          value={buildDiagnosticsSummary(data, readClientLog().length)}
          label={t("Özeti kopyala")}
          successMessage={t("Özet kopyalandı. İçinde gizli değer yok.")}
        />
      </div>

      <ul className="divide-y divide-[var(--hairline)]">
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
                    — {t(STATUS_WORD[described.status])}
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
                  {t(fix.label)}
                </Link>
              ) : null}
            </li>
          );
        })}
      </ul>

      <div className="space-y-2 border-t border-[var(--hairline)] pt-3">
        <h3 className="text-xs font-medium text-muted">{t("Projeler")}</h3>
        {projects.length === 0 ? (
          <p className="text-sm text-muted">
            {fillParts(t("Henüz proje yok. {link}."), {
              link: (
                <Link to="/projects" className="link link-primary">
                  {t("Proje ekleyin")}
                </Link>
              ),
            })}
          </p>
        ) : (
          <ul className="space-y-1.5">
            {projects.map((project) => {
              const state = connected(project.id);
              return (
                <li
                  key={project.id}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  {/* No wrap on the row itself: a wrapping row dropped the
                      link under the name on a phone, at a different place
                      for each project. The text wraps; the link stays right. */}
                  <span className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-3 gap-y-0.5">
                    <span className="font-medium">{project.name}</span>
                    <span className="text-xs text-muted">
                      {t("Search Console {gsc} · Analytics {ga4}", {
                        gsc: state.gsc ? t("seçili") : t("seçili değil"),
                        ga4: state.ga4 ? t("seçili") : t("seçili değil"),
                      })}
                    </span>
                  </span>
                  <Link
                    to="/p/$projectId/settings/integrations"
                    params={{ projectId: project.id }}
                    className="btn btn-ghost btn-xs max-sm:min-h-11 shrink-0"
                  >
                    {t("Bağlantıları aç")}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
        <details className="text-xs text-muted">
          <summary className="cursor-pointer py-1">{t("Ayrıntılar")}</summary>
          <p className="max-w-prose text-sm text-muted">
            {t(
              "Burada kayıtlı mülk seçimleri gösterilir; Google erişimi bu kontrolde sınanmaz. Güncel bir okuma denemek için Bağlantıları açın, seçili mülkün raporuna gidin ve Yenile düğmesine basın.",
            )}
          </p>
        </details>
      </div>
    </section>
  );
}
