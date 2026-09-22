import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowUpCircle,
  CheckCircle2,
  ExternalLink,
  RotateCw,
} from "lucide-react";
import { toast } from "sonner";
import { CopyButton } from "@/client/features/ai-mcp/SetupControls";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { formatDateTime } from "@/client/lib/format";
import {
  checkForUpdateNow,
  getUpdateStatus,
  setUpdateCheckEnabled,
} from "@/serverFunctions/updateCheck";

const STATUS_KEY = ["updateStatus"] as const;
const UPDATE_COMMAND = "git pull && docker compose up -d --build";

/**
 * Version, and whether a newer one has been released.
 *
 * There is nothing to install from here: this install is a git checkout, so
 * updating is a command the operator runs. The app's job is to notice, say
 * so once, and hand over the exact line — not to pretend it can update
 * itself.
 */
export function UpdateSection({ version }: { version: string }) {
  const queryClient = useQueryClient();

  const statusQuery = useQuery({
    queryKey: STATUS_KEY,
    queryFn: () => getUpdateStatus(),
  });
  const status = statusQuery.data;

  const checkNow = useMutation({
    mutationFn: () => checkForUpdateNow(),
    onSuccess: (result) => {
      queryClient.setQueryData(STATUS_KEY, result);
      if (result.outcome === "unreachable") {
        toast.error("GitHub'a ulaşılamadı.");
      } else if (result.outcome === "no_releases") {
        toast.success("Henüz yayımlanmış bir sürüm yok.");
      } else if (result.updateAvailable) {
        toast.success(`Yeni sürüm: ${result.latestVersion}`);
      } else {
        toast.success("En güncel sürümü kullanıyorsunuz.");
      }
    },
    onError: (error) => toast.error(getStandardErrorMessage(error)),
  });

  const toggle = useMutation({
    mutationFn: (enabled: boolean) =>
      setUpdateCheckEnabled({ data: { enabled } }),
    onSuccess: (result) => queryClient.setQueryData(STATUS_KEY, result),
    onError: (error) => toast.error(getStandardErrorMessage(error)),
  });

  return (
    <section className="space-y-3">
      <h2 className="text-sm font-medium text-muted">Hakkında</h2>

      <div className="flex items-center justify-between gap-6">
        <span className="text-sm">Sürüm</span>
        <span className="font-mono text-sm text-muted">v{version}</span>
      </div>

      {status?.updateAvailable ? (
        <div className="space-y-3 rounded-box border border-primary/30 bg-primary/5 p-3">
          <div className="flex flex-wrap items-center gap-2">
            <ArrowUpCircle className="size-4 shrink-0 text-primary" />
            <p className="text-sm">
              <strong>{status.latestVersion}</strong> yayımlandı.
            </p>
            <a
              href={status.releaseUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1 text-sm font-medium underline underline-offset-2"
            >
              Değişiklikler
              <ExternalLink className="size-3" />
            </a>
          </div>
          {/* The whole update, in one line they can paste. */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <code className="min-w-0 truncate font-mono text-sm text-muted">
              {UPDATE_COMMAND}
            </code>
            <CopyButton
              value={UPDATE_COMMAND}
              successMessage="Güncelleme komutu kopyalandı"
            />
          </div>
          <p className="text-xs text-subtle">
            Depo klasöründe çalıştırın. Verileriniz `.wrangler` biriminde kalır,
            güncelleme onu silmez.
          </p>
        </div>
      ) : null}

      {status && !status.updateAvailable && status.outcome === "ok" ? (
        <p className="flex items-center gap-1.5 text-sm text-muted">
          <CheckCircle2 className="size-4 shrink-0 text-success" />
          En güncel sürümü kullanıyorsunuz.
        </p>
      ) : null}

      {status?.outcome === "no_releases" ? (
        <p className="text-sm text-muted">
          Depoda henüz yayımlanmış bir sürüm yok.
        </p>
      ) : null}

      {status?.outcome === "unreachable" ? (
        <p className="text-sm text-muted">
          Son denetimde GitHub&apos;a ulaşılamadı.
        </p>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            className="toggle toggle-sm"
            checked={status?.enabled ?? false}
            disabled={statusQuery.isPending || toggle.isPending}
            onChange={(event) => toggle.mutate(event.target.checked)}
          />
          Güncellemeleri denetle
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
            Şimdi denetle
          </button>
        ) : null}
      </div>

      {/* Said plainly, because it is an outbound request the operator did not
          ask for individually and can switch off. */}
      <p className="text-xs text-subtle">
        Açıkken günde bir kez GitHub&apos;a bağlanıp bu deponun en son sürüm
        etiketini sorar. GitHub bu istekte ağınızın genel IP adresini ve
        uygulama adı ile sürümünüzü görür; siteleriniz, Google hesabınız ya da
        taramalarınızla ilgili hiçbir şey gönderilmez.
        {status?.checkedAt
          ? ` Son denetim: ${formatDateTime(status.checkedAt)}.`
          : ""}
      </p>
    </section>
  );
}
