# seowatcher.io

Ürünün tanıtım sitesi `site/` klasöründe: statik, altı dilde. Google Analytics
yalnızca ziyaretçi onayından sonra yüklenir. Görseller README'dekilerle aynı
dosyalar (`docs/images/`), simge `packaging/windows/icon/` kaynağından.

## Mevcut yayın hedefi: Hetzner VPS ve nginx

Bu kurulumun hedefi nginx kullanılan Hetzner VPS’tir. Hostinger nameserver'larını
değiştirmeyin. Cloudflare Pages aşağıdaki alternatif yoldur; mevcut hedefle
birlikte uygulanacak ikinci bir kurulum değildir.

VPS bağlantı adı, site kök dizini ve mevcut nginx yapılandırması doğrulanmadan
dosya yüklemeyin veya sunucu yapılandırmasını değiştirmeyin. Yayın sırası:

1. Windows sürümünün indirme dosyalarını ve SHA-256 özetini doğrulayın.
2. `site/` içeriğini ayrı bir sürüm dizinine aktarın; önceki yayını koruyun.
3. HTTPS site bloğunda [nginx-site-headers.conf](./nginx-site-headers.conf)
   başlıklarını uygulayın. `_headers` nginx tarafından okunmaz.
4. `nginx -t` başarılıysa mevcut dağıtım yöntemine göre yeni dizini etkinleştirin.
5. HTTPS, www yönlendirmesi, gerçek 404 yanıtı, güvenlik başlıkları, çerez
   tercihleri, indirme bağlantıları ve site haritasını canlıda doğrulayın.
6. Hata varsa önceki site dizinine dönün; `nginx -t` sonrasında yeniden yükleyin.

Bu adımların bu depoda belgelenmesi, VPS'e uygulandıkları anlamına gelmez.

## Alternatif yayın: Cloudflare Pages

Cloudflare panelinde **Workers & Pages → Create → Pages → Connect to Git**:

| Ayar                   | Değer                 |
| ---------------------- | --------------------- |
| Repository             | `ucsahinn/seotracker` |
| Production branch      | `seotracker-fork`     |
| Build command          | (boş)                 |
| Build output directory | `site`                |

Sonra **Custom domains → seowatcher.io** (alan adı Cloudflare'da kayıtlıysa DNS
kaydı kendiliğinden eklenir). `_headers` dosyası güvenlik ve önbellek
başlıklarını verir; Pages bunu otomatik uygular.

Panel yerine komut satırı:

```sh
pnpm exec wrangler login
pnpm exec wrangler pages project create seowatcher --production-branch seotracker-fork
pnpm exec wrangler pages deploy site --project-name seowatcher
```

## Yerelde bakmak

Herhangi bir statik sunucu yeter; örneğin:

```sh
python -m http.server 8765 --directory site
```

## İndirme bağlantısı

Ana sayfalardaki "Windows için indir" düğmesi, sayfada belirtilen sürümün
`releases/download/v<SÜRÜM>/seowatcher-setup-<SÜRÜM>.exe` dosyasına gider.
Bu sürüm yayımlanmadan ana sayfa yayına alınmamalıdır. Kılavuzdaki genel indirme bağlantısı
`https://github.com/ucsahinn/seotracker/releases/latest/download/seowatcher-setup.exe`
adresine gider. Bu dosya `.github/workflows/release-windows.yml` tarafından her
`v*` etiketinde sürüme eklenir (sürüm numaralı kopyası ve SHA-256 özetiyle
birlikte). Bağlantı, ilk Windows paketli sürüm yayınlanana kadar 404 döner.

## Alternatif barındırma seçenekleri

Site statiktir: HTML, CSS, JavaScript dosyaları ve görseller. Sunucu tarafında
hiçbir şey çalışmaz, veritabanı yoktur. Mevcut VPS dışında bir barındırma yolu
seçilecekse aşağıdakiler değerlendirilebilir; bu bir sağlayıcı değişikliği talimatı değildir:

