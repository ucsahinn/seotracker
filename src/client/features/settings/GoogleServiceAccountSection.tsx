import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, ExternalLink } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import { CopyButton } from "@/client/features/ai-mcp/SetupControls";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import {
  clearGoogleServiceAccount,
  getGoogleServiceAccountStatus,
  saveGoogleServiceAccount,
} from "@/serverFunctions/googleServiceAccount";

const SERVICE_ACCOUNT_URL =
  "https://console.cloud.google.com/iam-admin/serviceaccounts";
const STATUS_KEY = ["googleServiceAccountStatus"] as const;

/**
 * The shorter way to connect Google.
 *
 * The OAuth client above needs a consent screen, a test-user entry and a
 * redirect URI that has to match byte for byte — three steps that exist to
 * let a person sign in, and a self-hosted install has no person to sign in.
 * A service account skips all three: create it, download the key, paste it
 * here, then add its email to the property in Search Console the way you
 * would add a colleague.
 */
export function GoogleServiceAccountSection() {
  const queryClient = useQueryClient();
  const [keyJson, setKeyJson] = React.useState("");
  const [editing, setEditing] = React.useState(false);

  const statusQuery = useQuery({
    queryKey: STATUS_KEY,
    queryFn: () => getGoogleServiceAccountStatus(),
  });
  const status = statusQuery.data;
  const stored = Boolean(status?.clientEmail);

  const invalidate = async () => {
    await queryClient.invalidateQueries({ queryKey: STATUS_KEY });
    // Both connection cards read which credential the install has.
    await queryClient.invalidateQueries({ queryKey: ["gscConnection"] });
    await queryClient.invalidateQueries({ queryKey: ["ga4Connection"] });
  };

  const save = useMutation({
    mutationFn: () => saveGoogleServiceAccount({ data: { keyJson } }),
    onSuccess: async (result) => {
      // A malformed key comes back as a value so the reason survives the trip.
      if (!result.ok) {
        toast.error(result.reason);
        return;
      }
      setKeyJson("");
      setEditing(false);
      await invalidate();
      toast.success("Servis hesabı kaydedildi");
    },
    onError: (error) => toast.error(getStandardErrorMessage(error)),
  });

  const clear = useMutation({
    mutationFn: () => clearGoogleServiceAccount(),
    onSuccess: async () => {
      setKeyJson("");
      setEditing(false);
      await invalidate();
      toast.success("Servis hesabı silindi");
    },
    onError: (error) => toast.error(getStandardErrorMessage(error)),
  });

  const showForm = editing || !stored;

  return (
    <section className="space-y-3">
      <h2 className="text-sm font-medium text-muted">
        Servis hesabı (daha kısa yol)
      </h2>

      <p className="text-sm text-muted">
        Yukarıdaki OAuth istemcisi yerine bunu kullanabilirsiniz. Servis
        hesabında izin ekranı, test kullanıcısı ve redirect URI adımları yok:
        hesabı oluşturup JSON anahtarını buraya yapıştırın, sonra hesabın
        e-posta adresini Search Console&apos;da mülkünüze kullanıcı olarak
        ekleyin.{" "}
        <a
          href={SERVICE_ACCOUNT_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1 font-medium underline underline-offset-2"
        >
          Servis hesapları
          <ExternalLink className="size-3" />
        </a>
      </p>

      {statusQuery.isPending ? <div className="skeleton h-10 w-full" /> : null}

      {stored && !editing ? (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-base-300 p-3">
            <div className="flex min-w-0 items-center gap-2">
              <CheckCircle2 className="size-4 shrink-0 text-success" />
              <span className="truncate font-mono text-sm">
                {status?.clientEmail}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="btn btn-sm"
                onClick={() => setEditing(true)}
              >
                Değiştir
              </button>
              <button
                type="button"
                className="btn btn-sm btn-ghost text-error"
                disabled={clear.isPending}
                onClick={() => clear.mutate()}
              >
                Sil
              </button>
            </div>
          </div>

          {/* The step people forget: a stored key alone reaches nothing until
              the account is a user on the property. */}
          <div className="rounded-lg border border-base-300 bg-base-200/40 p-3">
            <p className="text-sm text-muted">
              Bu adresi Search Console&apos;da{" "}
              <strong>
                Ayarlar → Kullanıcılar ve izinler → Kullanıcı ekle
              </strong>{" "}
              ile mülkünüze ekleyin (yetki: <strong>Tam</strong>). Eklemeden
              veri gelmez. Analytics için de GA4 mülkünde{" "}
              <strong>Yönetici → Erişim yönetimi</strong>&apos;ne aynı adresi
              Görüntüleyen olarak ekleyin.
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
              <code className="min-w-0 truncate font-mono text-sm text-muted">
                {status?.clientEmail}
              </code>
              <CopyButton
                value={status?.clientEmail ?? ""}
                successMessage="Servis hesabı adresi kopyalandı"
              />
            </div>
          </div>
        </div>
      ) : null}

      {showForm ? (
        <div className="space-y-2">
          <label className="block text-sm" htmlFor="service-account-key">
            JSON anahtar dosyası
          </label>
          <textarea
            id="service-account-key"
            className="textarea textarea-bordered h-32 w-full font-mono text-xs"
            placeholder='{ "type": "service_account", "project_id": "...", ... }'
            value={keyJson}
            onChange={(event) => setKeyJson(event.target.value)}
          />
          <div className="flex gap-2">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              disabled={keyJson.trim() === "" || save.isPending}
              onClick={() => save.mutate()}
            >
              Kaydet
            </button>
            {stored ? (
              <button
                type="button"
                className="btn btn-sm btn-ghost"
                onClick={() => {
                  setKeyJson("");
                  setEditing(false);
                }}
              >
                Vazgeç
              </button>
            ) : null}
          </div>
          <p className="text-xs text-subtle">
            Anahtar sunucuda şifrelenir ve bir daha tarayıcıya gönderilmez.
          </p>
        </div>
      ) : null}
    </section>
  );
}
