---
title: Sıralama takibi
description: Aramalarınızın Google'daki ortalama sırasını, hangilerinin yükselip düştüğünü ve sıra gruplarındaki değişimi görürsünüz. Veri bu bilgisayarda saklandığı için Google'ın 16 aylık sınırından da eskiye bakabilirsiniz.
screen: Sıralama takibi
route: /p/<proje>/rankings
updated: 2026-10-27
---

Aramalarınızın zamanla nasıl yükselip düştüğünü ve hangi hareketin en çok önem taşıdığını burada görürsünüz. Google Search Console geçmişi 16 ayla sınırlar. Bir aramanın hangi gün kaçıncı sırada olduğunu da göstermez.

Uygulama bu veriyi gün gün çekip bu bilgisayarda saklar. Ekranı açtıkça arşiv büyür. Zamanla Google'ın göstermediği kadar eskiye gidersiniz.

## Ekranda neler var

**Zaman aralığı.** Seçenekler 30 gün, 90 gün (varsayılan), 6 ay, 16 ay ve Arşivin tamamı. Seçtiğiniz aralık adres çubuğunda durur. Aralık bugünden üç gün geriye kadar sayılır. Üstte hangi tarihlerin gösterildiği yazar.

**Arşiv durumu satırı.** Arşivin hangi tarihleri kapsadığını yazar. Ekran her açılışta eksik günleri Google'dan tamamlar. "Bu açılışta N gün eklendi." yazıyorsa arşive yeni gün girmiştir. "Kalan günler sonraki açılışta tamamlanacak." yazıyorsa iş bir sonraki açılışta devam eder.

**Yükselenler ve düşenler.** İki kısa liste: **En çok yükselenler** ve **En çok düşenler**. Her satırda sorgu, "6,2 → 4,1. sıra" gibi eski ve yeni sıra, gösterim sayısı ve kaç sıra oynadığı yazar. Liste yalnızca yer değiştirmeye göre sıralanmaz. Yer değiştirme gösterimle çarpılır. Çok aranan bir sorgunun iki sıra yükselmesi, az aranan bir sorgunun dört sıra yükselmesinden önce gelir. Bir satıra tıklayınca o sorgunun geçmişi tablonun altında açılır. Önceki dönemde verisi olmayan sorgular bu listelere girmez. Hiç karşılaştırma yapılamıyorsa bölümün yerinde nedenini söyleyen bir not görürsünüz.

**Sıra dağılımı.** Dört çubuk, sorgularınızın ortalama sırasına göre kaçının 1-3, 4-10, 11-20 ve 21+ grubunda olduğunu gösterir. Her çubuğun yanında sorgu sayısı ve payı yazar. En sağdaki sayı, önceki döneme göre o gruba giren ya da çıkan sorgu sayısıdır. Ok ve işaretle gösterilir. İlk üç grupta artış iyi haberdir. 21+ grubunda artış kötü haberdir. Bir çubuğa basınca tablo o gruba daralır. Yeniden basınca süzgeç kalkar.

**Arama kutusu ve süzgeçler.** **Sorgu içinde ara** kutusu listeyi daraltır. Altında iki süzgeç grubu var.

- **Değişim filtreleri**: **Yükselenler** ve **Düşenler** önceki döneme göre en az yarım sıra oynayanları gösterir. **Şu an ilk 10'da** ve **İlk 10'dan çıkanlar** da buradadır.
- **Hızlı filtreler**: **Gösterimi yüksek** ve **Hiç tıklanmayan**. Gösterimi yüksek, listedeki en çok gösterilen dörtte birdir. Sabit bir sayı yoktur, çünkü sabit bir sayı kısa aralıkta her satırı seçerdi.

Bir süzgeç listeyi gerçekten daraltmıyorsa görünmez. Hiçbir satırı ya da her satırı seçen düğme bir şey söylemez.

**Tablo.** Sütunlar şunlar: **Sorgu**, **Ortalama sıra**, **Değişim**, **Gösterim**, **Tıklama** ve bazen **Gün**. Başlıklara tıklayarak sıralarsınız. Varsayılan sıralama gösterime göredir. **Ortalama sıra** hücresinde, solda küçük bir çizgi vardır. Bu çizgi seçili aralığın hafta hafta sırasını gösterir. Çizgi yukarı çıkıyorsa sıra iyileşiyor demektir. Küçük ekranda çizgi gizlenir. Sıra numarası ilk sayfadaysa yeşil, ikinci sayfadaysa sarı yazılır. Renk tek başına bir bilgi taşımaz. Sayı her zaman yazılıdır. **Değişim** hücresinde "2,4 sıra yükseldi", "1,1 sıra geriledi" ya da "Değişmedi" yazar. Önceki dönemde verisi olmayan sorguda "Önceki dönemde veri yok" notu çıkar. **Gün** sütunu yalnızca bazı sorgular bazı günlerde görünmediğinde çıkar. 90 günde yalnızca 3 gün görünen arama, nadir aranan bir aramadır. Satır menüsünde üç seçenek var: **Kelimeyi kopyala**, **Kayıtlı kelimelere ekle**, **Arama performansında ara**. Tablo 25, 50 ya da 100'lük sayfalara bölünür.

