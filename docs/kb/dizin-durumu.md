---
title: Dizin durumu
description: Google'ın her sayfanız için kendi cevabı. Dizinde mi, neden değil, en son ne zaman tarandı, hangi adresi asıl saydı. Günde 2.000 sorgu sınırıyla.
screen: Site denetimi, Dizin durumu sekmesi
route: /p/<proje>/audit?auditId=<denetim>&tab=index
updated: 2026-10-22
---

Site denetimi sayfanın taranabilir olup olmadığını söyler; Google'ın onu gerçekten dizine alıp almadığını söyleyemez. Dizin durumu sekmesi bu boşluğu kapatır: Search Console'un URL Denetleme servisine sayfayı sorar ve Google'ın cevabını kaydeder. Cevaplar bu bilgisayarda saklanır; aynı sayfayı tekrar tekrar sormak yerine kaydedilen cevap gösterilir ve yalnızca eskiyenler yeniden sorulur. Bu önemli, çünkü Google her mülk için günde 2.000 soru hakkı verir ve uygulama ile ajanınız bu hakkı paylaşır.

## Ekranda neler var

**"Google bu sayfalarla ne yapmış?" halkası.** Taranan sayfalar üç kümeye ayrılır: **Google'da** ("Aramada çıkabilir"), **Dizinde değil** ("Google baktı ama almadı") ve **Yanıt bekleyen** (henüz sorulmamış ya da cevap alınamamış).

**Özet kutuları.** Kaç sayfa soruldu, kaçı dizinde, kaçı değil, kaçı bekliyor; "Google'ın farklı adresi seçtiği sayfalar" kutusu canonical uyuşmazlıklarını sayar; "Bu denetimde henüz sorulmamış" kutusu sorulması gereken sayfa sayısıdır.

**Google'da durumunu kontrol et düğmesi.** Her basışta en fazla 25 sayfa sorar; en uzun süredir cevaplanmayanlar önce gelir. Sonuç bildirimi "N sayfa soruldu. M sayfa kaldı." biçimindedir. Sorulacak sayfa yoksa "Tüm sayfalar güncel, sorulacak bir şey yok." Günlük sınıra gelindiyse "Google'ın günlük 2.000 adres sınırına ulaşıldı" uyarısı çıkar. Search Console bağlı değilse ya da denetlenen alan adı bağlı mülkün kapsamında değilse düğme devre dışıdır.

**Tablo.** Sütunlar: **Sayfa**, **Durum**, **Sebep**, **Google'ın seçtiği adres**, **Google'ın son ziyareti**. Durum hücresinde "Google'da", "Kontrol edilmedi", "Yanıt alınamadı", "Hata" ya da Google'ın kendi kapsam durumunun Türkçesi görünür.

**Google'ın kapsam durumları, Türkçe.** Tabloda görebileceğiniz başlıca ifadeler: "Site haritasında var, dizine alındı", "Dizine alındı, site haritasında yok", "Tarandı, şu an dizine alınmadı", "Keşfedildi, henüz taranmadı", "Yinelenen içerik, canonical belirtilmemiş", "Yinelenen içerik, Google başka bir canonical seçti", "'noindex' etiketiyle dışlandı", "robots.txt engelliyor", "Yumuşak 404", "Yönlendirme yapan sayfa", "Sunucu hatası (5xx)", "Google bu adresi bilmiyor". Toplam 18 durum çevrilidir.

**Dışa aktarma.** CSV sütunları: Adres, Karar, Kapsam durumu, Google'ın seçtiği asıl adres, Sizin belirttiğiniz asıl adres, Asıl adres uyuşmazlığı, Son tarama, Sorgulandı, Hata.

## Nasıl kullanılır

