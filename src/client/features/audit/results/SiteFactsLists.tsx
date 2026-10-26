import type { ReactNode } from "react";
import { formatCount } from "@/client/lib/format";
import { t } from "@/shared/i18n";
import { StatusChip } from "./SeverityChip";
import type { AuditInsightsData, AuditResultsData } from "./types";

type Facts = NonNullable<AuditResultsData["siteFacts"]>;

export function Panel({
  title,
  summary,
  note,
  children,
}: {
  title: string;
  /** The panel in a few words ("3/7 var"), so a glance down the grid is enough. */
  summary?: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-box border border-[var(--hairline)] bg-base-100 px-4 py-3">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-sm font-medium">{title}</h3>
        {summary ? (
          <span className="shrink-0 text-xs tabular-nums text-muted">
            {summary}
          </span>
        ) : null}
      </div>
      {note ? <p className="mt-0.5 text-xs text-subtle">{note}</p> : null}
      <div className="mt-2">{children}</div>
    </section>
  );
}

const SEARCH_ENGINES = new Set(["Googlebot", "Bingbot"]);

/**
 * Which crawlers robots.txt lets in. Blocking an AI crawler is a choice,
 * not a mistake, so the words are neutral: "İzinli" / "Engelli".
 */
export function BotAccessTable({
  access,
  robotsRead,
}: {
  access: Facts["robots"]["access"];
  robotsRead: boolean;
}) {
  return (
    <Panel
      title={t("Tarayıcı erişimi (robots.txt)")}
      summary={
        robotsRead && access.length > 0
          ? t("{allowed}/{total} izinli", {
              allowed: formatCount(
                access.filter((entry) => !entry.blocked).length,
              ),
              total: formatCount(access.length),
            })
          : undefined
      }
      note={t(
        "Arama motorları ve yapay zekâ tarayıcıları sitenin ana sayfasını okuyabiliyor mu?",
      )}
    >
      {!robotsRead || access.length === 0 ? (
        <p className="py-2 text-sm text-subtle">{t("Ölçülmedi")}</p>
      ) : (
        <table className="w-full text-sm">
          <tbody className="divide-y divide-[var(--hairline)]">
            {access.map((entry) => (
              <tr key={entry.bot}>
                <td className="py-1.5 font-mono text-xs">{entry.bot}</td>
                <td className="py-1.5 text-xs text-subtle">
                  {SEARCH_ENGINES.has(entry.bot)
                    ? t("Arama motoru")
                    : t("Yapay zekâ")}
                </td>
                <td className="py-1.5 text-right text-xs">
                  {entry.blocked ? (
                    <StatusChip tone="unmeasured">{t("Engelli")}</StatusChip>
                  ) : (
                    <StatusChip tone="passed">{t("İzinli")}</StatusChip>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Panel>
  );
}

export function DnsList({ dns }: { dns: Facts["dns"] }) {
  const types = [...new Set(dns.records.map((record) => record.type))];
  return (
    <Panel
      title={t("DNS kayıtları")}
      note={
        dns.resolved
          ? undefined
          : t("Bazı sorgular yanıt vermedi; liste eksik olabilir.")
      }
    >
      {dns.records.length === 0 ? (
        <p className="py-2 text-sm text-subtle">{t("Ölçülmedi")}</p>
      ) : (
        <dl className="divide-y divide-[var(--hairline)]">
          {types.map((type) => (
            <div
              key={type}
              className="grid grid-cols-[4.5rem_1fr] gap-3 py-1.5"
            >
              <dt className="text-xs font-medium text-muted">{type}</dt>
              <dd className="min-w-0 space-y-0.5">
                {dns.records
                  .filter((record) => record.type === type)
                  .map((record) => (
                    // Wrapped, not cut: an SPF record's tail ("-all"
                    // or "~all") is the part that matters.
                    <span
                      key={record.value}
                      className="block font-mono text-xs [overflow-wrap:anywhere]"
                    >
                      {record.value}
                    </span>
                  ))}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </Panel>
  );
}

/** Analytics tags and schema.org types found across the crawl. */
export function TagList({
  insights,
}: {
  insights: AuditInsightsData | undefined;
}) {
  if (insights === undefined) {
    return <div aria-busy className="skeleton h-40 lg:col-span-2" />;
  }
  return (
    <>
      <Panel
        title={t("Ölçüm etiketleri")}
        note={t(
          "Sayfaların HTML'sinde bulunan Google Analytics ve Etiket Yöneticisi kimlikleri.",
        )}
      >
        {insights.analyticsTags.length === 0 ? (
          <p className="py-2 text-sm text-muted">
            {t("Hiçbir sayfada etiket bulunamadı.")}
          </p>
        ) : (
          <CountList
            rows={insights.analyticsTags.map((row) => ({
              key: row.tagId,
              pages: row.pages,
            }))}
          />
        )}
      </Panel>
      <Panel
        title={t("Yapılandırılmış veri türleri")}
        note={t("Sayfaların JSON-LD ile bildirdiği schema.org türleri.")}
      >
        {insights.schemaTypes.length === 0 ? (
          <p className="py-2 text-sm text-muted">
            {t("Hiçbir sayfada yapılandırılmış veri bulunamadı.")}
          </p>
        ) : (
          <CountList
            rows={insights.schemaTypes.map((row) => ({
              key: row.schemaType,
              pages: row.pages,
            }))}
          />
        )}
      </Panel>
    </>
  );
}

function CountList({ rows }: { rows: { key: string; pages: number }[] }) {
  return (
    <ul className="divide-y divide-[var(--hairline)]">
      {rows.slice(0, 12).map((row) => (
        <li
          key={row.key}
          className="flex items-center justify-between gap-3 py-1.5"
        >
          <span className="min-w-0 truncate font-mono text-xs">{row.key}</span>
          <span className="shrink-0 text-xs tabular-nums text-muted">
            {t("{count} sayfa", { count: formatCount(row.pages) })}
          </span>
        </li>
      ))}
    </ul>
  );
}

const PANEL_KEYS = [
  "server",
  "security",
  "domain",
  "files",
  "bots",
  "dns",
] as const;
type PanelKey = (typeof PANEL_KEYS)[number];

/**
 * Which panels had nothing at all to show. A panel of ten "Ölçülmedi" rows
 * says one thing ten times; these fold into one list that says it once.
 */
export function unmeasuredPanels(
  facts: Facts,
  platform: boolean,
): Record<PanelKey, boolean> {
  const { start, certificate, domain } = facts;
  return {
    server: start.status === null,
    security:
      start.status === null && facts.httpsRedirect.redirectsToHttps === null,
    domain:
      certificate.issuer === null &&
      certificate.notAfter === null &&
      domain.domain === null &&
      domain.registrar === null &&
      domain.expiresAt === null &&
      facts.hostVariant === null,
    files:
      facts.robots.status === null &&
      facts.sitemap.url === null &&
      facts.llmsTxt.found === null &&
      facts.favicon.found === null &&
      facts.notFound.status === null,
    bots: facts.robots.status === null || facts.robots.access.length === 0,
    // Not asked for a platform host, so not "could not be measured" either.
    dns: !platform && facts.dns.records.length === 0,
  };
}

/** Turkish source text; shown through t(). */
const PANEL_TITLE: Record<PanelKey, string> = {
  server: "Sunucu ve yanıt",
  security: "Güvenlik başlıkları",
  domain: "Alan adı ve sertifika",
  files: "Dosyalar ve hata sayfası",
  bots: "Tarayıcı erişimi (robots.txt)",
  dns: "DNS kayıtları",
};

/** The panels with nothing to show, folded into one list that says why once. */
export function UnmeasuredPanel({
  missing,
}: {
  missing: Record<PanelKey, boolean>;
}) {
  const keys = PANEL_KEYS.filter((key) => missing[key]);
  if (keys.length === 0) return null;
  return (
    <Panel
      title={t("Ölçülemedi")}
      note={t(
        "Site ya da kayıt servisi denetim sırasında bu bilgilere yanıt vermedi. Sitenizde bir sorun olduğu anlamına gelmez; denetimi yeniden çalıştırınca tekrar sorulur.",
      )}
    >
      <ul className="flex flex-wrap gap-1.5 py-1">
        {keys.map((key) => (
          <li key={key}>
            <StatusChip tone="unmeasured">{t(PANEL_TITLE[key])}</StatusChip>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
