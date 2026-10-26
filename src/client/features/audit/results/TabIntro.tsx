import type { AuditTab } from "@/types/schemas/audit";
import { t } from "@/shared/i18n";

/**
 * One sentence under each tab that says which question it answers, so the
 * tabs read as different questions instead of views of one list.
 */
const INTRO: Record<AuditTab, string> = {
  todo: "Yapılacak her iş tek listede, en çok kazandıranı üstte. Search Console bağlıysa trafik getiren sayfalardaki işler öne çıkar.",
  checks:
    "Denetimin yaptığı her kontrol, kategorisine göre: geçenler, kalanlar ve ölçülemeyenler.",
  facts:
    "Siteniz hakkında denetim anında toplanan bilgiler: sunucu, güvenlik başlıkları, DNS, sertifika, robots.txt ve gerçek kullanıcı hızı.",
  issues:
    "Sitenizde düzeltmeniz gereken her şey, önem sırasına göre. Bir satıra tıklayın. Neden önemli olduğunu, nasıl düzelteceğinizi ve hangi sayfaların etkilendiğini adresleriyle görürsünüz.",
  pages:
    "Taranan her sayfa ve sunucunun ona verdiği yanıt. Hatalı, yavaş ya da derinde kalmış sayfaları buradan bulun.",
  index:
    "Google bu sayfaları gerçekten dizinine almış mı? Almadıysa nedenini burada görürsünüz.",
  performance:
    "Sayfalarınız telefonda ve bilgisayarda ne kadar hızlı açılıyor? Ölçüm, Google'ın kullandığı Lighthouse ile yapılır.",
};

export function TabIntro({ tab }: { tab: AuditTab }) {
  return <p className="max-w-prose text-sm text-muted">{t(INTRO[tab])}</p>;
}
