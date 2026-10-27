import type { ReactNode } from "react";
import { CopyButton } from "@/client/components/CopyButton";
import { fillParts } from "@/client/features/settings/fillParts";
import { captureClientEvent } from "@/client/lib/observability";
import { t } from "@/shared/i18n";
export function ManualAgentConnection({
  mcpUrl,
  connection,
}: {
  mcpUrl: string;
  connection:
    | { tokenConfigured: boolean; installKind: "windows" | "docker" }
    | undefined;
}) {
  return (
    <details className="mt-8 rounded-box border border-base-300 bg-base-100 text-sm">
      <summary className="cursor-pointer select-none px-4 py-3 font-medium">
        {t("Elle bağlamak istiyorsanız")}
      </summary>
      <div className="space-y-4 border-t border-base-300 px-4 py-4 text-muted">
        <div className="space-y-1.5">
          <p>{t("Bu kurulumun MCP adresi:")}</p>
          <div className="flex items-center gap-2">
            <CodeLine>{mcpUrl}</CodeLine>
            <CopyButton
              value={mcpUrl}
              successMessage={t("MCP adresi kopyalandı")}
              onCopy={() => captureClientEvent("mcp:setup_url_copy")}
            />
          </div>
        </div>
        {connection === undefined ? null : connection.tokenConfigured ? (
          <div className="space-y-3">
            <p>
              {fillParts(
                t(
                  "Bu adres {token} ile, yani bir parola (token) ile korunuyor. Aracınıza şu başlığı ekletin:",
                ),
                { token: <code>MCP_TOKEN</code> },
              )}
            </p>
            <CodeLine>Authorization: Bearer &lt;token&gt;</CodeLine>
            {connection.installKind === "windows" ? (
              <>
                <p>
                  {fillParts(
                    t(
                      "Windows paketinde parola bir dosyadır (görev çubuğu menüsünde {menu}):",
                    ),
                    { menu: <strong>{t("Veri klasörünü aç")}</strong> },
                  )}
                </p>
                <CodeLine>%LOCALAPPDATA%\seowatcher\mcp-token</CodeLine>
                <p>
                  {t(
                    "Panoya kopyalamak için PowerShell (değer ekrana yazılmaz):",
                  )}
                </p>
                <CodeLine>
                  (Get-Content
                  &quot;$env:LOCALAPPDATA\seowatcher\mcp-token&quot;).Trim() |
                  Set-Clipboard
                </CodeLine>
                <p>
                  {t(
                    "Değeri sohbete ya da ekrana yazmayın. Yapıştırdıktan sonra panoyu temizleyin (Win+V, Tümünü temizle).",
                  )}
                </p>
              </>
            ) : (
              <>
                {/* Komutla, ekranda değil: parolayı buraya basmak onu
                        tarayıcı geçmişine, ekran görüntülerine ve bu sayfayı
                        okuyan bir ajanın dökümüne düşürür. */}
                <p>
                  {t(
                    "PowerShell: parolayı ekrana yazdırmadan panoya kopyalayın. Yalnızca MCP istemcinizin yerel gizli başlık alanına yapıştırın, ardından panoyu temizleyin. Sohbete yapıştırmayın.",
                  )}
                </p>
                <CodeLine>
                  {
                    "(docker compose exec -T seotracker cat /app/.wrangler/mcp-token).Trim() | Set-Clipboard"
                  }
                </CodeLine>
                <p>
                  {fillParts(
                    t(
                      "Windows'ta Git Bash için komutun başına {prefix} ekleyin, yoksa parola boş çıkar (PowerShell'de bu önek hata verir).",
                    ),
                    { prefix: <code>MSYS_NO_PATHCONV=1</code> },
                  )}
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <p>
              {fillParts(
                t(
                  "Bu adres parola istemez. Bilgisayarınızdaki başka bir programın araçları çalıştırmasını önlemek için {token} adıyla bir parola ayarlayın ve aracınıza şu başlığı ekletin:",
                ),
                { token: <code>MCP_TOKEN</code> },
              )}
            </p>
            <CodeLine>Authorization: Bearer …</CodeLine>
          </div>
        )}
      </div>
    </details>
  );
}
/** A command or header the operator copies by hand: mono, wraps, never clipped. */
function CodeLine({ children }: { children: ReactNode }) {
  return (
    <code className="block min-w-0 flex-1 whitespace-pre-wrap break-all rounded-field border border-base-300 bg-base-200 px-3 py-2 font-mono text-xs text-base-content">
      {children}
    </code>
  );
}
