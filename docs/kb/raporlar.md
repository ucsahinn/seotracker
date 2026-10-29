---
title: Raporlar ve şablonlar
description: Denetim, arama performansı ve asistan raporlarını tek HTML dosyasında saklayın. Raporları telefonda açın, yazdırın veya e-postayla paylaşın.
screen: Raporlar
route: /p/<proje>/reports
updated: 2026-10-28
---

Raporlar, bu proje için kaydedilmiş HTML belgeleridir. Uygulama her açışta Google verisini yenilemez. Kaydetme zamanı, kaynak verinin ölçüm tarihi değildir.

## Rapor hazırlama

**Arama raporu hazırla**, Arama performansı ekranını açar. Dönem, cihaz, ülke ve arama türünü seçip **Raporu indir** kullanın. **Denetim raporu hazırla**, Site denetimi ekranına gider; seçili taramadan rapor alın. **Rapor komutunu kopyala**, asistanınıza yapıştıracağınız isteği kopyalar. Şablonlar, asistana raporun nasıl yazılacağını anlatır; uygulamanın raporlarını otomatik üretmez ve zamanlamaz.

Rapor önce kaydedilir, sonra indirilir. İndirme başarısız olursa kaydedilen dosyayı listeden tekrar indirebilirsiniz. Kaynak bağlantısı kesilse de kayıtlı raporlar okunabilir.

Projede henüz rapor yoksa arama, tür ve sayfalama yerine ilk raporu hazırlama bağlantıları gösterilir. Kayıtlı raporlar yalnızca bir filtre nedeniyle görünmüyorsa filtre temizleme düğmesi kalır. Eski uygulama raporlarının başlığına eklenmiş teknik kimlik listede ve son rapor özetinde gizlenir; kayıtlı başlık ve dosya değişmez.

## Listeyi okuma

Üstte **Kaydedilmiş rapor** vardır: başlık, kayıtlı özet, kaydetme zamanı, açma ve HTML indirme düğmeleri. Özet yoksa açıkça belirtilir. Yapılandırılmış veri dönemi eski raporlarda bulunmadığı için dönem ve veri sınırları belgenin içinde kontrol edilir; başlıktan veya HTML'den tahmin edilmez.

Arama başlık ve kayıtlı özeti tarar. Tür düğmeleri, arama ve Son 7 gün süzgecinden sonraki sayıları gösterir; seçili türden önce hesaplanır. Son 7 gün, o sürede yazılan veya güncellenen ayrı dosyalar demektir, düzenleme sayısı ya da Google verisinin güncelliği değildir. Sonuç sayısı ve projedeki toplam ayrı gösterilir.

Liste sunucudan 25 kayıtlık sayfalar alır; 100. rapordan sonrası da aranabilir ve açılabilir. **Önceki** ve **Sonraki** ile ilerleyin. Varsayılan sıra son güncellemedir; eski bir dosya güncellenince yukarı çıkar. Oluşturulma zamanı veya başlığa göre de sıralanır. Arama, tür, Son 7 gün, sıralama ve sayfa URL'de kalır; geri dönme ve yenileme bu seçimi korur.

Uygulamanın eski Arama ve Denetim belgeleri aynı oluşturucu işaretini taşır. Bu yüzden **Eski rapor · kaynak ve tarih doğrulanmamış** yazılır; hepsi Denetim sayılmaz. Asistan becerisi ve şablon adı kayıtlıysa görünür. Dosya sayısı SEO başarısı değildir. Boyut, kayıtlı HTML'nin bayt sayısıdır; indirmedeki güvenlik başlıkları dosyayı biraz büyütebilir.

## Açma, indirme ve yazdırma

Rapor güvenli, ağ ve betik yetkisi kapalı bir çerçevede açılır. **Kaynak ve kayıt bilgileri**, oluşturucu, tür, boyut ve kayıt zamanlarını açar. Rapor kaydedildiği dilde kalır. Başka dil veya güncel veri için kaynak ekrandan bilinçli olarak yeniden hazırlayın.

**HTML olarak indir**, çevrimdışı açılabilen dosyayı kaydeder. **PDF olarak kaydet (yazdır)** tarayıcı yazdırma sekmesini açar. Sekme engellenirse açılır pencerelere izin verin veya **Yeni sekmede aç** ile tarayıcıdan yazdırın. **Tam ekran** arka planı klavye odağından çıkarır; üstte ve altta çıkış düğmesi vardır. Bağlantı aynı kuruluma aittir; başkasına paylaşmak için HTML dosyasını gönderin.

