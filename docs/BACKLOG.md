# Yapılacaklar

Bu sohbette istenen her şeyin tek listesi. Her madde ya **bitti** ya **kısmen**
ya **açık** ya da **karar bekliyor** — "kısmen" yazan bir madde, neyin
yapılmadığını da söyler. Ölçülmemiş hiçbir rakam yok; bitti diyen bir madde
çalışan sistemde doğrulanmış demektir.

Son güncelleme: 2026-09-29, commit `4530d62` (veri tazeliği turu).

---

## 1. Denetim (Site Audit)

| #    | İş                                                                                           | Durum              | Not                                                                                                                                                                           |
| ---- | -------------------------------------------------------------------------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.1  | Denetim raporu, denetlenen siteye ait olmalı (başka site denetlerken vaultpilot görünüyordu) | **bitti**          | `src/shared/gscProperty.ts` + `ForeignPropertyNotice`. example.com denetleyip vaultpilot'ın 210 URL'lik site haritasının geldiğini görerek yeniden üretildi, sonra kapatıldı. |
| 1.2  | Denetim tablosunda hızlı butonlar (yeniden çalıştır, kopyala)                                | **bitti**          | `RowActions` + `UrlCell`; denetim geçmişi, raporlar, şablonlar ve kayıtlı kelimelerde kullanılıyor.                                                                           |
| 1.3  | Denetimi olabildiğince iyileştir — "bir siteyi 1 numara yapacak her şey"                     | **bitti (bu tur)** | 67 → 73 → 76 → şimdi **95 kural** (o tur sonundaki sayı 76 idi). Son üç: `open-graph-missing-site`, `sitemap-lastmod-missing`, `sitemap-lastmod-future`.                      |
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
| 5.1 | Tek bir gerçek sürüm bırak, diğerlerini uçur | **bitti**          | Uzakta tek etiket ve tek release var; güncel sürüm `CHANGELOG.md` dosyasında.                                                                          |
| 5.2 | Sürüm çıkarmadan önce sor                    | **kalıcı kural**   | Hafızaya yazıldı. Commit/push serbest, yayın ayrı karar.                                                                                               |
| 5.3 | Mimari düzen ve temizlik                     | **kısmen**         | Bu tur: gecikme sabitleri tek yerde, `SlimPage` genişletildi, kural tablosu konuya göre bölünmüş durumda. Ölü kod `knip` ile sürekli kontrol ediliyor. |
| 5.4 | Bir sonraki sürüme geç                       | **karar bekliyor** | `4530d62` yayımlanmış sürümün üzerinde yayımlanmamış duruyor. Yeni sürüm için onay gerekiyor.                                                          |

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

### Tasarım denetiminin bulguları — hepsi kapandı

İlk turda yalnızca bir alt kümesini bu listeye geçirmiştim; ajanların
raporunda deftere hiç yazılmamış bulgular vardı. Tamamı aşağıda.

