---
title: Sıralama takibi
description: Search Console sorgularının ortalama sırasını ve değişimini izleyin. Yerel arşivle Google'ın 16 aylık sınırından eski kayıtları inceleyin.
screen: Sıralama takibi
route: /p/<proje>/rankings
updated: 2026-10-28
---

Bu ekran, Search Console'daki Web sorgularının bu bilgisayarda biriken geçmişini gösterir. Google bu veriyi 16 ay saklar; seowatcher'ın yerel arşivi, bir kez aldığı günleri bu sınırdan sonra da tutar.

İki kavramı baştan ayırın. Ortalama sıra, her aramada göreceğiniz sabit bir konum değildir; ülke, cihaz ve arama bağlamıyla değişir. Gösterim de arama hacmi değildir.

## Önce neye bakmalı

Üstte iki dönemde de gözlenen sorgu sayısı ile en az yarım sıra yükselen ve düşen sorgular görünür. Karşılaştırması yapılamayan sorgular ayrıca sayılır.

**Önce … sorgusunu inceleyin** önerisiyle başlayın. Öneri, sıra değişiminin büyüklüğü ile gösterimin çarpımına göre seçilir. Bu bir inceleme sırasıdır, kaybedilen tıklama tahmini değildir.

**Yükselenler ve düşenler** listeleri önce üç sorgu gösterir; genişletince beşe çıkar. Genişletme düğmesi yalnızca üçten fazla hareket varsa görünür. İki dönemde de gözlenen sorgu yoksa hareket hesaplanamaz ve kart sıfır hareket yazmak yerine bunu söyler.

## Dönem

30, 90, 180, 480 ya da 1825 günlük dönem seçebilirsiniz. En uzun seçenek son beş yılı kapsar, daha eskisini değil. Ay adları yaklaşık süredir; kesin tarihler **Veri kapsamı ve hesaplama** bölümündedir.

Tarihler Google'ın kullandığı Pasifik saatine (America/Los_Angeles) göredir. Bitiş günü, üç günlük gecikme varsayımıyla seçilir; Google'dan canlı bir tamamlanma onayı alınmaz. Arşive yalnızca Google'ın kesinleşmiş verisi alınır.

## Arşiv nasıl dolar

Bu ekran açıkken eksik günler kendiliğinden yüklenir. **Bu sayfa açıkken kalan günler otomatik yüklenir; bağlantı veya kota hatasında beklenir.** notu bunu anlatır.

- Her sınırlı aktarımdan sonra 15 saniye beklenir, sonra bir sonraki parça istenir.
- Arşiv güncel olduğunda 15 dakikada bir kontrol edilir.
- Bağlantı ya da kota hatasında yeniden denemeden önce 15 dakika beklenir.
- Yetkilendirme hatasında bağlantıyı sizin yenilemeniz gerekir.
- Ekran ya da uygulama kapalıyken aktarım çalışmaz. Arama performansı ekranı da açıkken arşivi günceller. **Arşivi doldurmaya devam et** ile elle de sürdürebilirsiniz.

İlk aktarım, Google'ın 16 aylık saklama sınırının başından başlar. Bilgisayar uzun süre kapalı kaldıysa eksik günler hâlâ okunabilen tarihlerden tamamlanır. Google'ın artık sunmadığı günler geri alınamaz. Daha önce 480 günlük sınırla başlatılmış arşivlerin başlangıcı kendiliğinden yeniden taranmaz.

Her çalıştırma en fazla dört zaman penceresi işler. Çok satırlı pencereler günlere bölünür ve sonraki çalıştırmalarda sürdürülür. Bir gün için Google'ın verdiği en fazla 50.000 satır okunur; buna rağmen tamamlanamayan gün eksik kalır.

## Arşiv kapsamını okumak

Günler dört gruba ayrılır: Google yanıtı tamamlanmış, uygulama sınırına takılmış, başarısız ve bilinmeyen. Eski arşiv günleri geriye dönük olarak tamamlanmış sayılmaz.

**Taranan son gün** ile son gözlem tarihi farklı şeylerdir. **Son kontrol** zamanı da tüm günlerin tamamlandığı anlamına gelmez. Aktarım sürerken mevcut geçmiş okunabilir.

"Yanıt tamamlandı" bile tüm aramaları kapsamaz: Google anonim sorguları ve bazı düşük hacimli satırları hiç döndürmez. Arşiv tüm aramaların listesi değildir.

## Sıra dağılımı

**Sıra dağılımı** seçili dönemde gözlenen tüm sorguları gruplara ayırır. Sıralar yuvarlanır: 3,4 ilk grupta, 3,5 ikinci gruptadır. Çubuk uzunluğu en büyük gruba göredir; yanındaki yüzde ise tüm gözlenen sorgular içindeki paydır. Net değişim yalnızca iki dönemde de gözlenen sorgular üzerinden hesaplanır. Karşılaştırma yoksa sıfır yazılmaz.

## Sorgu listesi ve filtreler

**Arşivde sorgu ara** ve filtreler ilk yüz sorguyla sınırlı değildir; tüm arşivde çalışır. Sayaçlar etkin olan bütün filtreleri hesaba katar.

| Filtre                   | Gösterdiği sorgular                                                |
| ------------------------ | ------------------------------------------------------------------ |
| **İlk 10**               | Dönem ortalaması ilk 10'da olanlar; önceki kaydı olmayanlar dahil. |
| **İlk 10'dan çıkanlar**  | Yalnızca iki dönemde de gözlenen ve ilk 10'dan düşenler.           |
| **En çok gösterilenler** | Gösterimi üst çeyrek eşiğinde ya da üstünde olanlar.               |
| **Hiç tıklanmayan**      | Gösterilmiş ama hiç tıklanmamış sorgular.                          |

**Tüm filtreleri kaldır** hepsini birden kapatır. Sayfa 25, 50 ya da 100 sorgu gösterir; özetler sayfa boyutundan etkilenmez.

Önceki dönemde görünüp bu dönemde gözlenmeyen sorgular ayrı bir listededir. Bu liste, sıralamanın sıfıra düştüğünü ya da kaybolduğunu kanıtlamaz. Gösterime göre ilk 25 kayıt listelenir ve arama burada da çalışır.

## Bir sorgunun geçmişi

Sıra ortalamaları gösterimle ağırlıklıdır. Değişim, önceki ortalamadan güncel ortalamanın çıkarılmasıyla bulunur. 0,05'ten küçük değişim nötrdür; belirgin hareket eşiği 0,5'tir. **İlk/son kayıtlı gün** ayrı bir kanıttır, dönem karşılaştırmasının yerine geçmez.

**Gözlenen gün** sayısı her zaman yazar. 90 günlük dönemde 10 gün gözlem tam kapsam değildir. Günlük grafik gerçek tarihlerle çizilir; eksik günlerde çizgi kesilir. Ok tuşları, Home ve End günler arasında gezinir; **Günlük değerler** değerleri metin olarak açar. Haftalık görünümde tamamen boş haftalar boş kalır, ilk ve son hafta kısmi olabilir.

**Arama performansında aç** aynı sorguyu ve arşiv tarihlerini korur. Dönem Google'ın 16 aylık sınırından eskiyse bağlantı yerine kullanılabilir başlangıç tarihi yazılır.

**Kayıtlı kelimelere ekle** sorguyu [Kayıtlı kelimeler](/docs/kayitli-kelimeler/) ekranına ekler.

Bu ekranda rakip sıralaması, arama hacmi ya da trafik tahmini yoktur.
