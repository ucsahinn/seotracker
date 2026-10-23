import type { AuditTab } from "@/types/schemas/audit";

/**
 * One sentence under each tab that says which question it answers, so the
 * four tabs read as four different questions instead of four views of one list.
 */
const INTRO: Record<AuditTab, string> = {
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
  return <p className="max-w-prose text-sm text-muted">{INTRO[tab]}</p>;
}
