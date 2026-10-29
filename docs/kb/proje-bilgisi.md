---
title: Proje bilgisi
description: İşinizi, hedefinizi ve önemli sayfalarınızı bir kez yazın; siz ve bağladığınız ajan aynı yerel notlardan çalışın.
screen: Proje bilgisi
route: /p/<proje>/context
updated: 2026-10-27
---

Buradaki notlar yalnızca sizin bilgisayarınızda durur. Ajan onları MCP üzerinden okuyabilir, ama her ajanın okuyacağı ya da metnin doğru olduğu kendiliğinden garanti edilmez.

## Dört ana bölüm

Ekranın üstünde kaç ana bölümün dolu olduğu ve kayıtlı hedefiniz görünür. Boş bir bölüm varsa **İlk boş bölümü doldur** bağlantısı ya da **Bölüme git** seçimi sizi oraya götürür.

| Bölüm                | Ne yazılır                                              |
| -------------------- | ------------------------------------------------------- |
| **İşin özeti**       | Ne satıyorsunuz, kim alıyor, nerede.                    |
| **Şu anki hedef**    | Şu anda neyin peşindesiniz ve ne zamana kadar.          |
| **Konumlandırma**    | Biri neden alternatifler yerine sizi seçsin.            |
| **Yazım tercihleri** | Üslup, kullanılmayacak kelimeler, girilmeyecek konular. |

Her bölüm en fazla 4.000 karakterdir. Bölümün altında onu son kimin yazdığı ve ne zaman güncellendiği görünür. **Değişiklikleri kaydet** yalnızca değiştirdiğiniz bölümleri kaydeder.

## Rakipler ve önemli sayfalar

Bu iki liste isteğe bağlıdır. Ajana bağlam verir; sıralama ya da dönüşüm ölçmez.

- Her listede en fazla 100 kayıt olur.
- Rakip: alan adı 255, ad 120, not 500 karakter.
- Önemli sayfa: adres 2.048, hedef konu 200, not 500 karakter. Rol, sizin verdiğiniz serbest bir etikettir.

## Özel bölümler

Dört ana bölüme sığmayan notları ajan **Özel bölümler** altına ekler. Siz bunları düzenleyebilir ya da kaldırabilirsiniz. En fazla 20 özel bölüm saklanır; başlık 120, içerik 4.000 karakterdir.

## Ajanla doldurma

**Ajanla taslak hazırla**, ajanınıza yapıştıracağınız bir istem üretir. İstem, ajandan kaydetmeden önce sizden onay almasını ister. Uygulamanın MCP araçları ise kendi başına onay beklemez; ajan aracı çağırdığı anda yazar. Proje kimliği okunamazsa istem hazırlanmaz; proje listesini yeniden yükleyin.

## Kaydetme ve çakışmalar

Kaydedilmemiş bir değişiklik varken sayfadan çıkmak isterseniz uygulama sizi uyarır.

Siz bir bölümü düzenlerken ajan ya da başka bir sekme aynı bölümü değiştirirse kaydınız bütünüyle reddedilir; taslağınız silinmez. Bölümde üç metin görünür: **Düzenleme başındaki metin**, **Son kayıtlı metin** ve sizin taslağınız. Bunları birleştirin, **Karşılaştırdım, birleştirilmiş taslağı kullan** düğmesine basın ve yeniden kaydedin. Ajanlar da `expectedContent` göndererek aynı korumadan yararlanır.

Yenileme notları ve kurulum durumunu yeniden okur. Yenileme başarısız olursa kayıtlı bilgi ve taslaklarınız yerinde kalır, ekranda bir uyarı çıkar.

## Araştırma günlüğü

**Araştırma günlüğü** ajanın tuttuğu kısa notlardır. Ekran son 90 günün en yeni 20 kaydını gösterir; daha eski kayıtlar varsa bunu belirtir. Not en fazla 1.000 karakterdir ve tarihi sunucunun UTC gününe göre yazılır.

## Kaynak ve kurulum

Bu kart altı kurulum adımını sayar: Search Console, Analytics, site denetimi, proje bilgisi, PageSpeed anahtarı ve ajan bağlantısı. Panel de aynı sayımı kullanır. Eksik adımlar ve okunamayan adımlar ayrı gösterilir. Rakipler ve önemli sayfalar öneri olarak listelenir, sayıma girmez.

Sayım bir SEO puanı değildir. Bir adımın tamam görünmesi şunları kanıtlamaz: Google bağlantısının veri döndürdüğünü, PageSpeed kotasının yettiğini ya da ajanın bu projeyi gerçekten okuduğunu.

<!-- Sources: src/routes/_app/projects.tsx; src/client/features/projects/ProjectFacts.tsx; src/client/features/projects/project-context/; src/server/features/projects/services/ProjectOverviewService.ts; src/server/features/project-context/; src/shared/projectSetup.ts -->
