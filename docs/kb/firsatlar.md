---
title: Fırsatlar
description: Google'da zaten görünen sayfalarınız, emek harcamaya değer olma sırasına göre. Dört küme, bir puan ve her satır için yapılacak iş.
screen: Fırsatlar
route: /p/<proje>/opportunities
updated: 2026-10-22
---

Fırsatlar ekranı şu soruyu cevaplar: elimdeki sayfalardan hangisine bu hafta dokunmalıyım? Search Console'daki her sayfanızı alır, Google Analytics'teki karşılığıyla eşler ve her birine 0 ile 100 arasında bir puan verir. Puan, Google'ın bir sıralama ölçüsü değildir; uygulamanın "bu sayfada çalışmak ne kadar mantıklı" tahminidir. Ekran hem Search Console hem Analytics ister; ikisinden biri bağlı değilse "Search Console bağlı değil" ya da "Google Analytics bağlı değil" uyarısı ve **Bağlantıları aç** düğmesi görünür.

## Ekranda neler var

**Üst çubuk.** **Dönem** (Son 7 gün, Son 28 gün, Son 90 gün), **Satır sayısı** (25, 50, 100) ve **Yenile**. "Bu ekran ne işe yarar?" bağlantısı kısa açıklamayı açar.

**Üç özet kartı.** **Listelenen**: kaç aday sayfadan kaçının gösterildiği. **Analytics'te karşılığı var** ve **Analytics'te karşılığı yok**. **En yüksek puan**.

**Dört küme.** Her sayfa dört kümeden birine girer; kümenin adı satırda etiket olarak görünür ve her kümenin üç maddelik bir yapılacaklar listesi vardır.

| Küme                 | Ne demek                                                                                                | Ne yapmalı                                                                                          |
| -------------------- | ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| **Az tıklanan**      | Sıranız 20 ve üstünde, ama tıklama oranınız aynı sıradaki sayfalarınızın ortalamasının yarısından düşük | Başlığı ve meta açıklamayı sorguya göre yeniden yazın; arama sonucunda görünen metin tıklanmıyor    |
| **Yükselmeye yakın** | Sıra 4 ile 20 arasında                                                                                  | İçeriği derinleştirin, iç bağlantı verin; bir iki sıra ilk sayfaya ya da ilk üçe taşır              |
| **İlk sıralarda**    | Sıra 3 ve üstü                                                                                          | Koruyun; sayfayı güncel tutun, kırılmadığından emin olun                                            |
| **Derinde kalan**    | Sıra 20'nin altında                                                                                     | Sayfanın sorguya gerçekten cevap verip vermediğini sorgulayın; bazen doğru sayfa başka bir sayfadır |

Liste bu sırayla gruplanır: önce Az tıklanan, sonra Yükselmeye yakın, İlk sıralarda, en sonda Derinde kalan.

**Hızlı filtreler.** **Analytics'te karşılığı olanlar**, **Analytics'te karşılığı yok**, **En çok gösterim alan 10**.

**"Fırsat nerede toplanıyor?"** kartı. Kümelere göre gösterim ya da tıklama dağılımı; "Kutular neye göre hesaplansın?" ile ikisi arasında geçiş yaparsınız.

**Tablo.** Sütunlar: **Puan**, **Sayfa**, **Sıra**, **Gösterim**, **Tıklama**, **Tıklama oranı**, **Oturum**. Tıklama oranı hücresindeki küçük ok, aynı sıradaki sayfalarınıza göre farkı gösterir. Oturum, Analytics'ten ve Search Console ile aynı tarih aralığı için gelir; Analytics ekranındaki aralıktan farklı olabilir.

**Ayrıntı paneli.** Bir satıra tıklayınca açılır: sıra, gösterim, tıklama, tıklama oranı ve Analytics oturumu; "Ne yapmalı?" listesi; puanın üç parçası (**Talep**, **İş değeri**, **Yükselme kolaylığı**, her biri yüksek, orta ya da düşük); **Arama performansında aç**, **Adresi kopyala**, **Sayfayı aç** düğmeleri.

**Dışa aktarma.** **E-Tablolar'a aktar** ve **CSV**, satır sayısıyla birlikte.

## Nasıl kullanılır

