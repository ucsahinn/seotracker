---
title: Raporlar ve şablonlar
description: Denetim, arama performansı ve asistan raporlarını tek HTML dosyasında saklayın. Raporları telefonda açın, yazdırın veya e-postayla paylaşın.
screen: Raporlar
route: /p/<proje>/reports
updated: 2026-10-28
---

Her rapor, bu projeye kaydedilmiş tek bir HTML belgesidir. Raporu açmak Google verisini yenilemez. Kaydetme zamanı, içindeki verinin ölçüldüğü dönemle aynı şey değildir.

## Rapor hazırlamanın üç yolu

- **Arama raporu hazırla**, Arama performansı ekranını açar. Dönemi, cihazı, ülkeyi ve arama türünü seçip **Raporu indir** düğmesine basın.
- **Denetim raporu hazırla**, Site denetimi ekranını açar. Bir denetim seçip raporunu indirin.
- **Rapor komutunu kopyala**, ajanınıza yapıştıracağınız komutu kopyalar. Ajan projeyi inceler ve raporu buraya kaydeder.

Rapor önce kaydedilir, sonra indirilir. İndirme başarısız olursa dosyayı listeden yeniden indirebilirsiniz. Google bağlantısı kesilse de kayıtlı raporlar açılır.

## Şablonlar

Şablon, ajana bir raporu nasıl yazacağını anlatan yönergedir: raporun kime yazıldığı ve hangi bölümlerden oluştuğu. Şablonlar raporu kendiliğinden üretmez ve zamanlamaz.

- Ad en fazla 80, açıklama 200, yönerge 3.000 karakterdir.
- Bir projede en fazla 10 şablon olur.
- Şablonu silmek, onunla yazılmış raporları silmez.

## Rapor listesi

Listenin üstündeki **Kaydedilmiş rapor** kartı en son güncellenen raporu gösterir: başlık, kayıtlı özet, kaydetme zamanı, **Raporu aç** ve **HTML olarak indir**. Bu kart sitenin güncel durumu değildir. Raporun kaynak sitesi doğrulanabiliyorsa **Kaynak site** yazar; projenin sitesinden farklıysa uyarı çıkar. Doğrulanamıyorsa raporun başka bir siteye ait olabileceği belirtilir.

**Raporlarda ara** başlık ve özette arar. Tür düğmeleri (**Arama performansı raporu**, **Site denetimi raporu**, **Ajanın yazdığı raporlar** ve diğerleri) arama ile **Son 7 gün** süzgecinden sonra kalan sayıları gösterir. **Son 7 gün**, son yedi günde yazılan ya da güncellenen dosyalardır; Google verisinin güncelliğini göstermez.

Liste 25'er kayıtlık sayfalar halinde gelir; **Önceki sayfa** ve **Sonraki sayfa** ile ilerleyin. Varsayılan sıra son güncellemedir, bu yüzden güncellenen eski bir rapor yukarı çıkar. Oluşturulma zamanına ya da başlığa göre de sıralayabilirsiniz. Arama, tür, süzgeç, sıralama ve sayfa adres çubuğunda saklanır.

Projede hiç rapor yoksa liste yerine ilk raporu hazırlama bağlantıları görünür. Raporlar yalnızca bir süzgeç yüzünden gizleniyorsa **Filtreleri temizle** görünür.

### Eski raporlar

Eski sürümlerin ürettiği arama ve denetim belgeleri aynı oluşturucu işaretini taşır, türleri kayıtlı değildir. Bunlar **Eski rapor · kaynak ve tarih doğrulanmamış** etiketiyle listelenir. Türleri ve veri dönemleri başlıktan tahmin edilmez; dönemi belgenin içinden kontrol edin. Eski raporların başlığına eklenmiş teknik kimlik listede gizlenir; kayıtlı dosya değişmez.

Yeni raporlarda tür kaydedilir. Arama raporu mülk, kesin tarihler ve süzgeçlerle; denetim raporu denetim kimliğiyle tanımlanır.

