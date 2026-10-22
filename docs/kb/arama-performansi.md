---
title: Arama performansı
description: Google'da hangi aramalarda çıktığınızı ve kaç kişinin tıkladığını görün. Sorguya, sayfaya, ülkeye ve cihaza göre, 16 aya kadar geriye.
screen: Arama performansı
route: /p/<proje>/search-performance
updated: 2026-10-22
---

Bu ekranda Google'da hangi aramalarda çıktığınızı ve kaç kişinin tıkladığını görürsünüz. Veri doğrudan Google Search Console'dan gelir. Uygulama hiçbir sayıyı tahmin etmez.

Seçtiğiniz filtreler adres çubuğuna yazılır. Görünümü bağlantı olarak paylaşabilir ya da yer imine ekleyebilirsiniz.

## Ekranda neler var

**Filtreler.** **Dönem**: Son 7 gün, Son 28 gün (varsayılan), Son 3 ay. **Arama türü**: Web, Görsel, Video, Haber. **Cihaz**: Tüm cihazlar, Mobil, Bilgisayar, Tablet. **Ülke** listesinde Google'ın o dönemde bildirdiği ülkeler olur. **Mülkü değiştir** bağlantısı proje ayarlarına gider.

**Dört toplam kartı.** **Tıklama**, **Gösterim**, **Tıklama oranı** (gösterimlerin yüzde kaçı tıklandı) ve **Ortalama sıra**. Ortalama sırada küçük sayı iyidir, 1 en üst sıradır. Her kartta önceki döneme göre değişim görünür.

**Günlük değişim grafiği.** Toplamların günlere dağılımı. Üstteki düğmelerle dört ölçü arasında geçersiniz.

**Cihazlar, Ülkeler, Arama görünümü.** Üç küçük kart. Ülkelerde ilk altısı görünür. Arama görünümü zengin sonuç türlerini listeler. Zengin sonuç, aramada ürün ya da video gibi ek bilgiyle çıkan sonuçtur. İlk beşi görünür, gerisi "Diğer görünümler" altında toplanır.

**Dört sekme.**

- **Sıra 5-20 (N)**: Google'da 5 ile 20. sıra arasında çıkan, en çok gösterilen sorgular.
- **Sorgular**: aramalara göre tablo.
- **Sayfalar**: sayfalara göre tablo.
- **Sayfa çakışmaları**: aynı aramada birden fazla sayfanızın yarıştığı durumlar.

**Hızlı filtreler.** **İlk 10'da**, **Hiç tıklanmayan**, **Tıklama oranı düşük**, **Tıklama alanlar**, **Sıra 5-10**, **Sıra 11-20**. Tıklama oranı düşük demek şudur: ilk sayfada, en az 100 gösterim, oran yüzde 2'nin altında.

**Satır menüsü.** Her satırın sağındaki üç nokta: **Sayfayı yeni sekmede aç**, **Adresi kopyala**, **Kelimeyi kopyala**, **Kelime olarak kaydet**. Kaydettikleriniz Kayıtlı kelimeler ekranına gider.

**Dışa aktarma.** **E-Tablolar'a aktar** ve **CSV indir**. Görünen tabloyu, filtrelerle birlikte alır. Çakışma sekmesinde dışa aktarma yoktur.

## Nasıl kullanılır

1. **Son 28 gün** ile başlayın. Büyük bir düşüş varsa **Son 3 ay** seçin. Grafikte düşüşün hangi gün başladığını görün.
2. **Sıra 5-20** sekmesini açın. Google sizi zaten gösteriyor ama kimse tıklamıyor. En çok gösterilen ilk üç sorgunun sayfasını açın. Başlığı ve ilk paragrafı o aramaya göre düzeltin.
3. **Sorgular** sekmesinde **Tıklama oranı düşük** düğmesine basın. Sıranız iyi ama tıklayan yok. Sorun büyük ihtimalle başlık ve açıklamadadır.
4. Bir sayfanın hangi aramalarda çıktığını görmek için **Sayfalar** sekmesinde **Arama performansında ara** deyin.
5. İzlemek istediğiniz sorguları **Kelime olarak kaydet** ile işaretleyin.

## Sayılar nasıl hesaplanır

Google veriyi üç gün geç verir. Aralık bu yüzden bugünde değil, üç gün öncesinde biter. Önceki dönem aynı uzunlukta olup bu aralığın hemen öncesindedir. Tıklama ve gösterim değişimi yüzde olarak, tıklama oranı değişimi puan olarak gösterilir.

Toplam kartları gerçek site toplamıdır. Tablolar ise aynı aramada çıkan her sayfayı ayrı sayar. Sayfa tablosunu toplarsanız karttan büyük sayı bulursunuz. Bu hata değildir.

Google tek seferde en fazla 1.000 satır verir. Tablo altında "bu liste tam değil" notu varsa liste kesilmiştir. Sıra 5-20 listesi en fazla 100 satırdır.

Çakışma analizi 28 güne bakar. Yalnızca en az 100 gösterim alan aramaları inceler. Bir sayfanın katılması için en az 10 gösterim ve yüzde 20 pay gerekir. Google'ın en çok gösterdiği sayfa "tercih edilen" sayılır.

## Sık sorulanlar

**Son üç gün neden boş?** Google o günleri henüz vermedi. Birkaç gün sonra tekrar bakın.

**Tablo toplamı kartla tutmuyor.** Normaldir. Kart site toplamıdır.

**Google'da aradığımda sıram farklı.** Buradaki sıra dönemin ortalamasıdır. Tek bir aramayı yansıtmaz.

**Aradığım sorgu listede yok.** Google çok az aranan sorguları gizler. Küçük sitelerde sorgu satırı hiç olmayabilir.

**Çakışma varsa sayfaları birleştireyim mi?** Çoğu zaman hayır. Önce hangi sayfanın cevap vermesini istediğinize karar verin. Sonra iç bağlantıları o sayfaya yöneltin.

## Sınırlar

Discover ve Google Haberler türleri yok. Arama hacmi ve rakip sırası da yok. Veri 16 aydan eskiye gitmez. Daha eskisi için Sıralama takibi ekranındaki arşive bakın.

<!-- Kaynaklar: src/routes/_project/p/$projectId/search-performance.tsx; src/client/features/search-performance/SearchPerformancePage.tsx; SearchFilters.tsx; TotalsCards.tsx; SearchTrendChart.tsx; CountryBreakdown.tsx; QuickFilterBar.tsx; quickFilters.ts; tabBuckets.ts; TabSummaries.tsx; SearchPerformanceColumns.tsx; CannibalizationTable.tsx; src/serverFunctions/searchPerformance.ts; src/server/features/gsc/searchPerformanceReport.ts; src/server/features/gsc/cannibalization.ts; src/server/features/gsc/services/CannibalizationService.ts; src/shared/dataFreshness.ts -->
