---
title: Dizin durumu
description: Google her sayfanızı dizine almış mı, almadıysa neden, en son ne zaman taramış? Google mülk başına günde 2.000 adres denetimine izin verir.
screen: Site denetimi, Dizin durumu sekmesi
route: /p/<proje>/audit?auditId=<denetim>&tab=index
updated: 2026-10-22
---

Site denetimi bir sayfanın açılıp açılmadığını gösterir, ama Google'ın onu dizine (aramada gösterdiği sayfa listesine) alıp almadığını bilemez. **Dizin durumu** sekmesi bunu Google'ın URL Denetimi hizmetine sorar ve yanıtı bu bilgisayarda saklar. Yanıt eskimedikçe aynı sayfayı yeniden sormaz.

Bu tasarruf önemlidir: Google her mülk (Search Console'daki site kaydı) için günde 2.000 sorgu hakkı verir ve uygulamayla ajanınız bu hakkı paylaşır.

## Ekranda neler var

**"Google bu sayfalarla ne yapmış?" halkası.** Taranan sayfalar üç gruba ayrılır:

- **Google'da**: aramada çıkabilir.
- **Dizinde değil**: Google baktı ama almadı.
- **Yanıt bekleyen**: henüz sorulmadı ya da yanıt alınamadı.

Bir gruba tıklayınca alttaki tablo yalnızca o sayfaları gösterir; **Tümünü göster** filtreyi kaldırır.

**Özet kutuları.** Kaç sayfanın sorulduğunu, kaçının dizinde olduğunu, kaçının olmadığını ve kaçının beklediğini gösterir. **Google'ın farklı adresi seçtiği sayfalar** kutusu, Google'ın sizin canonical (asıl adres bildirimi) etiketinizden farklı bir adres seçtiği sayfaları sayar. **Bu denetimin Google'a sorulmamış sayfaları** kutusu, sırada bekleyen sayfa sayısıdır.

**Google'da durumunu kontrol et düğmesi.** Her basışta en çok 25 sayfa sorar; önce en uzun süredir yanıtı olmayan sayfaları seçer. Düğmenin yanında **Bugünkü kotadan … sorgu kaldı** yazar. Günlük sınır dolarsa kaç sayfanın sırada beklediği ve sınırın birkaç saat içinde yenileneceği yazılır.

**Tablo.** Sütunlar şunlar: **Sayfa**, **Durum**, **Sebep**, **Google'ın seçtiği adres**, **Google'ın son ziyareti**. Durum hücresinde **Google'da**, **Kontrol edilmedi**, **Yanıt alınamadı**, **Hata** ya da Google'ın bildirdiği durumun Türkçesi yazar. Google'ın 18 durumunun her birinin Türkçesi vardır. Birkaç örnek:

- "Keşfedildi, henüz taranmadı"
- "'noindex' etiketiyle dışlandı" (sayfa aramadan gizlenmiş)
- "robots.txt engelliyor" (robots.txt, Google'a hangi sayfalara girebileceğini söyleyen dosyadır)
- "Yumuşak 404" (sayfa var ama Google boş sayıyor)
- "Google bu adresi bilmiyor"

Tabloyu CSV olarak indirebilirsiniz.

## Nasıl kullanılır

1. Denetim bitince sekmeyi açın. **Yanıt bekleyen** sayısı yüksekse **Google'da durumunu kontrol et** düğmesine basın. Her basış 25 sayfa ilerler; küçük bir site için birkaç basış yeter.
2. Önce **Dizinde değil** grubuna bakın. **Sebep** sütunu Google'ın gerekçesidir ve çoğu zaman yapılacak işi söyler:
   - "robots.txt engelliyor": engeli kaldırın.
   - "'noindex' etiketiyle dışlandı": sayfa aramada görünmeli ise etiketi silin.
   - "Keşfedildi, henüz taranmadı": çoğunlukla beklemek yeter.
3. "Google bu adresi bilmiyor" diyen önemli sayfaları site haritasına ekleyin ve haritayı Search Console'a gönderin. En önemli birkaç sayfa için Search Console'da "Dizine eklenmesini iste" deyin.
4. **Google'ın farklı adresi seçtiği sayfalar** sıfır değilse **Google'ın seçtiği adres** sütununa bakın. Google sizin bildirdiğiniz asıl adresi kabul etmemiştir. Ya kendi bildiriminizi düzeltin ya da Google'ın seçtiği adresi asıl adres yapın.
5. Birkaç gün sonra yeniden basın. Yalnızca eskiyen yanıtlar yeniden sorulur, kota boşa gitmez.

## Sayılar nasıl hesaplanır

Google "dizinde" derse sayfa **Google'da** sayılır. "Dizinde değil" ya da "belirsiz" derse **Dizinde değil** sayılır. Yanıt yoksa sayfa **Yanıt bekleyen** grubundadır.

Bir yanıt şu sürelerden sonra eskir ve yeniden sorulabilir:

- Dizindeki sayfa: 14 gün.
- Dizinde olmayan sayfa ya da hatalı yanıt: 3 gün.
- Hiç sorulmamış sayfa: her zaman sıradadır.

Günlük sınır, son 24 saatteki sorgu sayısıyla hesaplanır. Uygulama yalnızca kendi sorgularını sayar. Search Console'da elle yaptığınız denetimler bu sayaca girmez, ama Google'ın gerçek sınırından düşer.

Asıl adres uyuşmazlığı, Google'ın seçtiği adresle sizin bildirdiğiniz adresin farklı olmasıdır. Sondaki eğik çizgi farkı da sayılır.

Google'ın son taraması 90 günden eskiyse denetim "Google bu sayfayı uzun süredir taramadı" sorununu yazar. Eskimiş yanıtlar tek bir "Google'ın bazı sayfalar hakkındaki yanıtı eskimiş" sorununda toplanır.

## Sık sorulanlar

**Düğme neden kapalı?** Üç nedenden biri geçerlidir: Search Console bağlı değildir, sorulacak sayfa kalmamıştır ya da denetlenen alan adı bağlı mülkün içinde değildir. Sonuncusu, projenin sitesi dışında bir siteyi denetlediğinizde olur.

**2.000 sınırı kimin?** Mülkün. Aynı mülke bağlı iki proje ve asistanınız aynı havuzdan harcar.

**"Keşfedildi, henüz taranmadı" diyen sayfa için ne yapayım?** Çoğu zaman hiçbir şey. Yeni sitelerde Google haftalarca bekletebilir. Sitenin sık taranan sayfalarından bağlantı vermek süreci hızlandırır.

**Bu sekme Google'a yeni sayfa bildirir mi?** Hayır, yalnızca sorar. Bildirmek için site haritası ve Search Console'daki "Dizine eklenmesini iste" vardır.

## Sınırlar

Yanıtlar Google'ın verdiği kadardır; Google bazı alanları boş bırakabilir. Günlük sınır nedeniyle 10.000 sayfalık bir sitenin tamamını sormak en az beş gün sürer. Sekme yalnızca denetimde taranan sayfaları sorar; denetime girmeyen adresler listede görünmez.

<!-- Kaynaklar: src/client/features/audit/IndexCoverageView.tsx; CoverageTable.tsx; CoverageVerdictDonut.tsx; coverageBuckets.ts; coverageReasons.ts; export.ts; src/server/features/gsc/indexCoverage.ts; src/server/lib/audit/google-verdict-checks.ts; src/shared/gsc-coverage-states.ts; src/db/gsc-inspection.schema.ts; src/server/features/quotas/QuotaService.ts -->
