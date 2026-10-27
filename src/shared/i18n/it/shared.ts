import type { Catalog } from "@/shared/i18n";

/** Italian for shared labels, Google states, and GA4 report names. */
export const itShared: Catalog = {
  "{start} – {end}. Search Console verisi {count} gün geriden gelir, bu yüzden son gün bugün olmaz.":
    {
      one: "{start} – {end}. I dati di Search Console arrivano con {count} giorno di ritardo, quindi l'ultimo giorno non è mai oggi.",
      other:
        "{start} – {end}. I dati di Search Console arrivano con {count} giorni di ritardo, quindi l'ultimo giorno non è mai oggi.",
    },
  "TEAM_DOMAIN, https://ekibiniz.cloudflareaccess.com gibi tam bir https adresi olmalı":
    "TEAM_DOMAIN deve essere un indirizzo https completo, ad esempio https://your-team.cloudflareaccess.com",
  'TEAM_DOMAIN, https://ekibiniz.cloudflareaccess.com gibi tam bir https adresi olmalı — "{value}" değerinin başına https:// ekleyin':
    'TEAM_DOMAIN deve essere un indirizzo https completo, ad esempio https://your-team.cloudflareaccess.com — aggiungi https:// all’inizio di "{value}"',
  "Site haritasında var, dizine alındı": "Inviato nella sitemap e indicizzato",
  "Dizine alındı, site haritasında yok":
    "Indicizzato, non inviato nella sitemap",
  "Dizine alındı, site haritasına eklemeyi düşünün":
    "Indicizzato; valuta di aggiungerlo a una sitemap",
  "Tarandı, şu an dizine alınmadı": "Scansionato, al momento non indicizzato",
  "Keşfedildi, henüz taranmadı": "Rilevato, al momento non indicizzato",
  "Yinelenen içerik, canonical belirtilmemiş":
    "Duplicato senza canonical selezionato dall’utente",
  "Yinelenen içerik, Google başka bir canonical seçti":
    "Duplicato: Google ha scelto un canonical diverso",
  "Yinelenen içerik, gönderilen adres canonical seçilmedi":
    "Duplicato: l’URL inviato non è stato scelto come canonical",
  "Alternatif sayfa, canonical doğru":
    "Pagina alternativa con tag canonical corretto",
  "'noindex' etiketiyle dışlandı": "Escluso dal tag 'noindex'",
  "robots.txt engelliyor": "Bloccato da robots.txt",
  "401 nedeniyle engellendi": "Bloccato per richiesta non autorizzata (401)",
  "403 nedeniyle engellendi": "Bloccato per accesso vietato (403)",
  "Bulunamadı (404)": "Non trovato (404)",
  "Yumuşak 404": "Soft 404",
  "Yönlendirme yapan sayfa": "Pagina con reindirizzamento",
  "Sunucu hatası (5xx)": "Errore del server (5xx)",
  "Google bu adresi bilmiyor": "URL sconosciuto a Google",
  "Giriş sayfaları": "Pagine di destinazione",
  "Ziyaretin başladığı sayfalar: oturum, etkileşim, dönüşüm.":
    "Pagine in cui iniziano le visite: sessioni, coinvolgimento, conversioni.",
  "Sayfa performansı": "Pagine e schermate",
  "Görüntülenme ve sayfada geçirilen süre.":
    "Visualizzazioni e tempo trascorso sulla pagina.",
  "Trafik kaynakları": "Acquisizione del traffico",
  "Ziyaretçiler nereden geliyor.": "Da dove arrivano i visitatori.",
  "Anahtar olaylar": "Eventi chiave",
  "Dönüşüm saydığınız olaylar ve kaç kişi tetikledi.":
    "Gli eventi conteggiati come conversioni e il numero di persone che li hanno attivati.",
  "E-ticaret": "E-commerce",
  "Ürün ve gelir; mülkte e-ticaret ölçümü varsa dolar.":
    "Articoli e ricavi; i dati compaiono se la proprietà misura l’e-commerce.",
  "Site içi arama": "Ricerca nel sito",
  "Ziyaretçilerin sitenizde ne aradığı.":
    "Cosa cercano i visitatori sul tuo sito.",
  "Kitle dağılımı": "Pubblico",
  "Cihaz, ülke, yeni ve geri dönen ziyaretçi.":
    "Dispositivo, paese, visitatori nuovi e di ritorno.",
  "Ana makine adı": "Nome host",
  "Giriş sayfası": "Pagina di destinazione",
  Sayfa: "Pagina",
  Olay: "Nome evento",
  Kanal: "Canale",
  Kaynak: "Sorgente",
  Ortam: "Mezzo",
  "Kaynak / ortam": "Sorgente / mezzo",
  Kampanya: "Campagna",
  Cihaz: "Dispositivo",
  Ülke: "Paese",
  "Yeni / geri dönen": "Nuovi / di ritorno",
  Ürün: "Articolo",
  "Ürün kodu": "ID articolo",
  "Arama terimi": "Termine di ricerca",
  Tarih: "Data",
  Oturum: "Sessioni",
  "Aktif kullanıcı": "Utenti attivi",
  Kullanıcı: "Utenti",
  "Etkileşimli oturum": "Sessioni con coinvolgimento",
  "Etkileşim oranı": "Tasso di coinvolgimento",
  "Anahtar olay": "Eventi chiave",
  "Olay oranı": "Tasso di eventi chiave",
  "Satın alma işlemleri": "Transazioni",
  Gelir: "Ricavi",
  Görüntülenme: "Visualizzazioni",
  "Etkileşim süresi": "Tempo di coinvolgimento",
  "Ürün görüntüleme": "Articoli visualizzati",
  "Sepete eklenen ürün": "Articoli aggiunti al carrello",
  "Arama sayısı": "Ricerche",
  "Satılan ürün": "Articoli acquistati",
  "Ürün geliri": "Ricavi degli articoli",
};
