---
title: Panel
description: Panel, sitenin arama trafiğini, önce bakılacak ölçülmüş işleri ve kaynakların sınırlarını bir araya getirir.
screen: Panel
route: /p/<proje>
updated: 2026-10-28
---

Panel bir projeyi açtığınızda ilk gördüğünüz ekrandır. Her kart kendi kaynağını ve tarih aralığını yazar; ayrıntı için ilgili ekrana bağlanır.

## Yenile ve veri zamanı

**Yenile** düğmesi Panel'in bağlı kaynaklarını, kurulum durumunu ve Google yapılandırmasını yeniden okur. Okumalardan biri başarısız olursa başarı bildirimi yerine kısmi yenileme uyarısı çıkar ve önbellekteki veriler gösterilir.

**Veri alındı** zamanı, verinin uygulamaya geldiği andır. Kaynağın ölçtüğü son gün bu değildir; o gün kartın kendi tarih aralığında yazar.

## Arama özeti

Özet, Search Console'un son 28 gününü gösterir: Web araması, tüm cihazlar, tüm ülkeler. Tarihler Google'ın kullandığı Pasifik saatine göredir.

Google'ın henüz kesinleştirmediği son günler toplamlara katılmaz. **Search Console veri kapsamı** satırı hangi günlerin **Kesin veri**, hangilerinin **Geçici veri** olduğunu ve kaç günün dışarıda kaldığını gösterir. Google tamamlanma tarihi bildirmezse **Google tarih bildirmedi; son günler dışarıda.** yazar.

Dört kart şunları sayar:

- **Tıklama**: Google aramasından sitenize gelen tıklamalar.
- **Gösterim**: Sitenizin Google sonuçlarında gösterilme sayısı.
- **Tıklama oranı**: Gösterimlerin yüzde kaçı tıklamaya döndü.
- **Ortalama sıra**: Gösterim ağırlıklı ortalama. Küçük sayı daha iyidir.

Her kart aynı kapsamla **Arama performansı** ekranını açar. Değişim, bir önceki eşit uzunluktaki döneme göre hesaplanır:

- Önceki dönem sıfırsa artış yüzde yerine sayı olarak yazılır.
- Önceki dönem yoksa **Karşılaştırma yok** görünür.

Google çok az aranan sorguları gizlilik nedeniyle listelemez. Liste satır sınırına ulaştığında bu da ayrıca belirtilir.

**Tıklama eğilimi** günlük tıklamaları çizer. Kesikli çizgi önceki dönemdir.

## Sıradaki adımlar

Bu kart ölçülmüş kanıta dayanan en fazla üç iş önerir. Kanıt şunlardan gelir: bağlantı sorunu, denetim bulguları, Search Console'daki arama görevleri ve eskimiş denetim. Bağlantının kurulu olması tek başına öneri üretmez. **Ölçülen kapsamda öncelikli iş bulunmadı.** yazısı yalnızca ölçülen kaynaklar için geçerlidir; ölçülmeyen bir sorun olmadığını göstermez.

Kartın başlığındaki sayaç (örneğin **Kurulum 4 / 6**), Proje bilgisi ekranıyla aynı altı adımı sayar. Eksik ve okunamayan adımlar ayrı gösterilir. Bir denetim, başladığı andan tam yedi gün sonra eskimiş sayılır ve **Denetimi tazeleyin** önerisi çıkar.

Alttaki **Kurulum tercihleri** kapalı gelen, isteğe bağlı bir listedir; ikinci bir puan değildir. **Şimdilik geç** ile ertelediğiniz adımları sonradan geri alabilirsiniz.

## Bir üst sıra bandına çıkabilecek sorgular

Yeterli gösterimi olan ve ortalama sırası yuvarlanınca 4 ile 20 arasında kalan sorgular burada değerlendirilir. Kart en iyi dört sorguyu gösterir; sayım ise uygun sorguların tamamı üzerinden yapılır.

