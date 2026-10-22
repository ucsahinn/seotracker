---
title: Raporlar ve şablonlar
description: Denetimden indirdiğiniz ya da ajanınıza yazdırdığınız tek dosyalık HTML raporlar; telefonda okunur, yazdırılır, paylaşılır. Şablonlar ajanın raporu nasıl yazacağını belirler.
screen: Raporlar
route: /p/<proje>/reports
updated: 2026-10-22
---

Raporlar ekranı, bu proje için üretilmiş her raporu tek listede tutar. Rapor iki yoldan oluşur: Site denetimi ekranındaki **Raporu indir** düğmesi uygulamanın kendi denetim raporunu üretir; yapay zekâ ajanınız ise MCP üzerinden araştırma yapıp bulduklarını rapor olarak kaydeder. Her rapor tek bir HTML dosyasıdır: betik yok, dış kaynak yok, yazı tipi gömülü değil. Bu yüzden telefonda açılır, PDF'e basılır ve e-postayla gönderilebilir. Uygulamada elle rapor yazacağınız bir editör yoktur; yazan ya uygulama ya ajandır.

## Ekranda neler var

**Üst çubuk.** Açıklama: "Projeniz için hazırlanmış SEO raporları. Her raporu buradan açabilir, indirebilir ya da silebilirsiniz." **Yeni rapor iste** düğmesi, ajanınıza yapıştıracağınız bir istemi panoya kopyalar ("İstem kopyalandı, ajanınıza yapıştırın").

**Filtreler.** Tümü, Son 7 gün, Şablonla yazılan, Beceriyle yazılan; arama kutusu "Raporlarda ara".

**Tablo.** Sütunlar: **Rapor**, **Tür**, **Oluşturulma**, **Boyut**. Tür etiketleri raporu hangi işin ürettiğini söyler: Site denetimi raporu (uygulamanın kendisi), SEO denetimi, Dönem karşılaştırması, Trafik düşüşü incelemesi, SEO raporu, Koçluk notu, Proje kurulumu; şablonla yazılmış raporlarda şablonun adı görünür.

**Rapor sayfası.** Rapor, kendi güvenli çerçevesinde açılır. Düğmeler: **HTML olarak indir**, bağlantıyı kopyala ve yazdır. Bağlantı yalnızca bu kurulumda açılır; dışarıdan erişim yoktur.

**Boş durum.** "Henüz rapor yok" ve iki yol: ajanınıza yazdırın ya da Site denetimi ekranından indirin.

**Rapor şablonları.** Menüden ya da Raporlar ekranından ulaşılır. Açıklaması: "Şablon, ajanınıza raporu nasıl yazacağını anlatan kayıtlı bir tariftir: kim okuyacak, hangi bölümler olacak, hangi dille yazılacak. Ajan rapor yazarken uygun olanı seçer." Alanlar: **Ad** (en fazla 80 karakter, projede tek), **Açıklama** (en fazla 200 karakter, "ne zaman kullanılacağını anlatan tek cümle"), **Yönerge** (en fazla 3.000 karakter). Bir projede en fazla 10 şablon olur. Şablonu silmek ondan üretilmiş raporları silmez.

## Nasıl kullanılır

1. İlk raporunuz için Site denetimi ekranında **Raporu indir** deyin. Rapor hem bilgisayarınıza iner hem bu listeye düşer; "Bu hafta yapılacak N şey" bölümüyle başlar.
2. Ajanınızla çalışıyorsanız **Yeni rapor iste** düğmesine basın ve istemi Claude Code, Codex ya da Cursor'a yapıştırın. Ajan hangi raporu istediğinizi sorar, veriyi MCP'den okur, raporu buraya kaydeder.
3. Her ay aynı raporu istiyorsanız bir şablon yazın. Yönergeye okuyucuyu ("siteyi işleten kişi, SEO bilmiyor"), bölümleri ve sırayı, tonu yazın. Ajan, adıyla istediğinizde bu şablonu uygular.
4. Raporu paylaşmak için **HTML olarak indir** deyip dosyayı gönderin; alan kişi tarayıcıda açar. Bağlantıyı kopyalamak yalnızca aynı bilgisayarda işe yarar.
5. Eski raporları silmeyin; bir sonraki check-in'de ajan önceki raporun özetini okuyup karşılaştırır.

