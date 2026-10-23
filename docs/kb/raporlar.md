---
title: Raporlar ve şablonlar
description: Denetimden indirdiğiniz ya da asistanınıza yazdırdığınız her rapor tek bir HTML dosyasıdır. Telefonda açarsınız, yazdırırsınız, e-postayla gönderirsiniz.
screen: Raporlar
route: /p/<proje>/reports
updated: 2026-10-22
---

Raporu nasıl alacağınızı, kime göndereceğinizi ve şablonla nasıl tekrarlayacağınızı burada bulursunuz.

Bu proje için hazırlanan her rapor **Raporlar** ekranında tek listede durur. Rapor iki yolla oluşur. Site denetimi ekranındaki **Raporu indir** düğmesi uygulamanın kendi raporunu üretir. Yapay zekâ asistanınız da araştırma yapıp bulduklarını rapor olarak kaydeder. Her rapor tek bir HTML dosyasıdır. İçinde betik (sayfada çalışan kod), dış kaynak ya da gömülü yazı tipi yoktur. Bu yüzden telefonda açılır, PDF olarak yazdırılır, e-postayla gönderilir. Uygulamada elle rapor yazabileceğiniz bir editör yok. Raporu ya uygulama ya asistan yazar.

## Ekranda neler var

**Üst çubuk.** **Yeni rapor iste** düğmesi, asistanınıza yapıştıracağınız bir metni panoya kopyalar.

**Filtreler.** Tümü, Son 7 gün, Şablonla yazılan ve Beceriyle yazılan filtreleri var. Bir de arama kutusu var.

**Tablo.** Sütunlar **Rapor**, **Tür**, **Oluşturulma** ve **Boyut**. **Tür** sütunu raporu hangi işin ürettiğini söyler. Örneğin "Site denetimi raporu" uygulamanın kendi raporudur. Şablonla yazılan raporlarda şablonun adını görürsünüz.

**Rapor sayfası.** Rapor kendi güvenli çerçevesinde açılır. Üç düğme var: **HTML olarak indir**, bağlantıyı kopyala ve yazdır. Bağlantı yalnızca bu kurulumda açılır, dışarıdan kimse erişemez.

**Rapor şablonları.** Menüden ya da Raporlar ekranından ulaşırsınız. Şablon, asistanınıza raporu nasıl yazacağını anlatan kayıtlı bir tariftir. Raporu kimin okuyacağını, hangi bölümlerin olacağını ve hangi dille yazılacağını söylersiniz. Üç alan var:

- **Ad** en çok 80 karakter olur ve projede tek olmalıdır.
- **Açıklama** en çok 200 karakter olur. Şablonun ne zaman kullanılacağını tek cümleyle yazın.
- **Yönerge** en çok 3.000 karakter olur.

Bir projede en çok 10 şablon olabilir. Şablonu silerseniz ondan üretilmiş raporlar silinmez.

## Nasıl kullanılır

1. İlk rapor için Site denetimi ekranında **Raporu indir**'i tıklayın. Rapor bilgisayarınıza iner ve bu listeye düşer. "Bu hafta yapılacak N şey" bölümüyle başlar.
2. Asistanla çalışıyorsanız **Yeni rapor iste**'yi tıklayın. Kopyalanan metni Claude Code'a, Codex'e ya da Cursor'a yapıştırın. Asistan hangi raporu istediğinizi sorar, veriyi okur, raporu buraya kaydeder.
3. Her ay aynı raporu istiyorsanız bir şablon yazın. Yönergeye okuyucuyu ("siteyi işleten kişi, SEO bilmiyor"), bölümleri, sırayı ve tonu yazın. Şablonu adıyla istediğinizde asistan onu uygular.
4. Paylaşmak için **HTML olarak indir**'i tıklayıp dosyayı gönderin. Alan kişi dosyayı tarayıcıda açar. Bağlantıyı kopyalamak yalnızca aynı bilgisayarda işe yarar.
5. Eski raporları silmeyin. Asistan bir sonraki görüşmede önceki raporun özetini okuyup karşılaştırır.

## Sayılar nasıl hesaplanır

Denetim raporu A4 baskıya göre dizilir. İçindekiler, "Bu hafta yapılacak N şey", sorunlar, hız ölçümü, Google dizin durumu ve site haritası bölümleri var. Dizin durumu bölümü yalnızca kayıtlı cevapları kullanır, Google'a yeni soru sormaz.

Listelerin sınırı var: sorun başına 50 adres, 300 sayfa, 50 hız satırı, ekte 3.000 adres. Dosya 400 KB'yi aşarsa listeler kısalır.

Bir rapor en çok 500.000 bayt olabilir (80 KB altı önerilir). Başlık en çok 120 karakterdir ve projede tektir. Özet en çok 2.500 karakterdir. Aynı başlıkla ikinci rapor kabul edilmez. Projede en çok 10.000 rapor tutulur, kurulumda da toplam 5 GB yer ayrılır.

Güvenlik için, içinde betik, iframe (sayfaya başka sayfa gömen kutu), form, dış stil, olay işleyici (onclick gibi), javascript: bağlantısı ya da otomatik yönlendirme olan dosyalar kaydedilirken reddedilir. Rapor açılırken de kapalı bir kutuda ve ağ erişimi olmadan gösterilir. Yani rapor sizden habersiz dışarıya bir şey gönderemez.

## Sık sorulanlar

**Raporu kim yazdı?** **Tür** sütununa bakın. "Site denetimi raporu" uygulamanındır, diğerlerini asistan yazmıştır. Rapor sayfasında da kimin kaydettiği görünür.

**Raporu düzenleyebilir miyim?** Uygulamada düzenleyemezsiniz. Asistana "şu bölümü değiştir" deyin, o raporu günceller.

**Bağlantıyı gönderdim, karşı taraf açamıyor.** Bağlantı yalnızca bu bilgisayarda çalışır. Dosyayı **HTML olarak indir** ile gönderin.

**Şablon yazarken neye dikkat edeyim?** Şablon bir biçim tarifidir, bilgi kaynağı değildir. Bölümleri, tonu ve raporun kime yazıldığını yazın. Sayı ya da iddia yazmayın. Asistan sayıları her seferinde veriden alır.

## Sınırlar

Raporlar dışarıya yayımlanmaz. Paylaşmak için dosyayı gönderirsiniz. Raporun doğruluğu, onu yazanın okuduğu veriye bağlıdır. Asistan raporlarının sonunda "Bu rapor nasıl hazırlandı" bölümü bulunur. Hangi aracın neyi söylediğini orada görürsünüz. Şüphe duyduğunuz bir sayının kaynağını oradan izleyin.

<!-- Kaynaklar: src/routes/_project/p/$projectId/reports/index.tsx; reports/$reportId.tsx; reports/templates.tsx; src/client/features/reports/ReportsList.tsx; reportStats.ts; reportRequestPrompt.ts; src/server/features/reports/services/ReportService.ts; src/types/schemas/reports.ts; src/types/schemas/report-templates.ts; src/routes/r/$reportId.ts; src/shared/report-sandbox.ts; src/server/features/audit/report/buildAuditReportHtml.ts -->
