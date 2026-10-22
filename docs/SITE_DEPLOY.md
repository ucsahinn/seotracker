# seowatcher.io

Ürünün tanıtım sitesi `site/` klasöründe: statik, Türkçe. Dış kaynak yok;
`index.html` ile `assets/` klasöründen ibaret. Görseller README'dekilerle aynı
dosyalar (`docs/images/`), simge `packaging/windows/icon/` kaynağından.

## Yayın: Cloudflare Pages

Cloudflare panelinde **Workers & Pages → Create → Pages → Connect to Git**:

| Ayar                   | Değer                 |
| ---------------------- | --------------------- |
| Repository             | `ucsahinn/seotracker` |
| Production branch      | `main`                |
| Build command          | (boş)                 |
| Build output directory | `site`                |

Sonra **Custom domains → seowatcher.io** (alan adı Cloudflare'da kayıtlıysa DNS
kaydı kendiliğinden eklenir). `_headers` dosyası güvenlik ve önbellek
başlıklarını verir; Pages bunu otomatik uygular.

Panel yerine komut satırı:

```sh
pnpm exec wrangler login
pnpm exec wrangler pages project create seowatcher --production-branch main
pnpm exec wrangler pages deploy site --project-name seowatcher
```

## Yerelde bakmak

Herhangi bir statik sunucu yeter; örneğin:

```sh
python -m http.server 8765 --directory site
```

## İndirme bağlantısı

"Windows için indir" düğmesi
`https://github.com/ucsahinn/seotracker/releases/latest/download/seowatcher-setup.exe`
adresine gider. Bu dosya `.github/workflows/release-windows.yml` tarafından her
`v*` etiketinde sürüme eklenir (sürüm numaralı kopyası ve SHA-256 özetiyle
birlikte). Bağlantı, ilk Windows paketli sürüm yayınlanana kadar 404 döner.

## Hosting: VPS gerekmez

Site statiktir: HTML, CSS, bir JavaScript dosyası ve görseller. Sunucu tarafında
hiçbir şey çalışmaz, veritabanı yoktur. Bu yüzden VPS boşa paradır; seçenekler:

1. **Cloudflare Pages (önerilen, ücretsiz).** Depoyu bağlayın, çıktı klasörü
   `site`, dal `main`. Dünya çapında önbellek, otomatik HTTPS, `_headers`
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
