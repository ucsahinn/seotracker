# Değişiklik günlüğü

Yayında tek bir sürüm tutuluyor, bu yüzden burada da tek bir not var. Eski
sürümlerin notları `git log CHANGELOG.md` ile durduğu yerde duruyor.

## [Yayınlanmamış]

## [1.4.0] — 2026-09-30

Panel artık "şimdi ne yapmalıyım" sorusunu cevaplıyor. Google'dan zaten
aldığımız ama hiçbir yerde göstermediğimiz veriler de yerine kondu.

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

### Yenilikler

- **Panelde "Sıradaki adımlar".** Sitenizin durumuna bakıp en fazla üç iş
  öneriyor: Search Console'u bağlayın, kritik sorunlara bakın, denetimi
  tazeleyin. Her satır tek tıkla ilgili ekrana götürüyor.
- **Sayfalar tablosunda hızlı filtreler.** Dizine kapalı, yavaş, alt metni
  eksik, site haritasında yok, hatalı. Her düğmenin üstünde kaç sayfa
  olduğu yazıyor. Karşılığı sıfır olan düğme kapalı görünüyor.
- **Dizin durumunda "Neden" sütunu.** Google bir sayfayı neden dizine almadı:
  robots.txt mi engelliyor, noindex mi var, sayfa alınamadı mı. Sizin
  belirttiğiniz canonical ile Google'ın seçtiği yan yana görünüyor.
- **Alt metni eksik görsellerin adresleri.** Bulgu artık "12 görselden 3'ü"
  demekle kalmıyor, hangi görseller olduğunu da yazıyor.
- **Ülke tablosunda gösterim ve tıklama oranı.** Çok gösterim alıp tıklanmayan
  bir ülke, sıralama değil başlık ve açıklama sorunudur.

### Fırsatlar artık her sayfayı kapsıyor

Ekran yalnızca 4 ile 20. sıra arasını gösteriyordu. Bu yanlıştı: 1. sırada
olup kimsenin tıklamadığı bir sayfa da fırsattır. Artık üç tür var.

- **Tıklanmıyor.** Sıra iyi ama tıklama oranı düşük. Başlık ve açıklama işi.
- **Yaklaşmış.** İlk sayfaya yakın. Sıra yükseltme işi.
- **Derinde.** 20'nin altında ama arayan var. İçerik işi.

Tıklama oranının düşük olup olmadığına kendi sitenizin ortalamasına bakarak
karar veriyoruz, hazır bir tabloya değil.

### Yeni gösterilen veriler

- **Organik gelir ve sipariş sayısı.** Yalnızca gerçekten satış yapan
  sitelerde çıkıyor. Mağazası olmayan bir sitede "gelir: 0" görmezsiniz.
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

76 denetim kuralı · 795 test · 13 ekran çalışıyor

[Yayınlanmamış]: https://github.com/ucsahinn/seotracker/compare/v1.4.0...HEAD
[1.4.0]: https://github.com/ucsahinn/seotracker/releases/tag/v1.4.0
