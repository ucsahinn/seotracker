---
title: Raporlar ve şablonlar
description: Denetimden ya da Arama performansı ekranından indirdiğiniz ve asistanınıza yazdırdığınız her rapor tek bir HTML dosyasıdır. Telefonda açarsınız, yazdırırsınız, e-postayla gönderirsiniz.
screen: Raporlar
route: /p/<proje>/reports
updated: 2026-10-27
---

Raporu nasıl alacağınızı, kime göndereceğinizi ve şablonla nasıl tekrarlayacağınızı burada bulursunuz.

Bu proje için hazırlanan her rapor **Raporlar** ekranında tek listede durur. Rapor üç yolla oluşur. Site denetimi ekranındaki **Raporu indir** düğmesi denetimin raporunu, Arama performansı ekranındaki **Raporu indir** düğmesi ekrandaki görünümün raporunu üretir. Yapay zekâ asistanınız da araştırma yapıp bulduklarını rapor olarak kaydeder. Her rapor tek bir HTML dosyasıdır. İçinde betik (sayfada çalışan kod), dış kaynak ya da gömülü yazı tipi yoktur. Bu yüzden telefonda açılır, PDF olarak yazdırılır, e-postayla gönderilir. Uygulamada elle rapor yazabileceğiniz bir editör yok. Raporu ya uygulama ya asistan yazar.

## Ekranda neler var

**Üst çubuk.** **Yenile**, **Rapor komutunu kopyala** ve **Şablonlar** düğmeleri. **Rapor komutunu kopyala**, asistanınıza yapıştıracağınız bir metni panoya alır. Henüz rapor yoksa bu düğme boş durum kartının içindedir.

**Özet kutuları.** Üç kutu var.

- **Son rapor**: en son yazılan ya da güncellenen raporun ne kadar önce olduğunu söyler. Altındaki bağlantı raporu açar.
- **Son 7 günde**: bu sürede yazılan ya da güncellenen rapor sayısı.
- **Toplam**: tüm raporlar. Altında kaçının denetim raporu, kaçının beceriyle, kaçının şablonla yazıldığı görünür.

**Türe göre raporlar.** Halka grafik raporları türe göre böler. Bir türe tıklayınca liste o türdeki raporlarla sınırlanır. Yeniden tıklarsanız süzgeç kalkar.

**Nasıl çalışır?** Kapalı gelen kısa bir açıklama. Ajanın yazdığı raporlarla Site denetimi raporunun farkını anlatır.

**Filtreler.** Tümü, Son 7 gün, Şablonla yazılan ve Beceriyle yazılan. Yanında **Raporlarda ara** kutusu vardır.

**Tablo.** Sütunlar **Rapor**, **Tür**, **Oluşturuldu** ve **Boyut**. Başlıklara tıklayarak sıralarsınız. **Tür** sütunu raporu hangi işin ürettiğini söyler. Örneğin "Site denetimi raporu" uygulamanın kendi raporudur. Asistanın yazdıkları "SEO denetimi", "Dönem karşılaştırması", "Trafik düşüşü incelemesi", "SEO raporu", "Koçluk notu" ya da "Proje kurulumu" gibi adlar taşır. Türü belli olmayan rapor "Belirtilmemiş" yazar. Şablonla yazılan raporlarda şablonun adını görürsünüz. Liste en son 100 raporu gösterir. Daha fazlası varsa altında bunu söyleyen bir not çıkar.

**Rapor sayfası.** Rapor kendi güvenli çerçevesinde açılır. Düğmeler: **HTML olarak indir**, **PDF olarak kaydet (yazdır)**, **Yeni sekmede aç**. **Diğer işlemler** menüsünde **Bağlantıyı kopyala** vardır. Bağlantı yalnızca bu kurulumda açılır, dışarıdan kimse erişemez. Sayfada raporu kimin oluşturduğu, türü, oluşturulma ve güncellenme zamanı ve boyutu da yazar.

