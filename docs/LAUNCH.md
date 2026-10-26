# seowatcher.io yayın sonrası kontrol listesi

Bu liste, sitenin (`site/` klasörü) seowatcher.io adresinde yayına girmesi için
**sizin hesaplarınızla** yapılması gereken adımları ve yayın sonrası kontrolleri
kapsar. Hesap gerektirmeyen teknik işler (robots.txt, site haritası, görseller,
beslemeler, security.txt, IndexNow anahtarı, manifest, başlıklar) depoda
hazırdır.

Yayın yolu Hetzner VPS (IP `94.130.129.213`) ve nginx'tir; DNS kayıtları bu
IP'yi gösterir. Site henüz sunucuya yüklenmedi: önce A bölümünü
[SITE_DEPLOY.md](./SITE_DEPLOY.md) ile tamamlayın, sonra bu listedeki canlı
kontrollere geçin. `site/` her güncellendiğinde aynı yükleme adımlarını
tekrarlayıp canlı kontrolleri yeniden yapın. Çalışma dalı `seotracker-fork`'tur
(`main` geride kalmıştır).

Sırayla gidin. Her adımın sonunda "Kontrol" satırı, adımın işe yarayıp
yaramadığını nasıl anlayacağınızı söyler.

Not: Bu dosyadaki komutlar Windows PowerShell'de çalışır. `curl` yerine
`curl.exe` yazın; PowerShell'deki `curl` başka bir komuttur.

## A. Hetzner ve nginx üzerinde yayın

### 1. DNS'i kontrol edin

```powershell
nslookup seowatcher.io
nslookup www.seowatcher.io
```

Kontrol: İkisi de `94.130.129.213` adresini döner.

### 2. Sunucuyu kurun ve siteyi yükleyin

[SITE_DEPLOY.md](./SITE_DEPLOY.md) içindeki "İlk kurulum" adımlarını (nginx,
certbot ile `seowatcher.io` ve `www.seowatcher.io` sertifikası, yapılandırma)
ve ardından "Siteyi güncelleme" adımlarını uygulayın.

Kontrol: `sudo nginx -t` "syntax is ok" ve "test is successful" der;
`sudo certbot renew --dry-run` başarılı biter.

### 3. Yönlendirmeleri doğrulayın (www → çıplak alan adı, http → https)

