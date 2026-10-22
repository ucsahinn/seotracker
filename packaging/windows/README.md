# seowatcher için Windows paketi

Son kullanıcının Docker, Node ya da terminal görmeden tek `.exe` ile kurduğu
sürüm. Mevcut Docker kurulumu (`compose.yaml`) ve geliştirici kurulumu
olduğu gibi kalır; bu paket onların yanına eklenir.

## Nasıl çalışır

Derlenmiş worker (`vite build` çıktısı) Docker'da olduğu gibi workerd içinde
çalışır; farkı, konteyner yerine `wrangler dev` ile başlatılmasıdır. Paket
dört parçadan oluşur:

| Parça                      | Ne                                                                                         | Boyut   |
| -------------------------- | ------------------------------------------------------------------------------------------ | ------- |
| `node\node.exe`            | Node.js 22 çalışma zamanı (nodejs.org'dan, SHA-256 doğrulamalı)                            | ~83 MB  |
| `redist\VC_redist.x64.exe` | Microsoft Visual C++ 2015-2022 çalışma zamanı (workerd bunu ister; yoksa kurulum kurar)    | ~25 MB  |
| `app\node_modules\`        | yalnızca `wrangler` ve bağımlılıkları (miniflare, workerd)                                 | ~160 MB |
| `app\dist\`                | derlenmiş ana worker, istemci ve denetim worker'ı + migrasyonlar                           | ~15 MB  |
| `seowatcher.exe`           | tepsi uygulaması: anahtar üretir, migrasyon çalıştırır, sunucuyu başlatır, tarayıcıyı açar | 25 KB   |

Veri `%LOCALAPPDATA%\seowatcher` altında durur: `data\` (D1, KV, R2, Durable
Object durumu), `instance-secret` (Google token'larını şifreleyen anahtar; bir
kez üretilir, asla değiştirilmez), `mcp-token`, `server.env`, `config.json`
(`port`) ve `logs\`. Kaldırma bu klasöre dokunmaz.

Tepsi menüsü: aç, yeniden başlat, günlükler, veri klasörü, Windows ile başlat,
çıkış. İkinci kez çalıştırılırsa yalnızca tarayıcıyı açar. Sunucu ve alt
süreçleri bir Windows job object içinde çalışır: tepsi uygulaması nasıl
kapanırsa kapansın node ve workerd onunla birlikte kapanır.

## Derleme

Gerekenler: Windows 10/11, pnpm (depo kökündeki sürüm), npm, .NET Framework
4.x `csc.exe` (Windows ile gelir), kurulum dosyası için
[Inno Setup 6](https://jrsoftware.org/isinfo.php) (`winget install JRSoftware.InnoSetup`).

```powershell
# Depo kökünden. Uygulamayı derler, paketi hazırlar, kurulum dosyasını üretir.
./packaging/windows/build.ps1

# Mevcut dist\ ile, Inno Setup olmadan yalnızca klasörü hazırla:
./packaging/windows/build.ps1 -SkipAppBuild -NoInstaller

# Node'u indirmek yerine eldeki bir node.exe'yi göm:
./packaging/windows/build.ps1 -NodeExe C:\path\to\node.exe
```

Çıktı: `packaging/windows/out/stage/` (çalışır klasör; `seowatcher.exe` buradan
da çalıştırılabilir) ve `packaging/windows/out/seowatcher-setup-<sürüm>.exe`.

GitHub Actions (`.github/workflows/release-windows.yml`) her `v*` etiketinde
aynı betiği çalıştırır ve kurulum dosyasını sürüme ekler.

## Simge

`icon/seowatcher.svg` kaynaktır; `icon/seowatcher.ico` ve
`icon/seowatcher-256.png` ondan üretilip depoya konur:

```sh
node packaging/windows/icon/make-icon.mjs <playwright-kurulu-klasör>
```

## Bilinen sınırlar

- Kurulum dosyası imzasız; SmartScreen ilk çalıştırmada "Daha fazla bilgi →
  Yine de çalıştır" ister. Kod imzalama sertifikası alınınca `build.ps1`
  sonuna `signtool` adımı eklenir.
- `wrangler dev` zamanlanmış tetikleyicileri (cron) çalıştırmaz; Docker
  kurulumuyla aynı durum, uygulama bunu ekran açılışında kendisi telafi eder.
- Yalnızca 64-bit Windows 10/11.
