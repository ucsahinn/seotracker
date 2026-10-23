---
title: Panel
description: Projeyi açınca ilk gördüğünüz ekran bu. Son 28 günün arama sayıları, son denetimin özeti ve yapacağınız işler hep burada.
screen: Panel
route: /p/<proje>
updated: 2026-10-22
---

Sitenizin son durumunu görür, sıradaki işi öğrenirsiniz. Projeyi açınca ilk bu ekran gelir.

Arama sayıları Google'ın Search Console aracından gelir. Ziyaretçi sayıları Google Analytics'ten gelir. Denetim özeti uygulamanın kendi site tarayıcısından gelir. Üstteki **Yenile** düğmesi hepsini yeniler. **Denetimi başlat** sizi denetim ekranına götürür.

## Ekranda neler var

**Dört sayı kartı.** Kartlar **Tıklama**, **Gösterim**, **Tıklama oranı** ve **Ortalama sıra**. Hepsi son 28 günü gösterir. Her kartta önceki 28 güne göre bir ok durur. Ortalama sırada küçük sayı iyidir, çünkü 1 en üst sıradır. O yüzden düşüş iyi haberdir ve ok ona göre renklenir. Search Console bağlı değilse kartta "Search Console'u bağlayın" yazar.

**Sıradaki adımlar.** Uygulama size en fazla üç iş önerir. Öneriler şu sırayla gelir:

- Search Console bağlı değilse **Search Console'u bağla**.
- Hiç denetim yoksa ya da son denetim yedi günden eskiyse **Denetimi başlat**.
- Ciddi sorun varsa **Kritik sorunları gör**.
- Sonra **Fırsatları aç** ve **Uyarıları gör**.

İşi bitirince madde listeden kalkar.

**Son denetimde yeni çıkanlar ve Düzelenler.** Son iki denetimi karşılaştırır. Hangi sorunun kaç sayfada yeni çıktığını, hangisinin azaldığını görürsünüz. Düzelen bir şey yoksa "Düzelen sorun yok." yazar.

**Tıklama eğilimi.** Son 28 günün günlük tıklamalarını bir çizgi olarak görürsünüz. Dörtten az günün verisi varsa çizgi çizilmez. **Sorguları aç** bağlantısı sizi Arama performansı ekranına götürür.

**Sıra 5-20 arası sorgular.** Google'da 5 ile 20. sıra arasında çıkan ilk dört aramanız burada durur. Biraz emekle bunlar ilk sayfaya ya da üst sıralara çıkabilir. **Tümünü gör** tam listeyi açar.

**Site denetimi kartı.** Kart kaç sayfanın tarandığını, en sık görülen üç sorunu ve en sorunlu beş sayfayı gösterir. Denetim sürerken kart beş saniyede bir yenilenir. Soru işareti simgesi üç önem düzeyini anlatır:

- Kritik: aramada görünmenizi doğrudan bozar.
- Uyarı: sıralamayı zamanla aşındırır, ama acil değildir.
- Bilgi: küçük iyileştirme fırsatlarıdır.

**Organik trafik kartı.** Google Analytics bağlıysa görünür. Aramadan gelenler için **Oturum**, **Aktif kullanıcı**, **Etkileşim oranı** ve **Anahtar olay** sayılarını gösterir. Sitenizde satış ölçülüyorsa **Organik gelir** ve **Sipariş** de eklenir.

## Nasıl kullanılır

1. Haftada bir açın ve dört karttaki oklara bakın.
2. **Sıradaki adımlar** kutusundaki ilk işi yapın. Kutu boşsa acil iş yok demektir.
3. Son denetim yedi günden eskiyse **Denetimi başlat** deyin.
4. **Sıra 5-20 arası sorgular** kartındaki sayfaların başlığına ve açıklamasına bir daha bakın. En kolay kazanç genelde buradadır.

## Sayılar nasıl hesaplanır

Dört kart tek bir Search Console raporundan gelir. Google veriyi üç gün geç verir. Bu yüzden 28 günlük aralık bugün bitmez, üç gün öncesinde biter. Önceki dönem, bu aralığın hemen öncesindeki 28 gündür. Önceki dönem sıfırsa ok gösterilmez.

Ortalama sıra, çok gösterim alan aramaları daha çok sayar. Bu dört sayı sitenin gerçek toplamıdır. Arama performansı ekranındaki tablo satırlarını toplarsanız fazla çıkar, çünkü Google aynı aramada çıkan her sayfayı ayrı sayar.

## Sık sorulanlar

**Bugünün verisi neden yok?** Google son üç günü henüz vermez. Bir eksiklik yok, bekleyin.

**Ortalama sıra arttı, iyi mi?** Hayır. 3'ten 7'ye çıkmak düşmek demektir. Ok bu yüzden kırmızıya döner.

**Denetim kartı Google'ın gördüğünü mü gösterir?** Hayır. Uygulamanın kendi taramasının bulduklarını gösterir. Google'ın hangi sayfayı kaydettiğini denetim ekranındaki **Dizin durumu** sekmesinde görürsünüz.

**Organik trafik kartı yok.** Proje ayarlarında Google Analytics bağlı değil. Bağlamak size kalmış.

## Sınırlar

Panel arama hacmi, backlink (başka sitelerden size gelen bağlantı) ya da rakip sırası göstermez. Bu veriler uygulamada yok. Çok az aranan sorgular Search Console'da gizlenir. Ayrıntıya bakmak için ilgili ekrana geçersiniz.

<!-- Kaynaklar: src/routes/_project/p/$projectId/index.tsx; src/client/features/dashboard/DashboardPage.tsx; DashboardMetrics.tsx; SearchInsights.tsx; DashboardCards.tsx; SeverityBar.tsx; Ga4Card.tsx; NextStepsCard.tsx; AuditFreshnessCard.tsx; src/client/features/dashboard/dashboardGscReport.ts; src/server/features/dashboard/services/DashboardService.ts; src/server/features/gsc/searchPerformanceReport.ts; src/shared/dataFreshness.ts; src/shared/delta.ts -->
