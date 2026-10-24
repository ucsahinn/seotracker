# seowatcher.io yayın sonrası kontrol listesi

Bu liste, sitenin (`site/` klasörü) seowatcher.io adresinde yayına girmesi için
**sizin hesaplarınızla** yapılması gereken adımları ve yayın sonrası kontrolleri
kapsar. Hesap gerektirmeyen teknik işler (robots.txt, site haritası, görseller,
beslemeler, security.txt, IndexNow anahtarı, manifest, başlıklar) depoda
hazırdır.

Kullanıcının belirttiği etkin yayın hedefi Hetzner VPS ve nginx'tir. Bu nedenle
aşağıdaki Cloudflare Pages adımları yalnızca barındırma sağlayıcısı ayrıca
değiştirilecekse geçerlidir; mevcut DNS veya nameserver ayarlarını değiştirmeyin.
Site yayında. 4–13. adımlar geçerli HTTPS yayını üzerinde yapılacak kontrolleri
ve Google/Bing araçlarındaki işlemleri içerir. `site/` güncellenirse önce
[SITE_DEPLOY.md](./SITE_DEPLOY.md) içindeki sürümlü aktarımı tamamlayın, sonra
bu listedeki canlı kontrolleri tekrarlayın.

Sırayla gidin. Her adımın sonunda "Kontrol" satırı, adımın işe yarayıp
yaramadığını nasıl anlayacağınızı söyler.

Not: Bu dosyadaki komutlar Windows PowerShell'de çalışır. `curl` yerine
`curl.exe` yazın; PowerShell'deki `curl` başka bir komuttur.

## A. Alternatif barındırma: Cloudflare Pages

Mevcut Hostinger/nginx kurulumu için bu bölümdeki satın alma ve nameserver
değiştirme adımlarını uygulamayın. VPS yayın ve geri dönüş sırası
[SITE_DEPLOY.md](./SITE_DEPLOY.md) dosyasındadır. Aşağıdaki 1–3 adımlar yalnızca
Cloudflare'a geçiş ayrıca seçilirse geçerlidir; 4. adımdaki HTTP kontrolleri
her iki barındırma için de yapılır.

### 1. seowatcher.io alan adını alın

1. https://dash.cloudflare.com adresine girin, soldan **Domain Registration →
   Register Domains** seçin.
2. Arama kutusuna `seowatcher.io` yazın, **Purchase** deyin, ödemeyi tamamlayın.
   (Başka bir yerden alırsanız, o firmanın panelinde ad sunucularını
   Cloudflare'in size verdiği iki ad sunucusuyla değiştirin.)

Kontrol: Cloudflare ana sayfasında `seowatcher.io` listede ve durumu
**Active**.

### 2. Cloudflare Pages projesini açın

1. Soldan **Workers & Pages → Create → Pages → Connect to Git** seçin.
2. GitHub'ı bağlayın, depo olarak `ucsahinn/seotracker` seçin.
3. Ayarlar:
   - **Production branch:** `seotracker-fork`
   - **Framework preset:** `None`
   - **Build command:** boş bırakın
   - **Build output directory:** `site`
   - **Environment variables:** `SKIP_DEPENDENCY_INSTALL` = `1` ekleyin
     (site derlenmiş halde depoda durur; Cloudflare'in bağımlılık kurmasına
     gerek yoktur).
4. **Save and Deploy** deyin.

Kontrol: Dağıtım yeşil biter ve `https://<proje-adı>.pages.dev/` açılır.
`curl.exe -sI https://<proje-adı>.pages.dev/` çıktısında
`x-robots-tag: noindex` görünür (önizleme adresleri bilerek dizine kapalıdır).

### 3. Özel alan adını bağlayın (www → çıplak alan adı)

Asıl adres `https://seowatcher.io` (www'siz). www yalnızca yönlendirir.

1. Pages projesinde **Custom domains → Set up a custom domain** deyin,
   `seowatcher.io` yazın, **Activate domain** deyin.
2. Aynı ekranda bir kez daha `www.seowatcher.io` ekleyin.
3. Cloudflare'de `seowatcher.io` alanına girin, **Rules → Redirect Rules →
   Create rule → Templates → Redirect from WWW to Root** seçin. Kaynak
   `https://www.seowatcher.io/*`, hedef `https://seowatcher.io/${1}`, durum
   kodu **301**, **Preserve query string** açık. **Deploy** deyin.
4. **SSL/TLS → Overview**: mod **Full (strict)**. **SSL/TLS → Edge
   Certificates**: **Always Use HTTPS** açık.

Kontrol:

```powershell
curl.exe -sI https://www.seowatcher.io/en/
curl.exe -sI http://seowatcher.io/
```

İlki `301` ve `location: https://seowatcher.io/en/`, ikincisi `301` ve
`location: https://seowatcher.io/` döner.

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

| Adres                          | Görmeniz gereken                                                                                                                  |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `/`                            | `content-type: text/html`, `content-security-policy: default-src 'none'; …`, `strict-transport-security`, `x-frame-options: DENY` |
| `/assets/site.js`              | `cache-control: public, max-age=604800`                                                                                           |
| font (`.woff2`)                | `content-type: font/woff2`, `cache-control: public, max-age=31536000, immutable`                                                  |
| `/sitemap.xml`                 | `content-type: application/xml; charset=utf-8`, `cache-control: public, max-age=3600`                                             |
| `/feed.xml`, `/en/feed.xml`    | `content-type: application/atom+xml; charset=utf-8`, `cache-control: public, max-age=3600`                                        |
| `/.well-known/security.txt`    | `content-type: text/plain; charset=utf-8`, `cache-control: public, max-age=86400`                                                 |
| `/site.webmanifest`            | `content-type: application/manifest+json; charset=utf-8`                                                                          |
| `/robots.txt`, anahtar dosyası | `content-type: text/plain; charset=utf-8`                                                                                         |

Kontrol: Tarayıcıda https://seowatcher.io açın, F12 → **Console**: kırmızı
CSP hatası yok (özellikle manifest için).

## B. Google Search Console

### 5. Alan adı mülkünü ekleyin

1. https://search.google.com/search-console → **Mülk ekle → Alan adı**,
   `seowatcher.io` yazın.
2. Google bir TXT kaydı verir (`google-site-verification=...`). Google size
   "Cloudflare ile otomatik doğrula" seçeneği sunarsa onu kullanın; sunmazsa
   Cloudflare'de **DNS → Records → Add record**: Type `TXT`, Name `@`, Content
   = Google'ın verdiği metin, **Save**.
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
