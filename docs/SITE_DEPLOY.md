# seowatcher.io

Ürünün tanıtım sitesi `site/` klasöründe: statik, altı dilde (tr, en, de, fr,
it, pt). Sunucu tarafında hiçbir şey çalışmaz, veritabanı yoktur. Görseller
README'dekilerle aynı dosyalar (`docs/images/`), simge
`packaging/windows/icon/` kaynağından.

Çalışma dalı `seotracker-fork`'tur. GitHub'daki `main` dalı geride kalmıştır;
site, kılavuz ve CHANGELOG bağlantıları `seotracker-fork` dalını gösterir.

## Yayın: Hetzner VPS ve nginx

Site, Hetzner'deki VPS'te (IP `94.130.129.213`) nginx ile yayınlanır.
`seowatcher.io` ve `www.seowatcher.io` DNS kayıtları bu IP'yi gösterir.
Aşağıdaki komutları sunucu sahibi kendi makinesinden ve sunucuda çalıştırır;
bu depoda belgelenmiş olmaları sunucuya uygulandıkları anlamına gelmez.

Kullanılan dosyalar:

| Depodaki dosya                                                   | Sunucudaki yeri                                 |
| ---------------------------------------------------------------- | ----------------------------------------------- |
| [nginx-site-server.conf](./nginx-site-server.conf)               | `/etc/nginx/sites-available/seowatcher.io.conf` |
| [nginx-site-headers.conf](./nginx-site-headers.conf)             | `/etc/nginx/snippets/seowatcher-headers.conf`   |
| `site/` klasörünün içeriği (her yüklemede yeni bir sürüm dizini) | `/var/www/seowatcher/releases/<tarih>/`         |
| Canlı sürümü gösteren symlink                                    | `/var/www/seowatcher/current`                   |

`site/_headers` dosyası nginx tarafından okunmaz; aynı başlıkları
`nginx-site-headers.conf` verir. İkisini birlikte değiştirin.

### İlk kurulum (bir kez)

Komutlarda `kullanici` yerine sunucudaki sudo yetkili kullanıcı adınızı
yazın. Sunucu komutları Debian/Ubuntu içindir.

1. Sunucuya bağlanın ve paketleri kurun:

   ```sh
   ssh kullanici@94.130.129.213
   sudo apt update
   sudo apt install nginx certbot python3-certbot-nginx
   ```

2. Dizinleri açın:

   ```sh
   sudo mkdir -p /var/www/seowatcher/releases /var/www/letsencrypt
   ```

