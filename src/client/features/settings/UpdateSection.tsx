import { HelpTip } from "@/client/components/HelpTip";
import { siteUrl } from "@/client/features/support/links";
import { getSafeExternalUrl } from "@/client/components/table/url";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowUpCircle,
  CheckCircle2,
  ExternalLink,
  RotateCw,
} from "lucide-react";
import { toast } from "sonner";
import { CopyButton } from "@/client/components/CopyButton";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { formatDateTime } from "@/client/lib/format";
import {
  checkForUpdateNow,
  setUpdateCheckEnabled,
} from "@/serverFunctions/updateCheck";
import { t } from "@/shared/i18n";
import { fillParts } from "./fillParts";
import { SectionHeaderRow } from "./SectionBadge";
import { unreadableBadge, updateBadge } from "./sectionStatus";
import { updateStatusOptions, windowsSettingsOptions } from "./settingsQueries";
import { notifyUpdateAvailable } from "@/client/features/notifications/useBackgroundNotifications";

const STATUS_KEY = updateStatusOptions().queryKey;
const UPDATE_COMMAND = "git pull && docker compose up -d --build";

/**
 * Version, and whether a newer one has been released.
 *
 * There is nothing to install from here. On Docker the install is a git
 * checkout, so updating is a command the operator runs; the app's job is to
 * notice, say so once, and hand over the exact line. The Windows package has
 * its own updater in the tray app, so there the copy points at the tray icon.
 */