1. **Cloudflare Pages (önerilen, ücretsiz).** Depoyu bağlayın, çıktı klasörü
   `site`, dal `seotracker-fork`. Dünya çapında önbellek, otomatik HTTPS, `_headers`
   dosyasındaki güvenlik başlıkları ve önbellek süreleri olduğu gibi uygulanır.
   Alan adını Hostinger'dan ya da Cloudflare Registrar'dan alın; Hostinger'dan
   alırsanız ad sunucularını Cloudflare'in verdiği ikiliye çevirin, Pages
   projesine özel alan adı olarak `seowatcher.io` ve `www.seowatcher.io`
   ekleyin.
2. **Hostinger web hosting (en ucuz paket yeter).** `site/` klasörünü
   `public_html` içine yükleyin. `_headers` dosyası orada çalışmaz; aynı
   başlıkları `.htaccess` ile vermeniz gerekir ve `*.pages.dev` için yazılmış
   noindex satırları gereksizdir.

Canlı indirme sayacı tarayıcıdan `api.github.com` adresine gider; CSP'de
`connect-src https://api.github.com` bu yüzden açıktır.

## Google Analytics ve çerez tercihleri

- GA4 mülkü: `560473456`; web akışı: `16190721492`; ölçüm kimliği:
  `G-DFPDX00V4R`.
- `assets/consent.js`, temel Consent Mode v2 kullanır: varsayılan izinler
  reddedilir ve kabul gelmeden Google etiketi yüklenmez. Kabul yalnızca analiz
  iznini açar; reklam izinleri kapalı kalır. Yerel ve önizleme alan adlarında
  üretim ölçümü başlatılmaz.
- Kabul ve ret aynı görünürlükte sunulur. Tercih 6 ay saklanır; her sayfanın
  altındaki çerez ayarlarından değiştirilebilir. İzin geri çekilince ölçüm
  durdurulur, erişilebilir GA çerezleri silinir ve sayfa yeniden yüklenir.
- Gizlilik sayfası dile özgü adrestedir: `/gizlilik/`, `/en/privacy/`,
  `/de/datenschutz/`, `/fr/confidentialite/`, `/it/privacy/` ve
  `/pt/privacidade/`. Eski Türkçe, Almanca, Fransızca ve Portekizce adresler
  uyumluluk için noindex HTML yönlendirmesi sunar; Hetzner'de HTTP 301 için
  paket içindeki `privacy-redirects.conf` yönergeleri nginx'e elle eklenmelidir.
  `pnpm run site:build` bu altı sayfayı ve site haritasını üretir. Toplam 144
  içerik ve gizlilik URL'si beklenir; 404 sayfası site haritasına girmez.
- `_headers` yalnızca destekleyen hosting platformlarında uygulanır. nginx
  için [nginx-site-headers.conf](./nginx-site-headers.conf) örneğini HTTPS
  `server` bloğuna dahil edin. Aynı başlığı iki kez göndermeyin; alt `location`
  bloklarında `add_header` varsa nginx başlık mirasını ayrıca kontrol edin.
  Bu dosya VPS'e uygulanmış değildir.
- Yayından sonra CSP'yi tarayıcıda, kabul/ret akışını ve `file_download`
  etkinliğini GA4'te doğrulayın. Kendi IP'niz iç trafik filtresiyle dışlanıyorsa
  doğrulama için filtreyi geçici olarak Test durumuna alın ve sonra geri açın.

