---
title: Sıralama takibi
description: Sorgularınızın Google'daki ortalama sırası, bu bilgisayarda tutulan bir arşivden. Google'ın 16 aylık sınırından eskiye de bakarsınız.
screen: Sıralama takibi
route: /p/<proje>/rankings
updated: 2026-10-22
---

Search Console geçmişi 16 ayla sınırlar ve bir sorgunun hangi gün kaç sıraya düştüğünü göstermez. Sıralama takibi bunun için var: uygulama Search Console'dan gün gün sorgu verisini çeker, kendi veritabanına yazar ve o arşiv üzerinden sıra değişimini hesaplar. Arşiv bu bilgisayarda durur; bu yüzden ekran açıldıkça büyür ve zamanla Google'ın göstermediği kadar eskiye gider.

## Ekranda neler var

**Zaman aralığı.** 30 gün, 90 gün (varsayılan), 6 ay, 16 ay ve Arşivin tamamı. Aralık bugünden üç gün geriye kadar sayılır.

**Arşiv durumu satırı.** "Arşiv {aralık} … {n} satır." biçiminde, arşivde kaç gün ve kaç satır olduğunu söyler. Ekran her açılışta eksik günleri Google'dan tamamlar; o sırada "Bu açılışta N gün eklendi." ya da "Kalan günler sonraki açılışta tamamlanacak." notu görürsünüz. Arşiv ilk kez dolarken bir açılış yetmeyebilir; bir sonraki açılış kaldığı yerden devam eder.

**Sorgu içinde ara** kutusu listeyi daraltır.

**Değişim filtreleri.** **Yükselenler** ve **Düşenler** (en az yarım sıra hareket edenler), **Şu an ilk 10'da**, **İlk 10'dan çıkanlar**. Hızlı çipler: **Gösterimi yüksek** (en az 100 gösterim) ve **Hiç tıklanmayan**.

**Sıra dağılımı.** 1-3, 4-10, 11-20 ve 21+ dilimlerinde kaç sorgunuz olduğunu gösteren çubuklar.

**Yükselenler ve düşenler.** İki kısa liste: "En çok yükselenler" ve "En çok düşenler".

**Tablo.** Sütunlar: **Sorgu**, **Ort. sıra**, **Değişim**, **Gösterim**, **Tıklama**, **Gün**. Gün sütunu, sorgunun seçili aralıkta kaç gün veri ürettiğini söyler; 90 günlük aralıkta 3 gün görünen bir sorgu nadir aranıyordur. Değişim hücresinde "Yükseldi 2,4" ya da "Düştü 1,1" yazar; önceki dönemde veri yoksa "Önceki dönemde bu sorgu için veri yok." açıklaması çıkar. Satır menüsü: **Kelimeyi kopyala**, **Kayıtlı kelimelere ekle**, **Arama performansında ara**.

**Sorgu geçmişi.** Bir satıra tıklayınca o sorgunun gün gün sıra çizgisi, toplam tıklama ve gösterimi açılır; **Arama performansında aç** bağlantısı aynı sorguyu diğer ekranda gösterir.

**Boş durumlar.** Arşiv henüz boşsa "Henüz hangi kelimeyle arandığınız bilinmiyor" ve **Arama performansını aç** düğmesi görünür. Liste en çok gösterim alan 100 sorguyla sınırlıysa altında "Arşivde daha fazla sorgu var; bu liste en çok gösterim alan 100 tanesiyle sınırlı" notu çıkar.

## Nasıl kullanılır

1. Ekranı ilk kez açtığınızda arşiv durumu satırının "eklendi" demesini bekleyin. İlk doldurma 480 güne kadar geriye gider ve birkaç açılış sürebilir; her açılışta en fazla dört adet 30 günlük parça çekilir.
2. Bir düşüş araştırıyorsanız **Düşenler** çipine basın, sonra **Gösterimi yüksek** ile önemsiz sorguları eleyin. Kalan listede en üstteki sorguya tıklayıp geçmiş grafiğinde düşüşün başladığı günü okuyun.
3. Takip etmek istediğiniz sorguları satır menüsünden **Kayıtlı kelimelere ekle** ile işaretleyin; Kayıtlı kelimeler ekranı bu arşivden sıra çeker.
4. Ayda bir **Yükselenler ve düşenler** kartına bakmak, bir check-in için yeterli özettir.

## Sayılar nasıl hesaplanır

Arşiv, Search Console'dan "tarih ve sorgu" boyutuyla, yalnızca kesinleşmiş (final) veriyle doldurulur. Her çekim üç gün geriye sarar; böylece Google'ın sonradan düzelttiği günler yeniden yazılır.

Tablodaki tıklama ve gösterim toplamdır. Ort. sıra, gösterimle ağırlıklandırılmış ortalamadır: sorgunun çok gösterim aldığı günler ortalamayı daha çok etkiler. Gün, veri olan gün sayısıdır.

Değişim, önceki dönemin ortalama sırasından bu dönemin ortalama sırası çıkarılarak bulunur; pozitif sayı yükseliş demektir. Önceki dönem aynı uzunluktadır ve hemen öncesinde biter; karşılaştırma için önceki dönemin en çok gösterim alan 5.000 sorgusu kullanılır.

Liste en çok gösterim alan 100 sorguyu getirir ve tarayıcıda 25, 50 ya da 100'lük sayfalara böler. Sunucu tarafında üst sınır 500 satır ve 1.825 gündür.

## Sık sorulanlar

**Neden Search Console'daki rakamdan farklı?** Arşiv yalnızca kesinleşmiş günleri tutar ve bugünden üç gün geriye kadar gider; Search Console'da bugünü içeren bir aralık seçtiyseniz sayılar tutmaz.

**Sorgu listede var ama sıra geçmişi boş.** O sorgu seçili aralıkta çok az gün görünmüş olabilir; Gün sütununa bakın.

**Arşiv neden hep aynı günde takılı kaldı?** Ekranı açmadıysanız arşiv dolmaz; uygulama arka planda çekmez. Ekranı açın, "eklendi" notunu bekleyin.

**Rakibimin sırasını görebilir miyim?** Hayır. Search Console yalnızca kendi mülkünüzün sıralarını verir.

**Sıra 1,0 ne demek?** Dönem boyunca her gösterimde ilk sırada çıkmışsınız. Bir günde bile 3. sıraya düşseydiniz ortalama 1'in üstüne çıkardı.

## Sınırlar

Arşiv yalnızca bu kurulumun gördüğü günleri içerir; uygulamayı yeni kurduysanız ilk açılışta en fazla 480 gün geriye gidebilir. Google'ın gizlediği nadir sorgular arşive de girmez. Yerel arşiv silinirse (Docker birimi ya da veri klasörü kaldırılırsa) geçmiş gider; yedeğini almak size düşer.

<!-- Kaynaklar: src/routes/_project/p/$projectId/rankings.tsx; src/client/features/rankings/RankingsPage.tsx; TrackedQueriesTable.tsx; PositionChange.tsx; PositionBandBars.tsx; MoversCard.tsx; ArchiveStatus.tsx; EmptyArchivePanel.tsx; QueryHistoryCard.tsx; src/serverFunctions/gscHistory.ts; src/server/features/gsc/services/GscHistoryService.ts; src/server/features/gsc/repositories/GscHistoryRepository.ts; src/shared/rankingChange.ts; src/db/gsc-history.schema.ts -->
