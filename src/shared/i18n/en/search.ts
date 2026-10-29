import type { Catalog } from "@/shared/i18n";

/**
 * English for: src/client/features/search-performance, rankings, opportunities.
 * Keys are the Turkish source strings exactly as passed to t().
 * Google concepts use Search Console's own English UI names.
 */
export const enSearch: Catalog = {
  "{count} sorgu gözlendi.": "Observed queries: {count}.",
  "En çok gösterilenler": "Most-viewed queries",
  "Tam yanıtlı gün: {current}/{days}; önceki dönem: {previous}/{days}.":
    "Days with complete responses: {current}/{days}; previous period: {previous}/{days}.",
  "Arşivde en çok gösterim": "Most impressions in this archive",
  "{date} tarihli geçmiş bu bilgisayarda saklı; Google'ın 16 ay sınırı buna uygulanmaz.":
    "History for {date} is stored on this computer; Google's 16-month limit does not apply to it.",
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
  "Seçimi kaldırarak sıra 4-20 arasındaki tüm sorgulara dönün.":
    "Clear the selection to go back to every query in positions 4-20.",
  "Bu dönemde 4-20. sırada kelime yok":
    "No keywords in positions 4-20 this period",
  "Hiçbir kelimeniz 4-20. sırada değil. Bu aralıktaki kelimeler küçük bir iyileştirmeyle üst sıralara çıkabilir; olunca burada listelenir.":
    "None of your keywords are in positions 4-20. Keywords in this range can climb higher with a small improvement; when there are some, they are listed here.",
  "Bu seçimde sorgu verisi yok": "No query data for this selection",
  "Seçili ülke ya da cihaz için Search Console sorgu verisi paylaşmadı. Filtreyi kaldırarak tüm trafiğe bakın.":
    "Search Console shared no query data for the selected country or device. Clear the filter to see all traffic.",
  "Kelime düzeyinde veri henüz gelmedi": "No keyword-level data yet",
  "Search Console, hangi kelimeyle arandığınızı bu dönem için henüz paylaşmadı. Az trafikli sitelerde bu normaldir. Veri gelince 4-20. sıradaki kelimeler burada listelenir.":
    "Search Console has not yet shared which keywords people searched for in this period. This is normal for low-traffic sites. Once data arrives, keywords in positions 4-20 are listed here.",
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
  // Cards and stats review (Opportunities, rankings, setup verdict).
  "Her sayfanın ayda kaç tıklama daha getirebileceği ve bunun için ne yapmanız gerektiği.":
    "How many more clicks a month each page could bring, and what to do to get them.",
  "Son {days} gün · {period}. Search Console {lag} gün geriden gelir; Analytics oturumları da aynı günlerden okunur. Tahminler 30 güne ölçeklenir.":
    "Last {days} days · {period}. Search Console runs {lag} days behind; Analytics sessions are read for the same days. Estimates are scaled to 30 days.",
  "{count} sayfada · bu sayfalar bugün ayda {clicks} tıklama alıyor, kazanç bunun {share} kadarı":
    "Across {count} pages · they get {clicks} clicks a month today; the gain is {share} of that",
  "Önce şuna bakın": "Start here",
  "+{gain} tıklama/ay · {action}": "+{gain} clicks/month · {action}",
  "Dönüşüm getiren sayfalar": "Pages that convert",
  "Analytics bağlanınca görünür": "Shows once Analytics is connected",
  "Listedeki sayfalardan dönüşüm gelmiyor": "None of the listed pages converts",
  "Kazanç gelirse ayda yaklaşık +{count} anahtar olay (tahmin) · listele":
    "If the gain arrives, about +{count} key events a month (estimate) · list them",
  "Kazanç beklenmeyen sayfalar": "Pages with nothing to gain",
  "Zaten iyi sıradalar ve normal tıklanıyorlar ya da çok az gösterim aldılar; listede yoklar.":
    "Already ranking well and clicked normally, or shown too rarely to estimate; they are not listed.",
  "Kazanç beklenen {total} sayfanın en büyük {count} tanesi listeleniyor; üstteki toplamlar hepsini kapsar.":
    "Showing the biggest {count} of {total} pages with a gain; the totals above cover all of them.",
  "Tahmin nasıl yapılır?": "How is it estimated?",
  "Hesaba katılmadı ({terms}). Markanızı arayan sizi zaten bulur; onların yüksek tıklama oranı diğer aramaları haksız yere düşük gösterirdi.":
    "Left out ({terms}). People searching your brand find you anyway, and their high click-through would make every other search look low.",
  "Alan adınızdan tahmin edilen terimlerle ayrıldı ({terms}). Doğru terimleri Arama performansı ekranında onaylayabilirsiniz.":
    "Separated using terms guessed from your domain ({terms}). You can confirm the right terms on the Search performance screen.",
  "Marka terimi tanımlı değil, bu yüzden marka aramaları da karşılaştırmaya dahil. Arama performansı ekranında tanımlayabilirsiniz.":
    "No brand terms are set, so brand searches are part of the comparison. You can set them on the Search performance screen.",
  "Analytics ne katıyor?": "What does Analytics add?",
  "Analytics bağlı değil. Bağlarsanız her sayfanın dönüşüm getirip getirmediği tahminin yanında görünür.":
    "Analytics is not connected. Connect it to see next to each estimate whether the page converts.",
  "Analytics bu kez yanıt vermedi; tahminler yalnızca Search Console'dan.":
    "Analytics did not answer this time; the estimates come from Search Console alone.",
  "Tahmini değiştirmez; yanında bir etiket olarak durur. Bir sayfa en az {sessions} organik oturum aldıysa dönüşümlerine bakılır, daha azında oran gürültüdür. {matched} / {total} sayfanın Analytics karşılığı var.":
    "It does not change the estimate; it sits beside it as a label. A page's conversions are only judged from {sessions} organic sessions up; below that the rate is noise. {matched} / {total} pages have an Analytics match.",
  "Hangi aramaların kazandıracağını görmek için bir satıra tıklayın.":
    "Click a row to see which searches the gain comes from.",
  "Seçtiğiniz iş türü ya da hızlı filtre bu dönemde hiçbir sayfayla eşleşmedi. Filtreleri kaldırın ya da dönemi genişletin.":
    "The kind of work or quick filter you picked matched no page in this period. Clear the filters or widen the period.",
  "Sitenizin aynı sıradaki marka dışı aramaları: {ctr}":
    "Your site's non-brand searches at the same position: {ctr}",
  "site {ctr} · {value} puan": "site {ctr} · {value} pts",
  "Bu sayfanın aramaları sitenizin kendi tıklama oranlarına ulaşırsa ayda gelebilecek ek tıklama.":
    "Extra clicks a month if this page's searches reached your own site's click-through rates.",
  "/ay": "/mo",
  "Gösterilenlerin yüzde kaçı tıklandı. Altındaki satır, sayfanın marka dışı aramalarını sitenizin aynı sıradaki aramalarıyla yüzde puan olarak karşılaştırır.":
    "Share of impressions that were clicked. The line under it compares the page's non-brand searches with your site's at the same position, in percentage points.",
  "Analytics'teki organik oturumlar, Search Console ile aynı günler için. Analytics ekranı dünü de saydığı için sayı orada biraz farklı olabilir.":
    "Organic sessions in Analytics, for the same days as Search Console. The Analytics screen counts up to yesterday, so its figure can differ a little.",
  "+{gain} tıklama/ay": "+{gain} clicks/month",
  "Bugünkü dönüşüm oranıyla bu, ayda yaklaşık +{count} anahtar olay eder (tahmin).":
    "At today's conversion rate that is about +{count} key events a month (estimate).",
  "ayda {count} gösterim": "{count} impressions a month",
  "Değer (Analytics)": "Value (Analytics)",
  Mesafe: "Distance",
  "{position}. sıra → hedef {target}": "Position {position} → target {target}",
  "Hangi aramalar?": "Which searches?",
  "Kazanç/ay": "Gain/month",
  "hedef {ctr}": "target {ctr}",
  "Ne yapmalı? {action}": "What to do? {action}",
  "Ortalama {position}. sırada; {impressions} gösterimden {clicks} tıklama aldı. Aşağıdaki aramalar sitenizin kendi tıklama oranlarına ulaşırsa ayda yaklaşık {gain} tıklama daha gelir.":
    "Average position {position}; {clicks} clicks from {impressions} impressions. If the searches below reached your own site's click-through rates, about {gain} more clicks a month would come.",
  "{events} anahtar olay · dönüşen oturum oranı {rate}":
    "{events} key events · {rate} of sessions convert",
  "{sessions} oturum, hiç dönüşüm yok": "{sessions} sessions, no conversions",
  "{sessions} oturum; değerini söylemek için az":
    "{sessions} sessions; too few to judge its value",
  "{sessions} oturum": "{sessions} sessions",
  "Her sayfa için tek bir soru: ayda kaç tıklama daha getirebilir ve bunun için ne yapmalı? Tahmin, sitenizin kendi tıklama oranlarından yapılır. Kazancı olmayan sayfalar listede yer almaz. Bir satıra tıklayınca hangi aramaların bu kazancı getirdiğini görürsünüz.":
    "One question per page: how many more clicks a month could it bring, and what gets them? The estimate uses your own site's click-through rates. Pages with nothing to gain are left out. Click a row to see which searches the gain comes from.",
  "Fırsatlar için Search Console gerekir": "Opportunities need Search Console",
  "Tahminler Search Console'daki aramalardan hesaplanır. Analytics'i de bağlarsanız hangi sayfaların dönüşüm getirdiği yanında görünür.":
    "The estimates are calculated from your searches in Search Console. Connect Analytics too to see which pages convert.",
  "Tahmin için veri henüz az": "Not enough data to estimate yet",
  "{start} – {end} aralığında sitenizin tıklama oranını sıraya göre ölçecek kadar arama yok. Dönemi 90 güne genişletmeyi deneyin.":
    "Between {start} and {end} there are not enough searches to measure your site's click-through by position. Try widening the period to 90 days.",
  "Bu dönemde kazanç beklenen sayfa yok":
    "No page has anything to gain in this period",
  "{start} – {end} aralığında {count} sayfanın hepsi ya zaten iyi sırada ve normal tıklanıyor ya da tahmin için çok az gösterim aldı.":
    "Between {start} and {end}, all {count} pages either already rank well and are clicked normally, or had too few impressions to estimate.",
  "Kazanç hangi işte?": "Where is the gain?",
  "Her satır, o işle ayda gelebilecek ek tıklama. Bir satıra basınca tablo o işe daralır.":
    "Each row is the extra clicks a month that kind of work could bring. Press a row to narrow the table to it.",
  "İş türleri": "Kinds of work",
  "Bu türde kazanç beklenen sayfa yok.":
    "No page has a gain from this kind of work.",
  "tıklama/ay": "clicks/month",
  "Tahmini kazanç (tıklama/ay)": "Estimated gain (clicks/month)",
  "Yapılacak iş": "Work to do",
  dönüşüyor: "converts",
  "dönüşüm yok": "no conversions",
  "az trafik": "little traffic",
  "Dönüşüm getirenler": "Converting",
  "Trafik var, dönüşüm yok": "Traffic, no conversions",
  "Başlık ve açıklama işi": "Title and description work",
  "Başlığı ve açıklamayı yenileyin": "Rewrite the title and description",
  "İlk sayfada ama sitenizin aynı sıradaki aramalarına göre az tıklanıyor. Sıra değişmeden tıklama artar.":
    "On page one, but clicked less than your site's searches at the same position. Clicks rise without moving position.",
  "aynı sıra, sitenizin tıklama oranı":
    "same position, your site's click-through",
  "Başlığı, aşağıdaki aramaların ilk kelimelerde karşılık bulacağı biçimde yeniden yazın.":
    "Rewrite the title so the searches below are answered in its first words.",
  "İki hafta sonra bu ekrana dönüp tahmini kazancın küçülüp küçülmediğine bakın.":
    "Come back to this screen in two weeks and check whether the estimated gain has shrunk.",
  "İlk sayfada, 4-10. sıra": "On page one, positions 4-10",
  "İçeriği güçlendirin": "Strengthen the content",
  "İçeriği, aşağıdaki aramalara rakiplerden daha eksiksiz yanıt verecek şekilde genişletin.":
    "Expand the content so it answers the searches below more completely than competitors do.",
  "Sitenizdeki ilgili sayfalardan bu sayfaya, aramayı anlatan bir bağlantı metniyle iç bağlantı verin.":
    "Link to this page from related pages on your site, with link text that describes the search.",
  "Başlıkta ve ilk paragrafta en çok kazandıracak aramayı açıkça geçirin.":
    "Name the search with the biggest gain clearly in the title and first paragraph.",
  "2. sayfada, 11-20. sıra": "On page two, positions 11-20",
  "İç bağlantı verin, içeriği genişletin":
    "Add internal links, expand the content",
  "İlk sayfanın hemen arkasında. İlk sayfaya çıkana kadar neredeyse hiç tıklanmaz.":
    "Just behind page one. It gets almost no clicks until it reaches page one.",
  "ilk sayfa, 6-10. sıra": "page one, positions 6-10",
  "Sayfanın bu aramalar için gerçekten doğru sayfa olduğunu kontrol edin; değilse doğru sayfaya yönlendirin.":
    "Check that this really is the right page for these searches; if not, redirect to the right one.",
  "Eksik alt başlıkları, örnekleri ve sık sorulan soruları ekleyin.":
    "Add the missing subheadings, examples and frequently asked questions.",
  "Ana menüden ya da güçlü sayfalardan bu sayfaya iç bağlantı verin.":
    "Link to this page from the main menu or from strong pages.",
  "Derinde, 21. sıradan sonra": "Deep, beyond position 20",
  "Birleştirin ya da bırakın": "Merge or let go",
  "Talep var ama sayfa çok geride. Genişletmek mi, başka bir sayfayla birleştirmek mi, bırakmak mı, karar verin.":
    "There is demand but the page is far back. Decide whether to expand it, merge it with another page, or let it go.",
  "Aynı konuya değinen başka bir sayfanız varsa ikisini birleştirip eskisinden yönlendirme kurun.":
    "If another page covers the same topic, merge the two and redirect from the old one.",
  "Sayfa bu konunun cevabıysa eksik bölümleri yazın ve iç bağlantı verin.":
    "If the page is the answer to this topic, write the missing sections and link to it internally.",
  "Tahmini kazanç küçükse sayfayı bırakın; emeği daha yakın fırsatlara harcayın.":
    "If the estimated gain is small, let the page go and spend the effort on closer opportunities.",
  "Bu bilgisayarda {start} – {end} arasının geçmişi saklı; Google'ın 16 ay sınırı buna uygulanmaz.":
    "History from {start} to {end} is stored on this computer; Google's 16-month limit does not apply to it.",
  "{from} → {to}. sıra · {impressions} gösterim":
    "Position {from} → {to} · {impressions} impressions",
  "Önceki aynı uzunluktaki döneme göre, gösterimle tartılarak: çok aranan bir sorgunun küçük hareketi az arananın büyük hareketinden önce gelir.":
    "Against the previous period of the same length, weighted by impressions: a small move on a much-searched query ranks above a big move on a rare one.",
  "{count} sorgunun ortalama sırası; sağdaki sayı önceki döneme göre değişim. Bir çubuğa tıklayınca tablo o gruba göre daralır.":
    "Average position of {count} queries; the number on the right is the change against the previous period. Click a bar to narrow the table to that group.",
  "Önceki döneme göre bu gruba giren ya da çıkan sorgu sayısı":
    "Queries that entered or left this group since the previous period",
  "Bu listede en çok gösterim alan dörtte bir: {impressions} ve üstü gösterim.":
    "The quarter of this list with the most impressions: {impressions} impressions or more.",
  "{value} sıra yükseldi": "up {value} places",
  "{value} sıra geriledi": "down {value} places",
  // search-performance redesign: screen, to-do copy and printable report
  "Marka adları kaydedildi": "Brand names saved",
  "Marka adları kaydedilemedi": "Couldn't save brand names",
  "Sitenizin adını ve insanların onu nasıl yazdığını girin. Bu kelimeleri içeren aramalar marka araması sayılır.":
    "Enter your site's name and the ways people spell it. Searches containing these words count as brand searches.",
  "Marka adları": "Brand names",
  "{term} adını kaldır": "Remove {term}",
  "Marka adı ekle": "Add a brand name",
  "Örnek: örnek site": "Example: example site",
  Ekle: "Add",
  "Öneriler:": "Suggestions:",
  "Eşiği aşan değişim yok.": "No change above the threshold.",
  "{previous} → {current} tıklama": "{previous} → {current} clicks",
  "sıra {position}": "position {position}",
  "Düşenler ({count})": "Falling ({count})",
  "Yükselenler ({count})": "Rising ({count})",
  "Arşivde henüz gün yok. Bu ekran her açıldığında Search Console'dan günlük toplamları alıp bu bilgisayarda saklar; ay ay eğilim birkaç gün içinde burada görünür.":
    "No days in the archive yet. Each time this screen opens it saves Search Console's daily totals on this computer; the month-by-month trend shows up here within a few days.",
  "Arşiv {date} tarihinden başlıyor; iki ay dolunca eğilim burada görünür.":
    "The archive starts on {date}; the trend shows up here once it holds two months.",
  "{count} aylık tıklama, {start} – {end}.":
    "Clicks over {count} months, {start} – {end}.",
  "Aylık tıklama": "Monthly clicks",
  Ay: "Month",
  "Arşivdeki gün": "Days in the archive",
  "Bu bilgisayardaki arşivden, cihaz filtresine göre (ülke filtresi uygulanmaz). Kesik çizgili çubuk: arşivin o ayın tamamını tutmadığı ay.":
    "From the archive on this computer, by the device filter (the country filter does not apply). Dashed bar: a month the archive does not hold in full.",
  "Önceki döneme göre en çok değişenler":
    "Biggest changes since the previous period",
  "{start} – {end} ile karşılaştırma. En az {clicks} tıklamalık ve {share} oranında bir değişim aranır.":
    "Compared with {start} – {end}. Looks for a change of at least {clicks} clicks and {share}.",
  "Satır sınırı yüzünden bir dönemin tablosu eksik; yalnızca iki dönemde de görünen satırlar karşılaştırıldı.":
    "One period's table is incomplete because of the row limit; only rows seen in both periods were compared.",
  "Yeni ve kaybolan sorgular": "New and lost queries",
  "Yalnızca bir dönemde en az {impressions} gösterim alan sorgular.":
    "Queries with at least {impressions} impressions in only one of the two periods.",
  "Yeni görünenler": "Newly showing",
  "Önceki dönemin tablosu satır sınırında kesildiği için hangi sorguların yeni olduğu bilinemiyor.":
    "It can't be told which queries are new: the previous period's table was cut at the row limit.",
  "Bu dönemde yeni görünen sorgu yok.":
    "No newly showing queries in this period.",
  "Kaybolanlar (önceki dönemdeki değerleriyle)":
    "Lost (with their previous-period numbers)",
  "Bu dönemin tablosu satır sınırında kesildiği için hangi sorguların kaybolduğu bilinemiyor.":
    "It can't be told which queries were lost: this period's table was cut at the row limit.",
  "Kaybolan sorgu yok.": "No lost queries.",
  "Gücünü kaybeden sayfalar": "Pages losing ground",
  "Son çeyrekteki tıklamaları, önceki dört çeyreğin en iyisinin {share} kadarından aza düşen ve geçen yılın aynı çeyreğinden de geride kalan sayfalar.":
    "Pages whose clicks last quarter fell below {share} of their best of the four quarters before, and also trail the same quarter a year earlier.",
  "Bu karşılaştırma bir yılı aşkın veri ister; Search Console bu mülk için o kadar eski veri vermedi ya da filtre uygulanmış.":
    "This comparison needs more than a year of data; Search Console didn't return that much for this property, or a filter is on.",
  "Belirgin biçimde gücünü kaybeden sayfa yok.":
    "No page is clearly losing ground.",
  "Son çeyrek {clicks} · en iyisi {peak} tıklama":
    "Last quarter {clicks} · best {peak} clicks",
  "Uzun dönem: aylık tıklama": "Long term: monthly clicks",
  "Search Console en fazla 16 ay geriye gider; bu arşiv günlük toplamları bu bilgisayarda daha uzun saklar.":
    "Search Console goes back 16 months at most; this archive keeps daily totals on this computer for longer.",
  sorgular: "queries",
  sayfalar: "pages",
  "sorgu-sayfa eşleşmeleri": "query-page pairs",
  "Geçen yıl karşılaştırılamıyor: Google bu günleri artık vermiyor (en fazla 16 ay).":
    "Can't compare with last year: Google no longer serves those days (16 months at most).",
  "Önceki dönem karşılaştırılamıyor: Google bu günleri vermiyor.":
    "Can't compare with the previous period: Google doesn't serve those days.",
  "Verinin durumu": "Data status",

  "Kesinleşmemiş gün yok.": "No days still being counted.",
  "Son veri: {date}.": "Latest data: {date}.",
  "Bu dönem için Google'dan hiç satır gelmedi.":
    "Google returned no rows for this period.",
  "Gizli sorgular": "Hidden queries",
  "Gizli sorgu payı hesaplanamadı (tıklama yok).":
    "Hidden query share can't be calculated (no clicks).",
  "Satır sınırına ulaşıldı ({tables}); en az tıklanan uç eksik. Daraltmak için filtre kullanın.":
    "Row limit reached ({tables}); the least-clicked tail is missing. Use a filter to narrow it down.",
  "Tablolar tam: {queries} sorgu, {pages} sayfa okundu.":
    "Tables complete: {queries} queries and {pages} pages read.",
  "Sıra 4-10": "Position 4-10",
  "İlk sayfada ama ilk üçte değil: en çok tıklama kazandıran adım ilk üçe çıkmaktır.":
    "On page one but not in the top three: moving into the top three wins the most clicks.",
  "Bu dönem için satır yok": "No rows for this period",
  "Search Console bu dönem ve filtreler için satır vermedi. Dönemi genişletmeyi ya da filtreleri kaldırmayı deneyin.":
    "Search Console returned no rows for this period and these filters. Try a longer period or clear the filters.",
  "Taban: okunan {rows} sorgu, {clicks} tıklama. Sitenin toplamı {site} tıklama; aradaki fark Google'ın gizlediği sorgulardan.":
    "Base: {rows} queries read, {clicks} clicks. The site total is {site} clicks; the difference is queries Google hides.",
  "Taban: okunan {rows} sayfa, {clicks} tıklama. Google sayfa satırlarını sayfa bazında topladığı için site toplamından ({site}) biraz farklı olabilir.":
    "Base: {rows} pages read, {clicks} clicks. Google totals page rows by page, so this can differ slightly from the site total ({site}).",
  "Çubuk, satırın bu tablodaki tıklama payı.":
    "The bar is the row's share of clicks in this table.",
  "Google'ın satır sınırına ulaşıldı; en az tıklanan uç listede yok.":
    "Google's row limit was reached; the least-clicked tail isn't listed.",
  "Önceki dönem tablosu da kesildi; değişimi bilinmeyen satırlarda – yazar.":
    "The previous period's table was cut too; rows whose change is unknown show –.",
  "Önceki dönemde bilinmiyor": "Unknown for the previous period",
  "Sıra {range}": "Position {range}",
  "Paylar sitenin toplamına göre: {clicks} tıklama, {impressions} gösterim.":
    "Shares are of the site total: {clicks} clicks, {impressions} impressions.",
  "Bu kırılımda filtre olduğu için paylar satırların toplamına göre: {clicks} tıklama.":
    "A filter is on for this breakdown, so shares are of the rows' total: {clicks} clicks.",
  "{name} filtresini kaldır": "Remove the {name} filter",
  "Tüm ekranı {name} ile daralt": "Narrow the whole screen to {name}",
  "Daha az göster": "Show less",
  "Tümünü göster ({count})": "Show all ({count})",
  "Google'ın satır sınırına ulaşıldı; liste tam değil.":
    "Google's row limit was reached; the list isn't complete.",
  "{clicks} tıklama": "{clicks} clicks",
  "Okunan {count} sorgunun ortalama sırasına göre. Google'ın gizlediği sorgular burada yok.":
    "By the average position of the {count} queries read. Queries Google hides aren't included.",
  "Haftalara göre sorgu dağılımı": "Queries by week",
  "{count} haftada, sıra aralıklarının sorgular içindeki payı.":
    "Share of position ranges among queries, over {count} weeks.",
  Hafta: "Week",
  "{date} haftası": "Week of {date}",
  "Her hafta, o hafta görünen sorguların sıra aralıklarına dağılımı (pay). Bu bilgisayardaki sorgu arşivinden, kesin verilerle; tüm cihaz ve ülkeler.":
    "Each week, how the queries shown that week split across position ranges (share). From the query archive on this computer, final data; all devices and countries.",
  "Haftalık dağılım için sorgu arşivi doluyor; Sıralama takibi ekranı ya da bu ekran açıldıkça tamamlanır.":
    "The query archive is still filling for the weekly split; it completes as this screen or Rank tracking is opened.",
  "Haftalık dağılım cihaz ya da ülke filtresiyle gösterilmez: arşiv bu kırılımları tutmaz.":
    "The weekly split isn't shown with a device or country filter: the archive doesn't keep those breakdowns.",
  "Haftalık dağılım için en az iki hafta gerekir.":
    "The weekly split needs at least two weeks.",
  "{count} sorgu · {clicks} tıklama": "{count} queries · {clicks} clicks",
  "(sorgu tıklamalarının {share} kadarı)": "({share} of query clicks)",
  "Tıklama oranı {ctr} · ortalama sıra {position}":
    "CTR {ctr} · average position {position}",
  "Marka aramaları": "Brand searches",
  "Marka dışı aramalar": "Non-brand searches",
  "{count} sorgu · tıklama oranı {ctr} · ortalama sıra {position}":
    "{count} queries · CTR {ctr} · average position {position}",
  "Marka adları: {terms}. Paylar okunan sorgulara göre; gizli sorgular dahil değil.":
    "Brand names: {terms}. Shares are of the queries read; hidden queries aren't included.",
  "Marka adlarını düzenle": "Edit brand names",
  "Sorgularınız Google'da hangi sıralarda görünüyor.":
    "Where your queries show up on Google.",
  "Marka ve marka dışı aramalar": "Brand and non-brand searches",
  "Adınızla gelen aramalar ile sizi bilmeden bulanlar ayrı ölçülür.":
    "Searches for your name and searches by people who didn't know you are measured separately.",
  "Bir cihaza tıklayınca tüm ekran o cihaza göre daralır.":
    "Click a device to narrow the whole screen to it.",
  "Bir ülkeye tıklayınca tüm ekran o ülkeye göre daralır.":
    "Click a country to narrow the whole screen to it.",
  "Sonuçlarınızın Google'da hangi özel biçimlerle göründüğü. Google bu dökümü sayfa bazında toplar.":
    "The special formats your results appeared in on Google. Google totals this breakdown by page.",
  "Google bu dönem için özel bir sonuç biçimi (zengin sonuç, video vb.) bildirmedi.":
    "Google reported no special result format (rich result, video and so on) for this period.",
  "Soru ve uzun aramalar": "Questions and long searches",
  "Soru kalıbındaki aramalar ve {words} ya da daha çok kelimeli aramalar: içerik fikirlerinin en net kaynağı.":
    "Searches phrased as questions, and searches of {words} or more words: the clearest source of content ideas.",
  "Soru aramaları": "Question searches",
  "Uzun aramalar": "Long searches",
  "Paneli kapat": "Close panel",
  "Ayrıntı yüklenemedi": "Couldn't load details",
  "Search Console bağlantısı yok.": "Search Console isn't connected.",
  "{start} – {end}, kesin günler": "{start} – {end}, final days",
  "{key} için günlük tıklama, toplam {total}.":
    "Daily clicks for {key}, {total} in total.",
  "Bu sayfanın sorguları ({count})": "This page's queries ({count})",
  "Bu sorguda görünen sayfalar ({count})":
    "Pages showing for this query ({count})",
  "Bu sayfa için listelenen sorgu yok; tıklamaları Google'ın gizlediği sorgulardan geliyor olabilir.":
    "No queries listed for this page; its clicks may come from queries Google hides.",
  "Bu sorgu için sayfa satırı yok.": "No page rows for this query.",
  "Sorgu-sayfa tablosu satır sınırında kesildi; bazı eşleşmeler eksik olabilir.":
    "The query-page table was cut at the row limit; some pairs may be missing.",
  "Sorgu satırlarının toplamı sayfanın toplamından küçük olabilir: gizli sorgular listelenmez.":
    "This page's query rows can add up to less than its total: hidden queries aren't listed.",
  "Hedef sayfa": "Target page",
  "{count} sayfa bu sorguda": "{count} pages on this query",
  "Olası kazanç": "Possible gain",
  "Yetersiz veri": "Not enough data",
  "Sıra 4-20 arasındaki sorgular": "Queries at positions 4-20",
  "Marka dışı sorgularınızın her sıradaki tıklama oranı. Bir sırada en az {queries} sorgu ve {impressions} gösterim yoksa o sıra hesaba katılmaz; tahmin yapılmaz.":
    "Your non-brand queries' CTR at each position. A position needs at least {queries} queries and {impressions} impressions to count; nothing is estimated.",
  "Sorgularınızın her sıradaki tıklama oranı (marka adları tanımlanmadığı için marka aramaları dahil). Bir sırada en az {queries} sorgu ve {impressions} gösterim yoksa o sıra hesaba katılmaz; tahmin yapılmaz.":
    "Your queries' CTR at each position (brand searches included, since no brand names are set). A position needs at least {queries} queries and {impressions} impressions to count; nothing is estimated.",
  "İlk üçe yakın sorgular": "Queries close to the top three",
  "Ortalama sırası 4 ile 20 arasında, en az {impressions} gösterim alan {count} sorgu. İlk üçe çıkarlarsa birlikte yaklaşık {clicks} ek tıklama getirebilir.":
    "{count} queries with an average position between 4 and 20 and at least {impressions} impressions. Reaching the top three could bring about {clicks} more clicks between them.",
  "En büyük kazançlı {shown} tanesi listeleniyor.":
    "The {shown} with the largest gain are listed.",
  "Sırasına göre az tıklanan sonuçlar":
    "Results clicked less than their position suggests",
  "Tıklama oranı, sitenizde aynı sıradaki sonuçların ortalamasının {share} kadarından az olan ve en az {impressions} gösterim alan sorgular. Başlık ve açıklama yeniden yazılarak kazanılabilir.":
    "Queries whose CTR is under {share} of what your results at the same position get, with at least {impressions} impressions. A rewritten title and description can win these clicks.",
  "Sırasına göre belirgin biçimde az tıklanan sonuç yok ya da karşılaştırma için yeterli veri yok.":
    "No result is clearly under-clicked for its position, or there isn't enough data to compare.",
  "Bu sırada beklenen": "Expected at this position",
  "Görünen ama hiç tıklanmayan sayfalar":
    "Pages that show up but never get clicked",
  "Bu dönemde en az {impressions} gösterim alıp tek tıklama almayan sayfalar.":
    "Pages with at least {impressions} impressions and not a single click in this period.",
  "{shown} / {total} sayfa listeleniyor.": "{shown} of {total} pages listed.",
  "Gösterim alıp hiç tıklanmayan sayfa yok.":
    "No page got impressions without clicks.",
  "Sitenizin sıraya göre tıklama oranı": "Your site's CTR by position",
  "Yukarıdaki kazançların ölçüsü: başka sitelerin değil, sizin sonuçlarınızın her sıradaki tıklama oranı.":
    "The yardstick for the gains above: your own results' CTR at each position, not other sites'.",
  Web: "Web",
  Video: "Video",
  "Google güncellemesi": "Google update",
  Not: "Note",
  "Site denetimi tamamlandı": "Site audit completed",
  "Not eklendi": "Note added",
  "Not eklenemedi": "Couldn't add the note",
  "Not silindi": "Note deleted",
  "Not silinemedi": "Couldn't delete the note",
  "Grafikteki işaretler": "Chart markers",
  "Notu sil: {note}": "Delete note: {note}",
  "Örnek: Yeni sayfa başlıkları yayına alındı":
    "Example: New page titles went live",
  "Notu ekle": "Add the note",
  "Not ekle": "Add a note",
  "Bu dönemin dışındaki notlar ({count})":
    "Notes outside this period ({count})",
  "Önceki dönemle": "Against previous period",
  "Geçen yılla": "Against last year",
  "Karşılaştırma yok": "No comparison",
  Yenilenemedi: "Couldn't refresh",
  "Google'da kaç kez göründüğünüz, kaç tıklama aldığınız ve önce neyi düzeltmeniz gerektiği.":
    "How often you show up on Google, how many clicks you get, and what to fix first.",
  "Sorgular (CSV)": "Queries (CSV)",
  "Sayfalar (CSV)": "Pages (CSV)",
  "İlk üçe yakın sorgular (CSV)": "Queries close to the top three (CSV)",
  "Sorguları E-Tablolar'a aktar": "Export queries to Sheets",
  "Sayfaları E-Tablolar'a aktar": "Export pages to Sheets",
  Karşılaştırma: "Comparison",
  "Mülk: {site}": "Property: {site}",
  "Bu dönemde hiç gösterim yok": "No impressions in this period",
  "Seçili cihaz, ülke ya da arama türü için Google bu günlerde sitenizi hiç göstermedi. Filtreleri genişletmeyi deneyin.":
    "Google didn't show your site for the selected device, country or search type on these days. Try widening the filters.",
  "Google bu günlerde sitenizi arama sonuçlarında göstermedi. Yeni bir siteyse birkaç gün sonra tekrar bakın; değilse dizin durumunu Site denetimi'nden kontrol edin.":
    "Google didn't show your site in search results on these days. If the site is new, check back in a few days; if not, check its index status in Site audit.",
  "Aynı sorguda birden çok sayfanızın göründüğü durumlar. Sayfalar birbirinin tıklamasını bölebilir; birini ana sayfa yapıp diğerlerinden ona bağlantı vermek çoğu zaman yeter.":
    "Queries where more than one of your pages shows up. The pages can split each other's clicks; making one the main page and linking to it from the others is often enough.",
  "Sorgular ({count})": "Queries ({count})",
  "Değişimler ({count} düşüş)": "Changes ({count} falling)",
  Değişimler: "Changes",
  Çakışmalar: "Overlaps",
  "Geçen yıl": "Last year",
  "Önceki dönem": "Previous period",
  "Zaman içinde": "Over time",
  "Zaman birimi": "Time unit",
  "Bu zaman biriminde çizilecek kadar dönem yok.":
    "Not enough periods to draw in this time unit.",
  "{metric} ({grain})": "{metric} ({grain})",
  Kesinleşmedi: "Not final",
  "Gösterim yok": "No impressions",
  Kesin: "Final",
  "{count} dönemlik {metric} grafiği. En iyi dönem {day}, {value}.":
    "{metric} chart over {count} periods. Best period {day}, {value}.",
  "{metric} grafiği": "{metric} chart",
  "Eksik dönem": "Incomplete period",
  Gösterge: "Legend",
  "Taralı günler: Google hâlâ sayıyor, toplamlara katılmadı":
    "Hatched days: Google is still counting them; left out of the totals",
  "İçi boş nokta: eksik ya da kesinleşmemiş dönem":
    "Hollow dot: incomplete or not yet final period",
  "Karşılaştırma çizgisi yalnızca gün görünümünde.":
    "The comparison line shows in the day view only.",
  "Şu an önerilecek iş yok": "Nothing to recommend right now",
  "Search Console verisinde eşiği aşan bir fırsat ya da düşüş bulunmadı. Daha uzun bir dönem seçmek ya da birkaç gün sonra tekrar bakmak yeni bulgular çıkarabilir.":
    "No opportunity or drop above the thresholds in the Search Console data. A longer period, or checking back in a few days, may bring new findings.",
  "ilk {count} iş birlikte {days} günde yaklaşık {clicks} ek tıklama getirebilir (tahmin).":
    "the first {count} tasks could bring about {clicks} more clicks over {days} days together (estimate).",
  "Listedeki işlerin hepsini yapıldı olarak işaretlediniz.":
    "You've marked every task in the list as done.",
  "Yapıldı olarak işaretlenenler ({count})": "Marked as done ({count})",
  "Tıklama kazançları, sitenizin kendi sıra ve tıklama oranlarından hesaplanan yaklaşık değerlerdir. Aynı sorgu ya da sayfa için birden çok iş varsa üstteki özet onu bir kez sayar. Yapıldı işaretleri yalnızca bu tarayıcıda saklanır.":
    "Clicks gained are estimates from your site's own positions and CTR. When several tasks concern the same query or page, the summary above counts it once. Done marks are kept in this browser only.",
  "{rank}. sıradaki iş:": "Task {rank}:",
  "Marka adını gir": "Enter brand name",
  "Bu kırılımı aç": "Open this breakdown",
  Yapıldı: "Done",
  Tablet: "Tablet",
  "Önceki dönem tıklama": "Previous-period clicks",
  "Tıklama değişimi": "Click change",
  "Önceki dönem sıra": "Previous-period position",
  "↑{value} sıra": "↑{value} places",
  "↓{value} sıra": "↓{value} places",
  "“{query}” için ilk üçe çıkma fırsatı":
    "A chance for “{query}” to reach the top three",
  "Sıra {position} · {impressions} gösterim · {clicks} tıklama":
    "Position {position} · {impressions} impressions · {clicks} clicks",
  "Hedef sayfayı bu sorguya göre güçlendirin: başlıkta ve ilk paragrafta sorgunun cevabını verin, ilgili sayfalarınızdan bu sayfaya bağlantı ekleyin.":
    "Strengthen the target page for this query: answer it in the title and first paragraph, and link to the page from your related pages.",
  "“{query}” görülüyor ama az tıklanıyor":
    "“{query}” is seen but rarely clicked",
  "Tıklama oranı {ctr}; sitenizde bu sıradaki sonuçların oranı {expected} · sıra {position} · {impressions} gösterim":
    "CTR {ctr}; your results at this position get {expected} · position {position} · {impressions} impressions",
  "Sayfa başlığını ve açıklamasını aramadaki niyete göre yeniden yazın: sorgunun kelimelerini kullanın, bir sayı, yıl ya da açık bir fayda ekleyin.":
    "Rewrite the page title and description for the intent behind the search: use the query's words, add a number, a year or a clear benefit.",
  "“{query}” sorgusundan gelen tıklamalar düştü": "Clicks from “{query}” fell",
  "{page} sayfasının tıklamaları düştü": "Clicks to {page} fell",
  "Sıra da düştü: içeriği güncelleyin, aramadaki sorulara bugünkü cevabı verin ve sayfaya iç bağlantıları artırın.":
    "Position fell too: update the content, answer today's version of the question, and add internal links to the page.",
  "Sıra yerinde, tıklama düştü: talep azalmış ya da sonuç sayfasına yeni bir öğe gelmiş olabilir. Başlığı ve açıklamayı gözden geçirin.":
    "Position held, clicks fell: demand may have dropped or something new appeared on the results page. Review the title and description.",
  "{page} eski gücünü kaybediyor": "{page} is losing ground",
  "Son çeyrekte {clicks} tıklama; en iyi çeyreği {peak} tıklama ({start} – {end})":
    "{clicks} clicks last quarter; its best quarter had {peak} ({start} – {end})",
  "Sayfayı tazeleyin: eskiyen bilgileri düzeltin, yeni çıkan soruları ekleyin ve güncellediğiniz tarihi sayfada gösterin.":
    "Refresh the page: fix outdated information, answer new questions, and show the date you updated it.",
  "{page} görünüyor ama hiç tıklanmıyor":
    "{page} shows up but never gets clicked",
  "{impressions} gösterim, 0 tıklama · sıra {position}":
    "{impressions} impressions, 0 clicks · position {position}",
  "İkinci sayfadan sonrasında görünüyor: önce sırasını yükseltin; içeriği derinleştirin ve diğer sayfalarınızdan bağlantı verin.":
    "It shows up past page one: raise its position first; deepen the content and link to it from your other pages.",
  "İlk sayfada olduğu hâlde tıklanmıyor: başlık ve açıklama aramayla örtüşmüyor olabilir, yeniden yazın.":
    "It's on page one but not clicked: the title and description may not match the search; rewrite them.",
  "“{query}” sorgusunda artık görünmüyorsunuz":
    "You no longer show up for “{query}”",
  "Önceki dönemde {clicks} tıklama, {impressions} gösterim; bu dönemde gösterim yok":
    "{clicks} clicks and {impressions} impressions in the previous period; no impressions in this one",
  "Bu sorguyu karşılayan sayfa hâlâ yayında ve dizinde mi bakın; içerik değiştiyse sorgunun cevabını sayfaya geri ekleyin.":
    "Check that the page answering this query is still live and indexed; if the content changed, add the answer back.",
  "Tıklama oranı {ctr} (site geneli {site})": "CTR {ctr} (site-wide {site})",
  "sıra {position} (site geneli {site})":
    "position {position} (site-wide {site})",
  "{device} aramalarında geride kalıyorsunuz":
    "You're falling behind in {device} searches",
  "{country} aramalarında geride kalıyorsunuz":
    "You're falling behind in searches from {country}",
  "Sayfalarınızı bu cihazda açıp okunurluğu ve hızı kontrol edin; Site denetimi'ndeki hız sonuçları nereden başlanacağını gösterir.":
    "Open your pages on this device and check readability and speed; the speed results in Site audit show where to start.",
  "Bu ülkedeki aramalara uygun dilde ve içerikte sayfanız var mı bakın; çok dilli bir siteyse hreflang ayarlarını gözden geçirin.":
    "Check that you have pages in the right language and content for searches from this country; for a multilingual site, review the hreflang settings.",
  "{date} günü tıklamalarda olağan dışı düşüş":
    "Unusual drop in clicks on {date}",
  "{date} günü gösterimlerde olağan dışı düşüş":
    "Unusual drop in impressions on {date}",
  "{value}; önceki haftaların aynı gününde ortası {expected}":
    "{value}; the median for the same weekday in earlier weeks is {expected}",
  "O gün sitede bir değişiklik, kesinti ya da Google güncellemesi oldu mu bakın; grafikteki işaretler yardımcı olur.":
    "Check whether the site changed, went down or a Google update happened that day; the chart markers help.",
  "Marka adınızı tanımlayın": "Set your brand name",
  "Marka sorguları ayrılmadan sitenin tıklama oranı beklentisi şişer ve fırsatlar eksik çıkar.":
    "Without separating brand searches, your site's expected CTR is inflated and opportunities are missed.",
  "Marka adınızı ve yazılışlarını ekleyin; marka ve marka dışı aramalar ayrı ölçülür.":
    "Add your brand name and its spellings; brand and non-brand searches are then measured separately.",
  "Güven: yüksek": "Confidence: high",
  "Güven: orta": "Confidence: medium",
  "Güven: düşük": "Confidence: low",
  Podcast: "Podcast",
  "{start} – {end} ({days} gün)": "{start} – {end} ({days} days)",
  "{start} – {end}": "{start} – {end}",
  "Son veri": "Latest data",
  Oluşturulma: "Created",
  "Arama performansı raporu": "Search performance report",
  "Değişimler önceki {days} güne göre. Sıra değişimi yer olarak verilir (↑ yükseldi); tıklama oranı değişimi puan olarak.":
    "Changes are against the previous {days} days. Position change is in places (↑ moved up); CTR change in points.",
  "Önceki dönem Google'da olmadığı için değişim gösterilmez.":
    "No change is shown because Google doesn't have the previous period.",
  "Son günler hâlâ sayılıyor ({clicks} tıklama); toplamlara ve karşılaştırmalara katılmadı.":
    "The latest days are still being counted ({clicks} clicks); left out of totals and comparisons.",
  "Google'ın gizlediği sorgulardan gelen tıklama: {share}. Bu yüzden sorgu tablolarının toplamı site toplamından küçüktür.":
    "Clicks from queries Google hides: {share}. That is why the query tables add up to less than the site total.",

  Yapılacaklar: "To do",
  "Search Console verisinde eşiği aşan bir fırsat ya da düşüş bulunmadı.":
    "No opportunity or drop above the thresholds in the Search Console data.",
  "Önce bunlar": "Start with these",
  "İlk {count} iş, kazancı tahmin edilemeyen işler.":
    "The first {count} tasks, with gains that can't be estimated.",
  "İlk {count} iş birlikte {days} günde yaklaşık {clicks} ek tıklama getirebilir (tahmin).":
    "The first {count} tasks could bring about {clicks} more clicks over {days} days together (estimate).",
  "Tıklama kazançları, sitenizin kendi sıra ve tıklama oranlarından hesaplanan yaklaşık değerlerdir. Aynı sorgu ya da sayfa için birden çok iş varsa özet onu bir kez sayar.":
    "Clicks gained are estimates from your site's own positions and CTR. When several tasks concern the same query or page, the summary counts it once.",
  "Günlük tıklama": "Daily clicks",
  "Bu dönem": "This period",
  "Hâlâ sayılan günler": "Days still being counted",
  "{days} günde {clicks} tıklama; en iyi gün {day}, {best} tıklama.":
    "{clicks} clicks over {days} days; best day {day}, {best} clicks.",
  "Bu dönemde tıklama yok.": "No clicks in this period.",
  İşaretler: "Markers",
  "Ortalama sırası 4 ile 20 arasında, en az {impressions} gösterim alan {count} sorgu. Olası kazanç, ilk üçe çıkarsa beklenen ek tıklamadır.":
    "{count} queries with an average position between 4 and 20 and at least {impressions} impressions. Possible gain is the extra clicks expected if they reach the top three.",
  "Bu aralıkta sorgu yok.": "No queries in this range.",

  "Belirgin biçimde az tıklanan sonuç yok.":
    "No result is clearly under-clicked.",
  "Beklenen oran: sitenizde aynı sıradaki sonuçların tıklama oranı.":
    "Expected rate: the CTR of your results at the same position.",

  "En az {queries} sorgu ve {impressions} gösterim olmayan sıralar için oran hesaplanmaz.":
    "Positions without at least {queries} queries and {impressions} impressions get no rate.",
  Önceki: "Before",

  "Önceki dönem: {start} – {end}. Tıklama sayıları.":
    "Previous period: {start} – {end}. Click counts.",
  "Tıklaması düşen sorgular": "Queries with falling clicks",
  "Tıklaması düşen sayfalar": "Pages with falling clicks",
  "Tıklaması artan sorgular": "Queries with rising clicks",
  "Tıklaması artan sayfalar": "Pages with rising clicks",
  "Yeni görünen sorgular": "Newly showing queries",

  "Kaybolan sorgular (önceki dönemdeki değerleriyle)":
    "Lost queries (with their previous-period numbers)",

  "Çeyrek: 91 gün.": "Quarter: 91 days.",
  "Son çeyrek": "Last quarter",
  "En iyi çeyrek": "Best quarter",

  "Google'ın tercih ettiği sayfa": "Page Google prefers",

  "Paylar sitenin toplamına göre.": "Shares are of the site total.",
  "Paylar satırların toplamına göre.": "Shares are of the rows' total.",
  "İlk {limit} / {total}.": "First {limit} of {total}.",
  "Bilinmiyor: marka adları tanımlanmadı.": "Unknown: no brand names set.",
  "Marka adları: {terms}.": "Brand names: {terms}.",
  "Okunan sorguların ortalama sırasına göre.":
    "By the average position of the queries read.",

  "Paylar okunan sorguların tıklamasına göre.":
    "Shares are of the clicks of the queries read.",
  "{words}+ kelimeli aramalar": "Searches of {words}+ words",
  "Google Search Console API, bu mülk için. Başka bir veri kaynağı, tahmini hacim ya da rakip verisi kullanılmadı.":
    "The Google Search Console API, for this property. No other data source, estimated volume or competitor data was used.",

  "Site toplamları": "Site totals",
  "Site toplamı tarihe göre istenen toplamdan gelir, sorgu ya da sayfa satırlarının toplamından değil. Ortalama sıra gösterime göre ağırlıklıdır; tıklama oranı tıklama bölü gösterimdir.":
    "The site total comes from the request grouped by date, not from adding up query or page rows. Average position is weighted by impressions; CTR is clicks divided by impressions.",

  "Kazanç tahminleri": "Gain estimates",
  "Sitenizin kendi sıra-tıklama oranı eğrisinden hesaplanır; yeterli veri olmayan sıralar için tahmin yapılmaz.":
    "Taken from your site's own position-to-CTR curve; positions without enough data get no estimate.",
  "Google istekleri": "Google requests",

  "Yöntem ve sınırlar": "Method and limits",
  "{host} arama performansı, {start} – {end}{filters}":
    "{host} search performance, {start} – {end}{filters}",
  "{days} günde {clicks} tıklama, {impressions} gösterim.":
    "{clicks} clicks and {impressions} impressions over {days} days.",
  "Tıklama oranı {ctr}, ortalama sıra {position}.":
    "CTR {ctr}, average position {position}.",
  "İlk iş: {title}.": "First task: {title}.",
  "Arama performansı raporu saklama sınırını aşıyor. Daha kısa bir dönem ya da filtre seçip yeniden deneyin.":
    "The search performance report is over the storage limit. Choose a shorter period or a filter and try again.",
  "Şu an 4. ile 20. sıra arasında yeterli gösterimi olan sorgu yok. Sorgular bu aralığa girdikçe burada listelenir.":
    "No query with enough impressions sits between positions 4 and 20 right now. Queries show up here as they enter that range.",
  "Ortalama sırası 4–20 olan {count} sorgu; ilk üçe çıkarlarsa yaklaşık {clicks} ek tıklama.":
    "{count} queries average positions 4–20; reaching the top three could bring about {clicks} more clicks.",
  "Ek tıklama tahmini": "Estimated extra clicks",
  "Onaylanmadı.": "Not confirmed.",
  "Alan adından önerilen adlar: {terms}.":
    "Names suggested from your domain: {terms}.",
  "Önerileri onayla": "Confirm suggestions",
  "Alan adından önerilen marka adlarıyla ölçüldü: {terms}. Onaylayın ya da düzeltin.":
    "Measured with brand names suggested from your domain: {terms}. Confirm or correct them.",
  // Cards and stats review (Opportunities, rankings, setup verdict).
  "En fazla kazanılabilecek tıklama / ay (üst sınır)":
    "At most this many extra clicks / month (upper bound)",
  "Aramaların toplamı daha büyük; sayfanın tamamı hedef orana ulaşsa alacağı kadarla sınırlandı.":
    "The searches add up to more; capped at what the whole page would get at the target rate.",
  "2. sayfa, 11-20. sıra": "page two, positions 11-20",
  // Cards and stats review (Opportunities, rankings, setup verdict).
  "ilk {count} iş birlikte {days} günde en fazla {clicks} ek tıklama getirebilir (üst sınır).":
    "together, the first {count} tasks could bring at most {clicks} extra clicks in {days} days (upper bound).",
  // Cards and stats review (Opportunities, rankings, setup verdict).
  "İlk sayfada ama ilk üçün altında. Bir basamak yükselmek (6-10'dan 4-5'e, 4-5'ten 2-3'e) tıklamayı belirgin artırır.":
    "On page one but below the top three. One step up (6-10 to 4-5, 4-5 to 2-3) raises clicks noticeably.",
  "bir basamak yukarı": "one step up",
  "Her sayfanın Google'da çıktığı her arama ayrı ayrı ele alınır. İlk sayfadaki bir arama sitenizin aynı sıradaki aramalarının tıklama oranının %70'inin altındaysa kazanç o orana ulaşmaktır (başlık işi). Diğer her arama yalnızca bir basamak yükselir: 6-10. sıradan 4-5'in oranına, 4-5. sıradan 2-3'ün oranına, 2. sayfadan ilk sayfanın (6-10. sıra) oranına, daha geriden 2. sayfanın (11-20. sıra) oranına. Bir sayfanın toplamı, aramaları sıra gruplarına ayrılıp her grup bir basamak yükselse alacağı ek tıklamayı geçemez. Oranlar başka sitelerden değil, sizin sitenizden ölçülür; bu yüzden üstteki sayı bir üst sınırdır, söz değildir.":
    "Each search a page appears for is taken on its own. If a search on page one gets less than 70% of the click-through your site's searches get at that position, the gain is reaching that rate (title work). Every other search moves up one step only: from 6-10 to the rate of 4-5, from 4-5 to the rate of 2-3, from page two to the rate of page one (positions 6-10), from further back to the rate of page two (positions 11-20). A page's total cannot exceed what its searches would gain if each group of them at the same position moved up one step. The rates come from your own site, not other sites, so the figure above is an upper bound, not a promise.",
  "Ortalama sırası 4 ile 20 arasında, en az {impressions} gösterim alan {count} sorgu. Her biri bir basamak yükselirse (6-10'dan 4-5'e, 4-5'ten 2-3'e, 11-20'den ilk sayfaya) birlikte en fazla {clicks} ek tıklama getirebilir (üst sınır).":
    "{count} queries averaging positions 4 to 20 with at least {impressions} impressions. If each moves up one step (6-10 to 4-5, 4-5 to 2-3, 11-20 to page one), together they could bring at most {clicks} extra clicks (upper bound).",
  // Search performance review, 2026-10-26
  "Aynı sorgu, birden çok sayfa": "Pages competing for one query",
  "Birden çok sayfanın yarıştığı sorgu": "Queries with competing pages",
  "{count} / {total}": "{count} / {total}",
  "incelenen sorguların {share} kadarı": "{share} of the queries examined",
  "Ana sayfa dışına giden gösterim": "Impressions going to the other pages",
  "incelenen gösterimlerin {share} kadarı":
    "{share} of the impressions examined",
  "2. sayfa {share} gösterim alıyor":
    "the second page gets {share} of impressions",
  "Diğer {count} sayfa {share} gösterim alıyor": {
    one: "{count} other page gets {share} of impressions",
    other: "the other {count} pages get {share} of impressions",
  },
  "{impressions} gösterim · {clicks} tıklama":
    "{impressions} impressions · {clicks} clicks",
  "1 yıl önce": "A year ago",
  "Çeyrek başına tıklama, eskiden yeniye: {values}":
    "Clicks per quarter, oldest to newest: {values}",
  "Yalnızca bir dönemde en az {impressions} gösterim alan sorgular, en çok gösterimden aza.":
    "Queries with at least {impressions} impressions in only one of the two periods, most impressions first.",
  "{count} tanesi hiç tıklama almadı.": {
    one: "{count} of them got no clicks.",
    other: "{count} of them got no clicks.",
  },
  "Veriler {date} tarihine kadar kesin; son {count} gün hâlâ sayılıyor (grafikte taralı).":
    {
      one: "Data is final up to {date}; Google is still counting the last {count} day (hatched in the chart).",
      other:
        "Data is final up to {date}; Google is still counting the last {count} days (hatched in the chart).",
    },
  "Veriler {date} tarihine kadar kesin.": "Data is final up to {date}.",
  "Karşılaştırma: geçen yılın aynı günleri ({start} – {end}).":
    "Compared with the same days last year ({start} – {end}).",
  "Karşılaştırma: önceki {days} gün ({start} – {end}).":
    "Compared with the previous {days} days ({start} – {end}).",
  "Search Console mülkü: {site}": "Search Console property: {site}",
  "Veri hakkında": "About the data",
  "Kesin günler: {start} – {end} ({days} gün). Search Console bir günü birkaç gün boyunca saymaya devam eder; toplamlar ve karşılaştırmalar yalnızca sayımı bitmiş günleri kullanır. Günler Google'ın kullandığı Pasifik saatine göredir.":
    "Final days: {start} – {end} ({days} days). Search Console keeps counting a day for several days; totals and comparisons use only the days it has finished counting. Days follow Pacific time, as Google does.",
  "Son {count} gün hâlâ sayılıyor olabilir (Google tarih bildirmedi); toplamlara katılmadı.":
    {
      one: "Google may still be counting the last {count} day (it gave no date); it is left out of the totals.",
      other:
        "Google may still be counting the last {count} days (it gave no date); they are left out of the totals.",
    },
  "Son {count} gün hâlâ sayılıyor; toplamlara katılmadı.": {
    one: "Google is still counting the last {count} day; it is left out of the totals.",
    other:
      "Google is still counting the last {count} days; they are left out of the totals.",
  },
  "Tıklamaların {share} kadarı ({clicks}) Google'ın gizlilik nedeniyle göstermediği aramalardan geliyor. Site toplamına dahil, sorgu tablosunda yok; bu yüzden sorgu tablosunun toplamı daha küçüktür.":
    "{share} of clicks ({clicks}) come from searches Google does not show for privacy reasons. They are in the site total but not in the query table, which is why the query table adds up to less.",
  "Tıklamaların {share} kadarı, Google'ın gizlilik nedeniyle göstermediği ya da satır sınırının dışında kalan aramalardan geliyor. Site toplamına dahil, sorgu tablosunda yok.":
    "{share} of clicks come from searches Google does not show for privacy reasons or that fall past the row limit. They are in the site total but not in the query table.",
  "Bu görünüm için Google'a {count} istek gönderildi.": {
    one: "This view sent {count} request to Google.",
    other: "This view sent {count} requests to Google.",
  },
  "Bu görünüm birkaç dakika içinde alınmış yanıtlardan geldi; Google'a yeni istek gönderilmedi.":
    "This view came from answers fetched in the last few minutes; no new request went to Google.",
  "Marka aramaları ayrılmadı": "Brand searches are not separated",
  "Marka adınızı girmeden hangi aramaların sizi adınızla bulduğu bilinemez.":
    "Without your brand name there is no telling which searches found you by name.",
  "Marka adını ekle": "Add brand name",
  "Önceki dönemle karşılaştırılamadı.":
    "Could not compare with the previous period.",
  "Bu ay henüz tamamlanmadı ({days} gün)":
    "This month is not over yet ({days} days so far)",
  "Son çubuk kesik çizgili: bu ay henüz tamamlanmadı.":
    "The last bar is dashed: this month is not over yet.",
  "Sıra {position} · tıklama oranı {ctr} (bu sırada {expected}) · {gain}":
    "Position {position} · CTR {ctr} ({expected} at this position) · {gain}",
  "Olası kazanç (en fazla)": "Possible gain (at most)",
  "{share} tıklama": "{share} of clicks",
  "Sorgu sayısı": "Number of queries",
  "Tıklama payı": "Share of clicks",
  "{date} (eksik veri)": "{date} (incomplete data)",
  "Arşivde eksik; paylar karşılaştırılamaz":
    "Incomplete in the archive; shares are not comparable",
  "Arşiv {count} haftalık; soluk çubuklu haftalar eksik veri, paylar onlarla karşılaştırılamaz.":
    {
      one: "The archive holds {count} full week; faded weeks have incomplete data and their shares are not comparable.",
      other:
        "The archive holds {count} full weeks; faded weeks have incomplete data and their shares are not comparable.",
    },
  "Arşivde henüz tam bir hafta yok; soluk çubuklar eksik veri, paylar karşılaştırılamaz.":
    "The archive has no full week yet; faded bars have incomplete data and their shares are not comparable.",
  "Sıralama fırsatları ({count})": "Ranking opportunities ({count})",
  "Google hâlâ sayıyor; bu gün toplamlara katılmadı":
    "Google is still counting; this day is not in the totals",
  "Son {days} günde {clicks} tıklama, {impressions} gösterim.":
    "{clicks} clicks and {impressions} impressions in the last {days} days.",
  "Son {days} günde tıklamalar geçen yılın aynı günleriyle aynı.":
    "Clicks over the last {days} days match the same days last year.",
  "Son {days} günde tıklamalar geçen yıla göre {share} arttı.":
    "Clicks over the last {days} days are up {share} on last year.",
  "Son {days} günde tıklamalar geçen yıla göre {share} azaldı.":
    "Clicks over the last {days} days are down {share} on last year.",
  "Son {days} günde tıklamalar önceki dönemle aynı.":
    "Clicks over the last {days} days match the period before.",
  "Son {days} günde tıklamalar önceki döneme göre {share} arttı.":
    "Clicks over the last {days} days are up {share} on the period before.",
  "Son {days} günde tıklamalar önceki döneme göre {share} azaldı.":
    "Clicks over the last {days} days are down {share} on the period before.",
  "Tıklama oranı {points} puan arttı.": "CTR rose {points} points.",
  "Tıklama oranı {points} puan düştü.": "CTR fell {points} points.",
  "Ortalama sıra {places} basamak yükseldi.":
    "Average position improved by {places}.",
  "Ortalama sıra {places} basamak geriledi.":
    "Average position slipped by {places}.",
  "Önce yapılacak {count} iş hazır.": {
    one: "{count} first task is ready.",
    other: "The first {count} tasks are ready.",
  },
  "Önce yapılacak {count} iş birlikte en fazla {clicks} ek tıklama getirebilir (üst sınır).":
    {
      one: "The first {count} task could bring at most {clicks} more clicks (an upper bound).",
      other:
        "The first {count} tasks together could bring at most {clicks} more clicks (an upper bound).",
    },
  "Tüm yapılacaklar ({count})": "All to-dos ({count})",
  "en fazla +{count} tıklama": {
    one: "at most +{count} click",
    other: "at most +{count} clicks",
  },
  "Sıra {position}": "Position {position}",
  "Neden ve ne yapmalı": "Why, and what to do",
  "Bu iş yapılırsa aynı uzunlukta bir dönemde beklenen en fazla ek tıklama (üst sınır).":
    "The most extra clicks to expect over a period of the same length if this is done (an upper bound).",
  "Değişmedi (±{value} sıra)": "No change (±{value} places)",
  "≈ +{count} tıklama": { one: "≈ +{count} click", other: "≈ +{count} clicks" },
  "{count} sorgu ilk üçe yakın": {
    one: "{count} query close to the top three",
    other: "{count} queries close to the top three",
  },
  "{count} sonuç sırasına göre az tıklanıyor": {
    one: "{count} result gets few clicks for its position",
    other: "{count} results get few clicks for their position",
  },
  "{count} sorgudan gelen tıklama düştü": {
    one: "Clicks fell for {count} query",
    other: "Clicks fell for {count} queries",
  },
  "{count} sayfanın tıklaması düştü": {
    one: "Clicks fell for {count} page",
    other: "Clicks fell for {count} pages",
  },
  "{count} sayfa eski gücünü kaybediyor": {
    one: "{count} page is losing its old strength",
    other: "{count} pages are losing their old strength",
  },
  "{count} sayfa görünüyor ama hiç tıklanmıyor": {
    one: "{count} page is seen but never clicked",
    other: "{count} pages are seen but never clicked",
  },
  "{count} sorguda artık görünmüyorsunuz": {
    one: "You no longer appear for {count} query",
    other: "You no longer appear for {count} queries",
  },
  "{count} cihazda geride kalıyorsunuz": {
    one: "You trail on {count} device type",
    other: "You trail on {count} device types",
  },
  "{count} ülkede geride kalıyorsunuz": {
    one: "You trail in {count} country",
    other: "You trail in {count} countries",
  },
  "{count} günde olağan dışı düşüş": {
    one: "An unusual drop on {count} day",
    other: "Unusual drops on {count} days",
  },
  "{date}: tıklama": "{date}: clicks",
  "{date}: gösterim": "{date}: impressions",
  "Tıklama farkı": "Click change",
  sürüyor: "in progress",
  Oran: "CTR",
  // Search performance review fixes: brand confirmation, windows, archive lag
  "Marka adları: {terms} (önerilen, onaylanmadı).":
    "Brand terms: {terms} (suggested, not confirmed).",
  "Marka adını onayla": "Confirm your brand name",
  "Marka aramaları şimdilik alan adından önerilen adlarla ayrılıyor: {terms}. Onaylanana kadar bu ayrım bir tahmin.":
    "Brand searches are split for now by names suggested from your domain: {terms}. Until you confirm them, the split is an estimate.",
  "Önerilen adlar doğruysa onaylayın; değilse markanızın adını ve yazılışlarını girin.":
    "If the suggested names are right, confirm them; if not, enter your brand's name and how people spell it.",
  "Dönem: {start} – {end}.": "Period: {start} – {end}.",
  "Ayın son günleri henüz gelmedi ({days} gün)":
    "The month's last days have not arrived yet ({days} days)",
  "Son çubuk kesik çizgili: ayın son günleri Search Console'dan henüz gelmedi.":
    "The last bar is dashed: the month's last days have not arrived from Search Console yet.",
  "Haftalık dağılım yalnızca Web aramaları için.":
    "The weekly distribution is for Web searches only.",
  "Marka aramaları dahil değildir.": "Brand searches are excluded.",
  "Tam günler Google tarafından doğrulandı":
    "Complete days confirmed by Google",
  "Tam gün sınırı veri gecikmesine göre varsayıldı":
    "Complete-day boundary assumed from reporting lag",
  "Önceki sonuç gösteriliyor; seçili dönem henüz yüklenmedi.":
    "Showing the previous result; the selected period has not loaded yet.",
  "En fazla +{gain} tıklama / 30 gün (üst sınır)":
    "Up to +{gain} clicks / 30 days (upper bound)",
  "{count} sayfada · bu sayfaların tüm tıklamaları 30 güne ölçekli: {clicks}; üst sınırın bu tabana oranı {share}":
    "Across {count} pages · all clicks on these pages, scaled to 30 days: {clicks}; upper bound relative to that base: {share}",
  "Eksik sorgu, yetersiz gösterim veya eksik hedef oranı; kazanç yok anlamına gelmez.":
    "Missing queries, too few impressions or no target rate; this does not mean there is no opportunity.",
  "Analytics bu kez okunamadı; aşağıdaki kaynak notunu kontrol edin.":
    "Analytics could not be read this time; check the source note below.",
  "Analytics verisi sınırlı; eksik ölçümler sıfır değildir ve dönüşüm yorumu yapılamayabilir.":
    "Analytics data is limited; missing measurements are not zero and may not support a conversion verdict.",
  "Hesaplanabilen tüm sayfalardaki ölçülmüş dönüşüm sinyali · listele":
    "Observed conversion signal across all estimable pages · show pages",
  "İş listesi: {shown} / {total} eşleşen sayfa":
    "Worklist: {shown} / {total} matching pages",
  "Analytics değeri bilinmiyor; bağlantı, eşleşme ve kaynak kısıtlarını kontrol edin.":
    "Analytics value unknown; check the connection, URL match and source limitations.",
  "Ölçülen gösterim (30 güne ölçekli)":
    "Observed impressions (scaled to 30 days)",
  "Analytics bu adres grubunu birlikte ölçüyor; oturumları farklı URL satırları arasında toplamayın.":
    "Analytics measures this URL group together; do not sum its sessions across separate URL rows.",
  "Karşılaştırılabilen marka dışı gösterim: {known}; oranı bilinmeyen: {unknown}.":
    "Comparable non-brand impressions: {known}; impressions without a known rate: {unknown}.",
  "Diğer aramalar (dağıtılmış kalan)": "Other queries (allocated remainder)",
  "Değişikliği not edin; aynı kapsamlı dönemlerde ölçülen tıklama, tıklama oranı ve sırayı Arama performansında karşılaştırın.":
    "Record the change; compare measured clicks, CTR and position for periods with the same scope in Search performance.",
  "Arama niyetini ve sayfanın kapsamını inceleyin":
    "Review search intent and page coverage",
  "Gösterimler ölçüldü; düşük sıra tek başına sayfayı silmek veya birleştirmek için kanıt değildir.":
    "Impressions were measured; a low position alone does not justify deleting or merging a page.",
  "Birleştirmeyi yalnızca sayfaların aynı ihtiyacı karşıladığını doğrularsanız değerlendirin.":
    "Consider merging only after confirming that the pages meet the same need.",
  "Önceliği ölçülen sorgulara göre belirleyin; düşük tahmin tek başına içerik kaldırma gerekçesi değildir.":
    "Prioritize using measured queries; a low estimate alone is no reason to remove content.",
  "Ortalama {position}. sıra; {impressions} gösterim, {clicks} tıklama ölçüldü. Hesaplanabilen aramalarda 30 güne ölçekli en fazla +{gain} tıklama (üst sınır); gerçekleşme sözü değildir.":
    "Average position {position}; {impressions} impressions and {clicks} clicks measured. Up to +{gain} clicks scaled to 30 days for estimable queries (upper bound); no guarantee of results.",
  "Hesaplanan kazanç yalnızca alınan ve tanımlanabilen aramaları kapsar; gizli sorguların payı bilinmiyor. Panelin sorgu tahminiyle toplanmaz.":
    "The estimate covers only fetched, identifiable queries; the share of hidden queries is unknown. Do not add it to the dashboard query estimate.",
  "Ölçülen sıfır: {zero}; yetersiz gösterim: {small}; eksik hedef oranı: {curve}; Google'ın aramalarını gizlediği sayfa: {pairs}.":
    "Measured zero: {zero}; too few impressions: {small}; missing target rate: {curve}; pages whose searches Google withheld: {pairs}.",
  "Search Console satır sınırına ulaşıldı; toplamlar tüm siteyi kapsamaz.":
    "Search Console row limit reached; totals do not cover the entire site.",
  "Aynı takvim günleri farklı saat dilimlerinde aynı an aralığı değildir. Analytics, tüm Organic Search kanalını kapsar.":
    "The same calendar days in different time zones are not the same time interval. Analytics covers the entire Organic Search channel.",
  "Analytics kotası doldu. Bir süre bekleyip Yenile’ye basın.":
    "Analytics quota exhausted. Wait a while, then select Refresh.",
  "Analytics izni veya mülk erişimi yok. Bağlantıları ayarla ekranında erişimi doğrulayın.":
    "Analytics permission or property access is missing. Verify access in connection settings.",
  "Analytics yanıtı okunamadı. İnternet bağlantısını kontrol edip Yenile’ye basın.":
    "The Analytics response could not be read. Check your internet connection and select Refresh.",
  "{start} – {end} aralığında bu mülk için sayfa satırı dönmedi. Bu, hiç gösterim olmadığı anlamına gelmez; Arama performansında mülkü kontrol edin veya dönemi genişletin.":
    "No page rows were returned for this property for {start} – {end}. This does not mean there were no impressions; check the property in Search performance or widen the period.",
  "{start} – {end} aralığında hesaplanabilen {count} sayfada ek kazanç hesaplanmadı. Bu, yapılacak iş olmadığı anlamına gelmez.":
    "No additional gain was calculated for {count} estimable pages for {start} – {end}. This does not mean there is no work to do.",
  "30 güne ölçekli üst sınır; çubuklar en büyük iş türüne göredir. Bir sayfa birden fazla işte sayılabilir. Seçim tüm hesaplanabilir sayfalara uygulanır.":
    "Upper bound scaled to 30 days; bars compare with the largest work category. A page can count in several categories. Selection applies to all estimable pages.",
  "Hesaplanamayan kapsam": "Unestimable scope",
  Sırala: "Sort",
  "Daha uzun bir dönem seçmek daha çok arama gösterebilir.":
    "A longer period may show more searches.",
  "Google bu sayfaların aramalarını göstermiyor":
    "Google does not show the searches for these pages",
  "{hidden} sayfa gösterim aldı ama Search Console hangi aramalardan geldiğini vermedi: Google az aranan sorguları gizlilik için gizler. Arama bilinmeden kazanç hesaplanmaz. Bu bir hata değildir; site daha çok gösterim aldıkça tahminler kendiliğinden çıkar.":
    "{hidden} pages received impressions, but Search Console did not say which searches they came from: Google withholds rarely searched queries for privacy. Without the searches, no gain can be estimated. This is not an error; estimates appear on their own as the site gets more impressions.",
  "{count} sayfanın aramaları tahmin için yeterli gösterim almadı ya da sitenizde karşılaştırılacak sıra verisi yok.":
    "The searches for {count} pages had too few impressions for an estimate, or your site has no position data to compare against.",
  "Tahmini değiştirmez; yanında bir etiket olarak durur. Bu dönemde tahmin edilebilen sayfa olmadığı için eşleştirilecek bir şey yok.":
    "It does not change the estimate; it sits next to it as a label. No page could be estimated in this period, so there is nothing to match.",

  // Rankings archive scope and comparison evidence.
  "Son 5 yıllık arşiv": "Last 5 years of archive",
  "Daha fazla hareket göster": "Show more movements",
  "Kayıtlı geçmiş korunur. Bağlantıyı ve kotayı kontrol edin, sonra yeniden deneyin.":
    "Stored history is retained. Check the connection and quota, then retry.",
  "Kalan günler için devam edin; birden fazla çalıştırma gerekebilir.":
    "Continue to fetch the remaining days; several runs may be needed.",
  "Google taranan tarihler için sorgu satırı döndürmedi. Bu, arama yapılmadığını kanıtlamaz. Kalan tarihler varsa arşivi doldurmaya devam edin; toplam trafik için Arama performansını açın.":
    "Google returned no query rows for the scanned dates. This does not prove there were no searches. Continue filling any remaining dates; open Search performance for total traffic.",
  "Öncelik: mutlak sıra değişimi × kayıtlı gösterim. Bu bir inceleme sırasıdır, kayıp tıklama tahmini değildir.":
    "Priority: absolute position change × recorded impressions. This orders investigations; it does not estimate lost clicks.",
  "{count} sorgu; aynı {paired} sorguda net değişim. Çubuklar en büyük gruba görelidir.":
    "{count} queries; net change across the same {paired} queries. Bars are relative to the largest group.",
  "Aynı sorgu kümesinde net değişim; giriş veya çıkış sayısı değildir.":
    "Net change in the same query cohort, not the count of entries or exits.",
  "Bu gün sorgu gözlenmedi; API yanıtı tamamlandı.":
    "No query observation this day; the API response completed.",
  "Bu gün arşiv kapsamı eksik veya bilinmiyor.":
    "Archive coverage for this day is incomplete or unknown.",
  "Boşluklar doldurulmaz; sıra sıfır kabul edilmez. Ok tuşlarıyla günleri inceleyin.":
    "Gaps stay empty; position is never assumed to be zero. Use arrow keys to inspect days.",
  "Gözlenen gün": "Observed days",
  "Dönem ortalaması": "Period average",
  "İlk/son kayıtlı gün": "First/last recorded day",
  "Günlük değerler": "Daily values",
  "Arama performansında metin ara (tarih ve birebir sorgu korunmaz)":
    "Search text in Search performance (dates and exact query are not preserved)",
  "GSC Web · Ortalama sıra, sabit bir Google sırası değildir. Konum ve cihazla değişebilir.":
    "GSC Web · Average position is not a fixed Google rank. It can vary by location and device.",
  "Karşılaştırılabilen {count} sorguda {up} yükseldi, {down} geriledi.":
    "Of {count} comparable queries, {up} rose and {down} fell.",
  "Önce {query} sorgusunu inceleyin.": "Investigate {query} first.",
  "Karşılaştırılabilen sorgularda belirgin düşüş yok.":
    "No significant decline among comparable queries.",
  "Karşılaştırması bilinmeyen: {count}. Belirgin hareket eşiği: 0,5 sıra.":
    "Unknown comparisons: {count}. Significant movement threshold: 0.5 places.",
  "Arşiv kapsamı kısmi veya bilinmiyor. Hareketler yalnızca kayıtlı gözlemleri karşılaştırır; sitenin tamamını temsil etmez.":
    "Archive coverage is partial or unknown. Movements compare recorded observations only and do not represent the whole site.",
  "Tarih sonu üç günlük gecikme varsayımıdır; canlı tamlık doğrulaması değildir. Google gizli sorguları ve bazı üst sınır dışı satırları döndürmez.":
    "The end date assumes a three-day delay; it is not a live completeness check. Google omits hidden queries and some rows beyond its limits.",
  "API yanıtı tamamlanan / sınırlı / başarısız / bilinmeyen gün: {complete} / {limited} / {failed} / {unknown}":
    "Days with complete / limited / failed / unknown API responses: {complete} / {limited} / {failed} / {unknown}",
  "Önceki dönem API yanıtı tamamlanan gün: {complete} / {days}":
    "Previous-period days with complete API responses: {complete} / {days}",
  "Haftalık çizgilerde uç haftalar kısmi olabilir. Gün sayısı yalnızca sorgunun gözlendiği günleri sayar.":
    "Edge weeks may be partial. Day counts include only days when the query was observed.",
  "Arşivi doldurmaya devam et": "Continue filling archive",
  "Arşivde sorgu ara": "Search archived queries",
  "Tüm filtreleri kaldır": "Clear all filters",
  "Dönem ortalaması ilk 10": "Period average in top 10",
  "Yalnızca iki dönemde de gözlenen sorgular.":
    "Only queries observed in both periods.",
  "Gösterime göre üst çeyrek eşiği; eşitlikler dahil: {count}":
    "Top quartile impression threshold, including ties: {count}",
  "Filtreyle eşleşen sorgular: {matching} / {total}":
    "Matching queries: {matching} / {total}",
  "Filtreleri kaldırın, dönemi genişletin veya arşivi doldurmaya devam edin.":
    "Clear filters, widen the period or continue filling the archive.",
  "Bu dönemde gözlenmeyen: {count}. Bu, sıra kaybı anlamına gelmez.":
    "Not observed this period: {count}. This does not mean a ranking loss.",
  "En çok gösterim alan ilk 25 kayıt; arama kutusu bu listede de geçerlidir.":
    "First 25 records by impressions; the search box also filters this list.",
  "Google kotası doldu. Kota yenilendiğinde yeniden deneyin.":
    "Google quota is exhausted. Retry after it resets.",
  "Ağ bağlantısı kurulamadı. İnternet bağlantınızı kontrol edip yeniden deneyin.":
    "The network connection failed. Check your internet connection and retry.",
  "Taranan son gün: {date}": "Scanned through: {date}",
  "Karşılaştırması bilinmeyen: {count}. Belirgin hareket eşiği: {threshold} sıra.":
    "Unknown comparisons: {count}. Significant movement threshold: {threshold} places.",
  "En çok gösterim alan ilk {count} kayıt; arama kutusu bu listede de geçerlidir.":
    "First {count} records by impressions; the search box also filters this list.",
  "Bağlantı yok; gösterilen özet kayıtlı tarihsel gözlemlerdir.":
    "Disconnected; the summary shows stored historical observations.",
  "Seçilen dönem Search Console'un okunabilir kesin günleri dışında. Kullanılabilir dönem: {start} – {end}.":
    "The selected period is outside Search Console's readable complete days. Available period: {start} – {end}.",
  "Search Console yalnızca {start} ve sonrasını okuyabilir. Bu arşiv dönemi bütünüyle açılamaz.":
    "Search Console can only read {start} onwards. This archive period cannot be opened in full.",
  // Real-data dashboard and search explanations.
  "Önceki dönemde {clicks} tıklama, {impressions} gösterim vardı.":
    "Previous period — clicks: {clicks}; impressions: {impressions}.",
  "Geçen yıl aynı dönemde {clicks} tıklama, {impressions} gösterim vardı.":
    "Same period last year — clicks: {clicks}; impressions: {impressions}.",
  "Az veride yüzdeler ve ortalamalar hızla değişir; tek başına büyüme veya kayıp kanıtı değildir.":
    "With little data, percentages and averages change quickly; they alone do not establish growth or loss.",
  "Bu liste, ortalama sırası yuvarlanarak 4–20 aralığında olan ve bu dönemde en az {count} gösterim alan sorguları kapsar. Eşiğin altındaki sorgular Sorgular sekmesinde incelenebilir.":
    "This list includes queries whose rounded average position is 4–20 and that received at least {count} impressions this period. Review queries below the threshold in the Queries tab.",
  "Marka sorguları bu listeden çıkarılır.":
    "Brand queries are excluded from this list.",
  "Google az aranan sorguları gizlilik için gizleyebilir. Sorgu listesi boşken de site toplamında gösterim olabilir. Toplamları ve Sayfalar sekmesini inceleyin.":
    "Google may withhold rare queries for privacy. Site totals can include impressions even when the query list is empty. Review the totals and the Pages tab.",
  "Alınan veride öneri eşiklerini geçen bir fırsat ya da düşüş bulunmadı. Bu, sitenizde yapılacak iş olmadığı anlamına gelmez. Google bazı sorguları gizlilik için gizler; görünen sorguları ve sayfaları inceleyin.":
    "No opportunity or decline met the recommendation thresholds in the retrieved data. This does not mean there is no work to do. Google withholds some queries for privacy; review the visible queries and pages.",
  "Bu bulgular hız, kullanılabilirlik veya arama görünürlüğü ile ilgili olabilir. Ayrıntılarda etkilenen sayfaları inceleyin.":
    "These findings may concern speed, usability or search visibility. Review the affected pages in the details.",
  "Oturum sayısı bilinmiyor. Analytics raporunu açarak kaynak uyarılarını inceleyin; bağlantı erişimini ve sitedeki Analytics etiketini kontrol edin.":
    "The session count is unknown. Open the Analytics report to review source warnings; check connection access and the Analytics tag on your site.",
  "İki dönemde de gözlenen sorgu yok. Yükseliş veya düşüş henüz hesaplanamaz; seçili dönemin ortalama sıralarını aşağıdaki listeden inceleyin.":
    "No queries were observed in both periods. Rises and falls cannot be calculated yet; review the average positions for the selected period in the list below.",
  "Seçili dönemdeki ortalama sıralar: {count} sorgu. Önceki dönemle karşılaştırılabilecek sorgu yok.":
    {
      one: "Average positions in the selected period for {count} query. No queries can be compared with the previous period.",
      other:
        "Average positions in the selected period for {count} queries. No queries can be compared with the previous period.",
    },
  "Tüm kayıtlı kelimeler bu dönemde gözlendi.":
    "All saved keywords were observed in this period.",
  "Ek kazanç hesaplanmayan: {zero}; gösterimi yetersiz: {small}; karşılaştırılacak tıklama oranı olmayan: {curve}; tahmine uygun araması olmayan sayfa: {pairs}.":
    "Pages with no calculated gain: {zero}; too few impressions: {small}; no comparable click-through rate: {curve}; no usable queries for estimation: {pairs}.",
  "{start} – {end} aralığında sayfa verisi alınamadı. Bu, hiç gösterim olmadığı anlamına gelmez; Arama performansında bağlı mülkü ve tarihleri kontrol edin.":
    "No page data was returned for {start} – {end}. This does not mean there were no impressions; check the connected property and dates in Search performance.",
  "Bu sayfalar için tahmin edilebilir arama yok":
    "No usable queries to estimate these pages",
  "{hidden} sayfa gösterim aldı; alınan veride tahmine uygun marka dışı arama bulunamadı. Google'ın gizlediği sorgular, marka ayrımı veya veri sınırları buna yol açabilir. Bu sayfalarda kazanç sıfır değil, bilinmiyor.":
    "{hidden} pages received impressions, but the returned data has no usable non-brand queries for estimation. Hidden queries, brand exclusions or data limits may explain this. Their potential gain is unknown, not zero.",
  "{start} – {end} aralığında sitenizin tıklama oranını sıraya göre ölçecek kadar arama yok. Arama performansında gösterim alan sorguları inceleyin; daha fazla veri birikince tahmin yeniden hesaplanabilir.":
    "There are too few queries in {start} – {end} to measure your site's click-through rate by position. Review queries with impressions in Search performance; the estimate can be recalculated as more data accumulates.",
  "Kaydettiğiniz aramaların ortalama sırasını ve dönemler arasındaki değişimini inceleyin.":
    "Review the average positions of your saved queries and how they change between periods.",
  "Liste güncellendi: {date}": "List updated: {date}",
  "{count} kontrolde kritik sorun": "Critical issues in {count} checks",
  "{count} kontrolde uyarı": "Warnings in {count} checks",
  "Google anonim sorguları gizler ve günlük satırları sınırlar; bu arşiv tüm aramaları içermez.":
    "Google hides anonymized queries and limits daily rows; this archive does not contain every search.",
  "Bu sayfa açıkken kalan günler otomatik yüklenir; bağlantı veya kota hatasında beklenir.":
    "Remaining days load automatically while this page is open; connection or quota errors pause the sync.",
  "Google verisi alındı: {date}": "Google data acquired: {date}",
  "Google anonim sorguları gizler. API, arama türü başına günde en fazla {limit} satır sunar; sorgu ve sayfa ayrıntılarında başka satırları da atlayabilir. Tam sayfalama, tüm aramaların listelendiği anlamına gelmez.":
    "Google hides anonymized queries. The API exposes at most {limit} rows per day per search type and can omit additional query and page detail. Full pagination does not mean every search is listed.",
  // Dashboard source scope and measured next steps.
  "Ölçüler ne demek?": "What do these mean?",
  Kaynak: "Source",
  "Kesin veri": "Final data",
  "Geçici veri": "Provisional data",
  "Google son günleri sonradan düzeltebilir.":
    "Google may still revise the latest days.",
  Yok: "None",
  "Toplamların son günü: {date}.": "Totals through: {date}.",
  "Geçici verinin son günü: {date}.": "Provisional data through: {date}.",
  "Bu dönemden sonra geçici veri alınmadı.":
    "No provisional data was received after this period.",
  "{start} – {end} toplamlara dahil değil.":
    "{start} – {end} is excluded from totals.",
  "Search Console veri kapsamı": "Search Console data scope",
  "{issue} — {scope}": "{issue} — {scope}",
  "{count} uyarı türünü inceleyin": "Review {count} warning types",
  "Uyarı bulgularını inceleyin": "Review warning findings",
  "{types} uyarı türü / {findings} sayfa bulgusu. Etkilenen sayfaları inceleyin.":
    "{types} warning types / {findings} page findings. Review the affected pages.",
  "{findings} sayfa bulgusu. Etkilenen sayfaları inceleyin.":
    "{findings} page findings. Review the affected pages.",
  "{value} yüzde puan": "{value} percentage points",
  "Oran değişimi yüzde puanla gösterilir: iki dönemin yüzdeleri arasındaki farktır.":
    "Rate changes are shown in percentage points: the difference between the two periods’ percentages.",
  "Sayfayı inceleyin": "Inspect this page",
  "Önce ölçülen aramalarla başlığın ve içeriğin uyumunu kontrol edin; yalnızca bir sorun doğrularsanız değişiklik yapın.":
    "First check whether the title and content match the observed queries; make changes only if you confirm a problem.",
  "Bu sayfa için eşleşen Analytics verisi dönmedi.":
    "No matching Analytics data was returned for this page.",
  "Analytics eşleşmesi doğrulanamadı; nedeni bilinmiyor.":
    "The Analytics match could not be verified; the reason is unknown.",
  "İş türüne göre sayfalar": "Pages by type of work",
  "Aday sayfa yok": "No candidate pages",
  "Ölçülen aramaları incelemek için bir satıra tıklayın.":
    "Click a row to inspect the observed queries.",
  "Gözlenen sayfalar ve olası işler; kazanç henüz hesaplanamıyor.":
    "Observed pages and possible work; gain cannot yet be estimated.",
  "Gözlenen sayfalar, olası işler ve hesaplanabilen ek tıklamalar.":
    "Observed pages, possible work and estimable extra clicks.",
  "Fırsatların kaynağı": "Opportunity sources",
  "Dönüşüm bilgisi bilinmiyor.": "Conversion data is unknown.",
  "Doğrulanmış dönüşüm: {count} sayfa": "Confirmed conversions: {count} pages",
  "Eşleşen veride doğrulanmış dönüşüm yok.":
    "No confirmed conversions in matched data.",
  "Eşleşen: {matched} / {total} sayfa": "Matched: {matched} / {total} pages",
  "Dönüşüm durumu bilinmeyen: {count} sayfa":
    "Conversion status unknown: {count} pages",
  "Dönüşüm getirenleri göster": "Show converting pages",
  "Bazı sayfalarda kazanç bilinmiyor; bu, sıfır kazanç demek değildir.":
    "Gain is unknown for some pages; this does not mean zero gain.",
  "Günlük tıklamalar; kesikli çizgi önceki dönemi gösterir.":
    "Daily clicks; the dashed line shows the previous period.",
  "Toplamların son günü": "Totals through",
  "Google'ın kesinleştirdiği veri": "Google-confirmed final data",
  "Gecikme varsayıldı": "Lag assumed",
  "Google kesinleşme tarihi bildirmedi; son günler gecikme varsayımıyla toplamların dışında tutuldu.":
    "Google did not provide a finality date; recent days were excluded from totals using an assumed delay.",
  "Toplamlara dahil günler: {start} – {end} ({days} gün). Günler Google'ın kullandığı Pasifik saatine göredir.":
    "Days included in totals: {start} – {end} ({days} days). Dates use Google’s Pacific time zone.",
  "Veri durumu": "Data status",
  "Analytics bağlantısı için rapor tarihleri eksik.":
    "Report dates are missing for the Analytics link.",
  "Sayfa adresi Analytics bağlantısı için doğrulanamadı.":
    "The page address could not be verified for the Analytics link.",
};