| Bulgu                                                               | Sonuç                                                                                                                         |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Denetim silme onay sormuyordu                                       | **Bitti** — uygulamadaki tek onaysız yıkıcı işlemdi.                                                                          |
| Dolgu renkleri metin olarak kullanılıyordu                          | **Bitti** — açık temada `text-warning` 2,69:1 ölçüldü (eşik 4,5:1); ink token'ları 8,3–8,5:1.                                 |
| Kayıtlı Kelimeler sayfalaması telefonda kırpılıyordu                | **Bitti** — paylaşılan bileşenin forkuydu, `flex-wrap`'i kopyada kaybetmişti.                                                 |
| Sıralama, Analytics, Lighthouse, denetim geçmişi sıralanamıyordu    | **Bitti** — dördü de. Sıralama'ya arama kutusu da geldi.                                                                      |
| Analytics 50 satıra sabitti, dışa aktarma yoktu                     | **Bitti** — 50/100/200 seçici, CSV + Sheets.                                                                                  |
| Analytics'te adresler ölü metindi                                   | **Bitti** — GA4 yolu ve alan adını ayrı boyut veriyor; birleştirilip bağlantı oluyor.                                         |
| Sorgular satırlarında kaydet/kopyala yoktu                          | **Bitti** — Kayıtlı Kelimeler buraya gönderebiliyordu, buradan geri gönderilemiyordu.                                         |
| Fırsatlar ve Sıralama'da hiç satır işlemi yoktu                     | **Bitti** — kopyala, yeni sekmede aç, arama performansına git.                                                                |
| Dışa aktarma menülerinde `aria-expanded`/Escape yoktu, kırpılıyordu | **Bitti** — ikisi de `PortalMenu`'ye taşındı.                                                                                 |
| Denetim ilerlemesi süre vermiyordu                                  | **Bitti** — "%42 · ~3 dk kaldı".                                                                                              |
| Ülke kodları ham geliyordu                                          | **Bitti** — TUR → Türkiye.                                                                                                    |
| Sıralama tablosu dönemini yazmıyordu                                | **Bitti** — uygulamada rakam gösterip dönemini söylemeyen tek ekrandı.                                                        |
| Dokunma hedefleri 24px altındaydı                                   | **Bitti** — 18×18 genişletme oku, 22×25 sütun başlığı, 12px etiket kapatma.                                                   |
| Altı Min/Max girdisi adsızdı                                        | **Bitti** — ekran okuyucu "Min, Max, Min, Max…" duyuyordu.                                                                    |
| Ölçüm anahtarları durumu yalnızca ikonla veriyordu                  | **Bitti** — `sr-only` "açık/kapalı".                                                                                          |
| Tam ekran rapor tarih damgasını düşürüyordu                         | **Bitti** — paylaşılabilir bağlantıda bir aylık rapor güncel görünüyordu.                                                     |
| Çakışmalar hatası çıkışsızdı                                        | **Bitti** — yeniden dene.                                                                                                     |
| Bant seçilince "Gösterilen" kutucuğu yalan söylüyordu               | **Bitti** — 9 satır görünürken 50 yazıyordu.                                                                                  |
| Lighthouse ayrıntısı 390px'te 174px'e sıkışıyordu                   | **Bitti**.                                                                                                                    |
| Kelime ve bulgu sayıları `format.ts`'i atlıyordu                    | **Bitti**.                                                                                                                    |
| Denetim ayrıntısı kendi başlığını elle yazıyordu                    | **Bitti** — `PageHeader` + `eyebrow`.                                                                                         |
| Dört ekran geri bağlantısını elle yazıyordu                         | **Bitti** — `BackLink`; üç ayrı boşluk vardı.                                                                                 |
| Form hatası alana bağlı değildi                                     | **Bitti** — `aria-invalid`, `aria-describedby`, `role="alert"`.                                                               |
| Hız ölçümü açıklaması klavyeyle ulaşılamıyordu                      | **Bitti** — `title` yerine `HelpTip`.                                                                                         |
| Puan dökümü yalnızca fareyle görülüyordu                            | **Bitti** — `aria-hidden` bir öğedeki `title` ne klavyeye ne ekran okuyucuya ulaşıyordu.                                      |
| Search Console'da aç bağlantısının adı yoktu                        | **Bitti** — `title` tek başına yeterli değil.                                                                                 |
| Dağılım sütununun başlığı boştu                                     | **Bitti** — `sr-only` ad.                                                                                                     |
| Rozetler aynı iş için dört farklı görünümdeydi                      | **Bitti** — tek `severityChip`.                                                                                               |
| Rapor ve şablon listeleri kesikli kutu kullanıyordu                 | **Bitti** — `EmptyState`.                                                                                                     |
| İki iskelet yanlış şekildeydi                                       | **Bitti** — Arama Performansı dört kutu çizip tek kutuya dönüşüyordu; Kayıtlı Kelimeler 6 sütunluk tabloya 9 sütun çiziyordu. |
| Analytics'te farklı bir yokluk işareti vardı                        | **Bitti** — "—" yerine "-".                                                                                                   |
| Organik seyir deltası neye göre olduğunu söylemiyordu               | **Bitti** — önceki dönem adıyla yazılıyor.                                                                                    |
| Çakışmalar satırı 390px'te sorguya 65px bırakıyordu                 | **Bitti** — bölünme payı dar ekranda gizli.                                                                                   |
| Sorgu geçmişi telefonda ekran altında açılıyordu                    | **Bitti** — kaydırma ve odak.                                                                                                 |
| `ai.tsx` tüm sayfayı tek `div`'e sarıp boşlukları elle yönetiyordu  | **Bitti**.                                                                                                                    |
| Panel rozetleri kontrol yarıçapı kullanıyordu                       | **Bitti**.                                                                                                                    |

