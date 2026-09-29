# Yapılacaklar

Bu sohbette istenen her şeyin tek listesi. Her madde ya **bitti** ya **kısmen**
ya **açık** ya da **karar bekliyor** — "kısmen" yazan bir madde, neyin
yapılmadığını da söyler. Ölçülmemiş hiçbir rakam yok; bitti diyen bir madde
çalışan sistemde doğrulanmış demektir.

Son güncelleme: 2026-09-29, commit `4530d62` (v1.2.0 + veri tazeliği turu).

---

## 1. Denetim (Site Audit)

| #    | İş                                                                                           | Durum              | Not                                                                                                                                                                           |
| ---- | -------------------------------------------------------------------------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.1  | Denetim raporu, denetlenen siteye ait olmalı (başka site denetlerken vaultpilot görünüyordu) | **bitti**          | `src/shared/gscProperty.ts` + `ForeignPropertyNotice`. example.com denetleyip vaultpilot'ın 210 URL'lik site haritasının geldiğini görerek yeniden üretildi, sonra kapatıldı. |
| 1.2  | Denetim tablosunda hızlı butonlar (yeniden çalıştır, kopyala)                                | **bitti**          | `RowActions` + `UrlCell`; denetim geçmişi, raporlar, şablonlar ve kayıtlı kelimelerde kullanılıyor.                                                                           |
| 1.3  | Denetimi olabildiğince iyileştir — "bir siteyi 1 numara yapacak her şey"                     | **bitti (bu tur)** | 67 → 73 → **76 kural**. Son üç: `open-graph-missing-site`, `sitemap-lastmod-missing`, `sitemap-lastmod-future`.                                                               |
| 1.4  | Gün sonunda "raporu indir": profesyonel görselli, Raporlar sekmesine de yazılan rapor        | **bitti**          | `src/server/features/audit/report/buildAuditReportHtml.ts`. Kendi kendine yeten HTML: script yok, CDN yok, font yok.                                                          |
| 1.5  | Terk edilmiş denetimin sonsuza "Sürüyor" kalması                                             | **bitti**          | `auditReconciler`, açılıştan sonraki ilk süpürmede `instance_lost` işaretliyor. Konteyner yeniden başlatılarak doğrulandı.                                                    |
| 1.6  | `og:*` alanları yazılıyor, hiç okunmuyordu                                                   | **bitti**          | Site seviyesinde kural. Sayfa başına olsaydı vaultpilot'ta 212 aynı satır ederdi.                                                                                             |
| 1.7  | `external_link_count` yazılıyor, hiç okunmuyordu                                             | **bitti**          | Sayfalar tablosuna "Bağlantı" sütunu (site içi · dışarı). `internal_link_count` da aynı şekilde görünmüyordu.                                                                 |
| 1.8  | Site haritası `lastmod` ayrıştırılıp atılıyordu                                              | **bitti**          | İki kural: hiç tarih yok / gelecek tarihli. Google alanı "tutarlı doğruysa" kullanıyor.                                                                                       |
| 1.9  | Anchor (bağlantı metni) kalıcılığı                                                           | **açık**           | Şema değişikliği ister: yeni bir kolon ya da tablo. Yapılmadı.                                                                                                                |
| 1.10 | Denetim geçmişi trendi                                                                       | **bitti**          | Yüz sayfa başına kritik/uyarı yoğunluğu — farklı büyüklükteki taramalar karşılaştırılabilsin diye.                                                                            |

## 2. Veri tazeliği ve canlılık

