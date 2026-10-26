/**
 * The opt-in checks that leave the crawl: whether the site's outgoing links
 * still lead somewhere, and how heavy its own image files really are.
 *
 * Both are measured with a request to the URL itself after the crawl, never
 * guessed from the markup. A host that turns bots away, a timeout or a
 * refusal is "not measured", never "broken".
 */
import type { AuditIssueDescriptor } from "../audit-issue-types";

export const EXTERNAL_CHECK_ISSUES = {
  "broken-external-link": {
    severity: "warning",
    title: "Başka bir siteye verilen bağlantı kırık",
    explanation:
      "Bu sayfadaki bir bağlantı başka bir sitede açılmayan bir adrese gidiyor: adres 404 ya da başka bir hata veriyor, ya da alan adı artık yok. Ziyaretçi bir hata sayfasına düşer ve sayfanız bakımsız görünür. Botlara kapalı siteler (sosyal ağlar gibi) ve yanıt vermeyen adresler kırık sayılmaz, kontrol edilmemiş sayılır.",
    howToFix:
      "Bağlantıyı hedefin yeni adresine güncelleyin ya da kaldırın. Ayrıntıda hangi adresin hangi yanıtı verdiği yazar.",
  },
  "image-file-too-large": {
    severity: "warning",
    title: "Görsel dosyası çok büyük",
    explanation:
      "Sayfadaki bir ya da daha fazla görsel dosyası 200 KB'tan büyük (ayrıntıda 500 KB'ı geçenler ayrıca sayılır). Boyut, dosyanın kendisine istek gönderilerek ölçüldü. Büyük görseller özellikle mobil bağlantıda sayfayı yavaşlatır.",
    howToFix:
      "Görseli gösterildiği boyuta küçültün, sıkıştırın ve WebP ya da AVIF biçimine çevirin. Çoğu fotoğraf bu işlemden sonra 100 KB'ın altına iner.",
  },
} as const satisfies Record<string, AuditIssueDescriptor>;