### Bilerek yapılmayanlar

| Konu                                          | Neden                                                                                                         |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Raporlar ve Şablonlar tabloları sıralanamıyor | İkisi de üst sınırla kesiliyor ve kesildiklerini yazıyor; satır sayısı sıralamayı hak edecek kadar büyümüyor. |
| Analytics sekme şeridi 390px'te 120px         | Sarma, yatay kaydırmadan iyi: kaydırma sekmeleri gizler.                                                      |
| `ai.tsx`'te iki düğmenin 44px yüksekliği      | 44px makul bir dokunma hedefi; ortada bir kusur yok, yalnızca daisyUI ölçeğinin dışında.                      |
| Karanlık temada dolgu renkleri                | Ölçüldü: 6,1–9,3:1, zaten geçiyor. Ajanın hata tahmini yalnızca açık tema içindi.                             |

### Son turda eklenenler (v1.4.0 ve v1.5.0)

| Bulgu                                                         | Sonuç                                                                                                                                                                                                                             |
| ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Panel "site nasıl" diyor, "ne yapayım" demiyordu              | **Bitti** — "Sıradaki adımlar": en fazla üç iş, yeni istek yok.                                                                                                                                                                   |
| Sık sorulan beş soru filtre panelinin içindeydi               | **Bitti** — dizine kapalı, yavaş, alt metni eksik, site haritasında yok, hatalı. Sayaçlar tüm taramadan.                                                                                                                          |
| Google'ın makine okunur dizin cevapları hiç gösterilmiyordu   | **Bitti** — "Neden" sütunu; sizin canonical'ınız ile Google'ınki yan yana.                                                                                                                                                        |
| Alt metni eksik bulgusu hangi görseller olduğunu söylemiyordu | **Bitti** — üç örnek adres.                                                                                                                                                                                                       |
| Ülke tablosu gösterim ve tıklama oranını atıyordu             | **Bitti**.                                                                                                                                                                                                                        |
| Organik gelir ve sipariş çekilip atılıyordu                   | **Bitti** — yalnızca satış yapan mülkte çıkıyor.                                                                                                                                                                                  |
| Günlük seyirde ortalama sıra ve tıklama oranı yoktu           | **Bitti** — dört ölçü, sıra ekseni ters.                                                                                                                                                                                          |
| Site geneli CrUX verisi ayrıştırılmıyordu                     | **Bitti** — sayfanın kendi verisi yoksa sitenin ortalaması, etiketiyle.                                                                                                                                                           |
| Fırsatlar yalnızca 4–20. sırayı gösteriyordu                  | **Bitti** — Tıklanmıyor / Yaklaşmış / Derinde.                                                                                                                                                                                    |
| Dizin durumu kayıtlarının 29'undan 23'ü sessizce boştu        | **Bitti** — Türkçe saklanan cümleler eşlendi.                                                                                                                                                                                     |
| Sürüm notu karmaşıktı, geçmiş sürümler duruyordu              | **Bitti** — tek sürüm, sade dil, uygulama ve GitHub aynı metin.                                                                                                                                                                   |
| Ölü/çift kod                                                  | **Bitti** — sayfalama forku, üçüncü dışa aktarma menüsü silindi.                                                                                                                                                                  |
| Renk ve canlılık                                              | **Bitti** — kutucuklar sırayla beliriyor, acil adımda halka iki kez nefes alıp duruyor. Sonsuz döngü değil: kritik bulgu çıktığı anda tüm paneli titretir ve okuyucuya onu görmemeyi öğretir. `prefers-reduced-motion`'a saygılı. |

### Hâlâ yapılmayanlar (bilerek)