## Sayılar nasıl hesaplanır

Uygulamanın denetim raporu sunucuda üretilir ve A4 baskıya göre dizilir. Bölümleri: içindekiler, "Bu hafta yapılacak N şey", genel görünüm, sorunlar, hız ölçümü, Google dizin durumu (yalnızca kayıtlı cevaplar, yeni soru sormaz), site haritası, yöntem ve sınırlar ("Bu raporda ölçülmeyenler" dahil), kalan etkilenen adresler ve taranan sayfalar ekleri. Listeler sınırlıdır: bulgu başına 50 adres, 300 sayfa, 50 hız satırı, ekte 3.000 adres; dosya 400 KB'ı aşarsa listeler kısalır.

Sınırlar: bir rapor en fazla 500.000 bayttır (80 KB altı önerilir), başlık en fazla 120 karakter ve projede tektir, özet en fazla 2.500 karakter. Aynı başlıkla ikinci bir rapor reddedilir; ajan var olan raporu güncellemek için raporun kimliğini verir. Projede 10.000 rapor, kurulumda toplam 5 GB sınırı vardır.

Güvenlik: rapor HTML'i kaydedilirken betik, iframe, form, dış stil, olay işleyici (onclick gibi), javascript: bağlantıları ve otomatik yönlendirme içeren dosyalar reddedilir. Açılırken de kendi kum havuzunda, ağ erişimi kapalı gösterilir. Yani bir raporun sizden habersiz dışarıya bir şey göndermesi mümkün değildir.

## Sık sorulanlar

**Raporu kim yazdı?** Tür sütunu söyler: "Site denetimi raporu" uygulamanın ürünüdür, diğerleri ajanın. Rapor sayfasında da "kim kaydetti" bilgisi görünür.

**Aynı denetimi iki kez indirdim, neden tek rapor var?** Uygulama aynı denetimin raporunu üzerine yazar; sürüm biriktirmez.

**Raporu düzenleyebilir miyim?** Uygulamada değil. İndirip bir HTML düzenleyicide değiştirebilirsiniz, ama ajana "şu bölümü değiştir" demek daha pratiktir; ajan raporu kimliğiyle güncelleyebilir.

**Bağlantıyı gönderdim, karşı taraf açamıyor.** Bağlantı yalnızca bu bilgisayarda çalışır. Dosyayı **HTML olarak indir** ile gönderin.

**Şablon yazarken neye dikkat edeyim?** Şablon biçim tarifidir, olgu kaynağı değil. "Bölümler, ton, kime yazıldığı" yazın; sayı ya da iddia yazmayın. Ajan sayıları her seferinde veriden alır.

## Sınırlar

Rapor üreten bir editör yoktur; ajan ya da uygulama yazar. Raporlar dışarıya yayınlanmaz; paylaşım dosya göndermekle olur. Raporun doğruluğu yazanın okuduğu veriye bağlıdır; ajan raporlarının sonundaki "Bu rapor nasıl hazırlandı" bölümü hangi aracın neyi söylediğini listeler, şüphe duyduğunuz sayıyı oradan izleyin.

<!-- Kaynaklar: src/routes/_project/p/$projectId/reports/index.tsx; reports/$reportId.tsx; reports/templates.tsx; src/client/features/reports/ReportsList.tsx; reportStats.ts; reportRequestPrompt.ts; src/server/features/reports/services/ReportService.ts; src/types/schemas/reports.ts; src/types/schemas/report-templates.ts; src/routes/r/$reportId.ts; src/shared/report-sandbox.ts; src/server/features/audit/report/buildAuditReportHtml.ts -->
