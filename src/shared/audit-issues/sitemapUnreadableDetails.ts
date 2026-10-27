/**
 * The evidence line of a `sitemap-unreadable` finding: why the named sitemap
 * document gave no addresses (discovery.ts `SitemapFailureReason`).
 *
 * Its own module so details.ts stays under the line ceiling; the reason
 * codes are stored, the sentence is built in the reader's language.
 */
import type { DetailLine } from "./details";
import { t } from "../i18n";

// Turkish source text; t() runs when the line is built.
const REASON: Record<string, string> = {
  status: "Sunucu HTTP {status} döndürdü",
  timeout: "Sunucu zamanında yanıt vermedi (zaman aşımı, yeniden denendi)",
  network: "Bağlantı kurulamadı (ağ hatası, yeniden denendi)",
  off_site: "Başka bir siteye ya da döngüye yönlendiriyor",
  not_xml: "Dönen içerik site haritası XML'i değil",
  empty: "Dosya okundu ama hiç adres listelemiyor",
};

/** Null when the stored reason is not one this version knows. */
export function sitemapUnreadableLines(
  details: Record<string, unknown>,
): DetailLine[] | null {
  const why =
    typeof details.reason === "string" ? REASON[details.reason] : undefined;
  if (!why) return null;
  const status =
    typeof details.statusCode === "number" ? String(details.statusCode) : "?";
  const lines: DetailLine[] = [
    { label: t("Neden"), value: t(why, { status }) },
  ];
  if (typeof details.count === "number") {
    lines.push({
      label: null,
      value: t("Toplam {count} site haritası dosyası okunamadı", {
        count: details.count,
      }),
    });
  }
  return lines;
}