| Konu                                                | Neden                                                                                                                        |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `searchAppearance` boyutu (zengin sonuç türleri)    | **Sonradan eklendi (v1.8.0)** — Arama performansında kart olarak; veri gelmezse gizli.                                       |
| GA4 kota ve `countingMethod`                        | Küçük ve doğru, ama bir kullanıcı sorusuna cevap değil; ölçüm durumu sekmesine ait, ayrı bir tur.                            |
| Sıralama sparkline'ı                                | `gsc_query_daily` bu projede boş — yazsak da çizecek veri yok.                                                               |
| Sitede gerçekten değişen şey: yeni bir API bağlamak | Bağlı üç kaynak (Search Console, Analytics, PageSpeed) henüz tam kullanılmıyor; dördüncüyü eklemek yerine önce bunlar bitti. |

## 7. Senin kararını bekleyenler

Bunlar davranış değiştirir, o yüzden yapılmadı.

| #   | Konu                                                           | Neden karar gerekiyor                                                                        |
| --- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| 7.1 | `MCP_TOKEN`                                                    | **bitti**                                                                                    | Konteyner ilk açılışta bir token üretir (`/app/.wrangler/mcp-token`); `MCP_TOKEN=off` ile kapatılır. Artık karar beklemiyor. |
| 7.2 | `local_noauth` + public `ALLOWED_HOST` açılışta uyarı vermiyor | Uyarı eklemek, bu kombinasyonla çalışan mevcut kurulumlarda açılışta yeni bir mesaj çıkarır. |
| 7.3 | Pasta/halka grafik                                             | İstenirse eklenir; şu an dağılımlar çubukla gösteriliyor (bkz. 3.2).                         |
| 7.4 | Otomatik yenileme (polling)                                    | Google kotası maliyeti var (bkz. 2.9).                                                       |

---

## Ölçülen değerler (`4530d62`, 2026-09-29 — tarihsel)

Aşağıdaki kural, test ve harness sayıları o günün ölçümüdür; güncel değildir (güncel durum için kod ve `pnpm test` çıktısına bakın).

- 76 denetim kuralı (tarihsel)
- 750 test / 105 dosya — o gün hepsi yeşildi (tarihsel)
- badseo harness 60/60, kural kapsamı 48/48 (tarihsel)
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

### v1.5.0'te yapılanlar ve açık kalanlar

| Konu                                                                     | Durum                                                                                                                   |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| Site puanı (0–100), yalnızca sorun kalmayınca 100                        | **Bitti**                                                                                                               |
| Üç yeni denetim kuralı: https değil, asıl adres eksik, dil bilgisi eksik | **Bitti** — birim testli; https kuralı `http://example.com` taramasıyla uçtan uca doğrulandı (not-https bulgusu çıktı). |
| Her ekrana kendi özet grafiği, tek ortak halka bileşeni                  | **Bitti**                                                                                                               |
| Fırsatlar satır penceresi ("Ne yapmalı?")                                | **Bitti**                                                                                                               |
| Cihaz halkası (Arama performansı)                                        | **Bitti** — halka tıklayınca ekranı cihaza göre süzüyor.                                                                |
| Takip edilen sorgularda yükselen/düşen                                   | **Bitti** — Değişim sütunu, "Yükselenler ve düşenler" kartı ve filtre düğmeleri.                                        |
| Önem çubuğundan denetimi süzme                                           | **Bitti** — rotada `severity` parametresi var; çubuk Sorunlar sekmesini o önemle açar.                                  |

### v1.7.0'da yapılanlar ve açık kalanlar

