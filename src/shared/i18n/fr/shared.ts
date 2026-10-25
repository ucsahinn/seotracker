import type { Catalog } from "@/shared/i18n";

/** French for shared data labels and Google API terminology. */
export const frShared: Catalog = {
  "{start} – {end}. Search Console verisi {count} gün geriden gelir, bu yüzden son gün bugün olmaz.":
    {
      one: "{start} – {end}. Les données de Search Console ont {count} jour de retard ; le dernier jour ne peut donc jamais être aujourd'hui.",
      other:
        "{start} – {end}. Les données de Search Console ont {count} jours de retard ; le dernier jour ne peut donc jamais être aujourd'hui.",
    },
  "TEAM_DOMAIN, https://ekibiniz.cloudflareaccess.com gibi tam bir https adresi olmalı":
    "TEAM_DOMAIN doit être une adresse HTTPS complète, par exemple https://votre-equipe.cloudflareaccess.com",
  'TEAM_DOMAIN, https://ekibiniz.cloudflareaccess.com gibi tam bir https adresi olmalı — "{value}" değerinin başına https:// ekleyin':
    "TEAM_DOMAIN doit être une adresse HTTPS complète, par exemple https://votre-equipe.cloudflareaccess.com — ajoutez https:// au début de « {value} »",
  "Site haritasında var, dizine alındı": "Envoyée et indexée dans le sitemap",
  "Dizine alındı, site haritasında yok": "Indexée, mais absente du sitemap",
  "Dizine alındı, site haritasına eklemeyi düşünün":
    "Indexée ; pensez à l'ajouter à un sitemap",
  "Tarandı, şu an dizine alınmadı": "Explorée, mais pas indexée pour le moment",
  "Keşfedildi, henüz taranmadı": "Découverte, mais pas encore explorée",
  "Yinelenen içerik, canonical belirtilmemiş":
    "Page en double sans URL canonique sélectionnée",
  "Yinelenen içerik, Google başka bir canonical seçti":
    "Page en double ; Google a choisi une autre URL canonique",
  "Yinelenen içerik, gönderilen adres canonical seçilmedi":
    "Page en double ; l'URL envoyée n'a pas été choisie comme URL canonique",
  "Alternatif sayfa, canonical doğru":
    "Page alternative avec une balise canonique correcte",
  "'noindex' etiketiyle dışlandı": "Exclue par la balise noindex",
  "robots.txt engelliyor": "Bloquée par robots.txt",
  "401 nedeniyle engellendi":
    "Bloquée en raison d'une requête non autorisée (401)",
  "403 nedeniyle engellendi": "Bloquée en raison d'un accès interdit (403)",
  "Bulunamadı (404)": "Introuvable (404)",
  "Yumuşak 404": "Erreur 404 logicielle",
  "Yönlendirme yapan sayfa": "Page avec redirection",
  "Sunucu hatası (5xx)": "Erreur serveur (5xx)",
  "Google bu adresi bilmiyor": "Google ne connaît pas cette URL",
  "Giriş sayfaları": "Pages de destination",
  "Ziyaretin başladığı sayfalar: oturum, etkileşim, dönüşüm.":
    "Pages où les visites commencent : sessions, interactions et conversions.",
  "Sayfa performansı": "Pages et écrans",
  "Görüntülenme ve sayfada geçirilen süre.": "Vues et temps passé sur la page.",
  "Trafik kaynakları": "Acquisition du trafic",
  "Ziyaretçiler nereden geliyor.": "D'où viennent vos visiteurs.",
  "Anahtar olaylar": "Événements clés",
  "Dönüşüm saydığınız olaylar ve kaç kişi tetikledi.":
    "Les événements comptés comme conversions et le nombre de personnes qui les ont déclenchés.",
  "E-ticaret": "Commerce en ligne",
  "Ürün ve gelir; mülkte e-ticaret ölçümü varsa dolar.":
    "Articles et revenus ; les données apparaissent si la propriété mesure le commerce en ligne.",
  "Site içi arama": "Recherche sur le site",
  "Ziyaretçilerin sitenizde ne aradığı.":
    "Ce que les visiteurs recherchent sur votre site.",
  "Kitle dağılımı": "Audience",
  "Cihaz, ülke, yeni ve geri dönen ziyaretçi.":
    "Appareils, pays, nouveaux visiteurs et visiteurs connus.",
  "Ana makine adı": "Nom d'hôte",
  "Giriş sayfası": "Page de destination",
  Sayfa: "Page",
  Olay: "Nom de l'événement",
  Kanal: "Canal",
  Kaynak: "Source",
  Ortam: "Support",
  "Kaynak / ortam": "Source / support",
  Kampanya: "Campagne",
  Cihaz: "Appareil",
  Ülke: "Pays",
  "Yeni / geri dönen": "Nouveaux / connus",
  Ürün: "Article",
  "Ürün kodu": "Identifiant de l'article",
  "Arama terimi": "Terme de recherche",
  Tarih: "Date",
  Oturum: "Sessions",
  "Aktif kullanıcı": "Utilisateurs actifs",
  Kullanıcı: "Utilisateurs",
  "Etkileşimli oturum": "Sessions avec interaction",
  "Etkileşim oranı": "Taux d'interaction",
  "Anahtar olay": "Événement clé",
  "Olay oranı": "Taux d'événements clés",
  "Satın alma işlemleri": "Transactions",
  Gelir: "Revenus",
  Görüntülenme: "Vues",
  "Etkileşim süresi": "Durée d'interaction",
  "Ürün görüntüleme": "Articles consultés",
  "Sepete eklenen ürün": "Articles ajoutés au panier",
  "Arama sayısı": "Recherches",
  "Satılan ürün": "Articles achetés",
  "Ürün geliri": "Revenus des articles",
};
