import { PageHeader, PageShell } from "@/client/components/PageShell";
import { StatusPill } from "@/client/components/StatusPill";
import { TabPanel, Tabs } from "@/client/components/Tabs";
import { useQuery } from "@tanstack/react-query";
import { formatDateTime, formatRelativeTime } from "@/client/lib/format";
import { getAgentConnection } from "@/serverFunctions/agentConnection";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldAlert } from "lucide-react";
import { getAuthMode } from "@/lib/auth-mode";
import { captureClientEvent } from "@/client/lib/observability";
import {
  agentUpdatePrompt,
  getAgentSetupPrompt,
} from "@/client/features/ai-mcp/agentSetupPrompt";
import { CopyButton } from "@/client/features/ai-mcp/SetupControls";
import {
  ClaudeIcon,
  GrokIcon,
  HermesIcon,
  OpenAIIcon,
  OpenClawIcon,
} from "@/client/features/ai-mcp/AgentIcons";

// The public skills shipped under .agents/skills/. Everything that needed a
// paid data provider went with the features behind it.
const SKILLS = [
  ["seo-coach", "Nerede durduğunuzu anlatır ve sıradaki adımı seçer."],
  [
    "seo-project-setup",
    "Hedeflerinizi, rakiplerinizi ve önemli sayfalarınızı ortak bilgi olarak kaydeder.",
  ],
  [
    "seo-audit",
    "Bu hafta yapılacak tek bir işe odaklanan, tek sayfalık site denetimi.",
  ],
  [
    "seo-check-in",
    "Bu dönemi öncekiyle karşılaştırır: ne değişti, ne zaman değişti, önemli mi.",
  ],
  [
    "seo-triage",
    "Trafik düştüyse: gerçek mi, nerede oldu, ne zaman oldu — bir şey değiştirmeden önce.",
  ],
  [
    "seo-report",
    "Yukarıdakilerden birini Raporlar sayfanıza rapor olarak kaydeder.",
  ],
];
const AI_TABS = [
  { id: "setup", label: "Ajanınızı kurun" },
  { id: "skills", label: "Beceriler" },
] as const;
const AGENTS = [
  { name: "Claude Code", Icon: ClaudeIcon },
  { name: "ChatGPT", Icon: OpenAIIcon },
  { name: "Grok Bot", Icon: GrokIcon },
  { name: "Hermes", Icon: HermesIcon },
  { name: "OpenClaw", Icon: OpenClawIcon },
];

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
  const prompt = getAgentSetupPrompt(origin, {
    tokenConfigured: connection.data?.tokenConfigured,
  });

  return (
    <PageShell width="reading">
      <div>
        <PageHeader
          title="Ajan kurulumu"
          description="seotracker'ı kullanmanın en güçlü yolu, zaten kullandığınız yapay zeka ajanı. Bir kez kurun, sonra istediğinizi sorun."
          actions={
            /* `aria-live` is not decoration: the operator tabs away, pastes
               the prompt into their agent, and tabs back — the query refetches
               on focus and this flips without a reload. A sighted user sees
               it. `min-w-0` because clientLabel is the client's own word for
               itself, capped at 60 characters but not guaranteed to contain a
               space. */
            <div
              className="flex min-w-0 flex-col items-start gap-1 sm:items-end"
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
          className="mt-8 w-fit"
          value={tab}
          onChange={setTab}
          items={AI_TABS}
        />

        {tab === "setup" ? (
          <TabPanel group="ai" value="setup">
            <div className="mt-6 space-y-5">
              <section className="rounded-box border border-base-300 p-5 sm:p-6">
                <h2 className="text-base font-semibold">Ajanınızı kurun</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Kurulum istemini ajanınıza yapıştırın; seotracker&apos;ı
                  bağlayıp SEO becerilerini kuracak. Elle yapmanız gereken
                  adımlarda size yol gösterir.
                </p>
                <ul className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                  {AGENTS.map(({ name, Icon }) => (
                    <li
                      key={name}
                      className="flex items-center gap-1.5 text-xs text-muted"
                    >
                      <Icon className="size-4" />
                      {name}
                    </li>
                  ))}
                  <li className="text-xs text-muted">
                    ya da herhangi bir MCP istemcisi
                  </li>
                </ul>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 [&>button]:h-11 [&>button]:gap-2 [&>button]:text-sm">
                  <CopyButton
                    primary
                    /*
                     * Disabled for the first roundtrip: the prompt's auth
                     * sentence is chosen from this query, and `undefined`
                     * reads as "no token", so a click inside that window
                     * would copy the wrong variant onto a protected install.
                     */
                    disabled={connection.isPending}
                    value={prompt}
                    label="Kurulum istemini kopyala"
                    successMessage="Kurulum istemi kopyalandı"
                    onCopy={() => captureClientEvent("mcp:setup_prompt_copy")}
                  />
                </div>
                <p className="mt-5 border-t border-base-300 pt-4 text-sm leading-relaxed text-muted">
                  Bağlandıktan sonra ajanınızdan <code>seo-coach</code>{" "}
                  becerisini kullanmasını isteyin; sıradaki adımı birlikte
                  seçersiniz.{" "}
                  {/* Turns the grey pill from a verdict into a progress
                      marker, and says it next to the button that resolves
                      it rather than next to the badge that reports it. */}
                  {lastCallAt ? null : (
                    <>
                      Ajanınız ilk aracı çağırdığında yukarıdaki durum
                      güncellenir.
                    </>
                  )}
                </p>
              </section>

              <section className="rounded-box border border-base-300 p-5 sm:p-6">
                <h2 className="text-base font-semibold">
                  Becerilerinizi güncelleyin
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Ajanınızı daha önce kurduysanız güncelleme istemini
                  yapıştırın; en güncel becerileri alırken bağlantı ayarlarınız
                  ve kişisel düzenlemeleriniz korunur.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 [&>button]:h-11 [&>button]:gap-2 [&>button]:text-sm">
                  <CopyButton
                    primary
                    value={agentUpdatePrompt}
                    label="Güncelleme istemini kopyala"
                    successMessage="Güncelleme istemi kopyalandı"
                    onCopy={() => captureClientEvent("mcp:update_prompt_copy")}
                  />
                </div>
              </section>
            </div>

            {getAuthMode(import.meta.env.AUTH_MODE) === "cloudflare_access" ? (
              <div className="alert alert-warning mt-8 text-sm" role="alert">
                <ShieldAlert className="size-4 shrink-0" />
                <span>
                  Bu kurulum Cloudflare Access arkasında. Access uygulamanızda
                  Managed OAuth açılmadan MCP istemcileri bağlanamaz.
                </span>
              </div>
            ) : null}

            <div className="mt-10 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-base-300 pt-5 text-xs text-muted">
              <span>
                Bu kurulumun MCP adresi:{" "}
                <code className="font-mono text-muted">{mcpUrl}</code>.{" "}
                {connection.data === undefined ? null : connection.data
                    .tokenConfigured ? (
                  <>
                    Bu adres{" "}
                    <code className="font-mono text-muted">MCP_TOKEN</code> ile
                    korunuyor; istemciye{" "}
                    <code className="font-mono text-muted">
                      Authorization: Bearer …
                    </code>{" "}
                    başlığını ekletin.
                  </>
                ) : (
                  <>
                    Bu adres kimlik doğrulaması istemez; makinenizdeki başka bir
                    sürecin araçları çalıştırmasını engellemek isterseniz{" "}
                    <code className="font-mono text-muted">MCP_TOKEN</code>{" "}
                    ayarlayın ve istemciye{" "}
                    <code className="font-mono text-muted">
                      Authorization: Bearer …
                    </code>{" "}
                    başlığını ekletin.
                  </>
                )}
              </span>
              <CopyButton
                value={mcpUrl}
                successMessage="MCP adresi kopyalandı"
                onCopy={() => captureClientEvent("mcp:setup_url_copy")}
              />
            </div>
          </TabPanel>
        ) : (
          <TabPanel group="ai" value="skills" className="mt-6">
            <p className="text-sm text-muted">
              Kurulum istemi bunları kurar. Kısa bir yanıt yerine tam bir çıktı
              istediğinizde beceriyi adıyla çağırın.
            </p>
            <ul className="mt-5 space-y-3 text-sm sm:space-y-2">
              {SKILLS.map(([name, blurb]) => (
                <li
                  key={name}
                  className="flex flex-col gap-0.5 sm:flex-row sm:gap-3"
                >
                  <span className="shrink-0 font-mono text-sm text-base-content sm:w-48">
                    {name}
                  </span>
                  <span className="text-muted">{blurb}</span>
                </li>
              ))}
            </ul>
          </TabPanel>
        )}
      </div>
    </PageShell>
  );
}
