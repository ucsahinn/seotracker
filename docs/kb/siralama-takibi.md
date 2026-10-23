---
title: Sıralama takibi
description: Aramalarınızın Google'daki ortalama sırasını gün gün görürsünüz. Veri bu bilgisayarda saklandığı için Google'ın 16 aylık sınırından da eskiye bakabilirsiniz.
screen: Sıralama takibi
route: /p/<proje>/rankings
updated: 2026-10-22
---

Aramalarınızın zamanla nasıl yükselip düştüğünü görürsünüz. Google Search Console geçmişi 16 ayla sınırlar. Bir aramanın hangi gün kaçıncı sırada olduğunu da göstermez.

Uygulama bu veriyi gün gün çekip bu bilgisayarda saklar. Ekranı açtıkça arşiv büyür. Zamanla Google'ın göstermediği kadar eskiye gidersiniz.

## Ekranda neler var

**Zaman aralığı.** Seçenekler 30 gün, 90 gün (varsayılan), 6 ay, 16 ay ve Arşivin tamamı. Aralık bugünden üç gün geriye kadar sayılır.

**Arşiv durumu satırı.** Arşivde kaç gün ve kaç satır olduğunu gösterir. Ekran her açılışta eksik günleri Google'dan tamamlar. "Bu açılışta N gün eklendi." yazıyorsa arşive yeni gün girmiştir. "Kalan günler sonraki açılışta tamamlanacak." yazıyorsa iş bir sonraki açılışta devam eder.

**Sorgu içinde ara** kutusu listeyi daraltır.

**Değişim filtreleri.** **Yükselenler** ve **Düşenler** en az yarım sıra oynayanları gösterir. **Şu an ilk 10'da** ve **İlk 10'dan çıkanlar** da var. İki hızlı düğme daha var: **Gösterimi yüksek** (en az 100 gösterim) ve **Hiç tıklanmayan**.

**Sıra dağılımı.** Çubuklar aramalarınızdan kaçının 1-3, 4-10, 11-20 ve 21+ diliminde olduğunu gösterir.

**Yükselenler ve düşenler.** İki kısa liste görürsünüz: "En çok yükselenler" ve "En çok düşenler".

**Tablo.** Sütunlar şunlar: **Sorgu**, **Ort. sıra**, **Değişim**, **Gösterim**, **Tıklama**, **Gün**. **Gün** sütunu aramanın seçili aralıkta kaç gün göründüğünü söyler. 90 günde yalnızca 3 gün görünen arama, nadir aranan bir aramadır. Değişim hücresinde "Yükseldi 2,4" ya da "Düştü 1,1" yazar. Satır menüsünde üç seçenek var: **Kelimeyi kopyala**, **Kayıtlı kelimelere ekle**, **Arama performansında ara**.

**Sorgu geçmişi.** Bir satıra tıklayınca o aramanın gün gün sıra çizgisi açılır. **Arama performansında aç** bağlantısı aynı aramayı diğer ekranda gösterir.

**Boş durumlar.** Arşiv boşsa "Henüz hangi kelimeyle arandığınız bilinmiyor" yazar ve **Arama performansını aç** düğmesi çıkar. Liste en çok gösterilen 100 aramayla sınırlıdır. Daha fazlası varsa altında bunu söyleyen bir not görürsünüz.

## Nasıl kullanılır

1. Ekranı ilk kez açınca arşiv satırında "eklendi" yazmasını bekleyin.
2. İlk doldurma 480 güne kadar geriye gider. Birkaç açılış sürebilir.
3. Düşüş arıyorsanız **Düşenler** düğmesine basın. Sonra **Gösterimi yüksek** ile önemsizleri eleyin.
4. En üstteki aramaya tıklayın. Geçmiş grafiğinde düşüşün başladığı günü okuyun.
5. İzlemek istediğiniz aramaları **Kayıtlı kelimelere ekle** ile işaretleyin.
6. Ayda bir "En çok yükselenler" ve "En çok düşenler" listelerine bakın. Genel durumu görmek için bu yeter.

## Sayılar nasıl hesaplanır

Arşiv yalnızca Google'ın kesinleştirdiği veriyle dolar. Her açılışta son üç gün yeniden çekilir, çünkü Google o günleri sonradan düzeltebilir. Böylece düzeltilen günler arşive yeniden yazılır.

Tıklama ve gösterim toplamdır. **Ort. sıra** hesabında çok gösterim alınan günlerin ağırlığı daha fazladır. **Gün**, verisi olan gün sayısıdır.

Değişimi şöyle buluruz: önceki dönemin ortalama sırasından bu dönemin sırasını çıkarırız. Sonuç pozitifse yükselmişsinizdir. Önceki dönem aynı uzunluktadır ve bu dönemin hemen öncesinde biter.

Liste en çok gösterilen 100 aramayı getirir. Tarayıcıda 25, 50 ya da 100'lük sayfalara bölünür.

## Sık sorulanlar

**Search Console'daki rakamdan neden farklı?** Arşiv yalnızca kesinleşmiş günleri tutar ve üç gün geriye kadar gider. Search Console'da bugünü içeren bir aralık seçtiyseniz sayılar tutmaz.

**Arama listede var ama sıra geçmişi boş.** O arama az gün görünmüş olabilir. **Gün** sütununa bakın.

**Arşiv neden aynı günde takılı?** Uygulama arka planda veri çekmez. Ekranı açın ve "eklendi" notunu bekleyin.

**Rakibimin sırasını görebilir miyim?** Hayır. Search Console yalnızca kendi sitenizin verisini verir.

**Sıra 1,0 ne demek?** Dönem boyunca her gösterimde ilk sırada çıkmışsınız demek. Bir gün 3. sıraya düşseydiniz ortalama 1'in üstüne çıkardı.

## Sınırlar

Arşiv yalnızca bu kurulumun gördüğü günleri içerir. Yeni kurduysanız ilk açılışta en fazla 480 gün geriye gidebilirsiniz. Google'ın gizlediği nadir aramalar arşive de girmez. Arşiv silinirse geçmiş gider. Docker veri deposunu ya da veri klasörünü silmek buna örnektir. Yedek almak size kalır.

<!-- Kaynaklar: src/routes/_project/p/$projectId/rankings.tsx; src/client/features/rankings/RankingsPage.tsx; TrackedQueriesTable.tsx; PositionChange.tsx; PositionBandBars.tsx; MoversCard.tsx; ArchiveStatus.tsx; EmptyArchivePanel.tsx; QueryHistoryCard.tsx; src/serverFunctions/gscHistory.ts; src/server/features/gsc/services/GscHistoryService.ts; src/server/features/gsc/repositories/GscHistoryRepository.ts; src/shared/rankingChange.ts; src/db/gsc-history.schema.ts -->