| Konu                                           | Durum                                                                                                                                                                                                                                                                                                                 |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hız ölçümü tüm sayfalarda                      | **Bitti ve denendi** — 30 sayfa, 60/60 ölçüm, yaklaşık 3,5 dakika. İş akışı adımları 5'li dalga başına (10.000 sayfada yaklaşık 2.056 adım; Cloudflare varsayılan sınırı 10.000). Anahtarsız 50 sayfa sınırı. Yerelde miniflare'in sınırı uygulayıp uygulamadığı ve büyük denetimlerde alt istek sınırı doğrulanmadı. |
| Sorunlar sekmesinde etkilenen adresler         | **Bitti** — vaultpilot'ta doğrulandı.                                                                                                                                                                                                                                                                                 |
| İndirilen rapor                                | **Bitti** — gerçek denetimden üretildi (11 grafik, betik ve dış istek yok). Ekran görüntüsüyle bakılamadı (sayfa görüntü almayı zaman aşımına uğratıyor).                                                                                                                                                             |
| Denetim kuralları 95'e çıktı                   | **Bitti** — harness'te yeni kurallar sahte siteyle kapsandı. `not-https` gerçek bir http sitesiyle uçtan uca doğrulandı.                                                                                                                                                                                              |
| Arama görünümü dökümü ve arama türü seçimi     | **Bitti** — arama türü vaultpilot'ta denendi (görselde veri yok); arama görünümü kartı veri gelmeyince gizli, vaultpilot'ta görülemedi. Discover ve Haber (Google News) sorgu boyutu olmadığı için yok.                                                                                                               |
| CrUX geçmişi                                   | **Kod bitti; kök neden bulundu** — Google'ın yanıtına göre vaultpilot'taki PageSpeed anahtarının API kısıtlaması Chrome UX Report API'yi dışarıda bırakıyor. Anahtarın kısıtlamasına "Chrome UX Report API" eklenince kart çalışmalı; gerçek grafik henüz görülmedi.                                                  |
| Kayıtlı kelimeler, Sıralama takibi widget'ları | Açık — vaultpilot'ta sorgu verisi yok, yalnızca birim testi var.                                                                                                                                                                                                                                                      |

### Fikirler (kararsız)

- Aynı projede bir denetim hız ölçümü aşamasındayken ikinci bir denetim başlatılırsa uyarı vermek: ikisi PageSpeed kotasını paylaşıp birbirini yaklaşık yarı hıza düşürüyor (212 sayfa tek başına 24 dakika, iki denetim yan yana 48 dakika sürdü).
- Rapor ve bağlantı yazarını MCP `clientInfo.name` yerine HTTP `User-Agent` başlığından türetmek: istemci adı ajanın kendi bildirimi, başlık sunucunun gördüğü değer. Düşük öncelik.

### 2026-11-11 hata denetimi turu (commit `7b95a90f`)

Tüm kod tabanı okundu: sunucu, Google servisleri ve MCP araçları, tarama
motoru, denetim kuralları, arayüz, CI. Doğrulama: `pnpm run ci:check` temiz,
`pnpm test` 2420 test, sahte site düzeneği (badseo) geçti. Kurulu uygulamada
ya da tarayıcıda denenmedi.

Yapılanlar:

- **Güvenlik:** girişsiz kurulumda tanınmayan Host başlığı 421 alır (DNS
  yeniden bağlama). `X-Forwarded-*` yalnız `ALLOWED_HOST` tanımlıyken okunur.
- **Tarama motoru:** `www` yönlendirmesinde robots.txt kuralları, 429 sonrası
  hızın toparlanması, başarısız site haritası parçası, tuzak site sınırı,
  `.xml.gz` site haritaları.
- **Denetim kuralları ve rapor:** `X-Robots-Tag` bot kapsamı, hreflang,
  canonical, sayfalama, alt metni örnekleri, rapor sayıları.
- **Google:** sıralama arşivi 25.000 satırlık sayfalarla okur (eskiden 1.000);
  eşzamanlı aynı sorgu bir kez gider; mülk dışı URL denetim kotası harcamaz;
  çakışma eşikleri pencereye ölçeklenir.
- **MCP araçları:** `get_search_console_performance` süzgeçli taramada 10
  sayfada durur; `get_cannibalization` sayfalanır; `get_ranking_history`
  arşiv kapsamını söyler; `save_keywords` yalnız niyet kabul eder,
  `list_saved_keywords` kaynağı olmayan hacim/zorluk/TBM sütunlarını basmaz.
- **Arayüz:** boş değerler azalan sıralamada da sonda; "Görsel" sütunu
  sıralanır; dizin sekmesinde "Henüz kontrol edilmedi" doğru sayıyı gösterir;
  dizin dışa aktarımı halka süzgecini izler; CLS dışa aktarımda üç ondalık;
  rapor araması taslak tutar; eski rapor başlıklarında UUID görünmez; pano
  "Yapıldı" işaretlerini ve süren/başarısız denetimi görür; başarısız
  yenilemede pano kartları kaybolmaz; "Çakışmalar" sekmesi sabit tarih
  penceresini izler; ayrıntı panelinde odak sıçramaz.
