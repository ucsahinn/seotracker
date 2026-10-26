import { CheckCircle2, CircleDashed, XCircle } from "lucide-react";
import type { ReactNode } from "react";
import { formatBytes, formatCount, formatDate } from "@/client/lib/format";
import { t } from "@/shared/i18n";
import {
  BotAccessTable,
  DnsList,
  Panel,
  TagList,
  UnmeasuredPanel,
  unmeasuredPanels,
} from "./SiteFactsLists";
import type { AuditInsightsData, AuditResultsData } from "./types";

type Facts = NonNullable<AuditResultsData["siteFacts"]>;

/**
 * The "instant data" panel: what the audit learned about the site as a
 * whole, the way a free analyser lists it. Every row says what was found in
 * words; a value that was not measured says so and is never shown as a
 * failure.
 */

type Verdict = "yes" | "no" | "unknown";

const VERDICT_ICON = {
  yes: { Icon: CheckCircle2, ink: "var(--ink-success)" },
  no: { Icon: XCircle, ink: "var(--ink-error)" },
  unknown: { Icon: CircleDashed, ink: "var(--text-subtle)" },
};

function verdictOf(value: boolean | null): Verdict {
  return value === null ? "unknown" : value ? "yes" : "no";
}

function Check({
  label,
  verdict,
  detail,
}: {
  label: string;
  verdict: Verdict;
  detail?: string | null;
}) {
  const { Icon, ink } = VERDICT_ICON[verdict];
  const word =
    verdict === "unknown"
      ? t("Ölçülmedi")
      : verdict === "yes"
        ? t("Var")
        : t("Yok");
  return (
    <li className="flex items-start gap-2.5 py-2">
      <Icon
        aria-hidden
        className="mt-0.5 size-4 shrink-0"
        style={{ color: ink }}
      />
      <span className="min-w-0 flex-1">
        <span className="block text-sm">{label}</span>
        {detail ? (
          <span
            className="block truncate font-mono text-xs text-subtle"
            title={detail}
          >
            {detail}
          </span>
        ) : null}
      </span>
      <span className="shrink-0 text-xs text-muted">{word}</span>
    </li>
  );
}