| #    | İş                                                                          | Durum                 | Not                                                                                                                                                    |
| ---- | --------------------------------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 2.1  | Veriler gerçek, anlamlı ve güncel olmalı; belirli günlere sabitlenmiş değil | **bitti (bu tur)**    | Aşağıdaki 2.2–2.8'in tamamı bu maddenin altı.                                                                                                          |
| 2.2  | GSC ~3 günlük gecikme sabiti üç ayrı yerde kopyalanmıştı                    | **bitti**             | Tek yer: `src/shared/dataFreshness.ts`. GA4'ün `-1`'i ve varsayılan 28 gün de orada.                                                                   |
| 2.3  | Fırsatlar ekranında hiç dönem kontrolü yoktu                                | **bitti**             | 7/28/90 seçici; boş durumda da duruyor. Gerçek projede 28→90 değişimi doğrulandı (30 Ağu–26 Eyl → 29 Haz–26 Eyl).                                      |
| 2.4  | Kullanılan tarih aralığı yalnızca boş durumda görünüyordu                   | **bitti**             | Fırsatlar ve Arama Performansı'nda veri varken de yazıyor, gecikmenin sebebiyle birlikte.                                                              |
| 2.5  | Günlük seyir grafiği "Son 28 gün" derken 7 gün çiziyordu                    | **bitti**             | GSC gösterimsiz güne satır döndürmüyor; o günler gerçek sıfır. Pencere artık tam kapsanıyor.                                                           |
| 2.6  | Analytics ve Sıralama dönemi yenilemede kayboluyordu                        | **bitti**             | İkisi de URL'de, Arama Performansı'nın `range`'i gibi.                                                                                                 |
| 2.7  | Sıralama penceresi gecikmeye göre sayılmıyordu ("30 gün" = 27 gün veri)     | **bitti**             | `sinceDate` artık GSC'nin son kesinleşmiş gününden geriye sayıyor.                                                                                     |
| 2.8  | Panel etiketleri ("Son 28 gün") üç ayrı literaldi                           | **bitti**             | Çözülen aralıktan türüyor; artık pencereden ayrı düşemez.                                                                                              |
| 2.9  | Ekranların otomatik yenilenmesi (polling)                                   | **bilerek yapılmadı** | 5 dk staleTime + sekmeye dönünce yenileme var. GSC/GA4 günde bir değişiyor; sık sormak Google kotasını değişmeyen veri için harcar. İstenirse eklenir. |
| 2.10 | Sıralamalarda satır içi sparkline                                           | **açık**              | `GscHistoryRepository` genişletmesi ister **ve** `gsc_query_daily` bu projede boş — yazılsa da çizecek veri yok.                                       |

## 3. Ekranlar, tablolar, dashboard'lar

| #   | İş                                                         | Durum      | Not                                                                                                                                                                                                                                                                |
| --- | ---------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 3.1 | Dinamik, tıklanabilir, filtrelenebilir, aksiyonlu ekranlar | **kısmen** | Tablolarda arama, sıralama, satır işlemleri, tıklanabilir sıra bantları var. Bölüm 6'daki tasarım denetimi bulguları henüz işlenmedi.                                                                                                                              |
| 3.2 | Daha fazla grafik türü (pasta, dilim, zaman çizelgesi)     | **kısmen** | Zaman çizelgeleri eklendi (organik seyir, denetim seyri, günlük seyir); dağılım çubukları eklendi (ülkeler, sıra bantları). **Pasta/halka grafik eklenmedi** — mevcut dağılımların hiçbirinde pastanın çubuktan iyi olduğu bir yer çıkmadı, ama istenirse eklenir. |
| 3.3 | Tüm ekranlarda renkler ve dinamik animasyonlar             | **kısmen** | Renk sistemi tema token'larında oturmuş durumda. Geçiş/animasyon katmanı yalnızca hover ve menülerde; sistematik bir hareket dili yok.                                                                                                                             |
| 3.4 | Laboratuvar ↔ saha karşılaştırması                         | **bitti**  | INP dışarıda: laboratuvar değeri zaten saha değerinin kopyası. vaultpilot'ta CrUX verisi olmadığı için bu projede çizilmiyor — doğru davranış, render testiyle doğrulandı.                                                                                         |
| 3.5 | Fırsatlar'da sıra bandı dağılımı                           | **bitti**  | 4-5 / 6-10 / 11-15 / 16-20, tıklanınca tabloyu süzüyor.                                                                                                                                                                                                            |
| 3.6 | Analytics'e organik seyir + ülke dağılımı + tablo araması  | **bitti**  |                                                                                                                                                                                                                                                                    |
| 3.7 | Telefonda erişilemeyen sayfalama                           | **bitti**  | Ölçüldü: 390px'te sonraki butonu 429 → 204.                                                                                                                                                                                                                        |
| 3.8 | UX butonları ve menüleri                                   | **bitti**  | `RowActions`, `PortalMenu`, `CopyButton`, `UrlCell`.                                                                                                                                                                                                               |

## 4. Kurulum, tanılama, dokümantasyon

