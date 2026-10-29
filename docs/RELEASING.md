# Sürüm numaraları ve yayın adımları

Bu dosya sürüm numarasının nasıl verildiğini ve bir sürümün hangi dosyalarda
değiştiğini anlatır. Kullanıcıya dönük kuralın kısa hali
[CHANGELOG.md](../CHANGELOG.md) başında durur. Yayın adımları (etiket atmak,
sürümü yayımlamak) hesap ve onay gerektirir; bu dosya onları kendiliğinden
çalıştırmaz.

## Numaralandırma kuralı

- **0.x Alpha:** 1.0 gelene kadar her sürüm `0.MINOR.PATCH` biçimindedir ve
  başlıkta Alpha yazar (`## [0.8.0] Alpha — 2026-10-26`).
- **MINOR (0.7.1 → 0.8.0):** Kullanıcının fark ettiği her yeni özellik.
- **PATCH (0.8.0 → 0.8.1):** Yalnızca düzeltme. Yeni özellik taşıyan sürüm
  PATCH olamaz.
- **Az giriş.** CHANGELOG'da yalnızca kullanıcıların fark edeceği dönüm
  noktaları için yeni giriş açılır. Şu an üç giriş var: 0.2.1 (ilk yayın),
  0.4.3 (Windows kurulumu ve site) ve 0.8.5 (0.5.0'dan bu yana her şey).
  Her giriş, grubundaki en yüksek yayımlanmış sürümün numarasını ve tarihini
  taşır; böylece her giriş gerçek bir etikete karşılık gelir.
- **Yama nereye gider.** Küçük düzeltme sürümü yeni giriş açmaz. Düzeltmeyi
  mevcut girişin `### 🛠️ Düzeltmeler` bölümüne ekleyin (altı uygulama dosyası,
  CHANGELOG ve altı sürüm notları sayfası; aynı madde sayısı), giriş
  başlığını yeni numara ve tarihle yeniden adlandırın (örnek: 0.8.0 girişine
  0.8.1 düzeltmesi eklenince başlık `## [0.8.1] Alpha — ...` olur) ve aşağıdaki
  tablodaki sürüm sütununu buna uydurun. Yeni özellik ise ya mevcut girişin
  uygun bölümüne eklenir ya da gerçekten bir dönüm noktasıysa yeni giriş
  açılır.
- **Etiket:** `v` ve sürüm numarası (`v0.8.0`). `.github/workflows/release-windows.yml`
  her `v*` etiketinde çalışır ve etiketin `package.json` sürümüyle aynı olmasını
  ister.
- **Yayınlanmamış değişiklikler** `## [Yayınlanmamış]` başlığında toplanır.
  Uygulama içi sürüm notları ayrıştırıcısı
  (`src/client/features/settings/changelog.ts`) bu başlığı bilerek atlar; yani
  yayın gününe kadar kullanıcıya görünmez. Başlıktaki "— 0.8.1 Alpha olarak
  yayımlanacak" gibi bir ek tarih yerine geçer ve ayrıştırıcıyı bozmaz.

## Eski etiket → Sürüm

0.0.0 ile 0.4.3 arasındaki sürümler ilk yayımlandığında 2.x numarasıyla
etiketlendi; numaralar sonradan 0.x olarak yeniden verildi. Her eski etiket, notları
üç girişten birinde okunur. Tablo bir kez burada ve CHANGELOG başında tutulur;
yeni bir giriş ya da birleştirme olduğunda ikisi birlikte güncellenir.

| Eski etiket | Sürüm                                  |
| ----------- | -------------------------------------- |
| v2.0.0      | 0.2.1 (0.0.0 bu girişte birleştirildi) |
| v2.1.0      | 0.2.1 (0.1.0 bu girişte birleştirildi) |
| v2.2.0      | 0.2.1 (0.2.0 bu girişte birleştirildi) |
| v2.2.1      | 0.2.1                                  |
| v2.3.0      | 0.4.3 (0.3.0 bu girişte birleştirildi) |
| v2.4.3      | 0.4.3                                  |
| v0.5.0      | 0.8.5 (0.5.0 bu girişte birleştirildi) |
| v0.6.0      | 0.8.5 (0.6.0 bu girişte birleştirildi) |
| v0.7.0      | 0.8.5 (0.7.0 bu girişte birleştirildi) |
| v0.7.1      | 0.8.5 (0.7.1 bu girişte birleştirildi) |
| v0.8.0      | 0.8.5 (0.8.0 bu girişte birleştirildi) |
| v0.8.1      | 0.8.5 (0.8.1 bu girişte birleştirildi) |
| v0.8.2      | 0.8.5 (0.8.2 bu girişte birleştirildi) |
| v0.8.3      | 0.8.5 (0.8.3 bu girişte birleştirildi) |
| v0.8.4      | 0.8.5 (0.8.4 bu girişte birleştirildi) |
| v0.8.5      | 0.8.5                                  |

Dikkat edilecekler:

- **Güncelleme.** v2.4.3 veya daha eski bir Windows kurulumu otomatik olarak 0.x
  sürümüne geçmez: eski güncelleyici 0.x numarasını daha küçük sayar. Bu
  kullanıcılar en son kurulum dosyasını bir kez elle çalıştırır; verileri ve
  Google bağlantıları korunur. Bu cümle CHANGELOG'da ve sürüm notları
  sayfasında (altı dil) durur; Alpha serisi bittikten sonra da silinmemelidir.
- **Eski etiketler.** Depoda `v0.0.1` ile `v0.1.9` arasındaki etiketler temel
  alınan açık kaynak projenin (every-app/open-seo) yayınlarıdır, `v1.2.0`
  ile `v1.4.0` ise bu çatalın Alpha'dan önceki numaralandırmasıdır. Hiçbiri
  yukarıdaki tablodaki sürümlerle aynı şey değildir; özellikle yerel `v0.1.0`
  etiketi seowatcher 0.1.0 (GitHub'da `v2.1.0`) değildir.
- **Doğrulama.** Tablonun GitHub'daki karşılığı bu belgede canlı olarak
  doğrulanmadı; etiketleri yayımlayan kişi `gh release list` ile kontrol
  etmelidir.

## Bir sürüm hangi dosyalarda değişir

| Dosya                                                           | Ne yazılır                                                                                                         |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `CHANGELOG.md`                                                  | Türkçe tam not. Yayın iş akışı, etiketin bölümünü GitHub sürüm notu olarak alır.                                   |
| `src/client/features/settings/changelog.{tr,en,de,fr,it,pt}.md` | Uygulama içi notlar. Altı dosyada aynı sürümler ve her bölümde aynı madde sayısı olmalıdır (`changelog.test.ts`).  |
| `docs/kb/surum-notlari.md` ve `docs/kb/{en,de,fr,it,pt}/`       | Sitedeki sürüm notları sayfası. Üstteki "son sürüm" cümlesi, `description` ve `updated` alanları elle güncellenir. |

Yazım kuralları: kısa, gündelik cümleler; teknik ayrıntı, dosya adı ve
API/MCP/D1 gibi terimler yok ("hız ölçümü", "yapay zekâ asistanı", "Google'ın
verisi" denir). Her giriş tek cümlelik bir tanıtımla başlar, ardından
`### 🔎 Site denetimi` gibi başında emoji olan bölümler gelir (bölüm başına
3-7 madde). Emoji her dilde aynıdır. Her madde 1-3 sözcüklük kalın bir
başlıkla başlar (`**Bildirim merkezi:** ...`); testler bunu ister. Kategori
etiketleri (Yenilik, Düzeltme, Güvenlik) bölüm başlığındaki sözcüklerden
çıkar ve başa konan emojiyi yok sayar (`releaseCategories.ts`); başlık
sözcüğünü değiştirirseniz o dosyadaki ifadeyi de güncelleyin. Sitedeki
sürüm notları sayfası kalın başlıkları vurgu renginde gösterir
(`scripts/site-docs-shell.html`, `surum-notlari` kuralları); bağlantı
adresleri başlık metninden üretilir ve emoji bunlara girmez.

## Adımlar

1. Notları `## [Yayınlanmamış]` bölümüne yazın (altı uygulama dosyası ve
   CHANGELOG).
2. Yayın gününde bu başlığı `## [x.y.z] Alpha — YYYY-AA-GG` yapın; küçük bir
   düzeltmeyse mevcut girişi yeniden adlandırın (numaralandırma kuralındaki
   "Yama nereye gider"). Bunu
   `bump-version` çalışmadan önce yapın: betik başlığı bulamazsa üste boş bir
   taslak ekler.
3. `node scripts/bump-version.mjs x.y.z` sürüm numarasını elle yazılan yerlerde
   değiştirir: `package.json`, README rozeti, ana sayfa kaynağı
   (`scripts/site-home.tr.html`: JSON-LD sürümü, iki sürüm satırı, indirme
   bağlantıları, betik önbellek numarası). Betiğin kendisi sürüm notu
   dosyalarını ve `docs/kb/*/surum-notlari.md` dosyalarını güncellemez; onları
   üçüncü bölümdeki gibi elle yapın.
4. `pnpm run site:build` ile siteyi yeniden üretin, `pnpm run ci:check` ve
   `pnpm test` ile doğrulayın.
5. Kaydı oluşturmak (commit), etiketi atmak ve itmek ayrı onay ister. Etiket
   `v*` itildiğinde Windows paketi iş akışı çalışır.

Bu dosya yayının yapıldığını ya da GitHub'daki durumu kanıtlamaz; yayın
sonrası kontroller için [LAUNCH.md](./LAUNCH.md) ve
[SITE_DEPLOY.md](./SITE_DEPLOY.md) kullanılır.
