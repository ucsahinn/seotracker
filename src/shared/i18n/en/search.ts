import type { Catalog } from "@/shared/i18n";

/**
 * English for: src/client/features/search-performance, rankings, opportunities.
 * Keys are the Turkish source strings exactly as passed to t().
 * Google concepts use Search Console's own English UI names.
 */
export const enSearch: Catalog = {
  // search-performance/searchAppearance.ts (Search Console's own English names)
  "AMP sayfası": "AMP article",
  "AMP haber kutusu": "AMP top stories",
  "AMP hikayesi": "AMP story",
  "Gezinme yolu (breadcrumb)": "Breadcrumb",
  "Etkinlik ayrıntısı": "Event details",
  "Etkinlik listesi": "Event listing",
  "Sık sorulan sorular": "FAQ",
  "Nasıl yapılır": "How-to",
  "İş ilanı ayrıntısı": "Job details",
  "İş ilanı listesi": "Job listing",
  "Ürün listesi": "Merchant listings",
  "Ürün özeti": "Product snippets",
  "Alıştırma sorusu": "Practice problems",
  "Matematik çözücü": "Math solvers",
  "Tarif kutusu": "Recipe feature",
  "Tarif özeti": "Recipe rich snippet",
  "Değerlendirme özeti": "Review snippet",
  "Site içi arama kutusu": "Sitelinks search box",
  "Soru ve cevap": "Q&A",
  "Video bölümleri": "Video chapters",
  "Web hikayesi": "Web story",
  "Ücretsiz alışveriş listesi": "Shopping listings",
  "Çevrilmiş sonuç": "Translated result",
  "Diğer görünümler": "Other appearances",
  // search-performance/tabBuckets.ts
  "Sayfanın en üstü": "Top of the page",
  "İlk sayfanın geri kalanı": "Rest of page one",
  "İkinci sayfa": "Page two",
  "21 ve sonrası": "21 and beyond",
  "Pek görülmeyen yerler": "Rarely seen",
  "Hiç tıklanmayan": "No clicks",
  "Görünüyor ama açılmıyor": "Seen but not opened",
  "1-9 tıklama": "1-9 clicks",
  "10-99 tıklama": "10-99 clicks",
  "100+ tıklama": "100+ clicks",
  "Trafiği taşıyanlar": "The ones carrying traffic",
  "Sıra 5-10": "Position 5-10",
  "Sıra 11-20": "Position 11-20",
  "İlk sayfanın alt yarısı": "Bottom half of page one",
  // search-performance/tabHints.ts
  "Ortalama sırası 5 ile 20 arasında olan sorgular. 5-10 arası ilk sayfanın alt yarısı, 11-20 ikinci sayfa; küçük bir iyileştirme ikisini de üste taşıyabilir. Gösterime göre sıralı.":
    "Queries with an average position between 5 and 20. Positions 5-10 are the bottom half of page one, 11-20 are page two; a small improvement can lift either to the top. Sorted by impressions.",
  "İnsanların sizi hangi aramalarla bulduğu; her sorgunun tıklama, gösterim ve ortalama sırasıyla.":
    "The searches people find you with, each with its clicks, impressions and average position.",
  "Google'da en çok görünen ve tıklanan sayfalarınız.":
    "Your pages that show up and get clicked most on Google.",
  "Aynı arama için birden fazla sayfanızın birbiriyle yarıştığı yerler.":
    "Where several of your pages compete with each other for the same search.",
  // search-performance/strikingEmptyCopy.ts
  "Bu gruba uyan sorgu yok": "No queries in this group",
  "Seçimi kaldırarak sıra 5-20 arasındaki tüm sorgulara dönün.":
    "Clear the selection to go back to every query in positions 5-20.",
  "Bu dönemde 5-20. sırada kelime yok":
    "No keywords in positions 5-20 this period",
  "Hiçbir kelimeniz 5-20. sırada değil. Bu aralıktaki kelimeler küçük bir iyileştirmeyle üst sıralara çıkabilir; olunca burada listelenir.":
    "None of your keywords are in positions 5-20. Keywords in this range can climb higher with a small improvement; when there are some, they are listed here.",
  "Bu seçimde sorgu verisi yok": "No query data for this selection",
  "Seçili ülke ya da cihaz için Search Console sorgu verisi paylaşmadı. Filtreyi kaldırarak tüm trafiğe bakın.":
    "Search Console shared no query data for the selected country or device. Clear the filter to see all traffic.",
  "Kelime düzeyinde veri henüz gelmedi": "No keyword-level data yet",
  "Search Console, hangi kelimeyle arandığınızı bu dönem için henüz paylaşmadı. Az trafikli sitelerde bu normaldir. Veri gelince 5-20. sıradaki kelimeler burada listelenir.":
    "Search Console has not yet shared which keywords people searched for in this period. This is normal for low-traffic sites. Once data arrives, keywords in positions 5-20 are listed here.",
  // search-performance/deviceShare.ts (Search Console: Mobile, Desktop, Tablet)
  Mobil: "Mobile",
  Bilgisayar: "Desktop",
  "Akıllı TV": "Smart TV",
  // search-performance/TotalsCards.tsx
  "{value} puan": "{value} pp",
  "{start} - {end} dönemine göre": "Compared with {start} - {end}",
  Tıklama: "Clicks",
  Gösterim: "Impressions",
  "Tıklama oranı": "CTR",
  "Gösterimlerin yüzde kaçı tıklamaya döndü.":
    "The share of impressions that turned into a click.",
  "Ortalama sıra": "Average position",
  "Düşük sayı daha iyi: 1, listenin en üstü demek.":
    "Lower is better: 1 means the top of the results.",
  // search-performance/DeviceBreakdown.tsx, SearchAppearanceBreakdown.tsx
  Cihazlar: "Devices",
  "Tıklamaların hangi cihazlardan geldiği. Bir cihaza tıklayarak tüm sayfayı o cihaza göre daraltabilirsiniz.":
    "Which devices the clicks came from. Click a device to narrow the whole page to it.",
  tıklama: "clicks",
  gösterim: "impressions",
  "Arama görünümü": "Search appearance",
  "Sonuçlarınızın Google'da hangi özel biçimlerle göründüğü (tıklama sayısına göre). Google bu dökümü başka bir ölçüyle birleştirmez.":
    "Which special formats your results appeared in on Google (by clicks). Google does not combine this breakdown with any other dimension.",
  "Sonuçlarınızın Google'da hangi özel biçimlerle göründüğü (gösterim sayısına göre). Google bu dökümü başka bir ölçüyle birleştirmez.":
    "Which special formats your results appeared in on Google (by impressions). Google does not combine this breakdown with any other dimension.",
  // search-performance/SearchFilters.tsx
  "Son 7 gün": "Last 7 days",
  "Son 28 gün": "Last 28 days",
  "Son 3 ay": "Last 3 months",
  Görsel: "Image",
  Haber: "News",
  "Arama türü": "Search type",
  "Cihaz filtresi": "Device filter",
  "Tüm cihazlar": "All devices",
  "Ülke filtresi": "Country filter",
  "Tüm ülkeler": "All countries",
  "Tarih aralığı": "Date range",
  // search-performance/QuickFilterBar.tsx
  "İlk 10'da": "In the top 10",
  "Ortalama sırası 10 veya daha iyi olanlar; yani Google'ın ilk sayfası.":
    "Average position 10 or better, meaning Google's first page.",
  "Gösterilmiş ama bir kez bile tıklanmamış satırlar.":
    "Rows that were shown but never clicked.",
  "Tıklama oranı düşük": "Low CTR",
  "İlk sayfada olup {impressions} veya daha fazla gösterim alan ve tıklama oranı {ctr} altında kalan satırlar. Başlığı ve açıklamayı iyileştirmeye değer.":
    "Rows on page one with {impressions} or more impressions and a CTR below {ctr}. Their title and description are worth improving.",
  Tıklanan: "Clicked",
  "En az bir tıklama almış satırlar.": "Rows with at least one click.",
  "İlk sayfanın alt yarısı. Küçük bir iyileştirme ilk üçe taşıyabilir.":
    "The bottom half of page one. A small improvement can lift these into the top three.",
  "İkinci sayfa. İlk sayfaya girmek tıklamayı en çok artıran adımdır.":
    "Page two. Reaching page one is the step that adds the most clicks.",
  "Hızlı filtreler": "Quick filters",
  // search-performance/CountryBreakdown.tsx
  Ülkeler: "Countries",
  "{country} filtresini kaldır": "Remove {country} filter",
  "Tıklamaların hangi ülkelerden geldiği. Halkadan ya da tablodan bir ülkeye tıklayarak tüm sayfayı o ülkeye göre daraltabilirsiniz.":
    "Which countries the clicks came from. Click a country in the ring or the table to narrow the whole page to it.",
  "Diğer ülkeler": "Other countries",
  Ülke: "Country",
  Dağılım: "Distribution",
  Pay: "Share",
  "Ort. sıra": "Avg. position",
  "{count} ülke daha": {
    one: "{count} more country",
    other: "{count} more countries",
  },
  "Toplam {total} tıklamanın {share} kadarı {country} kaynaklı.":
    "{share} of {total} clicks came from {country}.",
  "Toplam {count} tıklama.": {
    one: "{count} click in total.",
    other: "{count} clicks in total.",
  },
  // search-performance/SearchPerformanceColumns.tsx
  Sıra: "Position",
  "{value} için işlemler": "Actions for {value}",
  "Sayfayı yeni sekmede aç": "Open page in a new tab",
  "Adresi kopyala": "Copy URL",
  "Kelimeyi kopyala": "Copy keyword",
  "Adres kopyalandı": "URL copied",
  "Kelime kopyalandı": "Keyword copied",
  "Kelime olarak kaydet": "Save as keyword",
  Sorgu: "Query",
  Sayfa: "Page",
  // search-performance/SearchTrendChart.tsx
  "tıklama oranı": "CTR",
  "ortalama sıra": "average position",
  "Günlük {metric}": "Daily {metric}",
  Gün: "Day",
  "{days} günde toplam {total} {metric}. En yüksek gün {day}, {peak}.":
    "{total} {metric} in total over {days} days. Highest day: {day}, {peak}.",
  "{days} günde ortalama {average} {metric}. En iyi gün {day}, {peak}.":
    "Over {days} days, {metric} averaged {average}. Best day: {day}, {peak}.",
  "Günlük değişim": "Daily trend",
  "Yukarıdaki toplamların günlere dağılımı.":
    "The totals above, broken down by day.",
  "Grafik ölçüsü": "Chart metric",
  "Bu dönemde hiç gösterim yok, grafik boş. Search Console sayfalarınızı arama sonuçlarında göstermeye başlayınca günlük dağılım burada görünür.":
    "No impressions in this period, so the chart is empty. Once Search Console starts showing your pages in search results, the daily breakdown appears here.",
  // search-performance/TabSummaries.tsx
  "Sorgular kaç sırada?": "Where do your queries rank?",
  "Bu filtrelerle Search Console sorgu vermedi, bu yüzden dağılım çizilemiyor.":
    "Search Console returned no queries for these filters, so there is no distribution to draw.",
  "{total} sorgunun {firstPage} tanesi ilk sayfada (sıra 1-10). Bir çubuğa tıklayarak tabloyu daraltın.":
    "{firstPage} of {total} queries are on page one (positions 1-10). Click a bar to narrow the table.",
  "{total} sorgunun ortalama sıraya göre dağılımı; {firstPage} tanesi ilk sayfada.":
    "{total} queries by average position; {firstPage} of them are on page one.",
  "Tıklamalar sayfalara nasıl dağılıyor?":
    "How are clicks spread across pages?",
  "Bu filtrelerle Search Console sayfa vermedi, bu yüzden dağılım çizilemiyor.":
    "Search Console returned no pages for these filters, so there is no distribution to draw.",
  "{total} sayfanın {clicked} tanesi tıklama aldı.":
    "{clicked} of {total} pages got clicks.",
  "En çok tıklanan 5 sayfanın tıklamalardaki payı: {share}.":
    "The 5 most-clicked pages earned {share} of all clicks.",
  "{lead} Bir çubuğa tıklayarak tabloyu daraltın.":
    "{lead} Click a bar to narrow the table.",
  "{total} sayfanın aldığı tıklamaya göre dağılımı. {lead}":
    "{total} pages by the clicks they earned. {lead}",
  "Sıra 5-20 fırsatı": "Positions 5-20 opportunity",
  "Sıralaması 5 ile 20 arasında kalan sorgu olmadığı için pay hesaplanamıyor.":
    "No queries rank between 5 and 20, so there is no share to calculate.",
  "{queries} sorgu toplam {impressions} gösterim alıyor ama ilk üçün dışında kalıyor. Çubuklar gösterim payını gösterir; birine tıklayarak tabloyu daraltın.":
    "{queries} queries earn {impressions} impressions in total but sit outside the top three. The bars show each group's share of impressions; click one to narrow the table.",
  "Sıra 5-20 arasındaki {queries} sorgunun {impressions} gösterimi, sıra 5-10 ve 11-20 olarak bölünmüş.":
    "{impressions} impressions from {queries} queries in positions 5-20, split into positions 5-10 and 11-20.",
  "Çakışma özeti": "Cannibalization summary",
  "Search Console bu dönem için sorgu vermedi, bu yüzden karşılaştırılacak bir şey yok.":
    "Search Console returned no queries for this period, so there is nothing to compare.",
  "Hiçbir sorguda iki sayfanız birbiriyle yarışmıyor, bu yüzden özetlenecek bir şey yok.":
    "No query has two of your pages competing with each other, so there is nothing to summarize.",
  "{count} sorgu incelendi.": {
    one: "{count} query analyzed.",
    other: "{count} queries analyzed.",
  },
  "{queries} sorguda birden fazla sayfanız yarışıyor; {impressions} gösterim risk altında.":
    "More than one of your pages competes on {queries} queries; {impressions} impressions are at risk.",
  "Çakışan sorgu": "Cannibalized queries",
  "Risk altındaki gösterim": "Impressions at risk",
  "En çok kaybettiren sorgu": "Query losing the most",
  "Listeyi bu sorguya daraltır": "Narrows the list to this query",
  "{impressions} gösterim bölünüyor · {pages} sayfa":
    "{impressions} impressions split · {pages} pages",
  // search-performance/CannibalizationTable.tsx
  "Çakışma raporu yüklenemedi": "Couldn't load the cannibalization report",
  "Çakışma araması yapılamadı": "Couldn't check for cannibalization",
  "Çakışma bulunamadı": "No cannibalization found",
  "Search Console bu dönem için sorgu vermedi, karşılaştırılacak bir şey yok. Daha geniş bir tarih aralığı deneyin.":
    "Search Console returned no queries for this period, so there is nothing to compare. Try a wider date range.",
  "İncelenen {count} sorguda çakışma yok. Ancak Search Console satır sınırına takıldık, yani bakamadığımız sorgular kaldı.":
    {
      one: "No cannibalization in the {count} query analyzed. We did hit Search Console's row limit, though, so some queries were not checked.",
      other:
        "No cannibalization in the {count} queries analyzed. We did hit Search Console's row limit, though, so some queries were not checked.",
    },
  "İncelenen {count} sorgunun hiçbirinde iki sayfanız birbiriyle yarışmıyor.": {
    one: "The {count} query analyzed has no pages of yours competing with each other.",
    other:
      "In none of the {count} queries analyzed do two of your pages compete with each other.",
  },
  "{queries} sorguda birden fazla sayfanız yarışıyor ve bu yüzden {impressions} Google'ın tercih ettiği sayfa dışında kalıyor. Önce hangi sayfayı hedeflediğinize karar verin ve iç bağlantıları ona yöneltin; sayfalar gerçekten aynı soruyu yanıtlıyorsa birleştirin.":
    "More than one of your pages competes on {queries} queries, so {impressions} go to pages other than the one Google prefers. Decide which page you are targeting first and point internal links at it; if the pages really answer the same question, merge them.",
  "{impressions} gösterim": "{impressions} impressions",
  "{start} – {end} · {queries} sorgu incelendi":
    "{start} – {end} · {queries} queries analyzed",
  "Search Console tek seferde sınırlı satır döndürür ve bu sınıra takıldık. Listede olmayan çakışmalar olabilir.":
    "Search Console returns a limited number of rows at a time, and we hit that limit. There may be cannibalization not shown in this list.",
  '"{search}" geçen {count} sorgu gösteriliyor.': {
    one: 'Showing {count} query containing "{search}".',
    other: 'Showing {count} queries containing "{search}".',
  },
  "Filtreyi kaldır": "Clear filter",
  "{count} sayfa": { one: "{count} page", other: "{count} pages" },
  "Google'ın tercih ettiği sayfa dışında kalan gösterim payı":
    "Share of impressions that went to pages other than the one Google prefers",
  "{share} pay dışında": "{share} split off",
  "Aynı sorguya yarışan sayfalar": "Pages competing for the same query",
  "Google bu sorguda en çok bu sayfayı gösteriyor":
    "Google shows this page most often for this query",
  "Tercih edilen": "Preferred",
  // search-performance/SearchPerformancePage.tsx
  "Dışa aktarılamadı": "Couldn't export",
  "Arama performansı": "Search performance",
  "Google Search Console'dan gelen tıklama, gösterim, tıklama oranı ve ortalama sıra.":
    "Clicks, impressions, CTR and average position from Google Search Console.",
  "Mülkü değiştir": "Change property",
  "Arama performansı yüklenemedi": "Couldn't load search performance",
  "Arama türü: {type}": "Search type: {type}",
  "Sıra 5-20 ({count})": "Positions 5-20 ({count})",
  Sorgular: "Queries",
  Sayfalar: "Pages",
  "Sayfa çakışmaları": "Cannibalization",
  "E-Tablolar'a aktar": "Export to Sheets",
  "CSV indir": "Download CSV",
  "Bu analiz için 7 günlük seçim 28 güne çıkarılır. Gerçek tarih aralığı aşağıda yazar.":
    "For this analysis a 7-day selection is widened to 28 days. The actual date range is shown below.",
  "Tablo yüklenemedi": "Couldn't load the table",
  // search-performance/SearchPerformanceParts.tsx
  "{column} içinde ara": "Search {column}",
  "Arama performansı: {column}": "Search performance: {column}",
  "Aramanıza uyan satır yok": "No rows match your search",
  "Bu hızlı filtreye uyan satır yok": "No rows match this quick filter",
  "Bu filtrelerle eşleşen satır yok": "No rows match these filters",
  "Bu dönem için henüz veri yok": "No data for this period yet",
  '"{search}" hiçbir satırda geçmiyor. Aramayı temizleyin ya da başka bir terim deneyin.':
    'No row contains "{search}". Clear the search or try another term.',
  "Hızlı filtreyi kaldırarak tüm satırlara dönün.":
    "Clear the quick filter to go back to all rows.",
  "Arama türü, cihaz ya da ülke filtresini genişletmeyi deneyin.":
    "Try widening the search type, device or country filter.",
  "Search Console verisi birkaç gün gecikmeli gelir. Mülkü yeni bağladıysanız biraz daha beklemeniz gerekebilir.":
    "Search Console data arrives a few days late. If you just connected the property, you may need to wait a little longer.",
  "Google tek seferde en fazla bu kadar satır verir ve sınıra ulaşıldı, liste tam değil. Daraltmak için filtreleri kullanın.":
    "Google returns at most this many rows at a time and the limit was reached, so the list is incomplete. Use the filters to narrow it.",
  "{count} kelime kopyalandı": {
    one: "{count} keyword copied",
    other: "{count} keywords copied",
  },
  "{count} kelime kayıtlı": {
    one: "{count} keyword saved",
    other: "{count} keywords saved",
  },
  "Kelimeler kaydedilemedi": "Couldn't save keywords",
  "Sıra 5-20 arası sorgular": "Queries in positions 5-20",
  kelime: "keywords",
  "Kelimeleri kopyala": "Copy keywords",
  // rankings/useSaveTrackedKeyword.ts
  "Kelime kayıtlı": "Keyword saved",
  "Kelime kaydedilemedi": "Couldn't save keyword",
  // rankings/PositionChange.tsx
  "Önceki dönemde bu sorgu için veri yok.":
    "No data for this query in the previous period.",
  "Önceki dönemde veri yok": "No data in the previous period",
  Değişmedi: "No change",
  "Yükseldi {value}": "Up {value}",
  "Düştü {value}": "Down {value}",
  // rankings/PositionBandBars.tsx
  "Sıra dağılımı": "Position distribution",
  "Takip edilen sorgular ortalama sırasına göre gruplanır. Bir çubuğa tıklayınca tablo o gruba daralır.":
    "Tracked queries are grouped by average position. Click a bar to narrow the table to that group.",
  "{count} sorgunun ortalama sırası. Bir çubuğa tıklayınca tablo o gruba göre daralır.":
    {
      one: "Average position of {count} query. Click a bar to narrow the table to that group.",
      other:
        "Average position of {count} queries. Click a bar to narrow the table to that group.",
    },
  "Sıra grupları": "Position groups",
  "Sıra {band}: {count} sorgu": {
    one: "Position {band}: {count} query",
    other: "Position {band}: {count} queries",
  },
  "Sırası {band} olan sorguları göster": "Show queries in positions {band}",
  // rankings/ArchiveStatus.tsx
  "Arşiv durumu okunamadı": "Couldn't read the archive status",
  "Sıralama arşivi Search Console verisinden doldurulur. Bağladığınızda geçmiş günler kendiliğinden birikmeye başlar.":
    "The ranking archive is filled from Search Console data. Once you connect it, past days start building up on their own.",
  "Arşiv güncellenemedi: {error}": "Couldn't update the archive: {error}",
  "{date} tarihine kadar kontrol edildi, kelime verisi bulunamadı.":
    "Checked through {date}; no keyword data found.",
  "Veri yükleme henüz başlamadı.": "Data loading hasn't started yet.",
  "Kalan günler sonraki açılışlarda yüklenecek.":
    "The remaining days will load the next times you open this page.",
  "Arşiv {start} – {end} arasını kapsıyor, {rows} satır.":
    "The archive covers {start} – {end}, {rows} rows.",
  "Arşiv {rows} satır.": "The archive holds {rows} rows.",
  "Bu açılışta {count} gün eklendi.": {
    one: "{count} day added on this visit.",
    other: "{count} days added on this visit.",
  },
  "Kalan günler sonraki açılışta tamamlanacak.":
    "The remaining days will be filled in the next time you open this page.",
  // rankings/EmptyArchivePanel.tsx
  "Hangi kelimelerle arandığınız henüz görünmüyor":
    "Which keywords people search for you with isn't visible yet",
  "Sitenizin hangi aramalarda kaçıncı sırada çıktığını burada izlersiniz. Search Console kelime bazında veri verdikçe birikir. Az ziyaretçisi olan sitelerde birkaç hafta sürebilir. O zamana kadar toplam tıklama ve gösterime Arama performansı'ndan bakın.":
    "This is where you track the position your site shows up at for each search. It builds up as Search Console shares keyword-level data, which can take a few weeks on low-traffic sites. Until then, check total clicks and impressions in Search performance.",
  "Arama performansını aç": "Open Search performance",
  "Henüz sıralama verisi yok": "No ranking data yet",
  "Search Console'u bağlayınca geçmiş günler kendiliğinden birikir.":
    "Once you connect Search Console, past days build up on their own.",
  "Search Console'u bağla": "Connect Search Console",
  // rankings/MoversCard.tsx
  "Yükselenler ve düşenler": "Risers and fallers",
  "En çok yükselenler": "Biggest risers",
  "Bu dönemde belirgin yükselen sorgu yok.":
    "No queries rose noticeably in this period.",
  "En çok düşenler": "Biggest fallers",
  "Bu dönemde belirgin düşen sorgu yok.":
    "No queries fell noticeably in this period.",
  // rankings/PositionSparkline.tsx
  "Sıra geçmişi: {best} ile {worst} arasında":
    "Position history: between {best} and {worst}",
  "En iyi {value}": "Best {value}",
  "En kötü {value}": "Worst {value}",
  "{date} · Sıra {position} · {clicks} tıklama · {impressions} gösterim":
    "{date} · Position {position} · {clicks} clicks · {impressions} impressions",
  "Günlük değeri görmek için grafiğin üzerine gelin ya da grafiğe odaklanıp sol ve sağ ok tuşlarını kullanın.":
    "Hover over the chart to see a day's value, or focus it and use the left and right arrow keys.",
  // rankings/QueryHistoryCard.tsx
  "Sorgu geçmişi yüklenemedi": "Couldn't load the query history",
  "Bu sorgu için kayıtlı gün yok.": "No days recorded for this query.",
  "{start} – {end} · {count} gün kayıtlı": {
    one: "{start} – {end} · {count} day recorded",
    other: "{start} – {end} · {count} days recorded",
  },
  "Toplam tıklama / gösterim: {clicks} / {impressions}":
    "Total clicks / impressions: {clicks} / {impressions}",
  "Arama performansında aç": "Open in Search performance",
  // rankings/TrackedQueriesTable.tsx
  Değişim: "Change",
  "Bir önceki, aynı uzunluktaki dönemle karşılaştırılır. Sıra numarası küçüldüyse (12'den 8'e gibi) kelime yükselmiştir ve yeşil “Yükseldi” yazar. Büyüdüyse kırmızı “Düştü” yazar.":
    "Compared with the previous period of the same length. If the position number got smaller (say from 12 to 8), the keyword moved up and shows a green “Up”. If it got bigger, it shows a red “Down”.",
  "Sorgular yüklenemedi": "Couldn't load queries",
  "Kayıtlı kelimelere ekle": "Add to saved keywords",
  "Arama performansında ara": "Search in Search performance",
  // rankings/RankingsPage.tsx
  "30 gün": "30 days",
  "90 gün": "90 days",
  "6 ay": "6 months",
  "16 ay": "16 months",
  "Arşivin tamamı": "Entire archive",
  "Aramanıza uyan sorgu yok": "No queries match your search",
  "Bu filtreye uyan sorgu yok": "No queries match this filter",
  "Bu aralıkta kayıtlı sorgu yok": "No queries recorded in this range",
  "Arama kutusunu temizleyin ya da başka bir sorgu deneyin.":
    "Clear the search box or try another query.",
  "Sıra dağılımındaki çubuğu ya da hızlı filtreyi kaldırın.":
    "Clear the position distribution bar or the quick filter.",
  "Daha geniş bir dönem seçmeyi deneyin.": "Try choosing a longer period.",
  "Sıralama takibi": "Rank tracking",
  "Sorgularınızın Google'daki ortalama sırası. Arşiv bu bilgisayarda tutulduğu için Google'ın 16 aylık sınırından daha eskiye de bakabilirsiniz.":
    "The average position of your queries on Google. The archive is kept on this computer, so you can look back further than Google's 16-month limit.",
  "Zaman aralığı": "Time range",
  "Değişim gösterilemiyor. Arşivde önceki dönem ({start} – {end}) için bu sorgulara ait kayıt yok. Karşılaştırma, iki dönemde de verisi olan sorgular için yapılır. Daha kısa bir aralık seçin ya da arşivin dolmasını bekleyin.":
    "Change can't be shown. The archive has no records for these queries in the previous period ({start} – {end}). The comparison only covers queries with data in both periods. Choose a shorter range or wait for the archive to fill.",
  "Sorgu içinde ara": "Search queries",
  "Değişim filtreleri": "Change filters",
  Yükselenler: "Risers",
  "Önceki döneme göre en az yarım sıra yükselen sorgular.":
    "Queries that rose at least half a position compared with the previous period.",
  Düşenler: "Fallers",
  "Önceki döneme göre en az yarım sıra düşen sorgular.":
    "Queries that fell at least half a position compared with the previous period.",
  "Şu an ilk 10'da": "Now in the top 10",
  "Şimdi ortalama sırası 10 ya da daha iyi olan sorgular, ilk 10'a yeni girenler dahil. Önceki dönemde de verisi olanlar sayılır. Üstteki çubuk ise şu anki tüm sorguları sayar.":
    "Queries whose average position is now 10 or better, including new entries to the top 10. Only queries with data in the previous period count; the bar above counts every current query.",
  "İlk 10'dan çıkanlar": "Dropped out of the top 10",
  "Önceki dönemde ilk 10'da olup şimdi ilk 10'un dışına çıkan sorgular.":
    "Queries that were in the top 10 in the previous period and are now outside it.",
  "Gösterimi yüksek": "High impressions",
  "{impressions} veya daha fazla gösterim alan sorgular.":
    "Queries with {impressions} or more impressions.",
  "Gösterilmiş ama hiç tıklanmamış sorgular.":
    "Queries that were shown but never clicked.",
  "Arşivde daha fazla sorgu var. Bu liste en çok gösterim alan {count} tanesiyle sınırlı. Aralığı daraltarak farklı sorguları görebilirsiniz.":
    "The archive has more queries. This list is limited to the {count} with the most impressions. Narrow the range to see different queries.",
  // opportunities/opportunityLogic.ts: kinds
  "Az tıklanan": "Low clicks",
  "Sıralaması iyi ama tıklama oranı, sitenizdeki benzer sıralı sayfaların altında. Başlığı ve açıklamayı yeniden yazmaya değer.":
    "Ranks well, but its CTR is below similarly ranked pages on your site. Worth rewriting the title and description.",
  "Başlığı, kullanıcının aradığı şeyi ilk kelimelerde karşılayacak biçimde yeniden yazın.":
    "Rewrite the title so its first words answer what the searcher is looking for.",
  "Meta açıklamayı, tıklamaya değeceğini gösteren tek bir somut vaatle güncelleyin.":
    "Update the meta description with one concrete promise that shows the click is worth it.",
  "Yayına aldıktan iki hafta sonra bu ekrana dönüp tıklama oranına bakın.":
    "Two weeks after publishing, come back to this screen and check the CTR.",
  "İlk sıralarda": "At the top",
  "Zaten ilk üçte; yükselecek yer az. Tıklama oranı düşükse başlığa ve açıklamaya bakın, değilse içeriği güncel tutmak yeterli.":
    "Already in the top three, with little room to climb. If the CTR is low, look at the title and description; otherwise keeping the content current is enough.",
  "İçeriği güncel tutun; tarih, fiyat ve örnekleri yılda en az bir kez gözden geçirin.":
    "Keep the content current; review dates, prices and examples at least once a year.",
  "Bu sayfadan öne çıkarmak istediğiniz diğer sayfalara iç bağlantı verin.":
    "Link from this page to the other pages you want to promote.",
  "Tıklama oranı beklediğinizden düşükse başlığı ve meta açıklamayı yeniden yazın.":
    "If the CTR is lower than you expect, rewrite the title and meta description.",
  "Yükselmeye yakın": "Close to climbing",
  "İlk sayfaya çok yakın ya da hemen üstünde. Küçük bir iyileştirme sıra kazandırabilir.":
    "Very close to page one, or just on it. A small improvement can gain positions.",
  "İçeriği, bu sayfanın öne çıktığı aramalara daha eksiksiz yanıt verecek şekilde güçlendirin.":
    "Strengthen the content so it answers the searches this page shows up for more completely.",
  "Sitenizdeki ilgili sayfalardan, doğal bir bağlam içinde bu sayfaya iç bağlantı verin.":
    "Link to this page from related pages on your site, in a natural context.",
  "Başlıkta ve ilk paragrafta hedef aramayı açıkça geçirin.":
    "Mention the target search clearly in the title and the first paragraph.",
  "Derinde kalan": "Buried deep",
  "20. sıranın gerisinde ama bu arama için bir talep var. Sayfayı genişletip genişletmeyeceğinize ya da başka bir sayfayla birleştirip birleştirmeyeceğinize karar verin.":
    "Beyond position 20, but there is demand for this search. Decide whether to expand the page or merge it with another one.",
  "Sayfa gerçekten bu konunun cevabı mı? Değilse hangi bölümler eksik, yazın.":
    "Is the page really the answer to this topic? If not, write the sections that are missing.",
  "Aynı konuya değinen başka sayfanız varsa birleştirmeyi ve yönlendirme kurmayı düşünün.":
    "If another of your pages covers the same topic, consider merging them and setting up a redirect.",
  "Genişletmeye değmiyorsa sayfayı bırakın; emeği daha yakın fırsatlara harcayın.":
    "If it isn't worth expanding, leave the page alone and spend the effort on closer opportunities.",
  // opportunities/opportunityLogic.ts: quick filters
  "Analytics'te karşılığı olanlar": "Found in Analytics",
  "Analytics'te karşılığı yok": "Not found in Analytics",
  "En çok gösterim alan 10": "Top 10 by impressions",
  // opportunities/opportunityLogic.ts: explainRow
  "Analytics'te aynı dönemde {sessions} oturum getirmiş.":
    "In Analytics it brought in {sessions} sessions over the same period.",
  "Ortalama {position}. sırada {impressions} kez gösterildi ama yalnızca {clicks} tıklama aldı (tıklama oranı {ctr}).":
    "Shown {impressions} times at an average position of {position}, but got only {clicks} clicks (CTR {ctr}).",
  "Ortalama {position}. sırada {impressions} kez gösterildi ama yalnızca {clicks} tıklama aldı (tıklama oranı {ctr}, sitenizde bu sıradaki sayfaların ortancasından {gap} yüzde puan daha düşük).":
    "Shown {impressions} times at an average position of {position}, but got only {clicks} clicks (CTR {ctr}, {gap} percentage points below the median for pages at this position on your site).",
  "Tıklama oranını ({ctr}) kıyaslayacak kadar veri yok; düşük görünüyorsa başlığı ve açıklamayı gözden geçirin.":
    "There isn't enough data to compare its CTR ({ctr}); if it looks low, review the title and description.",
  "Tıklama oranı sitenizdeki benzer sıradaki sayfalarla uyumlu; içeriği ve başlığı güçlü tutmak yeterli.":
    "Its CTR is in line with similarly ranked pages on your site; keeping the content and title strong is enough.",
  "Ortalama {position}. sırada, yani zaten ilk sıralarda. {impressions} gösterimden {clicks} tıklama aldı.":
    "Average position {position}, so it is already at the top. It got {clicks} clicks from {impressions} impressions.",
  "Ortalama {position}. sırada; ilk sayfaya çok yakın. {impressions} gösterimden {clicks} tıklama aldı, birkaç basamak yükselmek bunu belirgin şekilde artırabilir.":
    "Average position {position}, very close to page one. It got {clicks} clicks from {impressions} impressions; climbing a few spots could raise that noticeably.",
  "Ortalama {position}. sırada, yani çoğu kullanıcının görmediği yerde; yine de {impressions} gösterim aldı. Bu sayfaya bir talep var.":
    "Average position {position}, where most searchers never look, yet it still got {impressions} impressions. There is demand for this page.",
  // opportunities/opportunityLogic.ts: score parts
  Talep: "Demand",
  "İş değeri": "Business value",
  "Yükselme kolaylığı": "Ease of climbing",
  "Bu sayfa için arama talebi yüksek.": "Search demand for this page is high.",
  "Arama talebi orta.": "Search demand is moderate.",
  "Arama talebi düşük.": "Search demand is low.",
  "Sitenize gelen ziyaretçiler bu sayfada değerli işlemler yapıyor.":
    "Visitors to your site take valuable actions on this page.",
  "İş değeri orta.": "Business value is moderate.",
  "Ziyaretçilerin bu sayfada yaptığı işlem az.":
    "Visitors take few actions on this page.",
  "İlk sıralara çok yakın; emek çabuk karşılık verir.":
    "Very close to the top; effort pays off quickly.",
  "İlk sıralara makul uzaklıkta.": "A reasonable distance from the top.",
  "İlk sıralardan uzak; sonuç almak zaman alır.":
    "Far from the top; results will take time.",
  // opportunities/OpportunityKinds.tsx
  "Fırsat türleri": "Opportunity types",
  "{kind} · {count} sayfa": {
    one: "{kind} · {count} page",
    other: "{kind} · {count} pages",
  },
  "Şu an bu türde sayfa yok. {hint}": "No pages of this type right now. {hint}",
  // opportunities/OpportunityQuickFilters.tsx
  "Analytics'te trafiği olan sayfa yok; Analytics bağlı değilse önce bağlayın.":
    "No pages have traffic in Analytics; if Analytics isn't connected, connect it first.",
  "Her sayfanın Analytics'te karşılığı var; eşleşmeyen sayfa kalmadı.":
    "Every page has a match in Analytics; no unmatched pages are left.",
  "Listelenecek sayfa yok.": "No pages to list.",
  // opportunities/OpportunitySummary.tsx
  "Fırsatların dağılımı": "Opportunity breakdown",
  "Fırsat nerede toplanıyor?": "Where are the opportunities concentrated?",
  "Kutular neye göre hesaplansın?": "What should the tiles measure?",
  "toplam {unit}": "total {unit}",
  "Toplam {total} {unit} içinde en büyük pay {kind} kümesinde ({share}).":
    "Of {total} {unit} in total, the largest share is in the {kind} group ({share}).",
  // opportunities/OpportunityDetail.tsx
  Kapat: "Close",
  "Analytics oturumu": "Analytics sessions",
  "Puanın dökümü": "Score breakdown",
  "Puan nereden geliyor?": "Where does the score come from?",
  "Puan {score} nereden geliyor?": "Where does the score of {score} come from?",
  "Ne yapmalı?": "What to do",
  Kopyalandı: "Copied",
  "Sayfayı aç": "Open page",
  // opportunities/OpportunityStates.tsx
  "Burası ne işe yarar?": "What is this page for?",
  "Google'ın sayfanızı gösterdiği ama az tıklandığı ya da birkaç basamak yükselince çok daha fazla ziyaretçi getirecek sayfaları burada topluyoruz. Bir satıra tıklayınca nedenini ve ne yapmanız gerektiğini görürsünüz.":
    "This page gathers the pages Google shows but few people click, and the ones that would bring many more visitors if they climbed a few spots. Click a row to see why it is here and what to do.",
  "Fırsatlar için Search Console ve Analytics gerekir":
    "Opportunities need Search Console and Analytics",
  "Sıralamalar Search Console'dan, sayfaların kazandırdığı Analytics'ten gelir. İkisini de bağlayınca fırsatlar puanlanır.":
    "Rankings come from Search Console, and what pages earn comes from Analytics. Once both are connected, opportunities are scored.",
  "Bağlantıları ayarla": "Set up connections",
  "Search Console bu dönem için veri vermedi":
    "Search Console returned no data for this period",
  "{start} – {end} aralığında hiçbir sayfanız arama sonuçlarında görünmedi. Mülkü yeni bağladıysanız Google'ın veriyi doldurması birkaç gün sürer.":
    "None of your pages appeared in search results between {start} and {end}. If you just connected the property, it takes Google a few days to fill in the data.",
  "Bu dönemde fırsat çıkmadı": "No opportunities in this period",
  "{start} – {end} aralığında puanlanacak bir sayfa çıkmadı. Dönemi genişletmeyi deneyin.":
    "No pages to score between {start} and {end}. Try a longer period.",
  // opportunities/OpportunitiesTable.tsx
  Puan: "Score",
  Oturum: "Sessions",
  "Ayrıntı ve öneriler için bir satıra tıklayın.":
    "Click a row for details and suggestions.",
  "E-Tablolar'a aktar ({rows} satır)": "Export to Sheets ({rows} rows)",
  "CSV ({rows} satır)": "CSV ({rows} rows)",
  Fırsatlar: "Opportunities",
  "Bu filtreye uyan sayfa yok": "No pages match this filter",
  "Seçtiğiniz tür ya da hızlı filtre bu dönemde hiçbir sayfayla eşleşmedi. Filtreleri kaldırın ya da dönemi genişletin.":
    "The type or quick filter you chose matched no pages in this period. Clear the filters or choose a longer period.",
  "Filtreleri kaldır": "Clear filters",
  // opportunities/OpportunityColumns.tsx
  "Google'da kaçıncı sırada çıktığınız; küçük olan iyidir. 1, sonuçların en üstü demek.":
    "Where you show up on Google; lower is better. 1 means the top of the results.",
  "Sayfanızın arama sonuçlarında kaç kez göründüğü.":
    "How many times your page appeared in search results.",
  "Aramalardan sayfanıza kaç kez tıklandığı.":
    "How many times people clicked through to your page from search.",
  "Gösterilenlerin yüzde kaçı tıklandı. Altındaki ok, sayfanın sitenizde aynı sıradaki sayfalara göre farkını gösterir.":
    "The share of impressions that got a click. The arrow below shows how the page compares with pages at the same position on your site.",
  "Analytics'ten, Search Console ile aynı tarih aralığı için alınır; Analytics ekranındaki aralıktan farklı olabilir.":
    "From Analytics, for the same date range as Search Console; it may differ from the range on the Analytics screen.",
  // opportunities/OpportunitiesPage.tsx
  "Son 90 gün": "Last 90 days",
  "Google'da görünen sayfalarınız, üzerinde çalışmaya en değer olandan başlayarak.":
    "Your pages that show up on Google, starting with the ones most worth working on.",
  "Fırsatlar yüklenemedi": "Couldn't load opportunities",
  Dönem: "Period",
  "Satır sayısı": "Rows",
  "Search Console tek seferde sınırlı sayıda satır verir ve bu sınıra ulaşıldı; gerçekte daha fazla aday sayfa olabilir.":
    "Search Console returns a limited number of rows at a time and that limit was reached; there may be more candidate pages.",
  "Search Console ve Analytics farklı saat dilimlerinde raporluyor; günlük eşleşmeler bir gün kayabilir.":
    "Search Console and Analytics report in different time zones, so daily matches may be off by a day.",
  Listelenen: "Listed",
  "Filtreye uyan · {rows} satır içinde": "Matching the filter · of {rows} rows",
  "{candidates} aday sayfanın en iyileri":
    "The best of {candidates} candidate pages",
  "Tüm aday sayfalar ({candidates})": "All candidate pages ({candidates})",
  "{analytics}'te karşılığı var": "Found in {analytics}",
  "{candidates} aday içinde": "Of {candidates} candidates",
  "{analytics}'te karşılığı yok": "Not found in {analytics}",
  "Listedeki her sayfanın Analytics karşılığı var":
    "Every listed page has a match in Analytics",
  "Listelenen {rows} sayfanın {count} tanesi · listele":
    "{count} of {rows} listed pages · show them",
  "En yüksek puan": "Top score",
  "{page} · ayrıntı": "{page} · details",
  "Puan nasıl hesaplanır?": "How is the score calculated?",
  "Talep (%50) + iş değeri (%30) + yükselme kolaylığı (%20). İş değeri dönüşüm tanımlı olmadığı için etkileşim oranına göre hesaplanır.":
    "Demand (50%) + business value (30%) + ease of climbing (20%). Business value is based on engagement rate, because no key events are set up.",
  "Talep (%50) + iş değeri (%30) + yükselme kolaylığı (%20). İş değeri etkileşim oranına göre hesaplanır.":
    "Demand (50%) + business value (30%) + ease of climbing (20%). Business value is based on engagement rate.",
  "Talep (%50) + iş değeri (%30) + yükselme kolaylığı (%20). İş değeri dönüşümlere göre hesaplanır.":
    "Demand (50%) + business value (30%) + ease of climbing (20%). Business value is based on key events.",
  "Analytics'te karşılığı yok ne demek?":
    "What does “not found in Analytics” mean?",
  "Analytics o sayfaya hiç ziyaret görmemiş ya da adresi farklı yazılmış olabilir. Bu sayfalar da puanlanır. İş değerinde haksız yere sıfır almasınlar diye ortada bir değer verilir.":
    "Analytics may have seen no visits to that page, or recorded its address differently. These pages are scored too; they get a middle business value so they don't unfairly score zero.",
};