| #   | İş                                                   | Durum     | Not                                                                                                                                                       |
| --- | ---------------------------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 4.1 | Tek butonla indirilebilir ZIP tanılama paketi        | **bitti** | `collectDiagnostics` topladığı her alanı açıkça sayıyor; sır okumuyor, e-posta alan adına indirgeniyor. Python `zipfile` ile açılıp sır taraması yapıldı. |
| 4.2 | Tüm ayarlar için "nasıl yapılır" tooltipleri         | **bitti** |                                                                                                                                                           |
| 4.3 | Proje Bilgisi ekranının vaultpilot için doldurulması | **bitti** | Siteyi okuyarak dolduruldu.                                                                                                                               |
| 4.4 | Proje Bilgisi'ne "ajana prompt kopyala" butonu       | **bitti** |                                                                                                                                                           |
| 4.5 | Kendi PC'de kurulum                                  | **bitti** | Docker konteyneri, `localhost:3001`.                                                                                                                      |
| 4.6 | Sürüm notlarının kısa ve sade olması                 | **bitti** |                                                                                                                                                           |

## 5. Sürüm ve temizlik

| #   | İş                                           | Durum              | Not                                                                                                                                                    |
| --- | -------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 5.1 | Tek bir gerçek sürüm bırak, diğerlerini uçur | **bitti**          | Uzakta tek etiket ve tek release: **v1.2.0**.                                                                                                          |
| 5.2 | Sürüm çıkarmadan önce sor                    | **kalıcı kural**   | Hafızaya yazıldı. Commit/push serbest, yayın ayrı karar.                                                                                               |
| 5.3 | Mimari düzen ve temizlik                     | **kısmen**         | Bu tur: gecikme sabitleri tek yerde, `SlimPage` genişletildi, kural tablosu konuya göre bölünmüş durumda. Ölü kod `knip` ile sürekli kontrol ediliyor. |
| 5.4 | Bir sonraki sürüme geç                       | **karar bekliyor** | `4530d62` v1.2.0 üzerine yayımlanmamış duruyor. Yeni sürüm (v1.3.0) için onay gerekiyor.                                                               |

## 6. Tasarım denetimi

İki ajan tüm ekranlara sistematik tasarım/erişilebilirlik denetimi çekti.
Ajanlar hiçbir şey çalıştıramadı, bu yüzden her iddia tarayıcıda yeniden
ölçüldü — bazıları doğrulandı, bazıları yanlış çıktı.

### Ölçülüp düzeltilenler

| #    | Bulgu                                                       | Ölçüm                                                                                                                                                                                                                |
| ---- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 6.1  | Denetim silme hiç onay sormuyordu                           | Uygulamadaki tek onaysız yıkıcı işlemdi; raporlar, şablonlar, proje bağlamı hepsi soruyor. `ConfirmDeleteModal` eklendi.                                                                                             |
| 6.2  | Kayıtlı Kelimeler sayfalaması `flex-wrap`'i kaybetmişti     | Paylaşılan `TablePagination`'ın forku; daha önce düzeltilen "basılamayan sonraki sayfa" hatasını kopyada yeniden üretiyordu.                                                                                         |
| 6.3  | Dolgu renkleri metin olarak kullanılıyordu                  | Açık temada ölçüldü: `text-warning` **2,69:1**, `text-success` **3,93:1** — ikisi de 4,5:1 eşiğinin altında. Ink token'ları **8,3–8,5:1**. Lighthouse skor haneleri, saha metrikleri, sıralama deltası değiştirildi. |
| 6.4  | Rozet metni kendi %15 yıkaması üzerinde                     | **3,27:1** ölçüldü (ink ile 7,07:1).                                                                                                                                                                                 |
| 6.5  | Uyarı ikonu grafik eşiğinin altında                         | **2,69:1**, SC 1.4.11 eşiği 3:1.                                                                                                                                                                                     |
| 6.6  | Genişletme oku 18×18                                        | 390px'te tarayıcıda ölçüldü; SC 2.5.8 eşiği 24px.                                                                                                                                                                    |
| 6.7  | Kısa sütun başlığı 22px genişlikte                          | `SortableHeader`'a `min-w-6` — merkezi düzeltme, tüm tablolar.                                                                                                                                                       |
| 6.8  | Sıralama Takibi tablosu hiç sıralanamıyordu                 | Sıralamayı konu alan ekranda sıralama yoktu. Beş sütun + Türkçe harf sıralaması + metin araması eklendi.                                                                                                             |
| 6.9  | Analytics'in yedi tablosu sıralanamıyordu, 50 satır sabitti | Sıralama + 50/100/200 satır seçici.                                                                                                                                                                                  |
| 6.10 | Altı Min/Max girdisi adsızdı                                | Ekran okuyucu "Min, Max, Min, Max…" duyuyordu.                                                                                                                                                                       |
| 6.11 | Ölçüm anahtarları durumu yalnızca ikonla veriyordu          | `aria-hidden` + `sr-only` "açık/kapalı".                                                                                                                                                                             |
| 6.12 | Tam ekran rapor tarih damgasını düşürüyordu                 | Paylaşılabilir bağlantıda bir aylık rapor güncel görünüyordu.                                                                                                                                                        |
| 6.13 | Çakışmalar hatası çıkışsızdı                                | `QueryErrorState` + yeniden dene.                                                                                                                                                                                    |
| 6.14 | Bant seçilince "Gösterilen" kutucuğu yalan söylüyordu       | 9 satır görünürken "50" yazıyordu.                                                                                                                                                                                   |
| 6.15 | Lighthouse ayrıntısı her ekran boyutunda 136px içeriden     | 390px'te `<pre>` blokları ~174px'e sıkışıyordu.                                                                                                                                                                      |
| 6.16 | Kelime sayısı `format.ts`'i atlıyordu                       | 3400 yazıyordu, 3.400 değil.                                                                                                                                                                                         |
| 6.17 | Filtre girdisi panel çizgisini takıyordu, token'ı değil     | + adsız girdi, 12px kapatma hedefi, dekoratif gradyan.                                                                                                                                                               |

