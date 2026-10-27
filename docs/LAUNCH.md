# seowatcher.io yayın sonrası kontrol listesi

Bu liste, seowatcher.io için canlı teknik kontrolleri ve Google/Bing hesaplarında
yapılacak yayın sonrası adımlarını kapsar. Hesap gerektirmeyen işler
(robots.txt, site haritası, görseller, beslemeler, security.txt, IndexNow
anahtarı, manifest ve başlıklar) `site/` çıktısında hazırlanır.

Site Hetzner VPS ve nginx üzerinde barındırılır. İlk kurulum yalnızca sunucuda
henüz kurulum yoksa gerekir; mevcut siteyi güncellerken
[SITE_DEPLOY.md](./SITE_DEPLOY.md) içindeki güncelleme akışını kullanın. Her yeni
site paketi kurulduktan sonra bu canlı kontrolleri yeniden yapın.

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

### 2. Canlı siteyi kurun veya güncelleyin

Sunucuda henüz site kurulmadıysa [SITE_DEPLOY.md](./SITE_DEPLOY.md) içindeki
"İlk kurulum" adımlarını izleyin. Kurulu siteyi güncellemek için yalnızca
"Siteyi güncelleme" akışını kullanın; ilk kurulum betiğini mevcut sunucuda
yeniden çalıştırmayın.

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
- Kılavuz dizinleri: `https://seowatcher.io/kilavuz/`,
  `https://seowatcher.io/en/docs/`,
  `https://seowatcher.io/de/dokumentation/`,
  `https://seowatcher.io/fr/guides/`, `https://seowatcher.io/it/guide/` ve
  `https://seowatcher.io/pt/guias/`.

Eski `/docs/` adresleri ve önceki dil kılavuz slug'ları `noindex` yenileme
sayfalarıdır. URL denetiminde bunları indekslemeye göndermeyin; yeni dile özel
canonical adresleri kullanın.

Kontrol: Her birinde "Dizine ekleme isteği gönderildi" mesajı. **Canlı URL'yi
test et** sonucu "URL Google'da kullanılabilir".

### 8. Dil sürümlerini (hreflang) kontrol edin

Google eski "Uluslararası hedefleme" raporunu 2022'de kaldırdı; artık ayrı bir
hreflang raporu yok. Bunun yerine:

1. URL denetiminde bir ana sayfa ve bir kılavuz sayfası için **Taranan sayfayı
   görüntüle → HTML** açın. Her birinde yedi `hreflang` satırı olmalı (tr, en,
   de, fr, it, pt, x-default); alternate URL'ler birbirine karşılıklı dönmeli.
2. Birkaç gün sonra
   `https://seowatcher.io/de/dokumentation/installation-unter-windows/` için
   **Google tarafından seçilen standart URL**, sayfanın kendi Almanca canonical
   adresi olmalı; Türkçe veya başka bir dile katlanmamalı.

Kontrol: İki standart URL aynı.

### 9. Sayfa dizine ekleme raporu (birkaç gün sonra)

1. Soldan **Sayfalar** (Dizine ekleme → Sayfalar).

Kontrol: Site haritasında 144 canonical adres vardır; Google'ın dizine aldığı
sayının 144 olması beklenmez ve garanti edilmez. Eski `/docs/` yolları
`noindex` yenileme sayfaları olduğundan, Google bunları gördükçe "noindex"
olarak hariç tutabilir; bu eski adreslerin arama sonuçlarında görünmemesi
beklenir. Yeni dile özel canonical kılavuz sayfalarının yanlışlıkla
hariç tutulmadığını ve seçilen canonical adreslerinin doğru olduğunu kontrol
edin. `www`/`http` yönlendirmeleri ile gerçek `404` adresleri dizine alınmamalı;
"Tarandı - şu anda dizine eklenmiş değil" yeni sayfalarda bir süre normal
olabilir.

### Search generative AI görünürlüğü

Google'ın Search Console'daki **Search generative AI** kontrolü 31 Ağustos 2026
itibarıyla tüm sitelere açıldı. Kontrol; AI Overviews, AI Mode ve Discover'daki
üretken yapay zekâ özelliklerinde sitenizin bağlantı ve içeriğinin yer almasına
izin verip vermediğinizi belirler.

1. Search Console'da `seowatcher.io` alan adı mülkünü açın.
2. **Ayarlar → Search generative AI** bölümüne girin. **Include my site's links
   and content** seçili olmalı. Mülk **Inherit control from parent** kullanıyorsa,
   üst mülkün de dahil edildiğini doğrulayın. Google'ın varsayılanı dahil etmektir;
   yine de bu mülkte veya üst mülkte dışlama seçilmediğini kontrol edin.
3. **Generative AI performance report** raporunu açın. Search raporu AI Overviews
   ve AI Mode gösterimlerini sayfa, ülke, tarih ve cihaz boyutlarında gösterir.
   Discover için ayrı rapor kullanılır. Rapor görünmüyorsa Google'a göre site henüz
   yeterli gösterim almamış olabilir veya Search generative AI özelliklerinden
   çıkarılmış olabilir.

Kontrol: Search generative AI ayarı dahil durumunda (veya dahil durumundaki üst
mülkü miras alıyor) olmalı. Raporun bulunması görünürlüğü garanti etmez; yeni ya
da düşük trafikli sitelerde yeterli veri oluşana kadar rapor görünmeyebilir.

Google, AI Overviews/AI Mode için `llms.txt`, özel GEO işaretlemesi ya da özel
schema istemiyor; `llms.txt` Google Search sıralamasına katkı sağlamaz. Sitedeki
dosya, onu kullanan diğer sistemler için durur. Google görünürlüğünde öncelik;
indekslenebilir, yararlı ve özgün içerik, açık iç bağlantılar ve iyi sayfa
deneyimidir.

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

Her dilde bir ana sayfa ve bir kılavuz sayfası deneyin:

- Türkçe: `https://seowatcher.io/` ve
  `https://seowatcher.io/kilavuz/kurulum-windows/`
- İngilizce: `https://seowatcher.io/en/` ve
  `https://seowatcher.io/en/docs/install-windows/`
- Almanca: `https://seowatcher.io/de/` ve
  `https://seowatcher.io/de/dokumentation/installation-unter-windows/`
- Fransızca: `https://seowatcher.io/fr/` ve
  `https://seowatcher.io/fr/guides/installation-sous-windows/`
- İtalyanca: `https://seowatcher.io/it/` ve
  `https://seowatcher.io/it/guide/installazione-su-windows/`
- Portekizce: `https://seowatcher.io/pt/` ve
  `https://seowatcher.io/pt/guias/instalar-no-windows/`

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
