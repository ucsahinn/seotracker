---
title: Panel
description: Projeyi açınca ilk gördüğünüz ekran bu. Son 28 günün arama sayıları, kurulumun durumu, yapacağınız işler ve son denetimin özeti hep burada.
screen: Panel
route: /p/<proje>
updated: 2026-10-27
---

Sitenizin son durumunu görür, sıradaki işi öğrenirsiniz. Projeyi açınca ilk bu ekran gelir.

Arama sayıları Google'ın Search Console aracından gelir. Ziyaretçi sayıları Google Analytics'ten gelir. Denetim özeti uygulamanın kendi site tarayıcısından gelir. Üstteki **Yenile** düğmesi hepsini yeniler. Projenin en az bir denetimi varsa yanında **Denetimi başlat** düğmesi çıkar. O sizi denetim ekranına götürür. Başlığın altında projenin alan adı yazar.

## Ekranda neler var

**Dört sayı kartı.** **Tıklama**, **Gösterim**, **Tıklama oranı** ve **Ortalama sıra** kartları son 28 günü gösterir. Her kartta önceki 28 güne göre bir ok durur. Ortalama sırada küçük sayı iyidir, çünkü 1 en üst sıradır. O yüzden sayı düşerse haber iyidir ve ok ona göre renklenir. Search Console bağlı değilse kartta "Bağlanınca görünür" yazar. Bağlıysa ama dönemde hiç gösterim yoksa "Bu dönemde gösterim yok" yazar.

**Sıradaki adımlar.** Başlığın yanında kurulumun durumu bir etiketle yazar: "Kurulum 4 / 6" ya da hepsi bittiyse "Kurulum tamam". Altı madde sayılır: Search Console, Analytics, güncel denetim, proje tanımı, PageSpeed anahtarı ve yapay zekâ ajanı. Aynı altı madde **Proje bilgisi** ekranında da vardır. İki ekran aynı sayıyı gösterir. Güncel denetim, projenin kendi sitesinde yedi gün içinde tamamlanmış bir denetimdir. Başka bir sitenin denetimi sayılmaz. Eksik olanlar "Kurulumda eksik: ..." satırında sıralanır ve yanındaki **Tamamla** bağlantısı Proje bilgisi ekranına götürür. Kurulum, sitenin kendisi hakkında bir şey söylemez. Yalnızca bir yapılacaklar listesidir.

Uygulama size en fazla üç iş önerir. Sıra şöyledir:

- Search Console bağlı değilse **Search Console'u bağlayın** (düğme: **Bağla**). Google erişim anahtarı henüz girilmemişse bu satır yerine bir uyarı çıkar: "Google erişim anahtarı eksik" ve **Google erişim anahtarını Ayarlar'a girin** düğmesi.
- Hiç denetim yoksa **İlk denetimi başlatın** (düğme: **Başlat**). Liste burada biter.
- Son denetim tamamlanamadıysa **Denetimi yeniden başlatın** (düğme: **Yeniden denetle**). Altında nedeni, sorunun sitede mi uygulamada mı olduğu ve ne yapacağınız yazar. Denetim sürüyorsa **Denetim sürüyor** (düğme: **İlerlemeyi gör**).
- Kritik sorun varsa "N kritik sorun var" (düğme: **Gör**).
- Search Console bağlıysa **Fırsatlara bakın** (düğme: **Aç**).
- Son denetim yedi günden eskiyse **Denetimi tazeleyin** (düğme: **Başlat**).
- Uyarı varsa "N uyarı var" (düğme: **Gör**).

Bir işi bitirince madde listeden kalkar. Liste boşsa "Acil bir iş görünmüyor. Denetim güncel ve kritik sorun yok." yazar.

**Son denetimde yeni çıkanlar ve Düzelenler.** Bu kart yalnızca bir şey söylemesi gerektiğinde görünür. Son denetim yedi günden eskiyse "Son denetimin üzerinden N gün geçti" der ve **Denetimi başlat** düğmesi sunar. Son iki denetim arasında sorun değişmişse iki liste çıkar. **Son denetimde yeni çıkanlar** hangi sorunun yeni görüldüğünü, **Düzelenler** hangisinin kapandığını gösterir. Düzelen bir şey yoksa "Düzelen sorun yok." yazar. Hiçbiri yoksa kart hiç görünmez.