## Açma, indirme ve yazdırma

Rapor, ağ ve betik izni kapalı güvenli bir çerçevede açılır. **Kaynak ve kayıt bilgileri** oluşturucuyu, türü, boyutu ve kayıt zamanlarını gösterir. Boyut, kayıtlı HTML'nin bayt sayısıdır.

- **HTML olarak indir** internetsiz açılabilen dosyayı kaydeder.
- **PDF olarak kaydet (yazdır)** tarayıcının yazdırma sekmesini açar. Sekme engellenirse açılır pencerelere izin verin ya da **Yeni sekmede aç** ile açıp oradan yazdırın.
- **Tam ekran** raporu ekranı kaplayacak şekilde açar; üstte ve altta çıkış düğmesi vardır.

Rapor bağlantısı yalnızca bu kurulumda çalışır. Bir raporu başkasıyla paylaşmak için HTML dosyasını gönderin.

Önizleme 15 saniyede açılmazsa **Yeniden dene** ve **Yeni sekmede aç** seçenekleri çıkar. Liste yenilenemezse son alınan kayıtlar bir uyarıyla ekranda kalır.

## Yeniden hazırlama

Rapor kaydedildiği dilde ve kaydedildiği verilerle kalır. Güncel veri ya da başka bir dil için raporu kaynak ekranından yeniden hazırlayın. Aynı kaynaktan yeniden hazırlanan rapor aynı kaydı günceller.

Uygulamanın ürettiği raporları ajanlar `save_report` ile değiştiremez. Ajanın kaydettiği bir rapor, mevcut bir raporla aynı başlığı taşıyorsa reddedilir ve eski belge korunur.

**Site denetimlerini aç** denetim geçmişini açar. Oradan uygun bir denetimin raporunu indirebilirsiniz; bağlantı kendiliğinden yeni denetim ya da rapor başlatmaz.

## Arama raporunun içeriği

Kapak, çözümlenmiş gerçek dönemi, önceki dönemi, süzgeçleri ve oluşturulma zamanını yazar. Günler Pasifik saatine göredir. Google kesinleşme sınırı bildirmediyse son günlerin varsayımla dışarıda bırakıldığı yazılır.

Veri rapor hazırlanırken Google'dan yeniden okunur. Google geçmiş değerleri düzeltebileceği için rapor, daha önce ekranda gördüğünüz sayılarla birebir aynı olmayabilir.

- **Listelenmeyen tıklama payı**, Google'ın gizlediği sorguları ve satır sınırı dışında kalanları birlikte kapsar.
- Sorgu, sayfa ve sorgu-sayfa tablolarının satır sınırı vardır. Site toplamı bu tabloların toplamı değildir.
- Çakışma analizi kendi dönemini ve eşiklerini, sonuç sıfır olsa bile yazar. Yedi günlük raporda bu analiz 28 günlük veri kullanabilir. Bir sorguda birden çok sayfanın görünmesi tek başına tıklama kaybı kanıtı değildir.
- Alınamayan veri sıfır olarak sunulmaz. Kısaltılmış listeler gözlenen kayıt sayısını ve gösterilen kısmı yazar.

## Denetim raporunun içeriği

Denetim raporunun yöntem bölümü taramanın, hız ölçümünün ve isteğe bağlı Google verisinin tarihlerini yazar. Kullanılan Search Console trafik dönemi, kaynağın satır sınırı ve kayıtlı mobil CrUX (gerçek kullanıcı hız verisi) ölçümü de burada belirtilir. Eksik kaynak verisi sıfır sayılmaz.

## Saklama sınırları

- Bir rapor en fazla 500.000 bayt olabilir. Başlık en fazla 120, özet en fazla 2.500 karakterdir.
- Bir projede en fazla 10.000 rapor, tüm kurulumda en fazla 5 GB rapor saklanır.

Bu sınırlar diski korumak içindir; SEO başarısıyla ilgisi yoktur.
