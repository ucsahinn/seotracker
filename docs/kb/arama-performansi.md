---
title: Arama performansı
description: Search Console'un tıklama, gösterim, tıklama oranı ve sıra verisi; sorguya, sayfaya, ülkeye ve cihaza göre, 16 aya kadar geriye.
screen: Arama performansı
route: /p/<proje>/search-performance
updated: 2026-10-22
---

Bu ekran, Google'da hangi aramalarda çıktığınızı ve kaç kişinin tıkladığını gösterir. Veri doğrudan Google Search Console'dan gelir; uygulama hiçbir sayıyı tahmin etmez. Ekranın üstünde dönem, arama türü, cihaz ve ülke filtreleri var; altında dört toplam kartı, günlük grafik, kırılımlar ve dört sekmeli tablo. Her filtre adres çubuğuna yazılır, bu yüzden bir görünümü bağlantı olarak paylaşabilir ya da yer imine alabilirsiniz.

## Ekranda neler var

**Filtreler.** **Dönem**: Son 7 gün, Son 28 gün (varsayılan), Son 3 ay. **Arama türü**: Web, Görsel, Video, Haber. **Cihaz**: Tüm cihazlar, Mobil, Bilgisayar, Tablet. **Ülke** listesi Google'ın o dönemde raporladığı ülkelerden oluşur. Arama türü Web dışındaysa başlık altında "Arama türü: Görsel" gibi bir not görürsünüz. **Mülkü değiştir** bağlantısı proje ayarlarındaki Search Console bağlantısına gider.

**Dört toplam kartı.** **Tıklama**, **Gösterim**, **Tıklama oranı** ("Gösterimlerin yüzde kaçı tıklamaya döndü") ve **Ortalama sıra** ("Küçük olan iyidir; 1, sonuçların en üstü demek"). Her kartın yanında önceki döneme göre değişim ve üzerine gelince "… dönemine göre" açıklaması vardır.

**Günlük değişim grafiği.** Toplamların günlere dağılımı. Üstündeki düğmelerle Tıklama, Gösterim, Tıklama oranı ve Ortalama sıra arasında geçiş yaparsınız.

**Cihazlar, Ülkeler, Arama görünümü.** Üç küçük kart. Ülkeler tablosunda Ülke, Tıklama, Gösterim, Tıklama oranı ve Ort. sıra sütunları var; ilk altı ülke görünür, altında "N ülke daha" yazar. Arama görünümü, zengin sonuç türlerini (ürün, video, sık sorulanlar gibi) listeler; ilk beşi gösterir, gerisini "Diğer görünümler" altında toplar.

**Dört sekme.** **Sıra 5-20 (N)**: en çok gösterim alan ama ilk sayfanın altında ya da ilk sayfanın alt yarısında kalan sorgular; sütunları Sorgu, Sayfa, Gösterim, Tıklama, Sıra. **Sorgular** ve **Sayfalar**: tek boyutlu tablolar, sütunları Tıklama, Gösterim, Tıklama oranı, Sıra. **Sayfa çakışmaları**: aynı sorguda birden fazla sayfanızın yarıştığı durumlar. Her sekmenin üstünde ne işe yaradığını anlatan tek satırlık bir ipucu var.

**Hızlı filtreler.** Tablonun üstündeki çipler: **İlk 10'da** (yuvarlanmış sıra 10 ve altı), **Hiç tıklanmayan**, **Tıklama oranı düşük** (ilk sayfada, en az 100 gösterim, oran yüzde 2'nin altı), **Tıklama alanlar**, **Sıra 5-10**, **Sıra 11-20**.

**Özet çubukları.** Sorgular sekmesinde "Sorgular kaç sırada?" (1-3, 4-10, 11-20, 21 ve sonrası), Sayfalar sekmesinde "Tıklamalar sayfalara nasıl dağılıyor?" (Hiç tıklanmayan, 1-9, 10-99, 100+ tıklama). Bir çubuğa tıklamak tabloyu o dilime daraltır.

**Satır menüsü.** Her satırın sağındaki üç nokta: **Sayfayı yeni sekmede aç**, **Adresi kopyala** ya da **Kelimeyi kopyala**, **Kelime olarak kaydet**. Kaydettiğiniz sorgular Kayıtlı kelimeler ekranına düşer.

**Dışa aktarma.** **E-Tablolar'a aktar** ve **CSV indir**. Görünen tabloyu, uygulanan filtrelerle birlikte alır. Çakışma sekmesinde dışa aktarma yoktur.

## Nasıl kullanılır

