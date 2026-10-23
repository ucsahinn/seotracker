import { PageHeader, PageShell } from "@/client/components/PageShell";
import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { CopyButton } from "@/client/components/CopyButton";
import { SystemLimitsSection } from "@/client/features/quotas/SystemLimitsSection";
import { CommonProblems } from "@/client/features/support/CommonProblems";
import { QuickActions } from "@/client/features/support/QuickActions";
import { SetupStatusPanel } from "@/client/features/support/SetupStatusPanel";
import { REPO_URL, SITE_URL } from "@/client/features/support/links";
import { useSetupSnapshot } from "@/client/features/support/useSetupSnapshot";

export const Route = createFileRoute("/_app/support")({
  component: SupportPage,
});

function SupportPage() {
  const { diagnostics, installKind } = useSetupSnapshot();
  const windows = installKind === "windows";
  const pending = installKind === null;
  const projectId =
    diagnostics.data?.projects.find((project) => !project.archivedAt)?.id ??
    null;

  return (
    <PageShell width="reading">
      <PageHeader
        title="Yardım"
        description="Bir şey ters giderse önce aşağıdaki duruma bakın. Çözüm çoğu zaman satırın yanındaki düğmededir."
      />

      <QuickActions />

      <SetupStatusPanel />

      <CommonProblems projectId={projectId} installKind={installKind} />

      <SystemLimitsSection />

      <ul className="space-y-3 text-sm text-muted">
        <li>
          <span className="font-medium text-base-content">
            {pending || windows ? "Günlükler" : "Konteyner günlüğü"}
          </span>{" "}
          {pending ? (
            <>
              Kurulum türü anlaşılıyor. Günlüklerin yeri birazdan burada
              görünür.
            </>
          ) : windows ? (
            <>
              Görev çubuğundaki seowatcher simgesine sağ tıklayıp{" "}
              <strong>Günlükleri aç</strong> deyin. Açılış kontrolleri{" "}
              <code className="text-xs">launcher.log</code>, sunucu satırları{" "}
              <code className="text-xs">server.log</code> dosyasındadır.
            </>
          ) : (
            <>
              Açılış kontrolleri uygulama başlamadan önce yazılır. Komut:{" "}
              <span className="inline-flex items-center gap-1 whitespace-nowrap align-middle">
                <code className="text-xs">docker compose logs -f</code>
                <CopyButton
                  iconOnly
                  value="docker compose logs -f"
                  label="Komutu kopyala"
                  successMessage="Komut kopyalandı"
                />
              </span>
            </>
          )}
        </li>
        <li>
          <span className="font-medium text-base-content">Sağlık adresi:</span>{" "}
          <a
            href="/api/health"
            target="_blank"
            rel="noreferrer"
            className="link link-primary"
          >
            /api/health
          </a>{" "}
          hangi bağlantıların ayarlı olduğunu ve veritabanının yanıt verip
          vermediğini gösterir.
        </li>
        <li>
          <span className="font-medium text-base-content">
            Kurulum belgeleri
          </span>{" "}
          Windows paketi, Docker, Search Console, Analytics ve PageSpeed
          kurulumu kılavuzda anlatılıyor. Üstteki &quot;Kılavuzu aç&quot;
          düğmesi sizi oraya götürür.
        </li>
      </ul>

      <section
        id="tanilama"
        className="space-y-2 rounded-box border border-base-300 bg-base-100 p-4"
      >
        <h2 className="text-sm font-semibold">Sorun bildirmek için</h2>
        <p className="max-w-prose text-sm text-muted">
          Üstteki &quot;Tanılama paketi indir&quot; düğmesi tek bir arşiv
          indirir. İçinde sürüm, kurulum kontrolleri, tablo büyüklükleri, bağlı
          Google mülkleri, son denetimlerin durumu ve bu sekmede yakalanan
          tarayıcı hataları var. Gizli değer yok. Parolalar ve anahtarlar
          toplanmaz, yalnızca ayarlı olup olmadıkları yazılır. Kısa bir not
          yeterliyse durum panelindeki &quot;Özeti kopyala&quot; düğmesi aynı
          özeti metin olarak verir. Arşivdeki{" "}
          <code className="text-xs">README.txt</code> içindekileri ve sizi
          tanımlayan şeyleri satır satır anlatır.
        </p>
      </section>

      <div className="border-t border-base-300 pt-6">
        <a
          href={REPO_URL}
          target="_blank"
          rel="noreferrer"
          className="link link-primary inline-flex items-center gap-1.5 text-sm"
        >
          Proje GitHub&apos;da
          <ExternalLink className="size-3.5" />
        </a>
        <a
          href={SITE_URL}
          target="_blank"
          rel="noreferrer"
          className="link link-primary ml-5 inline-flex items-center gap-1.5 text-sm"
        >
          seowatcher.io
          <ExternalLink className="size-3.5" />
        </a>
      </div>
    </PageShell>
  );
}
