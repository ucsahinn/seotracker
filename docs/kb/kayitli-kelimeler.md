---
title: Kayıtlı kelimeler
description: Önemsediğiniz aramaları buraya kaydeder, etiketler, son 90 günlük ortalama sıralarına bakarsınız. İsterseniz CSV ya da E-Tablolar'a aktarırsınız.
screen: Kayıtlı kelimeler
route: /p/<proje>/saved
updated: 2026-10-22
---

Önemsediğiniz aramaları toplar, etiketler ve sıralarını izlersiniz.

Uygulama size kelime önermez. Arama performansı ya da Sıralama takibi ekranında bir satırın menüsünden **Kelime olarak kaydet** dersiniz, kelime buraya düşer. Burada her kelimenin son 90 gündeki ortalama sırasını görürsünüz. Sıra, Sıralama takibi arşivinden gelir. Kaydetmek Google'da yeni bir takip başlatmaz. Zaten toplanan veriyi bu kelimeler için süzer.

## Ekranda neler var

**Üst çubuk.** Bir açıklama satırı, **E-Tablolar'a aktar**, **CSV indir** ve **Yenile** düğmeleri var. Altında "{n} kayıtlı kelime" yazar.

**Sıra dağılımı kartı.** Çubuklar kelimelerinizden kaçının 1-3, 4-10, 11-20 ve 21+ sırada olduğunu gösterir. Altında "sıralar son 90 günün ortalaması" notu durur. Arşivde kaydı olmayan kelime "Verisi yok" sayılır. Arşiv eksikse "Bilinmiyor (arşiv kesildi)" görürsünüz. **İlk 10** ve **Sıra 11-20** düğmeleri tabloyu o dilime daraltır.

**Filtre paneli.** **Sonuçları filtrele** altında **İçersin** ve **İçermesin** kutuları var. İkisi de kelimenin içinde metin arar. Etiket aramak için **Etiket ara**'yı kullanın. **Tümünü temizle** hepsini sıfırlar. Bir projede en fazla 50 etiket olabilir.

**Tablo.** Sütunlar şunlar: **Kelime**, **Ort. sıra**, **Amaç**, **Etiketler**, **Eklenme**. Sıra boşsa üzerine gelince "Search Console bu kelime için sıra kaydetmemiş" yazar. **Amaç** sütunu, kelimeyi arayan kişinin ne istediğini gösterir:

- Bilgi amaçlı: öğrenmek istiyor.
- Ticari araştırma: karşılaştırıp seçecek.
- İşlem odaklı: satın almaya hazır.
- Yönlendirici: belli bir siteyi arıyor.
- Bilinmiyor: belli değil.

Tabloda bunların kısa halleri görünür: Bilgi, Ticari, İşlem, Gezinme ve soru işareti. Satır menüsünde üç seçenek var: **Kelimeyi kopyala**, **Arama performansında ara**, **Kelimeyi sil**.

**Toplu işlemler.** Satırları işaretleyince üstte **Kelimeleri kopyala**, **Etiketleri güncelle** ve silme düğmesi çıkar. Silmeden önce "kalıcı olarak silinecek. Bu geri alınamaz." uyarısı gelir.

**Boş durumlar.** Hiç kelime yoksa "Henüz kayıtlı kelime yok" yazar. İki kısayol çıkar: **Sorgulara göz at** ve **Sıralamayı aç**. Filtreye uyan kelime yoksa "Bu filtrelere uyan kelime yok" yazar.

## Nasıl kullanılır

1. Arama performansında **Sıra 5-20** sekmesini açın. Önemli bulduğunuz beş on aramayı **Kelime olarak kaydet** ile işaretleyin. Para kazandıran sayfaların aramalarını seçin. Bunlar, en çok gösterilen aramaları seçmek kadar işe yarar.
2. Buraya gelip kelimeleri işaretleyin. **Etiketleri güncelle** ile "ürün", "blog", "marka" gibi etiketler verin. Gelecek ay karşılaştırmak kolaylaşır.
3. Ayda bir **Sıra dağılımı** kartına bakın. 11-20 dilimindeki kelimeler ilk sayfaya en yakın olanlardır. O kelimelerin sayfalarını Fırsatlar ekranında bulun.
4. Rapor için **CSV indir** ya da **E-Tablolar'a aktar** deyin. Dosya, uyguladığınız filtrelerle gelir.

## Sayılar nasıl hesaplanır

Kelimeler ve etiketler bu bilgisayardaki veritabanında durur. **Ort. sıra**, Sıralama takibi arşivinden son 90 gün için hesaplanır. Çok gösterim alınan günler ortalamayı daha çok etkiler. Büyük küçük harf farkı sayılmaz.

Arşivden en çok gösterilen 500 arama çekilir. Kayıtlı kelimeniz bu 500'ün dışındaysa sırası "bilinmiyor" görünür.

Amaç bilgisi, kelime kaydedilirken geldiyse yazılır. Sonradan hesaplanmaz. Liste 50, 100 ya da 250'lik sayfalara bölünür.

## Sık sorulanlar

**Kelimeyi kaydettim, sıra neden boş?** Arşiv o kelime için henüz gün toplamamış olabilir. Sıralama takibi ekranını açın ve arşivin dolmasını bekleyin. Sonra burada **Yenile** deyin.

**Google'da aradığımda sıram farklı.** Buradaki sıra 90 günün ortalamasıdır. Tek bir aramayla karşılaştırılamaz.

**Arama hacmi sütunu nerede?** Yok. Uygulama hacim tahmini yapmaz. Gösterim sayısını Arama performansı ekranında görürsünüz.

**Aynı kelimeyi iki kez kaydedebilir miyim?** Hayır. Aynı metin tek kayıt olur.

**Etiketi silince kelimeler silinir mi?** Hayır. Etiket kalkar, kelimeler kalır.

## Sınırlar

Bu ekran kelime araştırma aracı değildir. Kelime önermez, hacim ya da zorluk göstermez. Sıra bilgisi arşivin kapsadığı günlerle sınırlıdır. Google'ın gizlediği nadir aramaların sırası hiç gelmez. Veriler bu kurulumun veritabanında durur, yedeğini sizin almanız gerekir.

<!-- Kaynaklar: src/routes/_project/p/$projectId/saved.tsx; src/client/features/saved-keywords/SavedKeywordsHeader.tsx; SavedKeywordsTable.tsx; SavedKeywordsFilterPanel.tsx; SavedKeywordsTagFilter.tsx; SavedKeywordsSummary.tsx; SavedKeywordsModals.tsx; useSavedKeywordPositions.ts; savedKeywordPositions.ts; src/client/components/IntentBadge.tsx; src/server/features/keywords/repositories/KeywordResearchRepository.ts; src/server/features/keywords/services/research/saved-keywords.ts -->