function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-1.5">
      <dt className="shrink-0 text-sm text-muted">{label}</dt>
      <dd className="min-w-0 truncate text-right text-sm tabular-nums">
        {value === null || value === undefined || value === "" ? (
          <span className="text-subtle">{t("Ölçülmedi")}</span>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}

/** "3/7 var": how many of a panel's items are present, of those measured. */
function tally(verdicts: Verdict[]): string | undefined {
  const measured = verdicts.filter((verdict) => verdict !== "unknown");
  if (measured.length === 0) return undefined;
  return t("{present}/{total} var", {
    present: formatCount(measured.filter((v) => v === "yes").length),
    total: formatCount(measured.length),
  });
}

const DAY_MS = 86_400_000;

function daysLeft(iso: string | null): number | null {
  if (!iso) return null;
  const at = Date.parse(iso);
  return Number.isNaN(at) ? null : Math.floor((at - Date.now()) / DAY_MS);
}

function expiry(iso: string | null): string | null {
  const days = daysLeft(iso);
  if (iso === null || days === null) return null;
  return days < 0
    ? t("{date} (süresi doldu)", { date: formatDate(iso) })
    : t("{date} ({count} gün kaldı)", { date: formatDate(iso), count: days });
}

const ms = (value: number | null) =>
  value === null ? null : `${formatCount(value)} ms`;

function ServerPanel({ facts }: { facts: Facts }) {
  const { start } = facts;
  return (
    <Panel
      title={t("Sunucu ve yanıt")}
      summary={
        start.totalMs === null
          ? undefined
          : [start.status, ms(start.totalMs)].filter(Boolean).join(", ")
      }
    >
      <dl className="divide-y divide-[var(--hairline)]">
        <Row label={t("Son adres")} value={start.finalUrl} />
        <Row label={t("Durum kodu")} value={start.status} />
        <Row
          label={t("Yönlendirme")}
          value={
            start.redirectHops === null
              ? null
              : t("{count} adım", { count: start.redirectHops })
          }
        />
        <Row label={t("İlk bayt (TTFB)")} value={ms(start.ttfbMs)} />
        <Row label={t("Toplam yanıt")} value={ms(start.totalMs)} />
        <Row
          label={t("HTML boyutu")}
          value={start.htmlBytes === null ? null : formatBytes(start.htmlBytes)}
        />
        <Row
          label={t("Sıkıştırma")}
          value={
            start.status === null ? null : (start.contentEncoding ?? t("Yok"))
          }
        />
        <Row label={t("Önbellek")} value={start.cacheControl} />
        <Row label={t("Sunucu")} value={start.server} />
        <Row label={t("Teknoloji ipucu")} value={start.xPoweredBy} />
      </dl>
    </Panel>
  );
}

function SecurityPanel({ facts }: { facts: Facts }) {
  const { start } = facts;
  const answered = start.status !== null;
  const has = (value: string | boolean | null) =>
    answered ? verdictOf(value !== null && value !== false) : "unknown";
  const verdicts: Verdict[] = [
    verdictOf(facts.httpsRedirect.redirectsToHttps),
    has(start.hsts),
    has(start.cspPresent),
    answered
      ? verdictOf(start.xContentTypeOptions?.toLowerCase() === "nosniff")
      : "unknown",
    answered
      ? verdictOf(
          start.xFrameOptions !== null || start.cspFrameAncestors === true,
        )
      : "unknown",
    has(start.referrerPolicy),
    has(start.permissionsPolicy),
  ];
  return (
    <Panel title={t("Güvenlik başlıkları")} summary={tally(verdicts)}>
      <ul className="divide-y divide-[var(--hairline)]">
        <Check
          label={t("http'den https'e yönlendirme")}
          verdict={verdictOf(facts.httpsRedirect.redirectsToHttps)}
          detail={facts.httpsRedirect.finalUrl}
        />
        <Check
          label="Strict-Transport-Security (HSTS)"
          verdict={has(start.hsts)}
          detail={start.hsts}
        />
        <Check
          label="Content-Security-Policy"
          verdict={has(start.cspPresent)}
        />
        <Check
          label="X-Content-Type-Options"
          verdict={
            answered
              ? verdictOf(
                  start.xContentTypeOptions?.toLowerCase() === "nosniff",
                )
              : "unknown"
          }
          detail={start.xContentTypeOptions}
        />
        <Check
          label={t("Çerçeveye gömme koruması")}
          verdict={
            answered
              ? verdictOf(
                  start.xFrameOptions !== null ||
                    start.cspFrameAncestors === true,
                )
              : "unknown"
          }
          detail={
            start.xFrameOptions ??
            (start.cspFrameAncestors ? "frame-ancestors" : null)
          }
        />
        <Check
          label="Referrer-Policy"
          verdict={has(start.referrerPolicy)}
          detail={start.referrerPolicy}
        />
        <Check
          label="Permissions-Policy"
          verdict={has(start.permissionsPolicy)}
        />
      </ul>
    </Panel>
  );
}

function DomainPanel({
  facts,
  platform,
}: {
  facts: Facts;
  /** A host under a platform's suffix: its registration is the platform's. */
  platform: boolean;
}) {
  const variant = facts.hostVariant;
  const certificateDays = daysLeft(facts.certificate.notAfter);
  return (
    <Panel
      title={t("Alan adı ve sertifika")}
      summary={
        platform
          ? t("Platform alan adı")
          : certificateDays === null
            ? undefined
            : certificateDays < 0
              ? t("Sertifikanın süresi doldu")
              : t("Sertifika {count} gün geçerli", {
                  count: certificateDays,
                })
      }
      note={
        platform
          ? t(
              "Site bir barındırma platformunun alt alan adında; kaydı ve DNS'i platforma ait olduğu için alan adı ve DNS kontrolleri yapılmadı.",
            )
          : t(
              "Sertifika bilgisi herkese açık Certificate Transparency kayıtlarından; alan adı bilgisi RDAP'tan.",
            )
      }
    >
      <dl className="divide-y divide-[var(--hairline)]">
        <Row label={t("Sertifikayı veren")} value={facts.certificate.issuer} />
        <Row
          label={t("Sertifika bitişi")}
          value={expiry(facts.certificate.notAfter)}
        />
        <Row label={t("Alan adı")} value={facts.domain.domain} />
        <Row label={t("Kayıt firması")} value={facts.domain.registrar} />
        <Row
          label={t("Kayıt tarihi")}
          value={
            facts.domain.registeredAt
              ? formatDate(facts.domain.registeredAt)
              : null
          }
        />
        <Row
          label={t("Alan adı bitişi")}
          value={expiry(facts.domain.expiresAt)}
        />
        <Row label={t("Asıl adres")} value={variant?.canonicalHost ?? null} />
        <Row
          label={variant ? variant.alternateHost : t("Diğer adres")}
          value={
            variant?.alternateRedirectsToCanonical === null || !variant
              ? null
              : variant.alternateRedirectsToCanonical
                ? t("Asıl adrese yönleniyor")
                : t("Ayrı açılıyor")
          }
        />
      </dl>
    </Panel>
  );
}

function FilesPanel({ facts }: { facts: Facts }) {
  const { robots, sitemap, notFound } = facts;
  const soft404 =
    notFound.status === null
      ? null
      : notFound.redirectedHome
        ? t("Ana sayfaya yönleniyor")
        : notFound.status === 404 || notFound.status === 410
          ? t("Doğru: {status}", { status: notFound.status })
          : t("Hatalı: {status} dönüyor", { status: notFound.status });
  const verdicts: Verdict[] = [
    robots.status === null ? "unknown" : verdictOf(robots.status === 200),
    verdictOf(robots.hasSitemapLine),
    sitemap.url === null && sitemap.urlCount === null
      ? "unknown"
      : verdictOf(sitemap.url !== null),
    verdictOf(facts.llmsTxt.found),
    verdictOf(facts.securityTxt.found),
    verdictOf(facts.adsTxt.found),
    verdictOf(facts.favicon.found),
  ];
  return (
    <Panel title={t("Dosyalar ve hata sayfası")} summary={tally(verdicts)}>
      <ul className="divide-y divide-[var(--hairline)]">
        <Check
          label="robots.txt"
          verdict={
            robots.status === null
              ? "unknown"
              : verdictOf(robots.status === 200)
          }
          detail={robots.bytes === null ? null : formatBytes(robots.bytes)}
        />
        <Check
          label={t("robots.txt içinde Sitemap satırı")}
          verdict={verdictOf(robots.hasSitemapLine)}
        />
        <Check
          label={t("Site haritası")}
          verdict={
            sitemap.url === null && sitemap.urlCount === null
              ? "unknown"
              : verdictOf(sitemap.url !== null)
          }
          detail={
            sitemap.url
              ? // A null count with a URL: discovery stopped at the crawl
                // limit before counting, which is not the same as empty.
                `${sitemap.url} · ${
                  sitemap.urlCount === null
                    ? t("sayı alınamadı (tarama sınırı)")
                    : sitemap.onHostUrlCount === null
                      ? t("{count} adres", { count: sitemap.urlCount })
                      : t("{count} adres, bu sitede {onHost}", {
                          count: sitemap.urlCount,
                          onHost: formatCount(sitemap.onHostUrlCount),
                        })
                }`
              : null
          }
        />
        <Check label="llms.txt" verdict={verdictOf(facts.llmsTxt.found)} />
        <Check
          label="security.txt"
          verdict={verdictOf(facts.securityTxt.found)}
        />
        <Check label="ads.txt" verdict={verdictOf(facts.adsTxt.found)} />
        <Check
          label="Favicon"
          verdict={verdictOf(facts.favicon.found)}
          detail={facts.favicon.url}
        />
      </ul>
      <dl className="mt-1 border-t border-[var(--hairline)]">
        <Row label={t("Olmayan bir sayfa")} value={soft404} />
      </dl>
    </Panel>
  );
}

export function SiteFactsPanel({
  facts,
  insights,
}: {
  facts: Facts | null;
  insights: AuditInsightsData | undefined;
}) {
  const platform = insights?.platformHost ?? false;
  const missing = facts ? unmeasuredPanels(facts, platform) : null;
  return (
    <div className="grid items-start gap-4 lg:grid-cols-2">
      {facts && missing ? (
        <>
          {missing.server ? null : <ServerPanel facts={facts} />}
          {missing.security ? null : <SecurityPanel facts={facts} />}
          {missing.domain && !platform ? null : (
            <DomainPanel facts={facts} platform={platform} />
          )}
          {missing.files ? null : <FilesPanel facts={facts} />}
          {missing.bots ? null : (
            <BotAccessTable
              access={facts.robots.access}
              robotsRead={facts.robots.status !== null}
            />
          )}
          {missing.dns || platform ? null : <DnsList dns={facts.dns} />}
          <UnmeasuredPanel missing={missing} />
        </>
      ) : (
        <p className="text-sm text-muted lg:col-span-2">
          {t(
            "Bu denetim site bilgisi toplanmadan önce yapılmış. Sunucu, güvenlik başlıkları, DNS ve sertifika bilgisini görmek için denetimi yeniden çalıştırın.",
          )}
        </p>
      )}
      <TagList insights={insights} />
    </div>
  );
}