Asıl adres `https://seowatcher.io` (www'siz). www ve http yalnızca yönlendirir.

```powershell
curl.exe -sI https://www.seowatcher.io/en/
curl.exe -sI http://seowatcher.io/
curl.exe -sI https://seowatcher.io/olmayan-sayfa/
```

İlki `301` ve `location: https://seowatcher.io/en/`, ikincisi `301` ve
`location: https://seowatcher.io/`, üçüncüsü `404` döner.

### 4. Başlıkları doğrulayın

```powershell
curl.exe -sI https://seowatcher.io/
curl.exe -sI https://seowatcher.io/assets/site.js
curl.exe -sI https://seowatcher.io/assets/fonts/geist-latin-wght-normal.woff2
curl.exe -sI https://seowatcher.io/sitemap.xml
curl.exe -sI https://seowatcher.io/feed.xml
curl.exe -sI https://seowatcher.io/en/feed.xml
curl.exe -sI https://seowatcher.io/.well-known/security.txt
curl.exe -sI https://seowatcher.io/site.webmanifest
curl.exe -sI https://seowatcher.io/robots.txt
curl.exe -sI https://seowatcher.io/7fe8ca017428a1da776989562353dd6c.txt
```

Beklenen (hepsi `HTTP/2 200`):

| Adres                          | Görmeniz gereken                                                                                                                                                            |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                            | `content-type: text/html; charset=utf-8`, `content-security-policy: default-src 'none'; …`, `strict-transport-security`, `x-frame-options: DENY`, `cache-control: no-cache` |
| `/assets/site.js`              | `cache-control: max-age=604800`                                                                                                                                             |
| font (`.woff2`)                | `content-type: font/woff2`, `cache-control: public, max-age=31536000, immutable`                                                                                            |
| `/sitemap.xml`                 | `content-type: application/xml; charset=utf-8`, `cache-control: max-age=3600`                                                                                               |
| `/feed.xml`, `/en/feed.xml`    | `content-type: application/atom+xml; charset=utf-8`, `cache-control: max-age=3600`                                                                                          |
| `/.well-known/security.txt`    | `content-type: text/plain; charset=utf-8`, `cache-control: max-age=86400`                                                                                                   |
| `/site.webmanifest`            | `content-type: application/manifest+json; charset=utf-8`                                                                                                                    |
| `/robots.txt`, anahtar dosyası | `content-type: text/plain; charset=utf-8`                                                                                                                                   |

`font/woff2` için sunucunun `mime.types` dosyasında `font/woff2 woff2;` satırı
olmalıdır (güncel nginx paketlerinde vardır).

Kontrol: Tarayıcıda https://seowatcher.io açın, F12 → **Console**: kırmızı
CSP hatası yok (özellikle manifest için).

## B. Google Search Console

### 5. Alan adı mülkünü ekleyin

1. https://search.google.com/search-console → **Mülk ekle → Alan adı**,
   `seowatcher.io` yazın.
2. Google bir TXT kaydı verir (`google-site-verification=...`). Alan adının
   DNS kayıtlarını yönettiğiniz panelde yeni bir kayıt ekleyin: Type `TXT`,
   Name `@`, Content = Google'ın verdiği metin, kaydedin.
3. Search Console'da **Doğrula** deyin (DNS birkaç dakika sürebilir).

Kontrol: `nslookup -type=TXT seowatcher.io` çıktısında Google metni görünür,
Search Console "Sahiplik doğrulandı" der.

### 6. Site haritasını gönderin

1. Soldan **Site haritaları**, kutuya `https://seowatcher.io/sitemap.xml`
   yazın, **Gönder**.

Kontrol: Durum **Başarılı**, bulunan sayfa sayısı **144**. (Altı gizlilik
sayfası dahil; 404 sayfası hariç. Site haritası
ana sayfaların ekran görüntülerini de içerir; görsel sayısı ayrıca gösterilmez.)

### 7. Önemli sayfaları dizine eklemeyi isteyin

Üstteki arama kutusuna (URL denetimi) her adresi tek tek yapıştırın, sonuç
gelince **Dizine eklenmesini iste** deyin. Günlük kotası sınırlıdır; bu 12
adres yeterlidir:

- Ana sayfalar: `https://seowatcher.io/`, `https://seowatcher.io/en/`,
  `https://seowatcher.io/de/`, `https://seowatcher.io/fr/`,
  `https://seowatcher.io/it/`, `https://seowatcher.io/pt/`
- Kılavuzlar: `https://seowatcher.io/docs/`, `https://seowatcher.io/en/docs/`,
  `https://seowatcher.io/de/docs/`, `https://seowatcher.io/fr/docs/`,
  `https://seowatcher.io/it/docs/`, `https://seowatcher.io/pt/docs/`

Kontrol: Her birinde "Dizine ekleme isteği gönderildi" mesajı. **Canlı URL'yi
test et** sonucu "URL Google'da kullanılabilir".

### 8. Dil sürümlerini (hreflang) kontrol edin

Google eski "Uluslararası hedefleme" raporunu 2022'de kaldırdı; artık ayrı bir
hreflang raporu yok. Bunun yerine:

1. URL denetiminde `https://seowatcher.io/en/` için **Taranan sayfayı
   görüntüle → HTML** açın, `hreflang` satırlarının yedi tane olduğunu görün
   (tr, en, de, fr, it, pt, x-default).
2. Birkaç gün sonra `https://seowatcher.io/de/` denetiminde **Google
   tarafından seçilen standart URL** = kullanıcı tarafından belirtilen standart
   URL olmalı (Almanca sayfa Türkçeye katlanmamış olmalı).

Kontrol: İki standart URL aynı.

### 9. Sayfa dizine ekleme raporu (birkaç gün sonra)

1. Soldan **Sayfalar** (Dizine ekleme → Sayfalar).

Kontrol: Site haritasında 144 adres vardır; dizine alınan sayı Google'ın
kararına bağlıdır ve bu sayıya ulaşması garanti değildir. "Dizine
eklenmemiş" altında yalnızca `www` ve `http` yönlendirmeleri ile `404`
görünmeli. "Tarandı - şu anda dizine eklenmiş değil" yeni sitelerde normaldir,
bekleyin.

## C. Bing ve IndexNow

### 10. Bing Webmaster Tools

1. https://www.bing.com/webmasters → Microsoft hesabıyla girin → **Import from
   Google Search Console** seçin, Google hesabınızı bağlayın, `seowatcher.io`
   işaretleyin, **Import**.
2. **Sitemaps** sayfasında `https://seowatcher.io/sitemap.xml` görünmüyorsa
   **Submit sitemap** ile ekleyin.

Kontrol: Sitemaps listesinde durum **Success**, URL sayısı 144.

### 11. IndexNow ile tüm adresleri bildirin

Anahtar: `7fe8ca017428a1da776989562353dd6c` (gizli değildir; tasarım gereği
herkese açık `https://seowatcher.io/7fe8ca017428a1da776989562353dd6c.txt`
dosyasında durur). Önce dosyanın açıldığını kontrol edin, sonra depo
klasöründe şu komutu çalıştırın (site haritasındaki adresleri gönderir):

```powershell
node -e "const fs=require('fs');const urlList=[...fs.readFileSync('site/sitemap.xml','utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);fetch('https://api.indexnow.org/indexnow',{method:'POST',headers:{'content-type':'application/json; charset=utf-8'},body:JSON.stringify({host:'seowatcher.io',key:fs.readFileSync('site/7fe8ca017428a1da776989562353dd6c.txt','utf8').trim(),keyLocation:'https://seowatcher.io/7fe8ca017428a1da776989562353dd6c.txt',urlList})}).then(r=>console.log(r.status,urlList.length))"
```

Kontrol: Çıktı `200` ya da `202` ve gönderilen adres sayısı. `403` anahtar dosyası
okunamadı demektir (adım 4'teki son `curl` satırı), `422` adreslerden biri
`seowatcher.io` dışında demektir. Her yeni sürümden sonra aynı komutu bir kez
daha çalıştırın.

## D. Doğrulama araçları

### 12. Yapılandırılmış veri

Her dil için bir ana sayfa ve bir kılavuz sayfası deneyin, ör.
`https://seowatcher.io/` ve `https://seowatcher.io/docs/kurulum-windows/`,
`https://seowatcher.io/en/` ve `https://seowatcher.io/en/docs/install-windows/`
(de, fr, it, pt için de aynı).

1. https://search.google.com/test/rich-results → adresi yapıştırın → **URL'yi
   test et**.
2. https://validator.schema.org → **Fetch URL** → adresi yapıştırın → **Run
   test**.

Kontrol: Rich Results Test'te "Geçerli öğeler algılandı", kırmızı hata yok.
Schema validator'da 0 hata (uyarılar kabul edilebilir).

### 13. Hız

1. https://pagespeed.web.dev → `https://seowatcher.io/` → **Analiz et**;
   **Mobil** ve **Masaüstü** sekmelerine bakın.
2. Aynısını `https://seowatcher.io/en/` için yapın.

Kontrol: Performans, Erişilebilirlik, En İyi Uygulamalar ve SEO yeşil
(90 ve üzeri). Yeni sitede "Gerçek kullanıcı deneyimi" bölümü boş olur; bu
normaldir, yeterli ziyaretçi birikince dolar.

## E. GitHub deposu

### 14. Depo vitrinini düzenleyin

1. https://github.com/ucsahinn/seotracker → **Settings → General → Social
   preview → Edit → Upload an image** → `site/assets/og.png`.
2. Depo ana sayfasında sağdaki **About** yanındaki dişli:
   - **Description:** `Search Console, Analytics 4 ve site denetimi tek uygulamada. Ücretsiz, açık kaynak, Windows'a kurulur.`
   - **Website:** `https://seowatcher.io`
   - **Topics:** `seo`, `google-search-console`, `google-analytics`,
     `site-audit`, `pagespeed-insights`, `self-hosted`, `mcp`, `windows`,
     `open-source`
3. **Settings → General → Features**: **Issues** açık olmalı.
4. **Settings → Code security → Private vulnerability reporting → Enable**
   (security.txt güvenlik bildirimlerini buraya yönlendirir).
5. İsteğe bağlı: README'nin üstüne site rozeti, ör.
   `[![Site](https://img.shields.io/badge/site-seowatcher.io-0c0b0a)](https://seowatcher.io)`.

Kontrol: Depo bağlantısını bir sohbete yapıştırınca önizlemede og.png görünür;
https://github.com/ucsahinn/seotracker/security/advisories/new açılır.

## F. Düzenli işler

- **security.txt'in süresi 2027-10-23'te dolar.** O tarihten önce
  `site/.well-known/security.txt` içindeki `Expires` satırını bir yıl ileri
  alın.
- Her site güncellemesinden sonra: `pnpm run site:build` çalıştırın, paketi
  [SITE_DEPLOY.md](./SITE_DEPLOY.md) içindeki Hetzner/nginx adımlarıyla aktarın;
  HTTPS doğrulandıktan sonra B ve D bölümlerini tekrarlayın. Bing için istenirse
  IndexNow komutunu yayın sonrasında bir kez çalıştırın.
- **Google Analytics:** GA4 ölçüm kimliği kaynakta tanımlıdır. Hetzner'e
  yüklemeden önce [SITE_DEPLOY.md](./SITE_DEPLOY.md) içindeki "Google Analytics
  ve çerez tercihleri" bölümünde belirtilen GA4 mülk ayarlarını doğrulayın;
  erişim olmadığı için 14 aylık saklama süresi ve Google Sinyalleri durumu
  burada teyit edilmemiştir. Yayın sonrası gerçek zamanlı raporu ve izin
  akışını kontrol edin.

## Ne beklememelisiniz

- **SSS zengin sonuçları** (arama sonucunda açılan soru-cevaplar) Google
  tarafından 2023'ten beri yalnızca bilinen resmi kurum ve sağlık sitelerine
  gösterilir. Sayfadaki SSS verisi doğru ve zararsızdır, ama sonuçta
  görünmesini beklemeyin.
- **Sıralama zaman alır.** Yeni bir alan adının dizine girmesi günler,
  aramalarda görünür olması haftalar ya da aylar sürer.
- **Garanti yok.** Bu adımlar Google'ın, Bing'in ve yapay zekâ arama
  motorlarının siteyi bulmasını ve doğru okumasını sağlar; sıralamayı ya da
  bir yapay zekâ cevabında anılmayı garanti etmez.
