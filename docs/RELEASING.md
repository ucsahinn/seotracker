# Sürüm numaraları ve yayın adımları

Bu dosya sürüm numarasının nasıl verildiğini ve bir sürümün hangi dosyalarda
değiştiğini anlatır. Kullanıcıya dönük kuralın kısa hali
[CHANGELOG.md](../CHANGELOG.md) başında durur. Yayın adımları (etiket atmak,
sürümü yayımlamak) hesap ve onay gerektirir; bu dosya onları kendiliğinden
çalıştırmaz.

## Numaralandırma kuralı

- **0.x Alpha:** 1.0 gelene kadar her sürüm `0.MINOR.PATCH` biçimindedir ve
  başlıkta Alpha yazar (`## [0.7.1] Alpha — 2026-10-26`).
- **MINOR (0.7.1 → 0.8.0):** Kullanıcının fark ettiği her yeni özellik.
- **PATCH (0.7.0 → 0.7.1):** Yalnızca düzeltme. Yeni özellik taşıyan sürüm
  PATCH olamaz.
- **Yayın başına tek giriş.** Yayımlanan her sürümün CHANGELOG'da tek bölümü
  vardır. Kullanıcının fark etmediği ara yayınlar komşu sürümle birleştirilir;
  birleşen girişte yüksek numara ve onun tarihi kalır.
- **Etiket:** `v` ve sürüm numarası (`v0.7.1`). `.github/workflows/release-windows.yml`
  her `v*` etiketinde çalışır ve etiketin `package.json` sürümüyle aynı olmasını
  ister.
- **Yayınlanmamış değişiklikler** `## [Yayınlanmamış]` başlığında toplanır.
  Uygulama içi sürüm notları ayrıştırıcısı
  (`src/client/features/settings/changelog.ts`) bu başlığı bilerek atlar; yani
  yayın gününe kadar kullanıcıya görünmez. Başlıktaki "— 0.8.0 Alpha olarak
  yayımlanacak" gibi bir ek tarih yerine geçer ve ayrıştırıcıyı bozmaz.

## Eski etiket → Sürüm

0.0.0 ile 0.4.3 arasındaki sürümler ilk yayımlandığında 2.x numarasıyla
etiketlendi; numaralar sonradan 0.x olarak yeniden verildi. Aşağıdaki tablo bir
kez burada ve CHANGELOG başında tutulur; yeni satır eklenmez.

| Eski etiket | Sürüm                                              |
| ----------- | -------------------------------------------------- |
| v2.0.0      | 0.0.0                                              |
| v2.1.0      | 0.1.0                                              |
| v2.2.0      | 0.2.1 (0.2.0 bu sürümle birleştirildi)             |
| v2.2.1      | 0.2.1                                              |
| v2.3.0      | 0.3.0                                              |
| v2.4.3      | 0.4.3 (0.3.0'dan sonraki tüm ara yayınları içerir) |

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

Madde kuralları: sade ve kısa cümleler, her madde kalın bir başlık sözcüğüyle
başlar (`**Denetim:** ...`), kullanıcının ekranda fark ettiği şey yazılır, iç
yapı ve övgü yazılmaz. Sitedeki sürüm notları sayfası bu kalın başlıkları vurgu
renginde gösterir (`scripts/site-docs-shell.html`, `surum-notlari` kuralları).

## Adımlar

1. Notları `## [Yayınlanmamış]` bölümüne yazın (altı uygulama dosyası ve
   CHANGELOG).
2. Yayın gününde bu başlığı `## [x.y.z] Alpha — YYYY-AA-GG` yapın. Bunu
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