- **GA4:** tam raporlar 10.000 satırlık sayfalarla okunur (eskiden 1.000).
- **Drizzle:** `drizzle/meta/0075_snapshot.json` güncel şemadan üretildi;
  geçici kopyada ikinci `drizzle-kit generate` "değişiklik yok" dedi. Depo
  dışı iki tablo (`gsc_archive_coverage`, `gsc_query_daily_stage`) şema
  dosyasında olmadığı için anlık görüntüde de yok.
- **Host denetimi çalışan sunucuda denendi:** derlenmiş uygulama `wrangler dev`
  altında yabancı alan adına her yolda 421 verdi; `localhost`, `*.localhost`
  ve IP adresi geçti; sahte `X-Forwarded-Host` işe yaramadı.
- **Güvenlik denetimi (bağımsız okuma) ve sertleştirme:** kritik ya da yüksek
  bulgu yok. Host başlığı yokken istek satırındaki ada bakılır; `x@127.0.0.1`
  gibi değerler reddedilir; `localhost.` localhost sayılır; `X-Forwarded-Host`
  yalnız `ALLOWED_HOST` ya da `BETTER_AUTH_URL` adına eşitse dikkate alınır.
  Ölçüldü: `MCP_TOKEN=off` iken yabancı `Origin` ile `/mcp` 403 alır. Bilinen
  ve kabul edilen: `/assets/*` (herkese açık istemci paketi) Host denetiminden
  önce sunulur.
- **Pano "Yenile":** Google'a yeniden sorar (arama ekranındaki düğme gibi).
- **Sayfalar tablosu:** site haritası sonuna kadar okunamadıysa "Harita"
  sütunu "Yok" yerine "-" yazar; içeriği okunmamış sayfa "Görsel"
  sıralamasında sonda kalır.
- **Tarayıcıda denendi** (geliştirme sunucusu, demo proje): pano, denetim
  sayfaları, dizin sekmesi, raporlar, arama performansı. Dizin sekmesinde
  halka grubuna tıklayınca çöken bir döngü bulundu ve düzeltildi.
- **Derlenmiş uygulamada tarayıcı denemesi** (`wrangler dev`, demo proje):
  denetim sayfaları, dizin sekmesi ve rapor araması geçti. İki hata buldu ve
  ikisi de düzeltildi: 12 harften uzun rapor araması ve 48 bayttan uzun kayıtlı
  kelime terimi D1'in 50 baytlık LIKE/GLOB sınırına takılıp listeyi hataya
  düşürüyordu. Pano ve arama performansı bu kurulumda denenemedi: demo veri
  modülü tarihlerini modül yüklenirken hesaplıyor ve Workers çalışma zamanında
  o anda saat sıfır; yalnız geliştirici demo modunu etkiler.
- **"Harita" sütunu:** yalnız site haritası adı varken sayısı bilinmiyorsa "-"
  yazar; site bilgisi saklanmadan önceki denetimlerde "Yok" olarak kalır.
- **CI:** tüm eylemler commit özetine sabitlendi; Store paketi için kurulum
  denemesi adımı eklendi (ilk koşuda geçti; yayını engeller).

İkinci tur (2026-11-12, takım koşusu `R20261111-3d0b` ve ek dal):

- **Başlatıcı:** port seçimi ile ortam dosyasının yazımı tek kilit altında;
  iş nesnesine eklenemeyen süreç sonlandırılır; çalışma kopyasında paketin
  artık taşımadığı dosyalar temizlenir; günlük dosyası yeniden açılır;
  bildirimler kapalıyken duyuru sorgusu yapılmaz; doğrulaması başarısız olan
  güncelleme kendiliğinden yeniden indirilmez; tanılama raporu dosya adlarını
  maskeler.
- **Paketleme:** Store paketi sürümü uygulama sürümünün ilk hanesi bir
  artırılarak üretilir (0.8.8 → 1.8.8.0); yarım kalan sessiz güncellemeden
  sonra uygulama yeniden açılır; kaldırma çalışma kopyasını da siler.
