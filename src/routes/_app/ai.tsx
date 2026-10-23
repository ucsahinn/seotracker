import { PageHeader, PageShell } from "@/client/components/PageShell";
import { StatusPill } from "@/client/components/StatusPill";
import { TabPanel, Tabs } from "@/client/components/Tabs";
import { useQuery } from "@tanstack/react-query";
import { formatDateTime, formatRelativeTime } from "@/client/lib/format";
import { getAgentConnection } from "@/serverFunctions/agentConnection";
import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { ShieldAlert } from "lucide-react";
import { getAuthMode } from "@/lib/auth-mode";
import { captureClientEvent } from "@/client/lib/observability";
import { agentUpdatePrompt } from "@/client/features/ai-mcp/agentSetupPrompt";
import { CopyButton } from "@/client/components/CopyButton";
import {
  ConnectAgentCard,
  InstallCard,
} from "@/client/features/ai-mcp/SetupCards";

// The public skills shipped under .agents/skills/. Everything that needed a
// paid data provider went with the features behind it.
const SKILLS = [
  ["seo-coach", "Nerede durduğunuzu anlatır ve sıradaki adımı seçer."],
  [
    "seo-project-setup",
    "Hedeflerinizi, rakiplerinizi ve önemli sayfalarınızı bir kez kaydeder; diğer beceriler bunu hep bilir.",
  ],
  [
    "seo-audit",
    "Sitenizi denetler ve bu hafta yapılacak tek bir işi öne çıkarır.",
  ],
  [
    "seo-check-in",
    "Bu dönemi öncekiyle karşılaştırır. Ne değişti, ne zaman değişti, önemli mi, söyler.",
  ],
  [
    "seo-triage",
    "Trafik düştüyse önce şuna bakar. Düşüş gerçek mi, nerede ve ne zaman oldu?",
  ],
  [
    "seo-report",
    "Yukarıdakilerden birinin sonucunu Raporlar sayfasına kaydeder.",
  ],
];
const AI_TABS = [
  { id: "setup", label: "Ajanınızı kurun" },
  { id: "skills", label: "Beceriler" },
] as const;

export const Route = createFileRoute("/_app/ai")({
  component: AiPage,
});