**Rapor şablonları.** **Şablonlar** düğmesinden ulaşırsınız. Şablon, asistanınıza raporu nasıl yazacağını anlatan kayıtlı bir tariftir. Raporu kimin okuyacağını, hangi bölümlerin olacağını ve hangi dille yazılacağını söylersiniz. Üç alan var:

- **Ad** en çok 80 karakter olur ve projede tek olmalıdır.
- **Açıklama** en çok 200 karakter olur. Şablonun ne zaman kullanılacağını tek cümleyle yazın.
- **Yönerge** en çok 3.000 karakter olur.

Bir projede en çok 10 şablon olabilir. Şablonu silerseniz ondan üretilmiş raporlar silinmez.

## Uygulamanın kendi raporları

**Site denetimi raporu.** Denetim ayrıntısındaki **Raporu indir** üretir. Denetim yarım kalmışsa raporun başlığına "(eksik)" eklenir. Örneğin "ornek.com site denetimi (eksik)". Böyle bir raporun kapağında "Rapor eksik olabilir." uyarısı ve nedeni yazar: denetim hata verip durdu, hâlâ çalışıyor ya da hiç sayfa taranamadı. Eksik raporda puan bölümleri yoktur. Tarama sitenin istek sınırı yüzünden erken durduysa kapakta "Eksik denetim, puan verilmedi" yazar. Ölçülen kontroller azsa puan "Kısmi puan" olarak, ölçüm kapsamıyla birlikte yazılır. Raporun özeti de bu durumu belirtir. Asistan raporları listede okurken eksik olduğunu böylece anlar.

**Arama performansı raporu.** Arama performansı ekranındaki **Raporu indir** üretir. Rapor, ekranda o anda gördüğünüz görünümü (dönem, cihaz, ülke, arama türü) yazdırılabilir bir belgeye çevirir. Kapakta kesin günler, karşılaştırma, süzgeçler, son veri tarihi ve oluşturulma zamanı yazar. Sonra dört toplam, "Verinin durumu" kutusu, **Önce bunlar** işleri, **Zaman içinde** grafiği (Google güncellemeleri ve notlar işaretli), fırsatlar, değişimler ve aynı sorguda yarışan sayfalar gelir. Rakamlar ekrandakiyle aynıdır. Aynı site, tarih aralığı ve süzgeçlerle yeniden almak yeni bir rapor eklemez. Uygulamanın eski raporunu yeniler. Rapor saklama sınırını aşarsa daha kısa bir dönem ya da süzgeç seçmeniz istenir.

İki rapor da önce kaydedilir, sonra bilgisayarınıza iner. İndirme bir sebeple başarısız olursa rapor yine **Raporlar** listesindedir. Oradan indirirsiniz.

## Nasıl kullanılır

1. İlk rapor için Site denetimi ekranında **Raporu indir**'i tıklayın. Rapor bilgisayarınıza iner ve bu listeye düşer. "Bu hafta yapılacak N şey" bölümüyle başlar.
2. Arama durumunuzu belgelemek için Arama performansı ekranında dönemi ve süzgeçleri ayarlayın, sonra **Raporu indir**'i tıklayın.
3. Asistanla çalışıyorsanız **Rapor komutunu kopyala**'yı tıklayın. Kopyalanan metni Claude Code'a, Codex'e ya da Cursor'a yapıştırın. Asistan hangi raporu istediğinizi sorar, veriyi okur, raporu buraya kaydeder.
4. Her ay aynı raporu istiyorsanız bir şablon yazın. Yönergeye okuyucuyu ("siteyi işleten kişi, SEO bilmiyor"), bölümleri, sırayı ve tonu yazın. Şablonu adıyla istediğinizde asistan onu uygular.
5. Paylaşmak için **HTML olarak indir**'i tıklayıp dosyayı gönderin. Alan kişi dosyayı tarayıcıda açar. Bağlantıyı kopyalamak yalnızca aynı bilgisayarda işe yarar.
6. Eski raporları silmeyin. Asistan bir sonraki görüşmede önceki raporun özetini okuyup karşılaştırır.