**Sorgu geçmişi.** Bir satıra tıklayınca o aramanın gün gün sıra çizgisi açılır. Çizgide yukarısı daha iyi sıradır. Üzerine gelince o günün sırası, tıklaması ve gösterimi yazar. **Arama performansında aç** bağlantısı aynı aramayı diğer ekranda gösterir.

**Boş durumlar.** Search Console bağlı değilse **Search Console'u bağla** düğmesi çıkar. Arşiv boşsa "Hangi kelimelerle arandığınız henüz görünmüyor" yazar ve **Arama performansını aç** düğmesi çıkar. Liste en çok gösterilen 100 aramayla sınırlıdır. Daha fazlası varsa altında bunu söyleyen bir not görürsünüz.

## Nasıl kullanılır

1. Ekranı ilk kez açınca arşiv satırında "eklendi" yazmasını bekleyin.
2. İlk doldurma 480 güne kadar geriye gider. Birkaç açılış sürebilir.
3. **Yükselenler ve düşenler** bölümüne bakın. En üstteki düşen sorgu, trafiğinize en çok zarar veren harekettir.
4. **Sıra dağılımı** çubuklarına bakın. 21+ grubunun yanında kırmızı bir artış varsa sorgular ikinci sayfanın ötesine kayıyordur.
5. Düşüş arıyorsanız **Düşenler** süzgecine basın. Sonra **Gösterimi yüksek** ile önemsizleri eleyin.
6. En üstteki aramaya tıklayın. Geçmiş grafiğinde düşüşün başladığı günü okuyun.
7. İzlemek istediğiniz aramaları **Kayıtlı kelimelere ekle** ile işaretleyin.

## Sayılar nasıl hesaplanır

Arşiv yalnızca Google'ın kesinleştirdiği veriyle dolar. Her açılışta son üç gün yeniden çekilir, çünkü Google o günleri sonradan düzeltebilir. Böylece düzeltilen günler arşive yeniden yazılır. Ekranı açmak Search Console kotasından harcar. Bu yüzden ekran, son doldurmadan sonra 15 dakika içinde yeniden açılırsa aynı sonucu kullanır.

Tıklama ve gösterim toplamdır. **Ortalama sıra** hesabında çok gösterim alınan günlerin ağırlığı daha fazladır. **Gün**, verisi olan gün sayısıdır.

Değişimi şöyle buluruz: önceki dönemin ortalama sırasından bu dönemin sırasını çıkarırız. Sonuç pozitifse yükselmişsinizdir. Önceki dönem aynı uzunluktadır ve bu dönemin hemen öncesinde biter. Karşılaştırma yalnızca iki dönemde de verisi olan sorgular için yapılır. Yarım sıradan az oynayan sorgu "yükselen" ya da "düşen" sayılmaz.

Yükselenler ve düşenler listesi, sıra farkını gösterimle çarparak sıralanır. Her liste en çok beş satırdır.

Sıra grupları yuvarlanmış sıraya göre kesilir. 3,4 "üçüncü civarı", 3,5 "dördüncü civarı" sayılır. Bu yüzden 3,4 sırasındaki bir sorgu 1-3 grubunda, 3,5 sırasındaki 4-10 grubunda durur.

Liste en çok gösterilen 100 aramayı getirir.

## Sık sorulanlar

**Search Console'daki rakamdan neden farklı?** Arşiv yalnızca kesinleşmiş günleri tutar ve üç gün geriye kadar gider. Search Console'da bugünü içeren bir aralık seçtiyseniz sayılar tutmaz.

**Arama listede var ama sıra geçmişi boş.** O arama az gün görünmüş olabilir. Bunu **Gün** sütunundan anlarsınız.

**Neden "Değişim gösterilemiyor" yazıyor?** Arşivde önceki dönem için bu sorgulara ait kayıt yok. Daha kısa bir aralık seçin ya da arşivin dolmasını bekleyin.

**Arşiv neden aynı günde takılı?** Uygulama arka planda veri çekmez. Ekranı açın ve "eklendi" notunu bekleyin.

**Rakibimin sırasını görebilir miyim?** Hayır. Search Console yalnızca kendi sitenizin verisini verir.

**Sıra 1,0 ne demek?** Dönem boyunca her gösterimde ilk sırada çıkmışsınız demek. Bir gün 3. sıraya düşseydiniz ortalama 1'in üstüne çıkardı.

## Sınırlar

Arşiv yalnızca bu kurulumun gördüğü günleri içerir. Yeni kurduysanız ilk açılışta en fazla 480 gün geriye gidebilirsiniz. Google'ın gizlediği nadir aramalar arşive de girmez. Arşiv silinirse geçmiş gider. Docker veri deposunu ya da veri klasörünü silmek buna örnektir. Yedek almak size kalır.

<!-- Kaynaklar: src/routes/_project/p/$projectId/rankings.tsx; src/client/features/rankings/RankingsPage.tsx; TrackedQueriesTable.tsx; PositionChange.tsx; PositionBandBars.tsx; PositionSparkline.tsx; MoversCard.tsx; ArchiveStatus.tsx; EmptyArchivePanel.tsx; QueryHistoryCard.tsx; positionBands.ts; rankingMoves.ts; src/shared/positionBands.ts; src/serverFunctions/gscHistory.ts; src/server/features/gsc/services/GscHistoryService.ts; src/server/features/gsc/repositories/GscHistoryRepository.ts; src/shared/rankingChange.ts; src/db/gsc-history.schema.ts -->
