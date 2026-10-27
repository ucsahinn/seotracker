---
title: Arama performansı
description: Google'da kaç kez göründüğünüzü, kaç tıklama aldığınızı ve önce neyi düzeltmeniz gerektiğini görürsünüz. Sayılar Search Console'dan gelir. Kazanç rakamları bir üst sınırdır.
screen: Arama performansı
route: /p/<proje>/search-performance
updated: 2026-10-27
---

Google'da kaç kez göründüğünüzü, kaç tıklama aldığınızı ve önce neyi düzeltmeniz gerektiğini burada görürsünüz.

Tıklama, gösterim, tıklama oranı ve sıra doğrudan Search Console'dan gelir. Uygulama bunları tahmin etmez. Tahmin yalnızca "olası kazanç" rakamlarındadır ve bunlar her yerde "üst sınır" diye işaretlenir.

Seçtiğiniz filtreler adres çubuğuna yazılır. İsterseniz o görünümü bağlantı olarak paylaşır ya da yer imine eklersiniz.

## Üç terim

**Kesin gün.** Search Console bir günü birkaç gün boyunca saymaya devam eder. Toplamlar ve karşılaştırmalar yalnızca sayımı bitmiş günleri kullanır. Günler Google'ın kullandığı Pasifik saatine göredir. Henüz sayılmakta olan günler grafikte taralı görünür ve toplamlara katılmaz.

**Gizli sorgu.** Google, çok az aranan sorguları gizlilik için listelemez. Ama bu sorguların tıklamalarını site toplamına katar. Bu yüzden sorgu tablosunun toplamı site toplamından küçüktür. Fark gizli sorgulardandır.

**Üst sınır.** Kazanç rakamı "en fazla bu kadar" demektir. Her arama bir basamak yükselirse sitenizin kendi tıklama oranlarıyla alacağı ek tıklamadır. Gerçek sonuç rakiplere ve Google'a bağlıdır, çoğu zaman bundan küçüktür.

## Ekranda neler var

**Üst çubuk.** Sağ üstte dört şey var.

- **Yenile**: Search Console'dan taze veri ister. Uygulama normalde birkaç dakikalık yanıtı kullanır.
- **Raporu indir**: Ekrandaki görünümü yazdırılabilir tek dosyalık bir rapora çevirir, kaydeder ve indirir. Rapor **Raporlar** ekranında da durur.
- Dışa aktarma menüsü: **Sorgular (CSV)**, **Sayfalar (CSV)**, **İlk üçe yakın sorgular (CSV)**, **Sorguları E-Tablolar'a aktar**, **Sayfaları E-Tablolar'a aktar**. Dışa aktarma ekrandaki filtreleri izler. Sorgular ya da Sayfalar sekmesindeyken bir arama ya da hızlı filtre seçtiyseniz o da dosyaya yansır.

