---
title: Fırsatlar
description: Her sayfanızın ayda kaç tıklama daha getirebileceğini ve bunun için hangi işi yapmanız gerektiğini gösterir. Rakam bir üst sınırdır, söz değil.
screen: Fırsatlar
route: /p/<proje>/opportunities
updated: 2026-10-27
---

Hangi sayfanızın ayda kaç tıklama daha getirebileceğini ve bunun için ne yapacağınızı burada görürsünüz.

Tahmin yalnızca Search Console'daki aramalarınızdan hesaplanır. Analytics bağlıysa her sayfanın yanına, o sayfanın dönüşüm getirip getirmediğini söyleyen bir etiket eklenir. Tahmini değiştirmez. Search Console bağlı değilse ekran bir uyarı ve **Bağlantıları ayarla** düğmesi gösterir.

## Ekranda neler var

**Üst çubuk.** **Dönem** (Son 7 gün, Son 28 gün, Son 90 gün), **Satır sayısı** (25, 50, 100) ve **Yenile**. Seçtiğiniz dönem ve satır sayısı adres çubuğunda durur. Sayfayı yenileseniz ya da bağlantıyı paylaşsanız aynı görünümü bulursunuz.

**Burası ne işe yarar?** Ekranın amacını anlatan kısa bir kutu. İlk açılışta açıktır. Kapatırsanız tarayıcınız bunu hatırlar.

**Dönem satırı.** Listenin hangi günleri kapsadığını yazar. Search Console verisi üç gün geriden geldiği için son günler yoktur. Tahminler 30 güne ölçeklenir. Yani 7 gün de seçseniz 90 gün de seçseniz rakamlar "ayda" olarak okunur.

**Dört kutu.**

- **En fazla kazanılabilecek tıklama / ay (üst sınır).** Listedeki sayfaların toplam kazancı. Altında, bu sayfaların bugün ayda kaç tıklama aldığı ve kazancın bunun yüzde kaçı olduğu yazar.
- **Önce şuna bakın.** En çok kazandıracak sayfa. Kutuya basınca o sayfanın ayrıntı paneli açılır.
- **Dönüşüm getiren sayfalar.** Analytics'e göre anahtar olay (sizin önemli saydığınız hareket, örneğin form gönderimi) getiren sayfaların sayısı. Kutuya basınca tablo bu sayfalara daralır. Analytics bağlı değilse "Analytics bağlanınca görünür" yazar.
- **Kazanç beklenmeyen sayfalar.** Zaten iyi sırada ve normal tıklanan ya da çok az gösterim alan sayfaların sayısı. Bu sayfalar listede yoktur.

**Kazanç hangi işte?** Dört iş türünü, ayda getirebilecekleri ek tıklamayla yan yana gösterir. En ucuz iş en üsttedir. Bir satıra basınca tablo yalnızca o işten kazancı olan sayfalara daralır. Yeniden basarsanız süzgeç kalkar.

| İş türü                        | Ne demek                                                                                              | Ne yapmalı                            |
| ------------------------------ | ----------------------------------------------------------------------------------------------------- | ------------------------------------- |
| **Başlık ve açıklama işi**     | İlk sayfada ama sitenizin aynı sıradaki aramalarına göre az tıklanıyor. Sıra değişmeden tıklama artar | Başlığı ve açıklamayı yenileyin       |
| **İlk sayfada, 4-10. sıra**    | İlk üçün altında. Bir basamak yükselmek tıklamayı belirgin artırır                                    | İçeriği güçlendirin                   |
| **2. sayfada, 11-20. sıra**    | İlk sayfanın hemen arkasında. İlk sayfaya çıkana kadar neredeyse hiç tıklanmaz                        | İç bağlantı verin, içeriği genişletin |
| **Derinde, 21. sıradan sonra** | Talep var ama sayfa çok geride                                                                        | Birleştirin ya da bırakın             |

İç bağlantı, sitenizde bir sayfadan diğerine verdiğiniz bağlantıdır.

**Hızlı filtreler.** **Dönüşüm getirenler** ve **Trafik var, dönüşüm yok**. Yalnızca listeyi gerçekten daraltıyorlarsa görünürler. Analytics bağlı değilse çıkmazlar. İş türü satırıyla birlikte kullanılabilir. İkisi birlikte "ve" olarak çalışır.

