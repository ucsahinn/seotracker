---
title: Projeler
description: Yeni proje açma, siteyi ve ülkeyi seçme, adı değiştirme, Google bağlantılarını yönetme ve projeyi arşivleyip geri alma.
screen: Projeler, Proje ayarları
route: /projects, /p/{proje}/settings
updated: 2026-10-22
---

Bu sayfada bir proje açar, ayarlarını değiştirir ve gerekirse kaldırırsınız. Her site bir projedir. Her projenin kendi Google bağlantısı, kendi denetimleri ve kendi raporları olur.

## Ekranda neler var

**Proje seçici.** Sol üstteki proje adına tıklayınca projeleriniz listelenir. Altta **Yeni proje** ve **Projeleri yönet** vardır. Yanındaki dişli simgesi **Proje ayarları**'nı açar. Sekiz ve daha fazla projeniz olunca listede bir arama kutusu çıkar.

**Projeler sayfası.** Her satırda projenin adı ve sitesi görünür. Sitesi olmayan proje "Site belirlenmemiş" der. Açık olan proje **Etkin** etiketi taşır. Satıra tıklayınca o projenin ayarları açılır. Arşivlenmiş projeler en altta **Arşivlendi** bölümünde durur; **Geri al** ile dönerler.

**Yeni proje penceresi.** Dört alan vardır:

- **Ad**: zorunlu. Yalnızca siz görürsünüz; raporların başlığında ve proje seçicide çıkar. Google'a gitmez.
- **Alan adı (isteğe bağlı)**: sitenizin adresi, `example.com` gibi. Başındaki `https://` ve `www.` kendiliğinden atılır. Alt alan adları ana alan adına bağlanır: `blog.example.com` ile `example.com` aynı projedir.
- **Ülke** ve **Dil**: kaydettiğiniz kelimelerin hangi pazara göre izleneceğini belirler. Ülkeyi değiştirince dil o ülkenin diline döner. Sonradan değiştirebilirsiniz.

**Proje ayarları.** İki sekme vardır. **Genel** sekmesinde ad, alan adı, ülke ve dil ile **Projeyi arşivle** bölümü bulunur. **Bağlantılar** sekmesinde Search Console ve Analytics kartları bulunur.

## Nasıl kullanılır

1. Proje seçicide **Yeni proje** deyin.
2. Bir ad yazın, sitenizin adresini girin, ülke ve dili seçin, **Proje oluştur** deyin. Proje açılır ve Panel gelir. Henüz hiçbir veri çekilmez.
3. **Proje ayarları → Bağlantılar** sekmesine geçin ve Search Console'u bağlayın. Adımlar Google'a bağlanma kılavuzundadır. Bağlandıktan sonra Panel, Arama performansı, Fırsatlar ve Dizin durumu dolmaya başlar.
4. Analytics'i de bağlamak isterseniz aynı sekmedeki **Analytics** kartından yapın. Ayrı bir Google anahtarı gerekmez.
5. Adı ya da siteyi değiştirmek için **Genel** sekmesinde alanı düzeltip **Değişiklikleri kaydet** deyin. Düğme ancak bir şey değişince açılır.

### Google bağlantısını değiştirme

**Bağlantılar** sekmesindeki kartta **Mülkü veya hesabı değiştir** ile başka bir site (Google'ın deyişiyle "mülk") ya da başka bir Google hesabı seçersiniz. **Bağlantıyı kes** yalnızca bu projenin bağlantısını kaldırır; Google hesabınız kayıtlı kalır, onay sorulmaz. Bir Google hesabını tamamen kaldırmak için seçim penceresindeki **Hesabı kaldır**'ı kullanın; pencere hangi projelerin etkileneceğini söyler.

### Projeyi arşivleme

Projeler silinmez, arşivlenir. **Genel** sekmesinin altındaki **Projeyi arşivle** düğmesi projeyi listeden kaldırır; denetimler, kelimeler ve raporlar olduğu gibi durur. Projeler sayfasındaki **Geri al** ile aynen döner. Tek projeniz varsa arşivleyemezsiniz.

## Sayılar nasıl hesaplanır

Bu ekranda sayı yoktur. Alan adı kaydedilirken şu kurallar uygulanır: boşluklar ve büyük harfler temizlenir, adres gerçek bir alan adı olmalıdır (IP adresi, `localhost` ya da uydurma uzantı kabul edilmez). Hatalı girişte "Geçerli bir alan adı girin, örneğin acme.com." uyarısı çıkar.

## Sık sorulanlar

**Projeyi tamamen silebilir miyim?** Hayır, yalnızca arşivlersiniz. Verisi durur, istediğiniz zaman geri alırsınız.

**Bir projeye iki site bağlayabilir miyim?** Hayır. Bir projede bir Search Console mülkü ve bir Analytics mülkü olur. İkinci site için ikinci proje açın.

**"Default" adında bir proje var, nedir?** Uygulama ilk açılışta boş bir proje oluşturur ki ekranlar açılabilsin. Adını değiştirip kullanabilir ya da yeni proje açıp onu arşivleyebilirsiniz.

**Yanlış ülke seçtim.** Genel sekmesinden değiştirin. Kaydettiğiniz kelimelerin sıraları o andan itibaren yeni ülkeye göre izlenir.

## Sınırlar

Proje sayısında bir sınır yoktur. Proje oluşturmak hiçbir şeyi başlatmaz; veri ancak Google bağlanınca gelir. Alan adı girmediyseniz denetim başlatırken adresi elle yazarsınız.

<!-- Kaynaklar: src/routes/_app/projects.tsx; src/routes/_app/index.tsx; src/client/features/projects/CreateProjectModal.tsx; src/client/features/projects/ProjectGeneralSettings.tsx; src/client/features/projects/ProjectSwitcher.tsx; src/routes/_project/p/$projectId/settings.tsx; src/routes/_project/p/$projectId/settings/integrations.tsx; src/client/features/integrations/*; src/server/lib/domainUtils.ts; src/server/features/projects/services/projects.ts -->
