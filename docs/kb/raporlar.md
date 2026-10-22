---
title: Raporlar ve şablonlar
description: Denetimden indirdiğiniz ya da asistanınıza yazdırdığınız raporlar tek HTML dosyasıdır. Telefonda açılır, yazdırılır, paylaşılır.
screen: Raporlar
route: /p/<proje>/reports
updated: 2026-10-22
---

Bu sayfada raporları nasıl alacağınızı, paylaşacağınızı ve şablonla nasıl tekrarlayacağınızı öğrenirsiniz.

**Raporlar** ekranı bu proje için üretilen her raporu tek listede tutar. Rapor iki yoldan oluşur. Site denetimi ekranındaki **Raporu indir** düğmesi uygulamanın kendi raporunu üretir. Yapay zekâ asistanınız ise araştırma yapıp bulduklarını rapor olarak kaydeder. Her rapor tek bir HTML dosyasıdır. İçinde betik (sayfada çalışan kod), dış kaynak ya da gömülü yazı tipi yoktur. Bu yüzden telefonda açılır, PDF olarak yazdırılır, e-postayla gönderilir. Uygulamada elle rapor yazacağınız bir editör yoktur. Raporu ya uygulama ya asistan yazar.

## Ekranda neler var

**Üst çubuk.** **Yeni rapor iste** düğmesi, asistanınıza yapıştıracağınız bir metni panoya kopyalar.

**Filtreler.** Tümü, Son 7 gün, Şablonla yazılan, Beceriyle yazılan. Arama kutusu da var.

**Tablo.** **Rapor**, **Tür**, **Oluşturulma** ve **Boyut** sütunları var. **Tür**, raporu hangi işin ürettiğini söyler. Örneğin "Site denetimi raporu" uygulamanın kendisidir. Şablonla yazılan raporlarda şablonun adı görünür.

**Rapor sayfası.** Rapor kendi güvenli çerçevesinde açılır. Düğmeler: **HTML olarak indir**, bağlantıyı kopyala ve yazdır. Bağlantı yalnızca bu kurulumda açılır, dışarıdan erişim yoktur.

**Rapor şablonları.** Menüden ya da Raporlar ekranından ulaşırsınız. Şablon, asistanınıza raporu nasıl yazacağını anlatan kayıtlı bir tariftir: kim okuyacak, hangi bölümler olacak, hangi dille yazılacak. Alanlar:

- **Ad**: en çok 80 karakter, projede tek.
- **Açıklama**: en çok 200 karakter. Ne zaman kullanılacağını anlatan tek cümle.
- **Yönerge**: en çok 3.000 karakter.

Bir projede en çok 10 şablon olur. Şablonu silmek, ondan üretilmiş raporları silmez.

## Nasıl kullanılır

1. İlk rapor için Site denetimi ekranında **Raporu indir**'i tıklayın. Rapor bilgisayarınıza iner ve bu listeye düşer. "Bu hafta yapılacak N şey" bölümüyle başlar.
2. Asistanla çalışıyorsanız **Yeni rapor iste**'yi tıklayın. Kopyalanan metni Claude Code, Codex ya da Cursor'a yapıştırın. Asistan hangi raporu istediğinizi sorar, veriyi okur, raporu buraya kaydeder.
3. Her ay aynı raporu istiyorsanız bir şablon yazın. Yönergeye okuyucuyu ("siteyi işleten kişi, SEO bilmiyor"), bölümleri, sırayı ve tonu yazın. Şablonu adıyla isterseniz asistan onu uygular.
4. Paylaşmak için **HTML olarak indir**'i tıklayıp dosyayı gönderin. Alan kişi dosyayı tarayıcıda açar. Bağlantıyı kopyalamak yalnızca aynı bilgisayarda işe yarar.
5. Eski raporları silmeyin. Bir sonraki görüşmede asistan önceki raporun özetini okuyup karşılaştırır.

## Sayılar nasıl hesaplanır

Denetim raporu A4 baskıya göre dizilir. İçindekiler, "Bu hafta yapılacak N şey", sorunlar, hız ölçümü, Google dizin durumu ve site haritası bölümleri var. Dizin durumu bölümü yalnızca kayıtlı cevapları kullanır, yeni soru sormaz.

Listeler sınırlıdır: sorun başına 50 adres, 300 sayfa, 50 hız satırı, ekte 3.000 adres. Dosya 400 KB'ı aşarsa listeler kısalır.

Bir rapor en çok 500.000 bayt olabilir (80 KB altı önerilir). Başlık en çok 120 karakterdir ve projede tektir. Özet en çok 2.500 karakterdir. Aynı başlıkla ikinci rapor kabul edilmez. Projede en çok 10.000 rapor, kurulumda toplam 5 GB yer olur.

Güvenlik: Kaydedilirken içinde betik, iframe (sayfaya başka sayfa gömen kutu), form, dış stil, olay işleyici (onclick gibi), javascript: bağlantısı ya da otomatik yönlendirme olan dosyalar reddedilir. Rapor açılırken de kapalı bir kutuda, ağ erişimi olmadan gösterilir. Yani rapor sizden habersiz dışarıya bir şey gönderemez.

## Sık sorulanlar

**Raporu kim yazdı?** **Tür** sütunu söyler. "Site denetimi raporu" uygulamanındır, diğerleri asistanın. Rapor sayfasında da kimin kaydettiği görünür.

**Raporu düzenleyebilir miyim?** Uygulamada değil. Asistana "şu bölümü değiştir" deyin, asistan raporu günceller.

**Bağlantıyı gönderdim, karşı taraf açamıyor.** Bağlantı yalnızca bu bilgisayarda çalışır. Dosyayı **HTML olarak indir** ile gönderin.

**Şablon yazarken neye dikkat edeyim?** Şablon bir biçim tarifidir, bilgi kaynağı değildir. Bölümleri, tonu ve kime yazıldığını yazın. Sayı ya da iddia yazmayın. Asistan sayıları her seferinde veriden alır.

## Sınırlar

Raporlar dışarıya yayınlanmaz, paylaşım dosya göndermekle olur. Raporun doğruluğu, yazanın okuduğu veriye bağlıdır. Asistan raporlarının sonundaki "Bu rapor nasıl hazırlandı" bölümü hangi aracın neyi söylediğini listeler. Şüphe duyduğunuz sayıyı oradan izleyin.

<!-- Kaynaklar: src/routes/_project/p/$projectId/reports/index.tsx; reports/$reportId.tsx; reports/templates.tsx; src/client/features/reports/ReportsList.tsx; reportStats.ts; reportRequestPrompt.ts; src/server/features/reports/services/ReportService.ts; src/types/schemas/reports.ts; src/types/schemas/report-templates.ts; src/routes/r/$reportId.ts; src/shared/report-sandbox.ts; src/server/features/audit/report/buildAuditReportHtml.ts -->
