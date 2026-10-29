---
title: Analytics verisini yorumlama
description: Bu ekran GA4 mülkünde ölçülen ziyaretleri, etkileşimi ve anahtar olayları gösterir.
screen: Analytics
route: /p/<proje>/analytics
updated: 2026-10-28
---

Ekranın üstündeki rapor seçicisiyle sekiz görünüm arasında geçiş yaparsınız:

| Rapor                 | Ne gösterir                                               |
| --------------------- | --------------------------------------------------------- |
| **Giriş sayfaları**   | Ziyaretin başladığı sayfalar: oturum, etkileşim, dönüşüm. |
| **Sayfa performansı** | Görüntülenme ve sayfada geçirilen süre.                   |
| **Trafik kaynakları** | Ziyaretçilerin nereden geldiği.                           |
| **Anahtar olaylar**   | Dönüşüm saydığınız olaylar ve kaç kişinin tetiklediği.    |
| **E-ticaret**         | Ürün ve gelir; mülkte e-ticaret ölçümü varsa dolar.       |
| **Site içi arama**    | Ziyaretçilerin sitenizde ne aradığı.                      |
| **Kitle dağılımı**    | Cihaz, ülke, yeni ve geri dönen ziyaretçi.                |
| **Ölçüm durumu**      | GA4 yönetim ayarlarındaki eksikler.                       |

## Kapsam: hangi trafik, hangi site

Varsayılan kanal **Organik arama**dır. Bu kanal Google dışındaki arama motorlarını da içerir. **Tüm trafik** seçimi hem üst özeti hem raporu birlikte değiştirir. **Site içi arama** raporunda kanal seçimi yoktur; her zaman tüm trafikteki arama sonucu olaylarını gösterir.

Sayılar GA4 mülkünün tamamından gelir: tüm ana makineler ve tüm veri akışları. Aynı mülke bir mobil uygulama ya da başka bir site de veri gönderiyorsa toplam yalnızca bu projenin sitesine ait değildir.

## Tarih aralığı

Son 7 gün, son 28 gün ve son 3 ay seçenekleri, mülkün saat diliminde dün biter. Dün tamamlanmış bir takvim günüdür, ama Google bu günün verisini sonradan yeniden işleyebilir. Ekran gerçek başlangıç ve bitiş tarihlerini, karşılaştırılan önceki eşit dönemi ve saat dilimini yazar.

Bağlantıyla gelen `startDate` ve `endDate` birlikte kabul edilir. Bitiş tarihi bugün ya da daha ileriyse düne çekilir ve bu ekranda belirtilir.

GA4 ve Search Console farklı takvim ve ölçümler kullanır. Aynı tarih etiketi bile aynı zaman aralığını garanti etmez.

## Üst özeti okumak

Üst özet seçilen kapsamın oturum, etkileşim oranı, anahtar olay ve satın alma gelirini gösterir.

- Anahtar olay sayısı benzersiz müşteri sayısı değildir.
- Sıfır anahtar olay, hedeflerin hiç tanımlanmadığı anlamına da gelebilir.
- Sıfır gelir, sitenin mağaza olmadığını göstermez.
- Para birimi bilinmiyorsa tutarın yanında **(para birimi bilinmiyor)** yazar.
- Etkileşim süresi toplam süredir, kullanıcı başına ortalama değildir.

**Günlük değerler** açılır bölümünde bilinmeyen günler sıfırdan ayrı gösterilir. Örnekleme, gizlilik eşiği ya da erişim kısıtı varsa dönem karşılaştırması ve güçlü öneriler gösterilmez.

Az oturumda tek bir ziyaret bile oranları belirgin oynatır. Yüzde değişimi tek başına başarı ya da kayıp saymayın.

## Tablo, filtre ve sayfalama

Tablo sayfası 50, 100 ya da 200 satırdır. **Önceki sayfa** ve **Sonraki sayfa** kalan satırları açar. Filtreler, sıralama, özetler ve dışa aktarma yalnızca listelenen sayfadaki satırlara uygulanır. Bir çubuğa tıklamak tabloyu o satırlara daraltır; üst özet değişmez.

