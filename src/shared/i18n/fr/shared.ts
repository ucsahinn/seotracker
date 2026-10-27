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
  "Site haritasında var, dizine alındı": "Envoyée et indexée",
  "Dizine alındı, site haritasında yok":
    "Indexée, mais non envoyée via un sitemap",
  "Dizine alındı, site haritasına eklemeyi düşünün":
    "Indexée ; pensez à l'ajouter à un sitemap",
  "Tarandı, şu an dizine alınmadı": "Explorée, actuellement non indexée",
  "Keşfedildi, henüz taranmadı": "Détectée, actuellement non indexée",
  "Yinelenen içerik, canonical belirtilmemiş":
    "Page en double sans URL canonique sélectionnée par l'utilisateur",
  "Yinelenen içerik, Google başka bir canonical seçti":
    "Page en double : Google n'a pas choisi la même URL canonique que l'utilisateur",
  "Yinelenen içerik, gönderilen adres canonical seçilmedi":
    "Page en double : l'URL envoyée n'a pas été sélectionnée comme URL canonique",
  "Alternatif sayfa, canonical doğru":
    "Autre page avec balise canonique correcte",
  "'noindex' etiketiyle dışlandı": "Exclue par la balise « noindex »",
  "robots.txt engelliyor": "Bloquée par robots.txt",
  "401 nedeniyle engellendi":
    "Bloquée en raison d'une requête non autorisée (401)",
  "403 nedeniyle engellendi": "Bloquée en raison d'un accès interdit (403)",
  "Bulunamadı (404)": "Introuvable (404)",
  "Yumuşak 404": "Soft 404",
  "Yönlendirme yapan sayfa": "Page avec redirection",
  "Sunucu hatası (5xx)": "Erreur serveur (5xx)",
  "Google bu adresi bilmiyor": "Google ne connaît pas cette URL",
  "Giriş sayfaları": "Pages de destination",
  "Ziyaretin başladığı sayfalar: oturum, etkileşim, dönüşüm.":
    "Pages où les visites commencent : sessions, engagement et conversions.",
  "Sayfa performansı": "Pages et écrans",
  "Görüntülenme ve sayfada geçirilen süre.": "Vues et temps passé sur la page.",
  "Trafik kaynakları": "Acquisition du trafic",
  "Ziyaretçiler nereden geliyor.": "D'où viennent vos visiteurs.",
  "Anahtar olaylar": "Événements clés",
  "Dönüşüm saydığınız olaylar ve kaç kişi tetikledi.":
    "Les événements comptés comme conversions et le nombre de personnes qui les ont déclenchés.",
  "E-ticaret": "E-commerce",
  "Ürün ve gelir; mülkte e-ticaret ölçümü varsa dolar.":
    "Articles et revenus ; les données apparaissent si la propriété mesure l'e-commerce.",
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
  "Etkileşimli oturum": "Sessions avec engagement",
  "Etkileşim oranı": "Taux d'engagement",
  "Anahtar olay": "Événements clés",
  "Olay oranı": "Taux d'événements clés",
  "Satın alma işlemleri": "Transactions",
  Gelir: "Revenus",
  Görüntülenme: "Vues",
  "Etkileşim süresi": "Durée d'engagement",
  "Ürün görüntüleme": "Articles consultés",
  "Sepete eklenen ürün": "Articles ajoutés au panier",
  "Arama sayısı": "Recherches",
  "Satılan ürün": "Articles achetés",
  "Ürün geliri": "Revenus des articles",
  "Okunan kaynakta bu dönem için kayıt bulunmadı.":
    "La source consultée n’a renvoyé aucun enregistrement pour cette période.",
  "Kaynak satır sınırına ulaştı; sonuçlar yalnızca okunan kayıtları kapsar.":
    "La limite de lignes de la source a été atteinte ; les résultats couvrent uniquement les données lues.",
  "Kaynak isteği başarısız; bu bölümün verisi alınamadı.":
    "La requête à la source a échoué ; les données de cette section n’ont pas pu être récupérées.",
  "Kaynak saklama süresi bu karşılaştırmanın tamamını kapsamıyor.":
    "La durée de conservation de la source ne couvre pas toute cette comparaison.",
  "Kaynak durumu kaydedilmemiş.": "L’état de la source n’a pas été enregistré.",
  "Bu rapor GA4 oturum veya gelir raporu değildir.":
    "Ce document n’est pas un rapport de sessions ou de revenus GA4.",
  "Search Console sayfa trafiği": "Trafic par page Search Console",
  "Dönem: {start} – {end} (Pasifik). Okunan sayfa satırı: {rows}.":
    "Période : {start} – {end} (heure du Pacifique). Lignes de pages lues : {rows}.",
  "Mülk: {property}. Alınma zamanı: {time}. Satır sınırı: {limit}.":
    "Propriété : {property}. Récupération : {time}. Limite de lignes : {limit}.",
  "Kaynak ayrıntıları bu kayıtta mevcut değil.":
    "Les détails de la source ne sont pas disponibles dans cet enregistrement.",
  "Search Console sayfa trafiği alınamadı; trafik yokluğu sonucu çıkarılamaz.":
    "Le trafic par page Search Console n’a pas pu être récupéré ; cela ne prouve pas une absence de trafic.",
  "Gerçek kullanıcı hızı": "Vitesse des utilisateurs réels",
  "Mobil CrUX: {url}. Kaydedilen PageSpeed ölçümü: {time}. Sayfa ve origin kapsamları ayrı gösterilir; kayan 28 günlük veri denetim süresi değildir.":
    "CrUX mobile : {url}. Mesure PageSpeed enregistrée : {time}. Les périmètres page et origine sont distincts ; les données glissantes sur 28 jours ne correspondent pas à la durée de l’audit.",
  "Bu kayıtta kullanılabilir CrUX verisi yok; laboratuvar ölçümü gerçek kullanıcı ölçümü değildir.":
    "Cet enregistrement ne contient aucune donnée CrUX exploitable ; une mesure en laboratoire n’est pas une mesure d’utilisateurs réels.",
  "Harita keşif toplamları Anlık veri bölümündedir. Harita kapsamı oranı yalnızca taranan sayfaları kullanır; tüm harita adreslerinin tarandığını göstermez.":
    "Les totaux découverts du sitemap figurent dans les données instantanées. Le taux de couverture porte uniquement sur les pages explorées ; il ne prouve pas que toutes les URL du sitemap ont été explorées.",
  "Taranan {count} sayfanın {inMap} tanesi ({percent}) site haritasında. Bu oran taranan sayfalara aittir; keşfedilen harita adreslerinin toplamı mevcutsa Anlık veri bölümünde ayrıca gösterilir.":
    "Sur {count} pages explorées, {inMap} ({percent}) figurent dans le sitemap. Ce taux concerne les pages explorées ; le total des URL découvertes est présenté séparément dans les données instantanées, si disponible.",
  "Kaydedilen mobil PageSpeed ölçümü: {time}.":
    "Mesure PageSpeed mobile enregistrée : {time}.",
  "Rapor hazırlanırken veriler sunucudan yeniden okundu; Google geçmiş değerleri düzeltebilir. Aynı dönem etiketi önceki ekran görüntüsüyle birebir ölçüm eşitliğini garanti etmez. Aynı kaynak yeniden hazırlanırsa kayıt güncellenir; rapor dili değişebilir.":
    "Les données ont été relues depuis le serveur ; Google peut réviser les valeurs historiques. Le même libellé de période ne garantit pas des mesures identiques à une capture antérieure. Régénérer la même source met à jour l’enregistrement ; la langue du rapport peut changer.",
  "Okunan sayfalarda güç kaybı koşulunu sağlayan kayıt bulunmadı.":
    "Aucune des pages lues ne remplit le critère de baisse.",
  "Kaydedilmiş harita keşif toplamı mevcut değil; kapsam oranı yalnızca taranan sayfaları kullanır.":
    "Aucun total d’URL découvertes dans le sitemap n’a été enregistré ; le taux de couverture utilise uniquement les pages explorées.",
};