function AiPage() {
  const origin =
    typeof window === "undefined"
      ? "http://localhost:3001"
      : window.location.origin;
  const mcpUrl = `${origin}/mcp`;
  const [tab, setTab] = useState<"setup" | "skills">("setup");
  /*
   * Two states, and the past tense is deliberate. The integration cards say
   * "Bağlı" because a credential is sitting in a row; MCP here is stateless
   * HTTP with no session, so the only honest claim is that an agent *did*
   * reach us, and when. "Bağlandı", never "Bağlı".
   */
  const connection = useQuery({
    queryKey: ["agentConnection"],
    queryFn: () => getAgentConnection(),
    /*
     * The global default is a 5-minute staleTime, and `refetchOnWindowFocus`
     * only fires on a stale query -- which would have made this pill inert
     * during the exact minute it exists for: copy the prompt, paste it into
     * an agent, come back.
     */
    staleTime: 0,
    /*
     * And while it is still waiting, poll, so the operator who kept this tab
     * open watches it flip rather than reaching for reload. It stops the
     * moment it has an answer -- and on an error, or a failing endpoint would
     * be polled every five seconds for as long as the tab is open. TanStack
     * pauses it on a hidden tab either way.
     */
    refetchInterval: (query) =>
      query.state.status === "error" || query.state.data?.lastCallAt
        ? false
        : 5_000,
  });
  const lastCallAt = connection.data?.lastCallAt ?? null;
  /*
   * Green forever would be a lie of a different kind. Recency is the only
   * thing this page actually knows, and spending it on a binary ever/never
   * puts a success pill beside "8 ay önce", which reads as healthy to the one
   * operator whose agent has been broken since spring. Thirty days is a
   * judgement, not a measurement: wider than this tool's own weekly cadence,
   * narrow enough that a dead install stops claiming to be alive.
   */
  const isRecent =
    lastCallAt !== null &&
    Date.now() - new Date(lastCallAt).getTime() < 30 * 24 * 60 * 60 * 1000;
  /*
   * A failed read is not a verdict of "not connected". Several screens in
   * this app once rendered a 500 as an empty state, which is what
   * QueryErrorState was written to stop; the same mistake in a header slot
   * would send an operator whose agent works fine back through setup.
   */
  const statusUnknown = connection.isError || connection.data === undefined;
  // No agent has called in yet (or the read failed, where the first-time
  // path is the safer guess): the from-scratch card leads.
  const leadWithInstall = lastCallAt === null;

  return (
    <PageShell width="reading">
      {/* No wrapper div: `PageShell` is `flex flex-col gap-6`, and wrapping
          the page in one child collapsed that to a single element -- so this
          file had to hand-manage the gap under the header with `mt-8`. The
          `mt-*` further down are inside the tab panels and stay; those are
          internal spacing, not the shell's. */}
      <PageHeader
        title="Ajan kurulumu"
        description="seowatcher'ı yapay zeka ajanınızla kullanabilirsiniz. Bir kez bağlayın, sonra ne istiyorsanız ona sorun."
        actions={
          /* `aria-live` is not decoration: the operator tabs away, pastes
               the prompt into their agent, and tabs back — the query refetches
               on focus and this flips without a reload. A sighted user sees
               it. `min-w-0` because clientLabel is the client's own word for
               itself, capped at 60 characters but not guaranteed to contain a
               space. */
          <div
            className="flex min-w-0 flex-col items-start gap-1"
            aria-live="polite"
          >
            {connection.isPending ? (
              <div className="skeleton h-6 w-28" />
            ) : statusUnknown ? (
              <StatusPill tone="warning" label="Durum okunamadı" />
            ) : lastCallAt ? (
              <>
                <StatusPill
                  tone={isRecent ? "success" : "warning"}
                  label="Bağlandı"
                />
                <span className="break-words text-xs text-muted">
                  {connection.data?.clientLabel ?? "Bir ajan"} · son çağrı{" "}
                  <time
                    dateTime={lastCallAt}
                    title={formatDateTime(lastCallAt)}
                  >
                    {formatRelativeTime(lastCallAt)}
                  </time>
                </span>
              </>
            ) : (
              /* "Bağlanmadı" alone is a plain negative past — a failed
                   attempt — on a page the operator has not used yet. "Henüz"
                   keeps the honest past tense and makes it a progress marker
                   instead of a verdict. */
              <StatusPill tone="neutral" label="Henüz bağlanmadı" />
            )}
          </div>
        }
      />

      <Tabs
        group="ai"
        className="w-fit"
        value={tab}
        onChange={setTab}
        items={AI_TABS}
      />

      {tab === "setup" ? (
        <TabPanel group="ai" value="setup">
          {/*
           * Order follows what the page knows. Until an agent has reached this
           * install, most visitors are setting it up for the first time, and
           * the from-scratch card used to sit second, where they scrolled
           * past it into the shorter "connect" path and stalled at Google.
           * So it leads, with the page's only primary button; once an agent
           * has called in, connecting (or reconnecting) is the common errand
           * and the order flips. While the first read is in flight a
           * skeleton holds the place, so a connected operator never sees the
           * cards swap under the cursor.
           */}
          {connection.isPending ? (
            <div
              className="enter mt-6 space-y-5"
              role="status"
              aria-label="Kurulum adımları yükleniyor"
            >
              <div className="space-y-3 rounded-box border border-base-300 bg-base-100 p-5">
                <div className="skeleton h-4 w-40" />
                <div className="skeleton h-3 w-full" />
                <div className="skeleton h-3 w-4/5" />
                <div className="skeleton mt-2 h-11 w-64" />
              </div>
              <div className="space-y-3 rounded-box border border-base-300 bg-base-100 p-4">
                <div className="skeleton h-4 w-32" />
                <div className="skeleton h-3 w-3/4" />
              </div>
            </div>
          ) : (
            <div className="enter mt-6 space-y-5">
              {/* DOM order, not CSS `order`: keyboard and screen-reader users
                meet the cards in the same sequence as everyone else. */}
              {leadWithInstall ? (
                <>
                  <InstallCard lead />
                  <ConnectAgentCard
                    lead={false}
                    connection={connection.data}
                    connected={false}
                    origin={origin}
                  />
                </>
              ) : (
                <>
                  <ConnectAgentCard
                    lead
                    connection={connection.data}
                    connected={lastCallAt !== null}
                    origin={origin}
                  />
                  <InstallCard lead={false} />
                </>
              )}

              <section className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 rounded-box border border-base-300 bg-base-100 p-4">
                <div className="min-w-0 flex-1 basis-72">
                  <h2 className="text-sm font-semibold">
                    Becerileri güncelleyin
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    Ajanınızı daha önce kurduysanız güncelleme komutunu
                    yapıştırın. Beceriler yenilenir, bağlantı ayarlarınız ve
                    kendi düzenlemeleriniz olduğu gibi kalır.
                  </p>
                </div>
                <CopyButton
                  value={agentUpdatePrompt}
                  label="Güncelleme komutunu kopyala"
                  successMessage="Güncelleme komutu kopyalandı"
                  onCopy={() => captureClientEvent("mcp:update_prompt_copy")}
                />
              </section>
            </div>
          )}

          {getAuthMode(import.meta.env.AUTH_MODE) === "cloudflare_access" ? (
            <div className="alert alert-warning mt-8 text-sm" role="alert">
              <ShieldAlert className="size-4 shrink-0" />
              <span>
                Bu kurulum Cloudflare Access arkasında. Ajanın bağlanabilmesi
                için Access uygulamanızda Managed OAuth&apos;u açın.
              </span>
            </div>
          ) : null}

          <details className="mt-8 rounded-box border border-base-300 bg-base-100 text-sm">
            <summary className="cursor-pointer select-none px-4 py-3 font-medium">
              Elle bağlamak istiyorsanız
            </summary>
            <div className="space-y-4 border-t border-base-300 px-4 py-4 text-muted">
              <div className="space-y-1.5">
                <p>Bu kurulumun MCP adresi:</p>
                <div className="flex items-center gap-2">
                  <CodeLine>{mcpUrl}</CodeLine>
                  <CopyButton
                    value={mcpUrl}
                    successMessage="MCP adresi kopyalandı"
                    onCopy={() => captureClientEvent("mcp:setup_url_copy")}
                  />
                </div>
              </div>
              {connection.data === undefined ? null : connection.data
                  .tokenConfigured ? (
                <div className="space-y-3">
                  <p>
                    Bu adres <code>MCP_TOKEN</code> ile, yani bir parola (token)
                    ile korunuyor. Aracınıza şu başlığı ekletin:
                  </p>
                  <CodeLine>Authorization: Bearer &lt;token&gt;</CodeLine>
                  {connection.data.installKind === "windows" ? (
                    <>
                      <p>
                        Windows paketinde parola bir dosyadır (görev çubuğu
                        menüsünde <strong>Veri klasörünü aç</strong>):
                      </p>
                      <CodeLine>%LOCALAPPDATA%\seowatcher\mcp-token</CodeLine>
                      <p>
                        Panoya kopyalamak için PowerShell (değer ekrana
                        yazılmaz):
                      </p>
                      <CodeLine>
                        (Get-Content
                        &quot;$env:LOCALAPPDATA\seowatcher\mcp-token&quot;).Trim()
                        | Set-Clipboard
                      </CodeLine>
                      <p>
                        Değeri sohbete ya da ekrana yazmayın. Yapıştırdıktan
                        sonra panoyu temizleyin (Win+V, Tümünü temizle).
                      </p>
                    </>
                  ) : (
                    <>
                      {/* Komutla, ekranda değil: parolayı buraya basmak onu
                        tarayıcı geçmişine, ekran görüntülerine ve bu sayfayı
                        okuyan bir ajanın dökümüne düşürür. */}
                      <p>
                        Kendiniz belirlemediyseniz uygulama ilk açılışta bir
                        parola üretir. Okumak için (PowerShell ve cmd):
                      </p>
                      <CodeLine>
                        docker compose exec -T seotracker cat
                        /app/.wrangler/mcp-token
                      </CodeLine>
                      <p>
                        Windows&apos;ta Git Bash için komutun başına{" "}
                        <code>MSYS_NO_PATHCONV=1</code> ekleyin, yoksa parola
                        boş çıkar (PowerShell&apos;de bu önek hata verir).
                      </p>
                    </>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <p>
                    Bu adres parola istemez. Bilgisayarınızdaki başka bir
                    programın araçları çalıştırmasını önlemek için{" "}
                    <code>MCP_TOKEN</code> adıyla bir parola ayarlayın ve
                    aracınıza şu başlığı ekletin:
                  </p>
                  <CodeLine>Authorization: Bearer …</CodeLine>
                </div>
              )}
            </div>
          </details>
        </TabPanel>
      ) : (
        <TabPanel group="ai" value="skills" className="mt-6">
          <p className="text-sm text-muted">
            Kurulum komutu bunları kurar. Kısa cevap yerine tam bir çıktı
            istiyorsanız beceriyi adıyla çağırın.
          </p>
          <ul className="mt-5 space-y-3 text-sm sm:space-y-2">
            {SKILLS.map(([name, blurb]) => (
              <li
                key={name}
                className="flex flex-col gap-0.5 sm:flex-row sm:gap-3"
              >
                <span className="flex shrink-0 items-center gap-1 sm:w-56">
                  <span className="font-mono text-sm text-base-content">
                    {name}
                  </span>
                  <CopyButton
                    iconOnly
                    value={name}
                    label={`${name} adını kopyala`}
                    successMessage="Beceri adı kopyalandı"
                  />
                </span>
                <span className="text-muted">{blurb}</span>
              </li>
            ))}
          </ul>
        </TabPanel>
      )}
    </PageShell>
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
