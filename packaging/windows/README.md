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
(`port`, `autoUpdate`, `lastVersion`), `updates\` (indirilen kurulum
dosyaları) ve `logs\`. Kaldırma bu klasöre dokunmaz (yalnızca `updates\`
silinir).

Tepsi menüsü dört bölümdür: aç ve durum; Güncelle, Yeniden başlat; iki ayar
(Windows açılınca başlat, Güncellemeleri kendiliğinden kur); sorun giderme
(Kurulumu onar, Tanı bilgisini kopyala, Sorunu bildir, Günlükleri aç, Veri
klasörünü aç); sürüm ve Çıkış. Etiketler uygulamanın kendi metinlerinde
(`src/client/features/support`, `UpdateSection.tsx`) birebir geçer; birini
değiştirirseniz orayı da değiştirin.

Davranış özeti:

- Sunucu ve alt süreçleri bir Windows job object içinde çalışır (migrasyon
  dahil): tepsi uygulaması nasıl kapanırsa kapansın node ve workerd onunla
  birlikte kapanır. Durdurma, süreçler gerçekten bitene kadar bekler; `--quit`
  döndüğünde port ve dosyalar boştur.
- Her başlatmanın bir nesil numarası vardır: başlarken Yeniden başlat ya da
  Kurulumu onar ikinci bir sunucu açamaz, eski başlatma hata bildiremez.
- Hazır olduktan sonra kendiliğinden kapanan sunucu 10 dakikada en çok üç kez
  yeniden başlatılır.
- Port doluysa +9'a kadar ilk boş port yalnızca o çalıştırma için seçilir,
  `config.json`'a yazılmaz.
- İkinci başlatma çalışan kopyaya `Local\seowatcher-open` olayıyla haber verir;
  `--silent` ile ikinci başlatma hiçbir şey yapmaz.
- Güncelleyici yalnızca `github.com/ucsahinn/seotracker` adreslerini kendisi
  kurar, yönlendirmeyi yalnızca GitHub sunucularına (HTTPS) kabul eder, dosyayı
  `.part` olarak indirip SHA256SUMS.txt ile doğrulamadan kurulum adını vermez.
  Tüm kullanıcılar kurulumunda kendiliğinden kurmaz (UAC sorardı), yalnızca
  haber verir.
- Günlükler: `server.log` 5 MB, `launcher.log` ve `migrate.log` 1 MB'ta
  `*.old.log` adına döner. wrangler'ın kendi kayıtları `logs\wrangler\`.
- Kurulum sessiz güncellemede "Windows açılınca başlat" ayarına dokunmaz;
  Run değeri `[Code]` içinde yazılır ve kaldırmada (menüden açılmış olsa da)
  silinir.

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