**Tablo.** Sütunlar şunlar.

- **Ek tıklama tahmini.** Ayda gelebilecek ek tıklama. Altındaki çubuk, listenin en büyük kazancına göre ölçeklidir.
- **Sayfa.** Adres ve altında ana iş türü.
- **Sıra, Gösterim, Tıklama.** Sayfanın seçtiğiniz dönemdeki değerleri.
- **Tıklama oranı.** Altında, sayfanın marka dışı aramalarının oranı ile sitenizin aynı sıradaki oranı arasındaki fark yüzde puan olarak yazar. Aşağı ok sitenizin altında kaldığını, yukarı ok üstünde olduğunu gösterir.
- **Oturum.** Analytics'teki organik ziyaret sayısı. Altında "dönüşüyor", "dönüşüm yok" ya da "az trafik" yazar. Sayfa en az 30 oturum almamışsa dönüşüm oranı güvenilmez sayılır, bu yüzden "az trafik" denir. Karşılığı bulunamazsa çizgi görürsünüz.

Tablonun üstündeki menüden listeyi **E-Tablolar'a aktar** ya da **CSV** olarak alırsınız. Bir süzgeç seçiliyse yalnızca görünen satırlar gider. Tablo her sütundan sıralanır, ilk sıralama kazanca göredir.

**Ayrıntı paneli.** Bir satıra tıklayınca açılır. En üstte kazanç ve nedeni yazar: ortalama sıra, gösterim, tıklama. Kazanç sayfanın tamamının ulaşabileceği miktarı aşıyorsa panel bunu belirtir ve rakamı o sınıra çeker. Analytics'te dönüşüm getiren bir sayfa için, bugünkü dönüşüm oranıyla ayda yaklaşık kaç anahtar olay geleceği de yazar. Bu bir tahmindir.

Altında üç bilgi var: **Talep** (ayda kaç gösterim), **Değer (Analytics)** ve **Mesafe** (şimdiki sıra ve hedef). Sonra **Hangi aramalar?** tablosu gelir. Her aramanın sırası, tıklama oranı, tahminin varsaydığı hedef oran ve aylık kazancı yazar. Sayfanın ortalama sırası birçok aramanın ortalamasıdır. Bu yüzden "yukarı çıkın" demek yetmez. Hangi aramada çıkacağınızı bu tablo söyler. En altta **Ne yapmalı?** başlığı ve üç maddelik bir liste durur.

Düğmeler: **Arama performansında aç**, **Adresi kopyala**, **Sayfayı aç**.

## Nasıl kullanılır

1. **Son 28 gün** ile başlayın. En üstteki kutu ve tablonun ilk satırı önce bakmanız gereken sayfayı söyler.
2. **Kazanç hangi işte?** bölümüne bakın. Başlık ve açıklama işi en ucuzudur. Sıra değişmeden tıklama artar. O satıra basın ve tablonun ilk iki sayfasını alın.
3. Ayrıntı panelini açın. **Hangi aramalar?** tablosundaki en büyük kazancı olan aramayı başlığa ve açıklamaya açıkça yazın.
4. Sonra 4-10. sıradaki sayfalara geçin. Bir bölüm ekleyin, ilgili sayfalardan iç bağlantı verin.
5. **Derinde** satırındaki sayfalarda önce karar verin. Aynı konuda başka sayfanız varsa birleştirin. Kazanç küçükse bırakın.
6. Analytics bağlıysa **Dönüşüm getirenler** süzgeciyle başlayın. Aynı tıklama artışı burada size daha çok değer kazandırır.
7. İki hafta sonra ekrana dönün. Dokunduğunuz sayfanın tahmini kazancı küçülmüşse iş işe yaramıştır.

## Sayılar nasıl hesaplanır

Rakam bir üst sınırdır, söz değildir. Uygulama bunu şöyle bulur.

Sayfanın Google'da çıktığı her arama ayrı ele alınır. Tıklama oranları başka sitelerden değil, sizin sitenizden ölçülür.

