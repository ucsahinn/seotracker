---
title: Kayıtlı kelimeler
description: Önemsediğiniz sorguların ortalama sırasını ve değişimini yerel Search Console arşivinden, tarihleriyle izleyin.
screen: Kayıtlı kelimeler
route: /p/<proje>/saved
updated: 2026-10-27
---

Önemsediğiniz sorguları **Arama performansı** ya da **Sıralama takibi** ekranından kaydedersiniz. Kaydetmek Google'da yeni bir takip başlatmaz. Bu ekran, kaydettiğiniz kelimeleri bilgisayarınızdaki Search Console arşivinde bulunan gözlemlerle eşleştirir.

## Dönem

30, 90 ya da 180 gün seçin; varsayılan 90 gündür. Ekran hem seçili dönemin hem de bir önceki eşit dönemin tam tarihlerini yazar. Tarihler Google'ın Pasifik takvimine göre ve üç günlük veri gecikmesi varsayılarak belirlenir. Bu varsayım arşivin eksiksiz olduğunu kanıtlamaz.

## Üst kartlar

- **Metin ve etiket filtresine uyan kayıtlar:** Filtreden geçen kayıtlı kelime sayısı.
- **Gözlenen kelimeler:** Arşivde en az bir gözlemi olanlar.
- **Belirgin gerileyenler** ve yükselenler: İki dönemde karşılaştırılabilen, en az 0,5 sıra hareket eden kelimeler.
- **Sıra bilinmiyor:** Bu dönemde sıra kanıtı olmayan kayıtlar.

Bu sayılar sitenin toplam sorgu sayısı ya da arama hacmi değildir. Aynı kelimeyi iki farklı pazar için kaydettiyseniz iki kayıt sayılır. Gözlemler ise her zaman tüm ülke ve cihazları kapsar; kayıtlı pazar bir arşiv filtresi değildir.

**Sıra 1–3**, **Sıra 4–10**, **Sıra 11–20** ve **Sıra 21+** çubukları aynı tabanı kullanır. Bir gruba tıklamak tabloyu o gruba daraltır.

Karşılaştırılabilir kelime yoksa hareket kartında sıfır yerine **Karşılaştırma yok** yazar. Sonuç yoksa hareket ve **Sıra bilinmiyor** kartlarının düğmeleri kapalıdır.

## Sıra nasıl hesaplanır

- Ortalama sıra gösterimle ağırlıklandırılır.
- Eşleştirmede büyük-küçük harf ve art arda boşluklar yok sayılır. Türkçedeki I/ı ve İ/i ayrımı korunur.
- Kayıtlı kelimeyle eşleşen ham sorguların ortalamaları gösterimleriyle birleştirilir.
- Eksik sıra sıfır ya da kesin bir sıra kaybı sayılmaz.
- 0,5 sıradan küçük hareketler yalnızca satırın ayrıntısında görünür.
- **Karşılaştırma yok** ile "değişmedi" farklıdır: ilkinde iki dönemden birinde gözlem yoktur.

## Liste ve ayrıntı

Tabloda **Kelime**, **Ortalama sıra**, **Değişim**, **Gösterimler** ve **Etiketler** sütunları vardır. Telefonda temel ölçüler kelimenin altında görünür.

Bir kelimeye tıklayınca **Arşiv ayrıntısı** açılır: aynı dönemler, eşleşen ham sorgular, önceki sıra, gözlenen gün sayısı ve kayıtlı pazar. Kelimenin eklenme tarihi ve varsa eski amaç bilgisi de burada durur; arama amacı yeniden ölçülmez.

**Günlük arşiv gözlemlerini göster** günlük grafiği açar. Eksik günler grafikte boş kalır. Günler arasında klavyeyle gezinebilir, **Günlük değerler** ile değerleri metin olarak okuyabilirsiniz.

**Arama performansında ara (canlı dönem)** bağlantısı başka bir şey yapar: Arama performansında son 28 günde bu metni içeren sorguları arar. Arşiv ayrıntısıyla aynı ölçümü açmaz.

## Arama, etiket ve sıralama

- Arama kutusuna yazdığınız terimlerin tümü eşleşmelidir. Hariç tutulan terimlerden hiçbiri bulunmamalıdır. Her kutuya en fazla 20 terim girilir.
- Etiket filtresinde en fazla 50 etiket seçebilirsiniz; seçilenlerden birini taşıyan kelime listelenir. Projedeki etiket sayısı 50 ile sınırlı değildir. Etiketin yanındaki sayı tüm projedeki atamaları gösterir.
- Varsayılan sıralama eklenme tarihidir. Sıra, hareket, gösterim ve kelimeye göre de sıralayabilirsiniz.
- Filtreler, sıra grubu, dönem, sıralama ve sayfa adres çubuğunda saklanır. **Temizle** tüm filtreleri kaldırır.

**Gerileyenleri incele**, karşılaştırılabilen belirgin gerilemeleri inceleme sırasına koyar. Gerilemenin nedenini söylemez.

## Toplu işlemler

Seçim yalnızca görünen sayfadaki satırları kapsar. Liste yenilenirken ya da filtre uygulanırken toplu işlem yapılamaz. **Etiketle** seçili kelimelere etiket ekler ya da kaldırır; kelimeleri silmez. Kelime ve etiket silmek onay ister. Etiketi silmek kelimelere dokunmaz.

## Dışa aktarma

**CSV indir** ve **E-Tablolar'a aktar**, filtrelenmiş kayıtları ve ölçüm alanlarını aktarır. İlk sütunlar kelime, amaç, etiketler ve eklenme tarihidir. Ardından sıra, önceki sıra, değişim, durum, gözlenen günler, tarihler, kapsam, eşleşen ham sorgular, kayıt kimliği ve anlık görüntü bilgisi gelir. Bilinmeyen ölçüler boş kalır. Veri aktarım sırasında değişirse aktarımı yeniden başlatın.

## Eksik veri

Ekran dört durumu ayrı açıklar: Search Console bağlı değil, arşiv hiç aktarılmamış, arşiv kısmi, okuma hatası.

**Listeyi yenile** yalnızca yerel veritabanını okur. Google'dan yeni veri almak için **Sıralama takibi** ekranındaki arşiv güncellemesini kullanın; Search Console bağlı değilse önce onu bağlayın.

Google bazı düşük hacimli sorguları hiç döndürmez. Arşivde gözlem olmaması, Google'da hiç görünmediğiniz anlamına gelmez.
