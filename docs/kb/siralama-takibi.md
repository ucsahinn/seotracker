---
title: Sıralama takibi
description: Aramalarınızın Google'daki ortalama sırasını, hangilerinin yükselip düştüğünü ve sıra gruplarındaki değişimi görürsünüz. Veri bu bilgisayarda saklandığı için Google'ın 16 aylık sınırından da eskiye bakabilirsiniz.
screen: Sıralama takibi
route: /p/<proje>/rankings
updated: 2026-10-27
---

Bu ekran Search Console Web sorgularının bu bilgisayarda saklanan geçmişini gösterir. Ortalama sıra, her aramada göreceğiniz sabit bir konum değildir. Ülke, cihaz ve arama bağlamıyla değişebilir. Gösterim arama hacmi değildir.

## Önce neye bakmalı?

Üstte iki dönemde de gözlenen sorgu sayısı, en az yarım sıra yükselen ve gerileyen sorgular görünür. Karşılaştırması bilinmeyenler ayrıca sayılır. Önce önerilen gerileyen sorgunun geçmişini inceleyin. İnceleme sırası, mutlak sıra değişimi ile kayıtlı gösterimin çarpımıdır; kayıp tıklama tahmini değildir. Hareket listeleri önce üç, genişletilince beş sorgu gösterir.

## Tarihler ve arşiv kapsamı

30, 90, 180, 480 veya 1825 günlük dönem seçilir. Son seçenek son beş yıllık arşivdir; daha eski tüm geçmişi kapsamaz. Ay adları yaklaşık sürelerdir; kesin başlangıç ve bitiş tarihleri veri ayrıntısındadır. Tarihler America/Los_Angeles takvimindedir. Bitiş, üç günlük gecikme varsayımına dayanır; canlı tamamlanma doğrulaması değildir. İçe aktarım yalnızca Google'ın final verisini ister.

API yanıtı tamamlanan, uygulama sınırına takılan, başarısız ve bilinmeyen günler ayrı sayılır. Eski arşiv günlerinin kapsamı geriye dönük tamamlanmış sayılmaz. Yanıtın tamamlanması Google'ın gizlediği veya döndürmediği sorguları içermez. Son gözlem tarihi ile taranan son tarih farklıdır. Doldurmaya devam etmek birkaç çalıştırma gerektirebilir. Mevcut geçmiş senkronizasyon sırasında okunabilir.

## Dağılım ve sorgu listesi

Dağılım tüm mevcut dönem gözlemlerini sayar. Sıralar yuvarlanır: 3,4 ilk grupta, 3,5 ikinci gruptadır. Çubuk uzunluğu en büyük gruba görelidir; yanındaki yüzde tüm gözlenen sorgular içindeki paydır. Net değişim yalnızca aynı karşılaştırılabilir sorgular üzerinde hesaplanır. Karşılaştırma yoksa sıfır yazılmaz.

Arama ve filtreler ilk yüz sorguyla sınırlı değildir. Sayaçlar metin ve diğer etkin filtreleri dikkate alır. Üst çeyrek gösterim eşiğine eşit olanlar da dahildir. İlk 10 filtresi önceki kaydı olmayan güncel sorguları da kapsar. İlk 10'dan çıkanlar yalnızca iki dönemde de gözlenen sorgulardır. Filtreleri tek düğmeyle kaldırabilirsiniz. Sayfalar 25, 50 veya 100 kayıt gösterir; özetler sayfa boyutundan etkilenmez.

Önceki dönemde olup bu dönemde gözlenmeyenler ayrı listelenir. Bu, sıralamanın sıfıra düştüğünü veya tüm sıralamaların kaybolduğunu kanıtlamaz. Liste gösterime göre ilk 25 kaydı gösterir; arama burada da geçerlidir.

## Geçmişi yorumlama

Sıra ortalamaları gösterimle ağırlıklıdır. Değişim önceki ortalama eksi mevcut ortalamadır. 0,05 altı nötrdür; belirgin hareket filtresi 0,5 kullanır. Ayrıntının başlığı da aynı dönem karşılaştırmasını gösterir. İlk/son kayıtlı gün çifti ayrı kanıttır.

Gözlenen gün her zaman gösterilir; örneğin 90 günlük dönemde 10 gün olması tam kapsam değildir. Günlük grafik gerçek tarihlerle aralıklıdır; eksik günlerde çizgi kesilir. Oklar, Home ve End günler arasında gezinir. Günlük değerler açılarak okunabilir. Haftalık çizgilerde tamamen boş haftalar korunur; uç haftalar kısmi olabilir.

Arama performansı bağlantısı birebir sorguyu ve arşivin başlangıç/bitiş tarihlerini korur. Google'ın saklama sınırından eski dönemlerde bağlantı yerine kullanılabilir başlangıç açıklanır. Rakip sıralaması, ücretli arama hacmi ve trafik tahmini yoktur.
