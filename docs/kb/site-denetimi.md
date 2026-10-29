---
title: Site denetimi
description: Sitenizi 202 kuralla denetleyin, sorunları önem sırasıyla inceleyin. Denetim puanını, ölçüm kapsamını ve eksik verilerin anlamını öğrenin.
screen: Site denetimi
route: /p/<proje>/audit
updated: 2026-10-28
---

Sitenizdeki sorunları nasıl bulacağınızı ve düzelteceğinizi burada öğrenirsiniz.

Uygulama sitenizi kendi tarayıcısıyla gezer (sayfaları tek tek açıp okuyan program). Kırık bağlantıları, eksik başlıkları ve yavaş sayfaları arar. Sonunda bir puan ve önem sırasına dizilmiş bir sorun listesi alırsınız. Puan, kontrollerin ne kadarının ölçülebildiğini de gösterir. Yarım kalan bir denetime puan verilmez.

## Ekranda neler var

**Yeni denetim başlat kartı.** Şu alanlar var.

- **Taranacak site adresi**: projenizin alan adı hazır gelir.
- **En fazla N sayfa tara**: en az 10, en çok 10.000, varsayılan 50. 500'den büyük sayı yazarsanız uygulama onay ister.
- **Sayfa hızını da ölç**: varsayılan olarak kapalıdır. Açarsanız her sayfa telefonda ve bilgisayarda ölçülür. Ölçümü Google Lighthouse (Google'ın sayfa ölçüm aracı) yapar. Kart, en az kaç dakika süreceğini önceden yazar.
- **Dış bağlantıları ve görsel boyutlarını da kontrol et**: tarama bittikten sonra başka sitelere verilen bağlantıların açılıp açılmadığına ve görsel dosyalarının boyutuna bakar. En çok 300 adres sorulur. Botları engelleyen siteler atlanır.

PageSpeed anahtarınız (Google'ın hız ölçümü için verdiği ücretsiz kod) yoksa hız ölçümü en çok 50 sayfayla sınırlanır. Tümünü ölçmek için **Ayarlar** ekranından ücretsiz bir anahtar ekleyin. **Denetimi başlat** denetimi başlatır. Altındaki **Kotalar** bölümü kapalı gelir. Açarsanız PageSpeed ve URL denetimi kotalarının güncel durumunu görürsünüz.

**Önceki denetimler.** Her denetimin tarihi, adresi, durumu, sayfa sayısı ve sorun sayıları listelenir. Kritik, Uyarı ve Bilgi sütunları kayıtlı tüm bulguları gösterir: sayfa bulguları ve site geneli kontroller birlikte; aynı sayfada birden çok bulgu olabilir. Projede birden çok site denetlenmişse listenin üstünde bir site seçici çıkar. Yoğunluk, yüz sayfa başına sorun sayısıdır. Grafik çizgileri ve değişim okları yalnızca kayıtlı kanıtlar aynı siteyi, sayfa kümesini, tarama ayarlarını ve ölçülen kontrolleri doğruladığında gösterilir. Kapsam farklıysa veya bilinmiyorsa bağımsız sayılar gösterilir; değişim belirlenemez. Birden çok site seçiliyken grafik gizlenir. Satırdaki **Görüntüle** denetimi açar. Satır menüsünde **Aynı ayarlarla yeniden başlat** ve **Denetimi sil** vardır. Silmek denetimin sayfalarını, sorunlarını ve hız ölçümlerini de siler ve geri alınamaz.

**Denetim ayrıntısı.** Üstte **Raporu indir** düğmesi tek dosyalık HTML raporu indirir ve **Raporlar** ekranına kaydeder. Altında, gerekiyorsa sarı uyarılar çıkar (aşağıda). Sonra puan kartı gelir.

**Puan kartı.** Şunları gösterir.

- Ortada **Site puanı** ve yanında derece kelimesi: **Mükemmel**, **İyi**, **Orta** ya da **Zayıf**.
- Altında kapsam satırı: "Puan, ölçülen 142 kontrolün sonucuna göre. 38 kontrol ölçülemedi." Yanındaki soru işareti puanın nasıl hesaplandığını anlatır.
- Bir cümlelik değerlendirme. Puan bir sınıra takılmışsa nedenini de yazar.
- **Bulunan adres: N, taranan: M**. Tarama sitede kaç adres buldu, kaçını açtı. Denetim sizin seçtiğiniz sayfa sınırında durduysa "Denetim N sayfayla sınırlıydı; sitede daha fazla sayfa olabilir." notu çıkar. Bu durumda puan geçerlidir.
- Ölçülemeyen ağır kategoriler için satırlar. Örneğin "Hız ölçülmedi: PageSpeed kotası doldu".
- Dört sayaç: **Kritik sorun**, **İyileştirme** (uyarı ve bilgi), **Geçen kontrol**, **Ölçülmedi**.
- **Kategori puanları**: Tarama, İçerik, Dizine alma, Hız, Güvenlik, Erişilebilirlik, Sosyal ve yapılandırılmış veri. En düşük olan üsttedir. Bir kategoriye tıklarsanız **Kontroller** sekmesi o kategoriyle açılır. Hiç ölçülemeyen kategori "Ölçülmedi", bir kısmı ölçülemeyen "Kısmi veri" yazar.
- **Puan geçmişi**: aynı sitenin son denetimlerinin puanları. İki puanlı denetim olunca çıkar. Gri çubuklar kısmi puandır. Puanı verilmemiş denetimler grafikte yoktur ve altına kaç tane olduğu yazılır.

**Sekmeler.**

- **Yapılacaklar (N)**: işler, puana en çok katkı yapandan başlar. Her işin yanında kazanacağınız puan, "Küçük iş", "Orta iş" ya da "Büyük iş" etiketi ve **Nasıl düzeltilir?** kutusu vardır. Search Console bağlıysa sıralama, etkilenen sayfaların tıklamalarını da hesaba katar.
- **Kontroller (N)**: bütün kontroller kategoriye göre. Her biri geçti, kaldı ya da ölçülemedi olarak görünür. Ölçülemeyenler için nedeni yazılır.
- **Anlık veri**: sitenin sayfalarının ötesindeki hali. Sertifika, alan adı kaydı, DNS ve sitenin önizlemesi gibi.
- **Sorunlu sayfalar (N)**: sorunları gruplar. Kartı açınca nedeni, etkilenen adresler ve **Nasıl düzeltilir?** kutusu çıkar. Adreslerde arama yapabilirsiniz.
- **Sayfalar (N)**: taranan her sayfa. Hızlı filtreler: **Dizine kapalı**, **Yavaş** (1 saniyeden uzun), **Alt metni eksik**, **Site haritasında yok**.
- **Dizin durumu**: Google'ın her sayfa için yanıtı. Ayrı kılavuzda anlatılır. Denetlenen site projenin Search Console mülküne ait değilse bu sekmede Google verisi gösterilmez ve ekran bunu açıklar.
- **Hız (N)**: yalnızca hız ölçümü açıksa görünür. Ölçülemeyen sayfa varsa sayı "10/12" gibi yazılır.

Sağ üstteki **Dışa aktar** menüsü açık sekmenin listesini **E-Tablolar'a aktar**, **CSV** ya da **JSON** olarak verir. Süzgeç seçiliyse yalnızca görünen satırlar gider.

## Puanın üç durumu

**Tam puan.** Kontrollerin büyük bölümü ölçüldüğünde derece kelimesiyle gelir. Puan şu aralıklarla okunur: 90 ve üstü Mükemmel, 70 ve üstü İyi, 50 ve üstü Orta, altı Zayıf.

**Kısmi puan.** Ölçülen kontrollerin payı yüzde 70'in altına düştüyse puan kısmidir. Tarama, Dizine alma, İçerik ya da Hız kategorisinde ölçülen kontroller yarıdan azsa da öyledir. Kart "Kısmi puan, ölçüm kapsamı %62" gibi yazar, derece kelimesi vermez ve rengi nötrdür. Sayı, görebildiğiniz kontrollere göredir. Eksik kalan kısım için kötü ya da iyi bir karar verilmemiştir. Nedenler genelde şunlardır: PageSpeed kotası doldu, PageSpeed anahtarı yok, hız ölçümü kapalıydı ya da Search Console'dan dizin verisi alınamadı.

**Puan verilmedi.** Aşağıdaki durumlarda kartın yerinde "Eksik denetim, puan verilmedi" yazar.

- Denetim hata verip durdu.
- Denetim hâlâ çalışıyor.
- Tarama, sitenin istek sınırı yüzünden erken durdu. Sorun listesi tam olmadığı için puan ancak bir tahmin olurdu.
- Hiç sayfa taranamadı. Bu durumda puan kartı hiç çıkmaz.

Bulgular yine de gösterilir ve taranan sayfalar için geçerlidir. Tam bir puan için denetimi yeniden çalıştırın.

## Denetim durduysa ne yazar

Denetim hata verince ekran üç şey söyler: ne olduğunu, sorunun sizde mi uygulamada mı olduğunu ve ne yapacağınızı. Başlık hangi aşamada durduğunu yazar: **adres keşfi**, **tarama**, **hız ölçümü** ya da **sonuçların hazırlanması**.

| Ekranda yazan                                                                 | Kimde                   | Ne yapmalı                                                                     |
| ----------------------------------------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------ |
| Bir adım zamanında bitmedi                                                    | Büyük olasılıkla sitede | Birkaç dakika sonra yeniden deneyin. Yine olursa daha az sayfayla başlatın     |
| Denetim uygulamanın kullanabildiği belleğe sığmadı                            | Uygulamada              | Daha az sayfayla yeniden başlatın                                              |
| Denetim işlemci süresini aştı                                                 | Uygulamada              | Daha az sayfayla yeniden başlatın                                              |
| Sonuçlar veritabanına yazılırken hata oluştu                                  | Uygulamada              | Diskte boş yer olduğunu kontrol edin, uygulamayı ve denetimi yeniden başlatın  |
| Bir adımın sonucu saklanabilecek boyutu aştı                                  | Uygulamada              | Daha az sayfayla yeniden başlatın                                              |
| Denetimi yürüten iç düzen hata verdi                                          | Uygulamada              | Tepsi menüsünden **Yeniden başlat** deyin, sonra denetimi yeniden başlatın     |
| Denetim yarıda kaldı                                                          | Uygulamada              | Uygulamanın açık kaldığından emin olun ve denetimi yeniden başlatın            |
| Kurulum anahtarı denetimi yürüten bölüme ulaşmamış (anahtarlarınız silinmedi) | Uygulamada              | Uygulamayı güncelleyin ya da yeniden başlatın, sonra denetimi yeniden başlatın |
| Beklenmedik bir hata                                                          | Belirlenemedi           | Yeniden başlatın. Tekrarlarsa **Yardım** ekranından tanılama paketini indirin  |

Ham hata metni ekrana gelmez. Tanılama paketinde durur.

## Taramada çıkan sarı uyarılar

- **Denetim bu siteyi tamamen tarayamadı.** Sitenin bot koruması tarayıcıyı durdurmuş. Sonuçlar yine de gösterilir. Güvenlik duvarında "seotracker-audit" adına izin verin ya da kılavuzda önerilen masaüstü tarayıcılardan birini deneyin.
- **N sayfa alınamadı (ağ hatası).** Bağlantı yeniden denemede de kurulamadı. Bu sayfalar denetlenmedi ve bozuk sayılmadı. Çoğu zaman geçicidir. Denetimi yeniden çalıştırın. Sürerse sitenin bu bilgisayardan açıldığını kontrol edin.
- **Site N sayfada istek sınırı uyguladı.** Site "çok fazla istek" demiş. O sayfalar denetlenemedi. İstek sınırı sıfırlandıktan sonra yeniden başlatın.
- **Tarama, sitenin istek sınırı yüzünden erken durdu.** İstenen bekleme süresi denetim süresini aştı. Rapor eksiktir ve puan verilmez.
- **Kayıtlı PageSpeed anahtarı okunamadı; hız ölçümü anahtarsız yapıldı.** Denetim tamamlandı ama hız ölçümü anahtarsız çalıştı. Tarama sonuçları etkilenmedi. Hız ölçümü yalnızca ilk sayfalarla sınırlı kaldı. Uygulamayı güncelleyin ya da yeniden başlatın, sonra yeni bir denetim başlatın. Sürerse **Ayarlar** ekranından PageSpeed anahtarını yeniden kaydedin.

## Nasıl kullanılır

1. İlk denetimde sayfa sayısını 50'de bırakın. Hız ölçümünü kapalı tutun. Bir iki dakikada biter. Hız ölçümü kapalıyken puan kısmi çıkabilir. Bu normaldir.
2. Puan kartındaki kapsam satırını okuyun. **Kısmi puan** yazıyorsa nedenini aşağıdaki satırlardan görün.
3. **Yapılacaklar** sekmesinde ilk üç işle başlayın. En az emekle en çok puanı onlar getirir.
4. **Sorunlu sayfalar** sekmesinde önce kritik sorunları bitirin. Kritik sorun Google'ın sayfayı görmesini engeller.
5. Listeyi **Dışa aktar** ile alıp site yöneticinize verin. **Nasıl düzeltilir?** kutusunu olduğu gibi iletebilirsiniz.
6. Düzeltince **Aynı ayarlarla yeniden başlat**'ı tıklayın. **Önceki denetimler** listesindeki oklar ve **Puan geçmişi** neyin düzeldiğini gösterir.
7. Hız ölçümünü haftada bir, önemli sayfalar için açın. Her sayfa yaklaşık on saniye ve Google kotası harcar.

## Sayılar nasıl hesaplanır

**Puan.** Her bulgu kendi kategorisinden puan düşer. Düşüş, bulgunun önemine ve etkilediği sayfa oranına göre belirlenir. Önem ağırlıkları şöyledir: kritik 40, uyarı 15, bilgi 3. Site puanı yedi kategorinin ağırlıklı ortalamasıdır. Tarama ve Dizine alma en çok, Sosyal ve yapılandırılmış veri en az ağırlık taşır. Ölçülemeyen bir kontrol puanı ne artırır ne düşürür. Bu yüzden kapsam ayrıca gösterilir.

**Üst sınırlar.** Tek bir sorun bile varsa puan en çok 99 olur. Kritik bir sorun varsa puan en çok 69 olur. 5 ya da daha fazla uyarı varsa en çok 89 olur. Böylece büyük bir sitedeki tek bir sayfanın dizine kapalı olması, yüksek bir puanın altında gizlenmez. Sınır puanı tutuyorsa kart bunu yazar. Bir işin yanındaki "+N puan" sınırı da hesaba katar. Tek kritik sorunu düzeltmek sınırın tamamını kaldırır, uyarılardan birini düzeltmek ise sınır varken çok az katkı yapar.

**Tarama.** Uygulama sitenizi yormaz. Aynı anda en çok iki istek gönderir. Site "çok fazla istek" (429) derse bekler. Toplam bekleme 30 dakikayı geçerse tarama durur ve denetim puansız kalır.

**Hız ölçümü.** 212 sayfalık bir sitede denetimin tamamı 35 dakika sürdü. Bunun yaklaşık 24 dakikası hız ölçümüydü. Günlük kota dolarsa ölçüm durur, o ana kadarki sonuçlar kalır ve puan kısmi olabilir. Şu durumlarda sorun yazılır:

- Ana içerik 4 saniyeden geç görünür (LCP).
- İçerik 0,25'ten çok kayar (CLS).
- Tıklamaya yanıt 500 milisaniyeden geç gelir (INP).
- Lighthouse SEO puanı 90'ın altındadır.

## Sık sorulanlar

**Denetim Google'ın gördüğünü mü gösterir?** Hayır. Uygulamanın tarayıcısı sayfayı kendi okur. Google'ın yanıtı **Dizin durumu** sekmesindedir.

**Puan 98, neden 100 değil?** Tek bir sorun bile puanı 99'da tutar.

**Puanım neden 69'da takıldı?** Kritik bir sorun var. Sorunu düzeltene kadar puan 69'u geçemez. Kart bunu yazar.

**Neden "Kısmi puan" yazıyor?** Kontrollerin önemli bir kısmı ölçülemedi. Kapsam satırı ve altındaki satırlar nedenini söyler. Hız ölçümünü açmak ya da Search Console'ı bağlamak genelde kapsamı artırır.

**Neden puan yerine "Eksik denetim" yazıyor?** Denetim yarıda kalmış ya da erken durmuş. Sorun listesi tam olmadığı için puan verilmez. Denetimi yeniden çalıştırın.

**"Engellendik" uyarısı ne demek?** Sitenizin bot koruması tarayıcıyı durdurmuş. Güvenlik duvarında "seotracker-audit" adına izin verin.

**Hız ölçümü yarıda kaldı.** Genelde PageSpeed anahtarı yoktur ya da günlük kota dolmuştur. **Ayarlar** ekranındaki kota kartı nedeni yazar.

**Aynı anda kaç denetim çalışır?** En çok üç. Hız ölçen iki denetim birbirini yavaşlatır.

## Sınırlar

Tarayıcı, JavaScript'in (sayfada çalışan kod) sonradan eklediği içeriği görmeyebilir. Bir denetim en çok 10.000 sayfa tarar. Hız ölçümü Google'ın laboratuvar ölçümüdür, gerçek ziyaretçi verisi değildir. Denetim sitenizde hiçbir şeyi değiştirmez. Düzeltmeyi siz ya da asistanınız yaparsınız.

Önceki denetimler listesindeki **Taranan sayfa**, başarısız denetimlerde de gerçekten taranan adres sayısıdır; başlangıçtaki sayfa sınırı değildir. Kritik ve uyarı sütunları toplam bulgu sayısını gösterir. **Hız ölçümü istendi**, denetimin hız ölçümü açık başlatıldığını belirtir; ölçümün başarıyla tamamlandığını kanıtlamaz. Telefonda diğer sütunları ve işlemleri görmek için tabloyu yana kaydırın.

<!-- Kaynaklar: src/client/features/audit/launch/LaunchView.tsx; LaunchFormCard.tsx; useLaunchController.ts; AuditHistorySection.tsx; AuditSiteFilter.tsx; ProgressCard.tsx; src/client/features/audit/results/ResultsView.tsx; ResultsHeader.tsx; ScoreOverview.tsx; ScoreGauge.tsx; WithheldScore.tsx; scoreWords.ts; auditFailureCopy.ts; ChecksView.tsx; TodoView.tsx; IssuesView.tsx; QuickFilters.tsx; ForeignPropertyNotice.tsx; DownloadReportButton.tsx; src/routes/_project/p/$projectId/audit/index.tsx; src/shared/auditStanding.ts; src/shared/auditScore.ts; src/shared/auditCategory.ts; src/shared/audit-limits.ts; src/server/lib/audit/crawl-throttle.ts -->

Geçmişteki Kritik, Uyarı ve Bilgi sayıları sayfa bulgularıdır; aynı sayfada birden çok bulgu olabilir. Tamamlanan işin yanında kayıtlı tarama sınırı gösterilir; sınır bilinmiyorsa açıkça belirtilir. **Kapsam ayrıntıları** ölçülen ve ölçülemeyen kontrolleri açar. Başarısız denetimde kayıtlı hata kodunun açıklaması ve sonraki adım görünür; neden bilinmiyorsa tahmin edilmez.