### Doğrulandı, düzeltilmedi (bilerek)

- **Karanlık temada dolgu renkleri sorunsuz** (6,1–9,3:1). Ajanın hata tahmini yalnızca açık tema için geçerliydi; ölçüm bunu gösterdi.
- **Analytics sekme şeridi 390px'te 120px** yüksekliğinde. Sarma, yatay kaydırmadan iyi: kaydırma sekmeleri gizler.
- **Analytics tablosunda taşan başlıklar** tablonun kendi `overflow-x-auto` kabı içinde; sayfa seviyesinde kaydırma yok (ölçüldü).

### Mimari

Aynı sıralama mantığı üç ekranda birden gerekti (Sıralama, Analytics,
Lighthouse). Üçüncü kopyayı yazmak yerine
`src/client/components/table/useLocalSort.ts`'e alındı: tek bir durum tutuyor
ve `SortableHeader`'ın gerçekten çağırdığı iki metodu veriyor, yani o tablolar
`aria-sort` sözleşmesini ve 24px hedefini paylaşılan başlıktan almaya devam
ediyor. İkinci bir tablo motoru değil — bu tabloların her birinde
`AppDataTable`'ın zorlanacağı bir hücre var (ilk sütunda açma butonu, rapora
göre değişen sütun kümesi, genişletilebilir ayrıntı satırı).

### Tasarım denetiminin kalan bulguları — hepsi kapandı

