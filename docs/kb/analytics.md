---
title: Analytics
description: Bu ekran GA4 mülkünde ölçülen ziyaretleri, etkileşimi ve anahtar olayları gösterir.
screen: Analytics
route: /p/<proje>/analytics
updated: 2026-10-28
---

Bu ekran GA4 mülkünde ölçülen ziyaretleri, etkileşimi ve anahtar olayları gösterir. Rapor seçicisinden Giriş sayfaları, Sayfa performansı, Trafik kaynakları, Anahtar olaylar, E-ticaret, Site içi arama, Kitle dağılımı veya Ölçüm durumu açılır.

## Önce kapsamı okuyun

Organik arama, Google dışındaki arama motorlarını da içerir. Tüm trafik seçimi özet ve rapor kapsamını birlikte değiştirir. Site içi arama her zaman tüm trafikte ölçülen arama sonucu olaylarını gösterir; burada kanal düğmesi yoktur. Sayılar tüm mülkü, ana makineleri ve akışları kapsar. Uygulama veya başka siteler aynı mülke veri gönderiyorsa toplam yalnızca bu projenin sitesine ait değildir.

Son 7, 28 veya 90 gün, mülkün saat diliminde dünle biter. Dün, tamamlanmış bir takvim günüdür; verinin kesinleştiğini garanti etmez. Güncel veriler yeniden işlenebilir. Ekran gerçek tarihleri, önceki eşit uzunluktaki dönemi ve saat dilimini gösterir. Bağlantılarda birlikte verilen startDate/endDate kabul edilir; ileri bitiş tarihi düne çekilirse açıklanır. GA4 ve Search Console farklı takvimler ve ölçümler kullanır. Aynı tarih etiketleri bile aynı zaman aralığını garanti etmez.

## Sonuçları ve satırları inceleyin

Fırsatlar bağlantıları `pageGroup` ile aynı normalleştirilmiş adres grubunu ve kaynak tarihlerini açar. Bu sunucu filtresi, Fırsatlar ile aynı en fazla 1.000 organik giriş sayfası satırını kullanır ve 50/100/200 satırlık sayfalamadan önce uygulanır. Sorgu dizeleri ve sondaki eğik çizgiler aynı grupta, farklı ana makineler ve büyük/küçük harfi farklı yollar ayrı kalır. Kaynak sınırı veya kalite kısıtı varsa grubun tamamının doğrulanamadığı belirtilir; boş sonuç grubun hiç trafiği olmadığını kanıtlamaz. Üst özet tüm mülk kapsamında kalır. Adres grubu filtresi kaldırılabilir; URL, Geri ve dışa aktarma grup kapsamını korur.

Üst özet seçilen kapsamın oturum, etkileşim oranı, anahtar olay ve satın alma gelirini gösterir. Anahtar olay, benzersiz müşteri değildir. Sıfır gelir mağaza olmadığı anlamına gelmez. Para birimi bilinmiyorsa tutarın yanında belirtilir. Etkileşim süresi toplam süredir, kullanıcı başına ortalama değildir. Günlük değerler açılır bölümünde bilinmeyen günler sıfırdan ayrılır. Örnekleme, gizlilik eşiği ve erişim kısıtları varsa karşılaştırma veya güçlü öneri gösterilmez.

Az sayıda oturumda tek bir ziyaret bile oranları belirgin değiştirebilir; yüzde değişimini tek başına başarı veya kayıp saymayın. Sıfır anahtar olay, hedeflerin tanımlı olmadığı anlamına da gelebilir. Organik rapor boşsa **Tüm trafiğe bak** ile kapsamı genişletin veya **Ölçüm durumunu kontrol et** ile ayarları inceleyin. Bağlantı kurmak geçmiş veriyi değiştirmez. Boş raporda satır filtreleri gösterilmez; yinelenen kapsam ve veri işleme notları **Veri ayrıntıları** içinde kalır.

Sayfa boyutu 50, 100 veya 200 satırdır; Önceki/Sonraki sayfa kalan satırlara ulaştırır. Filtreler, sıralama, özetler ve dışa aktarma yalnızca listelenen sayfayı kapsar. Çubuk seçimi tabloyu daraltır; özetin tabanı değişmez. Kullanıcılar farklı kategorilerde tekrar sayılabilir: satırları toplayıp benzersiz kullanıcı toplamı çıkarmayın. Aynı yolun farklı ana makineleri ve aynı adlı farklı ürünler ayrı tutulur. Negatif veya bilinmeyen gelir için pay grafiği çizilmez.

Düşük dönüşüm filtresi en az 30 oturumlu en az dört uygun satırın ortancasına dayanan bir inceleme ipucudur; satış kaybı tahmini değildir. Sıfır olay, anahtar olayın tanımsız olduğunu kanıtlamaz. Kurulum kanıtı yoksa kontrol etmeniz istenir. Site arama sıklığı da eksik içerik kanıtı değildir.

## Paylaşım, ölçüm ve kota

Rapor, kanal, tarihler, kırılım, satır boyutu ve sayfalama URL'de korunur. host/path bağlantı filtresi birebir, yalnızca listelenen satırlarda çalışır; URL çeşitlerini birleştirmez. CSV ve E-Tablolar aynı filtrelenmiş satırları ham sayılarla aktarır. ga4_scope_json sütunu kaynak, mülk, tarihler, saat dilimi, para birimi, kalite, sayfa ve filtre bilgisini taşır.

Ölçüm durumu yalnızca GA4 yönetim ayarlarını okur. “Kontrol edilen ayarlarda eksik bulunmadı” etiketin veri gönderdiğini kanıtlamaz; bağlantılı doğrulama adımlarını izleyin. Eksik envanterde sayılar en az olarak gösterilir. Gelişmiş ölçümün ana anahtarı kapalıysa etkin alt seçenek sayısı sıfırdır. Kontrol, hesap ayarlarını değiştirmez.

Kota ve sınırlar açılır bölümündeki değerler son rapor yanıtının yerel anlık görüntüsüdür; seçilen trafik döneminin toplamı değildir. Standart hesap tavanı bir varsayımdır. Yenile, görünür raporları yeniden ister; raporların belirteç maliyeti vardır.

Google tarih kapsamındaki verileri kesmişse Analytics özetinde ve rapor ayrıntılarında kesinti nedeni ve Google'ın bildirdiği tarihler gösterilir. Bu rapor sınırlı sayılır; eksik kapsam güvenilir bir dönem karşılaştırması olarak sunulmaz.