- **Sunucu:** özel alan adı son ekleri (`*.github.io` gibi) ayrı site sayılır;
  duyuru servisi gövdeyi 256 KiB ile sınırlar; rapor şablonunda aynı ad ve
  bulunamayan kayıt doğru hata kodunu verir; hata metni maskelemesi tırnaklı
  anahtarları ve boşluklu yolları kapsar; demo veri ve denetim uzlaştırıcısı
  saati istek anında okur (Workers'ta modül yüklenirken saat sıfırdır);
  kayıtlı kelime aktarımı çakışmada `CONFLICT` kodu verir; toplu etiket
  ekleme D1'in 100 parametre sınırına göre parçalanır; şema metin alanlarına
  uzunluk sınırı geldi.
- **Arayüz:** fırsatlarda bilinmeyen kazanç sonda, dışa aktarım ekrandaki
  sırada; "Değişim" sütunu tüm sonuca göre gösterilir; Analytics kutusu
  saydığı tüm sayfaları listeler; CrUX'te yazdırılamayacak kadar küçük değişim
  eğilim sayılmaz; Lighthouse madde sayısı ilk on ile sınırlı değil; ülke
  seçici etiketi tıklamayı yutmaz; başarısız arka plan yenilemesi duyuruları
  ve kota kartını silmez; asistan doğrulaması zaman aşımından sonra da yavaşça
  yoklar.
- **Doğrulama:** bütünleştirme dalında `tsc`, oxlint, knip, i18n-check temiz;
  tam test paketi 2433/2434 (kalan test tek başına geçti); ek dalda 2436/2436;
  başlatıcı testleri geçti; istemci değişiklikleri geliştirme sunucusunda demo
  veriyle tarayıcıda denendi. Inno Setup betiği ve Store sürüm eşlemesi yerelde
  derlenmedi; yayın iş akışı ikisini de derler.
- **Bilerek bırakılanlar:** bağlı olmayan arama raporu hata eşlemesi, rapor
  başlığı sıralama harmanı, duyurularda "Yeni" vurgusu, proje ayarı etiketleri,
  arşiv geçişindeki titreme, Google bağlantı hata kutusunun kalıcılığı,
  "bu-site denetimi yok" yazımı (çeviri kataloğu değişikliği ister), kutu
  animasyonu, laboratuvar/saha karışık iletisi, "+" terim ayırıcısı.

Açık kalanlar:

| İş                                                              | Durum                 | Not                                                                                                                                                                                                                                                                                             |
| --------------------------------------------------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 366 kullanılmayan çeviri anahtarı                               | **karar bekliyor**    | Veritabanında saklı Türkçe cümleler bu anahtarlarla çevriliyor olabilir; silmeden önce onay gerekir.                                                                                                                                                                                            |
| Ücretli veri sütunlarının şemadan sökülmesi (`keyword_metrics`) | **karar bekliyor**    | Veritabanı göçü ister. Araçlar artık bu sütunları yazmıyor ve göstermiyor.                                                                                                                                                                                                                      |
| Denetim geçmişinin bellek kullanımı                             | **açık**              | Tam çözüm şema değişikliği ister; ön süzme eklendi.                                                                                                                                                                                                                                             |
| Kayıtlı kelimeler ekranı tüm arşivi okur                        | **bilerek yapılmadı** | Eşleşme anahtarı SQL'de üretilemiyor; tek kullanıcılı yerel SQLite'ta yalnız hız konusu.                                                                                                                                                                                                        |
| Hızlı süzgeçlerin başka süzgeçleri sıfırlaması                  | **karar bekliyor**    | Radyo düğmesi davranışı bilerek olabilir.                                                                                                                                                                                                                                                       |
| İki `window.confirm` kutusu                                     | **bilerek yapılmadı** | İşlevsel olarak doğru; yalnız görünüm.                                                                                                                                                                                                                                                          |
| Store paketi yolları                                            | **bitti (CI)**        | 2026-11-11, koşu 43060281090: paket deneme sertifikasıyla imzalanıp kuruldu, kurulum paketinin verisini devraldı, `/api/health` Store klasörünü verdi, belirteçsiz `/mcp` 401 aldı. Adım artık yayını engeller. Gerçek Store gönderimi ve StartupTask'ın oturum açılışında çalışması denenmedi. |