1. **Son 28 gün** ile başlayın. Toplam kartlarındaki oklara bakın; büyük bir düşüş varsa önce **Dönem** filtresini **Son 3 ay** yapıp grafikte düşüşün hangi gün başladığını bulun.
2. **Sıra 5-20** sekmesini açın. Buradaki sorgular Google'ın sizi zaten gösterdiği, ama tıklama almadığınız yerlerdir. En çok gösterim alan ilk üçünü seçin, yanındaki sayfayı açın, başlığı ve ilk paragrafı o sorguya göre düzenleyin.
3. **Sorgular** sekmesinde **Tıklama oranı düşük** çipine basın. Bu sorgularda sıranız iyi ama kimse tıklamıyor demektir; sorun başlık ve açıklamadadır.
4. Bir sayfanın hangi sorgularda çıktığını görmek için **Sayfalar** sekmesinde satır menüsünden **Arama performansında ara** seçeneğini kullanın.
5. Takip etmek istediğiniz sorguları **Kelime olarak kaydet** ile işaretleyin; etiketleyip gruplayabilirsiniz.

## Sayılar nasıl hesaplanır

Pencere bugünden üç gün geriye kadar sayılır: Search Console veriyi üç gün gecikmeli verir, bu yüzden aralık bugünde bitmez. Önceki dönem aynı uzunluktadır ve bu pencerenin hemen öncesinde biter. Tıklama ve gösterim değişimi yüzde olarak, tıklama oranı değişimi "puan" olarak (örneğin +0,4 puan) gösterilir; yüzde sıfıra yuvarlanan değişimler gizlenir.

Toplam kartları tarih boyutundan toplanır; bu yüzden gerçek site toplamıdır. Tablolar ise sorgu ya da sayfa boyutundan gelir ve Google aynı aramada çıkan her sayfayı ayrı sayar. Sayfa tablosundaki gösterimleri toplarsanız site toplamından büyük bir sayı bulursunuz; bu bir hata değil, Google'ın sayma biçimidir.

Google tek çağrıda en fazla 1.000 satır verir. Tablonun altında "Google'ın tek çağrıda döndürdüğü üst sınıra ulaşıldı, bu yüzden bu liste tam değil." notu görürseniz liste kesilmiştir. Sıra 5-20 listesi, her sorgu için en iyi sıradaki sayfayı alır ve o sayfa 5 ile 20 arasındaysa sorguyu gösterir; en fazla 100 satır.

Çakışma analizi 7 günlük seçimi 28 güne genişletir ve yalnızca en az 100 gösterim alan sorgulara bakar. Bir sayfanın sorguya katılması için en az 10 gösterim ve yüzde 20 pay gerekir. Analiz, Google'ın en çok gösterdiği sayfayı "tercih edilen" sayar; diğer sayfaların payı "Google'ın tercih ettiği sayfa dışında kalan gösterim payı" sütununda görünür.

## Sık sorulanlar

**Son üç gün neden boş?** Google o günleri henüz vermemiştir. Birkaç gün sonra aynı aralığa bakın, sayılar dolar.

**Tablo toplamı kartla tutmuyor.** Normaldir. Kart site toplamıdır; tablo satırları aynı aramada çıkan her sayfayı ayrı sayar.

**Bir sorguyu Google'da arayınca gördüğüm sıra farklı.** Ortalama sıra, dönem boyunca tüm gösterimlerin ortalamasıdır ve ülkeye, cihaza, kişiye göre değişen tek bir arama sonucunu yansıtmaz.

**Aradığım sorgu listede yok.** Google çok az aranan sorguları gizlilik nedeniyle göstermez. Küçük sitelerde sorgu satırı hiç olmayabilir; sayfa tablosu yine de dolar.

**Çakışma bulundu, iki sayfayı birleştirmeli miyim?** Çoğu zaman hayır. Önce hangi sayfanın o sorguya cevap vermesini istediğinize karar verin, sonra iç bağlantıları o sayfaya yöneltin. Birleştirme yalnızca iki sayfa gerçekten aynı soruya cevap veriyorsa mantıklıdır.

## Sınırlar

Discover ve Google Haberler arama türleri burada yoktur; Google o türlerde sıra bildirmez. Arama hacmi, rakip sırası ve canlı sonuç sayfası ölçümü uygulamada yoktur. Veri 16 aydan eskiye gitmez; daha eskisi için Sıralama takibi ekranındaki yerel arşive bakın.

<!-- Kaynaklar: src/routes/_project/p/$projectId/search-performance.tsx; src/client/features/search-performance/SearchPerformancePage.tsx; SearchFilters.tsx; TotalsCards.tsx; SearchTrendChart.tsx; CountryBreakdown.tsx; QuickFilterBar.tsx; quickFilters.ts; tabBuckets.ts; TabSummaries.tsx; SearchPerformanceColumns.tsx; CannibalizationTable.tsx; src/serverFunctions/searchPerformance.ts; src/server/features/gsc/searchPerformanceReport.ts; src/server/features/gsc/cannibalization.ts; src/server/features/gsc/services/CannibalizationService.ts; src/shared/dataFreshness.ts -->
