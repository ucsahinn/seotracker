import { PageHeader, PageShell } from "@/client/components/PageShell";
import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { CopyButton } from "@/client/components/CopyButton";
import { SystemLimitsSection } from "@/client/features/quotas/SystemLimitsSection";
import { CommonProblems } from "@/client/features/support/CommonProblems";
import { QuickActions } from "@/client/features/support/QuickActions";
import { SetupStatusPanel } from "@/client/features/support/SetupStatusPanel";
import { REPO_URL, siteUrl } from "@/client/features/support/links";
import { fillParts } from "@/client/features/settings/fillParts";
import { useSetupSnapshot } from "@/client/features/support/useSetupSnapshot";
import { t } from "@/shared/i18n";

export const Route = createFileRoute("/_app/support")({
  component: SupportPage,
});

function SupportPage() {
  const { diagnostics, installKind } = useSetupSnapshot();
  const windows = installKind === "windows";
  const pending = installKind === null && diagnostics.isPending;
  const projectId =
    diagnostics.data?.projects.find((project) => !project.archivedAt)?.id ??
    null;

  return (
    <PageShell width="reading">
      <PageHeader
        title={t("Yardım")}
        description={t(
          "Bir şey ters giderse önce aşağıdaki duruma bakın. Çözüm çoğu zaman satırın yanındaki düğmededir.",
        )}
      />

      <QuickActions />

      <SetupStatusPanel />

      <CommonProblems projectId={projectId} installKind={installKind} />

      <SystemLimitsSection />

      <details className="text-sm text-muted">
        <summary className="cursor-pointer py-3 font-medium">
          {t("Kurulum belgeleri")}
        </summary>
        <ul className="space-y-4 max-w-prose leading-relaxed">
          <li>
            <span className="font-medium text-base-content">
              {pending || windows ? t("Günlükler") : t("Konteyner günlüğü")}
            </span>{" "}
            {pending ? (
              t(
                "Kurulum türü anlaşılıyor. Günlüklerin yeri birazdan burada görünür.",
              )
            ) : installKind === null ? (
              t(
                "Kurulum türü okunamadı. Durumu yeniden kontrol edin; günlük konumu kurulum türü belirlendiğinde gösterilir.",
              )
            ) : windows ? (
              fillParts(
                t(
                  "Görev çubuğundaki seowatcher simgesine sağ tıklayıp {menu} deyin. Açılış kontrolleri {launcherLog}, sunucu satırları {serverLog} dosyasındadır.",
                ),
                {
                  menu: <strong>{t("Günlükleri aç")}</strong>,
                  launcherLog: <code className="text-xs">launcher.log</code>,
                  serverLog: <code className="text-xs">server.log</code>,
                },
              )
            ) : (
              <>
                {t(
                  "Açılış kontrolleri uygulama başlamadan önce yazılır. Komut:",
                )}{" "}
                <span className="inline-flex items-center gap-1 whitespace-nowrap align-middle">
                  <code className="text-xs">docker compose logs -f</code>
                  <CopyButton
                    iconOnly
                    value="docker compose logs -f"
                    label={t("Komutu kopyala")}
                    successMessage={t("Komut kopyalandı")}
                  />
                </span>
              </>
            )}
          </li>
          <li>
            <span className="font-medium text-base-content">
              {t("Sağlık adresi:")}
            </span>{" "}
            {fillParts(
              t(
                "{link} hangi bağlantıların ayarlı olduğunu ve veritabanının yanıt verip vermediğini gösterir.",
              ),
              {
                link: (
                  <a
                    href="/api/health"
                    target="_blank"
                    rel="noreferrer"
                    className="link link-primary"
                  >
                    /api/health
                  </a>
                ),
              },
            )}
          </li>
          <li>
            <span className="font-medium text-base-content">
              {t("Kurulum belgeleri")}
            </span>{" "}
            {t(
              "Windows paketi, Docker, Search Console, Analytics ve PageSpeed kurulumu kılavuzda anlatılıyor. Üstteki “{button}” düğmesi sizi oraya götürür.",
              { button: t("Kılavuzu aç") },
            )}
          </li>
        </ul>
      </details>

      <section
        id="tanilama"
        className="space-y-2 rounded-box border border-base-300 bg-base-100 p-4"
      >
        <h2 className="text-sm font-semibold">{t("Sorun bildirmek için")}</h2>
        <details className="text-sm text-muted">
          <summary className="cursor-pointer py-2">{t("Ayrıntılar")}</summary>
          <p className="max-w-prose text-sm text-muted">
            {fillParts(
              t(
                "Üstteki “{download}” düğmesi tek bir arşiv indirir. İçinde sürüm, kurulum kontrolleri, tablo büyüklükleri, bağlı Google mülkleri, son denetimlerin durumu ve bu sekmede yakalanan tarayıcı hataları var. Gizli değer yok. Parolalar ve anahtarlar toplanmaz, yalnızca ayarlı olup olmadıkları yazılır. Kısa bir not yeterliyse durum panelindeki “{summary}” düğmesi aynı özeti metin olarak verir. Arşivdeki {readme} içindekileri ve sizi tanımlayan şeyleri satır satır anlatır.",
              ),
              {
                download: t("Tanılama paketi indir"),
                summary: t("Özeti kopyala"),
                readme: <code className="text-xs">README.txt</code>,
              },
            )}
          </p>
        </details>
      </section>

      <div className="border-t border-base-300 pt-6">
        <a
          href={REPO_URL}
          target="_blank"
          rel="noreferrer"
          className="btn btn-ghost btn-sm min-h-11 gap-1.5"
        >
          {t("Proje GitHub'da")}
          <ExternalLink className="size-3.5" />
        </a>
        <a
          href={siteUrl()}
          target="_blank"
          rel="noreferrer"
          className="btn btn-ghost btn-sm min-h-11 gap-1.5"
        >
          seowatcher.io
          <ExternalLink className="size-3.5" />
        </a>
      </div>
    </PageShell>
  );
}
