import { PageHeader, PageShell } from "@/client/components/PageShell";
import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { CopyButton } from "@/client/components/CopyButton";
import { SystemLimitsSection } from "@/client/features/quotas/SystemLimitsSection";
import { CommonProblems } from "@/client/features/support/CommonProblems";
import { QuickActions } from "@/client/features/support/QuickActions";
import { SetupStatusPanel } from "@/client/features/support/SetupStatusPanel";
import { REPO_URL } from "@/client/features/support/links";
import { useSetupSnapshot } from "@/client/features/support/useSetupSnapshot";

export const Route = createFileRoute("/_app/support")({
  component: SupportPage,
});

function SupportPage() {
  const { diagnostics } = useSetupSnapshot();
  const projectId =
    diagnostics.data?.projects.find((project) => !project.archivedAt)?.id ??
    null;

  return (
    <PageShell width="reading">
      <PageHeader
        eyebrow={<p className="text-sm font-medium text-muted">Yardım</p>}
        title="Nereye bakmalı"
        description="Bu kurulum kendi bilgisayarınızda çalıştığı için sorunların izi hemen her zaman iki yerde olur: konteyner günlüğü ve sağlık ucu. Önce aşağıdaki duruma bakın."
      />

      <QuickActions />

      <SetupStatusPanel />

      <CommonProblems projectId={projectId} />

      <SystemLimitsSection />

      <ul className="space-y-3 text-sm text-muted">
        <li>
          <span className="font-medium text-base-content">
            Konteyner günlüğü
          </span>{" "}
          — Açılış kontrolleri uygulama başlamadan önce buraya yazılır. Komut:{" "}
          {/* One unit, so the copy button never lands on a line of its own. */}
          <span className="inline-flex items-center gap-1 whitespace-nowrap align-middle">
            <code className="text-xs">docker compose logs -f</code>
            <CopyButton
              iconOnly
              value="docker compose logs -f"
              label="Komutu kopyala"
              successMessage="Komut kopyalandı"
            />
          </span>
        </li>
        <li>
          <span className="font-medium text-base-content">Sağlık ucu</span> —{" "}
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
          — depodaki <code className="text-xs">docs/</code> dizini Docker,
          Search Console, Analytics ve PageSpeed kurulumunu anlatır; üstteki
          &quot;Belgeleri aç&quot; düğmesi oraya götürür.
        </li>
      </ul>

      <section
        id="tanilama"
        className="space-y-2 rounded-box border border-base-300 bg-base-100 p-4"
      >
        <h2 className="text-sm font-semibold">Sorun bildirmek için</h2>
        <p className="max-w-prose text-sm text-muted">
          Üstteki &quot;Tanılama paketi indir&quot; düğmesi tek bir arşiv verir:
          sürüm, kurulum kontrolleri, tablo büyüklükleri, bağlı Google mülkleri,
          son denetimlerin durumu ve bu sekmede yakalanan tarayıcı hataları.
          İçinde gizli değer yok; jetonlar ve anahtarlar toplanmaz, yalnızca
          ayarlı olup olmadıkları yazılır. Kısa bir not yeterliyse durum
          panelindeki &quot;Özeti kopyala&quot; düğmesi aynı özeti metin olarak
          verir. Arşivdeki <code className="text-xs">README.txt</code> ne
          olduğunu ve neyin sizi tanımladığını satır satır anlatır.
        </p>
      </section>

      <div className="border-t border-base-300 pt-6">
        <a
          href={REPO_URL}
          target="_blank"
          rel="noreferrer"
          className="link link-primary inline-flex items-center gap-1.5 text-sm"
        >
          Bu çatal GitHub&apos;da
          <ExternalLink className="size-3.5" />
        </a>
      </div>
    </PageShell>
  );
}
