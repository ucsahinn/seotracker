import type { Catalog } from "@/shared/i18n";

/** German for shared data labels and Google API terminology. */
export const deShared: Catalog = {
  "{start} – {end}. Search Console verisi {count} gün geriden gelir, bu yüzden son gün bugün olmaz.":
    {
      one: "{start} – {end}. Die Search-Console-Daten liegen {count} Tag zurück, deshalb ist der letzte Tag nie heute.",
      other:
        "{start} – {end}. Die Search-Console-Daten liegen {count} Tage zurück, deshalb ist der letzte Tag nie heute.",
    },
  "TEAM_DOMAIN, https://ekibiniz.cloudflareaccess.com gibi tam bir https adresi olmalı":
    "TEAM_DOMAIN muss eine vollständige HTTPS-Adresse sein, zum Beispiel https://ihr-team.cloudflareaccess.com",
  'TEAM_DOMAIN, https://ekibiniz.cloudflareaccess.com gibi tam bir https adresi olmalı — "{value}" değerinin başına https:// ekleyin':
    'TEAM_DOMAIN muss eine vollständige HTTPS-Adresse sein, zum Beispiel https://ihr-team.cloudflareaccess.com — fügen Sie https:// am Anfang von "{value}" ein',
  "Site haritasında var, dizine alındı":
    "In der Sitemap eingereicht und indexiert",
  "Dizine alındı, site haritasında yok":
    "Indexiert, nicht in der Sitemap eingereicht",
  "Dizine alındı, site haritasına eklemeyi düşünün":
    "Indexiert; fügen Sie die Seite gegebenenfalls einer Sitemap hinzu",
  "Tarandı, şu an dizine alınmadı": "Gecrawlt – zurzeit nicht indexiert",
  "Keşfedildi, henüz taranmadı": "Gefunden – zurzeit nicht indexiert",
  "Yinelenen içerik, canonical belirtilmemiş":
    "Duplikat ohne ausgewählte Canonical-URL",
  "Yinelenen içerik, Google başka bir canonical seçti":
    "Duplikat; Google hat eine andere Canonical-URL gewählt",
  "Yinelenen içerik, gönderilen adres canonical seçilmedi":
    "Duplikat; die eingereichte URL wurde nicht als Canonical ausgewählt",
  "Alternatif sayfa, canonical doğru":
    "Alternative Seite mit korrektem Canonical-Tag",
  "'noindex' etiketiyle dışlandı": "Durch das noindex-Tag ausgeschlossen",
  "robots.txt engelliyor": "Durch robots.txt blockiert",
  "401 nedeniyle engellendi":
    "Wegen nicht autorisierter Anfrage blockiert (401)",
  "403 nedeniyle engellendi":
    "Wegen fehlender Zugriffsberechtigung blockiert (403)",
  "Bulunamadı (404)": "Nicht gefunden (404)",
  "Yumuşak 404": "Soft-404",
  "Yönlendirme yapan sayfa": "Seite mit Weiterleitung",
  "Sunucu hatası (5xx)": "Serverfehler (5xx)",
  "Google bu adresi bilmiyor": "Google ist diese URL nicht bekannt",
  "Giriş sayfaları": "Landingpages",
  "Ziyaretin başladığı sayfalar: oturum, etkileşim, dönüşüm.":
    "Seiten, auf denen Besuche beginnen: Sitzungen, Interaktionen und Conversions.",
  "Sayfa performansı": "Seiten und Bildschirme",
  "Görüntülenme ve sayfada geçirilen süre.":
    "Aufrufe und Verweildauer auf der Seite.",
  "Trafik kaynakları": "Traffic-Akquisition",
  "Ziyaretçiler nereden geliyor.": "Woher Ihre Besucher kommen.",
  "Anahtar olaylar": "Schlüsselereignisse",
  "Dönüşüm saydığınız olaylar ve kaç kişi tetikledi.":
    "Die Ereignisse, die als Conversions zählen, und wie oft sie ausgelöst wurden.",
  "E-ticaret": "E-Commerce",
  "Ürün ve gelir; mülkte e-ticaret ölçümü varsa dolar.":
    "Produkte und Umsatz; Daten erscheinen, wenn die Property E-Commerce erfasst.",
  "Site içi arama": "Interne Suche",
  "Ziyaretçilerin sitenizde ne aradığı.":
    "Wonach Besucher auf Ihrer Website suchen.",
  "Kitle dağılımı": "Zielgruppe",
  "Cihaz, ülke, yeni ve geri dönen ziyaretçi.":
    "Geräte, Länder sowie neue und wiederkehrende Besucher.",
  "Ana makine adı": "Hostname",
  "Giriş sayfası": "Landingpage",
  Sayfa: "Seite",
  Olay: "Ereignisname",
  Kanal: "Kanal",
  Kaynak: "Quelle",
  Ortam: "Medium",
  "Kaynak / ortam": "Quelle / Medium",
  Kampanya: "Kampagne",
  Cihaz: "Gerät",
  Ülke: "Land",
  "Yeni / geri dönen": "Neu / wiederkehrend",
  Ürün: "Artikel",
  "Ürün kodu": "Artikel-ID",
  "Arama terimi": "Suchbegriff",
  Tarih: "Datum",
  Oturum: "Sitzungen",
  "Aktif kullanıcı": "Aktive Nutzer",
  Kullanıcı: "Nutzer",
  "Etkileşimli oturum": "Sitzungen mit Interaktionen",
  "Etkileşim oranı": "Interaktionsrate",
  "Anahtar olay": "Schlüsselereignisse",
  "Olay oranı": "Schlüsselereignisrate",
  "Satın alma işlemleri": "Transaktionen",
  Gelir: "Umsatz",
  Görüntülenme: "Aufrufe",
  "Etkileşim süresi": "Interaktionsdauer",
  "Ürün görüntüleme": "Angesehene Artikel",
  "Sepete eklenen ürün": "In den Warenkorb gelegte Artikel",
  "Arama sayısı": "Suchvorgänge",
  "Satılan ürün": "Gekaufte Artikel",
  "Ürün geliri": "Artikelumsatz",
};