**Filtreler.** Tek satırlık bir çubuk, seçili filtreleri özetler: "(Web, Tüm cihazlar, Tüm ülkeler, Son 28 gün, Önceki dönemle)". Açınca şunlar çıkar: **Arama türü** (Web, Görsel, Video, Haber), **Cihaz filtresi** (Tüm cihazlar, Mobil, Bilgisayar, Tablet), **Ülke filtresi** (Google'ın o dönem için bildirdiği ülkeler), **Tarih aralığı** (Son 7 gün, Son 28 gün, Son 3 ay) ve **Karşılaştırma** (Önceki dönemle, Geçen yılla, Karşılaştırma yok).

**Verinin durumu.** Rakamların neye dayandığını söyleyen şerit. Örneğin "Veriler 24 Ekim'e kadar kesin; son 3 gün hâlâ sayılıyor (grafikte taralı)." Aynı şeritte karşılaştırmanın hangi günlerle yapıldığı ve Search Console mülkünüzün adı durur. Mülk adına basınca projenin bağlantı ayarlarına gidersiniz. Geçen yıl karşılaştırması seçiliyken Google o günleri artık vermiyorsa şerit bunu söyler (Google en fazla 16 ay geriye gider). **Veri hakkında** bölümünü açarsanız şunları görürsünüz: kesin günlerin tarihi, hâlâ sayılan gün sayısı ve son veri tarihi, gizli sorgulardan gelen tıklama payı, tabloların tam okunup okunmadığı (Google tek seferde sınırlı satır verir) ve bu görünümün Google'a yeni istek mi gönderdiği yoksa birkaç dakika önce alınmış yanıtı mı kullandığı.

**Özet cümlesi.** Kutuların üstündeki bir iki cümle ne olduğunu söyler. Örneğin "Son 28 günde tıklamalar önceki döneme göre %6,1 arttı. Tıklama oranı 0,3 puan düştü." Sonra ilk üç işin birlikte ne kadar ek tıklama getirebileceği "(üst sınır)" notuyla yazar. **Yapılacaklar** bağlantısı sizi o sekmeye götürür.

**Dört kutu.** **Tıklama**, **Gösterim**, **Tıklama oranı** (gösterimlerin yüzde kaçı tıklandı) ve **Ortalama sıra**. Hepsi kesin günlerin toplamıdır. Her kutuda seçtiğiniz karşılaştırmaya göre değişim ve küçük bir çizgi durur. Tıklama ve gösterimdeki değişim yüzde, tıklama oranındaki değişim puan, sıradaki değişim basamak olarak yazılır. Ortalama sırada küçük sayı iyidir, 1 en üst sıradır. Değişim yönü renkle birlikte bir okla da gösterilir.

**Zaman içinde grafiği.** Günlük değerleri çizer.

- Sağ üstteki seçiciyle dört ölçü arasında geçersiniz: tıklama, gösterim, tıklama oranı, ortalama sıra. Sıra grafiğinde yukarısı iyi sıradır.
- **Gün**, **Hafta** ve **Ay** düğmeleri zaman birimini değiştirir. Karşılaştırma çizgisi (kesikli çizgi) yalnızca gün görünümünde çıkar.
- Taralı bölge Google'ın hâlâ saydığı günlerdir. İçi boş nokta eksik ya da kesinleşmemiş dönem demektir.
- Çizginin üstündeki numaralı işaretler üç şeyi gösterir: Google'ın duyurduğu sıralama güncellemeleri ("Google güncellemesi"), site denetimlerinin bittiği günler ("Site denetimi tamamlandı") ve sizin notlarınız. Grafiğin altında her numaranın karşılığı yazar.
- **Not ekle** ile bir tarihe kendi notunuzu bırakırsınız, örneğin "Yeni sayfa başlıkları yayına alındı". Not en çok 280 karakterdir. Bir düşüşün ya da artışın nedenini sonra hatırlamanıza yarar. Seçili dönemin dışındaki notlar "Bu dönemin dışındaki notlar (N)" altında toplanır.

**Önce bunlar şeridi.** Grafikle sekmeler arasında, yapılacakların ilk üçü yan yana durur. Her birinin başlığı, olası kazancı ve bir düğmesi vardır. **Tüm yapılacaklar (N)** sizi Yapılacaklar sekmesine götürür.

**Sekmeler.** Yedi sekme var: **Yapılacaklar (N)**, **Sorgular (N)**, **Sayfalar (N)**, **Sıralama fırsatları (N)**, **Değişimler**, **Çakışmalar** ve **Dağılım**. Parantezdeki sayı o sekmenin içindeki satır ya da bulgu sayısıdır. Değişimler sekmesinde düşen sorgu ya da sayfa varsa "Değişimler (N düşüş)" yazar. Bir sekmeye geçince arama kutusu ve hızlı filtre sıfırlanır.

### Yapılacaklar

Uygulama Search Console verisinden bulduğu işleri tahmini kazanca göre sıralar. İşler türüne göre gruplanır ve her grubun başlığı kaç iş olduğunu söyler:

- "N sorgu ilk üçe yakın": ortalama sırası 4 ile 20 arasında olan, yeterli gösterimi bulunan sorgular. Marka aramaları bu listeye girmez. Sayfayı o sorguya göre güçlendirin.
- "N sonuç sırasına göre az tıklanıyor": sitenizin aynı sıradaki sorguları kadar tıklanmayanlar. Başlığı ve açıklamayı yeniden yazın.
- "N sorgudan gelen tıklama düştü" ve "N sayfanın tıklaması düştü": önceki döneme göre belirgin düşüş. Sıra da düştüyse içeriği güncelleyin. Sıra yerindeyse başlığı ve açıklamayı gözden geçirin.
- "N sayfa eski gücünü kaybediyor": son çeyrekte, önceki dört çeyreğin en iyisinin çok altına düşen sayfalar. Sayfayı tazeleyin.
- "N sayfa görünüyor ama hiç tıklanmıyor". Buradaki kazanç tahmini temkinlidir: sayfanın bulunduğu sıra aralığının değil, bir alt aralığın tıklama oranıyla hesaplanır. İkinci sayfada ve daha gerideki sayfalar için tahmin yapılmaz.
- "N sorguda artık görünmüyorsunuz": önceki dönemde tıklama alıp bu dönemde hiç gösterim almayanlar.
- "N cihazda geride kalıyorsunuz" ve "N ülkede geride kalıyorsunuz".
- "N günde olağan dışı düşüş": o günün tıklaması ya da gösterimi, önceki haftaların aynı gününe göre alışılmadık düşük.
- "Marka adınızı tanımlayın": hiç marka adı yoksa çıkar, marka aramalarını ayırmak içindir. Uygulama alan adınızdan önerdiği adlarla ayırıyorsa iş "Marka adını onayla" adıyla çıkar. Önerilen adlar doğruysa onaylayın, değilse markanızın adını girin.

Her grubun başlığındaki **Neden ve ne yapmalı** bölümü gerekçeyi ve ne yapacağınızı yazar. Satırda sıra numarası, bulgu, kanıt (örneğin "Sıra 8,2 · 640 gösterim · 12 tıklama"), "≈ +N tıklama" biçiminde olası kazanç ve bir güven etiketi (**Güven: yüksek**, orta ya da düşük) durur. Bir grupta ilk dört iş görünür, gerisi **Tümünü göster (N)** ile açılır.

Bir işi **Yapıldı** ile işaretlersiniz. İşaretlenenler "Yapıldı olarak işaretlenenler (N)" altına gider ve **Geri al** ile geri gelir. Yapıldı işaretleri yalnızca bu tarayıcıda saklanır. Satırdaki **Ayrıntı** (ya da **Bu kırılımı aç**) ilgili sorgunun, sayfanın, cihazın ya da ülkenin ayrıntısını açar. Aynı sorgu ya da sayfa için birden çok iş varsa üstteki toplam onu bir kez sayar.

### Sorgular ve Sayfalar

Aramalara ya da sayfalara göre tablo. Sütunlar: **Sorgu** (ya da **Sayfa**), **Tıklama**, **Tıklama farkı** (karşılaştırmaya göre), **Gösterim**, **Tıklama oranı** ve **Sıra**. Başlıklara basarak sıralarsınız. Satırın arkasındaki çubuk, satırın bu tablodaki tıklama payıdır. Üstteki kutuda satırlar arasında ararsınız. Yanında "{görünen} / {toplam} satır" yazar.

**Hızlı filtreler.** Sorgular için: **İlk 10'da**, **Sıra 4-10**, **Sıra 11-20**, **Tıklama oranı düşük**, **Hiç tıklanmayan**. Sayfalar için: **İlk 10'da**, **Tıklanan**, **Tıklama oranı düşük**, **Hiç tıklanmayan**. Tıklama oranı düşük, ilk sayfada çıkan, en az 100 gösterim alan ve oranı yüzde 2'nin altında kalan satır demektir.

**Satır menüsü.** Üç noktada: **Sayfayı yeni sekmede aç**, **Adresi kopyala**, **Kelimeyi kopyala**, **Kelime olarak kaydet**. Kaydettikleriniz **Kayıtlı kelimeler** ekranına gider. Satıra tıklamak ayrıntı panelini açar.

Tablonun altındaki not tabanı söyler: "okunan N sorgu, N tıklama. Sitenin toplamı N tıklama; aradaki fark Google'ın gizlediği sorgulardan." Google'ın satır sınırına ulaşılmışsa en az tıklanan uç listede yoktur ve not bunu yazar.

### Sıralama fırsatları

Dört bölüm var.

- **İlk üçe yakın sorgular.** Ortalama sırası 4 ile 20 arasında olan sorgular. Marka aramaları dahil değildir. Her biri bir basamak yükselirse (6-10'dan 4-5'e, 4-5'ten 2-3'e, 11-20'den ilk sayfaya) birlikte en fazla ne kadar ek tıklama getireceği yazar. Bu bir üst sınırdır. Toplam yalnızca listelenen satırları değil, bu aralıktaki her sorguyu kapsar. Hemen ardından hangi tarih aralığına ait olduğu yazar, örneğin "Dönem: 27 Eyl 2026 – 24 Eki 2026." Listede yalnızca en büyük kazançlılar varsa altında "En büyük kazançlı N tanesi listeleniyor." notu çıkar. Tabloda **Sorgu**, **Hedef sayfa**, **Sıra**, **Gösterim**, **Tıklama** ve **Olası kazanç** görünür. Hedef sayfa, Google'ın bu sorguda en çok gösterdiği sayfadır. Seçtiğiniz sorguları **Kelimeleri kopyala** ya da **Kelime olarak kaydet** ile alırsınız.
- **Sırasına göre az tıklanan sonuçlar.** Tıklama oranı, sitenizde aynı sıradaki sonuçların oranının yüzde 70'inin altında kalan sorgular. Sıra değişmeden yalnızca başlık ve açıklama yeniden yazılarak kazanılabilir. Tabloda aramanın oranı, **Bu sırada beklenen** oran ve olası kazanç yazar.
- **Görünen ama hiç tıklanmayan sayfalar.** Dönemde en az 100 gösterim alıp (28 gün için) tek tıklama almayan sayfalar.
- **Sitenizin sıraya göre tıklama oranı.** Yukarıdaki kazançların ölçüsü. Başka sitelerin değil, sizin sonuçlarınızın her sıradaki tıklama oranıdır. Bir sırada yeterli sorgu ve gösterim yoksa o sıra için "Yetersiz veri" yazar ve o sıra için tahmin yapılmaz. Marka adlarını tanımladıysanız bu oranlar marka dışı aramalardan hesaplanır.

### Değişimler

Seçili dönemle önceki dönemi karşılaştırır.

- **Önceki döneme göre en çok değişenler.** İki liste: **Düşenler (N)** ve **Yükselenler (N)**. Bir sorgunun ya da sayfanın listeye girmesi için tıklamasının en az 3 tıklama ve önceki değerinin yüzde 20'si kadar oynaması gerekir. Küçük oynamalar listeye girmez. Satırda önceki ve yeni tıklama, gösterim ve sıra yazar.
- **Yeni görünenler** ve **Kaybolanlar (önceki dönemdeki değerleriyle).** Yalnızca bir dönemde en az 50 gösterim (28 gün için) alan sorgular. Satır sınırı yüzünden bir dönemin tablosu eksikse hangi sorgunun yeni ya da kayıp olduğu bilinemez ve ekran bunu yazar.
- **Gücünü kaybeden sayfalar.** Son çeyrekteki (91 gün) tıklamaları, önceki dört çeyreğin en iyisinin yüzde 70'inden aza düşen ve geçen yılın aynı çeyreğinden de geride kalan sayfalar. Bu karşılaştırma bir yılı aşkın veri ister. Search Console o kadar eski veri vermediyse ya da filtre uygulandıysa ekran bunu söyler.
- **Uzun dönem: aylık tıklama.** Search Console 16 ay geriye gider. Uygulama günlük toplamları bu bilgisayarda daha uzun saklar. Çubuklar aylık tıklamayı gösterir. Kesik çizgili çubuk, arşivin o ayın tamamını tutmadığı aydır. Arşiv henüz doluyorsa ekran "Arşivde henüz gün yok" ya da başlangıç tarihini yazar. Bu bölüm cihaz filtresine uyar, ülke filtresine uymaz.

### Çakışmalar

Aynı aramada birden çok sayfanızın göründüğü durumları gösterir. Sayfalar birbirinin tıklamasını bölebilir. Çoğu zaman birini ana sayfa yapıp diğerlerinden ona bağlantı vermek yeter. Kartın başlığı "Aynı sorgu, birden çok sayfa" yazar.

- Üç kutu: **Birden çok sayfanın yarıştığı sorgu**, **Ana sayfa dışına giden gösterim** ve **En çok kaybettiren sorgu**. Son kutuya basarsanız liste o sorguya daralır.
- **Aynı sorguya yarışan sayfalar** tablosu her sorgu için sayfaları, tıklamalarını, gösterimlerini ve sıralarını gösterir. Google'ın o sorguda en çok gösterdiği sayfa "tercih edilen" sayılır. Diğerlerine giden gösterim payı "pay dışında" yazar.
- Bu analiz 28 güne bakar. 7 gün seçiliyse analiz için 28 güne çıkarılır ve gerçek tarih aralığı yazılır. Yalnızca en az 100 gösterim alan aramalar incelenir. Bir sayfanın yarışa girmesi için o aramada en az 10 gösterim ve yüzde 20 pay gerekir.
- Çakışmayı ararken Search Console'un satır sınırına takılırsak ekran "bakamadığımız sorgular kaldı" diye uyarır.

### Dağılım

- **Sıra dağılımı.** Sorgularınızın hangi sıralarda göründüğünü gruplar halinde gösterir. Arşivde en az iki hafta varsa altında **Haftalara göre sorgu dağılımı** çıkar. Bu grafik yalnızca Web aramaları içindir. Arama türü Görsel, Video ya da Haber seçiliyse yerinde "Haftalık dağılım yalnızca Web aramaları için." yazar. Bu grafik hafta hafta sıra gruplarının payını gösterir. Bilgisayarınızdaki sorgu arşivinden gelir. Cihaz ya da ülke filtresiyle gösterilmez, çünkü arşiv bu kırılımları tutmaz.
- **Marka ve marka dışı aramalar.** Adınızla gelen aramalar ile sizi bilmeden bulanlar ayrı ölçülür: **Marka aramaları** ve **Marka dışı aramalar**. Her biri için sorgu sayısı, tıklama, tıklama oranı ve ortalama sıra yazar. Marka adı tanımlı değilse "Marka aramaları ayrılmadı" der ve **Marka adını ekle** düğmesi çıkar. Uygulama alan adınızdan marka adı önerdiyse "Onaylanmadı." yazar. O zaman ölçüm önerilen adlarla yapılmıştır. **Önerileri onayla** deyin ya da **Marka adlarını düzenle**'yi kullanın. Paylar okunan sorgulara göredir, gizli sorgular dahil değildir.
- **Cihazlar** ve **Ülkeler.** Bir cihaza ya da ülkeye tıklayınca tüm ekran o cihaza ya da ülkeye göre daralır.
- **Arama görünümü.** Sonuçlarınızın Google'da hangi özel biçimlerle göründüğü (zengin sonuç, video gibi). Zengin sonuç, aramada ürün ya da video gibi ek bilgiyle çıkan sonuçtur. Google bu dökümü sayfa bazında toplar. Google hiç özel biçim bildirmediyse ekran bunu yazar.
- **Soru aramaları.** Soru kalıbındaki aramalar ve dört ya da daha çok kelimeli aramalar. İçerik fikirlerinin en net kaynağıdır.

**Marka adları.** Marka adını **Marka adlarını düzenle** ile girersiniz. Sitenizin adını ve insanların onu nasıl yazdığını girin, örneğin ad ve kısaltması. Bu kelimeleri içeren aramalar marka araması sayılır. **Kaydet** ve **Vazgeç** düğmeleri vardır, **Öneriler** satırından tek tıkla ad eklersiniz. Marka adı tanımlamak yalnızca bu ekranı değil, **Fırsatlar** ekranındaki kazanç tahminini de değiştirir. Çünkü o tahmin marka aramalarını dışarıda tutar.

**Ayrıntı paneli.** Bir sorguya ya da sayfaya tıklayınca (tabloda, Yapılacaklar'da, Sıralama fırsatları'nda ya da Değişimler'de) sağdan açılır. En üstte "tarih aralığı, kesin günler" yazar. Sonra dört sayı (Tıklama, Gösterim, Tıklama oranı, Ortalama sıra) ve seçili karşılaştırmaya göre değişimleri görürsünüz. Altında **Günlük tıklama** çizgisi durur. Sayfa için "Bu sayfanın sorguları (N)", sorgu için "Bu sorguda görünen sayfalar (N)" listesi çıkar. Her satırda tıklama ve sıra yazar. Bir sayfa için hiç sorgu listelenmiyorsa tıklamaları Google'ın gizlediği sorgulardan geliyor olabilir. Sorguları, sayfanın toplamından küçük çıkabilir, çünkü gizli sorgular listelenmez. **Sayfayı aç** sayfayı yeni sekmede açar. **Kelime olarak kaydet** sorguyu **Kayıtlı kelimeler**'e ekler.

## Nasıl kullanılır

1. Önce üstteki özet cümlesini okuyun. Tıklamalar artıyor mu azalıyor mu, burada yazar.
2. **Önce bunlar** şeridine ya da **Yapılacaklar** sekmesine bakın. İlk üç iş, en çok kazandıracak olanlardır.
3. Büyük bir düşüş varsa **Tarih aralığı**'nı **Son 3 ay** yapın. Grafikte düşüşün hangi gün başladığını bulun. O gün bir Google güncellemesi ya da kendi yaptığınız bir değişiklik varsa işaretlerde görünür.
4. **Sıralama fırsatları** sekmesinde **İlk üçe yakın sorgular**'a bakın. En çok gösterilen üç sorgunun sayfasını açın. Başlığı ve ilk paragrafı o aramaya göre düzeltin.
5. **Sorgular** sekmesinde **Tıklama oranı düşük** düğmesine basın. Sıranız iyi ama tıklayan yok. Sorun büyük ihtimalle başlık ve açıklamadadır.
6. **Değişimler** sekmesinde **Düşenler**'e bakın. En üstteki sorguya tıklayıp ayrıntı panelinde düşüşün başladığı günü görün.
7. **Çakışmalar** sekmesinde aynı aramada yarışan sayfaları görürseniz önce hangi sayfanın cevap vermesini istediğinize karar verin. Sonra iç bağlantıları o sayfaya yöneltin.
8. Bir düzeltme yapınca grafiğe **Not ekle** ile tarihini yazın. İki hafta sonra etkisini grafikte görürsünüz.
9. Bir iş bitince **Yapıldı** deyin. Liste kısalır.
10. Ayın sonunda **Raporu indir** ile görünümü kaydedin.

## Sayılar nasıl hesaplanır

Google veriyi üç gün geç verir. Aralık bu yüzden bugünde değil, üç gün öncesinde biter. Son günler ayrıca birkaç gün daha değişebilir. Uygulama bu günleri toplamlara katmaz. Önceki dönem, aynı uzunlukta ve bu aralığın hemen öncesindeki dönemdir. Geçen yıl karşılaştırmasında geçen yılın aynı günleri alınır. Tıklama ve gösterimdeki değişimi yüzde, tıklama oranındaki değişimi puan olarak görürsünüz.

Toplam kutuları sitenin gerçek toplamıdır. Tablolar ise aynı aramada çıkan her sayfayı ayrı sayar. Sayfa tablosunu toplarsanız kutudan büyük bir sayı bulursunuz. Bu hata değildir. Sorgu tablosunu toplarsanız kutudan küçük bir sayı bulursunuz, çünkü gizli sorgular listelenmez.

Google tek seferde en fazla 1.000 satır verir. Satır sınırına ulaşılmışsa en az tıklanan uç listede yoktur ve ekran bunu yazar.

**Olası kazanç.** Uygulama her aramaya sitenizin kendi tıklama oranını uygular. Aramanın bulunduğu sıradan bir basamak yukarısının oranı alınır, aramanın gösterimiyle çarpılır ve mevcut tıklama çıkarılır. Çok az gösterimi olan aramalar hesaba girmez (28 gün için en az 50 gösterim). Başlık sorunlarında ölçü, aramanın sitenin aynı sıradaki oranına ulaşmasıdır. Marka aramaları dışarıda tutulur. Bu yüzden her kazanç bir üst sınırdır. Aynı hesap **Fırsatlar** ekranında da kullanılır.

**Güven etiketi.** Her işin yanındaki etiket, bulgunun dayandığı verinin ne kadar sağlam olduğunu gösterir: yüksek, orta ya da düşük.

## Sık sorulanlar

**Son üç gün neden grafikte taralı?** Google o günleri henüz saymaya devam ediyor. Toplamlara katılmazlar. Birkaç gün sonra kesinleşirler.

**Tablo toplamı kartla tutmuyor.** Normaldir. Kart site toplamıdır. Sorgu tablosu gizli sorguları, sayfa tablosu birden çok sayfayı ayrı saydığı için farklı çıkar.

**Google'da aradığımda sıram farklı.** Buradaki sıra dönemin ortalamasıdır. Tek bir aramayı yansıtmaz.

**Aradığım sorgu listede yok.** Google çok az aranan sorguları gizler. Küçük sitelerde sorgu satırı hiç olmayabilir.

**Yapılacaklar listesinde bir iş neden kayboldu?** Yapıldı diye işaretlediyseniz "Yapıldı olarak işaretlenenler" altındadır. İşaretler yalnızca bu tarayıcıda saklanır. Başka tarayıcıda ya da bilgisayarda yeniden görürsünüz.

**Çakışma varsa sayfaları birleştireyim mi?** Çoğu zaman hayır. Önce hangi sayfanın cevap vermesini istediğinize karar verin. Sonra iç bağlantıları o sayfaya yöneltin. Sayfalar gerçekten aynı soruyu yanıtlıyorsa birleştirin.

**Marka adı girmek zorunda mıyım?** Hayır, ama girmezseniz sitenizin kendi adını arayanlar tıklama oranı hesabını bozar ve fırsatlar eksik çıkar. Ekran bunu "Marka adınızı tanımlayın" işiyle hatırlatır. Uygulama alan adınızdan önerdiği adları kullanıyorsa iş "Marka adını onayla" adıyla çıkar.

## Sınırlar

Discover ve Google Haberler arama türleri yer almaz. Arama hacmi ve rakip sırası da yoktur. Veri Google'dan 16 aydan eskiye gitmez. Daha eskisi için bu bilgisayardaki arşive bakın: **Değişimler** sekmesindeki uzun dönem grafiği ve **Sıralama takibi** ekranı arşivden okur. Yapıldı işaretleri ve notlar yalnızca bu kurulumda durur.

<!-- Kaynaklar: src/routes/_project/p/$projectId/search-performance.tsx; src/client/features/search-performance/SearchPerformancePage.tsx; SearchPageParts.tsx; SearchFilters.tsx; DataTrustStrip.tsx; SearchVerdict.tsx; KpiTiles.tsx; SearchTrendChart.tsx; TrendParts.tsx; SearchNotes.tsx; LongTermTrend.tsx; TodoTab.tsx; DimensionTab.tsx; DimensionTableParts.tsx; OpportunitiesTab.tsx; StrikingTable.tsx; ChangesTab.tsx; CannibalizationSummary.tsx; CannibalizationTable.tsx; DistributionTab.tsx; PositionDistribution.tsx; DrilldownPanel.tsx; BrandTerms.tsx; SearchReportButton.tsx; src/shared/searchInsights.ts; src/shared/searchTodoCopy.ts; src/shared/searchQuickFilters.ts; src/shared/dataFreshness.ts; src/serverFunctions/searchPerformance.ts; src/server/features/gsc/cannibalization.ts -->

Fırsatlar ve Sıralama takibi bağlantıları birebir URL/sorgu ayrıntısını kaynak tarihleriyle açar. Genel toplamlar mülk kapsamındadır; seçili kimliğin sayıları ayrıntı panelindedir. Okunamayan dönem başka tarihlerle değiştirilmez. Dönem ön ayarı seçmek tarih sabitlemesini kaldırır. Raporu indir, gösterilen tarihleri sunucuya gönderir ve yenileme sırasında kullanılamaz. Tarihler sabittir; Google yeniden okunan ölçümleri düzeltebilir.