## Sayılar nasıl hesaplanır

Denetim raporu A4 baskıya göre dizilir. İçindekiler, "Bu hafta yapılacak N şey", sorunlar, hız ölçümü, Google dizin durumu ve site haritası bölümleri var. Dizin durumu bölümü yalnızca kayıtlı cevapları kullanır, Google'a yeni soru sormaz.

Listelerin sınırı var: sorun başına 50 adres, 300 sayfa, 50 hız satırı, ekte 3.000 adres. Dosya 400 KB'yi aşarsa listeler kısalır.

Bir rapor en çok 500.000 bayt olabilir (80 KB altı önerilir). Başlık en çok 120 karakterdir ve projede tektir. Özet en çok 2.500 karakterdir. Aynı başlıkla ikinci rapor kabul edilmez. Projede en çok 10.000 rapor tutulur, kurulumda da toplam 5 GB yer ayrılır.

Güvenlik için, içinde betik, iframe (sayfaya başka sayfa gömen kutu), form, dış stil, olay işleyici (onclick gibi), javascript: bağlantısı ya da otomatik yönlendirme olan dosyalar kaydedilirken reddedilir. Rapor açılırken de kapalı bir kutuda ve ağ erişimi olmadan gösterilir. Yani rapor sizden habersiz dışarıya bir şey gönderemez.

## Sık sorulanlar

**Raporu kim yazdı?** **Tür** sütununa bakın. "Site denetimi raporu" uygulamanındır, diğerlerini asistan yazmıştır. Rapor sayfasında da kimin kaydettiği görünür.

**Başlıkta "(eksik)" yazıyor, ne yapmalıyım?** Denetim yarım kalmıştır. Raporun kapağı nedenini yazar. Denetimi yeniden çalıştırıp raporu yeniden indirin.

**Raporu düzenleyebilir miyim?** Uygulamada düzenleyemezsiniz. Asistana "şu bölümü değiştir" deyin, o raporu günceller.

**Bağlantıyı gönderdim, karşı taraf açamıyor.** Bağlantı yalnızca bu bilgisayarda çalışır. Dosyayı **HTML olarak indir** ile gönderin.

**Şablon yazarken neye dikkat edeyim?** Şablon bir biçim tarifidir, bilgi kaynağı değildir. Bölümleri, tonu ve raporun kime yazıldığını yazın. Sayı ya da iddia yazmayın. Asistan sayıları her seferinde veriden alır.

## Sınırlar

Raporlar dışarıya yayımlanmaz. Paylaşmak için dosyayı gönderirsiniz. Raporun doğruluğu, onu yazanın okuduğu veriye bağlıdır. Asistan raporlarının sonunda "Bu rapor nasıl hazırlandı" bölümü bulunur. Hangi aracın neyi söylediğini orada görürsünüz. Şüphe duyduğunuz bir sayının kaynağını oradan izleyin.

<!-- Kaynaklar: src/routes/_project/p/$projectId/reports/index.tsx; reports/$reportId.tsx; reports/templates.tsx; src/client/features/reports/ReportsList.tsx; ReportsSummary.tsx; ReportKindsHelp.tsx; ReportKindChip.tsx; reportStats.ts; reportRequestPrompt.ts; src/client/features/search-performance/SearchReportButton.tsx; src/serverFunctions/searchReport.ts; src/server/features/search/report/buildSearchReportHtml.ts; src/server/features/reports/services/ReportService.ts; src/types/schemas/reports.ts; src/types/schemas/report-templates.ts; src/routes/r/$reportId.ts; src/shared/report-sandbox.ts; src/server/features/audit/report/buildAuditReportHtml.ts; reportCoverSection.ts -->