1. Denetim bitince sekmeyi açın. "Yanıt bekleyen" sayısı yüksekse **Google'da durumunu kontrol et** düğmesine basın; 25'er 25'er ilerler. Küçük bir sitede birkaç basış yeter.
2. Önce "Dizinde değil" kümesine bakın. **Sebep** sütunu Google'ın gerekçesidir ve çoğu zaman tek başına ne yapacağınızı söyler: "robots.txt engelliyor" ise engeli kaldırın, "'noindex' etiketiyle dışlandı" ise etiketi silin, "Keşfedildi, henüz taranmadı" ise genellikle beklemek yeterlidir.
3. "Google bu adresi bilmiyor" diyen önemli sayfaları site haritasına ekleyin ve site haritasını Search Console'a gönderin. Çok önemli üç beş sayfa için Search Console'da elle "Dizine eklenmesini iste" yapabilirsiniz; uygulama bunu yapmaz.
4. "Google'ın farklı adresi seçtiği sayfalar" kutusu sıfır değilse **Google'ın seçtiği adres** sütununa bakın. Google sizin canonical'ınızı beğenmemiştir; ya canonical'ı düzeltin ya da Google'ın seçtiği adresi asıl adres yapın.
5. Birkaç gün sonra tekrar basın; yalnızca eskiyen cevaplar yeniden sorulur, kotanız boşa gitmez.

## Sayılar nasıl hesaplanır

Her sayfa için Google'ın cevabı şu alanlarla saklanır: karar, kapsam durumu, robots.txt durumu, dizin durumu, sayfa getirme durumu, son tarama zamanı, Google'ın seçtiği canonical, sizin bildirdiğiniz canonical, zengin sonuç kararı ve kontrol zamanı. Google'ın "PASS" dediği sayfa "Google'da", "NEUTRAL" ya da "FAIL" dediği "Dizinde değil" sayılır; cevap yoksa "Yanıt bekleyen".

Bir cevap "eski" sayılınca yeniden sorulur: dizinde olan sayfa için 14 gün, dizinde olmayan ya da hatalı cevap için 3 gün. Hiç sorulmamış sayfa her zaman sorulmaya hazırdır. Günlük sınır, son 24 saatteki soru sayısıyla hesaplanır; uygulama kendi sorularını sayar, Search Console'da elle yaptığınız sorgular bu sayaca girmez ama Google'ın gerçek sınırına girer.

Canonical uyuşmazlığı, Google'ın seçtiği adresle sizin bildirdiğiniz adresin (bildirmediyseniz sayfanın kendi adresinin) farklı olmasıdır; şema, alan adı büyük küçük harf ve boş yol farkı sayılmaz, sondaki eğik çizgi farkı sayılır. Google'ın son taraması 90 günden eskiyse denetimde "Google bu sayfayı uzun süredir taramadı" bulgusu yazar; eskimiş cevaplar bulgu listesinden düşer ve tek bir "Google'ın bazı sayfalar hakkındaki yanıtı eskimiş" bulgusu olarak toplanır.

## Sık sorulanlar

**Düğme neden kapalı?** Üç sebep: Search Console bağlı değil, sorulacak sayfa kalmadı, ya da denetlediğiniz alan adı bağlı Search Console mülkünün kapsamında değil (başka bir siteyi denetlediyseniz böyle olur).

**Google'da ama Search Console'da göremiyorum.** Cevap 14 güne kadar eski olabilir; düğmeye basın, dizindeki sayfalar da süresi dolunca yeniden sorulur.

**2.000 sınırı kime ait?** Mülke. Aynı mülke bağlı iki proje ve ajanınız aynı havuzdan harcar.

**"Keşfedildi, henüz taranmadı" diyen sayfa için ne yapayım?** Çoğu zaman hiçbir şey; yeni sitelerde Google haftalarca bekletebilir. Sayfaya sitenin sık taranan sayfalarından bağlantı vermek süreci hızlandırır.

**Bu sekme Google'a yeni sayfa bildirir mi?** Hayır. Yalnızca sorar. Bildirmek için site haritası ve Search Console'daki "Dizine eklenmesini iste" vardır.

## Sınırlar

Cevaplar Google'ın URL Denetleme servisinin verdiği kadardır; Google bazı alanları boş bırakabilir. Günde 2.000 soruyu geçemezsiniz; 10.000 sayfalık bir siteyi tamamen sormak beş gün sürer. Sekme yalnızca taranan sayfaları sorar; denetime girmeyen adresler listede görünmez.

<!-- Kaynaklar: src/client/features/audit/IndexCoverageView.tsx; CoverageTable.tsx; CoverageVerdictDonut.tsx; coverageBuckets.ts; coverageReasons.ts; export.ts; src/server/features/gsc/indexCoverage.ts; src/server/lib/audit/google-verdict-checks.ts; src/shared/gsc-coverage-states.ts; src/db/gsc-inspection.schema.ts; src/server/features/quotas/QuotaService.ts -->
