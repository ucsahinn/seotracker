import { Link } from "@tanstack/react-router";
import { ChevronRight, ExternalLink } from "lucide-react";
import type { ReactNode } from "react";
import { CopyButton } from "@/client/components/CopyButton";
import { fillParts } from "@/client/features/settings/fillParts";
import { useOrigin } from "@/client/features/settings/useOrigin";
import { t } from "@/shared/i18n";
import { DOCS, docsUrl } from "./links";

const linkClass = "link link-primary";

/*
 * The Windows tray menu is Turkish only, so its items are named as the menu
 * shows them in every language; the English sentences around them add the
 * meaning in parentheses.
 */
const TRAY = {
  restart: "Yeniden başlat", // i18n-ignore: tray menu item
  repair: "Kurulumu onar",
  logs: "Günlükleri aç", // i18n-ignore: tray menu item
  report: "Sorunu bildir (GitHub)",
  dataFolder: "Veri klasörünü aç", // i18n-ignore: tray menu item
  running: '"Çalışıyor: http://127.0.0.1:3001/"', // i18n-ignore: tray tooltip
  error: '"Hata"',
} as const;

function TrayItem({ name }: { name: keyof typeof TRAY }) {
  return <strong lang="tr">{TRAY[name]}</strong>;
}

function Command({ value }: { value: string }) {
  return (
    // One unit, so the copy button never lands on a line of its own.
    <span className="inline-flex items-center gap-1 whitespace-nowrap align-middle">
      <code className="text-xs">{value}</code>
      <CopyButton
        iconOnly
        value={value}
        label={t("Komutu kopyala")}
        successMessage={t("Komut kopyalandı")}
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

const code = (value: string) => <code className="text-xs">{value}</code>;

/**
 * The failures that actually happen on a self-hosted install, with the answer
 * that is already in `docs/` and the screen that fixes it. Short on purpose:
 * a long list is a manual, and the repository already has the manual.
 */
export function CommonProblems({
  projectId,
  installKind = null,
}: {
  projectId: string | null;
  /** null while the install kind is still unknown: no install-specific advice yet. */
  installKind?: "windows" | "docker" | null;
}) {
  const origin = useOrigin();
  const windows = installKind === "windows";
  const pending = installKind === null;
  const pendingNote = (
    <p className="text-muted">{t("Kurulum türü belirleniyor…")}</p>
  );

  return (
    <section
      aria-labelledby="common-problems-title"
      className="rounded-box border border-base-300 bg-base-100 px-4"
    >
      <h2
        id="common-problems-title"
        className="pt-4 pb-1 text-sm font-semibold"
      >
        {t("Sık sorunlar")}
      </h2>

      {pending ? (
        pendingNote
      ) : windows ? (
        <Problem title={t("Sayfa açılmıyor ya da uygulama kapalı")}>
          <p>
            {fillParts(
              t(
                "Görev çubuğundaki seowatcher simgesine bakın; üzerine gelince {running} yazmalı. Simge yoksa Başlat menüsünden seowatcher'ı açın. Simgede {error} yazıyorsa sağ tıklayıp {restart}, olmazsa {repair} deyin.",
              ),
              {
                running: TRAY.running,
                error: TRAY.error,
                restart: <TrayItem name="restart" />,
                repair: <TrayItem name="repair" />,
              },
            )}
          </p>
          <p>
            {fillParts(
              t(
                "Hâlâ açılmıyorsa {logs} ile {launcher} ve {server} dosyalarının son satırlarına bakın; {report} bunları hazır bir kayda koyar.",
              ),
              {
                logs: <TrayItem name="logs" />,
                launcher: code("launcher.log"),
                server: code("server.log"),
                report: <TrayItem name="report" />,
              },
            )}
          </p>
          <p>
            <DocLink file={DOCS.windows}>
              {t("Windows kurulum kılavuzu")}
            </DocLink>
          </p>
        </Problem>
      ) : (
        <Problem title={t("Sayfa açılmıyor ya da Docker kapalı")}>
          <p>
            {fillParts(
              t(
                "Önce Docker Desktop'ın çalıştığına bakın; Windows'ta tepsideki simge \"running\" demeli. Sonra durumu görün: {command} Durum {healthy} olana kadar bekleyin; ilk açılış birkaç dakika sürebilir.",
              ),
              {
                command: <Command value="docker compose ps" />,
                healthy: <strong>healthy</strong>,
              },
            )}
          </p>
          <p>
            {fillParts(
              t(
                "Hâlâ açılmıyorsa son günlük satırları nedeni yazar: {command}",
              ),
              { command: <Command value="docker compose logs --tail 50" /> },
            )}
          </p>
          <p>
            <DocLink file={DOCS.docker}>{t("Docker kurulum belgesi")}</DocLink>
          </p>
        </Problem>
      )}

      <Problem
        title={
          windows
            ? t("Adres numarası (port) dolu")
            : t("Adres numarası (port) dolu (Bind for 127.0.0.1:3001 failed)")
        }
      >
        {pending ? (
          pendingNote
        ) : windows ? (
          <p>
            {fillParts(
              t(
                "Windows paketi 3001 doluysa o açılış için 3002 ile 3010 arasında boş bir numara kullanır; bunu bir bildirimle ve simgenin yazısında söyler. Numarayı kalıcı yapmak istiyorsanız {dataFolder} deyip {config} içindeki {port} değerini değiştirin, sonra {restart} deyin.",
              ),
              {
                dataFolder: <TrayItem name="dataFolder" />,
                config: code("config.json"),
                port: code('"port"'),
                restart: <TrayItem name="restart" />,
              },
            )}
          </p>
        ) : (
          <p>
            {fillParts(
              t(
                "3001 numaralı adresi (port) başka bir program kullanıyor. Proje klasöründe {line} satırı olan bir {env} dosyası oluşturup konteyneri yeniden oluşturun: {command}",
              ),
              {
                line: code("PORT=3002"),
                env: code(".env"),
                command: (
                  <Command value="docker compose up -d --force-recreate seotracker" />
                ),
              },
            )}
          </p>
        )}
        <p>
          {fillParts(
            t(
              "Adres numarası (port) değişince Google'a verdiğiniz yönlendirme adresleri de değişir. Yenilerini {link} kopyalayıp Google Cloud Console'da güncelleyin.",
            ),
            {
              link: (
                <Link to="/settings" hash="google" className={linkClass}>
                  {t("Ayarlar'daki Google bölümünden")}
                </Link>
              ),
            },
          )}
        </p>
      </Problem>

      <Problem title={t("Ajanım bağlanamıyor (401)")}>
        {pending ? (
          pendingNote
        ) : windows ? (
          <p>
            {fillParts(
              t(
                "Ajan bağlantısı bir parola (token) ister. Windows paketinde bu parola {path} dosyasındadır ({dataFolder}). Panoya kopyalamak için PowerShell (değer ekrana yazılmaz): {command} Değeri sohbete yazmayın; yapıştırdıktan sonra panoyu temizleyin (Win+V, Tümünü temizle).",
              ),
              {
                path: code("%LOCALAPPDATA%\\seowatcher\\mcp-token"),
                dataFolder: <TrayItem name="dataFolder" />,
                command: (
                  <Command
                    value={
                      '(Get-Content "$env:LOCALAPPDATA\\seowatcher\\mcp-token").Trim() | Set-Clipboard'
                    }
                  />
                ),
              },
            )}
          </p>
        ) : (
          <>
            <p>
              {fillParts(
                t(
                  "Ajan bağlantısı varsayılan olarak bir parola ister. Parola ilk açılışta üretilir ve veri biriminde durur; okumak için (PowerShell ve cmd): {command}",
                ),
                {
                  command: (
                    <Command value="docker compose exec -T seotracker cat /app/.wrangler/mcp-token" />
                  ),
                },
              )}
            </p>
            <p>
              {fillParts(
                t(
                  "Git Bash (Windows): {command} Önek olmadan Git Bash yolu bozar ve parola boş çıkar; PowerShell'de önek hata verir.",
                ),
                {
                  command: (
                    <Command value="MSYS_NO_PATHCONV=1 docker compose exec -T seotracker cat /app/.wrangler/mcp-token" />
                  ),
                },
              )}
            </p>
          </>
        )}
        <p>
          {fillParts(
            t(
              "Adres: {command} Aracınız {header} başlığını göndermezse bağlantı 401 döner.",
            ),
            {
              command: <Command value={`${origin}/mcp`} />,
              header: code("Authorization: Bearer <token>"),
            },
          )}
        </p>
        <p>
          {fillParts(t("{link} aracınız için hazır komutu verir. {details}"), {
            link: (
              <Link to="/ai" className={linkClass}>
                {t("Ajan kurulumu sayfası")}
              </Link>
            ),
            details: (
              <DocLink file={windows ? DOCS.troubleshooting : DOCS.docker}>
                {t("Ayrıntılar")}
              </DocLink>
            ),
          })}
        </p>
      </Problem>

      <Problem title={t("Hız ölçümü yarım kalıyor (429)")}>
        <p>
          {fillParts(
            t(
              "{code} genellikle anahtar girilmediğini gösterir: Google'ın anahtarsız kotası birkaç sayfada dolar. Ücretsiz bir anahtar girin: {link}.",
            ),
            {
              code: <strong>{t('429 / "çok fazla istek"')}</strong>,
              link: (
                <Link to="/settings" hash="hiz-olcumu" className={linkClass}>
                  {t("Ayarlar, Hız ölçümü")}
                </Link>
              ),
            },
          )}
        </p>
        <p>
          {fillParts(
            t(
              "Anahtar varken de olabilir: dakikalık sınır aşılırsa denetim bekleyip yeniden dener. {daily} dolarsa ölçülenler korunur ve ölçüm durur; ertesi gün yeniden denetleyin. Kendi kotanızı Google Cloud Console'da APIs & Services, PageSpeed Insights API, Quotas altında görebilirsiniz.",
            ),
            { daily: <strong>{t("Günlük sınır")}</strong> },
          )}
        </p>
        <p>
          <DocLink file={DOCS.pageSpeed}>
            {t("PageSpeed anahtarı belgesi")}
          </DocLink>
        </p>
      </Problem>

      <Problem title={t("Sorgu verisi yok, grafikler boş")}>
        <p>
          {t(
            "Önce projede Search Console'un bağlı olduğunu ve bir mülk seçildiğini doğrulayın. Hizmet hesabı kullanıyorsanız hesabın e-postasını Search Console'da mülke kullanıcı olarak eklemiş olmanız gerekir; eklemeden veri gelmez.",
          )}
        </p>
        <p>
          {t(
            "Mülk yeni doğrulandıysa Google'ın veri vermesi birkaç gün sürebilir.",
          )}{" "}
          {projectId ? (
            <Link
              to="/p/$projectId/settings/integrations"
              params={{ projectId }}
              className={linkClass}
            >
              {t("Projenin bağlantılarını aç")}
            </Link>
          ) : (
            <Link to="/projects" className={linkClass}>
              {t("Projelere git")}
            </Link>
          )}{" "}
          ·{" "}
          <DocLink file={DOCS.searchConsole}>
            {t("Search Console belgesi")}
          </DocLink>
        </p>
      </Problem>
    </section>
  );
}
