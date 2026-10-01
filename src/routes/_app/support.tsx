import { PageHeader, PageShell } from "@/client/components/PageShell";
import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { CopyButton } from "@/client/components/CopyButton";
import { SetupStatusPanel } from "@/client/features/support/SetupStatusPanel";
import { DiagnosticsBundleButton } from "@/client/features/support/DiagnosticsBundleButton";

const GITHUB_URL = "https://github.com/ucsahinn/seotracker";
const UPSTREAM_URL = "https://github.com/every-app/open-seo";

export const Route = createFileRoute("/_app/support")({
  component: SupportPage,
});

function SupportPage() {
  return (
    <PageShell width="reading">
      <PageHeader
        eyebrow={<p className="text-sm font-medium text-muted">Yardım</p>}
        title="Nereye bakmalı"
        description="Bu kurulum kendi bilgisayarınızda çalıştığı için sorunların izi hemen her zaman iki yerde olur: konteyner günlüğü ve sağlık ucu. Önce aşağıdaki duruma bakın."
      />

      <SetupStatusPanel />

      <ul className="enter space-y-3 text-sm text-muted">
        <li>
          <span className="font-medium text-base-content">
            Konteyner günlüğü
          </span>{" "}
          — <code className="text-xs">docker compose logs -f</code>{" "}
          <CopyButton
            iconOnly
            value="docker compose logs -f"
            label="Komutu kopyala"
            successMessage="Komut kopyalandı"
          />
          . Açılış kontrolleri uygulama başlamadan önce buraya yazılır.
        </li>
        <li>
          <span className="font-medium text-base-content">Sağlık ucu</span> —{" "}
          <a href="/api/health" className="link link-primary">
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
          Search Console ve Analytics kurulumunu anlatır.
        </li>
      </ul>

      <section className="space-y-2 rounded-box border border-base-300 bg-base-100 p-4">
        <h2 className="text-sm font-semibold">Sorun bildirmek için</h2>
        <p className="max-w-prose text-sm text-muted">
          Tek bir arşiv indirin: sürüm, kurulum kontrolleri, tablo büyüklükleri,
          bağlı Google mülkleri, son denetimlerin durumu ve bu sekmede yakalanan
          tarayıcı hataları. İçinde gizli değer yok; jetonlar ve anahtarlar
          toplanmaz, yalnızca ayarlı olup olmadıkları yazılır. Kısa bir not
          yeterliyse yukarıdaki "Özeti kopyala" düğmesi aynı özeti metin olarak
          verir. Arşivdeki <code className="text-xs">README.txt</code> ne
          olduğunu ve neyin sizi tanımladığını satır satır anlatır.
        </p>
        <div className="pt-1">
          <DiagnosticsBundleButton />
        </div>
      </section>

      <div className="space-y-2 border-t border-base-300 pt-6">
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="link link-primary inline-flex items-center gap-1.5 text-sm"
        >
          Bu çatal GitHub'da
          <ExternalLink className="size-3.5" />
        </a>
        <p className="text-xs text-muted">
          Şu depodan türetildi:{" "}
          <a
            href={UPSTREAM_URL}
            target="_blank"
            rel="noreferrer"
            className="link"
          >
            every-app/open-seo
          </a>
          , MIT lisanslı.
        </p>
      </div>
    </PageShell>
  );
}
