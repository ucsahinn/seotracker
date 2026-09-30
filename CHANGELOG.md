# Değişiklik günlüğü

Yayında tek sürüm tutuluyor, bu yüzden burada tek not var. Eski notlar
`git log CHANGELOG.md` içinde.

## [Yayınlanmamış]

## [1.8.0] — 2026-09-30

Bu sürüm, bugüne kadar çıkan tüm sürümlerin notlarını tek yerde toplar.

### Önce şunu yapın

Ajanların bağlandığı adres artık şifre istiyor. Mevcut ajan ayarlarınız
çalışmayı durdurur. Şifreyi görmek için:

```
docker compose exec seotracker cat /app/.wrangler/mcp-token
```

Çıkan yazıyı ajan ayarlarınıza `Authorization: Bearer <şifre>` olarak
ekleyin. Şifre istemiyorsanız compose dosyanızda `MCP_TOKEN=` satırını boş
bırakın.

### Eklendi

- Site denetimi 0 ile 100 arası puan veriyor. Sorun kalmayınca 100 alırsınız.
- Hız ölçümü artık taranan tüm sayfalarda, mobil ve masaüstünde yapılıyor. Google kotası dolarsa ölçülenler korunur ve ekran bunu söyler.
- Hız sekmesinde gerçek ziyaretçilerin son haftalardaki hız gidişatı (LCP, CLS, INP). Google Cloud projenizde "Chrome UX Report API" açık olmalı; değilse ekran bunu söyler.
- Arama performansında arama türü seçimi (web, görsel, video, haber) ve "arama görünümü" dökümü.
- Sorunlar sekmesinde her sorunun etkilediği sayfalar adresleriyle görünüyor; adresleri kopyalayabilir, sorunu CSV olarak indirebilirsiniz.
- İndirilen denetim raporu baştan yazıldı: kapak ve puan, grafikler, her sorun için etkilenen adresler, hız, dizin durumu ve sayfa listesi. A4 olarak yazdırılabilir.
- Denetim 95 kontrol yapıyor. Yeniler: paylaşım kartı etiketleri, sayfa https değil, asıl adres eksik, dil bilgisi eksik, geçersiz yapısal veri, yinelenen H1, bozuk dil sürümü bağlantısı, boş veya genel bağlantı metni, çok uzun adres, karakter kodlaması eksik ve daha fazlası.
- Dizin durumunda "Neden" sütunu: Google bir sayfayı neden dizine almadı.
- Fırsatlar artık her sayfayı gösteriyor. Bir satıra tıklayınca neden listede olduğunu ve ne yapacağınızı görürsünüz.
- Panelde "Sıradaki adımlar", tıklama eğilimi ve birinci sayfaya yakın sorgular.
- Arama performansında ülke ve cihaz halkaları, Analytics'te cihaz, ülke, yeni/dönen ziyaretçi ve kaynak/kampanya dağılımı.
- Sıralama takibinde yükselen ve düşen sorgular.
- Raporlar, Kayıtlı kelimeler, Proje bilgisi ve Destek ekranlarına özet kartları.
- Her ekranda tıklayınca listeyi süzen grafikler ve hızlı filtre düğmeleri.
- Denetim raporunu tek dosya olarak indirme, tanılama paketi, ekranların yarım saatte bir kendini yenilemesi.
- Denetimler arası gidişat grafiği ve tarama süresi tahmini.

### Düzenlendi

- Tüm ekran metinleri ve denetim kurallarının açıklamaları sade Türkçeye çevrildi.
- Tablolar sıralanabiliyor, adresler tıklanabiliyor, seçtiğiniz tarih aralığı ve filtreler adreste saklanıyor.
- Denetim silmeden önce soruyor.
- Renkler açık temada okunur hale getirildi.

### Çıkarıldı

- Ücretli veriden kalan Hacim, CPC, Rekabet ve Zorluk sütunları kayıtlı kelimelerin dışa aktarımından kalktı.
- Fırsatlardaki "yalnızca 4 ile 20. sıra" sınırı kalktı.
- Aynı işi yapan dört ayrı halka grafiği tek bileşene indi.
- Eski sürüm notları kaldırıldı; hepsi bu nottadır.

### Düzeltildi

- Grafik "Son 28 gün" derken 7 gün çiziyordu.
- Dizin durumunda bazı satırlar boş görünüyordu.
- Hız ölçümü kota yüzünden başarısız olunca ekran nedenini söylemiyordu.
- Aynı denetimin raporunu aynı gün ikinci kez indirmek hata veriyordu.
- Sıralama takibi sessizce yalnızca ilk 25 sorguyu gösteriyordu; arşiv hiç dolmuyordu.
- Ölçülemeyen değerler sıfır olarak çiziliyordu.

[Yayınlanmamış]: https://github.com/ucsahinn/seotracker/compare/v1.8.0...HEAD
[1.8.0]: https://github.com/ucsahinn/seotracker/releases/tag/v1.8.0