Resmi uygulama kaynakları:
[Google Consent Mode](https://developers.google.com/tag-platform/security/guides/consent?consentmode=basic),
[Google etiketi ve CSP](https://developers.google.com/tag-platform/security/guides/csp).

## İndirme sayacı

Tarayıcı, GitHub’ın tüm herkese açık sürümlerindeki Windows kurulum dosyalarının `download_count` değerlerini toplar. Alpha sürümler dahildir; taslaklar, checksum ve arşiv dosyaları dahil değildir. Bu sayı tekil kullanıcı veya kurulum sayısı değildir. Sekme önbelleği ve sıfırdan yükselen sayaç animasyonu kullanılmaz. Görünür sayfa iki dakikada bir yenilenir; arka plandaki sekme istek göndermez. API hatasında, kota dolduğunda veya 15 saniyelik zaman aşımında kart gizlenir; kısmi ya da eski toplam canlı diye sunulmaz. GitHub verisinin güncellenme gecikmesi bizim kontrolümüzde değildir.

## Hetzner yapılandırma örneği ve güncelleme paketi

[nginx-site-server.conf](./nginx-site-server.conf) HTTP → HTTPS ve www → ana alan adı yönlendirmelerini, gerçek 404 yanıtını ve önbellek sürelerini içerir. Dizin ve sertifika yolları örnektir; sunucudaki gerçek yollarla eşleştirin. Sertifika hem `seowatcher.io` hem `www.seowatcher.io` adını kapsamalıdır. Başlık dosyasını örnekteki snippet yoluna yerleştirin; etkinleştirmeden önce sunucuda `nginx -t` çalıştırın. Yerel makinede nginx olmadığı için bu yapılandırma burada çalıştırılmadı.

24 Ekim 2026 kontrolünde GitHub `v0.5.0 Alpha` sürümünü en son yayımlanan sürüm olarak gösteriyordu; sürüm numaralı kurulum dosyası, sabit indirme adı ve `SHA256SUMS.txt` varlıkları listeleniyordu. Altı dildeki ana sayfaların sürüm numaralı indirme bağlantısı bu kontroldeki duruma göre üretildi. Bu kontrol, indirme sayacı için sabit değer değildir.

26 Ekim 2026 tarihli 0.7.1 Alpha site güncelleme paketi `dist/seowatcher-hetzner-site-0.7.1-alpha-20261026.tar.gz` dosyasıdır. Bu arşiv yalnızca mevcut statik siteyi yeni sürüm dizinine alıp `current` symlink'ini değiştirmek içindir; ilk kurulum betiğini tekrar çalıştırmayın. Paket açıklaması ve doğrulama komutları `dist/hetzner-site-update-0.7.1-alpha-20261026/README-UPDATE.md` içindedir. Arşivdeki doğrulayıcı 149 HTML dosyasını ve 144 sitemap adresini denetler. Bu yerel hazırlık, VPS'e uygulanmış olduğu anlamına gelmez.

Yayın sonrası Google Search Console ve Bing Webmaster Tools'ta `https://seowatcher.io/sitemap.xml` gönderilmeli; ana sayfa, altı dilin canonical/hreflang ilişkileri ve bir olmayan URL'nin 404 durumu kontrol edilmelidir. robots.txt ve llms.txt arama/yanıt motorlarına erişim sağlar; dizine alınma veya yapay zekâ yanıtında yer alma garantisi vermez.

## Site kaynaklarını güncelleme

Ana sayfanın düzenlenebilir kaynağı `scripts/site-home.tr.html`, ana stil kaynağı `site/assets/home.css`, davranış kaynakları `site/assets/site.js` ve `site/assets/consent.js` dosyalarıdır. Üretilmiş `data-home-css` stil bloğunu veya `site/assets/generated/` dosyalarını elle değiştirmeyin.

`node scripts/build-site-home.mjs build` mevcut Vite/esbuild bağımlılığıyla küçültülmüş CSS/JavaScript üretir, JavaScript bağlantılarına içerik özeti ekler ve altı ana sayfayı günceller. Ana stil sayfaya küçültülmüş olarak dahil edilir; ek bir engelleyici CSS isteği gerekmez. Kılavuzlar için tam `pnpm run site:build` komutu kullanılabilir.

`site/assets/generated/` dosyaları diğer üretilmiş site sayfaları gibi dağıtımın ve kaynak kontrolüne alınacak değişikliklerin parçasıdır. Siteyi aktarırken bu klasörü atlamayın. Testler hem okunabilir hem küçültülmüş JavaScript üzerinde aynı etkileşimleri doğrular; kaynak değişikliklerinden sonra siteyi yeniden üretin.
