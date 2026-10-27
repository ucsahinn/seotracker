import { useRef, useState } from "react";
import { CopyButton } from "@/client/components/CopyButton";
import { captureClientEvent } from "@/client/lib/observability";
import {
  getAgentSetupPrompt,
  getCodexSetupPrompt,
} from "@/client/features/ai-mcp/agentSetupPrompt";
import { InstallPromptButton } from "@/client/features/ai-mcp/InstallPromptButton";
import { fillParts } from "@/client/features/settings/fillParts";
import { t } from "@/shared/i18n";

// What the segmented control offers, and how each agent invokes a skill.
// Claude Code and "Diğer" copy the same general prompt; only the hint differs.
// Labels and hints stay Turkish here and go through t() where they render.
const AGENT_CHOICES = [
  {
    id: "claude",
    label: "Claude Code",
    hint: "Becerileri /seo-audit diye çağırırsınız.",
  },
  {
    id: "codex",
    label: "Codex",
    hint: "Komut, Codex'in kendi bağlama adımlarını kullanır. Becerileri $seo-audit diye çağırırsınız.",
  },
  {
    id: "other",
    label: "Diğer",
    hint: "Genel komut. Beceriyi aracınızın kendi yöntemiyle çağırın.",
  },
] as const;
type AgentChoice = (typeof AGENT_CHOICES)[number]["id"];

type ConnectionFacts = {
  tokenConfigured: boolean;
  installKind: "windows" | "docker";
};

/*
 * The two setup cards of the Ajan kurulumu page. Which one leads is the
 * page's decision (it knows whether an agent has ever called in); each card
 * only renders the lead or the second-place version of itself, so the page
 * keeps exactly one primary button.
 */