| #    | Bulgu                                                      | Sonuç                                                                                                                                                                                                                                                           |
| ---- | ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 6.18 | Denetim geçmişi sıralanamıyor                              | **Bitti** — Tarih/URL/Durum/Sayfa. Doğrulandı: "Sayfa" tıklanınca 212·212·212·212·200·120. Raporlar ve Şablonlar tabloları **bilerek bırakıldı**: ikisi de üst sınırla kesiliyor ve kesildiklerini yazıyor, satır sayısı sıralamayı hak edecek kadar büyümüyor. |
| 6.19 | Lighthouse sorun tablosu sıralanamıyor                     | **Bitti** — Önem/Sorun/Etki/Puan. "Etki" tek sütunda iki birim taşıyor (ms ve bayt); zaman önce geliyor çünkü engelleyen istek her ziyaretçiye bekleme, büyük görsel bant genişliği maliyeti. Altı test.                                                        |
| 6.20 | Sorgular/Sayfalar satırlarında kaydet/kopyala yok          | **Bitti** — `RowActions`: kopyala iki sekmede de, "kelime olarak kaydet" yalnızca Sorgular'da (sayfa kelime değil), "yeni sekmede aç" yalnızca adres olduğunda. İki test.                                                                                       |
| 6.21 | Analytics'te URL hücreleri tıklanamaz, dışa aktarma yok    | **Bitti** — GA4 yolu ve alan adını ayrı boyut veriyor, ikisi birleştirilip `UrlCell` oluyor. Doğrulandı: gerçek `https://vaultpilot.io/tr/...` bağlantıları geliyor. CSV + Sheets eklendi.                                                                      |
| 6.22 | `TableExportMenu` `PortalMenu` kullanmıyor                 | **Bitti** — iki dışa aktarma menüsü de taşındı: `aria-expanded`, Escape, dışarı tık, kırpılmayan konum.                                                                                                                                                         |
| 6.23 | İskelet yerine dönen çark                                  | **Bitti** — beşi de: Sıralama tablosu, sorgu geçmişi kartı, Lighthouse sorun listesi, Arama Performansı sekme gövdesi, arşiv senkron satırı.                                                                                                                    |
| 6.24 | Boş durumlar `EmptyState` kullanmıyor                      | **Bitti** — dördü de. Metinler korundu; üç ayrı boşluk sebebi (arama eşleşmedi / filtre eşleşmedi / dönemde veri yok) ayrı ayrı söyleniyor.                                                                                                                     |
| 6.25 | Ülke kodları ham (TUR, GBR)                                | **Bitti** — `formatCountry`, alpha-3→alpha-2 daraltmasıyla. Kod, Search Console dışa aktarımıyla eşleştirmek için `title`'da kalıyor. Dört test.                                                                                                                |
| 6.26 | Rapor görüntüleyici dördüncü bir sayfa dolgusu icat ediyor | **Bitti** — `PageShell`'e `fill` genişliği; `md:px-6 md:py-6` iki yerde elle yazılıydı ve birbirinden ayrı düşebilirdi.                                                                                                                                         |
| 6.27 | Sıralama tablosu kapsadığı dönemi yazmıyor                 | **Bitti** — sunucu çözülen aralığı döndürüyor. Doğrulandı: 90 gün "29 Haz – 26 Eyl" veriyor, yani gecikme düzeltmesi de yerinde.                                                                                                                                |
| 6.28 | Denetim ilerlemesi geçen süre/tahmin vermiyor              | **Bitti** — "%42 · ~3 dk kaldı". Tahmin %5 altında gösterilmiyor: orada oran bir iki sayfalık gürültü.                                                                                                                                                          |

## 7. Senin kararını bekleyenler

Bunlar davranış değiştirir, o yüzden yapılmadı.

| #   | Konu                                                           | Neden karar gerekiyor                                                                                         |
| --- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| 7.1 | `MCP_TOKEN` varsayılanda boş                                   | Aynı makinedeki başka bir süreç 33 MCP aracını sürebiliyor. Otomatik üretmek ajan kurulum akışını değiştirir. |
| 7.2 | `local_noauth` + public `ALLOWED_HOST` açılışta uyarı vermiyor | Uyarı eklemek, bu kombinasyonla çalışan mevcut kurulumlarda açılışta yeni bir mesaj çıkarır.                  |
| 7.3 | Pasta/halka grafik                                             | İstenirse eklenir; şu an dağılımlar çubukla gösteriliyor (bkz. 3.2).                                          |
| 7.4 | Otomatik yenileme (polling)                                    | Google kotası maliyeti var (bkz. 2.9).                                                                        |

---

## Ölçülen değerler (`4530d62`)

- **76** denetim kuralı
- **33** MCP aracı
- **750** test / 105 dosya — hepsi yeşil
- badseo harness **60/60**, kural kapsamı **48/48** (28 tür harness'ın erişimi dışında)
- `pnpm run ci:check` çıkış kodu **0**
- gitleaks: sır yok
- 11 rota 200/307, konsol uyarısı **sıfır**

## Gerçek veri durumu (vaultpilot.io)

Mock veri hiç kullanılmadı. Tek proje: `df26abab-fa39-4133-96cc-a5627d8b80ad`.

- Search Console artık az da olsa veri döndürüyor: 28 günde 1 tıklama,
  5 gösterim, ort. sıra 2,2 (TUR + GBR).
- GA4 çalışıyor: 7 günde 15 oturum, 5 giriş sayfası.
- CrUX saha verisi **yok** — trafik Google'ın eşiğinin altında.
- `gsc_query_daily` **boş** — bu yüzden sparkline'ın (2.10) gösterecek verisi yok.
- Taranan 1439 sayfanın 1426'sında `og:title` var — yeni og kuralı bu projede
  doğru şekilde ateşlemiyor.