**Tıklama eğilimi.** Son 28 günün günlük tıklamalarını bir çizgi olarak görürsünüz. Toplam, önceki döneme göre değişim ve en yüksek gün yazar. Dörtten az günün verisi varsa çizgi çizilmez. **Sorguları aç** bağlantısı sizi Arama performansı ekranına götürür.

**İlk üçe yakın sorgular.** Ortalama sırası 4 ile 20 arasında olan ve yeterli gösterimi bulunan aramalarınız burada durur. Her biri bir basamak yükselirse birlikte en fazla kaç ek tıklama getirebileceği yazar. Bu bir üst sınırdır. Her satırda aramanın sırası ve olası kazanç görünür. Satıra tıklayınca o arama Arama performansı ekranında açılır. **Tümünü gör** Arama performansı ekranının Sıralama fırsatları sekmesini açar. Yeterli gösterimli arama yoksa kart bunu söyler.

**Site denetimi kartı.** Kart kaç sayfanın tarandığını ve hangi tarihte tarandığını, en sık görülen sorunları ve en çok sorunu olan sayfaları gösterir. Denetim sürerken "Denetim sürüyor, sonuçlar bittiğinde görünecek." yazar ve kart beş saniyede bir yenilenir. Denetim tamamlanamadıysa "Son denetim tamamlanamadı, bu yüzden sonuç yok." yazar. Sorun bulunmadıysa "Sorun bulunamadı, siteniz sağlıklı görünüyor." yazar. Sorunların altında bir çubuk önem düzeylerini gösterir. Soru işareti üç düzeyi açıklar: kritik sorunlar sayfanın aramada görünmesini engelleyebilir, uyarılar sıralamayı zamanla aşındırır, bilgi notları küçük iyileştirmelerdir. Çubuğa ya da altındaki etiketlerden birine tıklarsanız sorun listesine geçersiniz. En altta **En çok sorunu olan sayfalar** listesi durur. Hiç denetim yoksa bu kart görünmez, çünkü "Sıradaki adımlar" zaten ilk denetimi önerir. **Ayrıntılar** denetimin sorunlu sayfalar sekmesini açar.

**Organik trafik kartı.** Google Analytics bağlıysa görünür. Aramadan gelenler için **Oturum**, **Aktif kullanıcı**, **Etkileşim oranı** ve **Anahtar olay** sayılarını gösterir. Sitenizde satış ölçülüyorsa **Organik gelir** ve **Sipariş** de eklenir. Kartın üstündeki **Raporlar** Analytics ekranını, **Yönet** Analytics bağlantı ayarını açar. Altta bir not Analytics'in 1 gün, Search Console'un 3 gün geriden geldiğini söyler. Bu yüzden kartın günleri üstteki tıklama kutularından farklıdır. Analytics bağlı değilse kartın yerinde bir bağlantı daveti durur. Kartı kapatırsanız bir daha çıkmaz.

Kart veriyi okuyamazsa nedenini ve çözümü yazan bir cümle gösterir ve iki düğme sunar: **Bağlantıyı düzelt** (Analytics ayarlarını açar) ve **Tekrar dene**. Başlıca nedenler şunlardır:

- Bağlantının süresi dolmuş ya da iptal edilmiş. **Ayarlar**'dan yeniden bağlayın.
- Bağlı hesap mülke erişemiyor. Hesaba ya da hizmet hesabına mülkte en az Görüntüleyen yetkisi verin.
- Mülk silinmiş ya da taşınmış. **Ayarlar**'dan yeniden seçin.
- Bu projeye bağlı bir Analytics mülkü yok. **Ayarlar**'dan bir mülk seçin.
- Raporlama kotası dolmuş. Kota saatlik ve günlük yenilenir, daha sonra tekrar deneyin.
- Google Analytics Data API Google Cloud projenizde kapalı. Google Cloud Console'da "Google Analytics Data API"yi etkinleştirin.
- Google'a bağlanılamıyor. Bu bilgisayarın internet bağlantısını kontrol edin.
- Google geçici olarak yanıt vermiyor. Birazdan tekrar deneyin.

Kartta organik oturum yoksa "Bu aralıkta organik arama trafiği kaydedilmemiş." yazar. Sorun yoktur, o dönemde aramadan ziyaret gelmemiştir.