export function UpdateSection({ version }: { version: string }) {
  const queryClient = useQueryClient();

  const statusQuery = useQuery(updateStatusOptions());
  const status = statusQuery.data;

  const checkNow = useMutation({
    mutationFn: () => checkForUpdateNow(),
    onSuccess: (result) => {
      queryClient.setQueryData(STATUS_KEY, result);
      if (result.reason === "rate_limited") {
        toast.error(
          t(
            "GitHub istek sınırı veya erişim kısıtı bildirdi. Bir süre bekleyip tekrar deneyin; Yardım tanılamasını kontrol edin.",
          ),
        );
      } else if (result.outcome === "unreachable") {
        toast.error(
          t(
            "GitHub sürüm bilgisi okunamadı. Biraz bekleyip yeniden deneyin; sürerse Yardım ekranından tanılama alın.",
          ),
        );
      } else if (result.outcome === "error") {
        toast.error(
          t("GitHub'a ulaşılamadı; son bilinen sürüm {version}", {
            version: result.latestVersion ?? "",
          }),
        );
      } else if (result.outcome === "source_missing") {
        toast.error(
          t("Sürüm kaynağına ulaşılamadı: depo bulunamadı ya da gizli."),
        );
      } else if (result.updateAvailable) {
        if (result.latestVersion) notifyUpdateAvailable(result.latestVersion);
      } else {
        toast.success(t("En güncel sürümü kullanıyorsunuz"));
      }
    },
    onError: (error) =>
      toast.error(
        getStandardErrorMessage(
          error,
          t("Güncelleme kontrol edilemedi. Birazdan tekrar deneyin."),
        ),
      ),
  });

  const toggle = useMutation({
    mutationFn: (enabled: boolean) =>
      setUpdateCheckEnabled({ data: { enabled } }),
    onSuccess: (result, enabled) => {
      queryClient.setQueryData(STATUS_KEY, result);
      toast.success(
        enabled
          ? t("Güncelleme kontrolü açıldı")
          : t("Güncelleme kontrolü kapatıldı"),
      );
    },
    onError: (error) =>
      toast.error(
        getStandardErrorMessage(
          error,
          t("Ayar kaydedilemedi. Tekrar deneyin."),
        ),
      ),
  });

  return (
    <section id="guncelleme" className="scroll-mt-16 space-y-3">
      <SectionHeaderRow
        badge={statusQuery.isError ? unreadableBadge() : updateBadge(status)}
      >
        <h2 className="text-base font-semibold">{t("Hakkında")}</h2>
      </SectionHeaderRow>

      <p className="text-sm text-muted">
        {fillParts(
          t(
            "Uygulama yeni sürümü fark eder ve ne yapacağınızı söyler. Windows paketi güncellemeyi kendisi kurar, Docker'da verilen komutu siz çalıştırırsınız. Docker'da kontrolü kapatırsanız GitHub'a istek gitmez. Windows paketinde görev çubuğu uygulaması günde bir kez GitHub'a bakar. Kendiliğinden kurup kurmayacağını menüdeki {option} seçeneği belirler.",
          ),
          { option: <strong>{t("Güncellemeleri kendiliğinden kur")}</strong> },
        )}
      </p>

      <div className="flex items-center justify-between gap-6">
        <span className="text-sm">{t("Sürüm")}</span>
        <span className="font-mono text-sm text-muted">v{version} Alpha</span>
      </div>
      <div className="flex items-center justify-between gap-6">
        <span className="text-sm">{t("Site ve kılavuz")}</span>
        <a
          href={siteUrl()}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1 text-sm font-medium underline underline-offset-2"
        >
          seowatcher.io
          <ExternalLink className="size-3" />
        </a>
      </div>

      {status?.updateAvailable ? (
        <div className="space-y-3 rounded-box border border-primary/30 bg-primary/5 p-3">
          <div className="flex flex-wrap items-center gap-2">
            <ArrowUpCircle className="size-4 shrink-0 text-primary" />
            <p className="text-sm">
              {fillParts(t("{version} yayımlandı."), {
                version: <strong>{status.latestVersion}</strong>,
              })}
            </p>
            {/* The release URL comes from GitHub's API; only http(s) is linked. */}
            {getSafeExternalUrl(status.releaseUrl) ? (
              <a
                href={getSafeExternalUrl(status.releaseUrl) ?? undefined}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 text-sm font-medium underline underline-offset-2"
              >
                {t("Değişiklikler")}
                <ExternalLink className="size-3" />
              </a>
            ) : null}
          </div>
          {status.installKind === "windows" ? (
            <p className="text-xs text-subtle">
              {fillParts(
                t(
                  "Windows paketi güncellemeyi kendisi kurar: görev çubuğundaki seowatcher simgesi yeni sürümü indirir, doğrular ve sessizce kurar. Kendiliğinden kurmayı istemiyorsanız simgeye sağ tıklayıp {option} işaretini kaldırın; o zaman yeni sürüm hazır olunca menüde {item} maddesi çıkar, tıklayınca kurulur. Verileriniz ve Google bağlantınız olduğu gibi kalır.",
                ),
                {
                  option: (
                    <strong>{t("Güncellemeleri kendiliğinden kur")}</strong>
                  ),
                  item: <strong>{t("Güncelle: sürüm hazır")}</strong>,
                },
              )}
            </p>
          ) : (
            <>
              {/* The whole update, in one line they can paste. */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <code className="min-w-0 break-all whitespace-pre-wrap font-mono text-sm text-muted">
                  {UPDATE_COMMAND}
                </code>
                <CopyButton
                  value={UPDATE_COMMAND}
                  successMessage={t("Güncelleme komutu kopyalandı")}
                />
              </div>
              <p className="text-xs text-subtle">
                {fillParts(
                  t(
                    "Proje klasöründe çalıştırın. Verileriniz Docker biriminde ({volume}) kalır, güncelleme onu silmez.",
                  ),
                  { volume: <code>seotracker_data</code> },
                )}
              </p>
            </>
          )}
        </div>
      ) : null}

      {status && !status.updateAvailable && status.outcome === "ok" ? (
        <p className="flex items-center gap-1.5 text-sm text-muted">
          <CheckCircle2 className="size-4 shrink-0 text-success" />
          {t("En güncel sürümü kullanıyorsunuz.")}
        </p>
      ) : null}

      {status?.outcome === "source_missing" ? (
        <p role="alert" className="text-sm text-[var(--ink-warning)]">
          {t(
            "Sürüm kaynağına ulaşılamadı: depo bulunamadı ya da gizli (GitHub 404). Yardım ekranından tanılama paketini indirip sorunu bildirin.",
          )}
        </p>
      ) : null}

      {status && !status.enabled ? (
        <p className="text-sm text-muted">
          {t(
            "Uygulama içi sürüm kontrolü kapalı. Windows tepsisi bağımsız olarak günlük sürüm kontrolü yapabilir.",
          )}
        </p>
      ) : null}

      {status?.outcome === "error" && status.reason !== "rate_limited" ? (
        <p role="alert" className="text-sm text-[var(--ink-warning)]">
          {status.lastSuccessAt
            ? t(
                "Son kontrol başarısız oldu: GitHub'a ulaşılamadı. Son bilinen sürüm {version} (son başarılı kontrol: {date}); güncel olup olmadığı doğrulanamadı.",
                {
                  version: status.latestVersion ?? "",
                  date: formatDateTime(status.lastSuccessAt),
                },
              )
            : t(
                "Son kontrol başarısız oldu: GitHub'a ulaşılamadı. Son bilinen sürüm {version}; güncel olup olmadığı doğrulanamadı.",
                { version: status.latestVersion ?? "" },
              )}
        </p>
      ) : null}

      {status?.outcome === "unreachable" && status.reason !== "rate_limited" ? (
        <p className="text-sm text-muted">
          {t("Son kontrolde GitHub'a ulaşılamadı.")}
        </p>
      ) : null}

      {statusQuery.isError ? (
        <p role="alert" className="text-sm text-[var(--ink-warning)]">
          {t("Sürüm kontrolü ayarı okunamadı. Son kayıt güncel olmayabilir.")}{" "}
          <button
            type="button"
            className="link min-h-11"
            onClick={() => void statusQuery.refetch()}
          >
            {t("Tekrar dene")}
          </button>
        </p>
      ) : null}
      {status?.reason === "rate_limited" ? (
        <p role="alert" className="text-sm text-[var(--ink-warning)]">
          {t(
            "GitHub istek sınırı veya erişim kısıtı bildirdi. Bir süre bekleyip tekrar deneyin; Yardım tanılamasını kontrol edin.",
          )}
        </p>
      ) : null}
      {status?.lastSuccessAt ? (
        <p className="text-xs text-muted">
          {t("Son başarılı sürüm kontrolü: {date}", {
            date: formatDateTime(status.lastSuccessAt),
          })}
        </p>
      ) : null}
      <WindowsSettingsLink />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            className="toggle toggle-sm"
            checked={status?.enabled ?? false}
            disabled={
              !status ||
              statusQuery.isError ||
              statusQuery.isPending ||
              toggle.isPending
            }
            onChange={(event) => toggle.mutate(event.target.checked)}
          />
          <span className="flex items-center gap-1.5">
            {t("Uygulama içi sürüm kontrolü")}
            <HelpTip label={t("Uygulama içi sürüm kontrolü")}>
              {t(
                "Açıkken uygulama içi kontrol en çok altı saatte bir GitHub sürüm listesine bakar. Bu tercih Windows tepsisinin günlük kontrolünü ve otomatik kurulum tercihini değiştirmez.",
              )}
            </HelpTip>
          </span>
        </label>
        {status?.enabled ? (
          <button
            type="button"
            className="btn btn-sm gap-1.5"
            disabled={checkNow.isPending}
            onClick={() => checkNow.mutate()}
          >
            <RotateCw
              className={`size-4 ${checkNow.isPending ? "animate-spin" : ""}`}
            />
            {checkNow.isPending
              ? t("Kontrol ediliyor…")
              : t("Şimdi kontrol et")}
          </button>
        ) : null}
      </div>

      {/* Said plainly, because it is an outbound request the operator did not
          ask for individually and can switch off. */}
      <p className="text-xs text-subtle">
        {t(
          "Kontrol açıkken uygulama, bir sekmede açık olduğu sürece en çok altı saatte bir GitHub'a bağlanıp en son sürümü sorar. GitHub bu istekte yalnızca genel IP adresinizi, uygulama adını ve sürümü görür; siteleriniz, Google hesabınız ya da denetimleriniz gönderilmez.",
        )}
        {status?.checkedAt
          ? ` ${t("Son kontrol: {date}.", { date: formatDateTime(status.checkedAt) })}`
          : ""}
      </p>
    </section>
  );
}

function WindowsSettingsLink() {
  const settings = useQuery(windowsSettingsOptions());
  if (settings.isError || settings.data?.status !== "ready") return null;
  return (
    <a
      href="#windows"
      className="link inline-flex min-h-11 items-center text-sm"
    >
      {t("Windows otomatik kurulum ayarları")}
    </a>
  );
}
