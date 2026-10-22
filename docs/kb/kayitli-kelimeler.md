---
title: Kayıtlı kelimeler
description: Arama performansından kaydettiğiniz sorgular. Etiketleyin, Search Console'daki ortalama sıralarını izleyin, CSV ya da E-Tablolar'a aktarın.
screen: Kayıtlı kelimeler
route: /p/<proje>/saved
updated: 2026-10-22
---

Kayıtlı kelimeler, sizin seçtiğiniz sorguların listesidir. Uygulama kelime önermez; Arama performansı ya da Sıralama takibi ekranında bir satırın menüsünden **Kelime olarak kaydet** dediğinizde buraya düşer. Burada etiketlersiniz, gruplarsınız ve her kelimenin son 90 gündeki ortalama sırasını görürsünüz. Sıra bilgisi Sıralama takibi ekranının yerel arşivinden gelir; yani kaydetmek Google'da yeni bir takip başlatmaz, zaten toplanan veriyi bu kelimeler için süzer.

## Ekranda neler var

**Üst çubuk.** Açıklama satırı, **E-Tablolar'a aktar**, **CSV indir** ve **Yenile**. Altında "{n} kayıtlı kelime" sayısı.

**Sıra dağılımı kartı.** Kayıtlı kelimelerinizin kaçının 1-3, 4-10, 11-20 ve 21+ sırada olduğunu gösteren çubuklar; altında "sıralar son 90 günün ortalaması" notu. Arşivde kaydı olmayan kelimeler "Verisi yok" olarak sayılır; arşiv eksikse "Bilinmiyor (arşiv kesildi)" görürsünüz. **İlk 10** ve **Sıra 11-20** çipleri tabloyu o dilime daraltır. Henüz hiçbir kelimenin sırası yoksa "Kelimelerinizin sırası henüz yok" yazar.

**Filtre paneli.** **Sonuçları filtrele** altında **İçersin** ve **İçermesin** kutuları (kelime metninde arama), etiket filtresi (**Etiket ara**), ve **Tümünü temizle**. Hiç etiket yoksa "Henüz etiket yok. Kelimeleri seçip etiket ekleyin." notu çıkar. Bir projede en fazla 50 etiket olabilir.

**Tablo.** Sütunlar: **Kelime**, **Ort. sıra** (veri yoksa üzerine gelince "Search Console bu kelime için sıra kaydetmemiş"), **Amaç**, **Etiketler**, **Eklenme**. Amaç sütunu kelimenin niyetini gösterir: Bilgi amaçlı, Ticari araştırma, İşlem odaklı, Yönlendirici ya da Bilinmiyor; kısa hali Bilgi, Ticari, İşlem, Gezinme, soru işareti. Satır menüsü: **Kelimeyi kopyala**, **Arama performansında ara**, **Kelimeyi sil**.

**Toplu işlemler.** Satırları işaretleyince üstte **Kelimeleri kopyala**, **Etiketleri güncelle** (etiket ekle ya da kaldır) ve silme düğmesi çıkar. Silme onayı "kalıcı olarak silinecek. Bu geri alınamaz." uyarısını gösterir.

**Boş durumlar.** Hiç kelime yoksa "Henüz kayıtlı kelime yok" ve iki kısayol: **Sorgulara göz at** (Arama performansı) ve **Sıralamayı aç** (Sıralama takibi). Filtreler hiçbir satırı tutmuyorsa "Bu filtrelere uyan kelime yok".

## Nasıl kullanılır

1. Arama performansı ekranında **Sıra 5-20** sekmesini açın, sizin için önemli beş on sorguyu satır menüsünden **Kelime olarak kaydet** ile işaretleyin. Para kazandıran sayfaların sorgularını seçmek, en çok gösterim alanları seçmekten daha işe yarar.
2. Buraya gelip seçili kelimeleri işaretleyin, **Etiketleri güncelle** ile "ürün", "blog", "marka" gibi etiketler verin. Etiketler sonraki ay karşılaştırmayı kolaylaştırır.
3. Ayda bir **Sıra dağılımı** kartına bakın. 11-20 dilimindeki kelimeler ilk sayfaya en yakın olanlardır; o kelimelerin sayfalarını Fırsatlar ekranında bulun.
4. Raporlamak için **CSV indir** ya da **E-Tablolar'a aktar**; dosya, uygulanan filtrelerle gelir.

## Sayılar nasıl hesaplanır

Kelimeler ve etiketler bu bilgisayardaki veritabanında durur. Ort. sıra, Sıralama takibi arşivinden son 90 gün için gösterimle ağırlıklandırılmış ortalamadır; eşleşme kelime metninin Türkçe küçük harfe çevrilmiş haliyle yapılır. Arşivden en çok gösterim alan 500 sorgu çekilir; kayıtlı kelimeniz bu 500'ün dışındaysa sırası "bilinmiyor" görünür.

Amaç bilgisi kelime kaydedilirken birlikte geldiyse yazılır; sonradan hesaplanmaz. Liste 50, 100 ya da 250'lik sayfalara bölünür.

## Sık sorulanlar

**Kelimeyi kaydettim, sıra neden boş?** Arşiv o kelime için gün toplamamış olabilir. Sıralama takibi ekranını açıp arşivin dolmasını bekleyin, sonra burada **Yenile** deyin.

**Google'da kendi aradığımda gördüğüm sıra farklı.** Buradaki sıra 90 günlük ortalamadır; tek bir arama sonucuyla karşılaştırılamaz.

**Arama hacmi sütunu nerede?** Yok. Uygulama hacim tahmini yapmaz; gösterim sayısını Arama performansı ekranında görürsünüz.

**Aynı kelimeyi iki kez kaydedebilir miyim?** Hayır, liste aynı metni tek kayıt olarak tutar.

**Etiketi silince kelimeler silinir mi?** Hayır; etiket kalkar, kelimeler kalır.

## Sınırlar

Bu ekran bir anahtar kelime araştırma aracı değildir; öneri üretmez, hacim ya da zorluk göstermez. Sıra bilgisi arşivle sınırlıdır: Google'ın gizlediği nadir sorguların sırası hiç gelmez. Veriler bu kurulumun veritabanındadır; yedeğini sizin almanız gerekir.

<!-- Kaynaklar: src/routes/_project/p/$projectId/saved.tsx; src/client/features/saved-keywords/SavedKeywordsHeader.tsx; SavedKeywordsTable.tsx; SavedKeywordsFilterPanel.tsx; SavedKeywordsTagFilter.tsx; SavedKeywordsSummary.tsx; SavedKeywordsModals.tsx; useSavedKeywordPositions.ts; savedKeywordPositions.ts; src/client/components/IntentBadge.tsx; src/server/features/keywords/repositories/KeywordResearchRepository.ts; src/server/features/keywords/services/research/saved-keywords.ts -->
