# Değişiklik günlüğü

Yayında tek sürüm tutuluyor, bu yüzden burada tek not var. Eski notlar
`git log CHANGELOG.md` içinde.

## [Yayınlanmamış]

## [1.6.0] — 2026-09-30

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
- Denetime yeni kontroller: paylaşım kartı etiketleri, sayfa https değil, asıl adres eksik, dil bilgisi eksik, iç bağlantı yönlendirmeye gidiyor, güvenli sayfada güvensiz kaynak, alt metni dosya adı.
- Dizin durumunda "Neden" sütunu: Google bir sayfayı neden dizine almadı.
- Fırsatlar artık her sayfayı gösteriyor. Bir satıra tıklayınca neden listede olduğunu ve ne yapacağınızı görürsünüz.
- Panelde "Sıradaki adımlar", tıklama eğilimi ve birinci sayfaya yakın sorgular.
- Arama performansında ülke ve cihaz halkaları, Analytics'te cihaz, ülke ve yeni/dönen ziyaretçi dağılımı.
- Sıralama takibinde yükselen ve düşen sorgular.
- Raporlar, Kayıtlı kelimeler, Proje bilgisi ve Destek ekranlarına özet kartları.
- Her ekranda tıklayınca listeyi süzen grafikler ve hızlı filtre düğmeleri.
- Denetim raporunu tek dosya olarak indirme, tanılama paketi, ekranların yarım saatte bir kendini yenilemesi.
- Denetimler arası gidişat grafiği ve tarama süresi tahmini.

### Düzenlendi

- Tüm ekran metinleri ve 79 denetim kuralının açıklaması sade Türkçeye çevrildi.
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
- Sıralama takibi sessizce yalnızca ilk 25 sorguyu gösteriyordu; arşiv hiç dolmuyordu.
- Ölçülemeyen değerler sıfır olarak çiziliyordu.

[Yayınlanmamış]: https://github.com/ucsahinn/seotracker/compare/v1.6.0...HEAD
[1.6.0]: https://github.com/ucsahinn/seotracker/releases/tag/v1.6.0