- **İlk sayfadaki az tıklanan arama.** Aramanın tıklama oranı, sitenizin aynı sıradaki aramalarının oranının yüzde 70'inin altındaysa kazanç, o orana ulaşmaktır. Sıra değişmez. Bu başlık ve açıklama işidir.
- **Diğer her arama yalnızca bir basamak yükselir.** 4-5. sıradaki arama 2-3'ün oranına, 6-10. sıradaki arama 4-5'in oranına, 2. sayfadaki arama ilk sayfanın oranına (6-10. sıra), daha geride olan 2. sayfanın oranına ulaşır. İlk üçteki aramalar için bu hesap yapılmaz.
- **Sayfa sınırı.** Sayfanın aramaları sıra aralığına göre gruplanır. Her grup için, grubun aramaları birlikte bir basamak yükselse alacağı ek tıklama hesaplanır: grubun gösterimi, bir üst aralıktaki tıklama oranınızla çarpılır, grubun mevcut tıklaması çıkarılır. İlk üçteki grup kendi aralığının oranıyla ölçülür. Sayfanın toplamı bu grup rakamlarının toplamını geçemez. Sınır, çok sayıda küçük kazancın toplamı gerçekçi olmayan bir rakama varamasın diye konur. Sayfanın tek bir ortalama sırası kullanılmaz: ana aramasında 2., geri kalanlarında 15. sırada olan bir sayfanın ortalaması üste yakın çıkar ve alttaki aramaların gerçek payını silerdi.

Çok az gösterim alan aramalar sayılmaz. Bu sınır dönemin uzunluğuna göre ölçeklenir. Sitenizin sıraya göre tıklama oranını ölçecek kadar arama yoksa tahmin yapılamaz. Ekran bunu söyler. Dönemi 90 güne çıkarmak çoğu zaman yeter.

**Marka aramaları hesaba katılmaz.** Markanızı arayan sizi zaten bulur. Onların yüksek tıklama oranı diğer aramaları haksız yere düşük gösterirdi. Marka terimleri üç durumdan birindedir. Onaylandıysa onaylanan terimler kullanılır. Onaylanmadıysa alan adından tahmin edilen terimler kullanılır ve ekran bunu yazar. Hiç terim yoksa marka aramaları da karşılaştırmaya girer. Terimleri **Arama performansı** ekranında onaylarsınız.

**Analytics yalnızca etiket koyar.** Tahmini değiştirmez. Bir sayfanın dönüşümüne, en az 30 organik oturum aldıysa bakılır. Daha azında oran gürültüdür. Sayfalar alan adı ve yola göre eşleşir, adresin sonundaki eğik çizgi sayılmaz.

Kazancı olan sayfa sayısı seçtiğiniz satır sayısını aşarsa tablo en büyük kazançlıları gösterir ve altında bir not çıkar. Üstteki toplam her zaman hepsini kapsar.

## Sık sorulanlar

**Neden "+120 tıklama" gelmedi?** Bu bir üst sınırdır. Sıra bir basamak yükselirse alınabilecek en çok tıklamadır. Gerçek sonuç rakiplere ve Google'a bağlıdır.

**Liste neden boş ya da "Tahmin için veri henüz az" diyor?** Sitenizin sıraya göre tıklama oranını ölçecek kadar arama yoktur. Dönemi **Son 90 gün** yapın. Search Console'u yeni bağladıysanız Google'ın veriyi doldurması birkaç gün sürer.

**"Bu dönemde kazanç beklenen sayfa yok" ne demek?** Sayfalarınız ya zaten iyi sırada ve normal tıklanıyor ya da tahmin için çok az gösterim almış.

**Analytics'te karşılığı yok yazıyorsa?** Adres biçimi farklı olabilir ya da sayfa hiç ziyaret görmemiştir. Tahmin etkilenmez.

## Sınırlar

Ekran arama hacmi ya da rakip sırası kullanmaz. Elinizde yalnızca kendi gösterimleriniz vardır. Tahmin içeriğin kalitesini bilmez. Search Console ve Analytics günleri farklı saat dilimlerinde sayabilir. Son karar sizindir.

<!-- Kaynaklar: src/routes/_project/p/$projectId/opportunities.tsx; src/client/features/opportunities/OpportunitiesPage.tsx; OpportunityStates.tsx; OpportunityMethod.tsx; OpportunityWorkBars.tsx; OpportunityQuickFilters.tsx; OpportunityColumns.tsx; OpportunitiesTable.tsx; OpportunityDetail.tsx; opportunityLogic.ts; src/shared/pageOpportunities.ts; src/shared/searchInsights.ts; src/server/features/ga4/services/SearchOpportunityService.ts -->