Önizleme 15 saniyede açılmazsa yeniden deneme ve yeni sekmede açma seçenekleri çıkar. Silinen veya erişilemeyen belge, bağlantı hatası ve indirme sunucu hatası için kurtarma mesajı gösterilir. Liste yenilenemezse son alınan kayıtlar uyarıyla korunur. Saklama bilgisi alınamaması boş alan bulunduğu anlamına gelmez.

## Arama raporunun sınırları

Kapak gerçek çözümlenmiş dönemi, önceki dönemi, süzgeçleri ve oluşturulma zamanını gösterir. Günler Pasifik saatine göredir. Google kesinleşme sınırı bildirmediyse son günlerin gecikme varsayımıyla dışarıda bırakıldığı yazılır. Listelenmeyen tıklama payı, satır sınırı varsa gizlenen ve sınır dışındaki sorguları birlikte kapsar. Sorgu, sayfa ve sorgu×sayfa sınırları fırsatları etkileyebilir; site toplamı bu tabloların toplamı değildir.

Çakışma analizi kendi dönemini ve eşiklerini sıfır sonuçta bile açıklar. Yedi günlük ana raporda bu analiz 28 gün kullanabilir. Birden çok sayfanın görünmesi kayıp tıklama veya zarar kanıtı değildir. Alınamayan uzun dönem veya görünüm verisi sıfır diye sunulmaz. Kesilen listeler gözlenen kayıt sayısını ve gösterilen kısmı belirtir. İstek bütçesi Arama görünümüne aittir; ek çakışma analizi ve önbellek etkileri toplam ağ isteği sayısını değiştirir.

Veriler rapor hazırlanırken yeniden okunur. Google geçmiş değerleri düzeltebilir ve dönem yeniden çözümlenebilir; önceki ekranla birebir aynı ölçüm garantisi yoktur. Aynı yerelleştirilmiş başlık güncellenebilir; dil değişimi ayrı belge oluşturabilir. Uzun başlıklar saklama sınırına uyar; farklı kaynak ve süzgeçlerin çakışmasını önleyen sunucu damgası taşır.

## Şablonlar ve saklama

Şablon adı en çok 80, açıklaması 200, yönergesi 3.000 karakterdir. Projede en çok 10 şablon bulunur. Şablonu silmek raporlarını silmez; arama sonucunu **Aramayı temizle** ile sıfırlayın.

Bir rapor en çok 500.000 bayt, başlık 120 ve özet 2.500 karakterdir. Projede 10.000 rapor ve kurulum genelinde 5 GB koruma sınırı vardır. Bunlar dosya saklama korumalarıdır, SEO kapsamı veya başarı ölçüsü değildir. Denetim raporundaki tarama, hız ve isteğe bağlı Google verisinin tarihlerini belgenin kendi yöntem bölümünden kontrol edin.

## Kaynak türü ve yeniden hazırlama

Yeni yerel raporlarda Arama performansı ve Site denetimi ayrı türler olarak kaydedilir. Eski uygulama raporlarının türü başlıktan tahmin edilmez. Arama raporunun kaynak kimliği mülk, kesin tarihler ve filtrelerden; denetim raporununki denetim kimliğinden oluşur. Aynı kaynak başka bir dilde yeniden hazırlanırsa aynı kayıt güncellenir ve raporun dili değişebilir. Ajan raporlarıyla başlık çakışmaları reddedilir; eski bir belge aynı başlığı kullanıyorsa o belge korunur ve yeni kayıt reddedilir.

Native raporları kaynak ekranından yeniden hazırlayın; ajanlar `save_report` ile içeriklerini değiştiremez. Eksik kaynak verisi sıfır kabul edilmez. Denetim yöntemi kullanılan GSC trafik dönemini, kaynağın satır sınırını ve mevcut kayıtlı mobil CrUX ölçümünü belirtir.

Üstteki **Kaydedilmiş rapor**, sitenin güncel özeti değildir. Kaynak denetimin sitesi doğrulanabiliyorsa gösterilir; projenin sitesiyle farklıysa uyarılır. Kaynak doğrulanamıyorsa başka bir siteye ait olabileceği açıkça yazılır. **Eski rapor · kaynak ve tarih doğrulanmamış** belgelerinin türü başlıktan tahmin edilmez. **Site denetimlerini aç** bağlantısı denetim geçmişini açar. Uygun bir kayıtlı denetim varsa onu açıp raporunu indirebilirsiniz; bağlantı kendiliğinden yeni denetim veya rapor başlatmaz. Eski dosya değiştirilmez.