**Çalışma alanınızı kurun.** Sayfanın en altında, yapılacak kurulum adımları kapalı bir kutuda durur. Adımlar: sitenizi ekleyin, başka sitelerinizi de ekleyin, yapay zekâ ajanınızı bağlayın, Search Console'u bağlayın ve projeyi anlatın. "N adım kaldı. Hepsi isteğe bağlı" yazar. Bir adımı **Şimdilik geç** ile sonraya bırakırsınız. Bırakılanlar ve bitenler kutunun altında sayılır, **Geri al** ile geri getirirsiniz. Hepsi bitince kutu kaybolur.

## Nasıl kullanılır

1. Haftada bir açın ve dört karttaki oklara bakın.
2. **Sıradaki adımlar** kutusundaki ilk işi yapın. Kutu boşsa acil iş yok demektir.
3. Kurulum etiketi eksik gösteriyorsa **Tamamla** deyin. Eksik maddeler hızlıca kapanır.
4. Son denetim yedi günden eskiyse **Denetimi başlat** deyin.
5. **İlk üçe yakın sorgular** kartındaki sayfaların başlığına ve açıklamasına bir daha bakın. En kolay kazanç genelde buradadır.
6. **Düzelenler** ve **Son denetimde yeni çıkanlar** kartı çıktıysa, yeni çıkan sorunlara öncelik verin. Bir haftalık değişimi tek bakışta görürsünüz.

## Sayılar nasıl hesaplanır

Dört kart tek bir Search Console raporundan gelir. Google veriyi üç gün geç verir. Bu yüzden 28 günlük aralık bugün bitmez, üç gün öncesinde biter. Önceki dönem, bu aralığın hemen öncesindeki 28 gündür. Önceki dönem sıfırsa ok gösterilmez.

Ortalama sırada çok gösterim alan aramaların ağırlığı daha fazladır. Bu dört sayı sitenin gerçek toplamıdır. Arama performansı ekranındaki tablo satırlarını toplarsanız fazla çıkar, çünkü Google aynı aramada çıkan her sayfayı ayrı sayar.

**İlk üçe yakın sorgular** kartındaki kazanç bir üst sınırdır. Her arama bir basamak yükselirse alacağı ek tıklamadır. Aynı hesap Fırsatlar ekranında da kullanılır. İki ekran aynı rakamı verir.

Kurulum etiketi bir yüzde ya da puan değil, bir sayıdır. Altı maddeden kaçının tamamlandığını gösterir.

## Sık sorulanlar

**Bugünün verisi neden yok?** Google son üç günü henüz vermez. Bir arıza yok, birkaç gün bekleyin.

**Ortalama sıra arttı, iyi mi?** Hayır. 3'ten 7'ye çıkmak düşmek demektir. Ok bu yüzden kırmızıya döner.

**Denetim kartı Google'ın gördüğünü mü gösterir?** Hayır. Uygulamanın kendi taramasının bulduklarını gösterir. Google'ın hangi sayfayı kaydettiğini denetim ekranındaki **Dizin durumu** sekmesinde görürsünüz.

**Organik trafik kartı yok.** Proje ayarlarında Google Analytics bağlı değil ve kartı kapatmış olabilirsiniz. Bağlamak isteğe bağlıdır.

**Kurulum neden 5 / 6 diyor, ben her şeyi yaptım sandım?** Eksik maddeyi "Kurulumda eksik" satırı söyler. Çoğu zaman bir PageSpeed anahtarı ya da son yedi gündeki bir denetimdir.

**Analytics kartı hata veriyor.** Kartın yazdığı cümle nedeni söyler. Çoğu zaman bağlantıyı **Ayarlar**'dan yenilemek yeter.

## Sınırlar

Panel arama hacmi, backlink (başka sitelerden size gelen bağlantı) ya da rakip sırası göstermez. Bu veriler uygulamada yok. Çok az aranan sorgular Search Console'da gizlenir. Ayrıntıya bakmak için ilgili ekrana geçersiniz.

<!-- Kaynaklar: src/routes/_project/p/$projectId/index.tsx; src/client/features/dashboard/DashboardPage.tsx; DashboardMetrics.tsx; SearchInsights.tsx; DashboardCards.tsx; Ga4Card.tsx; Ga4ConnectCard.tsx; NextStepsCard.tsx; AuditFreshnessCard.tsx; DashboardOnboarding.tsx; dashboardSteps.ts; GoogleSetupBanner.tsx; src/client/features/projects/projectSetupQuery.ts; src/shared/projectSetup.ts; src/server/lib/errors.ts; src/client/features/dashboard/dashboardGscReport.ts; src/server/features/dashboard/services/DashboardService.ts; src/shared/dataFreshness.ts; src/shared/delta.ts -->