3. Önce yalnızca HTTP bloğunu etkinleştirin (sertifika henüz olmadığı için
   HTTPS blokları `nginx -t`'yi geçemez). `/etc/nginx/sites-available/seowatcher.io.conf`
   dosyasına `nginx-site-server.conf` içindeki **ilk** `server { listen 80; … }`
   bloğunu yazın, sonra:

   ```sh
   sudo ln -s /etc/nginx/sites-available/seowatcher.io.conf /etc/nginx/sites-enabled/seowatcher.io.conf
   sudo nginx -t && sudo systemctl reload nginx
   ```

4. Sertifikayı alın (iki ad tek sertifikada). `certonly`, certbot'un nginx
   yapılandırmasını kendi başına değiştirmemesi içindir; `--deploy-hook`
   yenilenen sertifikayı nginx'e yükletir:

   ```sh
   sudo certbot certonly --nginx -d seowatcher.io -d www.seowatcher.io --deploy-hook "systemctl reload nginx"
   ```

   Kontrol: `sudo ls /etc/letsencrypt/live/seowatcher.io/` çıktısında
   `fullchain.pem` ve `privkey.pem` var.

5. Tam yapılandırmayı yerleştirin: `nginx-site-server.conf` dosyasının
   tamamını `/etc/nginx/sites-available/seowatcher.io.conf` içine,
   `nginx-site-headers.conf` dosyasını `/etc/nginx/snippets/seowatcher-headers.conf`
   içine kopyalayın. Brotli modülü kuruluysa (`libnginx-mod-http-brotli-filter`)
   server bloğundaki `brotli` satırlarının yorumunu kaldırın; değilse gzip yeter.

6. Siteyi ilk kez yükleyin: aşağıdaki "Siteyi güncelleme" adımlarını izleyin.
   `current` symlink'i olmadan nginx kök dizini bulamaz, bu yüzden 7. adımdan
   önce yapılmalıdır.

7. Yapılandırmayı deneyip yükleyin:

   ```sh
   sudo nginx -t && sudo systemctl reload nginx
   ```

8. Sertifika yenilemesini doğrulayın:

   ```sh
   systemctl list-timers | grep certbot
   sudo certbot renew --dry-run
   ```

   Kontrol: `certbot.timer` listede (snap kurulumunda `snap.certbot.renew.timer`)
   ve dry-run "Congratulations, all simulated renewals succeeded" der.

### Siteyi güncelleme

Her değişiklikte sunucu sahibi kendi Windows makinesinde, depo klasöründe,
PowerShell ile çalıştırır. `tar.exe`, `scp` ve `ssh` Windows 11'de hazır gelir.

1. Siteyi üretin ve kontrolleri çalıştırın:

   ```powershell
   pnpm run site:build
   pnpm exec prettier --check site scripts docs
   ```

2. Yeni sürüm dizinine yükleyin ve canlıya alın:

   ```powershell
   $sunucu = "kullanici@94.130.129.213"
   $surum = Get-Date -Format yyyyMMdd-HHmmss
   tar.exe -czf "$env:TEMP\seowatcher-site.tar.gz" -C site .
   scp "$env:TEMP\seowatcher-site.tar.gz" "${sunucu}:/tmp/seowatcher-site.tar.gz"
   ssh -t $sunucu "sudo mkdir -p /var/www/seowatcher/releases/$surum && sudo tar -xzf /tmp/seowatcher-site.tar.gz -C /var/www/seowatcher/releases/$surum && sudo chmod -R a+rX /var/www/seowatcher/releases/$surum && sudo ln -sfn /var/www/seowatcher/releases/$surum /var/www/seowatcher/current && rm /tmp/seowatcher-site.tar.gz"
   ```

   Dosyalar durağandır; nginx'i yeniden yüklemek gerekmez. Önceki sürümler
   `releases/` altında kalır.

3. Aşağıdaki "Doğrulama" komutlarını çalıştırın.

Geri dönmek için önceki sürüm dizinini bulun ve symlink'i ona çevirin:

```powershell
ssh $sunucu "ls -1 /var/www/seowatcher/releases"
ssh -t $sunucu "sudo ln -sfn /var/www/seowatcher/releases/<önceki-sürüm> /var/www/seowatcher/current"
```

`dist/` altındaki eski Hetzner paketleri yerel hazırlıklardır; bu adımlar
onlara ihtiyaç duymaz.

### Doğrulama

PowerShell'de `curl` yerine `curl.exe` yazın.

```powershell
curl.exe -sI http://seowatcher.io/
curl.exe -sI https://www.seowatcher.io/en/
curl.exe -sI https://seowatcher.io/
curl.exe -sI https://seowatcher.io/docs
curl.exe -sI https://seowatcher.io/olmayan-sayfa/
curl.exe -sI https://seowatcher.io/privacy/
curl.exe -sI https://seowatcher.io/assets/fonts/geist-latin-wght-normal.woff2
curl.exe -sI https://seowatcher.io/sitemap.xml
```

Beklenen, sırasıyla:

1. `301`, `location: https://seowatcher.io/`
2. `301`, `location: https://seowatcher.io/en/`
3. `200`, `content-type: text/html; charset=utf-8`,
   `content-security-policy: default-src 'none'; …`,
   `strict-transport-security`, `x-frame-options: DENY`,
   `cache-control: no-cache`
4. `301`, `location` sonunda `/docs/`
5. `404` (site/404.html gövdesiyle)
6. `301`, `location: /gizlilik/`
7. `200`, `cache-control: public, max-age=31536000, immutable` ve yine
   `content-security-policy`
8. `200`, `content-type: application/xml; charset=utf-8`,
   `cache-control: max-age=3600`

Ayrıntılı başlık tablosu ve Search Console/Bing adımları
[LAUNCH.md](./LAUNCH.md) içindedir.

## Google Analytics ve çerez tercihleri

GA4 ölçüm kimliği **tek bir yerde** durur:
`scripts/site-locales.mjs` içindeki `ga4MeasurementId`. Şu anda kimlik
tanımlıdır; oluşturucular bunu her sayfaya `<meta name="ga4-id" content="…">`
yazar ve `site/assets/consent.js` buradan okur. Değer boş bırakılırsa hiçbir
Google isteği gönderilmez, çerez bandı çıkmaz ve tarayıcıya tercih kaydedilmez.

Kimlik tanımlıyken Google İzin Modu v2 çalışır: dört izin (`ad_storage`,
`ad_user_data`, `ad_personalization`, `analytics_storage`) varsayılan olarak
reddedilir ve ziyaretçi kabul edene kadar Google'dan hiçbir şey yüklenmez.
Çerez bandı Kabul et, Reddet ve Ayarlar seçeneklerini sunar. Kabul yalnızca
`analytics_storage` iznini açar; Google etiketi yalnızca `seowatcher.io` ve
`www.seowatcher.io` alan adlarında yüklenir. Reklam izinleri,
`allow_google_signals` ve `allow_ad_personalization_signals` kapalıdır. Tercih
`localStorage` içinde `seowatcher-consent-v1` adıyla 6 ay saklanır. Altbilgideki
"Çerez ayarları" bağlantısı tercih ekranını yeniden açar. İzin geri çekilince
ölçüm durdurulur, erişilebilen GA çerezleri silinir ve sayfa yeniden yüklenir.
Yerel ve önizleme alan adlarında gtag.js yüklenmez.

Yayından önce GA4 hesabında gizlilik sayfasıyla tutarlı şu mülk ayarlarını
doğrulayın:

1. **Yönetici → Veri toplama ve değiştirme → Veri saklama**: kullanıcı ve
   etkinlik verileri için 14 ay.
2. **Yönetici → Veri toplama**: Google sinyalleri kapalı.
3. **Yönetici → Hesap ayarları**: Google'ın veri işleme koşulları kabul edilmiş.
4. Web akışında **Gelişmiş ölçüm** açık (kaydırma, dış bağlantı tıklaması,
   dosya indirme).

Hesap erişimiyle bu ayarlar doğrulanmadan mülk düzeyindeki saklama ve Google
sinyali durumlarını canlıda teyit edilmiş saymayın. Kod tarafındaki izinler ve
alan adı koşulu derleme testleriyle denetlenir.

Yayın sonrası:

1. Canlıda çerez bandını ve Kabul/Reddet akışını kontrol edin.
2. GA4 **Gerçek zamanlı** raporunda izin veren bir test ziyareti görünmelidir.
   Kendi IP'niz iç trafik filtresiyle dışlanıyorsa doğrulama için filtreyi
   geçici olarak Test durumuna alın ve sonra geri açın.
3. Reddeden veya henüz seçim yapmayan ziyaretçi için Google etiketi isteği
   olmamalı; yerel önizleme adreslerinde de etiket yüklenmemelidir.
Gizlilik sayfası dile özgü adrestedir: `/gizlilik/`, `/en/privacy/`,
`/de/datenschutz/`, `/fr/confidentialite/`, `/it/privacy/` ve
`/pt/privacidade/`. Eski Türkçe, Almanca, Fransızca ve Portekizce `/privacy/`
adresleri nginx'te 301 ile yönlendirilir (sunucu bloğunda); `site/` içindeki
noindex yönlendirme sayfaları başka barındırmalar için durur.

CSP, Google etiketi için yalnızca şu adreslere izin verir:
`script-src https://www.googletagmanager.com`; `connect-src` ve `img-src`
için `https://*.google-analytics.com`, `https://*.analytics.google.com`,
`https://*.googletagmanager.com`. Canlı indirme sayacı tarayıcıdan
`api.github.com` adresine gittiği için `connect-src https://api.github.com`
de açıktır.

Resmi kaynaklar:
[Google İzin Modu](https://developers.google.com/tag-platform/security/guides/consent),
[Google etiketi ve CSP](https://developers.google.com/tag-platform/security/guides/csp).

## İndirme bağlantısı

Ana sayfalardaki "Windows için indir" düğmesi, sayfada belirtilen sürümün
`releases/download/v<SÜRÜM>/seowatcher-setup-<SÜRÜM>.exe` dosyasına gider.
Bu sürüm yayımlanmadan ana sayfa yayına alınmamalıdır. Kılavuzdaki genel
indirme bağlantısı
`https://github.com/ucsahinn/seotracker/releases/latest/download/seowatcher-setup.exe`
adresine gider. Bu dosya `.github/workflows/release-windows.yml` tarafından her
`v*` etiketinde sürüme eklenir (sürüm numaralı kopyası ve SHA-256 özetiyle
birlikte).

## İndirme sayacı

Tarayıcı, GitHub'ın tüm herkese açık sürümlerindeki Windows kurulum dosyalarının `download_count` değerlerini toplar. Alpha sürümler dahildir; taslaklar, checksum ve arşiv dosyaları dahil değildir. Bu sayı tekil kullanıcı veya kurulum sayısı değildir. Sekme önbelleği ve sıfırdan yükselen sayaç animasyonu kullanılmaz. Görünür sayfa iki dakikada bir yenilenir; arka plandaki sekme istek göndermez. API hatasında, kota dolduğunda veya 15 saniyelik zaman aşımında kart gizlenir; kısmi ya da eski toplam canlı diye sunulmaz. GitHub verisinin güncellenme gecikmesi bizim kontrolümüzde değildir.

## Site kaynaklarını güncelleme

Ana sayfanın düzenlenebilir kaynağı `scripts/site-home.tr.html`, ana stil kaynağı `site/assets/home.css`, davranış kaynakları `site/assets/site.js` ve `site/assets/consent.js` dosyalarıdır. Çerez bandının stili `site/assets/consent.css` dosyasındadır. Üretilmiş `data-home-css` stil bloğunu veya `site/assets/generated/` dosyalarını elle değiştirmeyin.

`pnpm run site:build` altı ana sayfayı, kılavuzları, gizlilik sayfalarını, site haritasını ve beslemeleri üretir; küçültülmüş CSS/JavaScript'i Vite/esbuild ile oluşturur ve JavaScript bağlantılarına içerik özeti ekler. Komutu tek seferde çalıştırın; Windows'ta iki derlemeyi aynı anda başlatmak dosya kilitlerine takılır.

`site/assets/generated/` dosyaları diğer üretilmiş site sayfaları gibi dağıtımın ve kaynak kontrolüne alınacak değişikliklerin parçasıdır. Siteyi aktarırken bu klasörü atlamayın. Testler hem okunabilir hem küçültülmüş JavaScript üzerinde aynı etkileşimleri doğrular; kaynak değişikliklerinden sonra siteyi yeniden üretin.

## Yerelde bakmak

Herhangi bir statik sunucu yeter; örneğin:

```sh
python -m http.server 8765 --directory site
```

## Alternatif: Cloudflare Pages

Yalnızca barındırma ileride değiştirilirse geçerlidir; şimdiki yayın yolu
yukarıdaki Hetzner/nginx kurulumudur. Pages, `site/_headers` dosyasını
kendiliğinden uygular ve `*.pages.dev` önizleme adreslerine `noindex` ekler.
Ayarlar: depo `ucsahinn/seotracker`, üretim dalı `seotracker-fork`, derleme
komutu boş, çıktı klasörü `site`.
