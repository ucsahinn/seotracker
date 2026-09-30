# Değişiklik günlüğü

Yayında tek bir sürüm tutuluyor, bu yüzden burada da tek bir not var. Eski
sürümlerin notları `git log CHANGELOG.md` ile durduğu yerde duruyor.

## [Yayınlanmamış]

## [1.4.0] — 2026-09-30

Ekranlardaki sayılar artık daha eksiksiz. Google'dan zaten aldığımız ama
hiçbir yerde göstermediğimiz veriler yerine kondu.

### Önce şunu yapın

Ajanların bağlandığı adres artık şifre istiyor. Mevcut ajan ayarlarınız bu
sürümde çalışmayı durdurur. Şifreyi görmek için:

```
docker compose exec seotracker cat /app/.wrangler/mcp-token
```

Çıkan yazıyı ajan ayarlarınıza `Authorization: Bearer <şifre>` olarak
ekleyin. Şifre istemiyorsanız compose dosyanızdaki `MCP_TOKEN=` satırını boş
bırakın. Şifreyi koyduk çünkü o adrese bilgisayarınızdaki başka bir program
da erişebiliyordu.

### Fırsatlar artık her sayfayı kapsıyor

Ekran yalnızca 4 ile 20. sıra arasını gösteriyordu. Bu yanlıştı: 1. sırada
olup kimsenin tıklamadığı bir sayfa da fırsattır. Artık üç tür var.

- **Tıklanmıyor.** Sıra iyi ama tıklama oranı düşük. Başlık ve açıklama işi.
- **Yaklaşmış.** İlk sayfaya yakın. Sıra yükseltme işi.
- **Derinde.** 20'nin altında ama arayan var. İçerik işi.

Tıklama oranının düşük olup olmadığına kendi sitenizin ortalamasına bakarak
karar veriyoruz, hazır bir tabloya değil.

### Yeni gösterilen veriler

- **Organik gelir ve sipariş sayısı.** Analytics'ten zaten alıyorduk,
  hiçbir yerde göstermiyorduk.
- **Ortalama sıra ve tıklama oranı grafiği.** Günlük seyir grafiğinde artık
  iki değil dört ölçü var.
- **Site geneli hız verisi.** Bir sayfanın ziyaretçi sayısı azsa Google o
  sayfa için gerçek kullanıcı verisi vermiyor, sitenizin tamamının
  ortalamasını veriyor. Onu kullanmıyorduk.
- **Sorunların önem dağılımı halkası.**

### Düzeltilenler

- **Grafik "Son 28 gün" derken 7 gün çiziyordu.** Google, gösterim olmayan
  günü hiç göndermiyor. O günler sıfır, boşluk değil.
- **Tarih aralığı yalnızca ekran boşken görünüyordu.** Yani tam da
  gerekmediği anda.
- **Sıralama penceresi eksik sayıyordu.** "30 gün" aslında 27 gün veriyordu.
- **Denetim silmeden önce sormuyordu.**
- **Dizin durumu raporlarının çoğu sessizce boş geçiyordu.** Google'ın
  cevabı Türkçe kaydedilmişse hiçbir bulgu üretmiyordu. 29 kaydın 23'ü bu
  durumdaydı.
- **Bazı renkler açık temada okunmuyordu.** Bazı küçük düğmelere parmakla
  basmak zordu. Telefonda birkaç düğmeye ulaşılamıyordu.
- **Ülke kodları ham geliyordu.** "TUR" yerine "Türkiye".
- Tablolar sıralanabiliyor. Satırlarda kopyala ve aç düğmeleri var.

### Sayılar

76 denetim kuralı · 774 test · 13 ekran çalışıyor

[Yayınlanmamış]: https://github.com/ucsahinn/seotracker/compare/v1.4.0...HEAD
[1.4.0]: https://github.com/ucsahinn/seotracker/releases/tag/v1.4.0
