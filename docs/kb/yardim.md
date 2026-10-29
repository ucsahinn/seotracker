---
title: Yardım
description: Bir şey ters giderse önce buraya bakın. Kurulumunuzu kontrol eder, sık sorunların çözümünü gösterir ve sorun bildirirken göndereceğiniz dosyayı hazırlar.
screen: Yardım
route: /support
updated: 2026-10-27
---

Yardım ekranı sitenizi değil, seowatcher kurulumunun kendisini kontrol eder. Bir eksik bulursa sizi onu düzelteceğiniz ayara götürür.

## Sorun çözme sırası

1. **Uygulamanın durumu** kartındaki uyarıyı okuyun.
2. Uyarının yanındaki bağlantıyla ilgili ayara gidin, ayarı düzeltin, geri dönüp **Durumu yeniden kontrol et** düğmesine basın.
3. Kart **Kurulum kontrollerinde sorun bulunmadı.** dediği halde sorun sürüyorsa **Sık sorunlar** başlıklarına ve ilgili proje ekranına bakın.
4. Yine çözülmezse **Tanılama paketi indir** ile dosyayı indirin ve GitHub'daki sorun kaydına ekleyin. Windows'ta tepsi menüsündeki **Sorunu bildir (GitHub)** aynı işi tek adımda yapar.

## Hızlı işlemler

- **Durumu yeniden kontrol et**: Uygulamanın durumu kartını yeniler.
- **Tanılama paketi indir**: Sorun bildirirken göndereceğiniz dosyayı indirir.
- **Kılavuzu aç**: seowatcher.io'daki kılavuzu yeni sekmede açar.
- **seowatcher.io**: İndirme sayfasının da bulunduğu siteyi açar.
- **Sürüm notları**: Uygulamadaki Sürüm notları ekranını açar.
- **Ajan kurulumu**: Ajan bağlantısı ekranına gider.

## Uygulamanın durumu

Kart bu kurulumun erişim ayarını, Google kimliğini, PageSpeed anahtarını, çalışma ortamını ve veritabanını kontrol eder. Her şeyin yeşil olması sitenizin hatasız ya da Google verisinin güncel olduğunu kanıtlamaz. Okunamayan bir ayar başarılı sayılmaz.

Sürüm satırı kullandığınız sürümü ve yeni sürüm olup olmadığını, **Son kontrol** de sonucun ne zaman alındığını gösterir. **Özeti kopyala** durumu gizli değer içermeyen bir metin olarak kopyalar.

## Adres numarası (port) uyarısı

Windows sürümü normalde 3001 numaralı adreste çalışır. Bu numarayı başka bir program (örneğin eski bir Docker kopyası) tutuyorsa uygulama başka bir numarada, örneğin 3002'de açılır. O zaman her ekranın üstünde sarı bir şerit çıkar ve aynı uyarı **Uygulamanın durumu** kartında da yazar.

Bu önemlidir, çünkü Google ile giriş 3001 adresine döner; uygulama 3002'deyken giriş hata verir. Çözmek için:

1. 3001'i kullanan programı kapatın.
2. Tepsi menüsünden **Yeniden başlat** seçeneğine tıklayın.

Uygulama 3001'e döner ve şerit kaybolur. Şeridin sağındaki kapat düğmesi onu yalnızca bu sekme için gizler.

## Projeler

Her projenin Search Console ve Analytics mülkünün **seçili** ya da **seçili değil** olduğu görünür. **Bağlantıları aç** projenin bağlantı ayarlarına gider.

## Sık sorunlar

Altı açılır başlık vardır. Her birinde yapılacak iş ve ilgili ayarın bağlantısı yazar:

- **Sayfa açılmıyor ya da uygulama kapalı** (Docker'da **Sayfa açılmıyor ya da Docker kapalı**)
- **Adres numarası (port) dolu**
- **Ajanım bağlanamıyor (401)**
- **Hız ölçümü yarım kalıyor (429)**
- **Sorgu verisi yok, grafikler boş**
- **Bir ayarı değiştirdim, uygulama görmüyor**

## Google ve sistem sınırları

**Sınırları göster**, Google'ın günlük sınırlarının ne kadarını kullandığınızı gösterir. Ayrıntılar [Ayarlar](/docs/ayarlar/) sayfasındadır.

## Günlükler ve sağlık adresi

Ekranın altında kayıt dosyalarına ve sağlık adresine (`/api/health`) giden kısayollar vardır. Windows'ta günlükleri tepsi menüsündeki **Günlükleri aç** açar. Docker'da **Komutu kopyala** ile verilen komutu terminalde çalıştırın.

## Tanılama paketinde ne var

Paket sürümü, kurulum kontrollerini, tablo sayılarını ve son 25 denetimin aşama ve hata özetlerini içerir. PageSpeed hataları adresler çıkarılarak özetlenir. Gizli anahtarlar ve parolalar eklenmez. Proje adları, alan adları ve Google mülk kimlikleri yer alabilir; dosyayı göndermeden önce inceleyin.

## Sık sorulanlar

**Google kimliği satırı neden sarı?** Henüz bir Google kimliği kaydedilmemiştir. [Google'a bağlanma](/docs/google-baglantisi/) adımlarını izleyin.

**Erişim satırında "parolasız tek kullanıcı" yazıyor.** Bu normaldir; uygulama yalnızca kendi bilgisayarınızdan açılır. Dış ağa açmak isterseniz önüne kendi kimlik doğrulamanızı koyun.

**Kurulum tamam ama ekranlarda veri yok.** Yardım ekranı raporları doğrulamaz. Proje bağlantılarını, seçili tarih aralığını ve ekrandaki veri kapsamı uyarısını kontrol edin. Az trafik alan sitelerde Google bazı sorguları gizler: sayfa toplamında tıklama varken sorgu listesi boş ya da daha kısa olabilir. Bu tek başına bağlantı hatası değildir.

## Hangi ekrana gitmeli

- Sitenizdeki teknik sorunlar için [Site denetimi](/docs/site-denetimi/).
- Google'ın sayfalarınızı dizine alıp almadığı için [Dizin durumu](/docs/dizin-durumu/).
- Projenin veri ve kurulum özeti için [Panel](/docs/panel/).
- Yapılacak işleri seçmek için [Fırsatlar](/docs/firsatlar/).
- Search Console sorgularının sıra geçmişi için [Sıralama takibi](/docs/siralama-takibi/).

<!-- Kaynaklar: src/routes/_app/support.tsx; src/client/features/support/QuickActions.tsx; src/client/features/support/SetupStatusPanel.tsx; src/client/features/support/checkCopy.ts; src/client/features/support/CommonProblems.tsx; src/client/features/quotas/SystemLimitsSection.tsx; src/server/lib/setup-status.ts -->