Tahmin, sorgu bir üst sıra bandına çıkarsa gelebilecek ek tıklamaların üst sınırıdır. Gerçekleşmiş trafik değildir. Hiçbir sorgu için tahmin hesaplanamazsa sıfır yazılmaz. Kart, marka sorgularının ayrılıp ayrılmadığını da belirtir.

Bu tahmini Fırsatlar ekranının toplamıyla toplamayın. Fırsatlar sayfa bazında ve farklı bir dönemle hesaplar.

## Site denetimi kartı

Panel yalnızca proje alan adıyla eşleşen denetimleri kullanır; başka bir siteyi tarayan daha yeni bir denetim yok sayılır. Projede alan adı yoksa kart sizi proje ayarlarına yönlendirir.

Kart son tamamlanan denetimin başlangıç adresini, tarihini, ölçülen kontrollerini ve varsa sayfa sınırını yazar. Sürmekte olan ya da başarısız olan bir deneme, son tamamlanan sonuçtan ayrı gösterilir.

Kartta üç farklı sayı vardır; bunları birbirine eklemeyin:

- etkilenen sayfa sayısı,
- sorun çıkan kontrol türü sayısı,
- önem düzeyine göre sayfa ve kontrol çiftleri. Bir sayfa üç kontrolden kalırsa üç çift sayılır.

Bilgi notları kritik ve uyarı çubuğundan ayrı durur. Sağlık cümlesi yalnızca taranan kapsamı anlatır. Sayfa sınırına takılan ya da eksik ölçülen bir tarama tüm site için sonuç vermez.

**Son denetimde yeni çıkanlar** ve **Düzelenler**, iki denetim karşılaştırılabildiğinde görünür: aynı başlangıç adresi, aynı ayarlar, uyumlu sayfa kümesi. Yalnızca iki denetimde de ölçülen kontroller karşılaştırılır. Daha dar ya da okunamayan bir tarama "düzeldi" sayılmaz. Karşılaştırma yapılamazsa nedeni yazılır. Bir sayfa satırına tıklayınca aynı denetimin sorunları o sayfaya odaklanarak açılır.

## Organik trafik

Bu kart Google Analytics'ten gelir: organik oturum, aktif kullanıcı, etkileşim oranı ve anahtar olay. Gerçek tarihler ve mülkün saat dilimi kartta yazar.

Oturum ile Search Console tıklaması aynı şey değildir. Analytics'teki organik trafik başka arama motorlarını da kapsar.

Bir ölçüm kısıtlı ya da bilinmiyorsa sıfır trafik olarak yorumlanmaz; okunabilen diğer ölçümler görünür kalır. Örnekleme, gizlilik eşiği ve erişim kısıtları kartta açıklanır. Bu durumlarda güvenilmeyen karşılaştırmalar gizlenir.

**Organik gelir** ve **Sipariş**, iki dönemden birinde gerçek satış görüldüyse gösterilir. Satış hiç görülmediyse satış ölçümünün doğrulanmadığı yazılır. Para birimi bilinmiyorsa tutar para birimi olmadan sunulmaz. Oturum sayısı bilinmiyorsa Analytics ekranındaki kaynak uyarılarına, bağlantı erişimine ve sitedeki Analytics etiketine bakın.

## Az veriyle yorum

Karşılaştırma dönemindeki tıklama sayısı eşiğin altındaysa özet, yüzdeden önce gerçek tıklama ve gösterim sayılarını verir. Az veride yüzde ve ortalamalar tek başına büyüme ya da kayıp kanıtı değildir.

Sorgu listesinin boş olması, 4 ile 20. sıra arasında hiç sorgu olmadığı anlamına gelmez. Gösterim eşiği döneme göre ölçeklenir ve marka sorguları dışarıda bırakılır.

## Panel'de olmayanlar

Panel arama hacmi, backlink ya da rakip sırası göstermez; bu veriler seowatcher'da yoktur. Bir sayıyı Google'ın kendi ekranıyla karşılaştıracaksanız aynı dönemi ve aynı filtreleri seçin.

<!-- Sources: src/client/features/dashboard/; src/shared/projectSetup.ts; src/shared/panelAudit.ts -->