export function ConnectAgentCard({
  lead,
  connection,
  connected,
  origin,
  onVerify,
}: {
  onVerify?: () => void;
  lead: boolean;
  /** Undefined until the first read answers; the copy button waits for it. */
  connection: ConnectionFacts | undefined;
  connected: boolean;
  origin: string;
}) {
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const [agent, setAgent] = useState<AgentChoice>("claude");
  const facts = {
    tokenConfigured: connection?.tokenConfigured,
    installKind: connection?.installKind,
  };
  const prompt = getAgentSetupPrompt(origin, facts);
  const codexPrompt = getCodexSetupPrompt(origin, facts);
  const choice = AGENT_CHOICES.find((item) => item.id === agent);
  const isCodex = agent === "codex";

  return (
    <section
      className={`rounded-box border border-base-300 bg-base-100 ${
        lead ? "p-5" : "p-4"
      }`}
    >
      <h2
        className={!lead ? "text-sm font-semibold" : "text-base font-semibold"}
      >
        {t("Ajanınızı bağlayın")}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {!lead
          ? `${t("Uygulama kurulu, Google ve PageSpeed hazırsa yalnızca bu adım yeter.")} `
          : ""}
        {t(
          "Komutu ajanınıza yapıştırın. Ajan seowatcher'ı bağlar, SEO becerilerini kurar, elle yapacağınız adımlarda size yol gösterir.",
        )}
      </p>
      <div
        className="join mt-4"
        role="radiogroup"
        aria-label={t("Hangi ajanı kullanıyorsunuz?")}
      >
        {AGENT_CHOICES.map((item, index) => (
          <button
            ref={(element) => {
              buttons.current[index] = element;
            }}
            tabIndex={item.id === agent ? 0 : -1}
            onKeyDown={(event) => {
              const steps: Record<string, number> = {
                ArrowRight: 1,
                ArrowDown: 1,
                ArrowLeft: -1,
                ArrowUp: -1,
              };
              const step = steps[event.key];
              if (
                step === undefined &&
                event.key !== "Home" &&
                event.key !== "End"
              )
                return;
              event.preventDefault();
              const next =
                event.key === "Home"
                  ? 0
                  : event.key === "End"
                    ? AGENT_CHOICES.length - 1
                    : (index + step + AGENT_CHOICES.length) %
                      AGENT_CHOICES.length;
              setAgent(AGENT_CHOICES[next].id);
              buttons.current[next]?.focus();
            }}
            key={item.id}
            type="button"
            role="radio"
            aria-checked={item.id === agent}
            className={`btn min-h-11 join-item btn-sm ${
              item.id === agent ? "btn-active" : ""
            }`}
            onClick={() => setAgent(item.id)}
          >
            {t(item.label)}
          </button>
        ))}
      </div>
      <p className="mt-2 text-xs text-muted">
        {choice ? t(choice.hint) : null}
        {isCodex
          ? ` ${t("Ajan bağlantıyı kurar, becerileri kopyalar ve doğrular. Parolayı sohbete yazmaz, bilgisayarınızdan okur.")}`
          : ""}
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 [&>button]:h-11 [&>button]:gap-2 [&>button]:text-sm">
        <CopyButton
          primary={!!lead}
          secondary={!lead}
          /*
           * Disabled for the first roundtrip: the prompt's auth
           * sentence is chosen from this query, and `undefined`
           * reads as "no token", so a click inside that window
           * would copy the wrong variant onto a protected install.
           */
          disabled={connection === undefined}
          value={isCodex ? codexPrompt : prompt}
          label={t("Kurulum komutunu kopyala")}
          successMessage={t("Kurulum komutu kopyalandı")}
          onCopy={() => {
            onVerify?.();
            captureClientEvent(
              isCodex ? "mcp:codex_prompt_copy" : "mcp:setup_prompt_copy",
            );
          }}
        />
      </div>
      <p className="mt-5 border-t border-base-300 pt-4 text-sm leading-relaxed text-muted">
        {fillParts(
          t(
            "Bağlandıktan sonra ajanınızdan {skill} becerisini kullanmasını isteyin; sıradaki adımı birlikte seçersiniz.",
          ),
          { skill: <code>seo-coach</code> },
        )}{" "}
        {/* Turns the grey pill from a verdict into a progress
                        marker, and says it next to the button that resolves
                        it rather than next to the badge that reports it. */}
        {connected ? null : (
          <>
            {t(
              "Ajanınız seowatcher'a ilk kez istek attığında yukarıdaki durum değişir.",
            )}
          </>
        )}
      </p>
      <p className="mt-2 text-xs text-muted">
        {t(
          "Claude Code, Codex, Cursor, ChatGPT ve MCP destekleyen diğer uygulamalarla çalışır.",
        )}
      </p>
    </section>
  );
}

export function InstallCard({ lead }: { lead: boolean }) {
  return (
    <section
      className={`rounded-box border border-base-300 bg-base-100 ${
        lead ? "p-5 shadow-[var(--shadow-raise)]" : "p-4"
      }`}
    >
      {lead ? (
        <p className="text-xs font-semibold text-muted">
          {t("İlk kez mi kuruyorsunuz? Buradan başlayın.")}
        </p>
      ) : null}
      <h2
        className={
          lead ? "mt-1 text-base font-semibold" : "text-sm font-semibold"
        }
      >
        {t("Sıfırdan kurulum")}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {lead
          ? `${t("Uygulamayı yeni kurduysanız ilk adım bu.")} `
          : `${t("Yeni bir kurulum ya da baştan kontrol için.")} `}
        {t(
          "Ajanınız kurulumu, Google bağlantısını, PageSpeed anahtarını ve ilk projenizi sırayla kontrol eder, sonra kendini bağlar. Windows paketini de Docker'ı da tanır. Google Cloud'daki adımları siz yaparsınız. Anahtarlar sohbete değil, yalnızca Ayarlar'a girilir.",
        )}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 [&>button]:gap-2">
        <InstallPromptButton
          primary={lead}
          label={t("Sıfırdan kurulum komutunu kopyala")}
        />
      </div>
    </section>
  );
}
