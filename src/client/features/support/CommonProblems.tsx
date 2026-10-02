import { Link } from "@tanstack/react-router";
import { ChevronRight, ExternalLink } from "lucide-react";
import type { ReactNode } from "react";
import { CopyButton } from "@/client/components/CopyButton";
import { useOrigin } from "@/client/features/settings/useOrigin";
import { DOCS, docsUrl } from "./links";

const linkClass = "link link-primary";

function Command({ value }: { value: string }) {
  return (
    // One unit, so the copy button never lands on a line of its own.
    <span className="inline-flex items-center gap-1 whitespace-nowrap align-middle">
      <code className="text-xs">{value}</code>
      <CopyButton
        iconOnly
        value={value}
        label="Komutu kopyala"
        successMessage="Komut kopyalandı"
      />
    </span>
  );
}

function DocLink({
  file,
  children,
}: {
  file: (typeof DOCS)[keyof typeof DOCS];
  children: ReactNode;
}) {
  return (
    <a
      href={docsUrl(file)}
      target="_blank"
      rel="noreferrer noopener"
      className={`${linkClass} inline-flex items-center gap-1`}
    >
      {children}
      <ExternalLink className="size-3" aria-hidden />
    </a>
  );
}

function Problem({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="group border-b border-base-300 last:border-b-0">
      <summary className="flex cursor-pointer list-none items-center gap-2 py-3 text-sm font-medium [&::-webkit-details-marker]:hidden">
        <ChevronRight
          className="size-4 shrink-0 text-muted transition-transform group-open:rotate-90"
          aria-hidden
        />
        {title}
      </summary>
      <div className="max-w-prose space-y-2 pb-4 pl-6 text-sm text-muted">
        {children}
      </div>
    </details>
  );
}

/**
 * The failures that actually happen on a self-hosted install, with the answer
 * that is already in `docs/` and the screen that fixes it. Short on purpose:
 * a long list is a manual, and the repository already has the manual.
 */
export function CommonProblems({ projectId }: { projectId: string | null }) {
  const origin = useOrigin();

  return (
    <section
      aria-labelledby="common-problems-title"
      className="rounded-box border border-base-300 bg-base-100 px-4"
    >
      <h2
        id="common-problems-title"
        className="pt-4 pb-1 text-sm font-semibold"
      >
        Sık sorunlar
      </h2>

      <Problem title="Sayfa açılmıyor ya da Docker kapalı">
        <p>
          Önce Docker Desktop&apos;ın çalıştığına bakın; Windows&apos;ta
          tepsideki simge &quot;running&quot; demeli. Sonra durumu görün:{" "}
          <Command value="docker compose ps" /> Durum <strong>healthy</strong>{" "}
          olana kadar bekleyin; ilk açılış birkaç dakika sürebilir.
        </p>
        <p>
          Hâlâ açılmıyorsa son günlük satırları nedeni yazar:{" "}
          <Command value="docker compose logs --tail 50" />
        </p>
        <p>
          <DocLink file={DOCS.docker}>Docker kurulum belgesi</DocLink>
        </p>
      </Problem>

      <Problem title="Port dolu (Bind for 127.0.0.1:3001 failed)">
        <p>
          3001 numaralı portu başka bir program kullanıyor. Proje klasöründe{" "}
          <code className="text-xs">PORT=3002</code> satırı olan bir{" "}
          <code className="text-xs">.env</code> dosyası oluşturup konteyneri
          yeniden oluşturun:{" "}
          <Command value="docker compose up -d --force-recreate seotracker" />
        </p>
        <p>
          Port değişince Google&apos;a verdiğiniz yönlendirme adresleri de
          değişir; yenilerini{" "}
          <Link to="/settings" hash="google" className={linkClass}>
            Ayarlar&apos;daki Google bölümünden
          </Link>{" "}
          kopyalayıp Google Cloud Console&apos;da güncelleyin.
        </p>
      </Problem>

      <Problem title="Ajanım MCP'ye bağlanamıyor (401)">
        <p>
          MCP ucu varsayılan olarak bir jeton ister. Jeton ilk açılışta üretilir
          ve veri biriminde durur; okumak için (PowerShell ve cmd):{" "}
          <Command value="docker compose exec -T seotracker cat /app/.wrangler/mcp-token" />
        </p>
        <p>
          Git Bash (Windows):{" "}
          <Command value="MSYS_NO_PATHCONV=1 docker compose exec -T seotracker cat /app/.wrangler/mcp-token" />{" "}
          Önek olmadan Git Bash yolu bozar ve jeton boş çıkar;
          PowerShell&apos;de önek hata verir.
        </p>
        <p>
          Adres: <Command value={`${origin}/mcp`} /> İstemciniz{" "}
          <code className="text-xs">Authorization: Bearer &lt;jeton&gt;</code>{" "}
          başlığını göndermezse bağlantı 401 döner.
        </p>
        <p>
          <Link to="/ai" className={linkClass}>
            Ajan kurulumu sayfası
          </Link>{" "}
          istemciniz için hazır komutu verir.{" "}
          <DocLink file={DOCS.docker}>Ayrıntılar</DocLink>
        </p>
      </Problem>

      <Problem title="PageSpeed 429 mu, günlük kota mı?">
        <p>
          <strong>429 / &quot;çok fazla istek&quot;</strong> genellikle anahtar
          girilmediğini gösterir: Google&apos;ın anahtarsız kotası birkaç
          sayfada dolar. Ücretsiz bir anahtar girin:{" "}
          <Link to="/settings" hash="hiz-olcumu" className={linkClass}>
            Ayarlar, Hız ölçümü
          </Link>
          .
        </p>
        <p>
          Anahtar varken de olabilir: dakikalık sınır aşılırsa denetim bekleyip
          yeniden dener. <strong>Günlük sınır</strong> dolarsa ölçülenler
          korunur ve ölçüm durur; ertesi gün yeniden denetleyin. Kendi kotanızı
          Google Cloud Console&apos;da APIs &amp; Services, PageSpeed Insights
          API, Quotas altında görebilirsiniz.
        </p>
        <p>
          <DocLink file={DOCS.pageSpeed}>PageSpeed anahtarı belgesi</DocLink>
        </p>
      </Problem>

      <Problem title="Sorgu verisi yok, grafikler boş">
        <p>
          Önce projede Search Console&apos;un bağlı olduğunu ve bir mülk
          seçildiğini doğrulayın. Hizmet hesabı kullanıyorsanız hesabın
          e-postasını Search Console&apos;da mülke kullanıcı olarak eklemiş
          olmanız gerekir; eklemeden veri gelmez.
        </p>
        <p>
          Mülk yeni doğrulandıysa Google&apos;ın veri döndürmesi birkaç gün
          sürebilir.{" "}
          {projectId ? (
            <Link
              to="/p/$projectId/settings/integrations"
              params={{ projectId }}
              className={linkClass}
            >
              Projenin bağlantılarını aç
            </Link>
          ) : (
            <Link to="/projects" className={linkClass}>
              Projelere git
            </Link>
          )}{" "}
          · <DocLink file={DOCS.searchConsole}>Search Console belgesi</DocLink>
        </p>
      </Problem>
    </section>
  );
}
