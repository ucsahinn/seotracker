---
title: Kayıtlı kelimeler
description: Kayıtlı kelimeleri tarihleri ve kapsamı belli arşiv gözlemleriyle inceleyin.
screen: Kayıtlı kelimeler
route: /p/<proje>/saved
updated: 2026-10-27
---

Önemsediğiniz sorguları Arama performansı veya Sıralamalar ekranından kaydedin. Kaydetmek Google'da yeni takip başlatmaz. Bu ekran yalnızca seçtiğiniz kayıtları yerel arşivdeki gözlemlerle eşleştirir.

## Dönem ve sayıların anlamı

30, 90 veya 180 gün seçin; varsayılan 90 gündür. Güncel ve eşit uzunluktaki önceki dönemin tam tarihleri gösterilir. Tarihler Google'ın Pasifik takvimine göre, üç günlük gecikme varsayımıyla belirlenir. Bu varsayım arşivin tam olduğunu kanıtlamaz.

Kartlar metin ve etiket filtresine uyan kayıtları, gözlenen kayıtları, karşılaştırılabilen belirgin hareketleri ve sıra kanıtı olmayan kayıtları gösterir. Sıra çubukları aynı tabanı kullanır; gruba tıklamak tabloyu daraltır. Toplam site sorgusu veya arama hacmi değildir. İki farklı pazar kaydı iki kayıt sayılır; gözlemler tüm ülkeler ve cihazları kapsar.

Ortalama sıra gösterimle ağırlıklandırılır. Türkçe büyük/küçük harf ve art arda boşluklar eşleştirilir; I/ı ile İ/i ayrımı korunur. Aynı gruptaki ham sorguların ortalamaları gösterimleriyle birleştirilir. Eksik sıra sıfır veya kesin sıralama kaybı sayılmaz. Belirgin yükseliş/gerileme en az 0,5 sıradır; küçük hareketler satır ayrıntısında görülebilir. Karşılaştırma yok ile değişmedi farklıdır.

## Listeyi inceleyin

Tabloda kelime, ortalama sıra, değişim, gösterimler ve etiketler bulunur. Telefonda temel ölçüler kelimenin altında görünür. Kelimeye tıklayın: Arşiv ayrıntısı aynı dönemleri, ham eşleşmeleri, önceki sırayı, gözlenen günleri ve kayıtlı pazar bilgisini açıklar. Eklenme tarihi ve varsa eski amaç bilgisi ayrıntıda korunur; amaç yeni ölçülmez. İkinci bağlantı canlı Arama performansında son 28 günde metni içeren sorguları arar; aynı arşiv ölçümünü açtığı varsayılmamalıdır.

İçeren terimlerin tümü eşleşmelidir; içermeyen terimlerden hiçbiri bulunmamalıdır. Her kutuda en fazla 20 terim vardır. Seçilen en fazla 50 etiketten herhangi biri yeterlidir; bu, projede yalnızca 50 etiket olabileceği anlamına gelmez. Etiket yanındaki sayılar tüm projedeki atamalardır. Filtreler, sıra grubu, dönem, sıralama ve sayfa URL'de saklanır. Tümünü temizle boş gruptan da çıkmanızı sağlar.

## Eksik veriyi onarın

Bağlantı yok, hiç aktarılmamış arşiv, kısmi arşiv ve okuma hatası ayrı açıklanır. Listeyi yenile yalnızca yerel veritabanını okur. Yeni Google verisi için Sıralamalar'da arşivi güncelle yolunu kullanın; bağlantı yoksa önce Search Console'u bağlayın. Google bazı nadir sorguları döndürmez; arşivde gözlem yokluğu Google'da hiç görünmediğinizin kanıtı değildir.

## Dışa aktarım ve toplu işlemler

CSV ve E-Tablolar aynı filtrelenen kayıtları ve ölçüm alanlarını aktarır. İlk sütunlar kelime, amaç, etiketler ve eklenme olarak korunur; sıra, önceki sıra, değişim, durum, gözlenen günler, tam tarihler, kapsam, ham eşleşmeler, kayıt kimliği ve anlık görüntü bilgisi eklenir. Bilinmeyen ölçüler boş kalır. Veri aktarım sırasında değişirse yeniden başlatmanız gerekir.

Seçim yalnızca mevcut sayfadadır. Liste yenilenirken veya filtre uygulanırken eski satırlara toplu işlem yapılamaz. Silme onay ister; etiket düzenleme kelimeleri silmez. Varsayılan sıralama eklenme tarihidir; sıra, hareket, gösterim ve kelimeye göre de sıralayabilirsiniz. Gerileyenleri incele yalnızca karşılaştırılabilen belirgin gerilemeleri inceleme sırasına koyar; neden veya sonuç garantisi vermez.

**Günlük gözlemler.** Arşiv ayrıntısında günlük gözlemleri açıkça isteyebilirsiniz. Aynı tarih aralığı ve eşleştirme kullanılır; eksik günler grafikte boş kalır. Tarihleri klavyeyle inceleyebilir, günlük değerleri metin olarak açabilirsiniz.

Karşılaştırılabilir kelime yoksa hareket kartında sıfır yerine Karşılaştırma yok görünür. Tüm kayıtlı kelimeler gözlendiyse Sıra bilinmiyor kartı eksik gözlem uyarısı vermez. Sonuç yoksa hareket ve bilinmeyen sıra kartlarının düğmeleri devre dışıdır.
