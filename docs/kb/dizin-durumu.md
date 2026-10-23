---
title: Dizin durumu
description: Google her sayfanızı aramaya almış mı, almadıysa neden, en son ne zaman uğramış? Günde en çok 2.000 sorgu sorabilirsiniz.
screen: Site denetimi, Dizin durumu sekmesi
route: /p/<proje>/audit?auditId=<denetim>&tab=index
updated: 2026-10-22
---

Google'ın hangi sayfalarınızı aramaya aldığını burada öğrenirsiniz.

Site denetimi, sayfanın açılıp açılmadığını söyler. Google'ın sayfayı gerçekten dizine (Google'ın sayfa listesine) alıp almadığını söyleyemez. **Dizin durumu** sekmesi bunu Google'a sorar ve cevabı bu bilgisayarda saklar. Aynı soruyu tekrar tekrar sormaz, yalnızca eskiyen cevapları yeniden sorar. Bu önemli, çünkü Google her mülk (Search Console'daki site kaydınız) için günde 2.000 soru hakkı verir. Uygulama ve asistanınız bu hakkı paylaşır.

## Ekranda neler var

**"Google bu sayfalarla ne yapmış?" halkası.** Taranan sayfalar üç gruba ayrılır:

- **Google'da**: aramada çıkabilir.
- **Dizinde değil**: Google baktı ama almadı.
- **Yanıt bekleyen**: henüz sorulmadı ya da cevap alınamadı.

**Özet kutuları.** Kaç sayfanın sorulduğunu, kaçının dizinde olduğunu, kaçının olmadığını ve kaçının beklediğini görürsünüz. "Google'ın farklı adresi seçtiği sayfalar" kutusu, Google'ın bildirdiğiniz canonical'dan (asıl adres bildirimi) farklı bir adres seçtiği sayfaları sayar. "Bu denetimde henüz sorulmamış" kutusu, sorulmayı bekleyen sayfa sayısıdır.

**Google'da durumunu kontrol et düğmesi.** Her basışta en çok 25 sayfa sorar. Önce en uzun süredir cevap almayanları sorar. Günlük sınır dolarsa "Google'ın günlük 2.000 adres sınırına ulaşıldı" uyarısı çıkar. Search Console bağlı değilse düğme kapalıdır. Denetlenen alan adı bağlı mülkün içinde değilse de kapalıdır.

**Tablo.** Sütunlar şunlar: **Sayfa**, **Durum**, **Sebep**, **Google'ın seçtiği adres**, **Google'ın son ziyareti**. Durum hücresinde "Google'da", "Kontrol edilmedi", "Yanıt alınamadı", "Hata" ya da Google'ın kendi durumunun Türkçesi yazar. Toplam 18 durumun Türkçesi var. Birkaç örnek:

- "Keşfedildi, henüz taranmadı"
- "'noindex' etiketiyle dışlandı" (sayfa aramadan gizlenmiş)
- "robots.txt engelliyor" (robots.txt, Google'a hangi sayfalara girebileceğini söyleyen dosyadır)
- "Yumuşak 404" (sayfa var ama Google boş sayıyor)
- "Google bu adresi bilmiyor"

Tabloyu CSV olarak indirebilirsiniz.

## Nasıl kullanılır

1. Denetim bitince sekmeyi açın. "Yanıt bekleyen" sayısı yüksekse **Google'da durumunu kontrol et**'e basın. Her basışta 25 sayfa ilerler. Küçük sitede birkaç basış yeter.
2. Önce "Dizinde değil" grubuna bakın. **Sebep** sütunu Google'ın gerekçesidir ve çoğu zaman ne yapacağınızı söyler. "robots.txt engelliyor" ise engeli kaldırın. "'noindex' etiketiyle dışlandı" ise etiketi silin. "Keşfedildi, henüz taranmadı" ise genelde beklemek yeterlidir.
3. "Google bu adresi bilmiyor" diyen önemli sayfaları site haritasına ekleyin. Haritayı Search Console'a gönderin. Üç beş çok önemli sayfa için Search Console'da elle "Dizine eklenmesini iste" deyin.
4. "Google'ın farklı adresi seçtiği sayfalar" kutusu sıfır değilse **Google'ın seçtiği adres** sütununa bakın. Google sizin bildirdiğiniz asıl adresi beğenmemiştir. Ya sizinkini düzeltin ya da Google'ın seçtiğini asıl adres yapın.
5. Birkaç gün sonra tekrar basın. Yalnızca eskiyen cevaplar yeniden sorulur, kotanız boşa gitmez.

## Sayılar nasıl hesaplanır

Google "dizinde" derse sayfa "Google'da", "dizinde değil" ya da "belirsiz" derse "Dizinde değil" sayılır. Cevap yoksa sayfa "Yanıt bekleyen" olur.

Cevap belli bir süre sonra eski sayılır ve yeniden sorulur. Dizindeki sayfa için bu süre 14 gündür. Dizinde olmayan ya da hatalı cevap için 3 gündür. Hiç sorulmamış sayfa her zaman sorulmaya hazırdır. Günlük sınır son 24 saatteki soru sayısıyla hesaplanır. Uygulama yalnızca kendi sorularını sayar. Search Console'da elle yaptığınız sorgular bu sayaca girmez ama Google'ın gerçek sınırından düşer.

Asıl adres uyuşmazlığı, Google'ın seçtiği adresle sizin bildirdiğiniz adresin farklı olmasıdır. Sondaki eğik çizgi farkı da sayılır.

Google'ın son taraması 90 günden eskiyse denetim "Google bu sayfayı uzun süredir taramadı" sorununu yazar. Eskimiş cevaplar tek bir "Google'ın bazı sayfalar hakkındaki yanıtı eskimiş" sorununda toplanır.

## Sık sorulanlar

**Düğme neden kapalı?** Üç neden olabilir. Search Console bağlı değildir. Sorulacak sayfa kalmamıştır. Ya da denetlediğiniz alan adı bağlı mülkün içinde değildir. Başka bir siteyi denetlediyseniz böyle olur.

**2.000 sınırı kimin?** Mülkün. Aynı mülke bağlı iki proje ve asistanınız aynı havuzdan harcar.

**"Keşfedildi, henüz taranmadı" diyen sayfa için ne yapayım?** Çoğu zaman hiçbir şey. Yeni sitelerde Google haftalarca bekletebilir. Sitenin sık taranan sayfalarından bağlantı vermek süreci hızlandırır.

**Bu sekme Google'a yeni sayfa bildirir mi?** Hayır, yalnızca sorar. Bildirmek için site haritası ve Search Console'daki "Dizine eklenmesini iste" vardır.

## Sınırlar

Cevaplar Google'ın verdiği kadardır. Google bazı alanları boş bırakabilir. Günde 2.000 soruyu geçemezsiniz. 10.000 sayfalık bir siteyi tamamen sormak beş gün sürer. Sekme yalnızca taranan sayfaları sorar. Denetime girmeyen adresler listede görünmez.

<!-- Kaynaklar: src/client/features/audit/IndexCoverageView.tsx; CoverageTable.tsx; CoverageVerdictDonut.tsx; coverageBuckets.ts; coverageReasons.ts; export.ts; src/server/features/gsc/indexCoverage.ts; src/server/lib/audit/google-verdict-checks.ts; src/shared/gsc-coverage-states.ts; src/db/gsc-inspection.schema.ts; src/server/features/quotas/QuotaService.ts -->
