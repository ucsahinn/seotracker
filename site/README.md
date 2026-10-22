# seowatcher.io

Ürünün tanıtım sitesi: tek sayfa, statik, Türkçe. Betik yok, dış kaynak yok;
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