- Bir kullanıcı birden çok kategoride sayılabilir. Satırları toplayıp benzersiz kullanıcı sayısı çıkarmayın.
- Aynı yol farklı ana makinelerde ayrı satırdır. Aynı adlı farklı ürünler de ayrı tutulur.
- Gelir negatif ya da bilinmiyorsa pay grafiği çizilmez.

**Trafiği yüksek, dönüşümü düşük sayfa** filtresi bir inceleme ipucudur, satış kaybı tahmini değildir. Filtre, en az 30 oturumu olan en az dört satırın ortancasına göre çalışır. Site içi aramada bir terimin sık aranması da tek başına eksik içerik kanıtı değildir.

## Fırsatlar ekranından gelen adres grubu

Fırsatlar ekranındaki bir bağlantı Analytics'i bir **Analytics adres grubu** ve kaynak tarihlerle açar. Bu filtre sunucuda çalışır: Google'dan tüm organik giriş sayfası satırlarını okur, grubu ayırır, sonra sayfalar.

Adresler şöyle gruplanır: sorgu dizesi ve sondaki eğik çizgi farkı aynı grupta toplanır. Farklı ana makineler ve büyük-küçük harfi farklı yollar ayrı kalır. Kaynak sınırına ya da kalite kısıtına takılınca grubun tamamının doğrulanamadığı yazılır; boş sonuç grubun hiç trafiği olmadığını kanıtlamaz. Üst özet bu sırada da tüm mülkü gösterir.

**Adres grubu filtresini kaldır** filtreyi kapatır. Adres çubuğu, Geri düğmesi ve dışa aktarma grup kapsamını korur.

## Boş ve belirsiz sonuçlar

Organik rapor boşsa iki çıkış vardır: **Tüm trafiğe bak** kapsamı genişletir, **Ölçüm durumu** ayarları gösterir. Analytics'i yeni bağlamak geçmiş veriyi değiştirmez.

Ölçüm okunamadıysa ekran boş dönem sonucu çıkarmaz, **Bu dönemin trafiği belirlenemedi** yazar. Okunabilen sayılar görünür kalır. Google bir kısıt nedeni bildirdiyse ilgili ölçümün yanında yazılır; bildirmediyse bu da belirtilir. Böyle bir durumda **Yeniden dene** ya da ölçüm kontrolü önerilir, kanal değiştirmek çözüm olarak sunulmaz.

Google tarih aralığındaki veriyi kestiyse kesinti nedeni ve Google'ın bildirdiği tarihler özette ve rapor ayrıntılarında yazar. Bu rapor sınırlı sayılır ve güvenilir dönem karşılaştırması olarak sunulmaz.

Kapsam ve veri işleme notları **Veri ayrıntıları** içinde, genel açıklamalar **Analytics verisini yorumlama** bölümünde durur.

## Ölçüm durumu

**Ölçüm durumu** yalnızca GA4 yönetim ayarlarını okur; hesapta hiçbir şeyi değiştirmez. **Kontrol edilen ayarlarda eksik bulunmadı** sonucu, sitedeki etiketin gerçekten veri gönderdiğini kanıtlamaz. Bunun için **Etiket veri toplamayı doğrulama adımları** bağlantısını izleyin.

Envanter eksik okunduysa sayılar **En az** ile verilir. **Gelişmiş ölçüm** ana anahtarı kapalıysa açık otomatik olay sayısı sıfır görünür.

## Adres çubuğu ve dışa aktarma

Rapor, kanal, tarihler, kırılım, satır sayısı ve sayfa numarası adres çubuğunda saklanır; bağlantıyı paylaşınca aynı görünüm açılır. Bağlantıdaki `host` ve `path` filtresi birebir eşleşir, yalnızca listelenen satırlarda çalışır ve adres çeşitlerini birleştirmez.

**CSV** ve **E-Tablolar'a aktar**, ekrandaki filtrelenmiş satırları ham sayılarla aktarır. `ga4_scope_json` sütunu kaynak, mülk, tarih, saat dilimi, para birimi, veri kalitesi, sayfa ve filtre bilgisini taşır.

## Kota

**Kota ve sınırlar** açılır bölümündeki değerler, son rapor yanıtının anlık görüntüsüdür; seçilen dönemin toplamı değildir. Standart hesap tavanı bir varsayımdır. **Yenile** görünen raporları Google'dan yeniden ister ve her istek kotadan düşer.
