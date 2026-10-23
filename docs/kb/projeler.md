---
title: Projeler
description: Yeni proje açar, siteyi ve ülkeyi seçer, adı değiştirir, Google bağlantısını yönetirsiniz. Projeyi arşivleyip geri de alabilirsiniz.
screen: Projeler, Proje ayarları
route: /projects, /p/{proje}/settings
updated: 2026-10-22
---

Proje açar, ayarlarını değiştirir, gerekirse arşivlersiniz. Her site bir projedir. Her projenin kendi Google bağlantısı, kendi denetimleri ve kendi raporları olur.

## Ekranda neler var

**Proje seçici.** Sol üstteki proje adına tıklayınca projeleriniz açılır. Altta **Yeni proje** ve **Projeleri yönet** durur. Yanındaki dişli simgesi **Proje ayarları**'nı açar. Sekiz ya da daha fazla projeniz olursa listede bir arama kutusu çıkar.

**Projeler sayfası.** Her satırda projenin adı ve sitesi görünür. Sitesi olmayan proje "Site belirlenmemiş" der. Açık olan projede **Etkin** etiketi durur. Satıra tıklayınca o projenin ayarları açılır. Arşivlediğiniz projeler en altta **Arşivlendi** bölümünde durur. **Geri al** deyince listeye döner.

**Yeni proje penceresi.** Dört alan var:

- **Ad** zorunludur. Yalnızca siz görürsünüz, raporların başlığında ve proje seçicide çıkar. Google'a gitmez.
- **Alan adı (isteğe bağlı)** sitenizin adresidir, örneğin `example.com`. Başındaki `https://` ve `www.` kendiliğinden atılır. Alt alan adları ana alan adına bağlanır, yani `blog.example.com` ile `example.com` aynı projedir.
- **Ülke** ve **Dil**, kaydettiğiniz kelimelerin hangi pazara göre izleneceğini belirler. Ülkeyi değiştirince dil o ülkenin diline döner. İkisini de sonra değiştirebilirsiniz.

**Proje ayarları.** İki sekme var. **Genel** sekmesinde ad, alan adı, ülke ve dil ile **Projeyi arşivle** bölümü durur. **Bağlantılar** sekmesinde Search Console ve Analytics kartları durur.

## Nasıl kullanılır

1. Proje seçicide **Yeni proje** deyin.
2. Bir ad yazın, sitenizin adresini girin, ülke ve dili seçin, **Proje oluştur** deyin. Proje açılır ve Panel gelir. Henüz hiçbir veri çekilmez.
3. **Proje ayarları → Bağlantılar** sekmesine geçin ve Search Console'u bağlayın. Adımlar Google'a bağlanma kılavuzunda. Bağlanınca Panel, Arama performansı, Fırsatlar ve Dizin durumu dolmaya başlar.
4. Analytics'i de bağlamak isterseniz aynı sekmedeki **Analytics** kartını kullanın. Ayrı bir Google anahtarı gerekmez.
5. Adı ya da siteyi değiştirmek için **Genel** sekmesinde alanı düzeltin, **Değişiklikleri kaydet** deyin. Düğme ancak bir şey değişince açılır.

### Google bağlantısını değiştirme

**Bağlantılar** sekmesindeki kartta **Mülkü veya hesabı değiştir**'e basın. Başka bir site (Google'ın deyişiyle "mülk") ya da başka bir Google hesabı seçebilirsiniz. **Bağlantıyı kes** yalnızca bu projenin bağlantısını kaldırır. Google hesabınız kayıtlı kalır, onay da sorulmaz. Bir Google hesabını tamamen kaldırmak için seçim penceresindeki **Hesabı kaldır**'ı kullanın. Pencere hangi projelerin etkileneceğini gösterir.

### Projeyi arşivleme

Projeler silinmez, arşivlenir. **Genel** sekmesinin altındaki **Projeyi arşivle** düğmesi projeyi listeden kaldırır. Denetimler, kelimeler ve raporlar olduğu gibi durur. Projeler sayfasındaki **Geri al** projeyi aynen geri getirir. Tek projeniz varsa arşivleyemezsiniz.

## Sayılar nasıl hesaplanır

Bu ekranda sayı yok. Alan adı kaydedilirken şu kurallar geçerlidir: boşluklar ve büyük harfler temizlenir, adres gerçek bir alan adı olmalıdır (IP adresi, `localhost` ya da uydurma uzantı kabul edilmez). Hatalı girerseniz "Geçerli bir alan adı girin, örneğin acme.com." uyarısı çıkar.

## Sık sorulanlar

**Projeyi tamamen silebilir miyim?** Hayır, yalnızca arşivlersiniz. Verisi durur, istediğiniz zaman geri alırsınız.

**Bir projeye iki site bağlayabilir miyim?** Hayır. Bir projede bir Search Console mülkü ve bir Analytics mülkü olur. İkinci site için ikinci bir proje açın.

**"Default" adında bir proje var, nedir?** Uygulama ekranlar açılabilsin diye ilk açılışta boş bir proje oluşturur. Adını değiştirip kullanabilirsiniz. İsterseniz yeni proje açıp onu arşivleyin.

**Yanlış ülke seçtim.** Genel sekmesinden değiştirin. Kaydettiğiniz kelimelerin sıraları o andan sonra yeni ülkeye göre izlenir.

## Sınırlar

Proje sayısında sınır yok. Proje oluşturmak hiçbir şeyi başlatmaz. Veri ancak Google bağlanınca gelir. Alan adı girmediyseniz denetim başlatırken adresi elle yazarsınız.

<!-- Kaynaklar: src/routes/_app/projects.tsx; src/routes/_app/index.tsx; src/client/features/projects/CreateProjectModal.tsx; src/client/features/projects/ProjectGeneralSettings.tsx; src/client/features/projects/ProjectSwitcher.tsx; src/routes/_project/p/$projectId/settings.tsx; src/routes/_project/p/$projectId/settings/integrations.tsx; src/client/features/integrations/*; src/server/lib/domainUtils.ts; src/server/features/projects/services/projects.ts -->
