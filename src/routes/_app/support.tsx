import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";

const GITHUB_URL = "https://github.com/ucsahinn/seotracker";
const UPSTREAM_URL = "https://github.com/every-app/open-seo";

export const Route = createFileRoute("/_app/support")({
  component: SupportPage,
});

function SupportPage() {
  return (
    <div className="h-full overflow-auto bg-base-100 px-4 py-8 pb-24 md:px-6 md:py-12 md:pb-8">
      <div className="mx-auto max-w-xl space-y-6">
        <div>
          <p className="text-sm font-medium text-muted">Yardım</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">
            Nereye bakmalı
          </h1>
        </div>

        <p className="text-sm leading-relaxed text-base-content/70">
          Bu kurulum kendi bilgisayarınızda çalışıyor, bu yüzden hemen her sorun
          iki yerde görünür: konteyner günlüğü ve sağlık ucu.
        </p>

        <ul className="space-y-3 text-sm text-base-content/70">
          <li>
            <span className="font-medium text-base-content">
              Konteyner günlüğü
            </span>{" "}
            — <code className="text-xs">docker compose logs -f</code>. Açılış
            denetimleri uygulama çalışmaya başlamadan önce buraya yazılır.
          </li>
          <li>
            <span className="font-medium text-base-content">Sağlık ucu</span> —{" "}
            <a href="/api/health" className="link link-primary">
              /api/health
            </a>{" "}
            hangi entegrasyonların yapılandırıldığını ve veritabanının yanıt
            verip vermediğini söyler.
          </li>
          <li>
            <span className="font-medium text-base-content">
              Kurulum belgeleri
            </span>{" "}
            — depodaki <code className="text-xs">docs/</code> dizini Docker,
            Search Console ve Analytics kurulumunu anlatır.
          </li>
        </ul>

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
      </div>
    </div>
  );
}