1. **Son 28 gün** ile başlayın ve listeyi olduğu gibi okuyun; en üstteki satır uygulamanın "önce buna bak" dediği sayfadır.
2. **Az tıklanan** kümesinden ilk iki sayfayı alın. Bu sayfalar Google'da iyi yerde ama kimse tıklamıyor; yapılacak iş başlık ve açıklamadır, içerik değil. Yarım saatlik iştir.
3. **Yükselmeye yakın** kümesinde Puan'ı yüksek olanlara bakın. Ayrıntı panelinde "Yükselme kolaylığı" yüksekse sayfa ilk sayfanın eşiğindedir; bir bölüm ekleyin, siteden iki üç iç bağlantı verin.
4. **Analytics'te karşılığı yok** çipi, Google'ın gösterdiği ama Analytics'in ziyaret görmediği sayfaları ayırır. Çoğu zaman adres farkıdır (sondaki eğik çizgi, www); bazen de sayfa gerçekten tıklanmıyordur.
5. Bir haftada en fazla üç dört sayfaya dokunun. Sonraki ay aynı dönemle gelip puanların değişip değişmediğine bakın.

## Sayılar nasıl hesaplanır

Tarih aralığı, Analytics mülkünün saat diliminde, Search Console'un üç günlük gecikmesi kadar geriden biter ve seçilen gün sayısı kadar sürer. Search Console'dan sayfa boyutuyla en fazla 1.000 satır, Analytics'ten organik açılış sayfaları raporundan en fazla 1.000 satır alınır. İki liste alan adı ve yol üzerinden eşleşir; sorgu dizesi ve sondaki eğik çizgi dikkate alınmaz. 1.000 satıra ulaşıldıysa tablonun altında "Search Console tek seferde sınırlı sayıda satır verir" notu çıkar.

Aday, gösterimi sıfırdan büyük her sayfadır. Küme kararı sıraya ve beklenen tıklama oranına göre verilir. Beklenen oran, sayfalarınızın sıra dilimlerine (1-3, 3-5, 5-10, 10-20, 20-50) göre medyan oranıdır; bir dilimin medyanı için en az 10 gösterimli en az üç sayfa gerekir. Sıra 20 ve üstünde olup oranı beklenenin yarısından düşük kalan sayfa "Az tıklanan" olur.

Puan şöyle hesaplanır: yüzde 50 talep, yüzde 30 iş değeri, yüzde 20 yükselme kolaylığı; sonuç yüz ile çarpılıp yuvarlanır. Talep gösterime, yükselme kolaylığı sıranın tersine dayanır. İş değeri, Analytics'teki anahtar olay oranıdır; hiçbir eşleşen sayfada anahtar olay yoksa etkileşim oranı kullanılır, Analytics'te karşılığı olmayan sayfa ortadan (0,5) başlar. Üç parça da bu aday kümesi içindeki yüzdelik sıralardır; yani puan sitenizin kendi sayfaları arasında görelidir, siteler arası karşılaştırma yapmaz.

## Sık sorulanlar

**Puan 80 olan sayfa 60 olandan iki kat mı önemli?** Hayır. Puan bir sıralama aracıdır; 80 "önce bak", 60 "sonra bak" demektir.

**Listelenen 50, aday 68. Kalan 18 nerede?** Satır sayısı 50 seçili; **Satır sayısı**'nı 100 yapın. Aday sayısı "Listelenen" kartının altında yazar.

**Analytics'te karşılığı yok ne demek?** Search Console o sayfayı gösteriyor ama Analytics organik açılış sayfası olarak görmemiş. Adres biçimi farklı olabilir ya da sayfa hiç tıklanmamış olabilir; Search Console tıklama sütununa bakın.

**Dönemi 7 güne alınca liste neden boşaldı?** Yedi günde çoğu sayfa 10 gösterimin altında kalır ve küme medyanları hesaplanamaz. 28 gün çoğu site için doğru penceredir.

**Puanlar Google'ın bir metriği mi?** Hayır. Google yalnızca tıklama, gösterim, oran ve sıra verir; puanı uygulama üretir ve formülü bu sayfada yazıyor.

## Sınırlar

Ekran arama hacmi ya da rakip sırası kullanmaz; talep yalnızca sizin gösterimlerinizdir. Search Console ve Analytics farklı saat dilimlerinde raporlayabilir; günlük eşleşmeler bir gün kayabilir ve uygulama bunu tablonun altında söyler. Puan, içeriğin kalitesini bilmez; yalnızca sayılara bakar. Son karar sizindir.

<!-- Kaynaklar: src/routes/_project/p/$projectId/opportunities.tsx; src/client/features/opportunities/OpportunitiesPage.tsx; OpportunityStates.tsx; opportunityLogic.ts; OpportunitySummary.tsx; OpportunityColumns.tsx; OpportunitiesTable.tsx; OpportunityDetail.tsx; src/server/features/ga4/services/SearchOpportunityService.ts; src/server/features/ga4/services/opportunityKind.ts -->
